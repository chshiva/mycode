import Chat from '../models/chat';
import Users from '../models/users';
import Room from '../models/room';
// var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var multer  = require('multer');
var fs = require('fs');
import { sendPushNotificationIos, sendPushNotificationAndroid } from './mobile.controller';
var _ = require('lodash');
import { createRandomString } from '../randomstring';
import { checkValidRequest } from '../authorization';
var request = require('request');
import {addSlash} from '../controllers/slashesActions';
var async = require("async");
var exportToExcel = require('export-to-excel');
import { getRoomUsersData } from './room.controller';
import serverConfig from '../config';


/**
* @Function Name: "sendMessage",
* @Purpose: "To send and save the message.",
* @Request Object: chatObj : {sentTo, message, chatType, messageType, roomKey},
* @Response Object: Success- {status : true, data, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function sendMessage(req, res){

	// console.log("req.body.chatObj", req.body.chatObj);
	// Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
			if (person == null) {
				res.json({status : false, error : "Invalid request.", errorCode : 208});
			} else if (person != null && req.body.chatObj) {
      	let msgData = req.body.chatObj;

      	// insert sentby and status values
      	msgData['sentBy'] = person._id;
      	msgData['status'] = [person._id];
      	msgData['createdOn'] = moment().utc().toDate();

      	//code changed by - Najib, Desc - Setting variable for type file and using this variable subsiquently 	
      	let isFileType = false;
      	if(msgData.messageType != 'TXT' && msgData.messageType != 'YOUTUBE' && msgData.messageType != 'VIMEO' && msgData.messageType != 'URL') {
      		 isFileType = true;
      	}

      	// check type of chat
      	if (msgData.chatType == 'Room') {

      		let fileFormat = '';
		      let length = '';
		      let typeOfFile = '';
		      let allowedFormats = '';

		      if(isFileType) {
			      fileFormat = msgData.message.split(".");
			      length = fileFormat.length;
			      typeOfFile = _.trim(fileFormat[length-1]);
			      allowedFormats = _.map(['xlsx','xls','doc','docx','ppt','pptx','txt','pdf','odp','odt','ods','png','jpeg','jpg','gif','wav','mp3','wmv','mp4','mkv','avi'], _.trim);	
		      }
		     
		      if (msgData.fileSize > 20971520 && isFileType) {
            console.log("Indi Chat upload - File Size exceeded");
            res.json({ status: false, error : "File Size should be less than 20MB." });
		      } else if( !allowedFormats.includes(typeOfFile) && isFileType) {
            console.log("Indi Chat upload - File Type not supported!");
						res.json({ status : false, error : "Invalid File Extension!" });
		      } else {
	      		// get and check valid room or not
	      		Room.findOne({ roomKey : addSlash(msgData.roomKey) })
	    			.exec(function(roomErr, roomRes) {
	  					if (roomErr) {
	  						res.json({ status : false, error : roomErr.message });
	  					}	else if (roomRes) {

	  						// insert room id and delete room key
	  						msgData['sentToRoom'] = roomRes._id;
	  						delete msgData['roomKey'];

	  						// check type of message
	  						if (isFileType) {
	  							multer({ 
									  dest: process.env.PWD+"/uploads/",
									  limits: { fieldSize: 60 * 1024 * 1024 }
									}).single('upl')

									let imageBuffer = new Buffer(msgData.file, "base64");
						      let randomstring = '';

						      //Function call for creating randomstring
						      createRandomString(function(data) {
						        randomstring = data
						        let dest = process.env.PWD+"/uploads/"+randomstring+"_"+msgData.message;
	                  fs.writeFile(dest,imageBuffer,'base64',function(uploadFailed,uploaded){
	                  	if (uploadFailed) {
	                      res.json({ status:false, error: uploadFailed });
	                    } else {
	                    	delete msgData['file'];
	                    	msgData['message'] = randomstring+"_"+msgData.message
			                  saveMsg(msgData, function(cbErr, cbRess) {
				    							if (cbErr) {
				    								res.json({ status : false,error : cbErr.message });
				    							} else if (cbRess) {
				    								res.json({ status: true, data: cbRess });
				    							} else res.json({ status : false,error : "Internal server error" });
				    						});
	                    }
	                  });
						      });
	  						} else if (msgData.messageType == 'YOUTUBE') {
	  							videoAPIcall(msgData, function(cbErr, cbRess) {
	  								if(cbErr) {
	  								msgData['messageType'] = "URL";
		  								saveMsg(msgData, function(cbErr, cbRess) {
				  							if (cbErr) res.json({ status : false, error : cbErr.message });
			    							else if (cbRess) res.json({ status: true, data: cbRess });
			    							else res.json({ status : false,error : "Internal server error" });
				  						});
	  								} else if(!cbErr) {
		  								msgData['title'] = cbRess.title;
		  								msgData['duration'] = cbRess.duration;
		  								saveMsg(msgData, function(cbErr, cbRess) {
				  							if (cbErr) res.json({ status : false, error : cbErr.message });
			    							else if (cbRess) res.json({ status: true, data: cbRess });
			    							else res.json({ status : false,error : "Internal server error" });
				  						});
				  					}
		  						})
	  						} else if (msgData.messageType == 'VIMEO') {
	  							videoAPIcall(msgData, function(cbErr, cbRess) {
	  								if(cbErr) {
	  									msgData['messageType'] = "URL";
		  								saveMsg(msgData, function(cbErr, cbRess) {
				  							if (cbErr) res.json({ status : false, error : cbErr.message });
			    							else if (cbRess) res.json({ status: true, data: cbRess });
			    							else res.json({ status : false,error : "Internal server error" });
				  						});
	  								} else if(!cbErr) {
	  									//console.log("cbRess", cbRess);
		  								msgData['title'] = cbRess.title;
		  								msgData['duration'] = cbRess.duration;
		  								msgData['vimeoThumbnail'] = cbRess.vimeoThumbnail;
		  								saveMsg(msgData, function(cbErr, cbRess) {
				  							if (cbErr) res.json({ status : false, error : cbErr.message });
			    							else if (cbRess) res.json({ status: true, data: cbRess });
			    							else res.json({ status : false,error : "Internal server error" });
				  						});
				  					}
		  						})  								
	  						}else if (msgData.messageType == 'URL') {  							
									saveMsg(msgData, function(cbErr, cbRess) {
										console.log("msgData---", msgData);
		  							if (cbErr) res.json({ status : false, error : cbErr.message });
	    							else if (cbRess) res.json({ status: true, data: cbRess });
	    							else res.json({ status : false,error : "Internal server error" });
		  						});			  					 								
	  						} else {
	    						saveMsg(msgData, function(cbErr, cbRess) {
	    							if (cbErr) res.json({ status : false, error : cbErr.message });
	    							else if (cbRess) res.json({ status: true, data: cbRess });
	    							else res.json({ status : false,error : "Internal server error" });
	    						});
	  						}
	  					} else res.json({status : false, error : "Invalid room."});
	  				});
					}
      	} else {
      		if (isFileType) {
      			// console.log("msg object --- ", msgData);

			      let fileFormat = msgData.message.split(".");
			      let length = fileFormat.length;
			      let typeOfFile = _.trim(fileFormat[length-1]);
			      let allowedFormats = _.map(['xlsx','xls','doc','docx','ppt','pptx','txt','pdf','odp','odt','ods','png','jpeg','jpg','gif','wav','mp3','wmv','mp4','mkv','avi'], _.trim);
			     
			      if (msgData.fileSize > 20971520) {
              console.log("Indi Chat upload - File Size exceeded");
              res.json({
                status: false, 
                error : "File Size should be less than 20MB."
              });
			      } else if( !allowedFormats.includes(typeOfFile) ) {
              console.log("Indi Chat upload - File Type not supported!");
							res.json({ status : false, error : "Invalid File Extension!" });
			      } else {
	      			multer({ 
							  dest: process.env.PWD+"/uploads/",
							  limits: { fieldSize: 5 * 1024 * 1024 }
							}).single('upl')

							let imageBuffer = new Buffer(msgData.file, "base64");
	          	let randomstring = '';

							//Function call for creating randomstring
				      createRandomString(function(data) {
				        randomstring = data
				        let dest = process.env.PWD+"/uploads/"+randomstring+"_"+msgData.message;
			          fs.writeFile(dest,imageBuffer,'base64',function(uploadFailed,uploaded){
			          	if(uploadFailed) {
			              res.json({ status:false, error: uploadFailed });
			            } else {
			            	delete msgData['file'];
			            	msgData['message'] = randomstring+"_"+msgData.message
			              saveMsg(msgData, function(cbErr, cbRess) {
			  							if (cbErr) res.json({ status : false, error : cbErr.message });
		    							else if (cbRess) res.json({ status: true, data: cbRess });
		    							else res.json({ status : false,error : "Internal server error" });
			  						});
			            }
			          });
				      });
			      }                 							
      		} else if (msgData.messageType == 'YOUTUBE') {
      			//console.log("Inside youtube", msgData);
						videoAPIcall(msgData, function(cbErr, cbRess) {
							if(cbErr) {
								msgData['messageType'] = "URL";
								saveMsg(msgData, function(cbErr, cbRess) {
	  							if (cbErr) res.json({ status : false, error : cbErr.message });
    							else if (cbRess) res.json({ status: true, data: cbRess });
    							else res.json({ status : false,error : "Internal server error" });
	  						});
							}
							else if(!cbErr) {
								msgData['title'] = cbRess.title;
								msgData['duration'] = cbRess.duration;	  								
								saveMsg(msgData, function(cbErr, cbRess) {
	  							if (cbErr) res.json({ status : false, error : cbErr.message });
    							else if (cbRess) res.json({ status: true, data: cbRess });
    							else res.json({ status : false,error : "Internal server error" });
	  						});
	  					}
						})
					} else if (msgData.messageType == 'VIMEO') {
						videoAPIcall(msgData, function(cbErr, cbRess) {
							if(cbErr) {
								msgData['messageType'] = "URL";
								saveMsg(msgData, function(cbErr, cbRess) {
	  							if (cbErr) res.json({ status : false, error : cbErr.message });
    							else if (cbRess) res.json({ status: true, data: cbRess });
    							else res.json({ status : false,error : "Internal server error" });
	  						});
							} else if(!cbErr) {
								msgData['title'] = cbRess.title;
								msgData['duration'] = cbRess.duration;
								msgData['vimeoThumbnail'] = cbRess.vimeoThumbnail;
								saveMsg(msgData, function(cbErr, cbRess) {
	  							if (cbErr) res.json({ status : false, error : cbErr.message });
    							else if (cbRess) res.json({ status: true, data: cbRess });
    							else res.json({ status : false,error : "Internal server error" });
	  						});
	  					}
						})  								
					} else if (msgData.messageType == 'URL') {  							
						saveMsg(msgData, function(cbErr, cbRess) {
							if (cbErr) res.json({ status : false, error : cbErr.message });
							else if (cbRess) res.json({ status: true, data: cbRess });
							else res.json({ status : false,error : "Internal server error" });
						});			  					 								
					} else {
    				saveMsg(msgData, function(cbErr, cbRess) {
							if (cbErr) res.json({ status : false, error : cbErr.message });
							else if (cbRess) res.json({ status: true, data: cbRess });
							else res.json({ status : false, error : "Internal server error" });
						});
  				}
      	}

      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("eror in sendMessage === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

function videoAPIcall(msgData, callback) {
	try {
		//console.log("Inside callback", msgData);
		if(msgData && msgData!='') {
			//console.log("At calling function", msgData);
			  //Options for calling youtube api

		if(msgData.messageType == "YOUTUBE") {
			  var options = {
	    url: 'https://www.googleapis.com/youtube/v3/videos?id='+msgData.fileName+'&key=AIzaSyD9fyjCqrqlYWvqSVCm-pzoAe6OjpBJYLU&part=snippet,contentDetails',
	    headers: {
	      'Content-Type' : 'application/json'
	    }
	  };
	    //Call the youtube api
	    request.get(options, function(error, response, body) {      
	      if(!response.error){

	        //Parse the body
	        let videodata = JSON.parse(body);
	        let items = videodata.items;
	        let mData = {};
	        //console.log("items---", items);
	        if(items && items[0] && items[0].id) {
	        //If title is there in body set the title for youtube video
	        if(items[0] && items[0].snippet && items[0].snippet.title)
	          mData['title'] = items[0].snippet.title;

	        //If duration is there in body set the duration for youtube video
	        if(items[0] && items[0].contentDetails && items[0].contentDetails.duration){
	          let str = items[0].contentDetails.duration;
	          mData['duration'] = str;
	          }
	        callback(null, mData);
	      }
	    	else {
	      	//console.log("Invalid you tube link");
	      	callback("Invalid youtube Link", null);
	      }
	      }
	    });
		}	else if (msgData.messageType == "VIMEO") {

	    //Call the vimeo api

	    request.get('http://www.vimeo.com/api/v2/video/'+msgData.fileName+'.json', function(error, response) {    
	      if(!error){
	      	var newObj = response.body;	
	      	var subStr = newObj.includes("not found");
	        if(!subStr) {

	        //Parse the body
	        let videodata = JSON.parse(newObj);
	        let mData = {};     
	           
	        
	        //If title is there in body set the title for youtube video
	        if(videodata && videodata[0].title) {
	          mData['title'] = videodata[0].title;
	        }
	        //If duration is there in body set the duration for youtube video
	        if(videodata && videodata[0].duration ){
	          let str = videodata[0].duration;
	          mData['duration'] = str;

	        }
	        if( videodata && videodata[0].thumbnail_small) {
	        	let imageLink = videodata[0].thumbnail_small;        	
	        	mData['vimeoThumbnail'] = imageLink;
	        }
	        
	        callback(null, mData);
	        } else {
	      	callback("Invalid URL", null);
	      	}
	    } else {
				callback("Invalid URL", null);    	
	    }
	    });
		} 
		}
	} catch(e) {
      console.log("error in videoAPIcall",e);
      res.json({status : false, error : "Internal server error."});
    }
}

function saveMsg(msgData, callback) {
	 // console.log("msgData---",msgData);
	try{
		var objEntity = new Chat(msgData);
	  objEntity.save(function (err, doc) {
	    if (err){
	    	callback( err , null );
	    } else{
	    	if (msgData.chatType == 'Indi') {
	    		var query = Chat.find({ $or : [{sentBy : msgData.sentBy, sentTo : msgData.sentTo }, {sentTo : msgData.sentBy, sentBy : msgData.sentTo }] });
		      query.populate('sentBy sentTo', 'firstname lastname email profile.profileImage')
		      			.sort({ createdOn : 1 })
			          .exec(function (e, doc1) {
			              if (e){ 
			              	callback( e, null );
			              } else if (doc1){
			              	callback( null, doc1 );
			              	Users.findOne({ _id : mongoose.Types.ObjectId(msgData.sentTo) })
			              		.populate('profile.companyid', 'businessType')
					  						.exec(function (err, person) {
						  						if (person && person.deviceType == 'IOS') {
						  							sendPushNotificationIos("INDI-CHAT", msgData.message, person.deviceId, msgData.sentBy, msgData.sentTo, person.profile.companyid.businessType);
						  						} else if (person && person.deviceType == 'ANDROID') {
						  							sendPushNotificationAndroid("INDI-CHAT", msgData.message, person.deviceId, msgData.sentBy, msgData.sentTo);
											  	}
										  });
			              } else callback(null, null);
			          });
			  } else if(msgData.chatType == 'Group') {
		    	var query = Chat.find({ sentToGroup : msgData.sentToGroup });
		      query.populate('sentBy', 'firstname lastname email profile.profileImage')
		      		 .populate('sentToGroup', 'groupName members')
		      			.sort({ createdOn : 1 })
			          .exec(function (e, doc1) {
			              if (e){ 
			              	callback( e , null );
			              } else if(doc1) {
			              	callback( null, doc1 );
			              	Users.findOne({ _id : mongoose.Types.ObjectId(msgData.sentTo) })
			              		.populate('profile.companyid', 'businessType')
					  						.exec(function (err, person) {
						  						if (person && person.deviceType == 'IOS') {
						  							sendPushNotificationIos("GROUP-CHAT", msgData.message, person.deviceId, msgData.sentBy, msgData.sentTo, person.profile.companyid.businessType);
						  						} else if (person && person.deviceType == 'ANDROID') {
						  							sendPushNotificationAndroid("GROUP-CHAT", msgData.message, person.deviceId, msgData.sentBy, msgData.sentTo);
											  	}
										  });
			              } else callback(null, null);
			          });
			  } else if(msgData.chatType == 'Room') {
		    	var query = Chat.find({ sentToRoom : msgData.sentToRoom });
		      	query.populate('sentBy', 'firstname lastname email profile.profileImage')
		      			.sort({ createdOn : 1 })
			          .exec(function (e, doc1) {
			              if (e){ 
			              	callback( e , null );
			              } else if(doc1) {
			              	callback( null, doc1 );
			              	/* Room chat push notifications + DSS
			              	** Get the users from the room and then send notification to every user who has logged in on 
			              	** Android or iOS*/
			              	
			              	Room.findOne({_id : mongoose.Types.ObjectId(msgData.sentToRoom)})
			              	.populate('corporateId', 'businessType')
			              	.exec(function(err, roomData) {
			              		if(roomData && roomData.users && roomData.users.length > 0 ) {
				             		getRoomUsersData(roomData.users, roomData._id, function(error, roomUsers){
		                            if(roomUsers != null) {
		                              if(roomUsers &&  roomUsers.length > 0) {
		                                  Users.find({_id:{ $in: roomUsers } })
		                                  .select('deviceType deviceId')
		                                  .exec(function(err, userData) {
		                                    if(userData && userData.length > 0) {
		                                       for (var i = 0; i <= userData.length - 1; i++) {
		                                        if (userData[i].deviceType == 'ANDROID' && msgData.sentBy.toString() != userData[i]._id.toString()) {
		                                          sendPushNotificationAndroid("ROOM-CHAT", msgData.message, userData[i].deviceId, msgData.sentBy, msgData.sentTo);
		                                        } else if(userData[i].deviceType == 'IOS' && roomData.corporateId && roomData.corporateId.businessType && msgData.sentBy.toString() != userData[i]._id.toString()){
		                                        	sendPushNotificationIos("ROOM-CHAT", msgData.message, userData[i].deviceId, msgData.sentBy, msgData.sentTo, roomData.corporateId.businessType);
		                                        }
		                                      } 
		                                    } 
		                                  });
		                              }
		                            }
		                          });
			             		}
			              	});
			              	/* Room chat push notifications - DSS*/
			              } else callback(null, null);
			          });
			        }
	    	}
	  });
	}  catch(e){
    console.log("error in saveMsg ",e);
    callback(null, null);
  }
}

