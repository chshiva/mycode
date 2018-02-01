import Users from '../models/users';
import Schedule from '../models/schedule';
import Topic from '../models/topic';
import Room from '../models/room';
import { Roles } from './admin.user.controller';
import * as EmailForUserCreation from '../emailFunctions';
import Groups from '../models/group';
import Student from '../models/students';
import Questionnaire from '../models/questionnaire';
import { checkValidRequest } from '../authorization';
import {addSlash} from '../controllers/slashesActions';
import { fetchRoomSelector } from './schedule.controller';
import config from '../config';

var _ = require('lodash');
var mongoose = require('mongoose');
var moment = require('moment-timezone');
var validator = require('validator');
import serverConfig from '../config';


export function testApi(req, res) {
  console.log("body === ",req);
  res.json({error : null});
}
/**
* @Function Name: "fetchMyRooms",
* @Purpose: "Fetch current user room for dashboard.",
* @Request Object: null,
* @Response Object: Success- {status : true, data : rooms }, Failure- {status : false},
* @Author: "Prudhvi"
*/
export function fetchMyRooms(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null) {

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }

        let objEntity = {
          uid : person._id,
          role : person.role,
          cid : bussinessID
        }
        // get selector for fetch rooms according to role
        fetchRoomSelector(objEntity, function(selector, instructorIds){
          if(selector != null){
            let query = Room.find(selector).populate('selPackage', 'packageValidity features').populate('corporateId', 'businessType');
            executeRoomQuery(query, function(err, doc){
              if(doc != null){
                res.json({ status: true, data: doc });
              }else res.json({ status: false });
            });
          }else res.json({ status : false });
        });
      } else res.json({status : false/*, error : "Invalid request."*/});
    } catch(e){
      console.log("e in fetchMyRooms === ",e);
      res.json({status : false/*, error : "Internal server error."*/});
    }
  });
}


/**
* @Function Name: "searchMyRooms",
* @Purpose: "Fetch current user room with matched input value for dashboard.",
* @Request Object: params : { input },
* @Response Object: Success- {status : true, data : rooms }, Failure- {status : true, data : []},
* @Author: "Prudhvi"
*/
export function searchMyRooms(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null) {

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        let objEntity = {
          uid : person._id,
          role : person.role,
          cid : bussinessID
        }
        // get selector for fetch rooms according to role
        fetchRoomSelector(objEntity, function(selector, instructorIds){
          if(selector != null){
            if(req.params.input != '') {
              let slash_search = addSlash(req.params.input);
              selector['roomName'] = { "$regex": slash_search, $options: "i" };
            }
            let query = Room.find(selector).populate('selPackage', 'packageValidity features').populate('corporateId', 'businessType');
            
            // fetch rooms only matched with input value
            executeRoomQuery(query, function(err, doc){
              if(doc != null) res.json({ status: true, data: doc });
              else res.json({ status: true, data : [] });
            });
          }else res.json({ status : true, data : [] });
        });
      } else res.json({ status : true, data : [] });
    } catch(e){
      console.log("e in searchMyRooms === ",e);
      res.json({ status : true, data : [] });
    }
  });
}

