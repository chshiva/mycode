import Corporate from '../models/corporate';
import Users from '../models/users';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import * as EmailForCorporateCreation from '../emailFunctions';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';
import {addSlash} from '../controllers/slashesActions';

//import * as CorporateController from './corporate.controller';
var _ = require('lodash');
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');

/**
* @Function Name: "listCorporate",
* @Purpose: "To get list of packages.",
* @Request Object: query : {items, page, search},
* @Response Object: Success- {status : true, data, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function listCorporate(req, res){

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query.items && req.query.page) {
        let queryData = req.query;
        let selector = {};

        // check is there searcha value 
        if (queryData.search && queryData.search != '') {
            let slash_search = addSlash(queryData.search);
            let searchKey = RegExp(slash_search,'i');
            selector['$or'] = [
              { 'businessId' : {$regex: searchKey} },
              { 'businessName' : {$regex: searchKey} },
              { 'contactDetails.name' : {$regex: searchKey} },
              { 'contactDetails.phoneNo' : {$regex: searchKey} },
              { 'address.state' : {$regex: searchKey} },
              { 'address.country' : {$regex: searchKey} }
            ]; 
        }

        // only superadmin can see the list of corporates
        if (person.role == Roles.Superadmin) {
          let query = Corporate.find(selector)
                  .limit(Number(queryData.items))
                  .select('businessId businessName businessType contactDetails address')
                  .skip(Number(queryData.items) * (Number(queryData.page)-1));
                  
          if (req.query.sort == 'undefined' || req.query.sort == undefined) {
            query.sort({ modifiedAt: -1 });
          } else {
            // console.log("sort === ", req.query.sort);
            query.sort(JSON.parse(req.query.sort));
          } 
          query.exec(function(err, result){
            if (err) res.json({ status : false, error : err });
            else {
              Corporate.count(selector).exec(function(error, count){
                res.json({ status : true, data : result, count : count });
              });
            }
          });
        } else res.json({ status: false, error : "Access denied." });
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in listCorporate",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
};

/**
* @Function Name: "createCorporate",
* @Purpose: "To create new package.",
* @Request Object: packagedata : { businessId, businessName, businessType, address, phoneNo, websiteAddr, companyStatus, scheduleType, contactDetails, legalDocuments},
* @Response Object: Success- {status : true, id, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function createCorporate (req, res) {
  try{
    if (req.body.corporatedata) {
      let obj = req.body.corporatedata;

      // request came from portal
      if (obj.from && obj.from == 'PORTAL') {

        // check businessId is unique or not
        let query = Corporate.findOne({ 'businessId' : addSlash(obj.businessId) });
        query.exec(function (err, corporate) {
          if (err) res.json({ status : false, error : err.message });
          else if (corporate) res.json({ status : false, error : 'Already corporate present with same business id' });
          else {

            // create new corporate account
            obj['createdBy'] = mongoose.Types.ObjectId(obj.uid);
            obj['modifiedBy'] = mongoose.Types.ObjectId(obj.uid);
            obj['createdAt'] = moment().utc().toDate();
            delete obj['from'];
            let objEntity = new Corporate(obj);
            objEntity.save(function (err, newCorporate) {
              if (err){
                res.json({ status : false, error : err });
              }else{
                res.json({ status : true, data : newCorporate, message : "Created successfully." });
              }
            });
          }
        });
      } else{

        // Varifying request is valid or not
        checkValidRequest(req.headers, function(person){
          try{
            if (person != null){

              // only superadmin can create the corporate account
              if (person.role == Roles.Superadmin) {
                obj["uid"] = person._id;
                createCorporateCallback(obj, function(corporateerr, corporateData){
                  if (corporateData) {
                    res.json({ status : true, id : corporateData.id, message : corporateData.message });
                  } else if (corporateerr) {
                    res.json({ status : false, error : corporateerr });
                  } else {
                    res.json({ status : false, error : "Internal Server Error, Please try again" });
                  }
                });
              } else res.json({status : false, error : "Access denied."});
            } else  res.json({status : false, error : "Invalid request."});
          } catch(ex){
            console.log("e in createCorporate inner === ",ex);
            res.json({status : false, error : "Internal server error."});
          }
        });
      }
    } else res.json({status : false, error : "Invalid request."});
  } catch(e){
    console.log("error in createCorporate",e);
    res.json({status : false, error : "Internal server error."});
  }
}

export function createCorporateCallback(corporateObj, cb){
	
	try {
    // check businessId is unique or not
    let query = Corporate.findOne({ 'businessId' : addSlash(corporateObj.businessId) });
    query.exec(function (err, corporate) {
      if (err) cb(err.message, null);
      else if (corporate)  cb('Already corporate present with same business id', null);
      else {

        // create new corporate account
        corporateObj['createdBy'] = mongoose.Types.ObjectId(corporateObj.uid);
        corporateObj['modifiedBy'] = mongoose.Types.ObjectId(corporateObj.uid);
        corporateObj['createdAt'] = moment().utc().toDate();
        corporateObj['modifiedAt'] = moment().utc().toDate();
        delete corporateObj["uid"]; 
        let objEntity = new Corporate(corporateObj);
        objEntity.save(function (error, newCorporate) {
          /*console.log("err == ",error);
          console.log("newCorporate == ",newCorporate);*/
          if (error) cb(error.message, null);
          else if (newCorporate){
            let resData = {
              id : newCorporate._id,
              message : "Created successfully." 
            }
            cb(null, resData);
              
              // create logs
              // let logObj = {
              //   logType : 'Corporate',
              //   actionType : 'Created',
              //   actionTime : moment().utc().toDate(),
              //   uid : obj.createdBy,
              //   details : {
              //     name : obj.businessName,
              //     businessId : obj.businessId,
              //     remoteAddress : req.connection.remoteAddress,
              //     userAgent : req.headers['user-agent']
              //   }
              // }  
              // createLog(logObj, function(status) {
              //   if(status) {
              //     // console.log(status);
              //   }
              // });

              // send email 

              /*Users.findOne({_id:  mongoose.Types.ObjectId(doc.createdBy)},function(err,name){
                  if(name && name.email){
                    var exchangeData = {
                      to : doc.contactDetails.email,
                      whoCreated :name.email,
                      subject : 'Corporate Created',
                      body : 'New Corporate Account with name '+doc.contactDetails.firstname+' has been created by '+name.firstname +' '+name.lastname+'.'
                    }
                    console.log("exchangeData === ",exchangeData);
                    EmailForCorporateCreation.createUserMail(exchangeData, function(emailerror, emailsuccess){
                      if(emailerror.status == false){
                        console.log("Email not sent");
                      }else{
                        console.log("Email sent");
                      }
                    });
                    
                  }else{

                    res.json({status : false,error : "User not found ." });
                  }
                  
                });*/

            //console.log("doc === ",doc);
          } else cb("Internal server error", null);
        });
      }
    });
	} catch(e) {
		console.log('error in createCorporateCallback',e);
		cb("Internal server error, Please try again", null);
	}
}

