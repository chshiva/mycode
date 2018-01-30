import Users from '../models/users';
import Corporate from '../models/corporate';
import Room from '../models/room';
import Package from '../models/package';
import Logger from '../models/logger';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import md5 from 'md5';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';
import * as LoginController from './login.controller';
import * as EmailForUserCreation from '../emailFunctions'
import { LogUserModule } from './datalog.controller';
import { addSlash } from './slashesActions';
import { createRandomString } from '../randomstring';
import serverConfig from '../config';

var _ = require('lodash');
var fs = require('fs');
var mongoose = require('mongoose');
var moment = require('moment');
var validator = require('validator');


// export function saveLog(req, res){
// 	// console.log(req.headers);
// 	// console.log(req.body.data);
// 	var objLog = req.body.data;
// 	objLog.uid = mongoose.Types.ObjectId(objLog.uid);
// 	//Creates new log
//   	var objEntity = new dataLog(objLog);
// 	objEntity.save(function (err, doc) {
// 	  if (err) {
// 	    console.log(err)
// 	    // callback(false);
// 	  } else {
// 	    // callback(true);
// 	  }
// 	});
// }

/**
* @Function Name: "saveUser",
* @Purpose: "To save and user data into user document.",
* @Request Object: userdata : { uid : "userID" },
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function saveUser(req, res) {
	checkValidRequest(req.headers, function(person) {
		try {
			//console.log("person data", person);
			//Verifying if request is valid or not
			if (person == null || !req.body.userdata) {
				res.json({ status: false, error : "Invalid request" });
			} else {

				//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
				let bussinessID = null;
				if(person.profile.companyid && person.profile.companyid._id) {
					bussinessID = person.profile.companyid._id;
				}
				let userObject = req.body.userdata;
				// let mail = userObject.email;
				userObject["email"] = userObject.email ? userObject.email.toLowerCase() : userObject.email;
				if (userObject.from && userObject.from == "PORTAL") {

					//user creating from portal
					if(userObject.password != '') {
						let slashsPassword = addSlash(userObject.password);
						userObject["password"] = md5(slashsPassword);
					} else {
						delete userObject["password"];
					}
					userObject["dateAdded"] = moment().utc().toDate();
					userObject["createdby"] = "self";
					userObject["modifiedby"] = "self";
					userObject["role"] = 2;
					delete userObject['from'];

					//Create new user.
					newUser(userObject, function(newErr, newUser) {
						if (newErr != null) {
							res.json({ status: false, error: newErr });
						} else {

							//Check whether the user is present or not.
							Users.findOne({ _id : newUser._id }, function(saveError, doc){
								if (saveError) {
									//console.log(error);
									res.json({ status: false, error : saveError });
								} else {
									doc.modifiedby 	= mongoose.Types.ObjectId(doc._id);
									doc.createdby 	= mongoose.Types.ObjectId(doc._id);
									doc.save();
									res.json({ status: true, data: doc, message : "Created successfully." });
								}
							});
						}
					});
				} else {

					//Verifying if user has a valid role
					if ((person.role ==  Roles.Superadmin || (bussinessID == userObject["profile.companyid"] && (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.CRMadmin))) && person.role < userObject.role){
						createUserCallback(userObject, person.role, function(usererr, userData){
							if (userData) {
								res.json({ status: true, data: userData.data, message: userData.message });
							} else if (usererr) {
								res.json({ status: false, error : usererr });
							} else {
								res.json({ status: false, error : "Internal server error, Please try again" });
							}
						});	
					} else {
						res.json({ status: false, error : "Access denied." });
					}
				}
			}
		} catch(e) {
			console.log("Error in save user", e);
			res.json({ status : false, error : "Internal server error." });
		}
	});
}

export function createUserCallback(userObject, role, cb){
	
	try {
		if(userObject.password != '') {
			let slashsPassword = addSlash(userObject.password);
			userObject["password"] = md5(slashsPassword);
		} else {
			delete userObject["password"];
		}
		userObject["dateAdded"] = moment().utc().toDate();
		userObject["createdby"] = userObject.uid;
		userObject["modifiedby"] = userObject.uid;
		delete userObject["uid"];
		let cid = userObject["profile.companyid"];
		checkUsersCount(userObject.createdby, role, userObject.role, cid, null, function(status, count) {
			if (status == true) {
				checkhaveAdmin(cid, userObject.role, null, function(checkerr, checkres) {
					if (checkerr != null) {
						// console.log("checkerr === ", checkerr);
						cb(checkerr, null);
						// res.json({ status: false, error : checkerr });
					} else if(checkres != false) {
						let msg = "Multiple admin not allowed, "+checkres+" is already assigned to this corporate";
						cb(msg, null);
						// res.json({ status: false, error : msg });
					} else if(checkres == false) {

						checkforUniqueStudentId(cid, userObject.role, userObject.studentId, null, function(err, uniqueStatus){
							if(err) {
								// console.log("err === ", err);
								let errmsg = err.message ? err.message : err;
								cb(errmsg, null);
								/*res.json({
									status : false,
									error : errmsg
								});*/
							} else if(uniqueStatus == true) {						
						
								//Creating user based role permission
								newUser(userObject, function(newErr, newUser) {
									if (newErr != null) {
										// console.log("newErr === ", newErr);
										cb(newErr, null);
										// res.json({ status: false, error: newErr });
									} else {
										let resData = {
											data: newUser,
											message: "Created successfully."
										};
										cb(null, resData);
										// res.json({ status: true, data: newUser, message : "Created successfully." });
										
										//Verifying the user details based created roles
										Users.findOne({_id:  mongoose.Types.ObjectId(userObject.createdby)},function(err,name) {
											if (name && name.email) {
												let fname = name.firstname ? name.firstname : '';
												let lname = name.lastname ? name.lastname : '';

												let randomstring = '';

												//Function call for creating randomstring
												createRandomString(function(data) {
												randomstring = data
												});

												let  resetPasswordExpires = Date.now() + 86400000;  //24 hour 

												var exchangeData = {
													to : newUser.email,
													whoCreated :name.email,
													subject : 'User Created',
													body : '<span style="margin-top: 30px; font-size: 14px;">'+'Hello '+newUser.firstname+'</span>,'+'<br><br>'+'Username : '+newUser.email+'<br><br>'+' Please sign in using registered password. To sign in,'+'<a href="http://'+serverConfig.domin+'/" > click here </a> '+'<br><br> To reset the password,' + '<a href="http://'+serverConfig.domin+'/resetPassword/'+md5(randomstring)+'"> click here.</a>'
												}

												//Email will be sent to user after creating user successfully
												EmailForUserCreation.createuserAndResetpassword(exchangeData, function(emailerror, emailsuccess){
														if (emailerror.status == false) {
															cb("Reset can not done at the moment. Try after some time", null);
															// res.json({ status: false, error : 'Reset can not done at the moment. Try after some time' });
														} else {
															Users.update({email: newUser.email},
																					{$set : {passwordToken : md5(randomstring), resetPasswordExpires : resetPasswordExpires}} ,                    
														function(err, numberAffected){
															if (err) {
																// res.json({ status: false, error : err });
																console.log('error in Reset password link ');
															} else {
																console.log('Reset password link has been sent to user email ')
																
																// res.json({ status: true, message : "Reset password link has been sent to user email" });
																//console.log('inserted token for password')
															}  
															});
														}
												});

												// //Log obj which need to be inserted in logger collection
												// let logObj = {
												// 	logType : 'User',
												// 	actionType : 'Created',
												// 	actionTime : moment().utc().toDate(),
												// 	uid : userObject.createdby,
												// 	details : {
												// 		name : userObject.firstname,
												// 		companyId : cid,
												// 		remoteAddress : req.connection.remoteAddress,
												// 		userAgent : req.headers['user-agent']
												// 	}
												// } 

												// //Function for creating log on successful creation of user
												// createLog(logObj, function(status) {
												// if (status) {
												// // console.log(status);
												// 	}
												// });
											} else {
												cb("user not found while sending mail", null);
												// res.json({ status: false, error: " user not found while sending mail"});
											}
										});
									}
								});
							}
						})
					}
				});
			} else {
				// console.log("status ==== ", status);
				// res.json({ status : false, error : status});
				cb(status, null);
			}
		});
	} catch(e) {
		console.log('error in createUserCallback',e);
		cb("Internal server error, Please try again", null);
	}
}

/**
*  @Function name : updateUser
*  @Purpose : For updating user
*  @Request Object : userdata :  { uid : "user id" } 
*  @Response Object : Success - Success message, user data, Failure - Error message
*  @Author : "Jyothi"
*/

