import Users from '../models/users';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';

var _ = require('lodash');
var mongoose = require('mongoose');
var moment = require('moment');
var validator = require('validator');
import {addSlash} from '../controllers/slashesActions';

/**
* @Object Name: "contactRequest",
* @Purpose: "Maintain the contacts status.",
* @Author: "Prudhvi"
*/
export const contactRequest = {
  Requested : 0,
  Accept : 1,
  Request : 2,
  Reject : 3
}

/**
* @Function Name: "addContact",
* @Purpose: "Add new user to my contacts.",
* @Request Object: data : { userId },
* @Response Object: Success- {status : true, data : contacts, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function addContact(req, res){

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.data && req.body.data.userId && mongoose.Types.ObjectId.isValid(req.body.data.userId)) {
      	let objEntity = {
	        uid : req.body.data.userId,
	        userId : person._id,
	        status : contactRequest.Requested
	      };

	      // add myid(current user) into userId contacts with status Requested
	      sendRequest(objEntity, function(err, result){
	        if(err != null)
	          res.json({ status : false, error : err });
	        else if(result == 'SENT'){

	        	// Request sent successfully
	        	let obj = {
	        		uid : person._id,
	        		userId : req.body.data.userId,
	        		status : contactRequest.Request
	        	};

	        	// add userId into my(current user) contacts with status Request
	          sendRequest(obj, function(error, response){
	            if (error != null) res.json({ status : false, error : error });
	            else if (response == 'SENT') {
	            	if (req.body.data.from && req.body.data.from == "PERSONAL") {
	            		Users.findOne({ _id : person._id }, function(usererr, user){
	            			if (user) res.json({ status: true, data : user, message : "Request sent successfully." });
	            			else res.json({ status : false });
	            		});
	            	} else {
	            		// Request sent successfully
		              getContacts(person._id, function(contacterr, contactdoc){
		                if (contacterr) res.json({ status: false });
		                else res.json({ status: true, data: contactdoc, message : "Request sent successfully." });
		              });
	            	}
	            }else if(response == 'EXIST'){
	            	if (req.body.data.from && req.body.data.from == "PERSONAL") {
	            		Users.findOne({ _id : person._id }, function(usererr, user){
	            			if (user) res.json({ status: true, data : user, message : "Request sent successfully." });
	            			else res.json({ status : false });
	            		});
	            	} else {
		            	// Request sent user already in contacts list
		              getContacts(person._id, function(contacterr, contactdoc){
		                if (contacterr) res.json({ status: false });
		                else res.json({ status: true, data: contactdoc, message : "Already in contact list." });
		              });
		            }
	            }
	          });
	        }else if(result == 'EXIST'){
	        	if (req.body.data.from && req.body.data.from == "PERSONAL") {
	        		Users.findOne({ _id : person._id }, function(usererr, user){
	        			if (user) res.json({ status: true, data : user, message : "Request sent successfully." });
          			else res.json({ status : false });
          		});
	          } else {

		        	// Request sent user already in contacts list
		          getContacts(person._id, function(contacterr, contactdoc){
		            if (contacterr) res.json({ status: false });
		            else res.json({ status: true, data: contactdoc, message : "Already in contact list." });
		          });
		        }
	        }
	      });
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in addContact ",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

/**
* @Function Name: "contactResponse",
* @Purpose: "Accept or reject the contact request.",
* @Request Object: data : { userId, response },
* @Response Object: Success- {status : true, data : contacts, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function contactResponse (req, res){
	let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.body.data && req.body.data.userId &&  mongoose.Types.ObjectId.isValid(req.body.data.userId)) {
      	let query = null;
      	let userQuery = null;
      	let message;
      	let obj = req.body.data;

      	// if user accept the request
	      if (obj.response == contactRequest.Accept){
	        query = Users.update({ _id : mongoose.Types.ObjectId(person._id), "contacts._id" : mongoose.Types.ObjectId(obj.userId) },{$set : { "contacts.$.status" : obj.response }});
	      	userQuery =  Users.update({ _id : mongoose.Types.ObjectId(obj.userId), "contacts._id" : mongoose.Types.ObjectId(person._id) },{$set : { "contacts.$.status" : obj.response }});
	      	message = 'Request Accepted successfully.';
	      } else if (obj.response == contactRequest.Reject) {

	      	// if user reject the request
	        query = Users.update({ _id : mongoose.Types.ObjectId(person._id)},{$pull : { "contacts" : { _id : obj.userId } }});
	        userQuery = Users.update({ _id : mongoose.Types.ObjectId(obj.userId)},{$pull : { "contacts" : { _id : person._id } }});
	      	message = 'Request Rejected successfully.';
	      }
	      if (query != null) {
		      query.exec( function(err, response){
		        if(err){
		          console.log("err === ",err);
		          res.json({ status : false, error : err });
		        }else{
		          userQuery.exec( function(error, result){
		          	if (req.body.data.from && req.body.data.from == "PERSONAL") {
	            		Users.findOne({ _id : person._id }, function(usererr, user){
	            			if (user) res.json({ status: true, data : user, message : message });
	            			else res.json({ status : false });
	            		});
	            	} else {

			          	// get all my contacts
			            getContacts(person._id, function(contacterr, contactdoc){
			              if (contacterr){ 
			                 console.log("contacterr === ",contacterr);
			                res.json({ status: false }); }
			              else
			                res.json({ status: true, data: contactdoc, message : message });
			            });
			          }
		          });
		        }
		      });
		    } else res.json({status : false, error : "Invalid request."});
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in contactResponse",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

/**
* @Function Name: "getMyContacts",
* @Purpose: "Accept or reject the contact request.",
* @Request Object: null,
* @Response Object: Success- {status : true, data : contacts, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function getMyContacts(req, res){
	let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null) {

      	// fetch my contacts
      	getContacts(person._id, function(contacterr, contactdoc){
	        if (contacterr){ 
	          res.json({ status: false, error : contacterr }); 
	        }else{
	          res.json({ status: true, data: contactdoc });
	        }
	      });
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in getMyContacts",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

/**
* @Function Name: "fetchMatchedUsers",
* @Purpose: "Accept or reject the contact request.",
* @Request Object: null,
* @Response Object: Success- {status : true, data : user_record }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function fetchMatchedUsers (req, res){
	let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.params.input) {
      	// fetch matched user record
      	let query = Users.findOne({ _id : { $ne : person._id }, email : addSlash(req.params.input), userStatus : 'Active' });
      	query.select('firstname lastname email profile.profileImage')
          .exec(function (err, result) {
            if (err) {
              console.log("error--", err);  
              res.json({ status : false, error : "Unauthorized user." });
            } else if (result && result._id)
             res.json({ status : true, data: [result] });
            else
              res.json({status : false, error : "No user found."});
          });
			} else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in getMyContacts",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}


/*---------------------  contacts callback functions ----------------------*/


