var moment = require('moment');
var mongoose = require('mongoose');
var _ = require('lodash');
var request = require('request');
import Room from '../models/room';
import Package from '../models/package';

function createToken(room, userName, role, selPackage, callback) {
  var validPackage = false;
  var packageData = {};
	Package.findOne({ _id: mongoose.Types.ObjectId(selPackage) })
          .exec(function(pkgErr, pkgRes) {
            if(!pkgErr) {
            	let now = moment().utc().toDate();
            	let currentDate = moment();
            	let pkgValidity = moment(pkgRes.packageValidity);
            	if (+pkgValidity >= +currentDate ) {
            		validPackage = true;
            		packageData = {
            			packageName : pkgRes.packageName,
            			packagePrice : pkgRes.packagePrice,
            			userCount : pkgRes.userCount,
            			userPresence : pkgRes.userPresence,
            			serverLocation : pkgRes.serverLocation,
                  features : pkgRes.features
            		};
								var options = {
									url: pkgRes.serverLocation+'/createToken/',
									headers: {
										'Content-Type' : 'application/json'
									},
									form: {
										room: room,
										username: userName,
										role: 'admin'
									}
								}
								request.post(options, function(error, response, body){
                  // console.log("token response - ", body);
									if(!error){
										if(response.errno){
                      let obj = {
                        validPackage : validPackage,
                        packageData : packageData,
                        response : response.errno
                      }
											callback(false, obj);
										}else{
                      let obj = {
                        validPackage : validPackage,
                        packageData : packageData,
                        response : response.body
                      }
											callback(true, obj);
										}
									}else{
                    let obj = {
                      validPackage : validPackage,
                      packageData : packageData,
                      response : error
                    }
										callback(false, obj);
									}
									return;
								});
							} else {
	              callback(false, "Package is expired.");
							}
						} else {
              callback(false, "Error while fatching serverLocation.");
            }
          });
}

export function fetchToken(req, res){
	// console.log("REQ", req.body.userdata);
  var resConfObj = {
    validRoom : false,
    roomType : null,
    validPackage : false,
    token : null,
    error : null,
    codec : null,
    enableLive : null,
    businessType : 'LMS'
  }

	var obj = req.body.userdata.data;
	var uname = obj.username;
		
  Room.findOne({ roomKey : obj.key })
      .populate('corporateId', 'businessType -_id')
			.exec(function (err, room) {
				if (err) {
					resConfObj['error'] = "Error fetching Room Data.";
					res.json({status: false, data : resConfObj});
				} else if( room && room.roomid){
					resConfObj['validRoom'] = true;
          resConfObj['roomType'] = room.roomType;
          resConfObj['roomPassword'] = room.roomPassword;
          resConfObj['hostPassword'] = room.hostPassword;
          resConfObj['codec'] = room.roomConfiguration.codecType;
          resConfObj['enableLive'] = room.roomConfiguration.enableLive;
          if(room.corporateId && room.corporateId.businessType){
            resConfObj['businessType'] = room.corporateId.businessType;
          }
										
					createToken(room.roomid, uname, "Guest", room.selPackage, function(status, token){
						if(status){
							resConfObj['token'] = token.response;
              resConfObj['validPackage'] = token.validPackage;
              resConfObj['packageData'] = token.packageData;
							res.json({status: true, data: resConfObj});	
              
						}else{
              resConfObj['error'] = token.response;
              resConfObj['validPackage'] = token.validPackage;
              resConfObj['packageData'] = token.packageData;
							res.json({status: false, data : resConfObj});
						}
					});

				}else{
					resConfObj['error'] = "Missing Room or Key.";
					res.json({status: false, data : resConfObj});
				}
			});
}
