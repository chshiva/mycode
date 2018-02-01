import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from  '../../../../roles';

export const participantLocationSchema = {
	_id: "LocationManager",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id ="location"/>,
	serverCollection: "",
	schemas : {
		about_me: { //Position Name
			basic_fields: [		//Form Groups Name
				{ type: "hidden", _id : "_id", text : <FormattedMessage id='hidden' />, datafield : "_id" },
				{ type: "hidden", _id : "uid", text : <FormattedMessage id='hidden' />, datafield : "uid"},
				{ type: "title", text: <FormattedMessage id='location_info' />, icon: "fa fa-caret-right"},
				{ type: "text", _id : "locationName", text : <FormattedMessage id='location_name' />, datafield : "locationName", required : true, exp: "SPACE", error : "", errormsg : "", limit : 30 },
			]
		},
		other_info: {	//Position Name
			other_details: [
				{ type: "textarea", _id : "Description", text: <FormattedMessage id ="description"/>, datafield:"description", required : true, error : "", exp: "SPACE", errormsg : "", limit : 150 },
			]
		},
	}
};

export const participantEditLocationSchema = {
	_id: "LocationManager",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id ="location"/>,
	serverCollection: "Location",
	schemas : {
		about_me: { //Position Name
			basic_fields: [		//Form Groups Name
				{ type : "hidden", _id : "_id", text : <FormattedMessage id='hidden' />, datafield : "_id" },
				{ type: "hidden", _id : "uid", text: <FormattedMessage id='hidden' />, datafield:"uid"},
				{ type: "title", text: <FormattedMessage id='location_info' />, icon: "fa fa-caret-right"},
				{ type: "text", _id : "locationName", text: <FormattedMessage id ="location_name"/>, datafield:"locationName", required : true, error : "", errormsg : "", limit : 30},
			]
		},
		other_info: {	//Position Name
			other_details: [
				{ type: "textarea", _id : "Description", text: <FormattedMessage id ="description"/>, datafield:"description", required : true, error : "", limit : 150},
			]
		},
	}
};