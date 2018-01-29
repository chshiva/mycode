import Users from '../models/users';
import Package from '../models/package';
import Room from '../models/room';
import Corporate from '../models/corporate';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import md5 from 'md5';
import Feedback from '../models/feedback';
import Student from '../models/students';
import Schedule from '../models/schedule';
import Questionnaire from '../models/questionnaire';
import Category from '../models/category';
import Location from '../models/location';
import Groups from '../models/group';
import dataLog from '../models/datalog';

import * as LoginController from './login.controller';
import ParticipantsGroup from '../models/participantsgroup';
import { checkUsersCount, checkhaveAdmin } from './admin.controller';
import { createRandomString } from '../randomstring';

var _ = require('lodash');
var mongoose = require('mongoose');
var validator = require('validator');
var moment = require('moment');
var exportToExcel = require('export-to-excel');
var Promise = require("bluebird");
var fs = require('fs');
var async = require("async");
import reflect from 'async/reflect';
import parallel from 'async/parallel';
import { checkValidRequest } from '../authorization';
import {addSlash} from '../controllers/slashesActions';

/**
*  @Function name : listUser
*  @Purpose : For fetching complete user data
*  @Request Object : userdata : { data: { uid: "user id", currentPage: 1, totalItems: 0, itemsPerPage: 5, searchKeyword: 'searchKeyword' } }
*  @Response Object : Success - User data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

//http://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
export function listUser(req, res) {
	// console.log("req.body.userdata", req.body.userdata);
	// Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query.items && req.query.page) {
    		let selector = {};
				let corporateId = '';

				//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
				let bussinessID = null;
				if(person.profile.companyid && person.profile.companyid._id) {
					bussinessID = person.profile.companyid._id;
				}
				// console.log("req.query.isActive", req.query.isActive);
				//Query for finding corporate data based on search keyword
				let search = addSlash(req.query.search);
				let query = Corporate.findOne({ 'businessId' : RegExp(search, 'i')	});
				query.exec(function (err, corporate) {
					if (err) {
						console.log(err);
						res.json({status : false, error : err.message});
					} else {
						let corporateId = corporate ? corporate._id : '';
						
						//Search selector based on user role
	          if(person.role == Roles.Superadmin) {
	            selector = {
	            	_id : { $ne :  person._id	} ,
	            	// guest : {$exists : false},
              //   guest : false               

	            };
	          } else if(person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.CRMadmin || person.role == Roles.Presenteradmin){
	            selector = { 
	            	_id : { $ne : person._id }, 
	            	"profile.companyid" : bussinessID,
	            	/*guest : {$exists : false},
                guest : false  */             

	            };
	          }

	          //If searchKeyword is not empty then create RegExp
	          if(req.query.search && req.query.search.trim() != '') {
	          	let slash_search = addSlash(req.query.search.trim());
	          	let search = req.query.search.trim();
              var searchKey = RegExp(slash_search,'i'); 
              var roleSearchKeyword = addSlash(search.charAt(0).toUpperCase() + search.slice(1).toLowerCase());
              var roleKey = Roles[roleSearchKeyword]  
              var role = roleKey ? roleKey : '';
              var activeUser = '';
                           
              selector['$or'] = [                
                { 'firstname' : {$regex: searchKey} },
                { 'lastname' : {$regex: searchKey} },
                { 'email' : {$regex: searchKey} },
                { 'role' : role},
                { 'profile.companyid' : corporateId }
              ]; 
	          }

	          if(req.query.userStatus != '') {
	          	if (req.query.userStatus == 'Guest') {
	          		selector['guest'] = true;
	          	} else {
	          		selector['userStatus'] = req.query.userStatus.trim();
	          		selector['guest'] = false;
	          	}
	          } else {
	          	selector['guest'] = false;
	          }

	          //Query for fetching complete user data based on selector and skip items based on itemsPerPage on previous page
	          
						let fetchquery = Users.find(selector)
							.limit(Number(req.query.items))
							.select('firstname lastname email role dateAdded profile guest')
							.populate('profile.companyid', 'businessId _id')
							.skip(Number(req.query.items) * (Number(req.query.page) - 1));
						if (req.query.sort == 'undefined' || req.query.sort == undefined) {
							fetchquery.sort({	dateAdded: -1	});
						}	else {
							fetchquery.sort(JSON.parse(req.query.sort));
						} 

						fetchquery.exec(function(error, result){
							if(error) {
							  console.log(error);  
							} else {
								
								//Query for counting complete user data based on selector
								Users.count(selector).exec(function(err, count){
									// console.log("controller result", result);
									res.json({ 
										status: true, 
										data: result, 
										count: count 
									});
								});
							}
						});
					}
				});
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("e in listUser",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}


export function myUserSelector(obj, cb){
	try {
		Users.findOne({ _id : mongoose.Types.ObjectId(obj.uid) }).select('role -_id')
			.exec(function (usererr, person) {
			if (person) {
				let slash_input = addSlash(obj.input);
				if(obj.moduleName && obj.moduleName[2].toLowerCase() == 'room') {
					Room.findOne({ _id : mongoose.Types.ObjectId(obj.moduleName[4]) }).select('users corporateId -_id')
						.exec(function(roomerr, room){
						if(room){
							Corporate.findOne({ _id : room.corporateId }).select('businessType _id')
								.exec(function(corporateerr, corporate){
								if(corporate){
									let selector = null;
									if (corporate.businessType && corporate.businessType == 'Conference') {
										if(person.role == Roles.Superadmin){ 
											selector = { "role" : Roles.Admin, 
														"profile.companyid" : mongoose.Types.ObjectId(corporate._id),
														"_id" : { $nin: room.users },
														$or: [ { "email": { "$regex": slash_input, $options: "i"} }, { "firstname": {"$regex": slash_input, $options: "i"} } ]
													};
										} else if(person.role == Roles.Admin){ 
											selector = {$and : [
															{$or : [{ "email": { "$regex": slash_input, $options: "i"} },{ "firstname": {"$regex": slash_input, $options: "i"} }]},
															{"role" : {$lte : Roles.User, $gte : Roles.Admin}},
															{"profile.companyid" : mongoose.Types.ObjectId(corporate._id)},
															{"_id" : { $nin: room.users }}
														]};
										}
									}else if (corporate.businessType && corporate.businessType == 'LMS') {
										// console.log("in lms");
										if(person.role == Roles.Superadmin){
											selector = { "role" : Roles.Lmsadmin, 
														"profile.companyid" : mongoose.Types.ObjectId(corporate._id),
														"_id" : { $nin: room.users },
														$or: [ { "email": { "$regex": slash_input, $options: "i"} }, { "firstname": {"$regex": slash_input, $options: "i"} } ]
														};
										} else if(person.role == Roles.Lmsadmin){
											selector = { $and : [
														{$or : [{ "email": { "$regex": slash_input, $options: "i"} },{ "firstname": {"$regex": slash_input, $options: "i"} }]},
														{ $or: [ {"role" : Roles.Instructor}, {"role" : Roles.Lmsadmin} ] },
														{"profile.companyid" : mongoose.Types.ObjectId(corporate._id)}, 
														{"_id" : { $nin: room.users }}
													]};
										}
									}else if (corporate.businessType && corporate.businessType == 'Presenter') {
										// console.log("in Presenter");
										if(person.role == Roles.Superadmin){
											selector = { "role" : Roles.Presenteradmin, 
														"profile.companyid" : mongoose.Types.ObjectId(corporate._id),
														"_id" : { $nin: room.users },
														$or: [ { "email": { "$regex": slash_input, $options: "i"} }, { "firstname": {"$regex": slash_input, $options: "i"} } ]
														};
										} else if(person.role == Roles.Presenteradmin){
											selector = { $and : [
														{$or : [{ "email": { "$regex": slash_input, $options: "i"} },{ "firstname": {"$regex": slash_input, $options: "i"} }]},
														{ $or: [ {"role" : Roles.Presenter}, {"role" : Roles.Presenteradmin} ] },
														{"profile.companyid" : mongoose.Types.ObjectId(corporate._id)},
														{"_id" : { $nin: room.users }}
													]};
										}
									}
									cb(null, selector);
								}else cb(corporateerr, null);
							});
						}else cb(roomerr, null);
					});
				}else if(obj.moduleName && obj.moduleName[2].toLowerCase() == 'package') {
					let selector = {$and : [
									{$or : [{ "email": { "$regex": slash_input, $options: "i"} },{ "firstname": {"$regex": slash_input, $options: "i"} }]},
									{ $or: [ {"role" : Roles.Admin}, {"role" : Roles.Lmsadmin}, {"role" : Roles.Presenteradmin} ] }
								]};
					cb(null, selector);
				}else{
					cb(null, null);
				}
			}else cb("Unauthorized user.", null);
		});
	} catch(e) {
		console.log('error in myUserSelector',e);
		cb('Internal server error',null);
	}
}

