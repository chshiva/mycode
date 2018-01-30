var moment = require('moment');
var mongoose = require('mongoose');
var _ = require('lodash');

import Handraise from '../models/handraise';
import Room from '../models/room';

import {Roles} from './admin.user.controller';
import { checkValidRequest } from '../authorization';
import {addSlash} from '../controllers/slashesActions';

/**
* @Function Name: "createHandraise",
* @Purpose: "To create new package.",
* @Request Object: data : { question, roomKey },
* @Response Object: Success- {status : true, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function createHandraise(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.body.data && req.body.data.roomKey){
	        let obj = req.body.data;

	        // valid room or not
	        let roomQuery = Room.findOne({ roomKey : addSlash(obj.roomKey) });
	        roomQuery.exec(function(roomerr, room){
	          if (roomerr) { res.json({ status : false, error : "Invalid room." }); }
	          else if (room) {
	            obj["roomId"] = room._id;
	            obj["author"] = person._id;
	            obj["createdAt"] = moment().utc().toDate();
	            obj["modifiedAt"] = moment().utc().toDate();
	            delete obj['roomKey'];

	            // create new handraise question
	            var objEntity = new Handraise(obj);
	            objEntity.save(function (err, doc) {
	              if (err) {
	                console.log("err === ",err);
	                res.json({ status : false, error : err });
	              } else if (doc) res.json({ status : true, message : "Posted successfully"}); 
	              else res.json({ status : false, error : "Internal server error."});
	            });
	          } else res.json({ status : false, error : "Invalid room"});
	        });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in createHandraise inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in createHandraise ",e);
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
export function updateHandraise(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.body.data && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)){
	        let obj = req.body.data;

	        // valid room or not
	        let roomQuery = Room.findOne({ roomKey : addSlash(obj.roomKey) });
	        roomQuery.exec(function(roomerr, room){
	          if (roomerr) { res.json({ status : false, error : "Invalid room." }); }
	          else if (room) {
	            delete obj['roomKey'];
	            
	            let recordId = mongoose.Types.ObjectId(req.params.id);

	            // check valid handraise or not
	            let handQuery = Handraise.findOne({ _id : recordId });
	            handQuery.exec( function(handerr, question){
	              if (handerr) {
	                console.log("handerr ==== ",handerr);
	                res.json({ status : false, error : handerr });
	              } else if (question) {

	              	// check created by current user or not
	              	if(person._id.str == question.author.str){
	                  obj['modifiedAt'] = moment().utc().toDate();
	                  
	                  Handraise.update({ _id : recordId },{ $set : obj },{ runValidators: true },function (err, doc) {
	                    if (err) res.json({ status : false, error : err });
	                    else if(doc) res.json({ status : true, message: "Posted successfully" });
	                    else res.json({ status : false, error : "Internal server error."});  
	                  });
	                } else res.json({ status : false, error : "Access denied."});
	              } else res.json({ status: false, error : "Invalid handraise."});
	            });
	          } else res.json({ status : false, error : "Invalid room"});
	        });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("error in updateHandraise inner ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in updateHandraise",e);
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
export function fetchHandraiseData(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.key && req.params.limit) {

	      	//gets the document of room based on roomKey
		      let roomQuery = Room.findOne({ roomKey : addSlash(req.params.key) });
		      roomQuery.exec (function(roomerr, room){
		        if (roomerr) {
		          //console.log("roomerr ==== ",roomerr);
		          res.json ({ status : false, error : "Invalid room." });
		        } else if (room) {

		          //question list object
		          let objEntity = {
		            roomId : room._id,
		            limit : Number(req.params.limit)
		          }

		          //function with object and call back as its parameter to get question list
		          fetchHandraiseQue(objEntity, function(getError, getData, count) {
		            if (getError == null) {

		              //successfull response if error is null
		              res.json({ status : true, data : getData, count : count });
		            } else {

		              //failed response if call back returns any query error
		              res.json ({ status : false, error: getError });
		            }
		          });
		        } else res.json({ status : false, error : "Invalid room."});
		      });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in fetchHandraiseData inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in fetchHandraiseData",e);
    res.json({status : false, error : "Internal server error."});
  }
} 

/**
*  @Function name : getHandraiseQues
*  @Purpose : Fetch the question based on Id
*  @Request Object : params : { id : handraise Id}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function getHandraiseQues(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)){

		      //find the question and auther details based on _id
		      let query = Handraise.findOne({_id : req.params.id})
		                  .populate('author', '_id firstname lastname profile.profileImage');
		                  
		      query.lean().exec(function(err, doc) {
		        if (err) {
		          res.json({status : false});
		        } else if (doc) {
		          doc['anscount'] = doc.answers ? doc.answers.length : 0;
		          delete doc['answers'];
		          res.json({status : true, data : doc });      
		        } else res.json({ status: false})  
		      });
	      } else res.json({status : false});
    	} catch(e){
		    console.log("e in getHandraiseQues inner === ",e);
		    res.json({status : false});
		  }
    });
  } catch(e){
    console.log("error in getHandraiseQues",e);
    res.json({status : false});
  }
}

/**
*  @Function name : deleteHandraise
*  @Purpose : Function deletes question based on rocordId
*  @Request Object : param : { id: 'handraise Id' }
*  @Response Object : Success - Message, Failure - Error message
*  @Author : Najib Hasnain
*/
export function deleteHandraise(req, res) {
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)){
	      	let recordId = mongoose.Types.ObjectId(req.params.id);

		      //check for user Id in collection
		      let handQuery = Handraise.findOne({ _id : recordId });
		      handQuery.exec( function(handerr, question){
		        if (handerr) res.json ({ status : false, error : "Invalid Question." });
		        else if(question) {
		        	if (question.author.str == person._id.str) {

		            //remove question from colletion based on recordId
		            let removeQuery = Handraise.remove({ _id : recordId });
		            removeQuery.exec( function(err, doc){
		              if (err) res.json({ status : false, error : err });
		              else {

		              	//successfull resposne
		                res.json({ status : true });
		              }
		            });
		        	} else res.json({status : false, error : "Access denied."});
		        } else res.json({ status : false, error : "Invalid handraise."});
		      });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in deleteQuestion inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in deleteHandraise",e);
    res.json({status : false, error : "Internal server error."});
  }
}


