import Location from '../models/location';
import Room from '../models/room';
import Users from '../models/users';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
import {addSlash} from '../controllers/slashesActions';

/**
* @Function Name: "saveLocation",
* @Purpose: "To save location data into location document.",
* @Request Object: locationData : { uid : "userID", locationId : "locationId"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function saveLocation(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.body || !req.body.locationData) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {
        let obj = req.body.locationData;

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }

         //If user have a valid role
        if ( person.role == Roles.Admin || person.role == Roles.Superadmin ||  person.role == Roles.Lmsadmin ||  person.role == Roles.Presenteradmin) {
          obj['corporateId'] = bussinessID;
          obj['createdBy'] = mongoose.Types.ObjectId(person._id);
          delete obj["uid"]; 
          
          //check for location name existance
          checkLocationsNameExistance(obj.corporateId, obj.locationName, undefined, function(err, locationStatus) {
            if (err) {
              res.json({
                status : false,
                error : err
              })
            } else if(locationStatus == true) {

              //Create new location
              Location.create(obj,function (err, doc) {
                if (err) {
                  res.json({ status : false, error : err.message });
                } else if (doc) {
                  res.json({ status : true, data : doc, message : "Created successfully." });
                  
                  //Log obj which need to be inserted in logger collection
                  // let logObj = {
                  //   logType : 'Location',
                  //   actionType : 'Created',
                  //   actionTime : moment().utc().toDate(),
                  //   uid : obj.createdBy,
                  //   details : {
                  //     name : obj.locationName,
                  //     remoteAddress : req.connection.remoteAddress,
                  //     userAgent : req.headers['user-agent']
                  //   }
                  // } 

                  // //Function for creating log on successful creation of location
                  // createLog(logObj, function(status) {
                  //   if(status) {
                  //     // console.log(status);
                  //   }
                  // });
                } else {
                  res.json({ status : false, error : "Internal server error." });
                }
              });    
            }
          })
          
        } else {
          res.json({ status: false, error : "Access denied." });
        }
      }
    } catch(e) {
      console.log("Error in save Location", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
}

/**
*  @Function name : updateLocation
*  @Purpose : For updating location
*  @Request Object : locationData : { data : { uid : "user id", corporateId : "corporateId", categoryName: "categoryName", categoryDesc: "categoryDesc", _id: "category id" } }
*  @Response Object : Success - Success message, location data, Failure - Error message
*  @Author : "Jyothi"
*/