export function updateUser(req, res) {
	
	checkValidRequest(req.headers, function(person) {
		try{

			//Verifying if request is valid or not
			if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id) || !req.body || !req.body.userdata) {
				res.json({ status: false, error : "Invalid request" });
			} else {
				let userObject = req.body.userdata;
				let bussinessID = person.profile && person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '';

				//Verifying whether the user has permission or not
				if ((person.role ==  Roles.Superadmin || (bussinessID == userObject["profile.companyid"] && (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.CRMadmin))) && person.role < userObject.role){
					let recordId = mongoose.Types.ObjectId(req.params.id);

					//Fetching the details of user.
					Users.findOne({ _id : recordId }).exec(function(err, data){
						if(err) {
							res.json ({
								status : false,
								error : err.message
							})
						} else if (data) {
							Users.findOne({ _id : { $ne : mongoose.Types.ObjectId(req.params.id) }, email: userObject.email }, function(err, doc) {
								if (err) {
									res.json({ status: false, error: err.message });
								} else if(doc) {
									res.json({ status: false, error: "Email already existed." });
								} else {
									
									userObject["modifiedby"] = person._id;
									userObject["modifiedAt"] = moment().utc().toDate();
									delete userObject["uid"];
									delete userObject["_id"];
									
									let cid = userObject["profile.companyid"];
									checkhaveAdmin(cid, userObject.role, recordId, function(checkerr, checkres) {
										if (checkerr != null) {
											res.json({ status: false, error : checkerr });
										} else if(checkres != false) {
											let msg = "Multiple admin not allowed, "+checkres+" is already assigned to this corporate";
											res.json({ status: false, error : msg });
										} else if(checkres == false) {

											checkforUniqueStudentId(cid, userObject.role, userObject.studentId, req.params.id, function(err, uniqueStatus){
												if(err) {
													let message = err.message ? err.message : err;
													res.json({
														status : false,
														error : message
													})
												} else if(uniqueStatus == true) {	
													
													//If data is present then Update user details
													Users.update({ _id : recordId },{ $set : userObject },{ runValidators: true },function (e, result) {
														if (e) {
															res.json({ status : false, error : e.message });
														} else {
															let query = Users.findOne({ _id : recordId });
															query.exec(function (error, data) {
																if (error) { 
																	res.json({ status: false, error : error.message }); 
																} else {
																	//console.log('data', data);
																	LogUserModule(userObject.modifiedby, recordId, 'update');
																	res.json({ status : true, data : data, message : "Updated successfully." });
																}
															});
														}
													});
												}
											})
										}
									});
								}	
							});
						} else res.json({ status: false, error : "Invalid user." });
					});
				} else res.json({ status: false, error : "Access denied." });
			}
		} catch(e){
			console.log('error in update user...',e);
			res.json({ status : false, error : "Internal server error" });
		}
	});
}

/**
*  @Function name : packageSelector
*  @Purpose : For fetch packages selector based on role
*  @Request Object : uid : userId, role : role, cid : corporateId, cb : callback 
*  @Response Object : Success - selector Failure - null
*  @Author : "Prudhvi"
*/
export function packageSelector(uid, role, cid, cb){
	try {
		if (role == Roles.Superadmin) {
			let query = Users.findOne({ "profile.companyid" : cid, $or : [{role : Roles.Admin}, {role : Roles.Lmsadmin}, {role : Roles.CRMadmin}, {role : Roles.Presenteradmin}]}).select('_id');
			query.exec( function(error, user){
				if(user) cb({ assignedTo : user._id });
				else cb(null);
			})
		} else if (role == Roles.Admin || role == Roles.Lmsadmin || role == Roles.CRMadmin || role == Roles.Presenteradmin) {
			cb({ assignedTo : uid });
		} else {
			cb(null);
		}
	} catch(e) {
		console.log("error in packageSelector", e.message);
		cb(null);
	}
}

/**
*  @Function name : checkUsersCount
*  @Purpose : To check users count while create or update the user
*  @Request Object : uid : userId, role : curent User role, newRole : new user role, cid : corporateId, cb : callback 
*  @Response Object : Success - true, count Failure - Error message, count : 0
*  @Author : "Prudhvi"
*/
export function checkUsersCount(uid, role, newRole, cid, status, cb){
	try {
		if (newRole == Roles.Admin || newRole == Roles.Lmsadmin || newRole == Roles.CRMadmin || newRole == Roles.Presenteradmin){
			cb(true, -1);
		} else {
			packageSelector(uid, role, cid, function(selector){
				if (selector != null) {
					let query = Package.find(selector);
					query.exec(function(err, result){
						if(result && result.length > 0){
							let c = 0;
							for(let i = 0; i < result.length; i++){
								if(result[i].userCount == -1 || c == -1){
									c = -1;
									break;
								}else{
									c += result[i].userCount;
								}
							}
							if(c == -1)
								cb(true, -1);
							else {
								let checkStatus = ['Active'];
								if (status != null && (status == "Deleted" || status == "Registered")) {
									checkStatus.push('Blocked');
								}
								Users.count({ "profile.companyid" : cid, guest : false, userStatus : {$in : checkStatus}}, function(error, count){
									if(error)
										cb("Internal server error, Please try again", 0);
									else if(count < c || count == 0)
										cb(true, c-count);
									else if(count >= c)
										cb("You can't create new user, limit has been exceeded", c-count);
								});
							}
						} else if (result && result.length == 0) {
							cb("You are not subscribed to any package, Please contact administrator", 0);
						}	else {
							cb("Internal server error, Please try again", 0);
						}
					});
				} else cb("Please create admin account first", 0);
			});
		}
	} catch(e) {
		console.log("e in checkUsersCount === ", e.message);
		cb("Internal server error, Please try again");
	}
}

/**
*  @Function name : checkhaveAdmin
*  @Purpose : To check admin is there for that corporate while create or update the user
*  @Request Object : uid : userId, role : curent User role, newRole : new user role, cid : corporateId, cb : callback 
*  @Response Object : Success - null, with admin first name Failure - Error message, false
*  @Author : "Prudhvi"
*/
export function checkhaveAdmin(cid, role, uid, cb){
	try {
		let selector = null;
		if(role == Roles.Admin)
			selector = { role : Roles.Admin};
		else if(role == Roles.Lmsadmin)
			selector = { role : Roles.Lmsadmin};
		else if(role == Roles.Presenteradmin)
			selector = { role : Roles.Presenteradmin };
		else if(role == Roles.CRMadmin)
			selector = { role : Roles.CRMadmin};
		else
			cb(null, false);
		if(selector != null){
			selector["profile.companyid"] = cid;
			selector["userStatus"] = "Active"; 
			selector["_id"] = {$ne : uid};
			let query = Users.findOne(selector);
			query.exec(function(err, result){
				if(err){
					cb(err, null);
				}else if(result){
					// console.log("result === ",result);
					cb(null, result.firstname);
				}else{
					cb(null, false);
				}
			});
		}
	} catch(e) {
		console.log("e in checkhaveAdmin === ",e.message);
		cb("Internal server error, Please try again", null);
	}
}


/**
*  @Function name : checkforUniqueStudentId
*  @Purpose : To check studentId is unique for that corporate while create or update the user
*  @Request Object : cid : corporateId, role : role, sid : studentId, cb : callback 
*  @Response Object : Success - true, Failure - Error message, false
*  @Author : "Prateek"
*/
export function checkforUniqueStudentId(cid, role, sid, uid, cb){

	try {
		if(role == Roles.Student && sid != '') {			
			let selector = {};
			selector["profile.companyid"] = cid;
			selector["studentId"] = sid;
			if (uid != null) {
				selector['_id'] = { $ne : mongoose.Types.ObjectId(uid) };
			}		
			let query = Users.find(selector);
			query.exec(function(err, result){
				if(err){
					cb(err, null);
				}else if(result){
					// console.log("result === ",result);
					if(result.length < 1) {
						cb(null, true);
					} else {
						cb("Student Id already exists,Please try again", null)
					}					
				}
			});	
		} else {
			cb(null, true);
		}	
	} catch(e) {
		console.log('error in checkforUniqueStudentId ',e);
		cb("Internal server error, Please try again", null);
	}
}

/**
*  @Function name : newUser
*  @Purpose : For creating new user
*  @userObject : userObject: {'user data'}
*  @cb : Success - User data, Failure - Error message
*  @Author : Aniket Gupta
*/
	
export function newUser(userObject, cb){

	try {

		//Query for checking if user is present with same email in database
		// console.log('User Create');
		Users.findOne({ 
			email: userObject.email 
		}, function(err, doc) {
			if(err) {
				cb(err, null);
			} else if(doc) {

				//If present send the error
				cb("Email already exists.", null);
			} else {
				const objUser = new Users(userObject);

				//Query for creating new user
				Users.create([objUser], (error, data) => {
					if (!error) {
						console.log('Trying to log user');
						if(userObject["createdby"] != "self"){
							LogUserModule(mongoose.Types.ObjectId(userObject.createdby), data[0]._id, 'create');
						}
						cb(null, data[0]);
					} else {
						cb(error, null);
					}
				});
			}
		});
	} catch(e) {
		console.log('error in newUser',e);
		cb("Internal server error, Please try again", null);
	}
}

