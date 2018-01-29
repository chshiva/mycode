import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';
//Main Menu
export const userEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "URL", action: "/admin/users/list", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}


export const userViewMainMenu = {
	menus: [
			{_id: "btnNew", text: <FormattedMessage id='new_user' />, actionType: "Function", action :null, icon: "fa fa-user"},
			{_id: "btnViewProfile", text: <FormattedMessage id='viewprofile' />, actionType: "Function", action: null, icon: "fa fa-user"},
			{_id: "btnList", text: <FormattedMessage id='list' />, actionType: "URL", action: "/admin/users/list", icon: "fa fa-list"},
			{_id: "btnEdit", text: <FormattedMessage id='edit' />, actionType: "Function", action: null, icon: "fa fa-pencil"},
			{_id: "btnDelete", text: <FormattedMessage id='delete' />, actionType: "Function", action: null, icon: "fa fa-trash"}					
	   	]
}

export const inActiveUserViewMainMenu = {
	menus: [
			{_id: "btnNew", text: <FormattedMessage id='new_user' />, actionType: "URL", action : "/admin/users/new", icon: "fa fa-user"},
			{_id: "btnViewProfile", text: <FormattedMessage id='viewprofile' />, actionType: "Function", action: null, icon: "fa fa-user"},
			{_id: "btnList", text: <FormattedMessage id='list' />, actionType: "URL", action: "/admin/users/list", icon: "fa fa-list"},			
			{_id: "btnActive", text: <FormattedMessage id='activate_user' />, actionType: "Function", action: null, icon: "fa fa-unlock-alt"},		
	   	]
}

export const guestUserViewMainMenu = {
	menus: [
			{_id: "btnNew", text: <FormattedMessage id='new_user' />, actionType: "URL", action : "/admin/users/new", icon: "fa fa-user"},
			{_id: "btnList", text: <FormattedMessage id='list' />, actionType: "URL", action: "/admin/users/list", icon: "fa fa-list"},			
	  ]
}

export const userProfileMenu = {
	menus: [
			{_id: "btnback", text: <FormattedMessage id='back' />, actionType: "Function", action: null, icon: "fa fa-long-arrow-left"},
			{_id: "btnList", text: <FormattedMessage id='list' />, actionType: "URL", action: "/admin/users/list", icon: "fa fa-list"}
	   	]
}

export const userProfileSubMenu = {
	menus: [
			{_id: "lnkProfile", text: <FormattedMessage id='profile' />, actionType: "Function", action: null, active: "active"},
			{_id: "lnkProfileWorkEdu", text: <FormattedMessage id='work_education' />, actionType: "Function", action: null},
			{_id: "lnkProfileContacts", text: <FormattedMessage id='contacts' />, actionType: "Function", action: null},	
		 	{_id: "lnkProfileLocale", text: <FormattedMessage id='locale' />, actionType: "Function", action: null},

		]
}

export const userListMainMenu = {
	menus: [
			{_id: "btnNew", text: <FormattedMessage id='new_user' />, actionType: "Function", action : null, icon: "fa fa-user"},
			{_id: "btnExport", text: <FormattedMessage id='export_users' />, actionType: "Function", action : null, icon: "fa fa-upload"},
			{_id: "btnImport", text: <FormattedMessage id='import_users' />, actionType: "Upload", action : null, icon: "fa fa-download", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
			{_id: "btnFormat", text: <FormattedMessage id='import_format' />, actionType: "Download", action : '/ImportFormat.xlsx', icon: "fa fa-file-excel-o", role: [Roles.Lmsadmin, Roles.Presenteradmin]},
			{_id: "btnSample", text: <FormattedMessage id='import_format' />, actionType: "Download", action : '/SampleSheet.xlsx', icon: "fa fa-file-excel-o", role: [Roles.Admin]}
		]
}

export const loggedInUsersMainMenu = {
		menus: [
			{_id: "btnNew", text: <FormattedMessage id='new_user' />, actionType: "Function", action : null, icon: "fa fa-user"},
		]
}

//SubMenu
export const userEditSubMenu = {
	menus: [
			{_id: "lnkNewUsers", text: <FormattedMessage id='new_user' />, actionType: "URL", action: "/admin/users/new", active: "active"},
		]
}

export const userViewToEditSubMenu = {
	menus: [
			{_id: "editNewUser", text: <FormattedMessage id = "edit_user"/>, actionType: "Function", action: null, active: "active"},
		]
}
export const userViewToEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}
export const userListSubMenu = {
	menus: [
			{_id: "lnkUsers", text: <FormattedMessage id='all_users' />, actionType: "URL", action: "/admin/users/list", active: "active"},
			{_id: "lnkUsersActivity", text: <FormattedMessage id='users_activity' />, actionType: "URL", action: "/admin/active/users", active: "active"},
		]
}

export const userViewSubMenu = {
	menus: [
			{_id: "lnkUsers", text: <FormattedMessage id='user_info' />, actionType: "Function", action: null, active: "active"},
		]
}