export function myUsers (req, res){
	try {
		// console.log("my users server req = ", req.body);
		if(req.body.searchData && req.body.searchData.uid){
			let obj = req.body.searchData;
			myUserSelector(obj, function(selectorerr, selector){
				/*console.log("selector === ",selector);
				console.log("selectorerr === ",selectorerr);*/			
				if(selector != null){
					selector['userStatus'] = 'Active';
					selector['guest'] = false;
					let query = Users.find(selector).select('firstname lastname email profile.profileImage role');
					query.exec(function (err, result) {
						if (err) {
							console.log("error--", err);
							res.json({ status : false, error : "Error while fatching result." });
						}
						else {
							res.json({ status : true, data: result});
						}
					});
				}else if(selectorerr != null){
					res.json({ status : true, error : selectorerr });
				}else{
					res.json({ status : true, error : "Invalid request." });
				}
			});
		}else{
			res.json({ status : true, error : "Invalid request." });
		}
	} catch(e) {
		console.log('error in myUsers',e);
		res.json({
			status: false,
			error: 'Internal server error'
		});
	} 
}

/**
*  @Function name : getCompanyIds
*  @Purpose : For fetching corporate data
*  @Request Object : { token: 'token' }
*  @Response Object : Success - Corporate data, Failure - Error message
*  @Author : Aniket Gupta
*/

// Currently Unsed
// export function getCompanyIds(req, res){
// 	//var options = [['', 'Select Company Id']];

// 	//Verifying if token is there or not
// 	if(!req.body.token) {
// 		res.json({ 
// 			data : []
// 		});
// 	} else {

// 		//Query for finding user data based on token
// 		var userquery = Users
// 		.findOne({'token': req.body.token})
// 		.select('-password');
// 		userquery.exec(function (err, person) {

// 			//If user is present
// 			if (person) {

// 				//Verifying if user is superadmin or not
// 				if(person.role == Roles.Superadmin ) {

// 					//Query for finding complete corporate data
// 					var query = Corporate.find({});
// 					query.exec(function(error, doc){
// 						if(doc) {
// 							/*_.forIn(doc, function(value, key) {
// 								let name = value.businessId+"("+value.businessName+")";
// 								options.push([value._id, name]);
// 							});*/
// 							res.json({ 
// 								data : doc
// 							});
// 						} else {
// 							res.json({ 
// 								data : []
// 							});
// 						}
// 					});
// 				} else if(person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.CRMadmin || person.role == Roles.Presenteradmin) {

// 					//Query for finding corporate data based on company id
// 					var query = Corporate.find({ 
// 						_id : person.profile.companyid
// 					});
// 					query.exec(function (error,doc) {
// 						if(doc) { 
// 							/*_.forIn(doc, function(value, key) {
// 								let name = value.businessId+"("+value.businessName+")";
// 								options.push([value._id, name]);
// 							});*/
// 							res.json({ 
// 								data : doc
// 							});
// 						} else{
// 							res.json({ 
// 								data : []
// 							});
// 						}
// 					});
// 				}
// 			} else {
// 				res.json({ 
// 					data : []
// 				});
// 			}
// 		});
// 	}  
// }

