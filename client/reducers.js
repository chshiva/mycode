/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import login from './modules/Login/LoginReducer';
import profile from './modules/Admin/Profile/ProfileReducer';
import users from './modules/Admin/Users/UsersReducer';
import uploads from './modules/Upload/UploadReducer';

import room from './modules/Admin/RoomManager/RoomReducer';
import corporate from './modules/Admin/Corporate/CorporateReducer';
import settings from './modules/Admin/Settings/SettingsReducer';
import ldapSettings from './modules/Admin/LDAPSettings/LDAPSettingsReducer';
import packages from './modules/Admin/PackageManager/PackageReducer';
import dashboard from './modules/Dashboard/UserDashboard/UserDashboardReducer';
import category from './modules/Admin/Category/CategoryReducer';
import questionnaire from './modules/Admin/Questionnaire/QuestionnaireReducer';
import rightBar from './modules/Layouts/DashLayout/RightBarReducer';
import professionalprofile from './modules/Admin/Profile/ProfessionalProfile/ProfessionalProfileReducer';
import reports from './modules/Admin/Reports/ReportsReducer'; 

//import feedback from './modules/Admin/Feedback/FeedbackReducer';

import student from './modules/Admin/RoomManager/StudentReducer';
import conference from './modules/Communication/ConferenceReducer';
import stats from './modules/Communication/StatsReducer';
import chat from './modules/Dashboard/components/group/ChatReducer';
import feedback from './modules/Admin/RoomManager/FeedbackReducer';
import location from './modules/Admin/Location/LocationReducer';
import ParticipantsGroup from './modules/Admin/ParticipantsGroup/ParticipantsGroupReducer';

import workDashboard from './modules/Dashboard/UserDashboard/components/WorkDashboardReducer';
import fullCalendarEvents from './modules/Admin/FullCalendar/FullCalendarReducer';
import broadcast from './modules/Dashboard/UserDashboard/components/broadcast/BroadcastReducer';

import workDashboardReload from './modules/Dashboard/UserDashboard/components/WorkDashboardReloadReducer';


var _ = require('lodash');

// Combine all reducers into one root reducer

const appReducer = combineReducers({
  app,
  intl,
  login,
  profile,
  users,
  room,
  uploads,
  corporate,
  settings,
  ldapSettings,
  packages,
  dashboard,
  category,
  questionnaire,  
  student,
  conference,
  stats,
  chat,
  feedback,
  location,
  ParticipantsGroup,
  workDashboard,
  rightBar,
  professionalprofile,
  reports,
  fullCalendarEvents,
  broadcast,
  workDashboardReload
});

const rootReducer = ( state, action ) => {
  if ( action.type === 'LOGOUT_USER' ) {
    let intlState = _.pick(state, ['intl']);
    state = intlState
  }
  return appReducer(state, action)
}

export default rootReducer

