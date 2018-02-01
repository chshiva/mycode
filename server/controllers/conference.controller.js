var moment = require('moment');
var mongoose = require('mongoose');
var _ = require('lodash');
var request = require('request');
var validator = require('validator');

import Room from '../models/room';
import Package from '../models/package';
import Users from '../models/users';
import Topic from '../models/topic';
import Upload from '../models/upload';
import Handraise from '../models/handraise';
import {RoleName, Roles} from './admin.user.controller';
import Schedule from '../models/schedule';
import Student from '../models/students';
import Questionnaire from '../models/questionnaire';
import Result from '../models/result';
import Logger from '../models/logger';
import GradeConfiguration from '../models/gradeconfiguration';
import { checkValidRequest } from '../authorization';
import Assignment from '../models/assignment';
import {deleteFilesFromDest} from './fileupload.controller';
import {plagiarismProcessResult, deletePlagiarismProcess} from './plagiarismcheck.controller';
import Poll from '../models/poll';
import {addSlash} from '../controllers/slashesActions';
import { checkCategoryNameExistance } from './category.controller';
// import { cache } from '../../../../../../Library/Caches/typescript/2.6/node_modules/@types/ejs';
// import { persistState } from '../../../../../../Library/Caches/typescript/2.6/node_modules/@types/redux-devtools';

export function getIceServers(req, res){
  try {
    var options = {
      url: 'https://service.xirsys.com/ice',
      headers: {
        'Content-Type' : 'application/json'
      },
      form: {
        ident: 'peoplelink',
          secret: '15e65aaa-74cf-11e6-b581-d08a6ea232df',
          domain: 'rp.instavc.com',
          application: 'instavc',
          room: 'lmsinv',
          secure: 1
      }
    }
    request.get(options, function(error, response, body){
      if(!error){
        // console.log(body)
        res.json({status: true, data : JSON.parse(body)});
      }else{
        res.json({status: false, error : error});
      }
      // return;
    });
  } catch(e) {
    console.log('error in getIceServers',e);
    res.json({
      staus: false,
      error: 'Internal server error'
    });
  }
}

export function createRoomMcu(roomName, selPackage, callback) {
  try {
  	// console.log(roomName, "--createRoom--", selPackage);
    Package.findOne({ _id: mongoose.Types.ObjectId(selPackage) })
            .select('serverLocation -_id')
            .exec(function(pkgErr, pkgRes) {
              if(!pkgErr) {
                var options = {
  								url: pkgRes.serverLocation+'/createRoom/',
  								headers: {
  									'Content-Type' : 'application/json'
  								},
  								form: {
  									name: roomName
  								}
  							}
  							request.post(options, function(error, response, body){
  								if(!error){
  									if(response.errno){
  										console.log("Error1--",response.errno);
  										callback('failed', response.errno);
  									}else{
  										// console.log("Sucess--",response.body);
  										callback(response.body, null);
  									}
  								}else{
  									console.log("Error--",error);
  									callback('failed', error);
  								}
  								return;
  							});
              } else {
                console.log("Error while fatching serverLocation.");
              }
            });
  } catch(e) {
    console.log('error in createRoomMcu',e);
    callback('failed','Internal server error.');
  }
}

function createToken(room, userName, role, selPackage, callback) {
  var validPackage = false;
  var packageData = {};
  // console.log("intial - ", moment().format('x'));
	Package.findOne({ _id: mongoose.Types.ObjectId(selPackage) })
          .exec(function(pkgErr, pkgRes) {
            // console.log("Package response - ", moment());
            if(pkgRes) {
            	let now = moment().utc().toDate();
            	let currentDate = moment();
            	let pkgValidity = moment(pkgRes.packageValidity);
            	if (+pkgValidity >= +currentDate ) {
            		validPackage = true;
            		packageData = {
            			packageName : pkgRes.packageName,
            			packagePrice : pkgRes.packagePrice,
            			userCount : pkgRes.userCount,
            			userPresence : pkgRes.userPresence,
            			serverLocation : pkgRes.serverLocation,
                  features : pkgRes.features,
            		};
								var options = {
									url: pkgRes.serverLocation+'/createToken/',
									headers: {
										'Content-Type' : 'application/json'
									},
									form: {
										room: room,
										username: userName,
										role: 'admin'
									}
                }

                let getUsersOptions = {
                  url: pkgRes.serverLocation+'/getUsers/'+room,
									headers: {
										'Content-Type' : 'application/json'
									}
                }

                if (pkgRes.continuousPresence == -1 ) {
                  request.post(options, function(error, response, body){
                    // console.log("token response - ", moment());
                    if(!error){
                      if(response && response.errno){
                        let obj = {
                          validPackage : validPackage,
                          packageData : packageData,
                          response : response.errno,
                          serverResponse : false
                        }
                        callback(false, obj);
                      } else if (response && response.body && response.body != "Not Found") {
                        let obj = {
                          validPackage : validPackage,
                          packageData : packageData,
                          response : response.body,
                          serverResponse : true
                        }
                        callback(true, obj);
                      } else {
                        let obj = {
                          validPackage : validPackage,
                          packageData : packageData,
                          response : "Not Found",
                          serverResponse : false
                        }
                        callback(false, obj);
                      }
                    }else{
                      let obj = {
                        validPackage : validPackage,
                        packageData : packageData,
                        response : error,
                        serverResponse : false
                      }
                      callback(false, obj);
                    }
                    return;
                  });
                } else {
                  let numberOfusers = '';
                  request.get(getUsersOptions, function(error, response, body){
                  // console.log("error === ", error);
                    if (response && response.body && response.body != "Not Found") {
                      console.log("response === ", response.body);
                      numberOfusers = JSON.parse(response.body);
                      if(numberOfusers.length > (pkgRes.continuousPresence - 1)) {
                        let obj = {
                          validPackage : validPackage,
                          packageData : packageData,
                          response : "Limit exceeded",
                          serverResponse : true
                        }
                        callback(false, obj);
                        //callback(false, "User limit excceded, please contact admin");
                      } else {
                        // console.log("options--",options);
                        // console.log("token options done - ", moment());
                        request.post(options, function(error, response, body){
                          // console.log("token response - ", moment());
                          if(!error){
                            if(response.errno){
                              let obj = {
                                validPackage : validPackage,
                                packageData : packageData,
                                response : response.errno,
                                serverResponse : false
                              }
                              callback(false, obj);
                            } else if (response && response.body && response.body != "Not Found") {
                              let obj = {
                                validPackage : validPackage,
                                packageData : packageData,
                                response : response.body,
                                serverResponse : true
                              }
                              callback(true, obj);
                            } else {
                              let obj = {
                                validPackage : validPackage,
                                packageData : packageData,
                                response : "Not Found",
                                serverResponse : false
                              }
                              callback(false, obj);
                            }
                          }else{
                            let obj = {
                              validPackage : validPackage,
                              packageData : packageData,
                              response : error,
                              serverResponse : false
                            }
                            callback(false, obj);
                          }
                          return;
                        });
    
                      } 
                    } else {
                      let obj = {
                        validPackage : validPackage,
                        packageData : packageData,
                        response : "Error while fatching serverLocation.",
                        serverResponse : false
                      }
                      callback(false, obj);
                    }
                  });
                }
                  //console.log("numberOfusers", numberOfusers);
									
							} else {
                // resConfObj['error'] = "Package is expired.";
                let obj = {
                  validPackage : validPackage,
                  packageData : packageData,
                  response : "Package is expired.",
                  serverResponse : true
                }
                callback(false, obj);
	              //callback(false, "Package is expired.");
							}
						} else {
              // resConfObj['error'] = "Error while fatching serverLocation.";
              let obj = {
                validPackage : validPackage,
                packageData : packageData,
                response : "Error while fatching serverLocation.",
                serverResponse : false
              }
              callback(false, obj);
              //callback(false, "Error while fatching serverLocation.");
            }
          });
}


