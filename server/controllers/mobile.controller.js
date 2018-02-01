var apn = require('apn');
var gcm = require('node-gcm');
var https = require('https');
import Users from '../models/users';
import { checkValidRequest } from '../authorization';
var mongoose = require('mongoose');
import serverConfig from '../config';


/*DSS + Android push notification*/	
var sendOneSignalNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic NjcxNTEwODQtZGY2OC00M2ZkLWExODUtMGNiZGZmYjBiODA3"
  };
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  
  req.write(JSON.stringify(data));
  req.end();
};
/*DSS - Android push notification*/	

export function sendPushNotificationIos (notificationType, alertMessage, sendToDevice, sentBy, sentTo, businessType) {
	try {
		/*Added sender name in iOS push notifications + DSS*/
		Users.findOne({ _id : mongoose.Types.ObjectId(sentBy) })
						  						.exec(function (err, sender) {
		/*Added sender name in iOS push notifications - DSS*/
													var options = null;
													if (businessType == 'LMS' || businessType == 'Presenter') {	
														options = {
														  token: {
														    key: process.env.PWD+'/server/util/APNsAuthKey_L7X3K649G8.p8',
														    keyId: "L7X3K649G8",
														    teamId: "NN4FAH5SZT"
														  },
														  production: serverConfig.iosProduction
														};
													} else if (businessType == 'Conference') {
														options = {
														  token: {
														    key: process.env.PWD+'/server/util/AuthKey_QN4ALJUQS6.p8',
														    keyId: "QN4ALJUQS6",
														    teamId: "NN4FAH5SZT"
														  },
														  production: serverConfig.iosProduction
														};
													} else {
														options = {
														  token: {
														    key: process.env.PWD+'/server/util/APNsAuthKey_L7X3K649G8.p8',
														    keyId: "L7X3K649G8",
														    teamId: "NN4FAH5SZT"
														  },
														  production: serverConfig.iosProduction
														};
													}
													var apnProvider = new apn.Provider(options);
													let notification_body = {
														alert : alertMessage,
														payload : { 'notificationType' : notificationType, 'sentBy' : sentBy, 'sentTo' : sentTo },
														title: sender.firstname
													}
													notification_body['topic'] = businessType == "LMS" || businessType == "Presenter" ? "com.pvc.InstaVC.InstaVCiOS" : "com.InstaVCiOS.conferenceapp";
													let note = new apn.Notification(notification_body);
													apnProvider.send(note, sendToDevice).then( (result) => {
																  console.dir(result);
																	if(result && result.failed !== [])
																  	console.dir(result.failed);
																});
						  						});	
	} catch(e) {
		console.log('error in sendPushNotificationIos',e);
		res.json({
			status: false,
			error: 'Internal server error'
		});
	}
}

/*{
  // expiry = Math.floor(Date.now() / 1000) + 3600, // Expires 1 hour from now. 
  // badge : 3,
  // sound : "ping.aiff",
alert : alertMessage,
payload : { 'notificationType' : notificationType, 'sentBy' : sentBy, 'sentTo' : sentTo },
topic : "com.pvc.InstaVC.InstaVCiOS",
//Added sender name in iOS push notifications - DSS
title: sender.firstname
}*/

export function sendPushNotificationAndroid (notificationType, alertMessage, sendToDevice, sentBy, sentTo) {
	console.log(notificationType, alertMessage, sendToDevice, sentBy, sentTo);

	try {
		// Set up the sender with your GCM/FCM API key (declare this once for multiple messages) 
		// var sender = new gcm.Sender('com.instavc.conference');
		 
		// Prepare a message to be sent 
		// var message = new gcm.Message({
		//     data: {
		//     				"message"	: alertMessage,
		//     				'sentBy' : sentBy,
		//     				'sentTo' : sentTo
		//     			}
		// });

		/*DSS + Android push notification*/	
		Users.findOne({ _id : mongoose.Types.ObjectId(sentBy) })
						  						.exec(function (err, sender) {
						  							var androidMessage = { 
														app_id: serverConfig.android_api_key,
														headings: {"en": sender.firstname},
													  	contents: {"en": alertMessage},
													 	include_player_ids: [sendToDevice]
													};
													sendOneSignalNotification(androidMessage);
						  						});
		/*DSS - Android push notification*/	

		// Specify which registration IDs to deliver the message to 
		// var regTokens = [sendToDevice];
		 
		// Actually send the message 
		// sender.send(message, { registrationTokens: regTokens }, function (err, response) {
	 //    if (err) console.error("err--- ", err);
	 //    else console.log("response---- ", response);
		// });
	} catch(e) {
		console.log('error in sendPushNotificationAndroid',e);
		res.json({
			status: false,
			error: 'Internal server error'

		});
	}
}

export function showHideRoomsIOS (req, res) {
	res.json({ show : serverConfig.iosShowRoom});
}

export function setDeviceIdIOS (req, res) {
	// console.log("deviceId - ", req.body);
	try {
		// Varifying request is valid or not
		checkValidRequest(req.headers, function(person){
			if (person != null && req.body.deviceData){
				if(req.body.deviceData && req.body.deviceData.deviceId) {
						Users.update ({
														_id :mongoose.Types.ObjectId(person._id) 
													},{
														$set: {
															deviceId : req.body.deviceData.deviceId,
															deviceType : req.body.deviceData.deviceType
														}
													}, function (err, res) {

													});
						res.json({ status: true, message : "Sucessfully updated deviceId."});
				}
			} else {
				res.json({ status : false, error : "Error while updating deviceId."});
			}
		});
	} catch(e) {
		console.log('error in setDeviceIdIOS',e);
		res.json({
			status: false,
			error: 'Internal server error'

		});
	}
}