/**
* @Function Name: "shareLink",
* @Purpose: "Fetch current user room with matched input value for dashboard.",
* @Request Object: data : { mails, scheduleId, link },
* @Response Object: Success- {status : true, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function shareLink(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && person.email && req.body.data) {
        let obj = req.body.data;
        // console.log("obj ==== ", obj);
        if (!obj.mails || obj.mails.length <= 0) 
          res.json({ status : false, error : "Invalid Mail ids." });
        else if (!obj.link || validator.isEmpty(obj.link))
          res.json({ status : false, error : "Invalid conference link." });
        else if (obj.scheduleId != null && obj.scheduleId != ''){

          // share conference link from schedule
          if (validator.isEmpty(obj.scheduleId) || !mongoose.Types.ObjectId.isValid(obj.scheduleId))
            res.json({ status : false, error : "Invalid schedule." });
          else {
            var schQuery = Schedule.findOne({ _id : mongoose.Types.ObjectId(obj.scheduleId), dates: {$elemMatch: { _id: mongoose.Types.ObjectId(obj.slotId) }}}, {"dates.$._id" : 1, createdBy : 1});
            schQuery.exec( function(scherr, schedule){
              // console.log("schedule === ", schedule);
              if (scherr) res.json({ status : false, error : "Invalid schedule." });
              else if (schedule && schedule.createdBy._str == person._id._str ) {

                // schedule created user only can share the link
                sendConfLinkEmail(obj.mails, obj.link, person.email, schedule.dates[0], (person.firstname + " " + person.lastname) );
                res.json({ status: true, message: "Sent successfully."});
              } else res.json({ status : false, error : "Access denied." });
            });
          }
        } else { // if (obj.roomId) {

          // share conference link from room
          // if (validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId))
          //   res.json({ status : false, error : "Invalid room." });
          // else {
            // var roomquery = Room.findOne({ _id : mongoose.Types.ObjectId(obj.roomId) });
            // roomquery.exec(function (roomerr, room) {
            //   if (roomerr) res.json({ status: false, error : "Room is not existed." });
            //   if (room && room.createdBy._str == person._id._str) {

                // room created user only can share the link
                sendConfLinkEmail(obj.mails, obj.link, person.email, null, (person.firstname + " " + person.lastname) );
                res.json({ status: true, message: "Sent successfully."});
              // } else res.json({ status : false, error : "Access denied." });
            // });
        }
        // } else
        //   res.json({ status: false, error : "Internal server error." });
      } else res.json({ status: false, error : "Invalid Request." });
    } catch(e){
      console.log("e in shareLink === ",e);
      res.json({ status: false, error : "Internal server error." });
    }
  });
}

/**
* @Function Name: "generateLink",
* @Purpose: "For update roomkey.",
* @Request Object: data : { roomId, date },
* @Response Object: Success- {status : true, data, key, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function regenerateLink(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.body.data && req.body.data.roomId && mongoose.Types.ObjectId.isValid(req.body.data.roomId)) {
        let obj = req.body.data;
        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        // check valid room or not
        var roomquery = Room.findOne({ _id : mongoose.Types.ObjectId(obj.roomId) });
        roomquery.exec(function (error, doc) {
          if (error) res.json({ status: false, error : "Room is not existed." });
          if (doc) {

            // check that room have any upcomming schedules or not
            checkRoomUpcommingSch(obj.roomId, obj.date, function(result){
              if (result == true) {

                // generate new random and unique key
                randomKey(10, function(response){

                  // update the roomkey with new key
                  Room.update({ _id : mongoose.Types.ObjectId(obj.roomId) },{ $set : { roomKey : response } },{ runValidators: true },function (e, data) {
                    if (e) res.json({ status : false, error : error });
                    else {
                      let objEntity = {
                        uid : person._id,
                        role : person.role,
                        cid : bussinessID
                      }

                      // fetch rooms with fresh data
                      fetchRoomSelector(objEntity, function(selector, instructorIds){
                        if (selector != null) {
                          var query = Room.find(selector)
                                  .populate('selPackage', 'packageValidity');
                          query.exec(function (roomError, roomsData) {
                            if (roomsData) {
                              _.each(roomsData, function(data){
                                if (!_.includes(data.roomKey, 'conf/')) {
                                  let key = 'conf/' + data.roomKey;
                                  data['roomKey'] = serverConfig.confLink.concat(key);
                                }
                              });
                              let msg = "Regenerated successfully.";
                              let link = 'conf/' + response;
                              link = serverConfig.confLink.concat(link);
                              res.json({ status: true, data: roomsData, key : response, link : link, message : msg });
                            }
                          });
                        } else res.json({ status : false });
                      });
                    }
                  });
                });
              } else if(result == false) res.json({ status : false, errorCode : 810 });
              else  res.json({ status : false, error : result });
            });
          } else {
            res.json({ status: false, error : "Room is not existed." });
          }
        });
      } else res.json({ status: false, error : "Invalid Request." });
    } catch(e){
      console.log("e in regenerateLink === ",e);
      res.json({ status: false, error : "Internal server error." });
    }
  });
}

/**
* @Function Name: "conformRegenarate",
* @Purpose: "For update roomkey.",
* @Request Object: data : { roomId, date },
* @Response Object: Success- {status : true, data, key, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function conformRegenarate(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.body.data && req.body.data.roomId && mongoose.Types.ObjectId.isValid(req.body.data.roomId)) {
        let obj = req.body.data;

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }

        // generate new random and unique key
        randomKey(10, function(response){
          if(response != null){

            // update the roomkey with new key
            Room.update({ _id : mongoose.Types.ObjectId(obj.roomId) },{ $set : { roomKey : response } },{ runValidators: true },function (e, data) {
              if (e) res.json({ status : false, error : error });
              else {
                let objEntity = {
                  uid : person._id,
                  role : person.role,
                  cid : bussinessID
                }

                // fetch rooms with fresh data
                fetchRoomSelector(objEntity, function(selector, instructorIds){
                  if(selector != null){
                    var query = Room.find(selector)
                            .populate('selPackage', 'packageValidity');
                    query.exec(function (roomError, roomsData) {
                      if(roomsData){
                        _.each(roomsData, function(data){
                          if(!_.includes(data.roomKey, 'conf/')){
                            let key = 'conf/' + data.roomKey;
                            data['roomKey'] = serverConfig.confLink.concat(key);
                          }
                        });
                        let link = 'conf/' + response;
                        link = serverConfig.confLink.concat(link);
                        res.json({ status: true, data: roomsData, key : response, link : link, message : "Regenerated successfully, You should have to invite people again." });
                      } else {
                        res.json({ status : true });
                      }
                    });
                  } else res.json({ status : true });
                });
              }
            });
          } else res.json({ status: false, error : "Internal server error."});
        });
      } else res.json({ status: false, error : "Invalid Request." });
    } catch(e){
      console.log("e in conformRegenarate === ",e);
      res.json({ status: false, error : "Internal server error." });
    }
  });
}

/* ------------------  callback functions -------------------------- */

