var require = meteorInstall({"lib":{"aldeed-table-config.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/aldeed-table-config.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
RoomLicense = new Mongo.Collection('roomLicense');                                                                     // 2
Corporate = new Mongo.Collection('corporate');                                                                         // 3
                                                                                                                       //
TabularTables = {};                                                                                                    // 5
                                                                                                                       //
Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);                                            // 7
                                                                                                                       //
TabularTables.Users = new Tabular.Table({                                                                              // 9
	name: "Users",                                                                                                        // 10
	collection: Meteor.users,                                                                                             // 11
	columns: [{ data: "profile.name", title: "InstaVC Name" }, { data: "username", title: "Email" }, { data: "displayName", title: "LDAP&nbsp;Name" },
	/*{data : "emails[0].address", title : "Email"},*/                                                                    //
	{ data: "role", title: "Role" }, //role helper needs to be looked into                                                // 17
	{ tmpl: Meteor.isClient && Template.viewUserBtnA, title: "View" }],                                                   // 18
	autowidth: true,                                                                                                      // 20
	pageLength: 6                                                                                                         // 21
	//,                                                                                                                   //
	// columns: [null,null,null,null]                                                                                     //
});                                                                                                                    // 9
                                                                                                                       //
TabularTables.Rooms = new Tabular.Table({                                                                              // 26
	name: "Rooms",                                                                                                        // 27
	collection: RoomLicense,                                                                                              // 28
	allow: function () {                                                                                                  // 29
		function allow(userId) {                                                                                             // 29
			//return RoomLicense.findOne({roomLicense: sdlfjlsj});                                                              //
			return true;                                                                                                        // 31
		}                                                                                                                    //
                                                                                                                       //
		return allow;                                                                                                        //
	}(),                                                                                                                  //
	columns: [{ data: "roomLicense", title: "License Key" }, { data: "roomName", title: "Room Name" }, { tmpl: Meteor.isClient && Template.viewRoomBtn, title: "View" }],
	autowidth: true,                                                                                                      // 38
	pageLength: 6                                                                                                         // 39
});                                                                                                                    //
                                                                                                                       //
TabularTables.Corporate = new Tabular.Table({                                                                          // 42
	name: "Corporate List",                                                                                               // 43
	collection: Corporate,                                                                                                // 44
	allow: function () {                                                                                                  // 45
		function allow(userId) {                                                                                             // 45
			//return RoomLicense.findOne({roomLicense: sdlfjlsj});                                                              //
			return true;                                                                                                        // 47
		}                                                                                                                    //
                                                                                                                       //
		return allow;                                                                                                        //
	}(),                                                                                                                  //
	columns: [{ data: "businessName", title: "Business Name" }, { data: "contactPerson", title: "Contact Person" }, { data: "contactEmail", title: "Email" }, { tmpl: Meteor.isClient && Template.viewCorporateBtn, title: "View" }],
	autowidth: true,                                                                                                      // 55
	pageLength: 6                                                                                                         // 56
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"collections.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/collections.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
ApplicationSettings = new Mongo.Collection('applicationSettings');                                                     // 1
                                                                                                                       //
Meetings = new Mongo.Collection("meetings");                                                                           // 3
                                                                                                                       //
Messages = new Mongo.Collection('messages');                                                                           // 5
                                                                                                                       //
ChatRoom = new Mongo.Collection('chat_room');                                                                          // 7
                                                                                                                       //
Logger = new Mongo.Collection('inv_logger');                                                                           // 9
                                                                                                                       //
// Meteor.users.search = function (query) {                                                                            //
// 	return Meteor.users.find({                                                                                         //
// 		"email.address" : { $regex: RegExp.escape(query), $options: "i"}                                                  //
// 	},{                                                                                                                //
// 		limit: 20                                                                                                         //
// 	});                                                                                                                //
// };                                                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"logconfig.js":["meteor/ostrio:logger",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/logconfig.js                                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _ostrioLogger = require('meteor/ostrio:logger');                                                                   // 1
                                                                                                                       //
this.log = new _ostrioLogger.Logger();                                                                                 // 3
                                                                                                                       //
AppLogs = new Mongo.Collection('AppLogs');                                                                             // 5
                                                                                                                       //
LogMongo = new LoggerMongo(log, {                                                                                      // 7
	collection: AppLogs /* Use custom collection name */                                                                  // 8
}).enable();                                                                                                           // 7
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 11
	LogMongo.collection._ensureIndex({ level: 1 }, { background: true });                                                 // 12
	LogMongo.collection._ensureIndex({ userId: 1 }, { background: true });                                                // 13
	LogMongo.collection._ensureIndex({ date: 1 }, { background: true });                                                  // 14
	LogMongo.collection._ensureIndex({ timestamp: 1 }, { background: true });                                             // 15
}                                                                                                                      //
                                                                                                                       //
TabularTables.LogMongo = new Tabular.Table({                                                                           // 19
	name: "LogMongo",                                                                                                     // 20
	collection: AppLogs,                                                                                                  // 21
	columns: [{ data: "message", title: "Message" }, { data: "date", title: "Date/Time" }, { data: "level", title: "Level" }, { data: "userId", title: "userId" }, { data: "additional", title: "Additional" }],
                                                                                                                       //
	/*{tmpl : Meteor.isClient && Template.viewUserBtnA, title : "View" },*/                                               //
	autowidth: true,                                                                                                      // 30
	pageLength: 10                                                                                                        // 31
	//,                                                                                                                   //
	// columns: [null,null,null,null]                                                                                     //
});                                                                                                                    // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"utils.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/utils.js                                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"app":{"contacts":{"contacts.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/app/contacts/contacts.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	// This method accepts the userEmail as a parameter                                                                   //
	// and the returns the profile name if any user exists in the database wth that email.                                //
	getUsersBasedOnSearch: function () {                                                                                  // 4
		function getUsersBasedOnSearch(userEmail) {                                                                          // 4
			if (this.userId) {                                                                                                  // 5
				try {                                                                                                              // 6
					var user = Accounts.findUserByEmail(userEmail);                                                                   // 7
					var profileName = user.profile.name;                                                                              // 8
					var userObj = { profile: { name: profileName },                                                                   // 9
						email: user['emails'][0]['address'],                                                                             // 10
						username: user.username,                                                                                         // 11
						_id: user._id                                                                                                    // 12
					};                                                                                                                //
					return { result: userObj, error: 0 };                                                                             // 14
				} catch (e) {                                                                                                      //
					return { result: 0, error: "No user existing with that email." };                                                 // 16
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getUsersBasedOnSearch;                                                                                        //
	}(),                                                                                                                  //
	// this method accepts contactUserId as a parameter                                                                   //
	// checks whether the contact is already existing in the user contacts list.                                          //
	// if existing it will return the proper message ifnot it will add the user to the contacts list.                     //
	// it will also add the contacts to the requested user.                                                               //
	addUserToContact: function () {                                                                                       // 24
		function addUserToContact(contactUserId) {                                                                           // 24
			this.unblock();                                                                                                     // 25
			if (contactUserId == "") return { result: 0, error: "UserEmail Required." };                                        // 26
			if (this.userId) {                                                                                                  // 27
				var contacts = Meteor.users.findOne(this.userId).contacts;                                                         // 28
				var contactObj = { uid: contactUserId, accepted: false };                                                          // 29
                                                                                                                       //
				if (contacts) {                                                                                                    // 31
					var contactAlreadyExisting = Meteor.users.findOne({ _id: this.userId, contacts: { $elemMatch: { uid: contactUserId } } });
					// console.log(contactAlreadyExisting);                                                                           //
					if (contactAlreadyExisting) {                                                                                     // 31
						return { result: 0, error: "User is already existing in your conatcts." };                                       // 35
					} else {                                                                                                          //
						Meteor.users.update({ _id: this.userId }, { $push: { contacts: contactObj } });                                  // 37
					}                                                                                                                 //
				} else {                                                                                                           //
					Meteor.users.update({ _id: this.userId }, { $set: { contacts: [contactObj] } });                                  // 40
				}                                                                                                                  //
                                                                                                                       //
				// Add contact to the other end user                                                                               //
				var contactsOfReqestedUser = Meteor.users.findOne(contactUserId).contacts;                                         // 27
				var contactObjOfReqestedUser = { uid: this.userId, confirmed: false };                                             // 45
				// Add contact to the requested user                                                                               //
				if (contactsOfReqestedUser) {                                                                                      // 27
					Meteor.users.update({ _id: contactUserId }, { $push: { contacts: contactObjOfReqestedUser } });                   // 48
				} else {                                                                                                           //
					var result = Meteor.users.update({ _id: contactUserId }, { $set: { contacts: [contactObjOfReqestedUser] } });     // 50
				}                                                                                                                  //
				return { result: "Contact successfully added", error: 0 };                                                         // 52
			} else {                                                                                                            //
				return "Your not allowed to call this method.";                                                                    // 54
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return addUserToContact;                                                                                             //
	}(),                                                                                                                  //
	// this method confirmes the user as a contat.                                                                        //
	// updates the contact obj in both the users contacts.                                                                //
	// it will create a chatRoom and addes it to the contacts object.                                                     //
	// this will also create the messages document for instant chatting after confim the contact.                         //
	confirmContactRequest: function () {                                                                                  // 61
		function confirmContactRequest(contactUserId) {                                                                      // 61
			try {                                                                                                               // 62
				if (this.userId) {                                                                                                 // 63
					var chatRoomId = ChatRoom.insert({                                                                                // 64
						users: [this.userId, contactUserId],                                                                             // 65
						noOfUsers: 2                                                                                                     // 66
					});                                                                                                               //
                                                                                                                       //
					Meteor.users.update({ _id: this.userId, 'contacts.uid': contactUserId }, { $set: { 'contacts.$.confirmed': true, 'contacts.$.chatRoom': chatRoomId } });
					Meteor.users.update({ _id: contactUserId, 'contacts.uid': this.userId }, { $set: { 'contacts.$.accepted': true, 'contacts.$.chatRoom': chatRoomId } });
                                                                                                                       //
					// Messages.insert({chatRoomId: chatRoomId, chatDate: UTCDateNumber, messages: [], dateForUI: new Date()});       //
                                                                                                                       //
					return { result: { chatRoomId: chatRoomId }, error: 0 };                                                          // 63
				} else {                                                                                                           //
					return { result: 0, error: "You are not allowed to do this operation." };                                         // 76
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				console.log(e);                                                                                                    // 79
				return new Meteor.Error("Custom-Error", "Something went wrong. Please try after sometime.");                       // 80
				// return {result: 0, error: "Something went wrong."};                                                             //
			}                                                                                                                   // 78
		}                                                                                                                    //
                                                                                                                       //
		return confirmContactRequest;                                                                                        //
	}(),                                                                                                                  //
	lastVisitToContact: function () {                                                                                     // 84
		function lastVisitToContact(chatRoomId, UTCDateNumber, dateTime) {                                                   // 84
			try {                                                                                                               // 85
				if (this.userId) {                                                                                                 // 86
					var result = Meteor.users.update({ _id: this.userId, "contacts.chatRoom": chatRoomId }, { $set: { 'contacts.$.lastVisitDateTime': dateTime, 'contacts.$.lastVisitUTCDate': UTCDateNumber } });
					return result;                                                                                                    // 88
				} else {                                                                                                           //
					return new Meteor.Error("Not Allowed", "You are not allowed to this operation.");                                 // 90
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				console.log("error is ", e);                                                                                       // 93
				return new Meteor.Error("Type-Error", "Something went wrong.");                                                    // 94
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return lastVisitToContact;                                                                                           //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Meteor.methods({                                                                                                       // 99
	createMessageDoc: function () {                                                                                       // 100
		function createMessageDoc(chatRoomId, UTCDateNumber) {                                                               // 100
			if (!this.userId) {                                                                                                 // 101
				return new Meteor.Error("not-logged-out", "You are not logged in to do this operation");                           // 102
			}                                                                                                                   //
                                                                                                                       //
			try {                                                                                                               // 106
				console.log(" createMessageDoc ");                                                                                 // 107
				var chatForTheDay = Messages.findOne({ chatRoomId: chatRoomId, chatDate: UTCDateNumber });                         // 108
                                                                                                                       //
				if (!chatForTheDay) {                                                                                              // 110
					console.log("chatForTheDay is not existing. Creating a new chatForTheDay");                                       // 111
					Messages.insert({ chatRoomId: chatRoomId, chatDate: UTCDateNumber, messages: [], dateForUI: new Date() });        // 112
					return true;                                                                                                      // 113
				} else {                                                                                                           //
					return true;                                                                                                      // 115
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				console.log(" error in createMessageDoc is ", e);                                                                  // 118
				return new Meteor.Error("Type-Error", "We are sorry something went wrong, we can't send the messages now. Please try later.");
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return createMessageDoc;                                                                                             //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"messages":{"messages.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/app/messages/messages.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	/* CR-IVC5-0001844 function for sending meesage to iOS clients DSS>> */                                               //
	sendMessageiOS: function () {                                                                                         // 3
		function sendMessageiOS(chatRoomId, UTCDateNumber, messageId, messageObj) {                                          // 3
			if (!this.userId) return;                                                                                           // 4
			console.log("chatRoomId ", chatRoomId);                                                                             // 5
			console.log("UTCDateNumber ", UTCDateNumber);                                                                       // 6
			console.log("messageId ", messageId);                                                                               // 7
			console.log("messageObj ", messageObj);                                                                             // 8
			messageObj.sentAt = new Date();                                                                                     // 9
			console.log(messageObj);                                                                                            // 10
			try {                                                                                                               // 11
				if (messageId) {                                                                                                   // 12
					Messages.update({ _id: messageId }, { $push: { messages: messageObj } });                                         // 13
					return true;                                                                                                      // 14
				} else {                                                                                                           //
					Messages.insert({ chatRoomId: chatRoomId, chatDate: UTCDateNumber, dateForUI: new Date(), messages: [messageObj] });
					return true;                                                                                                      // 17
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				return new Meteor.Error("Something Went Wrong");                                                                   // 20
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return sendMessageiOS;                                                                                               //
	}(),                                                                                                                  //
	/* CR-IVC5-0001844 - DSS<< */                                                                                         //
                                                                                                                       //
	//updates the messages collections for each message transmission                                                      //
	sendMessage: function () {                                                                                            // 26
		function sendMessage(chatRoomId, UTCDateNumber, messageId, messageObj) {                                             // 26
			if (!this.userId) return;                                                                                           // 27
			console.log("chatRoomId ", chatRoomId);                                                                             // 28
			console.log("UTCDateNumber ", UTCDateNumber);                                                                       // 29
			console.log("messageId ", messageId);                                                                               // 30
			console.log("messageObj ", messageObj);                                                                             // 31
			try {                                                                                                               // 32
				if (messageId) {                                                                                                   // 33
					Messages.update({ _id: messageId }, { $push: { messages: messageObj } });                                         // 34
					return true;                                                                                                      // 35
				} else {                                                                                                           //
					Messages.insert({ chatRoomId: chatRoomId, chatDate: UTCDateNumber, dateForUI: new Date(), messages: [messageObj] });
					return true;                                                                                                      // 38
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				return new Meteor.Error("Something Went Wrong");                                                                   // 41
			}                                                                                                                   //
                                                                                                                       //
			// try {                                                                                                            //
			// if (Messages.findOne({chatRoomId: chatRoomId, chatDate: UTCDateNumber})) {                                       //
			// Messages.update({_id: messageId}, {$push: {messages: messageObj}});                                              //
			// } else {  , chatDate: UTCDateNumber                                                                              //
			// Messages.insert({chatRoomId: chatRoomId, chatDate: UTCDateNumber, dateForUI: new Date()});                       //
			// }                                                                                                                //
			// return true;                                                                                                     //
                                                                                                                       //
			// } catch (e) {                                                                                                    //
			// var messages = Meteor.findOne({_id: messageId}, {$push: {messages: messageObj}});                                //
			// if (messages) {                                                                                                  //
			// 	console.log("error is ", e);                                                                                    //
			// 	throw new Meteor.Error("TypeError","Something went wrong, We can't send the message now.");				                 //
			// } else {                                                                                                         //
			// 	// Messages.insert({chatRoomId: chatRoomId, chatDate: UTCDateNumber, dateForUI: new Date(), messages: [messageObj]});
			// 	return true;                                                                                                    //
			// }                                                                                                                //
			// }                                                                                                                //
		}                                                                                                                    // 26
                                                                                                                       //
		return sendMessage;                                                                                                  //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
// Messages = new Mongo.Collection('messages');                                                                        //
                                                                                                                       //
// ChatRooms = new Mongo.Collection('chat_rooms');                                                                     //
                                                                                                                       //
// Meteor.methods({                                                                                                    //
// 	createChatRoom: function (users){                                                                                  //
// 		return ChatRooms.insert({ users: ["MatN46BoXJSc2tGmp", "B9XRutCMQ7MDF4NZq"] })		                                  //
// 		// ChatRooms.insert({ users: users})                                                                              //
// 	},                                                                                                                 //
// 	createMessage: function (chatRoomId) {                                                                             //
// 		return Messages.insert({chatRoomId: "PaEXBnCCrMNRfZBrp", messages: []});                                          //
// 	},                                                                                                                 //
// 	insertMessage: function ( messageObj, messageCollectionId) {                                                       //
// 		try {                                                                                                             //
// 				for (var i=131346; i<200000; i++) {                                                                             //
// 					var messageObj = {                                                                                             //
// 						message: "Hello.."+i,                                                                                         //
// 						type: "string",                                                                                               //
// 						time: new Date("2016-02-27"), //"2016-03-02"                                                                  //
// 						sentBy: "MatN46BoXJSc2tGmp"                                                                                   //
// 					};                                                                                                             //
// 					console.log(i);                                                                                                //
// 					Messages.update({_id: "GtTwSw9YfEARrRN32"}, {$push: {messages: messageObj} });                                 //
// 				}			                                                                                                            //
// 			} catch (e) { console.log(e); }                                                                                  //
// 	},                                                                                                                 //
// 	getMessages: function (date) {                                                                                     //
// 		console.log(Messages.aggregate({$match: {_id: "GtTwSw9YfEARrRN32"} } ))                                           //
// 	}                                                                                                                  //
// });                                                                                                                 //
                                                                                                                       //
// // db.messages.aggregate([{$match:{_id: "GtTwSw9YfEARrRN32"}},{$unwind:"$messages"},{$match:{"messages.time":{"$gt":new Date("2016-03-01")}}},{$group:{_id:"$_id", "messages":{$push:"$messages"}}}]).pretty()
                                                                                                                       //
// // db.messages.find({_id: "GtTwSw9YfEARrRN32",messages: {$elemMatch: {"time": {$gt: new Date("2016-03-01")}}}})     //
                                                                                                                       //
// // 2016-02-27                                                                                                       //
// // 2016-02-28                                                                                                       //
// // 2016-03-02                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"app.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/app/app.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	getContactImage: function () {                                                                                        // 2
		function getContactImage(uid) {                                                                                      // 2
			this.unblock();                                                                                                     // 3
			try {                                                                                                               // 4
				if (!this.userId) return { result: 0, error: 'You are not authorized to call this method' };else return Meteor.users.findOne(uid).profile.profileImage;
			} catch (e) {}                                                                                                      //
		}                                                                                                                    //
                                                                                                                       //
		return getContactImage;                                                                                              //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"guest.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/app/guest.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	sendInvitationToJoinCall: function () {                                                                               // 2
		function sendInvitationToJoinCall(email, roomLicense) {                                                              // 2
			if (this.userId && Meteor.users.findOne(this.userId).role != "GU") {                                                // 3
                                                                                                                       //
				var roomDocument = RoomLicense.findOne({ roomLicense: roomLicense });                                              // 5
				var roomId = roomDocument._id;                                                                                     // 6
				console.log("roomDocument.guestLoginToken ", roomDocument.guestLoginToken);                                        // 7
                                                                                                                       //
				if (roomDocument.guestLoginToken == undefined) {                                                                   // 9
					var token = Random.id(10) + roomId + Random.id(50);                                                               // 10
					RoomLicense.update({ _id: roomId }, { $set: { guestLoginToken: token } });                                        // 11
				};                                                                                                                 //
                                                                                                                       //
				var hostName = Meteor.users.findOne(this.userId).profile.name;                                                     // 14
				var hostEmail = Meteor.users.findOne(this.userId).emails[0]['address'];                                            // 15
				var link = Meteor.absoluteUrl() + "guest?token=" + RoomLicense.findOne(roomId).guestLoginToken;                    // 16
                                                                                                                       //
				var from = Meteor.users.findOne(this.userId).emails[0].address;                                                    // 18
				console.log("MAIL_URL ", process.env.MAIL_URL);                                                                    // 19
				Email.send({                                                                                                       // 20
					to: email,                                                                                                        // 21
					from: "InstaVC Admin<no-reply@instavc.com>",                                                                      // 22
					subject: "Invitation from InstaVC",                                                                               // 23
					html: "<html><p>You are invited to a video call by " + hostName + "(" + hostEmail + ")</p>" + "Click on the link to join in the conference  <a href='" + link + "'+>" + link + "</a></html>"
				});                                                                                                                //
				return true;                                                                                                       // 28
			} else {                                                                                                            //
				return new Meteor.Error("Permission-Error", "You are not allowed to send invitation mails");                       // 30
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return sendInvitationToJoinCall;                                                                                     //
	}(),                                                                                                                  //
	verifyGuestLogin: function () {                                                                                       // 33
		function verifyGuestLogin(token) {                                                                                   // 33
			try {                                                                                                               // 34
				var roomId = token.substring(10, 27);                                                                              // 35
				console.log(roomId);                                                                                               // 36
				var room = RoomLicense.findOne(roomId);                                                                            // 37
				console.log(room);                                                                                                 // 38
				if (room.guestLoginToken) {                                                                                        // 39
					if (room.guestLoginToken == token) return { result: room.roomLicense, error: 0 };else return { result: 0, error: "Your session has expired." };
				} else {                                                                                                           //
					return { result: 0, error: "Your session has expired." };                                                         // 43
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				console.log(e);                                                                                                    // 46
				return new Meteor.Error("Type-Error", "Something went wrong. Please try after sometime.");                         // 47
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return verifyGuestLogin;                                                                                             //
	}(),                                                                                                                  //
	removeGuestLoginToken: function () {                                                                                  // 50
		function removeGuestLoginToken(roomLicense) {                                                                        // 50
			try {                                                                                                               // 51
				console.log("roomLicense ", roomLicense);                                                                          // 52
				return RoomLicense.update({ roomLicense: roomLicense }, { $unset: { guestLoginToken: "" } });                      // 53
			} catch (e) {                                                                                                       //
				console.log("error in removeGuestLoginToken function");                                                            // 55
				console.log("e ", e);                                                                                              // 56
				return new Meteor.Error("Server Error", "Something went wrong. Please try after sometime");                        // 57
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return removeGuestLoginToken;                                                                                        //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"SIP":{"asterisk.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/SIP/asterisk.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var mySql = Npm.require('mysql');                                                                                      // 1
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 3
	Future = Npm.require('fibers/future');                                                                                // 4
	mySQLConnectionSIP = mySql.createPool({                                                                               // 5
		host: '203.196.151.162', //213.133.101.109;                                                                          // 6
		/*connectionTimeout: 20000,*/                                                                                        //
		port: '3306',                                                                                                        // 8
		user: 'root',                                                                                                        // 9
		password: 'PeopleLink#@!',                                                                                           // 10
		database: 'kamailio',                                                                                                // 11
		connectionPooling: false                                                                                             // 12
		// multipleStatements: true                                                                                          //
	});                                                                                                                   // 5
                                                                                                                       //
	mySQLConnectionH323 = mySql.createPool({                                                                              // 16
		host: 'h323.instavc.com', //213.133.101.109;                                                                         // 17
		port: '3306',                                                                                                        // 18
		user: 'root',                                                                                                        // 19
		password: 'PeopleLink#@!',                                                                                           // 20
		database: 'instah323'                                                                                                // 21
		// multipleStatements: true                                                                                          //
	});                                                                                                                   // 16
                                                                                                                       //
	mySQLConnectionTele = mySql.createPool({                                                                              // 25
		host: 'indtele.instavc.com',                                                                                         // 26
		port: '3306',                                                                                                        // 27
		user: 'InstaVC',                                                                                                     // 28
		password: 'PPL_$rinivas',                                                                                            // 29
		database: 'teleInstaVC'                                                                                              // 30
		// password : 'PPL_!nstaVC',                                                                                         //
		// database : 'teleInstaVC',                                                                                         //
		// multipleStatements: true                                                                                          //
	});                                                                                                                   // 25
});                                                                                                                    //
                                                                                                                       //
InsertBridgeNoToKamailio = function InsertBridgeNoToKamailio(bridgeNo, roomId, callback) {                             // 37
	var url = 'http://indsip.instavc.com/makesipusers/createusers.php';                                                   // 38
	var body = { bridge: bridgeNo, password: "ajarsun" };                                                                 // 39
	// HTTP.call('POST', url, {data: body, rejectUnauthorized:false}, function(err, res){                                 //
	// 	console.log(err, res);                                                                                            //
	// 	callback(null, res);                                                                                              //
	// });                                                                                                                //
	HTTP.post('http://indsip.instavc.com/makesipusers/createusers.php', { params: { bridge: bridgeNo, password: "ajarsun" } }, function (err, result) {
		console.log(err, result);                                                                                            // 45
		callback(null, result);                                                                                              // 46
	});                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
InsertBridgeNoIntoSIP = function InsertBridgeNoIntoSIP(bridgeNo, callback) {                                           // 50
	try {                                                                                                                 // 51
		var searchQuery = 'Select * from subscriber where username = "' + bridgeNo + '"';                                    // 52
		mySQLConnectionSIP.getConnection(function (err, connection) {                                                        // 53
			if (connection) {                                                                                                   // 54
				connection.query(searchQuery, function (err, rows, fields) {                                                       // 55
					if (rows[0] === undefined) {                                                                                      // 56
						connection.query('INSERT INTO subscriber (username, domain, password) VALUES ( ?, ?, ? )', [bridgeNo, '127.0.0.1', 'ajarsun'], function (err, rows) {
							connection.release();                                                                                           // 58
							callback(null, true);                                                                                           // 59
						});                                                                                                              //
					} else {                                                                                                          //
						connection.release();                                                                                            // 62
						callback(null, true);                                                                                            // 63
					}                                                                                                                 //
				});                                                                                                                //
			} else {                                                                                                            //
				console.log("Connection Error on indsip.instavc.com ", err);                                                       // 67
				callback(true, null);                                                                                              // 68
			}                                                                                                                   //
		});                                                                                                                  //
	} catch (e) {                                                                                                         //
		console.log(e);                                                                                                      // 72
		callback(true, null);                                                                                                // 73
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
InsertBridgeNoIntoH323 = function InsertBridgeNoIntoH323(bridgeNo, callback) {                                         // 77
	try {                                                                                                                 // 78
		var searchQuery = 'Select * from h323users where user = "' + bridgeNo + '"';                                         // 79
		mySQLConnectionH323.getConnection(function (err, connection) {                                                       // 80
			if (connection) {                                                                                                   // 81
				connection.query(searchQuery, function (err, rows, fields) {                                                       // 82
					if (rows[0] === undefined) {                                                                                      // 83
						connection.query('INSERT INTO h323users (user) VALUES ( ?)', [bridgeNo], function (err, rows) {                  // 84
							connection.release();                                                                                           // 85
							callback(null, true);                                                                                           // 86
						});                                                                                                              //
					} else {                                                                                                          //
						connection.release();                                                                                            // 89
						callback(null, true);                                                                                            // 90
					}                                                                                                                 //
				});                                                                                                                //
			} else {                                                                                                            //
				console.log("Connection Error on h323.instavc.com ", err);                                                         // 94
				callback(true, null);                                                                                              // 95
			}                                                                                                                   //
		});                                                                                                                  //
	} catch (e) {                                                                                                         //
		console.log(e);                                                                                                      // 99
		callback(true, null);                                                                                                // 100
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
InsertBridgeNoIntoTele = function InsertBridgeNoIntoTele(bridgeNo, callback) {                                         // 104
	// right now we are not using this function.                                                                          //
	try {                                                                                                                 // 105
		var searchQuery = 'Select * from confBridges where bridgeID = "' + bridgeNo + '"';                                   // 106
		mySQLConnectionTele.getConnection(function (err, connection) {                                                       // 107
			console.log("ERRO", err);                                                                                           // 108
			if (connection) {                                                                                                   // 109
				connection.query(searchQuery, function (err, rows, fields) {                                                       // 110
					// console.log("ERRO 1", err);                                                                                    //
					if (rows[0] === undefined) {                                                                                      // 112
						connection.query('INSERT INTO confBridges (bridgeID) VALUES ( ? )', [bridgeNo], function (err, rows) {           // 113
							connection.release();                                                                                           // 114
							callback(null, true);                                                                                           // 115
						});                                                                                                              //
					} else {                                                                                                          //
						connection.release();                                                                                            // 118
						callback(null, true);                                                                                            // 119
					}                                                                                                                 //
				});                                                                                                                //
			} else {                                                                                                            //
				console.log("Connection Error on indtele.instavc.com ", err);                                                      // 123
				callback(true, null);                                                                                              // 124
			}                                                                                                                   //
		});                                                                                                                  //
	} catch (e) {                                                                                                         //
		console.log(e);                                                                                                      // 128
		callback(true, null);                                                                                                // 129
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
DeleteBridgeNoFromSIP = function DeleteBridgeNoFromSIP(bridgeNo, callback) {                                           // 133
	try {                                                                                                                 // 134
		mySQLConnectionSIP.getConnection(function (err, connection) {                                                        // 135
			if (connection) {                                                                                                   // 136
				connection.query('DELETE from extensions Where exten = ?', [bridgeNo], function (err, rows) {                      // 137
					if (rows[0] === undefined) {                                                                                      // 138
						connection.release();                                                                                            // 139
						callback(null, true);                                                                                            // 140
					} else {                                                                                                          //
						connection.release();                                                                                            // 142
						callback(null, true);                                                                                            // 143
					}                                                                                                                 //
				});                                                                                                                //
			} else {                                                                                                            //
				console.log("Connection Error on indsip.instavc.com ", err);                                                       // 147
				callback(true, null);                                                                                              // 148
			}                                                                                                                   //
		});                                                                                                                  //
	} catch (e) {                                                                                                         //
		callback(true, null);                                                                                                // 152
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
DeleteBridgeNoFromH323 = function DeleteBridgeNoFromH323(bridgeNo, callback) {                                         // 156
	try {                                                                                                                 // 157
		mySQLConnectionH323.getConnection(function (err, connection) {                                                       // 158
			if (connection) {                                                                                                   // 159
				connection.query('DELETE from h323users Where user = ?', [bridgeNo], function (err, rows) {                        // 160
					if (rows[0] === undefined) {                                                                                      // 161
						connection.release();                                                                                            // 162
						callback(null, true);                                                                                            // 163
					} else {                                                                                                          //
						connection.release();                                                                                            // 165
						callback(null, true);                                                                                            // 166
					}                                                                                                                 //
				});                                                                                                                //
			} else {                                                                                                            //
				console.log("Connection Error on h323.instavc.com ", err);                                                         // 170
				callback(true, null);                                                                                              // 171
			}                                                                                                                   //
		});                                                                                                                  //
	} catch (e) {                                                                                                         //
		callback(true, null);                                                                                                // 175
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
DeleteBridgeNoFromTele = function DeleteBridgeNoFromTele(bridgeNo, callback) {                                         // 179
	try {                                                                                                                 // 180
		mySQLConnectionTele.getConnection(function (err, connection) {                                                       // 181
			if (connection) {                                                                                                   // 182
				connection.query('DELETE from confBridges Where bridgeID = ?', [bridgeNo], function (err, rows) {                  // 183
					if (rows[0] === undefined) {                                                                                      // 184
						connection.release();                                                                                            // 185
						callback(null, true);                                                                                            // 186
					} else {                                                                                                          //
						connection.release();                                                                                            // 188
						callback(null, true);                                                                                            // 189
					}                                                                                                                 //
				});                                                                                                                //
			} else {                                                                                                            //
				console.log("Connection Error on indtele.instavc.com ", err);                                                      // 193
				callback(true, null);                                                                                              // 194
			}                                                                                                                   //
		});                                                                                                                  //
	} catch (e) {                                                                                                         //
		callback(true, null);                                                                                                // 198
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
Meteor.methods({                                                                                                       // 202
	pullin: function () {                                                                                                 // 203
		function pullin(bridgeNo, toaddr) {                                                                                  // 203
			HTTP.post('http://pullin.instavc.com/pullin/pullin.php', { params: { bridge: bridgeNo, pullinuri: toaddr } }, function (err, result) {
				console.log(err, result);                                                                                          // 205
				// callback(null, result);                                                                                         //
			});                                                                                                                 // 204
		}                                                                                                                    //
                                                                                                                       //
		return pullin;                                                                                                       //
	}(),                                                                                                                  //
	updateNuve: function () {                                                                                             // 209
		function updateNuve(roomId, bridgeNumber) {                                                                          // 209
			var url = 'https://gpumcu.instavc.com/updateSip/';                                                                  // 210
			var body = { roomid: roomId, uname: bridgeNumber };                                                                 // 211
			console.log(body);                                                                                                  // 212
			HTTP.call('POST', url, { data: body, rejectUnauthorized: false }, function (err, res) {                             // 213
				console.log(err, res);                                                                                             // 214
				// callback(null, res.content);                                                                                    //
				// callback(null, result);                                                                                         //
			});                                                                                                                 // 213
		}                                                                                                                    //
                                                                                                                       //
		return updateNuve;                                                                                                   //
	}(),                                                                                                                  //
	deleteSIPNuve: function () {                                                                                          // 219
		function deleteSIPNuve(roomId) {                                                                                     // 219
			var url = 'https://gpumcu.instavc.com/disableSip/';                                                                 // 220
			var body = { roomid: roomId };                                                                                      // 221
			// console.log(body);                                                                                               //
			HTTP.call('POST', url, { data: body, rejectUnauthorized: false }, function (err, res) {                             // 219
				console.log(err, res);                                                                                             // 224
				// callback(null, res.content);                                                                                    //
				// callback(null, result);                                                                                         //
			});                                                                                                                 // 223
		}                                                                                                                    //
                                                                                                                       //
		return deleteSIPNuve;                                                                                                //
	}(),                                                                                                                  //
	insertBridgeNo: function () {                                                                                         // 229
		function insertBridgeNo(bridgeNumber, roomId, callback) {                                                            // 229
			var myFuture = new Future();                                                                                        // 230
			try {                                                                                                               // 231
				var insertBridgeNoIntoSIP = Meteor.wrapAsync(InsertBridgeNoToKamailio);                                            // 232
                                                                                                                       //
				// var insertBridgeNoIntoSIP = Meteor.wrapAsync(InsertBridgeNoIntoSIP);                                            //
				// var insertBridgeNoIntoH323 = Meteor.wrapAsync(InsertBridgeNoIntoH323);                                          //
				// var insertBridgeNoIntoTele = Meteor.wrapAsync(InsertBridgeNoIntoTele);                                          //
				insertBridgeNoIntoSIP(bridgeNumber, roomId, function (err, res) {                                                  // 231
					if (err) myFuture['throw'](new Meteor.Error("MySql Server-Error", "We are sorry Please try after sometime"));else {
						// console.log(roomId, bridgeNumber);                                                                            //
                                                                                                                       //
						var tst = RoomLicense.update({ _id: roomId }, { $set: { bridgeNumber: bridgeNumber } });                         // 242
						// console.log("Room KLuc Updated", tst);				                                                                    //
						myFuture['return'](true);                                                                                        // 239
						// /updateSip/                                                                                                   //
                                                                                                                       //
						// insertBridgeNoIntoH323(bridgeNumber, function (err, res) {				                                                //
						// 	if (err) myFuture.throw(new Meteor.Error("MySql Server-Error","We are sorry Please try after sometime"));    //
						// 	else {                                                                                                       //
						// 		HTTP.call('GET', "http://h323.instavc.com/makeh323users/createusers.php", function(err, res){               //
						// 			if (err) if (err) myFuture.throw(new Meteor.Error("MySql Server-Error", "We are sorry Please try after sometime"));
						// 			else console.log("No Error");                                                                              //
						// 		});                                                                                                         //
						// 		insertBridgeNoIntoTele(bridgeNumber, function (err, res) {                                                  //
						// 			if (err) myFuture.throw(new Meteor.Error("MySql Server-Error","We are sorry Please try after sometime"));  //
						// 			else {                                                                                                     //
						// 				RoomLicense.update({_id: roomId}, {$set: {bridgeNumber: bridgeNumber}});                                  //
						// 				myFuture.return(true);                                                                                    //
						// 			}                                                                                                          //
						// 		});							                                                                                                  //
						// 	}                                                                                                            //
						// });										                                                                                                 //
						insertBridgeNoIntoH323(bridgeNumber, function (err, res) {                                                       // 239
							if (err) myFuture['throw'](new Meteor.Error("MySql Server-Error", "We are sorry Please try after sometime"));else {
								HTTP.call('GET', "http://h323.instavc.com/makeh323users/createusers.php", function (err, res) {                // 268
									if (err) if (err) myFuture['throw'](new Meteor.Error("MySql Server-Error", "We are sorry Please try after sometime"));else console.log("No Error");
								});                                                                                                            //
								insertBridgeNoIntoTele(bridgeNumber, function (err, res) {                                                     // 272
									if (err) myFuture['throw'](new Meteor.Error("MySql Server-Error", "We are sorry Please try after sometime"));else {
										RoomLicense.update({ _id: roomId }, { $set: { bridgeNumber: bridgeNumber } });                               // 275
										myFuture['return'](true);                                                                                    // 276
									}                                                                                                             //
								});                                                                                                            //
							}                                                                                                               //
						});                                                                                                              //
					}                                                                                                                 //
				});                                                                                                                //
			} catch (e) {                                                                                                       //
				console.log(" insertBridgeNo error catched, the error is ", e);                                                    // 284
				myFuture['throw'](new Meteor.Error("MySql Server-Error", "We are sorry Please try after sometime"));               // 285
			}                                                                                                                   //
			return myFuture.wait();                                                                                             // 287
		}                                                                                                                    //
                                                                                                                       //
		return insertBridgeNo;                                                                                               //
	}(),                                                                                                                  //
	updateBridgeNo: function () {                                                                                         // 289
		function updateBridgeNo(oldBridgeNumber, newBridgeNumber, roomId) {                                                  // 289
			var myFuture = new Future();                                                                                        // 290
			try {                                                                                                               // 291
				var deleteBridgeNoFromSIP = Meteor.wrapAsync(DeleteBridgeNoFromSIP);                                               // 292
				var deleteBridgeNoFromH323 = Meteor.wrapAsync(DeleteBridgeNoFromH323);                                             // 293
				var deleteBridgeNoFromTele = Meteor.wrapAsync(DeleteBridgeNoFromTele);                                             // 294
                                                                                                                       //
				var insertBridgeNoIntoSIP = Meteor.wrapAsync(InsertBridgeNoIntoSIP);                                               // 296
				var insertBridgeNoIntoH323 = Meteor.wrapAsync(InsertBridgeNoIntoH323);                                             // 297
				var insertBridgeNoIntoTele = Meteor.wrapAsync(InsertBridgeNoIntoTele);                                             // 298
                                                                                                                       //
				deleteBridgeNoFromSIP(oldBridgeNumber, function (err, res) {                                                       // 300
					if (err) myFuture['throw'](new Meteor.Error('MySql Server-Error', 'We are sorry, Your request is not updated successfully'));else {
						deleteBridgeNoFromH323(oldBridgeNumber, function (err, res) {                                                    // 303
							if (err) myFuture['throw'](new Meteor.Error('MySql Server-Error', 'We are sorry, Your request is not updated successfully'));else {
								deleteBridgeNoFromTele(oldBridgeNumber, function (err, res) {                                                  // 306
									if (err) myFuture['throw'](new Meteor.Error('MySql Server-Error', 'We are sorry, Your request is not updated successfully'));else {
										insertBridgeNoIntoSIP(newBridgeNumber, function (err, res) {                                                 // 309
											if (err) myFuture['throw'](new Meteor.Error('MySql Server-Error', 'We are sorry, Your request is not updated successfully'));else {
												insertBridgeNoIntoH323(newBridgeNumber, function (err, res) {                                              // 312
													if (err) myFuture['throw'](new Meteor.Error('MySql Server-Error', 'We are sorry, Your request is not updated successfully'));else {
														HTTP.call('GET', "http://h323.instavc.com/makeh323users/createusers.php", function (err, res) {          // 315
															if (err) myFuture['throw'](new Meteor.Error('MySql Server-Error', 'We are sorry, Your request is not updated successfully'));
														});                                                                                                      //
														insertBridgeNoIntoTele(newBridgeNumber, function (err, res) {                                            // 317
															if (err) myFuture['throw'](new Meteor.Error('MySql Server-Error', 'We are sorry, Your request is not updated successfully'));else {
																RoomLicense.update({ _id: roomId }, { $set: { bridgeNumber: newBridgeNumber } });                      // 320
																myFuture['return'](true);                                                                              // 321
															}                                                                                                       //
														});                                                                                                      //
													}                                                                                                         //
												});                                                                                                        //
											}                                                                                                           //
										});                                                                                                          //
									}                                                                                                             //
								});                                                                                                            //
							}                                                                                                               //
						});                                                                                                              //
					}                                                                                                                 //
				});                                                                                                                //
			} catch (e) {                                                                                                       //
				console.log('error in update sip', e);                                                                             // 335
				myFuture['throw']('Type-Error', "We are sorry something went wrong. Please try after sometime.");                  // 336
			}                                                                                                                   //
			return myFuture.wait();                                                                                             // 338
		}                                                                                                                    //
                                                                                                                       //
		return updateBridgeNo;                                                                                               //
	}(),                                                                                                                  //
	disableSip: function () {                                                                                             // 340
		function disableSip(bridgeNumber, roomId) {                                                                          // 340
			var myFuture = new Future();                                                                                        // 341
			try {                                                                                                               // 342
				HTTP.post('http://indsip.instavc.com/makesipusers/delete.php', { params: { bridge: bridgeNumber } }, function (err, result) {
					console.log(err, result);                                                                                         // 344
					// callback(null, result);                                                                                        //
				});                                                                                                                // 343
                                                                                                                       //
				// var deleteBridgeNoFromSIP = Meteor.wrapAsync(DeleteBridgeNoFromSIP);                                            //
				// var deleteBridgeNoFromH323 = Meteor.wrapAsync(DeleteBridgeNoFromH323);                                          //
				// var deleteBridgeNoFromTele = Meteor.wrapAsync(DeleteBridgeNoFromTele);		                                        //
                                                                                                                       //
				// deleteBridgeNoFromSIP(bridgeNumber);                                                                            //
				// deleteBridgeNoFromH323(bridgeNumber);                                                                           //
				// deleteBridgeNoFromTele(bridgeNumber);                                                                           //
                                                                                                                       //
				RoomLicense.update({ _id: roomId }, { $unset: { bridgeNumber: "" } });                                             // 342
				myFuture['return'](true);                                                                                          // 358
			} catch (e) {                                                                                                       //
				myFuture['throw'](new Meteor.Error("Type-Error", "We are sorry, something went wrong. Please try after sometime."));
			}                                                                                                                   //
			return myFuture.wait();                                                                                             // 362
		}                                                                                                                    //
                                                                                                                       //
		return disableSip;                                                                                                   //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
/*---------------------------------------------------------------------------------------------------                  //
-----------------------------------------------------------------------------------------------------                  //
------------------------------- BELOW FUNTIONS ARE NOT IN USE FOR NOW -------------------------------                  //
-------------------------- WE MAY REQUIRE THEM IN THE FUTURE PLEASE DO NOT REMOVE THEM --------------                  //
-----------------------------------------------------------------------------------------------------                  //
-----------------------------------------------------------------------------------------------------*/                //
                                                                                                                       //
DeleteBridgeNo = function DeleteBridgeNo(bridgeNo, callback) {// right now we are not using this function.             // 397
	// mySQLConnectionSIP.getConnection(function(err, connection) {                                                       //
	// 	connection.query('DELETE from extensions Where exten = ?',[bridgeNo], function(err, rows){                        //
	// 		if (rows[0] === undefined) {                                                                                     //
	// 				connection.release();                                                                                          //
	// 				callback(null, true);                                                                                          //
	// 		} else {                                                                                                         //
	// 			connection.release();                                                                                           //
	// 			callback(null, true);                                                                                           //
	// 		}                                                                                                                //
	// 	});		                                                                                                             //
	// });                                                                                                                //
};                                                                                                                     //
                                                                                                                       //
InsertBridgeNo = function InsertBridgeNo(bridgeNo, callback) {// right now we are not using this function.             // 411
	// var searchQuery = 'Select * from extensions where exten = "' + bridgeNo + '"';	                                    //
	// mySQLConnectionSIP.getConnection( function (err, connection){                                                      //
	// 	connection.query(searchQuery, function (err, rows, fields){                                                       //
	// 		if(rows[0] === undefined ){		                                                                                    //
	//    			connection.query('INSERT INTO extensions (exten, context, appdata) VALUES ( ?, ?, ? ), ( ?, ?, ? )', [bridgeNo, 'instavcsip', 'SIP/${EXTEN}@mcu', bridgeNo, 'instavcsipuri', 'SIP/${EXTEN}@mcunovideo'], function (err, rows) {
	// 					connection.release();                                                                                         //
	// 					callback(null, true);                                                                                         //
	// 			});                                                                                                             //
	// 		} else {                                                                                                         //
	// 			connection.release();                                                                                           //
	// 			callback(null, true);                                                                                           //
	// 		}                                                                                                                //
	// 	});                                                                                                               //
	// });                                                                                                                //
};                                                                                                                     //
                                                                                                                       //
InsertBridgeNoFORTELE = function InsertBridgeNoFORTELE(bridgeNo, callback) {// right now we are not using this function.
	// var searchQuery = 'Select * from confBridges where bridgeID = "' + bridgeNo + '"';                                 //
	// myTeleSQLConnection.getConnection( function (err, connection) {                                                    //
	// 	console.log(err);                                                                                                 //
	// 	connection.query(searchQuery, function (err, rows, fields) {                                                      //
	// 		if (rows[0] === undefined ) {                                                                                    //
	//    			connection.query('INSERT INTO confBridges (bridgeID) VALUES ( ? )', [bridgeNo], function(err, rows){         //
	// 					connection.release();                                                                                         //
	// 					callback(null, true);                                                                                         //
	// 			});                                                                                                             //
	// 		} else {                                                                                                         //
	// 			connection.release();                                                                                           //
	// 			callback(null, true);                                                                                           //
	// 		}                                                                                                                //
	// 	});                                                                                                               //
	// });                                                                                                                //
};                                                                                                                     //
                                                                                                                       //
InsertSipUser = function InsertSipUser(bridgeNo, sipaddr, callback) {// right now we are not using this function.      // 448
	// mySQLConnectionSIP.getConnection( function (err, connection) {                                                     //
	// 	connection.query('INSERT INTO pull_in_contact SET bridgenum = ?, uri= ?', [bridgeNo, sipaddr], function(err, rows){
	// 		connection.release();                                                                                            //
	// 		callback(null, true);                                                                                            //
	// 	});                                                                                                               //
	// });                                                                                                                //
};                                                                                                                     //
                                                                                                                       //
InsertUser = function InsertUser(strUserName, strPassword) {                                                           // 457
	// mySQLConnectionSIP.getConnection( function (err, connection) {                                                     //
	// 	connection.query('INSERT INTO sip_buddies SET callerid = ?, name = ?, secret=?',['Raja', strUserName, strPassword], function (err, rows) {
	// 		connection.release();                                                                                            //
	// 	});	                                                                                                              //
	// });                                                                                                                //
};                                                                                                                     //
                                                                                                                       //
Meteor.methods({                                                                                                       // 466
	deleteBridgeNo: function () {                                                                                         // 467
		function deleteBridgeNo(bridgeNo) {// right now this function is not useful                                          // 467
			// mySQLConnectionSIP.getConnection(function(err, connection) {                                                     //
			// 	connection.query('DELETE from extensions Where exten = ?',[bridgeNo], function(err, rows){                      //
			// 		connection.release();                                                                                          //
			// 	});		                                                                                                           //
			// });                                                                                                              //
                                                                                                                       //
			// myTeleSQLConnection.getConnection(function(err, connection) {                                                    //
			// 	connection.query('DELETE from confBridges Where bridgeID = ?', [bridgeNo], function(err, rows){                 //
			// 		connection.release();                                                                                          //
			// 	});                                                                                                             //
			// });                                                                                                              //
                                                                                                                       //
			// HTTP.post('http://indsip.instavc.com/pullin/IVC_Hangup_Template.php', {params: {channel: bridgeNo}}, function(err, result){
			// 	return true;                                                                                                    //
			// });                                                                                                              //
		}                                                                                                                    //
                                                                                                                       //
		return deleteBridgeNo;                                                                                               //
	}(),                                                                                                                  //
	createUserAsterisk: function () {                                                                                     // 484
		function createUserAsterisk(currentUserID) {// right now this function is not useful                                 // 484
			// var strUserName = currentUserID;// + '@sip.instavc.com';//objUserData.username;                                  //
			// var strPassword = md5(currentUserID);                                                                            //
                                                                                                                       //
			// mySQLConnectionSIP.getConnection( function (err, connection) {                                                   //
			//  	var searchQuery = 'Select * from sip_buddies where name = "' + strUserName + '"';                              //
			// 	connection.query(searchQuery, function(err, rows, fields){                                                      //
			// 		if(rows[0] === undefined ){                                                                                    //
			// 			connection.release();                                                                                         //
			// 			InsertUser(strUserName, strPassword);                                                                         //
			// 		}                                                                                                              //
			// 	});                                                                                                             //
			// });                                                                                                              //
		}                                                                                                                    //
                                                                                                                       //
		return createUserAsterisk;                                                                                           //
	}(),                                                                                                                  //
	insertsipaddr: function () {                                                                                          // 498
		function insertsipaddr(bridgeNo, sipaddr) {// right now this function is not useful.                                 // 498
			// HTTP.post('http://indsip.instavc.com/pullin/IVC_PullIn_Template.php', {params: {channel: bridgeNo, pullinuri: sipaddr}}, function(err, result){
			// 	return true;                                                                                                    //
			// });                                                                                                              //
		}                                                                                                                    //
                                                                                                                       //
		return insertsipaddr;                                                                                                //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
// insertBridgeNoIntoSIP(bridgeNumber, function (err, res) { if (err) console.log("err in insert into SIP server ", err)});
                                                                                                                       //
// insertBridgeNoIntoH323(bridgeNumber, function (err, res) {                                                          //
// 	if (err) console.log("err in insert into SIP server ", err);                                                       //
// 	else {                                                                                                             //
// 		HTTP.call('GET', "http://h323.instavc.com/makeh323users/createusers.php", function(err, res){                     //
// 			console.log(" res ",res);                                                                                        //
// 			console.log(" err ",err);                                                                                        //
// 		});                                                                                                               //
// 	}                                                                                                                  //
// });                                                                                                                 //
                                                                                                                       //
// insertBridgeNoIntoTele(bridgeNumber, function (err, res) {                                                          //
// 	if (err) console.log("err in insert into SIP server ", err);                                                       //
// });                                                                                                                 //
                                                                                                                       //
// RoomLicense.update({_id: roomId}, {$set: {bridgeNumber: bridgeNumber}});                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"applicationSettings":{"ldap-settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/applicationSettings/ldap-settings.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	//this block updates the ldap settings provided the user is super admin                                               //
	udpateLdapSettings: function () {                                                                                     // 3
		function udpateLdapSettings(ldapSettinngsObj) {                                                                      // 3
			this.unblock();                                                                                                     // 4
			try {                                                                                                               // 5
				if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                               // 6
					var id = ApplicationSettings.findOne()._id;                                                                       // 7
					ApplicationSettings.update({ _id: id }, { $set: { ldapSettings: ldapSettinngsObj } });                            // 8
					return { result: "Successfully updated", error: 0 };                                                              // 9
				} else {                                                                                                           //
					return { result: 0, error: "You are not authorized to update LDAP Settings." };                                   // 11
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				return { result: 0,                                                                                                // 14
					error: e.sanitizedError.reason                                                                                    // 15
				};                                                                                                                 //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return udpateLdapSettings;                                                                                           //
	}(),                                                                                                                  //
	isLoginWithLdap: function () {                                                                                        // 19
		function isLoginWithLdap() {                                                                                         // 19
			try {                                                                                                               // 20
				return { result: ApplicationSettings.findOne().ldapSettings.forceLogin, error: 0 };                                // 21
			} catch (e) {                                                                                                       //
				return { result: 0, error: "Something went wrong" };                                                               // 23
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return isLoginWithLdap;                                                                                              //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
//this function is called at startup and when super admin changes the ldap settings                                    //
setLDAP = function setLDAP() {                                                                                         // 29
	try {                                                                                                                 // 30
		//console.log(" setLDAP called ");                                                                                   //
		var ldapSettings = ApplicationSettings.findOne().ldapSettings;                                                       // 32
		Meteor.settings.ldap['domain'] = ldapSettings['domain'];                                                             // 33
		Meteor.settings.ldap['baseDn'] = ldapSettings['baseDn'];                                                             // 34
		Meteor.settings.ldap['url'] = ldapSettings['url'];                                                                   // 35
		Meteor.settings.ldap['bindCn'] = ldapSettings['bindCn'];                                                             // 36
		Meteor.settings.ldap['bindPassword'] = ldapSettings['bindPassword'];                                                 // 37
	} catch (e) {                                                                                                         //
		console.log(" got some error in the ldap ");                                                                         // 39
		console.log(" there is an error in the LDAP settings ", e);                                                          // 40
	}                                                                                                                     //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"my-account.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/applicationSettings/my-account.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	updatedProfile: function () {                                                                                         // 2
		function updatedProfile(profileName) {                                                                               // 2
			if (this.userId) {                                                                                                  // 3
				try {                                                                                                              // 4
					Meteor.users.update({ _id: this.userId }, { $set: { 'profile.name': profileName } });                             // 5
					return { result: "Updated Successfully", error: 0 };                                                              // 6
				} catch (e) {                                                                                                      //
					console.log(e);                                                                                                   // 8
					return { result: 0, error: "Something went wrong, Please try after sometime" };                                   // 9
				}                                                                                                                  //
			} else {                                                                                                            //
				return "You are not allowed to do this operation";                                                                 // 12
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return updatedProfile;                                                                                               //
	}(),                                                                                                                  //
	changeProfileImage: function () {                                                                                     // 15
		function changeProfileImage(profileImage) {                                                                          // 15
			if (this.userId) {                                                                                                  // 16
				try {                                                                                                              // 17
					Meteor.users.update({ _id: this.userId }, { $set: { "profile.profileImage": profileImage } });                    // 18
					return { result: "Successfully updated  ", error: 0 };                                                            // 19
				} catch (error) {                                                                                                  //
					return { result: 0, error: error.message };                                                                       // 21
				}                                                                                                                  //
			} else {                                                                                                            //
				return "You do not have permission";                                                                               // 24
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return changeProfileImage;                                                                                           //
	}(),                                                                                                                  //
                                                                                                                       //
	getProfileNames: function () {                                                                                        // 28
		function getProfileNames(userIds) {                                                                                  // 28
                                                                                                                       //
			var result = [];                                                                                                    // 30
                                                                                                                       //
			if (!this.userId) {                                                                                                 // 32
				throw new Meteor.Error("no-permission-error", "You do not have permission");                                       // 33
			}                                                                                                                   //
			//console.log("id:", userId);                                                                                       //
			try {                                                                                                               // 28
				result = Meteor.users.find({ _id: { $in: userIds } });                                                             // 37
				console.log(result.fetch().length);                                                                                // 38
				return result;                                                                                                     // 39
			} catch (error) {                                                                                                   //
				throw new Meteor.Error("get-username-error", "Could not retreive profile name");                                   // 41
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getProfileNames;                                                                                              //
	}(),                                                                                                                  //
	getProfileName: function () {                                                                                         // 44
		function getProfileName(userId) {                                                                                    // 44
                                                                                                                       //
			this.unblock();                                                                                                     // 46
                                                                                                                       //
			check(userId, String);                                                                                              // 48
                                                                                                                       //
			if (!this.userId) {                                                                                                 // 50
				throw new Meteor.Error("no-permission-error", "You do not have permission");                                       // 51
			}                                                                                                                   //
                                                                                                                       //
			try {                                                                                                               // 54
				return Meteor.users.findOne({ _id: userId }).profile.name;                                                         // 55
			} catch (error) {                                                                                                   //
				console.log(error);                                                                                                // 57
				throw new Meteor.Error("get-username-error", "Could not retreive profile name");                                   // 58
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getProfileName;                                                                                               //
	}()                                                                                                                   //
                                                                                                                       //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"room-settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/applicationSettings/room-settings.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	// This method will return the mcu servers set in the configuration.                                                  //
	getMcuServersList: function () {                                                                                      // 3
		function getMcuServersList() {                                                                                       // 3
			if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                                // 4
				return Meteor.settings.mcuServers.servers;                                                                         // 5
			} else return [];                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getMcuServersList;                                                                                            //
	}(),                                                                                                                  //
	// This method will return the sip servers set in the configuration.	                                                 //
	getSipServersList: function () {                                                                                      // 9
		function getSipServersList() {                                                                                       // 9
			if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                                // 10
				return Meteor.settings.sipServers.servers;                                                                         // 11
			} else return [];                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getSipServersList;                                                                                            //
	}(),                                                                                                                  //
	// This method will add a new room to the database(RoomLicense collection).                                           //
	// This method takes the roomObj as a parameter (consists of roomName, roomLicense, roomPassword, hostPassword).      //
	// First it will check whether a room is alreadt existing with a this license or not, if exists it won't allow the user to add the room.
	// Authorized users are  only allowed to add 'ROOM'. (many cases super-admin)                                         //
	addRoom: function () {                                                                                                // 18
		function addRoom(objRoom) {                                                                                          // 18
			this.unblock();                                                                                                     // 19
			try {                                                                                                               // 20
				if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                               // 21
					var objExisting = RoomLicense.findOne({ roomLicense: objRoom.roomLicense });                                      // 22
					if (objExisting) {                                                                                                // 23
						return { result: 0, error: 'Room a room existing with this License!' };                                          // 24
					} else {                                                                                                          //
						console.log(objRoom);                                                                                            // 26
						var res = RoomLicense.insert(objRoom);                                                                           // 27
						// console.log(res);                                                                                             //
						return { result: "Successfully saved", error: 0 };                                                               // 25
					}                                                                                                                 //
				} else {                                                                                                           //
					return { result: 0, error: "You are not authorized to add rooms." };                                              // 32
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				console.log(e);                                                                                                    // 35
				return { result: 0, error: "We are sorry, something went wrong." };                                                // 36
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return addRoom;                                                                                                      //
	}(),                                                                                                                  //
                                                                                                                       //
	// This method will add the contacts to existing room.                                                                //
	// It will take two paramters (roomId and usersObj).                                                                  //
	// usersObj is an array of objects. [ {uid: "fgh2345"}, {uid: "3456dfghjk"}].                                         //
	// This method will set the Host to the room, if not existing (by bdefault first user of the room will be the host).  //
	// Only authorized user can add contatcts to the room. (mostly super-admin)	                                          //
	addUsersToRoom: function () {                                                                                         // 45
		function addUsersToRoom(roomId, usersObj) {                                                                          // 45
			this.unblock();                                                                                                     // 46
			try {                                                                                                               // 47
				if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                               // 48
					var users = RoomLicense.findOne({ _id: roomId }).users || [];                                                     // 49
                                                                                                                       //
					var existingRooms = RoomLicense.find().fetch();                                                                   // 51
					var usersCountOnAllRooms = 0;                                                                                     // 52
					for (var index in meteorBabelHelpers.sanitizeForInObject(existingRooms)) {                                        // 53
						if (existingRooms[index]['users']) usersCountOnAllRooms += existingRooms[index]['users'].length;                 // 54
					}                                                                                                                 //
                                                                                                                       //
					var userLimitOnRooms = Meteor.settings.userLimitOnRooms;                                                          // 57
                                                                                                                       //
					if (usersCountOnAllRooms) {                                                                                       // 59
						if (usersCountOnAllRooms < userLimitOnRooms) {                                                                   // 60
							var hostId = RoomLicense.findOne({ _id: roomId }).hostUserId;                                                   // 61
							users.forEach(function (doc) {                                                                                  // 62
								if (doc.uid === usersObj.uId) {                                                                                // 63
									throw new Meteor.Error("duplicate-user", "the user has already been added");                                  // 64
								}                                                                                                              //
							});                                                                                                             //
							RoomLicense.update({ _id: roomId }, { $push: { users: { "uid": usersObj.uId } } });                             // 67
							if (!hostId) RoomLicense.update({ _id: roomId }, { $set: { hostUserId: usersObj.uId } });                       // 68
						} else {                                                                                                         //
							throw new Meteor.Error("Limiting-Error", "Sorry user limit exceeded");                                          // 70
						}                                                                                                                //
					} else {                                                                                                          //
						var hostId = RoomLicense.findOne({ _id: roomId }).hostUserId;                                                    // 73
						if (!hostId) RoomLicense.update({ _id: roomId }, { $set: { hostUserId: usersObj.uId } });                        // 74
						RoomLicense.update({ _id: roomId }, { $set: { users: [{ "uid": usersObj.uId }] } });                             // 75
					}                                                                                                                 //
				} else {                                                                                                           //
					//return {result: 0, error: "You are not allwoed to do this operation."}                                          //
					throw new Meteor.Error("persmission-denied", "You are not allowed to this operation");                            // 79
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				console.log(e);                                                                                                    // 82
				throw new Meteor.Error(e.error, e.reason);                                                                         // 83
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return addUsersToRoom;                                                                                               //
	}(),                                                                                                                  //
	// This will delete a single contact from the Room.                                                                   //
	// It will accept two parameters(roomId and the userId).                                                              //
	// Only authorized user can delete the contact from the Room.	(mostlt super-admin)                                    //
	deleteContactFromRoom: function () {                                                                                  // 89
		function deleteContactFromRoom(roomId, uid) {                                                                        // 89
			try {                                                                                                               // 90
				if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                               // 91
                                                                                                                       //
					RoomLicense.update({ _id: roomId }, { $pull: { 'users': { 'uid': uid } }                                          // 93
					});                                                                                                               //
                                                                                                                       //
					//have to update all the meetings the user is involved                                                            //
                                                                                                                       //
					Meetings.remove({});                                                                                              // 91
                                                                                                                       //
					return { result: "user successfully removed from room.", error: 0 };                                              // 101
				} else return { result: 0, error: "You are not authorized to do this operation." };                                //
			} catch (e) {                                                                                                       //
				return { result: 0, error: "Something went wrong. Please try after sometime." };                                   // 104
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return deleteContactFromRoom;                                                                                        //
	}(),                                                                                                                  //
                                                                                                                       //
	// This method will update the existing room.                                                                         //
	// It will accept the two paramters (roomObj and roomId).                                                             //
	// Only authorized user can update the Room.	(mostlt super-admin)                                                     //
	updateRoom: function () {                                                                                             // 111
		function updateRoom(roomId, roomObj) {                                                                               // 111
			try {                                                                                                               // 112
				console.log("roomObj ", roomObj);                                                                                  // 113
				if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                               // 114
					var result = RoomLicense.update({ _id: roomId }, { $set: roomObj });                                              // 115
					console.log("result ", result);                                                                                   // 116
					return { result: "Room Successfully Updated", error: 0 };                                                         // 117
				} else {                                                                                                           //
					return { result: 0, error: "You are not allowed to this operation." };                                            // 119
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				return { result: 0, error: "We are sorry sometime went wrong." };                                                  // 122
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return updateRoom;                                                                                                   //
	}(),                                                                                                                  //
                                                                                                                       //
	// This method will a Room from the database.                                                                         //
	// It will accept a single paramters (roomId).                                                                        //
	// Only authorized user can delete the Room.(mostlt super-admin)                                                      //
	deleteRoom: function () {                                                                                             // 129
		function deleteRoom(roomId) {                                                                                        // 129
			try {                                                                                                               // 130
				if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                               // 131
					RoomLicense.remove({ _id: roomId });                                                                              // 132
					return { result: "Room Successfully Deleted", error: 0 };                                                         // 133
				} else {                                                                                                           //
					return { result: 0, error: "You are not authorized to do this operation." };                                      // 134
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				return { result: 0, error: "Something went wrong" };                                                               // 136
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return deleteRoom;                                                                                                   //
	}(),                                                                                                                  //
                                                                                                                       //
	// This method will change the existing room-host.                                                                    //
	// It will accept the two paramters (hostId and roomId)                                                               //
	// Only authorized user can change the room host.(mostlt super-admin)	                                                //
	changeRoomHost: function () {                                                                                         // 143
		function changeRoomHost(roomId, uid) {                                                                               // 143
			try {                                                                                                               // 144
				if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                               // 145
					RoomLicense.update({ _id: roomId }, { $set: { hostUserId: uid } });                                               // 146
					return { result: "Host Successfully Changed", error: 0 };                                                         // 147
				} else return { result: 0, error: "You are not allowed to do this operation." };                                   //
			} catch (e) {                                                                                                       //
				return { result: 0, error: "Sorry Something went wrong. Please try after sometime." };                             // 150
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return changeRoomHost;                                                                                               //
	}(),                                                                                                                  //
	searchUserByEmail: function () {                                                                                      // 153
		function searchUserByEmail(email) {                                                                                  // 153
			this.unblock(); //allows other clients to call this method 	                                                        // 154
			console.log("email from client:", email);                                                                           // 153
			try {                                                                                                               // 156
				var userData = Accounts.findUserByEmail(email);                                                                    // 157
				if (userData === undefined) {                                                                                      // 158
					throw new Meteor.Error("no-user", "user with the given email address could not be found");                        // 159
				} else return {                                                                                                    //
					email: userData.emails[0]["address"],                                                                             // 161
					uId: userData._id                                                                                                 // 162
				};                                                                                                                 //
			} catch (error) {                                                                                                   //
				console.log(error);                                                                                                // 165
				throw new Meteor.Error("user-search-failed", error.message);                                                       // 166
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return searchUserByEmail;                                                                                            //
	}(),                                                                                                                  //
	addAll: function () {                                                                                                 // 169
		function addAll() {                                                                                                  // 169
			console.log("called");                                                                                              // 170
			if (!this.userId || Meteor.users.findOne(this.userId).role !== "SA") {                                              // 171
				console.log("not permitted");                                                                                      // 172
				throw new Meteor.Error("no-permission", "You do not have permission to add users");                                // 173
			} else {                                                                                                            //
				console.log("id:", this.userId);                                                                                   // 175
				try {                                                                                                              // 176
					return Meteor.users.find({ "profile.createdBy": this.userId });                                                   // 177
				} catch (error) {                                                                                                  //
					console.log(error);                                                                                               // 179
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return addAll;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
// ------------------- FOR THE FUTURE REFERENCE (SEND INVIATION MAIL ON ADDING A USER TO A ROOM) --------------        //
                                                                                                                       //
// This method will update the existing room-name.                                                                     //
// It will accept the two paramters (roomName and roomId).                                                             //
// Only authorized user can delete the contact from the Room.	(mostlt super-admin)                                     //
// updateRoomName: function (roomName, roomId) {                                                                       //
// 	try {                                                                                                              //
// 		if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                              //
// 			var result = RoomLicense.update({_id: roomId}, {$set: {roomName: roomName}});                                    //
// 			if (result) return {result: "Room Name Successfully Updated", error: 0};                                         //
// 			else return {result: 0, error: result};                                                                          //
// 		} else {                                                                                                          //
// 			return {result: 0, error: "You are not allowed to updated the Room"}                                             //
// 		}                                                                                                                 //
// 	} catch (e) { return {result: 0, error: "Something went wrong"}; }                                                 //
// },                                                                                                                  //
// This method will update the existing room-password.                                                                 //
// It will accept the two paramters (roomPassword and roomId).                                                         //
// Only authorized user can update the existing roomPassword of a Room.	(mostlt super-admin)	                          //
// updateRoomPassword: function (roomPassword, roomId) {                                                               //
// 	try {                                                                                                              //
// 		if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                              //
// 			var result = RoomLicense.update({_id: roomId}, {$set: {roomPassword: roomPassword}});                            //
// 			if (result) return {result: "Room Password Successfully Updated", error: 0};                                     //
// 			else return {result: 0, error: result};                                                                          //
// 		} else {                                                                                                          //
// 			return {result: 0, error: "You are not allowed to updated the Room"}                                             //
// 		}                                                                                                                 //
// 	} catch (e) { return {result: 0, error: "Something went wrong"}; }                                                 //
// },                                                                                                                  //
// This method will update the existing host-password.                                                                 //
// It will accept the two paramters (hostPassword and roomId).                                                         //
// Only authorized user can update the hostPassword of a Room.(mostlt super-admin)                                     //
// updateHostPassword: function (hostPassword, roomId) {                                                               //
// 	try {                                                                                                              //
// 		if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                              //
// 			var result = RoomLicense.update({_id: roomId}, {$set: {hostPassword: hostPassword}});                            //
// 			if (result) return {result: "Host Password Successfully Updated", error: 0};                                     //
// 			else return {result: 0, error: result};                                                                          //
// 		} else {                                                                                                          //
// 			return {result: 0, error: "You are not allowed to updated the Room"}                                             //
// 		}                                                                                                                 //
// 	} catch (e) { return {result: 0, error: "Something went wrong"}; }                                                 //
// },                                                                                                                  //
                                                                                                                       //
// SSR.compileTemplate("roomMailTemplate",Assets.getText("roomMailTemplate.html"));                                    //
// var objExisting = RoomLicense.findOne({$and: [                                                                      //
//                                             {_id: roomId },                                                         //
//                                             {'users.uid': objRoomCot.uid}                                           //
//                                         ]});                                                                        //
// if(objExisting){                                                                                                    //
// 	//If anything required later.                                                                                      //
// }else{                                                                                                              //
// 	var result = RoomLicense.update(objRoomCot.roomID, {$push: {users: {uid: objRoomCot.uid}}});                       //
// 	if (result) {                                                                                                      //
// 		//send mail to user                                                                                               //
                                                                                                                       //
// 		var user = Meteor.users.findOne({_id: objRoomCot.uid});                                                           //
                                                                                                                       //
// 		try {                                                                                                             //
// 			var roomCreator = Meteor.users.findOne({_id: this.userId}).profile.name;                                         //
// 		} catch (error) {                                                                                                 //
// 			console.log("room creator error:", error);                                                                       //
// 		} finally {                                                                                                       //
// 			//console.log("sender:", roomCreator);                                                                           //
// 		}                                                                                                                 //
                                                                                                                       //
// 		try {                                                                                                             //
// 			var room = RoomLicense.findOne({_id: objRoomCot.roomID});                                                        //
// 		} catch (error) {                                                                                                 //
// 			console.log("roomName fetch error:", error.message);                                                             //
// 		} finally {                                                                                                       //
// 			//console.log(room.roomName);                                                                                    //
// 		}                                                                                                                 //
                                                                                                                       //
// 		var emailData = {                                                                                                 //
// 			emailAddress: user.username,                                                                                     //
// 			userName:  user.profile.name,                                                                                    //
// 			roomCreator: roomCreator,                                                                                        //
// 			roomName: room.roomName,                                                                                         //
// 			time: room.createdOn                                                                                             //
// 		};                                                                                                                //
                                                                                                                       //
// 		try {                                                                                                             //
// 			Email.send({                                                                                                     //
// 				to: emailData.emailAddress,                                                                                     //
// 				from: "Admin@InstaVC.com",                                                                                      //
// 				subject: "Meeting room booked for you",                                                                         //
// 				html: SSR.render("roomMailTemplate", emailData)                                                                 //
// 			});                                                                                                              //
// 		} catch (error) {                                                                                                 //
// 			console.log(error);                                                                                              //
// 		}	                                                                                                                //
// 	}                                                                                                                  //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"smtp-settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/applicationSettings/smtp-settings.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
		//this function will update the mail smtp settings provided the user is SUPER ADMIN                                  //
		updateSmtpSettings: function () {                                                                                    // 3
				function updateSmtpSettings(smtpSettingsObj) {                                                                     // 3
						this.unblock();                                                                                                  // 4
						try {                                                                                                            // 5
								if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                           // 6
										var id = ApplicationSettings.findOne()._id;                                                                  // 7
										var result = ApplicationSettings.update({ _id: id }, { $set: { smtpSettings: smtpSettingsObj } });           // 8
										return { result: "Successfully saved", error: 0 };                                                           // 9
								} else {                                                                                                       //
										return { result: 0, error: "You are not authorized to update SMTP Settings." };                              // 11
								}                                                                                                              //
						} catch (e) {                                                                                                    //
								return { result: 0,                                                                                            // 14
										error: e.sanitizedError.reason                                                                               // 15
								};                                                                                                             //
						}                                                                                                                //
				}                                                                                                                  //
                                                                                                                       //
				return updateSmtpSettings;                                                                                         //
		}()                                                                                                                  //
});                                                                                                                    //
                                                                                                                       //
//this function will query the database for existing mail smtp settings and if true will set the MAIL_URL              //
setMAIL_URL = function setMAIL_URL() {                                                                                 // 22
		try {                                                                                                                // 23
				var smtp = ApplicationSettings.findOne().smtpSettings;                                                             // 24
				if (smtp) {                                                                                                        // 25
						console.log("setting setMAIL_URL again");                                                                        // 26
						process.env.MAIL_URL = "smtp://" + smtp.userName + ":" + smtp.password + "@" + smtp.server + ":" + smtp['port'];
				}                                                                                                                  //
		} catch (e) {                                                                                                        //
				console.log("SMTP settings still not set by the Super Admin");                                                     // 30
		}                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"user-management-settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/applicationSettings/user-management-settings.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
  createNewUser: function () {                                                                                         // 2
    function createNewUser(newUser) {                                                                                  // 2
      this.unblock();                                                                                                  // 2
      if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                             // 3
        var userLimitOnApplication = Meteor.settings.userLimitOnApplication;                                           // 4
        if (Meteor.users.find().count() < userLimitOnApplication) {                                                    // 5
          try {                                                                                                        // 6
            var res = Accounts.createUser({                                                                            // 7
              username: newUser.userEmail,                                                                             // 8
              password: newUser.password,                                                                              // 9
              email: newUser.userEmail,                                                                                // 10
              profile: {                                                                                               // 11
                name: newUser.fullname,                                                                                // 12
                userType: newUser.userType,                                                                            // 13
                createdBy: this.userId                                                                                 // 14
              }                                                                                                        //
            });                                                                                                        //
          } catch (error) {                                                                                            //
            return { error: error.message, message: "User creation failed" };                                          // 18
          }                                                                                                            //
          if (res) {                                                                                                   // 20
            try {                                                                                                      // 21
              var status = Meteor.users.update({ _id: res }, { $set: { role: newUser.userRole } });                    // 22
              return { error: "no error", message: "User Created Successfully" };                                      // 23
              if (status) {                                                                                            // 24
                try {                                                                                                  // 25
                  Accounts.sendEnrollmentEmail(res, newUser.userEmail);                                                // 26
                } catch (error) {                                                                                      //
                  console.log("email sending failed", error.message);                                                  // 28
                }                                                                                                      //
              }                                                                                                        //
            } catch (error) {                                                                                          //
              return { error: error.message, message: "user role set failed" };                                        // 32
            }                                                                                                          //
          }                                                                                                            //
        } else {                                                                                                       //
          console.log("user limit exceeded in the application level");                                                 // 36
          return { error: "Limitation Error", message: "User limit is exceeded." };                                    // 37
        }                                                                                                              //
      } else {                                                                                                         //
        return { error: "permission error", message: "You do not have permission to create user" };                    // 40
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    return createNewUser;                                                                                              //
  }(),                                                                                                                 //
  deleteUserFromDB: function () {                                                                                      // 43
    function deleteUserFromDB(userId) {                                                                                // 43
      try {                                                                                                            // 44
        if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                           // 45
          Meteor.users.remove({ _id: userId });                                                                        // 46
          return { result: "User removed Successfully", error: 0 };                                                    // 47
        } else {                                                                                                       //
          return { result: 0, error: "You are not autherized to this operation." };                                    // 49
        }                                                                                                              //
      } catch (e) {                                                                                                    //
        console.log("Error while deleting the user from database");                                                    // 52
        return { result: 0, error: "Sorry somethig went wrong. Please try after sometime." };                          // 53
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    return deleteUserFromDB;                                                                                           //
  }(),                                                                                                                 //
  updateUser: function () {                                                                                            // 56
    function updateUser(userDetails, userId) {                                                                         // 56
      try {                                                                                                            // 57
        var stat = Meteor.users.update({ _id: userId }, { $set: { "modifiedAt": new Date(),                            // 58
            "profile.modifiedBy": this.userId,                                                                         // 60
            "username": userDetails.userEmail,                                                                         // 61
            "emails.0.address": userDetails.userEmail,                                                                 // 62
            "profile.name": userDetails.fullname,                                                                      // 63
            "profile.userType": userDetails.userType,                                                                  // 64
            "profile.createdBy": this.userId,                                                                          // 65
            "role": userDetails.userRole,                                                                              // 66
            "corporateId": userDetails.corporateId                                                                     // 67
          } });                                                                                                        //
      } catch (error) {                                                                                                //
        console.log(error.message);                                                                                    // 70
        throw new Meteor.Error("update-failed", error.message);                                                        // 71
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    return updateUser;                                                                                                 //
  }()                                                                                                                  //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"whiteLabel-settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/applicationSettings/whiteLabel-settings.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
                                                                                                                       //
	"updateWhiteLabelSettings": function () {                                                                             // 3
		function updateWhiteLabelSettings(whiteLabelSettingsObj) {                                                           // 3
                                                                                                                       //
			this.unblock();                                                                                                     // 5
			var id;                                                                                                             // 6
                                                                                                                       //
			//console.log(whiteLabelSettingsObj);                                                                               //
                                                                                                                       //
			//check for sa role and userId                                                                                      //
			if (!this.userId || Meteor.users.findOne(this.userId).role !== "SA") {                                              // 3
                                                                                                                       //
				throw new Meteor.Error("no-permission", "You do not have permission to do this operation");                        // 13
			} else {                                                                                                            //
                                                                                                                       //
				//get the id of the doc                                                                                            //
				try {                                                                                                              // 18
					id = ApplicationSettings.findOne()._id;                                                                           // 19
				} catch (error) {                                                                                                  //
					console.log("error:", error);                                                                                     // 21
					throw new Meteor.Error("get-docId-failed", "Failed to fetch the id of docuemnt to be updated");                   // 22
				}                                                                                                                  //
                                                                                                                       //
				//update the doc                                                                                                   //
				try {                                                                                                              // 15
					ApplicationSettings.update({ _id: id }, { $set: { whiteLabelSettings: whiteLabelSettingsObj } });                 // 27
				} catch (error) {                                                                                                  //
					console.log("error whiteLabelSettings:", error.sanitizedError.reason);                                            // 29
					throw new Meteor.Error("whiteLabel-update-failed", "Failed to update whiteLabel settings");                       // 30
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return updateWhiteLabelSettings;                                                                                     //
	}(),                                                                                                                  //
	getHomeLogo: function () {                                                                                            // 36
		function getHomeLogo() {                                                                                             // 36
			try {                                                                                                               // 37
				var res = ApplicationSettings.findOne({}).whiteLabelSettings.homePageLogoURL;                                      // 38
				return res;                                                                                                        // 39
			} catch (error) {                                                                                                   //
				console.log("error", error);                                                                                       // 41
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getHomeLogo;                                                                                                  //
	}(),                                                                                                                  //
	getInnerLogo: function () {                                                                                           // 44
		function getInnerLogo() {                                                                                            // 44
			try {                                                                                                               // 45
				var res = ApplicationSettings.findOne({}).whiteLabelSettings.innerLogoURL;                                         // 46
				//console.log(res);                                                                                                //
				return res;                                                                                                        // 45
			} catch (error) {                                                                                                   //
				console.log("error", error);                                                                                       // 50
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getInnerLogo;                                                                                                 //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
setDefaultWhiteLabelSettings = function setDefaultWhiteLabelSettings() {                                               // 55
                                                                                                                       //
	try {                                                                                                                 // 57
                                                                                                                       //
		var res = ApplicationSettings.findOne({}).whiteLabelSettings;                                                        // 59
                                                                                                                       //
		if (!res) {                                                                                                          // 61
                                                                                                                       //
			var whiteLabelSettings = {                                                                                          // 63
                                                                                                                       //
				homePageLogoURL: "",                                                                                               // 65
				innerLogoURL: "",                                                                                                  // 66
				hostRingToneLoopBack: false,                                                                                       // 67
				callEndConfirmation: false                                                                                         // 68
			};                                                                                                                  //
                                                                                                                       //
			ApplicationSettings.update({ _id: ApplicationSettings.findOne()._id }, { $set: { "whiteLabelSettings": whiteLabelSettings } });
		}                                                                                                                    //
	} catch (error) {                                                                                                     //
		console.log(error);                                                                                                  // 78
	}                                                                                                                     //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"application-settings.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/collections/application-settings.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Schemas = {};                                                                                                      // 1
                                                                                                                       //
Schemas.ApplicationSetting = new SimpleSchema({                                                                        // 3
                                                                                                                       //
	"smtpSettings.userName": {                                                                                            // 5
		type: String,                                                                                                        // 6
		optional: true                                                                                                       // 7
	},                                                                                                                    //
	"smtpSettings.password": {                                                                                            // 9
		type: String,                                                                                                        // 10
		optional: true                                                                                                       // 11
	},                                                                                                                    //
	"smtpSettings.server": {                                                                                              // 13
		type: String,                                                                                                        // 14
		optional: true                                                                                                       // 15
	},                                                                                                                    //
	"smtpSettings.port": {                                                                                                // 17
		type: String,                                                                                                        // 18
		optional: true                                                                                                       // 19
	},                                                                                                                    //
                                                                                                                       //
	/*Schema LDAP settings will start from here*/                                                                         //
                                                                                                                       //
	"ldapSettings.domain": {                                                                                              // 24
		type: String,                                                                                                        // 25
		optional: true                                                                                                       // 26
	},                                                                                                                    //
	"ldapSettings.baseDn": {                                                                                              // 28
		type: String,                                                                                                        // 29
		optional: true                                                                                                       // 30
	},                                                                                                                    //
	"ldapSettings.url": {                                                                                                 // 32
		type: String,                                                                                                        // 33
		optional: true                                                                                                       // 34
	},                                                                                                                    //
	"ldapSettings.bindCn": {                                                                                              // 36
		type: String,                                                                                                        // 37
		optional: true                                                                                                       // 38
	},                                                                                                                    //
	"ldapSettings.bindPassword": {                                                                                        // 40
		type: String,                                                                                                        // 41
		optional: true                                                                                                       // 42
	},                                                                                                                    //
	"ldapSettings.forceLogin": {                                                                                          // 44
		type: Boolean,                                                                                                       // 45
		optional: true,                                                                                                      // 46
		defaultValue: false                                                                                                  // 47
	},                                                                                                                    //
                                                                                                                       //
	// WhiteLabel Settings Schema start here                                                                              //
                                                                                                                       //
	"whiteLabelSettings.innerLogoURL": {                                                                                  // 52
		type: String,                                                                                                        // 53
		optional: true                                                                                                       // 54
	},                                                                                                                    //
                                                                                                                       //
	"whiteLabelSettings.homePageLogoURL": {                                                                               // 57
		type: String,                                                                                                        // 58
		optional: true                                                                                                       // 59
	},                                                                                                                    //
                                                                                                                       //
	"whiteLabelSettings.hostRingToneLoopBack": {                                                                          // 62
		type: Boolean,                                                                                                       // 63
		optional: true,                                                                                                      // 64
		defaultValue: false                                                                                                  // 65
	},                                                                                                                    //
                                                                                                                       //
	"whiteLabelSettings.callEndConfirmation": {                                                                           // 68
		type: Boolean,                                                                                                       // 69
		optional: true,                                                                                                      // 70
		defaultValue: false                                                                                                  // 71
	},                                                                                                                    //
                                                                                                                       //
	// WhiteLabel Settings end here                                                                                       //
                                                                                                                       //
	createdBy: {                                                                                                          // 76
		type: String,                                                                                                        // 77
		autoValue: function () {                                                                                             // 78
			function autoValue() {                                                                                              // 78
				if (this.isInsert) {                                                                                               // 79
					return this.userId || "application";                                                                              // 80
				} else {                                                                                                           //
					this.unset();                                                                                                     // 82
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	createdOn: {                                                                                                          // 86
		type: Date,                                                                                                          // 87
		autoValue: function () {                                                                                             // 88
			function autoValue() {                                                                                              // 88
				if (this.isInsert) {                                                                                               // 89
					return new Date();                                                                                                // 90
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	modifiedBy: {                                                                                                         // 94
		type: String,                                                                                                        // 95
		autoValue: function () {                                                                                             // 96
			function autoValue() {                                                                                              // 96
				if (this.isUpdate) {                                                                                               // 97
					return this.userId;                                                                                               // 98
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 101
		optional: true                                                                                                       // 102
	},                                                                                                                    //
	modifiedOn: {                                                                                                         // 104
		type: Date,                                                                                                          // 105
		autoValue: function () {                                                                                             // 106
			function autoValue() {                                                                                              // 106
				if (this.isUpdate) {                                                                                               // 107
					return new Date();                                                                                                // 108
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 111
		optional: true                                                                                                       // 112
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
ApplicationSettings.attachSchema(Schemas.ApplicationSetting);                                                          // 117
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"corporate.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/collections/corporate.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
var Schemas = {};                                                                                                      // 2
                                                                                                                       //
Schemas.Corporate = new SimpleSchema({                                                                                 // 4
	businessName: {                                                                                                       // 5
		type: String                                                                                                         // 6
	},                                                                                                                    //
	officeAddr1: {                                                                                                        // 8
		type: String,                                                                                                        // 9
		optional: true                                                                                                       // 10
	},                                                                                                                    //
	officeAddr2: {                                                                                                        // 12
		type: String,                                                                                                        // 13
		optional: true                                                                                                       // 14
	},                                                                                                                    //
	phoneNo: {                                                                                                            // 16
		type: String,                                                                                                        // 17
		optional: true                                                                                                       // 18
	},                                                                                                                    //
	websiteAddr: {                                                                                                        // 20
		type: String,                                                                                                        // 21
		optional: true                                                                                                       // 22
	},                                                                                                                    //
	companyStatus: {                                                                                                      // 24
		type: String,                                                                                                        // 25
		optional: true                                                                                                       // 26
	},                                                                                                                    //
	contactPerson: {                                                                                                      // 28
		type: String,                                                                                                        // 29
		optional: true                                                                                                       // 30
	},                                                                                                                    //
	contactPhone: {                                                                                                       // 32
		type: String,                                                                                                        // 33
		optional: true                                                                                                       // 34
	},                                                                                                                    //
	contactEmail: {                                                                                                       // 36
		type: String,                                                                                                        // 37
		optional: true                                                                                                       // 38
	},                                                                                                                    //
	publishLimit: {                                                                                                       // 40
		type: Number,                                                                                                        // 41
		optional: true                                                                                                       // 42
	},                                                                                                                    //
	subscriberLimit: {                                                                                                    // 44
		type: Number,                                                                                                        // 45
		optional: true                                                                                                       // 46
	},                                                                                                                    //
	roomLimit: {                                                                                                          // 48
		type: Number,                                                                                                        // 49
		optional: true                                                                                                       // 50
	},                                                                                                                    //
	panNumber: {                                                                                                          // 52
		type: String,                                                                                                        // 53
		optional: true                                                                                                       // 54
	},                                                                                                                    //
	tanID: {                                                                                                              // 56
		type: String,                                                                                                        // 57
		optional: true                                                                                                       // 58
	},                                                                                                                    //
	createdBy: {                                                                                                          // 60
		type: String,                                                                                                        // 61
		autoValue: function () {                                                                                             // 62
			function autoValue() {                                                                                              // 62
				if (this.isInsert) {                                                                                               // 63
					return this.userId || "application";                                                                              // 64
				} else {                                                                                                           //
					this.unset();                                                                                                     // 66
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	createdOn: {                                                                                                          // 70
		type: Date,                                                                                                          // 71
		autoValue: function () {                                                                                             // 72
			function autoValue() {                                                                                              // 72
				if (this.isInsert) {                                                                                               // 73
					return new Date();                                                                                                // 74
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	modifiedBy: {                                                                                                         // 78
		type: String,                                                                                                        // 79
		autoValue: function () {                                                                                             // 80
			function autoValue() {                                                                                              // 80
				if (this.isUpdate) {                                                                                               // 81
					return this.userId;                                                                                               // 82
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 85
		optional: true                                                                                                       // 86
	},                                                                                                                    //
	modifiedOn: {                                                                                                         // 88
		type: Date,                                                                                                          // 89
		autoValue: function () {                                                                                             // 90
			function autoValue() {                                                                                              // 90
				if (this.isUpdate) {                                                                                               // 91
					return new Date();                                                                                                // 92
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 95
		optional: true                                                                                                       // 96
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Corporate.attachSchema(Schemas.Corporate);                                                                             // 100
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"logger.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/collections/logger.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
var Schemas = {};                                                                                                      // 2
                                                                                                                       //
Schemas.Logger = new SimpleSchema({                                                                                    // 4
	ActivityCode: {                                                                                                       // 5
		type: String                                                                                                         // 6
	},                                                                                                                    //
	Message: {                                                                                                            // 8
		type: String                                                                                                         // 9
	},                                                                                                                    //
	uid: {                                                                                                                // 11
		type: String                                                                                                         // 12
	},                                                                                                                    //
	createdBy: {                                                                                                          // 14
		type: String,                                                                                                        // 15
		autoValue: function () {                                                                                             // 16
			function autoValue() {                                                                                              // 16
				if (this.isInsert) {                                                                                               // 17
					return this.userId || "application";                                                                              // 18
				} else {                                                                                                           //
					this.unset();                                                                                                     // 20
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	createdOn: {                                                                                                          // 24
		type: Date,                                                                                                          // 25
		autoValue: function () {                                                                                             // 26
			function autoValue() {                                                                                              // 26
				if (this.isInsert) {                                                                                               // 27
					return new Date();                                                                                                // 28
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	modifiedBy: {                                                                                                         // 32
		type: String,                                                                                                        // 33
		autoValue: function () {                                                                                             // 34
			function autoValue() {                                                                                              // 34
				if (this.isUpdate) {                                                                                               // 35
					return this.userId;                                                                                               // 36
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 39
		optional: true                                                                                                       // 40
	},                                                                                                                    //
	modifiedOn: {                                                                                                         // 42
		type: Date,                                                                                                          // 43
		autoValue: function () {                                                                                             // 44
			function autoValue() {                                                                                              // 44
				if (this.isUpdate) {                                                                                               // 45
					return new Date();                                                                                                // 46
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 49
		optional: true                                                                                                       // 50
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Logger.attachSchema(Schemas.Logger);                                                                                   // 54
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"meeting-schedule.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/collections/meeting-schedule.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Schemas = {};                                                                                                      // 1
                                                                                                                       //
Schemas.Meeting = new SimpleSchema({                                                                                   // 3
	"meetingName": {                                                                                                      // 4
		type: String                                                                                                         // 5
	},                                                                                                                    //
	"meetingDetails": {                                                                                                   // 7
		type: String,                                                                                                        // 8
		optional: true                                                                                                       // 9
	},                                                                                                                    //
	"startTime": {                                                                                                        // 11
		type: Date                                                                                                           // 12
	},                                                                                                                    //
	"endTime": {                                                                                                          // 14
		type: Date                                                                                                           // 15
	},                                                                                                                    //
	meetingRoomId: {                                                                                                      // 17
		type: String                                                                                                         // 18
	},                                                                                                                    //
	roomParticipants: {                                                                                                   // 20
		type: [String]                                                                                                       // 21
	},                                                                                                                    //
	emailDelivered: {                                                                                                     // 23
		type: String                                                                                                         // 24
	},                                                                                                                    //
	createdBy: {                                                                                                          // 26
		type: String,                                                                                                        // 27
		autoValue: function () {                                                                                             // 28
			function autoValue() {                                                                                              // 28
				if (this.isInsert) {                                                                                               // 29
					return this.userId;                                                                                               // 30
				} else {                                                                                                           //
					this.unset();                                                                                                     // 32
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	createdOn: {                                                                                                          // 36
		type: Date,                                                                                                          // 37
		autoValue: function () {                                                                                             // 38
			function autoValue() {                                                                                              // 38
				if (this.isInsert) {                                                                                               // 39
					return new Date();                                                                                                // 40
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	modifiedBy: {                                                                                                         // 44
		type: String,                                                                                                        // 45
		autoValue: function () {                                                                                             // 46
			function autoValue() {                                                                                              // 46
				if (this.isUpdate) {                                                                                               // 47
					return this.userId;                                                                                               // 48
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 51
		optional: true                                                                                                       // 52
	},                                                                                                                    //
	modifiedOn: {                                                                                                         // 54
		type: Date,                                                                                                          // 55
		autoValue: function () {                                                                                             // 56
			function autoValue() {                                                                                              // 56
				if (this.isUpdate) {                                                                                               // 57
					return new Date();                                                                                                // 58
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 61
		optional: true                                                                                                       // 62
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Meetings.attachSchema(Schemas.Meeting);                                                                                // 66
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"room-license.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/collections/room-license.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
var Schemas = {};                                                                                                      // 2
                                                                                                                       //
Schemas.RoomLicense = new SimpleSchema({                                                                               // 4
                                                                                                                       //
	roomLicense: {                                                                                                        // 6
		type: String                                                                                                         // 7
	},                                                                                                                    //
	roomName: {                                                                                                           // 9
		type: String                                                                                                         // 10
	},                                                                                                                    //
	hostUserId: {                                                                                                         // 12
		type: String,                                                                                                        // 13
		optional: true                                                                                                       // 14
	},                                                                                                                    //
	corporateId: {                                                                                                        // 16
		type: String,                                                                                                        // 17
		optional: true                                                                                                       // 18
	},                                                                                                                    //
	mcuServer: {                                                                                                          // 20
		type: String,                                                                                                        // 21
		optional: true                                                                                                       // 22
	},                                                                                                                    //
	sipServer: {                                                                                                          // 24
		type: String,                                                                                                        // 25
		optional: true                                                                                                       // 26
	},                                                                                                                    //
	hostPassword: {                                                                                                       // 28
		type: String,                                                                                                        // 29
		optional: true                                                                                                       // 30
	},                                                                                                                    //
	roomPassword: {                                                                                                       // 32
		type: String,                                                                                                        // 33
		optional: true                                                                                                       // 34
	},                                                                                                                    //
	videoMode: {                                                                                                          // 36
		type: String,                                                                                                        // 37
		optional: false                                                                                                      // 38
	},                                                                                                                    //
	guestLoginToken: {                                                                                                    // 40
		type: String,                                                                                                        // 41
		optional: true                                                                                                       // 42
	},                                                                                                                    //
	users: {                                                                                                              // 44
		type: Array,                                                                                                         // 45
		optional: true                                                                                                       // 46
	},                                                                                                                    //
	WBStatus: {                                                                                                           // 48
		type: String,                                                                                                        // 49
		optional: true                                                                                                       // 50
	},                                                                                                                    //
	bridgeNumber: {                                                                                                       // 52
		type: String,                                                                                                        // 53
		optional: true                                                                                                       // 54
	},                                                                                                                    //
	"users.$": {                                                                                                          // 56
		type: Object                                                                                                         // 57
	},                                                                                                                    //
	"users.$.uid": {                                                                                                      // 59
		type: String                                                                                                         // 60
	},                                                                                                                    //
	createdBy: {                                                                                                          // 62
		type: String,                                                                                                        // 63
		autoValue: function () {                                                                                             // 64
			function autoValue() {                                                                                              // 64
				if (this.isInsert) {                                                                                               // 65
					return this.userId || "application";                                                                              // 66
				} else {                                                                                                           //
					this.unset();                                                                                                     // 68
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	createdOn: {                                                                                                          // 72
		type: Date,                                                                                                          // 73
		autoValue: function () {                                                                                             // 74
			function autoValue() {                                                                                              // 74
				if (this.isInsert) {                                                                                               // 75
					return new Date();                                                                                                // 76
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	modifiedBy: {                                                                                                         // 80
		type: String,                                                                                                        // 81
		autoValue: function () {                                                                                             // 82
			function autoValue() {                                                                                              // 82
				if (this.isUpdate) {                                                                                               // 83
					return this.userId;                                                                                               // 84
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 87
		optional: true                                                                                                       // 88
	},                                                                                                                    //
	modifiedOn: {                                                                                                         // 90
		type: Date,                                                                                                          // 91
		autoValue: function () {                                                                                             // 92
			function autoValue() {                                                                                              // 92
				if (this.isUpdate) {                                                                                               // 93
					return new Date();                                                                                                // 94
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		denyInsert: true,                                                                                                    // 97
		optional: true                                                                                                       // 98
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
RoomLicense.attachSchema(Schemas.RoomLicense);                                                                         // 102
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"conference":{"auto-db-mgr.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/conference/auto-db-mgr.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	autoInsertOrUpdate: function () {                                                                                     // 2
		function autoInsertOrUpdate(objEntity) {                                                                             // 2
			console.log(objEntity);                                                                                             // 3
		}                                                                                                                    //
                                                                                                                       //
		return autoInsertOrUpdate;                                                                                           //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"conference-manager.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/conference/conference-manager.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	getMyRoom: function () {                                                                                              // 2
		function getMyRoom(roomlic) {                                                                                        // 2
			this.unblock();                                                                                                     // 3
			var getroomdet = Meteor.wrapAsync(getRoomDetails);                                                                  // 4
			return getroomdet(roomlic);                                                                                         // 5
		}                                                                                                                    //
                                                                                                                       //
		return getMyRoom;                                                                                                    //
	}(),                                                                                                                  //
	userDetails: function () {                                                                                            // 7
		function userDetails(uid) {                                                                                          // 7
			this.unblock();                                                                                                     // 8
			var objUser = Meteor.users.findOne(uid);                                                                            // 9
			if (objUser) {                                                                                                      // 10
				return Meteor.users.findOne(uid).profile.name;                                                                     // 11
			} else {                                                                                                            //
				return null;                                                                                                       // 13
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return userDetails;                                                                                                  //
	}(),                                                                                                                  //
	roomName: function () {                                                                                               // 16
		function roomName(roomid) {                                                                                          // 16
			this.unblock();                                                                                                     // 17
			return RoomLicense.findOne({ roomLicense: roomid }).roomName;                                                       // 18
		}                                                                                                                    //
                                                                                                                       //
		return roomName;                                                                                                     //
	}(),                                                                                                                  //
	getMyToken: function () {                                                                                             // 20
		function getMyToken(roomid) {                                                                                        // 20
			this.unblock();                                                                                                     // 21
			var getroomtoken = Meteor.wrapAsync(getTokenDetails);                                                               // 22
			return getroomtoken(roomid, Meteor.user().profile.name, 'presenter');                                               // 23
		}                                                                                                                    //
                                                                                                                       //
		return getMyToken;                                                                                                   //
	}(),                                                                                                                  //
	getMyTokenforGuest: function () {                                                                                     // 25
		function getMyTokenforGuest(roomid, Name) {                                                                          // 25
			this.unblock();                                                                                                     // 26
			var getroomtoken = Meteor.wrapAsync(getTokenDetails);                                                               // 27
			return getroomtoken(roomid, Name, 'presenter');                                                                     // 28
		}                                                                                                                    //
                                                                                                                       //
		return getMyTokenforGuest;                                                                                           //
	}(),                                                                                                                  //
	updateRoomStatus: function () {                                                                                       // 30
		function updateRoomStatus(whiteboardstatus, roomlic) {                                                               // 30
			return RoomLicense.update({ roomLicense: roomlic }, { $set: { WBStatus: whiteboardstatus } });                      // 31
		}                                                                                                                    //
                                                                                                                       //
		return updateRoomStatus;                                                                                             //
	}(),                                                                                                                  //
	validateHost: function () {                                                                                           // 33
		function validateHost(roomlic, pwd) {                                                                                // 33
			this.unblock();                                                                                                     // 34
			var objRoom = RoomLicense.findOne({ roomLicense: roomlic });                                                        // 35
			//console.log(objRoom);                                                                                             //
			if (objRoom) {                                                                                                      // 33
				if (pwd === objRoom.hostPassword) {                                                                                // 38
					return true;                                                                                                      // 39
				} else {                                                                                                           //
					return false;                                                                                                     // 41
				}                                                                                                                  //
			} else {                                                                                                            //
				return false;                                                                                                      // 44
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return validateHost;                                                                                                 //
	}(),                                                                                                                  //
	logger: function () {                                                                                                 // 47
		function logger(TopicCode, Message) {}                                                                               // 47
                                                                                                                       //
		return logger;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
function getRoomDetails(roomid, callback) {                                                                            // 52
                                                                                                                       //
	var objRoom = RoomLicense.findOne({ _id: roomid });                                                                   // 54
                                                                                                                       //
	try {                                                                                                                 // 56
		var url = 'https://' + objRoom.mcuServer + '/getRoom/' + objRoom.roomLicense;                                        // 57
		HTTP.call('GET', url, { rejectUnauthorized: false }, function (err, res) {                                           // 58
			console.log(err);                                                                                                   // 59
			callback(null, res.content);                                                                                        // 60
		});                                                                                                                  //
	} catch (e) {                                                                                                         //
		callback(e, null);                                                                                                   // 63
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
getTokenDetails = function getTokenDetails(roomid, username, rolename, callback) {                                     // 68
	var objRoom = RoomLicense.findOne({ roomLicense: roomid });                                                           // 69
	//console.log(objRoom);                                                                                               //
	var url = 'https://' + objRoom.mcuServer + '/createToken/';                                                           // 68
	var body = { room: roomid, username: username, role: rolename };                                                      // 72
	HTTP.call('POST', url, { data: body, rejectUnauthorized: false }, function (err, res) {                               // 73
		//console.log(err);                                                                                                  //
		callback(null, res.content);                                                                                         // 75
	});                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
// createRoom("Raja", function(res){                                                                                   //
// 	if(res.statusCode == 200){                                                                                         //
// 		console.log(res.content);                                                                                         //
// 	}                                                                                                                  //
// })                                                                                                                  //
                                                                                                                       //
// function createRoom (room, callback) {                                                                              //
//     // var req = new XMLHttpRequest();                                                                              //
//     var url = MCU_URL + 'createRoom/';                                                                              //
//     var body = {name: room};                                                                                        //
//     HTTP.call('POST', url, {data: body}, function(err, res){                                                        //
//     	if(!err){                                                                                                      //
//     	    	callback(res);                                                                                            //
//     	}else{                                                                                                         //
//     		console.log('--------ERROR----------');                                                                       //
//     		console.log(err);                                                                                             //
//     	}                                                                                                              //
//     });                                                                                                             //
// }                                                                                                                   //
                                                                                                                       //
/*                                                                                                                     //
var updates = {};                                                                                                      //
updates[key] = valueObj[id];                                                                                           //
var roomelem = {                                                                                                       //
		name			: 'Sample Name',                                                                                              //
		mode 			: 'hybrid',                                                                                                  //
		publishLimit 	: -1,                                                                                                  //
		userLimit		: -1,                                                                                                     //
		mediaMixing		: {                                                                                                     //
							video: {                                                                                                        //
								avCoordinated	: true,                                                                                          //
								maxInput		: 16,                                                                                                //
								resolution		: 'vga',                                                                                           //
								multistreaming 	: true,                                                                                        //
								bitrate 		: 300,                                                                                               //
								bkColor			: 'black',                                                                                           //
								layout: {                                                                                                      //
									base 		: "fluid" | "void" | "lecture",                                                                        //
									custom		: []                                                                                                  //
								}                                                                                                              //
						  	}                                                                                                             //
						  	audio: null,                                                                                                  //
						  },                                                                                                             //
		enableMixing 	: false,                                                                                               //
	}                                                                                                                     //
                                                                                                                       //
nuve.updateRoom(roomId, updates, function(err, resp) {                                                                 //
        if (err) return notify('error', 'Update Room', resp);                                                          //
        setTimeout(function() {                                                                                        //
          p.find('.editable-unsaved').removeClass('editable-unsaved');                                                 //
        }, 20);                                                                                                        //
        roomCache[roomId] = JSON.parse(resp);                                                                          //
        notify('info', 'Update Room Success', roomId);                                                                 //
      });                                                                                                              //
                                                                                                                       //
*/                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"logger-manage.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/conference/logger-manage.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({});                                                                                                    // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lab":{"testing.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/lab/testing.js                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	insertMessages: function () {                                                                                         // 2
		function insertMessages() {                                                                                          // 2
			var chatRoomId = "3tx4bCQBiRAbHsB3x";                                                                               // 3
			var messages = [],                                                                                                  // 4
			    sentBy = "";                                                                                                    //
			for (var i = 0; i <= 20; i++) {                                                                                     // 5
				if (i % 2 == 0) sentBy = "85kK9zipfvCGGw7TB";else sentBy = "Spr4mGoMp2FF4H2jR";                                    // 6
				messages.push({ chatRoomId: chatRoomId, message: "Hello " + i, type: "text", sentBy: sentBy, sentAt: new Date() });
			}                                                                                                                   //
                                                                                                                       //
			var result = Messages.insert({ chatRoomId: chatRoomId, chatDate: 2016225, dateForUI: new Date("2016-02-25 16:49"), messages: messages });
			console.log("result  ", result);                                                                                    // 12
		}                                                                                                                    //
                                                                                                                       //
		return insertMessages;                                                                                               //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"manageall":{"manage-myaccount.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/manageall/manage-myaccount.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	UpdateMyAccount: function () {                                                                                        // 2
		function UpdateMyAccount(objEntity) {                                                                                // 2
			this.unblock();                                                                                                     // 3
                                                                                                                       //
			Meteor.users.update({ _id: this.userId }, { $set: objEntity });                                                     // 5
                                                                                                                       //
			return true;                                                                                                        // 7
		}                                                                                                                    //
                                                                                                                       //
		return UpdateMyAccount;                                                                                              //
	}(),                                                                                                                  //
	SaveCorporate: function () {                                                                                          // 9
		function SaveCorporate(objEntity, uval) {                                                                            // 9
			this.unblock();                                                                                                     // 10
			if (uval == '') {                                                                                                   // 11
				Corporate.insert(objEntity);                                                                                       // 12
			} else {                                                                                                            //
				Corporate.update({ _id: uval }, { $set: objEntity });                                                              // 14
			}                                                                                                                   //
			return true;                                                                                                        // 16
		}                                                                                                                    //
                                                                                                                       //
		return SaveCorporate;                                                                                                //
	}(),                                                                                                                  //
	SaveUsers: function () {                                                                                              // 18
		function SaveUsers(objEntity, uval) {                                                                                // 18
			this.unblock();                                                                                                     // 19
			if (uval == '') {                                                                                                   // 20
				// Meteor.call('createNewUser', function(err, succ){                                                               //
				// 	return succ;                                                                                                   //
				// });                                                                                                             //
			} else {}                                                                                                           //
		}                                                                                                                    //
                                                                                                                       //
		return SaveUsers;                                                                                                    //
	}(),                                                                                                                  //
	UpdateMyLDAP: function () {                                                                                           // 28
		function UpdateMyLDAP(objEntity) {                                                                                   // 28
			this.unblock();                                                                                                     // 29
			ApplicationSettings.update({}, { $set: objEntity });                                                                // 30
			return true;                                                                                                        // 31
		}                                                                                                                    //
                                                                                                                       //
		return UpdateMyLDAP;                                                                                                 //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"meetingSchedular":{"cron-job.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/meetingSchedular/cron-job.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
  SyncedCron.config({                                                                                                  // 2
    // log: true,                          // Log job run details to console                                           //
    logger: null, // Use a custom logger function (defaults to Meteor's logging package)                               // 4
    collectionName: 'cronHistory', // Name of collection to use for synchronisation and logging                        // 5
    utc: true // Default to using localTime                                                                            // 6
    // collectionTTL: 172800                                                                                           //
  });                                                                                                                  // 2
                                                                                                                       //
  SyncedCron.add({                                                                                                     // 10
    name: 'Send Emails to Participants in the Meeting before 15 min of the Meeting.',                                  // 11
    schedule: function () {                                                                                            // 12
      function schedule(parser) {                                                                                      // 12
        return parser.text('every 5 minutes');                                                                         // 13
      }                                                                                                                //
                                                                                                                       //
      return schedule;                                                                                                 //
    }(),                                                                                                               //
    job: function () {                                                                                                 // 15
      function job() {                                                                                                 // 15
        var currentTime = new Date();                                                                                  // 16
        var gtTime = new Date(); // time for greater than option.                                                      // 17
                                                                                                                       //
        var getMinutes = currentTime.getMinutes();                                                                     // 15
        var setMinutes = currentTime.setMinutes(getMinutes + 20);                                                      // 20
                                                                                                                       //
        var ltTime = new Date(setMinutes); // time for less than option.                                               // 22
                                                                                                                       //
        var meetings = Meetings.find({ startTime: { $gte: gtTime, $lte: ltTime }, emailDelivered: "NO" }).fetch();     // 15
                                                                                                                       //
        console.log("meetings ", meetings);                                                                            // 26
        for (var meeting in meteorBabelHelpers.sanitizeForInObject(meetings)) {                                        // 27
          var participants = meetings[meeting]['roomParticipants'];                                                    // 28
          for (var participant in meteorBabelHelpers.sanitizeForInObject(participants)) {                              // 29
            console.log("participant ", participants[participant]);                                                    // 30
            Email.send({                                                                                               // 31
              to: participants[participant],                                                                           // 32
              from: "InstaVC Admin<no-reply@instavc.com>",                                                             // 33
              subject: "InstaVC Meeting Notification",                                                                 // 34
              html: "<html><p>You have been invited to a meeting in InstaVC, which is scheduled on  " + meetings[meeting]['startTime'] + ".</p></html>"
            });                                                                                                        //
          }                                                                                                            //
          Meetings.update({ _id: meetings[meeting]._id }, { $set: { emailDelivered: "YES" } });                        // 38
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return job;                                                                                                      //
    }()                                                                                                                //
  });                                                                                                                  //
  SyncedCron.start();                                                                                                  // 42
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"meeting-schedular.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/meetingSchedular/meeting-schedular.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	createMeeting: function () {                                                                                          // 2
		function createMeeting(newMeeting) {                                                                                 // 2
			try {                                                                                                               // 3
				//find all meetings booked in that room                                                                            //
				var roomCursor = Meetings.find({ meetingRoomId: newMeeting.meetingRoomId });                                       // 5
				var sT = moment(newMeeting.startTime); // start time of the meeting (startTime) from newMeeting object             // 6
				var eT = moment(newMeeting.endTime); // end time of the meeting (endTime) from newMeeting object                   // 3
                                                                                                                       //
				if (roomCursor.count() !== 0) {                                                                                    // 3
					roomCursor.forEach(function (room) {                                                                              // 10
						var rsT = moment(room.startTime); // startTime from room obj ( existing room objects )                           // 11
						var reT = moment(room.endTime); // endTime from room obj ( existing room objects )                               // 10
						if (sT.isSame(rsT)) {                                                                                            // 10
							throw new Meteor.Error("This time is already allocated to another slot with this room", "Select another slot or another room");
						} else if (sT.isAfter(rsT) && eT.isBefore(reT)) {                                                                //
							throw new Meteor.Error("This time is already allocated to another slot with this room", "Select another slot or another room");
						} else if (sT.isAfter(rsT) && sT.isBefore(reT)) {                                                                //
							throw new Meteor.Error("Meeting start time is in between pre booked slot", "Select another slot or another room");
						} else if (eT.isAfter(rsT) && eT.isBefore(reT)) {                                                                //
							throw new Meteor.Error("Meeting end  time is in between pre booked slot", "Select another slot or another room");
						} else if (sT.isBefore(rsT) && (eT.isAfter(reT) || eT.isAfter(rsT))) {                                           //
							throw new Meteor.Error("Meeting end time conflict", "Select another slot or another room");                     // 22
						}                                                                                                                //
					});                                                                                                               //
					return Meetings.insert(newMeeting);                                                                               // 25
				} else {                                                                                                           //
					return Meetings.insert(newMeeting);                                                                               // 27
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				return new Meteor.Error("Type-Error", "Please select other room or other time slots.");                            // 30
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return createMeeting;                                                                                                //
	}(),                                                                                                                  //
	// this will return the schedules of that room                                                                        //
	getSchedulesCurrentRoom: function () {                                                                                // 34
		function getSchedulesCurrentRoom(roomLic) {                                                                          // 34
			try {                                                                                                               // 35
				var roomId = RoomLicense.findOne({ "roomLicense": roomLic })._id;                                                  // 36
				var currentTime = new Date();                                                                                      // 37
				console.log("roomId is ", roomId);                                                                                 // 38
				var meeting = Meetings.findOne({ meetingRoomId: roomId, startTime: { $lt: currentTime }, endTime: { $gt: currentTime } });
                                                                                                                       //
				if (meeting) {                                                                                                     // 41
					console.log("------------------------------------");                                                              // 42
					console.log("currentTime ", currentTime.getTime());                                                               // 43
					console.log("endTime ", meeting.endTime.getTime());                                                               // 44
                                                                                                                       //
					var currentTimeAfter14min = currentTime.getTime() + 14 * 60 * 1000;                                               // 46
					var currentTimeAfter16min = currentTime.getTime() + 16 * 60 * 1000;                                               // 47
					var meetingEndTime = meeting.endTime.getTime();                                                                   // 48
                                                                                                                       //
					if (currentTimeAfter14min < meetingEndTime && currentTimeAfter16min > meetingEndTime) {                           // 50
						console.log('Yes it is between 15 min');                                                                         // 51
						return { showNotification: true, stopInterval: true };                                                           // 52
					} else {                                                                                                          //
						return { showNotification: false, stopInterval: false };                                                         // 54
					}                                                                                                                 //
				} else {                                                                                                           //
					return {};                                                                                                        // 57
				}                                                                                                                  //
			} catch (e) {                                                                                                       //
				return new Meteor.Error("Type-Error", e);                                                                          // 61
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getSchedulesCurrentRoom;                                                                                      //
	}(),                                                                                                                  //
                                                                                                                       //
	emailInvitationToParticipants: function () {                                                                          // 65
		function emailInvitationToParticipants(meetingId) {                                                                  // 65
			var meeting = Meetings.findOne(meetingId);                                                                          // 66
			var participants = meeting['roomParticipants'];                                                                     // 67
			for (var participant in meteorBabelHelpers.sanitizeForInObject(participants)) {                                     // 68
				console.log("participant ", participants[participant]);                                                            // 69
				Email.send({                                                                                                       // 70
					to: participants[participant],                                                                                    // 71
					from: "InstaVC Admin<no-reply@instavc.com>",                                                                      // 72
					subject: "InstaVC Meeting Invitation",                                                                            // 73
					html: "<html><p>You have been invited to a meeting in InstaVC, which is scheduled on  " + meeting['startTime'] + ".</p></html>"
				});                                                                                                                //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return emailInvitationToParticipants;                                                                                //
	}(),                                                                                                                  //
	deleteMeeting: function () {                                                                                          // 78
		function deleteMeeting(meetingId) {                                                                                  // 78
			try {                                                                                                               // 79
				Meetings.remove({ _id: meetingId });                                                                               // 80
			} catch (error) {                                                                                                   //
				throw new Meteor.Error("meeting-deleted-failed", error.message);                                                   // 82
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return deleteMeeting;                                                                                                //
	}(),                                                                                                                  //
	editMeeting: function () {                                                                                            // 85
		function editMeeting(meetingObj) {                                                                                   // 85
			//console.log("meetingObj:", meetingObj);                                                                           //
                                                                                                                       //
			//get the start,end time,room name from the client                                                                  //
			var sT = moment(meetingObj.startTime);                                                                              // 89
			var eT = moment(meetingObj.endTime);                                                                                // 90
			//var newRoom = meetingObj.meetingRoom;                                                                             //
                                                                                                                       //
			//get that particular meeting slot                                                                                  //
			var oldMeetingSlot = Meetings.findOne({ _id: meetingObj.meetingId });                                               // 85
                                                                                                                       //
			//find old and new meeting ids                                                                                      //
			var oldMeetingSlotId = oldMeetingSlot._id;                                                                          // 85
			var newmeetingSlotId = meetingObj._id;                                                                              // 98
                                                                                                                       //
			//get the old meeting start and end time and room name                                                              //
			var oldStartTime = oldMeetingSlot.startTime;                                                                        // 85
			var oldEndTime = oldMeetingSlot.endTime;                                                                            // 102
                                                                                                                       //
			//var oldEndTime = moment( oldMeetingSlot.endTime );                                                                //
			var oldRoom = oldMeetingSlot.meetingRoom;                                                                           // 85
                                                                                                                       //
			//room not changed                                                                                                  //
			// if  (newRoom == oldRoom) {                                                                                       //
                                                                                                                       //
			if (sT.isSame(oldStartTime) && eT.isSame(oldEndTime)) {                                                             // 85
                                                                                                                       //
				console.log("room and timings are not changed");                                                                   // 116
				try {                                                                                                              // 117
					Meetings.update({ _id: meetingObj.meetingId }, { $set: {                                                          // 118
							meetingName: meetingObj.meetingName,                                                                            // 119
							meetingDetails: meetingObj.meetingDetails,                                                                      // 120
							// startTime: meetingObj.startTime,                                                                             //
							// endTime: meetingObj.endTime,                                                                                 //
							// meetingRoom: meetingObj.meetingRoom,                                                                         //
							// meetingRoomId: meetingObj.meetingRoomId,                                                                     //
							modifiedAt: meetingObj.modifiedAt,                                                                              // 125
							modifiedBy: meetingObj.modifiedBy                                                                               // 126
						} });                                                                                                            //
					return;                                                                                                           // 128
				} catch (error) {                                                                                                  //
					throw new Meteor.Error("meeting-edit-failed", error.message);                                                     // 130
				}                                                                                                                  //
			} else {                                                                                                            //
				//console.log(" timings changed");                                                                                 //
                                                                                                                       //
				if (sT.isSame(oldStartTime)) {                                                                                     // 135
                                                                                                                       //
					if (eT.isBefore(oldEndTime)) {                                                                                    // 137
						//console.log("shorten");                                                                                        //
						try {                                                                                                            // 139
							Meetings.update({ _id: meetingObj.meetingId }, { $set: {                                                        // 140
									meetingName: meetingObj.meetingName,                                                                          // 141
									meetingDetails: meetingObj.meetingDetails,                                                                    // 142
									startTime: meetingObj.startTime,                                                                              // 143
									endTime: meetingObj.endTime,                                                                                  // 144
									//meetingRoom: meetingObj.meetingRoom,                                                                        //
									meetingRoomId: meetingObj.meetingRoomId,                                                                      // 146
									modifiedAt: meetingObj.modifiedAt,                                                                            // 147
									modifiedBy: meetingObj.modifiedBy                                                                             // 148
								} });                                                                                                          //
							return;                                                                                                         // 150
						} catch (error) {                                                                                                //
							throw new Meteor.Error("meeting-edit-failed", error.message);                                                   // 152
						}                                                                                                                //
					} else {                                                                                                          //
						//console.log("extended");                                                                                       //
                                                                                                                       //
						var nextSlot = Meetings.find({ startTime: { $gte: oldEndTime }                                                   // 157
						}, { sort: { startTime: 1 },                                                                                     //
							limit: 1                                                                                                        // 163
						}).fetch();                                                                                                      //
                                                                                                                       //
						if (nextSlot.length > 0) {                                                                                       // 166
							var nextSlotTime = moment(nextSlot[0]["startTime"]);                                                            // 167
                                                                                                                       //
							if (eT.isAfter(nextSlotTime)) {                                                                                 // 169
								//console.log("saale aukad me reh");                                                                           //
								throw new Meteor.Error("meeting-edit-failed", "The meeeting end time collides with the next meeting start time");
								return;                                                                                                        // 172
							}                                                                                                               //
						} else {                                                                                                         //
							//console.log("slot khali tha insert kar li");                                                                  //
							try {                                                                                                           // 176
								Meetings.update({ _id: meetingObj.meetingId }, { $set: {                                                       // 177
										meetingName: meetingObj.meetingName,                                                                         // 178
										meetingDetails: meetingObj.meetingDetails,                                                                   // 179
										startTime: meetingObj.startTime,                                                                             // 180
										endTime: meetingObj.endTime,                                                                                 // 181
										//meetingRoom: meetingObj.meetingRoom,                                                                       //
										meetingRoomId: meetingObj.meetingRoomId,                                                                     // 183
										modifiedAt: meetingObj.modifiedAt,                                                                           // 184
										modifiedBy: meetingObj.modifiedBy                                                                            // 185
									} });                                                                                                         //
								return;                                                                                                        // 187
							} catch (error) {                                                                                               //
								throw new Meteor.Error("meeting-edit-failed", error.message);                                                  // 189
							}                                                                                                               //
						}                                                                                                                //
					}                                                                                                                 //
				} else {                                                                                                           //
					//console.log("preponed");                                                                                        //
                                                                                                                       //
					if (sT.isAfter(moment(oldStartTime))) {                                                                           // 196
						//console.log("you are shortening ur time");                                                                     //
						try {                                                                                                            // 198
							Meetings.update({ _id: meetingObj.meetingId }, { $set: {                                                        // 199
									meetingName: meetingObj.meetingName,                                                                          // 200
									meetingDetails: meetingObj.meetingDetails,                                                                    // 201
									startTime: meetingObj.startTime,                                                                              // 202
									endTime: meetingObj.endTime,                                                                                  // 203
									//meetingRoom: meetingObj.meetingRoom,                                                                        //
									meetingRoomId: meetingObj.meetingRoomId,                                                                      // 205
									modifiedAt: meetingObj.modifiedAt,                                                                            // 206
									modifiedBy: meetingObj.modifiedBy                                                                             // 207
								} });                                                                                                          //
						} catch (error) {                                                                                                //
							throw new Meteor.Error("meeting-edit-failed", error.message);                                                   // 210
						}                                                                                                                //
						return;                                                                                                          // 212
					} else {                                                                                                          //
                                                                                                                       //
						var prevSlot = Meetings.find({ endTime: { $lte: oldStartTime }                                                   // 215
						}, { sort: { endTime: -1 },                                                                                      //
							limit: 1                                                                                                        // 221
						}).fetch();                                                                                                      //
                                                                                                                       //
						//console.log(prevSlot);                                                                                         //
                                                                                                                       //
						if (prevSlot.length > 0) {                                                                                       // 213
							//console.log("prev", prevSlot[0]["endTime"]);                                                                  //
							var prevSlotEndTime = prevSlot[0]["endTime"];                                                                   // 228
                                                                                                                       //
							if (sT.isBefore(prevSlotEndTime)) {                                                                             // 230
								throw new Meteor.Error("meeting-edit-failed", "The meeting start time collides with the end time of of previous meeting");
							}                                                                                                               //
						} else {                                                                                                         //
							//console.log("prev slot is empty");                                                                            //
							try {                                                                                                           // 235
								Meetings.update({ _id: meetingObj.meetingId }, { $set: {                                                       // 236
										meetingName: meetingObj.meetingName,                                                                         // 237
										meetingDetails: meetingObj.meetingDetails,                                                                   // 238
										startTime: meetingObj.startTime,                                                                             // 239
										endTime: meetingObj.endTime,                                                                                 // 240
										//meetingRoom: meetingObj.meetingRoom,                                                                       //
										meetingRoomId: meetingObj.meetingRoomId,                                                                     // 242
										modifiedAt: meetingObj.modifiedAt,                                                                           // 243
										modifiedBy: meetingObj.modifiedBy                                                                            // 244
									} });                                                                                                         //
							} catch (error) {                                                                                               //
								throw new Meteor.Error("meeting-edit-failed", error.message);                                                  // 247
							}                                                                                                               //
						}                                                                                                                //
					}                                                                                                                 //
				}                                                                                                                  //
			}                                                                                                                   //
			// } else {                                                                                                         //
			// 		console.log("room changed");                                                                                   //
			// 		var roomCursor = Meetings.find({meetingRoom: meetingObj.meetingRoom});                                         //
                                                                                                                       //
			// 		var sT = moment(meetingObj.startTime);                                                                         //
			// 		var eT = moment(meetingObj.endTime);                                                                           //
                                                                                                                       //
			// 		//check if room has bookings                                                                                   //
			// 		if (roomCursor.count() !== 0) {                                                                                //
			// 			roomCursor.forEach( function (room) {                                                                         //
                                                                                                                       //
			// 				var rsT = moment(room.startTime);                                                                            //
			// 				var reT = moment(room.endTime);                                                                              //
                                                                                                                       //
			// 				if ( sT.isSame(rsT) ) {                                                                                      //
                                                                                                                       //
			// 			 throw new Meteor.Error("meeting room start time is same as pre booked slot", "select another slot or another room");
                                                                                                                       //
			// 			} else if  ( sT.isAfter(rsT) && eT.isBefore(reT) ) {                                                          //
                                                                                                                       //
			// 				throw new Meteor.Error("meeting slot is in between pre booked slot", "select another slot or another room");
                                                                                                                       //
			// 			} else if ( sT.isAfter(rsT) && sT.isBefore(reT) ) {                                                           //
                                                                                                                       //
			// 				throw new Meteor.Error("meeting start time is in between pre booked slot", "select another slot or another room");
			// 			} else if ( eT.isAfter(rsT) && eT.isBefore(reT) ) {                                                           //
                                                                                                                       //
			// 				throw new Meteor.Error("meeting end  time is in between pre booked slot", "select another slot or another room");
			// 			} else if ( sT.isBefore(rsT) && ( eT.isAfter(reT) || eT.isAfter(rsT) ) ) {                                    //
                                                                                                                       //
			// 				throw new Meteor.Error("meeting end time conflict", "select another slot or another room");                  //
			// 			}                                                                                                             //
			// 			});		                                                                                                         //
			// 			try {                                                                                                         //
			// 				console.log("no conflicts");                                                                                 //
			// 				Meetings.insert(meetingObj);                                                                                 //
			// 			} catch (error) {                                                                                             //
			// 				throw new Meteor.Error("meeting-create failed", "failed to insert new meeting");                             //
			// 			}                                                                                                             //
			// 		} else {                                                                                                       //
			// 			console.log("empty room");                                                                                    //
			// 			Meetings.insert(meetingObj);                                                                                  //
			// 		}                                                                                                              //
			// 	}                                                                                                               //
		}                                                                                                                    // 85
                                                                                                                       //
		return editMeeting;                                                                                                  //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"permissions":{"permission.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/permissions/permission.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.methods({                                                                                                       // 1
	//this function returns the role of the user                                                                          //
	getUserRole: function () {                                                                                            // 3
		function getUserRole() {                                                                                             // 3
			try {                                                                                                               // 4
				return Meteor.users.findOne(this.userId).role;                                                                     // 5
			} catch (e) {                                                                                                       //
				return "notExisting";                                                                                              // 7
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return getUserRole;                                                                                                  //
	}(),                                                                                                                  //
                                                                                                                       //
	toggleTabBar: function () {                                                                                           // 11
		function toggleTabBar() {                                                                                            // 11
			if (this.userId) {                                                                                                  // 12
				return true;                                                                                                       // 13
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return toggleTabBar;                                                                                                 //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publishers.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/permissions/publishers.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//Publish SMTP settings to the client                                                                                  //
// If login user is Super Admin                                                                                        //
Meteor.publish('smtpSettings', function () {                                                                           // 3
	if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                                  // 4
		var smtpSettings = ApplicationSettings.findOne().smtpSettings;                                                       // 5
                                                                                                                       //
		if (smtpSettings) return ApplicationSettings.find({}, { fields: { 'smtpSettings': 1 } });else return ApplicationSettings.find({});
	} else {                                                                                                              //
		this.stop();                                                                                                         // 11
		return null;                                                                                                         // 12
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//Publish LDAP settings to the client                                                                                  //
// If login user is Super Admin                                                                                        //
Meteor.publish('ldapSettings', function () {                                                                           // 18
	if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                                  // 19
		var ldapSettings = ApplicationSettings.findOne().ldapSettings;                                                       // 20
		if (ldapSettings) {                                                                                                  // 21
			return ApplicationSettings.find({}, { fields: { 'ldapSettings': 1 } });                                             // 22
		} else {                                                                                                             //
			return ApplicationSettings.find({});                                                                                // 25
		}                                                                                                                    //
	} else {                                                                                                              //
		this.stop();                                                                                                         // 28
		return null;                                                                                                         // 29
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//Publish whitelabel settings to the client if the client is super admin                                               //
Meteor.publish("whitelabelSettings", function () {                                                                     // 34
	if (!this.userId || Meteor.users.findOne(this.userId).role !== "SA") {                                                // 35
		this.stop();                                                                                                         // 36
		throw new Meteor.Error("no-permission", "Cant publish--no rights");                                                  // 37
	} else {                                                                                                              //
		var id;                                                                                                              // 39
                                                                                                                       //
		try {                                                                                                                // 41
			id = ApplicationSettings.findOne().whiteLabelSettings;                                                              // 42
		} catch (error) {                                                                                                    //
			throw new Meteor.Error(error.sanitizedError.Error, error.sanitizedError.message);                                   // 44
			return [];                                                                                                          // 45
		}                                                                                                                    //
                                                                                                                       //
		try {                                                                                                                // 48
			if (id) {                                                                                                           // 49
				return ApplicationSettings.find({}, { fields: { "whiteLabelSettings": 1 } });                                      // 50
			} else {                                                                                                            //
				return null;                                                                                                       // 52
			}                                                                                                                   //
		} catch (error) {                                                                                                    //
			throw new Meteor.Error("publish-fail", "Failed to publish whiteLabelSettings");                                     // 55
		}                                                                                                                    //
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//publish details of the particular user to the super admin minus the password of the user                             //
Meteor.publish("userDetails", function (userId) {                                                                      // 61
	if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                                  // 62
		return Meteor.users.find({ _id: userId }, { fields: { "services.password": 0 } });                                   // 63
	} else {                                                                                                              //
		this.stop();                                                                                                         // 65
		return null;                                                                                                         // 66
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//publish details of all users but only id, profile name and username in the result set(needs super admin rights)      //
Meteor.publish("allUsers", function () {                                                                               // 71
	if (this.userId && Meteor.users.findOne(this.userId).role == "SA") {                                                  // 72
		// if (this.userId	) {	                                                                                              //
		// return Meteor.users.find({}, {fields: {"services.password": 0, role: 0, }});                                      //
		return Meteor.users.find({}, { fields: { "_id": 1, "profile.name": 1, "username": 1 } });                            // 75
	} else {                                                                                                              //
		this.stop();                                                                                                         // 77
		return null;                                                                                                         // 78
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//publish room license of the particular room if the room exists                                                       //
Meteor.publish("roomLicenses", function (roomId) {                                                                     // 83
	if (this.userId && Meteor.users.findOne(this.userId).role == "SA" && RoomLicense.findOne(roomId)) {                   // 84
		console.log('RoomLicense publish');                                                                                  // 85
		return RoomLicense.find({ _id: roomId });                                                                            // 86
	} else {                                                                                                              //
		this.stop();                                                                                                         // 88
		return null;                                                                                                         // 89
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//Publish the role of the user.                                                                                        //
Meteor.publish("currentUser", function () {                                                                            // 94
	if (this.userId) {                                                                                                    // 95
		return Meteor.users.find({ _id: this.userId }, { fields: { "role": 1 } });                                           // 96
	} else {                                                                                                              //
		return [];                                                                                                           // 98
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//publish the meetings in a room.                                                                                      //
// All meetings related to user by room.                                                                               //
Meteor.publish("meetings", function () {                                                                               // 105
	if (!this.userId) {                                                                                                   // 106
		this.stop();                                                                                                         // 107
		return null;                                                                                                         // 108
	} else {                                                                                                              //
		var roomIds = [];                                                                                                    // 110
		var rooms = RoomLicense.find({ 'users.uid': this.userId }, { fields: { "roomPassword": 0, "hostPassword": 0 } });    // 111
		rooms.forEach(function (room) {                                                                                      // 112
			roomIds.push(room._id);                                                                                             // 113
		});                                                                                                                  //
		var meetings = Meetings.find({ meetingRoomId: { $in: roomIds } });                                                   // 115
		return meetings;                                                                                                     // 116
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//publish room license                                                                                                 //
Meteor.publish("MyRooms", function () {                                                                                // 121
	if (!this.userId) {                                                                                                   // 122
		this.stop();                                                                                                         // 123
		return null;                                                                                                         // 124
	} else {                                                                                                              //
		return RoomLicense.find({ 'users.uid': this.userId }, { fields: { "roomPassword": 0, "hostPassword": 0 } });         // 126
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//Publish Room based on RooomLicense                                                                                   //
Meteor.publish("MyRoom", function (roomlicense) {                                                                      // 132
	if (!this.userId) {                                                                                                   // 133
		this.stop();                                                                                                         // 134
		return null;                                                                                                         // 135
	} else {                                                                                                              //
		return RoomLicense.find({ roomLicense: roomlicense }, { fields: { "roomPassword": 0, "hostPassword": 0 } });         // 137
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
// //Publish Room based on _id                                                                                         //
// Meteor.publish("RoomBasedOnRoomId", function(roomId) {                                                              //
// if(!this.userId){                                                                                                   //
// return null;                                                                                                        //
// }else{                                                                                                              //
// return RoomLicense.find({_id: roomId},{fields: {"roomPassword": 0, "hostPassword": 0}});                            //
// }                                                                                                                   //
// });                                                                                                                 //
                                                                                                                       //
//publish all details of the logged in user except role and password                                                   //
Meteor.publish("getCurrentUserWithContacts", function () {                                                             // 151
	if (!this.userId) {                                                                                                   // 152
		this.stop();                                                                                                         // 153
		return null;                                                                                                         // 154
	} else {                                                                                                              //
		return Meteor.users.find({ _id: this.userId }, { fields: { "role": 0, "services": 0 } });                            // 156
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//publish  the profile name and the image of the contact                                                               //
Meteor.publish("Contacts", function () {                                                                               // 161
	if (this.userId) {                                                                                                    // 162
		var contactsList = Meteor.users.findOne({ _id: this.userId })['contacts'];                                           // 163
		if (contactsList) {                                                                                                  // 164
			var contactIds = contactsList.map(function (contactObj) {                                                           // 165
				return contactObj.uid;                                                                                             // 165
			});                                                                                                                 //
			return Meteor.users.find({ _id: { $in: contactIds } }, { fields: { 'profile.name': 1, /*'profile.profileImage': 1,*/'presence': 1 } });
		} else return [];                                                                                                    //
	} else {                                                                                                              //
		this.stop();                                                                                                         // 169
		return null;                                                                                                         // 170
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
//publish messages from a particular date from a particular chat                                                       //
Meteor.publish('Messages', function (chatRoomId, fromDate) {                                                           // 175
	console.log("chatRoomId and fromDate ", chatRoomId, fromDate);                                                        // 176
	if (this.userId && chatRoomId) {                                                                                      // 177
		try {                                                                                                                // 178
			// return Messages.find({chatRoomId: chatRoomId, chatDate: {$gte: fromDate}}, {sort: {chatDate: 1}});               //
			return Messages.find({ chatRoomId: chatRoomId, chatDate: { $gte: fromDate } });                                     // 180
		} catch (e) {                                                                                                        //
			console.log("didn't find chatRoomId ", e);                                                                          // 181
		}                                                                                                                    //
	} else {                                                                                                              //
		this.stop();                                                                                                         // 183
		return null;                                                                                                         // 184
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Meteor.publish("emailSearch", function (query) {                                                                       // 188
	check(query, String);                                                                                                 // 189
	if (_.isEmpty(query)) return this.ready();                                                                            // 190
	//console.log("res:", Meteor.users.find({"emails.address": {$regex: query, $options: "$i"}}).count());                //
	// return Meteor.users.find({"emails.address": {$regex: query, $options: "$i"} });                                    //
                                                                                                                       //
	return Meteor.users.find({ $or: [{ "emails.address": { $regex: query, $options: "$i" } }, { "username": { $regex: query, $options: "$i" } }] });
});                                                                                                                    //
                                                                                                                       //
Meteor.publish('getContactProfileName', function (uid) {                                                               // 198
	return Meteor.users.find({ _id: uid }, { fields: { 'profile.name': 1 } });                                            // 199
});                                                                                                                    //
                                                                                                                       //
Meteor.publish("roomParticipants", function (roomParticipants) {                                                       // 202
	if (!this.userId) {                                                                                                   // 203
		this.stop();                                                                                                         // 204
		return null;                                                                                                         // 205
	}                                                                                                                     //
	check(roomParticipants, Array);                                                                                       // 207
	try {                                                                                                                 // 208
		return Meteor.users.find({ _id: { $in: roomParticipants } }, { fields: { "profile.name": 1, "emails": 1 } });        // 209
	} catch (error) {                                                                                                     //
		this.stop();                                                                                                         // 211
		return null;                                                                                                         // 212
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Meteor.publish("corporateDetail", function (cid) {                                                                     // 216
	if (!this.userId) {                                                                                                   // 217
		this.stop();                                                                                                         // 218
		return null;                                                                                                         // 219
	} else {                                                                                                              //
		return Corporate.find({ _id: cid });                                                                                 // 221
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
/* CR-IVC5-0001844 Contacts publisher for iOS clients - DSS>> */                                                       //
Meteor.publish("iOSContacts", function () {                                                                            // 227
	if (this.userId) {                                                                                                    // 228
		var contactsList = Meteor.users.findOne({ _id: this.userId })['contacts'];                                           // 229
		// console.log(contactsList);                                                                                        //
		if (contactsList) {                                                                                                  // 228
			var contactIds = contactsList.map(function (contactObj) {                                                           // 232
				return contactObj.uid;                                                                                             // 232
			});                                                                                                                 //
			var chatRoomIds = contactsList.map(function (contactObj) {                                                          // 233
				return contactObj.chatRoom;                                                                                        // 233
			});                                                                                                                 //
			//console.log(contactIds);                                                                                          //
			//console.log(chatRoomIds);                                                                                         //
			// console.log(Meteor.users.find({_id: 'BAdjPhuzxh5EnkktT' }));                                                     //
			return Meteor.users.find({ _id: { $in: contactIds } }, //{$in: contactIds} },                                       // 231
			{ fields: {                                                                                                         // 238
					contacts: { $elemMatch: {                                                                                         // 239
							uid: this.userId                                                                                                // 240
						}                                                                                                                //
					},                                                                                                                //
					// }});                                                                                                           //
					'username': 1, 'profile.name': 1, 'presence': 1 } });                                                             // 244
		} else return [];                                                                                                    //
	} else {                                                                                                              //
		this.stop();                                                                                                         // 247
		return null;                                                                                                         // 248
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
/*Messages publisher for iOS clients*/                                                                                 //
Meteor.publish('iOSMessages', function (chatRoomID) {                                                                  // 254
	//console.log("chatRoomId ", chatRoomID);                                                                             //
	if (this.userId && chatRoomID) {                                                                                      // 256
		try {                                                                                                                // 257
			// return Messages.find({chatRoomId: chatRoomId, chatDate: {$gte: fromDate}}, {sort: {chatDate: 1}});               //
			// console.log(Messages.find({chatRoomId: 'gW8WzrtFyfzk7cvJn'},{sort: {chatDate:1}}).fetch());                      //
			return Messages.find({ chatRoomId: chatRoomID }, { sort: { chatDate: -1 } }); //dateForUI: {$gte: new Date(fromDate)}});//, chatDate: {$gte: fromDate}});
		} catch (e) {                                                                                                        // 257
			console.log("didn't find chatRoomId ", e);                                                                          // 261
		}                                                                                                                    //
	} else {                                                                                                              //
		this.stop();                                                                                                         // 263
		return null;                                                                                                         // 264
	}                                                                                                                     //
});                                                                                                                    //
/* CR-IVC5-0001844 - DSS<< */                                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"startup":{"acccounts-configuration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/startup/acccounts-configuration.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
	// This code will disable the Accounts.createUser() from client side.                                                 //
	Accounts.config({                                                                                                     // 3
		forbidClientAccountCreation: true                                                                                    // 4
	});                                                                                                                   //
                                                                                                                       //
	// Stop the user to update his profile from client (browser)                                                          //
	Meteor.users.deny({                                                                                                   // 1
		update: function () {                                                                                                // 9
			function update() {                                                                                                 // 9
				return true;                                                                                                       // 10
			}                                                                                                                   //
                                                                                                                       //
			return update;                                                                                                      //
		}()                                                                                                                  //
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Meteor.methods({                                                                                                       // 15
	updateUserStatusToOffline: function () {                                                                              // 16
		function updateUserStatusToOffline() {                                                                               // 16
			Meteor.users.update({ _id: this.userId }, { $set: { presence: 0 } });                                               // 17
		}                                                                                                                    //
                                                                                                                       //
		return updateUserStatusToOffline;                                                                                    //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Accounts.onLogin(function (info) {                                                                                     // 21
	try {                                                                                                                 // 22
		if (info.type == "ldap") {                                                                                           // 23
			console.log(" ------------------ User Login with LDAP ------------------------ ");                                  // 24
			console.log(info);                                                                                                  // 25
			var userId = info.user._id;                                                                                         // 26
			var profile = { name: info.user.displayName, userType: "ldap", createdBy: "ldap" };                                 // 27
			var emails = [{ address: info.user.username, verified: false }];                                                    // 28
                                                                                                                       //
			var groupName = info.user['memberOf'];                                                                              // 30
			var role = "US";                                                                                                    // 31
			// console.log("groupName  ", groupName);                                                                           //
			// console.log("groupName[0]  ", groupName[0]);                                                                     //
			if (groupName && groupName[0] == "InstaVCAdmin") {                                                                  // 23
				role = "SA";                                                                                                       // 35
			} else {                                                                                                            //
				role = "US";                                                                                                       // 37
			}                                                                                                                   //
                                                                                                                       //
			Meteor.users.update({ _id: userId }, { $set: { "role": role, profile: profile, emails: emails } });                 // 40
		}                                                                                                                    //
                                                                                                                       //
		Meteor.users.update(Meteor.userId(), { $set: { connection_id: info.connection.id, presence: 1 } });                  // 43
	} catch (e) {                                                                                                         //
		console.log(e);                                                                                                      // 45
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Meteor.onConnection(function (connection) {                                                                            // 50
	connection.onClose(function () {                                                                                      // 51
		Meteor.users.update({ connection_id: connection.id }, { $set: { presence: 0 } });                                    // 52
	});                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"application-configuration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/startup/application-configuration.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
	// Configure the LDAP settings if exists in the database.                                                             //
	setLDAP();                                                                                                            // 3
                                                                                                                       //
	// Configure the SMTP settings if exists in the database.                                                             //
	setMAIL_URL();                                                                                                        // 1
                                                                                                                       //
	//Configure the whitelabel settings                                                                                   //
	setDefaultWhiteLabelSettings();                                                                                       // 1
                                                                                                                       //
	// Update MAIL_URL & LDAP_settings if any changes happens to the ApplicationSettings.                                 //
	ApplicationSettings.find().observeChanges({                                                                           // 1
		added: function () {                                                                                                 // 13
			function added() {                                                                                                  // 13
				setMAIL_URL();                                                                                                     // 14
				setLDAP();                                                                                                         // 15
			}                                                                                                                   //
                                                                                                                       //
			return added;                                                                                                       //
		}(),                                                                                                                 //
		changed: function () {                                                                                               // 17
			function changed() {                                                                                                // 17
				setMAIL_URL();                                                                                                     // 18
				setLDAP();                                                                                                         // 19
			}                                                                                                                   //
                                                                                                                       //
			return changed;                                                                                                     //
		}(),                                                                                                                 //
		removed: function () {                                                                                               // 21
			function removed() {                                                                                                // 21
				setMAIL_URL();                                                                                                     // 22
				setLDAP();                                                                                                         // 23
			}                                                                                                                   //
                                                                                                                       //
			return removed;                                                                                                     //
		}()                                                                                                                  //
	});                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"email-configuration.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/startup/email-configuration.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Accounts.emailTemplates.from = "InstaVC Admin<no-reply@instavc.com>"; // the sender of the mail                        // 1
                                                                                                                       //
// subject of the reset password mail                                                                                  //
Accounts.emailTemplates.resetPassword.subject = function (user) {                                                      // 4
  return " Password Reset for InstaVC.com";                                                                            // 5
};                                                                                                                     //
                                                                                                                       //
// body of the email sent to user for resetting password                                                               //
Accounts.emailTemplates.resetPassword.text = function (user, url) {                                                    // 9
  var token = url.substring(url.lastIndexOf('/') + 1, url.length);                                                     // 10
  var newURL = Meteor.absoluteUrl('reset-password/' + token);                                                          // 11
                                                                                                                       //
  return "Hello " + user.profile.name + " Click on the following link to reset your password \n\n" + newURL;           // 13
};                                                                                                                     //
                                                                                                                       //
//body of the welcome email sent to user upon creation of user account                                                 //
Accounts.emailTemplates.enrollAccount.text = function (user, url) {                                                    // 18
  var token = url.substring(url.lastIndexOf('/') + 1, url.length);                                                     // 19
  var newURL = Meteor.absoluteUrl('enroll-account/' + token);                                                          // 20
                                                                                                                       //
  return "Hello " + user.profile.name + "\n\n" + "Please click on the link below to set your password and start using the service\n\n" + newURL;
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"globals.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/startup/globals.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//MCU_URL 	= "https://mcu-ind4.instavc.com/";                                                                          //
                                                                                                                       //
MCU_URL = "https://mcu.instavc.com/";                                                                                  // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"room-observeChanges.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/startup/room-observeChanges.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*observe chnages in rooms collection                                                                                  //
	if rooms are deleted then meetings booked in that room are deleted                                                    //
	if users are kicked out of that room*/                                                                                //
                                                                                                                       //
// var query = RoomLicense.find();                                                                                     //
// var handle = query.observeChanges({                                                                                 //
// 	removed: function (id) {                                                                                           //
// 		console.log("id of the deleted room:", id);                                                                       //
// 		var meetings = Meetings.remove({meetingRoomId: id });                                                             //
// 	}                                                                                                                  //
// });                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"seeds.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/startup/seeds.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
	// Add default admin user to the application.                                                                         //
	var superAdmin = Accounts.findUserByUsername('superadmin@instavc.com');                                               // 3
	if (!superAdmin) {                                                                                                    // 4
		var superAdmin = Accounts.createUser({                                                                               // 5
			username: 'superadmin@instavc.com',                                                                                 // 6
			password: 'Ajarsun123#2015',                                                                                        // 7
			email: 'superadmin@instavc.com',                                                                                    // 8
			profile: {                                                                                                          // 9
				name: 'Insta SuperAdmin'                                                                                           // 10
			}                                                                                                                   //
		});                                                                                                                  //
		Meteor.users.update(superAdmin, { $set: { role: "SA" } });                                                           // 13
	}                                                                                                                     //
                                                                                                                       //
	// Add default guest user to the application                                                                          //
	var guestUser = Accounts.findUserByUsername('guest@instavc.com');                                                     // 1
	if (!guestUser) {                                                                                                     // 18
		var guestUser = Accounts.createUser({                                                                                // 19
			username: 'guest@instavc.com',                                                                                      // 20
			password: 'Ajarsun123',                                                                                             // 21
			email: 'guest@instavc.com',                                                                                         // 22
			profile: {                                                                                                          // 23
				name: 'Insta Guest User'                                                                                           // 24
			}                                                                                                                   //
		});                                                                                                                  //
                                                                                                                       //
		Meteor.users.update(guestUser, { $set: { role: "GU" } });                                                            // 28
	}                                                                                                                     //
                                                                                                                       //
	// Insert Default values into the ApplicationSettings Collection                                                      //
	var applicationSettingsId = ApplicationSettings.findOne();                                                            // 1
	if (applicationSettingsId == undefined) ApplicationSettings.insert({});                                               // 33
});                                                                                                                    //
                                                                                                                       //
// // only for testig purpose--donot deploy this code or push into master                                              //
// Meteor.methods({                                                                                                    //
// 	addUserToApplication: function (email, password, profileName, role) {                                              //
// 		try {                                                                                                             //
// 			for (var i = 5; i<=5; i++) {                                                                                     //
// 				var superAdmin = Accounts.createUser({                                                                          //
// 					username: "madhu"+i+"@kmail.com",                                                                              //
// 					password: "admin123",                                                                                          //
// 					email: "madhu"+i+"@gmail.com",                                                                                 //
// 					profile: {                                                                                                     //
// 						name: "madhu"+i                                                                                               //
// 					}                                                                                                              //
// 				});                                                                                                             //
// 				console.log( " superadmin ", superAdmin);                                                                       //
// 				Meteor.users.update(superAdmin, {$set: {role: "US"}});                                                          //
// 			}                                                                                                                //
// 		} catch (e) { console.log(e);}                                                                                    //
// 	}                                                                                                                  //
// });                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uploads.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/startup/uploads.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 1
  UploadServer.init({                                                                                                  // 2
    directoryType: '',                                                                                                 // 3
    tmpDir: process.env.PWD + '/upload/tmp',                                                                           // 4
    uploadDir: process.env.PWD + '/upload',                                                                            // 5
    acceptFileTypes: /^[^.]+$|\.(?!(html|exe)$)([^.]+$)/,                                                              // 6
    checkCreateDirectories: true, //create the directories for you                                                     // 7
    getFileName: function () {                                                                                         // 8
      function getFileName(fileInfo, formData) {                                                                       // 8
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + formData.sentBy + fileInfo.name;  // 9
      }                                                                                                                //
                                                                                                                       //
      return getFileName;                                                                                              //
    }(),                                                                                                               //
    finished: function () {                                                                                            // 11
      function finished(fileInfo, formFields) {                                                                        // 11
        if (Number(formFields.fileFromGroupChat)) {                                                                    // 12
          fileInfo.fileFromGroupChat = true;                                                                           // 13
        } else {                                                                                                       //
          fileInfo.fileFromGroupChat = false;                                                                          // 15
          var messageDoc = Messages.findOne({ chatRoomId: formFields.chatRoom, chatDate: Number(formFields.UTCDateNumber) });
          var baseUrl = fileInfo.baseUrl;                                                                              // 17
          var messageObj = {                                                                                           // 18
            message: '',                                                                                               // 19
            type: fileInfo.type,                                                                                       // 20
            url: 'upload' + fileInfo.path,                                                                             // 21
            sentBy: formFields.sentBy,                                                                                 // 22
            sentAt: new Date(formFields.sentAt)                                                                        // 23
          };                                                                                                           //
          if (messageDoc) {                                                                                            // 25
            Messages.update({ _id: messageDoc._id }, { $push: { messages: messageObj } });                             // 26
          } else {                                                                                                     //
            Messages.insert({ chatRoomId: formFields.chatRoom, chatDate: Number(formFields.UTCDateNumber), messages: [messageObj] });
          }                                                                                                            //
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      return finished;                                                                                                 //
    }()                                                                                                                //
  });                                                                                                                  //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{"extensions":[".js",".json"]});
require("./lib/aldeed-table-config.js");
require("./lib/collections.js");
require("./lib/logconfig.js");
require("./lib/utils.js");
require("./server/app/contacts/contacts.js");
require("./server/app/messages/messages.js");
require("./server/SIP/asterisk.js");
require("./server/app/app.js");
require("./server/app/guest.js");
require("./server/applicationSettings/ldap-settings.js");
require("./server/applicationSettings/my-account.js");
require("./server/applicationSettings/room-settings.js");
require("./server/applicationSettings/smtp-settings.js");
require("./server/applicationSettings/user-management-settings.js");
require("./server/applicationSettings/whiteLabel-settings.js");
require("./server/collections/application-settings.js");
require("./server/collections/corporate.js");
require("./server/collections/logger.js");
require("./server/collections/meeting-schedule.js");
require("./server/collections/room-license.js");
require("./server/conference/auto-db-mgr.js");
require("./server/conference/conference-manager.js");
require("./server/conference/logger-manage.js");
require("./server/lab/testing.js");
require("./server/manageall/manage-myaccount.js");
require("./server/meetingSchedular/cron-job.js");
require("./server/meetingSchedular/meeting-schedular.js");
require("./server/permissions/permission.js");
require("./server/permissions/publishers.js");
require("./server/startup/acccounts-configuration.js");
require("./server/startup/application-configuration.js");
require("./server/startup/email-configuration.js");
require("./server/startup/globals.js");
require("./server/startup/room-observeChanges.js");
require("./server/startup/seeds.js");
require("./server/startup/uploads.js");
//# sourceMappingURL=app.js.map
