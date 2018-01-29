var moment = require('moment');
var mongoose = require('mongoose');
var _ = require('lodash');

import Broadcast from '../models/broadcast';
import Room from '../models/room';
import Student from '../models/students';
import {Roles} from './admin.user.controller';
import Users from '../models/users';

import { checkValidRequest } from '../authorization';


/**
* @Function Name: "createHandraise",
* @Purpose: "To create new package.",
* @Request Object: data : { question, roomKey },
* @Response Object: Success- {status : true, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function createBroadcast(req, res){
	try {

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.body.data){
	        let obj = req.body.data;

	        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
	        let bussinessID = null;
					if(person.profile.companyid && person.profile.companyid._id) {
						bussinessID = person.profile.companyid._id;
					}	        
	       	obj['companyid'] = bussinessID;
          obj["author"] = person._id;

          //code changed by - Najib, Added extra field to to keep ids of users who posts news
          obj["status"] = [person._id];
          obj["createdAt"] = moment().utc().toDate();
          obj["modifiedAt"] = moment().utc().toDate();

          //console.log("broad Obj", obj);

          // create new Broadcast 
          var objEntity = new Broadcast(obj);
          objEntity.save(function (err, doc) {
            if (err) {
              console.log("err === ",err);
              res.json({ status : false, error : err });
            } else if (doc) res.json({ status : true, message : "Broadcasted successfully"}); 
            else res.json({ status : false, error : "Internal server error."});
          });	         
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("error in createBroadcast inner",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e) {
    console.log("error in createBroadcast", e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
* @Function Name: "updateHandraise",
* @Purpose: "To create new package.",
* @Request Object: params : id, data : { question, roomKey },
* @Response Object: Success- {status : true, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function updateBroadcast(req, res){
	try {

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try {
	      if (person != null && req.body.data && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)){
	        let obj = req.body.data;
          let recordId = mongoose.Types.ObjectId(req.params.id);

          // check valid Broadcast or not
          let handQuery = Broadcast.findOne({ _id : recordId });
          handQuery.exec( function(broadcasterr, broadcast){
            if (broadcasterr) {
              console.log("handerr ==== ",broadcasterr);
              res.json({ status : false, error : broadcasterr });
            } else if (broadcast) {

            	// check created by current user or not
            	if(person._id.str == broadcast.author.str){
                obj['modifiedAt'] = moment().utc().toDate();
                
                Broadcast.update({ _id : recordId },{ $set : obj },{ runValidators: true },function (err, doc) {
                  if (err) res.json({ status : false, error : err });
                  else if(doc) res.json({ status : true, message: "Updated successfully" });
                  else res.json({ status : false, error : "Internal server error."});  
                });
              } else res.json({ status : false, error : "Access denied."});
            } else res.json({ status: false, error : "Invalid Broadcast."});
          });
	          
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e) {
		    console.log("error in updateHandraise ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e) {
    console.log("error in updateHandraise",e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
* @Function Name: "updateLikes",
* @Purpose: "To create new package.",
* @Request Object: params : id, data : { question, roomKey },
* @Response Object: Success- {status : true, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function updateLikes(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.body.data ){
	        let obj = req.body.data;
          let recordId = mongoose.Types.ObjectId(obj._id);

					Broadcast.find({
						"_id" : recordId,
						"likes.likedBy" : mongoose.Types.ObjectId(person._id)
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
							//console.log("doc---", doc);
							//Query for removing workplace data in user profile
							Broadcast.update({
								"_id" : recordId,
								"likes.likedBy" : mongoose.Types.ObjectId(person._id)
							},{
								$pull:{
									likes: {
										_id : 'doc.likes._id'
									}
								}
							}, {
								upsert: true
							},function(err, result) {
								if(err) {
									console.log(err)
			            res.json({
				            status: false,
				            error: 'Unlike failed'
				          });
			      		} else {
			      			// console.log("result", result)
			      			res.json({
				            status: true,
				            success: 'liked successfully'
				          });
			      		}
			      	});
						} else {
							var newObj = '';
		          newObj['likedBy'] = person._id;
		          newObj['likedAt'] = moment().utc().toDate();

		          //if array has data then add in existing array 
		          if (broadcast && broadcast.likes && broadcast.likes.length > 0) {
		            updateQuery = Broadcast.update({ _id : recordId  }, {$push : { likes : newObj} },{ runValidators: true });
		          } else {
		            updateQuery = Broadcast.update({ _id : recordId }, {$set : { likes : [newObj]} },{ runValidators: true });
		          }
		          if (updateQuery != null){
		            updateQuery.exec( function(err, doc){
		              if (err) res.json({ status : false, error : err });
		              else if (doc) {
		                
		                // updated succesfully
		                res.json({ status : true });
		              } else res({ status : false, error : "Internal server error, Please try again."});
		            });
		          } else res.json({ status : false, error : "Internal server error." });	
						}
					});
	          
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("error in updateLikes",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in updateLikes",e);
    res.json({status : false, error : "Internal server error."});
  }
}


/**
*  @Function name : fetchHandraiseData
*  @Purpose : Fetch the list of questions with auther name
*  @Request Object : params : { key: 'room key', limit: 'count'}
*  @Response Object : Success - Success message, List data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function fetchBroadcastData(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.limit) {	  

	      	//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
	      	let bussinessID = null;
					if(person.profile.companyid && person.profile.companyid._id) {
						bussinessID = person.profile.companyid._id;
					}

          //handraise list object
          let objEntity = {		
          	companyid : bussinessID,
          	role : person.role,           
            limit : Number(req.params.limit),
            id : person._id
          }

          //function with object and call back as its parameter to get question list
          fetchBroadcastNews(objEntity, function(getError, getData, count) {
          	// console.log("error", getError);
          	// console.log("getData", getData);
            if (getError == null) {

              //successfull response if error is null
              res.json({ status : true, data : getData, count : count });
            } else {

              //failed response if call back returns any query error
              res.json ({ status : false, error: getError });
            }
          });
		        
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in fetchHandraiseData inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("eror in fetchHandraiseData",e);
    res.json({status : false, error : "Internal server error."});
  }
} 

/**
*  @Function name : deleteBroadcast
*  @Purpose : Function deletes question based on rocordId
*  @Request Object : param : { id: 'Broadcast Id' }
*  @Response Object : Success - Message, Failure - Error message
*  @Author : Najib Hasnain
*/
export function deleteBroadcast(req, res) {
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)){
	      	let recordId = mongoose.Types.ObjectId(req.params.id);

		      //check for user Id in collection
		      let handQuery = Broadcast.findOne({ _id : recordId });
		      handQuery.exec( function(broadcasterr, broadcast){
		        if (broadcasterr) res.json ({ status : false, error : "Invalid Question." });
		        else if(broadcast) {
		        	if (broadcast.author.str == person._id.str) {

		            //remove question from colletion based on recordId
		            let removeQuery = Broadcast.remove({ _id : recordId });
		            removeQuery.exec( function(err, doc){
		              if (err) res.json({ status : false, error : err });
		              else {

		              	//successfull resposne
		                res.json({ status : true });
		              }
		            });
		        	} else res.json({status : false, error : "Access denied."});
		        } else res.json({ status : false, error : "Invalid Broadcast."});
		      });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in deleteBroadcast inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in deleteBroadcast",e);
    res.json({status : false, error : "Internal server error."});
  }
}


