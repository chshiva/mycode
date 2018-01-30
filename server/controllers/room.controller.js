import Room from '../models/room';
import Users from '../models/users';
import Topic from '../models/topic';
import Package from '../models/package';
import Questionnaire from '../models/questionnaire';
import Student from '../models/students';
import Schedule from '../models/schedule';
import Category from '../models/category';
import Assignment from '../models/assignment';
import Logger from '../models/logger';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import { Roles } from './admin.user.controller';
import * as EmailForCorporateCreation from '../emailFunctions';
import { createRoomMcu } from './conference.controller';
import serverConfig from '../config';
import Result from '../models/result';
import Feedback from '../models/feedback';
import Location from '../models/location';
import Uploads from '../models/upload';
import ParticipantsGroup from '../models/participantsgroup';
import { checkValidRequest } from '../authorization';
import { createRandomString } from '../randomstring'
import {deleteFilesFromDest} from './fileupload.controller';
import * as EmailForUserCreation from '../emailFunctions';
import { plagiarismProcessResult, plagiarismCreditsResult, processForPlagiarismCheck } from './plagiarismcheck.controller';
import { sendScheduleEmail } from './schedule.controller';
import {addSlash} from '../controllers/slashesActions';
import { sendPushNotificationAndroid } from './mobile.controller';
import GradeConfiguration from '../models/gradeconfiguration';
import DataLog from '../models/datalog'

var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var _ = require('lodash');
var async = require("async");
import reflect from 'async/reflect';
import parallel from 'async/parallel';
import eachOf from 'async/eachOf';
var multer  = require('multer');
var fs = require('fs');
var shell = require('shelljs');


/**
*  @Function name : saveRoom
*  @Purpose : For creating room
*  @Request Object : roomdata : { room data }
*  @Response Object : Success - Success message, Room data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveRoom(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.body.roomdata || !req.body.roomdata.selPackage || !mongoose.Types.ObjectId.isValid(req.body.roomdata.selPackage)) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {
        let obj = req.body.roomdata;
        // obj['roomLicense'] = '123456';
        // obj['mcuServer'] = '123456';

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        
        Package.findOne({_id: obj.selPackage}, function(err, packageData){
          if (err) {
            res.json({ 
              status: false, 
              error : err.message 
            });
          } else if (packageData) {
            let packageExpiryDate = new Date(packageData.packageValidity);
            let roomExpiryDate = new Date(obj.expiryDate);


            if(roomExpiryDate <= packageExpiryDate || roomExpiryDate == 'Invalid Date') {

              //If user is admin
              if (person.role == Roles.Admin || person.role == Roles.Lmsadmin ||  person.role == Roles.Presenteradmin || person.role == Roles.CRMadmin) { //TODO - for SA also corporateId should be insert from backend.
                obj['corporateId'] = bussinessID; 
                //changeBy: pranathi, disc: In room cheking roomName is exists or not
                Room.findOne({ corporateId: person.profile.companyid._id, roomName:req.body.roomdata.roomName })
                .exec(function(roomErr,roomData) {
                  if(roomErr) {
                    res.json( { status: false, error: roomErr.message });
                  } else if( roomData) {
                    res.json({ status: false, error : "Room name is already exists!." });
                  } else {
                    //Function calling for creating new room
                    insertRoomData(obj, person, function(err2, res2) {
                      if (err2) {
                        let errorResponse = err2.message ? err2.message : err2;
                        res.json({ 
                          status: false, 
                          error : errorResponse 
                        });
                      } else {
                        res.json({ 
                          status: true, 
                          data : res2, 
                          message : "Created successfully." 
                        });

                        //Log obj which need to be inserted in logger collection
                        // var logObj = {
                        //   logType : 'Room',
                        //   actionType : 'Created',
                        //   actionTime : moment().utc().toDate(),
                        //   uid : obj.createdBy,
                        //   details : {
                        //     name : obj.roomName,
                        //     corporateId : obj.corporateId,
                        //     packageId : obj.selPackage,
                        //     remoteAddress : req.connection.remoteAddress,
                        //     userAgent : req.headers['user-agent']
                        //   }
                        // } 

                        // //Function for creating log on successful creation of room
                        // createLog(logObj, function(status) {
                        //   if(status) {
                        //     // console.log(status);
                        //   }
                        // }); 
                      }
                    }); 
                  }
                });              

                // //Function calling for creating new room
                // insertRoomData(obj, person, function(err2, res2) {
                //   if (err2) {
                //     let errorResponse = err2.message ? err2.message : err2;
                //     res.json({ 
                //       status: false, 
                //       error : errorResponse 
                //     });
                //   } else {
                //     res.json({ 
                //       status: true, 
                //       data : res2, 
                //       message : "Created successfully." 
                //     });

                //     //Log obj which need to be inserted in logger collection
                //     // var logObj = {
                //     //   logType : 'Room',
                //     //   actionType : 'Created',
                //     //   actionTime : moment().utc().toDate(),
                //     //   uid : obj.createdBy,
                //     //   details : {
                //     //     name : obj.roomName,
                //     //     corporateId : obj.corporateId,
                //     //     packageId : obj.selPackage,
                //     //     remoteAddress : req.connection.remoteAddress,
                //     //     userAgent : req.headers['user-agent']
                //     //   }
                //     // } 

                //     // //Function for creating log on successful creation of room
                //     // createLog(logObj, function(status) {
                //     //   if(status) {
                //     //     // console.log(status);
                //     //   }
                //     // }); 
                //   }
                // });                 
              } else if (person.role == Roles.Superadmin) { // If user is superadmin

                //Function calling for fetching corporate id
                corporateIdForSA(obj, function(err1, res1) {
                  if (err1) {
                    res.json({ 
                      status: false, 
                      error : err1.message 
                    });
                  } else {
                    obj['corporateId'] = res1;

                    //changeBy: pranathi, disc: In room cheking roomName is exists or not
                    Room.findOne({ corporateId: res1, roomName:req.body.roomdata.roomName })
                    .exec(function(roomErr,roomData) {
                      if(roomErr) {
                        res.json( { status: false, error: roomErr.message });
                      } else if( roomData) {
                        res.json({ status: false, error : "Room name is already exists!." });
                      } else {

                        //Function calling for creating new room
                        insertRoomData(obj, person, function(err2, res2) {
                          /*console.log("err2 === ",err2);
                          console.log("res2 === ",res2);*/
                          if (err2) {
                            let errorResponse = err2.message ? err2.message : err2;
                            res.json({ 
                              status: false, 
                              error : errorResponse 
                            });
                          } else {
                            res.json({ 
                              status: true, 
                              data : res2, 
                              message : "Created successfully." 
                            });

                            //Log obj which need to be inserted in logger collection
                            // var logObj = {
                            //   logType : 'Room',
                            //   actionType : 'Created',
                            //   actionTime : moment().utc().toDate(),
                            //   uid : obj.createdBy,
                            //   details : {
                            //     name : obj.roomName,
                            //     corporateId : obj.corporateId,
                            //     packageId : obj.selPackage,
                            //     remoteAddress : req.connection.remoteAddress,
                            //     userAgent : req.headers['user-agent']
                            //   }
                            // }  

                            // //Function for creating log on successful creation of room
                            // createLog(logObj, function(status) {
                            //   if(status) {
                            //     // console.log(status);
                            //   }
                            // }); 
                          }
                        });
                      }
                    });
                  }
                });
              } else{
                res.json({ 
                  status: false, 
                  error : "Access denied." 
                });
              }
            } else {

              //code changed by - Najib, Desc- Relevent message in response based on businessType
              let roomType = null;
              if(person.profile.companyid && person.profile.companyid.businessType && person.profile.companyid.businessType == 'LMS') {
                roomType = "Course";
              } else {
                roomType = "Room";
              }
              res.json({ 
                status: false, 
                error : roomType + ' ' + "expiry date("+moment(roomExpiryDate).format('DD/MM/YYYY')+") can't be greater than package expiry date("+moment(packageExpiryDate).format('DD/MM/YYYY') +")"
              });
            }
          } else {
            res.json({ 
              status: false, 
              error : "Invalid Package" 
            });
          }             
        })
      }
    } catch(e) {
      console.log("Error in save room", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}

/**
*  @Function name : updateRoom
*  @Purpose : For updating room
*  @Request Object : roomdata : { room data }
*  @Response Object : Success - Success message, Room data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function updateRoom(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id) || !req.body.roomdata) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {
        let obj = req.body.roomdata;
        // console.log('obj', obj);

        //If user has a valid role
        if (person.role == Roles.Admin || person.role == Roles.Superadmin  || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.CRMadmin) {

          if(person.role != Roles.Superadmin) {
            obj['corporateId'] = person.profile.companyid._id
          }
          //If room id is there then update data
          if (req.params.id && (req.params.id != "" || req.params.id != undefined)) {
            let recordId = mongoose.Types.ObjectId(req.params.id);
            obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
            delete obj["uid"];
            
            //Fetching the details of room
            var data = Room.findOne({ 
              _id : recordId 
            });
            data.exec(function(error, roomData){

              //Verifying is data is present or not
              if (roomData) {
                Package.findOne({_id : obj.selPackage})
                .select('packageValidity packageName')
                .exec(function(err, packageData){
                  if(packageData) {
                    // console.log(packageData)
                    let roomexpiryDate = new Date(obj.expiryDate);
                    let packageExpiryDate = new Date(packageData.packageValidity);
                    if(roomexpiryDate<=packageExpiryDate || roomexpiryDate == 'Invalid Date') {
                      let set = {
                        $set : obj
                      }
                      if (obj.categoryId == '') {
                        delete obj["categoryId"];
                        set = {
                          $set : obj,
                          $unset : { 
                            categoryId : "" 
                          }
                        }
                      }
                      
                      //changeBy: pranathi, disc: checking roomName is exists in other rooms or not
                      Room.findOne({ _id: {$ne: recordId},roomName:obj.roomName,corporateId:obj.corporateId})
                      .exec(function(roomErr, roomDataDetails) {
                        if(roomErr) {
                          res.json({ status: false, error: roomErr.message });
                        } else if(roomDataDetails) {
                          res.json({status: false, error:'Room name is already exists!.'});
                        } else {
                            //If data is present then update the room
                            Room.update({ 
                              _id : recordId 
                            }, 
                            set, 
                            { 
                              runValidators: true 
                            },function (err, doc) {
                              if (err) {
                                res.json({ 
                                  status : false, 
                                  error : err.message 
                                });
                              } else {

                                //Query for sending the updated record to the client
                                var query = Room.findOne({ 
                                  _id : recordId 
                                }).populate('selPackage corporateId', 'packageName features -_id businessName -_id')
                                .populate('users', 'firstname lastname email profile.profileImage');
                                query.exec(function (e, doc) {
                                  if (e) { 
                                    res.json({ 
                                      status: false, 
                                      error : e.message 
                                    }); 
                                  } else if (doc) {
                                    res.json({ 
                                      status: true, 
                                      data: doc, 
                                      message : "Updated successfully." 
                                    });

                                    if(roomData && roomData.users && roomData.users.length > 0 ) {
                                      getRoomUsersData(roomData.users, roomData._id, function(error, roomUsers){
                                        if(roomUsers != null) {
                                          //createdBy: pranathi, disc: push notifications to android users
                                          if(roomUsers &&  roomUsers.length > 0) {
                                            let message = 'The Room '+doc.roomName+' has been updated.';
                                              Users.find({_id:{ $in: roomUsers } })
                                              .select('deviceType deviceId')
                                              .exec(function(err, userData) {
                                                if(userData && userData.length > 0) {
                                                   for (var i = 0; i <= userData.length - 1; i++) {
                                                    if (userData[i].deviceType == 'ANDROID') {
                                                      sendPushNotificationAndroid("UPDATE-ROOM",message, userData[i].deviceId, person._id, userData[i]._id);
                                                    }
                                                  } 
                                                } 
                                              });
                                          }
                                        }
                                      });
                                    }
                                  } else {
                                    res.json({ 
                                      status: false, 
                                      error : "Internal server error"
                                    });
                                  }
                                });
                              }
                            });
                        }
                      });
                    } else {

                      //code changed by - Najib, Desc- Relevent message in response based on businessType
                      let roomType = null;
                      if(person.profile.companyid && person.profile.companyid.businessType && person.profile.companyid.businessType == 'LMS') {
                        roomType = "Course";
                      } else {
                        roomType = "Room";
                      }
                      res.json({ 
                        status: false, 
                        error : roomType + ' ' + "expiry date("+moment(roomexpiryDate).format('DD/MM/YYYY')+") can't be greater than package expiry date("+moment(packageExpiryDate).format('DD/MM/YYYY') +")"
                      });
                    }
                  } else {
                    res.json({
                      status : false,
                      error :'Invalid Package'
                    })
                  }
                })                
              } else {
                res.json({ 
                  status : false, 
                  error : "Invalid Room" 
                });
              }
            })
          } 
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("Error in update room", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

function corporateIdForSA(reqObj, cb) {
  try{
    Package.findOne({ _id: mongoose.Types.ObjectId(reqObj.selPackage) })
            .select('assignedTo -_id')
            .exec(function(pkgErr, pkgRes) {
              if(!pkgErr) {
                Users.findOne({ _id : mongoose.Types.ObjectId(pkgRes.assignedTo ) })
                      .select('profile.companyid -_id')
                      .exec(function( corpErr, corpRes) {
                          if (!corpErr){
                            if(corpRes && corpRes.profile && corpRes.profile.companyid){
                              var corpId = corpRes.profile.companyid;
                              cb(null, corpId);
                            } else {
                              cb("Error while fatching corporate detail.", null);
                            }
                          }else
                            cb("Error while fatching corporate detail.", null);
                      });

              } else {
                cb("Error while fatching package detail.", null);
              }
            });
  } catch(e) {
    console.log('error in corporateIdForSA ',e);
    cb("Internal server error.", null);
  }
}

function insertRoomData(obj, person, cb){
  try {
  obj['roomKey'] = Math.random().toString(36).slice(2);
  obj['users'] = [mongoose.Types.ObjectId(obj.uid)];
  obj['createdBy'] = mongoose.Types.ObjectId(obj.uid);
  obj['createdOn'] = moment().utc().toDate();
  obj['modifiedBy'] =  mongoose.Types.ObjectId(obj.uid);
  obj['modifiedOn'] = moment().utc().toDate();
  if(obj.categoryId == '')
    delete obj["categoryId"];
  // console.log("obj---", obj);
  let paymentFlag = false;
  let password = '';
  let orderId ='';
  if(obj.gatewayPayment){
   // console.log('from paymentportal')
    paymentFlag = obj.gatewayPayment;
    password    = obj.password;
    orderId = obj.orderId;
    delete obj["gatewayPayment"];
    delete obj["password"];
    delete obj["orderId"];
  }
  delete obj['uid'];
  
  checkRoomCount(obj.selPackage, function(error, response){
    /*console.log("error == ",error);
    console.log("response === ",response);*/
    if(error)
      cb(error, null);
    else if(response){
      createRoomMcu(obj.roomName, obj.selPackage, function(response, errMcu){
        // console.log("roomId--",roomId);
        let roomId = response;
        if (response != 'failed'){
          roomId = JSON.parse(response);
          roomId = roomId._id;
        
          obj['roomid'] = roomId;
          var roomObj = new Room(obj);
          roomObj.save((err, saved) => {
            if (err) {
              cb(err, null);
            }else{
              if(paymentFlag){
              if(person && person.email){
                var exchangeData = {
                  to : person.email,
                  whoCreated :person.email,
                  subject : 'Package Purchased !! Get details',
                  firstname : person.firstname,
                  order_id : orderId ,
                  password : password
                }
                EmailForCorporateCreation.createCorporateMail(exchangeData, function(emailerror, emailsuccess){
                  if(emailerror.status == false){
                    // res.json({ status: false, error: "Email not sent"});
                    cb("Email not sent", null);
                  }else{
                    // res.json({status:true, message:"Mail sent"});
                    cb(null, "Mail sent");
                  }
                });
              }else{
                // res.json({ status: false, error: "Can not find user"});
                cb(null, "Can not find user");
              }
              }else{
                let recordId = mongoose.Types.ObjectId(saved._id);
                var roomquery = Room.findOne({ _id : recordId });
                    roomquery.populate('selPackage corporateId', 'packageName features -_id businessName -_id')
                    .populate('users', 'firstname lastname email profile.profileImage')
                    .exec(function (roomerr, roomdoc) {
                        if(roomdoc){
                          // console.log("roomdoc === ",roomdoc);
                          // res.json({ status: true, data: roomdoc, message : "Created successfully."  });
                          cb(null, roomdoc);
                        }else{
                          console.log("roomerr === ",roomerr);
                          // res.json({ status: false, error : "Invalid Room." });
                          cb("Invalid Room", null);
                        }
                    });
              }
            }
          });
        } else {
          cb("Server down, Please try again", null);
        }
      });
    }
  });
  } catch(e) {
    console.log('error in insertRoomData',e);
    cb('Internal server error',null);
  }
}

function checkRoomCount(id, cb){
  try {
    let query = Package.findOne({ _id : id });
    query.exec(function(err, result){
      if(result){
        if(!result.roomCount)
          cb("Please update your package details", null);
        else if(result.roomCount == -1)
          cb(null, true);
        else{
          Room.count({ selPackage : id }, function(error, count){
            if (error) {
              console.log("error === ",error);
              cb("Internal server error, Please try again", null);
            } else if(count < result.roomCount)
              cb(null, true);
            else if(count >= result.roomCount)
              cb("You can't create new room, limit has been exceeded", null);
          });
        }
      }else{
        cb("Internal server error, Please try again", null);
      }
    });
  } catch(e) {
    console.log('error in checkRoomCount',e);
    cb("Internal server error, Please try again", null);
  }
}

/**
*  @Function name : listRoom
*  @Purpose : For fetching complete room data
*  @Request Object : query : { page, items, search }
*  @Response Object : Success - Room data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listRoom(req, res) {
	checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if (person != null ){
        let selector = {};

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }

        //Search selector based on user role
        if (person.role == Roles.Superadmin) {
          selector = {};
        } else if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.CRMadmin) {
          selector = {
            corporateId : bussinessID
          };
        } else {
          selector = {
            users : { $in :[person._id] }
          };
        }
        if (person.deviceType == 'IOS' || person.deviceType == 'ANDROID') {
          //Query for fetching complete room data based on selector and skip items based on itemsPerPage on previous page
          let query = Room.find(selector)
          .select('roomName roomType corporateId selPackage')
          .sort({
            createdOn: -1
          });
          query.populate('selPackage corporateId', 'packageName -_id businessName -_id')
          .exec(function(err, result) {
            if (err) {
              res.json({ status : false, error : err.message });
            } else {
              res.json({ status : true, data : result });
            }
          });
        } else if(req.query.items && req.query.page) {
          let listroom = req.query;        
        
          //If search is not empty then create RegExp
          if (listroom.search && listroom.search != '') {
            let slash_search = addSlash(listroom.search);
            let searchKey = RegExp(listroom.search,'i');
            selector['roomName'] = { $regex: searchKey };
          }

          //Query for fetching complete room data based on selector and skip items based on itemsPerPage on previous page
          let query = Room.find(selector)
          .limit(Number(listroom.items))
          .select('roomName roomType corporateId selPackage')
          .skip(Number(listroom.items) * (Number(listroom.page)-1));
          
           if (req.query.sort == 'undefined' || req.query.sort == undefined) {
            query.sort({ modifiedAt: -1 });
          } else {
            //console.log("sort === ", req.query.sort);
            query.sort(JSON.parse(req.query.sort));
          }
        
          //Query for counting complete room data based on selector
          let roomquery = Room.count(selector);

          query.populate('selPackage corporateId', 'packageName -_id businessName -_id')
          .exec(function(err, result) {
            if (err) {
              res.json({ status : false, error : err.message });
            } else {
              roomquery.exec(function(error, count){
                res.json({ status : true, data : result, count : count });
              });
            }
          }); 
        } else {
          res.json({ status: false, error : "Invalid request data." });
        }
      } else {
        res.json({ status: false, error : "Invalid request." });
      }
    } catch(e) {
      console.log("Error in list room", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchRoom
*  @Purpose : For fetching particular room data
*  @Request Object : params : { id: "room id" }
*  @Response Object : Success - Room data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchRoom(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);
          
          //Query for finding the room data based on room id
          var query = Room.findOne({ 
            _id : recordId 
          });
          query.populate('selPackage corporateId', 'packageValidity packageName features _id businessName _id')
          .populate({
            path : 'users',
            select : 'firstname lastname email profile.profileImage role',
            match : {
              userStatus : 'Active',
              guest : false
            }
          }) 
          .populate('categoryId', '_id categoryName')
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else if (doc) {
              //console.log("DATA===", doc);
              let key = 'conf/' + doc.roomKey;

              //Concatinating confLink to roomKey 
              doc['roomKey'] = serverConfig.confLink.concat(key);
              res.json({ 
                status: true, 
                data: doc 
              });
            } else {
              res.json({ 
                status: false, 
                error : "Invalid Room." 
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("Error in fetch room", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteRoom
*  @Purpose : For deleting room
*  @Request Object : params : { id: "room id" }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteRoom(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.params.id) {

        //Validating if room id is valid or not
        if (validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)){
          res.json({
            status: false, 
            error : "Invalid room."
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);

          //Query for finding room data
          var query = Room.findOne({ 
            _id : recordId 
          });
          query.exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else {
              getRoomUsersData(doc.users, req.params.id,function(err, usersData){
                if(usersData != null) {
                  //Used async parallel for running the tasks collection of functions in parallel, 
                  //without waiting until the previous function has completed.
                  //Used async refect to continue the execution of other tasks when a task fails.
                  async.parallel([
                    async.reflect(function(callback) {
                      var studentQuery = Student.remove({ 
                        roomId : recordId
                      });
                      studentQuery.exec(function (error, response) {
                        if (error) { 
                          callback(error.message)
                        } else {
                          callback(null)
                        }
                      });
                    }),
                    async.reflect(function(callback){
                      var topicQuery = Topic.remove({
                        roomId : recordId
                      });
                      topicQuery.exec(function (error, response) {
                        if (error) { 
                          callback(error.message) 
                        } else {
                          callback(null)
                        }
                      });
                    }),
                  ],
                  // optional callback
                  function(err, results) {
                    if (err) {
                      res.json({ 
                        status : false, 
                        error : err.message
                      });
                    } else {

                      //For finding error object in results
                      let errorObject = _.find(results, 'error');

                      //Verifying if error object is there or not
                      if (errorObject == undefined) {

                        //Query for removing room 
                        var innerquery = Room.remove({ 
                          _id : recordId 
                        });
                        innerquery.exec(function (error, response) {
                          if (error) { 
                            res.json({ 
                              status : false, 
                              error : error.message 
                            }); 
                          } else {
                            res.json({ 
                              status : true, 
                              message : "Deleted successfully." 
                            });

                            //createdBy: pranathi, disc: push notifications for android Users
                            if(usersData &&  usersData.length > 0) {
                              let message = 'The Room '+doc.roomName+' has been deleted.';
                                Users.find({_id:{ $in: usersData } })
                                .select('deviceType deviceId')
                                .exec(function(err, userData) {
                                  if(userData && userData.length > 0) {
                                     for (var i = 0; i <= userData.length - 1; i++) {
                                      if (userData[i].deviceType == 'ANDROID') {
                                        sendPushNotificationAndroid("DELETE-ROOM",message, userData[i].deviceId, person._id, userData[i]._id);
                                      }
                                    } 
                                  } 
                                });
                            }

                            //Log obj which need to be inserted in logger collection
                            // var logObj = {
                            //   logType : 'Room',
                            //   actionType : 'Deleted',
                            //   actionTime : moment().utc().toDate(),
                            //   uid : doc.createdBy,
                            //   details : {
                            //     name : doc.roomName,
                            //     corporateId : doc.corporateId,
                            //     packageId : doc.selPackage,
                            //     remoteAddress : req.connection.remoteAddress,
                            //     userAgent : req.headers['user-agent']
                            //   }
                            // }

                            // //Function for creating log on successful deletion of room
                            // createLog(logObj, function(status) {
                            //   if(status) {
                            //     // console.log(status);
                            //   }
                            // }); 
                          }
                        });
                      } else {
                        res.json({ 
                          status : false, 
                          error : "Error while deleteing room." 
                        }); 
                      }
                    }
                  });
                } 
              });
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("Error in delete room", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


export function getRoomUsersData(roomUsers, rId, callback) {
  let userIds = [];
   Student.find({roomId:rId},{ '_id': 0,'students':1 })
   .exec(function(err, studentsData) {
    if(err){
      callback(err.message, null);
    } else if(studentsData && studentsData.length > 0) {
      //pushing multiple array ids in to one array
        let  studentDupArrayIds = [];
        studentsData.forEach(function(data) {
           studentDupArrayIds = _.unionBy(data.students,studentDupArrayIds);
        });

        if(studentDupArrayIds.length > 0) {
            //seperating unique studentIds from studentDupIds array
            let stuIdObjData = new Set(studentDupArrayIds.toString().split(","))
            let studentArrayData = Array.from(stuIdObjData);
            let studentIds = [];
              for(let i=0; i< studentArrayData.length; i++) {
                studentIds.push(mongoose.Types.ObjectId(studentArrayData[i]));
              }
            userIds = roomUsers.concat(studentIds);
            callback(null, userIds);
        } else {
          callback(null, roomUsers)
        }
    } else {
      callback(null, roomUsers)
    }
  });
}

/**
*  @Function name : addRoomUser
*  @Purpose : For adding user to room
*  @Request Object : roomdata : { roomId: "room id", userId: 'user id' }
*  @Response Object : Success - Success message, Room data, Failure - Error message
*  @Author : Aniket Gupta
*/