/**
* @Function Name: "fetchRoomSelector",
* @Purpose: "create selector for fetch room based on role.",
* @Request Object: {role, uid, cid}, cb
* @Response: selector object,
* @Author: "Prudhvi"
*/
/*export function fetchRoomSelector(obj, cb){
  try{
    let selector = {}
    if (obj.role == Roles.Student || obj.role == Roles.Attendee) {
      let studentquery = Student.find({ students : {$in : [obj.uid]}});
      studentquery.lean().exec( function(studenterr, student){
        let roomIds = [];
        _.each(student, function(stu){
          roomIds.push(stu.roomId);
        });
        selector = { _id : {$in : roomIds }};
        cb(null, selector);
      });
    } else {
      selector = {$or : [ { createdBy : obj.uid },{ users : { $in :[obj.uid] } } ]};
      if (obj.role == Roles.Superadmin)
        selector = {};
      else if (obj.role == Roles.Admin || obj.role == Roles.Lmsadmin || obj.role == Roles.CRMadmin || obj.role == Roles.Presenteradmin )
        selector = { corporateId : obj.cid };
      cb(null, selector);
    }
  } catch(e) {
    console.log("e in fetchRoomSelector === ",e);
    cb("Internal server error", null);
  }
}*/

/**
* @Function Name: "executeRoomQuery",
* @Purpose: "execute the query, update roomkey.",
* @Request Object: query, cb
* @Response Object: Success- {null, docs, ids }, Failure- {error, null, null},
* @Author: "Prudhvi"
*/
export function executeRoomQuery(query, cb){
  try{
    query.lean().exec(function (err, doc) {
      if (err) cb(err, null);
      else if(doc){
          let ids = [];
          _.each(doc, function(data){
            if(!_.includes(data.roomKey, 'conf/')){
              let key = 'conf/' + data.roomKey;
              data['roomKey'] = serverConfig.confLink.concat(key);
            }
          });
          cb(null, doc);
      } else {
        cb("Internal server error", null);
      }
    });
  } catch(e) {
    console.log("e in executeRoomQuery === ",e);
    cb("Internal server error", null);
  }
}