/**
*  @Function name : updateProfile
*  @Purpose : For updating user profile data
*  @Request Object : profiledata: { data: { _id : "user id" }}
*  @Response Object : Success - User data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function updateProfile(req, res) {
	//console.log("inside update profile", req.body.profiledata.data);

	//Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
  	//console.log("person details", person);
    try {
      if ( person != null && req.body.profiledata.data ) {
      	var userObject = req.body.profiledata.data;

					//Query for checking if user is present with same email in database
					var uid = mongoose.Types.ObjectId(userObject._id);
					Users.findOne({ 
						_id : { 
							$ne : person._id
						}, 
						email : userObject.email 
					}, function(e, data ){
						if(e) { 
							res.json({ 
								status: false, 
								error : e.message 
							}); 
						} else if(data) {
							//console.log("data === ",data);
							res.json({ 
								status : false, 
								error : "Email already existed." 
							});
						} else {

							//Query for updating user profile data based on user id
							Users.update({ 
								_id : person._id 
							},{
								$set : {
									firstname : userObject.firstname,
									lastname : userObject.lastname,
									email : userObject.email,
									"profile.aboutme" : userObject['profile.aboutme'],
									"profile.phone" : userObject['profile.phone'],
									"profile.gender" : userObject['profile.gender'],
									"profile.position" : userObject['profile.position'],
									"profile.dept" : userObject['profile.dept'],
									modifiedAt : moment().utc().toDate()
								}
							}, function(error, updateddoc){
								if (error) {
									//console.log(error);
									res.json({ 
										status: false, 
										error : error.message 
									});
								} else {
									var query = Users.findOne({
			 							_id : person._id 
									}).populate('profile.companyid', 'businessType _id');
									//Query for finding and sending updated user profile data to client
									query.exec( function(docerr, newdoc) {
										if(newdoc) {
											res.json({ 
												status: true, 
												message : "Updated successfully.", 
												data : newdoc 
											});
										} else {
											res.json({ 
												status: false, 
												error : "Updated successfully." 
											});
										}
									});
								}
							});
						}
					});
        } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in updateProfile ",e);
      res.json({status : false, error : "Internal server error."});
    }
  }); 
}

/**
*  @Function name : viewUser
*  @Purpose : For fetching complete user data
*  @Request Object : userdata: { uid : "user id" }
*  @Response Object : Success - User data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function viewUser (req,res) {
	// console.log(req.body.userdata);

	try {
		//Verifying if request is valid or not
		if(req.body.userdata) {
			var obj = req.body.userdata;

			//Validating if user id is valid or not
			if(!obj.uid || validator.isEmpty(obj.uid)  || !mongoose.Types.ObjectId.isValid(obj.uid)) {
				res.json({
					status: false, 
					error : "Invalid userId."
				});
			} else {

				//Query for finding complete user data
				let query = Users.findOne({ 
					_id : mongoose.Types.ObjectId(obj.uid) 
				},{ 
					"password" : 0 
				})
				.populate('profile.companyid', 'businessId _id');
				query.exec(function(error,result) {
					if(error) {
						console.log("error === ",error);
						res.json({ 
							status : false, 
							error : error.message 
						});
					} else {
					// console.log("result === ",result);
						res.json({ 
							status : true, 
							data : result 
						});
					}
				});
			}	
		} else {
			res.json({
				status: false, 
				error : "Invalid request"
			});
		}
	} catch(e) {
		console.log('error in viewUser',e);
		res.json({
			status : false, 
			error : "Internal server error."
		});
	}
}

/**
*  @Function name : viewUserProfile
*  @Purpose : For fetching user profile data
*  @Request Object : userdata: { uid : "user id" }
*  @Response Object : Success - User data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function viewUserProfile (req, res) {

	try {
		//Verifying if request is valid or not
		if(req.body.userdata) {
			var obj = req.body.userdata;

			//Validating is user id is valid or not
			if(!obj.uid || validator.isEmpty(obj.uid)  || !mongoose.Types.ObjectId.isValid(obj.uid)) {
				res.json({
			  	status: false, 
			  	error : "Invalid request"
			  });
			} else {

				//Query for finding user profile data
		    let query = Users.findOne({ 
		    	_id : mongoose.Types.ObjectId(obj.uid) 
		    })
		    .select('firstname profile')
		    .populate('profile.companyid', 'businessId _id');
	    	query.exec(function(error,result) {
		    	if(error) {
		    		console.log("error === ",error);
	          res.json({ 
	          	status : false, 
	          	error : error.message 
	          });
		    	} else {
		    		res.json({ 
		    			status : true, 
		    			data : result 
		    		});
		    	}
	    	});
			}	
		} else {
		  res.json({
		  	status: false, 
		  	error : "Invalid request"
		  });
		}
	} catch(e) {
		console.log('error in viewUserProfile',e);
		res.json({
			status: false,
			error: "Internal server error."
		});
	}
}

/**
*  @Function name : getUserLocaleData
*  @Purpose : For fetching locale data
*  @Request Object : userdata: { uid : "user id" }
*  @Response Object : Success - User data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function getUserLocaleData (req, res) {

	try{
		//Verifying is request is valid or not
		if(req.body.userdata) {
			var obj = req.body.userdata;

			//Validating if user id is valid or not
			if(!obj.uid || validator.isEmpty(obj.uid)  || !mongoose.Types.ObjectId.isValid(obj.uid)) {
				res.json({
			  	status: false, 
			  	error : "Invalid request"
			  });
			} else {

				//Query for findin locale data
		    let query = Users.findOne({ 
		    	_id : mongoose.Types.ObjectId(obj.uid) 
		    }).select('firstname locale');
	    	query.exec(function(error,result) {
		    	if(error) {
		    		console.log("error === ",error);
	          res.json({ 
	          	status : false, 
	          	error : error.message 
	          });
		    	} else {
		    		res.json({ 
		    			status : true, 
		    			data : result
		    		});
		    	}
	    	});
			}	
		} else {
	    res.json({
	    	status: false, 
	    	error : "Invalid request"
	    });
		}
	} catch(e) {
		console.log('error in getUserLocaleData',e);
		res.json({
			status: false,
			error: "Internal server error."
		});
	}
}

/**
*  @Function name : fetchUser
*  @Purpose : For fetching particular user data
*  @Request Object : userdata: { uid : "user id", id: 'corporate id }
*  @Response Object : Success - User data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchUser (req, res) {
	checkValidRequest(req.headers, function(person) {
    try {
    	
			//Verifying if request is valid or not
			if(person == null || !req.query.id) {
				res.json({ status : false, error : "Invalid request." });
			} else {
				var recordId = mongoose.Types.ObjectId(req.query.id);

				//Query for finding user data based on user id
				var query = Users.findOne({ 
					_id : recordId 
				},{ 
					"password" : 0 
				})
				.populate('profile.companyid', 'businessId _id');
				query.exec(function (err, doc) {
					//console.log("doc === ", doc);
					if (err) { 
						res.json({ status: false, error : err.message }); 
					} else {
						res.json({ status: true, data: doc });
					}
				});					
			}
	  } catch(e) {
      console.log("Error in fetch location", e);
      res.json({ status : false, error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : getProfileImage
*  @Purpose : For fetching profile image of user
*  @Request Object : uid: { uid : "user id" }
*  @Response Object : Success - Profile image, Failure - Error message
*  @Author : Aniket Gupta
*/

export function getProfileImage(req,res) {

	try {
		//Verifying if request is valid or not
		if(req.body.uid) {
			let obj = req.body.uid;

			//Validating if user is valid or not
			if(!obj.uid || validator.isEmpty(obj.uid) || !mongoose.Types.ObjectId.isValid(obj.uid)) {
				res.json({ 
					status : false, 
					error : "InValid user." 
				});
			} else {

				//Query for fetching profile image of user
				Users.findOne({
					"_id":mongoose.Types.ObjectId(req.body.uid.uid)
				}).exec(function(error,result) {
					if(error) {
						res.json({
							status: false,
							error: error.message
						});
					} else {
						res.json({
							status: true,
							data: result.profile.profileImage
						})
					}
				});
			}
		} else {
			res.json({ 
				status : true, 
				error : "Invalid request." 
			});
		}
	} catch(e) {
		console.log("Error in  getProfileImage", e);
    res.json({ 
     	status : false, 
     	error : "Internal server error."
    });
	}
}

/**
*  @Function name : getRoles
*  @Purpose : To get roles according to corporate bussiness type
*  @Request params : cid : corporateId
*  @Response Object : Success - data : options Failure - data : []
*  @Author : "Prudhvi"
*/
export function getRoles(req, res){
	let options = [['', 'Select Role']];
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.params.cid) {
      	let query = Corporate.findOne({ _id : req.params.cid });
      	query.exec( function(error, response) {
					//console.log("response === ",response);

					// set options based on bussiness type and current user role based
					if (response && response.businessType == 'Conference') {
						if (person.role == Roles.Superadmin)
							options = [['', 'Select Role'], [Roles.Admin, "Admin"], [Roles.Moderator, "Moderator"], [Roles.User, "User"]];
						else if (person.role == Roles.Admin)
							options = [['', 'Select Role'], [Roles.Moderator, "Moderator"], [Roles.User, "User"]];
					} else if (response && response.businessType == 'LMS') {
						if (person.role == Roles.Superadmin)
							options = [['', 'Select Role'], [Roles.Lmsadmin, "Admin"], [Roles.Instructor, "Instructor"], [Roles.Student, "Student"]/*, [Roles.Parent, "Parent"]*/];
						else if (person.role == Roles.Lmsadmin)
							options = [['', 'Select Role'], [Roles.Instructor, "Instructor"], [Roles.Student, "Student"]/*, [Roles.Parent, "Parent"]*/];
					} else if (response && response.businessType == 'CRM') {
						if (person.role == Roles.Superadmin)
							options = [['', 'Select Role'], [Roles.CRMadmin, "Admin"], [Roles.CRMuser, "User"]];
						else if (person.role == Roles.CRMadmin)
							options = [['', 'Select Role'], [Roles.CRMuser, "User"]];
					} else if (response && response.businessType == 'Presenter') {
						if (person.role == Roles.Superadmin)
							options = [['', 'Select Role'], [Roles.Presenteradmin, "Admin"], [Roles.Presenter, "Presenter"], [Roles.Attendee, "Attendee"]];
						else if (person.role == Roles.Presenteradmin)
							options = [['', 'Select Role'], [Roles.Presenter, "Presenter"], [Roles.Attendee, "Attendee"]];
					}
					res.json({ data : options });
				});
      } else res.json({data : options});
    } catch(e) {
      console.log("e in getRoles",e);
      res.json({data : options});
    }
  });
}

