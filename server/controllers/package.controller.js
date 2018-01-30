import Package from '../models/package';
import Users from '../models/users';
import Room from '../models/room';
import { Roles } from './admin.user.controller';
// import * as EmailForCorporateCreation from '../emailFunctions';
import config from '../config';
import { checkValidRequest } from '../authorization';
import * as EmailForUserCreation from '../emailFunctions';
import {addSlash} from './slashesActions';

var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');

/**
* @Function Name: "listPackage",
* @Purpose: "To get list of packages.",
* @Request Object: query : {items, page, search},
* @Response Object: Success- {status : true, data, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function listPackage(req, res){

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.query.items && req.query.page) {
        let queryData = req.query;

        // beased on role and pagination wise we need to fetch the packages
        if (person.role == Roles.Superadmin) {
          let selector = {};

          // if it is search request
          if (queryData.search && queryData.search != '') {
            let slash_search = addSlash(queryData.search);
              let searchKey = RegExp(slash_search,'i');         
              selector['$or'] = [                
                { 'packageName' : {$regex: searchKey} },
                { 'serverLocation' : {$regex: searchKey} }
              ]; 
          }           
          let query = Package.find(selector)
                  .limit(Number(queryData.items))
                  .select('packageName packageValidity packagePrice userCount continuousPresence serverLocation createdBy')
                  .populate('createdBy', 'firstname lastname -_id')
                  .skip(Number(queryData.items) * (Number(queryData.page)-1))
                  // .sort({
                  //   modifiedAt: -1
                  // });
                  if (req.query.sort == 'undefined' || req.query.sort == undefined) {
                    query.sort({ modifiedAt: -1 });
                  } else {
                   // console.log("sort === ", req.query.sort);
                    query.sort(JSON.parse(req.query.sort));
                  }   
          query.lean().exec(function(err, result){             
            if (err) { res.json({ status : false, error : err });}
            else if(result){                
              Package.count(selector).exec(function(error, count) {
                //console.log("DATA--", result);
                //console.log("count--", count);
                // console.log("DATA--", result);
                for(let i = 0; i < config.location.length; i++ ) {
                  for(let j=0; j < result.length; j++ ) {
                    if(config.location[i][0] == result[j].serverLocation) {
                      result[j].serverLocation = config.location[i][1];
                    }                    
                  }
                }             
                res.json({ status : true, data : result, count : count });
              });
            }else res.json({ status : false, error : "Internal server error." });
          });
        } else if (person.role == Roles.Admin || person.role == Roles.Lmsadmin ||  person.role == Roles.Presenteradmin) {           
          let selector = { assignedTo : mongoose.Types.ObjectId(person._id)};
          
          // if it is search request
          if (queryData.search && queryData.search != '') {
            let slash_search = addSlash(queryData.search);
              let searchKey = RegExp(slash_search, 'i');        
              selector['$or'] = [                
                { 'packageName' : {$regex: searchKey} },
                { 'serverLocation' : {$regex: searchKey} }
              ]; 
          }
          let query = Package.find(selector)
                  .limit(Number(queryData.items))
                  .select('packageName packageValidity packagePrice userCount continuousPresence serverLocation')
                  .skip(Number(queryData.items) * (Number(queryData.page) - 1))
                  .sort({
                    modifiedAt: -1
                  });
          query.exec(function(err, result){
            if (err) res.json({ status : false, error : err });
            else if (result) {                
              Package.count(selector).exec(function(error, count){
                 // console.log("DATA--", result);
                 // console.log("count--", count);
                for(let i = 0; i < config.location.length; i++ ) {
                  for(let j=0; j < result.length; j++ ) {
                    if(config.location[i][0] == result[j].serverLocation) {
                      result[j].serverLocation = config.location[i][1];
                    }                    
                  }
                } 
                res.json({ status : true, data : result, count : count });
              });
            } else res.json({ status : true, data : [], count : 0 });
          });
        } else res.json({ status: false, error : "Access denied." });
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in listPackage",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

/**
* @Function Name: "createPackage",
* @Purpose: "To create new package.",
* @Request Object: packagedata : { packageName, packagePrice, userCount, roomCount, topicCount, continuousPresence, features, packageValidity, serverLocation, assignedTo},
* @Response Object: Success- {status : true, data, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function createPackage(req, res) {

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.packagedata) {
        let obj = req.body.packagedata;

        // only superadmin can create the package and from portal
        if (person.role == Roles.Superadmin || (obj.checkPortal && obj.checkPortal == 'Portal')) {
          obj["email"] = person.email;
          createPackageCallback(obj, function(packageerr, packageData){
            if (packageData) {
              res.json({ status : true, id : packageData.id, message : packageData.message });
            } else if (packageerr) {
              res.json({ status: false, error: packageerr });
            } else {
              res.json({ status: false, error: "Internal Server Error, Please try again later"});
            }
          });
        } else res.json({status : false, error : "Access denied."});
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in createPackage",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

export function createPackageCallback(packageObj, cb){
	
	try {
    packageObj['createdBy'] = packageObj.uid;
    packageObj['modifiedBy'] = packageObj.uid;
    packageObj['createdAt'] = moment().utc().toDate();
    delete packageObj["uid"];
    let email = packageObj.email;
    delete packageObj["email"];
    // create new package record in database
    var objEntity = new Package(packageObj);
    objEntity.save(function (err, newpackage) {
      if (err) cb(err.message, null);
      else if (newpackage) {
      /*if(paymentFlag){
          if(person && person.email){

             var exchangeData = {
              to : person.email,
              whoCreated :person.email,
              subject : 'Package Purchased !! Get details',
              firstname : person.firstname,
              order_id : doc.payment_details.order_id ,
              password : password
            }
            EmailForCorporateCreation.createCorporateMail(exchangeData, function(emailerror, emailsuccess){
            
            if(emailerror){
                  //console.log('error---',emailerror);
                   res.json({ status: false, error: "Email not sent"});
                }else{
                  console.log('sucess')
                  res.json(status:true,data:doc,message:"Mail sent")
                }

              });
            
          }else{

            res.json({ status: false, error: "Can not find user"});
          }
        }else{*/
        // var query = Users.findOne({ 
        //     _id: mongoose.Types.ObjectId(obj.assignedTo) 
        //   });
        // query.populate('email').exec(function(e, doc){
        //   if (e) {
        //     console.log('e===',e);
        //   } else {
        //     console.log('doc===',doc);
        //   }
        // })
        let resData = {
          id: newpackage._id,
          message: "Created successfully."
        }
        cb(null, resData);
        // res.json({ status : true, id : newpackage._id, message : "Created successfully." });
        let packageObject = {
          assignedTo : packageObj.assignedTo,
          subject : 'The Package Created',
          userBody : 'The Package  '+ '<b>' + packageObj.packageName + '</b>' +' has been assigned to you.',
          operatorBody : 'You have successfully created the package '+'<b>' + packageObj.packageName + '</b>'+' .',
          email : email
        };
        sendPackageEmail(packageObject);
        // for logs
        // let logObj = {
        //   logType : 'Package',
        //   actionType : 'Created',
        //   actionTime : moment().utc().toDate(),
        //   uid : person._id,
        //   details : {
        //     name : obj.packageName,
        //     assignedTo : obj.assignedTo,
        //     remoteAddress : req.connection.remoteAddress,
        //     userAgent : req.headers['user-agent']
        //   }
        // }  
        // createLog(logObj, function(status) {
        //   if (status) {
        //     // console.log(status);
        //   }
        // });
      } else cb("Internal server error", null); 
    });
	} catch(e) {
		console.log('error in createPackageCallback',e);
		cb("Internal server error, Please try again", null);
	}
}