/**
* @Function Name: "sendRequest",
* @Purpose: "update contacts field in user record.",
* @Request Object: data : { uid, userId, status },
* @Response Object: Success- { null, EXIST/SENT }, Failure- { error, null},
* @Author: "Prudhvi"
*/
export function sendRequest(obj, cb){

	try{

		// get user contacts
	  let findQuery = Users.findOne({ _id : mongoose.Types.ObjectId(obj.uid) }).select('contacts');
	  findQuery.exec( function(err, doc){
	    if(err) cb(err, null);

	    // check user have contacts or not if he have go inside else insert into contacts
	    else if(doc && doc.contacts && doc.contacts.length > 0){

	    	/*check user already is there in contacts list 
	    	if already have send response as "EXIST" else add it to contacts*/
        let index = _.findIndex(doc.contacts, function(o) { return o._id == obj.userId; });
        if (index < 0) {
          Users.update({ _id : mongoose.Types.ObjectId(obj.uid) },{ $push : { contacts : { _id : mongoose.Types.ObjectId(obj.userId), status : obj.status } } },{ runValidators: true },function (savederr, saveddoc) {
            if (savederr) cb(savederr, null);
            else cb(null, 'SENT');
          });
        } else cb(null, 'EXIST');
	    }else{

	    	// first add contact
	      Users.update({ _id : mongoose.Types.ObjectId(obj.uid) },{ $set : { contacts : [ {_id : mongoose.Types.ObjectId(obj.userId), status : obj.status} ]} },{ runValidators: true },function (savederr, saveddoc) {
	        if (savederr) cb(savederr, null);
	        else cb(null, 'SENT');
	      });
	    }
	  });
	} catch(e){
    console.log("error in sendRequest",e);
    cb("Internal server error.", null);
  }
}

/**
* @Function Name: "getContacts",
* @Purpose: "update contacts field in user record.",
* @Request Object: id,
* @Response Object: Success- { null, contacts }, Failure- { error, null},
* @Author: "Prudhvi"
*/
export function getContacts(id, cb){
	try{
		// fetch all my contacts with first name, last name, email and profile image
	  var query = Users.findOne({ _id : mongoose.Types.ObjectId(id) })
	                    .populate('contacts._id', 'firstname lastname email profile.profileImage', { userStatus : 'Active'});
	  query.exec(function (err, doc) {
	      if(err){ 
	        cb(err, null);
	      }
	      else{
	        doc.contacts.sort(function(u1, u2) { return u1.status - u2.status; });
	        cb(null, doc.contacts);
	      }
	  });
	} catch(e){
    console.log("error in getContacts ",e);
    cb("Internal server error.", null);
  }
}