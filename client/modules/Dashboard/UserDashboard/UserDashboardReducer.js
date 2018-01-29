import { MY_CONTACTS, MY_ROOMS, UPCOMING_SCHEDULE, SCHEDULE_DATES, SET_DASHBOARD, PAST_SCHEDULE, CURRENT_SCHEDULE, GET_TOKEN, FETCHED_CONFERENCE_TOPIC, FETCHED_CONFERENCE_TOPIC_FILES, FETCH_CONFERENCE_TOPIC_QUESTIONS_FAILED, CLEAR_ROOMS, FETCHED_FEEDBACK_TYPE, FETCHED_FEEDBACK_TYPE_FAILED, FETCHED_CUSTOMIZE_QUESTIONNAIRE_QUESTIONS, FETCHED_CUSTOMIZE_QUESTIONNAIRE_QUESTIONS_FAILED, POLL_CREATED, SAVE_FEEDBACK_TYPE, CLEAR_FEEDBACK} from './UserDashboardActions';

import moment from 'moment';

const initialState = {
  edit : false, myrooms : null, upcoming : [], past : [], error : [], success : '', data : {},
  mycontacts : [],
  roomtoken: '',
  roomSuccess: false,
  topicData: {},
  roomName : '',
  uploadData : '',
  questionData: '',
  answerData : '',
  submittedData : {},
  questionnaireData : {},
  assignmentData: {},
  pollData: {},
  roomId: '',
  scheduledDates : [],
  selectedDate : moment().endOf('day').utc().toDate()
};


const UserDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DASHBOARD:
      return Object.assign({}, state, action.data);
    case MY_ROOMS :
      return Object.assign({ }, state, { edit : action.status, myrooms : action.myrooms, error : action.error });
    case UPCOMING_SCHEDULE : {
      let newobj;
      if(action.schedules)
        newobj = { edit : action.status, upcoming : action.schedules, past : [] };
      else
        newobj = { edit : action.status, past : [] };
    	return Object.assign({}, state, newobj);
    }
    case PAST_SCHEDULE : 
    	return Object.assign({}, state, {edit : action.status, upcoming : [], past : action.schedules });
    case CURRENT_SCHEDULE : 
      return Object.assign({}, state, {edit : action.status, data : action.data });
    case MY_CONTACTS : 
      return Object.assign({}, state, {edit : action.status, mycontacts : action.mycontacts });
    case GET_TOKEN:
      return Object.assign({}, state, {roomtoken: action.token, roomSuccess: action.roomSuccess});
    case FETCHED_CONFERENCE_TOPIC : 
     return Object.assign({}, state, { 
      topicData : action.data,
      roomName : action.roomName,
      roomId : action.roomId
    });

    case FETCHED_CONFERENCE_TOPIC_FILES : 
     return Object.assign({}, state, { 
      uploadData : action.data,
    });

    case FETCH_CONFERENCE_TOPIC_QUESTIONS_FAILED : 
     return Object.assign({}, state, { 
      questionData : action.data,
      submittedData : action.submittedData
    });

    case CLEAR_ROOMS : 
      return Object.assign({}, state, {edit : false, myrooms : null, upcoming : [], past : [], error : [], data : {},
      roomtoken: '',
      roomSuccess: false,
      topicData: {},
      /*roomName : '',*/
      uploadData : '',
      questionData: '',
      answerData : '',
      submittedData : '',
      assignmentData: '',
      pollData: ''/*,
      roomId: ''*/});
    case FETCHED_FEEDBACK_TYPE : 
      return Object.assign({}, state, {edit : action.status, data : action.data, questionnaireData : action.questionnaireData });
    case FETCHED_FEEDBACK_TYPE_FAILED :
      return Object.assign({}, state, {edit : action.status }); 
    case FETCHED_CUSTOMIZE_QUESTIONNAIRE_QUESTIONS : 
      return Object.assign({}, state, {edit : action.status, questionnaireData : action.data });
    case FETCHED_CUSTOMIZE_QUESTIONNAIRE_QUESTIONS_FAILED :
      return Object.assign({}, state, {edit : action.status, questionnaireData : action.data });  
    case SAVE_FEEDBACK_TYPE :
      return Object.assign({}, state, {
         success : action.message
      });
    case CLEAR_FEEDBACK:
      return Object.assign({}, state, { success : '', error : [], questionnaireData: {} });
    case SCHEDULE_DATES:
      return Object.assign({}, state, { scheduledDates: action.dates });
    default:
      return state;
  }
};


/* Selectors */

export const dashboardData  = state => state.dashboard;
// export const conferenceData  = state => state.dashboard;

// Export Reducer
export default UserDashboardReducer;
