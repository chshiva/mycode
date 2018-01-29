import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';
import moment from 'moment';

export const MY_ROOMS = 'MY_ROOMS';
export const UPCOMING_SCHEDULE = 'UPCOMING_SCHEDULE';
export const PAST_SCHEDULE = 'PAST_SCHEDULE';
export const CURRENT_SCHEDULE = 'CURRENT_SCHEDULE';
export const MY_CONTACTS = 'MY_CONTACTS';
export const GET_TOKEN		= 'GET_TOKEN';
export const FETCHED_CONFERENCE_TOPIC = 'FETCHED_CONFERENCE_TOPIC';
export const CONFERENCE_TOPIC_FETCH_FAILED = 'CONFERENCE_TOPIC_FETCH_FAILED';
export const CONF_DATA = 'CONF_DATA';
export const FETCHED_CONFERENCE_TOPIC_FILES = 'FETCHED_CONFERENCE_TOPIC_FILES';
export const FETCHED_CONFERENCE_TOPIC_FILES_FAILED = 'FETCHED_CONFERENCE_TOPIC_FILES_FAILED';
export const CLEAR_ROOMS = 'CLEAR_ROOMS';
export const FETCHED_FEEDBACK_TYPE = 'FETCHED_FEEDBACK_TYPE';
export const FETCHED_FEEDBACK_TYPE_FAILED = 'FETCHED_FEEDBACK_TYPE_FAILED';
export const FETCHED_CUSTOMIZE_QUESTIONNAIRE_QUESTIONS = 'FETCHED_CUSTOMIZE_QUESTIONNAIRE_QUESTIONS';
export const FETCHED_CUSTOMIZE_QUESTIONNAIRE_QUESTIONS_FAILED = 'FETCHED_CUSTOMIZE_QUESTIONNAIRE_QUESTIONS_FAILED';
export const UPDATE_ASSIGNMENT_DATA = 'UPDATE_ASSIGNMENT_DATA';
export const SAVE_FEEDBACK_TYPE = 'SAVE_FEEDBACK_TYPE';
export const CLEAR_FEEDBACK = 'CLEAR_FEEDBACK';
export const SCHEDULE_DATES = 'SCHEDULE_DATES';
export const SET_DASHBOARD = 'SET_DASHBOARD';
export const BROADCAST_NOTIFICATION = 'BROADCAST_NOTIFICATION';

export function setDashboard(obj) {
  return {
      type: SET_DASHBOARD,
      data: obj
  };
}

export function RegenerateLink(obj){
	return callApi('regenerate-link', 'post', {
			        data: obj,
  			});
}

export function ConformRegenarate(obj){
	return callApi('conform-regenarate', 'post', {
			        data: obj,
  			});
}


/*export function shareLink(obj){
	return callApi('sharelink', 'post', {
		data : obj,
	});
}*/

export function sendInviteLink(obj){
	return callApi('share-link', 'post', {
		data : obj,
	});
}

export function getRoomData(obj){
	return callApi('fetch-room/' + obj.id, 'get');
}

export function clearDashboardRooms() {
  return {
      type: CLEAR_ROOMS
  };
}

export function getMyRooms (){
	return (dispatch) => {
    return callApi('fetch-my-rooms', 'get').then(res => dispatch(setDashboardRooms(res)));
	};
}

export function searchMyRooms(searchKey){
	return (dispatch) => {
    return callApi('fetch-my-rooms/' + searchKey, 'get').then(res => dispatch(setDashboardRooms(res)));
	};
}

export function setMyRooms(response){
	return(dispatch) => {
		return dispatch(setDashboardRooms(response));
	}
}

export function setDashboardRooms(response, page = ''){
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
        type: MY_ROOMS,
        status: response.status,
        myrooms: response.data,
        // topics : response.topics ? response.topics : null
    };
	}else{
    return {
      	type: MY_ROOMS,
        status: response.status,
        myrooms: []
    };
	}
}

export function setSchedule(obj){
	return (dispatch) => {
    return callApi('schedules', 'post', {
      data: obj,
    }).then(res => dispatch(setDashUpcomingSch(res)));
  };
}

export function updateSchedule(obj, id) {
  return (dispatch) => {
    return callApi('schedules/' + id, 'put', {
      data: obj,
    }).then(res => dispatch(setDashUpcomingSch(res)));
  };
}