/**
*  @Function name : getRolesUpdate
*  @Purpose : To get roles according to corporate bussiness type
*  @Request params : userId : userId
*  @Response Object : Success - data : options Failure - data : []
*  @Author : "Prudhvi"
*/
export function getRolesUpdate(req, res){
	var options = [['', 'Select Role']];
	checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.params.userId && mongoose.Types.ObjectId.isValid(req.params.userId)) {
      	let query = Users.findOne({ _id : req.params.userId	})
      	.populate('profile.companyid', 'businessType _id');
				query.exec(function (error, doc) {
					if (doc && doc.profile) {
						if(doc.profile.companyid && doc.profile.companyid.businessType && doc.profile.companyid.businessType == 'Conference') {
							if(person.role == Roles.Superadmin)
								options = [['', 'Select Role'], [Roles.Admin, "Admin"], [Roles.Moderator, "Moderator"], [Roles.User, "User"]];
							else if(person.role == Roles.Admin)
								options = [['', 'Select Role'], [Roles.Moderator, "Moderator"], [Roles.User, "User"]];
						} else if(doc.profile.companyid && doc.profile.companyid.businessType && doc.profile.companyid.businessType == 'LMS') {
							if(person.role == Roles.Superadmin)
								options = [['', 'Select Role'], [Roles.Lmsadmin, "Admin"], [Roles.Instructor, "Instructor"], [Roles.Student, "Student"]/*, [Roles.Parent, "Parent"]*/];
							else if(person.role == Roles.Lmsadmin)
								options = [['', 'Select Role'], [Roles.Instructor, "Instructor"], [Roles.Student, "Student"]/*, [Roles.Parent, "Parent"]*/];
						} else if(doc.profile.companyid && doc.profile.companyid.businessType && doc.profile.companyid.businessType == 'CRM') {
							if(person.role == Roles.Superadmin)
								options = [['', 'Select Role'], [Roles.CRMadmin, "Admin"], [Roles.CRMuser, "User"]];
							else if(person.role == Roles.CRMadmin)
								options = [['', 'Select Role'], [Roles.CRMuser, "User"]];
						} else if(doc.profile.companyid && doc.profile.companyid.businessType && doc.profile.companyid.businessType == 'Presenter') {
							if(person.role == Roles.Superadmin)
								options = [['', 'Select Role'], [Roles.Presenteradmin, "Admin"], [Roles.Presenter, "Presenter"], [Roles.Attendee, "Attendee"]];
							else if(person.role == Roles.Presenteradmin)
								options = [['', 'Select Role'], [Roles.Presenter, "Presenter"], [Roles.Attendee, "Attendee"]];
						}
						res.json({ data : options	});
					} else {
						res.json({ 
							data : options
						});
					}
				});
      } else res.json({data : options});
    } catch(e) {
      console.log("e in getRolesUpdate ",e);
      res.json({data : options});
    }
  });
}

//Currently Unused
export function paymentData (req,res) {
	//console.log("request");
	//console.log(response);
	res.json({
		status:true,
		message:"payment done"
	});
}

/**
*  @Function name : saveUserAddress
*  @Purpose : For creating and updating contact data into profile
*  @Request Object : userAddressData: { _id : "user id", profile: { contact: 'contact data' } }
*  @Response Object : Success - Success message, UserId, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveUserAddress (req, res) {
	try {

		//console.log("Inside Save User Address Controller", req.body.userAddressData);
		var userAddressObject = req.body.userAddressData;
		var requestedUserId = req.body.userAddressData._id;
		
		//Verifying if userAddressObject is there or not
	 	if(!userAddressObject && !userAddressObject._id && !userAddressObject.profile ) {
	 		res.json({
	 			status: false, 
	 			error: "Invalid Request"
	 		})
	 	} else {

	 		//Query for checking if the user is present in database
			Users.findOne({
				_id: mongoose.Types.ObjectId(requestedUserId)
			}, function(error, userExists) {
				if(error) {
					//console.log("User Does not exits");
					res.json({
						status: false, 
						error: "Not Authorized"
					});
				} else if (userExists) {

					let resMessage= '';
					if(userExists.profile && userExists.profile.contact && userExists.profile.contact.address) {
						resMessage = "Address updated successfully";
					}else {
						resMessage = "Address Added Successfully";
					}
					//Query for updating user profile with contact data based on user id
					Users.update({
						_id:mongoose.Types.ObjectId(requestedUserId)
					}, {
						$set:{
							"profile.contact" : userAddressObject.profile.contact
						}
					}, function(error, result) {
						if (error) {
							console.log("Error while saving data", error.message);
							res.json({
								status: false, 
								error: "Address not updated"
							});
						} else if (result) {
							//console.log("Data saved successfully");
							res.json({
								status: true, 
								data:requestedUserId, 
								message: resMessage
							});
						}
					})
				}
			})
		}
	} catch(e) {
		console.log("Error in  saveUserAddress", e);
    res.json({ 
     	status : false, 
     	error : "Internal server error."
    });
	}
}

/**
*  @Function name : fetchUserAddress
*  @Purpose : For fetching contact data
*  @Request Object : { _id : "user id" }
*  @Response Object : Success - Contact data, Failure - Error message
*  @Author : Aniket Gupta
*/

//Currently Unused
// export function fetchUserAddress (req, res) {
// 	// console.log("Inside Fetch user");
// 	var requestedUserId = req.body._id;

// 	//Verifying if requestedUserId is there or not
// 	if(!requestedUserId) {
// 		res.json({
// 			status: false, 
// 			error:"Invalid User ID"
// 		});
// 	}

// 	//Query for finding contact data
// 	Users.findOne({
// 		_id: mongoose.Types.ObjectId(requestedUserId)
// 	}, function(error, result) {
// 		if(error) {
// 			//console.log("error in user ID");
// 			res.json({
// 				status: false, 
// 				error:"Invalid User ID"
// 			});
// 		} else if (result) {
// 			//console.log("Data in fetch user", result.profile.contact);
// 			res.json({
// 				status: true, 
// 				data: result.profile.contact
// 			});
// 		}
// 	});
// }

