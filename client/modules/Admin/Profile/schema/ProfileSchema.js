import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
export const profileSchema = {
	_id : "MyProfile",
	formIcon : "fa fa-key",
	formTitle : <FormattedMessage id='my_account' />,
	serverCollection : "Corporate",
	schemas : {
				
		about_me : { //Position Name
			about_fields : [  // Form Groups Name
						{ type : "hidden", _id : "uid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
						{ type : "title", text : <FormattedMessage id='about_me' />, icon : "fa fa-caret-right" },
						{ type : "textarea", _id : "aboutMe", text : <FormattedMessage id='summary' />, datafield : "profile.aboutme", required : false, limit : 150 },
					],
			personal_fields : [		//Form Groups Name
						{ type : "title", text : <FormattedMessage id='personal_info' />, icon : "fa fa-caret-right" },
						{ type: "text", _id: "firstName", text: <FormattedMessage id='first_name' />, datafield: "firstname", error: "", exp: "ALPHAwithSPACE", required: true, limit: 30, caps: true },
						{ type: "text", _id: "lastName", text: <FormattedMessage id='last_name' />, datafield: "lastname", error: "", exp: "ALPHAwithSPACE", limit: 30, caps: true},
					],
		},
		personal_info : {	//Position Name
			contact_details : [
					{ type : "title", text : <FormattedMessage id='contact_details' />, icon : "fa fa-caret-right" },
					{ type : "email", _id : "emailId", text : <FormattedMessage id='email' />, datafield : "email", error : "", exp : "EMAIL", errormsg : "", required : true, limit : 50  },
					{ type : "phone", _id : "phone", text : <FormattedMessage id='phone' />, datafield : "profile.phone", error : "", errormsg : "", exp : "" },
					{ type : "dropdown", _id : "gender", text : <FormattedMessage id='gender' />, datafield : "profile.gender", data : [["Male", "male"], ["Female","female"]], value : "Male" },
			],
			company_details : [ //Form Groups
					{ type : "title", text : <FormattedMessage id='company_details' />, icon : "fa fa-caret-right" },
					{ type: "text", _id: "position", text: <FormattedMessage id='position' />, datafield: "profile.position", error: "", exp: "", errormsg: "", limit: 30, caps: true},
					{ type: "text", _id: "department", text: <FormattedMessage id='department' />, datafield: "profile.dept", error: "", exp: "ALPHAwithSPACE", errormsg: "", limit: 30, caps: true },
			],
		},
	}
};

/*Commented the date format, currency format, time format as per disuccsion with pradeep and prudhvi
Responsible : Prateek*/ 
export const LocaleSchema = {
	_id : "Locale",
	formTitle:<FormattedMessage id='my_account' />,
    serverCollection:<FormattedMessage id='local_settings' />,
    schemas : {
      LocaleSettings : {
	          LocaleSettings : [
	            { type : "title", text :<FormattedMessage id='local_settings' />, icon : "fa fa-caret-right" },
	            { type : "hidden", _id : "uid",  text : <FormattedMessage id='hidden' />, datafield : "_id" },
	            // { type : "dropdown", text : <FormattedMessage id='time_zone' />, _id : "timezoneId", datafield : "timezone", data : [["Automatic", "automatic"], ["Set", "set"]], value : "Automatic" },
	            /*{ type : "dropdown", text : <FormattedMessage id='date_format' />, _id : "dateformatId", datafield : "dateformat", data : [["DD/MM/YY", "dd_mm_yy"],["DD-MM-YYYY", "ddmmyyyy"],["DD/MM/YYYY", "dd_mm_yyyy"]], value : "DD/MM/YY" },
	            { type : "dropdown", text : <FormattedMessage id='time_format' />, _id : "timeformatId", datafield : "timeformat", data : [["HH:MM:SS", "hh_mm_ss"]], value : "HH:MM:SS" },
	             { type : "dropdown", text : <FormattedMessage id='currency_format' />, _id : "currencyformatId", datafield : "currencyformat", data : [["Indian Rupee", "indian_rupee"], ["USD", "usd"]], value : "Indian Rupee" },*/
	             { type : "dropdown", text : <FormattedMessage id='prefered_language' />, _id : "preferedlanguageId", datafield : "preferedlanguage", data : [["", "select_language"],["en", "english"],["hi", "hindi"]], value : "en" },
	          ],

       },
       col_2 : {

       }
  	
    }    
};
