import { UPDATE_WORKDASHBOARD, UPDATE_WORKQUESTION, CLEAR_WORKDASHBOARD, FETCHED_CONFERENCE_TOPIC_QUESTIONS, ANSWERS_SUBMITTED, FETCHED_CONFERENCE_POLL, POLL_PUBLISH, POLL_CREATED, POLL_ANSWER_SUBMITTED, DELETE_POLL, FETCHED_CONFERENCE_ASSIGNMENT, UPDATE_ASSIGNMENT_DATA } from './WorkDashboardActions';

const initialState = {
  	syncCurrent : '', current : '', topicContent : false,  conductQuestion : false,
    pdfView : false, handraiseCount : 0, roomCount : 0, handraiseupdates : false,
    uid : '', roomKey : '', sync : false, ssPdfView : false, ssUploadedby : '', pdfFileName : '', ssNotification : false,
    submissionList : false, pollReports : false, ScreenExtInstalled : false, shareRequestId: '',
    showButtons : true, selfShare : false, roomId: '', roomName: '', whiteBoardData : null, 
    topicList : false, topiclistData: {}, tid: '', topicContentDataDetails :{}, topicFileData: {}, topicPdfFileData: {},
    questionnaireId: '', questionnaireName:'', questionsData: {}, submittedData: {}, answerData: {}, fileId:'', 
    pollContent : false, pollList : true, createPoll : false, pollListData: {}, pollContentData : {}, pollContentIndex : null,
    assignmentContent : false, assignmentData: {}, assignmentList : true, assignmentContentData : {}, assignmentContentIndex : null,
    showButtons : true, selfShare : false, roomId: '', roomName: '', whiteBoardData : null, filestatus: false, fileData: null, waitforview: false, screenplay: true
};

const WorkDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WORKDASHBOARD :
    	return Object.assign({ }, state, action.data);
    case CLEAR_WORKDASHBOARD :
      return Object.assign({ }, state, initialState);
    case FETCHED_CONFERENCE_TOPIC_QUESTIONS : 
      if(action.questionsData || submittedData) {
        return Object.assign({}, state, { questionsData: action.questionsData, submittedData: action.submittedData });
      } else {
        return state;
      }
    case ANSWERS_SUBMITTED : 
      if(action.data) {
        return Object.assign({}, state, { answerData: action.data });
      } else {
        return state;
      }
    case FETCHED_CONFERENCE_POLL :
      if(action.data) { 
        return Object.assign({}, state, { pollListData : action.data });
      } else {
        return state;
      }
    case POLL_PUBLISH :
      if(action.data) { 
        return Object.assign({}, state, { pollListData : action.data });
      } else {
        return state;
      }
    case POLL_CREATED : 
      if(action.data) {
        return Object.assign({}, state, { pollListData : action.data });
      } else {
        return state;
      }
    case POLL_ANSWER_SUBMITTED : 
      if(action.data) {
        return Object.assign({}, state, { pollListData : action.data });
      } else {
        return state;
      }
    case DELETE_POLL :
      if(action.data) { 
        return Object.assign({}, state, { pollListData : action.data });
      } else {
        return state;  
      }
    case FETCHED_CONFERENCE_ASSIGNMENT : 
      if(action.data) {
       return Object.assign({}, state, { assignmentData : action.data });
      } else {
        return state;
      }
    case UPDATE_ASSIGNMENT_DATA : 
     return Object.assign({}, state, { assignmentData : action.data });
    default:
      return state;
  }
};

/* Selectors */
export const workDashboardData  = state => state.workDashboard;

// Export Reducer
export default WorkDashboardReducer;