/**
*  @Function name : createWorkPlace
*  @Purpose : For creating and updating work place into profile
*  @Request Object : { userID : "user id", companyID : "company id", workplaceObj: {"work place data object"} }
*  @Response Object : Success - Success message, Workplace data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function createWorkPlace (req, res) {

	try {
		// console.log("Request received for create work place", req.body.data);
		// //Intialising all the variables receieved from request
		var requestedWorkPlaceObj = req.body.data.workplaceObj;
		var requestedUid = req.body.data.userID;
		var companyId = req.body.data.companyID;
		
		//Query for checking if the user is present in database
		var query = Users.findOne({
			_id: mongoose.Types.ObjectId(requestedUid)
		});
		query.exec(function(err, userData){
			if(err) {
				res.json({ 
					status : false, 
					error : err.message
				})
			} else {

				//If user is present in database
				if(userData) {

					//Verifying if workplace array length is not equal to zero or not
					if(userData.profile && userData.profile.experience && userData.profile.experience.workplace && userData.profile.experience.workplace.length != 0) {
						var flag = 0;

						//Looping through the workplace array
						for(var i = 0; i < userData.profile.experience.workplace.length; i++) {

					    var companyName = userData.profile.experience.workplace[i].company;

					    //Verifying if workplace is already present or not
						  if ( companyId != '' && requestedWorkPlaceObj.company ==  companyName && companyId != userData.profile.experience.workplace[i]._id) {
								res.json({
									status: false, 
									error: "Already workplace is present with same name."
								});
								flag = 0;
						  	break;

						  	//Verifying if workplace is present with same name
					    } else if ( companyId == '' && requestedWorkPlaceObj.company ==  companyName) {
						  	res.json({
									status: false, 
									error: "Already workplace is present with same name."
								});
								flag = 0;
						  	break;

					    } else {
					    	flag = 1;
					    } 
						}

						//If flag == 1 means no conflicts with already present workplace
						if(flag == 1) {

							//Verifying if company id is there or not
							if(companyId != '') {
								var obj = requestedWorkPlaceObj;
								obj["_id"] = mongoose.Types.ObjectId(companyId);

								//Query for updating user profile with workplace object based on company and user id
								Users.update({
									_id: mongoose.Types.ObjectId(requestedUid),
									"profile.experience.workplace._id": companyId
								},{
									$set:{
										"profile.experience.workplace.$": obj,
									}
								} , {
									upsert: true
								},function(err, result) {
									if(err) {
										console.log(err)
				            res.json({
					            status: false,
					            error: 'Work place not updated'
					          });
		          		} else {
		          			// console.log("result", result) 
		          			res.json({
					            status: true,
					            data: req.body.data,
					            success: 'Work place updated'
					          });
		          		}
		          	});

							} else {

								//Query for updating user profile with workplace object without checking company id
								Users.update({
									_id: mongoose.Types.ObjectId(requestedUid)
								},{
									$push: {
										"profile.experience.workplace" : requestedWorkPlaceObj
									}
								} , {
									upsert: true
								},function(err, result) {
									if(err) {
										console.log(err)
				            res.json({
					            status: false,
					            error: 'Work place not added'
					          });
		          		} else {
		          			// console.log("result", result)
		          			res.json({
					            status: true,
					            data: req.body.data,
					            success: 'Work place added'
					          });
		          		}
		          	});
							}

						}

					} else {

						//Query for updating user profile with workplace object when it is not present
						Users.update({
							_id: mongoose.Types.ObjectId(requestedUid)
						},{
							$push: {
								"profile.experience.workplace" : requestedWorkPlaceObj
							}
						} , {
							upsert: true
						},function(err, result) {
							if(err) {
								console.log(err)
		            res.json({
			            status: false,
			            error: 'Work place not added'
			          });
	      		} else {
	      			// console.log("result", result)
	      			res.json({
			            status: true,
			            data: req.body.data,
			            success: 'Work place added'
			          });
	      			}
	      		});
					}

				} else {
					res.json({ 
						status: false, 
						error : "Work place not created ." 
					});
				} 
			}
		});				

	} catch (e) {
		console.log('error in createWorkPlace',e);
		res.json({ 
			status : false, 
			error : e.message 
		});		
	}
};

/**
*  @Function name : getWorkEduData
*  @Purpose : For fetching complete work place data
*  @Request Object : null
*  @Response Object : Success - Workplace data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function getWorkEduData (req, res) {
	checkValidRequest(req.headers, function(person) {
    try {
			if (person != null) {
				var projection = {};
				projection['profile.experience'] = 1
				projection['profile.education'] = 1

				//Query for finding workplace data
				Users.find({
				_id: mongoose.Types.ObjectId(person._id)
				},projection).exec((err, doc) => {
					if (err) {
						res.json({
							status : false, 
							error : err.message
						})
					} else if (doc && doc.length != 0) {
						// console.log(doc[0].profile)
						res.json({
							status : true,
							data: doc[0].profile
						})
					} else {
						res.json({
							status : true
						});
					}
				});
			} else {
				res.json({ 
					status : false, 
					error : "Invalid request" 
				});
			}
		} catch (e) {
			console.log('error in getWorkEduData',e);
			res.json({ 
				status : false, 
				error : e.message 
			});		
		}
	});
};

/**
*  @Function name : deleteWorkPlace
*  @Purpose : For deleting particular work place data
*  @Request Object : params : { id: "workplace id" }
*  @Response Object : Success - Success message, Workplace data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteWorkPlace (req, res) {
	checkValidRequest(req.headers, function(person) {
    try {
    	if (person != null) {
				//Query for finding workplace data based on requestedWorkId
				Users.find({
					"_id" : mongoose.Types.ObjectId(person._id),
					"profile.experience.workplace._id" : req.params.id
				}, { 
					"profile.experience.workplace.$" : 1 
				}).exec((err, doc) => {
					if(err) {
						console.log(err)
						res.json({
							status : false, 
							error : err.message
						})
					} 

					//Verifying if data is there or not
					if(doc) {

						//Query for removing workplace data in user profile
						Users.update({
							_id: mongoose.Types.ObjectId(person._id),
							"profile.experience.workplace._id": req.params.id
						},{
							$pull:{
								"profile.experience.workplace": {
									_id : req.params.id
								}
							}
						}, {
							upsert: true
						},function(err, result) {
							if(err) {
								console.log(err)
		            res.json({
			            status: false,
			            error: 'Work place not deleted'
			          });
		      		} else {
		      			// console.log("result", result)
		      			res.json({
			            status: true,
			            success: 'Work place deleted successfully'
			          });
		      		}
		      	});
					} 
				});
			} else {
				res.json({ 
					status : false, 
					error : "Invalid request" 
				});
			}			
		} catch (e) {
			console.log('error in deleteWorkPlace',e);
			res.json({ 
				status : false, 
				error : e.message 
			});		
		}
	});
}

/**
*  @Function name : saveUserWebsite
*  @Purpose : For creating and updating website into profile
*  @Request Object : userWebsiteData: { _id : "user id", profile: { website: 'website' } }
*  @Response Object : Success - Success message, UserId, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveUserWebsite (req, res) {
	try {
		//console.log("Inside Save User Address Controller", req.body.userWebsiteData);
		var userWebsiteObject = req.body.userWebsiteData;
		var requestedUserId = req.body.userWebsiteData._id;

		//Verifying if userWebsiteData is there or not
	 	if(!req.body.userWebsiteData) {
	 		res.json({
	 			status:false, 
	 			message: "User data not available"
	 		});
	 	} else {

	 		//Query for checking if the user is present in database
			Users.findOne({
				_id: mongoose.Types.ObjectId(requestedUserId)
			}, function(error, userExists) {
				if(error) {
					//console.log("User Does not exits");
					res.json({
						status: false, 
						error: "Not Authorized"
					});
				} else if (userExists) {
					let resMessage= '';
					if(userExists.profile && userExists.profile.website) {
						resMessage = "Website updated successfully";
					}else {
						resMessage = "Website added successfully";
					}
					//Query for updating user profile with website based on user id
					Users.update({
						_id:mongoose.Types.ObjectId(requestedUserId)
					}, {
						$set:{
							"profile.website": userWebsiteObject.profile.website
						}
					}, function(error, result) {
						if (error) {
							//console.log("Error while saving data", error.message);
							res.json({
								status: false, 
								error: "Website not updated"
							});
						} else if (result) {
							//console.log("Data saved successfully");
							res.json({
								status: true, 
								data: requestedUserId, 
								message: resMessage
							});
						}
					})
				}
			})
		} 
	} catch(e) {
		console.log("Error in  saveUserWebsite", e);
    res.json({ 
     	status : false, 
     	error : "Internal server error."
    });
	}
}

/**
*  @Function name : saveUserSocialLink
*  @Purpose : For creating and updating social link into profile
*  @Request Object : userSocialLinkData: { _id : "user id", profile: { socialLink: 'social link' } }
*  @Response Object : Success - Success message, UserId, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveUserSocialLink (req, res) {
	try {
		// console.log("Inside Save User SocialLink Controller", req.body.userSocialLinkData);
		var userWebsiteObject = req.body.userSocialLinkData;
		var requestedUserId = req.body.userSocialLinkData._id;

		//Verifying if userSocialLinkData is there or not
	 	if(!req.body.userSocialLinkData) {
	 		res.json({
	 			status:false, 
	 			message: "User data not available"
	 		});
	 	} else {

	 		//Query for checking if the user is present in database
			Users.findOne({
				_id: mongoose.Types.ObjectId(requestedUserId)
			}, function(error, userExists) {
				if(error) {
					//console.log("User Does not exits");
					res.json({
						status: false, 
						error: "Not Authorized"
					});
				} else if (userExists) {

					let resMessage= '';
					if(userExists.profile && userExists.profile.socialLink ) {
						resMessage = "Social link updated successfully";
					}else {
						resMessage = "Social link added successfully";
					}
					//Query for updating user profile with social link based on user id
					Users.update({
						_id:mongoose.Types.ObjectId(requestedUserId)
					}, {
						$set:{
							"profile.socialLink": userWebsiteObject.profile.socialLink
						}
					}, function(error, result) {
						if (error) {
							//console.log("Error while saving data", error.message);
							res.json({
								status: false, 
								error: "Social link not updated"
							});
						} else if (result) {
							//console.log("Data saved successfully");
							res.json({
								status: true, 
								data: requestedUserId, 
								message: resMessage
							});
						}
					})
				}
			})
		} 
	} catch(e) {
		console.log("Error in  saveUserSocialLink", e);
    res.json({ 
     	status : false, 
     	error : "Internal server error."
    });
	}
}

/**
*  @Function name : saveUserBasicInfo
*  @Purpose : For creating and updating basic information of user into profile
*  @Request Object : userBasicInfoData: { _id : "user id", profile: {"basic info data"} }
*  @Response Object : Success - Success message, College data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveUserBasicInfo (req, res) {
	try {
		// console.log("Inside Save User basic Info Controller", req.body);
		var userBasicInfoObject = req.body.userBasicInfoData;
		var requestedUserId = req.body.userBasicInfoData._id;
		var requestedUserDateOfBirthData = req.body.userBasicInfoData.profile.dateofbirth;
		var requestedUserDateOfBirthObject = req.body.userBasicInfoData.profile.dateofbirth;
		var requestedUserGenderData = req.body.userBasicInfoData.profile.gender;	

		//Verifying if requestedUserDateOfBirthData is there or not
		if(requestedUserDateOfBirthData) {
			var requestedUserDateOfBirth = moment(requestedUserDateOfBirthData, "DD/MM/YYYY");
		} else {
			requestedUserDateOfBirth = '';
		}

		//Verifying if requestedUserGenderData is there or not
		if(requestedUserGenderData) {
			var requestedUserGender = req.body.userBasicInfoData.profile.gender;	
		} else {
			var requestedUserGender = '';
		}

		//Verifying if userBasicInfoData is there or not
	 	if(!req.body.userBasicInfoData) {
	 		res.json({
	 			status:false, 
	 			message: "User Data not available"
	 		});
	 	} else {

	 		//Query for checking if user is present in database
			Users.findOne({
				_id: mongoose.Types.ObjectId(requestedUserId)
			}, function(error, userExists) {
				if(error) {
					//console.log("User Does not exits");
					res.json({
						status: false, 
						error: "Not Authorized"
					});
				} else if (userExists) {
					let resMessage= '';
					if( userExists.profile && (userExists.profile.dateofbirth || userExists.profile.gender)) {
						resMessage = "Basic info updated successfully";
					}else {
						resMessage = "Basic info added successfully";
					}

					//Query for updating user profile with basic information based on user id
					Users.update({
						_id:mongoose.Types.ObjectId(requestedUserId)
					}, {
						$set:{
							"profile.dateofbirth": requestedUserDateOfBirth, 
							"profile.gender": requestedUserGender
						}
					}, function(error, result) {
						if (error) {
							//console.log("Error while saving data", error.message);
							res.json({
								status: false, 
								error:error.message
							});
						} else if (result) {
							//console.log("Data saved successfully");
							res.json({
								status: true, 
								data:requestedUserId, 
								message: resMessage
							});
						}
					})
				}
			})
		} 
	} catch(e) {
		console.log("Error in  saveUserBasicInfo", e);
    res.json({ 
     	status : false, 
     	error : "Internal server error."
    });
	}
}

/**
*  @Function name : createCollege
*  @Purpose : For creating and updating college into profile
*  @Request Object : data: { userID : "user id", universityID: 'college id', collegeObj: {"college data object"} }
*  @Response Object : Success - Success message, College data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function createCollege (req, res) {

	try {
		// console.log("Request received for create college", req.body.data);
		// //Intialising all the variables receieved from request
		var requestedCollegeObj = req.body.data.collegeObj;
		var requestedUid = req.body.data.userID;
		var universityId = req.body.data.universityID;
		
		//Query for checking if the user is present in database
		var query = Users.findOne({
			_id: mongoose.Types.ObjectId(requestedUid)
		});
		query.exec(function(err, userData){
			if(err) {
				res.json({ 
					status : false, 
					error : err.message
				});
			} else {

				//If user is present in database
				if(userData) {

					//Verifying if college array length is not equal to zero or not
					if(userData.profile && userData.profile.education && userData.profile.education.college && userData.profile.education.college.length != 0) {
						var flag = 0;

						//Looping through the college array
						for(var i = 0; i < userData.profile.education.college.length; i++) {

					    var universityName = userData.profile.education.college[i].university;

					    //Verifying if college is already present or not
						  if ( universityId != '' && requestedCollegeObj.university ==  universityName && universityId != userData.profile.education.college[i]._id) {
								res.json({
									status: false, 
									error: "Already college is present with same name."
								});
								flag = 0;
						  	break;

						  	//Verifying if college is present with same name
					    } else if ( universityId == '' && requestedCollegeObj.university ==  universityName) {
						  	res.json({
									status: false, 
									error: "Already college is present with same name."
								});
								flag = 0;
						  	break;

					    } else {
					    	flag = 1;
					    } 
						}

						//If flag == 1 means no conflicts with already present college
						if(flag == 1) {

							//Verifying if college id is there or not
							if(universityId != '') {
								var obj = requestedCollegeObj;
								obj["_id"] = mongoose.Types.ObjectId(universityId);

								//Query for updating user profile with college object based on college and user id
								Users.update({
									_id: mongoose.Types.ObjectId(requestedUid),
									"profile.education.college._id": universityId
								},{
									$set:{
										"profile.education.college.$": obj,
									}
								} , {
									upsert: true
								},function(err, result) {
									if(err) {
										console.log(err)
				            res.json({
					            status: false,
					            error: 'College not updated'
					          });
		          		} else {
		          			// console.log("result", result)
		          			res.json({
					            status: true,
					            data: req.body.data,
					            success: 'College updated'
					          });
		          		}
		          	});

							} else {

								//Query for updating user profile with college object without checking college id
								Users.update({
									_id: mongoose.Types.ObjectId(requestedUid)
								},{
									$push: {
										"profile.education.college" : requestedCollegeObj
									}
								} , {upsert: true},function(err, result) {
									if(err) {
										console.log(err)
				            res.json({
					            status: false,
					            error: 'College not added'
					          });
		          		} else {
		          			// console.log("result", result)
		          			res.json({
					            status: true,
					            data: req.body.data,
					            success: 'College added'
					          });
		          		}
		          	});
							}
						}
					} else {

						//Query for updating user profile with college object when it is not present
						Users.update({
							_id: mongoose.Types.ObjectId(requestedUid)
						},{
							$push: {
								"profile.education.college" : requestedCollegeObj
							}
						} , {
							upsert: true
						},function(err, result) {
							if(err) {
								console.log(err)
		            res.json({
			            status: false,
			            error: 'College not added'
			          });
		      		} else {
		      			// console.log("result", result)
		      			res.json({
			            status: true,
			            data: req.body.data,
			            success: 'College added'
			          });
		      		}
		      	});
					}
				} else {
					res.json({ 
						status: false, 
						error : "College not created ." 
					});
				} 
			}
		});				

	} catch (e) {
		console.log('error in createCollege',e);
		res.json({ 
			status : false, 
			error : e.message 
		});		
	}
};

/**
*  @Function name : deleteCollege
*  @Purpose : For deleting particular college data
*  @Request Object : params : { id: "college id" }
*  @Response Object : Success - Success message, College data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteCollege (req, res) {
	checkValidRequest(req.headers, function(person) {
    try {

			//Query for finding college data based on requestedCollegeId and requestedUserId
			Users.find({
				"_id" : mongoose.Types.ObjectId(person._id),
				"profile.education.college._id" : req.params.id
			}, { 
				"profile.education.college.$" : 1 
			}).exec((err, doc) => {
				if (err) {
					console.log(err)
					res.json({
						status : false, 
						error : err.message
					})
				} 

				//Verifying if data is there or not
				if (doc) {

					//Query for removing college data in user profile
					Users.update({
						_id: mongoose.Types.ObjectId(person._id),
						"profile.education.college._id": req.params.id
					},{
						$pull:{
							"profile.education.college": {
								_id : req.params.id
							}
						}
					}, {
						upsert: true
					},function(err, result) {
						if(err) {
							console.log(err)
	            res.json({
		            status: false,
		            error: 'College not deleted'
		          });
	      		} else {
	      			// console.log("result", result)
	      			res.json({
		            status: true,
		            success: 'College deleted successfully'
		          });
	      		}
	      	});
				} 
			});			
		} catch (e) {
			console.log('error in deleteCollege',e);
			res.json({ 
				status : false, 
				error : e.message 
			});		
		}
	});
};

/*
@Function Name : createSchool
@Purpose : "To search groups as per input from client side from participantgroup collection"
@Request Object : {schoolObj}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function createSchool(req, res) {

	// Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
  	try {
      if (person != null || req.body.schoolObj) {
	      let queryData = req.body;
	
				//Updating the user document with the requested school object
				var findId = {
	  			_id : mongoose.Types.ObjectId(person._id)
	  		};
				var setSchoolObj = {
					$set : {
						"profile.education.highSchool":queryData.schoolObj
					}
				};
				let resMessage= '';
				if(person.profile && person.profile.education && person.profile.education.highSchool && person.profile.education.highSchool.school) {
					resMessage = "High School Updated Successfully";
				}else {
					resMessage = "High School Added Successfully";
				}
				var updateQuery = Users.update(findId, setSchoolObj);

				updateQuery.exec(function(err, updatedData){
					if(err){
						res.json({ 
							status : false,
							error : err.message
						})
					} else {
						res.json({ 
							status : true,
							success : resMessage 
						})
					}
				})
			} else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }     
    } catch(e) {
    	console.log('error in createSchool',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
  });		
}

/*
@Function Name : deleteSchool
@Purpose : "To search groups as per input from client side from participantgroup collection"
@Request Object : null
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function deleteSchool(req, res) {

	// Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
  	try {
      if (person != null) {
	  	
	  		//Writing query to delete school from user collection document
				var findId = {
	  			_id : mongoose.Types.ObjectId(person._id)
	  		};				
				var setSchoolObj = {
					$set:{
						"profile.education.highSchool" : ''
					}
				};
				var query = Users.update(findId, setSchoolObj);

				query.exec(function(err, deletedData) {
					if (err) {
						res.json({
							status : false, 
							error : err.message
						})
					} else {
						res.json({
							status : true, 
							success : "Deleted successfully"
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
    	console.log('error in deleteSchool',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
  });		
}
				

/*
@Function Name : createSkills
@Purpose : "To save skills in a particular user document in user collection"
@Request Object : {requestedSkills}
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function createSkills(req, res) {

	// Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
  	try {
      	if (person != null && req.body.skills) {
	      	let obj = req.body;
	      	var findId = {
		  			_id : mongoose.Types.ObjectId(person._id)
		  		};

	  		Users.findOne(findId)
	  		.select('profile.experience.professionalSkills')
	  		.exec(function(err, userData) {
	  			if(err) {
	  				res.json({
	  					status: false,
	  					error: err.message
	  				});
	  			} else {
	  				var updater = {
						$set : {
							"profile.experience.professionalSkills" : obj.skills
						}
					};
					//Upadting users document with requested skills
					var updateQuery = Users.update(findId, updater);
					updateQuery.exec(function(err, updatedData) {
						if (err) {
							res.json({ 
								status : false,
								error : err.message
							})
						} else {
							if(userData.profile.experience.professionalSkills && userData.profile.experience.professionalSkills.length <= 0) {
								res.json({ 
									status : true,
									success : "Professional Skills Added Successfully"
								});
							} else {
								res.json({ 
									status : true,
									success : "Professional Skills Updated Successfully"
								});
							}
						}
					});
	  			}
	  		});
		} else {
    		res.json({
	          status : false, 
	          error : "Invalid request."
    		});
      	}     
    } catch(e) {
    	console.log('error in createSkills',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
  });		
}	
	
/**
*  @Function name : deleteAddress
*  @Purpose : For deleting contact data in user profile
*  @Request Object : null
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteAddress(req, res) {
	checkValidRequest(req.headers, function(person) {
    try {

    	if (person != null) {
				//Query for removing contact data in user profile
				Users.update({
					_id : mongoose.Types.ObjectId(person._id)
				}, {
					$set:{
						"profile.contact" : ''
					}
				}, function(err, deletedData) {
					if (err) {
						res.json({
							status: false, 
							error: err.message
						});
					} else {
						res.json({
							status: true, 
							success : "Deleted successfully"
						});
					}
				});
			} else {
				res.json({
					status : false, 
					error : "Invalid request"
				});
			}
		} catch(e) {
			console.log('error in deleteAddress',e);
			res.json({
				status : false, 
				error : e.message
			});
		}
	});
}

/**
*  @Function name : deleteWebsite
*  @Purpose : For deleting website data in user profile
*  @Request Object : null
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteWebsite(req, res) {
	checkValidRequest(req.headers, function(person) {
    try {
    	if (person != null) {

				//Query for removing website data in user profile
				Users.update({
					_id : mongoose.Types.ObjectId(person._id)
				}, {
					$set:{
						"profile.website" : ''
					}
				}, function(err, deletedData) {
					if (err) {
						res.json({
							status: false, 
							error: err.message
						})
					} else {
						res.json({
							status: true, 
							success : "Deleted successfully"
						})
					}
				});
			} else {
				res.json({
					status : false, 
					error : "Invalid request"
				});
			} 
		} catch(e) {
			console.log('error in deleteWebsite',e);
			res.json({
				status: false, 
				error : e.message
			})
		}	
	});
}

/*
@Function Name : deleteProfessionalSkills
@Purpose : "To delete all skills present in a particular user document"
@Request Object : null
@Response Object : Success-data, Failure-error 
@Author : Prateek
*/

