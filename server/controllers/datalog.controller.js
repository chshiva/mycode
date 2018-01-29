import Users from '../models/users';
import Corporate from '../models/corporate';
import Room from '../models/room';
import Package from '../models/package';
import Logger from '../models/logger';
import dataLog from '../models/datalog';
import { checkValidRequest } from '../authorization'

var _ = require('lodash');
var fs = require('fs');
var mongoose = require('mongoose');
var moment = require('moment');
var validator = require('validator');

var Actions = {
	LogIn: 'Log_In',
	NewUser: 'New_User',
	UpdateUser: 'Update_User',
    TopicStatus: 'Topic_Status'
}

var LogModules = {
	User: 'User',
}



export function saveToLogger(objLog, callback = null){
	// console.log("Try to save");
	// console.log("objLog === ", objLog);
    objLog['dateAdded'] = moment().utc().toDate();
	var objEntity = new dataLog(objLog);
	objEntity.save(function (err, doc) {
	  if (err) {
	    console.log(err)
	  } else {
	  	if(callback != null){
	 	  	callback(doc)
	  	}
	    // callback(true);
	  }
	});
}

export function saveLog(req, res){
	// console.log("Request Recieved")
	var objLog = req.body.data;
	objLog.uid = mongoose.Types.ObjectId(objLog.uid);
	//Creates new log
  	saveToLogger(objLog, function(doc){
  		// console.log('Hello', doc);
  		res.json({log: doc});
  	});
}

export function LogLoginStatus(status, _uid){
	var objData = null;
	if(status == 1){
		objData = {
			uid: _uid,
			category: LogModules.User,
			action: Actions.LogIn,
			value: {logged: true, mode: 0},
			label: 'User Logged In'
		}
	}else if(status == 2){
		objData = {
			uid: _uid,
			category: LogModules.User,
			action: Actions.LogIn,
			value: {logged: true, mode: 1},
			label: 'User Logged In'
		}
	}

	saveToLogger(objData);
}

export function LogUserModule(_selfId, _uid, action){
	if(action == 'create'){
		var objData = {
			uid: _selfId,
			category: 'User',
			action: Actions.NewUser,
			value: {userId: _uid},
			label: 'New User Created'
		}

		saveToLogger(objData);
	}

	if(action == 'update'){
		var objData = {
			uid: _selfId,
			category: 'User',
			action: Actions.UpdateUser,
			value: {userId: _uid},
			label: 'User Updated'
		}

		saveToLogger(objData);	
	}
}

export function updateAttendance(req, res){

    try {
    	// console.log("Update Recieved", req.body.data)
    	let _logId 			= req.body.data._id;
    	let _checkOutTime 	= moment().utc().toDate();
    	let _topicsViewed 	= req.body.data.topicsViewed;

    	dataLog.findOne({_id: mongoose.Types.ObjectId(_logId)}).exec(function(err, doc){
    		// console.log(doc);
    		if(err){
    			res.json({ 
    	            status: false, 
    	            error : 'Invalid Update' 
    	          }); 
    		}else if(doc){
    			// console.log(doc);
    			dataLog.update({ _id : mongoose.Types.ObjectId(_logId) },
    					{ $set : { 
    						'value.schedule': doc.value.schedule,
    						'value.courseId': doc.value.courseId, 
    						'value.scheduleId': doc.value.scheduleId,
    						'value.slotId': doc.value.slotId,
    						'value.checkOutTime': _checkOutTime} }).exec(function (err, result) {
    			            if (err) { 
    			              res.json({ 
    			                status: false, 
    			                error : 'Invalid Update' 
    			              }); 
    			            }else{
    			              res.json({ 
    			                status: true, 
    			                error : 'Update Successfull' 
    			              }); 
    			            }
    			        });		
    		} else {
    			res.json({ 
    			  status: false, 
    			  error : 'Invalid Update' 
    			}); 
    		}
    	});
    } catch(e) {
        console.log('error in updateAttendance',e);
        res.json({
            status: false,
            error: 'Internal server error'
        });
    }
}

