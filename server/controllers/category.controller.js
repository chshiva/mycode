import Category from '../models/category';
import Users from '../models/users';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import * as EmailForCorporateCreation from '../emailFunctions';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';
var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator'); 
import {addSlash} from '../controllers/slashesActions';

/**
*  @Function name : saveCategory
*  @Purpose : For creating category
*  @Request Object : categorydata : { data : { uid : "user id", corporateId : "corporateId", categoryName: "categoryName", categoryDesc: "categoryDesc", _id: "category id" } }
*  @Response Object : Success - Success message, Category data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function saveCategory(req, res) {
  checkValidRequest(req.headers, function(person) {
      
    try {

      //Verifying if request is valid or not
      if (person == null || !req.body.categorydata || !req.body.categorydata.data) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {
        let obj = req.body.categorydata.data;
        
        //If user have a valid role
        if ( person.role == Roles.Superadmin || person.role == Roles.Admin ||  person.role == Roles.Lmsadmin ||  person.role == Roles.CRMadmin ||  person.role == Roles.Presenteradmin) {
          var corpID = '';    
          if(person.role == Roles.Superadmin) {
            corpID = obj.corporateId;  
          } else {

            //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
            corpID = person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '';  
          }

          checkCategoryNameExistance(corpID, obj.categoryName, undefined, function(err, categoryStatus) {
            if(err) {
              res.json({ 
                status : false, 
                error : err 
              });
            } else if(categoryStatus == true){
              obj['corporateId'] = corpID;
              obj['createdBy'] = mongoose.Types.ObjectId(person._id);
              obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
              obj['createdAt'] = moment().utc().toDate();
              obj['modifiedAt'] = moment().utc().toDate();
              
              delete obj["uid"]; 
              
              //Create new category
              var objEntity = new Category(obj);
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
                  //   logType : 'Category',
                  //   actionType : 'Created',
                  //   actionTime : now,
                  //   uid : obj.createdBy,
                  //   details : {
                  //     name : obj.categoryName,
                  //     corporateId : obj.corporateId,
                  //     remoteAddress : req.connection.remoteAddress,
                  //     userAgent : req.headers['user-agent']
                  //   }
                  // } 

                  //Function for creating log on successful creation of category
                  // createLog(logObj, function(status) {
                  //   if(status) {
                  //     // console.log(status);
                  //   }
                  // });
                }
              });
            }
          })
        } else {
          res.json({ 
            status: false, 
            error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("Error in save category", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : updateCategory
*  @Purpose : For updating category
*  @Request Object : categorydata : { data : { uid : "user id", corporateId : "corporateId", categoryName: "categoryName", categoryDesc: "categoryDesc", _id: "category id" } }
*  @Response Object : Success - Success message, Category data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function updateCategory(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id) || !req.body.categorydata || !req.body.categorydata.data) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {
        let obj = req.body.categorydata.data;
                
        //If user has a valid role
        if (person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin ||  person.role == Roles.CRMadmin ||  person.role == Roles.Presenteradmin) {

          //If category id is there then update data
          if (req.params.id && (req.params.id != "" || req.params.id != undefined)) {
            var corpID = '';    
            if(person.role == Roles.Superadmin) {
              corpID = obj.corporateId;  
            } else {

              //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
              corpID = person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '';  
            }
            let recordId = mongoose.Types.ObjectId(req.params.id);
            obj['modifiedBy'] = mongoose.Types.ObjectId(person._id);
            obj['modifiedAt'] = moment().utc().toDate();
            delete obj["uid"];

            var data = Category.findOne({ 
              _id : recordId 
            });
            data.exec(function(err, categoryData) {
              if(err) {
                res.json({ 
                  status : false, 
                  error : err.message
                });
              } else if (categoryData) {

                checkCategoryNameExistance(corpID, obj.categoryName, categoryData.createdAt, function(err, categoryStatus) {
                  if(err) {
                    res.json({ 
                      status : false, 
                      error : err 
                    });
                  } else if(categoryStatus == true){

                    //If data is present then update the category
                    Category.update({ 
                      _id : recordId 
                    },{ 
                      $set : obj 
                    },{ 
                      runValidators: true 
                    },function (err, doc) {
                      if (err) {
                        res.json({ 
                          status : false, 
                          error : err.message 
                        });
                      } else {

                        //Query for sending the updated record to the client
                        var query = Category.findOne({ 
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
                })
              } else {
                res.json({ 
                  status : false, 
                  error : "Invalid Category" 
                });
              } 
            })             
          } else {
            res.json({ 
              status : false, 
              error : "Invalid Cateogory Id" 
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
      console.log("Error in update category", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : checkCategoryNameExistance
*  @Purpose : For checking whether the category already exists in db.
*  @Request Object : cid : corporateId, categoryName : categoryName, cb
*  @Response Object : Success - true, Failure - Error message
*  @Author : Prateek
*/