/**
*  @Function name : saveHandraiseAnswer
*  @Purpose : Function saves the answer against a question
*  @Request Object : params : {id}, data : { }
*  @Response Object : Success - data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function saveHandraiseAnswer(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id) {
	      	let recordId = mongoose.Types.ObjectId(req.params.id);

	      	//query to validate Id
		      let handQuery = Handraise.findOne({ _id : recordId });
		      handQuery.exec( function(handerr, question){
		        if (handerr) res.json({ status : false, error : "Invalid Question." });
		        else if (question) {
		          let updateQuery = null;
		          let obj = req.body.data;
		          obj['author'] = person._id;
		          obj['answerAt'] = moment().utc().toDate();

		          //if array has data then add in existing array 
		          if (question.answers && question.answers.length > 0) {
		            updateQuery = Handraise.update({ _id : recordId }, {$push : { answers : obj} },{ runValidators: true });
		          } else {
		            updateQuery = Handraise.update({ _id : recordId }, {$set : { answers : [obj]} },{ runValidators: true });
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
		        } else res.json({ status : false, error : "Invalid Question."});
		      });
	      } else res.json({status : false, error : "Invalid request."});
    	} catch(e){
		    console.log("e in saveHandraiseAnswer inner === ",e);
		    res.json({status : false, error : "Internal server error."});
		  }
    });
  } catch(e){
    console.log("error in saveHandraiseAnswer",e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
*  @Function name : getAnswers
*  @Purpose : Fetch the answers based on Handraise Id and count of answers
*  @Request Object : data : { _Id: 'handraise Id', limit: no of answers}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function getAnswers(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && req.params.limit){
	      	let obj = {
	      		_id : req.params.id,
	      		limit : Number(req.params.limit)
	      	};

			    // a function send an obj and callback as its parameters to get answers data
			    fetchAnswers(obj, function(geterr, getdata, count){
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
	      if (person != null && req.params.id) {
	      	let recordId = mongoose.Types.ObjectId(req.params.id);
	      	let obj = req.body.data;
	      	obj['author'] = person._id;
	      	obj['replyAt'] = moment().utc().toDate();
	      	//query to validate Id
		      let handQuery = Handraise.findOne({ _id : recordId });
		      handQuery.exec( function(handerr, question){
		        if (handerr) res.json({ status : false, error : "Invalid Question." });
		        else if (question) {
		        	let updateQuery = null;

		          //if array has value then add in the array
		          if (question.replies && question.replies.length > 0) {
		            updateQuery = Handraise.update({ _id : recordId }, { $push: { replies : obj }}, { runValidators : true });
		          } else {
		            updateQuery = Handraise.update({ _id : recordId }, { $set: { replies : [obj] }}, { runValidators : true });             
		          }
		          updateQuery.exec(function(err, doc) {
	              if (err) {
	                res.json({ status: false, error : err })
	              } else { 
	                
	                //successfull response
	                res.json({ status : true });
	              }
	            });
		        } else res.json({ status : false, error : "Invalid Question."});
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
*  @Request Object : data : { _Id: 'handraise Id', comment:'comment on answer' author : 'user Id', replyOn : 'answer Id'}
*  @Response Object : Success - Message, Failure - Error message
*  @Author : Najib Hasnain
*/
export function getReplies(req, res){
	try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
    	try{
	      if (person != null && req.params.id && req.params.replyOn && mongoose.Types.ObjectId.isValid(req.params.id)){
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







/*-------------------------- callback functions -------------------------*/

/**
*  @Function name : fetchHandraiseQue
*  @Purpose : Fetch the question based on Id
*  @Request Object : data : { roomId: 'room Id', limit: 'no of questions'}
*  @Response Object : Success - data, Failure - Error message
*  @Author : Najib Hasnain
*/
export function fetchHandraiseQue(obj, cb) {
	try{
	  let c = 0;
	  if (obj.roomId && obj.roomId !='') {

	    //based on room Id author info gets populated
	    let query = Handraise.find({roomId: obj.roomId})
	                .populate('author', '_id firstname lastname profile.profileImage')
	                .sort({'createdAt': -1})
	                .limit(obj.limit);
	    query.lean().exec(function(err, doc) {
	      if (err) {
	        console.log("err ======= ",err);
	        cb(err, null, c);
	      }
	      else {

	        //loop for submitted answers under questions 
	        _.each(doc, function(data) {
	          data['anscount'] = data && data.answers ? data.answers.length : 0;
	        });

	        //count of questions
	        Handraise.count({ roomId: obj.roomId }).exec(function(err, count){
	          delete doc['answers'];

	          //callback returning parameters
	          cb(null, doc, count);
	        });
	      } 
	    });
	  } else {
	    cb(null, null, c);
	  }
	} catch(e){
    console.log("error in fetchHandraiseQue",e);
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
export function fetchAnswers(obj, cb){
  let c = 0;

  try{
  	//based on Id get the details of answers author
    let query = Handraise.findOne({ _id : obj._id })
                .populate('answers.author', '_id firstname lastname profile.profileImage')
                .populate('replies.author', '_id firstname lastname profile.profileImage');
    query.lean().exec(function(err, doc) {
      if (err) {
        console.log("err ======= ",err);
        cb(err, null, c);
      } else if (doc) {
        let count = doc.answers ? doc.answers.length : 0;
        //var data = doc.toObject();

        //set the start value from where answers should be shown  
        let start = count <= obj.limit ? 0 : count - obj.limit;

        //sorting of answers based on submitted time
        doc.answers.sort(function(m1, m2) { return m1.answerAt - m2.answerAt; });

        //_.slice returns an array of answers upto index that count value holds   
        let newData = _.slice(doc.answers, start, count);

        if (newData && newData.length > 0) {
        	let withreplies = [];
        	let  c = newData.length;
          function processReplies() {
            let item = newData[c - 1];
            //returns array of reply that matches replyOn(answer) Id
		        let replies = _.remove(doc.replies, function(n) {
		        							return n.replyOn._str == item._id._str;
		                    });

		        //total number of count 
		        let replycount = replies && replies.length > 0 ? replies.length : 0;

		        //sorting of replies based on submission time(date)
		        replies.sort(function(m1, m2) { return m1.replyAt - m2.replyAt; });
		        item['replies'] = replies;
		        item['replycount'] = replycount;
		        withreplies.push(item);
            c = c - 1;
            if(c > 0){
              processReplies();
            } else {
              // done
              cb(null, withreplies, count);
            }
          }
          processReplies();
        } else {
        	cb(null, newData, count);
        }
      }
    });
  } catch(e) {
  	console.log("error in fetchAnswers", e);
  	cb(null, null, c);
  }
}

/**
*  @Function name : fetchReplies
*  @Purpose : Fetch replies on particular answer
*  @Request Object : obj : { _Id: 'handraise Id', limit'}, callback : cb
*  @Response Object : Success - Message, Failure - Error message
*  @Author : Najib Hasnain
*/
export function fetchReplies(obj, cb){
  let c = 0;
  try {
	  if (obj._id && obj._id !='') {
	    
	    let query = Handraise.findOne({ _id : obj._id })
	                .populate('replies.author', '_id firstname lastname profile.profileImage');
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
	        
	        //reply data as callback params
	        cb(null, replies, count);
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