export function updateLocation (req, res) {
  
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id) || !req.body || !req.body.locationData) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {
        let obj = req.body.locationData;

        //If user has a valid role
        if (person.role == Roles.Admin || person.role == Roles.Lmsadmin ||  person.role == Roles.Presenteradmin) {

          let locationId = mongoose.Types.ObjectId(req.params.id);
          obj['updatedBy'] = mongoose.Types.ObjectId(person._id);
          obj['updatedAt'] = moment().utc().toDate();
          
          //Fetching the details of location
          var data = Location.findOne({ 
            _id : locationId
          }).exec(function(err, locationData){

            //Verifying is data is present or not
            if (locationData) {
              if (locationData.createdBy == person._id) {
                
                //check for location name existance
                checkLocationsNameExistance(locationData.corporateId, obj.locationName, locationData.createdAt, function(err, locationStatus) {
                  if (err) {
                    res.json({
                      status : false,
                      error : err
                    })
                  } else if(locationStatus == true) {
                    //If data is present then update the location
                    Location.update({ 
                      _id : locationId 
                    },{ 
                      $set : obj
                    },function (err, response) {
                      if (err) {
                        res.json({ 
                          status : false, 
                          error : err.message 
                        });
                      } else {

                        //Query for sending the updated record to the client
                        var query = Location.findOne({ 
                          _id : locationId
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
              } else res.json({ status : false, error : "No Such Location Found to update."});
            } else {
              res.json({ 
                status : false, 
                error : "Invalid Location" 
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
      console.log("Error in update location", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : checkLocationsNameExistance
*  @Purpose : For checking whether the location already exists in db.
*  @Request Object : cid : corporateId, locationName : locationName, cb
*  @Response Object : Success - true, Failure - Error message
*  @Author : Prateek
*/

export function checkLocationsNameExistance(cid, locationName, locationDate1, cb) {
  try{
    let slash_search = addSlash(locationName);
    let searchKey = new RegExp(["^", slash_search, "$"].join(""),'i'); 
    let selector = {};
    selector['corporateId'] = cid;
    selector['locationName'] = searchKey;
    Location.find(selector, function(err, locationData) {
      if (err) {
        cb(err.message, null);
      } else {
        if(!locationData || locationData.length <1) {
          cb(null, true);
        } else if(locationData && locationData.length == 1 && locationDate1 != undefined ) {
          let toBeUpdatedFielddate1 = locationDate1.toString(); 
          let locationDate2 = locationData[0].createdAt.toString();
          if(toBeUpdatedFielddate1 == locationDate2) {
            cb(null, true);
          } else {
            cb('Location already exists with same name, Please try again', null);
          }
        } else {
          cb('Location already exists with same name, Please try again', null);
        }
      }
    })
  } catch(e) {
    console.log('error in checkLocationsNameExistance',e);
    cb("Internal server error, Please try again", null);
  }
}

/**
* @Function Name: "listLocation",
* @Purpose: "To get location list details based on the userID.",
* @Request Object: data : { uid : "userID"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function listLocation(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page) {
        res.json({
          status: false, 
          error : "Invalid request"
        });
      } else {

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let bussinessID = null;
        if(person.profile.companyid && person.profile.companyid._id) {
          bussinessID = person.profile.companyid._id;
        }
        if (person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.CRMadmin ||  person.role == Roles.Presenteradmin) {

          let queryData = req.query;
          let selector = person.role == Roles.Superadmin ? {} : { corporateId: bussinessID};

          //If searchKeyword is not empty then create RegExp
          if (queryData.search && queryData.search != '') {
            let slash_search = addSlash(queryData.search);
            let searchKey = RegExp(slash_search,'i');         
            selector['$or'] = [                
              { 'locationName' : {$regex: searchKey} },
              { 'description' : {$regex: searchKey} }
            ]; 
          }         

          //Query for fetching complete location data based on selector and skip items based on itemsPerPage on previous page
          let query = Location.find(selector)
            .limit(Number(queryData.items))
            .select('corporateId locationName description')
            .skip(Number(queryData.items) * (Number(queryData.page)-1))
            .sort({
              modifiedAt: -1
            });
            
          query.populate('corporateId',  'businessName -_id')
          .exec(function(err, result) {
            if(err) {
              res.json({ 
                status : false, 
                error : err.message 
              });
            } else {

              //Query for counting complete location data based on selector
              Location.count(selector).exec(function(error, count){
                // console.log("location data", result);
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
            status : false, 
            error : "Access denied"
          });
        }          
      }
    } catch(e) {
      console.log("Error in list location", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
* @Function Name: "fetchLocation",
* @Purpose: "To Fetch location details based on the userID.",
* @Request Object: params : { id : "LocationID"},
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/

export function fetchLocation(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({ 
          status : false, 
          error : "Invalid request." 
        });
      } else {

        //Query for finding the location data based on location id
        var query = Location.findOne({ 
          _id : mongoose.Types.ObjectId(req.params.id) 
        });
        query.populate('corporateId',  'businessName -_id')
        .exec(function (error, doc) {
          if (error) { 
            res.json({ 
              status: false, 
              error : error.message 
            }); 
          } else if (doc){
            res.json({ 
              status: true, 
              data: doc 
            });
          } else {
            res.json({ 
              status: false, 
              error : "Invalid Location" 
            });
          }
        });
      }
    } catch(e) {
      console.log("Error in fetch location", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
* @Function Name: "deleteLocation",
* @Purpose: "To Delete location details based on the userID.",
* @Request Object: params : { id: "location id" }
* @Response Object: Success- User Data, Failure- Error message,
* @Author: "Jyothi"
*/
export function deleteLocation(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.json({ 
          status : false, 
          error : "InValid request." 
        });
      } else {
        if ( person.role == Roles.Admin || person.role == Roles.Superadmin ||  person.role == Roles.Lmsadmin ||  person.role == Roles.Presenteradmin) {
           
          var query = Location.findOne({ 
            _id : req.params.id 
          });
          query.exec(function (err, doc) {
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else {

              //Delete location from the location document based on locationId
              var innerQuery = Location.remove({
                _id : req.params.id
              });      
              innerQuery.exec(function (err, response) {
                if (err) {
                  res.json ({ 
                    status : false, 
                    error : err.message 
                  });
                } else {
                  res.json ({ 
                    status: true, 
                    message : "Deleted Successfully" 
                  });
                  
                   //Delete location from room collection based on location Id.
                    var roomLocationQuery = Room.update({},
                    {
                      $pull:{
                        locations:{
                          locationId:mongoose.Types.ObjectId(req.params.id)
                        }
                      }
                    },{
                      multi:true
                    });
                    roomLocationQuery.exec(function(err, deleted) {
                      if (err) {
                        res.json({
                          status: false, 
                          err : err.message
                        });
                      }
                     });
                  // let logObj = {
                  //   logType : 'Location',
                  //   actionType : 'Deleted',
                  //   actionTime : moment().utc().toDate(),
                  //   uid : doc.createdBy,
                  //   details : {
                  //     name : doc.locationName,
                  //     remoteAddress : req.connection.remoteAddress,
                  //     userAgent : req.headers['user-agent']
                  //   }
                  // }  
                  // createLog(logObj, function(status) {
                  //   if (status) {
                  //     // console.log(status);
                  //   }
                  // });
                }
              });
            }   
          });
        } else {
          res.json({ 
            status : false, 
            error : "Access denied"
          });
        }                     
      }
    } catch(e) {
      console.log("Error in delete location", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

