import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from  '../../../../roles';
export const roomSchema = {
	_id: "RoomManager",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id ="room_management"/>,
	serverCollection: "Room",
	schemas : {
		about_me: { //Position Name
			basic_fields: [		//Form Groups Name
					{ type : "hidden", _id : "cid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
					{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield:"uid"},
					{ type: "title", text: <FormattedMessage id='basic_info' />, icon: "fa fa-caret-right"},
					{ type : "dynamicdropdown", _id : "selPackage", text : <FormattedMessage id ="select_package"/>, idfield:"selPackage._id", datafield : "selPackage", apicall : "package-ids", value : " ", required : true, error : "", errorId:"packageError" },
					// { type: "text", _id : "selPackage", text: "Select Package", datafield:"selPackage", required : true},
					{ type: "text", _id : "roomName", text: <FormattedMessage id ="room_name"/>, datafield:"roomName", required : true, error : "", exp : "ALPHANUMERICwithSPACE", errormsg : "", limit : 30,errorId:"roomNameError"},
					{ type: "dropdown", _id : "roomType", text: <FormattedMessage id ="room_type"/>, datafield:"roomType", data: [["Forward", "forward"], ["Mix", "mix"], ["Hybrid", "hybrid"]], value: "Forward", required : true,errorId:"roomTypeError"},
					// { type: "text", _id : "roomLicense", text: "Room License", datafield:"roomLicense", required : true, error : "", exp : "ALPHANUMERIC", errormsg : ""},
					
					/* commented because of no functionality, need to implement */
					// { type: "text", _id : "roomPassword", text: <FormattedMessage id ="room_password"/>, datafield:"roomPassword", error : "", exp : "", errormsg : "", limit : 15},
					// { type: "text", _id : "roomValidity", text: "Room Validity", datafield:"roomValidity", error : "", exp : "", errormsg : ""},
				]
		},
		other_info: {	//Position Name
			other_details: [
					{ type: "title", text: <FormattedMessage id ="other_details"/>, icon: "fa fa-caret-right"},
					
					/* commented because of no functionality, need to implement */
					// { type : "dynamicdropdown", _id : "categoryId", text : <FormattedMessage id ="category_name"/>, idfield : "categoryId._id", datafield : "categoryId", apicall : "categoryids", value : "",error : "", role : [Roles.Admin, Roles.Lmsadmin, Roles.CRMadmin, Roles.Presenteradmin] },
					{ type: "password", _id : "hostPassword", text: <FormattedMessage id ="host_password"/>, datafield:"hostPassword", required : true, error : "", exp : "", errormsg : "", limit : 15,errorId:"hostPasswordError"},
					{ type: "date", _id : "expiryDate", text: <FormattedMessage id='expiry_Date' />, datafield:"expiryDate",  required : true, error : "", exp : "", errormsg : "",errorId:"expiryDateError"},
					// { type: "text", _id : "mcuServer", text: "MCU Server", datafield:"mcuServer", error : "", exp : "", errormsg : ""},
					// { type: "text", _id : "bridgeNumber", text: <FormattedMessage id ="bridge_number"/>, datafield:"bridgeNumber", error : "", exp : "", errormsg : ""},
			]
		},
	}
};


export const editRoomSchema = {
	_id: "RoomManager",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id ="room_management"/>,
	serverCollection: "Room",
	schemas : {
		about_me: { //Position Name
			basic_fields: [		//Form Groups Name
					{ type : "hidden", _id : "cid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
					{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield:"uid"},
					{ type: "title", text: <FormattedMessage id='basic_info' />, icon: "fa fa-caret-right"},
					{ type: "view", _id: "selPackage", text: <FormattedMessage id="select_package" />, field: "selPackage", idfield: "selPackage._id", datafield: "selPackage.packageName", value: "", role: [Roles.Superadmin, Roles.Admin, Roles.Lmsadmin, Roles.CRMadmin, Roles.Presenteradmin] },
					// { type : "dynamicdropdown", _id : "selPackage", text : <FormattedMessage id ="select_package"/>, idfield : "selPackage._id", datafield : "selPackage", apicall : "package-ids", value : "", required : true, error : "", role : [Roles.Admin, Roles.Lmsadmin, Roles.CRMadmin, Roles.Presenteradmin] },
					// { type: "text", _id : "selPackage", text: "Select Package", datafield:"selPackage", required : true},
					{ type: "text", _id : "roomName", text: <FormattedMessage id ="room_name"/>, datafield:"roomName", required : true, error : "", exp : "ALPHANUMERICwithSPACE", errormsg : "", limit : 30,errorId:"roomNameError"},
					{ type: "dropdown", _id : "roomType", text: <FormattedMessage id ="room_type"/>, datafield:"roomType", data: [["Forward", "forward"], ["Mix","mix"], ["Hybrid", "hybrid"]], value: "Forward", required : true,errorId:"roomTypeError"},
					// { type: "text", _id : "roomLicense", text: "Room License", datafield:"roomLicense", required : true, error : "", exp : "ALPHANUMERIC", errormsg : ""},
					
					/* commented because of no functionality need to implement */
					// { type: "text", _id : "roomPassword", text: <FormattedMessage id ="room_password"/>, datafield:"roomPassword", error : "", exp : "", errormsg : "", limit : 15},
					// { type: "text", _id : "roomValidity", text: "Room Validity", datafield:"roomValidity", error : "", exp : "", errormsg : ""},
				]
		},
		other_info: {	//Position Name
			other_details: [
					{ type: "title", text: <FormattedMessage id ="other_details"/>, icon: "fa fa-caret-right"},
					{ type : "view", _id : "corporateId", text : <FormattedMessage id ="corporate_name"/>, field : "corporateId", idfield : "corporateId._id", datafield : "corporateId.businessName", role : [Roles.Superadmin] },
					
					/* commented because of no functionality need to implement */
					// { type : "view", _id : "categoryId", text : <FormattedMessage id ="category_name"/>, field : "categoryId", idfield : "categoryId._id", datafield : "categoryId.categoryName", role : [Roles.Superadmin] },
					// { type : "dynamicdropdown", _id : "categoryId", text : <FormattedMessage id ="category_name"/>, idfield : "categoryId._id", datafield : "categoryId", apicall : "categoryids", value : "",error : "", role : [Roles.Admin, Roles.Lmsadmin, Roles.CRMadmin, Roles.Presenteradmin] },
					{ type: "password", _id : "hostPassword", text: <FormattedMessage id ="host_password"/>, datafield:"hostPassword", required : true, error : "", exp : "", errormsg : "", limit : 15,errorId:"hostPasswordError"},
					{ type: "date", _id : "expiryDate", text: <FormattedMessage id='expiry_Date' />, datafield:"expiryDate",  required : true, error : "", exp : "", errormsg : "",errorId:"expiryDateError"},
					// { type: "text", _id : "mcuServer", text: "MCU Server", datafield:"mcuServer", error : "", exp : "", errormsg : ""},
					// { type: "text", _id : "bridgeNumber", text: <FormattedMessage id ="bridge_number"/>, datafield:"bridgeNumber", error : "", exp : "", errormsg : ""},
			]
		},
	}
};

export const roomTopicSchema = {
	_id: "RoomTopicManager",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id ="room_management"/>,
	serverCollection: "Topic",
	schemas : {
		about_me: { //Position Name
			basic_fields: [		//Form Groups Name
				{ type : "hidden", _id : "cid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
				{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield:"uid"},
				{ type: "hidden", _id : "rid", text: <FormattedMessage id='hidden' />, datafield:"roomId"},
				{ type: "title", text: <FormattedMessage id='topic_details' />, icon: "fa fa-caret-right"},
				{ type: "text", _id : "topicName", text: <FormattedMessage id ="topic_name"/>, datafield:"topicName", required : true, error : "", errormsg : "", limit : 60,errorId:"topicNameError"},
			]
		},
		other_info: {	//Position Name
			other_details: [
				{ type: "textarea", _id : "Description", text: <FormattedMessage id ="description"/>, datafield:"description", required : true, error : "", limit : 250,errorId:"descriptionError"},
			]
		},
	}
};