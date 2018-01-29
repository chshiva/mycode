import callApi from '../../../../util/apiCaller';
import { browserHistory } from 'react-router';

export const UPDATE_WORKDASHBOARD = 'UPDATE_WORKDASHBOARD';
export const UPDATE_WORKQUESTION = 'UPDATE_WORKQUESTION';
export const CLEAR_WORKDASHBOARD = 'CLEAR_WORKDASHBOARD';
export const FETCHED_CONFERENCE_TOPIC_QUESTIONS = 'FETCHED_CONFERENCE_TOPIC_QUESTIONS';
export const ANSWERS_SUBMITTED = 'ANSWERS_SUBMITTED';
export const FETCHED_CONFERENCE_POLL = 'FETCHED_CONFERENCE_POLL';
export const POLL_PUBLISH = 'POLL_PUBLISH';
export const POLL_CREATED = 'POLL_CREATED';
export const POLL_ANSWER_SUBMITTED = 'POLL_ANSWER_SUBMITTED';
export const DELETE_POLL = 'DELETE_POLL';
export const FETCHED_CONFERENCE_ASSIGNMENT = 'FETCHED_CONFERENCE_ASSIGNMENT';
export const UPDATE_ASSIGNMENT_DATA = 'UPDATE_ASSIGNMENT_DATA';

export function setWorkDashboard(obj){
	return (dispatch) => {
		dispatch(updateWorkDashboard(obj));
	}
}

export function roomChatNotifications (roomKey){
	return (dispatch) => {
		return callApi('room-chat-notifications/' + roomKey, 'get').then( res => dispatch(setRoomChatNotification(res)));
	};
}

export function setRoomChatNotification(response){
	if (response && response.notifications) {
		return {
      type: UPDATE_WORKDASHBOARD,
      data : { roomCount : response.notifications}
  	};
	} else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: UPDATE_WORKDASHBOARD,
      data : { roomCount : 0}
  	};
	} else {
		return {
      type: UPDATE_WORKDASHBOARD,
      data : { roomCount : 0}
  	};
	}
}

export function updateWorkDashboard(obj){
	return {
      	type: UPDATE_WORKDASHBOARD,
        data: obj
    };
}

export function clearWorkDashboard(){
	return (dispatch) => {
		dispatch(setDefaultWorkDashboard());
	}
}

export function setDefaultWorkDashboard(obj){
	return {
      	type: CLEAR_WORKDASHBOARD,
        data: obj
    };
}

export function getPollSubmissionsRequest(data) {
  return (dispatch) => {
    return callApi('fetch-poll-submissions/' + data.roomId + '/' + data.pollId, 'get').then(res => dispatch(setPollSubmissionResponse(res)));
  };
}

export function setPollSubmissionResponse(response) {
  if (response.status) {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : { pollContentData : response.data }
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: UPDATE_WORKDASHBOARD,
      data : { pollContentData : {} }
  	};
	} else {
		return {
      type: UPDATE_WORKDASHBOARD,
      data : { pollContentData : {} }
  	};
	} 
}

export function closeSharedDocument(fileName){
  return callApi('close-shared-document/' + fileName, 'delete');
}

export function getRoomDetails(obj) {
  return (dispatch) => {
    return callApi('fetch-room-details/' + obj.roomKey, 'get').then(res => dispatch(setRoomDetails(res)));
  };
}

export function setRoomDetails(response) {
  if (response.status) {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : { roomId : response.data._id, roomName : response.data.roomName }
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
	} else {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
  }
}

export function getConferenceTopicsList (data){
  return (dispatch) => {
    return callApi('fetch-conference-topic/' + data.roomKey, 'get').then(res => dispatch(setConferenceTopicDetails(res)));
  };
}

export function setConferenceTopicDetails(response) {
  if (response.status) {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : { topiclistData: response.data }
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
	} else {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
  }
}

export function getConferenceTopicContentData (data){
  return (dispatch) => {
    return callApi('fetch-conference-topic-contentdata/' + data.roomId+'/'+data.topicId, 'get').then(res => dispatch(setTopicContentData(res)));
  };
}