/**
*  @Function name : deleteUser
*  @Purpose : For deleting user
*  @Request Object : userdata : { id: 'user id' }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteUser(req, res) {
	try {
		//Verifying if request is valid or not
	  if(req.body.userdata) {
	    var obj = req.body.userdata;

	    //Validating if user id is valid or not
	    if(!obj.id || validator.isEmpty(obj.id) || !mongoose.Types.ObjectId.isValid(obj.id)) {
	      res.json({
	      	status: false, 
	      	error : "Invalid user."
	      });
	    } else {
	      var recordId = mongoose.Types.ObjectId(req.body.userdata.id);

	      //Query for checking if user is present in database
	      var query = Users.findOne({ 
	      	_id : recordId 
	      });
	      query.exec(function (err, doc) {
	        if (err) { 
	        	res.json({ 
	        		status: false, 
	        		error : err.message 
	        	}); 
	        } else {
	        	// console.log("user document:", doc);
					  // var now = moment().utc().toDate();

					  // //Log obj which need to be inserted in logger collection
	      //     var logObj = {
	      //       logType : 'User',
	      //       actionType : 'Deleted',
	      //       actionTime : now,
	      //       uid : doc.createdby,
	      //       details : {
	      //         name : doc.firstname,
	      //         companyId : doc.profile.companyid,
	      //         remoteAddress : req.connection.remoteAddress,
	      //         userAgent : req.headers['user-agent']
	      //       }
	      //     }

	          //Verifying if user is admin or not
	        	if(doc.role == Roles.Admin || doc.role == Roles.Lmsadmin || doc.role == Roles.Presenteradmin) {

	        		//Query for finding package data based on user id
	        		var packageQuery = Package.find({
	        			"assignedTo" : doc._id
	        		});
	        		packageQuery.exec(function (error, packageDoc){
	        			if(error) { 
	        				res.json({ 
	        					status : false, 
	        					error : error.message 
	        				}) 
	        			} else {

	        				//Verifying if package is present or not
	        				if(packageDoc && packageDoc.length > 0) {
	        					res.json({ 
	        						status : false, 
	        						error : "Package exists:delete all package assigned to the user and try again." 
	        					})
	        				} else {

	        					//Used async parallel for running the tasks collection of functions in parallel, 
	        					//without waiting until the previous function has completed.
	        					//Used async refect to continue the execution of other tasks when a task fails.deleteUser
										async.parallel([
									    async.reflect(function(callback) {
												var checkScheduleQuery = Schedule.remove({ 
													createdBy : doc._id
												});
												checkScheduleQuery.exec(function (schError, scheduleDoc) {
													if(schError) { 
													  callback(schError.message)
													} else {
														callback(null)
													}
												});
									    }),
									    async.reflect(function(callback){
												var checkQuestionnaireQuery = Questionnaire.remove({ 
													createdBy : doc._id
												});
												checkQuestionnaireQuery.exec(function (queError, questionnaireDoc) {
													if(queError) { 
													 callback(queError.message)
													} else {
														callback(null)
													}
												});
									    }),
									    async.reflect(function(callback){
												var checkCategoryQuery = Category.remove({ 
													createdBy : doc._id
												});
											  checkCategoryQuery.exec(function (catError, categoryDoc) {
											    if(catError) { 
											      callback(catError.message)
											    } else {
														callback(null)
													}
											  });
									    }),
									    async.reflect(function(callback){
												var checkLocationQuery = Location.remove({ 
													createdBy : doc._id
												});
											  checkLocationQuery.exec(function (locError, locationDoc) {
											    if(locError) { 
											      callback(locError.message)
											    } else {
														callback(null)
													}
											  });
									    }),
									    async.reflect(function(callback){
												var checkGroupQuery = Groups.remove({ 
													createdBy : doc._id
												});
												checkGroupQuery.exec(function (groupError, groupDoc) {
												  if(groupError) { 
												    callback(groupError.message)
												  } else {
														callback(null)
													}
												});
									    }),
									    async.reflect(function(callback){
												var checkPartGroupQuery = ParticipantsGroup.remove({ 
													createdBy : doc._id
												});
												checkPartGroupQuery.exec(function (partgroupError, partgroupDoc) {
												  if(partgroupError) { 
												    callback(partgroupError.message)
												  } else {
														callback(null)
													}
												});
									    }),
									    async.reflect(function(callback){
									    	if (_.isEmpty(doc.contacts)) {
									    		callback(null)
									    	} else {

													//Async.forEachOf iteratee to each item in doc.contacts, in parallely
						              async.forEachOf(doc.contacts, function (data, key, callback) {
						                var checkUserContactQuery = Users.update({ 
															_id : data._id
														}, { 
						                  $pull: { 
						                    "contacts": {
						                     	"_id" : doc._id 
						                  	} 
						                 	} 
						               	});
														checkUserContactQuery.exec(function (contactError, contactDoc) {
														  if(contactError) { 
														    return callback(contactError.message);
														  } else {
																callback()
															}
														});
						              }, function (err) {
						                if (err) {
						                  callback(err)
						                } else {
						                	callback(null)
						                }
						              });
									    	}
									    }),
									    async.reflect(function(callback) {
												var checkRoomLocationParticipants = Room.update(
													{ 
														locations : {
															$elemMatch : {
																locationParticipants : doc._id
															}
														}
													},
													{
														$pull : {
															"locations.$.locationParticipants" : doc._id
														}
													},{
														multi : true
													}
												);
												checkRoomLocationParticipants.exec(function (error, locationData) {
													if(error) { 
													  callback(error.message)
													} else {
														callback(null)
													}
												});
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
													var innerquery = Users.update({ 
												  	_id : recordId
												  }, {$set : {userStatus:'Deleted'}});
												  innerquery.exec(function (userError, response){
													  if(userError) { 
													  	res.json({ 
													  		status : false, 
													  		error : "Error while deleteing user." 
													  	});
													  } else {
													  	res.json({ 
													  		status : true, 
													  		message : "Deleted successfully." 
													  	}); 

													  	//Function for creating log on successful deletion of user
													  	// createLog(logObj, function(status) {
								        //         if(status) {
								        //           // console.log(status);
								        //         }
								        //       });
														}
													});
												} else {
													res.json({ 
														status : false, 
														error : "Error while deleteing user." 
													}); 
												}
											}
										});  
								  }
	        			}
	        		})
	        	} else {

	  		      //Used async parallel for running the tasks collection of functions in parallel, 
	  					//without waiting until the previous function has completed.
	  					//Used async refect to continue the execution of other tasks when a task fails.
							async.parallel([
						    async.reflect(function(callback) {
									var checkScheduleQuery = Schedule.remove({ 
										createdBy : doc._id
									});
									checkScheduleQuery.exec(function (schError, scheduleDoc) {
										if(schError) { 
										  callback(schError.message)
										} else {
											callback(null)
										}
									});
						    }),
						    async.reflect(function(callback) {
									var checkParticipantsGroup = ParticipantsGroup.remove({ 
										createdBy : recordId
									});
									checkParticipantsGroup.exec(function (groupError, groupDoc) {
										if(groupError) { 
										  callback(groupError.message)
										} else {
											callback(null)
										}
									});
						    }),
						    async.reflect(function(callback){
									var checkPartGroupQuery = ParticipantsGroup.update({
									},{
										$pull : {
											participants : mongoose.Types.ObjectId(recordId)
										}
									},{
										multi : true
									});
									checkPartGroupQuery.exec(function (partgroupError, partgroupDoc) {
									  if(partgroupError) { 
									    callback(partgroupError.message)
									  } else {
											callback(null)
										}
									});
						    }),
						    async.reflect(function(callback){
						    	if (_.isEmpty(doc.contacts)) {
						    		callback(null)
						    	} else {

										//Async.forEachOf iteratee to each item in doc.contacts, in parallely
			              async.forEachOf(doc.contacts, function (data, key, callback) {
			                var checkUserContactQuery = Users.update({ 
												_id : data._id
											}, { 
			                  $pull: { 
			                    "contacts": {
			                     	"_id" : doc._id 
			                  	} 
			                 	} 
			               	});
											checkUserContactQuery.exec(function (contactError, contactDoc) {
											  if(contactError) { 
											    return callback(contactError.message);
											  } else {
													callback()
												}
											});
			              }, function (err) {
			                if (err) {
			                  callback(err)
			                } else {
			                	callback(null)
			                }
			              });
						    	}
						    }),
						    async.reflect(function(callback) {
									var checkRoomLocationParticipants = Room.update(
										{ 
											locations : {
												$elemMatch : {
													locationParticipants : doc._id
												}
											}
										},
										{
											$pull : {
												"locations.$.locationParticipants" : doc._id
											}
										},{
											multi : true
										}
									);
									checkRoomLocationParticipants.exec(function (error, locationData) {
										if(error) { 
										  callback(error.message)
										} else {
											callback(null)
										}
									});
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
										var innerquery = Users.update({ 
									  	_id : recordId
									  }, {$set : {userStatus : 'Deleted'}});
									  innerquery.exec(function (userError, response){
										  if(userError) { 
										  	res.json({ 
										  		status : false, 
										  		error : "Error while deleteing user." 
										  	});
										  } else {
										  	res.json({ 
										  		status : true, 
										  		message : "Deleted successfully." 
										  	}); 

										  	//Function for creating log on successful deletion of user
										  	// createLog(logObj, function(status) {
					        //         if(status) {
					        //           // console.log(status);
					        //         }
					        //       });
											}
										});
									} else {
										res.json({ 
											status : false, 
											error : "Error while deleteing user." 
										}); 
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
	    	error : "Invalid request."
	    });
	  }
	} catch(e) {
		console.log('error in deleteUser',e);
		res.json({
			status: false,
			error: 'Internal server error'
		});
	} 
}

/*
@Function Name : myStudents
@Purpose : "To search students as per input from client side for assigning into room"
@Request Object : query:{input,roomId,instId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function myStudents(req, res) {

	// Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
  	try {
      if (person != null && req.query.roomId && mongoose.Types.ObjectId.isValid(req.query.roomId) && req.query.instId && mongoose.Types.ObjectId.isValid(req.query.instId) && req.query.input) {
	      let obj = req.query;
	      
	      //Firing a query to find whether the room document exists or not
		    Room.findOne({ 
	      	_id : obj.roomId 
	      })
				.select('users corporateId -_id')
	      .exec(function (err, roomDoc) {
	        if (err) {
	         res.json({ 
	         		status: false,
	         		error : err.message
	         	}); 
	       	} else {
	          
	          if(roomDoc){
    					let slash_input = addSlash(obj.input);
    					
	          	//Firing a query to find whether students document for partiular roomId and instId exists or not
	          	Student.findOne({ roomId : obj.roomId, instId : obj.instId})
	          	.select('students -_id')
	      			.exec(function (err, student) {
	        			if (err) { 
	        				res.json({ 
	        					status: false, 
	        					error : "Invalid student id." 
	        				}); 
	        			}
	        			else {
	        				if(student == null) {

	        					//if student document is null then fire a query without checking for students in student document 
	        					Users.find({
	        						$and : [
	        							{
	        								$or : [
	        									{ 
	        										"email": { 
	        											"$regex": slash_input, 
	        											$options: "i"
	        										} 
	        									},
	        									{ 
	        										"firstname": {
	        											"$regex": slash_input, 
	        											$options: "i"
	        										} 
	        									}
	        								]
	        							}, 
	        							{
	        								"userStatus" : 'Active',
	        								"guest" : false
	        							},
												{
													$or : [
														{
															"role" : Roles.Student
														},
														{
															"role" : Roles.Attendee
														},
													]
												},
												{
													"profile.companyid" : mongoose.Types.ObjectId(roomDoc.corporateId)
												}
											]
										})
										.select('firstname lastname email profile.profileImage role')
										.exec(function (error, result) {
											if (error) {
												res.json({ 
													status : false,
													error : "Error while fetching result." 
												});
											}	else {
												res.json({
													status: true,
													data: result
												});
											}
										});
	        				} else {

	        					//if student document is not null then fire a query with checking for students in student document 
	      					  Users.find({
	      					  	$and : [
	      					  		{
	      					  			$or : [
	      					  				{ 
	      					  					"email": {
	      					  					 "$regex": slash_input, 
	      					  					 	$options: "i"
	      					  					} 
	      					  				},
	      					  				{ 
	      					  					"firstname": {
	      					  						"$regex": slash_input, 
	      					  						$options: "i"
	      					  					} 
	      					  				}
	      					  			]
	      					  		},
	        							{
	        								"userStatus" : 'Active',
	        								"guest" : false
	        							},
												{
													$or : [
														{
															"role" : Roles.Student
														},
														{
															"role" : Roles.Attendee
														},
													]
												},
												{
													"profile.companyid" : mongoose.Types.ObjectId(roomDoc.corporateId)
												},
												{
													"_id" : { 
														$nin: student.students 
													}
												}
											]
										})
										.select('firstname lastname email profile.profileImage role')
										.exec(function (error, result) {
											if (error) {
												res.json({ 
													status : false,
													error : "Error while fetching result." 
												});
											}	else {
												res.json({
													status: true,
													data: result
												});
											}
										});
	        				}
	      				}
	      			});
						} else {
							res.json({ 
								status : false,
								error : "Error while fetching room detail." 
							});
						}
	        }
	      });
	    } else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }     
    } catch(e) {
    	console.log('error in myStudents',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
  });		
}

export const Roles = {
	Superadmin : 1,
	Admin : 2,
	Moderator : 3,
	User : 4,
	Guest : 5,
	Lmsadmin : 12,
	Instructor : 13,
	Student : 14,
	Parent : 15,
	CRMadmin : 22,
	CRMuser : 23,
	Presenteradmin : 31,
	Presenter : 32,
	Attendee : 33
}


/**
*  @Function name : exportUsers
*  @Purpose : For exporting users to excel sheet
*  @Request Object : {userData: searched user data}
*  @Response Object : Success - Exported excel filename, Failure - Error message
*  @Author : Aniket Gupta
*/

