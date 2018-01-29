import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';

//Main Menu
export const packageNewMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "URL", action: "/admin/package/list", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const packageEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const packageViewMainMenu = {
	menus: [
			{_id: "btnList", text: <FormattedMessage id='list' />, actionType: "URL", action: "/admin/package/list", icon: "fa fa-list"},
			{_id: "btnDelete", text: <FormattedMessage id='delete' />, actionType: "Function", action: null, icon: "fa fa-trash", role: [Roles.Superadmin]},
			{_id: "btnEdit", text: <FormattedMessage id='edit' />, actionType: "Function", action: null, icon: "fa fa-pencil", role: [Roles.Superadmin]},
		]
}

export const packageMainMenu = {
	menus: [
			{_id: "btnNew", text: <FormattedMessage id='new' />, actionType: "Function", action: null, icon: "fa fa-plus", role: [Roles.Superadmin]}
		]
}


//SubMenu
export const packageListSubMenu = {
	menus: [
			{_id: "lnkPackage", text: <FormattedMessage id='all_packages' />, actionType: "Function", action: null, active: "active"},
		]
}

export const packageViewSubMenu = {
	menus: [
			{_id: "lnkPackage", text:  <FormattedMessage id='package_info' />, actionType: "Function", action: null, active: "active"},
		]
}
export const packageNewSubMenu = {
	menus: [
			{_id: "lnkPackage", text: <FormattedMessage id='new_package' />, actionType: "Function", action: null, active: "active"},
		]
}
export const packageEditSubMenu = {
	menus: [
			{_id: "lnkPackage", text: <FormattedMessage id='edit_package' />, actionType: "Function", action: null, active: "active"},
		]
}
