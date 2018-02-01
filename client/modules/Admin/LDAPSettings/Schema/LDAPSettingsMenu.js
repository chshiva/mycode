import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

//Main Menu
export const LDAPSettingsEditMainMenu = {
	menus: [
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"},
			{_id: "btnDelete", text: <FormattedMessage id='delete' />, actionType: "Function", action: null, icon: "fa fa-trash-o"}
		]
}


//SubMenu
export const LDAPSettingsEditSubMenu = {
	menus: [
			{_id: "lnkNewUsers", text: <FormattedMessage id='ldap_info' />, actionType: "Function", action: null, active: "active"},
		]
}

