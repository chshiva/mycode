/** 
* @Author: "Najib Hasnain",
* @Purpose: "Methods under this file handle user's requests under "Add participants" module and generate appropriate response such as students list based on search criteria, adding, deleting and updating students or group. Methods receive user information and related requseted data in request object. Post validating user, who initiated the request and his/her role, methods return appropriate response with data/success message/error message based on query's call back response."
*/

import Users from '../models/users';
import ParticipantsGroup from '../models/participantsgroup';
import { Roles } from './admin.user.controller';
var _ = require('lodash');
var mongoose = require('mongoose');
var validator = require('validator');
var moment = require('moment');
import { checkValidRequest } from '../authorization';
import {addSlash} from '../controllers/slashesActions';

/**
* @Function Name: "searchGroupStudents",
* @Purpose: "Returns students/participants list based on user's search criteria",
* @Request Object: searchData : { input : e.target.value, uid : uid },
* @Response Object: Success- students/participants list Data, Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function searchGroupStudents(req, res) {

	// Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query.input) {
    		let selector = {};

    		//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
				
				//Search selector based on user role
        if(person.role == Roles.Lmsadmin ||  person.role == Roles.Instructor){
          selector = { 
          	_id : { $ne : person._id }, 
          	"profile.companyid" : bussinessID          	 
          };
        }

        //If searchKeyword is not empty then create RegExp
        if(req.query.input && req.query.input.trim() != '') {
        	let search = addSlash(req.query.input.trim());
          var searchKey = RegExp(search,'i');                           
          selector['$or'] = [                
            { 'firstname' : {$regex: searchKey} },
            { 'lastname' : {$regex: searchKey} },
            { 'email' : {$regex: searchKey} },
          ]; 
        }
        selector['userStatus'] = 'Active';
        selector['guest'] = false;
        selector['role'] = Roles.Student; 
        //Query for fetching complete user data based on selector and skip items based on itemsPerPage on previous page
				let fetchquery = Users.find(selector)
					.select('firstname lastname email profile.profileImage role')	
					;
					//let t1 = new Date();
				fetchquery.exec(function(error, result){
					if(error) {
					  console.log(error); 
					  res.json({ 
							status: false,										 
							error: error
						});	 
					} else {
						//console.log("controller result", result);
						// let t2 = new Date();
						// console.log("time: " + (t2 - t1) + "ms");
						res.json({ 
							status: true,										 
							data: result
						});						
					}
				});
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("e in listPackage === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

/**
* @Function Name: "saveStudentsGroup",
* @Purpose: "Save/update participants group. Method receives students Ids and group name in requested object and save in collection after validation.",
* @Request Object: data : { uid : uid, groupName : groupName ,studentIdArray : studentIdArray },
* @Response Object: Success- Success message , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function saveStudentsGroup(req, res) {
	//console.log("request data", req.body.data);
	
	var reqObj = req.body.data;
	//Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
  	//console.log("person details", person);
    try{
      if ( person != null || req.body.data ) {

      	//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
					
				// query checks if group name exists under same company Id
				ParticipantsGroup.findOne({groupName : reqObj.groupName}, {companyid:bussinessID}, function(groupErr, group) {
					if(groupErr) {
						//console.log("groupErr", personErr);
						res.json({status: false, error: "Invalid Data" });
					} else if(group) {
							res.json({status: false, error: "Group name already exits" });
					} else {
						//console.log("request object", reqObj);
						//console.log("student array in save", reqObj.studentIdArray);
						reqObj['participants'] = reqObj.studentIdArray;
						reqObj['createdOn'] = moment().utc().toDate();
            reqObj['createdBy'] = person._id;
            reqObj['companyid'] = bussinessID;
            var studentsObj = new ParticipantsGroup(reqObj);
            //console.log("server obj", reqObj);
						studentsObj.save(function(err, saved) {
							if(err) {
								//console.log("error while saving student data", err);
								res.json({status: false, error: err});
							} else if(saved) {
								var obj = {
									companyid : bussinessID,
									role : person.role,
									itemsPerPage : 5,
									currentPage : 1
								}

								//After saving data, a call back function request the updated list of students
								getParticipantsList(obj, function(err, result, count) {
									if(err) {
										res.json({status: false, error: err});
									} else if (result) {
										//console.log("stu result data", result);
										res.json({
											status : true,
											message : "Group saved successfully",
											data : result,
											count: count
										});
									} else {
										res.json({status: false, error: "Internal server error"});
									}
								})	
							} else {
								res.json({status: false});
							}
						})                
					}
				})						
	 		} else res.json({
	 			status : false,
	 			error : "Invalid request."
	 		});
    } catch(e){
      //console.log("e in listPackage === ",e);
      res.json({
      	status : false,
      	error : "Internal server error."
      });
    }
  });
}


/**
* @Function Name: "updateStudentsGroup",
* @Purpose: "Save/update participants group. Method receives students Ids and group name in requested object and save in collection after validation.",
* @Request Object: data : { uid : uid, groupName : groupName ,studentIdArray : studentIdArray },
* @Response Object: Success- Success message , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function updateStudentsGroup(req, res) {
	//console.log("my users server params = ", req.params.id);
				
	//Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
  	//console.log("person details", person);
    try{
      if ( person != null && req.body.data && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {					
      	var id = req.params.id;
      	var reqObj = req.body.data;
      	//console.log("req data", req.body.data)

				//Query checks group Id already present in the collection, returns document if present.
				ParticipantsGroup.findOne({_id : {$ne : mongoose.Types.ObjectId(id) }}, function(groupErr, group) {
					if (groupErr) {
						res.json({
							status: false,
							error: "Invalid Data"
						});
					} else {	

					//if student array has data it insert ids in participants array in collection											
						if (reqObj.studentIdArray && reqObj.studentIdArray.length>0) {
							//console.log("Inside push query");
							var query =  ParticipantsGroup.update({_id : mongoose.Types.ObjectId(id)}, {$push : {participants :{$each : reqObj.studentIdArray }}});
						} else {
							var query =  ParticipantsGroup.update({_id : mongoose.Types.ObjectId(id)}, {$set : {participants : reqObj.studentIdArray}});
						}	
						//console.log("reqObj.studentIdArray", reqObj.studentIdArray);
						query.exec(function(err, saved) {
						if (err) {
							res.json({
								status: false,
								error: err
							});
						} else if (saved) {
							getStudentRecords(id, function(err, result) {
								if (err) {
									res.json({status: false, error: err});
								} else if (result) {
									//console.log("stu result data", result);
									res.json({
										status : true,
										message : "Group updated successfully", 
										data : result
									});
								}
							})
						}
						});										
					}
				})
			} else res.json({status : false, error : "Invalid request."});
    } catch(e){
      //console.log("e in listPackage === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });	
}

/**
* @Function Name: "getParticipantsList",
* @Purpose: "Returns participants list based on object data it receives as parameter",
* @Request Object: data : { companyid : person.profile.companyid, role : person.role, itemsPerPage : 5, currentPage : 1 },
* @Response Object: Success- result, count , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function getParticipantsList(obj, cb) {
	if(obj!=null) {
		var selector = null;
		if (obj.role == Roles.Superadmin) {
			selector = {};

			//condition checks for allowed roles
		} else if (obj.role == Roles.Lmsadmin || obj.role == Roles.Instructor || obj.role == Roles.Presenteradmin || obj.role == Roles.Presenter) {
			selector = {companyid : obj.companyid};
		}

		// query selects group data from participants collection and user data from users table
		if (selector != null) {
			var query = ParticipantsGroup.find(selector)
				.limit(obj.itemsPerPage)
				.select('groupName createdBy participants')
				.populate('createdBy', 'firstname lastname')
				.skip(obj.itemsPerPage * (obj.currentPage-1))
        .sort({
          createdOn: -1
        });
      if (query) {
      	query.exec(function(err, result) {
      		if (err) {
      			cb(err, null);
      		} else if (result) {
      			ParticipantsGroup.count(selector).exec(function(error, count) {
      				cb(null, result, count);	
      			})	          			
      		}
      	})
      }
    }
	}
}

/**
* @Function Name: "listStudentsGroup",
* @Purpose: "Returns participants list based on object data it receives as request",
* @Request Object: data : { companyid : person.profile.companyid, role : person.role, itemsPerPage : 5, currentPage : 1 },
* @Response Object: Success- result, count , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function listStudentsGroup(req, res) {
	//console.log("my users server params = ", req.query);
				
	//Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
  	//console.log("person details", person);
    try{
      if ( person != null && req.query.itemsPerPage && req.query.currentPage ){
				var itemsPerPage = 	req.query.itemsPerPage;
				var currentPage = 	req.query.currentPage;
				var selector = null;

				//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }

				// Condition checks user role and assign selector based on role 
				if (person.role == Roles.Superadmin) {
					selector = {};
				} else if (person.role == Roles.Lmsadmin || person.role == Roles.Instructor || person.role == Roles.Presenteradmin || person.role == Roles.Presenter) {
					selector = {companyid : bussinessID};
				}	

				//If searchKeyword is not empty then create RegExp
        if (req.query.search && req.query.search != '') {
        	let slash_search = addSlash(req.query.search);
          var searchKey = RegExp(req.query.search, 'i');         
          selector =  { 
          	'groupName' : {
          		$regex: searchKey
          	} 
          }         
        } 

				if (selector != null) {

					//query returns group name and name of user who created the group
					var query = ParticipantsGroup.find(selector)
						.limit(Number(itemsPerPage))
						.select('groupName createdBy participants')
						.populate('createdBy', 'firstname lastname')
						.populate('participants',  'firstname',  { userStatus: "Active", role : Roles.Student})
						.skip(Number(itemsPerPage) * (Number(currentPage)-1))
            .sort({
              createdOn: -1
            });
        	query.exec(function(err, result) {
        		if (err) {
        			res.json({
        				status : false,
        				error : err
        			});
        		} else if (result) {

        			//query returns number of group counts under a company Id
        			ParticipantsGroup.count(selector).exec(function(error, count) {
        				
        				//Success response with list data and count
        				res.json({
        					status : true,
        					data : result, 
        					count: count
        				});	
        			})	          			
        		}
        	});
        } else {
        	res.json({
        		status : false,
        		error : "Access denied"
        	});		
        }			
			} else res.json({status : false, error : "Invalid request."});
    } catch(e){
      //console.log("e in listPackage === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });				
}

/**
* @Function Name: "fetchGroupStudents",
* @Purpose: "Fetch group details based on requested uid",
* @Request Object: data : { uid : uid },
* @Response Object: Success- result, count , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function fetchGroupStudents(req, res) {
	 //console.log("requested body", req.query);
	 
	//Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
  	//console.log("person details", person);
    try{
      if ( person != null && req.query.id && mongoose.Types.ObjectId.isValid(req.query.id)) {
      	var id = req.query.id;
      	var searchedData = [];

				// query selects group data from participants collection and user data from users table
				var query = ParticipantsGroup.findOne({_id : mongoose.Types.ObjectId(id)})
				.select('groupName participants createdBy')
				.populate('participants',  'firstname lastname email profile.profileImage',  { userStatus: "Active", role : Roles.Student})
				.populate('createdBy', 'firstname lastname email profile.profileImage')
				.sort({
					createdOn: -1
        });
				query.exec(function(err, result) {
					if (err) {
						res.json({status : false, error : err});
					} else if (result) {
						if (req.query.search && req.query.search != '') {
							let slash_search = addSlash(req.query.search);
							let searchKey = RegExp(slash_search, 'i');
							_.forEach(result.participants, function(participantsData){
								if(searchKey.test(participantsData.firstname) || searchKey.test(participantsData.lastname) || searchKey.test(participantsData.email)) {
									searchedData.push(participantsData)
								} else {

								}
							});

							if(searchedData && searchedData.length <= 0){
								
								//Code changed by - Najib, Desc - Setting participants data to null incase no search data based on search string
								result['participants'] = null;								
								res.json({
									status : true, 
									data : result 
								});
							} else {
								result['participants'] = searchedData;						
								res.json({
									status : true, 
									data : result
								});
							}
						} else {
							//successfull response						
							res.json({
								status : true, 
								data : result 
							});
						}
					} else {
						res.json({status : false, error : "Internal server error."});
					}
				});
			} else res.json({status : false, error : "Invalid request."});
    } catch(e){
      //console.log("e in listPackage === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });				
}
// /**
// * @Function Name: "editStudentsGroup",
// * @Purpose: "Update the group name based on request data group Id and group name ",
// * @Request Object: data : { uid : uid, groupName : groupName },
// * @Response Object: Success- result, count , Failure- Error message,
// * @Author: "Najib Hasnain"
// */