/**
* @Function Name: "updateCorporate",
* @Purpose: "To create new package.",
* @Request Object: params : id, packagedata : { businessId, businessName, businessType, address, phoneNo, websiteAddr, companyStatus, scheduleType, contactDetails, legalDocuments},
* @Response Object: Success- {status : true, id, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function updateCorporate (req, res) {
  try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
      if (person != null && req.body.corporatedata && req.params.id){
        let obj = req.body.corporatedata;

        // only superadmin can update any corporate account
        if(person.role == Roles.Superadmin){
          let recordId = mongoose.Types.ObjectId(req.params.id);
          obj['modifiedBy'] = mongoose.Types.ObjectId(person.uid);
          obj['modifiedAt'] = moment().utc().toDate();
          delete obj["uid"];

          // check valid corporate or not
          let query = Corporate.findOne({ _id : recordId });
          query.exec( function(err, corporate){
            if (corporate) {

              // check businessId is unique or not
              let checkQuery = Corporate.findOne({ _id : {$ne : recordId}, 'businessId' : addSlash(obj.businessId) });
              checkQuery.exec(function (error, existed) {
                if (error) res.json({ status : false, error : err.message });
                else if (existed) res.json({ status : false, error : 'Already corporate present with same business id' });
                else {

                  // update the corporate with new data
                  Corporate.update({ _id : recordId },{ $set : obj },{ runValidators: true },function (err, doc) {
                    /*console.log("update err == ",err);
                    console.log("update doc == ",doc);*/
                    if (err) res.json({ status : false, error : err });
                    else if(doc) res.json({ status: true, id: recordId, message : "Updated successfully." });
                    else res.json({ status : false, error : "Internal server error."});
                  });
                }
              });
            } else res.json({status : false, error : "Invalid corporate"});
          });
        } else res.json({ status : false, error : "Access denied."});
      } else res.json({status : false, error : "Invalid request."});
    });
  } catch(e){
    console.log("error in updateCorporate",e);
    res.json({status : false, error : "Internal server error."});
  }
}