// export function confRequest(req, res){
// 	console.log("Conf Request", req.body);
// 	//res.json({status: true});
// }

export function getToken(req, res){
  try {
    // console.log("1- ", moment().format('x'));
  	// console.log("REQ", req.body.data);
    var resConfObj = {
      validUser : false,
      haveSchedule : false,
      validRoom : false,
      roomType : null,
      autharized : false,
      validPackage : false,
      isExpiredRoom : true,
      validCPLimit : false, 
      token : null,
      error : null,
      host : null,
      codec : null,
      enableLive : null,
      businessType : 'LMS',
      roomName : ''
    }

    let roleObj = _.invert(Roles);

  	var obj = req.body.data;
  	var uname = obj.username;
  	if(!uname || validator.isEmpty(uname) || !mongoose.Types.ObjectId.isValid(uname)){
      resConfObj['error'] = "InValid user.";
      res.json({status: false, data : resConfObj});
    } else {
      // console.log("2- ", moment().format('x'));
  		var userRole = null;
  		var hostRole = null;
  		Users.findOne({ _id : mongoose.Types.ObjectId(uname) })
  					.exec(function(userErr, userData) {
              // console.log("userData === ", userData);
  						if(userData) {
                // console.log("3 - user - ", moment());
    						resConfObj['validUser'] = true;
  							userRole = userData.role;
                Room.findOne({ roomKey : addSlash(obj.key) })
  									.populate('users', 'firstname lastname email profile.profileImage role guest', { userStatus : 'Active'})
                    .populate('corporateId', 'businessType -_id')
  									.exec(function (err, room) {
  										if (err) {
  											resConfObj['error'] = "Error fetching Room Data.";
  											res.json({status: false, data : resConfObj});
  										} else if( room && room.roomid){
                        // console.log("4 - room - ",moment());
                        resConfObj['roomDBId'] = room._id;
  											resConfObj['validRoom'] = true;
                        resConfObj['roomName'] = room.roomName;
                        resConfObj['roomType'] = room.roomType;
                        resConfObj['roomPassword'] = room.roomPassword;
                        resConfObj['hostPassword'] = room.hostPassword;
                        resConfObj['codec'] = room.roomConfiguration.codecType;
                        resConfObj['enableLive'] = room.roomConfiguration.enableLive;
                        let currentDate = moment();
                        let roomValidity = moment(room.expiryDate);
                        console.log("currentDate === ", currentDate.format("DD/MM/YYYY hh:mm A"));
                        console.log("roomValidity === ", roomValidity.format("DD/MM/YYYY hh:mm A"));
                        if (+roomValidity >= +currentDate ) {
                          resConfObj['isExpiredRoom'] = false;
                        }
                        if(room.corporateId && room.corporateId.businessType){
                          // console.log("businessType--", room.corporateId);
                          resConfObj['businessType'] = room.corporateId.businessType;
                        }
  				            	let now = moment().utc().toDate();
                        let today = Number(moment().utc().format('x'));
                        // console.log("now--",now);
                        // console.log("roomId === ",room._id);
  											Schedule.findOne({roomId : room._id, dates : {$elemMatch : { startTime : { $lte : today}, endTime : {$gte : today} }}}, {"dates.$.startTime" : 1, meetingName : 1, password : 1, createdBy : 1})
  				  										.populate('createdBy', 'role')
  															.exec(function(schErr, schRes) {
                                  // console.log("schedules === ", schErr, schRes);
  																if(!schErr && schRes && schRes.dates && schRes.dates.length > 0) {
                                    // console.log("5 - sch - ", moment());
                                    // console.log("sch present");
                                    // console.log("schRes--", schRes.startTime, schRes.endTime);
                                    hostRole = schRes.createdBy.role;
  																	resConfObj['haveSchedule'] = true;
                                    resConfObj['hostId'] = schRes.createdBy._id;
  																	resConfObj['scheduleData'] = {	"meetingName" : schRes.meetingName,
  																																	"startTime"	: schRes.dates[0].startTime,
  																																	"endTime"	: schRes.dates[0].endTime,
                                                                    "slotId" : schRes.dates[0]._id,
                                                                    "_id" : schRes._id
                                    }
                                    if (schRes.password) {
                                      resConfObj['scheduleData']['password'] = true;
                                    } else {
                                      resConfObj['scheduleData']['password'] = false;
                                    }

  																	if(hostRole == Roles.Instructor || hostRole == Roles.Presenter) {
                                      // console.log("sch present, inst");
                                      if (userData.role == Roles.Student) {
                                        Student.findOne({ roomId : room._id, instId : schRes.createdBy._id, students : {$in : [uname] }})
                                          .exec(function(studErr, studRes) {
                                            // console.log("student === ", studErr, studRes);
                                            if(studErr || !studRes /*|| (studRes && studRes.length < 0)*/) {
                                              resConfObj['haveSchedule'] = false;
                                              resConfObj['scheduleData'] = null;
                                            }
                                          });
                                      }
                                      Student.findOne({ roomId : room._id, instId : schRes.createdBy._id/*, students : {$in : [uname] }*/ })
  																			.populate('students', 'firstname lastname email profile.profileImage role guest', { userStatus : 'Active' })
  																			.populate('instId', 'firstname lastname email profile.profileImage role')
                                        .exec(function(studErr, studRes) {
  																				if(!studErr) {
                                            // console.log("6 - stud - ", moment());
  																					// console.log("Student data--", studRes);
  																					resConfObj['autharized'] = true;
                                            if (studRes && studRes.students)
  																					 resConfObj['users'] = studRes.students;
                                            if (studRes && studRes.instId)
                                              resConfObj['users'].push(studRes.instId);
  																				} else {
  																					resConfObj['error'] = "Error fetching student id";
  																					// res.json({status: false, data : resConfObj});
  																				}
  																			});
  																	} else /*if(hostRole == Roles.Superadmin || hostRole == Roles.Admin || hostRole == Roles.Lmsadmin)*/ {
                                      // console.log("sch present, A & SA");
                                      Student.find({ roomId : room._id /*, students : {$in : [uname] }*/ })
                                            .populate('students', 'firstname lastname email profile.profileImage role guest', { userStatus : 'Active' })
                                            .populate('instId', 'firstname lastname email profile.profileImage role')
                                            .exec(function(studErr, studRes) {
                                              if(!studErr) {
                                                // console.log("6 - stud - ", moment());
                                                // console.log("Student data--", studRes);
                                                // resConfObj['users'] = studRes.students;

                                                resConfObj['users'] = room.users;

                                                // Merges both arrays and gets unique items
                                                studRes.forEach(function (item) {
                                                  resConfObj['users'] = [...resConfObj.users, ...item.students];
                                                });

                                                // console.log("users--", resConfObj.users);
                                                resConfObj['autharized'] = true;
                                              } else {
                                                resConfObj['error'] = "Error fetching student id";
                                                // res.json({status: false, data : resConfObj});
                                              }
                                            });
  																	}
  																	createToken(room.roomid, uname, /*RoleName.userRole*/roleObj[userRole], room.selPackage, function(status, token){
  																		if(status){
                                        // console.log("7 - token - ", moment());
  																			resConfObj['token'] = token.response;
                                        resConfObj['validPackage'] = token.validPackage;
                                        resConfObj['packageData'] = token.packageData;
                                        resConfObj['validCPLimit'] = true;
                                        resConfObj['serverResponse'] = token.serverResponse;
  																			// console.log("OBJECT1----  ", resConfObj);
  																			res.json({status: true, data: resConfObj});	
                                        // let logObj = {
                                        //   logType : 'Room',
                                        //   actionType : 'Join',
                                        //   actionTime : now,
                                        //   uid : userData._id,
                                        //   details : {
                                        //     roomId : room._id,
                                        //     scheduleId : schRes._id,
                                        //     remoteAddress : req.connection.remoteAddress,
                                        //     userAgent : req.headers['user-agent'],
                                        //     name : room.roomName
                                        //   }
                                        // } 
                                        // createLog(logObj, function(status) {
                                        //   if(status) {
                                        //     // console.log(status);
                                        //   }
                                        // });
  																		}else{
                                        resConfObj['error'] = token.response;
                                        resConfObj['validPackage'] = token.validPackage;
                                        resConfObj['packageData'] = token.packageData;
                                        resConfObj['validCPLimit'] = false;
                                        resConfObj['serverResponse'] = token.serverResponse;
                                        res.json({status: false, data : resConfObj});	
                                        // let logObj = {
                                        //   logType : 'Conference',
                                        //   actionType : 'Connection Error',
                                        //   actionTime : now,
                                        //   uid : userData._id,
                                        //   details : {
                                        //     roomId : room._id,
                                        //     scheduleId : schRes._id,
                                        //     remoteAddress : req.connection.remoteAddress,
                                        //     userAgent : req.headers['user-agent'],
                                        //     Reason : "Token not found"
                                        //   }
                                        // } 
                                        // createLog(logObj, function(status) {
                                        //   if(status) {
                                        //     // console.log(status);
                                        //   }
                                        // });
  																		}
  																	});
  																} else {
                                      // console.log("sch not presentt");
  																	resConfObj['autharized'] = true;
  																	resConfObj['users'] = room.users;
  																	createToken(room.roomid, uname, /*RoleName.userRole*/roleObj[userRole], room.selPackage, function(status, token){
  																		if(status){
                                        // console.log("8 - token - ", moment());
                                        resConfObj['token'] = token.response;
                                        resConfObj['validPackage'] = token.validPackage;
                                        resConfObj['packageData'] = token.packageData;
                                        resConfObj['validCPLimit'] = true;
                                        resConfObj['serverResponse'] = token.serverResponse;
  																			// console.log("OBJECT2----  ", resConfObj);
  																			res.json({status: true, data : resConfObj});
                                        
                                        // let logObj = {
                                        //   logType : 'Room',
                                        //   actionType : 'Join',
                                        //   actionTime : now,
                                        //   uid : userData._id,
                                        //   details : {
                                        //     roomId : room._id,
                                        //     remoteAddress : req.connection.remoteAddress,
                                        //     userAgent : req.headers['user-agent'],
                                        //     name : room.roomName
                                        //   }
                                        // } 
                                        // createLog(logObj, function(status) {
                                        //   if(status) {
                                        //     // console.log("9 - log - ", moment());
                                        //     // console.log(status);
                                        //   }
                                        // });	
  																		}else{
                                        resConfObj['error'] = token.response;
                                        resConfObj['validPackage'] = token.validPackage;
                                        resConfObj['packageData'] = token.packageData;
                                        resConfObj['validCPLimit'] = false;
                                        resConfObj['serverResponse'] = token.serverResponse;
                                        res.json({status: false, data : resConfObj}); 	
                                        
                                        // let logObj = {
                                        //   logType : 'Conference',
                                        //   actionType : 'Connection Error',
                                        //   actionTime : now,
                                        //   uid : userData._id,
                                        //   details : {
                                        //     roomId : room._id,
                                        //     remoteAddress : req.connection.remoteAddress,
                                        //     userAgent : req.headers['user-agent'],
                                        //     Reason : "Token not found"
                                        //   }
                                        // } 
                                        // createLog(logObj, function(status) {
                                        //   if(status) {
                                        //     // console.log(status);
                                        //   }
                                        // });
  																		}
  																	});
  																	// resConfObj['error'] = "Error in fetching Schedule or No Schedule present.";
  																	// res.json({status: false, error : resConfObj});
  																}
  															});
  										}else{
  											resConfObj['error'] = "Missing Room or Key.";
  											res.json({status: false, data : resConfObj});
  										}
  									});
  						} else {
  							resConfObj['error'] = "User Not found.";
  							res.json({status: false, data : resConfObj});
  						}
  					});
  	}
  } catch(e) {
    console.log('error in getToken',e);
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}

/**
*  @Global function name : createLog
*  @Purpose : For creating logs
*  @logObject : { logType : "log type", actionType : "action type", actionTime : current date, uid : "user id", details : { log details} }
*  @callback : True or False
*  @Author : Aniket Gupta
*/

// global.createLog = function(logObj, callback) {

//   //Creates new log
//   var objEntity = new Logger(logObj);
//   objEntity.save(function (err, doc) {
//     if (err) {
//       console.log(err.message, logObj)
//       callback(false);
//     } else {
//       callback(true);
//     }
//   });
// }

/**
*  @Function name : fetchConferenceTopic
*  @Purpose : For fetching topic data conference side
*  @Request Object : params : { roomKey: 'roomKey' }
*  @Response Object : Success - Topic data, Room name, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchConferenceTopic(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if(person == null || !req.params.roomKey) {
        res.json({
        	status: false, 
          error : "Invalid request.", 
          errorCode : 208  
        });
      } else {

        //Validating if room key is valid or not
        if (validator.isEmpty(req.params.roomKey)) {
          res.json({ 
          	status: false, 
          	error : "Invalid room key"
          });
        } else {

          //Query for finding the room data based on room key
          let query = Room.findOne({ 
            roomKey : addSlash(req.params.roomKey)
          })          
          .exec(function (err, room) {
            if (err) { 
            	res.json({ 
            		status: false, 
            		error : 'Invalid Room' 
            	}); 
            }
            if (room) {
            	let roomName = room.roomName
              let roomId = room._id

              //Query for finding the topic data based on room id
            	let query = Topic.find({ 
                roomId : room._id,
                topicEnable : true
              });
              query.select('topicName topicEnable description topicIndex')
            	query.populate('createdBy',  'firstname lastname profile.profileImage')
              // query.populate('questionnaire.questionnaireId',  'questionnaireName')      
              query.sort({
                'topicIndex': 1
              })   
		          .exec(function (err, doc) {
		            if (err) { 
		            	res.json({ 
		            		status: false, 
		            		error : 'Invalid Topic' 
		            	}); 
		            } else {
		            	res.json({ 
		            		status: true, 
		            		data : doc,
		            		roomName : roomName,
                    roomId : roomId 
		            	}); 
		            }
		          });
            }
          });
        }
      }
    } catch(e) {
      console.log("Error in fetch conference topic", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchConferenceTopicFiles
*  @Purpose : For fetching topic upload data conference side
*  @Request Object : params : { id: 'topic id' }
*  @Response Object : Success - Upload data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchConferenceTopicFiles(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if(person == null) {
        res.json({
        	status: false, 
          error : "Invalid request.",
          errorCode: 208 
        });
      } else if (!req.params.id) {
        res.json({
        	status: false, 
        	error : "Invalid request."  
        });
      } else {

        //Validating if topic id is valid or not
        if (validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({ 
          	status: false, 
          	error : "Invalid Topic Id"
          });
        } else {

          //Query for finding the topic data based on topic id
          var query = Topic.findOne({ 
            _id : req.params.id
          })          
          .exec(function (err, topicDoc) {
            if (err) { 
            	res.json({ 
            		status: false, 
            		error : 'Invalid Topic' 
            	}); 
            } else {

              //Query for finding the upload data based on topic id
            	var query = Upload.find({ 
                topicId : req.params.id,
                isEnable :true
              })         
		          .exec(function (err, uploadedDoc) {
		            if (err) { 
		            	res.json({ 
		            		status: false, 
		            		error : 'No Files' 
		            	}); 
		            } else {
                  // console.log("upload data:", uploadedDoc);
		            	res.json({ 
		            		status: true, 
		            		data : uploadedDoc,
		            	}); 
		            }
		          });
            }
          });
        }
      }
    } catch(e) {
      console.log("Error in fetch conference topic files", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchConferenceTopicPdfFiles
*  @Purpose : For fetching topic upload individual flie data in conference side
*  @Request Object : params : { tid: 'topicid', fid: 'fileId' }
*  @Response Object : Success - Upload data, Failure - Error message
*  @Author : pranathi gaddam
*/

export function fetchConferenceTopicPdfFiles(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208 
        });
      } else if (!req.params.tid || !req.params.fid ) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        //Query for finding the upload data based on topic id, fileId
        Upload.findOne({ 
          _id: mongoose.Types.ObjectId(req.params.fid),
          topicId : req.params.tid,
          isEnable :true
        })         
        .exec(function (err, uploadedDoc) {
          if (err) { 
            res.json({ 
              status: false, 
              error : 'No Files' 
            }); 
          } else {
            res.json({ 
              status: true, 
              data : uploadedDoc,
            }); 
          }
        });
      }
    } catch(e) {
      console.log("Error in fetch conference topic PDF files", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchConferenceTopicQuestionnaire
*  @Purpose : For fetching topic questionnaire in conference side
*  @Request Object : params : { roomId: 'rid', topicId:'tid' }
*  @Response Object : Success - Topic data, Room name, Failure - Error message
*  @Author : pranathi
*/

export function fetchConferenceTopicContentData(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208 
        });
      } else if (!req.params.rid || !req.params.tid) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room key is valid or not
        if (validator.isEmpty(req.params.rid)) {
          res.json({ 
            status: false, 
            error : "Invalid room id"
          });
        } else {

            //Query for finding the topic data based on room id
            Topic.findOne({ 
              roomId : req.params.rid, _id : req.params.tid, topicEnable : true
            })
            .select('topicName content questionnaire')
            .populate('createdBy',  'firstname lastname profile.profileImage')
            .populate('questionnaire.questionnaireId',  'questionnaireName')      
            .sort({ 'topicIndex': 1 })   
            .exec(function (err, doc) {
              if (err) { 
                res.json({ 
                  status: false, 
                  error : 'Invalid Topic' 
                }); 
              } else {
                res.json({ 
                  status: true, 
                  data : doc
                }); 
              }
            });
        }
      }
    } catch(e) {
      console.log("Error in fetch conference topic", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchConferenceTopicQuestions
*  @Purpose : For fetching topic questionnaire and result data conference side
*  @Request Object : params : { tid: 'topic id', id: 'questionnaire id' }
*  @Response Object : Success - Questionnaire data, Result data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchConferenceTopicQuestions(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if(person == null) {
        res.json({
        	status: false, 
          error : "Invalid request.",
          errorCode: 208  
        });
      } else if (!req.params.tid || !req.params.id) {
        res.json({
        	status: false, 
        	error : "Invalid request."  
        });
      } else {

        //Validating if questionnaire id and topic id is valid or not
        if (validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({ 
          	status: false, 
          	error : "Invalid Questionnaire Id"
          });
        } else if (validator.isEmpty(req.params.tid) || !mongoose.Types.ObjectId.isValid(req.params.tid)) {
          res.json({ 
            status: false, 
            error : "Invalid Topic Id"
          });
        } else {
          let now = moment().seconds(0).utc().toDate();
         
          //Query for finding the topic data based on topic id and questionnaire id whose start time is lesser than or equal to current time
          var query = Topic.findOne({ 
            _id : req.params.tid,
            'questionnaire.questionnaireId' : req.params.id
          },{'questionnaire.$.questionnaireId':1})
          // .select('questionnaire')
          .exec(function (err, topicDoc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else if (topicDoc) {
              if(_.isEmpty(topicDoc.questionnaire)){
                res.json({
                  status : false,
                  error : 'Questionnaire has not been added to topic'
                })
              } else {
                let now = moment().seconds(0).utc().toDate();

                let openFrom = topicDoc.questionnaire[0].openFrom != undefined || topicDoc.questionnaire[0].openFrom != null ? moment(topicDoc.questionnaire[0].openFrom).seconds(0).utc().toDate() : undefined;

                let closeFrom = topicDoc.questionnaire[0].closeFrom != undefined || topicDoc.questionnaire[0].closeFrom != null ? moment(topicDoc.questionnaire[0].closeFrom).seconds(0).utc().toDate() : undefined
                
                if(openFrom!= undefined && now<openFrom) {
                  res.json({
                    status : false,
                    error : 'Questionnaire not yet started'
                  })
                } else {

                  //Query for finding the questionnaire data based on questionnaire id
                  var query = Questionnaire.findOne({ 
                    _id : req.params.id 
                  })          
                  .lean().exec(function (err, questionDoc) {
                    if (err) { 
                      res.json({ 
                        status: false, 
                        error : err.message 
                      }); 
                    } else if (questionDoc) { 
                       questionDoc['openFrom'] = openFrom;
                       questionDoc['closeFrom'] = closeFrom;                 

                      //Query for finding the result against questionnaire id
                      var query = Result.findOne({ 
                        questionnaireId : req.params.id, 
                        topicId: req.params.tid, 
                        submittedBy: mongoose.Types.ObjectId(person._id) 
                      })          
                      .exec(function (err, resultDoc) {
                        if (err) { 
                          res.json({ 
                            status: false, 
                            error : err.message 
                          }); 
                        } else if(resultDoc) {                 
                          //If result is there send questionnaire and result data else send questionnaire data  
                           
                          let hideResultObj = {};
                          if(topicDoc.questionnaire[0].showResult == false) {
                            hideResultObj['wrongAns'] = resultDoc['wrongAns'];
                            hideResultObj['correctAns'] = resultDoc['correctAns'];
                            hideResultObj['submittedBy'] = resultDoc['submittedBy']
                          }
                           
                          res.json({ 
                            status: true, 
                            data : questionDoc,
                            submittedData : topicDoc.questionnaire[0].showResult == false?hideResultObj:resultDoc
                          });   
                        } else if ( closeFrom == undefined || closeFrom > now) {
                          //Changes made by prateek as the user shouldn't attend the questionnaire as off general scenario
                          //Verifying if close time of questionnaire is undefined or not
                        
                          res.json({ 
                            status: true, 
                            data : questionDoc
                          }); 
                        } else {                            
                          res.json({ 
                            status: false, 
                            error : "Result not found"
                          });                          
                        }                        
                      })
                      
                    } else {
                      res.json({ 
                        status: false, 
                        error : 'Invalid Questionnaire' 
                      }); 
                    }
                  })
                }
              }
            } else {
              res.json({ 
                status: false, 
                error: 'Invalid Topic'
              }); 
            }
          });
        }
      }
    } catch(e) {
      console.log("Error in fetch conference topic questions", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : saveAnswers
*  @Purpose : For saving answers of questionnaire
*  @Request Object : answerData : { uid: 'user id', topicId: 'topic id', questionnaireId: 'questionnaire id', answers: { questionId : [answers] } }
*  @Response Object : Success - Success message, Result data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function saveAnswers(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null){
        res.json({
        	status: false, 
          error : "Invalid request.",
          errorCode: 208 
        });
      } else if(!req.body.answerData || !req.body.answerData.questionnaireId || !req.body.answerData.topicId) {        
        res.json({
        	status: false, 
        	error : "Invalid request."  
        });
      } else {
        let obj = req.body.answerData;
        
        obj['submittedBy'] = person._id;
        //Validating if questionnaire id and topic id is valid or not
        if (validator.isEmpty(obj.questionnaireId) || !mongoose.Types.ObjectId.isValid(obj.questionnaireId)) {
          res.json({ 
          	status: false, 
          	error : "Invalid Questionnaire Id"
          });
        } else if (validator.isEmpty(obj.topicId) || !mongoose.Types.ObjectId.isValid(obj.topicId)) {
          res.json({ 
          	status: false, 
          	error : "Invalid Topic Id"
          });
        } else {

          let topicQuery = Topic.findOne({_id: obj.topicId, "questionnaire.questionnaireId" : obj.questionnaireId},{"questionnaire.$.questionnaireId":1});
          topicQuery.exec(function(err, topicData){
            if (err) {
              res.json({
                status : false,
                error : err.message
              })
            } else if(topicData && topicData.questionnaire && topicData.questionnaire.length>=1) {              
              let currentTime = new Date();
              let assignedEndTime = topicData.questionnaire[0].closeFrom != null?new Date(topicData.questionnaire[0].closeFrom):null;  
              
              let questionnaireQuery = Questionnaire.findOne({_id : obj.questionnaireId},{questions:1});

              questionnaireQuery.exec(function(err, questionnaireData) {
                if (err) {
                  res.json({
                    status : false,
                    error : err.message
                  })
                } else if (questionnaireData){
                  let questionnaireQuestions = questionnaireData.questions;
                  let attemptedAnswers = obj.answers;
                  let obtainedMarks = 0;
                  let wrongAns = [];
                  let correctAns = [];
                  let questionnairePercentage = 0;
                  let result = ''; 
                  let grade = '';

                  if(currentTime<=assignedEndTime || assignedEndTime == null) {
                    _.mapKeys(attemptedAnswers, function(value, key) {
                      let atemptedAnswersValue = _.map(value, _.trim);
                      var index = _.findIndex(questionnaireQuestions, function(Obj) {
                        return key == Obj._id
                      })
                      let dbAnswersObj = questionnaireQuestions[index];
                      
                      if(!dbAnswersObj.swots || dbAnswersObj.swots.length <= 0) {
                        let dbAnswers = _.compact(_.map(dbAnswersObj.answers, _.trim));
                        // console.log('dbAnswers', dbAnswers);
                        // console.log('atemptedAnswersValue', atemptedAnswersValue);
                        // console.log(_.isEqual(dbAnswers, atemptedAnswersValue));
                        // console.log(_.difference(dbAnswers, atemptedAnswersValue).length == 0);
                        if(_.isEqual(dbAnswers, atemptedAnswersValue) || (_.difference(dbAnswers, atemptedAnswersValue).length == 0 && dbAnswers.length == atemptedAnswersValue.length)) {
                          obtainedMarks += dbAnswersObj.marks
                          let correctAnsObj = {
                            questionId : dbAnswersObj._id,
                            answers : atemptedAnswersValue,
                            swotWithoutAns : false
                          };
                          correctAns.push(correctAnsObj)
                        } else {
                          let wrongAnsObj = {
                            questionId : dbAnswersObj._id,
                            answers : atemptedAnswersValue,
                            swotWithoutAns : false
                          }
                          wrongAns.push(wrongAnsObj)
                        }
                      } else {
                        let correctAnsObj = {
                          questionId : dbAnswersObj._id,
                          answers : atemptedAnswersValue,
                          swotWithoutAns : false
                        };
                        correctAns.push(correctAnsObj)                  
                      }
                    })
                  } 

                  //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
                  let bussinessID = null;
                  if(person.profile.companyid && person.profile.companyid._id) {
                    bussinessID = person.profile.companyid._id;
                  }
                  GradeConfiguration.findOne({
                    companyid : bussinessID
                  }).exec(function(err, gradeResults) {
                    if (err) {
                      res.json({
                        status : false,
                        error : err.message
                      })
                    } else {
                      let defaultGrades =  [{
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
                      let gradesArray = _.isEmpty(gradeResults)?defaultGrades:gradeResults.grades;
                      questionnairePercentage = Math.floor((obtainedMarks/obj.totalMarks)*100);                
                      
                      gradesArray.forEach(function(data) {
                        if(questionnairePercentage >= data.from && questionnairePercentage <= data.to) {               
                          grade = data.grade;
                          result = data.result                
                        }
                      })
                      obj['obtainedMarks'] = obtainedMarks
                      obj['grade'] = grade;
                      obj['result'] = result
                      obj['questionnairePercentage'] = questionnairePercentage;
                      obj['correctAns'] = correctAns;
                      obj['wrongAns'] = wrongAns;

                      delete obj['gradesInfo'];
                      delete obj['answers'];             

                      //Save the answers
                      var objEntity = new Result(obj);
                      objEntity.save(function (err, doc) {
                        // console.log("err == ",err);
                        // console.log("doc == ",doc);
                        if (err) {
                          res.json({ 
                            status : false, 
                            error : "Submission Failed" 
                          });
                        } else {
                          let hideResultObj = {};
                          if(topicData.questionnaire[0].showResult == false) {
                            hideResultObj['wrongAns'] = doc['wrongAns'];
                            hideResultObj['correctAns'] = doc['correctAns'];
                            hideResultObj['submittedBy'] = doc['submittedBy']
                          }
                          res.json({ 
                            status : true, 
                            data : topicData.questionnaire[0].showResult == false?hideResultObj:doc, 
                            message : assignedEndTime!=null && currentTime>assignedEndTime?'Your answers will not be considered as questionnaire end time has been completed':'Submitted successfully'
                          });                          
                        }
                      }); 
                    } 
                  })                  
                }
              })              
            } else {
              res.json({
                status : false,
                error : 'Questionnaire has not been assigned to topic'
              })
            }
          })     
        }
      }
    } catch(e) {
      console.log("e in saveAnswers == ",e);
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again"
      });
    }
  });
}