/**
* @Function Name: "getMsgData",
* @Purpose: "To send and save the message.",
* @Request Object: query : {type, sentTo},
* @Response Object: Success- {status : true, data, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function getMsgData(req, res){

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
			if (person == null) {
				res.json({status : false, error : "Invalid request.", errorCode : 208});
			}
    	else if (person != null && req.query.type && req.query.sentTo) {
      	// let sentTo = mongoose.Types.ObjectId(req.query.sentTo);

      	// for invidual chat data
      	if (req.query.type == 'Indi') {

      		// fetch sentBy me or sentTo me
      		let query = Chat.find({ $or : [{sentBy : person._id, sentTo : req.query.sentTo }, {sentTo : person._id, sentBy : req.query.sentTo }] });
	      	query.populate('sentBy sentTo', 'firstname lastname email profile.profileImage')
	    			.sort({ createdOn : 1 })
	          .exec(function (e, doc1) {
	          	// console.log("GetIndi---",doc1);
	              if (e){ 
	              	res.json({ status: false, error : e.message });
	              } else if(doc1 && doc1.length > 0){
	              	res.json({ status: true, data: doc1 });

	              	// update the status as read
	              	Chat.update({sentTo : person._id, sentBy : req.query.sentTo }, 
	              					{$addToSet : {status : person._id}},{multi : true}).exec(function(updateerr, updated){
	              						/*console.log("updateerr === ", updateerr);
	              						console.log("updated === ",updated);*/
	              					});
	              } else res.json({ status : true, data : []});
	          });
      	} else if(req.query.type == 'Group') {

      		// for group chat data
      		let query = Chat.find({ sentToGroup : req.query.sentTo });
		      query.populate('sentBy', 'firstname lastname email profile.profileImage')
		      		 .populate('sentToGroup', 'groupName members')
		      			.sort({ createdOn : 1 })
			          .exec(function (e, doc1) {
			              if (e) { 
			              	res.json({ status: false, error : e.message });
			              } else if (doc1 && doc1.length > 0) {
			              	// console.log("GetGroup---",doc1);
			                res.json({ status: true, data: doc1 });
			              } else res.json({ status : true, data : []});
			          });
      	} else if(req.query.type == 'Room') {

      		// for room chat data
      		Room.findOne({ roomKey : addSlash(req.query.sentTo) })
    				.exec(function(roomErr, roomRes) {
    					if (roomErr) {
    						res.json({ status : false, error : roomErr.message });
    					}	else if(roomRes && roomRes._id) {
    						let query = Chat.find({ sentToRoom : roomRes._id });
					      query.populate('sentBy', 'firstname lastname email profile.profileImage')
			      			.sort({ createdOn : 1 })
				          .exec(function (e, doc1) {
				              if (e){ 
				              	res.json({ status: false, error : e.message });
				              } else if(doc1 && doc1.length > 0) {
				              	// console.log("GetGroup---",doc1);
				                res.json({ status: true, data: doc1 });
				                Chat.update({ sentToRoom : roomRes._id }, 
	              					{$addToSet : {status : person._id}},{multi : true}).exec(function(updateerr, updated){
	              						/*console.log("updateerr === ", updateerr);
	              						console.log("updated === ",updated);*/
	              					});
				              } else res.json({ status : true, data : []});
				          });
    					} else res.json({ status : false, error : "Invalid room"})
    				});
      	} else res.json({status : false, error : "Invalid request, Please try again."});
			} else res.json({status : false, error : "Invalid request."});
    } catch(e) {
      console.log("error in getMsgData",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

export function getChatNotification(req, res){
	try {
		if (!req.body && !req.body.chatObj) {
	    	res.json({status: false, error : "Invalid request"});
		} else {
			let msgData = req.body.chatObj;
			// console.log("msgData === ",msgData);
			let selector = {};
			if(msgData.chatType == 'Indi')
				selector['sentTo'] = msgData.sentTo;
			else if(msgData.chatType == 'Group')
				selector['sentToGroup'] = msgData.sentTo;
			else if(msgData.chatType == 'Room')
				selector['sentToRoom'] = msgData.sentTo;
			selector['status'] = { $nin : [msgData.sentTo]};
			selector['sentBy'] = msgData.sentBy;
			Chat.count(selector).exec(function(err, count){
				let data = {
					id : msgData.sentBy,
					count : count
				}
				res.json({ status: true, data: data });
			});
		}
	} catch(e) {
      console.log("error in getChatNotification",e);
      res.json({status : false, error : "Internal server error."});
    }
}

/**
* @Function Name: "indChatNotifications",
* @Purpose: "To get the individual chat notitfication.",
* @Request Object: {},
* @Response Object: Success- {status : true, total, notifications }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function indChatNotifications(req, res){

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null) {
      	if(person.contacts){

      		// fetch unread message records
      		let query = Chat.find({ sentTo : person._id, status : {$nin : [person._id]}});
					query.exec( function(error, result){
						// console.log("result === ",result);
						if (error) {
							console.log("error in getChatNotifications === ",error);
							res.json({ status : true, total : 0, notifications : {} });
						} else if (result && result.length > 0) {
							
							let total = 0;

							// individual count and total calcutations
							let response = _.countBy(result, function(chat) { return chat.sentBy;});
							_.each(response, function(count){
								total += count;
							});
							res.json({ status : true, total : total, notifications : response });
						} else res.json({ status : true, total : 0, notifications : {} });
					});
      	} else res.json({ status : true, total : 0, notifications : {} });
      } else res.json({status : true, total : 0, notifications : {}});
    } catch(e){
      console.log("error in getChatNotifications",e);
      res.json({status : true, total : 0, notifications : {}});
    }
  });

	/*if (!req.body && !req.body.chatObj) {
    	res.json({status: false, error : "Invalid request"});
	} else {
		let msgData = req.body.chatObj;
		// console.log("msgData === ",msgData);
		let selector = {};
		if(msgData.chatType == 'Indi')
			selector['sentTo'] = msgData.sentTo;
		else if(msgData.chatType == 'Group')
			selector['sentToGroup'] = msgData.sentTo;
		else if(msgData.chatType == 'Room')
			selector['sentToRoom'] = msgData.sentTo;
		selector['status'] = { $nin : [msgData.sentTo]};
		selector['sentBy'] = msgData.sentBy;
		Chat.count(selector).exec(function(err, count){
			let data = {
				id : msgData.sentBy,
				count : count
			}
			res.json({ status: true, data: data });
		});

	}*/
}

/**
* @Function Name: "roomChatNotifications",
* @Purpose: "To get the room chat notitfication.",
* @Request Object: {},
* @Response Object: Success- {status : true, notifications }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function roomChatNotifications(req, res){

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
			if (person != null && req.params.roomKey) {
      	Room.findOne({ roomKey : addSlash(req.params.roomKey) })
				.exec(function(roomErr, roomRes) {
					try {
						if (roomErr) {
							res.json({ status : false, error : roomErr.message });
						}	else if(roomRes && roomRes._id) {
							Chat.count({ sentToRoom : roomRes._id, status : {$nin : [person._id]} }).exec( function(err, count){
								/*console.log("err === ",err);
								console.log("count === ",count);*/
								if (err) res.json({status : true, notifications : 0});
								else res.json({ status : true, notifications : count});
							});
						} else res.json({ status : true, notifications : 0 });
					} catch(e){
			      console.log("e in roomChatNotifications inner === ",e);
			      res.json({status : false, error : "Internal server error."});
			    }
				});
			} else if (person == null) {
				res.json({status : false, error : "Invalid request.", errorCode : 208});
			} else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in roomChatNotifications",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

