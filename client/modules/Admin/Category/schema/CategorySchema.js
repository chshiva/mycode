import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from  '../../../../roles';

export const categorySchema = {
	_id: "NewCategory",
	formIcon: "fa fa-user",
	formTitle: <FormattedMessage id='category_management' />,
	serverCollection: "",
	schemas : {
		category_details: { //Position Name
			category_fields:[  // Form Groups Name
				{ type: "hidden", _id : "_id", text : <FormattedMessage id='hidden' />, datafield : "_id" },
				{ type: "hidden", _id : "uid", text : <FormattedMessage id='hidden' />, datafield : "uid"},
				{ type: "title", text : <FormattedMessage id='category_details' />, icon : "fa fa-caret-right" },
				{ type : "dynamicdropdown", _id : "corporateid", text : <FormattedMessage id ="corporate_name"/>, idfield : "corporateId", datafield : "corporateId", apicall : "corporate-ids", value : "", required : true, error : "", role : [Roles.Superadmin] },
				{ type: "text", _id : "categoryName", text : <FormattedMessage id='category_name' />, datafield : "categoryName", required : true, exp: "SPACE", error : "", errormsg : "", limit : 50 }, 
				{ type: "textarea", _id : "categoryDesc", text : <FormattedMessage id='category_desc' />, datafield : "categoryDesc", required : true, error : "", exp: "SPACE", errormsg : "", limit : 150 },
			],

		},
	}
};


