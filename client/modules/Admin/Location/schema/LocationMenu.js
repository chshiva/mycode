import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';
//Main Menu

export const locationNewMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id ="cancel"/>, actionType: "URL", action:"/admin/location/list/", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id ="save"/>, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const locationListMainMenu = {
	menus: [
		{_id: "btnNew", text: <FormattedMessage id='new' />, actionType: "Function", action : null, icon: "fa fa-plus"},
	]
}

export const locationViewMainMenu = {
	menus: [
			{_id: "btnList", text: <FormattedMessage id ="list"/>, actionType: "URL", action: "/admin/location/list", icon: "fa fa-list"},
			{_id: "btnDelete", text: <FormattedMessage id ="delete"/>, actionType: "Function", action: null, icon: "fa fa-trash", role: [Roles.Superadmin,Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
			{_id: "btnEdit", text: <FormattedMessage id ="edit"/>, actionType: "Function", action: null, icon: "fa fa-pencil", role: [Roles.Superadmin, Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
		]
}

export const locationEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id ="cancel"/>, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id ="save"/>, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}
//Sub Menu

export const locationNewSubMenu = {
	menus: [
			{_id: "lnkNewLocation", text:<FormattedMessage id ="new_location"/>, actionType: "Function", action: null, active: "active"},
		]
}

export const locationlistSubMenu = {
	menus: [
			{_id: "lnkListLocation", text:<FormattedMessage id ="all_locations"/>, actionType: "Function", action: null, active: "active"},
		]
}

export const locationEditSubMenu = {
	menus: [
			{_id: "lnkMyLocation", text: <FormattedMessage id ="edit_location"/>, actionType: "Function", action: null},
		]
}

export const locationViewSubMenu = {
	menus: [
			{_id: "lnkviewLocation", text: <FormattedMessage id ="location_info"/>, actionType: "Function", action: null},
		]
}

