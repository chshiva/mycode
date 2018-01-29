import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../components/AuthController';

export const ADD_USER = 'ADD_USER';
export const ADD_STREAM = 'ADD_STREAM';
export const ONLINE_USER = 'ONLINE_USER';
export const CONF_STATUS = 'CONF_STATUS';
export const NEW_STREAM  = 'NEW_STREAM';
export const VIDEO_RESOLUTION = 'VIDEO_RESOLUTION';
export const CODEC 			= 'CODEC';
export const ONLY_PR		= 'ONLY_PR';
export const IM_HOST		= 'IM_HOST';
export const CREATE_LOG = 'CREATE_LOG';
export const STREAM_STATS = 'STREAM_STATS';
export const ADD_SCREEN	= 'ADD_SCREEN';
export const SET_ICE	= 'SET_ICE';
export const CLOSE_CONF  = 'CLOSE_CONF';
export const TRANSPORT = 'TRANSPORT';
export const SET_PRESENTER 	= 'SET_PRESENTER';
export const SET_SPEAKER	= 'SET_SPEAKER';

export const AUDIO_SEND = 'AUDIO_SEND';
export const AUDIO_RECV = 'AUDIO_RECV';
export const VIDEO_SEND = 'VIDEO_SEND';
export const VIDEO_RECV = 'VIDEO_RECV';
export const VIDEO_BWE	= 'VIDEO_BWE';
export const MIX_STREAM	= 'MIX_STREAM';
export const SET_SCREEN_ENABLE = 'SET_SCREEN_ENABLE';
export const UPDATE_ATTENDEES = 'UPDATE_ATTENDEES';
export const CONF_FEEDBACK = 'CONF_FEEDBACK';
export const CONF_FEEDBACK_HIDE = 'CONF_FEEDBACK_HIDE';
export const REMOTE_MUTE 		= 'REMOTE_MUTE';
export const STREAM_RECORD 		= 'STREAM_RECORD'
/*Conf Data*/
// var attendees = {};

/* ------------- */
export function LogIce(response){
	console.log("Ice from xirsys", response);
	return {
		type: SET_ICE,
		ice: response.data
	} 
}

export function setMixStream (stream){
	return {
		type: MIX_STREAM,
		mixstream: stream
	}
}

export function StatsAudioSend(stats){
	return {
		type: AUDIO_SEND,
		ssrc_audio_send: stats
	}
}

export function StatsAudioRecv(stats) {
	return {
		type: AUDIO_RECV,
		ssrc_audio_recv: stats
	}
}

export function StatsVideoSend(stats){
	return {
		type: VIDEO_SEND,
		ssrc_video_send: stats
	}
}

export function StatsVideoRecv(stats){
	return {
		type: VIDEO_RECV,
		ssrc_video_recv: stats
	}
}

export function StatsVideoBWE(stats){
	return {
		type: VIDEO_BWE,
		VideoBWE: stats
	}
}

export function SetPresenter(uid){
	return {
		type: SET_PRESENTER,
		uid: uid
	}
}

export function SetSpeaker(uid){
	return {
		type: SET_SPEAKER,
		uid: uid
	}
}

export function CloseConf(){
	return {
		type: CLOSE_CONF,
	}
}

export function requestIceServer(){
	return (dispatch) => {
	    return callApi('getice').then(res => dispatch(LogIce(res)));
  	};
}

export function addScreen (screenStream){
	return {
		type: ADD_SCREEN,
		screenStream: screenStream
	}
}

export function setStreamStats(subStreams){
	return {
		type: STREAM_STATS,
		subStreams: subStreams
	}
}

export function setTransport(transport){
	return {
		type: TRANSPORT,
		transport: transport,
	}
}

export function setCodec(codec){
	return {
		type: CODEC,
		codec: codec,
	}
}

export function addUser(user){
	// _.assign(attendees, user);
	return {
	      	type: ADD_USER,
	        attendees: user,
	};
}

export function getAttendees(roomKey){
	return (dispatch) => {
	    return callApi('fetch-attendees/'+ roomKey, 'get').then(res => dispatch(updateAttendees(res)));
  };
}

export function updateAttendees(res){
	// console.log("attendees------ ", res);
	if (res.status) {
		return {
				type: UPDATE_ATTENDEES,
				status: res.status,
				attendees: res.attendees,
		};
	} else {
		return {
				type: UPDATE_ATTENDEES,
				status: res.status
		};
	}
}

export function addStream(stream){
	return {
		type: ADD_STREAM,
		streams: stream,
	}
}

export function OnlineStatus(user){
	// console.log("OnlineStatus--", user);
	return {
	      	type : ONLINE_USER,
	        onlineStatus : user,
	};
}

export function SetConfStatus(status){
	return {
		type: CONF_STATUS,
		confStatus: status,
	};
}

export function setVideoResolution(videoResolution){
	return {
		type: VIDEO_RESOLUTION,
		videoResolution : videoResolution,
	};
}

export function onlyPresenter(status){
	return {
		type: ONLY_PR,
		onlyPresenter: status,
	}
}

export function setImHost(objEntity){
	// console.log("setImHost", status);
	return {
		type: IM_HOST,
		imHost : objEntity.status,
		hostId: objEntity.hostId
	}
}
export function createLogRequest(data){
	return (dispatch) => {
	    return callApi('create-log', 'post', {
	      data: data,
	    }).then(res => dispatch(LogStatus(res)));
  	};	
}

export function LogStatus(response){
  if(response.status){
    return {
      type: CREATE_LOG,
      status: response.status,
    };
  } else if(response.error) {
  	return {
      type: CREATE_LOG,
      status: response.status,
    };
  } else{
    return {
      type: CREATE_LOG,
      status: response.status,
    };
  }
}

export function setScreenEnable (obj) {
	return {
		type: SET_SCREEN_ENABLE,
		id : obj.id,
		status : obj.status
	}
}

export function createGuestAccount (guestObject) {
	return (dispatch) => {
		return callApi ('create-guest', 'post', {
			guestObject : guestObject
		});
	}
}

export function clearGuestAccount(roomKey) {
	// console.log("roomKey ------------------- ", roomKey);
	return (dispatch) => {
		return callApi ('delete-guest/'+roomKey, 'delete');
	}
}

export function setConfFeedback(objFeedback){
	console.log("Feedback Status", objFeedback);
	return {
		type: CONF_FEEDBACK,
		confFeedback : objFeedback.message,
		feedbackBlock: objFeedback['status']
	}
}

export function showOrHideConfFeedback(status){
	return {
		type: CONF_FEEDBACK_HIDE,
		feedbackBlock: status
	}
}

export function RemoteMute(status){
	return {
		type: REMOTE_MUTE,
		mute_status: status
	}
}

export function setRecordStream(status){
	return {
		type: STREAM_RECORD,
		record_status: status
	}
}