/**
* @Function Name: "sendConfLinkEmail",
* @Purpose: "send the conference link.",
* @Request Object: mails, link, email
* @Response Object: ,
* @Author: "Prudhvi"
*/
export function sendConfLinkEmail(mails, link, email, dates, senderName){
  let body = 'Dear User,<br /><br />We would like to Invite you to Join a Video Conference with us by following the below link., <br /><br /><a href="' + link +'">' + link + '</a><br /><br />';
  if (dates != null) {
    if (serverConfig && serverConfig.mail_timezone) {
      body += 'Access mentioned link from ' + moment(dates.startTime, "x").tz(serverConfig.mail_timezone.zone).format("YYYY-MM-DD hh:mm A") + ' (' + serverConfig.mail_timezone.code + ') to ' + moment(dates.endTime, "x").tz(serverConfig.mail_timezone.zone).format("YYYY-MM-DD hh:mm A")+ ' (' + serverConfig.mail_timezone.code + ') <br /><br />';
    } else {
      body += 'Access mentioned link from ' + moment(dates.startTime, "x").utc().format("YYYY-MM-DD hh:mm A") + ' (UTC) to ' + moment(dates.endTime, "x").utc().format("YYYY-MM-DD hh:mm A")+ ' (UTC) <br /><br />';
    }
  }
  body += 'Please follow the below set of rules before selecting the Link:<br /><br /> 1. Default browser should be Latest version Google chrome set or Mozilla Firefox.<br /><br /> 2.  Please connect the Camera and a Head Set with Mic to Join the VC with us.<br /><br /><br /><br />Thanks,<br />' + senderName + '<br />' + serverConfig.mail_signature;

  var exchangeData = {
    to : mails,
    whoCreated : email,
    subject : 'Conference Link',
    body : body
  }
  EmailForUserCreation.createUserMail(exchangeData, function(status){
    
  });
}

/**
* @Function Name: "checkRoomUpcommingSch",
* @Purpose: " fetch upcomming schedules of particular room.",
* @Request: rid, date, cb
* @Response: true/false/error,
* @Author: "Prudhvi"
*/
export function checkRoomUpcommingSch(rid, date, cb){
  try{

    // fetch upcomming schedules of rid
    let query = Schedule.find({ roomId : rid, endDate : { $gt : date } });
    query.exec(function(err, doc){
      // console.log("doc === ",doc);
      if (doc && doc.length > 0) cb(false)
      else cb(true);
    });
  } catch(e) {
    console.log("e in checkRoomUpcommingSch === ",e);
    cb("Internal server error");
  }
}

/**
* @Function Name: "randomKey",
* @Purpose: " generate random and unique string .",
* @Request: length, cb
* @Response: string/null,
* @Author: "Prudhvi"
*/
export function randomKey(length, cb){
  try{
    let str = "";
    let ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < length; i++ )
        str += ch.charAt(Math.floor(Math.random() * ch.length));
    let query = Room.findOne({ roomKey : str });
    query.exec(function(err, doc){
      if(doc){
        randomKey(10, function(data){
          cb(data);
        });
      }else{
        cb(str);
      }
    });
  } catch(e) {
    console.log("e in randomKey === ",e);
    cb(null);
  } 
}

/*--------------------------------END----------------------------------*/

export function createGroup(req, res) {
  if(!req.body.groupObj) {
    res.json({status: false, error: "Invalid Request"});
  }else {
    var reqObj = req.body.groupObj;
    if(!reqObj.uid || validator.isEmpty(reqObj.uid) || !mongoose.Types.ObjectId.isValid(reqObj.uid)){
      res.json({status: false, error: "Invalid User"});
    }else if(!reqObj.groupName) {
      res.json({status: false, error: "Please provide group name"});
    }else {
      let uid = mongoose.Types.ObjectId(reqObj.uid);
      Users.findOne({ _id: uid }, function(userError, person) {
        if(userError) {
          res.json({status: false, error: "Invalid Data"});
        }else if(person) {
          if(reqObj._id){
            Groups.findOne({_id : {$ne : mongoose.Types.ObjectId(reqObj._id) }, groupName : reqObj.groupName}, function(groupError, groupDoc) {
              if(groupDoc) {
                res.json({status: false, error:"Group name already exists"})
              } else {
                Groups.update({_id: mongoose.Types.ObjectId(reqObj._id)}, {$set: { groupName : reqObj.groupName }}, function(err, saved) {
                  if(err) {
                    console.log("err ======= ", err);
                    res.json({ status : false, error : err });
                  } else {
                    getmygroups(uid, function(geterr, data){
                      if(geterr != null){
                        res.json({ status : false, error : geterr });
                      }else{
                        res.json({ status: true, data : data });
                      }
                    });
                  }
                })
              }
            });
          }else{
            Groups.findOne({ groupName : reqObj.groupName }, function(grouperror, group) {
              if(group) {
                res.json({status: false, error: "Group name already exists"});
              }else {
                reqObj['createdOn'] = moment().utc().toDate();
                reqObj['createdBy'] = uid;
                reqObj['members'] = [uid];
                delete reqObj['uid'];
                var groupObj = new Groups(reqObj);
                groupObj.save((err, saved) => {
                  if (err) {
                    console.log("err ======= ", err);
                    res.json({ status : false, error : err });
                  }else{
                    // console.log("saved ======= ", saved);
                    getmygroups(uid, function(geterr, data){
                      if(geterr != null){
                        res.json({ status : false, error : geterr });
                      }else{
                        res.json({ status: true, data : data });
                      }
                    });
                  }
                }); 
              }
            });
          }
        }
      });
    }
  }
}