// export function editStudentsGroup(req, res) {
// 	if (!req.body.data) {
// 		res.json({
// 			status: false,
// 			error: "Invalid Request"
// 		});
// 	} else {
// 		var reqObj = req.body.data;
// 		// check if query is null or empty and uid is of type mongoose
// 		if (!reqObj.uid || validator.isEmpty(reqObj.uid) || !mongoose.Types.ObjectId.isValid(reqObj.uid)) {
// 			res.json({status: false, error: "Invalid User"});
// 		} else if (!reqObj.groupName) {
// 			res.json({
// 				status: false, 
// 				error: "Please provide a group name"
// 			});
// 		} else {
// 			let uid = mongoose.Types.ObjectId(reqObj.uid);

// 			//query to check user uid and user role in allowed role 
// 			Users.findOne({_id : reqObj.uid, role : {$in : [Roles.Lmsadmin, Roles.Instructor, Roles.Presenteradmin, Roles.Presenter]}}, function(personErr, person) {
// 				if(personErr) {
// 					res.json({
// 						status: false,
// 						error: "Invalid User"
// 					});
// 				} else if (person) {
// 					if (reqObj._id) {

// 						//query to check if group id already present in collection
// 						ParticipantsGroup.findOne({_id : {$ne : mongoose.Types.ObjectId(reqObj._id) }}, {groupName : reqObj.groupName}, function (groupErr, group) {
// 							if (groupErr) {
// 								res.json({
// 									status: false,
// 									error: "Invalid Data"
// 								});
// 							} else if (group) {
// 								res.json({
// 									status: false, 
// 									error: "Group name already exits"
// 								});
// 							} else {
// 								reqObj['modifiedOn'] = moment().utc().toDate();
// 								var stuObj = new ParticipantsGroup(reqObj);

