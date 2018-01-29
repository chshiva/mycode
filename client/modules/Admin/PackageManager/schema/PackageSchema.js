import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export const packageSchema = {
	_id: "PackageManager",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id='package_management' />,
	serverCollection: "Package",
	schemas : {
		about_me: { //Position Name
			basic_fields: [		//Form Groups Name
						{ type : "hidden", _id : "pid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
						{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield:"uid"},
						{ type: "title", text: <FormattedMessage id='package_info' />, icon: "fa fa-caret-right"},
						{ type: "text", _id : "packageName", text: <FormattedMessage id='package_name' />, datafield:"packageName", required : true, error : "", exp : "ALPHANUMERICwithSPACE", errormsg : "", limit : 50,errorId:"packageNameError"},
						
						/* commented because of no functionality, need to implement */
						// { type: "text", _id : "packagePrice", text: <FormattedMessage id='package_price' />, datafield:"packagePrice", required : true, error : "", exp : "NUMBER", errormsg : "", limit : 10},
						{ type: "date", _id : "packageValidity", text: <FormattedMessage id='package_validity' />, datafield:"packageValidity", required : true, error : "", exp : "", errormsg : "",errorId:"packageValidityError"},
						{ type: "text", _id : "userCount", text: <FormattedMessage id='user_count' />, datafield:"userCount", required : true, error : "", exp : "LIMIT", errormsg : "", limit : 6,errorId:"userCountError"},
						{ type: "text", _id : "noOfRooms", text: <FormattedMessage id='no_of_rooms' />, datafield:"roomCount", required : true, error : "", exp : "LIMIT", errormsg : "", limit : 6,errorId:"noOfRoomsError"},
						
						/* commented because of no functionality, need to implement */
						// { type: "text", _id : "noOfTopics", text: <FormattedMessage id='no_of_topics' />, datafield:"topicCount", required : true, error : "", exp : "LIMIT", errormsg : "", limit : 6},
						{ type: "text", _id : "continuousPresence", text: <FormattedMessage id='continuous_presence' />, datafield:"continuousPresence", required : true, error : "", exp : "LIMIT", errormsg : "", limit : 6,errorId:"continuousPresenceError"},
						{ type: "dynamicdropdown", _id : "serverLocation", text: <FormattedMessage id='server_location' />, idfield:"serverLocation", datafield:"serverLocation", apicall : "server-list", value: "", required : true, error : "", errormsg : "",errorId:"serverLocationError"},
						{ type : "search", _id : "assignedTo", text : <FormattedMessage id='assigned_to' />, datafield : "assignedTo", value : "", required : true, error : "",errorId:"assignedToError" },
					]
		},
		about_features: { //Position Name
			feature_fields: [		//Form Groups Name
						{ type: "title", text: <FormattedMessage id='feature_info' />, icon: "fa fa-caret-right"},

						/* commented because of no functionality, need to implement */
						{ type: "checkbox", _id : "features", text: <FormattedMessage id='features' />, datafield:"features", required : true, error : "", errormsg : "",errorId:"featuresError", data:[['User Presence', 'user_presence'],['Whiteboard', 'whiteboard'],['Screen Share', 'screen_share'],['Q&A', 'hand_raise'],['Video Conference', 'video_conference'], ['Topics', 'room_topic']/*, ['Server Recording', 'server_recording'], ['TelePresence', 'telepresence']*/] },
					]
		},
	}
};