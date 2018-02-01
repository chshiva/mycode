import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export const corporateSchema = {
	_id: "Corporate",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id='corporate_directory' />,
	serverCollection : "Corporate",
	schemas : {
		company_details : { //Position Name
			company_fields :[  // Form Groups Name
						{ type : "hidden", _id : "cid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
						{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield:"uid"},
						{ type : "title", text : <FormattedMessage id='company_details' />, icon : "fa fa-caret-right" },
						{ type : "text", _id : "businessId", text : <FormattedMessage id='business_id' />, datafield : "businessId", required : true, error : "", exp : "ALPHANUMERICwithSPACE", limit : 15, errorId:"bissinessIdError"},
						{ type : "text", _id : "businessName", text : <FormattedMessage id='business_name' />, datafield : "businessName", required : true, error : "", exp : "ALPHANUMERICwithSPACE", limit : 50,errorId:"businessNameError"},
						{ type : "phone", _id : "phoneNo", text : <FormattedMessage id='phone' />, datafield : "phoneNo", required : true, error : "", errormsg : "Invalid phone number", limit : 15,errorId:"phoneNoError" },
						{ type : "text", _id : "websiteAddr", text : <FormattedMessage id='website' />, datafield : "websiteAddr", required : false, error : "", exp : "URL", limit : 50,errorId:"websiteError" },
						{ type : "dropdown", _id : "companyStatus", text : <FormattedMessage id='company_status' />, datafield : "companyStatus", data : [["Active", "active"], ["Inactive", 'inactive' ]], value : "Active", required : true, error : "" },
						{ type : "dropdown", _id : "scheduleType", text : <FormattedMessage id='schedule_type' />, datafield : "scheduleType", data : [["Calendar", "calendar"]/*, ["Timeslot", "Calendar"]*/], value : "Calendar", required : true, error : "" }
					],
			contact_fields : [		//Form Groups Name
						{ type : "title", text : <FormattedMessage id='contact_details' />, icon : "fa fa-caret-right" },
						{ type: "text", _id: "cName", text: <FormattedMessage id='name' />, datafield: "contactDetails.name", required: true, error: "", exp: "ALPHAwithSPACE", limit: 30, errorId:"cnameError" },
						{ type : "phone", _id : "cPhoneNo", text: <FormattedMessage id='phone' />, datafield:"contactDetails.phoneNo", required : true, error : "", limit : 15,errorId:"cphoneError" },
						{ type : "email", _id : "cEmail", text: <FormattedMessage id='email' />, datafield:"contactDetails.email", required : true, error : "", exp : "EMAIL", limit : 50,errorId:"cEmailError" }
					],
		},
		col_2 : {
			address_fields : [		//Form Groups Name
						{ type : "title", text : <FormattedMessage id='address' />, icon : "fa fa-caret-right" },
						{ type: "text", _id: "street", text: <FormattedMessage id='street' />, datafield: "address.street", required: true, error: "", limit: 50, caps: true,errorId:"streetError" },
						{ type: "text", _id: "district", text: <FormattedMessage id='district' />, datafield: "address.district", required: true, error: "", exp: "ALPHAwithSPACE", limit: 20, caps: true,errorId:"districtError" },
						{ type: "text", _id: "state", text: <FormattedMessage id='state' />, datafield: "address.state", required: true, error: "", exp: "ALPHAwithSPACE", limit: 20, caps: true,errorId:'stateError'},
						{ type: "text", _id: "country", text: <FormattedMessage id='country' />, datafield: "address.country", required: true, error: "", exp: "ALPHAwithSPACE", limit: 20, caps: true,errorId:'countryError' },
						{ type: "text", _id : "pincode", text: <FormattedMessage id='pincode' />, datafield:"address.pincode", required : true, error : "", exp : "NUMBER", limit : 10 ,errorId:"pincodeError"}
					],
			business_fields : [		//Form Groups Name
						{ type : "title", text : <FormattedMessage id='corporate_type' />, icon : "fa fa-caret-right" },
						{ type : "dropdown", _id : "businessType", text : <FormattedMessage id='business_type' />, datafield : "businessType", data : [["Conference", "conference"], ["LMS", "lms"], /*["CRM", "crm"]*/["Presenter", "presenter"]], value : "Conference", required : true, error : "" }
					],
		},
		legalDocuments_details : {	//Position Name
			/*license_details : [
					{ type : "title", text : <FormattedMessage id='license_details' />, icon : "fa fa-caret-right" },
					{ type : "text", _id : "publishLimit", text : <FormattedMessage id='publish_limit' />, datafield : "licenses.publishLimit", value : "-1", required : false, error : "", exp : "LIMIT" },
					{ type : "text", _id : "roomLimit", text : <FormattedMessage id='room_limit' />, datafield : "licenses.roomLimit", value : "-1", required : false, error : "", exp : "LIMIT" },
					{ type : "text", _id : "noOfP2P", text : <FormattedMessage id='no_p2p' />, datafield : "licenses.noOfP2P", value : "-1", required : false, error : "", exp : "LIMIT" },
					{ type : "text", _id : "subscriberLimit", text : <FormattedMessage id='subscriber_limit' />, datafield : "licenses.subscriberLimit", value : "-1", required : false, error : "", exp : "LIMIT" },
					{ type : "text", _id : "usersLimit", text: <FormattedMessage id='users_limit' />, datafield : "licenses.usersLimit", value : "-1", required : false, error : "", exp : "LIMIT" }
			],*/
			legalDocuments_details : [ //Form Groups
					{ type : "title", text : <FormattedMessage id='legal_doc_details' />, icon : "fa fa-caret-right" },
					{ type : "text", _id : "panNumber", text : <FormattedMessage id='pan_number' />, datafield : "legalDocuments.panNumber", error : "", exp : "ALPHANUMERICwithSPACE", limit : 10 ,errorId:"panError"},
					{ type : "text", _id : "tanID", text : <FormattedMessage id='tan_id' />, datafield : "legalDocuments.tanID", error : "", exp : "ALPHANUMERICwithSPACE",  limit : 20,errorId:"tanError"}
			],
		},
	}
};


export const editCorporateSchema = {
	_id: "Corporate",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id='corporate_directory' />,
	serverCollection : "Corporate",
	schemas : {
		company_details : { //Position Name
			company_fields :[  // Form Groups Name
						{ type : "hidden", _id : "cid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
						{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield:"uid"},
						{ type : "title", text : <FormattedMessage id='company_details' />, icon : "fa fa-caret-right" },
						{ type: "text", _id: "businessId", text: <FormattedMessage id='business_id' />, datafield: "businessId", required: true, error: "", exp: "ALPHANUMERICwithSPACE", limit: 15, errorId: "bissinessIdError"},
						{ type: "text", _id: "businessName", text: <FormattedMessage id='business_name' />, datafield: "businessName", required: true, error: "", exp: "ALPHANUMERICwithSPACE", limit: 50, errorId: "businessNameError"},
						{ type: "phone", _id: "phoneNo", text: <FormattedMessage id='phone' />, datafield: "phoneNo", required: true, error: "", errormsg: "Invalid phone number", limit: 15, errorId: "phoneNoError" },
						{ type: "text", _id: "websiteAddr", text: <FormattedMessage id='website' />, datafield: "websiteAddr", required: false, error: "", exp: "URL", limit: 50, errorId: "websiteError" },
						{ type : "dropdown", _id : "companyStatus", text : <FormattedMessage id='company_status' />, datafield : "companyStatus", data : [["Active", "active"], ["Inactive", 'inactive' ]], value : "Active", required : true, error : "" },
						{ type : "dropdown", _id : "scheduleType", text : <FormattedMessage id='schedule_type' />, datafield : "scheduleType", data : [["Calendar", "calendar"]/*, ["Timeslot", "Calendar"]*/], value : "Calendar", required : true, error : "" }
					],
			contact_fields : [		//Form Groups Name
						{ type : "title", text : <FormattedMessage id='contact_details' />, icon : "fa fa-caret-right" },
						{ type: "text", _id: "cName", text: <FormattedMessage id='name' />, datafield: "contactDetails.name", required: true, error: "", exp: "ALPHAwithSPACE", limit: 30, errorId:"cnameError"},
						{ type: "phone", _id: "cPhoneNo", text: <FormattedMessage id='phone' />, datafield: "contactDetails.phoneNo", required: true, error: "", limit: 15, errorId: "cphoneError" },
						{ type: "email", _id: "cEmail", text: <FormattedMessage id='email' />, datafield: "contactDetails.email", required: true, error: "", exp: "EMAIL", limit: 50, errorId: "cEmailError"  }
					],
		},
		col_2 : {
			address_fields : [		//Form Groups Name
						{ type : "title", text : <FormattedMessage id='address' />, icon : "fa fa-caret-right" },
						{ type: "text", _id: "street", text: <FormattedMessage id='street' />, datafield: "address.street", required: true, error: "", limit: 50, errorId: "streetError" },
						{ type: "text", _id: "district", text: <FormattedMessage id='district' />, datafield: "address.district", required: true, error: "", exp: "ALPHAwithSPACE", limit: 20, errorId: "districtError"  },
						{ type: "text", _id: "state", text: <FormattedMessage id='state' />, datafield: "address.state", required: true, error: "", exp: "ALPHAwithSPACE", limit: 20, errorId: 'stateError'},
						{ type: "text", _id: "country", text: <FormattedMessage id='country' />, datafield: "address.country", required: true, error: "", exp: "ALPHAwithSPACE", limit: 20, errorId: 'countryError' },
						{ type: "text", _id: "pincode", text: <FormattedMessage id='pincode' />, datafield: "address.pincode", required: true, error: "", exp: "NUMBER", limit: 10, errorId: "pincodeError" }
					],
			business_fields : [		//Form Groups Name
						{ type : "title", text : <FormattedMessage id='corporate_type' />, icon : "fa fa-caret-right" },
						{ type : "view", _id : "businessType", text : <FormattedMessage id='business_type'/>, field : "businessType",  idfield : "businessType", datafield : "businessType", value: "" }
					],
		},
		legalDocuments_details : {	//Position Name
			/*license_details : [
					{ type : "title", text : <FormattedMessage id='license_details' />, icon : "fa fa-caret-right" },
					{ type : "text", _id : "publishLimit", text : <FormattedMessage id='publish_limit' />, datafield : "licenses.publishLimit", value : "-1", required : false, error : "", exp : "LIMIT" },
					{ type : "text", _id : "roomLimit", text : <FormattedMessage id='room_limit' />, datafield : "licenses.roomLimit", value : "-1", required : false, error : "", exp : "LIMIT" },
					{ type : "text", _id : "noOfP2P", text : <FormattedMessage id='no_p2p' />, datafield : "licenses.noOfP2P", value : "-1", required : false, error : "", exp : "LIMIT" },
					{ type : "text", _id : "subscriberLimit", text : <FormattedMessage id='subscriber_limit' />, datafield : "licenses.subscriberLimit", value : "-1", required : false, error : "", exp : "LIMIT" },
					{ type : "text", _id : "usersLimit", text: <FormattedMessage id='users_limit' />, datafield : "licenses.usersLimit", value : "-1", required : false, error : "", exp : "LIMIT" }
			],*/
			legalDocuments_details : [ //Form Groups
					{ type : "title", text : <FormattedMessage id='legal_doc_details' />, icon : "fa fa-caret-right" },
					{ type: "text", _id: "panNumber", text: <FormattedMessage id='pan_number' />, datafield: "legalDocuments.panNumber", error: "", exp: "ALPHANUMERICwithSPACE", limit: 10, errorId: "panError" },
					{ type: "text", _id: "tanID", text: <FormattedMessage id='tan_id' />, datafield: "legalDocuments.tanID", error: "", exp: "ALPHANUMERICwithSPACE", limit: 20, errorId: "tanError" }
			],
		},
	}
};



//{ type : "dynamicdropdown", _id : "scheduleType", text : "Schedule Type", datafield : "scheduleType", apicall : "getscheduletypes", condition : {}, value : "", required : true, error : "" }
