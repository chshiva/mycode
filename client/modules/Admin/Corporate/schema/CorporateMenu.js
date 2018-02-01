import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

//Main Menu
export const corporateNewMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "URL", action: "/admin/corporate/list", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const corporateEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const corporateViewMainMenu = {
	menus: [
			{_id: "btnList", text: <FormattedMessage id='list' />, actionType: "URL", action: "/admin/corporate/list", icon: "fa fa-list"},
			{_id: "btnDelete", text: <FormattedMessage id='delete' />, actionType: "Function", action: null, icon: "fa fa-trash"},
			{_id: "btnEdit", text: <FormattedMessage id='edit' />, actionType: "Function", action: null, icon: "fa fa-pencil"},
		]
}

export const corporateMainMenu = {
	menus: [
			//{_id: "btnNew", text: "New", actionType: "URL", action: "/admin/corporate/new", icon: "fa fa-plus"},
			{_id: "btnNew", text: <FormattedMessage id='new' />, actionType: "Function", action: null, icon: "fa fa-plus"}
		]
}


//SubMenu
export const corporateNewSubMenu = {
	menus: [
			{_id: "lnkCorporate", text: <FormattedMessage id='new_corporate' />, actionType: "Function", action: null, active: "active"},
		]
}

export const corporateViewSubMenu = {
	menus: [
			{_id: "lnkCorporate", text: <FormattedMessage id='all_corporates' />, actionType: "Function", action: null, active: "active"},
		]
}
export const corporateinfoSubMenu = {
	menus: [
			{_id: "lnkCorporate", text: <FormattedMessage id='corporate_info' />, actionType: "Function", action: null, active: "active"},
		]
}
export const corporateEditSubMenu = {
	menus: [
			{_id: "lnkCorporate", text: <FormattedMessage id='edit_corporate' />, actionType: "Function", action: null, active: "active"},
		]
}