/**
* @Function Name: "clearRoomChat",
* @Purpose: "To delete the room chat data.",
* @Request roomKey: roomKey,
* @Response Object: Success- {status : true, message }, Failure- {status : false, error},
* @Author: "Pradeep Yadav"
*/
export function clearRoomChat(req, res) {
	// Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.roomKey) {
      	Room.findOne({ roomKey : addSlash(req.body.roomKey) })
				.exec(function(roomErr, roomRes) {
					try {
						if (roomErr) {
							res.json({ status : false, error : roomErr.message });
						}	else if(roomRes && roomRes._id) {

							Chat.find({ sentToRoom : roomRes._id }).exec( function(chatErr, chatData){
								if (chatErr) res.json({status : false, error : chatErr.message});
								else {
							   //Async.forEachOf iteratee to each item in chatData, parallel
		              async.forEachOf(chatData, function (data, key, callback) {
		              	if(data.messageType != 'IMG' || data.messageType != 'VIDEO' || data.messageType != 'FILE') {
		         					callback()
		              	} else {
			              	//Function calling for deleting files from uploads folder
			                deleteFilesFromDest(data, function(delErr, delRes) {
			                	if(delErr)
			                  	callback(delErr)
			                  else
			                  	callback()
			                });
			              }
									}, function (err) {
		                if (err) {
		                	console.log("err-- ", err);
		                  res.json({ 
		                    status : false, 
		                    error : err 
		                 });
		                } else {
											Chat.remove({ sentToRoom : roomRes._id }).exec( function(err, count){
												if (err) res.json({status : false, error : err.message});
												else {
													Chat.find({ sentToRoom : roomRes._id }).exec( function(chatErr, chatData){
														if (chatErr) {
															res.json({status : false, error : chatErr.message});
														}
														else {
															res.json({ status : true, data : chatData, message : "Room Chat cleared successfully."});
														}
													})
												}
											});
										}
									});
								}
							});
						} else res.json({ status : false, error : "Invalid room!" });
					} catch(e){
			      console.log("e in roomChatNotifications inner === ",e);
			      res.json({status : false, error : "Internal server error."});
			    }
				});
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in roomChatNotifications",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}


export function deleteFilesFromDest(doc, callback) {
	try {
		// console.log("doc---", doc);
	  let status = false;

	  //Verifying if document has fileType link or not
	  let path = process.env.PWD + "/uploads/";
	  
	  //Path for original file
	  let dest = path + doc.fileName;

	  let fileExist = fs.existsSync(dest)

	  if (fileExist == true) {

	    //Remove the original uploaded file
	    fs.unlink(dest, function(err, result) {
	      if (err) {
	        console.log("Error in original file deletion", err)
	        status = false
	        callback(err)
	      } else {
	        status = true 

	        //For finding extension of filename
	        let ext = doc.fileName.substr(doc.fileName.lastIndexOf(".") + 1);

	        //Verifying if extension is pdf or not
	        if ( (ext != "pdf") && (ext != "gif") && (ext != "wav") && (ext != 'mp3') && (ext != 'wmv') && (ext != 'mp4') && (ext != 'mkv') && (ext != 'zip')) {

	          //Filename for file converted to pdf
	          let pdfFileName = doc.fileName.substring(0, doc.fileName.lastIndexOf(".")) + ".pdf"

	          //Path for converted file
	          let dest = path + pdfFileName;

	          let fileExist = fs.existsSync(dest)

	          if (fileExist == true) {

	            //Remove the converted upload file
	            fs.unlink(dest, function(err, result) {
	              if (err) {
	                console.log("Error in converted file deletion", err)
	                status = false  
	                callback(err)
	              } else {
	                status = true   
	                callback()
	              }
	            })
	          } else {
	            status = true   
	            callback()
	          }
	        } else {
	          callback(err)
	        }
	      }
	    })
	  } else {
	    status = true   
	    callback()
	  }
	} catch(e) {
    console.log("error in deleteFilesFromDest",e);
    res.json({status : false, error : "Internal server error."});
  }
}

export function exportRoomChat (req,res) {
	checkValidRequest(req.headers, function(person){
    try{
				// for room chat data
				Room.findOne({ roomKey : addSlash(req.params.roomkey) })
				.exec(function(roomErr, roomRes) {
					if (roomErr) {
						res.json({ status : false, error : roomErr.message });
					}	else if(roomRes && roomRes._id) {
						let query = Chat.find({ sentToRoom : roomRes._id },{sentBy:1,messageType:1,message:1,createdOn:1});
						query.populate('sentBy', 'firstname lastname email profile.profileImage')
							.sort({ createdOn : 1 })
							.exec(function (e, doc1) {
									if (e){ 
										res.json({ status: false, error : e.message });
									} else if(doc1 && doc1.length > 0) {
										var inputArray=[];
										doc1.forEach(function(item){
											if(item.messageType ==='FILE') item.message = '<attachment>'
											let localTime = moment(item.createdOn, "x").tz(serverConfig.mail_timezone.zone).format("YYYY-MM-DD hh:mm A");
											//console.log("createdOn", localTime);
											let sentBy = item && item.sentBy && item.sentBy.firstname ? item.sentBy.firstname : '';
											if (sentBy != '') {
												sentBy += ' ' + (item && item.sentBy && item.sentBy.lastname ? item.sentBy.lastname : '');
												let obj={
													message : item.message,
													sentBy : sentBy,
													createdOn : localTime + ' (' + serverConfig.mail_timezone.code +') '
												}
												inputArray.push(obj);	
											}	
										})
										exportUsersData(inputArray, function(error,filename) {
											if (filename != null) {
												res.json({
													status: true,
													fileName:filename
												});
											} else {
												res.json({
													status: false,
													error: error
												});
											}
										});
									// console.log('result',inputArray);
									// 	res.json({ status: true, data: inputArray });
										
									} else res.json({ status : true, data : []});
							});
					} else res.json({ status : false, error : "Invalid room"})
				});
		} catch(e) {
			console.log("error in export room chat",e);
			res.json({status : false, error : "Internal server error."});
		}
	});
}



export function exportUsersData(exportData, callback) {
	
		try {
			var timeStamp = new Date().getTime()
			let invertedRole = _.invert()
			let gender = "profile.gender";
		 //For converting exportData to excel using export-to-excel package and creating unique filenames accoriding to timestamp
			var fileName = exportToExcel.exportXLSX({
				filename: 'RoomChat'+'_'+timeStamp,
				sheetname: 'Sheet1',
				title: [
						{
								"fieldName": "sentBy",
								"displayName": "Sender",
								"cellWidth": 30
						},
						{
								"fieldName": "message",
								"displayName": "Message",
								"cellWidth": 50,
						},
						{
								"fieldName": "createdOn",
								"displayName": "Sent At",
								"cellWidth": 50,
						}
				],
				data: exportData
			})
	
			//Default destination of exported excel sheet i.e root
			var dest = process.env.PWD+"/"+fileName;
	
			//New destination for exported excel sheet i.e public
			var newDest = process.env.PWD+"/public/"+fileName;
			
			//For copying exported excel sheet from default destination to new destination
			fs.createReadStream(dest).pipe(fs.createWriteStream(newDest));
	
			//Deleting exported excel sheet from default destination
			fs.unlink(dest, function(err, result) {
				if(err) {
				 callback(err.message,null);
					// res.json({ status: false, error: err.message });
				} else {
				
					callback(null, fileName);
					// }
				}
			});
		 } catch(e) {
				console.log('error in exportRoomChat',e);
				 callback("Internal server error.", null);
			}
	}
	