/**
*  @Function name : saveBroadcastComment
*  @Purpose : Function saves the answer against a question
*  @Request Object : params : {id}, data : { }
*  @Response Object : Success - data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function saveBroadcastComment(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
	      	let recordId = mongoose.Types.ObjectId(req.params.id);

	      	//query to validate Id
		      let handQuery = Broadcast.findOne({ _id : recordId });
		      handQuery.exec( function(handerr, broadcast){
		        if (handerr) res.json({ status : false, error : "Invalid Question." });
		        else if (broadcast) {
		          let updateQuery = null;
		          let obj = req.body.data;
		          obj['author'] = person._id;
		          obj['commentAt'] = moment().utc().toDate();

		          //if array has data then add in existing array 
		          if (broadcast.comments && broadcast.comments.length > 0) {
		            updateQuery = Broadcast.update({ _id : recordId }, {$push : { comments : obj} },{ runValidators: true });
		          } else {
		            updateQuery = Broadcast.update({ _id : recordId }, {$set : { comments : [obj]} },{ runValidators: true });
		          }
		          if (updateQuery != null){
		            updateQuery.exec( function(err, doc){
		              if (err) res.json({ status : false, error : err });
		              else if (doc) {
		                
		                // updated succesfully
		                res.json({ status : true });
		              } else res({ status : false, error : "Internal server error, Please try again."});
		            });
		          } else res.json({ status : false, error : "Internal server error." });
		        } else res.json({ status : false, error : "Invalid Broadcast."});
		      });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in saveBroadcastAnswer inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in saveBroadcastAnswer",e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
*  @Function name : getComments
*  @Purpose : Fetch the answers based on Broadcast Id and count of answers
*  @Request Object : data : { _Id: 'Broadcast Id', limit: no of answers}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function getComments(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id) && req.params.limit){
	      	let obj = {
	      		_id : req.params.id,
	      		limit : Number(req.params.limit)
	      	};

			    // a function send an obj and callback as its parameters to get answers data
			    fetchComments(obj, function(geterr, getdata, count){
			      if (getdata) {
			        
			        // response data
			        res.json({ status : true, data : getdata, count : count });
			      } else res.json({ status : false, error : "Invalid request." });
			    });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in getAnswers inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in getAnswers",e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
*  @Function name : saveReply
*  @Purpose : Function saves reply on answers as per "replyOn" Id
*  @Request Object : params : id, data : { comment:'comment on answer', replyOn : 'answer Id'}
*  @Response Object : Success - Message, Failure - Error message
*  @Author : Najib Hasnain
*/
export function saveReply (req, res) {
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
	      	let recordId = mongoose.Types.ObjectId(req.params.id);
	      	let obj = req.body.data;
	      	obj['author'] = person._id;
	      	obj['replyAt'] = moment().utc().toDate();
	      	//query to validate Id
		      let handQuery = Broadcast.findOne({ _id : recordId });
		      handQuery.exec( function(broaderr, broadcast){
		        if (broaderr) res.json({ status : false, error : "Invalid broadcast." });
		        else if (broadcast) {
		        	let updateQuery = null;

		          //if array has value then add in the array
		          if (broadcast.replies && broadcast.replies.length > 0) {
		            updateQuery = Broadcast.update({ _id : recordId }, { $push: { replies : obj }}, { runValidators : true });
		          } else {
		            updateQuery = Broadcast.update({ _id : recordId }, { $set: { replies : [obj] }}, { runValidators : true });             
		          }
		          updateQuery.exec(function(err, doc) {
	              if (err) {
	                res.json({ status: false, error : err })
	              } else { 
	                
	                //successfull response
	                res.json({ status : true });
	              }
	            });
		        } else res.json({ status : false, error : "Invalid Broadcast."});
		      });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in saveReply inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in saveReply",e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
*  @Function name : getReplies
*  @Purpose : Fetch replies on particular answer
*  @Request Object : data : { _Id: 'Broadcast Id', comment:'comment on answer' author : 'user Id', replyOn : 'answer Id'}
*  @Response Object : Success - Message, Failure - Error message
*  @Author : Najib Hasnain
*/
export function getReplies(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id) && req.params.replyOn && mongoose.Types.ObjectId.isValid(req.params.replyOn)){
	      	let obj = {
	      		_id : req.params.id,
	      		replyOn : req.params.replyOn
	      	};

	      	//inner function to get replies and count as callback params 
			    fetchReplies(obj, function(geterr, getdata, count){
			      if (getdata) {

			        //response data
			        res.json({ status : true, data : getdata, count : count });
			      } else res.json({ status : false, error : "Invalid request." });
			    });
	 			} else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in getReplies inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in getReplies",e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