export function getmygroups(uid, cb) { 
    if(uid && uid != ''){    
      let query = Groups.find({ members : {$in :[uid]}})
                .populate('members', 'firstname lastname profile.profileImage')
                .sort({ createdOn: -1 });
      query.exec(function(err, doc) {
        if (err) 
            cb(err,null);
        else cb(null, doc);
      });   
    }else {
        cd(null, null);
    }    
};

export function fetchGroup(req, res) {
  if(!req.body.reqObj) {
    res.json({status: false, error: "Invalid data"});
  } else if(!reqObj.uid || validator.isEmpty(reqObj.uid) || !mongoose.Types.ObjectId.isValid(reqObj.uid)) {     
      res.json({status: false, error: "Invalid Data"});
  }else {
    Groups.findOne({_id: mongoose.Types.ObjectId(reqObj._id)}, function(error, result) {
      if(error) {
        res.json({status: false, error: "Invalid data"})
      } else if(result) {
        res.json({status: true, data: result});
      }
    });
  }   
}

export function getMyGroups(req, res){
  if(!req.body.uid) {
    res.json({status: false, error: "Invalid Request"});
  }else {
    if(validator.isEmpty(req.body.uid) || !mongoose.Types.ObjectId.isValid(req.body.uid)){
      res.json({status: false, error: "Invalid User"});
    }else{
      var uid = mongoose.Types.ObjectId(req.body.uid);
      getmygroups(uid, function(geterr, data){
        if(geterr != null){
          res.json({ status : false, error : geterr });
        }else{
          res.json({ status: true, data : data });
        }
      });
    }
  }
}

