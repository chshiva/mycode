
import Questionnaire from '../models/questionnaire';
import GradeConfiguration from '../models/gradeconfiguration';
import Users from '../models/users';
import Topic from '../models/topic';
import Room from '../models/room';
import Result from '../models/result';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import * as EmailForCorporateCreation from '../emailFunctions';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';
import {addSlash} from './slashesActions';

var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var async = require("async");
import reflect from 'async/reflect';
import parallel from 'async/parallel';


/**
*  @Function name : saveQuestionnaire
*  @Purpose : For creating questionnaire
*  @Request Object : questionnaireData : { data : {  questionnaireName: 'questionnaire name', description: 'description', uid: 'user id'  } }
*  @Response Object : Success - Success message, Questionnaire data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveQuestionnaire(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.body.questionnaireData || !req.body.questionnaireData.data) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else { 

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        var obj = req.body.questionnaireData.data;

        //If user has a valid role for creating questionnaire
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Presenter) {
          getCloneQuestions(obj, function (questions) {
              if(questions != null && questions.length <= 0) {
                res.json({ 
                  status : false,  
                  error : "No questions in questionnaire." 
                });
              } else {
                if(questions != null && questions.length > 0) {
                  questions.forEach(function(v){ delete v._id });
                  obj['questions'] = questions;
                }
                var corporateId = bussinessID;
                  obj['corporateId'] = bussinessID
                  obj['createdBy'] = mongoose.Types.ObjectId(person._id);
                  obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
                  obj['createdAt'] = moment().utc().toDate();
                  obj['modifiedAt'] = moment().utc().toDate();

                  delete obj["uid"];

                  //Create questionnaire
                  var objEntity = new Questionnaire(obj);
                  objEntity.save(function (err, doc) {
                    if (err) {
                      res.json({ 
                        status : false, 
                        error : err.message 
                      });
                    } else {
                      res.json({ 
                        status : true, 
                        data : doc, 
                        message : "Created successfully." 
                      });
                      let now = moment().utc().toDate();

                      //Log obj which need to be inserted in logger collection
                      // let logObj = {
                      //   logType : 'Questionnaire',
                      //   actionType : 'Created',
                      //   actionTime : now,
                      //   uid : obj.createdBy,
                      //   details : {
                      //     name : obj.questionnaireName,
                      //     corporateId : obj.corporateId,
                      //     remoteAddress : req.connection.remoteAddress,
                      //     userAgent : req.headers['user-agent']
                      //   }
                      // }  

                      // //Function for creating log on successful creation of questionnaire
                      // createLog(logObj, function(status) {
                      //   if(status) {
                      //     // console.log(status);
                      //   }
                      // });
                    }
                  });
              }
          });
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        } 
      }
    } catch(e) {
      console.log("error in save questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

function getCloneQuestions (data, callback) {
  if(data.qId && data.qId != "") {
    Questionnaire.findOne({_id: mongoose.Types.ObjectId(data.qId)})
    .select('questions')
    .lean().exec(function(err,cloneData) {
      if(err) {
        callback(null);
      } else {
        callback(cloneData.questions);
      }
    });
  } else {
    callback(null);
  }
}

/**
*  @Function name : updateQuestionnaire
*  @Purpose : For updating Questionnaire
*  @Request Object : questionnaireData : { data : {  questionnaireName: 'questionnaire name', description: 'description', uid: 'user id'  } }
*  @Response Object : Success - Success message, Questionnaire data, Failure - Error message
*  @Author : Prateek Pathak
*/