/**
*  @Function name : saveLog
*  @Purpose : For saving logs of conference
*  @Request Object : { logType : "log type", actionType : "action type", actionTime : current date, uid : "user id", details : { log details} }
*  @Response Object : Success - True, Failure - False
*  @Author : Aniket Gupta
*/

export function saveLog(req, res){
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if ( person == null || !req.body.data) {
        res.json({ 
          status : false, 
          error : "Invalid request." 
        });
      } else {
        let obj = req.body.data;
        let now = moment().utc().toDate();
        let roomId;
        var hostId = null;
        var scheduleId = null;
        if (req.body.data.hostId == undefined || req.body.data.hostId == '') {
        } else {
          hostId = mongoose.Types.ObjectId(req.body.data.hostId)
        }
        if (req.body.data.scheduleId == undefined || req.body.data.scheduleId == '') {
        } else {
          scheduleId = mongoose.Types.ObjectId(req.body.data.scheduleId)
        }

        if (obj.roomKey) {

          //Query for finding the room data based on room key
          var query = Room.findOne({ 
            roomKey : addSlash(obj.roomKey)
          })          
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : 'Invalid Room Key' 
              }); 
            }
            if (doc) {
              roomId = doc._id
              res.json({ 
                status: true 
              });
              //Log obj which need to be inserted in logger collection
              // let logObj = {
              //   logType : req.body.data.logType,
              //   actionType : req.body.data.actionType,
              //   actionTime : now,
              //   uid : person._id,
              //   details : {
              //     token : req.body.data.token,
              //     codec : req.body.data.codec,
              //     remoteAddress : req.connection.remoteAddress,
              //     userAgent : req.headers['user-agent'],
              //     Reason : req.body.data.reason,
              //     roomId : roomId,
              //     hostId : hostId,
              //     scheduleId : scheduleId,
              //   }
              // } 

              // //Function to create logs for conference
              // createLog(logObj, function(status) {
              //   if(status) {
              //     res.json({ 
              //       status : true
              //     });
              //   } else {
              //     res.json({ 
              //       status : false
              //     });
              //   }
              // }); 
            } else {
              res.json({ 
                status: false, 
                error : 'Invalid Room Key' 
              }); 
            }
          })
        }
      }
    } catch(e) {
      console.log("error in save log",e);
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again"
      });
    }
  });
}