// 								//query to update group name 									 
// 								studentsObj.update({_id : mongoose.Types.ObjectId.isValid(reqObj._id)}, {$set : {groupName : reqObj.groupName}}, function(err, saved) {
// 									if (err) {
// 										res.json({
// 											status: false, 
// 											error: err
// 										});
// 									} else if(saved) {

// 										//successfull response
// 										res.json({
// 											status : true, 
// 											message : "Group updated successfully"
// 										});
// 									}
// 								});
// 							}
// 						})
// 					} else {

// 						//error response if group Id does not match with participant Id
// 						res.json({
// 							status : false, 
// 							error : "Invalid group"
// 						})
// 					}
// 				} else {

// 					//error response if user Id does not match with users Id
// 					res.json({
// 						status : false, 
// 						error : "Access Denied"
// 					})
// 				}
// 			})
// 		}		
// 	}
// }

// /**
// * @Function Name: "addStudentsInGroup",
// * @Purpose: "Add student in group after creating it based on req obj data that contain user ID and student array",
// * @Request Object: data : { uid : uid, groupName : groupName },
// * @Response Object: Success- result, count , Failure- Error message,
// * @Author: "Najib Hasnain"
// */

// export function addStudentsInGroup(req, res) {
// 	console.log("Inside add student In group", req.body.data)
// 	if (!req.body.data) {
// 		res.json({
// 			status: false,
// 			error: "Invalid Request"
// 		});
// 	} else {
// 		var reqObj = req.body.data;
// 		if(!reqObj.uid || validator.isEmpty(reqObj.uid) || !mongoose.Types.ObjectId.isValid(reqObj.uid)) {
// 			res.json({
// 				status: false,
// 				error: "Invalid User"
// 			});
// 		} else {
// 			//console.log("Inside else function");
// 			let uid = mongoose.Types.ObjectId(reqObj.uid);