export function updateSlotSchedule(obj, id) {
  return (dispatch) => {
    return callApi('schedule-slot/' + id, 'put', {
      data : obj
    }).then(res => dispatch(setDashUpcomingSch(res)));
  }
}

export function setDashUpcomingSch(response, page = ''){
	if(response.status){
	    if(page != ''){
	      browserHistory.push(page);
	    }
	    return {
	        type: UPCOMING_SCHEDULE,
	        status: response.status,
	        schedules: response.data,
	        message : response.message
	    };
  	}else{
  		if(response.error == 801){
  			response.error = response.object.meetingName+" is already reserved " + response.object.roomName +" from "+moment(response.object.startTime).format("DD/MM/YYYY hh:mm A")+" to "+moment(response.object.endTime).format("DD/MM/YYYY hh:mm A")+".";
  		}
		return {
	      	type: UPCOMING_SCHEDULE,
	        status: response.status,
	        // schedules: schedules,
	        error : response.error
	    };
		
  	}
}

export function getScheduleDates(){
  return (dispatch) => {
    return callApi('schedule-dates', 'get').then(res => dispatch(setScheduleDates(res)));
  }
}

export function setScheduleDates(response) {
  let dateRanges = [];
  if (response.dates != null) {
    let now = Number(moment().startOf('day').format('x'));
    let filterdates = [];
    let scheduleDates = response.dates.sort();
    _.each(scheduleDates, function(schDate){
      let date = Number(moment(schDate, 'x').startOf('day').format('x'));
      /*if (filterdates.indexOf(date) <= -1) {
        filterdates.push(date);*/
        if (now <= date) {
          dateRanges.push({ state: 'enquire', range : moment.range(moment(schDate, 'x'), moment(schDate, 'x').endOf('day'))});
        } else {
          dateRanges.push({ state: 'past', range : moment.range(moment(schDate, 'x'), moment(schDate, 'x').endOf('day'))});
        }
      // }
    });
  }

  return {
      type: SCHEDULE_DATES,
      status: response.status,
      dates: dateRanges
  };
}

export function getMyDateSchedules(obj){
	return (dispatch) => {
    return callApi('date-schedules/' + obj.startDate + '/' + obj.endDate, 'get')
          .then(res => dispatch(setDashUpcomingSch(res)));
	};
}

export function getMyPastSchedules(obj){
	return (dispatch) => {
	    return callApi('date-schedules/' + obj.currentDate, 'get')
                .then(res => dispatch(setDashPastSch(res)));
  	};
}

export function setDashPastSch(response, page = ''){
   	if(response.status){
	    if(page != ''){
	      browserHistory.push(page);
	    }
	    return {
	        type: PAST_SCHEDULE,
	        status: response.status,
	        schedules: response.data,
	        message : response.message
	    };
  	}else{
		return {
	      	type: PAST_SCHEDULE,
	        status: response.status,
	        schedules: [],
	        error : response.error
		};
  	}
}

export function deleteMySchedule(recordId, scheduleId){
	return (dispatch) => {
    return callApi('delete-slot/' + recordId + '/' + scheduleId, 'delete').then(res => dispatch(getAfterSchDelete(res)));
	};
}

export function deleteMyReucrringSchedule(obj){
  return (dispatch) => {
    return callApi('delete-schedule/' + obj.recordId + '/' + obj.currentDate, 'delete', ).then(res => dispatch(getAfterSchDelete(res)));
  };
}


export function getAfterSchDelete(response){
  if(response.status){
    return {
        type: UPCOMING_SCHEDULE,
        status: response.status,
        message : response.message,
        error : response.error
    };
  }else{
    return {
        type: UPCOMING_SCHEDULE,
        status: response.status,
        error : response.error
    };
  
  }
}

export function getSchedule(recordId){
	return (dispatch) => {
    return callApi('schedules/' +recordId, 'get').then(res => dispatch(setSchRes(res)));
	};
}

export function setSchRes(response){
  // console.log("response in setSchRes === ", response);
	if(response.status){
		return {
			type : CURRENT_SCHEDULE,
      status: response.status,
      data : response.data
		};
	}else if(response.error){
		return {
			type : CURRENT_SCHEDULE,
      status: response.status,
      data : {},
      error : response.error
		};
	}
}

export function clearSchedule(){
	return(dispatch) => {
		let response = {
			status : true,
			data : {}
		}
		dispatch(setSchRes(response));
	}
}