export function sendPackageEmail(obj){
  Users.findOne({_id: obj.assignedTo },function(err,name) { 
    if (name && name.email) {
      let exchangeData = {
        to : name.email,
        subject : obj.subject,
        body : obj.userBody,
        descreption : 'Please login for more details.'
      };

      // Commented for temporary bases
      // Email will be sent to assigned package user when create, update and delete package.

      // EmailForUserCreation.defaultUserMail(exchangeData, function(emailerror, emailsuccess) {
      //   //console.log(emailerror.status)
      //   if (emailerror.status == false) {
      //     console.log("Email not sent");
      //     } else {
      //     //console.log('email sent')
      //   }
      // });

      let myMailData = {
        to : obj.email,
        subject : obj.subject,
        body : obj.operatorBody,
        descreption : 'Please login for more details.'
      };

      // Commented for temporary bases
      // Email will be sent to super admin when create, update and delete package.
      
      // EmailForUserCreation.defaultUserMail(myMailData, function(emailerror, emailsuccess) {
      //   //console.log(emailerror.status)
      //   if (emailerror.status == false) {
      //     console.log("Email not sent");
      //   } else {
      //     //console.log('email sent')
      //   }
      // });
    }
  });
}

/**
* @Function Name: "updatePackage",
* @Purpose: "To update existing package data.",
* @Request Object: packagedata : {_id, packageName, packagePrice, userCount, roomCount, topicCount, continuousPresence, features, packageValidity, serverLocation, assignedTo},
* @Response Object: Success- {status : true, data, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function updatePackage(req, res) {

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.packagedata && req.params.id) {
        
        // only superadmin can update the package no one else
        if(person.role == Roles.Superadmin) {
          let obj = req.body.packagedata;
          let recordId = mongoose.Types.ObjectId(req.params.id);
          obj['createdBy'] = person._id;
          obj['modifiedBy'] = person._id;
          obj['modifiedAt'] = moment().utc().toDate();
          delete obj["uid"];

          // cheack packageid is valid or not. 
          Package.findOne({ _id : recordId }, function(error, data){
            if (data) {

              // check any validation changes(user count and room count)
              checkUpdateValidations(data, obj, function(response){
                if(response != null) res.json({ status : false, error : response });
                else {
                  Package.update({ _id : recordId },{ $set : obj },{ runValidators: true },function (err, doc) {
                    // console.log("update err == ",err);
                    // console.log("update doc == ",doc);
                    if (err) res.json({ status : false, error : err });
                    else res.json({ status: true, id: recordId, message : "Updated successfully." });

                    let packageObj = {
                      assignedTo : obj.assignedTo,

                      subject : 'The Package Updated',
                      userBody : 'The Package  '+ '<b>' + obj.packageName + '</b>' +' has been assigned to you.',
                      operatorBody : 'You have successfully updated the pre-created package '+'<b>' + obj.packageName + '</b>' + '.',
                      email : person.email
                    };
                    sendPackageEmail(packageObj);
                  });
                }
              });
            } else res.json({ status : false, error : "Invalid Package" });
          });
        } else res.json({ status : false, error : "Access denied" });
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in updatePackage",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

/**
*  @Function name : fetchPackage
*  @Purpose : For fetch particular Package data
*  @Request Object : params : { id: "packageId" }
*  @Response Object : Success - Success message and data, Failure - Error message
*  @Author : Prudhvi
*/
export function fetchPackage(req, res){

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {

        // only superadmin and all admin can see the packages
        if(person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin ||  person.role == Roles.Presenteradmin){
          var query = Package.findOne({ _id : req.params.id });
          query.populate('assignedTo', 'firstname lastname')
          .lean().exec(function (err, doc) {
            // console.log("doc ==== ",doc);
            if (err) res.json({ status: false, error : err });
            else {
              let location = null;
              for(let i = 0; i < config.location.length; i++) {
                if(config.location[i][0] == doc.serverLocation)
                  location = config.location[i][1];
              }
              doc['location'] = location;
              res.json({ status: true, data: doc });
            }
          });
        }else res.json({ status: false, error : "Access denied." });
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in fetchPackage",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

/**
*  @Function name : deletePackage
*  @Purpose : For deleting particular Package data
*  @Request Object : params : { id: "packageId" }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Prudhvi
*/
export function deletePackage(req, res) {

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      // if (person != null && req.params.id) {

      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {

        // only superadmin can delete the package
        if (person.role == Roles.Superadmin) {
          // let recordId = mongoose.Types.ObjectId(req.params.id);

          let recordId = mongoose.Types.ObjectId(req.params.id);

          // check valid package or not
          let query = Package.findOne({ _id : recordId });
          query.exec(function (err,  obj) {
           // console.log('obj----', obj)
            if (err) res.json({ status: false, error : err });
            else if (obj) {
              let packageObj = {
                assignedTo : obj.assignedTo,
                subject : 'The Package Deleted',
                userBody :'The package '+'<b>' +  obj.packageName + '</b>' + ' has been deleted successfully.',
                operatorBody : 'You have been successfully deleted the package '+'<b>' +  obj.packageName + '</b>' +'.',
                email : person.email
              };
              sendPackageEmail(packageObj);
              // check any rooms are existed with this package
              let roomQuery = Room.find({"selPackage" : recordId});
              roomQuery.exec(function(error, roomDoc) {
                if (error) res.json({ status : false, error : error });
                else {
                  if(roomDoc && roomDoc.length > 0) res.json({ status : false, error : "Rooms existed :: delete all rooms for this package and try again." });
                  else {
                    // console.log("deleted");

                    // delete the package record
                    var innerquery = Package.remove({ _id : recordId });
                    innerquery.exec(function (error, response){
                      if (error) res.json({ status : false, error : error });
                      else {
                        res.json({ status : true, message : "Deleted succesfully" });
                        
                        // create log
                        // let logObj = {
                        //   logType : 'Package',
                        //   actionType : 'Deleted',
                        //   actionTime : moment().utc().toDate(),
                        //   uid :  obj.createdBy,
                        //   details : {
                        //     name :  obj.packageName,
                        //     assignedTo :  obj.assignedTo,
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
                  }
                }
              })
            } else {
              res.json({ status: false, error : "Invalid Package" });
            }
          });
        } else res.json({ status : false, error : "Access denied."});
      } else res.json({status : false, error : "Invalid request."});
    } catch(e){
      console.log("error in deletePackage",e);
      res.json({status : false, error : "Internal server error."});
    }
  });
}

export function getserverlist(req, res){
  // console.log("server list server call--", config.location);
  return res.json({ data: config.location });
}


/*-------------------------- callback functions ----------------------------*/


/**
*  @Function name : checkUpdateValidations
*  @Purpose : For check package validations on update the package
*  @Request Object : existData, newData, cb
*  @Response Object : Success - null, Failure - Error message
*  @Author : Prudhvi
*/
export function checkUpdateValidations (existData, newData, cb) {
  try{

    // check new usercount value is less than existed usercount then check the users count
    if ((existData.userCount > newData.userCount && newData.userCount != -1) || (!existData.userCount)) {
      let adminquery = Users.findOne({ _id : existData.assignedTo }).select('profile.companyid');
      adminquery.exec( function(error, admin){
        if (admin) {
          Users.count({ "profile.companyid" : admin.profile.companyid, userStatus : "Active" }).exec(function(err, count){
            if (err) cb("Internal server error, Please try again");
            else if (count <= newData.userCount) cb(null);
            else {
              let message = "User count exceded, Already you have " + count + " users.";
              cb(message);
            }
          });
        } else  cb("Invalid package");
      });
    } else if ((existData.roomCount > newData.roomCount && newData.roomCount != -1) || (!existData.roomCount)) {
      
      // check new roomCount value is less than existed roomCount then check the rooms count
      Room.count({ selPackage : existData._id }).exec(function(err, count){
        if (err) cb("Internal server error, Please try again");
        else if (count <= newData.roomCount) cb(null);
        else {
          let message = "Room count exceded, Already you have " + count + " rooms.";
          cb(message);
        }
      });
    } else if (existData.topicCount > newData.topicCount && newData.topicCount != -1) {
      
      // need to remove the topic count field from package
      cb(null);
    } else if (existData.continuousPresence > newData.continuousPresence && newData.continuousPresence != -1) {
      cb(null);
    } else {
      Room.count({ selPackage : existData._id, expiryDate : {$gt : newData.packageValidity}}).exec(function(error, count) {
        if (error) cb("Internal server error");
        else if (count && count > 0) {
          let message = "Package validity should always be more (or) equals to room expiry date.";
          cb(message);
        } else cb(null);
      });
    }
  } catch(e) {
    console.log("error in checkUpdateValidations",e);
    cb("Internal server error");
  }
}