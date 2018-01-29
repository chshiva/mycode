import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles';

export const participantsSubMenu = {
	menus: [
			{_id: "lnkparticipantsResult", text: <FormattedMessage id ="all_participants_groups"/>, actionType: "Function", action: null},
		]
}

export const participantsMainMenu = {
	menus: [
		{_id: "btnAdd", text: <FormattedMessage id ="add"/>, actionType: "Function", action: null, icon: "fa fa-plus", role : [Roles.Lmsadmin, Roles.Instructor, Roles.Presenteradmin, Roles.Presenter]},
	]
}

export const viewParticipantsMainMenu = {
	menus:[
		{_id: "btnList", text: <FormattedMessage id ="list"/>, actionType: "URL", action: "/admin/participants-group/list", icon: "fa fa-list"}			
	]
}