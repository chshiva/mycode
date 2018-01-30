import Settings from '../models/settings';
import Users from '../models/users';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');

/**
* @Function Name: "saveSettings",
* @Purpose: "To save SMTP settings into settings document.",
* @Request Object: settingsData : { uid : "userID"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function saveSMTPSettings (req, res) {

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null || req.body.settingsData || req.body.settingsData.data) {
        if (person.role == Roles.Superadmin) {
          let reqObj = req.body.settingsData.data;
          if (!reqObj.apiKey || validator.isEmpty(reqObj.apiKey)) {
            res.json({ status : false, error : "Api key is required." });
          } else if (!reqObj.domain || validator.isEmpty(reqObj.domain)) {
            res.json({ status : false, error : "Domain is required." });
          } else if (!reqObj.username || validator.isEmpty(reqObj.username)) {
            res.json({ status : false, error : "username is required." });
          } else if (!reqObj.password || validator.isEmpty(reqObj.password)) {
            res.json({ status : false, error : "password is required." });
          } else if (!reqObj.server || validator.isEmpty(reqObj.server)) {
            res.json({ status : false, error : "password is required." });
          } else {
            let obj = {
                smtpSettings : {
                  apiKey  : reqObj.apiKey,
                  domain  : reqObj.domain,
                  username: reqObj.username,
                  password: reqObj.password,
                  server  : reqObj.server,
                }
            };

            // let logObj = {
            //   logType : 'SMTP Settings',
            //   actionType : 'Updated',
            //   actionTime : moment().utc().toDate(),
            //   uid : reqObj.uid,
            //   details : {
            //     remoteAddress : req.connection.remoteAddress,
            //     userAgent : req.headers['user-agent']
            //   }
            // }

            //Fetching the details of SMTPSettings
            Settings.findOne({ "createdBy" : person._id }, function(error, result) {
              if (error) {
                res.json({ status : false, error : error.message });
              } else if (result) {
                obj.smtpSettings['modifiedAt'] = moment().utc().toDate();

                // Update SMTP settings if settings document already exist in the settings collection
                Settings.update(
                  { "createdBy" : person._id },
                  { $set : obj },
                  { runValidators : true },function(err, response){
                    if (err) {
                      res.json({ staus : false, error : err.message });
                    } else {
                      res.json({ status : true, data : obj.smtpSettings, message : "Updated successfully." });
                      // createLog(logObj, function(status) {
                      //   if(status) {
                      //     // console.log(status);
                      //   }
                      // });
                    }
                  });
                } else {
                obj['createdBy'] = person._id;
                let objSettings = new Settings(obj);

                //Create SMTP settings in the settings collection
                objSettings.save(function(err, response) {
                  if (err) {
                    console.log("err === ",err);
                    res.json ({
                      status : false,
                      error : err.message
                    });
                  } else if(response){
                    res.json ({
                      status : true,
                      data : obj.smtpSettings,
                      message : "Created successfully."
                    });
                    // createLog(logObj, function(status) {
                    //   if(status) {
                    //     // console.log(status);
                    //   }
                    // });
                  } else {
                    res.json ({
                      status : false,
                      error : "Internal server error"
                    });
                  }
                });
              }
            });
          }
        } else res.json({ status: false, error : "Access denied." });
      } else res.json({ status: false, error : "Invalid Request." });
    } catch(e){
      console.log("e in addContact === ",e);
      res.json({ status: false, error : "Internal server error." });
    }
  });
}

/**
* @Function Name: "getSettings",
* @Purpose: "To Fetch SMTP settings into settings collection.",
* @Request Object: { uid : "userID"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function getSettings (req,res) {
  
  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null ) {
        if (person.role == Roles.Superadmin || person.role == Roles.Admin) {

          //Fectch SMTP settings from the settings collection
          Settings.findOne ({ "createdBy" : person._id, smtpSettings : {
              $exists : true
            }
          },function(error, result) {
            if (error) {
              res.json ({ status : false, error : error.message });
            } else if (result) {
              res.json ({ status : true, data : result.smtpSettings });
            } else {
              res.json ({ status : false });
            }
          });
        } else res.json({ status: false, error : "Access denied." });
      } else res.json({ status: false, error : "Invalid Request." });
    } catch(e){
      console.log("e in addContact === ",e);
      res.json({ status: false, error : "Internal server error." });
    }
  });
}

/**
* @Function Name: "deleteSMTPSettings",
* @Purpose: "To delete SMTP settings into settings collection.",
* @Request Object: null,
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function deleteSMTPSettings (req, res) {

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null ) {
        if (person.role == Roles.Superadmin ) {

          //Delete SMTP settings from the settings collection
          Settings.update({
            "createdBy": person._id
          },{
              $set: {
                "smtpSettings":{}
              }
            },function(err, deletedData) {
            if (err) {
              res.json ({
                status: false,
                error: err.message
              })
            } else {
              res.json ({
                status: true,
                message : "Deleted successfully"
              });
            }
          });

        } else res.json({ status: false, error : "Access denied." });
      } else res.json({ status: false, error : "Invalid Request." });
    } catch(e){
      console.log("e in addContact === ",e);
      res.json({ status: false, error : "Internal server error." });
    }
  });
}