export function deleteProfessionalSkills(req, res) {

	// Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
  	try {
      if (person != null) {
      	var findId = {
					_id : mongoose.Types.ObjectId(person._id)
				};
      	var modifier = {
					$set : {
						"profile.experience.professionalSkills" : []
					}
				};	
				
      	//deleting all skills in users document 
				var query = Users.update(findId, modifier);
				query.exec(function(err, deletedData) {
					if (err) {
						res.json({
							status : false, 
							error : err.message
						})
					} else {
						res.json({
							status : true, 
							success : "Deleted successfully"
						})
					}
				})
    	} else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }     
    } catch(e) {
    	console.log('error in deleteProfessionalSkills',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
  });		
}	
	
/*  @Function name : deleteSocialLink
*  @Purpose : For deleting social link data in user profile
*  @Request Object : null
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteSocialLink(req, res) {
	checkValidRequest(req.headers, function(person) {
    try {
    	if (person != null) {

				//Query for removing social link data in user profile
				Users.update({
					_id : mongoose.Types.ObjectId(person._id)
				}, {
					$set:{
						"profile.socialLink" : ''
					}
				}, function(err, deletedData) {
					if (err) {
						res.json({
							status: false, 
							error: err.message
						})
					} else {
						res.json({
							status: true, 
							success : "Deleted successfully"
						})
					}
				});
			} else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      } 
		} catch(e) {
			console.log('error in deleteSocialLink',e);
			res.json({
				status : false, 
				error : e.message
			});
		}
	});
}

/**
*  @Function name : deleteBirthDay
*  @Purpose : For deleting date of birth in user profile
*  @Request Object : null
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteBirthDay(req, res) {
	checkValidRequest(req.headers, function(person) {
    try {
    	if (person != null) {

				//Query for removing date of birth in user profile
				Users.update({
					_id : mongoose.Types.ObjectId(person._id)
				}, {
					$set:{
						"profile.dateofbirth" : ''
					}
				}, function(err, deletedData) {
					if (err) {
						res.json({
							status: false, 
							error: err.message
						})
					} else {
						res.json({
							status: true, 
							success : "Deleted successfully"
						})
					}
				});
			} else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      } 
		} catch(e) {
			console.log('error in deleteBirthDay',e);
			res.json({
				status : false, 
				error : e.message
			})
		}
	});
}

/**
*  @Function name : deleteGender
*  @Purpose : For deleting gender in user profile
*  @Request Object : null
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteGender(req, res) {
	checkValidRequest(req.headers, function(person) {
    try {
    	if (person != null) {
				//Query for removing gender in user profile
				Users.update({
					_id : mongoose.Types.ObjectId(person._id)
				}, {
					$set:{
						"profile.gender" : ''
					}
				}, function(err, deletedData) {
					if (err) {
						res.json({
							status: false, 
							error: err.message
						})
					} else {
						res.json({
							status: true, 
							success : "Deleted successfully"
						})
					}
				});
			} else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      } 
		} catch(e) {
			console.log('error in deleteGender',e);
			res.json({
				status : false, 
				error : e.message
			})
		}
	});
}

/**
* @Function Name: "updateLocaleSettings",
* @Purpose: "To save locale settings into users collections.",
* @Request Object: profileData : { uid : "userID", localeobj : “this.form” },
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function updateLocaleSettings(req, res) {
	try{
		checkValidRequest(req.headers, function(person) {
			try {

				//Verifying if request is valid or not
				if (person == null || !req.body.profileData ) {
					res.json({ status : false, error : "InValid request." });
				} else {
					let obj = req.body.profileData;
					let recordId = mongoose.Types.ObjectId(person._id);
					obj['modifiedAt'] = moment().utc().toDate();

					//If locale settings id is there then update data
					var data = Users.findOne({ _id : recordId });

					//Verifying the data is present or not
					if (data) {

						//If data is present then update the locale settings
						Users.update({ _id : recordId },
							{
								$set : { locale : obj	}
							}, function (err, doc) {
								if (err) {
								  res.json({ status : false, error : err.message });
								} else {

								//Query for sending the updated record to the client
								var query = Users.findOne({ _id : recordId });
								query.exec(function (err, user) {
									if (err) { 
										res.json({ status: false }); 
									} else if(user) {
										res.json({ status: true, data: user, message : "Updated successfully." });

										//Log obj which need to be inserted in logger collection
										// let logObj = {
										// 	logType : 'Locale Settings',
										// 	actionType : 'Updated',
										// 	actionTime : moment().utc().toDate(),
										// 	uid : person._id,
										// 	details : {
										// 		remoteAddress : req.connection.remoteAddress,
										// 		userAgent : req.headers['user-agent']
										// 	}
										// }  

										// //Function for creating log on successful creation of locale settings
										// createLog(logObj, function(status) {
										// if(status) {
										// 	// console.log(status);
										// 	}
										// });
									} else {
										res.json({ status: false, error : "Internal server error." });
									}
								});
							}
						});
					} else {
						res.json({ status : false, error : "Invalid Locale settings" });
					}
				}
			} catch(e) {
				console.log("Error in update Loacle Settings inner  :: ", e);
				res.json({ status : false, error : "Internal server error." });
			}
		});
	} catch(e) {
			console.log("Error in update Loacle Settings  ::  ", e);
			res.json({status : false, error : "Internal server error."
		});
	}
}


/*Users.findOne({ email: userObject.email }, function(err, doc) {
	if(err){
		res.json({ status: false, error: err });
	} else if(doc){
		res.json({ status: false, error: "Email already existed." });
	}else{
		userObject["password"] = md5(userObject.password);
		userObject["createdby"] = mongoose.Types.ObjectId(userObject.uid);
		userObject["modifiedby"] = mongoose.Types.ObjectId(userObject.uid);
		userObject["dateAdded"] = moment().utc().toDate();
		userObject["modifiedAt"] = moment().utc().toDate();
		delete userObject["uid"];
		// console.log(userObject)
		const objUser = new Users(userObject);

		Users.create([objUser], (error) => {
			if (!error) {
				res.json({ status: true, data: objUser, message : "Created successfully." });
				Users.findOne({_id:  mongoose.Types.ObjectId(objUser.createdby)},function(err,name){
					if(name && name.email){
						var exchangeData = {
							to : objUser.email,
							whoCreated :name.email,
							subject : 'User Created',
							body : 'New Account with name '+objUser.firstname+' has been created by '+name.firstname +' '+name.lastname+'.'
						}
						EmailForUserCreation.createUserMail(exchangeData);
					}else{
						res.json({ status: false, error: " Email not sent"});
					}
				});
			} else {
				res.json({ status: false, error: error, data: userObject });
			}
		});
	}
});*/

