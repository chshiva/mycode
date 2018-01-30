import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export const userSchema = {
	_id: "NewUser",
	formIcon: "fa fa-user",
	formTitle: <FormattedMessage id='manage_user' />,
	serverCollection: "",
	schemas : {
		user_details: { //Position Name
			personal:[  // Form Groups Name
						{ type: "hidden", _id : "_id", text : <FormattedMessage id='hidden' />, datafield : "_id" },
						{ type: "hidden", _id : "uid", text : <FormattedMessage id='hidden' />, datafield : "uid"},
						{ type: "title", text : <FormattedMessage id='user_info' />, icon : "fa fa-caret-right" },
						{ type: "text", _id : "firstName", text : <FormattedMessage id='first_name' />, datafield : "firstname", required : true, error : "", exp : "ALPHAwithSPACE", errormsg : "", limit : 30, caps: true,errorId:"fNameError" },
						{ type: "text", _id: "lastName", text: <FormattedMessage id='last_name' />, datafield: "lastname", error: "", exp: "ALPHAwithSPACE", errormsg: "", limit: 30, caps: true,errorId:"sNameError"},
						{ type: "email", _id : "emailId", text : <FormattedMessage id='email' />, datafield : "email", required : true, error : "", exp : "EMAIL", errormsg : "", limit: 50,errorId:"emailError" },
						{ type: "radio", _id : "gender", text : <FormattedMessage id='gender' />, datafield : "profile.gender", data : [["Male", "Male"],["Female", "Female"]], error : "", errormsg : "",errorId:"genderError"}
					],
			credential: [		//Form Groups Name
						{ type: "title", text : <FormattedMessage id='credential_access' />, icon : "fa fa-caret-right" },
						{ type: "password", _id : "password", text : <FormattedMessage id='password' />, datafield : "password", required : true, error : "", limit : 15 ,errorId:"passwordError"},						
						//{ type: "dropdown", _id : "role", text : "Role", datafield : "role", value : 5, data : [[1, "Super Admin"], [2, "Admin"], [3, "Moderator"], [4, "Presenter"], [5, "User"], [6, "Guest"]] }
					],
		},
		other_details: {	//Position Name
			company_info: [
					{ type: "title", text : <FormattedMessage id='company_details' />, icon : "fa fa-caret-right" },
					{ type : "dropdown", _id : "companyid", text : <FormattedMessage id ="company_code"/>, datafield : "profile.companyid", data : [['', 'Select Company']], datafrom : 'server',/* apicall : "getcompanyids",*/ value : "", required : true, error : "",errorId:"companyidError" },
					{ type : "dropdown", _id : "role", text : <FormattedMessage id='role' />, datafield : "role", data : [['', 'Select Role']], datafrom : 'server', required : true, error : "", errormsg : "",errorId:"roleError" },
					{ type : "phone", _id : "phone", text : <FormattedMessage id='phone' />, datafield : "profile.phone", error : "", errormsg : "", limit : 15,errorId:"phoneError" },
					{ type: "text", _id: "position", text: <FormattedMessage id='position' />, datafield: "profile.position", error: "", limit: 30, caps: true,errorId:"positionError" },
					{ type: "text", _id: "department", text: <FormattedMessage id='department' />, datafield: "profile.dept", error: "", limit: 30, caps: true,errorId:"deptError"}
			],
			/* commented because of no functionality, need to implement */
			/*default_room:[ //Form Groups
					{ type: "title", text : <FormattedMessage id='default_room' />, icon : "fa fa-caret-right" },
					{ type: "dropdown", _id : "room", text : <FormattedMessage id ="default_room"/>, datafield : "roomid", data : [['', 'Select Room']], datafrom : 'server', value : '', error : "" }
			],*/
		},
	}
};

// for viewing-----
export const viewUserSchema = {
	_id: "NewUser",
	formIcon: "fa fa-user",
	formTitle: <FormattedMessage id='manage_user' />,
	serverCollection: "",
	schemas : {
		user_details: { //Position Name
			personal:[  // Form Groups Name
						{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield: "_id" },
						{ type: "hidden", _id : "uid", text: <FormattedMessage id='hidden' />, datafield: "uid" },
						{ type: "title", text: <FormattedMessage id='user_info' />, icon: "fa fa-caret-right" },
						{ type: "text", _id: "firstName", text: <FormattedMessage id='first_name' />, datafield: "firstname", required: true, error: "", exp: "ALPHAwithSPACE", errormsg: "", limit: 30, caps: true,errorId:"fNameError"},
						{ type: "text", _id: "lastName", text: <FormattedMessage id='last_name' />, datafield: "lastname", error: "", exp: "ALPHAwithSPACE", errormsg: "", limit: 30, caps: true,errorId:"sNameError" },
						{ type: "email", _id : "emailId", text: <FormattedMessage id='email' />, datafield: "email", required: true, error : "", exp : "EMAIL", errormsg : "", limit: 50,errorId:"emailError" },
						{ type: "radio", _id : "gender", text : <FormattedMessage id='gender' />, datafield : "profile.gender", data : [["Male", "Male"],["Female", "Female"]], error : "", errormsg : "",errorId:"genderError"}
					],
			credential: [		//Form Groups Name
						{ type: "title", text: <FormattedMessage id='credential_access' />,  icon: "fa fa-caret-right"},
						{ type: "dropdown", _id : "role", text: <FormattedMessage id='role' />, datafield: "role", value:'', data : [['', 'Select Role']], datafrom : 'server', required : true, error : "",errorId:"roleError" },
					],
		},
		other_details: {	//Position Name
			company_info: [
					{ type: "title", text: <FormattedMessage id = 'company_details'/>, icon: "fa fa-caret-right"},
					// { type : "view", _id : "companyid", text : <FormattedMessage id ="company_code"/>, field : "profile.companyid", idfield : "profile.companyid._id", datafield : "profile.companyid.businessId",  value : "" },
					{ type: "phone", _id : "phone", text: <FormattedMessage id = 'phone'/>, datafield: "profile.phone", error : "", errormsg : "",errorId:"phoneError" },
					{ type: "text", _id: "position", text: <FormattedMessage id='position' />, datafield: "profile.position", error: "", limit: 30, caps: true,errorId:"positionError" },
					{ type: "text", _id: "department", text: <FormattedMessage id='department' />, datafield: "profile.dept", error: "", limit: 30, caps: true,errorId:"deptError"},
			],

			/* commented because of no functionality, need to implement */
			/*default_room:[ //Form Groups
					{ type: "title", text: <FormattedMessage id = 'default_room'/>, icon: "fa fa-caret-right"},
					{ type: "dropdown", _id : "room", text: <FormattedMessage id ="default_room"/>, datafield:"profile.roomid", data: [['', 'Select Room']], value : '', error : "" },
			],*/
		},
	}
};