export function checkCategoryNameExistance(cid, categoryName, categoryDate1, cb) {
  try{
    // console.log(cid, categoryName, categoryDate1);
    let slash_search = addSlash(categoryName);
    let searchKey = new RegExp(["^", slash_search, "$"].join(""),'i'); 
    let selector = {};
    selector['corporateId'] = cid;
    selector['categoryName'] = searchKey;
    Category.find(selector, function(err, categoryData) {
      if (err) {
        cb(err.message, null)
      } else {
        if(categoryData && categoryData.length < 1) {
          cb(null, true)
        } else if(categoryData && categoryData.length == 1 && categoryDate1 != undefined ) {
          let toBeUpdatedFielddate1 = categoryDate1.toString(); 
          let categoryDate2 = categoryData[0].createdAt.toString();
          if(toBeUpdatedFielddate1 == categoryDate2) {
            cb(null, true)
          } else {
            cb('Category already exists with same name, Please try again', null)
          }
        } else {
          cb('Category already exists with same name, Please try again', null)
        }
      }
    })
  } catch(e) {
    cb("Internal server error.", null);
  }
}

/**
*  @Function name : fetchCategory
*  @Purpose : For fetching particular category data
*  @Request Object : params : { id: "category id" }
*  @Response Object : Success - Category data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function fetchCategory(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id) {
        res.json({ 
          status : false, 
          error : "Invalid request." 
        });
      } else {

        //Validating if category id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
            status: false, 
            error : "Invalid category"
          });
        } else {

          //Query for finding the category data based on category id
          var query = Category.findOne({ 
            _id : mongoose.Types.ObjectId(req.params.id) 
          });
          query.populate('corporateId',  'businessName -_id')
          .exec(function (error, doc) {
            if (error) { 
              res.json({ 
                status: false, 
                error : error.message 
              }); 
            } else {
              res.json({ 
                status: true, 
                data: doc 
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("Error in fetch category", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteCategory
*  @Purpose : For deleting particular category data
*  @Request Object : params : { id: "category id" }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteCategory(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({ 
          status : false, 
          error : "Invalid request." 
        });
      } else {
        var recordId = mongoose.Types.ObjectId(req.params.id);

        //Query for checking if the category id is present in database
        var query = Category.findOne({ 
          _id : recordId 
        });
        query.exec(function (err, doc) {
          if (err) { 
            res.json({ 
              status: false, 
              error : err.message 
            }); 
          } else {

            //Remove the category based on category id from database
            var innerquery = Category.remove({ 
              _id : recordId 
            });
            innerquery.exec(function (error, response){
              if (error) { 
                res.json({ 
                  status : false, 
                  error : error.message 
                }); 
              } else {
                res.json({ 
                  status : true, 
                  message : "Deleted successfully" 
                });
                let now = moment().utc().toDate();

                //Log obj which need to be inserted in logger collection
                // let logObj = {
                //   logType : 'Category',
                //   actionType : 'Deleted',
                //   actionTime : now,
                //   uid : doc.createdBy,
                //   details : {
                //     name : doc.categoryName,
                //     corporateId : doc.corporateId,
                //     remoteAddress : req.connection.remoteAddress,
                //     userAgent : req.headers['user-agent']
                //   }
                // } 

                //Function for creating log on successful deletion of category
                // createLog(logObj, function(status) {
                //   if(status) {
                //     // console.log(status);
                //   }
                // });
              }
            });
          }
        });
      }
    } catch(e) {
      console.log("Error in delete category", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : listCategory
*  @Purpose : For fetching complete category data
*  @Request Object :  query : { page, items, search }
*  @Response Object : Success - Category data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listCategory(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page) {
        res.json({
          status: false, 
          error : "Invalid request"
        });
      } else {
        let queryData = req.query;
        var selector = {};

        //Search selector based on user role
        if (person.role == Roles.Superadmin) {
          selector = {};
        } else if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.CRMadmin ||  person.role == Roles.Presenteradmin) {
          selector = {

            //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
            corporateId: (person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '')
          };
        }

        //If searchKeyword is not empty then create RegExp
        if (queryData.search && queryData.search != '') {
          let slash_search = addSlash(queryData.search);
          var searchKey = RegExp(slash_search,'i');         
          selector['$or'] = [                
            { 'categoryName' : {$regex: searchKey} },
            { 'categoryDesc' : {$regex: searchKey} }
          ]; 
        }         

        //Query for fetching complete category data based on selector and skip items based on itemsPerPage on previous page
        var query = Category.find(selector)
          .limit(Number(queryData.items))
          .select('corporateId categoryName categoryDesc')
          .skip(Number(queryData.items) * (Number(queryData.page)-1))
          
          if (req.query.sort == 'undefined' || req.query.sort == undefined) {
            query.sort({ modifiedAt: -1 });
          } else {
            // console.log("sort === ", req.query.sort);
            query.sort(JSON.parse(req.query.sort));
          } 
        if (query) {        
          query.populate('corporateId',  'businessName -_id')
          .exec(function(err, result) {
            if(err) {
              res.json({ 
                status : false, 
                error : err.message 
              });
            } else {

              //Query for counting complete category data based on selector
              Category.count(selector).exec(function(error, count){
                // console.log("category data", result);
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
      }
    } catch(e) {
      console.log("Error in list category", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}