export function exportUsers(req, res) {
	checkValidRequest(req.headers, function(person) {
  	try {
  		//changeBy: pranathi, disc: exporting users data based on role and user status
      //Verifying if request is valid or not
      if (person == null || !req.query.userStatus ) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {
  			
	  		let exportData;
	  		let selector = {};

	  		//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
	  		let bussinessID = null;
				if(person.profile.companyid && person.profile.companyid._id) {
					bussinessID = person.profile.companyid._id;
				}

	  		//Query for finding all user data created by logged in user
  			if (person.role == Roles.Superadmin) {
  					selector = {
  						_id : { $ne :  person._id	} 
  					}
  			} else {
  					selector = {
  						// createdby : person._id,
  						_id : { $ne : person._id }, 
	           "profile.companyid" : bussinessID ,
  					}
  			}

	      //If searchKeyword is not empty then create RegExp
        if(req.query.searchKeyword && req.query.searchKeyword.trim() != '') {
        	let slash_search = addSlash(req.query.searchKeyword.trim());
        	let search = req.query.searchKeyword.trim();
          let searchKey = RegExp(slash_search,'i'); 
                       
          selector['$or'] = [                
            { 'firstname' : {$regex: searchKey} },
            { 'lastname' : {$regex: searchKey} }
          ]; 
        }

        if(req.query.userStatus != '') {
        	if (req.query.userStatus == 'Guest') {
        		selector['guest'] = true;
        	} else {
        		selector['userStatus'] = req.query.userStatus;
        		selector['guest'] = false;
        	}
        } else {
        	selector['guest'] = false;
        }

				Users.find(selector)
				.lean().exec(function (err, doc) {
					if (err) {
						res.json({ 
							status: false, 
							error : "Data not found." 
						});
					} else if (doc && doc.length > 0) {
						 let roleObj = _.invert(Roles)
						 for(let index in doc ){
						 		doc[index].role = roleObj[doc[index].role]
						 }

							//Funciton call for exporting users
							exportUsersData(doc, function(error,filename) {
  							if (filename != null) {
			  					res.json({
			  						status: true,
			  						data:filename
			  					});
			  				} else {
			  					res.json({
			  						status: false,
			  						error: error
			  					});
			  				}
  						});
					} else {
						res.json({ 
							status: false, 
							error : "Data not found." 
						});
					}
				});
	  	}

  	} catch(e) {
  		console.log('error in exportUsers',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
  });		
}

/**
*  @Function name : exportUsersData
*  @Purpose : For exporting users to excel sheet
*  @exportData : { user data}
*  @callback : Status, Data
*  @Author : Aniket Gupta
*/

export function exportUsersData(exportData, callback) {

	try {
		var timeStamp = new Date().getTime()
		let invertedRole = _.invert()
	 
	 //For converting exportData to excel using export-to-excel package and creating unique filenames accoriding to timestamp
		var fileName = exportToExcel.exportXLSX({
	    filename: 'Users'+'_'+timeStamp,
	    sheetname: 'Sheet1',
	    title: [
	        {
	            "fieldName": "firstname",
	            "displayName": "FirstName",
	            "cellWidth": 30
	        },
	        {
	            "fieldName": "lastname",
	            "displayName": "LastName",
	            "cellWidth": 30
	        },
	        {
	            "fieldName": "email",
	            "displayName": "Email",
	            "cellWidth": 30,
	        },
	        {
	            "fieldName": "userStatus",
	            "displayName": "UserStatus",
	            "cellWidth": 30,
	        },
					{
	            "fieldName": "role",
	            "displayName": "Role",
	            "cellWidth": 30,
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
	      // console.log("res", result)
	      // callback({ 
	      // 	status: true, 
	      // 	data: fileName
	      // })
	      callback(null, fileName);
	      // }
	    }
	  });
 	} catch(e) {
  		console.log('error in exportUsersData',e);
 			callback("Internal server error.", null);
    }
}

/**
*  @Function name : importUsers
*  @Purpose : For importing users to database converted from excel to json
*  @Request Object : userdata : { importData : { all users data in array of objects }, userData: { uid: "user id", currentPage: 1, totalItems: 0, itemsPerPage: 5, searchKeyword: 'searchKeyword'} }
*  @Response Object : Success - User data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

//Todo: Async flow problem ( sometimes list is not being updated instantly)
export function importUsers(req, res) {
	// console.log("import user:", req.body.userdata);
	checkValidRequest(req.headers, function(user) {
		try {
			//Verifying if request is valid or not
			if (!req.body.userdata || (req.body.userData && !req.body.userData.importData) || (req.body.userData && req.body.userData.importData &&req.body.userData.importData.length <= 0)) {
		    res.json({
		    	status: false, 
		    	error : "Invalid request"
		    });
			} else {
				var userData = req.body.userdata.userData;

				//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
				let bussinessID = user.profile.companyid && user.profile.companyid._id ? user.profile.companyid._id : null;
				
				//Validating if user is valid or not
				if(!userData.uid || validator.isEmpty(userData.uid) || !mongoose.Types.ObjectId.isValid(userData.uid)) {
					res.json({ 
						status : false, 
						error : "InValid user." 
					});
				} else {

					//Query for checking if the user is present in database
					var query = Users.findOne({ 
						_id : mongoose.Types.ObjectId(userData.uid) 
					});
					query.exec(function (err, person) {
						if (err) {
							res.json({ 
								status: false, 
								error : "Unauthorized user." 
							});
						}

						//If user is present in database
						if(person) {

							//If user has a valid role
							if(person.role ==  Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.CRMadmin) {
								let importData = req.body.userdata.importData;
								var itemsProcessed = 0;
								var errorData = []
								// console.log("total data", importData)

								//Verifying if importData is empty or not
								if(_.isEmpty(importData)) {
									errorData.push("Can't export empty sheet")
								} else {
									//console.log("importData----", importData);
									//Map the importData using bluebird promise
									Promise.map(importData, function(userObject) {
										// console.log("map data", userObject)
							      if(userObject == null) {
							      	errorData.push("Row shouldn't be empty")
							    //   	itemsProcessed++;
											// if(itemsProcessed === importData.length) {
										 //      importSuccess();
										 //  }
							        // res.json({ status : false, error : "Row shouldn't be empty" });
							      } else {
											let obj = {}
											var corporateId = ''
											var role = '';
											var corporateType = '';
											if (userObject.BusinessCode == undefined && userObject.FirstName == undefined && userObject.Email == undefined && userObject.Role == undefined) {
												errorData.indexOf("FirstName, Email, Business Code and Role is required ") === -1 ? errorData.push("FirstName, Email, Business Code and Role is required ") :null
											} else if(userObject.FirstName == undefined && userObject.Email) {
												errorData.push("FirstName is required for " + userObject.Email)
											} else if(userObject.Email == undefined && userObject.FirstName) {
												errorData.push("Email is required for " + userObject.FirstName)
											} else if (userObject.BusinessCode == undefined && userObject.FirstName ) {
												errorData.push("Business Code is required for " + userObject.FirstName)
											} else if (userObject.Role == undefined && userObject.FirstName) {
												errorData.push("Role is required for " + userObject.FirstName)
											} else if (userObject.BusinessCode == undefined || userObject.FirstName == undefined || userObject.Email == undefined || userObject.Role == undefined) {
												errorData.indexOf("Please fill all the fields ") === -1 ?	errorData.push("Please fill all the fields "): null
											} else {

												//If BusinessCode is present or not
												if(userObject.BusinessCode) {

													//Query for finding the corporate data based on business id
													Corporate.findOne({ 
														businessId: addSlash(userObject.BusinessCode) 
													}, function(err, corp) {
														if(err) {
															errorData.push(err.message);
														} else if(corp) {
															corporateId = corp._id;
															corporateType = corp.businessType;
															// console.log("corporateId.toString()---", corporateId.toString());
															// console.log("bussinessID.toString()---", bussinessID.toString());
															//console.log("(corp---", corp);
															//Add toString() for convert these two to strings
															//For checking if logged in user is not importing user by typing others business code
															if(corporateId.toString() == bussinessID.toString()) {
																// console.log("corp", corporateId)
																if(userObject.Role) {

																	//Find role code against name(userObject.Role)
																	role = Roles[userObject.Role]
																	// console.log("role", role)
																	// if (businessType == "LMS") {
																		
																	// }
																	if(role == Roles.Admin || role == Roles.Lmsadmin || role == Roles.Presenteradmin) {
																		errorData.push("Can't Import Admin");
																	} else if ((corporateType == 'LMS' && (role == Roles.Instructor || role == Roles.Student)) || (corporateType == 'Conference'&&(role==Roles.Moderator||role==Roles.User)) || (corporateType == 'Presenter'&&(role==Roles.Presenter||role==Roles.Attendee))) {
																		obj["createdby"] = mongoose.Types.ObjectId(person._id);
																		obj["modifiedby"] = mongoose.Types.ObjectId(person._id);
																		obj["dateAdded"] = moment().utc().toDate();
																		obj["modifiedAt"] = moment().utc().toDate();
																		obj['firstname'] = userObject.FirstName;
																		obj['lastname'] = userObject.LastName;
																		obj['email'] = userObject.Email;
																		obj['profile.companyid'] = corporateId;
																		obj['role'] = role;
																		obj["password"] = md5('123456');

																		//Query for checking the exisitng data based on email
																		Users.findOne({ 
																			email: addSlash(obj.email) 
																		}, function(err, doc) {
																			if(err) {
																				errorData.push(err.message);
																			} else if(doc) {
																				errorData.push("Email" + " " + obj.email + " already existed. ");
																			} else {

																				//Create new user
																				const objUser = new Users(obj);
												                objUser.save(function (err, doc) {
																				if (err) {
																					console.log("err", err)
																					errorData.push(err.message);
																				} else {
																					// console.log("doc", doc)
																					}
																				});
																			}
																		});
																	} else {
																errorData.indexOf("Invalid role") === -1 ? errorData.push("Invalid role") : null
																	}
																}
															} else {
																errorData.indexOf("Incorrect Business Code ") === -1 ? errorData.push("Incorrect Business Code ") : null
															}																	
														} else {
															errorData.indexOf("Incorrect Business Code ") === -1 ? errorData.push("Incorrect Business Code ") : null
														}
													});
												}
											}
											// console.log("i", itemsProcessed)
											// itemsProcessed++;
											// if(itemsProcessed === importData.length) {
										 //      importSuccess();
										 //  }
							      }
							    }).then(function importSuccess() {
							    	// console.log("in success")
										var selector = {};
										var corpId = '';

										//Query for finding the corporate data based on searched keryword
										var query = Corporate.findOne({ 
											'businessId' : addSlash(userData.searchKeyword) 
										});
										query.exec(function (err, corp) {
										if (err) {
											console.log(err)
										} else {
											if(corp){
												corpId = corp._id
											}

											//Search selector based on user role
							        if(person.role == Roles.Superadmin) {
							          selector = {
							          	_id : { 
							          		$ne : mongoose.Types.ObjectId(userData.uid) 
													}, userStatus: "Active",guest:false
							          };
							        } else if(person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.CRMadmin || person.role == Roles.Presenteradmin) {
												selector = { 
													_id : { 
														$ne : mongoose.Types.ObjectId(userData.uid) 
													}, "profile.companyid": addSlash(bussinessID),
													userStatus: "Active", guest: false
												};
							        }

							        //If searchKeyword is not empty then create RegExp
							        if(userData.searchKeyword && userData.searchKeyword != '') {

						            var searchKey = RegExp(addSlash(userData.searchKeyword),'i'); 
						            var roleSearchKeyword = userData.searchKeyword.charAt(0).toUpperCase() + userData.searchKeyword.slice(1).toLowerCase();

						            //Find role code against name which is searched(roleSearchKeyword)
						            var roleKey = Roles[roleSearchKeyword]  
						            var role;

						            //Verifying if roleKey is undefined then assign empty string to role
						            if(roleKey == undefined) {
						            	role = ''
						            } else {
						            	role = roleKey
						            }        
						            selector['$or'] = [                
						              { 'firstname' : {$regex: searchKey} },
						              { 'lastname' : {$regex: searchKey} },
						              { 'email' : {$regex: searchKey} },
						              { 'role' : role},
						              { 'profile.companyid' : corpId }

						            ]; 
							        }					

							         //Query for fetching complete user data based on selector and skip items based on itemsPerPage on previous page
											var query = Users.find(selector)
												.limit(userData.itemsPerPage)
												.select('firstname lastname email role dateAdded profile')
												.populate('profile.companyid', 'businessId _id')
												.skip(userData.itemsPerPage * (userData.currentPage-1))
												.sort({
													dateAdded: -1
												});
												if(query) {
													query.exec(function(error, result) {
														if(error) {
														  console.log("error at count");
														  console.log(error);  
														} else {

															//Query for counting complete user data based on selector
															Users.count(selector).exec(function(err, count){
																//console.log("controller result", result);
																if (errorData && errorData.length > 0) {
																	errorData.unshift('Import process completed But Below errors are there');
																	res.json({ 
																		status: true, 
																		data: result, 
																		count: count, 
																		message: 'Import process completed', 
																		error: errorData 
																	});
																} else {
																	res.json({ 
																		status: true, 
																		data: result, 
																		count: count, 
																		message: 'Imported all data successfully' 
																	});
																}
															});
														}
													});
												}	else {
							          	res.json({ 
							          		status: false, 
							          		error : "Access denied." 
							          	});
							        	}
							        }
								    });
									})
								}
							} else{ 
				        res.json({ 
				        	status: false, 
				        	error : "Access denied." 
				        });
							}
						}
					});
				}
			}
		} catch(e) {
  		console.log('error in importUsers',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
	}); 
}


export function createGuest(req, res) {
	// console.log(req.body.guestObject);
	try {
		let guestObject =  req.body.guestObject;

		if(guestObject.slotId){
			// console.log("Scheduled guest invite");
			let today = Number(moment().utc().format('x'));
			Schedule.findOne({ "dates._id" : guestObject.slotId,
													dates : {$elemMatch : { startTime : { $lte : today}, endTime : {$gte : today} } } 
											})
							.exec(function(schErr, schRes) {
								// console.log("sch res---", schRes);
								if(!schErr && schRes && schRes.dates && schRes.dates.length > 0) {
									Room.findOne({ _id : schRes.roomId})
								      .populate('corporateId', 'businessType _id')
								      .populate('users', 'role')
											.exec(function (err, room) {
												if (err) {
													res.json({status: false, error : "Error fetching Room Data."});
												} else if( room && room.roomid){
								          // console.log(room);
								          if(room.corporateId){

										      	guestUserCreateAndAddToRoom(guestObject, room, function(finalErr, finalRes){
										      		if(finalErr)
											      		res.json(finalErr);
											      	else
											      		res.json(finalRes);
										      	});
								           
													} else {
														res.json({status: false, error : "Corporate Type is missing."});
													}
												}else{
													// resConfObj['error'] = "Missing Room or Key.";
													res.json({status: false, error : "Missing Room or Key."});
												}
											});
								} else  if(schErr) {
									res.json({status: false, error : "Error while fetching schedule."});
								} else {
									res.json({status: false, error : "No schedule exist. Please join at the time of schedule."});
								}
							});
		} else if(guestObject.roomKey) {
			// console.log("Room guest invite");
		  Room.findOne({ roomKey : addSlash(guestObject.roomKey) })
		      .populate('corporateId', 'businessType _id')
		      .populate('users', 'role')
					.exec(function (err, room) {
						if (err) {
							res.json({status: false, error : "Error fetching Room Data."});
						} else if( room && room.roomid){
		          // console.log(room);
		          if(room.corporateId){

								guestUserCreateAndAddToRoom(guestObject, room, function(finalErr, finalRes){
				      		if(finalErr)
					      		res.json(finalErr);
					      	else
					      		res.json(finalRes);
				      	});

							} else {
								res.json({status: false, error : "Corporate Type is missing."});
							}
						}else{
							// resConfObj['error'] = "Missing Room or Key.";
							res.json({status: false, error : "Missing Room or Key."});
						}
					});
		} else {
			// console.log("Invalid guest invite");
	    res.json({
	    	status : false, 
	    	error : "Some error occured, Please try again"
	    });
		}

	} catch(e) {
		console.log("error in createGuest", e);
    res.json({
    	status : false, 
    	error : "Internal server error."
    });
  }
}

function guestUserCreateAndAddToRoom (guestObject, room, callback) {

	try {
	 	let now = moment().utc().toDate();

	  //Check whether the user is present or not.
		Users.findOne({ email : addSlash(guestObject.guestEmail) }, function(userError, userDoc){
			// console.log(userError, userDoc);
			if (userError) {
				callback({ status: false, error : userError.message }, null);
				// res.json({ status: false, error : userError.message });
			} else if (userDoc) {
				if (userDoc.guest && userDoc.guest == true) {
					if (room.corporateId.businessType == 'Conference') {
						Users.findOneAndUpdate({ _id : userDoc._id}, {$set : {firstname : guestObject.guestName, userStatus:'Active'}}, {returnNewDocument : true}).exec( function(newusererr, newdata) {
							if (newdata) {
								Room.update( {
	              	users : {
	                	$in : [newdata._id] 
	              	}
	            	}, { 
	              	$pull: { 
	                	users: newdata._id 
	              	} 
	            	}, function (error, result) {
	            			
	          			//For adding user to room
		              Room.update( {
	                	_id: mongoose.Types.ObjectId(room._id), 
	                	users : {
	                  	$nin : [newdata._id] 
	                	}
	              	}, { 
	                	$push: { 
	                  	users: newdata._id 
	                	} 
	              	}, function (error, result) {
	                	if (error) { //TODO - user present in any other room

	                  	// console.log("update error == ",error);
	                  	callback({ status: false, error : error.message, message : "Internal server error, Please try again." }, null);
	                  	// res.json({ 
	                   //  	status : false, 
	                   //  	error: error.message, 
	                   //  	message : "Internal server error, Please try again." 
	                  	// });
	                	} else {
	                		callback(null, { status: true, roomKey : room.roomKey, /*data: newdata,*/ message : "User added successfully."	});
	                  	// res.json({ 
	                   //  	status: true, 
	                   //  	data: newdata, 
	                   //  	message : "User added successfully."
	                  	// });
	                	}
		            	});
	            	});
							} else {
								callback({ status : false, error : "Internal server error, Please try again later."}, null);
								// res.json({ status : false, error : "Internal server error, Please try again later."});
							}
						});
					} else {
						let today = Number(moment().utc().format('x'));
						Schedule.findOne({roomId : room._id, dates : {$elemMatch : { startTime : { $lte : today}, endTime : {$gte : today} }}}, {"dates.$.startTime" : 1, meetingName : 1, password : 1, createdBy : 1})
	          .populate('createdBy', 'role')
						.exec(function(schErr, schRes) {
	      			if(!schErr && schRes && schRes.dates && schRes.dates.length > 0) {
	      				Users.findOneAndUpdate({ _id : userDoc._id}, {$set : {firstname : guestObject.guestName, userStatus:'Active'}}, {returnNewDocument : true}).exec( function(newusererr, newdata) {
									if (newdata) {
										let checkobj = {
											role : schRes.createdBy.role,
											createdBy : mongoose.Types.ObjectId(schRes.createdBy._id),
											users : room.users,
										};
										getRoomInstructor( checkobj, function(instructorerr, instId){
											if (instId != null) {
												Student.update({ 
													students : { $in : [newdata._id] }
												}, {
													$pull: { students: newdata._id } 
												}).exec(function(removeerr, removeres){
													Student.findOne({
						                "roomId": mongoose.Types.ObjectId(room._id), 
						                "instId": instId
						              }).exec(function (error, student) {
														if (error) {
															callback({ status : false, error : "Error while fatching room students."}, null);
							                // res.json({ 
							                //   status: false,
							                //   error : "Error while fatching room students." 
							                // });
							              } else if (student) { 

							                //Verifying whether the student added to instructor or not
							                Student.update({ 
							                	"roomId": mongoose.Types.ObjectId(room._id), 
							                  "instId": instId, 
							                  students : {
							                    $nin : [mongoose.Types.ObjectId(newdata._id)] 
							                  }
							                }, 
							                { 
							                  $push: { 
							                    students: mongoose.Types.ObjectId(newdata._id) 
							                  }, 
							                  modifiedBy: instId, 
							                  modifiedOn: moment().utc().toDate() 
							                }).exec(function (err1, doc1) {
							                  if (err1) {
							                  	callback({ status : false, error : err1, message : "Student already added to current Instructor."}, null);
							                    // res.json({ 
							                    //   status : false, 
							                    //   error: err1, 
							                    //   message : "Student already added to current Instructor." 
							                    // });
							                  } else {
							                  	callback(null, { 
					                          status: true,
				                          	roomKey : room.roomKey,
					                          /*data: newdata,*/ 
					                          message : "Student added successfully."
					                        });
					                        // res.json({ 
					                        //   status: true, 
					                        //   data: newdata, 
					                        //   message : "Student added successfully."
					                        // });
							                  }
							                });
							              } else { 

							                //Create
							                let objSave = {};
							                objSave['roomId'] = mongoose.Types.ObjectId(room._id);
							                objSave['instId'] = instId;
							                objSave['students'] = [mongoose.Types.ObjectId(newdata._id)];
							                objSave['createdBy'] = instId;
							                objSave['modifiedBy'] =  instId;
							                var studentObj = new Student(objSave);
							                studentObj.save((err1, doc1) => {
						                    if (err1) {
						                    	callback({ status : false, error : err1, message : "Error while adding User."}, null);
						                      // res.json({ 
						                      //   status : false,
						                      //   error : err1 
						                      // });
						                    } else {
						                    	callback(null, { 
			                            	status: true,
				                          	roomKey : room.roomKey,
				                            /*data: newdata, */
				                            message : "User added successfully."
				                          });
				                          // res.json({ 
			                           //  	status: true, 
				                          //   data: newdata, 
				                          //   message : "User added successfully."
				                          // });
							                  }
							                });
								            }
								          });
												});
											} else {
												callback({ status : false, error : instructorerr, message : "Error while getting Instructor."}, null);
													// res.json({ 
										   //      status: false,
										   //      error : instructorerr
										   //    });
											}
										});
									} else {
										callback({ status : false, error : "Internal server error, Please try again later."}, null);
										// res.json({ status : false, error : "Internal server error, Please try again later."});
									}
								});
	      			} else if(schErr) {
	      				callback({status: false, error : "Error while fetching schedule."}, null);
								// res.json({status: false, error : "Error while fetching schedule."});
							} else {
								callback({status: false, error : "No schedule exist. Please join at the time of schedule."}, null);
								// res.json({status: false, error : "No schedule exist. Please join at the time of schedule."});
							}
						});
					}
				} else {
					callback({ status : false, error : "User already exist, please login directly from home page."}, null);
					// res.json({ status : false, error : "User already exist, please login directly from home page."});
				}
			} else {
				let obj = {
					dateAdded : now,
					modifiedAt : now,
					firstname : guestObject.guestName,
					email : guestObject.guestEmail,
					profile : {
						companyid : room.corporateId._id
					},
					password : md5('Guest@123DefaultPwd'),
					guest : true,
					createdby : room.createdBy,
					modifiedby : room.createdBy
				};
				if (room.corporateId.businessType == 'Conference') {
					obj['role'] = Roles.User;
					saveGuestUser(obj, function(responseerr, response) {
						if (response != null) {

							//For adding user to room
	            Room.update( {
	            	_id: mongoose.Types.ObjectId(room._id), 
	            	users : {
	              	$nin : [response._id] 
	            	}
	          	}, { 
	            	$push: { 
	              	users: response._id 
	            	} 
	          	}, function (error, result) {
	            	if (error) { //TODO - user present in any other room

	              	console.log("update error == ",error);
	              	callback({ 
	                	status : false, 
	                	error: error.message, 
	                	message : "User already present in current room." 
	              	}, null);
	              	// res.json({ 
	               //  	status : false, 
	               //  	error: error.message, 
	               //  	message : "User already present in current room." 
	              	// });
	            	} else {
	            		callback(null, { 
	                	status: true,
				            roomKey : room.roomKey,
	                	/*data: response, */
	                	message : "User added successfully."
	              	});
	              	// res.json({ 
	               //  	status: true, 
	               //  	data: response, 
	               //  	message : "User added successfully."
	              	// });
	            	}
	          	});
						} else if (responseerr) {
							console.log("responseerr === ", responseerr);
							callback({status : false, error : responseerr}, null);
							// res.json({status : false, error : responseerr});
						}
					});
				} else {
					let today = Number(moment().utc().format('x'));
					Schedule.findOne({roomId : room._id, dates : {$elemMatch : { startTime : { $lte : today}, endTime : {$gte : today} }}}, {"dates.$.startTime" : 1, meetingName : 1, password : 1, createdBy : 1})
	        .populate('createdBy', 'role')
					.exec(function(schErr, schRes) {
	    			if(!schErr && schRes && schRes.dates && schRes.dates.length > 0) {
							obj['role'] = Roles.Student;
							saveGuestUser(obj, function(responseerr, response) {
								if (response != null) {
									let checkobj = {
										role : schRes.createdBy.role,
										createdBy : mongoose.Types.ObjectId(schRes.createdBy._id),
										users : room.users,
									};
									getRoomInstructor( checkobj, function(instructorerr, instId){
										if (instId != null) {
											Student.findOne({
				                "roomId": mongoose.Types.ObjectId(room._id), 
				                "instId": instId
				              }).exec(function (error, student) {
												if (error) {
													callback({ 
					                  status: false,
					                  error : "Error while fatching room students." 
					                }, null);
					                // res.json({ 
					                //   status: false,
					                //   error : "Error while fatching room students." 
					                // });
					              } else if (student) { 

					                //Verifying whether the student added to instructor or not
					                Student.update({ 
					                	"roomId": mongoose.Types.ObjectId(room._id), 
					                  "instId": instId, 
					                  students : {
					                    $nin : [mongoose.Types.ObjectId(response._id)] 
					                  }
					                }, 
					                { 
					                  $push: { 
					                    students: mongoose.Types.ObjectId(response._id) 
					                  }, 
					                  modifiedBy: instId, 
					                  modifiedOn: moment().utc().toDate() 
					                }).exec(function (err1, doc1) {
					                  if (err1) {
					                  	callback({ 
					                      status : false, 
					                      error: err1.message, 
					                      message : "Student already added to current Instructor." 
					                    }, null);
					                    // res.json({ 
					                    //   status : false, 
					                    //   error: err1.message, 
					                    //   message : "Student already added to current Instructor." 
					                    // });
					                  } else {
					                  	callback(null, { 
			                          status: true,
				                        roomKey : room.roomKey,
			                          /*data: response,*/ 
			                          message : "Student added successfully."
			                        });
			                        // res.json({ 
			                        //   status: true, 
			                        //   data: response, 
			                        //   message : "Student added successfully."
			                        // });
					                  }
					                });
					              } else { 

					                //Create
					                let objSave = {};
					                objSave['roomId'] = mongoose.Types.ObjectId(room._id);
					                objSave['instId'] = instId;
					                objSave['students'] = [mongoose.Types.ObjectId(response._id)];
					                objSave['createdBy'] = instId;
					                objSave['modifiedBy'] =  instId;
					                var studentObj = new Student(objSave);
					                studentObj.save((err1, doc1) => {
				                    if (err1) {
				                    	callback({ 
				                        status : false,
				                        error : err1.message 
				                      }, null);
				                      // res.json({ 
				                      //   status : false,
				                      //   error : err1.message 
				                      // });
				                    } else {
				                    	callback(null, { 
	                            	status: true,
				                        roomKey : room.roomKey,
		                            /*data: response,*/
		                            message : "User added successfully."
		                          });
		                          // res.json({ 
	                           //  	status: true, 
		                          //   data: response, 
		                          //   message : "User added successfully."
		                          // });
					                  }
					                });
						            }
						          });
										} else {
											callback({ 
		                    status: false,
		                    error : instructorerr
		                  }, null);
											// res.json({ 
		         //            status: false,
		         //            error : instructorerr
		         //          });
										}
									});
								} else if (responseerr) {
									console.log("responseerr === ", responseerr);
									callback({status : false, error : responseerr}, null);
									// res.json({status : false, error : responseerr});
								}
							});
						} else if(schErr) {
							callback({status: false, error : "Error while fetching schedule."}, null);
							// res.json({status: false, error : "Error while fetching schedule."});
						} else {
							callback({status: false, error : "No schedule exist. Please join at the time of schedule."}, null);
							// res.json({status: false, error : "No schedule exist. Please join at the time of schedule."});
						}
					});
				}
			}
		});
	} catch(e) {
  		console.log('error in guestUserCreateAndAddToRoom',e);
  		callback('Internal server error.', null);
   }
}