/**
*  @Function name : fetchConferenceAssignment
*  @Purpose : For fetching assignment data conference side
*  @Request Object : params : { roomKey: 'roomKey' }
*  @Response Object : Success - Topic data, Room name, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchConferenceAssignment(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208  
        });
      } else if (!req.params.roomKey) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room key is valid or not
        if (validator.isEmpty(req.params.roomKey)) {
          res.json({ 
            status: false, 
            error : "Invalid room key"
          });
        } else {

          //Query for finding the room data based on room key
          var query = Room.findOne({ 
            roomKey : addSlash(req.params.roomKey)
          })          
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : 'Invalid Room' 
              }); 
            }
            if (doc) {
              var roomName = doc.roomName

              //Query for finding the topic data based on room id
              var query = Assignment.find({ 
                roomId : doc._id 
              }) 
              query.populate('createdBy',  'firstname lastname profile.profileImage')
              query.populate('assignedTo',  'topicName')    
              query.sort({
                'createdAt': -1
              })   
              .exec(function (err, doc) {
                if (err) { 
                  res.json({ 
                    status: false, 
                    error : 'Invalid Assignment' 
                  }); 
                }
                if (doc) {
                  res.json({ 
                    status: true, 
                    data : doc
                  }); 
                }
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("Error in fetch conference assignment", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteAssignmentSubmittedFile
*  @Purpose : For deleting assignment submitted file
*  @Request Object : params : { rid: "room id", aid: 'assignment id' }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteAssignmentSubmittedFile(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null || req.params.rid || req.params.aid ) {

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
            "submissions.studentId" : mongoose.Types.ObjectId(person._id)
          },{
            "submissions.$" : 1
          });
          query.exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else {

              // console.log(doc);

              //Function calling for deleting files from uploads folder
              deleteFilesFromDest(doc.submissions[0], function(status) {
                if (status == true) {

                  //Query for removing the upload data
                  Assignment.update({
                    _id : mongoose.Types.ObjectId(req.params.aid), 
                    roomId : mongoose.Types.ObjectId(req.params.rid),
                    }, { 
                      $pull: { 
                        "submissions": {
                         "studentId" : mongoose.Types.ObjectId(person._id) 
                       } 
                     } 
                   }, function (error, result) {
                    if (error) { 
                      // console.log("Error", error.message);
                      res.json({ 
                        status : false, 
                        error: error.message, 
                        message : "Submission not present in current assignment." 
                      });
                    } else {
                      
                      /*Deleting plagiarism process for this document*/
                      // console.log("doc", doc);
                      // deletePlagiarismProcess(doc.submissions[0].plagiarismId);

                      Assignment.findOne({
                        _id : mongoose.Types.ObjectId(req.params.aid), 
                        roomId : mongoose.Types.ObjectId(req.params.rid) 
                      })
                      .populate('createdBy',  'firstname lastname profile.profileImage')
                      .exec(function(error,assDoc) {
                        if (error) {
                          res.json({
                            status: false,
                            error: "Assignment not found"
                          })
                        } else {
                          res.json({ 
                            status : true, 
                            data : assDoc,
                            message : "Deleted successfully." 
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
            }
          });
        }
      } else if (person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208
        });
      } else {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("Error in delete file", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchConferencePoll
*  @Purpose : For fetching poll data conference side
*  @Request Object : params : { roomKey: 'roomKey' }
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function fetchConferencePoll(req, res) {

  //valiating user 
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208 
        });
      } else if (!req.params.roomKey) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Validating if room key is valid or not
        if (validator.isEmpty(req.params.roomKey)) {
          res.json({ 
            status: false, 
            error : "Invalid room key"
          });
        } else {

          //Query for finding the room data based on room key
          var query = Room.findOne({ 
            roomKey : addSlash(req.params.roomKey)
          })          
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : 'Invalid Room' 
              }); 
            }
            if (doc) {
              var roomName = doc.roomName

              //Query for finding the topic data based on room id
              var query;
              if (person.role == Roles.Student) {
                query = Poll.find({ 
                  roomId : doc._id, 
                  publish : true
                }) 
              } else {
                query = Poll.find({ 
                  roomId : doc._id,
                  $or : [{
                    createdBy : person._id
                  }, {
                    publish : true
                  }]
                }) 
              }
              query.populate('createdBy',  'firstname lastname profile.profileImage')
              query.populate('submissions.submittedBy', 'firstname lastname profile.profileImage')
              query.sort({
                'createdAt': -1
              })   
              .exec(function (err, doc) {
                if (err) { 
                  res.json({ 
                    status: false, 
                    error : 'Invalid Poll' 
                  }); 
                }
                if (doc) {
                  res.json({ 
                    status: true, 
                    data : doc
                  }); 
                }
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("Error in fetch conference poll", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchConferencePollcontentdata
*  @Purpose : For fetching pollcontent data conference side
*  @Request Object : params : { roomId: 'rid',pollId: 'pid'  }
*  @Response Object : Success - data, Failure - Error message
*  @Author : pranathigaddam
*/

export function fetchConferencePollcontentdata(req, res) {
  //valiating user 
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if(person == null || !req.params.rid || !req.params.pid) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        //Query for finding the topic data based on room id
        var query;
        if (person.role == Roles.Student) {
          query = Poll.findOne({ 
            roomId : req.params.rid,
            _id:  mongoose.Types.ObjectId(req.params.pid), 
            publish : true
          }) 
        } else {
          query = Poll.findOne({ 
            roomId : req.params.rid,
            _id:  mongoose.Types.ObjectId(req.params.pid),
            $or : [{
              createdBy : person._id
            }, {
              publish : true
            }]
          }) 
        }
        query.populate('createdBy',  'firstname lastname profile.profileImage')
        query.populate('submissions.submittedBy', 'firstname lastname profile.profileImage')
        query.sort({
          'createdAt': -1
        })   
        .exec(function (err, doc) {
          if (err) { 
            res.json({ 
              status: false, 
              error : 'Invalid Poll' 
            }); 
          } else {
            res.json({ 
              status: true, 
              data : doc
            }); 
          }
        });   
      }
    } catch(e) {
      console.log("Error in fetch conference poll", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchConferencePoll
*  @Purpose : For creating poll data conference side
*  @Request Object : params : { roomKey: 'roomKey' }
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function createPoll(req, res) {

  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208 
        });
      } else if (!req.body.pollData) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        let obj = req.body.pollData;
        obj['createdBy'] = person._id;

        //Validating if room id is valid or not
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({ 
            status: false, 
            error : "Invalid Room Id"
          });
        } else {

          //Save the poll
          var objEntity = new Poll(obj);
          objEntity.save(function (err, doc) {
            // console.log("err == ",err);
            // console.log("doc == ",doc);
            if (err) {
              res.json({ 
                status : false, 
                error :  err.message
              });
            } else {

              //Query for finding the topic data based on room id
              var query = Poll.find({ 
                roomId : obj.roomId,
                $or : [{
                  createdBy : person._id
                }, {
                  publish : true
                }]
              }) 
              query.populate('createdBy',  'firstname lastname profile.profileImage')
              query.populate('submissions.submittedBy', 'firstname lastname profile.profileImage')
              query.sort({
                'createdAt': -1
              })   
              .exec(function (err, doc) {
                if (err) { 
                  res.json({ 
                    status: false, 
                    error : 'Invalid Poll' 
                  }); 
                } else if (doc) {
                  if(obj.publish == false) {
                    res.json({ 
                      status: true, 
                      data : doc, 
                      message : "Created successfully." 
                    });
                  }  else {
                    res.json({ 
                      status: true, 
                      data : doc, 
                      message : "Created and Published successfully." 
                    });
                  }
                } else {
                  res.json({ 
                    status: false, 
                    error : 'Internal server error, Please try again' 
                  }); 
                }
              });
            }
          });
        }
      }
    } catch(e) {
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again"
      });
    }
  });
}