* @Function Name: "broadcastNotifications",
* @Purpose: "To get the broadcast notitfication post posting news.",
* @Request Object: {},
* @Response Object: Success- {status : true, total, notifications }, Failure- {status : false, error},
* @Author: "Najib Hasnain"
*/
export function broadcastNotifications(req, res){

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null) {
      	if(person.contacts){

      		//code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
					let bussinessID = null;
					if(person.profile.companyid && person.profile.companyid._id) {
						bussinessID = person.profile.companyid._id;
					}

      		// fetch unread message records
      		let query = Broadcast.find({ companyid : mongoose.Types.ObjectId(bussinessID) , status : {$nin : [person._id]}});
					query.exec( function(error, result){
						// console.log("result === ",result);
						if (error) {
							console.log("error in broadcastNotifications === ",error);
							res.json({ status : true, total : 0, notifications : {} });
						} else if (result && result.length > 0) {
							
							let total = 0;

							// individual count and total calcutations
							let response = _.countBy(result, function(broadcast) { return broadcast.author;});
							_.each(response, function(count){
								total += count;
							});
							res.json({ status : true, total : total, notifications : response });
						} else res.json({ status : true, total : 0, notifications : {} });
					});
      	} else res.json({ status : true, total : 0, notifications : {} });
      } else res.json({status : true, total : 0, notifications : {}});
    } catch(e){
      console.log("error in broadcastNotifications",e);
      res.json({status : true, total : 0, notifications : {}});
    }
  });
} 

