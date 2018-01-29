import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export const SettingsSchema = {
	_id : "Settings",
	formTitle: <FormattedMessage id='smtp_setting' />,
    serverCollection:"Settings",
    schemas : {
      SMTPDetails : {
	          SMTPDetails : [
	            { type : "title", text : <FormattedMessage id='smtp_details' />, icon : "fa fa-caret-right" },
	            { type : "hidden", _id : "_id", text : "", datafield : "uid" },
	            { type : "text", text : <FormattedMessage id='api_key' />, _id : "apikeyId", datafield : "apiKey", required : true, error : "", exp : "", errormsg : "", limit : 30 },
	            { type : "text", text : <FormattedMessage id='domain' />, _id : "domainId", datafield : "domain",required : true, error : "", exp : "", errormsg : "", limit : 100 },
	            { type : "text", text : <FormattedMessage id='username' />, _id : "usernameId", datafield : "username", required : true, error : "", exp : "", errormsg : "", limit : 30 },
	            { type : "password", text : <FormattedMessage id='password' />, _id : "passwordId", datafield : "password", required : true, error : "", exp : "", errormsg : "", limit : 30 },
	            { type : "text", text : <FormattedMessage id='server' />, _id : "serverId", datafield : "server", required : true, error : "", exp : "", errormsg : "", limit : 50 }
	          ],

       },
       col_2 : {

       }	
    }    
};	