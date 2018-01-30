import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';

//Main Menu
export const feedbackListMainMenu = {
	menus: [
			{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus" }
		]
}

//SubMenu
export const feedbackListSubMenu = {
	menus: [
			{_id: "lnkFeedback", text: <FormattedMessage id ="all_feedback"/>, actionType: "URL", action: "/admin/feedback/list", active: "active"},
		]
}
