import Users from '../models/users';
import {createCorporateCallback} from './corporate.controller';
import {createUserCallback} from './admin.controller';
import {createPackageCallback} from './package.controller';
import { Roles } from './admin.user.controller';
var moment = require('moment');
var mongoose = require('mongoose');

export function Saveportaluser(req, res) {

    
    try {
        if(!req.body || (req.body && !req.body.data)) {
            res.json({ status: false, error: "Invalid request"});
        } else {
            let obj = req.body.data;
            if(obj.businessId && obj.businessId !="" && obj.businessName && obj.businessName !="" && obj.phoneNo && obj.phoneNo != "" && obj.name && obj.name !="" && obj.email  && obj.email !="" && obj.businessType && obj.businessType !="" && 
                obj.address && obj.address.country &&  obj.address.country != ""  && obj.address.district && obj.address.district != "" && obj.address.pincode && obj.address.pincode !="" && obj.address.state && obj.address.state !="" && obj.address.street && obj.address.street != "" 
                && obj.continuousPresence && obj.continuousPresence != "" && obj.features && obj.features.length >0 && obj.packageName && obj.packageName !="" && obj.packageValidity  && obj.packageValidity !="" && obj.roomCount && obj.roomCount !=""  &&  obj.serverLocation && obj.serverLocation != "" && obj.userCount && obj.userCount != "") {
                //Query for checking if user is present with same email in database
                // console.log('User Create');
                Users.findOne({ 
                    email: obj.email 
                }, function(err, doc) {
                    if(err) {
                        cb(err, null);
                    } else if(doc) {
                        //If present send the error
                        res.json({status: false, error: "Email already exists."});
                    } else {
                        Users.findOne({ 
                            role: Roles.Superadmin 
                        }, function(err, doc) {
                            let corporateObj = {
                                businessId:obj.businessId,
                                businessName:obj.businessName,
                                phoneNo: obj.phoneNo,
                                companyStatus:"Active",
                                scheduleType:"Calendar",
                                contactDetails : {
                                    name: obj.name,
                                    email: obj.email,
                                    phoneNo: obj.phoneNo
                                },
                                address: {
                                    country: obj.address.country,
                                    district:  obj.address.district,
                                    pincode: obj.address.pincode,
                                    state: obj.address.state,
                                    street: obj.address.street
                                },
                                businessType:obj.businessType,
                            };
                            createCorporateCallback(corporateObj, function(crrerror, corporateData){
                                if (corporateData) {
                                    let userObj = {
                                        firstname:obj.name,
                                        email: obj.email,
                                        lastname:"",
                                        password:obj.name.trim().slice(0,5)+"1234",
                                        profile: {
                                            companyid: corporateData.id,
                                            dept: "",
                                            phone:obj.phoneNo,
                                        },
                                        role:Roles.Admin,
                                        uid:doc._id
                                    };

                                    createUserCallback(userObj, Roles.Superadmin, function(usererr, userData) {
                                        if (userData) {

                                            let packageObj ={
                                                assignedTo:mongoose.Types.ObjectId(userData.id),
                                                continuousPresence:obj.continuousPresence,
                                                features:obj.features,
                                                packageName:obj.packageName,
                                                packageValidity:obj.packageValidity,
                                                roomCount:obj.roomCount,
                                                serverLocation:obj.serverLocation,
                                                uid:doc._id,
                                                userCount:obj.userCount
                                            }
                                            createPackageCallback(packageObj, function(packageerr, packageData){
                                                if (packageData) {
                                                    res.json({status: true, data: "created successfully"});
                                                } else if (packageerr) {
                                                    res.json({status: false, error: packageerr});
                                                } else {
                                                    res.json({status: false, error: "Internal server error, Please try again"});
                                                }
                                            });
                                        } else if (usererr) {
                                            res.json({status: false, error: usererr});
                                        } else {
                                            res.json({status: false, error: "Internal server error, Please try again"});
                                        }
                                    });
                                } else if (crrerror) {
                                    res.json({status: false, error: crrerror});
                                } else {
                                    res.json({status: false, error: "Internal server error, Please try again"});
                                }
                            });
                        });
                    }
                });
            } else {
                res.json({ status: false, error: "Please enter all fields."});
            }
        }
        
    } catch(e) {
        console.log('error in newUser',e);
        res.json({status: false, error: "Internal server error, Please try again"});
	}
}

  //   let data = {
  //       businessId:"psdjjfd",
  //       businessName:"astrdda",
  //       phoneNo: "9999999999",
  //       name: "namedd",
  //       email: "prandhseesxi@gmail.com",
  //       address: {
  //           country: "Country",
  //           district: "district",
  //           pincode: "500054",
  //           state: "State",
  //           street: "Street"
  //       },
  //       businessType:"LMS",
  //       continuousPresence: 10,
  //       features:["User Presence", "Whiteboard", "Screen Share", "Q&A", "Video Conference", "Topics"],
  //       packageName:"package name",
  //       packageValidity:moment().add(1,'years').endOf('day'),
  //       roomCount:10,
  //       serverLocation:"https://localmcu.instavc.com",
  //       userCount:10
  //     }