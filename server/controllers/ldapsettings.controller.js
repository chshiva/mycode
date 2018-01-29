import Settings from '../models/settings';
import Users from '../models/users';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');

/**
* @Function Name: "saveLDAPSettings",
* @Purpose: "To save ldap settings into settings document.",
* @Request Object: LDAPSettingsData : { uid : "userID"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function saveLDAPSettings (req, res) {

  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null && req.body.LDAPSettingsData && req.body.LDAPSettingsData.data) {
        if (person.role == Roles.Superadmin) {
          let reqObj = req.body.LDAPSettingsData.data;
          if(!reqObj.domain || validator.isEmpty(reqObj.domain)) {
            res.json({ status : false, error : "Domain name required." });
          } else if(!reqObj.baseDn || validator.isEmpty(reqObj.baseDn)) {
            res.json({ status : false, error : "Base DN is required." });
          } else if(!reqObj.url || validator.isEmpty(reqObj.url)) {
            res.json({ status : false, error : "Url is required." });
          } else if(!reqObj.bindCn || validator.isEmpty(reqObj.bindCn)) {
            res.json({ status : false, error : "Bind CN is required." });
          } else {
            let obj = {
              ldapSettings : {
                domain  : reqObj.domain,
                baseDn  : reqObj.baseDn,
                url     : reqObj.url,
                bindCn  : reqObj.bindCn,
                bindPassword  : reqObj.bindPassword,
                forceLogin: reqObj.forceLogin,  
              }
            };
            // let logObj = {
            //   logType : 'LDAP Settings',
            //   actionType : 'Updated',
            //   actionTime : moment().utc().toDate(),
            //   uid : person._id,
            //   details : {
            //     remoteAddress : req.connection.remoteAddress,
            //     userAgent : req.headers['user-agent']
            //   }
            // }

            //Fetching the details of ldapsettings
            Settings.findOne({ "createdBy" : person._id }, function(error, result) {
              if (error) {
                res.json({ status : false, error : error.message });
              } else if (result) {
                obj.ldapSettings['modifiedAt'] = moment().utc().toDate();

                // Update Ldap settings if settings document already exist in the settings collection
                Settings.update(
                  { "createdBy" : person._id },
                  { $set : obj },
                  { runValidators : true },function(err, response){
                    if (err) {
                      res.json({ staus : false, error : err.message });
                    } else {
                      res.json({ status : true, data : obj.ldapSettings, message : "Updated successfully." });
                      // createLog(logObj, function(status) {
                      //   if(status) {
                      //     // console.log(status);
                      //   }
                      // });
                    }
                  }
                );
              } else {
                obj['createdBy'] = person._id;
                let objSettings = new Settings(obj);

                //Create Ldap settings in the settings collection
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
                      data : obj.ldapSettings,
                      message : "Created successfully."
                    });
                    // createLog(logObj, function(status) {
                    //   if(status) {
                    //     // console.log(status);
                    //   }
                    // });
                  } else res.json ({ status : false, error : "Internal server error" });
                });
              }
            });
          }
        } else res.json({ status: false, error : "Access denied." });
      } else res.json({ status: false, error : "Invalid Request." });
    } catch(e){
      console.log("error in ldapSettings",e);
      res.json({ status: false, error : "Internal server error." });
    }
  });
}

/**
* @Function Name: "getLDAPSettings",
* @Purpose: "To Fetch ldap settings into settings document.",
* @Request Object: : { uid : "userID"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function getLDAPSettings (req,res) {
  
  // Varifying request is valid or not
  checkValidRequest(req.headers, function(person){
    try{
      if (person != null ) {
        if (person.role == Roles.Superadmin || person.role == Roles.Admin) {

          //Fectch SMTP settings from the settings collection
          Settings.findOne ({ "createdBy" : person._id, ldapSettings : {
              $exists : true
            }
          },function(error, result) {
            if (error) {
              res.json ({ status : false, error : error.message });
            } else if (result) {
              res.json ({ status : true, data : result.ldapSettings });
            } else {
              res.json ({ status : false });
            }
          });
        } else res.json({ status: false, error : "Access denied." });
      } else res.json({ status: false, error : "Invalid Request." });
    } catch(e){
      console.log("error in getldapsettings",e);
      res.json({ status: false, error : "Internal server error." });
    }
  });
}

/**
* @Function Name: "deleteLdapSettings",
* @Purpose: "To delete ldap settings into settings collection.",
* @Request Object: null,
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function deleteLdapSettings (req, res) {
  checkValidRequest(req.headers, function(person) {
    try{
      if (person != null) {

        //Delete ldap settings from the settings collection
        Settings.update ({
          "createdBy": person._id 
        },{
            $set: {
              "ldapSettings":{}
            }
          },function(err, deletedData) {
          if (err) {
            res.json ({
              status: false,
              error: err.message
            });
          } else if (deletedData) {
            res.json ({
              status: true,
              message : "Deleted successfully"
            })
          } else res.json ({ status: true, message : "Internal server error, Please try again." });
        });
      } else res.json ({ status: true, message : "Invalid request" });
    } catch(e) {
      console.log("error in deleteLdapSettings",e.message);
      res.json({
        status:false,
        error: "Internal server error"
      });
    }
  });
}