/**
* @Function Name: "changePassword",
* @Purpose: "To change user password into user document.",
* @Request Object: userdata : { uid : "userID"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function changePassword(req, res) {
	checkValidRequest(req.headers, function(person) {
		try {
			//Verifying if request is valid or not
			if (person == null || !req.body || !req.body.userdata) {
				res.json({ status: false, error : "Invalid request" });
			} else {
				let userObject = req.body.userdata;
				if(!userObject.passwordtoken || validator.isEmpty(userObject.passwordtoken)) {
					// console.log('save')
					if (!userObject.uid || validator.isEmpty(userObject.uid) || !mongoose.Types.ObjectId.isValid(userObject.uid)|| !userObject.token || validator.isEmpty(userObject.token)) {
						res.json({ status : false, error : "InValid user." });
					} else if (!userObject.oldPassword && userObject.oldPassword == '' && !userObject.newPassword && userObject.newPassword == '' && !userObject.reNewPassword && userObject.reNewPassword == '') {
						res.json({status :false,error:"Please fill all fields"});
					} else if (!userObject.oldPassword || userObject.oldPassword == '') {
						res.json({status :false,error:"Current Password field is required"});
					} else if (!userObject.newPassword || userObject.newPassword == '') {
						res.json({status :false,error:"New Password field is required"});
					} else if (!userObject.reNewPassword || userObject.reNewPassword == '' ) {
						res.json({status :false,error:" Retype New Password field is required"});
					} else {

						let old_password = addSlash(userObject.oldPassword);
						//Fetching the details of user password token
						var pwdQuery =  Users.findOne({_id : person._id, token : person.token, password : md5(old_password)});
						pwdQuery.exec(function(pwderror, pwdsuccess) {
							if (pwderror || pwdsuccess == null) {
								res.json({ status: false, error : "Current password you entered is incorrect." });
							}
							if (pwdsuccess) {
								if (userObject.newPassword !== userObject.reNewPassword) {
									res.json({status :false,error:"Re typed password does not match"});
								} else if (userObject.oldPassword == userObject.reNewPassword){
									res.json({status :false,error:"New password should be different from old password"});
								} else {
									let slashsPassword = addSlash(userObject.reNewPassword);

									//Query for update 0r change password. 
									Users.update({ _id : userObject.uid },{ $set : {password:md5(slashsPassword)} },{ runValidators: true },function (updateerror, doc) {
									if (updateerror) {
										res.json({status:false,error:'Can not change password'})
									} else {
										var query = Users.findOne({ _id : person._id });
											query.exec(function (e, document) {
												if (e){ 
													res.json({ status: false, error : e });
											} else {
												res.json({ status: true, data: document, message : "Updated successfully." });
													// let logObj = {
													// 	logType : 'Password',
													// 	actionType : 'Changed',
													// 	actionTime : moment().utc().toDate(),
													// 	uid : userObject.uid,
													// 	details : {
													// 		remoteAddress : req.connection.remoteAddress,
													// 		userAgent : req.headers['user-agent']
													// 	}
													// }
													// createLog(logObj, function(status) {
													// if(status) {
													// 	// console.log(status);
													// 	}
													// });
												}
											});
										//res.json({ status: true, data: doc, message : "Updated successfully." });
										}
									});
								}
							}
						});
					}
				}
			}
		} catch(e) {
			console.log("error in changePassword", e);
			res.json({ status : false, error : "Internal server error." });
		}
	});
}

/**
* @Function Name: "resetPassword",
* @Purpose: "To reset user password user document.",
* @Request Object: userdata : { uid : "userID"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function resetPassword(req, res) {
	try {
		//Verifying if request is valid or not
		if (!req.body || !req.body.userdata) {
			res.json({ status: false, error : "Invalid request" });
		} else {
			let userObject = req.body.userdata;

		//user creating from portal
			if(userObject.password != '') {
				let slashsPassword = addSlash(userObject.password);
				//Fetching details of user password token
				let query = Users.findOne({passwordToken : userObject.passwordtoken})
				query.exec(function(err,user) {
					if (err) {
						//console.log('invalid')
						res.json({status:false,error:err})
					} else {
						// console.log(user)
						if (user != null) {
							user.passwordToken = undefined;
							user.resetPasswordExpires = undefined;

							user.password = md5(slashsPassword);
							user.flagTosetPassword = true

							//Craete or reset password
							user.save(function(updateerror,result) {
								if (updateerror) {
									res.json({status:false, error:'Can not change password'})
								} else {		
									res.json({ status: true, message : "Reset successfully." });
									let now = moment().utc().toDate();
									// let logObj = {
									// 	logType : 'Password',
									// 	actionType : 'Reset',
									// 	actionTime : now,
									// 	uid : userObject.uid,
									// 	details : {
									// 		remoteAddress : req.connection.remoteAddress,
									// 		userAgent : req.headers['user-agent']
									// 	}
									// }
									// createLog(logObj, function(status) {
									// 	if (status) {
									// 		// console.log(status);
									// 	}
									// });
								}
							});	
						} else {
							res.json({status:false,error:'Invalid Request'});
						}
					}
				});
			} else {
				res.json({ status: false, error : "Please enter the Password" });
			}	
		}
	} catch(e) {
			console.log("error in resetPassword", e);
			res.json({ status : false, error : "Internal server error." });
	}
}

/**
*  @Function name : getLogs
*  @Purpose : For fetching log data
*  @Request Object : null
*  @Response Object : Success - Log data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function getLogs (req, res) {
	checkValidRequest(req.headers, function(person) {
    try {

			//Verifying if request is valid or not
			if (person == null) {
				res.json({
					status: false, 
					error: "Invalid Request"
				});
			} else {

				//Query for finding top three latest log data
				var query = Logger.find({
					uid: mongoose.Types.ObjectId(person._id)
				})
				.sort({
					actionTime: -1
				})
				.limit(3)

				query.exec(function(error, result){
					if (error) {
						res.json({
							status: false
						});
					} else if (result) {
						res.json({
							status: true, 
							data: result
						});
					}
				});
			}
		} catch(e) {
      console.log("Error in get logs", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
* @Function Name: "removeProfileImage",
* @Purpose: "To remove Profile image from the users collections.",
* @Request Object:  null
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function removeProfileImage (req, res) {
	checkValidRequest(req.headers, function(person) {
		try {
			if (person != null) {

				// var fileName = person.profile.profileImage;
				var dest = process.env.PWD+"/uploads/"+person.profile.profileImage;
				
				//Delete profile image from the users collection
				Users.update ({
					_id :mongoose.Types.ObjectId(person._id) 
				},{
						$set: {
							"profile.profileImage": ''
						}
					},function(err, deletedData) {
					if (err) {
						res.json ({
							status: false,
							error: err.message
						});
					} else {

						//Remove Profile image from the uploads
						fs.unlink(dest, function(err, result) {
							if (err) {
								res.json({ status: false, error: err.message });
							} else {
								res.json ({
									status: true,
									message : "Deleted successfully"
								})
								// console.log("res", result)
							}
						});
					}
				});
			} else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      } 
		} catch(e) {
			console.log('error in removeProfileImage',e);
			res.json({
				status:false,
				error: e.message
			});
		}
	});
}


export function getUserData(req, res) {
	
	// Verifying request is valid or not
  checkValidRequest(req.headers, function(person) {
  	try {
  		if (person != null && req.params.uid) {
  			let obj = req.params;

  			if (!obj.uid || validator.isEmpty(obj.uid)  || !mongoose.Types.ObjectId.isValid(obj.uid)) {
  				res.json({
						status: false, 
						error : "Invalid userId."
					});
				} else {

  				//Query for finding complete user data
			    Users.findOne({ 
			    	_id : mongoose.Types.ObjectId(obj.uid) 
			    },{ 
			    	"password" : 0 
			    })
		    	.populate('profile.companyid', 'businessId _id')
		    	.populate('contacts._id', 'firstname lastname profile.profileImage profile.experience.workplace profile.position')
		    	.exec(function(error, result) {
			    	if (error) {
			    		res.json({ 
		          	status : false, 
		          	error : error.message 
		          });
			    	} else {
			    		res.json({ 
			    			status : true, 
			    			data : result 
			    		});
			    	}
			    })
  			}
  		} else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }     
    } catch(e) {
    	console.log('error in getUserData',e);
      res.json({
      	status : false, 
      	error : "Internal server error."
      });
    }
  });		
}

/*Pradeep + Android push notification*/
export function setAndroidId(req, res) {
	// console.log("device token---",req.body);
	// Verifying request is valid or not
	checkValidRequest(req.headers, function(person) {
  		try {
  			if( person != null && req.body.deviceData && req.body.deviceData.deviceId) {
	  			Users.update ({
						_id :mongoose.Types.ObjectId(person._id) 
					},{
						$set: {
							deviceId : req.body.deviceData.deviceId,
							deviceType : 'ANDROID'
						}
					}, function (err, res) {

					});
  			} else {
	        res.json({
	          status : false, 
	          error : "Invalid request."
	        });
	      } 
  		} catch(e) {
  			console.log('error in setAndroidId',e);
  			res.json({error : "Enable to set DeviceId & Type."});
  		}
  	});
}
/*Pradeep - Android push notification*/


/**
*  @Function name : getRooms
*  @Purpose : To get rooms according to corporate bussiness type
*  @Request params : cid : corporateId
*  @Response Object : Success - data : options Failure - data : []
*  @Author : "Prateek"
*/
export function getRooms(req, res){
	let options = [['', 'select_room']];
	var roomUsers = {};
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.params.cid) {
      	let query = Room.find({ corporateId : req.params.cid });
      	query.populate('users', 'firstname lastname role')
      	.exec( function(error, response) {
					// console.log("response === ",response);

					// set options based on rooms present under corporate Id.
					if (response) {
						_.forIn(response, function(value, key) {
							options.push([value._id, value.roomName]);
							roomUsers[value._id] = value.users;
						})
            res.json({ data : options, usersData : roomUsers});
					}					
				});
      } else res.json({data : options, usersData : roomUsers});
    } catch(e) {
      console.log("error in getRooms",e);
      res.json({data : options});
    }
  });
}


