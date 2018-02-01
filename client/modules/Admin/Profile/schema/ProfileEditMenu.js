import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
//Main Menu
export const profileEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "URL", action: "/admin/profile", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const profileViewMainMenu = {
	menus: [
			{_id: "btnEdit", text: <FormattedMessage id='edit' />, actionType: "URL", action: "/admin/profile/edit", icon: "fa fa-pencil"},
		]
}

export const localeNewMainMenu = {
	menus: [
			// {_id: "btnDelete", text: <FormattedMessage id='delete' />, actionType: "Function", action: null, icon: "fa fa-trash"},
			{_id: "btnEdit", text: <FormattedMessage id='edit' />, actionType: "URL",  action: "/admin/profile/locale", icon: "fa fa-pencil"},
		]
}
export const localeEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "URL", action: "/admin/locale/view", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

//SubMenu
export const profileEditSubMenu = {
	menus: [
			{_id: "lnkGenaralInfo", text: <FormattedMessage id='general_info' />, actionType: "Function", action: null, active: "active"},
		]
}
export const localeEditSubMenu = {
	menus: [
			{_id: "lnkEditLocale", text: <FormattedMessage id='locale_directory' />, actionType: "Function", action: null, active: "active"},
		]
}
export const profileViewSubMenu = {
	menus: [
			{_id: "lnkMyProfile", text: <FormattedMessage id='my_profile' />, actionType: "URL", action: "/admin/profile", active: "active"},
			{_id: "lnkWorkEdu", text: <FormattedMessage id='work_education' />, actionType: "URL", action: "/admin/profile/workedu"},
			{_id: "lnkContacts", text: <FormattedMessage id='contacts' />, actionType: "URL", action: "/admin/profile/contacts"},	
		 	{_id: "lnkChangePassword", text: <FormattedMessage id='change_password' />, actionType: "URL", action: "/admin/changePassword"},
		  {_id: "lnkLocale", text: <FormattedMessage id='locale' />, actionType: "URL", action: "/admin/locale/view"},

		]
}

