import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';

export const reportsSubMenu = {
	menus: [
			{_id: "lnkReports", text: <FormattedMessage id ="room_list"/>, actionType: "URL", action: "/course/reports", active: "active"},
		]
}
export const reportsMainMenu = {
	menus: []
}

export const reportsListMainMenu = {
	menus: [
		{_id: "btnList", text: <FormattedMessage id ="list"/>, actionType: "URL", action: "/course/reports", icon: "fa fa-list"}
	]
}

export const courseReportsSubMenu = {
	menus: [			
			{_id: "linkAttendance", text: <FormattedMessage id ="attendance"/>, actionType: "Function", action: null},
			{_id: "linkTopics", text: <FormattedMessage id ="topics"/>, actionType: "Function", action: null},
			{_id: "linkAssignment", text: <FormattedMessage id ="assignment"/>, actionType: "Function", action: null},
		]
}