// 			//query to check user uid and user role in allowed role 
// 			Users.findOne({_id : reqObj.uid, role : {$in : [Roles.Lmsadmin, Roles.Instructor, Roles.Presenteradmin, Roles.Presenter]}}, function(personErr, person) {
// 				if (personErr) {
// 					res.json({
// 						status: false,
// 						error: "Invalid User"
// 					});
// 				} else if (person) {
// 					if (reqObj._id) {
// 						console.log("Inside reqObj");

// 						//check if group Id matches with request obj Id
// 						ParticipantsGroup.findOne({_id : {$ne : mongoose.Types.ObjectId(reqObj._id) }}, function(groupErr, group) {
// 							if (groupErr) {
// 								res.json({
// 									status: false,
// 									error: "Invalid Data"
// 								});
// 							} else {
// 								reqObj['modifiedOn'] = moment().utc().toDate();
// 								var stuObj = new ParticipantsGroup(reqObj);	

// 								//Add participants in group									 
// 								studentsObj.update({_id : mongoose.Types.ObjectId(reqObj._id)}, {$set : {participants : reqObj.participants}}, function(err, saved) {
// 									if (err) {
// 										//console.log("error while saving", err.message);
// 										res.json({
// 											status: false,
// 											error: err
// 										});
// 									} else if (saved) {
// 										//console.log("saved Successfully");