export function updateQuestionnaire(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.body.questionnaireData || !req.body.questionnaireData.data) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {      
        var obj = req.body.questionnaireData.data;
                
        let recordId = mongoose.Types.ObjectId(obj._id);
        obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
        obj['modifiedAt'] = moment().utc().toDate();
        delete obj["uid"];
        delete obj["_id"];

        //Fetching the details of questionnaire
        Questionnaire.findOne({ 
          _id : recordId 
        }).exec(function(err, data) {
          if (err) {
            res.json({
              status : false,
              error : err.message
            })
          } else if (data) {
            //If user has a valid for updating questionnaire
            if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Presenter) {
              getCloneQuestions(obj, function (questions) {
                if(questions != null && questions.length == 0 && obj.qId) {
                  res.json({
                    status: false,
                    error: 'No questions in questionnaire'
                  });
                } else {
                  if( questions != null && data.questions && data.questions.length > 0) {
                    let cloneQuestions = data.questions.concat(questions);
                    cloneQuestions.forEach(function(v){ delete v._id });
                    obj['questions'] = cloneQuestions;
                  } else if(questions != null && data.questions.length <= 0) {
                    obj['questions'] = questions;
                  }
                  
                  //Query for finding if the questionnaire is assigned to some topic
                  Topic.find({
                    "questionnaire.questionnaireId" : recordId,
                  },{
                    "questionnaire.$" : 1
                  })
                  .exec(function (err, timedoc) {
                    if (err) { 
                      res.json({ 
                        status : false, 
                        error : err.message 
                      });

                      //If document is present check for time conflicts else update the questionnaire
                    } else if (timedoc) { 
                      var now = moment().seconds(0).utc();
                      
                      //Logic for checking whether the questionnaire open time is undefined or less than the curent time

                      var index = _.findIndex(timedoc, function(o) {

                        let openFrom = o.questionnaire[0].openFrom != undefined || o.questionnaire[0].openFrom != null?moment(o.questionnaire[0].openFrom).seconds(0).utc():undefined;
                        
                        return openFrom<=now || openFrom == undefined 
                      })
                      
                      if(index == -1) {                    

                        //Query for updating the questionnaire
                        Questionnaire.update({ 
                          _id : recordId 
                        },{ 
                          $set : obj 
                        },{ 
                          runValidators: true 
                        },function (err, doc) {
                          // console.log("update err == ",err);
                          // console.log("update doc == ",doc);
                          if (err) {
                            res.json({ 
                              status : false, 
                              error : err.message 
                            });
                          } else {

                            //Query for sending the updated record to the client
                            var query = Questionnaire.findOne({ 
                              _id : recordId 
                            });
                            query.exec(function (err, doc) {
                              if (err) { 
                                res.json({ 
                                  status: false 
                                }); 
                              } else {
                                res.json({ 
                                  status: true, 
                                  data: doc, 
                                  message : "Updated successfully." 
                                });
                              }
                            });
                          }
                        });
                      } else {

                        var dbOpenFrom = timedoc[index].questionnaire[0].openFrom != undefined || timedoc[index].questionnaire[0].openFrom != null?moment(timedoc[index].questionnaire[0].openFrom):undefined;

                        var dbCloseFrom = timedoc[index].questionnaire[0].closeFrom != undefined || timedoc[index].questionnaire[0].closeFrom != null?moment(timedoc[index].questionnaire[0].closeFrom):undefined;

                        res.json({ 
                          status : false, 
                          error : 409, 
                          openFrom: dbOpenFrom, 
                          closeFrom: dbCloseFrom 
                        });
                      }
                    } else {

                      //Query for updating the questionnaire
                      Questionnaire.update({ 
                        _id : recordId 
                      },{ 
                        $set : obj 
                      },{ 
                        runValidators: true 
                      },function (err, doc) {
                        // console.log("update err == ",err);
                        // console.log("update doc == ",doc);
                        if (err) {
                          res.json({ 
                            status : false, 
                            error : err.message 
                          });
                        } else {

                          //Query for sending the updated record to the client
                          var query = Questionnaire.findOne({ 
                            _id : recordId 
                          });
                          query.exec(function (err, doc) {
                            if (err) { 
                              res.json({ 
                                status: false 
                              }); 
                            } else {
                              res.json({ 
                                status: true, 
                                data: doc, 
                                message : "Updated successfully." 
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });    
            } else {
              res.json({ 
                status: false, 
                error : "Access denied." 
              });
            }
          } else {
            res.json({ 
              status : false, 
              error : "Invalid Questionnaire" 
            });
          }
        })        
      }
    } catch(e) {
      console.log("Error in update questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : saveQuestion
*  @Purpose : For updating question into questionnaire
*  @Request Object : questionnaireData : { data : { question: { question: 'question name', questionType: 'Radio', options: [Object], answers: [Object], uid: 'user id', _id: 'questionnaire id', questionId: 'question id', swots: [] } } }
*  @Response Object : Success - Success message, Questionnaire data, Failure - Error message
*  @Author : Aniket Gupta
*/ 

export function saveQuestion(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.body.questionnaireData || !req.body.questionnaireData.data || !req.params.id) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {      
        var obj = req.body.questionnaireData.data.question;

        //If user has a valid role
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor) {

          //If questionnaire id is there then update data else create data
          if (req.params.id && (req.params.id != "" || req.params.id != undefined) && mongoose.Types.ObjectId.isValid(req.params.id)) {
            let recordId = mongoose.Types.ObjectId(req.params.id);
            obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
            obj['modifiedAt'] = moment().utc().toDate();
            delete obj["uid"];

            //Fetching the details of questionnaire
            var data = Questionnaire.findOne({ 
              _id : recordId 
            });

            //Verifying is data is present or not
            if (data) {

              //If question object is there and have empty question id then push question into questionnaire else update questionnaire
              if (req.body.questionnaireData.data.question && req.body.questionnaireData.data.question.questionId == '') {

                //Push questions object in questionnaire
                Questionnaire.update({ 
                  _id : recordId 
                },{ 
                  $push : {
                    "questions":obj
                  } 
                },{ runValidators: true },function (err, doc) {
                  // console.log("update err == ",err);
                  // console.log("update doc == ",doc);
                  if (err) {
                    res.json({ 
                      status : false, 
                      error : err.message 
                    });
                  } else {

                    //Query for sending the updated record to the client
                    var query = Questionnaire.findOne({ 
                      _id : recordId 
                    });
                    query.exec(function (err, doc) {
                      if (err) { 
                        res.json({ 
                          status: false 
                        }); 
                      } else {
                        res.json({ 
                          status: true, 
                          data: doc, 
                          message : "Added successfully." 
                        });
                      }
                    });
                  }
                });

                //If question object is there and question id is not empty then update question into questionnaire
              } else if (req.body.questionnaireData.data.question && req.body.questionnaireData.data.question.questionId != '') {

                //Update questions object in questionnaire
                Questionnaire.update({ 
                  _id : recordId,
                  "questions._id": obj.questionId 
                },{ 
                  $set : {
                    "questions.$.question": obj.question,
                    "questions.$.questionType": obj.questionType,
                    "questions.$.options": obj.options,
                    "questions.$.answers": obj.answers,
                    "questions.$.swots": obj.swots,
                    "questions.$.marks": obj.marks  
                  } 
                },{ 
                  runValidators: true 
                },function (err, doc) {
                  // console.log("update err == ",err);
                  // console.log("update doc == ",doc);
                  if (err) {
                    res.json({ 
                      status : false, 
                      error : err.message 
                    });
                  } else {

                    //Query for sending the updated record to the client
                    var query = Questionnaire.findOne({ 
                      _id : recordId 
                    });
                    query.exec(function (err, doc) {
                      if (err) { 
                        res.json({ 
                          status: false 
                        }); 
                      } else {
                        res.json({ 
                          status: true, 
                          data: doc, 
                          message : "Updated successfully." 
                        });
                      }
                    });
                  }
                });
              } 
            } else {
              res.json({ 
                status : false, 
                error : "Invalid Questionnaire" 
              });
            }
          } else {
            res.json({ 
              status : false, 
              error : "Invalid Questionnaire Id" 
            });
          }
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("error in save question", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
} 

/**
*  @Function name : listQuestionnaire
*  @Purpose : For fetching complete questionnaire data
*  @Request Object : query : { page, items, search }
*  @Response Object : Success - Questionnaire data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listQuestionnaire(req, res) {
  //console.log("QuestionnaireList Req --", req.body.questionnaireData);

  //Verifying if user is valid or not
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.query.items && req.query.page) {
        let queryData = req.query;
        var selector = {};

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }

        //Search selector based on user role
        if (person.role == Roles.Superadmin) {
          selector = {};
        } else if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin || person.role == Roles.Instructor || person.role == Roles.Presenter) {
          selector = {
            corporateId : bussinessID
          };
        }

        //If searchKeyword is not empty then create RegExp
        if (queryData.search && queryData.search != '') {
          let slash_search = addSlash(queryData.search);
          var searchKey = RegExp(slash_search,'i');         
          selector['$or'] = [                
            { 'questionnaireName' : {$regex: searchKey} },
            { 'description' : {$regex: searchKey} }
          ]; 
        }          

        //Query for fetching complete questionnaire data based on selector and skip items based on itemsPerPage on previous page
        var query = Questionnaire.find(selector)
          .limit(Number(queryData.items))
          .select('questionnaireName description corporateId')
          .skip(Number(queryData.items) * (Number(queryData.page)-1))
          if (req.query.sort == 'undefined' || req.query.sort == undefined) {
            query.sort({ modifiedAt: -1 });
          } else {
            // console.log("sort === ", req.query.sort);
            query.sort(JSON.parse(req.query.sort));
          }
        if (query) {                
          query.exec(function(err, result) {
            if (err) {
              // console.log("ERROR===", err);
              res.json({ 
                status : false, 
                error : err.message 
              });
            } else {

              //Query for counting complete questionnaire data based on selector
              Questionnaire.count(selector).exec(function(error, count) {
                res.json({ 
                  status : true, 
                  data : result, 
                  count : count 
                });
              });
            }
          });
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      } else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("error in list questionnaire", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchQuestionnaire
*  @Purpose : For fetching particular questionnaire data
*  @Request Object : params : { id: "questionnaire id" }
*  @Response Object : Success - Questionnaire data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchQuestionnaire(req, res) {

  //Verifying if request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.params.id) {

        //Validating if questionnaire id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid questionnaire"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);
          //console.log("recordId == ",recordId);

          //Query for finding the questionnaire data based on questionnaire id
          var query = Questionnaire.findOne({ 
            _id : req.params.id 
          })
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else if (doc) {
              //console.log("DATA===", doc);
              res.json({ 
                status: true, 
                data: doc 
              });
            } else {
              res.json({ 
                status: false, 
                error : "Invalid Questionnaire." 
              });
            }
          });
        }
      } else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("error in fetch questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
*  @Function name : fetchQuestionnaireResult
*  @Purpose : For fetching particular questionnaire submitted result data
*  @Request Object : params : { id: "questionnaire id" }
*  @Response Object : Success - Questionnaire submitted data, Failure - Error message
*  @Author : gaddam pranathi
*/

export function fetchQuestionnaireResult(req, res) {

  //Verifying if request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.params.id) {

        //Validating if questionnaire id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid questionnaire"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);
          //console.log("recordId == ",recordId);

          //Query for finding the questionnaire data based on questionnaire id
          Result.find({questionnaireId: req.params.id })
          .exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else if (doc) {
              if(doc.length == 0 ) {
                res.json({ 
                  status: true, 
                  data: doc,
                  submittedFlag: true
                });
              } else {
                res.json({ 
                  status: true, 
                  data: doc,
                  submittedFlag: false
                });
              }
            } else {
              res.json({ 
                status: false, 
                error : "Invalid Questionnaire." 
              });
            }
          });
        }
      } else {
        res.json({
          status : false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("error in fetch questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteQuestionnaire
*  @Purpose : For deleting particular questionnaire data
*  @Request Object : params : { id: "questionnaire id" }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Prateek 
*/

export function deleteQuestionnaire(req, res) {

  //Verifying if request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.params.id) {

        //Validating if requested questionnaire id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid Questionnnaire"
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);

          //Query for checking if the questionnaire id is present in database
          var query = Questionnaire.findOne({ 
            _id : recordId 
          });
          query.exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else if(doc){

              //Checking whether there is any submission respective to questionnaire Id

              Result.findOne({
                questionnaireId : recordId
              })
              .exec(function(err, resultDoc){
                if (err) {
                  res.json({
                    status : false,
                    error : err.message
                  })
                } else if(resultDoc) {
                  res.json({
                    status : false,
                    error : "Questionnaire can't be deleted as questions has been attempted based on questionnaire questions"
                  })
                } else {

                  async.parallel([
                    async.reflect(function(callback) {
                      Topic.findOne({
                        "questionnaire.questionnaireId" : recordId,
                      },{
                        topicName: 1,
                        "questionnaire.$" : 1
                      })
                      .exec(function (err, topicData) {
                        if (err) { 
                          callback(err.message, null)
                        } else {
                          callback(null, topicData)
                        } 
                      })
                    }),
                    async.reflect(function(callback) {
                      Room.findOne({
                        'roomConfiguration.feedback.questionnaireId' : recordId
                      }).exec(function(err, roomData) {
                        if (err) {
                          callback(err.message, null)
                        } else {
                          callback(null, roomData)
                        } 
                      })
                    })
                  ],
                  // optional callback
                  function(err, results) {
                    if(err) {
                      res.json({ 
                        status : false, 
                        error : err
                      });
                    } else {
                      if(results[0].value == null && results[1].value != null) {
                        res.json({
                          status : false,
                          error : 'Are you sure you want to delete questionnaire as questionnaire has been assigned to room configuration as a feedback?',
                          httpstatuscode : 409,
                          dependency : 'ROOM'
                        })
                      } else if(results[0].value != null && results[1].value == null) {
                        res.json({
                          status : false,
                          error : 'Are you sure you want to delete questionnaire as questionnaire has been  already assigned to some topic?',
                          httpstatuscode : 409,
                          dependency : 'TOPIC'
                        })
                      } else if(results[0].value != null && results[1].value != null){
                        res.json({
                          status : false,
                          error : 'Are you sure you want to delete questionnaire as questionnaire has been  already assigned to some topic and to room configuration as a feedback?',
                          httpstatuscode : 409,
                          dependency : 'BOTH'
                        })
                      } else {

                        //Remove Questionnaire 

                        Questionnaire.remove({ 
                          _id : recordId 
                        })
                        .exec(function (error, response){
                          if (error) { 
                            res.json({ 
                              status : false, 
                              error : error.message 
                            }); 
                          } else {
                            res.json({ 
                              status : true, 
                              message : "Deleted successfully." 
                            });
                          }
                        })
                      }                     
                    }
                  })
                }
              })              
            } else {
              res.json({
                status : false,
                error : 'Questionnaire not found'
              })
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
      console.log("error in delete questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : confirmDeleteQuestionnaire
*  @Purpose : For deleting particular questionnaire data based on confirmation given by user 
*  @Request Object : params : { id: "questionnaire id" }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Prateek 
*/

export function confirmDeleteQuestionnaire(req, res) {
  
  //Verifying if request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.params.id && req.params.dependency) {

        //Validating if requested questionnaire id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid Question."
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);
          
          //Removing all questionnaires based on dependency

          if(req.params.dependency == 'ROOM') {
            
            //Removing all questionnaires based on dependency 'ROOM'

            Room.update({
              'roomConfiguration.feedback.questionnaireId' : recordId
            },{
              $set: {
                'roomConfiguration.feedback' : {
                  "feedbackType" : "Default"
                }
              }
            },{
              multi : true
            }).exec(function(err, roomUpdated) {
              if (err) {
                res.json({
                  status : false,
                  error : err.message
                })
              } else if(roomUpdated) {

                //Remove Questionnaire 
                Questionnaire.remove({ 
                  _id : recordId 
                })
                .exec(function (error, response){
                  if (error) { 
                    res.json({ 
                      status : false, 
                      error : error.message 
                    }); 
                  } else {
                    res.json({ 
                      status : true, 
                      message : "Deleted successfully." 
                    });
                  }
                })
              } else {
                res.json({
                  status : false,
                  error : 'Room Configuration not found'
                })
              }
            })
          } else if(req.params.dependency == 'TOPIC') {
            
            //Removing all questionnaires based on dependency 'TOPIC'

            Topic.update({
              'questionnaire.questionnaireId': recordId
            },{ 
              $pull: { 
                "questionnaire": {
                 "questionnaireId" : recordId 
                } 
              } 
            },{multi:true})
            .exec(function(err, topicUpdated) {
              if (err) {
                res.json({
                  status : false,
                  error : err.message
                })
              } else if(topicUpdated) {

                //Remove Questionnaire 
                Questionnaire.remove({ 
                  _id : recordId 
                })
                .exec(function (error, response){
                  if (error) { 
                    res.json({ 
                      status : false, 
                      error : error.message 
                    }); 
                  } else {
                    res.json({ 
                      status : true, 
                      message : "Deleted successfully." 
                    });
                  }
                })         
              } else {
                res.json({
                  status : false, 
                  error : 'Invalid Topic'
                })
              }
            })
          } else if(req.params.dependency == 'BOTH') {
            
            //Removing all questionnaires based on dependency 'BOTH'

            Topic.update({
              'questionnaire.questionnaireId': recordId
            },{ 
              $pull: { 
                "questionnaire": {
                  "questionnaireId" : recordId 
                } 
              } 
            },{multi:true})
            .exec(function(err, topicUpdated) {
              if (err) {
                res.json({
                  status : false,
                  error : err.message
                })
              } else if(topicUpdated) {

                //Removing all questionnaires assigned to room configuration in room collection

                Room.update({
                  'roomConfiguration.feedback.questionnaireId' : recordId
                },{
                  $set: {
                    'roomConfiguration.feedback' : {
                      "feedbackType" : "Default"
                    }
                  }
                },{
                  multi : true
                }).exec(function(err, roomUpdated) {
                  if (err) {
                    res.json({
                      status : false,
                      error : err.message
                    })
                  } else if(roomUpdated) {

                    //Remove Questionnaire 
                    Questionnaire.remove({ 
                      _id : recordId 
                    })
                    .exec(function (error, response){
                      if (error) { 
                        res.json({ 
                          status : false, 
                          error : error.message 
                        }); 
                      } else {
                        res.json({ 
                          status : true, 
                          message : "Deleted successfully." 
                        });
                      }
                    })
                  } else {
                    res.json({
                      status : false,
                      error : 'Room Configuration not found'
                    })
                  }
                })
              } else {
                res.json({
                  status : false, 
                  error : 'Invalid Topic'
                })
              }
            }) 
          } else {
            

            //Remove Questionnaire 

            Questionnaire.remove({ 
              _id : recordId 
            })
            .exec(function (error, response){
              if (error) { 
                res.json({ 
                  status : false, 
                  error : error.message 
                }); 
              } else {
                res.json({ 
                  status : true, 
                  message : "Deleted successfully." 
                });
              }
            })
          }                  
        }
      } else {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("error in delete questionnaire", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteQuestion
*  @Purpose : For deleting particular question data from questionnaire
*  @Request Object : params : { qid: "questionnaire id", id: 'question id' }
*  @Response Object : Success - Success message, Questionnaire data, Failure - Error message
*  @Author : Prateek
*/
//Chnaged by prateek for delete questions bug#2924
export function deleteQuestion(req, res) {

  //Verifying if request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.params.qid && req.params.id) {

        //Validating if requested questionnaire id and question id is valid or not
        if (!req.params.qid || validator.isEmpty(req.params.qid) || !mongoose.Types.ObjectId.isValid(req.params.qid)) {
          // console.log("Invalid Question");
          res.json({
            status: false, 
            error : "Invalid Questionnaire."
          });
        } else if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          // console.log("Invalid questionId");
          res.json({
            status: false, 
            error : "Invalid questionId."
          });
        } else {

          //Query for checking if the questionnaire id is present in database
          var query = Questionnaire.findOne({ 
            _id : mongoose.Types.ObjectId(req.params.qid) 
          });
          query.exec(function(err, docs) {
            if (err) {
              // console.log("Error", error.message);
              res.json({
                status: false, 
                error: err.message 
              })
            } else if(docs){
              let questionId = req.params.id;

              Result.findOne({
                questionnaireId : docs._id
              }).exec(function(err, result) {
                if(err) {
                  res.json({
                    status : false,
                    error : err.message
                  })
                } else if(result) {
                  res.json({
                    status : false,
                    error : "Are you want to delete question from questionnaire as there are results based on question?",
                    httpStatusCode : 409
                  })
                } else {

                  //Query for removing the question from questionnaire
                  Questionnaire.update({
                    _id: mongoose.Types.ObjectId(req.params.qid)
                    }, { 
                      $pull: { 
                        "questions": {
                         "_id" : questionId 
                       } 
                     } 
                   }, function (error, result) {
                    if (error) { 
                      // console.log("Error", error.message);
                      res.json({ 
                        status : false, 
                        error: error.message, 
                        message : "Question not present in current questionnaire." 
                      });
                    } else {

                      //Query for sending the updated record to the client
                      var query = Questionnaire.findOne({ 
                        _id : mongoose.Types.ObjectId(req.params.qid) 
                      })
                      .exec(function (e, doc) {
                        if (e) { 
                          // console.log("Error", err.message);
                          res.json({ 
                            status: false, 
                            error : e.message, 
                            message : "Error while retriving question data." 
                          });
                        } else {
                          res.json({ 
                            status: true, 
                            data: doc, 
                            message : "Question removed successfully." 
                          });
                        }
                      });
                    }
                  });
                }
              })              
            } else {
              res.json({
                status : false,
                error : 'Questionnaire not found'
              })
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("error in delete question", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : confirmedDeleteQuestion
*  @Purpose : For deleting particular question data from questionnaire after taking confirmation from user
*  @Request Object : params : { qid: "questionnaire id", id: 'question id' }
*  @Response Object : Success - Success message, Questionnaire data, Failure - Error message
*  @Author : Prateek
*/
//Chnaged by prateek for delete questions bug#2924
export function confirmedDeleteQuestion(req, res) {

  //Verifying if request is valid or not
  checkValidRequest(req.headers, function(person) {
    try {
      if (person != null && req.params.qid && req.params.id) {

        //Validating if requested questionnaire id and question id is valid or not
        if (!req.params.qid || validator.isEmpty(req.params.qid) || !mongoose.Types.ObjectId.isValid(req.params.qid)) {
          // console.log("Invalid Question");
          res.json({
            status: false, 
            error : "Invalid Questionnaire."
          });
        } else if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          // console.log("Invalid questionId");
          res.json({
            status: false, 
            error : "Invalid questionId."
          });
        } else {
          let questionId = req.params.id;

          //Query for removing the question from questionnaire
          Questionnaire.update({
            _id: mongoose.Types.ObjectId(req.params.qid)
            }, { 
              $pull: { 
                "questions": {
                 "_id" : questionId 
               } 
             } 
           }, function (error, result) {
            if (error) { 
              // console.log("Error", error.message);
              res.json({ 
                status : false, 
                error: error.message, 
                message : "Question not present in current questionnaire." 
              });
            } else {

              //Query for sending the updated record to the client
              var query = Questionnaire.findOne({ 
                _id : mongoose.Types.ObjectId(req.params.qid) 
              })
              .exec(function (e, doc) {
                if (e) { 
                  // console.log("Error", err.message);
                  res.json({ 
                    status: false, 
                    error : e.message, 
                    message : "Error while retriving question data." 
                  });
                } else {
                  res.json({ 
                    status: true, 
                    data: doc, 
                    message : "Question removed successfully." 
                  });
                }
              });
            }
          });
        }
      } else {
        res.json({
          status: false, 
          error: "InValid Request"
        })
      }
    } catch(e) {
      console.log("error in delete question", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
*  @Function name : saveQuestionnaireGrades
*  @Purpose : For creating grades in questionnaire at corporate level
*  @Request Object : data : {grades}
*  @Response Object : Success - Success message, Questionnaire data, Failure - Error message
*  @Author : Prateek
*/

export function saveQuestionnaireGrades(req, res) {

  //Validation on user authentication status
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null && !req.body.data) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        
        let gradeInfo = req.body.data;
        GradeConfiguration.findOne({
          companyid : bussinessID
        }).exec(function(err, gradeResult) {
          if (err) {
            res.json({
              status : false,
              error : err.message
            })
          } else if(_.isEmpty(gradeResult) == false){
            GradeConfiguration.update({
              companyid : bussinessID,
              grades : gradeInfo
            }).exec(function(err, updated) {
              if (err) {
                res.json({
                  status : false,
                  error : err.message
                })
              } else { 

                GradeConfiguration.findOne({
                  companyid : bussinessID
                }).exec(function(err, gradeResult) {
                  if (err) {
                    res.json({
                      status : false,
                      error : err.message
                    })
                  } else {
                    res.json({
                      status : true,
                      message : 'Updated Successfully.',
                      data : gradeResult.grades
                    }) 
                  }
                })
              }   
            })
          } else if(_.isEmpty(gradeResult) == true){
           
            let obj = {};
            obj['grades'] = gradeInfo;
            obj['companyid'] = bussinessID;
            obj['createdBy'] = person._id;

            var objEntity = new GradeConfiguration(obj);
            objEntity.save(function (err, doc) {
              if (err) {
                res.json({ 
                  status : false, 
                  error : err.message 
                });
              } else { 
                res.json({ 
                  status : true, 
                  data : doc.grades, 
                  message : "Updated Successfully." 
                });
              }
            })
          }
        })
      }
    } catch(e) {
      console.log('error in saveQuestionnaireGrades',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}



/**
*  @Function name : getQuestionnaireGrades
*  @Purpose : For getting grades in questionnaire at corporate level
*  @Response Object : Success - Success message, Questionnaire data, Failure - Error message
*  @Author : Prateek
*/

export function getQuestionnaireGrades(req, res) {

  //Validation on user authentication status
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null && !req.body.data) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        
        GradeConfiguration.findOne({
          companyid : bussinessID
        }).exec(function(err, gradeResult) {
          if (err) {
            res.json({
              status : false,
              error : err.message
            })
          } else {
            if(_.isEmpty(gradeResult) == true) {
              res.json({ 
                status : true, 
                data : [{
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
                }]            
              });
            } else {
              res.json({ 
                status : true, 
                data : gradeResult.grades             
              });
            }
          }
        })
      }
    } catch(e) {
      console.log('error in getQuestionnaireGrades',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchQuestionnaire
*  @Purpose : For fetching questionnaire data
*  @Response Object : Success - Questionnaire data, Failure - Error message
*  @Author : gaddam pranathi
*/

export function fetchQuestionnairesData(req, res) {
    //Validation on user authentication status
  checkValidRequest(req.headers, function(person) {
    
    try {
      //Verifying if request is valid or not
      if (person == null ) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else { 

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        let resData = [['', 'Select Questionnaire']];
        Questionnaire.find({corporateId: bussinessID})
        .exec(function(err, quesitonnaireData){
          if(err) {
            console.log("err in fetchQuestionnairesData === ", err);
            res.json({
              status: true,
              data: resData
            });
          } else if(quesitonnaireData && quesitonnaireData.length > 0) {

            for(let i in quesitonnaireData ) {
              resData.push([quesitonnaireData[i]._id, quesitonnaireData[i].questionnaireName]);
            }
            // console.log('resData',resData);

            res.json({
              status: true,
              data: resData
            });
          } else {
            res.json({
              status: true,
              data: resData
            });
          }
        });
      }
    } catch(e) {
      console.log('error in fetchQuestionnaire',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : fetchCloneQuestionnaire
*  @Purpose : For fetching questionnaire data
*  @Response Object : Success - Questionnaire data, Failure - Error message
*  @Author : gaddam pranathi
*/

export function fetchCloneQuestionnaire(req, res) {
    //Validation on user authentication status
  checkValidRequest(req.headers, function(person) {
    
    try {
      //Verifying if request is valid or not
      if (person == null  && !req.params.id) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else { 

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        let resData = [['', 'Select Questionnaire']];
        Questionnaire.find({corporateId: bussinessID, _id:{$ne:mongoose.Types.ObjectId(req.params.id)}})
        .exec(function(err, quesitonnaireData){
          if(err) {
            console.log("err in fetchCloneQuestionnaire === ", err);
            res.json({
              status: true,
              data: resData
            });
          } else if(quesitonnaireData && quesitonnaireData.length > 0) {

            for(let i in quesitonnaireData ) {
              resData.push([quesitonnaireData[i]._id, quesitonnaireData[i].questionnaireName]);
            }
            // console.log('resData',resData);

            res.json({
              status: true,
              data: resData
            });
          } else {
            res.json({
              status: true,
              data: resData
            });
          }
        });
      }
    } catch(e) {
      console.log('error in fetchQuestionnaire',e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}