export function setTopicContentData(response) {
    if (response.status) {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : { topicContentDataDetails: response.data}
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
	} else {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
  }
}

export function getfiles(data){
  return (dispatch) => {
    return callApi('fetch-conference-topic-files/' + data.topicId, 'get').then(res => dispatch(setConferenceTopicFiles(res)));
  };
}

export function setConferenceTopicFiles(response) {
  if (response.status) {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : { topicFileData: response.data}
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
	} else {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
  }
}

export function getQuestions(data) {
  return (dispatch) => {
    return callApi('fetch-conference-topic-questions/' + data.topicId + '/' + data.questionnaireId, 'get').then(res => dispatch(setConferenceTopicQuestions(res)));
  };
}

export function setConferenceTopicQuestions(response) {
 if(response.status){
    return {
      type: FETCHED_CONFERENCE_TOPIC_QUESTIONS,
      status: response.status,
      questionsData : response.data, 
      submittedData : response.submittedData,
      error : [],
      message : ''
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: FETCHED_CONFERENCE_TOPIC_QUESTIONS,
      status: response.status,
      questionsData: {},
      submittedData : {},
      error : [response.error],
      message : ''
    };
	} else if(response.error){
    return {
      type: FETCHED_CONFERENCE_TOPIC_QUESTIONS,
      status: response.status,
      questionsData: {},
      submittedData : {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: FETCHED_CONFERENCE_TOPIC_QUESTIONS,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function SaveAnswersRequest(data){
 return (dispatch) => {
    return callApi('save-answers', 'post', {
      answerData : data
    }).then(res => dispatch(setConferenceQuestionsAnswers(res)));
  };
}

export function setConferenceQuestionsAnswers(response){
 if(response.status){
    return {
      type: ANSWERS_SUBMITTED,
      status: response.status,
      data : response.data,
      error : [],
      message : response.message
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: ANSWERS_SUBMITTED,
      status: response.status,
      error : [response.error],
      message : ''
    };
	} else if(response.error){
    return {
      type: ANSWERS_SUBMITTED,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: ANSWERS_SUBMITTED,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function getPdfFileData(data) {
  return (dispatch) => {
    return callApi('fetch-conference-topic-pdf-files/'+ data.topicId+'/'+data.fileId, 'get').then(res => dispatch(setConferenceTopicPdfFiles(res)));
  };
}

export function setConferenceTopicPdfFiles(response) {
  if (response.status) {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : { topicPdfFileData: response.data}
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
	} else {
    return {
      type: UPDATE_WORKDASHBOARD,
      data : {}
    };
  }
}

export function getConferencePollData(data) {
  return (dispatch) => {
    return callApi('fetch-conference-poll/' + data.roomKey, 'get').then(res => dispatch(setConferencePollData(res)));
  };
}

export function setConferencePollData(response){
  if(response.status){
    return {
      type: FETCHED_CONFERENCE_POLL,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: FETCHED_CONFERENCE_POLL,
      status: response.status,
      error : [response.error],
      message : ''
    };
	} else if(response.error){
    return {
      type: FETCHED_CONFERENCE_POLL,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: FETCHED_CONFERENCE_POLL,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function publishPollRequest(data) {
  return (dispatch) => {
    return callApi('publish-poll', 'put', data).then(res => dispatch(publishPollResponse(res)));
  };
}

export function publishPollResponse(response){
  if(response.status){
    return {
      type: POLL_PUBLISH,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: POLL_PUBLISH,
      status: response.status,
      error : [response.error],
      message : ''
    };
	} else if(response.error){
    return {
      type: POLL_PUBLISH,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: POLL_PUBLISH,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function createPollRequest(data) {
  if (data.pollData.pollId) {
    let id = data.pollData.pollId;
    delete data['pollData']['pollId'];
    return (dispatch) => {
      return callApi('update-poll/' + id, 'put', data).then(res => dispatch(createPollResponse(res)));
    };
  } else {
    return (dispatch) => {
      return callApi('create-poll', 'post', data).then(res => dispatch(createPollResponse(res)));
    };
  }
}

export function createPollResponse(response){
  if(response.status){
    return {
      type: POLL_CREATED,
      status: response.status,
      data: response.data,
      error : '',
      message : response.message
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: POLL_CREATED,
      status: response.status,
      error : response.error,
      message : response.message
    };
	} else if(response.error){
    return {
      type: POLL_CREATED,
      status: response.status,
      error : response.error,
      message : response.message
    };
  }else{
    return {
      type: POLL_CREATED,
      status: response.status,
      error : 'Internal server error',
      message : ''
    };
  }
}

export function savePollAnswerRequest(data) {
  if (data.pollData.pollId) {
    let id = data.pollData.pollId;
    delete data['pollData']['pollId'];
    return (dispatch) => {
      return callApi('submit-poll/' + id, 'put', data).then(res => dispatch(savePollAnswerResponse(res)));
    };
  }
}

export function savePollAnswerResponse(response){
  if(response.status){
    return {
      type: POLL_ANSWER_SUBMITTED,
      status: response.status,
      data: response.data,
      error : '',
      errorCode:response.errorCode,
      message : response.message
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: POLL_ANSWER_SUBMITTED,
      status: response.status,
      error : response.error,
      message : '',
      errorCode : response.errorCode
    };
	} else if(response.error){
    return {
      type: POLL_ANSWER_SUBMITTED,
      status: response.status,
      error : response.error,
      message : '',
      errorCode : response.errorCode
    };
  }else{
    return {
      type: POLL_ANSWER_SUBMITTED,
      status: response.status,
      error : 'Internal server error',
      message : '',
      errorCode : response.errorCode
    };
  }
}

export function deletePollRequest(data) {
  return (dispatch) => {
    return callApi('delete-poll/' + data.roomId + '/' + data.pollId , 'delete').then(res => dispatch(deletePollResponse(res)));
  };
}

export function deletePollResponse(response){
  if(response.status){
    return {
      type: DELETE_POLL,
      status: response.status,
      data: response.data,
      error : '',
      message : response.message,
      errorCode : ''
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: DELETE_POLL,
      status: response.status,
      error : response.error,
      message : '',
      errorCode : response.errorCode
    };
	} else if(response.error){
    return {
      type: DELETE_POLL,
      status: response.status,
      error : response.error,
      message : '',
      errorCode : response.errorCode
    };
  }else{
    return {
      type: DELETE_POLL,
      status: response.status,
      error : 'Internal server error',
      message : '',
      errorCode : response.errorCode
    };
  }
}

export function getConferenceAssignmentData (data){
  return (dispatch) => {
    return callApi('fetch-conference-assignment/' + data.roomKey, 'get').then(res => dispatch(setConferenceAssignment(res)));
  };
}

export function setConferenceAssignment(response){

  if(response.status){
    return {
      type: FETCHED_CONFERENCE_ASSIGNMENT,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  } else if (response && response.errorCode == 208) {
    browserHistory.push('/');
		return {
      type: FETCHED_CONFERENCE_ASSIGNMENT,
      status: response.status,
      error : [response.error],
      message : ''
    };
	} else if(response.error){
    return {
      type: FETCHED_CONFERENCE_ASSIGNMENT,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: FETCHED_CONFERENCE_ASSIGNMENT,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function updateAssignmentData(obj){
  return {
    type: UPDATE_ASSIGNMENT_DATA,
    data: obj
  };
}

export function deleteAssignmentSubmittedFile(obj) {
  return (dispatch) => {
    return callApi('delete-assignment-submitted-file/' +obj.roomId + '/' + obj.assignmentId, 'delete');
    // .then(res => dispatch(deleteAssignmentSubmittedFileResponse(res)));
  };
}

// export function deleteAssignmentSubmittedFileResponse(response){
//   if (response.status) {
//     return {
//       type: DELETE_SUBMITTED_FILES,
//       status: response.status,
//       data: response.data,
//       message : response.message,
//       error : response.error
//     };
//   } else {
//     return {
//       type: DELETE_SUBMITTED_FILES,
//       status: response.status,
//       error : response.error
//     };
//   }
// }