export function getMyContacts (){
	return (dispatch) => {
	    return callApi('contacts', 'get').then(res => dispatch(setDashboardContacts(res)));
  	};
}

export function setDashboardContacts(response, page = ''){
	// console.log("response ======== ",response);
   	if(response.status){
	    // if(page != ''){
	    //   browserHistory.push(page);
	    // }
	    return {
	        type: MY_CONTACTS,
	        status: response.status,
	        mycontacts: response.data,
	        message : response.message
	    };
  	}else{
	    return {
	      	type: MY_CONTACTS,
	        status: response.status,
	        mycontacts: [],
	        error : response.error
	    };
  	}
}

export function getMachedUsers(obj){
	return callApi('get-matched-user/' + obj.input, 'get');
}

export function getMachedContacts(obj){
	return callApi('getmachedcontacts', 'post', {
      searchData : obj
    });
}

export function AddUsertoContact(obj){
	return (dispatch) => {
	    return callApi('add-contact', 'post', {
	      data: obj,
	    }).then(res => dispatch(setDashboardContacts(res)));
  	};
}

export function requestResponse(obj){
	return (dispatch) => {
	    return callApi('contact-response', 'put', {
	      data: obj,
	    }).then(res => dispatch(setDashboardContacts(res)));
  	};
}

export function requestToken(requestToken, uid){
	return (dispatch) => {
	    return callApi('requesttoken', 'post', {
	      data: {key: requestToken, username: uid },
	    }).then(res => dispatch(setConfData(res)));
  	};	
}

export function setConfData(res){
  console.log("res ===== ", res);
	if(res.status){
		return {
			type: CONF_DATA,
			data: res.data,
			roomSuccess : true
		}
	}else{
		return {
			type: CONF_DATA,
			data: res.data,
			roomSuccess : false
		}
	}
}

export const contactRequest = {
	Requested : 0,
	Accept : 1,
	Request : 2,
	Reject : 3
}

export function getConferenceTopicData (data){
  return (dispatch) => {
    return callApi('fetch-conference-topic/' + data.roomKey, 'get').then(res => dispatch(setConferenceTopic(res)));
  };
}

export function setConferenceTopic(response){

	if(response.status){
    return {
      type: FETCHED_CONFERENCE_TOPIC,
      status: response.status,
      data: response.data,
      roomName : response.roomName,
      roomId : response.roomId,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: CONFERENCE_TOPIC_FETCH_FAILED,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: CONFERENCE_TOPIC_FETCH_FAILED,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function getfiles(data){
	// console.log("getfiles Action:", data);
	return (dispatch) => {
    return callApi('fetch-conference-topic-files/' + data.topicId, 'get').then(res => dispatch(setConferenceTopicFiles(res)));
  };
}

export function setConferenceTopicFiles(response){
	// console.log("response in acions:", response);
	if(response.status){
    return {
      type: FETCHED_CONFERENCE_TOPIC_FILES,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: FETCHED_CONFERENCE_TOPIC_FILES_FAILED,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: FETCHED_CONFERENCE_TOPIC_FILES_FAILED,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function saveFeedback(data){
	return (dispatch) => {
    return callApi('save-feedback', 'post', {
      feedbackData : data
    }).then(res => dispatch(saveFeedbackRequest(res)));
  };
}

export function saveFeedbackRequest(response){
  console.log("response in acions:", response);
  if(response.status){
    return {
      type: SAVE_FEEDBACK_TYPE,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }
}

export function ClearFeeadback() {
  return {
      type: CLEAR_FEEDBACK
  };
}
export function getFeedbackTypeRequest(data){
	return (dispatch) => {
    let query = "rid=" + data;
    return callApi('fetchFeedbackType?' + query, 'get').then(res => dispatch(getFeedbackTypeRequestStatus(res)));
  };
}

export function getFeedbackTypeRequestStatus(response){
	// console.log("response in acions:", response);
	if(response.status){
    return {
      type: FETCHED_FEEDBACK_TYPE,
      status: response.status,
      data: response.data,
      questionnaireData : response.questionnaireData,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: FETCHED_FEEDBACK_TYPE_FAILED,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: FETCHED_FEEDBACK_TYPE_FAILED,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function getMyScheduleRooms() {
  return callApi('schedule-fetch-room', 'get');
}