function saveGuestUser(obj, callback) {
	try {
		const objUser = new Users(obj);
	  objUser.save(function (err, doc) {
			if (err) {
				console.log("err", err);
				callback(err.message, null);
			} else {
				callback(null, doc);
			}
		});
 	} catch(e) {
  		console.log('error in saveGuestUser',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
}

function getRoomInstructor(obj, callback) {
	try {
		if (obj.role == Roles.Instructor) {
	    callback(null, obj.createdBy);
		} else {
	    let index = _.findIndex(obj.users, function(o) { return (o.role == Roles.Instructor || o.role == Roles.Presenter); });
	    if (index > -1) {
	    	let instId = obj.users[index]._id;
	    	callback(null, instId);
	    } else {
	    	callback("No instructor exist in this room", null);
	    }
		}
	} catch(e) {
		console.log("error in getRoomInstructor", e);
		callback("Internal server error.", null);
	}
}

//Delete Guest(student) record on End of call.
export function deleteGuest(req, res) {
	// console.log(req.params);
	try {
		// Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
      try{
        if (person != null && person.guest == true) {
        	if(req.params.roomkey && req.params.roomkey!= 'loginPage') {
        		Room.findOne({ roomKey : addSlash(req.params.roomkey) }).select('_id').exec( function(roomerr, room) {
        			if (room) {
        				if (person.role == Roles.Student) {
        					Student.update({ 
	                	"roomId": mongoose.Types.ObjectId(room._id), 
	                  students : {
	                    $in : [person._id] 
	                  }
	                }, 
	                { 
	                  $pull: { 
	                    students: person._id
	                  } 
	                }).exec(function (studerr, studres) {
	                	// console.log(studerr, studres);
	                	Users.update({ _id : person._id }, {$set : {userStatus:'Deleted'}}).exec(function(err, response){
				        			if (err) {
				        				res.json({ status : false, error : err.message });
				        			} else {
				        				res.json({ status : true, error : "Deleted successfully" });
				        			}
				        		});
	                });
		        		} else if (person.role == Roles.User) {
		        			Room.update( {
		                	_id: room._id, 
		                	users : {
		                  	$in : [person._id] 
		                	}
		              	}, { 
		                	$pull: { 
		                  	users: person._id 
		                	} 
		              	}, function (error, result) {
		              		// console.log(error, result);
		                	Users.update({ _id : person._id }, {$set : {userStatus:'Deleted'}}).exec(function(err, response){
					        			if (err) {
					        				res.json({ status : false, error : err.message });
					        			} else {
					        				res.json({ status : true, error : "Deleted successfully" });
					        			}
					        		});
		              	}
		              );
		        		}
        			} else {
        				res.json({ status : false, error : "Invalid room." });
        			}
        		});
        	} else {
          	Users.update({ _id : person._id }, {$set : {userStatus:'Deleted'}}).exec(function(err, response){
        			if (err) {
        				res.json({ status : false, error : err.message });
        			} else {
        				res.json({ status : true, error : "Deleted successfully" });
        			}
        		});
        	}
        } else
        	res.json({ status : false, error : "Invalid request." });
      } catch(e) {
        console.log("e in deleteGuest inner === ", e);
        res.json({ status : false, error : "Internal server error." });
      }
    });
	} catch(e) {
		console.log("error in deleteGuest", e);
		res.json({
    	status : false, 
    	error : "Internal server error."
    });
	}
}

