import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';
//Main Menu
export const categoryEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "URL", action: "/admin/category/list", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}


export const categoryViewMainMenu = {
	menus: [
			{_id: "btnList", text: <FormattedMessage id='list' />, actionType: "URL", action: "/admin/category/list", icon: "fa fa-list"},
			{_id: "btnEdit", text: <FormattedMessage id='edit' />, actionType: "Function", action: null, icon: "fa fa-pencil", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
			{_id: "btnDelete", text: <FormattedMessage id='delete' />, actionType: "Function", action: null, icon: "fa fa-trash", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]}
			
	   	]
}
export const categoryListMainMenu = {
	menus: [
			{_id: "btnNew", text: <FormattedMessage id='new_category' />, actionType: "Function", action : null, icon: "fa fa-user", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},

		]
}

//SubMenu
export const categoryEditSubMenu = {
	menus: [
			{_id: "lnkNewCategory", text: <FormattedMessage id='new_category' />, actionType: "URL", action: "/admin/category/new", active: "active"},
		]
}

export const categoryViewToEditSubMenu = {
	menus: [
			{_id: "editNewCategory", text: <FormattedMessage id = "edit_category"/>, actionType: "Function", action: null, active: "active"},
		]
}
export const categoryViewToEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}
export const categoryListSubMenu = {
	menus: [
			{_id: "lnkCategory", text: <FormattedMessage id='all_categories' />, actionType: "URL", action: "/admin/category/list", active: "active"},
		]
}

export const categoryViewSubMenu = {
	menus: [
			{_id: "lnkCategory", text: <FormattedMessage id='category_info' />, actionType: "Function", action: null, active: "active"},
		]
}