export function memberstoGroup(req, res) {
  try {  
    if(!req.body.reqObj) {
      res.json({status: false, error: "Invalid Data"});
    } else{
      let reqObj = req.body.reqObj;
      // console.log("reqObj === ",reqObj);
      if(!reqObj._id || validator.isEmpty(reqObj._id) || !mongoose.Types.ObjectId.isValid(reqObj._id)) {     
          res.json({status: false, error: "Invalid Group id"});
      } else if(!reqObj.uid || validator.isEmpty(reqObj.uid) || !mongoose.Types.ObjectId.isValid(reqObj.uid)) {
          res.json({status: false, error: "Invalid User id"});
      } else if(!reqObj.mid || validator.isEmpty(reqObj.mid) || !mongoose.Types.ObjectId.isValid(reqObj.mid)) {
          res.json({status: false, error: "Invalid member id"});
      } else {
        var groupId = mongoose.Types.ObjectId(reqObj._id);
        var query = Groups.findOne({ _id : groupId });
        query.exec(function(groupError, group) {
          if(groupError) {
            res.json({status: false, error: "Invalid Group"});
          } else if (group) {
            let mid = mongoose.Types.ObjectId(reqObj.mid);
            if(reqObj.status == true){
              let checkquery = Groups.findOne({ _id : groupId, members : { $in : [mid]} });
              checkquery.exec( function(checkerr, check){
                if(check)
                  res.json({status: false, error: "Member already exists"});
                else{
                  var addMemeberQuery = Groups.update({_id: groupId}, {$push: {members: mid}});
                  addMemeberQuery.exec(function(err, saved) {
                    if(err) {
                      res.json({status: false, error: err});
                    } else if(saved) {
                      getmygroups(reqObj.uid, function(geterr, data){
                        if(geterr != null){
                          res.json({ status : false, error : geterr });
                        }else{
                          res.json({ status: true, data : data, message: "Added successfully" });
                        }
                      });
                    }
                  });
                }
              });
            }else{
              if(group.createdBy == reqObj.uid) {          
               var memeberQuery = Groups.update({ _id : groupId}, {$pull: {members: reqObj.mid}});
                memeberQuery.exec(function(err, saved) {
                  if(err) {
                    res.json({status: false, error: err});
                  } else if(saved) {
                    getmygroups(reqObj.uid, function(geterr, data){
                      if(geterr != null){
                        res.json({ status : false, error : geterr });
                      }else{
                        res.json({ status: true, data : data, message: "Removed successfully" });
                      }
                    });
                  }
                });
              }else{
                res.json({status: false, error: "Access denied."});
              } 
            }
          }
        });
      }
    }
  } catch(e) {
    console.log('error in memberstoGroup',e);
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}


export function getMachedContacts(req, res){
  try{

    if(req.body.searchData){
      let obj = req.body.searchData;
      if(!obj.uid || validator.isEmpty(obj.uid) || !mongoose.Types.ObjectId.isValid(obj.uid)){
        res.json({ status : false, error : "Invalid User id." });
      }else if(!obj.gid || validator.isEmpty(obj.gid) || !mongoose.Types.ObjectId.isValid(obj.gid)){
        res.json({ status : false, error : "Invalid group id." });
      }else{
        let userquery = Users.findOne({ _id : obj.uid });
        let groupquery = Groups.findOne({ _id : obj.gid });
        userquery.exec( function(usererr, person){
          if(usererr)
            res.json({ status : false, error : "Invalid User."});
          else if(person){
            let ids = [];
            groupquery.exec( function(grouperr, group){
              if(grouperr) res.json({ status : false, error : "Invalid group." });
              else if(group){
                _.each(person.contacts, function(doc){
                  if(doc.status == contactRequest.Accept){
                    let index = _.indexOf(group.members, doc._id);
                    if(index <= -1)
                      ids.push(doc._id);
                  }
                });
                /*let filterIds = _.difference(ids, group.members);
                console.log("filterIds === ",filterIds);*/
                let query = Users.find({ _id : {$in : ids }, $or : [{ "email": { "$regex": obj.input, $options: "i" }}, { "firstname": { "$regex": obj.input, $options: "i" }}, { "lastname": { "$regex": obj.input, $options: "i" }}]});
                query.select('firstname lastname email profile.profileImage')
                      .exec(function (err, result) {
                          if (err) {
                            console.log("error--", err);  
                            res.json({ status : false, error : "Unauthorized user." });
                          }else if(result && result.length > 0){
                            res.json({ status : true, data: result });
                          }else{
                            res.json({status : true, data: []});
                          }
                });
              }
            });
          }
        });
      }
    }
  } catch(e) {
    console.log('error in getMachedContacts',e);
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}

export function deleteGroup(req, res){
  try {
    if(!req.body.reqObj) {
      res.json({status: false, error: "Invalid data"});
    } else {
      let reqObj = req.body.reqObj;
      if(!reqObj.uid || validator.isEmpty(reqObj.uid) || !mongoose.Types.ObjectId.isValid(reqObj.uid)) {     
        res.json({status: false, error: "Invalid user id"});
      }else if(!reqObj._id || validator.isEmpty(reqObj._id) || !mongoose.Types.ObjectId.isValid(reqObj._id)) {     
        res.json({status: false, error: "Invalid group id"});
      }else {
        let groupId = mongoose.Types.ObjectId(reqObj._id);
        let groupquery = Groups.findOne({ _id : groupId });
        groupquery.exec( function(grouperr, group){
          if(grouperr){
            res.json({status: false, error: "Invalid group"});
          }else if(group){
            if(group.createdBy == reqObj.uid){
              let query = Groups.remove({ _id : groupId });
              query.exec( function(err, result){
                if(err){
                  res.json({ status: false, error: err });
                }else{
                  getmygroups(reqObj.uid, function(geterr, data){
                    if(geterr != null){
                      res.json({ status : false, error : geterr });
                    }else{
                      res.json({ status: true, data : data });
                    }
                  });
                }
              });
            }else{
              res.json({status: false, error: "Access denied"});
            }
          }
        });
      }
    }
  } catch(e) {
    console.log('error in deleteGroup',e);
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}

/*
@Function Name : fetchFeedbackType
@Purpose : "To fetch the feedbacktype"
@Request Object : query:{rid}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function fetchFeedbackType(req, res){

  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
    try{
      if (person != null && req.query.rid) {
        let obj = req.query;

        //Firing a query to fetch the FeedbackType from room document
        Room.findOne({roomKey : obj.rid})
        .select('roomConfiguration')
        .exec(function(err, roomData){
          if (err) {
            res.json({
              status : false, 
              error : err.message
            });
          } else if (roomData) {
            if(roomData.roomConfiguration.feedback.feedbackType == 'Customize') {

              //Changes made by Prateek for code optimization and performance
              //Date : 15/09/2017

              //Firing an query to fetch the questionanaire question based on questionnaire Id
              Questionnaire.findOne({_id : roomData.roomConfiguration.feedback.questionnaireId})
              .select('questions')
              .exec(function(err, questionnaireData){
                if (err) {
                  res.json({
                    status : false,
                    error: err.message
                  });
                } else if (questionnaireData) {
                  res.json({
                    status : true, 
                    data : roomData,
                    questionnaireData : questionnaireData
                  });
                } else {
                  res.json({
                    status : false,
                    error: "Invalid questionanaire"
                  })
                }
              })
            } else {
              res.json({
                status : true,
                data : roomData,
                questionnaireData : {}
              });
            }
          } else {
            res.json({
              status : false,
              error: "Invalid room"
            });
          }
        })
      } else {
        res.json({
          status : false,
          error : "Invalid request."
        });
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
@Function Name : saveGoogleID
@Purpose : "Update The GoogleId for users connect with google"
@Request Object : userAddressData: { _id : "user id", googleId: 'googleId' } }
@Response Object : Success-data, Failure-error 
@Author : Rajesh Goriga
*/

export function saveGoogleID (req, res) {
    // Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
    try{
      if (person != null) {
         //console.log("Inside Save User Address Controller", req.body.userAddressData);
        var userGoogleObject = req.body.data;
        var requestedUserId = person._id;
        
        //Verifying if userAddressObject is there or not
        if(!userGoogleObject && (!userGoogleObject.gmail || !userGoogleObject.facebookMail)) {
          res.json({
            status: false, 
            error: "Invalid Request"
          })
        } else {
          let query = { $or: [ {$and: [ { gmail: { $exists:true } },{ gmail:userGoogleObject.gmail }]}, { email:userGoogleObject.gmail }, { email : userGoogleObject.facebookMail }, {$and: [ { facebookMail: { $exists:true } },{ facebookMail:userGoogleObject.facebookMail }]}] }
          Users.findOne(query, function (error, user) {
              // console.log(user)            
            if(error) {
              console.log(error);
              res.json({
                status: false, 
                error: "Internal server error"
              });
            } else if ( user != null && ((person.email == userGoogleObject.gmail)||person.email == userGoogleObject.facebookMail) ) {
              var updateObj= {};
              if (userGoogleObject.googleId) {
                updateObj={
                  "googleId" : userGoogleObject.googleId,
                  "gmail": userGoogleObject.gmail
                }
              } else {
                updateObj={
                  "facebookId" : userGoogleObject.facebookId,
                  "facebookMail": userGoogleObject.facebookMail
                }
              }
              
              //Query for updating user profile with contact data based on user id
              Users.update({
                _id:mongoose.Types.ObjectId(requestedUserId)
              }, {
                $set:updateObj
              }, function(error, result) {
                if (error) {
                  console.log("Error while saving data", error.message);
                  res.json({
                    status: false, 
                    error: "Id not updated"
                  });
                } else if (result) {
                  Users.findOne({_id:mongoose.Types.ObjectId(requestedUserId)})
                  .populate('profile.companyid', 'businessType _id')
                  .exec(function(error, userData){
                    if(error) res.json({ status: false, error: error }) ;
                    else res.json({ status: true, data:userData, message: "Connected successfully" })
                  })
                }
              })
            } else if(user == null){
              var updateObj= {};
              if (userGoogleObject.googleId) {
                updateObj={
                  "googleId" : userGoogleObject.googleId,
                  "gmail": userGoogleObject.gmail
                }
              } else {
                updateObj={
                  "facebookId" : userGoogleObject.facebookId,
                  "facebookMail": userGoogleObject.facebookMail
                }
              }
              Users.update({
                    _id:mongoose.Types.ObjectId(requestedUserId)
                  }, {
                    $set:updateObj
                  }, function(error, result) {
                    if (error) {
                      console.log("Error while saving data", error.message);
                      res.json({
                        status: false, 
                        error: "Something went wrong while connecting"
                      });
                    } else if (result) {
                      Users.findOne({_id:mongoose.Types.ObjectId(requestedUserId)})
                      .populate('profile.companyid', 'businessType _id')
                      .exec(function(error, userData){
                        if(error) res.json({ status: false, error: error }) ;
                        else res.json({ status: true, data:userData, message: "Connected successfully" })
                      })
                    }
                  })
            } else if (user != null && ((person.email != userGoogleObject.gmail) || person.email != userGoogleObject.facebookMail))
              res.json({
                        status: false, 
                        error: "This Account is  already connected to another account"
              });
            else res.json({
              status: false,
              error: "Something went wrong while connecting"
            });
          })
        }
      } else {
        res.json({
          status : false, 
          error : "Athentication Failed"
        });
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
@Function Name : removeGoogleId
@Purpose : "Remove The GoogleId for users Disconnect with google"
@Request Object : data: { _id : "user id" } }
@Response Object : Success-data, Failure-error 
@Author : Rajesh Goriga
*/

export function removeSocailMedia(req, res) {
  // Verifying request is valid or not
  checkValidRequest(req.headers, function (person) {
    try {
      if (person) {
        //console.log("Inside Save User Address Controller", req.body.userAddressData);
        var requestedUserId = person._id;
        let type = req.body.data.type;

        //Verifying if userAddressObject is there or not
        if (!requestedUserId) {
          res.json({
            status: false,
            error: "Invalid Data"
          })
        } else {
          let unsetQuery = '';
          if (type =='Google')  unsetQuery = { $unset: { googleId: 1, gmail: 1 } }
          else  unsetQuery = { $unset: { facebookId: 1, facebookMail: 1 } }

          // let updateObj = {
          //   "googleId": undefined,
          //   "gmail": undefined
          // }
          Users.update({
            _id: mongoose.Types.ObjectId(requestedUserId)
          }, unsetQuery, function (error, result) {
              if (error) {
                console.log("Error while updating data", error.message);
                res.json({
                  status: false,
                  error: "Disconnection Failed"
                });
              } else if (result) {
                Users.findOne({ 
                  _id: mongoose.Types.ObjectId(requestedUserId) 
                }).populate('profile.companyid', 'businessType _id')
                .exec(function (error,user ) {
                  if (error) res.json({ status: false, error: error });
                  else res.json({ status: true, data:user , message: "Disconnected Successfully" })
                })
              }
            })


        }
      } else {
        res.json({
          status: false,
          error: "Athentication Failed"
        });
      }
    } catch (e) {
      res.json({
        status: false,
        error: "Internal server error."
      });
    }
  });
}


/*
@Function Name : configApi
@Purpose : "Getting config settings from sever"
@Request Object : null 
@Response Object : config-data, Failure-error 
@Author : Rajesh Goriga
*/

export function configApi(req, res) {
  res.json({ fullCalendar: config.fullCalendar, broadCast: config.broadCast });
}

export function fetchRoomDetails (req, res) {
// Verifying request is valid or not
  checkValidRequest(req.headers, function (person) {
    try {
      if (person != null) {
        Room.findOne({ roomKey : addSlash(req.params.roomKey) })
            .exec(function (err, room) {
              if (err) {
                resConfObj['error'] = "Error fetching Room Data.";
                res.json({status: false, data : resConfObj});
              } else if(room){
                res.json({ status : true, data : {_id : room._id, roomName : room.roomName} });
              }
            });
      } else {
        res.json({status : false, error : "Invalid request.", errorCode: 208});
      }
    } catch(e){
      console.log("e in listPackage === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}