// export const RoleName = {
// 	"1" : 'Superadmin',
// 	"2" : 'Admin',
// 	"3" : 'Moderator',
// 	"4" : 'Presenter',
// 	"5" : 'User',
// 	"6" : 'Guest',
// 	"12" : 'Lmsadmin',
// 	"13" : 'Instructor',
// 	"14" : 'Student',
// 	"15" : 'Parent',
// 	"22" : 'CRMadmin',
// 	"23" : 'CRMuser'
// }

/*
@Function Name : myGroups
@Purpose : "To search groups as per input from client side from participantgroup collection"
@Request Object : studentdata:{input,roomId,uid,instId}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function myGroups (req, res) {
	
	// Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
  	try {
      if (person != null && req.query.roomId && mongoose.Types.ObjectId.isValid(req.query.roomId) && req.query.instId && mongoose.Types.ObjectId.isValid(req.query.instId) && req.query.input) {
	      let queryData = req.query;
	      let slash_input = addSlash(queryData.input);

	      //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
	      let bussinessID = null;
				if(person.profile.companyid && person.profile.companyid._id) {
					bussinessID = person.profile.companyid._id;
				}
	      let selectorForParticipantsGroup = {
	      	groupName : { $regex:slash_input, $options: "i"},
	      	companyid : addSlash(bussinessID)
	      }

	      //Searching group based on input passed from client side from participantgroups collection
	      ParticipantsGroup.find(selectorForParticipantsGroup)
				.select('_id groupName')
				.exec(function (error, groupData) {
					if (error) {
						res.json({ 
							status : false, 
							error : "Error while fetching result." 
						});
					} else {									
						res.json({
							status: true,
							data: groupData
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
    	console.log('error in myGroups',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
  });		
}

export function activateUser(req, res) {
	
	// Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
  	try {
  		//console.log("Inside if try");
      if (person != null && req.body.userdata) {
	      let userId = req.body.userdata;	      
	      //console.log("Inside if condition");
	      //Verifying if user is admin or not
        	if(person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin) {
	        	
	        	//	console.log("Inside role condition");
	        	let query = Users.findOne({_id : mongoose.Types.ObjectId(userId)}).select('role profile userStatus');
	        	query.exec(function(error, user) {
	        		if (user) {
	        			checkUsersCount(person._id, person.role, user.role, user.profile.companyid, user.userStatus, function(status, count) {
	        				if (status == true) {
	        					/* changes made by prateek for bug#2844
	        					Date : 16/09/2017 */
	        					if(user.role == Roles.Admin || user.role == Roles.Presenteradmin || user.role == Roles.Lmsadmin) {
	        						let cid = user["profile"]["companyid"];
	        						let recordId = user._id;
	        						
											checkhaveAdmin(cid, user.role, recordId, function(checkerr, checkres) {
												if (checkerr != null) {
													res.json({ status: false, error : checkerr });
												} else if(checkres != false) {
													let msg = "Multiple admin not allowed, "+checkres+" is already assigned to this corporate";
													res.json({ status: false, error : msg });
												} else if(checkres == false) {
													var userQuery = Users.update({_id : mongoose.Types.ObjectId(userId)}, {$set : {userStatus:'Active'}});
							        		userQuery.exec(function(err, data) {
							        			if(err) {
							        				//console.log("query err", err);
							        				res.json({
										          status : false, 
										          error : err
										        	});				
							        			} else if(data) {
							        				//console.log("Success", data);
			                    		dataLog.update({ uid : mongoose.Types.ObjectId(userId), category : 'User', action: 'Log_In_Failed', 'value.logged' : false },{$set : {'value.logged' : true}}, {multi : true}, function(logerr, logres){});
							        				res.json({
											          status : true, 
											          message : "Successfully Activated"
											        });
							        			}
							        		});	
												}
											})			        						
	        					} else {
	        						var userQuery = Users.update({_id : mongoose.Types.ObjectId(userId)}, {$set : {userStatus:'Active'}});
					        		userQuery.exec(function(err, data) {
					        			if(err) {
					        				//console.log("query err", err);
					        				res.json({
								          status : false, 
								          error : err
								        	});				
					        			} else if(data) {
					        				//console.log("Success", data);
	                    		dataLog.update({ uid : mongoose.Types.ObjectId(userId), category : 'User', action: 'Log_In_Failed', 'value.logged' : false },{$set : {'value.logged' : true}}, {multi : true}, function(logerr, logres){});
					        				res.json({
									          status : true, 
									          message : "Successfully Activated"
									        });
					        			}
					        		});
				        		}					        	
	        				} else {
	        					let statusMsg ='';

	        					//code changed by - Najib, Showing relevent error message while  activating users when limit has been exceeded
	        					if(_.includes(status, "You can't create new user")){
	        						statusMsg = "You can't activate new user, limit has been exceeded";
	        					} else {
	        						statusMsg = status;
	        					}
										// console.log("status ==== ", statusMsg);

										res.json({ status : false, error : statusMsg})
									}
	        			}); 
	        		} else {
	        			res.json({
				          status : false, 
				          error : "Invalid user."
			        	});
	        		}
	        	});
        	} else {
	        	res.json({
	          status : false, 
	          error : "Unauthorized User."
	        	});
        	}

	      } else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }
	  } catch(e) {
	  	console.log('error in activateUser',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
	});      
}
