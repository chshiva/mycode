import { RELOAD_TOPIC_LIST, RELOAD_POLLS, RELOAD_TOPIC_CONTENT, RELOAD_UPLOAD_FILES, RELOAD_TOPIC_QUESTIONNAIRES, RELOAD_TOPIC_PDFVIEW, RELOAD_REMOVED_QUESTIONNAIRES, RELOAD_CONDUCT_QUESTION, RELOAD_POLLS_LIST } from './WorkDashboardReloadActions';

const initialState = {
  	topicList: false, pollList: true, assignmentList: false, topicContent: false,
    pdfView: false, conductQuestion : false, assignmentList : true
};

const WorkDashboardReloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELOAD_TOPIC_LIST :
    	return Object.assign({ }, state, { topicList: !state.topicList });
    case RELOAD_TOPIC_CONTENT : 
      return Object.assign({ }, state, { topicContent: !state.topicContent });
    case RELOAD_UPLOAD_FILES : 
      return Object.assign({ }, state, { topicContent: !state.topicContent  });
    case RELOAD_TOPIC_QUESTIONNAIRES :
      return Object.assign({ }, state, { topicContent: !state.topicContent  });
    case RELOAD_TOPIC_PDFVIEW :
      return Object.assign({ }, state, { pdfView : !state.pdfView  });
    case RELOAD_REMOVED_QUESTIONNAIRES :
      return Object.assign({ }, state, { conductQuestion : !state.conductQuestion  });
    case RELOAD_CONDUCT_QUESTION :
      return Object.assign({ }, state, { conductQuestion : !state.conductQuestion  });
    case RELOAD_POLLS_LIST :
      return Object.assign({ }, state, { pollList: !state.pollList });
    default:
      return state;
  }
};

/* Selectors */
export const workDashboardReload  = state => state.workDashboardReload;

// Export Reducer
export default WorkDashboardReloadReducer;