/**
* @Function Name: "updateUserStatus",
* @Purpose: "Check if broadcast is viewed by user",
* @Request Object: {},
* @Response Object: Success- {status : true, total, notifications }, Failure- {status : false, error},
* @Author: "Najib Hasnain"
*/ 

export function updateUserStatus(req, res) {
	try{
    // Varifying request is valid or not
    console.log("in user status");
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null ){
	      	// update the status as read
        	Broadcast.update({ status : {$nin : [person._id]}}, {$push : {status : person._id}}, {multi : true}).exec(function(updateerr, updated){
        		if(updateerr) {
        			/*console.log("updateerr === ", updateerr);
        						console.log("updated === ",updateerr);*/

        			console.log("updated === ",updateerr.message);
        		} else {
        			console.log("pushed into array");
        			 res.json({ status : true, data : []});		
        		}       						
        	});
        } else {
        	console.log("not pushed into array");
        	res.json({ status : true, data : []});}
    	} catch(e){
		    console.log("e in getReplies inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in getReplies",e);
    res.json({status : false, error : "Internal server error."});
  }  	
}


/*-------------------------- callback functions -------------------------*/

/**
*  @Function name : fetchBroadcastNews
*  @Purpose : Fetch the question based on Id
*  @Request Object : data : { companyid: 'company Id', limit: 'no of questions'}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function fetchBroadcastNews(obj, cb) {
	try{
	  let c = 0;	  

	  if(obj.role == Roles.Superadmin ){
	  	//based on room Id author info gets populated
	  	let selector = {};
    	let query = Broadcast.find(selector)	    						
                					.populate('author', '_id firstname lastname profile.profileImage')
                					.sort({'createdAt': -1})
                					.limit(obj.limit);
    	query.lean().exec(function(err, doc) {
      	if (err) {
        	console.log("err ======= ",err);
        	cb(err, null, c);
      	} else {
      		//console.log("full fetch data",  doc);
        	//loop for submitted answers under questions 
        	_.each(doc, function(data) {
          	data['broadcount'] = data && data.comments ? data.comments.length : 0;
        	});	        

        	//count of questions
        	Broadcast.count(selector)
        					.exec(function(err, count){
          					delete doc['broadcast'];
          					//callback returning parameters
          					cb(null, doc, count);
        	});
      	} 
    	});
	  } else if(obj.role == Roles.Lmsadmin ){
	  	//based on room Id author info gets populated
	  	let selector = {
	  		companyid: obj.companyid
	  	}
    	let query = Broadcast.find(selector)	    						
                					.populate('author', '_id firstname lastname profile.profileImage')
                					.sort({'createdAt': -1})
                					.limit(obj.limit);
    	query.lean().exec(function(err, doc) {
      	if (err) {
        	console.log("err ======= ",err);
        	cb(err, null, c);
      	} else {
      		//console.log("full fetch data",  doc);
        	//loop for submitted answers under questions 
        	_.each(doc, function(data) {
          	data['broadcount'] = data && data.comments ? data.comments.length : 0;
        	});	        

        	//count of questions
        	Broadcast.count(selector)
        					.exec(function(err, count){
          					delete doc['broadcast'];
          					//callback returning parameters
          					cb(null, doc, count);
        	});
      	} 
    	});
	  } else if (obj.role == Roles.Instructor ) {
	  	//based on room Id author info gets populated
	  	let adminquery = Users.findOne({ "profile.companyid" : obj.companyid, role : Roles.Lmsadmin}).select('_id');
	  	adminquery.exec( function(error, admin){
	  		if (admin) {
	  			let selector = {
			  		author : {
			  			$in : [obj.id, admin._id]
			  		}
			  	}
	  			let query = Broadcast.find(selector)	
               .populate('author', '_id firstname lastname profile.profileImage')
                .sort({'createdAt': -1});
          query.lean().exec(function(err, doc) {
			      if (err) {
			        console.log("err ======= ",err);
			        cb(err, null, c);
			      } else {
			      	//console.log("full fetch data",  doc);
			        //loop for submitted answers under questions 
			        _.each(doc, function(data) {
          			data['broadcount'] = data && data.comments ? data.comments.length : 0;
        			});	        

        			//count of questions
        			Broadcast.count(selector).exec(function(err, count){
          			delete doc['broadcast'];

          			//callback returning parameters
          			cb(null, doc, count);
        			});
      			} 
    			});
	  		}
	  	});	    
	  } else if (obj.role == Roles.Student ) {

		  //let stuQuery = Student.findOne({ _id : {$in : } })
		  let stuQuery = Student.find({ students : {	$in : [obj.id]}}).select('instId');
		  stuQuery.exec(function(stuErr, students){
		  	if (stuErr) {
		  		cb(stuErr, null, c);
		  	} else if (students) {

		  		let adminquery = Users.findOne({ "profile.companyid" : obj.companyid, role : Roles.Lmsadmin}).select('_id');
			  	adminquery.exec( function(error, admin){
			  		if (admin) {
			  			let ids = [admin._id];
			  			_.each(students, function(student) {
			  				ids.push(student.instId);
			  			});
			  			let selector = {
					  		author : {
					  			$in : ids
					  		}
					  	}
			  			let query = Broadcast.find(selector)	
		               .populate('author', '_id firstname lastname profile.profileImage')
		                .sort({'createdAt': -1});
		          query.lean().exec(function(err, doc) {
					      if (err) {
					        console.log("err ======= ",err);
					        cb(err, null, c);
					      } else {
					      	//console.log("full fetch data",  doc);
					        //loop for submitted answers under questions 
					        _.each(doc, function(data) {
		          			data['broadcount'] = data && data.comments ? data.comments.length : 0;
		        			});	        

		        			//count of questions
		        			Broadcast.count(selector).exec(function(err, count){
		          			delete doc['broadcast'];

		          			//callback returning parameters
		          			cb(null, doc, count);
		        			});
		      			} 
		    			});
			  		}
			  	});
			  }
			});
	  } else if(obj.role == Roles.Admin || obj.role == Roles.Moderator || obj.role == Roles.User){
	  	//based on room Id author info gets populated
	  	let selector = {
	  		companyid: obj.companyid
	  	}
    	let query = Broadcast.find(selector)	    						
                					.populate('author', '_id firstname lastname profile.profileImage')
                					.sort({'createdAt': -1})
                					.limit(obj.limit);
    	query.lean().exec(function(err, doc) {
      	if (err) {
        	console.log("err ======= ",err);
        	cb(err, null, c);
      	} else {
      		//console.log("full fetch data",  doc);
        	//loop for submitted answers under questions 
        	_.each(doc, function(data) {
          	data['broadcount'] = data && data.comments ? data.comments.length : 0;
        	});	        

        	//count of questions
        	Broadcast.count(selector)
        					.exec(function(err, count){
          					delete doc['broadcast'];
          					//callback returning parameters
          					cb(null, doc, count);
        	});
      	} 
    	});
	  } 
	} catch(e){
    console.log("erorr in fetchBroadcastNews",e);
    cb(null, null, c);
  }
}

/**
*  @Function name : fetchAnswers
*  @Purpose : Fetch the answers based on Id as parameters of callback function
*  @Request Object : obj : { _id: 'question id', limit: no of answers}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function fetchComments(obj, cb){
  let c = 0;

  try{
  	//based on Id get the details of answers author
    let query = Broadcast.findOne({ _id : obj._id })
                .populate('comments.author', '_id firstname profile.profileImage');
    query.lean().exec(function(err, doc) {
      if (err) {
        console.log("err ======= ",err);
        cb(err, null, c);
      }
      else if (doc) {
        let count = doc.comments ? doc.comments.length : 0;
        //var data = doc.toObject();

        //set the start value from where answers should be shown  
        let start = count <= obj.limit ? 0 : count - obj.limit;

        //sorting of answers based on submitted time
        doc.comments.sort(function(m1, m2) { return m1.commentAt - m2.commentAt; });

        //_.slice returns an array of answers upto index that count value holds   
        let newData = _.slice(doc.comments, start, count);
        
        cb(null, newData, count);
      } else {
      	cb("Invalid broadcast", null, c);
      }
    });
  } catch(e) {
  	console.log("error in fetchAnswers ", e);
  	cb(null, null, c);
  }
}

/**
*  @Function name : fetchReplies
*  @Purpose : Fetch replies on particular answer
*  @Request Object : obj : { _Id: 'Broadcast Id', limit'}, callback : cb
*  @Response Object : Success - Message, Failure - Error message
*  @Author : Najib Hasnain
*/
export function fetchReplies(obj, cb){
  let c = 0;
  try {
	  if (obj._id && obj._id !='') {
	    
	    let query = Broadcast.findOne({ _id : obj._id })
	                .populate('replies.author', '_id firstname profile.profileImage');
	    query.lean().exec(function(err, doc) {
	      if (err){
	        console.log("err ======= ",err);
	        cb(err, null, c);
	      }
	      else if (doc) {

	        //returns array of reply that matches replyOn(answer) Id
	        var replies = _.remove(doc.replies, function(n) {
	                      return n.replyOn == obj.replyOn;
	                    });

	        //total number of count 
	        let count = replies && replies.length > 0 ? replies.length : 0;

	        //sorting of replies based on submission time(date)
	        replies.sort(function(m1, m2) { return m1.replyAt - m2.replyAt; });
	        
	        cb(null, replies, count);
	      } else {
	      	cb("Invalid broadcast", null, c);
	      }
	    });
	  } else {
	    cb(null, null, c);
	  }
	} catch(e) {
		console.log("error in fetchReplies",e);
		cb(null, null, c);
	}
}