// 										//sucessfull response
// 										res.json({
// 											status : true,
// 											message : "Successfully Added"
// 										});
// 									}
// 								});
// 							}
// 						})

// 					//response if group id does not match with collection ids	
// 					} else {
// 						res.json({status : false, error : "Invalid group"})
// 					}

// 				//respose if user Id does not match with user collection Id	
// 				} else {
// 					res.json({status : false, error : "Access Denied"})
// 				}
// 			})
// 		}		
// 	}
// }

/**
* @Function Name: "deleteStudentsGroup",
* @Purpose: "Delete students group based on user ID and group Id",
* @Request Object: data : { uid : uid, groupName : groupName },
* @Response Object: Success- result, count , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function deleteStudentsGroup(req, res) {
		//console.log("my users server params = ", req.params.id);
				
	//Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
  	//console.log("person details", person);
    try{
      if ( person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
      	var id = req.params.id;
      	
				//query to check group Id in the collection
				ParticipantsGroup.findOne({_id : mongoose.Types.ObjectId(id) }, function(groupErr, group) {
					if (groupErr) {
						//console.log("groupErr", groupErr);
						res.json({
							status: false,
							error: "Invalid Data"
						});
					} else if (group) {			

						//remove group from collection based on request obj Id			 
						ParticipantsGroup.remove({_id : mongoose.Types.ObjectId(id)}, function(err, saved) {
							if (err) {
								//console.log("Err", err);
								res.json({
									status: false,
									error: err
								});
							} else if(saved) {

								//sucessfull response
								res.json({
									status : true,
									message : "Group deleted successfully"
								});
							}
						});
					} else {
						res.json({
							status: false,
							error: "Invalid Group"
						});
					}
				})
			} else res.json({status : false, error : "Invalid request."});
    } catch(e) {
      //console.log("e in listPackage === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });					
}

/**
* @Function Name: "deleteStudentInGroup",
* @Purpose: "Delete individual student from group based on student Id received in request object",
* @Request Object: data : { uid : uid, _id : studentId },
* @Response Object: Success- result, count , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function deleteStudentInGroup(req, res) {
		//console.log("my users server params = ", req.query.id);
				
	//Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
  	//console.log("person details", person);
    try{
      if ( person != null && req.query.id && mongoose.Types.ObjectId.isValid(req.query.id) && req.query.sid && mongoose.Types.ObjectId.isValid(req.query.sid)) {
      	var id = req.query.id;
      	var sid = req.query.sid;
      	//console.log("req.query.sid", req.query.sid);

				//query checks if id is present in the student group collection
				ParticipantsGroup.findOne({_id :  mongoose.Types.ObjectId(id) }, function (groupErr, group) {
					if (groupErr) {
						res.json({
							status: false,
							error: "Invalid Data"
						});
					} else {		

					//query checks if id is present in the student group collection	 
						ParticipantsGroup.update({_id : mongoose.Types.ObjectId(id)}, {$pull : {participants : {$in : [mongoose.Types.ObjectId(sid)]}}}, function(error, saved) {
							if (error) {
								res.json({
									status: false, 
									error: error
								});
							} else if(saved) {

								//call back function to update student under a participants group
								getStudentRecords(id, function(err, result) {
									if(err) {
										res.json({
											status: false, 
											error: err
										});
									} else if(result) {
										//console.log("stu result data", result);

										//sucessfull response
										res.json({
											status : true, 
											message : "Successfully Removed", 
											data : result
										});
									}
								})												
							}
						});
					}
				})
			} else res.json({status : false, error : "Invalid request."});
    } catch(e) {
      console.log("e in deleteStudentInGroup === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });	
}

/**
* @Function Name: "getStudentRecords",
* @Purpose: "Function to get updated student list based on group ID received as parameter",
* @Request Object: data : { id, callback },
* @Response Object: Success- result, count , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function getStudentRecords(id, cb) {
	try {
		//console.log("inside student call back function1", id);
		if ( id && id!='' ) {
			//console.log("inside student call back function2", id);

			//get the students list based on group Id
			var query = ParticipantsGroup.findOne({_id : mongoose.Types.ObjectId(id)})
			.select('groupName participants createdBy')
			.populate('participants', 'firstname lastname email profile.profileImage', { userStatus: "Active", role : Roles.Student})
			.populate('createdBy', 'firstname lastname email profile.profileImage');
			query.exec(function(err, result) {
				if(err) {
					//console.log("err--", err);
					cb(err, null );
				} else if (result){
					//console.log("result:", result);

					//call back response as result
					cb(null, result);					
				} else {
					cb("Invalid Group", null);
				}
			});
		}
	} catch(e) {
		console.log('error in getStudentRecords ',e);
		cb('Internal server error', null);
	}
}

/**
* @Function Name: "updateGroupName",
* @Purpose: "Update group name based on group Id and new group name",
* @Request Object: data : { uid : uid, groupName : groupName },
* @Response Object: Success- Message, data , count , Failure- Error message,
* @Author: "Najib Hasnain"
*/

