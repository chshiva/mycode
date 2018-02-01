import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export const LDAPSettingsSchema = {
	_id : "LDAPSettings",
	formTitle: <FormattedMessage id='ldap_settings' />,
    serverCollection:"Settings",
    schemas : {
      LDAPDetails : {
	          LDAPDetails : [
	            { type : "title", text : <FormattedMessage id='ldap_details' />, icon : "fa fa-caret-right" },
	            { type : "hidden", _id : "_id", text : <FormattedMessage id='hidden' />,  datafield :"uid" },
	            { type : "text", text :  <FormattedMessage id='domain' />, _id : "domainId", datafield : "domain", required : true, error : "", exp : "", errormsg : "", limit : 60 },
	            { type : "text", text :  <FormattedMessage id='base_dn'/>, _id : "baseDnId", datafield : "baseDn", required : true, error : "", exp : "", errormsg : "", limit : 40 },
	            { type : "text", text : <FormattedMessage id='url'/>, _id : "urlId", datafield : "url", required : true, error : "", exp : "", errormsg : "", limit: 60 },
	            { type : "text", text : <FormattedMessage id='bind_cn'/>, _id : "bindCnId", datafield : "bindCn", required : true, error : "", exp : "", errormsg : "", limit : 30 },
	            // { type : "dropdown", _id : "bindPasswordID", text : <FormattedMessage id='bind_password'/>, datafield : "bindPassword", data : [["true", "true"], ["false","false"]], value : "true" },
	            { type : "text", _id : "bindPasswordID", text : <FormattedMessage id='bind_password'/>, datafield : "bindPassword", required : true, error : "", exp : "", errormsg : "", limit : 30},
	            { type : "dropdown", text : <FormattedMessage id='force_login'/>, _id : "forceLoginId", datafield : "forceLogin", data : [["true", "true"], ["false", "false"]], value : "false" }
	          ],
       },
       col_2 : {

       }	
    }    
};	