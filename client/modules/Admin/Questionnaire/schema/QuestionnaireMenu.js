import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';

//Main Menu

export const questionnaireListMainMenu = {
	menus: [
			{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter]},
		]
}

export const questionnaireAddMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "URL", action: "/admin/questionnaire/list", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const questionnaireViewMainMenu = {
	menus: [
			{_id: "btnList", text: <FormattedMessage id ="list"/>, actionType: "URL", action: "/admin/questionnaire/list", icon: "fa fa-list"},
			{_id: "btnDelete", text: <FormattedMessage id ="delete"/>, actionType: "Function", action: null, icon: "fa fa-trash" , role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter]},
			{_id: "btnEdit", text: <FormattedMessage id ="edit"/>, actionType: "Function", action: null, icon: "fa fa-pencil", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter]},
		]
}

export const questionsViewMainMenu = {
	menus: [
			{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus" , role: [Roles.Admin, Roles.Lmsadmin, Roles.Instructor, Roles.Presenteradmin, Roles.Presenter]},
		]
}

//SubMenu
export const questionnaireListSubMenu = {
	menus: [
			{_id: "lnkQuestionnaire", text: <FormattedMessage id ="all_questionnaire"/>, actionType: "Function", action: null},
			{_id: "gradeConfiguration", text: <FormattedMessage id ="grade_configuration"/>, actionType: "Function", action: null, role: [  Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin,]},
		]
}

export const questionnaireAddSubMenu = {
	menus: [
			{_id: "lnkAddQuestionnaire", text: <FormattedMessage id='add_questionnaire' />, actionType: "URL", action: "/admin/questionnaire/add", active: "active"},
		]
}

export const questionnaireViewSubMenu = {
	menus: [
			{_id: "lnkViewQuestionnaire", text: <FormattedMessage id ="basic_info"/>, actionType: "Function", action: null},
			{_id: "lnkViewQuestions", text: <FormattedMessage id ="questions"/>, actionType: "Function", action: null},
		]
}

export const questionnaireEditSubMenu = {
	menus: [
			{_id: "lnkViewQuestionnaire", text: <FormattedMessage id ="basic_info"/>, actionType: "Function", action: null},
			{_id: "lnkViewQuestions", text: <FormattedMessage id ="questions"/>, actionType: "Function", action: null},
		]
}

export const questionnaireEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id='cancel' />, actionType: "URL", action: "/admin/questionnaire/list", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id='save' />, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}