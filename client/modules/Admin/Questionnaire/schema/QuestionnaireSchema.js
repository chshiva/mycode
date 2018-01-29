import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from  '../../../../roles';
export const questionnaireSchema = {
	_id: "AddQuestionnaire",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id ="questionnaire"/>,
	serverCollection: "",
	schemas : {
		about_me: { //Position Name
			basic_fields: [		//Form Groups Name
				{ type : "hidden", _id : "cid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
				{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield:"uid"},
				{ type: "title", text: <FormattedMessage id='questionnaire_details' />, icon: "fa fa-caret-right"},
				{ type: "text", _id : "questionnaireName", text: <FormattedMessage id ="questionnaire_name"/>, datafield:"questionnaireName", required : true, error : "", errormsg : "", errorId:"questionnaireNameError",  limit : 50},
			]
		},
		other_info: {	//Position Name
			other_details: [
				{ type: "textarea", errorId:"questionnaireDescError", _id : "Description", text: <FormattedMessage id ="description"/>, datafield:"description", required : true, error : "", errormsg : "", limit : 150},
			]
		},
	}
};


export const editQuestionnaireSchema = {
	_id: "EditQuestionnaire",
	formIcon: "fa fa-key",
	formTitle: <FormattedMessage id ="questionnaire"/>,
	serverCollection: "",
	schemas : {
		about_me: { //Position Name
			basic_fields: [		//Form Groups Name
				{ type : "hidden", _id : "cid", text : <FormattedMessage id='hidden' />, datafield : "_id" },
				{ type: "hidden", _id : "_id", text: <FormattedMessage id='hidden' />, datafield:"uid"},
				{ type: "title", text: <FormattedMessage id='questionnaire_details' />, icon: "fa fa-caret-right"},
				{ type: "text",  errorId: "questionnaireNameError", _id : "questionnaireName", text: <FormattedMessage id ="questionnaire_name"/>, datafield:"questionnaireName", required : true, error : "", errormsg : "", limit : 50},
			]
		},
		other_info: {	//Position Name
			other_details: [
				{ type: "textarea", errorId: "questionnaireDescError", _id : "Description", text: <FormattedMessage id ="description"/>, datafield:"description", required : true, error : "", errormsg : "", limit : 150},
			]
		},
	}
};