/**
*  @Function name : submitConferencePoll
*  @Purpose : For submitting poll data conference side by student
*  @Request Object : { pollData : { submittedBy : Id, answer : answer},roomKey: 'roomKey' }
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function submitConferencePoll(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode : 208
        });
      } else if (!req.body.pollData || !req.params.id) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode : 400
        });
      } else {
        let obj = req.body.pollData;
        
        //Validating if room id is valid or not
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({ 
            status: false, 
            error : "Invalid Room Id",
            errorCode : 400
          });
        } else if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({ 
            status: false, 
            error : "Invalid Poll",
            errorCode : 400
          });
        } else {
          //changedBy : pranathi, disc:checking the ploll is published or not, 
          Poll.findOne({_id : req.params.id, roomId : obj.roomId})
          .select('publish')
          .exec(function(publishDataErr,publishData) {
            if(publishDataErr) {
              res.json({
                status : false,
                error: publishDataErr.message,
                errorCode : 400
              });
            } else {
              if(publishData && publishData.publish == true) {
                let submissionData = {
                  submittedBy : person._id,
                  answer : obj.answer
                }
                Poll.update({
                  _id : req.params.id,
                  roomId : obj.roomId
                }, 
                {
                  $push: {
                    submissions : submissionData
                  }
                }).exec(function (err, result) {
                  if (err) { 
                    res.json({ 
                      status: false, 
                      error : 'Invalid Poll',
                      errorCode : 400
                    }); 
                  }else if (result) {

                    //Query for finding the poll data based on room id
                    var query;
                    if (person.role == Roles.Student) {
                      query = Poll.find({ 
                        roomId : obj.roomId, 
                        publish : true
                      }) 
                    } else {
                      query = Poll.find({ 
                        roomId : obj.roomId,
                        $or : [{
                          createdBy : person._id
                        }, {
                          publish : true
                        }]
                      }) 
                    }
                    query.populate('createdBy',  'firstname lastname profile.profileImage')
                    query.populate('submissions.submittedBy', 'firstname lastname profile.profileImage')
                    query.sort({
                      'createdAt': -1
                    })   
                    .exec(function (err, doc) {
                      if (err) { 
                        res.json({ 
                          status: false, 
                          error : "Invalid Poll",
                          errorCode : 400
                        }); 
                      }
                      if (doc) {
                        res.json({ 
                          status: true, 
                          data : doc, 
                          message : "Submitted successfully.",
                          errorCode : 200
                        }); 
                      }
                    });
                  } else {
                    res.json({
                      status : false,
                      error : "Submission failed",
                      errorCode : 404

                    });
                  }
                });
              } else {
                res.json({
                  status: false,
                  error: "Poll submission is aborted please try again",
                  errorCode : 404
                });
              }
            }
          });
        }
      }
    } catch(e) {
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again",
        errorCode : 400
      });
    }
  });
}

/**
*  @Function name : updateConferencePoll
*  @Purpose : For updating poll data conference side by instructor
*  @Request Object : pollData : { roomId: 'roomId', question : question , options : options }
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function updateConferencePoll(req, res) {

  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208  
        });
      } else if (!req.body.pollData || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        let obj = req.body.pollData;
        
        //Validating if room id is valid or not
        if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({ 
            status: false, 
            error : "Invalid Room Id"
          });
        } else {
          Poll.findOne({_id : req.params.id,roomId : obj.roomId})
          .select('submissions') 
          .exec(function(pollSubmitErr,pollSubmitData){
            if(pollSubmitErr) {
              res.json({
                status : false,
                error : pollSubmitErr.message
              });
            } else {
              // console.log('pollSubmitData.submissions',pollSubmitData.submissions);
              if(pollSubmitData && pollSubmitData.submissions && pollSubmitData.submissions.length > 0) {
                res.json({ 
                  status: false, 
                  error : "Already Users Submitted can't Update " 
                }); 
              } else {
                Poll.update({
                  _id : req.params.id,
                  roomId : obj.roomId
                }, 
                {
                  $set: {
                    question : obj.question,
                    options : obj.options,
                    modifiedBy : person._id,
                    publish : obj.publish
                  }
                }).exec(function (err, result) {
                  if (err) { 
                    res.json({ 
                      status: false, 
                      error : 'Invalid Poll' 
                    }); 
                  } else if (result) {

                    //Query for finding the topic data based on room id
                    var query = Poll.find({ 
                      roomId : obj.roomId,
                      $or : [{
                        createdBy : person._id
                      }, {
                        publish : true
                      }]
                    }) 
                    query.populate('createdBy',  'firstname lastname profile.profileImage')
                    query.populate('submissions.submittedBy', 'firstname lastname profile.profileImage')
                    query.sort({
                      'createdAt': -1
                    })   
                    .exec(function (err, doc) {
                      if (err) { 
                        res.json({ 
                          status: false, 
                          error : 'Invalid Poll' 
                        }); 
                      }else if (doc) {
                        if(obj.publish == false) {
                          res.json({ 
                            status: true, 
                            data : doc, 
                            message : "Updated successfully." 
                          }); 
                        } else {
                          res.json({ 
                            status: true, 
                            data : doc, 
                            message : "Updated and Published successfully." 
                          });
                        }
                      } else {
                        res.jon ({
                            status: false, 
                            error : "Update failed." 
                        });
                      }
                    });
                  } else {
                    res.jon ({
                        status: false, 
                        error : "Internal server error, Please try again" 
                    });
                  }
                });
              }
            }
          });
        }
      }
    } catch(e) {
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again"
      });
    }
  });
}

/**
*  @Function name : publishConferencePoll
*  @Purpose : For updating poll data conference side by instructor
*  @Request body : { roomId: 'roomKey', pollId : 'pollId'}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function publishConferencePoll(req, res) {
  
  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208 
        });
      } else if (!req.body || !req.body.roomId || !req.body.pollId) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        let obj = req.body;
        
        //Validating if room id is valid or not
        if (validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
          res.json({ 
            status: false, 
            error : "Invalid Room Id"
          });
        } else if (validator.isEmpty(obj.pollId) || !mongoose.Types.ObjectId.isValid(obj.pollId)) {
          res.json({ 
            status: false, 
            error : "Invalid Pool Id"
          });
        } else {

          //update publish 
          Poll.update({
            _id : obj.pollId,
            roomId : obj.roomId
          }, 
          {
            $set: {
              publish : true
            }
          })
          .exec(function(err, updated) {
            if (err) {
              res.json({ 
                status : false, 
                error : err.message
              });
            } else {

              //Retrieve poll data of room and send back
              Poll.find({
                roomId : obj.roomId,
                $or : [{
                  createdBy : person._id
                }, {
                  publish : true
                }]
              })
              .populate('createdBy',  'firstname lastname profile.profileImage')
              .populate('submissions.submittedBy', 'firstname lastname profile.profileImage')
              .sort({
                'createdAt': -1
              })  
              .exec(function(err, pollData) {
                if (err) {
                  res.json({ 
                    status : false, 
                    error : err.message
                  });
                } else {
                  res.json({ 
                    status : true, 
                    data : pollData,
                    message : 'Updated and published Successfully'
                  });
                }
              })
            }
          })          
        }
      }
    } catch(e) {
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again"
      });
    }
  });
}


/**
*  @Function name : deleteConferencePoll
*  @Purpose : For updating poll data conference side by instructor
*  @Request body : { roomId: 'roomKey', pollId : 'pollId'}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function deleteConferencePoll(req, res) {
  
  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode : 208 
        });
      } else if (!req.params || !req.params.rid || !req.params.id) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode : 400 
        });
      } else {
        let obj = req.params;
      
      //Validating if room id is valid or not
        if (validator.isEmpty(obj.rid) || !mongoose.Types.ObjectId.isValid(obj.rid)) {
          res.json({ 
            status: false, 
            error : "Invalid Room Id",
            errorCode : 400 
          });
        } else if (validator.isEmpty(obj.id) || !mongoose.Types.ObjectId.isValid(obj.id)) {
          res.json({ 
            status: false, 
            error : "Invalid Poll Id",
            errorCode : 400 
          });
        } else { 

          //remove poll 
          Poll.remove({
            _id : obj.id          
          })
          .exec(function(err, deleted) {
            if (err) {
              res.json({ 
                status : false, 
                error : err.message,
                errorCode : 400 
              });
            } else {

              //Retrieve poll data of room and send back
              Poll.find({
                roomId : obj.rid,
                $or : [{
                  createdBy : person._id
                }, {
                  publish : true
                }]
              })
              .populate('createdBy',  'firstname lastname profile.profileImage')
              .populate('submissions.submittedBy', 'firstname lastname profile.profileImage')
              .sort({
                'createdAt': -1
              })  
              .exec(function(err, pollData) {
                if (err) {
                  res.json({ 
                    status : false, 
                    error : err.message,
                    errorCode : 400 
                  });
                } else {
                  res.json({ 
                    status : true, 
                    data : pollData,
                    message : 'Deleted Successfully',
                    errorCode : 201
                  });
                }
              })                                   
            }          
          })
        }
      }
    } catch(e) {
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again",
        errorCode : 400 
      });
    }
  });
}

/**
*  @Function name : fetchPollSubmissions
*  @Purpose : For fetching poll submissions data conference side by instructor
*  @Request body : { roomId: 'roomId', pollId : 'pollId'}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function fetchPollSubmissions(req, res) {
  
  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null) {
        res.json({
          status: false, 
          error : "Invalid request.",
          errorCode: 208  
        });
      } else if (!req.params || !req.params.rid || !req.params.id) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        let obj = req.params;
      
      //Validating if room id is valid or not
        if (validator.isEmpty(obj.rid) || !mongoose.Types.ObjectId.isValid(obj.rid) ) {
          res.json({ 
            status: false, 
            error : "Invalid Room Id"
          });
        } else if (validator.isEmpty(obj.id) || !mongoose.Types.ObjectId.isValid(obj.id) ) {
          res.json({ 
            status: false, 
            error : "Invalid Poll Id"
          });
        } else { 

          //For fetching poll submission data 
          Poll.findOne({
            _id : obj.id,
            roomId : obj.rid
          })
          .populate('createdBy',  'firstname lastname profile.profileImage')
          .populate('submissions.submittedBy', 'firstname lastname profile.profileImage')
          .sort({
            'createdAt': -1
          })  
          .exec(function(err, pollData) {
            if (err) {
              res.json({ 
                status : false, 
                error : err.message
              });
            } else {
              res.json({ 
                status : true, 
                data : pollData
              });
            }
          })                                   
        }
      }
    } catch(e) {
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again"
      });
    }
  });
}

export function getAttendees(req, res) {
  // console.log("getAttendees API call -- ", req.params);
  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if(person == null || !req.params || !req.params.rid) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        let obj = req.params;
      
      //Validating if room id is valid or not
        if ( validator.isEmpty(obj.rid) ) {
          res.json({ 
            status: false, 
            error : "Invalid Room Id"
          });
        } else { 
          var attendees = null;
          var hostRole = null;
          Room.findOne({ roomKey : addSlash(obj.rid) })
              .populate('users', 'firstname lastname email profile.profileImage role guest', { userStatus : 'Active'})
              .populate('corporateId', 'businessType -_id')
              .exec(function (err, room) {
                if (err) {
                  res.json({status: false, error : "Error fetching Room Data."});
                } else if( room && room.roomid){
                  let now = moment().utc().toDate();
                  let today = Number(moment().utc().format('x'));
                  Schedule.findOne({roomId : room._id, dates : {$elemMatch : { startTime : { $lte : today}, endTime : {$gte : today} }}}, {"dates.$.startTime" : 1, meetingName : 1, password : 1, createdBy : 1})
                          .populate('createdBy', 'role')
                          .exec(function(schErr, schRes) {
                            if(!schErr && schRes && schRes.dates && schRes.dates.length > 0) {
                              hostRole = schRes.createdBy.role;

                              if(hostRole == Roles.Instructor || hostRole == Roles.Presenter) {
                                Student.findOne({ roomId : room._id, instId : schRes.createdBy._id })
                                  .populate('students', 'firstname lastname email profile.profileImage role guest', { userStatus : 'Active' })
                                  .populate('instId', 'firstname lastname email profile.profileImage role')
                                  .exec(function(studErr, studRes) {
                                    if(!studErr) {
                                      if (studRes && studRes.students)
                                       attendees = studRes.students;
                                      if (studRes && studRes.instId)
                                        attendees.push(studRes.instId);

                                      res.json({status: true, attendees : attendees});
                                    }
                                  });
                              } else /*if(hostRole == Roles.Superadmin || hostRole == Roles.Admin || hostRole == Roles.Lmsadmin)*/ {
                                Student.find({ roomId : room._id /*, students : {$in : [uname] }*/ })
                                      .populate('students', 'firstname lastname email profile.profileImage role guest', { userStatus : 'Active' })
                                      .populate('instId', 'firstname lastname email profile.profileImage role')
                                      .exec(function(studErr, studRes) {
                                        if(!studErr) {
                                          attendees = room.users;

                                          // Merges both arrays and gets unique items
                                          studRes.forEach(function (item) {
                                            attendees = [...attendees, ...item.students];
                                          });
                                          res.json({status: true, attendees : attendees});
                                        }
                                      });
                              }
                             
                            } else {
                              attendees = room.users;
                              res.json({status: true, attendees : attendees});
                            }
                          });
                }else{
                  res.json({status: false, error : "Missing Room or Key."});
                }
              });
        }
      }
    } catch(e) {
      console.log("e in getAttendees === ", e);
      res.json({ 
        status : false, 
        error : "Internal server error, Please try again"
      });
    }
  });
}