export function updateGroupName(req, res) {
	//console.log("inside save groupName", req.body.data.groupName);
	
	//Varifying request is valid or not
  checkValidRequest(req.headers, function(person)	{
  	//console.log("person details", person);
    try {
    	
      if ( person != null && req.body.data && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
      	var id = req.params.id;
      	var groupName = req.body.data.groupName;
      	//console.log("inside if condition", id);

				//check if group Id is present in the participants collection
				ParticipantsGroup.findOne({_id : mongoose.Types.ObjectId(id)},function(groupErr, group) {
					if ( groupErr ) {

						//console.log("groupErr", groupErr)
						res.json({status : false, error : groupErr});
					} else if (group) {
						ParticipantsGroup.findOne({groupName : groupName}, function(grNameErr, grName) {
							if(grNameErr) {
								res.json({ status : false, error : grNameErr });
							} else if (grName != null) {
								res.json({ status : false, error : "Group name already exists"});	
							} else if (grName == null) {
								//update student group name based on id received in req object
								ParticipantsGroup.update({_id : mongoose.Types.ObjectId(id)}, {$set : {groupName : groupName}}, function(saveErr, save) {
									if (saveErr) {

										//console.log("saveErr", saveErr)
										res.json({status : false, error : saveErr});
									} else if (save) {
										getStudentRecords(id, function(err, result) {
											if (err) {
												//console.log("err", err)
												res.json({status: false, error: err});
											} else if (result) {
												//console.log("stu result data", result);

												//sucessfull response
												res.json({status : true, message : "Updated successfully", data : result});
											}
										})
									}
								})
							}
						});
					} else {
						res.json({status : false, error : "Invalid Group"});
					}
				});

				// response if group Id does not match with participants collection ID	
			} else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("e in updateGroupName === ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });	
}