/**
* @Function Name: "fetchCorporate",
* @Purpose: "To create new package.",
* @Request Object: params : { id },
* @Response Object: Success- {status : true, data }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function fetchCorporate(req, res){
  try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person) {
      try{
        if (person != null && req.params.id) {

          // check and fetch corporate
          let query = Corporate.findOne({ _id : mongoose.Types.ObjectId(req.params.id) });
          query.exec(function (error, corporate) {
            if (error) { 
              console.log("error === ",error);
              res.json({ status: false, error : "Failed to load data." });
            } else if (corporate) res.json({ status: true, data: corporate });
            else res.json({ status : false, error : "Internal server error."});
          });
        } else res.json({status : false, error : "Invalid request."});
      } catch(e){
        console.log("e in fetchCorporate inner === ",e);
        res.json({status : false, error : "Internal server error."});
      }
    });
  } catch(e){
    console.log("error in fetchCorporate",e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
* @Function Name: "deleteCorporate",
* @Purpose: "To create new package.",
* @Request Object: params : { id },
* @Response Object: Success- {status : true, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function deleteCorporate(req, res) {
  try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person) {
      try{
        if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {

          // superadmin only can delete any corporate account
          if(person.role == Roles.Superadmin){
            let recordId = mongoose.Types.ObjectId(req.params.id);

            // check valid corporate or not
            let query = Corporate.findOne({ _id : recordId });
            query.exec(function (err, doc) {
              if (err) { res.json({ status: false, error : err }); }
              else if (doc) {

                // delete the corporare record
                let remodeQuery = Corporate.remove({ _id : recordId });
                remodeQuery.exec(function (error, response){
                  if (error) { res.json({ status : false, error : error }); }
                  else {
                    res.json({ status : true, message : "Deleted succesfully" });
                    
                    // create log for delete
                    // let logObj = {
                    //   logType : 'Corporate',
                    //   actionType : 'Deleted',
                    //   actionTime : moment().utc().toDate(),
                    //   uid : doc.createdBy,
                    //   details : {
                    //     name : doc.businessName,
                    //     businessId : doc.businessId,
                    //     remoteAddress : req.connection.remoteAddress,
                    //     userAgent : req.headers['user-agent']
                    //   }
                    // }  
                    // createLog(logObj, function(status) {
                    //   if(status) {
                    //     // console.log(status);
                    //   }
                    // });
                  }
                });
              } else res.json({status : false, error : "Invalid corporate."});
            });
          } else res.json({ status: false, error : "Access denied."});
        } else res.json({status : false, error : "Invalid request."});
      } catch(e){
        console.log("e in deleteCorporate inner === ",e);
        res.json({status : false, error : "Internal server error."});
      }
    });
  } catch(e){
    console.log("error in deleteCorporate",e);
    res.json({status : false, error : "Internal server error."});
  }
}

/**
* @Function Name: "getCorporateIds",
* @Purpose: "To create new package.",
* @Request Object: {},
* @Response Object: Success- {status : true, data }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function getCorporateIds(req, res){
  let options = [['', 'Select Corporate']];
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null) {

        // for superadmin fetch all company ids
        if (person.role == Roles.Superadmin ) {
          let query = Corporate.find({});
          query.exec(function (error,doc) {
            if(doc){              
              _.forIn(doc, function(value, key) {
                let name = value.businessId+"("+value.businessName+")";
                options.push([value._id, name]);
              });
              res.json({ data : options});
            }
            else{
              res.json({ data : options});
            }
          });
        } else if (person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.CRMadmin || person.role == Roles.Presenteradmin) {
          

          //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
          let bussinessID = null;
          if(person.profile.companyid && person.profile.companyid._id) {
            bussinessID = person.profile.companyid._id;
          }
          // for any admin fetch his company id
          let query = Corporate.findOne({ _id : bussinessID});
          query.exec(function (error,doc) {
            if (doc) {
              let name = doc.businessId+"("+doc.businessName+")";
              options.push([doc._id, name]);
              res.json({ data : options});
            } else res.json({ data : options});
          });
        } else res.json({data : options}); 
      } else res.json({data : options});
    } catch(e) {
      console.log("error in getCorporateIds",e);
      res.json({data : options});
    }
  });
}