//TODO - User Count validation
export function addRoomUser(req, res) {

  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if ( person != null && req.body.roomdata) {
        var obj = req.body.roomdata;

        //Validating if room and user id is valid or not 
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status: false, 
            error : "Invalid Room."
          });
        } else if (!obj.userId || validator.isEmpty(obj.userId) || !mongoose.Types.ObjectId.isValid(obj.userId)) {
          res.json({
            status: false, 
            error : "Invalid UserId."
          });
        } else {

          //Query for finding room data
          let roomquery = Room.findOne( {
            _id: mongoose.Types.ObjectId(obj.roomId) 
          })
          .populate("selPackage", "continuousPresence");
          roomquery.exec( function(roomerr, room) {
            if (roomerr) {
              res.json({
                status: false, 
                error: "Room not found."
              })
            } else {
              let userId = obj.userId;
              
              //For adding user to room
              Room.update( {
                _id: mongoose.Types.ObjectId(obj.roomId), 
                users : {
                  $nin : [userId] 
                }
              }, { 
                $push: { 
                  users: userId 
                } 
              }, function (error, result) {
                if (error) { //TODO - user present in any other room
                  // console.log("update error == ",error);
                  res.json({ 
                    status : false, 
                    error: error.message, 
                    message : "User already present in current room." 
                  });
                } else {

                  //For finding updated room data
                  var query = Room.findOne({ 
                    _id : mongoose.Types.ObjectId(obj.roomId) 
                  });
                  query.populate('selPackage corporateId', 'packageName features -_id businessName -_id')
                  .populate('users', 'firstname lastname email profile.profileImage role', { userStatus : 'Active', guest : false })
                  .exec(function (err, doc) {
                    
                    if (err){ 
                      res.json({ 
                        status: false, 
                        error : err.message, 
                        message : "Error while retriving room data." 
                      });
                    } else {
                      res.json({ 
                        status: true, 
                        data: doc, 
                        message : "User added successfully." 
                      });

                      let userquery = Users.findOne({_id : userId}).select('email firstname deviceType deviceId createdby');
                      userquery.exec(function(usererr, user){
                        if (user) {
                          let roomObj = {
                            userEmail : user.email,
                            subject : 'New User added to the Room.',
                            userBody : 'You have been added to the Room '+doc.roomName+ ' by '+person.firstname+'.',
                            operatorBody : 'You have successfully added ' + user.firstname + ' to the Room '+doc.roomName+'.',
                            email : person.email
                          };
                          sendRoomEmail(roomObj);

                          //createdBy: pranathi, disc: added push notifications for android users
                          let message = 'Your account has been added to the Room '+doc.roomName+'.';

                          if(user && user.deviceType == 'ANDROID') {
                            sendPushNotificationAndroid("ADD-ROOM", message, user.deviceId, person._id, user._id);
                          }
                        } 
                      });
                    }
                  });
                }
              });
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("Error in add room user", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : removeRoomUser
*  @Purpose : For removing user from room
*  @Request Object : params : { rid: "room id", id: 'user id' }
*  @Response Object : Success - Success message, Room data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function removeRoomUser(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.params.id && req.params.rid) {

        //Validating if room and user id is valid or not 
        if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid Room."
          });
        } else if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid UserId."
          });
        } else {

          //Query for finding room data
          var query = Room.findOne({ 
            _id : mongoose.Types.ObjectId(req.params.rid) 
          });
          query.exec(function(err, docs) {
            if (err) {
              res.json({
                status: false, 
                error: "Room not found."
              })
            } else {
              let userId = req.params.id;

              //Query for finding user data
              var query = Users.findOne({ 
                _id : mongoose.Types.ObjectId(userId) 
              });
              query.exec(function (err, user) {
                if (err) {
                  res.json({ 
                    status: false, 
                    error : "Unauthorized user." 
                  });
                }

                //If user is present in database
                if (user) {

                  //Verifying if user to be removed is instructor or not
                  if (user.role == Roles.Instructor) {

                    //Query for removing user from room
                    Room.update( {
                      _id: mongoose.Types.ObjectId(req.params.rid)
                    }, { 
                      $pull: { 
                        users: userId 
                      } 
                    }, function (error, result) {
                      if (error) { //TODO - user present in any other room
                        res.json({ 
                          status : false, 
                          error: error.message, 
                          message : "User not present in current room." 
                        });
                      } else {
                        let roomObj = {
                          userEmail : user.email,
                          subject : 'User Removed from the Course.',
                          userBody : 'You have been removed from the Course ' + docs.roomName + ' by '+ person.firstname + '.',
                          operatorBody : 'You have successfully removed ' + user.firstname + ' from the Course ' +docs.roomName+'.',
                          email : person.email
                        };
                        sendRoomEmail(roomObj);

                        //createdBy: pranathi, disc: push notifications  for android users
                        let message = 'Your account has been removed from the Room '+ docs.roomName +'.';
                        if(user && user.deviceType == 'ANDROID') {
                            sendPushNotificationAndroid("REMOVE-ROOM", message, user.deviceId, person._id, user._id);
                          }

                        Student.findOne({roomId : mongoose.Types.ObjectId(req.params.rid), instId : userId})
                        .select('students')
                        .exec(function(error, stuData){
                          if(!error) {
                            //Query for removing students assigned to instructor
                            Student.remove({
                              roomId : mongoose.Types.ObjectId(req.params.rid), 
                              instId : userId
                            }, function (error, sturesult) {
                              if (error) { //TODO - user present in any other room
                                console.log("errr", error)
                                res.json({ 
                                  status : false, 
                                  error: error, 
                                  message : error.message 
                                });
                              } else {
                                let stuQuery = Schedule.remove ({
                                                                  roomId : req.params.rid,
                                                                  createdBy : userId,
                                                                  startTime : {$gte : moment.utc().toDate() }
                                                                }, function(stuErr, stures){
                                                                 if (stuErr) {
                                                                  res.json ({
                                                                    status : false,
                                                                    error : error
                                                                  });
                                                                 }
                                                                })
                                //Query for finding updated room data
                                var query = Room.findOne({ 
                                  _id : mongoose.Types.ObjectId(req.params.rid) 
                                });
                                query.populate('selPackage', 'packageName features -_id')
                                .populate('corporateId', 'businessName -_id')
                                .populate('users', 'firstname lastname email profile.profileImage role', { userStatus : 'Active', guest : false })
                                .exec(function (err, doc) {
                                  if (err){ 
                                    res.json({ 
                                      status: false, 
                                      error : err.message, 
                                      message : "Error while retriving room data." 
                                    });
                                  } else { 
                                    // console.log("doc === ", doc);
                                    res.json({ 
                                      status: true, 
                                      data: doc, 
                                      message : "User removed successfully." 
                                    });

                                    //createdBy: pranathi, disc: push notifications for android users
                                    if(stuData && stuData.students && stuData.students.length > 0) {
                                      let message = 'Your account has been removed from the Room '+ docs.roomName +'.';
                                      Users.find({_id:{$in:stuData.students}})
                                      .select('deviceType deviceId')
                                      .exec(function(stuErr, stuData) {
                                        for(var i = 0; i <= stuData.length - 1; i++) {
                                          if( stuData[i].deviceType == 'ANDROID') {
                                            sendPushNotificationAndroid("REMOVE-ROOM", message, stuData[i].deviceId, person._id, stuData[i]._id);
                                          }
                                        }
                                      });
                                    }
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  } else {
                    //Query for removing user from room
                    Room.update({
                      _id: mongoose.Types.ObjectId(req.params.rid)
                    }, { 
                      $pull: { 
                        users: userId 
                      } 
                    }, function (error, result) {
                      if (error) { //TODO - user present in any other room
                        res.json({ 
                          status : false, 
                          error: error.message, 
                          message : "User not present in current room." 
                        });
                      } else {
                        let roomObj = {
                          userEmail : user.email,
                          subject : 'User Removed from the Room.',  
                          userBody : 'You have been removed from the Room ' + docs.roomName + ' by '+ person.firstname + '.',
                          operatorBody : 'You have successfully removed ' + user.firstname + ' from the Room ' +docs.roomName+'.',
                          email : person.email
                        };
                        sendRoomEmail(roomObj);

                        //createdBy: pranathi, disc: push notifications for android users
                        let message = 'Your account has been removed from the Room '+ docs.roomName +'.';
                        if(user && user.deviceType == 'ANDROID') {
                            sendPushNotificationAndroid("REMOVE-ROOM", message, user.deviceId, person._id, user._id);
                          }

                        let scheduleQuery = Schedule.remove({
                                                            roomId : req.params.rid, 
                                                            createdBy : userId, 
                                                            startTime : { $gte: moment().utc().toDate() }  
                                                          }, function(scherror, schres){
                                                            if (scherror) {
                                                              res.json ({
                                                                status : false,
                                                                error : error
                                                              });
                                                             }
                                                          });
                        //Query for finding updated room data
                        var query = Room.findOne({ 
                          _id : mongoose.Types.ObjectId(req.params.rid) 
                        });
                        query.populate('selPackage corporateId', 'packageName features -_id businessName -_id')
                        .populate('users', 'firstname lastname email profile.profileImage role', { userStatus : 'Active', guest : false })
                        .exec(function (e, doc) {
                          if (e) { 
                            res.json({ 
                              status: false, 
                              error : e.message, 
                              message : "Error while retriving room data." 
                            });
                          } else {
                            res.json({ 
                              status: true, 
                              data: doc, 
                              message : "User removed successfully." 
                            });
                            //createdBy: pranathi, disc: push notifications for android devices
                            let message = 'Your account has been removed from the Room '+docs.roomName+'.';
                            if(user && user.deviceType == 'ANDROID') {
                              sendPushNotificationAndroid("REMOVE-ROOM", message, user.deviceId, person._id, user._id);
                            }
                          }
                        });
                      }
                    });
                  }
                }
              });
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("Error in remove room user", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

function sendRoomEmail (obj) {
  let exchangeData = {
    to : obj.userEmail,
    subject : obj.subject,
    body : obj.userBody,
    descreption : 'Ignore mail if not relevant.'
  };

  //Note : Commented for temparary bases to sending email notification for users when 
  //add room user, remove room user, add room student, remove room student and add group students.

  // EmailForUserCreation.defaultUserMail(exchangeData, function(emailerror, emailsuccess) {
  //   //console.log(emailerror.status)
  //   if (emailerror.status == false) {
  //     console.log("Email not sent");
  //     } else {
  //     //console.log('email sent')
  //   }
  // });

  let myMailData = {
    to : obj.email,
    subject : obj.subject,
    body : obj.operatorBody,
    descreption : 'Ignore mail if not relevant.'
  };

  //Note : Commented for temparary bases to sending email notification for login user when 
  //add room user, remove room user, add room student, remove room student and add group students.

  // EmailForUserCreation.defaultUserMail(myMailData, function(emailerror, emailsuccess) {
  //   //console.log(emailerror.status)
  //   if (emailerror.status == false) {
  //     console.log("Email not sent");
  //   } else {
  //     //console.log('email sent')
  //   }
  // });
}

// export function fetchRoomUser(req, res) {
//   console.log("fetchRoomUser function req---", req.body.roomdata);
//   if(req.body.roomdata){
//     var obj = req.body.roomdata;
//     if(!obj.id || validator.isEmpty(obj.id) || !mongoose.Types.ObjectId.isValid(obj.id)){
//       res.json({status: false, error : "Invalid room."});
//     }else{
//       var recordId = mongoose.Types.ObjectId(req.body.roomdata.id);
//       //console.log("recordId == ",recordId);
//       var query = Room.findOne({ _id : recordId });
//       query.populate('users', 'firstname lastname email profile.profileImage')
//       .exec(function (err, doc) {
//           if (err){ res.json({ status: false, error : err }); }
//           else{
//             // console.log("Room Users=====", doc.users);
//             res.json({ status: true, data: doc });
//           }
//       });
//     }
//   }else{
//     res.json({status: false, error : "Invalid request."});
//   }
// }

export function getPackageIds(req, res){
  let options = [['', 'Select Package']];

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null) {
        let query = null;
        if(person.role == Roles.Superadmin){
          query = Package.find({});
        }else if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {
          query = Package.find({ "assignedTo": mongoose.Types.ObjectId(person._id)});
        } 
        if(query != null){ 
          query.exec(function (error, doc) {
            if (doc && doc.length > 0) { 
              _.forIn(doc, function(value, key) {
                options.push([value._id, value.packageName]);
              });
              res.json({ data : options});
            } else res.json({ data : options});
          });
        } else res.json({ data : options});
      } else res.json({data : options});
    } catch(e) {
      console.log("error in getPackageIds",e);
      res.json({data : options});
    }
  });
}

export function getCategoryIds(req, res){

  let options = [['', 'Select Category']];

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null) {

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.CRMadmin) {
          let query = Category.find({ corporateId : mongoose.Types.ObjectId(bussinessID)});
          query.exec(function (error, doc) {
            if (doc) { 
              _.forIn(doc, function(value, key) {
                options.push([value._id, value.categoryName]);
              });
              res.json({ data : options});
            } else res.json({ data : options});
          });
        } else res.json({ data : options});
      } else res.json({data : options});
    } catch(e) {
      console.log("error in getCategoryIds ",e);
      res.json({data : options});
    }
  });
}

/**
*  @Function name : saveRoomTopic
*  @Purpose : For creating topic in room
*  @Request Object : roomtopicdata : { room topic data }
*  @Response Object : Success - Success message, Topic data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveRoomTopic(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.body.roomtopicdata) {
        var obj = req.body.roomtopicdata;

        //Validating if room id is valid or not
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status: false, 
            error : "Invalid Room."
          });
        } else {

          //Query for finding room data
          var query = Room.findOne({ 
            _id : mongoose.Types.ObjectId(obj.roomId) 
          });
          query.exec(function(err, docs) {
            if (err) {
              res.json({
                status: false, 
                error: "Room not found."
              })
            } else {
              if (!obj._id || validator.isEmpty(obj._id) || !mongoose.Types.ObjectId.isValid(obj._id)) {
                obj['createdBy'] = mongoose.Types.ObjectId(person._id);
                delete obj['uid'];

                //Function calling for checking topic count
                /*checkTopicCount(obj.roomId, function(topicerr, response) {
                  if (response != null) {*/
                    const objUser = new Topic(obj);

                    //Query for creating topic
                    Topic.create([objUser], (error, data) => {
                      if (!error) {
                        res.json({ 
                          status: true, 
                          data: data[0], 
                          message : "Created successfully."  
                        });
                      } else {
                        let errors = [];
                        if (error.name == 'ValidationError') { 
                          for (let field in error.errors) {
                           errors.push(error.errors[field].message); 
                          }
                        }             
                        res.json({ 
                          status: false, 
                          error: errors 
                        });
                      }
                    }); 
                  /*} else {
                    let errorResponse = topicerr.message ? topicerr.message : topicerr;
                    res.json({ 
                      status  : false, 
                      error : errorResponse 
                    });
                  }
                });*/  
              }
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("error in save room topic", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : updateRoomTopic
*  @Purpose : For updating topic in room
*  @Request Object : roomtopicdata : { room topic data }
*  @Response Object : Success - Success message, Topic data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function updateRoomTopic(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.params.id && req.body.roomtopicdata){
        var obj = req.body.roomtopicdata;

        //Validating if room id is valid or not
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status: false, 
            error : "Invalid Room."
          });
         } else {

          //Query for fetching the details of room
          var query = Room.findOne({ 
            _id : mongoose.Types.ObjectId(obj.roomId) 
          });
          query.exec(function(err, docs) {
            if (err) {
              res.json({
                status: false, 
                error: "Room not found."
              })
            } else {

              //Query for fetching the details of topic
              var topicQuery = Topic.findOne({
                _id :mongoose.Types.ObjectId(req.params.id) 
              });
              delete obj['uid'];

              topicQuery.exec(function(error,data) {
                if (error) {
                  res.json({
                    status: false,
                    error: error.message
                  })
                } else {
                  var recordId = req.params.id;

                  //If data is present then update the topic
                  Topic.update({ 
                    _id : recordId 
                  },{ 
                    $set : obj 
                  },{ 
                    runValidators: true 
                  },function (updateerror, doc) {
                    if (updateerror) {
                      res.json({
                        status: false,
                        error: updateerror.message
                      })
                    } else {

                      //Query for sending the updated record to the client
                      var query = Topic.findOne({ 
                        _id : recordId 
                      });
                      query.exec(function (e, topicDoc) {
                        if (e) { 
                          res.json({ 
                            status: false, 
                            error : e 
                          }); 
                        } else {
                          res.json({ 
                            status: true, 
                            data: topicDoc, 
                            message : "Updated successfully." 
                          });
                          //createdBy: pranathi, disc: added push notifications
                          if(topicDoc.topicEnable == true) {
                            let message = "The topic "+topicDoc.topicName +" has been updated to the Room.";
                            roomStudentData(topicDoc.roomId,function(error, studentIds) {
                              if(studentIds != null) {
                                Users.find({_id:{ $in: studentIds }})
                                .select("deviceType deviceId")
                                .exec(function(stuErr, stuData) {
                                  if(stuData) {
                                    if ( stuData.length > 0) {
                                      for (var i = 0; i <= stuData.length - 1; i++) {
                                        if (stuData[i].deviceType == 'ANDROID') {
                                          sendPushNotificationAndroid("UPDATE-TOPIC", message, stuData[i].deviceId, person._id, stuData[i]._id);
                                        }
                                      }
                                    }
                                  }
                                });
                              }
                            });
                          }
                        }
                      });
                    }
                  });
                }
              })           
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("error in update room topic", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

export function checkTopicCount(rid, cb){
  try {
    let query = Room.findOne({ _id : rid })
                .populate('selPackage', 'topicCount')
                .select('selPackage');
    query.exec( function(error, data){
      // console.log("data === ",data);
      if (data){
        let count = data.selPackage && data.selPackage.topicCount ? data.selPackage.topicCount : 0;
        if (count == 0){
          cb('Please update your package, and try again', null);
        } else if (count == -1){
          cb(null, true);
        }
        else{
          Topic.count({ roomId : rid }, function(err, c){
            // console.log("err === ",err);
            // console.log("c === ",c);
            if(err){
              cb('Internal server error', null);
            }else{
              if(c < count)
                cb(null, true);
              else
                cb("You can't create new topic, limit has been exceeded", null );
            }
          });
        }
      }else{
        cb(error, null);
      }
    });
  } catch(e) {
    console.log('error in checkTopicCount',e);
    cb("Internal server error", null );
  }
}

/**
*  @Function name : listRoomTopic
*  @Purpose : For fetching topic data based on room
*  @Request Object : query : { roomId, page, items, search }
*  @Response Object : Success - Topic data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listRoomTopic(req, res) {
  checkValidRequest(req.headers, function(person) {
    //console.log('req.query.page', req.query.page);
    try {

      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page || !req.query.roomId) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let listroom = req.query;
        let selector = {};

        //Search selector based on user role
        if (person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Moderator || person.role == Roles.Presenter || person.role == Roles.User || person.role == Roles.Instructor) {
          selector = {
             roomId : listroom.roomId,
             $or : [{createdBy : person._id}, {topicEnable : true}]

          };


          //If search is not empty then create RegExp
          if (listroom.search && listroom.search != '') {
            let slash_search = addSlash(listroom.search);
            let searchKey = RegExp(slash_search, 'i');         
            selector['$or'] = [                
              { 'topicName' : {$regex: searchKey} },
              { 'description' : {$regex: searchKey} }
            ]; 
          }

          //Query for fetching complete topic data based on selector and skip items based on itemsPerPage on previous page
          let query = Topic.find(selector)
          .limit(Number(listroom.items))
          .select('topicName description roomId topicEnable createdBy')
          .skip(Number(listroom.items) * (Number(listroom.page)-1))
          // .sort({
          //   createdAt: -1
          // })
          if (req.query.sort == 'undefined' || req.query.sort == undefined) {
            query.sort({ modifiedAt: -1 });
          } else {
            //console.log("sort === ", req.query.sort);
          query.sort(JSON.parse(req.query.sort));
          }
             
          query.exec(function(err, result) {
            if (err) {
              res.json({ 
                status : false, 
                error : err.message 
              });
            } else {
              
              //Query for counting complete topic data based on selector
              Topic.count(selector).exec(function(error, count) {
                res.json({ 
                  status : true, 
                  data : result, 
                  count : count 
                });
              });
            }
          });
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("error in list room topic", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchRoomTopic
*  @Purpose : For fetching particular topic data
*  @Request Object : params : { id: "topic id", rid: "room id" }
*  @Response Object : Success - Topic data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchRoomTopic(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !req.params.rid) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id and topic id is valid or not
        if ( validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else if (validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid topic"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);

          //Query for finding the topic data based on topic id
          var query = Topic.findOne({ 
            _id : recordId 
          })
          .populate('questionnaire.questionnaireId', 'questionnaireName')           
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : 'Invalid Topic' 
              }); 
            } else if (doc) {
              res.json({ 
                status: true, 
                data: doc 
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("error in fetch room topic", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/*
@Function Name : addRoomStudent
@Purpose : "To add selected student which is sent from client side in students collection"
@Request Object : studentdata:{roomId,instId, userId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function addRoomStudent(req, res){
  
  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.body.studentdata) {
        var obj = req.body.studentdata;
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status: false,
            error : "Invalid Room."
          });
        } else if (!obj.userId || validator.isEmpty(obj.userId) || !mongoose.Types.ObjectId.isValid(obj.userId)) {
          res.json({
            status: false,
            error : "Invalid Student."
          });
        } else {
          let objSave = {};
          //Query for finding room data
          let roomquery = Room.findOne( {
            _id: mongoose.Types.ObjectId(obj.roomId) 
          }).select('roomName');
          roomquery.exec( function(roomerr, room) {
            if (room) {

              //Fectching student data
              Student.findOne({
                "roomId": mongoose.Types.ObjectId(obj.roomId), 
                "instId": mongoose.Types.ObjectId(obj.instId)
              }).exec(function (error, student) {
                if (error) {
                  res.json({ 
                    status: false,
                    error : "Error while fatching room data." 
                  });
                } if(student) { 

                  //Verifying whether the student added to instructor or not
                  Student.update({ 
                    "roomId": mongoose.Types.ObjectId(obj.roomId), 
                    "instId": mongoose.Types.ObjectId(obj.instId), 
                    students : {
                      $nin : [mongoose.Types.ObjectId(obj.userId)] 
                    }
                  }, 
                  { 
                    $push: { 
                      students: mongoose.Types.ObjectId(obj.userId) 
                    }, 
                    modifiedBy: mongoose.Types.ObjectId(obj.uid), 
                    modifiedOn: moment().utc().toDate() 
                  }).exec(function (err, doc) {
                    if (err) {
                      res.json({ 
                        status : false, 
                        error: error, 
                        message : "Student already added to current Instructor." 
                      });
                    } else {
                      Student.findOne({ 
                        "roomId": mongoose.Types.ObjectId(obj.roomId),
                        "instId": mongoose.Types.ObjectId(obj.instId) 
                      })
                      .select('roomId instId students')
                      .populate('instId students', 'firstname lastname email profile.profileImage role', { userStatus : 'Active', guest : {$exists : false}, guest : false })
                      .populate('roomId', 'roomName')
                      .exec(function (err1, doc1) {
                        if (err1) { 
                          res.json({ 
                            status: false, 
                            error : err1.message 
                          }); 
                        } else {
                          res.json({ 
                            status: true, 
                            data: doc1, 
                            message : "User added successfully." 
                          });
                          let userquery = Users.findOne({_id : obj.userId}).select('email firstname deviceId deviceType');
                            userquery.exec(function(usererr, user){
                            if (user) {
                              let roomObj;
                              if (person.role == Roles.Lmsadmin) {
                                roomObj = {
                                  userEmail : user.email,
                                  subject : 'New Student added to the  Course.',
                                  userBody : 'You have been added to the Course ' +room.roomName+' by '+person.firstname+'.',
                                  operatorBody : 'You have successfully added ' + user.firstname + ' to the Course ' +room.roomName+'.',
                                  email : person.email
                                };

                                let instructorMailData = {
                                  to : doc1.instId.email,
                                  subject : 'New Student added to the  Course.',
                                  body : 'New Student has been added to the Course '+room.roomName+' by '+person.firstname+'.',
                                  descreption : 'Ignore mail if not relevant.'
                                };

                                //createdBy: pranathi, disc: push notification for android students 
                                let message = 'Your account has been added to the Room '+room.roomName+'.';
                                if(user && user.deviceType == 'ANDROID') {
                                  sendPushNotificationAndroid("ADD-STUDENT", message, user.deviceId, person._id, user._id);
                                }

                                //push notification for instructor
                                if(doc1) {
                                  Users.findOne({_id : doc1.instId._id})
                                  .select('deviceId deviceType')
                                  .exec(function(error, insData){
                                    let insMessage = 'Student '+ user.firstname +' has been added to the Room '+room.roomName+'.';
                                    if(insData && insData.deviceType == 'ANDROID') {
                                      sendPushNotificationAndroid("ADD-INS", insMessage, insData.deviceId, person._id, insData._id);
                                    }
                                  });
                                }

                                // Commented for temporary bases 
                                // Email will be sent to instructor when admin add student under the instructor
                                
                                // EmailForUserCreation.defaultUserMail(instructorMailData, function(emailerror, emailsuccess) {
                                //   if (emailerror.status == false) {
                                //     console.log("Email not sent");
                                //   } else {
                                //     //console.log('email sent')
                                //   }
                                // });
                                sendRoomEmail(roomObj);
                              } else {
                                roomObj = {
                                  userEmail : user.email,
                                  subject : 'New Student added to the  Course.',
                                  userBody : 'You have been added to the Course ' +room.roomName+' by '+person.firstname+'.',
                                  operatorBody : 'You have successfully added ' + user.firstname + ' to the Course ' +room.roomName+'.',
                                  email : person.email
                                }
                                sendRoomEmail(roomObj);
                                //createdBy: pranathi, disc: added push notifications for android students
                                let message = 'Your account has been added to the Room ' +room.roomName+'.';
                                if(user && user.deviceType == 'ANDROID') {
                                  sendPushNotificationAndroid("ADD-STUDENT", message, user.deviceId, person._id, user._id);
                                }
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                } else { 

                  //Create
                  objSave['roomId'] = mongoose.Types.ObjectId(obj.roomId);
                  objSave['instId'] = mongoose.Types.ObjectId(obj.instId);
                  objSave['students'] = [mongoose.Types.ObjectId(obj.userId)];
                  objSave['createdBy'] = mongoose.Types.ObjectId(obj.uid);
                  objSave['modifiedBy'] =  mongoose.Types.ObjectId(obj.uid);
                  var studentObj = new Student(objSave);
                  studentObj.save((err, saved) => {
                    if (err) {
                      res.json({ 
                        status : false,
                        error : err 
                      });
                    } else {

                      Student.findOne({ _id : saved._id })
                      .select('roomId instId students')
                      .populate('instId students', 'firstname lastname email profile.profileImage role', { userStatus : 'Active', guest : {$exists : false}, guest : false })
                      .populate('roomId', 'roomName')
                      .exec(function (err1, doc1) {
                        if (err1){ 
                          res.json({ 
                            status: false,
                            error : err1 
                          }); 
                        } else{
                          res.json({ 
                            status: true,
                            data: doc1,
                            message : "User added successfully." 
                          });
                          let userquery = Users.findOne({_id : obj.userId}).select('email firstname deviceId deviceType');
                          userquery.exec(function(usererr, user){
                            //console.log(user)
                            if (user) {
                              let roomObj = {
                                userEmail : user.email,
                                subject : 'New Student added to the Course.',
                                userBody : 'You have been added to the Course ' +room.roomName+' by '+person.firstname+'.',
                                operatorBody : 'You have successfully added ' + user.firstname + ' to the Course ' +room.roomName+'.',
                                email : person.email
                              };
                              sendRoomEmail(roomObj);
                              //createdBy: pranathi, disc: added push notifications for android student
                              let message = 'Your account has been added to the Room ' +room.roomName+'.';
                              if(user && user.deviceType == 'ANDROID') {
                                sendPushNotificationAndroid("ADD-STUDENT", message, user.deviceId, person._id, user._id);
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      } else {
        res.json({
          status: false,
          error: "InValid Request"
        })
      }
    } catch(e) {
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });   
}

/*
@Function Name : fetchstudent
@Purpose : "To fetch all the user which are present in a particular room and instructor "
@Request Object : params:{roomId, instId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function fetchstudent(req, res){ 
  
  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.params) {
      
        let obj = req.params;
        
        //Validation against roomId        
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status: false,
            error : "Invalid room"
          });
        } else if (!obj.instId || validator.isEmpty(obj.instId) || !mongoose.Types.ObjectId.isValid(obj.instId)) {
          res.json({
            status: false,
            error : "Invalid instructor"
          });
        } else {
          
          //Firing a query to get documents matching roomId and instId
          Student.findOne({
            "roomId": mongoose.Types.ObjectId(obj.roomId),
            "instId": mongoose.Types.ObjectId(obj.instId) 
          })
          .select('roomId instId students')
          .populate('instId students', 'firstname lastname email profile.profileImage role', { userStatus : 'Active', guest : {$exists : false}, guest : false })
          .populate('roomId', 'roomName')
          .exec(function (err1, doc1) {
            if (err1){ 
              res.json({ 
                status: false,
                error : err1.message 
              }); 
            } else if (doc1) {
              res.json({ 
                status: true,
                data: doc1 
              });
            } else {
              res.json({ 
                status: true,
                data: doc1 
              });
            }
          });          
        }
      } else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }     
    } catch(e) {
      console.log('error in fetchstudent',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });   
}

/*
@Function Name : removeRoomStud
@Purpose : "To fetch all the user which are present in a particular room and instructor "
@Request Object : params:{roomId, instId, studId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function removeRoomStud(req, res) {
  
  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.params){
        var obj = req.params;

        //Validating for roomId and studentId
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status: false,
            error : "Invalid Room."
          });
        } else if (!obj.studId || validator.isEmpty(obj.studId) || !mongoose.Types.ObjectId.isValid(obj.studId)) {
          res.json({
            status: false,
            error : "Invalid Student Id."
          });
        } else if (!obj.instId || validator.isEmpty(obj.instId) || !mongoose.Types.ObjectId.isValid(obj.instId)) {
          res.json({
            status: false,
            error : "Invalid instructor."
          });
        } else {
          //Query for finding room data
          let roomquery = Room.findOne( {
            _id: mongoose.Types.ObjectId(obj.roomId) 
          }).select('roomName');
          roomquery.exec( function(roomerr, room) {
            if (room) {

              //Firing a query to get document based on roomId and instId
              Student.findOne({ 
                "roomId": mongoose.Types.ObjectId(obj.roomId), 
                "instId": mongoose.Types.ObjectId(obj.instId) 
              })
              .exec(function(err, docs) {
                if (err) {
                  res.json({
                    status: false,
                    error: "Room with this instructor not found."
                  })
                } else {

                  //Updating the student document by removing student 
                  Student.update(
                    {
                      _id: mongoose.Types.ObjectId(docs._id)
                    }, 
                    { 
                      $pull: { 
                        students: mongoose.Types.ObjectId(obj.studId) 
                      } 
                    }).exec(function (error, result) {
                    if (error) { //TODO - user present in any other room
                      res.json({
                        status : false,
                        error: error,
                        message : "User not present in current room."
                      });
                    } else {

                      //Firing the query to get document so as to send to client side
                      Student.findOne({ 
                        "roomId": mongoose.Types.ObjectId(obj.roomId),
                        "instId": mongoose.Types.ObjectId(obj.instId) 
                      })
                      .select('roomId instId students')
                      .populate('instId students', 'firstname lastname email profile.profileImage role', { userStatus : 'Active', guest : {$exists : false}, guest : false })
                      .populate('roomId', 'roomName')
                      .exec(function (err1, doc1) {
                        if (err1) { 
                          res.json({ 
                            status: false,
                            error : err1,
                            message : "Error while retriving room data." 
                          }); 
                        } else {
                          res.json({ 
                            status: true, 
                            data: doc1,
                            message : "User removed successfully." 
                          });
                          let userquery = Users.findOne({_id : obj.studId}).select('email firstname deviceType deviceId');
                          userquery.exec(function(usererr, user){
                            if (user) {
                              let roomObj
                              if(person.role == Roles.Lmsadmin) {
                                roomObj = {
                                  userEmail : user.email,
                                  subject : 'Student removed from the Course.',
                                  userBody : 'You have been removed from the Course ' +room.roomName+' by '+person.firstname+'.',
                                  operatorBody : 'You have successfully removed ' + user.firstname + ' from the Course ' +room.roomName+'.',
                                  email : person.email
                                };
                                let instructorMailData = {
                                  to : doc1.instId.email,
                                  subject : 'Student removed from the Course..',
                                  body : 'Student has been removed from the Course '+room.roomName+' by '+person.firstname+'.',
                                  descreption : 'Ignore mail if not relevant.'
                                };

                                //createdBy: pranathi, disc: push notification for android student 
                                let message = 'Your account has been removed from the Room ' +room.roomName+'.';
                                if(user && user.deviceType == 'ANDROID') {
                                  sendPushNotificationAndroid("REMOVE-STUDENT", message, user.deviceId, person._id, user._id);
                                }

                                //push notification for instructor
                                if(doc1) {
                                  Users.findOne({_id : doc1.instId._id})
                                  .select('deviceId deviceType')
                                  .exec(function(error, insData){
                                    let insMessage = 'Student '+user.firstname+' has been removed from the Room '+room.roomName+'.';
                                    if(insData && insData.deviceType == 'ANDROID') {
                                      sendPushNotificationAndroid("REMOVE-INS", insMessage, insData.deviceId, person._id, insData._id);
                                    }
                                  });
                                }
                                // Commented for temporary bases
                                // Email will be sent to instructor when admin remove student under the instructor
                                
                                // EmailForUserCreation.defaultUserMail(instructorMailData, function(emailerror, emailsuccess) {
                                //   if (emailerror.status == false) {
                                //     console.log("Email not sent");
                                //   } else {
                                //     //console.log('email sent')
                                //   }
                                // });
                                sendRoomEmail(roomObj);
                              } else {
                                roomObj = {
                                  userEmail : user.email,
                                  subject : 'Student removed from the Course.',
                                  userBody : 'You have been removed from the Course ' +room.roomName+' by '+person.firstname+'.',
                                  operatorBody : 'You have successfully removed ' + user.firstname + ' from the Course ' +room.roomName+'.',
                                  email : person.email
                                };
                                sendRoomEmail(roomObj);

                                //createdBy: pranathi, disc:  push notifications for android user
                                let message = 'Your account has been removed from the Room ' +room.roomName+'.';
                                if(user && user.deviceType == 'ANDROID') {
                                  sendPushNotificationAndroid("REMOVE-STUDENT", message, user.deviceId, person._id, user._id);
                                }
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      } else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }     
    } catch(e) {
      console.log('error in removeRoomStud',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });   
}


/**
*  @Function name : deleteTopic
*  @Purpose : For deleting topic
*  @Request Object : params : { id: "topic id" }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteTopic(req,res) {
  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person != null && req.params.id) {

        //Validating if topic id is valid or not
        if(validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)){
          res.json({
            status: false, 
            error : "Invalid Topic."
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);

          //Query for finding topic data
          var query = Topic.findOne({ 
            _id : recordId 
          });
          query.exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else {
              roomStudentData(req.params.rid, function(err, studentIds){
                if(studentIds != null) {
                  //Query for removing topic 
                  var innerquery = Topic.remove({ 
                    _id : recordId 
                  });
                  innerquery.exec(function (error, response) {
                    if (error) { 
                      res.json({ 
                        status : false, 
                        error : error.message 
                      }); 
                    } else {
                      res.json({ 
                        status : true, 
                        message : "Deleted successfully." 
                      });
                      //createdBy: pranathi, disc: push notification for android students
                      if( doc && doc.topicEnable == true ) {
                        let message = "The topic "+doc.topicName +" has been deleted from the Room.";
                        Users.find({ _id:{ $in:studentIds }})
                        .select('deviceType deviceId')
                        .exec(function(error, result) {
                          if (result && result.length > 0) {
                            for (var i = 0; i <= result.length - 1; i++) {
                              if (result[i].deviceType == 'ANDROID') {
                                sendPushNotificationAndroid("DELETE-TOPIC", message, result[i].deviceId, person._id, result[i]._id);
                              }
                            }
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("error in delete topic", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

export function roomStudentData(rId,callback) {
  let studentIds = [];
  Student.find({roomId:rId},{ '_id': 0,'students':1 })
   .exec(function(err, studentsData) {
    if(err){
      callback(err.message, null);
    } else if(studentsData && studentsData.length > 0) {
      //pushing multiple array ids in to one array
        let  studentDupArrayIds = [];
        studentsData.forEach(function(data) {
           studentDupArrayIds = _.unionBy(data.students,studentDupArrayIds);
        });

        if(studentDupArrayIds.length > 0) {
            //seperating unique studentIds from studentDupIds array
            let stuIdObjData = new Set(studentDupArrayIds.toString().split(","))
            let studentArrayData = Array.from(stuIdObjData);
            
            for(let i=0; i< studentArrayData.length; i++) {
              studentIds.push(mongoose.Types.ObjectId(studentArrayData[i]));
            }
            callback(null, studentIds);
        }
    } else {
      callback(null, studentIds);
    }
  });
}

/**
*  @Function name : fetchTopicQuestionnaire
*  @Purpose : For fetching questionnaire data while assigning questionnaire to topic
*  @Request Object : params : { rid: "room id", id: 'topic id' }
*  @Response Object : Success - Questionnaire data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchTopicQuestionnaire(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if(person == null || !req.params.rid || !req.params.id) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id and topic id is valid or not
        if ( validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else if (validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid topic"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);

          //Query for finding the topic data based on topic id
          var query = Topic.findOne({ 
            _id : recordId 
          })          
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : 'Invalid Topic' 
              }); 
            } 
            if (doc) {

              //Query for finding the room data based on room id
              var query = Room.findOne({ 
                _id : doc.roomId 
              })          
              .exec(function (err, doc) {
                if (err) { 
                  res.json({ 
                    status: false, 
                    error : 'Invalid Room' 
                  }); 
                } 
                if (doc) {

                  //Query for finding the questionnaire data based on corporate id
                  var query = Questionnaire.find({ 
                    corporateId : doc.corporateId 
                  })          
                  .exec(function (err, doc) {
                    if (err) { 
                      res.json({ 
                        status: false, 
                        error : 'Questionnaires not found' 
                      }); 
                    } 
                    if (doc) {
                      // console.log("DATA===", doc);
                      res.json({ 
                        status: true, 
                        data: doc 
                      });
                    }
                  });
                } else {
                  res.json({ 
                    status: false, 
                    error : 'Internal server error' 
                  }); 
                }
              });
            } else {
              res.json({ 
                status: false, 
                error : 'Internal server error' 
              }); 
            }
          });
        }
      }
    } catch(e) {
      console.log("error in fetch topic questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : assignQuestionnaire
*  @Purpose : For assigning questionnaire to topic
*  @Request Object : questionnaireData : { data: { questionnaire : { uid : "user id", topicId: "topic id", editId: "edit id", questionnaireId: 'questionnaire id', openFrom: 'open time', closeFrom: 'close time'} } }
*  @Response Object : Success - Success Message, Topic data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function assignQuestionnaire(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.body.questionnaireData || !req.body.questionnaireData.data) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {      
        var obj = req.body.questionnaireData.data.questionnaire;

        //If user has a valid role
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Instructor || person.role == Roles.Presenteradmin || person.role == Roles.Presenter || person.role == Roles.Moderator) {

          //Verifying if topic id is there or not
          if (obj.topicId && (obj.topicId != "" || obj.topicId != undefined) && mongoose.Types.ObjectId.isValid(obj.topicId)) {
            let recordId = mongoose.Types.ObjectId(obj.topicId);
            obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
            obj['modifiedAt'] = moment().utc().toDate();
            delete obj["topicId"];
            delete obj["uid"];

            //Query for finding the topic data
            var data = Topic.findOne({ 
              _id : recordId 
            })
            .exec(function (err, topicDoc) {

              //Verifying if topic data is thereor not
              if (topicDoc) {
                let roomValidateQuery = Room.findOne({ _id: topicDoc.roomId })
                  .populate('selPackage', 'packageValidity')
                  .populate('corporateId', 'businessType')
                  
                roomValidateQuery.exec(function (error, rData) {
                  if (error) {
                    res.json({
                      status: false
                    })
                  } else {
                    //Query for finding the questionnaire id in topic data
                    Topic.findOne({
                      _id: recordId,
                      "questionnaire.questionnaireId": obj.questionnaireId
                    }).exec(function (err, questionaryTopic) {
                      if (err) {
                        res.json({
                          status: false,
                          error: 'Invalid Questionnaire'
                        });
                      } else if (questionaryTopic) {

                        //If same questionnaire id is present then send error
                        res.json({
                          status: false,
                          error: 'Already this questionnaire is assigned to topic'
                        });
                      } else {

                        //Verifying if open and close time is there in req object or not
                        if (obj.openFrom && obj.closeFrom) {

                          //Query for finding the questionnaire data inside topic based on room id and check for time conflicts
                          Topic.findOne({
                            roomId: topicDoc.roomId,
                            "questionnaire.openFrom": { $lte: obj.closeFrom },
                            "questionnaire.closeFrom": { $gte: obj.openFrom }
                          }, {
                              "questionnaire.$": 1
                            })
                            .exec(function (err, timedoc) {
                              if (err) {
                                res.json({
                                  status: false,
                                  error: err.message
                                });
                              } else if (timedoc) {

                                //If time conflict is there send the error
                                res.json({
                                  status: false,
                                  error: 409,
                                  openFrom: timedoc.questionnaire[0].openFrom,
                                  closeFrom: timedoc.questionnaire[0].closeFrom
                                });
                              } else {
                                let startDate = new Date(obj.openFrom);
                                let closeDate = new Date(obj.closeFrom);
                                let roomExpiry = new Date(rData.expiryDate);
                                let currentTime = new Date();
                                let packageExpiry = new Date(rData.selPackage.packageValidity);
                                //checking whether start time and end time validation
                                if (startDate < currentTime ) {
                                  res.json({
                                    status: false,
                                    error: "Start time should be greater then current time"
                                  });
                                } else if (startDate > closeDate) {

                                  res.json({
                                    status: false,
                                      error: "End time should be greater then start time"
                                  })
                                } else if (closeDate > roomExpiry || closeDate > packageExpiry || !rData.expiryDate) {
                                    if(rData.corporateId.businessType == 'Conference'){
                                      res.json({
                                        status: false,
                                        error: 'This questionnaire End time can not exceed room expiry date'
                                      });
                                    }else {
                                      res.json({
                                        status: false,
                                        error: 'This questionnaire End time can not exceed course expiry date'
                                      });
                                    }
                                  } else {
                                    //Query for pushing questionnaire object in topic 
                                    Topic.update({
                                      _id: recordId
                                    }, {
                                        $push: {
                                          "questionnaire": obj
                                        }
                                      }, {
                                        runValidators: true
                                      }, function (err, doc) {
                                        // console.log("update err == ",err);
                                        // console.log("update doc == ",doc);
                                        if (err) {
                                          res.json({
                                            status: false,
                                            error: err.message
                                          });
                                        } else {

                                          //Query for finding updated topic data 
                                          var query = Topic.findOne({
                                            _id: recordId
                                          })
                                          query.populate('questionnaire.questionnaireId', 'questionnaireName')
                                          query.exec(function (err, topic) {
                                            if (err) {
                                              res.json({
                                                status: false
                                              });
                                            } else {
                                              res.json({
                                                status: true,
                                                data: topic,
                                                message: "Updated successfully."
                                              });
      
                                              //createdBy: pranathi, disc: push notifications  for android students
                                              if(topic && topic.topicEnable) {
                                                let message = 'A New Questionnaire '+topic.questionnaire[0].questionnaireId.questionnaireName +' has been added to Topic '+ topic.topicName+ ' at '+ moment(startDate).utc().format('DD-MM-YYYY hh:mm A') +'(UTC) to ' +moment(closeDate).utc().format('DD-MM-YYYY hh:mm A')+ '(UTC).';
                                                if (serverConfig.mail_timezone && serverConfig.mail_timezone.zone) {
                                                  message = 'A New Questionnaire '+topic.questionnaire[0].questionnaireId.questionnaireName +' has been added to Topic '+ topic.topicName+ ' at '+ moment(startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') +'('+serverConfig.mail_timezone.code +') to ' +moment(closeDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A')+ '('+ serverConfig.mail_timezone.code +').';
                                                }
                                                roomStudentData(rData._id,function(err,studentIds) {
                                                  if(studentIds != null) {
                                                   Users.find({_id:{$in:studentIds}})
                                                    .select('deviceType deviceId')
                                                    .exec(function(error, result){
                                                      if (result && result.length > 0) {
                                                        for (var i = 0; i <= result.length - 1; i++) {
                                                         if (result[i].deviceType == 'ANDROID') {
                                                            sendPushNotificationAndroid("ASSIGN-QUESTIONNAIRE", message, result[i].deviceId, person._id, result[i]._id)
                                                          }
                                                        }
                                                      }
                                                    });
                                                  }
                                                });
                                              }
                                              let schObj = {
                                                roomId: topic.roomId,
                                                subject: 'New Questionnaire Created',
                                                body: 'A New Questionnaire has been successfully added under ' + '<b>' + topic.topicName + '</b>' + ' at ' + '<b>' + moment(doc.closeFrom).utc().format('DD-MM-YYYY hh:mm A') + '(UTC)</b>' + ' to ' + '<b>' + moment(doc.openFrom).utc().format('DD-MM-YYYY hh:mm A') + '(UTC)</b>' + ' by ' + '<b>' + person.firstname + '</b>' + '.',
                                                createdBy: topic.createdBy,
                                                createdBody: 'A New Questionnaire has been successfully added under ' + '<b>' + topic.topicName + '</b>' + ' at ' + '<b>' + moment(doc.closeFrom).utc().format('DD-MM-YYYY hh:mm A') + '(UTC)</b>' + ' to ' + '<b>' + moment(doc.openFrom).utc().format('DD-MM-YYYY hh:mm A') + '(UTC)</b>' + ' by ' + '<b>' + 'you' + '</b>' + '.',
                                              };
                                              if (serverConfig.mail_timezone && serverConfig.mail_timezone.zone) {
                                                schObj["body"] = 'A New Questionnaire has been successfully added under ' + '<b>' + topic.topicName + '</b>' + ' at ' + '<b>' + moment(doc.closeFrom).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +')</b>' + ' to ' + '<b>' + moment(doc.openFrom).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +')</b>' + ' by ' + '<b>' + person.firstname + '</b>' + '.';
                                                schObj["createdBody"] = 'A New Questionnaire has been successfully added under ' + '<b>' + topic.topicName + '</b>' + ' at ' + '<b>' + moment(doc.closeFrom).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +')</b>' + ' to ' + '<b>' + moment(doc.openFrom).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +')</b>' + ' by ' + '<b>' + 'you' + '</b>' + '.';
                                              }
                                              sendScheduleEmail(schObj);
                                            }
                                          });
                                        }
                                      });
                                  }
                              }
                            });
                        } else {

                          //Query for pushing questionnaire object in topic  
                          Topic.update({
                            _id: recordId
                          }, {
                              $push: {
                                "questionnaire": obj
                              }
                            }, {
                              runValidators: true
                            }, function (err, doc) {
                              // console.log("update err == ",err);
                              // console.log("update doc == ",doc);
                              if (err) {
                                res.json({
                                  status: false,
                                  error: err.message
                                });
                              } else {

                                //Query for finding updated topic data 
                                var query = Topic.findOne({
                                  _id: recordId
                                });
                                query.populate('questionnaire.questionnaireId', 'questionnaireName')
                                query.exec(function (err, doc) {
                                  if (err) {
                                    res.json({
                                      status: false
                                    });
                                  } else {
                                    res.json({
                                      status: true,
                                      data: doc,
                                      message: "Updated successfully."
                                    });

                                    //createdBy: pranathi, disc: push notifications for android students
                                    if(doc && doc.topicEnable) {
                                      let message = 'A New Questionnaire '+doc.questionnaire[0].questionnaireId. questionnaireName+' has been added to Topic '+ doc.topicName +'.';
                                      roomStudentData(rData._id,function(err,studentIds) {
                                        if(studentIds != null) {
                                         Users.find({_id:{$in:studentIds}})
                                          .select('deviceType deviceId')
                                          .exec(function(error, result){
                                            if (result && result.length > 0) {
                                              for (var i = 0; i <= result.length - 1; i++) {
                                               if (result[i].deviceType == 'ANDROID') {
                                                  sendPushNotificationAndroid("ASSIGN-QUESTIONNAIRE", message, result[i].deviceId, person._id, result[i]._id);
                                                }
                                              }
                                            }
                                          });
                                        }
                                      });
                                    }
                                    let schObj = {
                                      roomId: doc.roomId,
                                      subject: 'New Questionnaire Created',
                                      body: 'A New Questionnaire has been successfully added under ' + '<b>' + doc.topicName + '</b>' + ' by ' + '<b>' + person.firstname + '</b>' + '.',
                                      createdBy: doc.createdBy,
                                      createdBody: 'A New Questionnaire has been successfully added under ' + '<b>' + doc.topicName + '</b>' + ' by ' + '<b>' + 'you' + '</b>' + '.',
                                    };
                                    sendScheduleEmail(schObj);
                                  }
                                });
                              }
                            });
                        }
                      }
                    });
                  }
                })
               
              } else {
                res.json({ 
                  status : false, 
                  error : "Invalid Topic" 
                });
              }
            });
          } 
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("error in assign questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : updateAssignedQuestionnaire
*  @Purpose : For updating assigned questionnaire to topic
*  @Request Object : questionnaireData : { data: { questionnaire : { uid : "user id", topicId: "topic id", editId: "edit id", questionnaireId: 'questionnaire id', openFrom: 'open time', closeFrom: 'close time'} } }
*  @Response Object : Success - Success Message, Topic data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function updateAssignedQuestionnaire(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.body.questionnaireData || !req.body.questionnaireData.data) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {      
        var obj = req.body.questionnaireData.data.questionnaire;

        //If user has a valid role
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Instructor || person.role == Roles.Presenteradmin || person.role == Roles.Presenter || person.role == Roles.Moderator) {

          //Verifying if topic id is there or not
          if (obj.topicId && (obj.topicId != "" || obj.topicId != undefined) && mongoose.Types.ObjectId.isValid(obj.topicId)) {
            let recordId = mongoose.Types.ObjectId(obj.topicId);
            obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
            obj['modifiedAt'] = moment().utc().toDate();
            delete obj["topicId"];
            delete obj["uid"];

            //Query for finding the topic data
            var data = Topic.findOne({ 
              _id : recordId 
            })
            .exec(function (err, topicDoc) {

              //Verifying if topic data is thereor not
              if (topicDoc) {
                //verify room is there or not 
                let roomValidateQuery = Room.findOne({ _id: topicDoc.roomId })
                  .populate('selPackage', 'packageValidity')

                roomValidateQuery.exec(function (error, rData) {
                  if (error) {
                    res.json({
                      status: false
                    })
                  } else {
                    //Verifying if open and close time is there in req object or not
                    if (obj.openFrom && obj.closeFrom) {
 
                      //Query for finding the questionnaire data inside topic based on room id and check for time conflicts
                      Topic.findOne({
                        roomId: topicDoc.roomId,
                        "questionnaire._id": { $ne: req.body.questionnaireData.data.questionnaire.editId },
                        "questionnaire.openFrom": { $lte: obj.closeFrom },
                        "questionnaire.closeFrom": { $gte: obj.openFrom }
                      }, {
                          "questionnaire.$": 1
                        })
                        .exec(function (err, timedoc) {
                          if (err) {
                            res.json({
                              status: false,
                              error: err.message
                            });
                          } else if (timedoc) {

                            //If time conflict is there send the error
                            res.json({
                              status: false,
                              error: 409,
                              openFrom: timedoc.questionnaire[0].openFrom,
                              closeFrom: timedoc.questionnaire[0].closeFrom
                            });
                          } else {
                            //check date conditions
                            let startDate = new Date(obj.openFrom);
                            let closeDate = new Date(obj.closeFrom);
                            let roomExpiry = new Date(rData.expiryDate);
                            let currentTime = new Date();
                            let packageExpiry = new Date(rData.selPackage.packageValidity);
                            //checking whether start time and end time validation
                            if (startDate < currentTime) {
                              res.json({
                                status: false,
                                error: "Start time should be greater then current time"
                              });
                            } else if (startDate > closeDate) {

                              res.json({
                                status: false,
                                error: "End time should be greater then start time"
                              })
                            } else if (closeDate > roomExpiry || closeDate > packageExpiry || !rData.expiryDate) {
                              res.json({
                                status: false,
                                error: 'This questionnaire End time can not exceed room expiry date'
                              });
                            } else {
                            //Query for updating questionnaire object in topic 
                            Topic.update({
                              _id: recordId,
                              "questionnaire.questionnaireId": obj.questionnaireId
                            }, {
                                $set: {
                                  "questionnaire.$.openFrom": obj.openFrom,
                                  "questionnaire.$.closeFrom": obj.closeFrom,
                                  "questionnaire.$.showResult": obj.showResult
                                },
                                modifiedAt: moment().utc().toDate(),
                                modifiedBy: mongoose.Types.ObjectId(obj.uid)
                              }, {
                                runValidators: true
                              }, function (err, doc) {
                                // console.log("update err == ",err);
                                console.log("update doc == ",doc);
                                if (err) {
                                  res.json({
                                    status: false,
                                    error: err.message
                                  });
                                } else {

                                  //Query for finding updated topic data 
                                  var query = Topic.findOne({
                                    _id: recordId
                                  });
                                  query.populate('questionnaire.questionnaireId', 'questionnaireName')
                                  query.exec(function (err, doc) {
                                    if (err) {
                                      res.json({
                                        status: false
                                      });
                                    } else {
                                      res.json({
                                        status: true,
                                        data: doc,
                                        message: "Updated successfully."
                                      });


                                      //createdBy: pranathi, disc: push notifications for android students
                                      if(doc && doc.topicEnable) {
                                        let message = 'The Questionnaire '+doc.questionnaire[0].questionnaireId. questionnaireName+' has been updated to Topic '+ doc.topicName +' at ' +moment(startDate).format('DD-MM-YYYY hh:mm A')+ ' to ' +moment(closeDate).format('DD-MM-YYYY hh:mm A') + '.';
                                        roomStudentData(topicDoc.roomId,function(err,studentIds) {
                                          if(studentIds != null) {
                                           Users.find({_id:{$in:studentIds}})
                                            .select('deviceType deviceId')
                                            .exec(function(error, result){
                                              if (result && result.length > 0) {
                                                for (var i = 0; i <= result.length - 1; i++) {
                                                 if (result[i].deviceType == 'ANDROID') {
                                                    sendPushNotificationAndroid('UPDATE-QUESTIONNAIRE', message, result[i].deviceId, person._id, result[i]._id);
                                                  }
                                                }
                                              }
                                            });
                                          }
                                        });
                                      }
                                      let schObj = {
                                        roomId: doc.roomId,
                                        subject: 'The Questionnaire Updated',
                                        body: 'The Questionnaire has been successfully updated under ' + '<b>' + doc.topicName + '</b>' + ' by ' + '<b>' + person.firstname + '</b>' + ' at ' + '<b>' + moment(doc.closeFrom).format('DD-MM-YYYY hh:mm A') + '</b>' + ' to ' + '<b>' + moment(doc.openFrom).format('DD-MM-YYYY hh:mm A') + '</b>' + '.',
                                        createdBy: doc.createdBy,
                                        createdBody: 'The Questionnaire has been successfully updated under ' + '<b>' + doc.topicName + '</b>' + ' by ' + '<b>' + ' you ' + '</b>' + ' at ' + '<b>' + moment(doc.closeFrom).format('DD-MM-YYYY hh:mm A') + '</b>' + ' to ' + '<b>' + moment(doc.openFrom).format('DD-MM-YYYY hh:mm A') + '</b>' + '.',
                                      };
                                      sendScheduleEmail(schObj);
                                    }
                                  });
                                }
                              });
                            }
                          }
                        });               
                    } else {

                      //Query for updating questionnaire object in topic 
                      Topic.update({
                        _id: recordId,
                        "questionnaire.questionnaireId": obj.questionnaireId
                      }, {
                          $set: {
                            "questionnaire.$.openFrom": '',
                            "questionnaire.$.closeFrom": '',
                            "questionnaire.$.showResult": obj.showResult
                          },
                          modifiedAt: moment().utc().toDate(),
                          modifiedBy: mongoose.Types.ObjectId(obj.uid)
                        }, {
                          runValidators: true
                        }, function (err, doc) {
                          // console.log("update err == ",err);
                          // console.log("update doc == ",doc);
                          if (err) {
                            res.json({
                              status: false,
                              error: err.message
                            });
                          } else {

                            //Query for finding updated topic data 
                            var query = Topic.findOne({
                              _id: recordId
                            });
                            query.populate('questionnaire.questionnaireId', 'questionnaireName')
                            query.exec(function (err, doc) {
                              if (err) {
                                res.json({
                                  status: false
                                });
                              } else {
                                res.json({
                                  status: true,
                                  data: doc,
                                  message: "Updated successfully."
                                });

                                //createdBy: pranathi, disc: push notifications for android students
                                if(doc && doc.topicEnable) {
                                  let message = 'The Questionnaire '+doc.questionnaire[0].questionnaireId. questionnaireName+' has been updated to Topic '+doc.topicName + '.';
                                  roomStudentData(topicDoc.roomId,function(err,studentIds) {
                                    if(studentIds != null) {
                                     Users.find({_id:{$in:studentIds}})
                                      .select('deviceType deviceId')
                                      .exec(function(error, result){
                                        if (result && result.length > 0) {
                                          for (var i = 0; i <= result.length - 1; i++) {
                                           if (result[i].deviceType == 'ANDROID') {
                                              sendPushNotificationAndroid("UPDATE-QUESTIONNAIRE", message, result[i].deviceId, person._id, result[i]._id);
                                            }
                                          }
                                        }
                                      });
                                    }
                                  });
                                }

                                let schObj = {
                                  roomId: doc.roomId,
                                  subject: 'The Questionnaire Updated.',
                                  body: 'The Questionnaire has been successfully updated under ' + '<b>' + doc.topicName + '</b>' + ' by ' + '<b>' + person.firstname + '</b>' + '.',
                                  createdBy: doc.createdBy,
                                  createdBody: 'The Questionnaire has been successfully updated under ' + '<b>' + doc.topicName + '</b>' + ' by ' + '<b>' + 'you' + '</b>' + '.',
                                };
                                sendScheduleEmail(schObj);
                              }
                            });
                          }
                        });
                    }
                  }
                });
              } else {
                res.json({ 
                  status : false, 
                  error : "Invalid Topic" 
                });
              }
            });
          } 
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("error in update assigned questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : unassignQuestionnaire
*  @Purpose : For unassigning questionnaire from topic
*  @Request Object : params : { qid: "questionnaire id", tid: 'topic id' }
*  @Response Object : Success - Success Message, Topic data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function unassignQuestionnaire(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.params.qid && req.params.tid) {

        //Validating if questionnaire and topic id is valid or not
        if (!req.params.qid || validator.isEmpty(req.params.qid) || !mongoose.Types.ObjectId.isValid(req.params.qid)) {
          // console.log("Invalid Question");
          res.json({
            status: false, 
            error : "Invalid Questionnaire."
          });
        } else if(!req.params.tid || validator.isEmpty(req.params.tid) || !mongoose.Types.ObjectId.isValid(req.params.tid)) {
          // console.log("Invalid topicId");
          res.json({
            status: false, 
            error : "Invalid Topic id."
          });
        } else {
          let questionnaireId = req.params.qid;

          //Query for finding the topic data
          var query = Topic.findOne({ 
            _id : mongoose.Types.ObjectId(req.params.tid),
            'questionnaire.questionnaireId' :  questionnaireId
          },{
            'questionnaire.$' : 1
          });
          query.exec(function(err, docs) {
            if (err) {
              // console.log("Error", error.message);
              res.json({
                status: false, 
                error: err.message
              })
            } else if(docs){
              
              //Checking whether there is any dependency of results 

              Result.findOne({
                topicId : mongoose.Types.ObjectId(req.params.tid),
                questionnaireId : questionnaireId
              })
              .exec(function(err, resultsData) {
                if(err) {
                  res.json({
                    status : false,
                    error : err.message
                  })
                } else if (resultsData) {
                  res.json({
                    status : false,
                    error : 'Are you sure you want to unassign questionnaire as there are results based on this questionnaire?',
                    httpStatusCode : 409,
                    questionnaireId : questionnaireId
                  })
                } else {
                  
                  // Query for unassigning questionnaire from topic
                  Topic.update({
                    _id: mongoose.Types.ObjectId(req.params.tid)
                    }, { 
                      $pull: { 
                        "questionnaire": {
                         "questionnaireId" : questionnaireId 
                       } 
                     } 
                   }, function (error, result) {
                    if (error) { 
                      // console.log("Error", error.message);
                      res.json({ 
                        status : false, 
                        error: error.message, 
                        message : "Questionnaire not present in current topic." 
                      });
                    } else if(result) {

                      //Query for finding the updated topic data
                      var query = Topic.findOne({ _id : mongoose.Types.ObjectId(req.params.tid) })
                      .populate('questionnaire.questionnaireId', 'questionnaireName')
                      .exec(function (e, doc) {
                        if (err) { 
                          // console.log("Error", err.message);
                          res.json({ 
                            status: false, 
                            error : e.message, 
                            message : "Error while retriving topic data." 
                          });
                        } else if(doc){
                          res.json({ 
                            status: true, 
                            data: doc, 
                            message : "Questionnaire unassigned successfully." 
                          });

                          //createdBy: pranathi, disc: push notifications for android students
                          if(doc && doc.topicEnable) {
                            let message = 'The Questionnaire has been deleted from Topic '+ doc.topicName +'.';
                            roomStudentData(doc.roomId,function(err,studentIds) {
                              if(studentIds != null) {
                               Users.find({_id:{$in:studentIds}})
                                .select('deviceType deviceId')
                                .exec(function(error, result){
                                  if (result && result.length > 0) {
                                    for (var i = 0; i <= result.length - 1; i++) {
                                     if (result[i].deviceType == 'ANDROID') {
                                        sendPushNotificationAndroid("DELETE-QUESTIONNAIRE", message, result[i].deviceId, person._id, result[i]._id);
                                      }
                                    }
                                  }
                                });
                              }
                            });
                          }

                          let schObj = {
                            roomId : doc.roomId,
                            subject : 'The Questionnaire Deleted.',
                            body : 'The Questionnaire has been successfully deleted under '+ '<b>' + doc.topicName + '</b>'+' by ' + '<b>' + person.firstname + '</b>'+'.', 
                            createdBy : doc.createdBy,
                            createdBody : 'The Questionnaire has been successfully deleted under '+ '<b>' + doc.topicName + '</b>'+' by ' + '<b>' + 'you' + '</b>'+'.', 
                          };
                          sendScheduleEmail(schObj);
                        } else {
                          res.json({
                            status : false,
                            error : 'Invalid Topic'
                          })
                        }
                      });
                    } else {
                      res.json({
                        status : false,
                        error : 'Topic Not Updated'
                      })
                    }
                  });
                }
              })
            } else {
              res.json({
                status : false,
                error : 'Topic not found.'
              })
            }
          });
        }     
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("error in unassign questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : confirmedUnassignQuestionnaireFromTopic
*  @Purpose : Took a confirmation from user for unassigning questionnaire from topic
*  @Request Object : params : { qid: "questionnaire id", tid: 'topic id' }
*  @Response Object : Success - Success Message, Topic data, Failure - Error message
*  @Author : Prateek
*/

export function confirmedUnassignQuestionnaireFromTopic(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.params.qid && req.params.tid) {

        //Validating if questionnaire and topic id is valid or not
        if (!req.params.qid || validator.isEmpty(req.params.qid) || !mongoose.Types.ObjectId.isValid(req.params.qid)) {
          // console.log("Invalid Question");
          res.json({
            status: false, 
            error : "Invalid Questionnaire."
          });
        } else if(!req.params.tid || validator.isEmpty(req.params.tid) || !mongoose.Types.ObjectId.isValid(req.params.tid)) {
          // console.log("Invalid topicId");
          res.json({
            status: false, 
            error : "Invalid Topic id."
          });
        } else {
          let questionnaireId = req.params.qid;           

          //Removing all the results dependent on questionnaire and topics
          Result.remove({
            topicId : mongoose.Types.ObjectId(req.params.tid),
            questionnaireId : questionnaireId
          })
          .exec(function(err, removed) {
            if(err) {
              res.json({
                status : false,
                error : err.message
              })
            } else if (removed) {

              // Query for unassigning questionnaire from topic
              Topic.update({
                _id: mongoose.Types.ObjectId(req.params.tid)
                }, { 
                  $pull: { 
                    "questionnaire": {
                     "questionnaireId" : questionnaireId 
                    } 
                  } 
                }, function (error, result) {
                if (error) { 
                  // console.log("Error", error.message);
                  res.json({ 
                    status : false, 
                    error: error.message, 
                    message : "Questionnaire not present in current topic." 
                  });
                } else if(result) {

                  //Query for finding the updated topic data
                  var query = Topic.findOne({ _id : mongoose.Types.ObjectId(req.params.tid) })
                  .populate('questionnaire.questionnaireId', 'questionnaireName')
                  .exec(function (e, doc) {
                    if (err) { 
                      // console.log("Error", err.message);
                      res.json({ 
                        status: false, 
                        error : e.message, 
                        message : "Error while retriving topic data." 
                      });
                    } else if(doc){
                      res.json({ 
                        status: true, 
                        data: doc, 
                        message : "Questionnaire unassigned successfully." 
                      });

                      //createdBy: pranathi, disc: push notifications for android students
                      if(doc && doc.topicEnable) {
                        let message = 'The Questionnaire '+doc.questionnaire[0].questionnaireId. questionnaireName+' has been deleted from Topic '+ doc.topicName +'.';
                        roomStudentData(doc.roomId,function(err,studentIds) {
                          if(studentIds != null) {
                           Users.find({_id:{$in:studentIds}})
                            .select('deviceType deviceId')
                            .exec(function(error, result){
                              if (result && result.length > 0) {
                                for (var i = 0; i <= result.length - 1; i++) {
                                 if (result[i].deviceType == 'ANDROID') {
                                    sendPushNotificationAndroid("DELETE-QUESTIONNAIRE", message, result[i].deviceId, person._id, result[i]._id);
                                  }
                                }
                              }
                            });
                          }
                        });
                      }

                      let schObj = {
                        roomId : doc.roomId,
                        subject : 'The Questionnaire Deleted.',
                        body : 'The Questionnaire has been successfully deleted under '+ '<b>' + doc.topicName + '</b>'+' by ' + '<b>' + person.firstname + '</b>'+'.', 
                        createdBy : doc.createdBy,
                        createdBody : 'The Questionnaire has been successfully deleted under '+ '<b>' + doc.topicName + '</b>'+' by ' + '<b>' + 'you' + '</b>'+'.', 
                      };
                      sendScheduleEmail(schObj);
                    } else {
                      res.json({
                        status : false,
                        error : 'Invalid Topic'
                      })
                    }
                  });
                } else {
                  res.json({
                    status : false,
                    error : 'Topic Not Updated'
                  })
                }
              });    
            } else {
              res.json({
                status : false,
                error : 'Result not removed'
              })            
            }
          })          
        }     
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("error in unassign questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
* @Function Name: "listRoomFeedback",
* @Purpose: "Returns feedback list submitted by users room/course wise",
* @Request Object: params : { uid, pagination data},
* @Response Object: Success- list Data, Failure- Error message,
* @Author: "Najib Hasnain"
*/


export function listRoomFeedback(req, res) {
   //console.log("RoomfeedbackList Req --", req.query);
  
  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if ( person != null && req.query.itemsPerPage && req.query.currentPage && req.query.currentPage && req.query.roomId && mongoose.Types.ObjectId.isValid(req.query.roomId)) {
        let params = req.query;
          

          //check the user role corresponding to allowed roles
          if(person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.CRMadmin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Moderator) {

            //based on roomId find the list of submitted feedback
            Feedback.find({ 'roomId': params.roomId})
            .limit(Number(params.itemsPerPage))
            .select(' roomId userId feedbacks.videoQuality feedbacks.audioQuality feedbacks.contentSharing feedbacks.rating feedbacks.comment createdOn')
            .populate('roomId', 'roomName -_id')
            .populate('userId', 'firstname lastname -_id')
            .skip(Number(params.itemsPerPage) *(Number(params.currentPage-1)))
            .sort({
              createdOn: -1
            }).exec(function(error, result){                           
               //console.log("error----", error); 
              
              //count the number of feedbacks under a room/course
              Feedback.count({roomId : mongoose.Types.ObjectId(params.roomId)}, function(err, count) {
                if(err) {                
                res.json({ status: false, error : err });
                } else  {                 
                  //console.log("Count---->", count);

                  //Successfull response with data
                  res.json({ status: true, data: result, count: count });
                }                                
              });                
            });
          } else res.json({status : false, error : "Access denied."});  
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      //console.log("e in listPackage === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });   
}

/**
* @Function Name: "fetchRoomFeedback",
* @Purpose: "Returns feedbacks details based on feedback Id",
* @Request Object: obj : { uid, feedback Id},
* @Response Object: Success- Data, Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function fetchRoomFeedback(req, res){
  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if ( person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {             

          //check the user role corresponding to allowed roles
          var recordId = mongoose.Types.ObjectId(req.params.id);          
          var query = Feedback.findOne({ _id : recordId })
                      .populate('roomId', 'roomName _id')
                      .populate('userId', 'firstname lastname -_id')
                      .sort({createdOn : -1})
                  //query.populate('feedbacks')          
          .exec(function (err, doc) {
              if (err){
                res.json({ status: false, error : err }); 
              }
              else if(doc) {
                // let key = 'conf/' + doc.roomKey;
                // doc['roomKey'] = serverConfig.confLink.concat(key);
                res.json({ status: true, data: doc });
              } else {
                res.json({ status: false, error : "Invalid Feedback Data." });
              }
          });
          } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in fetchRoomFeedback ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });    
}

/**
* @Function Name: "saveFeedback",
* @Purpose: "Saves feedback submitted by user under a room/course",
* @Request Object: feedbackObj : { userID, roomkey, feedbackData },
* @Response Object: Success- Message, Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function saveFeedback(req, res) {
  
  checkValidRequest(req.headers, function(person){
    try{
      if ( person != null && req.body.feedbackData && req.body.feedbackData.data) {
        let feedbackObj = req.body.feedbackData.data;

        //check for room key in room collection and retrieve room Id          
        Room.findOne({
          roomKey : addSlash(feedbackObj.roomKey)
        }).exec(function(roomError, room) {
          if(roomError) {
            res.json({
              status : false,
              err : roomError.message 
            });
          }else if(room) {              
            feedbackObj["roomId"] = mongoose.Types.ObjectId(room._id);         
            feedbackObj["createdBy"] = mongoose.Types.ObjectId(person._id);
            feedbackObj["userId"] = mongoose.Types.ObjectId(person._id); 

            //changed by - Najib, to show current date added below line of code 
            feedbackObj["createdOn"] = moment().utc().toDate(); 

            let feedbackQuestions = feedbackObj['feedbacks'];

            _.forIn(feedbackQuestions, function(value, key) {
              var dotRegx = /[.]/g;
              var dollarRegX  = /^[$]/;
              var dotIndex = key.search(dotRegx);
              var dollarIndex = key.search(dollarRegX);
              if(dotIndex != -1) {
                var replacedQuestion = key.replace(dotRegx, 'Unicode46');
                if(dollarIndex == 0) {
                  replacedQuestion = replacedQuestion.replace('$', 'Unicode36');
                }
                delete feedbackObj['feedbacks'][key];
                feedbackObj['feedbacks'][replacedQuestion] = value; 
              } else if(dollarIndex == 0) {
                var replacedQuestion = key.replace('$', 'Unicode36');
                delete feedbackObj['feedbacks'][key];
                feedbackObj['feedbacks'][replacedQuestion] = value;
              }
            })
                        
            const objFeedback = new Feedback(feedbackObj);
            Feedback.create([objFeedback], (error, saved) => { 

              if (!error) {

                //Successful response 
                res.json({ 
                  status: true,
                  message : "Feedback successfully submitted"
                });
              } else {
                res.json({ 
                  status: false,
                  error : "Internal Server Error"
                });
              }
            })              
          } else {

            //error response if room key does not exists
            res.json({status : false, message : "Invalid Room Key"})
          }
        })
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in saveFeedback",e);
      res.json({status : false, error : "Internal server error."});
    }
  });   
}

/**
*  @Function name : listResultTopic
*  @Purpose : For fetching complete result data
*  @Request Object : query : { roomId, topicId, questionnaireId, page, items }
*  @Response Object : Success - Result data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listResultTopic(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page || !req.query.roomId || !req.query.topicId || !req.query.questionnaireId) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let listresult = req.query;

        //Validating if room id, topic id and questionnaire id is valid or not
        if (validator.isEmpty(listresult.roomId) || !mongoose.Types.ObjectId.isValid(listresult.roomId)) {
          res.json({ 
            status : false, 
            error : "InValid room." 
          });
        } else if (validator.isEmpty(listresult.topicId) || !mongoose.Types.ObjectId.isValid(listresult.topicId)) {
          res.json({ 
            status : false, 
            error : "InValid topic." 
          });
        } else if (validator.isEmpty(listresult.questionnaireId) || !mongoose.Types.ObjectId.isValid(listresult.questionnaireId)) {
          res.json({ 
            status : false, 
            error : "InValid questionnaire." 
          });
        } else {

          //If user has a valid role
          if (person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {

            //Query for fetching result data based on room, topic and questionnaire
            //and skip the items according to itemsPerPage on previous page
            var query = Result.find({
              roomId : listresult.roomId, 
              topicId : listresult.topicId, 
              questionnaireId : listresult.questionnaireId
            })
            .limit(Number(listresult.items))
            .select('roomId topicId questionnaireId submittedBy questionnairePercentage grade')
            .skip(Number(listresult.items) * (Number(listresult.page)-1))
            .sort({createdAt: -1})
            .populate('questionnaireId submittedBy roomId',  'questionnaireName questions firstname lastname roomName ')
                          
            .exec(function(err, result) {
              if (err) {
                res.json({ 
                  status : false, 
                  error : err.message 
                });
              } else {

                //Query for counting result data based on room, topic, questionnaire and submittedBy
                Result.count({
                  roomId : listresult.roomId,
                  topicId : listresult.topicId,
                  questionnaireId : listresult.questionnaireId
                }).exec(function(error, count){
                  //console.log('count',count)
                  res.json({ 
                    status : true, 
                    data : result, 
                    count : count 
                  });
                });
              }
            });
          } else if (person.role == Roles.Instructor || person.role == Roles.Presenter) {

            //Query for fetching student data based on room id and instructor id
            Student.findOne({ 
              roomId : listresult.roomId, 
              instId : person._id
            })
            .select('students -_id')
            .exec(function (err, student) {
              if (err) { 
                res.json({ 
                  status: false, 
                  error : "Invalid student id." 
                }); 
              } else {

                //Verifying if student data is there or not
                if (student == null || !student) {

                  //Query for fetching result data based on room, topic, questionnaire and submittedBy
                  //and skip the items according to itemsPerPage on previous page
                  var query = Result.find({
                    roomId : listresult.roomId, 
                    topicId : listresult.topicId, 
                    questionnaireId : listresult.questionnaireId, 
                    submittedBy : person._id
                  })
                  .limit(Number(listresult.items))
                  .select('roomId topicId questionnaireId submittedBy grade questionnairePercentage')
                  .skip(Number(listresult.items) * (Number(listresult.page)-1))
                  .sort({createdAt: -1})
                  .populate('questionnaireId submittedBy roomId',  'questionnaireName questions firstname lastname roomName ')
                                
                  .exec(function(err, result) {
                    if (err) {
                      res.json({ 
                        status : false, 
                        error : err.message 
                      });
                    } else {

                      //Query for counting result data based on room, topic, questionnaire and submittedBy
                      Result.count({
                        roomId : listresult.roomId,
                        topicId : listresult.topicId,
                        questionnaireId : listresult.questionnaireId, 
                        submittedBy : person._id
                      }).exec(function(error, count){
                        //console.log('count',count)
                        res.json({ 
                          status : true, 
                          data : result, 
                          count : count 
                        });
                      });
                    }
                  });
                } else {

                  //Query for fetching result data based on room, topic, questionnaire and submittedBy
                  //and skip the items according to itemsPerPage on previous page
                  var query = Result.find({
                    roomId : listresult.roomId, 
                    topicId : listresult.topicId, 
                    questionnaireId : listresult.questionnaireId, 
                    $or : [{
                      submittedBy : person._id
                    },{ 
                      submittedBy : { 
                        $in: student.students 
                      } 
                    }] 
                  })
                  .limit(Number(listresult.items))
                  .select('roomId topicId questionnaireId submittedBy grade questionnairePercentage')
                  .skip(Number(listresult.items) * (Number(listresult.page)-1))
                  .sort({createdAt: -1})
                  .populate('questionnaireId submittedBy roomId',  'questionnaireName questions firstname lastname roomName ')
                                
                  .exec(function(err, result) {
                    if (err) {
                      res.json({ 
                        status : false, 
                        error : err.message 
                      });
                    } else {

                      //Query for counting result data based on room, topic, questionnaire and submittedBy
                      Result.count({
                        roomId : listresult.roomId,
                        topicId : listresult.topicId,
                        questionnaireId : listresult.questionnaireId, 
                        $or : [{
                          submittedBy : person._id
                        },{ 
                          submittedBy : { 
                            $in: student.students 
                          } 
                        }]
                      }).exec(function(error, count){
                        //console.log('count',count)
                        res.json({ 
                          status : true, 
                          data : result, 
                          count : count 
                        });
                      });
                    }
                  });
                }
              }
            })
          } else {
            res.json({ 
              status: false, 
              error : "Access denied." 
            });
          }
        }
      }
    } catch(e) {
      console.log("error in list result topic", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchResult
*  @Purpose : For fetching particular result data
*  @Request Object : params : { id: "result id" }
*  @Response Object : Success - Result data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchResult(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.rid) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        // console.log('params', req.params);
        //Validating if result id is valid or not
        if (validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid result"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.rid);

          //Query for fetching result data based on result id
          var query = Result.findOne({ 
            _id : recordId 
          })
          .populate('questionnaireId submittedBy roomId',  'questionnaireName  questions firstname lastname profile.profileImage roomName ')
          .select('questionnaireId submittedBy roomId totalMarks obtainedMarks grade result questionnairePercentage wrongAns correctAns')

          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            }
            else if (doc) {
              res.json({ 
                status: true, 
                data: doc 
              });
            } else {
              res.json({ 
                status: false, 
                error : "Invalid Result." 
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("error in fetch result", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/*
@Function Name : getLocationList
@Purpose : "To fetch all the locations created by requested user"
@Request Object : data:{uid}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function getLocationList (req, res) { 

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null) {
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {

          //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
          let bussinessID = null;
          if(person.profile.companyid && person.profile.companyid._id) {
            bussinessID = person.profile.companyid._id;
          }

          //Firing a query to fetch all the location documents present in location collection created by the requested user.
          var innerQuery = Location.find({corporateId : bussinessID});
          innerQuery.select('_id locationName updatedAt')
          .exec(function(err, locationData){
            if (err) {
              res.json({
                status:false, 
                err :err.message
              })
            } else {
              res.json({
                status :true , 
                data :locationData
              });
            }
          })
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e){
      console.log('error in getLocationList',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}

/*
@Function Name : getRoomInstructorStudentsList
@Purpose : "To fetch all the students who are present under a particular room and instructor"
@Request Object : data:{uid,roomId,instId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function getRoomInstructorStudentsList(req, res){

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query.roomId && mongoose.Types.ObjectId.isValid(req.query.roomId) && req.query.instructorId && mongoose.Types.ObjectId.isValid(req.query.instructorId)) {
        let obj = req.query;
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {

          //Firing a query on student collection to fetch all who are present under a particular instructor in a room
          var innerQuery = Student.findOne({roomId : obj.roomId, instId:obj.instructorId});
          innerQuery.populate('students ', '_id firstname lastname email role', { userStatus : 'Active' })
          .exec(function(err, studentsData){
            if (err) {
              res.json({status:false, err :err});
            } else if (studentsData) {
              res.json({status :true , data :studentsData, instructorId:obj.instructorId});
            } else {
              res.json({status:false, err: "Invalid request"});
            }
          });
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e){
      console.log('error in getRoomInstructorStudentsList',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });    
}

/*
@Function Name : saveRoomLocation
@Purpose : "To save or update a particular location in room's collection under a particular roomId"
@Request Object : data:{uid,roomId,locationObj}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function saveRoomLocation(req, res){

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.data && req.body.data.roomId && mongoose.Types.ObjectId.isValid(req.body.data.roomId)) {
        let obj = req.body.data;
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {

          //Checking for room document presence in rooms collection
          var roomQuery = Room.findOne({ _id: obj.roomId });
          roomQuery.exec(function (err, roomData) {
            if (err) {
              res.json({
                status : false, 
                err : err.message
              })
            } else if (!roomData) {
              res.json({
                status : false, 
                err : err, 
                message : "Room Not Found"
              });
            } else if (roomData && roomData.locations && roomData.locations.length == 0) {

              //Updating the room collection document with locationId
              var innerQuery = Room.update({_id : obj.roomId},{$push:{locations:obj.locationObj}});
              innerQuery.exec(function(err, updatedData){
                if (err) {
                  res.json({
                    status : false,
                    err : err.message
                   })
                } else {
                  res.json({
                    status : true, 
                    message : 'Saved successfully', 
                    roomId : roomData._id
                  });
                }
              })
            } else if (roomData && roomData.locations && roomData.locations.length>0) {

              //Checking whether the location Id exists in room collection
              var checkLocationQuery = Room.findOne({_id : obj.roomId,"locations.locationId":obj.locationObj.locationId});
              checkLocationQuery.exec(function(err, result){
                if (err) {
                  res.json({
                    status : false, 
                    err : err.message
                  })
                } else if (result) {
                  var innerquery = Room.update({_id : obj.roomId,"locations.locationId":obj.locationObj.locationId},{$push:{"locations.$.locationParticipants":{$each:obj.locationObj.locationParticipants}}});
                    innerquery.exec(function(err, result){
                      if (err) {
                        res.json({
                          status : false,
                          err : err.message
                        })
                      } else {
                        res.json({
                          status : true, 
                          message : 'Saved successfully',
                          roomId : roomData._id
                        });
                      }
                    })
                } else if (result == null) {

                  //If no document matches with location Id then push into room collecton document
                  var innerQuery = Room.update({_id : obj.roomId},{$push:{locations:obj.locationObj}});
                  innerQuery.exec(function(err, updatedData){
                    if (err) {
                      res.json({
                        status : false, 
                        err : err.message
                      })
                    } else {
                      res.json({
                        status : true,
                        message : 'Saved successfully',
                        roomId : roomData._id
                      });
                    }
                  })    
                }
              })             
            }
          })   
        } else {
          res.json({ 
            status : false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e){
      console.log('error in saveRoomLocation',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });    
}
  

/*
@Function Name : getRoomLocations
@Purpose : "To fetch all the location which are present in room collection for a particular room document"
@Request Object : data:{uid,roomId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function getRoomLocations (req, res) {

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query.roomId && mongoose.Types.ObjectId.isValid(req.query.roomId)) {
        let roomId = req.query.roomId;
        if (person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {

          //Checking for room collection document so as to send as response
          var roomQuery = Room.findOne({_id : roomId});
          roomQuery.populate('locations.locationParticipants','_id email firstname lastname role profile.profileImage')
          .populate('locations.locationId','_id createdBy createdOn description locationName updatedAt')
          .populate('users','firstname lastname email profile.profileImage role', { userStatus : 'Active' })
          .select('locations users')
          .exec(function(err, data){
            if (err) {
              res.json({
                status : false, 
                err : err.message
              })
            } else {
              res.json({
                status : true , 
                data : data
              });
            }
          })
        } else {
          res.json({ 
            status : false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log('error in getRoomLocations',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}

/*
@Function Name : deleteRoomLocation
@Purpose : "To delete a particular location from room collection  based on the  location Id"
@Request Object : params : { rid: "room id", id: 'room location id' }
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function deleteRoomLocation (req, res) {

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query.roomId && mongoose.Types.ObjectId.isValid(req.query.roomId) && req.query.roomLocationId && mongoose.Types.ObjectId.isValid(req.query.roomLocationId)) {
        let roomId = req.query.roomId;
        let roomLocationId = req.query.roomLocationId;
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {

        //Checking whether the document for the particular room Id exists in room collection
          var roomQuery = Room.findOne({
            _id : roomId
          }, function(err, roomDoc) {
            if (err) {
              res.json({
                status : false, 
                err : err.message
              })
            } else if (roomDoc) {

              //deleteing location from room document based on location Id.
              var roomLocationQuery = Room.update({
                _id : roomId
              }, {
                $pull : {
                  locations : {
                    locationId : mongoose.Types.ObjectId(roomLocationId)
                  }
                }
              });
              roomLocationQuery.exec(function(err, deleted) {
                if (err) {
                  res.json({
                    status : false, 
                    err : err.message
                  })
                } else {
                  res.json({
                    status : true, 
                    message : 'Deleted successfully.'
                  })
                }
              })
            } else {
              res.json({
                status : true, 
                message : 'No Room Found'
              })
            }
          })    
        } else {
          res.json({ 
            status : false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log('error in deleteRoomLocation',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}
      

/*
@Function Name : deleteRoomLocationParticipant
@Purpose : "To delete a particular participant from room location from room collection  based on the location Id and  participant Id"
@Request Object : params : { rid: "room id", lid: 'room location id', id: 'room location participant id' }
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function deleteRoomLocationParticipant (req, res) {
  
  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query && req.query.roomId && mongoose.Types.ObjectId.isValid(req.query.roomId) && req.query.roomLocationId && mongoose.Types.ObjectId.isValid(req.query.roomLocationId)) {
        if (req.query.roomParticipantId && mongoose.Types.ObjectId.isValid(req.query.roomParticipantId)) {
          let obj = req.query;
        
          //Checking for permissions
          if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {

            //Removing the paticipant from room location based on locationId and participant Id
            Room.update({
              _id : obj.roomId,
              "locations.locationId" : obj.roomLocationId
            },{
              $pull:{
                "locations.$.locationParticipants" : mongoose.Types.ObjectId(obj.roomParticipantId)
              }
            })
            .exec(function(err, deleted) {
              if (err) {
                res.json({
                  status : false, 
                  err : err.message
                })
              } else {
                res.json({
                  status : true, 
                  message : 'Removed successfully.'
                })
              }
            })
          } else {
            res.json({ 
              status : false, 
              error : "Access denied." 
            });
          }
        } else {
          res.json({
            status : false,
            error : "Invalid request."
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log('error in deleteRoomLocationParticipant',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}

/*
@Function Name : getQuestionnaireDataList
@Purpose : "To fetch questionnaire data for assigning in room configuration"
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function getQuestionnaireDataList(req, res){

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null) {

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Moderator) {

          //fetching questionnaire data based on coporate Id
          var questionnaireQuery = Questionnaire.find({corporateId : bussinessID})
          .select('_id questionnaireName questions');
          questionnaireQuery.exec(function(err, questionnaireDoc) {
            if(err) {
              res.json({
                status : false, 
                error : err
              })
            } else {
              res.json({
                status : true, 
                data : questionnaireDoc 
              })              
            } 
          })
        } else if(person.role == Roles.Superadmin){

          //fetching questionnaire data 
          var questionnaireQuery = Questionnaire.find()
          .select('_id questionnaireName');
          questionnaireQuery.exec(function(err, questionnaireDoc){
            if(err) {
              res.json({
                status : false,
                error : err
              })
            } else {
              res.json({
                status : true,
                data : questionnaireDoc
              })              
            } 
          })
        } else {
          res.json({ 
            status : false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log('error in deleteRoomLocationParticipant',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}

  
/*
@Function Name : saveRoomFeedbackType
@Purpose : "To save room configuration feedback type in room collections"
@Request Object : data:{roomId, feedbackValue, customizeQuestionnaireId(for customize type feedback value)}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function saveRoomFeedbackType(req, res) {

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.data && req.params.roomId && mongoose.Types.ObjectId.isValid(req.params.roomId)) {
        let obj = req.body.data;
        let roomId = req.params.roomId;
        if (person.role == Roles.Admin || person.role == Roles.Superadmin  || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Moderator) {

          //Checking whether the room is present or not 
          let selector = {
            _id : roomId
          };
          Room.findOne(selector, function(err, roomDoc) {
            if (err) {
              res.json({
                status : false, 
                error : err.message
              });
            } else if (roomDoc) {
              let roomConfiguration = {};
              roomConfiguration["feedback"] = {};
              roomConfiguration["feedback"]["feedbackType"] = obj.feedbackValue;
              if (req.body.data.feedbackValue == "Customize") {
                roomConfiguration["feedback"]["questionnaireId"] = obj.customizeQuestionnaireId;
              }

              //Updating room collection with selected feedback type
              Room.update(selector,
                {$set : 
                  {
                    "roomConfiguration.feedback" : roomConfiguration.feedback
                  }
                }, function(err, update) {
                if (err) {
                  res.json({
                    status : false,
                    error : err.message
                  })
                } else {
                  var roomQuery = Room.findOne(selector)
                  .select('roomConfiguration selPackage corporateId')
                  .populate('selPackage corporateId', 'packageName features -_id businessName -_id')
                  .populate('roomConfiguration.feedback.questionnaireId','_id questionnaireName')
                  .exec(function(err, roomDoc){
                    if (err) {
                      res.json({
                        status : false,
                        error : err.message
                      })
                    } else {
                      res.json({
                        status : true, 
                        data:roomDoc, 
                        message : 'Saved successfully'
                      })
                    }
                  });                    
                }
              })
            } else {
              res.json({
                status : false, 
                error : "Invalid room"
              });
            }
          })
        } else {
          res.json({ 
            status : false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log('error in saveRoomFeedbackType',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}

  
/*
@Function Name : getRoomFeedbackType
@Purpose : "To fetch a particular room collection document for a particular roomId"
@Request Object : {roomId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function getRoomFeedbackType(req, res){

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query.roomId && mongoose.Types.ObjectId.isValid(req.query.roomId)) {
        let obj = req.query;

        if (person.role == Roles.Admin || person.role == Roles.Superadmin  || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Moderator) {

          //Firing a query to fetch room collection document for a particular roomId
          var roomQuery = Room.findOne({_id : obj.roomId})
          .select('roomConfiguration selPackage corporateId')
          .populate('selPackage corporateId', 'packageName features -_id businessName -_id')
          .populate('roomConfiguration.feedback.questionnaireId','_id questionnaireName')
          .exec(function(err, roomDoc) {
            if (err) {
              res.json({
                status : false,
                error : err.message
              });
            } else if (roomDoc) {
              res.json({
                status : true, 
                data:roomDoc
              });
            } else {
              res.json({
                status : false,
                error : "Invalid room"
              });
            }
          });     
        } else {
          res.json({ 
            status : false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log('error in getRoomFeedbackType',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}
  
/*
@Function Name : saveRoomCodecType
@Purpose : "To save room configuration codec type in room collections"
@Request Object : data:{roomId, codecValue)}
@Response Object : Success-data, Failure-error 
@Author : Pradeep Yadav
*/

export function saveRoomCodecType(req, res) {
  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.data && req.params.roomId && mongoose.Types.ObjectId.isValid(req.params.roomId)) {
        let obj = req.body.data;
        let roomId = req.params.roomId;
        if (person.role == Roles.Admin || person.role == Roles.Superadmin  || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Moderator) {

          //Checking whether the room is present or not 
          let selector = {
            _id : roomId
          };
          Room.findOne(selector, function(err, roomDoc) {
            if (err) {
              res.json({
                status : false, 
                error : err.message
              });
            } else if (roomDoc) {

              //Updating room collection with selected codec type
              Room.update(selector,
                {$set : 
                  {
                    "roomConfiguration.codecType" : obj.codecType
                  }
                }, function(err, update) {
                if (err) {
                  res.json({
                    status : false,
                    error : err.message
                  })
                } else {
                  var roomQuery = Room.findOne(selector)
                  .populate('selPackage corporateId', 'packageName features _id')
                  .populate('corporateId', 'businessName _id')
                  .exec(function(err, roomDoc){
                    if (err) {
                      res.json({
                        status : false,
                        error : err.message
                      })
                    } else {
                      res.json({
                        status : true, 
                        data:roomDoc, 
                        message : 'Saved successfully'
                      })
                    }
                  });                    
                }
              })
            } else {
              res.json({
                status : false, 
                error : "Invalid room"
              });
            }
          })
        } else {
          res.json({ 
            status : false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log('error in saveRoomCodecType',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}
 
/*
@Function Name : saveRoomEnableLive
@Purpose : "To save room configuration Enable Live in room collections"
@Request Object : data:{roomId, enableLive)}
@Response Object : Success-data, Failure-error 
@Author : Pradeep Yadav
*/

export function saveRoomEnableLive(req, res) {
  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.data && req.params.roomId && mongoose.Types.ObjectId.isValid(req.params.roomId)) {
        let obj = req.body.data;
        let roomId = req.params.roomId;
        if (person.role == Roles.Admin || person.role == Roles.Superadmin  || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor) {

          //Checking whether the room is present or not 
          let selector = {
            _id : roomId
          };
          Room.findOne(selector, function(err, roomDoc) {
            if (err) {
              res.json({
                status : false, 
                error : err.message
              });
            } else if (roomDoc) {

              //Updating room collection with selected codec type
              Room.update(selector,
                {$set : 
                  {
                    "roomConfiguration.enableLive" : obj.enableLive
                  }
                }, function(err, update) {
                if (err) {
                  res.json({
                    status : false,
                    error : err.message
                  })
                } else {
                  var roomQuery = Room.findOne(selector)
                  .populate('selPackage corporateId', 'packageName features _id')
                  .populate('corporateId', 'businessName _id')
                  .exec(function(err, roomDoc){
                    if (err) {
                      res.json({
                        status : false,
                        error : err.message
                      })
                    } else {
                      res.json({
                        status : true, 
                        data:roomDoc, 
                        message : 'Saved successfully'
                      })
                    }
                  });                    
                }
              })
            } else {
              res.json({
                status : false, 
                error : "Invalid room"
              });
            }
          })
        } else {
          res.json({ 
            status : false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log('error in saveRoomEnableLive',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });  
}
/**
*  @Function name : setUploadFileDesc
*  @Purpose : For setting description of uploaded topic files
*  @Request Object : { uid : "user id", topicId: "topic id", roomId: "room id", uploadId: 'upload id', currentPage: 1, totalItems: 0, itemsPerPage: 5, searchKeyword: 'searchKeyword'}
*  @Response Object : Success - Success Message, Upload data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function setUploadFileDesc(req, res) {
  try {
    //Verifying if request is valid or not
    if(!req.body || !req.body.data) {
      res.json({status : false, error : "Invalid Request"});
    } else {
      let obj = req.body.data;

      //Validating if user id, topic id, room id and upload id is valid or not
      if(!obj.uid || validator.isEmpty(obj.uid) || !mongoose.Types.ObjectId.isValid(obj.uid)) {
        res.json({
          status : false, 
          error :  "Invalid User"
        });
      } else if(!obj.topicId || validator.isEmpty(obj.topicId) || !mongoose.Types.ObjectId.isValid(obj.topicId)) {
        res.json({
          status : false, 
          error :  "Invalid Topic"
        });
      } else if(!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
        res.json({
          status : false, 
          error :  "Invalid Room"
        });
      } else if(!obj.uploadId || validator.isEmpty(obj.uploadId) || !mongoose.Types.ObjectId.isValid(obj.uploadId)) {
        res.json({
          status : false, 
          error :  "Invalid Upload"
        });
      } else{

        //Query for checking if the user is present in database
        var query = Users.findOne({ 
          _id : mongoose.Types.ObjectId(obj.uid) 
        });
        query.exec(function (err, person) {
          if(err) {
            res.json({
              status : false, 
              error : err.message, 
              message : 'Unauthorized User'
            });
          } else if(person.role == Roles.Admin || person.role == Roles.Superadmin  || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Moderator) {

            //Query for updating the topic data
            var uploadQuery = Uploads.update({
              _id : obj.uploadId, 
              topicId: obj.topicId, 
              roomId: obj.roomId
            },{
              $set: {
                description: obj.desc
              }
            })
            .exec(function(err,uploadDoc) {
              if(err) {
                res.json({
                  status : false, 
                  error : err.message
                })
              } else {

                //If user has a valid role
                if(person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Instructor || person.role == Roles.Moderator || person.role == Roles.Presenter || person.role == Roles.User || person.role == Roles.Presenteradmin) {
                  var uploadQuery;
                  var countQuery;
                  let selector = {
                    topicId : obj.topicId,
                    roomId : obj.roomId,
                    $or:[{ createdBy : person._id },{isEnable : true }]
                  };
                  
                  //Verifying if filterValue is empty or not
                  if(obj.filterValue && obj.filterValue != '') {
                    selector['fileType'] = obj.filterValue;
                  }

                  //If searchKeyword is not empty then create RegExp
                  if(obj.searchKeyword && obj.searchKeyword != '') {
                    var searchKey = RegExp(obj.searchKeyword,'i');
                    selector['fileName'] = { $regex: searchKey };
                  }

                  //Query for fetching complete upload data based on selector and skip items based on itemsPerPage on previous page
                  uploadQuery = Uploads.find(selector)
                  .limit(obj.itemsPerPage)
                  .skip(obj.itemsPerPage * (obj.currentPage-1))
                  .sort({createdAt: -1});
                  countQuery = Uploads.count(selector);

                  uploadQuery.exec(function(err, result) {
                    //console.log('result',result)
                    if(err) {
                      //console.log("ERROR===", err);
                      res.json({ 
                        status : false, 
                        error : err.message 
                      });
                    } else {
                      // console.log("DATA===", result);

                      //Query for counting complete upload data based on selector
                      countQuery.exec(function(error, count) {

                        //console.log('count',count)
                        res.json({ 
                          status : true, 
                          data : result, 
                          count : count, 
                          message : "Updated successfully" 
                        });

                        // createdBy: pranathi, disc:  push notifications for android students

                        Uploads.findOne({_id : obj.uploadId})
                        .select('isEnable')
                        .populate('topicId','topicEnable topicName')
                        .exec(function(err, fileData){
                          
                          if(fileData && fileData.isEnable && fileData.topicId && fileData.topicId.topicEnable) {
                            let message = "The File discription has been updated to Topic "+fileData.topicId.topicName+".";
                            roomStudentData(obj.roomId,function(err,studentIds) {
                            if(studentIds != null) {
                              Users.find({_id:{$in:studentIds}})
                              .select('deviceType deviceId')
                              .exec(function(error, result){
                                if (result && result.length > 0) {
                                  for (var i = 0; i <= result.length - 1; i++) {
                                   if (result[i].deviceType == 'ANDROID') {
                                      sendPushNotificationAndroid("FILE-DISCRIPTION", message, result[i].deviceId, person._id, result[i]._id)
                                    }
                                  }
                                }
                              });
                            }
                          });
                          }
                        });
                      });
                    }
                  });
                }
              }
            });         
          } else {
            res.json({
              status : false, 
              error : "Access denied", 
              message : 'Unauthorized User'
            });
          }
        })
      }
    }
  } catch(e) {
    console.log('error in setUploadFileDesc',e);
    res.json({
        status : false, 
        error : "Internal server error."
      });
  }
}

/*
@Function Name : addGroupStudent
@Purpose : "To add participants of participantgroup collection to students collection at room side"
@Request Object : studentdata:{roomId,groupId,instId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function addGroupStudent(req, res){
  
  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.body.studentdata && req.body.studentdata.groupId && mongoose.Types.ObjectId.isValid(req.body.studentdata.groupId)) {
        let obj = req.body.studentdata;
        if(!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status : false, 
            error :  "Invalid room"
          });
        } else if(!obj.instId || validator.isEmpty(obj.instId) || !mongoose.Types.ObjectId.isValid(obj.instId)) {
          res.json({
            status : false, 
            error :  "Invalid instructor"
          });
        } else {
          var query = ParticipantsGroup.findOne({_id : obj.groupId}); 
          query.exec(function(error, groupData) {
            if (error) {
              res.json({
                status: false, 
                error : error.message
              });
            } else if (groupData) {
              var selectorForStudent = {
                "roomId": mongoose.Types.ObjectId(obj.roomId),
                "instId": mongoose.Types.ObjectId(obj.instId)
              };

              //Checking for Student collection exsistance for particular room and instructor
              var query = Student.findOne(selectorForStudent);
              query.exec(function (error, studentsData) {
                if (error) {
                  res.json({ 
                    status: false, 
                    error : "Error while fetching students data." 
                  });
                }
                if (studentsData) {
                  var selectorForStudentsUpdate = {
                  "roomId": mongoose.Types.ObjectId(obj.roomId),
                  "instId": mongoose.Types.ObjectId(obj.instId)
                  };
                  var addToSet = { 
                    $addToSet : { 
                      students : { 
                        $each : groupData.participants 
                      }
                    },               
                    modifiedBy: mongoose.Types.ObjectId(obj.uid), 
                    modifiedOn: moment().utc().toDate() 
                  };

                  //Updating Students collection with participantsgroup students
                  var query = Student.update(selectorForStudentsUpdate, addToSet);
                  query.exec(function (err, doc) {
                    if (err) {
                      res.json({ 
                        status : false, 
                        error: error.message
                      });
                    } else {

                    //Checking Student collection updation to send as response
                      var query = Student.findOne(selectorForStudentsUpdate);
                      query.select('roomId instId students')
                      .populate('instId students', 'firstname lastname email profile.profileImage role', { userStatus : 'Active' })
                      .populate('roomId', 'roomName')
                      .exec(function (err1, studentCollectionData) {
                          if (err1) { 
                            res.json({ 
                              status: false, 
                              error : err1.message 
                            }); 
                          } else {
                            res.json({ 
                              status: true, 
                              data: studentCollectionData, 
                              message : "Group added successfully." 
                            });

                            let emailData = [];
                            let studentIds = [];
                            for(let i = 0; i < studentCollectionData.students.length; i++) {
                              emailData.push(studentCollectionData.students[i].email);
                              studentIds.push(studentCollectionData.students[i]._id);
                            }

                            Users.find({ _id:{$in: studentIds }})
                            .select('deviceId deviceType')
                            .exec(function(err, stuData) {
                              if(stuData) {
                                let roomObj
                                if(person.role == Roles.Lmsadmin) {
                                  roomObj = {
                                  userEmail : emailData,
                                  subject : 'New Students added to the Course.',
                                  userBody : 'You have been added to the Course ' +studentCollectionData.roomId.roomName+' by '+person.firstname+'.',
                                  operatorBody : 'You have successfully added new students to the Course ' +studentCollectionData.roomId.roomName+'.',
                                  email : person.email
                                  };

                                  let instructorMailData = {
                                    to : studentCollectionData.instId.email,
                                    subject : 'New Students added to the  Course.',
                                    body : 'New students has been added to the Course '+studentCollectionData.roomId.roomName+' by '+person.firstname+'.',
                                    descreption : 'Ignore mail if not relevant.'
                                  };

                                  //createdBy: pranathi, disc: push notification for android students 
                                  let message = 'Your account has been added to the Room ' +studentCollectionData.roomId.roomName+'.';
                                  if (stuData && stuData.length > 0) {
                                    for (var i = 0; i <= stuData.length - 1; i++) {
                                      if(stuData && stuData[i].deviceType == 'ANDROID') {
                                        sendPushNotificationAndroid("ADDGROUP-STUDENTS", message, stuData[i].deviceId, person._id, stuData[i]._id);
                                      }
                                    }
                                  }
                                  //push notification for instructor
                                  if(studentCollectionData) {
                                    Users.findOne({_id : studentCollectionData.instId._id})
                                    .select('deviceId deviceType')
                                    .exec(function(error, insData){
                                      let insMessage = 'New students have been added to the Room '+studentCollectionData.roomId.roomName+'.';
                                      if(insData && insData.deviceType == 'ANDROID') {
                                        sendPushNotificationAndroid("ADDGROUP-STUDENTS", insMessage, insData.deviceId, person._id, insData._id);
                                      }
                                    });
                                  }
                                  //Commented for temporary bases 
                                  // Email will be sent to instructor when admin add students group under the instructor
                                  
                                  // EmailForUserCreation.defaultUserMail(instructorMailData, function(emailerror, emailsuccess) {
                                  //   if (emailerror.status == false) {
                                  //     console.log("Email not sent");
                                  //   } else {
                                  //     //console.log('email sent')
                                  //   }
                                  // });
                                  sendRoomEmail(roomObj);
                                } else {
                                  roomObj = {
                                    userEmail : emailData,
                                    subject : 'New Students added to the Course.',
                                    userBody : 'You have been added to the Course ' +studentCollectionData.roomId.roomName+' by '+person.firstname+'.',
                                    operatorBody : 'You have successfully added new students to the Course ' +studentCollectionData.roomId.roomName+'.',
                                    email : person.email
                                  };
                                  sendRoomEmail(roomObj);

                                  //createdBy: pranathi, disc: push notification for android students 
                                  let message = 'Your account has been added to the Room ' +studentCollectionData.roomId.roomName+'.';
                                  if (stuData && stuData.length > 0) {
                                    for (var i = 0; i <= stuData.length - 1; i++) {
                                      if( stuData && stuData[i].deviceType == 'ANDROID') {
                                        sendPushNotificationAndroid("ADDGROUP-STUDENTS", message, stuData[i].deviceId, person._id, stuData[i]._id);
                                      }
                                    }
                                  }
                                } 
                              }
                            });
                        }
                      });
                    }
                  });
                } else { 

                  //If Student Collection for particular room and instructor doen't exists then create
                  var objSave = {};
                  objSave['roomId'] = mongoose.Types.ObjectId(obj.roomId);
                  objSave['instId'] = mongoose.Types.ObjectId(obj.instId);
                  objSave['students'] = groupData.participants;
                  objSave['createdBy'] = mongoose.Types.ObjectId(person._id);
                  objSave['modifiedBy'] =  mongoose.Types.ObjectId(person.id);         

                  //Creating instance for Student Collection
                  var studentObj = new Student(objSave);

                  //Save created instance for Student Collection
                  studentObj.save((err, saved) => {
                    if (err) {
                      res.json({ 
                        status : false, 
                        error : err 
                      });
                    } else {
                      //Check for collection creation so as to send as response
                      var query = Student.findOne({ _id : saved._id });
                      query.select('roomId instId students')
                      .populate('instId students', 'firstname lastname email profile.profileImage role', { userStatus : 'Active' })
                      .populate('roomId', 'roomName')
                      .exec(function (err1, doc1) {
                        if (err1) { 
                          res.json({ 
                            status: false, 
                            error : err1.message 
                          }); 
                        } else {
                          res.json({ 
                            status: true, 
                            data: doc1, 
                            message : "Group added successfully." 
                          });
                        }
                      });
                    }
                  });
                }
              });
            } else {
              res.json({
                status: false, 
                error : "Invalid group"
              });
            }
          });
        }
      } else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }      
    } catch(e) {
      console.log('error in addGroupStudent',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : listRoomAssignment
*  @Purpose : For fetching assignment data based on room
*  @Request Object : query : { roomId, page, items, search }
*  @Response Object : Success - Assignment data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listRoomAssignment(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page || !req.query.roomId || !mongoose.Types.ObjectId.isValid(req.query.roomId)) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let listroom = req.query;
        var selector = {};

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }

        //Search selector based on user role
        if (person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Moderator || person.role == Roles.Presenter || person.role == Roles.User || person.role == Roles.Instructor) {

          //code added by Najib to show the list of assignments created by instructor and admin not created by other instructor
            Users.findOne({'profile.companyid' : bussinessID, 'role' : Roles.Lmsadmin}, function(adminError, admin) {
              if(adminError) {
                res.json({status : false})
              } else if(admin) {
                if (person.role == Roles.Instructor) {
                  selector = {
                    roomId : listroom.roomId,
                    '$or' : [
                      {'createdBy' : mongoose.Types.ObjectId(person._id)},
                      {'createdBy' : mongoose.Types.ObjectId(admin._id)}
                    ]
                  }                        
                } else {
                  selector = {
                    roomId : listroom.roomId
                  };
                }   
              } else {
                selector = {
                  roomId : listroom.roomId
                };
              }           

            //If search is not empty then create RegExp
            if (listroom.search && listroom.search != '') {
              let slash_search = addSlash(listroom.search);
              let searchKey = RegExp(slash_search,'i');         
              selector['$or'] = [                
                { 'assignmentName' : {$regex: searchKey} },
                { 'description' : {$regex: searchKey} }
              ]; 
            }

            //Query for fetching complete assignment data based on selector and skip items based on itemsPerPage on previous page
            var query = Assignment.find(selector)
            .limit(Number(listroom.items))
            .populate('assignedTo createdBy', 'topicName firstname lastname') 
            .select('assignmentName assignedTo createdBy')
            .skip(Number(listroom.items) * (Number(listroom.page)-1))
            .sort({
              createdAt: -1
            })
                          
            .exec(function(err, result) {
              if (err) {
                res.json({ 
                  status : false, 
                  error : err.message 
                });
              } else {

                //Query for counting complete assignment data based on selector
                Assignment.count(selector).exec(function(error, count) {
                  res.json({ 
                    status : true, 
                    data : result, 
                    count : count 
                  });
                });
              }
            });
          });
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("Error in list room assignment", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}
/**
*  @Function name : saveRoomAssignment
*  @Purpose : For creating assignment in room
*  @Request Object : roomAssignmentData : { room assignment data }
*  @Response Object : Success - Success message, Assignment data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveRoomAssignment(req, res) {
  checkValidRequest(req.headers, function(person) {
    //console.log('person====',person)
    try {

      //Verifying if request is valid or not
      if (person != null && req.body.roomAssignmentData) {
        var obj = req.body.roomAssignmentData;

        //Validating if room id is valid or not
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status: false, 
            error : "Invalid Room."
          });
        } else {

          //Query for finding room data
          var query = Room.findOne({ 
            _id : mongoose.Types.ObjectId(obj.roomId) 
          });
          query.exec(function(err, docs) {
            if (err) {
              res.json({
                status: false, 
                error: "Room not found."
              })
            } else {
              if (!obj._id || validator.isEmpty(obj._id) || !mongoose.Types.ObjectId.isValid(obj._id)) {
                obj['createdBy'] = mongoose.Types.ObjectId(person._id);
                delete obj['uid'];
                if(obj.assignedTo == '') {
                  obj['assignedTo'] = null
                }

                if(_.isEmpty(obj.uploadData)) {
                  const objUser = new Assignment(obj);

                  //Query for creating assignment
                  Assignment.create([objUser], (error, data) => {
                    // console.log('data===', data)
                    if (!error) {
                      res.json({ 
                        status: true, 
                        data: data[0], 
                        message : "Created successfully."  
                      });
                      let schObj = {
                        roomId : obj.roomId,
                        subject : 'The Assignment Created.',
                        body : 'The New assignment '+'<b>' + obj.assignmentName + '</b>' +' has been successfully created by '+ '<b>' + person.firstname + '</b>.',
                        createdBy : data[0].createdBy,
                        createdBody : 'The New assignment '+'<b>' + obj.assignmentName + '</b>'+' has been successfully created by '+ '<b>' + 'you' + '</b>.',
                      };
                      sendScheduleEmail(schObj);
                    } else {  
                      let errors = [];
                      if (error.name == 'ValidationError') { 
                        for (let field in error.errors) {
                         errors.push(error.errors[field].message); 
                        }
                      }            
                      res.json({ 
                        status: false,
                        error : errors  
                      });
                    }
                  });
                } else {

                  // For removing spaces, parantheses in filename
                  let tempFileName = obj.uploadData.fileName.replace(/[ )(]+/g, '');
                  let fileExt = tempFileName.substr(tempFileName.lastIndexOf(".") + 1);

                  if(obj.uploadData.fileType !='application' && obj.uploadData.fileType !='text') {
                    console.log("Assignment upload1 - Invalid File Extension");
                    res.json({
                      status: false, 
                      error : "Invalid File Format."
                    });
                  } else if(obj.uploadData.fileSize > 20971520) {
                    console.log("Topic upload - File Size exceeded");
                    res.json({
                      status: false, 
                      error : "File Size should be less than 20MB."
                    });
                  } else {
                    if (fileExt == 'exe' || fileExt == 'js' || fileExt == 'jar' || fileExt == 'bat' || fileExt == 'cmd' || fileExt == 'pif' || fileExt == 'app' || fileExt == 'bin' || fileExt == 'rbf' || fileExt == 'sh' || fileExt == 'py' || fileExt == 'reg' || fileExt == 'inf' || fileExt == 'scf' || fileExt == 'application' || fileExt == 'com' || fileExt == 'dll' || fileExt == 'html') {
                      console.log("Assignment upload2 - Invalid File Extension");
                      res.json({
                        status: false, 
                        error : "Invalid File Format."
                      });
                    } else if(obj.uploadData.fileType =='text' && fileExt != 'txt') {
                      console.log("Assignment upload3 - Invalid File Extension");
                      res.json({
                        status: false, 
                        error : "Invalid File Format."
                      });
                    } else if(obj.uploadData.file == undefined){
                      res.json({
                        status: false, 
                        error : "File is Empty or unsupported."
                      });
                    } else {
                      multer({ 
                        dest: process.env.PWD+"/uploads/",
                        limits: { fieldSize: 20 * 1024 * 1024 }
                      }).single('upl')

                      //Creating buffer for upload file 
                      var imageBuffer = new Buffer(obj.uploadData.file, "base64");
                      //console.log(process.env.PWD+"/uploads/");

                      var randomstring = '';
            
                      //Function call for creating randomstring
                      createRandomString(function(data) {
                        randomstring = data
                      });

                      // For removing spaces, parantheses in filename
                      var fileName = obj.uploadData.fileName.replace(/[ )(]+/g, '');   //obj.fileName.replace(/\s+/g, '');

                      //Destination for upload file
                      var dest = process.env.PWD+"/uploads/"+randomstring+"_"+fileName;

                      //Creating new file at destination
                      fs.writeFile(dest,imageBuffer,'base64',function(uploadFailed,uploaded){
                        if (uploadFailed) {
                          res.json({
                            status:false,
                            error:uploadFailed
                          });
                        } else {
                          delete obj['uploadData']['file'];
                          obj['uploadData']['fileName'] = randomstring+"_"+fileName
                          const objUser = new Assignment(obj); 

                          //Used async parallel for running the tasks collection of functions in parallel, 
                          //without waiting until the previous function has completed.
                          //Used async refect to continue the execution of other tasks when a task fails.
                          async.parallel([
                            async.reflect(function(callback) {
                              Assignment.create([objUser], (error, data) => {
                                if (!error) {
                                  callback(null, data[0])
                                } else {
                                  callback("Assignment not created.")
                                }
                              })
                            }),
                          ],
                          // optional callback
                          function(err, results) {
                            if(err) {
                              res.json({ 
                                status : false, 
                                error : err.message
                              });
                            } else {

                              //For finding error object in results
                              let errorObject = _.find(results, 'error');

                              //Verifying if error object is there or not
                              if(errorObject == undefined) {
                                res.json({ 
                                  status: true, 
                                  data: results[0].value, 
                                  message : "Created successfully."  
                                });

                                /*//For finding extension of filename
                                let ext = fileName.substr(fileName.lastIndexOf(".") + 1);

                                //For converting files to pdf by unoconv command using shell package 
                                if( (ext != "pdf") && (ext != "gif") && (ext != "wav") && (ext != 'mp3') && (ext != 'wmv') && (ext != 'mp4') && (ext != 'mkv') && (ext != 'zip')) {
                                  if (shell.exec('unoconv -f pdf '+dest).code !== 0) {
                                    shell.echo('Error: Converting failed');
                                  }
                                }*/
                              } else {
                                res.json({ 
                                  status : false, 
                                  error : "Error while creating assignment." 
                                }); 
                              }
                            }
                          }); 
                        }
                      });
                    }
                  }
                }
              }
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("Error in save room assignment", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
*  @Function name : updateRoomAssignment
*  @Purpose : For updating assignment in room
*  @Request Object : roomtopicdata : { room topic data }
*  @Response Object : Success - Success message, Assignment data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function updateRoomAssignment(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.body.roomAssignmentData && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
        var obj = req.body.roomAssignmentData;

        //Validating if room id is valid or not
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({
            status: false, 
            error : "Invalid Room."
          });
        } else {

          //Query for finding room data
          var query = Room.findOne({ 
            _id : mongoose.Types.ObjectId(obj.roomId) 
          });
          query.exec(function(err, docs) {
            if (err) {
              res.json({
                status: false, 
                error: "Room not found."
              });
            } else if (docs) {
              obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
              delete obj['uid'];
              if(obj.assignedTo == '') {
                obj['assignedTo'] = null
              }

              if(_.isEmpty(obj.uploadData)) {

                //Query for updating assignment
                Assignment.update({
                  _id : mongoose.Types.ObjectId(req.params.id), 
                  roomId : mongoose.Types.ObjectId(obj.roomId),
                  }, { 
                    $set: {
                      assignmentName : obj.assignmentName,
                      assignedTo : obj.assignedTo,
                      content : obj.content
                    }
                  }, function (error, result) {
                  if (error) {
                    res.json({ 
                      status: false,
                      error : "Assignment not updated."  
                    });
                  } else if (result) {

                    //Query for sending the updated record to the client
                    var query = Assignment.findOne({ 
                      _id : mongoose.Types.ObjectId(req.params.id), 
                      roomId : mongoose.Types.ObjectId(obj.roomId),
                    });
                    query.exec(function (err, doc) {
                      if (err) { 
                        res.json({ 
                          status: false 
                        }); 
                      } else if (doc) {
                        res.json({ 
                          status: true, 
                          data: doc, 
                          message : "Updated successfully." 
                        });
                        let schObj = {
                          roomId : doc.roomId,
                          subject : 'The Assignment Updated.',
                          body : 'The assignment '+'<b>' + doc.assignmentName + '</b>' +' has been successfully updated by '+'<b>' + person.firstname + '</b>.',
                          createdBody : 'The assignment '+'<b>' + doc.assignmentName + '</b>'+' has been successfully updated by '+ '<b>' + 'you' + '</b>.',
                          createdBy : doc.createdBy
                        };
                        sendScheduleEmail(schObj);
                      } else {
                        res.json({ 
                          status: false 
                        });
                      }
                    });
                  }
                })
              } else {

                // For removing spaces, parantheses in filename
                let tempFileName = obj.uploadData.fileName.replace(/[ )(]+/g, '');
                let fileExt = tempFileName.substr(tempFileName.lastIndexOf(".") + 1);

                if(obj.uploadData.fileType !='application' && obj.uploadData.fileType !='text') {
                  console.log("Assignment upload - Invalid File Extension");
                  res.json({
                    status: false, 
                    error : "Invalid File Format."
                  });
                } else if(obj.uploadData.fileSize > 20971520) {
                  console.log("Topic upload - File Size exceeded");
                  res.json({
                    status: false, 
                    error : "File Size should be less than 20MB."
                  });
                } else {
                  if (fileExt == 'exe' || fileExt == 'js' || fileExt == 'jar' || fileExt == 'bat' || fileExt == 'cmd' || fileExt == 'pif' || fileExt == 'app' || fileExt == 'bin' || fileExt == 'rbf' || fileExt == 'sh' || fileExt == 'py' || fileExt == 'reg' || fileExt == 'inf' || fileExt == 'scf' || fileExt == 'cmd' || fileExt == 'application' || fileExt == 'com' || fileExt == 'dll' || fileExt == 'html') {
                    console.log("Assignment upload - Invalid File Extension");
                    res.json({
                      status: false, 
                      error : "Invalid File Format."
                    });
                  } else if(obj.uploadData.fileType =='text' && fileExt != 'txt') {
                    console.log("Assignment upload3 - Invalid File Extension");
                    res.json({
                      status: false, 
                      error : "Invalid File Format."
                    });
                  } else if(obj.uploadData.file == undefined){
                    res.json({
                      status: false, 
                      error : "File is Empty or unsupported."
                    });
                  } else {
                    multer({ 
                      dest: process.env.PWD+"/uploads/",
                      limits: { fieldSize: 20 * 1024 * 1024 }
                    }).single('upl')

                    //Creating buffer for upload file 
                    var imageBuffer = new Buffer(obj.uploadData.file, "base64");
                    //console.log(process.env.PWD+"/uploads/");

                    var randomstring = '';
          
                    //Function call for creating randomstring
                    createRandomString(function(data) {
                      randomstring = data
                    });

                    // For removing spaces, parantheses in filename
                    var fileName = obj.uploadData.fileName.replace(/[ )(]+/g, '');   //obj.fileName.replace(/\s+/g, '');

                    //Destination for upload file
                    var dest = process.env.PWD+"/uploads/"+randomstring+"_"+fileName;

                    //Creating new file at destination
                    fs.writeFile(dest,imageBuffer,'base64',function(uploadFailed,uploaded){
                      if (uploadFailed) {
                        res.json({
                          status:false,
                          error:uploadFailed
                        });
                      } else {
                        delete obj['uploadData']['file'];
                        obj['uploadData']['fileName'] = randomstring+"_"+fileName

                        //Query for updating assignment
                        Assignment.update({
                          _id : mongoose.Types.ObjectId(req.params.id), 
                          roomId : mongoose.Types.ObjectId(obj.roomId),
                          }, { 
                            $set: obj
                          }, (error, data) => {
                          if (!error) {

                            //Query for sending the updated record to the client
                            var query = Assignment.findOne({ 
                              _id : mongoose.Types.ObjectId(req.params.id), 
                              roomId : mongoose.Types.ObjectId(obj.roomId),
                            });
                            query.exec(function (err, doc) {
                              if (err) { 
                                res.json({ 
                                  status: false 
                                }); 
                              } else {
                                res.json({ 
                                  status: true, 
                                  data: doc, 
                                  message : "Updated successfully." 
                                });
                              }
                            });

                            /*//For finding extension of filename
                            let ext = fileName.substr(fileName.lastIndexOf(".") + 1);

                            //For converting files to pdf by unoconv command using shell package 
                            if( (ext != "pdf") && (ext != "gif") && (ext != "wav") && (ext != 'mp3') && (ext != 'wmv') && (ext != 'mp4') && (ext != 'mkv') && (ext != 'zip')) {
                              if (shell.exec('unoconv -f pdf '+dest).code !== 0) {
                                shell.echo('Error: Converting failed');
                              }
                            }*/
                          } else {              
                            res.json({ 
                              status: false,
                              error : "Assignment not updated."  
                            });
                          }
                        }); 
                      }
                    });
                  }
                }
              }
            } else {
              res.json({
                status: false, 
                error: "Room not found."
              });
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("Error in update room assignment", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchTopicData
*  @Purpose : For fetching complete topic data
*  @Request Object : params : { id: "room id" }
*  @Response Object : Success - Topic data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchTopicData(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);

          //Query for finding the topic data based on room id
          var query = Topic.find({ 
            roomId : recordId ,
            topicEnable:true
          })          
          .select('_id topicName') 
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : 'Invalid Topic' 
              }); 
            } else if (doc) {
              res.json({ 
                status: true, 
                data: doc 
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("error in fetch topic data", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : listAssignmentSubmission
*  @Purpose : For fetching submission data based on assignment
*  @Request Object : query : { roomId, assignmentId, page, items }
*  @Response Object : Success - Assignment data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listAssignmentSubmission(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page || !req.query.roomId || !mongoose.Types.ObjectId.isValid(req.query.roomId) || !req.query.assignmentId || !mongoose.Types.ObjectId.isValid(req.query.assignmentId)) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let listroom = req.query;
        var selector = {};

        //Search selector based on user role
        if (person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Moderator || person.role == Roles.Presenter || person.role == Roles.User || person.role == Roles.Instructor) {
          selector = {
            roomId : listroom.roomId,
            _id : listroom.assignmentId
          };

          //Query for fetching complete assignment data based on selector and skip items based on itemsPerPage on previous page

          //changes done by prateek for bug#3082 
          
          var query = Assignment.findOne(selector, {
            submissions : {
              $slice : [(Number(listroom.items) * (Number(listroom.page)-1)), (Number(listroom.items))]
            }
          })                   
          .exec(function(err, result) {
            if (err) {
              res.json({ 
                status : false, 
                error : err.message 
              });
            } else if (result) {
              let len = result.submissions ? result.submissions.length : 0;
            
              //function for populate roomName rommType from Room collection
              if(len > 0) {
                function populateData() {
                  let data = result.submissions[len -1];
                      
                  Users.findOne({_id:data.studentId}, { firstname : 1, lastname : 1}, function (err, userData) {
                    if(err) {
                      res.json({ status:false, error: err.message});
                    } else if (userData) {
                      data['studentId'] = userData;
                      len = len - 1;
                      if (len > 0) {
                        populateData();
                      } else {

                        //Query for counting complete assignment data based on selector
              
                        Assignment.findOne(selector).exec(function(error, count) {
                          if(error) {
                            res.json({
                              status : false,
                              error : err.message
                            })
                          } else if(count) {
                            res.json({ 
                              status : true, 
                              data : result, 
                              count : count.submissions.length 
                            });
                          }
                        });
                      }
                    } 
                  });
                }
                populateData();
              } else {
                res.json({ 
                  status : true, 
                  data : result, 
                  count : 0 
                });
              }
                                              
            } else {
              res.json({ 
                status : false, 
                error : "Invalid assignment"
              });
            }
          });
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("error in list assignment submission", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchAssignmentData
*  @Purpose : For fetching particular assignment data
*  @Request Object : params : { id: "assignment id", rid: "room id" }
*  @Response Object : Success - Assignment data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchAssignmentData(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !req.params.rid) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id and assignment id is valid or not
        if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid assignment"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);

          //Query for finding the assignment data based on assignment id
          var query = Assignment.findOne({ 
            _id : recordId,
            roomId : req.params.rid, 
          })
          .populate('assignedTo', 'topicName')           
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : 'Invalid Assignment' 
              }); 
            } else if (doc) {
              res.json({ 
                status: true, 
                data: doc 
              });
            } else {
              res.json({ 
                status: false, 
                error : 'Invalid Assignment' 
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("error in fetch assignmend data", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteAssignmentUploadedFile
*  @Purpose : For deleting assignment uploaded file
*  @Request Object : params : { rid: "room id", aid: 'assignment id' }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteAssignmentUploadedFile(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.params.rid && req.params.aid ) {

        //Validating if room id is valid or not
        if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid room."
          });
        } else if (!req.params.aid || validator.isEmpty(req.params.aid) || !mongoose.Types.ObjectId.isValid(req.params.aid)) {
          res.json({
            status: false, 
            error : "Invalid assignment."
          });
        } else {
          
          //Query for checking if the upload id is present in database
          var query = Assignment.findOne({ 
            _id : mongoose.Types.ObjectId(req.params.aid), 
            roomId : mongoose.Types.ObjectId(req.params.rid),
          });
          query.exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else if (doc) {

              //Function calling for deleting files from uploads folder
              deleteFilesFromDest(doc.uploadData, function(status) {
                if (status == true) {

                  //Query for removing the upload data
                  Assignment.update({
                    _id : mongoose.Types.ObjectId(req.params.aid), 
                    roomId : mongoose.Types.ObjectId(req.params.rid),
                    }, { 
                      $unset: { 
                        "uploadData": null 
                     } 
                   }, function (error, result) {
                    if (error) { 
                      // console.log("Error", error.message);
                      res.json({ 
                        status : false, 
                        error: "Upload not present in current assignment." 
                      });
                    } else {
                      Assignment.findOne({
                        _id : mongoose.Types.ObjectId(req.params.aid), 
                        roomId : mongoose.Types.ObjectId(req.params.rid) 
                      })
                      .populate('assignedTo', 'topicName')
                      .exec(function(error,assDoc) {
                        if (error) {
                          res.json({
                            status: false,
                            error: "Assignment not found"
                          });
                        } else if (assDoc) {
                          res.json({ 
                            status : true, 
                            data : assDoc,
                            message : "Deleted successfully." 
                          });
                        } else {
                          res.json({
                            status: false,
                            error: "Internal server error"
                          });
                        }
                      });
                    }
                  })
                } else {
                  res.json({ 
                    status : false, 
                    error : "Error in deleting file" 
                  }); 
                }
              });
            } else {
              res.json({ 
                status: false, 
                error : "Invalid assignment"
              });
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("error in delete assignment uploded file", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteAssignment
*  @Purpose : For deleting assignment
*  @Request Object : params : { rid: "room id", aid: 'assignment id' }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteAssignment(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.params.rid && req.params.aid ) {

        //Validating if room id is valid or not
        if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid room."
          });
        } else if (!req.params.aid || validator.isEmpty(req.params.aid) || !mongoose.Types.ObjectId.isValid(req.params.aid)) {
          res.json({
            status: false, 
            error : "Invalid assignment."
          });
        } else {
          
          //Query for checking if the upload id is present in database
          var query = Assignment.findOne({ 
            _id : mongoose.Types.ObjectId(req.params.aid), 
            roomId : mongoose.Types.ObjectId(req.params.rid),
          });
          query.exec(function (err, doc) {
            //console.log('doc', doc)
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else if (doc) {
              if (_.isEmpty(doc.submissions) && doc.uploadData.fileName == undefined ) {

                //Query for removing the assignment data
                Assignment.remove({
                  _id : mongoose.Types.ObjectId(req.params.aid), 
                  roomId : mongoose.Types.ObjectId(req.params.rid),
                })
                .exec(function (error, response) {
                  if (error) { 
                    res.json({ 
                      status : false, 
                      error: "Error in deleting assignment" 
                    });
                  } else {
                    res.json({ 
                      status : true, 
                      message: "Assignment deleted successfully" 
                    });

                    let schObj = {
                      roomId : doc.roomId,
                      subject : 'The Assignment Deleted',
                      body : 'The assignment ' +'<b>' + doc.assignmentName + '</b>' + ' has been successfully deleted by '+'<b>' + person.firstname + '</b>.',
                      createdBy : doc.createdBy,
                      createdBody : 'The assignment '+'<b>' + doc.assignmentName + '</b>'+' has been successfully deleted by '+ '<b>' + 'you' + '</b>.',
                    };
                    sendScheduleEmail(schObj);
                  }
                });
              } else {
                var deletingData = [];

                //For verifying if upload and submission data is there or not
                if (_.isEmpty(doc.submissions) && doc.uploadData.fileName != undefined) {
                  deletingData.push(doc.uploadData)
                } else if (doc.uploadData.fileName == undefined && doc.submissions && doc.submissions.length > 0) {
                  doc.submissions.forEach(function(item) {
                    deletingData.push(item)
                  })
                } else {
                  deletingData.push(doc.uploadData)
                  doc.submissions.forEach(function(item) {
                    deletingData.push(item)
                  })
                }

                //Async.forEachOf iteratee to each item in doc, in parallely
                async.forEachOf(deletingData, function (data, key, callback) {

                  //Function calling for deleting files from uploads folder
                  deleteFilesFromDest(data, function(status) {
                    if (status == true) {
                      callback()
                    } else {
                      return callback('Error in deleting file');
                    }
                  });
                }, function (err) {
                  if (err) {
                    console.log("Error in deleting file", err)
                    res.json({ 
                      status : false, 
                      error : err 
                   });
                  } else {

                    //Query for removing the assignment data
                    Assignment.remove({
                      _id : mongoose.Types.ObjectId(req.params.aid), 
                      roomId : mongoose.Types.ObjectId(req.params.rid),
                    })
                    .exec(function (error, response) {
                      if (error) { 
                        res.json({ 
                          status : false, 
                          error: "Error in deleting assignment" 
                        });
                      } else {
                        res.json({ 
                          status : true, 
                          message: "Assignment deleted successfully" 
                        });
                      }
                    });
                  }
                });
              }
            } else {
              res.json({ 
                status: false, 
                error : "Invalid assignment" 
              });
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("error in delete assignment", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : roomTopicEnable
*  @Purpose : For enabling & disabling topic files
*  @Request Object : fileEnable { id : topicId, topicEnable :topicEnable }
*  @Response Object : Success - fileEnable, Failure - Error message
*  @Author : Pranathi */

export function roomTopicEnable (req, res) {

  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id) || !req.body || !req.body.topicEnable) {
        res.json({ status : false, error : "InValid request." });
      } else {
        let obj = req.body.topicEnable;

          let topicId = mongoose.Types.ObjectId(req.params.id);
          
          //Fetching topic details from the topics collection
          Topic.findOne({ _id : topicId }, function(err, data){
            // console.log("data",data);
            if (data) {
              if (data.createdBy._str === person._id._str) {

                //Query for update status in the topics collection
                Topic.findOneAndUpdate({ _id : topicId },
                  { $set : obj
                  },function (err, response) {
                    if (err) { res.json({ status : false, error : err.message });
                    } else {
                      res.json({ status: true, id: topicId, res: response });

                      // createdBy: pranathi, disc: push notifications //
                      let message;
                      if(response.topicEnable == false) {
                        message = "The topic "+response.topicName +" has been added to the Room.";
                      } else {
                        message = "The topic "+response.topicName +" has been removed from the Room.";
                      }
                      
                      //createdBy: pranathi, disc: sending topic enable info notification to android students 
                      roomStudentData(response.roomId,function(error, studentIds){
                        if(studentIds != null) {
                          Users.find({_id:{ $in: studentIds }})
                          .select("deviceType deviceId")
                          .exec(function(stuErr, stuData) {
                            if(stuData) {
                              if ( stuData.length > 0) {
                                for (var i = 0; i <= stuData.length - 1; i++) {
                                  if (stuData[i].deviceType == 'ANDROID') {
                                    sendPushNotificationAndroid("TOPIC-ENABLE", message, stuData[i].deviceId, person._id, stuData[i]._id);
                                  }
                                }
                              }
                            }
                          });
                        }
                      });
                    }
                });
              } else {
                res.json({ status : false, error : "Access denied." });
              }
            } else {
              res.json({ status : false, error : "Invalid topic." });
            }
          });
        }
    } catch(e) {
      console.log("error in update roomTopicEnable", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
}


/**
*  @Function name : fetchPlagiarismData
*  @Purpose : For fetching the plagiarism data for showing in assignments submissions 
*  @Request params : { id : assignmentId, rid : roomId }
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek */

export function fetchPlagiarismData (req, res) {

  checkValidRequest(req.headers, function(person) {
    try {
      
      //Verifying if request is valid or not
      if (person == null || !req.params) {
        res.json({ status : false, error : "InValid request." });
      } else if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({
          status: false, 
          error : "Invalid assignmentId"
        });
      } else if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
        res.json({
          status: false, 
          error : "Invalid roomId"
        });
      } else if (!req.params.sid || validator.isEmpty(req.params.sid) || !mongoose.Types.ObjectId.isValid(req.params.sid)) {
        res.json({
          status: false, 
          error : "Invalid request"
        });
      } else {
        let obj = req.params;

        //Fetching Data 
        Assignment.findOne({
          _id : obj.id,
          roomId : obj.rid,
          "submissions._id" : obj.sid
        },{
          "submissions.$" : 1
        }).exec(function(err, assignmentData){
          if (err) {
            res.json({status : false, error : err.message});
          } else if(assignmentData) {
            let plagiarismData = assignmentData.submissions[0];
            var url = 'https://'+serverConfig.domin+"/uploads/"+plagiarismData.fileName;
                                    
            if(plagiarismData.plagiarismResult && plagiarismData.plagiarismResult.length <= 0 && plagiarismData.plagiarismResult != null) {
              if(plagiarismData.plagiarismId == undefined) {
                processForPlagiarismCheck(url, function(errPlagiarism, resPlagiarism) {
                  // console.log("Plagiarism cb1 --- ", resPlagiarism);
                  if(resPlagiarism) {
                    Assignment.update({
                      _id : obj.id,
                      roomId : obj.rid,
                      "submissions._id" : obj.sid
                    },
                    {
                      $set : {
                        "submissions.$.plagiarismId" : resPlagiarism,        
                      }
                    }).exec(function(err, updated){
                      if(err) {
                        res.json({
                          status : false,
                          error : err.message
                        })
                      } else {                        
                        plagiarismProcessResult(resPlagiarism, function(err, plagiarismRes){
                          if (err) {
                            // console.log(err,err);
                            res.json({status : false, error : err})
                          } else if(plagiarismRes) {
                            if(plagiarismRes.length <= 0) {
                              plagiarismRes = null;
                            }
                            Assignment.update({
                              _id : obj.id,
                              roomId : obj.rid,
                              "submissions._id" : obj.sid
                            },
                            {
                              $set : {
                                
                                "submissions.$.plagiarismResult" : plagiarismRes
                              }
                            }).exec(function(err, updated){
                              if(err) {
                                res.json({
                                  status : false,
                                  error : err.message
                                })
                              } else {
                                res.json({
                                  status : true, 
                                  data : plagiarismRes
                                })
                              }
                            })                              
                          }
                        })                          
                      }
                    })
                  } else {
                    res.json({
                      status : false,
                      error : errPlagiarism
                    })
                  }
                })
              } else {
                plagiarismProcessResult(plagiarismData.plagiarismId, function(err, plagiarismRes){
                    if (err) {
                      res.json({status : false, error : err})
                    } else if (plagiarismRes) {
                      if(plagiarismRes.length <= 0) {
                        plagiarismRes = null;
                      }
                      Assignment.update({
                        _id : obj.id,
                        roomId : obj.rid,
                        "submissions._id" : obj.sid
                      },
                      {
                        $set : {
                          
                          "submissions.$.plagiarismResult" : plagiarismRes
                        }
                      }).exec(function(err, updated){
                        if(err) {
                          res.json({
                            status : false,
                            error : err.message
                          })
                        } else {
                          res.json({
                            status : true, 
                            data : plagiarismRes
                          })
                        }
                      })                              
                    }
                })                        
              }
            } else {
              if(plagiarismData.plagiarismResult == null) {
                res.json({
                  status : true, 
                  data : []
                })     
              } else {
                res.json({
                  status : true, 
                  data : plagiarismData.plagiarismResult
                })
              }                   
            }    
          } else {
            res.json({status : false, error : "Invalid assiginment"});
          }
        })
      }
    } catch(e) {
      console.log("error in update fetchPlagiarismData", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
}

/**
*  @Function name : fetchRoomAttendance
*  @Purpose : For fetching particular room attendance data
*  @Request Object : params : { id: "room id" }
*  @Response Object : Success - Room attendance data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchRoomAttendance(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);
          
          //For finding student data based on room id and inst id
            var query = Student.findOne({ 
              roomId : recordId,
              instId : person._id
            });
          query.select('students')
          .exec(function (stuErr, stuDoc) {
            if (stuErr){ 
              res.json({ 
                status: false, 
                error : stuErr.message, 
                message : "Error while retriving student data." 
              });
            } 
            if (stuDoc) {

              //For finding student data count based on room id and created by
              var scheduleQuery = Schedule.count({ 
                roomId : recordId,
                createdBy : person._id
              })
              .exec(function (schErr, schCount) {
                if (schErr) { 
                  res.json({ 
                    status: false, 
                    error : schErr.message, 
                    message : "Error while retriving schedule count." 
                  });
                } else {
                  var totalSchedules = schCount;
                  var totalStudents = 0;
                  var totalStudentsAttended = 0;

                  //Verifying if student array length is greater than zero or not
                  if (stuDoc.students && stuDoc.students.length > 0) {
                    totalStudents += stuDoc.students.length

                    //Query for finding unique log data for those students who have joined the call
                    var logQuery = Logger.aggregate([
                      { 
                        $match: { 
                          uid : {
                            $in : stuDoc.students
                          },
                          'details.roomId' : recordId,
                          'details.hostId' : person._id,
                          actionType : "Join Call", 
                        } 
                      },
                      { 
                        $group: { 
                          _id: { 
                            scheduleId: "$details.scheduleId", 
                            uid: "$uid" 
                          } 
                        } 
                      }
                    ])
                    .exec(function (logErr, logData) {
                      if (logErr) {
                        res.json({ 
                          status: false, 
                          error: logErr.message, 
                        });
                      }
                      if (_.isEmpty(logData)) {
                        res.json({ 
                          status: false, 
                          error: 'No data', 
                        });
                      } else {
                        totalStudentsAttended += logData.length
                        var totalRecords = totalSchedules * totalStudents
                        var totalStudentsAbsent = totalRecords - totalStudentsAttended
                        let obj = {
                          absentRecords : (totalStudentsAbsent/totalRecords)*100,
                          presentRecords : (totalStudentsAttended/totalRecords)*100,
                          totalRecords : (totalRecords/totalRecords)*100
                        }
                        res.json({ 
                          status: true, 
                          data: obj, 
                        });
                      }
                    });
                  }
                }
              })
            } else {
              res.json({ 
                status: false, 
                data: 'No students', 
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("error in fetch room attendance", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : listStudent
*  @Purpose : For fetching student list in attendance module under room
*  @Request Object : query : { roomId, page, items }
*  @Response Object : Success - Student data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listStudent(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page || !req.query.roomId || !mongoose.Types.ObjectId.isValid(req.query.roomId)) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let liststudent = req.query;
        var selector = {};

        //Search selector based on user role
        if (person.role == Roles.Presenter || person.role == Roles.Instructor) {
          selector = {
            roomId : liststudent.roomId,
            instId : person._id
          };

          //Query for fetching student data based on selector and skip items based on itemsPerPage on previous page
          var query = Student.findOne(selector)
          .limit(Number(liststudent.items))
          .populate('students', 'firstname lastname') 
          .select('students')
          .skip(Number(liststudent.items) * (Number(liststudent.page)-1))
          .sort({
            createdAt: -1
          })
          .exec(function (stuErr, stuDoc) {
            if (stuErr){ 
              res.json({ 
                status: false, 
                error : 'Error while retriving student data', 
                message : "Error while retriving student data." 
              });
            } 
            if (stuDoc) {
              if (stuDoc.students && stuDoc.students.length > 0) {
                res.json({ 
                  status : true, 
                  data : stuDoc.students
                });
              } else {
                res.json({ 
                  status: false, 
                  error : "No students",
                });
              }
            }
          });
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("error in list student", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchStudentAttendance
*  @Purpose : For fetching particular student attendance data
*  @Request Object : params : { rid: "room id", id: 'student id' }
*  @Response Object : Success - Student attendance data, Failure - Error message
*  @Author : Aniket Gupta,pranathi
*/

export function fetchStudentAttendance(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id is valid or not
        if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.rid);
          var studentId = mongoose.Types.ObjectId(req.params.id);
          
          if(person.role == Roles.Instructor) {

            //For finding student data count based on room id and created by
            var scheduleQuery = Schedule.count({ 
              roomId : recordId,
              createdBy : person._id
            })
            .exec(function (schErr, schCount) {
              if (schErr) { 
                res.json({ 
                  status: false, 
                  error : schErr.message, 
                  message : "Error while retriving schedule count." 
                });
              } else {
                var totalSchedules = schCount;
                var totalSchedulesAttended = 0;

                //Query for finding unique log data for those students who have joined the call
                var logQuery = Logger.aggregate([
                  { 
                    $match: { 
                      uid : studentId,
                      'details.roomId' : recordId,
                      'details.hostId' : person._id,
                      actionType : "Join Call", 
                    } 
                  },
                  { 
                    $group: { 
                      _id: { 
                        scheduleId: "$details.scheduleId", 
                        uid: "$uid" 
                      } 
                    } 
                  }
                ])
                .exec(function (logErr, logData) {
                  if (logErr) {
                    res.json({ 
                      status: false, 
                      error: logErr.message, 
                    });
                  }
                  if (_.isEmpty(logData)) {
                    res.json({ 
                      status: false, 
                      error: 'No data', 
                    });
                  } else {
                    totalSchedulesAttended += logData.length
                    var totalRecords = totalSchedules
                    var totalSchedulesAbsent = totalRecords - totalSchedulesAttended
                    let obj = {
                      absentRecords : (totalSchedulesAbsent/totalRecords)*100,
                      presentRecords : (totalSchedulesAttended/totalRecords)*100,
                      totalRecords : (totalRecords/totalRecords)*100
                    }
                    res.json({ 
                      status: true, 
                      data: obj, 
                    });
                  }
                });
              }
            });
          }
          if(person.role == Roles.Student) {
          
            //For finding instructors data based on room id and student id
            var query = Student.find({ 
              roomId : recordId,
              students: { $in: [person._id]}
            });

            query.select('instId')
            .exec(function (insErr, insDoc) {
              if (insErr) { 
                res.json({ 
                  status: false, 
                  error : insErr.message, 
                  message : "Error while retriving instructors data." 
                });
              } 
              if(insDoc && insDoc.length > 0) {
                var instId = insDoc.map(function(d){ return d.instId });

                //For finding teachers data count based on room id and created by
                var scheduleQuery = Schedule.count({ 
                  roomId : recordId,
                  createdBy :{$in: instId}
                })
                .exec(function (schErr, schCount) {
                  if (schErr) { 
                    res.json({ 
                      status: false, 
                      error : schErr.message, 
                      message : "Error while retriving schedule count." 
                    });
                  } else {

                    var totalSchedules = schCount;
                    var totalInstructors = 0;
                    var totalClassesAttended = 0;
                    
                    //Verifying if instructor array length is greater than zero or not
                    if (insDoc && insDoc.length > 0) {
                      totalInstructors += insDoc.length
            
                      // Query for finding unique log data for student who have joined the calls
                      var logQuery = Logger.aggregate([
                        { 
                          $match: { 
                            uid : person._id,
                            'details.hostId' : {
                              $in : instId
                            },                          
                            'details.roomId' : recordId,
                            actionType : "Join Call", 
                          } 
                        },
                        { 
                          $group: { 
                            _id: {  
                              scheduleId: "$details.scheduleId", 
                              uid: "$uid" 
                            } 
                          } 
                        }
                      ])
                      .exec(function (logErr, logData) {
                        if (logErr) {
                          res.json({ 
                            status: false, 
                            error: logErr.message, 
                          });
                        }
                        if (_.isEmpty(logData)) {
                          res.json({ 
                            status: false, 
                            error: 'No data', 
                          });
                        } else {

                          totalClassesAttended += logData.length
                          var totalClasses = totalSchedules * totalInstructors;
                          var totalClassesNotAttended = totalClasses - totalClassesAttended;
                          let obj = {
                            absentClasses : (totalClassesNotAttended/totalClasses)*100,
                            presentClasses : (totalClassesAttended/totalClasses)*100,
                            totalClasses : (totalClasses/totalClasses)*100
                          }
                          res.json({ 
                            status: true, 
                            data: obj, 
                          });
                        }
                      });
                    }
                  }
                });
              } else {
                res.json({ 
                  status: false, 
                  data: 'No students', 
                });
              }
            });
          }
        }
      }
    } catch(e) {
      console.log("error in fetch student attendance", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : listClass
*  @Purpose : For fetching class/schedule list in attendance module under room
*  @Request Object : query : { roomId, page, items }
*  @Response Object : Success - Class data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listClass(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page || !req.query.roomId || !mongoose.Types.ObjectId.isValid(req.query.roomId)) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let listclass = req.query;
        var selector = {};

        //Search selector based on user role
        if (person.role == Roles.Presenter || person.role == Roles.Instructor) {
          selector = {
            roomId : listclass.roomId,
            createdBy : person._id
          };

          //Query for fetching schedule data based on selector and skip items based on itemsPerPage on previous page
          var query = Schedule.find(selector)
          .limit(Number(listclass.items))
          .skip(Number(listclass.items) * (Number(listclass.page)-1))
          .sort({
            createdAt: -1
          })
          .exec(function (schErr, schDoc) {
            if (schErr){ 
              res.json({ 
                status: false, 
                error : 'Error while retriving class data', 
                message : "Error while retriving class data." 
              });
            } 
            if (schDoc) {

              //Query for counting complete scheudle data based on selector
              Schedule.count(selector).exec(function(error, count) {
                if (error) {
                  res.json({ 
                    status : false, 
                    error : error.message
                  });
                } else {
                  res.json({ 
                    status : true, 
                    data : schDoc, 
                    count : count 
                  });
                }
              });
            }
          });
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("error in list class", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchClassAttendance
*  @Purpose : For fetching particular class attendance data
*  @Request Object : params : { rid: "room id", id: 'meeting id' }
*  @Response Object : Success - Class attendance data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchClassAttendance(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id is valid or not
        if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.rid);
          var meetingId = mongoose.Types.ObjectId(req.params.id);

          //For finding student data based on room id and inst id
          var query = Student.findOne({ 
            roomId : recordId,
            instId : person._id
          });
          query.select('students')
          .exec(function (stuErr, stuDoc) {
            if (stuErr){ 
              res.json({ 
                status: false, 
                error : stuErr.message, 
                message : "Error while retriving student data." 
              });
            } else if (stuDoc) {
              var totalStudents = 0;
              var totalStudentsAttended = 0;

              //Verifying if student array length is greater than zero or not
              if (stuDoc.students && stuDoc.students.length > 0) {
                totalStudents += stuDoc.students.length

                //Query for finding unique log data for those students who have joined the call
                var logQuery = Logger.aggregate([
                  { 
                    $match: { 
                      uid : {
                        $in : stuDoc.students
                      },
                      'details.roomId' : recordId,
                      'details.hostId' : person._id,
                      'details.scheduleId' : meetingId,
                      actionType : "Join Call", 
                    } 
                  },
                  { 
                    $group: { 
                      _id: { 
                        scheduleId: "$details.scheduleId", 
                        uid: "$uid" 
                      } 
                    } 
                  }
                ])
                .exec(function (logErr, logData) {
                  if (logErr) {
                    res.json({ 
                      status: false, 
                      error: logErr.message, 
                    });
                  }
                  if (_.isEmpty(logData)) {
                    res.json({ 
                      status: false, 
                      error: 'No data', 
                    });
                  } else {
                    totalStudentsAttended += logData.length
                    var totalRecords = totalStudents
                    var totalStudentsAbsent = totalRecords - totalStudentsAttended
                    let obj = {
                      absentRecords : (totalStudentsAbsent/totalRecords)*100,
                      presentRecords : (totalStudentsAttended/totalRecords)*100,
                      totalRecords : (totalRecords/totalRecords)*100
                    }
                    res.json({ 
                      status: true, 
                      data: obj, 
                    });
                  }
                });
              } else {
                res.json({ 
                  status: false, 
                  data: 'No students', 
                });
              }
            } else {
              res.json({ 
                status: false, 
                data: 'No students', 
              });
            }
          })
        }
      }
    } catch(e) {
      console.log("error in fetch class attendance", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchClassDetailedAttendance
*  @Purpose : For fetching particular class detailed attendance data
*  @Request Object : params : { rid: "room id", id: 'meeting id' }
*  @Response Object : Success - Class attendance data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchClassDetailedAttendance(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room id is valid or not
        if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.rid);
          var meetingId = mongoose.Types.ObjectId(req.params.id);

          //For finding student data based on room id and inst id
          var query = Student.findOne({ 
            roomId : recordId,
            instId : person._id
          });
          query.select('students')
          .populate('students', 'firstname lastname') 
          .exec(function (stuErr, stuDoc) {
            if (stuErr){ 
              res.json({ 
                status: false, 
                error : stuErr.message, 
                message : "Error while retriving student data." 
              });
            } 
            if (stuDoc) {
              var totalStudentsId = []

              //Verifying if student array length is greater than zero or not
              if (stuDoc.students && stuDoc.students.length > 0) {
                stuDoc.students.forEach(function (item) {
                  totalStudentsId.push(item._id)
                });

                //Query for finding unique log data for those students who have joined the call
                var logQuery = Logger.aggregate([
                  { 
                    $match: { 
                      uid : {
                        $in : totalStudentsId
                      },
                      'details.roomId' : recordId,
                      'details.hostId' : person._id,
                      'details.scheduleId' : meetingId,
                      actionType : "Join Call", 
                    } 
                  },
                  { 
                    $group: { 
                      _id: { 
                        scheduleId: "$details.scheduleId", 
                        uid: "$uid" 
                      } 
                    } 
                  }
                ])
                .exec(function (logErr, logData) {
                  if (logErr) {
                    res.json({ 
                      status: false, 
                      error: logErr.message, 
                    });
                  }
                  if (_.isEmpty(logData)) {
                    res.json({ 
                      status: false, 
                      error: 'No data', 
                    });
                  } else {
                    var final = []
                    stuDoc.students.forEach(function (studentData) {
                      var acceptedData = _.find(logData, { '_id': {'uid' : studentData._id }});
                      let fname = studentData.firstname.charAt(0).toUpperCase() + studentData.firstname.slice(1);
                      let lname = studentData.lastname.charAt(0).toUpperCase() + studentData.lastname.slice(1);
                      var studentName = fname+" "+lname
                      if (acceptedData == undefined) {
                        final.push({
                          name: studentName,
                          y: 1,
                          status: 'Not Attended',
                          color: "#c0392b"
                        })
                      } else {
                        final.push({
                          name: studentName,
                          y: 1,
                          status: 'Attended',
                          color: "#26A65B"
                        })
                      }
                    });
                    res.json({ 
                      status: true, 
                      data: final, 
                    });
                  }
                });
              } else {
                res.json({ 
                  status: false, 
                  data: 'No students', 
                });
              }
            } else {
              res.json({ 
                status: false, 
                data: 'No students', 
              });
            }
          })
        }
      }
    } catch(e) {
      console.log("error in fetch class detailed attendance", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
*  @Function name : fetchPlagiarismCredits
*  @Purpose : For fetching plagiarism credita
*  @Request Object : null
*  @Response Object : Success - Class attendance data, Failure - Error message
*  @Author : Prateek 
*/

export function fetchPlagiarismCredits(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        plagiarismCreditsResult(function(err, credits){
          if (err) {
            res.json({
              status : false,
              error :err
            }) 
          } else {
            res.json({
              status : true,
              creditData : credits
            })
          }
        })
      }
    } catch(e) {
      console.log("error in fetchPlagiarismCredits", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchIndividualAssignmentData
*  @Purpose : For fetching assigment data
*  @Request Object : assignmentId : assignmentId, studentId : studentId
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek 
*/

export function fetchIndividualAssignmentData(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        let reqObj = req.query;

        let selector = {
          _id : req.query.assignmentId,
          "submissions._id" : req.query.studentID
        }
        Assignment.findOne(selector,{"submissions.$":1,configuration : 1})
        .exec(function(err, assignmentResult){
          if (err) {
            res.json({
              status : false,
              error : err.message
            })
          } else {
            res.json({              
              status : true,
              data : assignmentResult
            })
          }
        })
      }
    } catch(e) {
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
*  @Function name : saveEvaluatedAssignmentResult
*  @Purpose : For saving the evaluated assignment submission
*  @Request Object : assignmentId, studentID
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek 
*/

export function saveEvaluatedAssignmentResult(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else if (!req.body.assignmentId || validator.isEmpty(req.body.assignmentId) || !mongoose.Types.ObjectId.isValid(req.body.assignmentId)) {
        res.json({
          status: false, 
          error : "Invalid Assignment Id"
        });
      } else if (!req.body.studentID || validator.isEmpty(req.body.studentID) || !mongoose.Types.ObjectId.isValid(req.body.studentID)) {
        res.json({
          status: false, 
          error : "Invalid Student Id"
        });
      } else {
        let obj = req.body;

        Assignment.findOne({
          _id : obj.assignmentId
        }).exec(function(err, assignmentResult) {
          if (err) {
            res.json({
              status : false,
              error : err.message
            })
          } else if(assignmentResult) {

            Assignment.update({
              _id : obj.assignmentId,
              "submissions._id" : obj.studentID
            },{
              $set : {
                "submissions.$.result" : obj.result,
                "submissions.$.comment" : obj.comment,
                "submissions.$.evaluatedBy" : person._id
              }
            }).exec(function(err, updated) {
              if (err) {
                res.json({
                  status : false,
                  error : err.message
                })
              } else if(updated) {
                
                Assignment.findOne({
                  _id : obj.assignmentId,
                  "submissions._id" : obj.studentID
                },{"submissions.$":1, configuration : 1}).exec(function(err, assignmentData) {
                  if(err) {
                    res.json({
                      status : false,
                      error : err.message
                    })
                  } else if(assignmentData) {
                    res.json({
                      status : true,
                      data : assignmentData,
                      message : 'Evaluted assignment saved successfully'
                    })
                  } else {
                    res.json({
                      status : false,
                      error : 'Assignment Not Found'
                    })                    
                  }
                })
              }
            })
          } else {
            res.json({
              status :  false,
              error : 'Assignment Not Found'
            })
          }
        })
      }
    } catch(e) {
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
*  @Function name : saveAssignmentGradeConfiguration
*  @Purpose : For saving the evaluated assignment submission
*  @Request Object : sid 
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek 
*/

export function saveAssignmentGradeConfiguration(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else if (!req.body.assignmentId || validator.isEmpty(req.body.assignmentId) || !mongoose.Types.ObjectId.isValid(req.body.assignmentId)) {
        res.json({
          status: false, 
          error : "Invalid Assignment Id"
        });
      } else if (!req.body.studentID || validator.isEmpty(req.body.studentID) || !mongoose.Types.ObjectId.isValid(req.body.studentID)) {
        res.json({
          status: false, 
          error : "Invalid Student Id"
        });
      } else {        
        
        let obj = req.body;

        Assignment.findOne({
          _id : obj.assignmentId
        }).exec(function(err, assignmentResult) {
          if (err) {
            res.json({
              status : false,
              error : err.message
            })
          } else if(assignmentResult) {

            Assignment.update({
              _id : obj.assignmentId,              
            },{
              $set : {
                configuration : obj.configuration                
              }
            }).exec(function(err, updated) {
              if (err) {
                res.json({
                  status : false,
                  error : err.message
                })
              } else if(updated) {
                
                Assignment.findOne({
                  _id : obj.assignmentId,
                  "submissions._id" : obj.studentID
                },{"submissions.$":1, configuration : 1}).exec(function(err, assignmentData) {
                  if(err) {
                    res.json({
                      status : false,
                      error : err.message
                    })
                  } else if(assignmentData) {
                    res.json({
                      status : true,
                      data : assignmentData,
                      message : ' Assignment grades configured successfully'
                    })
                  } else {
                    res.json({
                      status : false,
                      error : 'Assignment Not Found'
                    })                    
                  }
                })
              }
            })
          } else {
            res.json({
              status :  false,
              error : 'Assignment Not Found'
            })
          }
        })
      }
    } catch(e) {
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : listRoomCertificateData
*  @Purpose : For fetching list of students, topics, questionnaire completion data for Instructor/Admin to decide to enable certificate download.
*  @Request Object : roomID
*  @Response Object : Success - data, Failure - Error message
*  @Author : Shantanu Paul 
*/

export function listRoomCertificateData(req, res) {
  checkValidRequest(req.headers, function(person){

  try {
    //Verifying if request is valid or not
    if (person == null || !req.query.items || !req.query.page || !req.query.roomId) {
      res.json({
      status: false, 
      error : "Invalid request."
      });
    } else {

    let totalTopicsCountQuery = Topic.count({roomId: req.query.roomId, topicEnable : true}); // Get total topics count for the course.
    
    let questionnaireCountQuery = Topic.find({roomId: req.query.roomId, topicEnable : true}).select('questionnaire'); // Get all questionnaires for the course

    let selector = {};
  
    if(/*person.role === Roles.Admin ||*/ person.role === Roles.Lmsadmin /*|| person.role == Roles.Presenteradmin || person.role == Roles.CRMadmin*/) {
      selector = {roomId: mongoose.Types.ObjectId(req.query.roomId)};
    } else if (person.role === Roles.Instructor)
    {
      selector = {roomId: mongoose.Types.ObjectId(req.query.roomId), instId: mongoose.Types.ObjectId(person.id)};
    }
 
    let skipValue = Number(req.query.items) * (Number(req.query.page) -1);
    let limitValue = Number(req.query.items);
    let sortValue = JSON.parse(req.query.sort);
    let searchValue = req.query.search;

    let studentsQuery = Student.aggregate([
      {$match: selector}, 
      {$project: {students: '$students'}}, // Get list of students in the course
      {$unwind: '$students'}, // Unwind Students array
      {$lookup: { // Get student name from User table
        from: 'users',
        localField: 'students',
        foreignField: '_id',
        as: 'student'
      }},
      {$project: {_id: 0, 'student._id': 1, 'student.firstname': 1, 'student.lastname': 1, 'student.guest' : 1}}, // Remove unnecessary fields
      {$unwind: '$student'}, // Unwind students array
      {$sort: sortValue}, 
      {$skip: skipValue},
      {$limit: limitValue}
  ]);


  if(searchValue && searchValue.trim() !== '' && searchValue !== undefined) {

    let slash_search = addSlash(searchValue);
    let searchKey = RegExp(slash_search,'i');

    studentsQuery = Student.aggregate([
      {$match: selector}, 
      {$project: {students: '$students'}}, // Get list of students in the course
      {$unwind: '$students'}, // Unwind Students array
      {$lookup: { // Get student name from User table
        from: 'users',
        localField: 'students',
        foreignField: '_id',
        as: 'student'
      }},
      {$project: {_id: 0, 'student._id': 1, 'student.firstname': 1, 'student.lastname': 1, 'student.guest' : 1}}, // Remove unnecessary fields
      {$unwind: '$student'}, // Unwind students array
      {$match: {$or: [{'student.firstname': {$regex: searchKey}},{'student.lastname': {$regex: searchKey}}]}},
      {$sort: sortValue}, 
      {$skip: skipValue},
      {$limit: limitValue}
    ]);
  }

  let studentsEligibleQuery = Student.find(selector)
                              .select('certificateEligible');
  
  let resultData = [];

  studentsEligibleQuery.exec(function(err, eligibleStudents){
    if(err) throw err;

    totalTopicsCountQuery.exec(function(err, totalTopicsCount){
      if(err) throw err;
  
      questionnaireCountQuery.exec(function(err, totalQuestionnaireCount){
        if(err) throw err;
  
        studentsQuery.exec(function(err, studentsData){
          if(err) throw err;    
          
          let studentsList = [];
          let eligibleStudentsList = [];
          studentsData.forEach(function(data){
            if(data.student.guest == false) {
              studentsList.push(data.student)
            }
          });

          eligibleStudents.forEach(function(data){
            eligibleStudentsList = _.unionBy(data.certificateEligible, eligibleStudentsList);
          });
          
          eligibleStudentsList = eligibleStudentsList.map(function(item) { return "'" + item + "'" }).join(',');
          
          async.eachSeries(studentsList, function(student, cb){ //loop through each student and get details - async.eachSeries is a sync version of Array.map
            let row = {}; 
            let acc = 0;
            let topicId = [];
            let topicIdForQuestionnaireResults = [];
            totalQuestionnaireCount.map((topicData) => {
              topicIdForQuestionnaireResults.push(topicData._id);
              topicId.push(String(topicData._id));  
              return acc += Number(topicData.questionnaire.length);
            });
            row.totalQuestionnaire = acc;
            let userTopicsCountQuery = DataLog.find({               
              action : 'Topic_Status',
              uid : student._id,
              'value.roomId' : req.query.roomId,
              'value.status' : 2,
              'value.topicId' : {
                $in : topicId
              }
            });  
            
            //let userTopicsCountQuery = DataLog.find({}).select('value.topicId');
            userTopicsCountQuery.exec(function(err, userTopicsCount){
              if(err) throw err;
              
              GradeConfiguration.findOne({
                companyid : person.profile.companyid._id
              })
              .exec(function(err, gradeResult) {
                if(err) {
                  res.json({
                    status : false,
                    error : err.message
                  })
                } else {
                  let grades = [{
                    from : 70,
                    to : 100,
                    result : 'DISTINCTION',
                    grade : 'A'
                  },
                  {
                    from : 35,
                    to : 69,
                    result : 'PASS',
                    grade : 'B'
                  },
                  {
                    from : 0,
                    to : 34,
                    result : 'FAIL',
                    grade : 'C'
                  }];
                  if(gradeResult != null ) {
                    grades = gradeResult.grades
                  } 
                  
                  
                  row._id = student._id;       
                  row.name = student.firstname + ' ' + student.lastname;
                  row.topicsCompletedPercentage = (totalTopicsCount !== 0) ? Math.round((userTopicsCount.length/totalTopicsCount)*100): 0;
                  
                  let matchSelectorForQuestionnaire = { 
                    roomId: mongoose.Types.ObjectId(req.query.roomId), 
                    submittedBy: mongoose.Types.ObjectId(student._id),
                    topicId: {
                      $in : topicIdForQuestionnaireResults
                    }
                  }
                  let questionnaireQuery = Result.aggregate([ 
                    { $match: matchSelectorForQuestionnaire },
                    { $group : { 
                             _id : 0, 
                              percentage: {$push: "$questionnairePercentage"}
                              }},
                  ]);
                  questionnaireQuery.exec(function(err, questionnaireList){
                    if(err) throw err;
                        
                    let questionnaireGrade = '';  
                     //Math.round( *100)/100 is to truncate to 0 or 2 decimal positions.
                    row.questionnaireCount = (questionnaireList[0] && questionnaireList[0].percentage) ? questionnaireList[0].percentage.length : 0;
                    let avergaPercentage = 0;
                    if(row.questionnaireCount !== 0) { 
                      questionnaireList[0].percentage.map((val) => {
                        avergaPercentage += Number(val)
                      })
                    } else {
                      avergaPercentage = 0
                    }
                    row.questionnairePercentage = questionnaireList.length>0? Math.round(avergaPercentage/questionnaireList[0].percentage.length): 0;
                    
                    
                    row.isCertificateEligible = _.includes(eligibleStudentsList, student._id);
                    grades.map(function(configuredGradeData) {
                      if(row.questionnairePercentage >= configuredGradeData.from && row.questionnairePercentage <= configuredGradeData.to) {
                        row.questionnaireGrade = configuredGradeData.grade
                      }
                    });
                    resultData.push(row);
              
                    if(studentsList.length === resultData.length) {
                      res.json({
                      status: true,
                      count: studentsList.length,
                      certificateData: resultData
                      });                
                    }
                    cb(null);
                  });
                }
              })
            });                         
          });
        });
      });
    });
  });
} 
}catch(e){
      console.log("error in list room certificate data", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
} 


/**
*  @Function name : toggleCertificateDownload
*  @Purpose : For enabling/disabling certificate download for students.
*  @Request Object : roomID, studentId
*  @Response Object : Success - StudentId, Failure - Error message
*  @Author : Shantanu Paul 
*/
export function toggleCertificateDownload(req, res) {
  checkValidRequest(req.headers, function(person){
    
      try {
           //Verifying if request is valid or not
           if (person == null || !req.query.roomId || !req.body.studentId) {
            res.json({
              status: false, 
              error : "Invalid request."
            });
          } else {
           
          let query = Student.findOne({roomId: req.query.roomId, certificateEligible: req.body.studentId}).exec(function(err, student) {
            if(err) throw err;

            if(student){
              Student.update({roomId: req.query.roomId}, {$pull: {certificateEligible: req.body.studentId}}).exec(function(err) {
                if(err) throw err;

                res.json({
                  status: true,
                  id: req.body.studentId
                });
              });
            } else {
              Student.update({roomId: req.query.roomId}, {$push: {certificateEligible: req.body.studentId}}).exec(function(err) {
                if(err) throw err;

                res.json({
                  status: true,
                  id: req.body.studentId
                });
              });
            }
          });
          }
        } catch(e){
        console.log("error in toggle certificate eligibility", e)
        res.json({
          status : false, 
          error : "Internal server error."
        });
    }
  });
}