/**
*  @Function name : validateSchedulePassword
*  @Purpose : For Validate the schedule password
*  @Request Object : data : obj
*  @Response Object : Success - Boolean, Failure - Error message
*  @Author : Rajesh Goriga
*/


export function validateSchedulePassword(req, res) {
  // Verifying request is valid or not
  checkValidRequest(req.headers, function (person) {
    try {
      if (person) {
        if (!req.body.data.password || req.body.data.password == null || req.body.data.password == '') {
          res.json({ status: false, error: "Please Enter schedule password" });         
        } else {
          let query = Schedule.findOne({ _id: req.body.data.scheduleId }, { password: 1 })
          query.exec(function (error, result) {
            if (error) {
              res.json({ status: false, error: "Internal server error." });
            } else if (result) {
              if (result.password === req.body.data.password) {
                res.json({ status: true });
              } else {
                res.json({ status: false, error: "Password you entered is incorrect " });
              }
            } else {
              res.json({ status: false, error: "Internal server error." });
            }
          })
        }
      } else {
        res.json({ status: false, error: "Invalid request." });
      }
    
    } catch (e) {
      console.log("e in listPackage === ", e);
      res.json({ status: false, error: "Internal server error." });
    }
  });
}

export function RemoveGuestFromRoom(req, res) {
  // console.log("at Remove user");
  // console.log("req.body.data", req.body.data);
  // Verifying request is valid or not
  checkValidRequest(req.headers, function(person){
    // console.log("person type", person.guest);
    try {
        if (!req.body.data && !req.body.data.roomKey || person == null) {
          //console.log("person is null");
          res.json({status : false, error : "Invalid user"})
        } else if (person && person.guest) {
          // console.log("person", person);
          // console.log("its a guest");
          // console.log("req.body.data.roomKey", req.body.data.roomKey);
          let roomQuery = Room.findOne({roomKey : req.body.data.roomKey});
          roomQuery.exec(function(roomErr, roomData) {
            if (roomErr) {
              res.json({ status : false, error : "Invalid Room Key"})
            } else {
              // console.log("roomData._id", roomData._id);
              // console.log("person._id", person._id);
              // console.log("Valid room key in else", roomData);
              let updateQuery =  Room.update({_id : mongoose.Types.ObjectId(roomData._id)},  {$pull : {users : person._id}});
              updateQuery.exec(function(updateErr, updateData) {
                if(updateErr) {
                  res.json({status : false, error : "Invalid RoomKey"})
                } else {
                  // console.log("Users list", updateData);
                  // console.log("Successfully updated");
                  res.json({status : true});
                }
              });
            }
          });
        } else {
          //console.log("its not a guest");
          res.json({status : true});
        }
    } catch (e) {
      console.log("e in listPackage === ", e);
      res.json({ status: false, error: "Internal server error." });
    } 
  });             
}