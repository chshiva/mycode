import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';
//Main Menu
export const roomEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id ="cancel"/>, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id ="save"/>, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const roomNewMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id ="cancel"/>, actionType: "URL", action: "/admin/room/list", icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id ="save"/>, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const roomTopicNewMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id ="cancel"/>, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id ="save"/>, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}
export const roomEditTopicNewMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id ="cancel"/>, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id ="save"/>, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const roomViewMainMenu = {
	menus: [
			{_id: "btnList", text: <FormattedMessage id ="list"/>, actionType: "URL", action: "/admin/room/list", icon: "fa fa-list"},
			{_id: "btnDelete", text: <FormattedMessage id ="delete"/>, actionType: "Function", action: null, icon: "fa fa-trash", role: [Roles.Superadmin, Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
			{_id: "btnEdit", text: <FormattedMessage id ="edit"/>, actionType: "Function", action: null, icon: "fa fa-pencil", role: [Roles.Superadmin, Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
		]
}
export const roomTopicMainMenu = {
	menus: [
			{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter, Roles.Moderator]},
			{_id: "btnIndex", text: <FormattedMessage id ="index"/>, actionType: "Function", action: null, icon: "fa fa-list-alt", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter, Roles.Moderator]},
		]
}

export const roomLocationMainMenu = {
	menus: [
			{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
		]
}

export const roomMainMenu = {
	menus: [
			{_id: "btnNew", text: <FormattedMessage id ="new"/>, actionType: "Function", action: null, icon: "fa fa-plus", role: [Roles.Superadmin, Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
		]
}

export const addUserViewMainMenu = {
	menus: [
			{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus", role: [Roles.Superadmin, Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin]},
		]
}

export const addStudentMainMenu = {
	menus: [
			{_id: "btnAdd", text: <FormattedMessage id ="add_student"/>, actionType: "Function", action: null, icon: "fa fa-plus"},
		]
}

export const addUserSubMenu = {
	menus: [
			{_id: "back", text: <FormattedMessage id ="back_to_room"/>, actionType: "Function", action: null},
		]
}

export const addUserEditMainMenu = {
	menus: [
			{_id: "btnCancel", text: <FormattedMessage id ="cancel"/>, actionType: "Function", action: null, icon: "fa fa-ban"},
			{_id: "btnSave", text: <FormattedMessage id ="save"/>, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
		]
}

export const assignQuestionnaireMainMenu = {
	menus: [
			{_id: "btnback", text: <FormattedMessage id='back' />, actionType: "Function", action: null, icon: "fa fa-long-arrow-left"},
			{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter]},
		]
}

export const listResultMainMenu = {
	menus: []
}

export const listSubmissionMainMenu = {
	menus: []
}

export const roomAssignmentMainMenu = {
	menus: [
		{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus", role: [Roles.Admin, Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter]},
	]
}

export const roomAssignmentAddMainMenu = {
	menus: [
		{_id: "btnCancel", text: <FormattedMessage id ="cancel"/>, actionType: "Function", action: null, icon: "fa fa-ban"},
		{_id: "btnSave", text: <FormattedMessage id ="save"/>, actionType: "Function", action: null, icon: "fa fa-floppy-o"}
	]
}

export const roomReportsMainMenu = {
	menus: []
}

//SubMenu
export const roomEditSubMenu = {
	menus: [
			{_id: "lnkMyRoom", text: <FormattedMessage id ="room_info"/>, actionType: "Function", action: null},
			{_id: "lnkRoomUser", text: <FormattedMessage id ="room_users"/>, actionType: "Function", action: null},
			{_id: "lnkRoomTopic", text: <FormattedMessage id ="room_topic"/>, actionType: "Function", action: null},
			{_id: "lnkFeedback", text: <FormattedMessage id ="room_feedback"/>, actionType: "Function", action: null},
			
			/* commented because of no functionality, need to implement */
			// {_id: "lnkLocation", text: <FormattedMessage id ="room_location"/>, actionType: "Function", action: null, role: [Roles.Admin, Roles.Lmsadmin, Roles.Superadmin, Roles.Presenteradmin]},
			{_id: "lnkRoomConfiguration", text: <FormattedMessage id ="room_configuration"/>, actionType: "Function", action: null},
			{_id: "lnkAssignments", text: <FormattedMessage id ="room_assignments"/>, actionType: "Function", action: null, role: [Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter]},
			{_id: "lnkReports", text: <FormattedMessage id ="reports"/>, actionType: "Function", action: null, role: [Roles.Instructor, Roles.Lmsadmin]},
			{_id: "lnkCertificates", text: <FormattedMessage id ="certificates"/>, actionType: "Function", action: null, role: [Roles.Instructor, Roles.Lmsadmin]}			
		]
}

//SubMenu without topics
export const roomNoTopicSubMenu = {
	menus: [
			{_id: "lnkMyRoom", text: <FormattedMessage id ="room_info"/>, actionType: "Function", action: null},
			{_id: "lnkRoomUser", text: <FormattedMessage id ="room_users"/>, actionType: "Function", action: null},
			{_id: "lnkFeedback", text: <FormattedMessage id ="room_feedback"/>, actionType: "Function", action: null},
			
			/* commented because of no functionality, need to implement */
			// {_id: "lnkLocation", text: <FormattedMessage id ="room_location"/>, actionType: "Function", action: null, role: [Roles.Admin, Roles.Lmsadmin, Roles.Superadmin, Roles.Presenteradmin]},
			{_id: "lnkRoomConfiguration", text: <FormattedMessage id ="room_configuration"/>, actionType: "Function", action: null},
			{_id: "lnkAssignments", text: <FormattedMessage id ="room_assignments"/>, actionType: "Function", action: null, role: [Roles.Lmsadmin, Roles.Presenteradmin, Roles.Instructor, Roles.Presenter]},
			{_id: "lnkReports", text: <FormattedMessage id ="reports"/>, actionType: "Function", action: null, role: [Roles.Instructor, Roles.Lmsadmin]},
			{_id: "lnkCertificates", text: <FormattedMessage id ="certificates"/>, actionType: "Function", action: null, role: [Roles.Instructor, Roles.Lmsadmin]}						
		]
}


//SubMenu for view feedback
export const viewFeedbackSubMenu = {
	menus: [			
			{_id: "lnkFeedback", text: <FormattedMessage id ="room_feedback"/>, actionType: "Function", action: null}
		]
}
//mainMenu for view feedback
export const viewFeedbackMainMenu = {
	menus: [			
			{_id: "btnList", text: <FormattedMessage id ="list"/>, actionType: "Function", action: "null", icon: "fa fa-list"},
		]
}

export const roomNewSubMenu = {
	menus: [
			{_id: "lnkNewRoom", text: <FormattedMessage id ="new_room"/>, actionType: "URL", action: "/admin/room/new", active: "active"},
		]
}

export const roomSubMenu = {
	menus: [
			{_id: "lnkRoom", text: <FormattedMessage id ="all_rooms"/>, actionType: "URL", action: "/admin/room/list", active: "active"},
		]
}
export const uploadListSubMenu = {
	menus: [
			{_id: "back", text: <FormattedMessage id ="back"/>, actionType: "Function", action: null},,
		]
}
export const roomAddUserSubMenu = {
	menus: [
			{_id: "lnkNewRoom", text: <FormattedMessage id ="add_user_to_room"/>, actionType: "Function", action: null, active: "active"},
		]
}

export const roomTopicMainMenuUpload = {
	menus: [
			{_id: "btnback", text: <FormattedMessage id='back' />, actionType: "Function", action: null, icon: "fa fa-long-arrow-left"},
			{_id: "btnMultipleDelete", text: <FormattedMessage id ="multiple_delete"/>, actionType: "Function", action: null, icon: "fa  fa-trash-o"},
		]
}

export const listResultSubMenu = {
	menus: [
			{_id: "lnkQuestionnaire", text: <FormattedMessage id ="questionnaire"/>, actionType: "Function", action: null},
		]
}

export const viewResultSubMenu = {
	menus: [
			{_id: "lnkListResult", text: <FormattedMessage id ="result_list"/>, actionType: "Function", action: null},
		]
}

export const feedbackMainMenu = {
	menus: [
		{_id: "btnList", text: <FormattedMessage id ="list"/>, actionType: "URL", action: "/admin/room/list", icon: "fa fa-list"}
	]
}

export const feedbackListMainMenu = {
	menus: [
			{_id: "btnList", text: <FormattedMessage id ="list"/>, actionType: "URL", action: "/admin/room/list", icon: "fa fa-list"},
		]
}

export const submissionListSubMenu = {
	menus: [
			{_id: "back", text: <FormattedMessage id ="back_to_assignments"/>, actionType: "Function", action: null},
			{_id: "linkAssignmentList", text: <FormattedMessage id ="submission_list"/>, actionType: "Function", action: null}
			// {_id: "linkAssignmentReports", text: <FormattedMessage id ="assignment_reports"/>, actionType: "Function", action: null},
		]
}

export const submissionViewSubMenu = {
	menus: [
			{_id: "back", text: <FormattedMessage id ="back_to_submissions"/>, actionType: "Function", action: null},
			{_id: "evaluateAssignment", text: <FormattedMessage id ="evaluate_assignment"/>, actionType: "Function", action: null},
			{_id: "plagiarism", text: <FormattedMessage id ="plagiarism"/>, actionType: "Function", action: null},
		]
}

export const roomReportsSubMenu = {
	menus: [
			{_id: "lnkAttendance", text: <FormattedMessage id ="attendance"/>, actionType: "Function", action: null},
			{_id: "lnkTopics", text: <FormattedMessage id ="room_topic"/>, actionType: "Function", action: null}
	]
}

export const roomReportsNoTopicsSubMenu = {
	menus: [
			{_id: "lnkAttendance", text: <FormattedMessage id ="attendance"/>, actionType: "Function", action: null}
	]
}

export const roomCertificatesMainMenu = {
	menus: []
};
