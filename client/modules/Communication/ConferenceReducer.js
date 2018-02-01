import { TRANSPORT, CLOSE_CONF, SET_ICE, ADD_SCREEN, 
        ADD_USER, ADD_STREAM, ONLINE_USER, CONF_STATUS, 
        VIDEO_RESOLUTION, NEW_STREAM, CODEC, ONLY_PR, SET_PRESENTER, SET_SPEAKER,
        IM_HOST, STREAM_STATS, MIX_STREAM, SET_SCREEN_ENABLE, UPDATE_ATTENDEES, REMOTE_MUTE, CONF_FEEDBACK, CONF_FEEDBACK_HIDE, STREAM_RECORD } from './ConferenceActions';
import { CONF_DATA } from '../Dashboard/UserDashboard/UserDashboardActions';

const initialState = {
  attendees: [], streams: [], confData: {}, onlineStatus : [], confStatus: 0, 
  videoResolution : 'vga', codec: 'vp8', roomSuccess: false, 
  onlyPresenter: false, imHost: false, subStreams: [], screenStream: null, iceServers: null,
  transport: 'all', hostId: '',
  presenter: '', speaker: '', mixStream: {}, confStatusMessage: '', feedbackBlock: 0, remoteMute: false,
};
/*
  confStatus: 1 - Presenter, 2 - Conference, 3 - Telepresence
*/

const ConferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER :
      return Object.assign({ }, state, { attendees : action.attendees });
    case ADD_STREAM : 
    	return Object.assign({}, state, { streams: action.streams });
    case CONF_DATA :
    	return Object.assign({}, state, { confData : action.data, 
        roomSuccess : action.roomSuccess,
        confStatus: (action.data && action.data.businessType == 'LMS') ? 1 
        : ((action.data && action.data.businessType == 'Conference') ? 2 : 1)
        , codec: (action.data && action.data.codec ? action.data.codec : 'vp8') });
    case ONLINE_USER : 
      return Object.assign({}, state, { onlineStatus: action.onlineStatus });
    case CONF_STATUS: 
      return Object.assign({}, state, {confStatus: action.confStatus});
    case VIDEO_RESOLUTION :
      return Object.assign({}, state, {videoResolution: action.videoResolution});
    case CODEC: 
      return Object.assign({}, state, {codec: action.codec});
    case TRANSPORT:
      return Object.assign({}, state, {transport: action.transport});
    case ONLY_PR:
      return Object.assign({}, state, {onlyPresenter: action.onlyPresenter});
    case IM_HOST:
      return Object.assign({}, state, {imHost: action.imHost, hostId : action.hostId});
    case STREAM_STATS:
      return Object.assign({}, state, {subStreams: action.subStreams});
    case ADD_SCREEN:
      return Object.assign({}, state, {screenStream: action.screenStream});
    case SET_PRESENTER: 
      return Object.assign({}, state, {presenter: action.uid});
    case SET_SPEAKER: 
      return Object.assign({}, state, {speaker: action.uid});
    case SET_ICE:
      return Object.assign({}, state, {iceServers: action.ice.d.iceServers});
    case MIX_STREAM: 
      return Object.assign({}, state, {mixStream: action.mixstream});
    case CLOSE_CONF:
      return Object.assign({}, state, {attendees: [], streams: [], confData: {}, onlineStatus : [], confStatus: 0, 
            roomSuccess: false, onlyPresenter: false, imHost: false, subStreams: [], 
            screenStream: null, iceServers: null, presenter: '', speaker: '', hostId: ''});
    case SET_SCREEN_ENABLE:
      let attendees = state.attendees;
      let index = _.findIndex(attendees, { 'id': action.id });
      attendees[index]['screenEnable'] = action.status;
      return Object.assign({}, state, {attendees : attendees});
    case UPDATE_ATTENDEES:
      if (action.status) {
        let newConfData = state.confData;
        newConfData["users"] = action.attendees;
        return Object.assign({}, state, { confData: newConfData });
      } else {
        return state;
      }
    case CONF_FEEDBACK:
      console.log("Feedback Block - 1", action);
      return Object.assign({}, state, {confStatusMessage: action.confFeedback, feedbackBlock: action.feedbackBlock});
    case CONF_FEEDBACK_HIDE:
      return Object.assign({}, state, {feedbackBlock: action.feedbackBlock});
    case REMOTE_MUTE: 
      return Object.assign({}, state, {remoteMute: action.mute_status});
    case STREAM_RECORD:
        return Object.assign({}, state, {isRecording: action.record_status});
    default:
      return state;
  }
};


/* Selectors */

export const conferenceDetails  = state => state.conference;
export const codecDetails = state => state.conference.codec;
// Export Reducer
export default ConferenceReducer;