export function saveVisiteTopic(req, res) {
    checkValidRequest(req.headers, function (person) {
        try {
            if (person != null && req.body.data && req.body.data.TopicId && req.body.data.roomId) { 
                let CheckInTime = moment(req.body.data.checkInTime, "x").utc().toDate();
                
                var objLog = {
                    uid: person._id,
                    category: Actions.TopicStatus,
                    action: Actions.TopicStatus,
                    value: {
                        topicId: req.body.data.TopicId,
                        checkInTime: CheckInTime,
                        roomId: req.body.data.roomId,
                        status:1
                    },
                    label: 'Topic Visited'
                };
                
                dataLog.findOne({ uid: person._id, "value.topicId": objLog.value.topicId, "value.roomId": objLog.value.roomId }, function (error, doc) {
                    if (error) {
                        res.json({
                            status: false,
                            error: 'Error In Find Log'
                        })
                    } else if (doc) {
                        dataLog.update({ uid: person._id, "value.topicId": objLog.value.topicId, "value.roomId": objLog.value.roomId }, {
                            $set: {
                                "value.checkInTime":objLog.value.checkInTime
                            }
                        }).exec(function (err, result) {
                                if (err) {
                                    res.json({
                                        status: false,
                                        error: 'Invalid Update'
                                    });
                                } else {
                                    res.json({
                                        status: true,
                                        message: 'Update Successfull'
                                    });
                                }
                            });
                    } else {
                        saveToLogger(objLog, function (doc) {
                            res.json({ log: doc });
                        });
                    }
                });
            } else {
                res.json({
                    status: false,
                    error: "Invalid user."
                });
            }

        } catch (e) {
            console.log("Error in fetch student submission assignments ", e);
            res.json({
                status: false,
                error: "Internal server error."
            });
        }
    });
}


export function markAsCompleteTopic(req, res) {
    checkValidRequest(req.headers, function (person) {
        try {
            if (person != null && req.body.data && req.body.data.TopicId && req.body.data.checkInTime && req.body.data.roomId) {
                let TopicId = req.body.data.TopicId;
                let CheckInTime = moment(req.body.data.checkInTime, "x").utc().toDate();
                dataLog.findOne({ uid: person._id, "value.topicId": TopicId, "value.roomId": req.body.data.roomId }).exec(function (err, doc) {
                    if (err) {
                        res.json({
                            status: false,
                            error: 'Invalid Update'
                        });
                    } else if (doc) {
                        let CheckOutTime = moment(req.body.data.CheckOutTime, "x").utc().toDate();
                        let setQuery = null
                        // console.log('marked',req.body.data.marked)
                        if (req.body.data.marked == true ) {
                            setQuery = {
                                $set: {
                                    "value.CheckOutTime": CheckOutTime,
                                    "value.status": 2,
                                    "value.CompletedTime": CheckOutTime
                                }

                            }
                        } else if (req.body.data.marked == false && req.body.data.unmount == false) {
                            setQuery = {
                                $unset: {
                                    "value.CompletedTime": ""
                                },
                                $set: {
                                    "value.status": 1,

                                }
                            }

                        } else {
                            setQuery = {
                                $set: {
                                    "value.CheckOutTime": CheckOutTime
                                }

                            }
                        }
                        dataLog.update({ uid: person._id, "value.topicId": TopicId, "value.roomId": req.body.data.roomId },
                            setQuery
                        ).exec(function (err, result) {
                            if (err) {
                                res.json({
                                    status: false,
                                    error: 'Invalid Update'
                                });
                            } else {
                                dataLog.findOne({ uid: person._id, "value.topicId": TopicId, "value.roomId": req.body.data.roomId }, function (error, doc) {
                                    if (error) {
                                        res.json({
                                            status: false,
                                            error: 'Error'
                                        });
                                    } else {
                                        res.json({ status: true, data: doc });
                                    }
                                })

                            }
                        });
                    } else {
                        res.json({
                            status: false,
                            error: 'Invalid Update'
                        });
                    }
                });
            } else {
                res.json({
                    status: false,
                    error: "Invalid request"
                });
            }
           

        } catch (e) {
            console.log("Error in fetch student submission assignments ", e);
            res.json({
                status: false,
                error: "Internal server error."
            });
        }
    });
}


export function getTopicStatus(req,res) {
    checkValidRequest(req.headers, function (person) {
        try {
            if (person != null && req.params.topicId && req.params.roomId) {
                dataLog.findOne({ uid: person._id, "value.topicId": req.params.topicId, "value.roomId": req.params.roomId }, { "value.status": 1 }).exec(function (err, doc) {
                    if (err) {
                        res.json({
                            status: false,
                            error: 'Invalid data'
                        });
                    } else if (doc) {
                        res.json({
                            status: true,
                            data: doc
                        });
                    } else {
                        res.json({
                            status: false,
                            error: 'Invalid data'
                        });
                    }
                });

            } else {
                res.json({
                    status: false,
                    error: "Invalid request"
                });
            }
           
        } catch (e) {
            console.log("Error in getTopicStatus  ", e);
            res.json({
                status: false,
                error: "Internal server error."
            });
        }
    });
}


