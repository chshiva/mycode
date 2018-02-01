import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';
import moment from 'moment';

export const EDIT_ROOM 	= 'EDIT_ROOM';
export const SAVE_ROOM 	= 'SAVE_ROOM';
export const GET_ROOM	= 'GET_ROOM';
export const CANCEL_ROOM	= 'CANCEL_ROOM';
export const SAVED_ROOM	= 'SAVED_ROOM';
export const LIST_ROOM	= 'LIST_ROOM';
export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const CLEAR_ROOM = 'CLEAR_ROOM';
export const SAVED_ROOM_USER = 'SAVED_ROOM_USER';
export const SAVED_TOPIC = 'SAVED_TOPIC';
export const SAVED_ROOM_TOPIC = 'SAVED_ROOM_TOPIC';
export const LIST_ROOM_TOPIC = 'LIST_ROOM_TOPIC';
export const LIST_TOPIC_FILES = 'LIST_TOPIC_FILES';
export const SAVED_TOPIC_FILE = 'SAVED_TOPIC_FILE';
export const CANCEL_FILE = 'CANCEL_FILE';
export const SAVED_ROOM_STUDENT = 'SAVED_ROOM_STUDENT';
export const CANCEL_TOPIC = 'CANCEL_TOPIC';
export const SHOW_MODAL = 'SHOW_MODAL';
export const EDIT_MODAL = 'EDIT_MODAL';
export const FETCHED_TOPIC_QUESTIONNAIRE = 'FETCHED_TOPIC_QUESTIONNAIRE';
export const FETCH_TOPIC_QUESTIONNAIRE_FAILED = 'FETCH_TOPIC_QUESTIONNAIRE_FAILED';
export const ASSIGNED_QUESTIONNAIRE = 'ASSIGNED_QUESTIONNAIRE';
export const ASSIGN_QUESTIONNAIRE_FAILED = 'ASSIGN_QUESTIONNAIRE_FAILED';
export const QUESTIONNAIRE_SUCCESSFULLY_UNASSIGNED = 'QUESTIONNAIRE_SUCCESSFULLY_UNASSIGNED';
export const QUESTIONNAIRE_UNASSIGN_FAILED = 'QUESTIONNAIRE_UNASSIGN_FAILED';
export const LIST_RESULT_TOPIC = 'LIST_RESULT_TOPIC';
export const FETCHED_RESULT = 'FETCHED_RESULT';
export const FETCH_RESULT_FAILED = 'FETCH_RESULT_FAILED';
export const LIST_ROOM_FEEDBACK = 'LIST_ROOM_FEEDBACK';
export const SAVED_ROOM_FEEDBACK = 'SAVED_ROOM_FEEDBACK';
export const LIST_LOCATION  = 'LIST_LOCATION';
export const SAVE_LOCATION  = 'SAVE_LOCATION';
export const LIST_ROOM_LOCATION = 'LIST_ROOM_LOCATION';
export const DELETE_ROOM_LOCATION = 'DELETE_ROOM_LOCATION';
export const DELETE_ROOM_LOCATIONPARTICIPANT = 'DELETE_ROOM_LOCATIONPARTICIPANT';
export const LIST_ROOM_QUESTIONNAIRE = 'LIST_ROOM_QUESTIONNAIRE';
export const SAVED_FEEDBACKTYPE = 'SAVED_FEEDBACKTYPE';
export const GET_FEEDBACK_TYPE = 'GET_FEEDBACK_TYPE';
export const SAVED_CODECTYPE = 'SAVED_CODECTYPE';
export const SAVED_ENABLE_LIVE = 'SAVED_ENABLE_LIVE';
export const UPDATED_FILE_DESC = 'UPDATED_FILE_DESC';
export const SAVED_GROUP_STUDENT = 'SAVED_GROUP_STUDENT';
export const LIST_ROOM_ASSIGNMENT = 'LIST_ROOM_ASSIGNMENT';
export const SAVED_ASSIGNMENT = 'SAVED_ASSIGNMENT';
export const SAVED_ROOM_ASSIGNMENT = 'SAVED_ROOM_ASSIGNMENT';
export const SAVED_TOPIC_DATA = 'SAVED_TOPIC_DATA';
export const LIST_ASSIGNMENT_SUBMISSION = 'LIST_ASSIGNMENT_SUBMISSION';
export const DELETE_UPLOADED_FILES = 'DELETE_UPLOADED_FILES';
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';
export const UPLOAD_FILE_ENABLE = 'UPLOAD_FILE_ENABLE';
export const ROOM_TOPIC_ENABLE = 'ROOM_TOPIC_ENABLE';
export const GET_PLAGIARISM_DATA = 'GET_PLAGIARISM_DATA';
export const GET_PLAGIARISM_DATA_FAILED = 'GET_PLAGIARISM_DATA_FAILED';
export const SAVED_COURSE_ATTENDANCE = 'SAVED_COURSE_ATTENDANCE';
export const CLEAR_PLAGIARISM_DATA = 'CLEAR_PLAGIARISM_DATA';
// export const SAVED_STUDENTS_ASSIGNMENT = 'SAVED_STUDENTS_ASSIGNMENT';
export const LIST_COURSE_ATTENDANCE = 'LIST_COURSE_ATTENDANCE';
export const CLEAR_ATTENDANCE_LIST = 'CLEAR_ATTENDANCE_LIST';
export const SAVED_INDIVIDUAL_ATTENDANCE = 'SAVED_INDIVIDUAL_ATTENDANCE';
export const LIST_INDIVIDUAL_ATTENDANCE = 'LIST_INDIVIDUAL_ATTENDANCE';
export const CLEAR_INDIVIDUAL_ATTENDANCE_LIST = 'CLEAR_INDIVIDUAL_ATTENDANCE_LIST';
export const LIST_TOTAL_SCHEDULES = 'LIST_TOTAL_SCHEDULES';
export const CLEAR_TOTAL_SCHEDULES_LIST = 'CLEAR_TOTAL_SCHEDULES_LIST';
export const SAVED_COURSE_TOPICS = 'SAVED_COURSE_TOPICS';
export const SAVED_VIEWED_TOPICS = 'SAVED_VIEWED_TOPICS';
export const LIST_TOPIC_VIEWED_USERS = 'LIST_TOPIC_VIEWED_USERS';
export const INDIVIDUAL_ASSIGNMENT_DATA = 'INDIVIDUAL_ASSIGNMENT_DATA';
export const INDIVIDUAL_ASSIGNMENT_DATA_FAILED = 'INDIVIDUAL_ASSIGNMENT_DATA_FAILED';
export const CLEAR_INDIVIDUAL_ASSIGNMENT_DATA = 'CLEAR_INDIVIDUAL_ASSIGNMENT_DATA';
export const SET_CERTIFICATE_DATA = 'SET_CERTIFICATE_DATA';
export const SET_CERTIFICATE_DATA_FAILED = 'SET_CERTIFICATE_DATA_FAILED';
export const TOGGLE_CERTIFICATE_DOWNLOAD = 'TOGGLE_CERTIFICATE_DOWNLOAD';


export function EditRoom() {
  return {
  		type: EDIT_ROOM,
  		status: true,
  };
}

export function SaveRoom(data) {
  return (dispatch) => {
    return callApi('save-room', 'post', {
      roomdata : data,
    }).then(res => dispatch(RoomStatus(res)));
  };
}

export function UpdateRoom(data, id) {
  delete data["_id"];
  return (dispatch) => {
    return callApi('update-room/' + id, 'put', {
      roomdata : data,
    }).then(res => dispatch(RoomStatus(res)));
  };
  
}

export function RoomStatus(response){
  // console.log("response === ",response);
  if(response.status){
    // browserHistory.push('/admin/room/adduser/'+response.data._id);
    return {
      type: SAVED_ROOM,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: SAVED_ROOM,
        status: response.status,
        // data: {},
        error : [response.error],
        message : ''
      };
    }else{
      return {
        type: SAVED_ROOM,
        status: response.status,
        // data: {},
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: SAVED_ROOM,
      status: response.status,
      // data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function getRoomData (objEntity, pageName){
  //console.log('objEntity',objEntity)
  return (dispatch) => {
    return callApi('fetch-room/' + objEntity.roomId, 'get').then(res => dispatch(setRoom(res, pageName)));
  };
}

export function setRoom(response, page = ''){
  // console.log("response in room === ", response);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: SAVED_ROOM,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: SAVED_ROOM,
      status: response.status,
      data: {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: SAVED_ROOM,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function RoomList(data, currentPage) {
  let sortStr = JSON.stringify(data.sortObj); 
  let query = 'items=' + data.itemsPerPage + '&page=' + data.currentPage+ '&sort=' + sortStr;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('list-room?' + query, 'get').then(res => dispatch(RoomListStatus(res, currentPage)));
  };
}

export function RoomListStatus(response, currentPage){
  if(response.status){
    return {
      type: LIST_ROOM,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  }else if(response.error){
    return {
      type: LIST_ROOM,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    }; 
  }else{
    return {
      type: LIST_ROOM,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

export function RoomStore(data){
	return {
		type: GET_ROOM,
		data: data,
	};	
}

export function ClearRoom(){
  return {
    type: CLEAR_ROOM
  };  
}

export function CancelRoom() {
	return {
		type: CANCEL_ROOM,
		status: false,
    error : [],
    message : ''
	};
}

export function UpdateRoomSchema (schema , data = null){
  return {
    type: UPDATE_SCHEMA,
    schema: schema,
    data: data
  }
}

export function DeleteRoom (objEntity) {
  return (dispatch) => {
    return callApi('delete-room/' + objEntity.roomId, 'delete').then(res => dispatch(RoomLoadList(res)));
  };
}

export function RoomLoadList (response) {
  //console.log("response === ",response);
  if(response.status){
    // browserHistory.push('/admin/room/list');
    return {
      type: CANCEL_ROOM,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: CANCEL_ROOM,
      status: response.status,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: CANCEL_ROOM,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
  
}

export function SaveRoomUser () {
  //console.log("SaveRoomUser function-action");
  return {
    type : CANCEL_ROOM,
    status: false,
  }
}

export function addRoomUser (objEntity) {
  //console.log("AddRoomUser function-action");
  return (dispatch) => {
    return callApi('add-room-user', 'post', {
      roomdata: {
        // uid: objEntity.uid,
        userId: objEntity.userId,
        roomId: objEntity.roomId,
      },
    }).then(res => dispatch(setRoomUsers(res)));
  };
}

export function setRoomUsers (response) {
  if(response.status){
    return {
      type : SAVED_ROOM_USER,
      data: response.data,
      status: response.status,
      message : response.message
    };
  }else if(response.error){
    return {
      type : SAVED_ROOM_USER,
      status: response.status,
      error : [response.error]
    };
  }else{
    return {
      type : SAVED_ROOM_USER,
      status: response.status,
      error : ['Internal server error']
    };
  }
  
}

export function addRoomStudent (objEntity) {
  
  return (dispatch) => {
    return callApi('addroomstudent', 'post', {
      studentdata : objEntity
    }).then(res => dispatch(setRoomStudents(res)));
  };
}

export function setRoomStudents (response) {
  // console.log(response);
  if(response.status){
    return {
      type : SAVED_ROOM_STUDENT,
      data: response.data,
      status: response.status,
      message : response.message
    };
  }else if(response.error){
    return {
      type : SAVED_ROOM_STUDENT,
      data: {},
      status: response.status,
      error : [response.error]
    };
  }else{
    return {
      type : SAVED_ROOM_STUDENT,
      data: {},
      status: response.status,
      error : ['Internal server error']
    };
  }
}

export function getStudentData (objEntity){
  //console.log('objEntity',objEntity)
  return (dispatch) => {
    return callApi('fetchstudent/' + objEntity.roomId + '/' + objEntity.instId, 'get').then(res => dispatch(setRoomStudents(res)));
  };
}

export function removeRoomStud (objEntity) {
  return (dispatch) => {
    return callApi('removeroomstud/' + objEntity.roomId + '/' + objEntity.instId + '/' + objEntity.studId , 'delete').then(res => dispatch(setRoomStudents(res)));
  };
}

export function removeRoomUser (objEntity) {
  //console.log("RemoveRoomUser function-action");
  return (dispatch) => {
    return callApi('remove-room-user/' + objEntity.roomId + '/' + objEntity.userId, 'delete').then(res => dispatch(setRoomUsers(res)));
  };
}

export function SaveRoomTopic(data) {
  if (data._id) {
    let id = data._id;
    delete data["_id"];
    return (dispatch) => {
      return callApi('update-room-topic/' + id, 'put', {
        roomtopicdata : data,
      }).then(res => dispatch(RoomTopicStatus(res)));
    };
  } else {
    return (dispatch) => {
      return callApi('save-room-topic', 'post', {
        roomtopicdata : data,
      }).then(res => dispatch(RoomTopicStatus(res)));
    };
  }
}

export function RoomTopicStatus(response){
  //console.log("response === ",response);
  //console.log("data",response.data.roomId)
  if(response.status){
    browserHistory.push('/admin/room/listtopic/'+response.data.roomId);
    return {
      type: SAVED_TOPIC,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: SAVED_TOPIC,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }else{
      return {
        type: SAVED_TOPIC,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: SAVED_TOPIC,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function RoomTopicList(data, currentPage) {
  let sortStr = JSON.stringify(data.sortObj);
  let query = 'roomId=' + data.roomId + '&items=' + data.itemsPerPage + '&page=' + data.currentPage + '&sort=' + sortStr;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('list-room-topic?' + query, 'get').then(res => dispatch(RoomTopicListStatus(res, currentPage)));
  };
}

export function RoomTopicListStatus(response, currentPage){
  if(response.status){
    return {
      type: LIST_ROOM_TOPIC,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  }else if(response.error){
    return {
      type: LIST_ROOM_TOPIC,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    }; 
  }else{
    return {
      type: LIST_ROOM_TOPIC,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

export function getRoomTopicData (objEntity, pageName){
  //console.log('objEntity',objEntity)
  return (dispatch) => {
    return callApi('fetch-room-topic/' + objEntity.roomId + '/' + objEntity.topicId, 'get').then(res => dispatch(setRoomTopic(res, pageName)));
  };
}

export function setRoomTopic(response, page = ''){
  //console.log('getRoomTopicData',response);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: SAVED_ROOM_TOPIC,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: SAVED_ROOM_TOPIC,
      status: response.status,
      data: {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: SAVED_ROOM_TOPIC,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}


export function SaveEditorContent (data){
  if (data._id) {
    let id = data._id;
    delete data["_id"];
    return (dispatch) => {
      return callApi('update-room-topic/' + id, 'put', {
        roomtopicdata : data,
      }).then(res => dispatch(SetEditorContent(res)));
    };
  } else {
    return (dispatch) => {
      return callApi('save-room-topic', 'post', {
        roomtopicdata : data,
      }).then(res => dispatch(SetEditorContent(res)));
    };
  }
}

export function SetEditorContent(response){
  //console.log("response === ",response);
  //console.log("data",response.data.roomId)
  if(response.status){
    browserHistory.push('/admin/room/listtopic/'+response.data.roomId);
    return {
      type: SAVED_TOPIC,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: SAVED_TOPIC,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }else{
      return {
        type: SAVED_TOPIC,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: SAVED_TOPIC,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}


export function RoomTopicFileList(data, currentPage){
  let query = 'roomId=' + data.roomId + '&topicId=' + data.topicId  + 
  '&items=' + data.itemsPerPage + '&page=' + data.currentPage;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  if (data && data.filterValue) {
    query += '&filter=' + data.filterValue;
  }
  return (dispatch) => {
    return callApi('list-topic-files?' + query, 'get').then(res => dispatch(TopicUploadListStatus(res, currentPage)));
  };
}

export function TopicUploadListStatus(response, currentPage){
  //console.log('response',response)
  if(response.status){
    return {
      type: LIST_TOPIC_FILES,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  }else if(response.error){
    return {
      type: LIST_TOPIC_FILES,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    }; 
  }else{
    return {
      type: LIST_TOPIC_FILES,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

export function NewFileUpload(response){
  
  //console.log('res',response)
  if(response.status){
    browserHistory.push("/admin/room/uploadtotopic/"+response.data.topicId+'/'+response.data.roomId);
    return {
      type: SAVED_TOPIC_FILE,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: SAVED_TOPIC_FILE,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }else{
      return {
        type: SAVED_TOPIC_FILE,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: SAVED_TOPIC_FILE,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function DeleteFile (objEntity) {
  return (dispatch) => {
    return callApi('delete-file/' + objEntity.roomId + '/' + objEntity.topicId + '/' + objEntity._id, 'delete').then(res => dispatch(TopicFileLoadList(res)));
  };
}

export function DeleteMultipleFile (objEntity) {
  return (dispatch) => {
    return callApi('delete-multiple-files/' + objEntity.roomId + '/' + objEntity.topicId + '/' + objEntity.idsDelete, 'delete').then(res => dispatch(TopicFileLoadList(res)));
  };
}

export function TopicFileLoadList (response) {
  //console.log("TopicFileLoadList === ",response);
  //console.log(response)
  if(response.status){
    return {
      type: CANCEL_FILE,
      status: false,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: CANCEL_FILE,
      status: false,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: CANCEL_FILE,
      status: false,
      error : ['Internal server error'],
      message : ''
    };
  }
  
}

export function RoomTopicStore(data){
  return {
    type: SAVED_ROOM_TOPIC,
    data: data,
  };  
}

export function DeleteTopic (objEntity) {
  return (dispatch) => {
    return callApi('delete-room-topic/' + objEntity.roomId+'/'+objEntity._id, 'delete').then(res => dispatch(TopicLoadList(res)));
  };
}

export function TopicLoadList (response) {
  //console.log("TopicFileLoadList === ",response);
  //console.log(response)
  if(response.status){
    return {
      type: CANCEL_TOPIC,
      status: false,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: CANCEL_TOPIC,
      status: false,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: CANCEL_TOPIC,
      status: false,
      error : ['Internal server error'],
      message : ''
    };
  }
  
}

export function showModal(data) {
  return {
    type: SHOW_MODAL,
    data,
  };
}

export function editModal(data) {
  return {
    type: EDIT_MODAL,
    data,
  };
}

export function getTopicQuestionnaireData (objEntity){
  return (dispatch) => {
    return callApi('fetch-topic-questionnaire/' + objEntity.roomId + '/' + objEntity.topicId, 'get').then(res => dispatch(setTopicQuestionnaire(res)));
  };
}

export function setTopicQuestionnaire(response){
  if(response.status){
    return {
      type: FETCHED_TOPIC_QUESTIONNAIRE,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: FETCH_TOPIC_QUESTIONNAIRE_FAILED,
      status: response.status,
      data: {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: FETCH_TOPIC_QUESTIONNAIRE_FAILED,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function AssignQuestionnaireRequest(data) {
  if (data.questionnaire.editId == '') {
    return (dispatch) => {
      return callApi('assign-questionnaire', 'post', {
        questionnaireData : {
          data,
        }
      }).then(res => dispatch(QuestionnaireStatus(res)));
    };
  } else if (data.questionnaire.editId != '') {
    return (dispatch) => {
      return callApi('update-assigned-questionnaire', 'put', {
        questionnaireData : {
          data,
        }
      }).then(res => dispatch(QuestionnaireStatus(res)));
    };
  }
}

export function QuestionnaireStatus(response){
  // console.log("response === ",response);
  if(response.status){
    return {
      type: ASSIGNED_QUESTIONNAIRE,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
        err.push(obj.message);
      });
      return {
        type: ASSIGN_QUESTIONNAIRE_FAILED,
        status: response.status,
        error : err,
        message : ''
      };
    }else{
      return {
        type: ASSIGN_QUESTIONNAIRE_FAILED,
        status: response.status,
        error : [response.error],
        openFrom : response.openFrom,
        closeFrom : response.closeFrom,
        message : ''
      };
    }
  }else{
    return {
      type: ASSIGN_QUESTIONNAIRE_FAILED,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function unassignQuestionnaireRequest(objEntity) {
  // console.log('objEntity', objEntity);
  return (dispatch) => {
    return callApi('unassign-questionnaire/' + objEntity.questionnaireId + '/' + objEntity.topicId, 'delete').then(res => dispatch(unassignQuestionnaireResponse(res)))
  }
}

export function confirmedUnassignQuestionnaireRequest(objEntity) {
  // console.log('objEntity', objEntity);
  return (dispatch) => {
    return callApi('confirmed-unassign-questionnaire/' + objEntity.questionnaireId + '/' + objEntity.topicId, 'delete').then(res => dispatch(unassignQuestionnaireResponse(res)))
  }
}
  
export function unassignQuestionnaireResponse (response) {
  // console.log("response === ",response);
  if(response.status){
    return {
      type: QUESTIONNAIRE_SUCCESSFULLY_UNASSIGNED,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: QUESTIONNAIRE_UNASSIGN_FAILED,
      status: false,
      error : response.error,
      httpStatusCode : response.httpStatusCode,
      questionnaireId : response.questionnaireId,
      message : ''
    };

  }else{
    return{
      type: QUESTIONNAIRE_UNASSIGN_FAILED,
      status: false,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function RoomFeedbackList(data, currentPage) {
   //console.log(data);
  let query = 'itemsPerPage=' + data.itemsPerPage + '&currentPage=' + data.currentPage + '&roomId=' + data.roomId;

  return (dispatch) => {
      return callApi('room-feedback-list?' + query, 'get').then(res => dispatch(RoomFeedbackListStatus(res, currentPage)));
    };
}

export function RoomFeedbackListStatus(response, currentPage){
 // console.log("response at action", response);
  
  if(response.status){
    return {
      type: LIST_ROOM_FEEDBACK,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      roomId: response.roomId,
      error : []
    };  
  }else if(response.error){
    return {
      type: LIST_ROOM_FEEDBACK,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    }; 
  }else{
    return {
      type: LIST_ROOM_FEEDBACK,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

export function TopicResultList(data, currentPage){
  let query = 'roomId=' + data.roomId + '&topicId=' + data.topicId + 
  '&questionnaireId=' + data.questionnaireId + '&items=' + data.itemsPerPage +
  '&page=' + data.currentPage;
  return (dispatch) => {
    return callApi('list-result-topic?' + query, 'get').then(res => dispatch(TopicResultListStatus(res, currentPage)));
  };
}

export function TopicResultListStatus(response, currentPage){
  if(response.status){
    return {
      type: LIST_RESULT_TOPIC,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  }else if(response.error){
    return {
      type: LIST_RESULT_TOPIC,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    }; 
  }else{
    return {
      type: LIST_RESULT_TOPIC,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

export function getResultData (objEntity){
  // console.log('objEntity',objEntity)
  return (dispatch) => {
    return callApi('fetch-result/' + objEntity , 'get').then(res => dispatch(setResult(res)));
  };
}

export function setResult(response){
  // console.log("response in room === ", response);
  if(response.status){
    return {
      type: FETCHED_RESULT,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: FETCH_RESULT_FAILED,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: FETCH_RESULT_FAILED,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function getRoomFeedbackData (feedbackId, pageName){
  return (dispatch) => {
    return callApi('fetch-room-feedback/' + feedbackId, 'get').then(res => dispatch(setRoomFeedback(res, pageName)));
  };
}

export function setRoomFeedback(response, page = ''){
  //console.log("setRoomFeedback------", response);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: SAVED_ROOM_FEEDBACK,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: SAVED_ROOM_FEEDBACK,
      status: response.status,
      data: {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: SAVED_ROOM_FEEDBACK,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}
export function getLocationList(){
  return (dispatch) => {
    return callApi('getLocationList', 'get').then(res => dispatch(LocationListStatus(res)));
  };
}

export function LocationListStatus(response){
  if(response.status){
    return {
      status : response.status,
      type: LIST_LOCATION,
      listData: response.data,
      error : []
    };
  }else if(response.error){
    return {
      status : response.status,
      type: LIST_LOCATION,
      listData: {},
      error : [response.error]
    };
  }else{
    return {
      status : response.status,
      type: LIST_LOCATION,
      listData: {},
      error : ['Internal server error']
    };
  } 
}


export function getinstructorStudents(data){
  // console.log("getinstructorStudents Actions:", data);
  let query = "roomId=" + data.roomId + "&instructorId=" + data.instructorId;
  return (dispatch) => {
    return callApi('getRoomInstructorStudentsList?' + query, 'get')
  };
}


export function saveRoomLocation(data){
  // console.log("saveRoomLocation Actions:", data);
  return (dispatch) => {
    return callApi('saveRoomLocation', 'post', {
      data,
    }).then(res => dispatch(LocationSavedStatus(res)));
  };
}

export function LocationSavedStatus(response){
  // console.log("response === ",response);
  if(response.status){
    browserHistory.push('/admin/room/listlocation/'+response.roomId);
    return {
      type: SAVE_LOCATION,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: SAVE_LOCATION,
        status: response.status,
        error : [response.error],
        message : ''
      };
    }else{
      return {
        type: SAVE_LOCATION,
        status: response.status,
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: SAVE_LOCATION,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}


export function getRoomLocations(data){
  // console.log("getLocationList Actions:", data);
  let query = "roomId=" + data;
  return (dispatch) => {
    return callApi('getRoomLocations?' + query, 'get').then(res => dispatch(RoomLocationListStatus(res)));
  };
}

export function RoomLocationListStatus(response){
  // console.log("response in action",response )
  if(response.status){
    return {
      status : response.status,
      type: LIST_ROOM_LOCATION,
      listData: response.data,
      error : []
    };
  }else if(response.error){
    return {
      status : response.status,
      type: LIST_ROOM_LOCATION,
      listData: {},
      error : [response.error]
    };
  }else{
    return {
      status : response.status,
      type: LIST_ROOM_LOCATION,
      listData: {},
      error : ['Internal server error']
    };
  } 
}


export function deleteRoomLocation(data) {
  return (dispatch) => {
    let query = "roomLocationId=" + data.roomLocationId + "&roomId=" + data.roomId; 
    return callApi('delete-room-location?' + query, 'delete').then(res => dispatch(deletedRoomLocationStatus(res)));
  };
}


export function deletedRoomLocationStatus (response) {
  if(response.status){
    return {
      type: DELETE_ROOM_LOCATION,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: DELETE_ROOM_LOCATION,
      status: response.status,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: DELETE_ROOM_LOCATION,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }  
}


export function deleteRoomLocationParticipant(data){
  // console.log("deleteRoomLocationParticipant1:",data);
  return (dispatch) => {
    let query = "roomId=" + data.roomId + "&roomLocationId=" + data.roomLocationId + "&roomParticipantId=" + data.roomParticipantId;
    return callApi('delete-room-location-participant?' + query, 'delete').then(res => dispatch(DeletedRoomLocationParticipantStatus(res)));
  };
}


export function DeletedRoomLocationParticipantStatus (response) {
  // console.log("response:",response);
  if(response.status){
    return {
      type: DELETE_ROOM_LOCATIONPARTICIPANT,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: DELETE_ROOM_LOCATIONPARTICIPANT,
      status: response.status,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: DELETE_ROOM_LOCATIONPARTICIPANT,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }  
}

export function getQuestionnaire() {
  return (dispatch) => {
    return callApi('getQuestionnaireData', 'get').then(res => dispatch(GetQuestionnaireListStatus(res)));
  };
}

export function GetQuestionnaireListStatus(response){
  // console.log("response in action",response )
  if(response.status){
    return {
      status : response.status,
      type: LIST_ROOM_QUESTIONNAIRE,
      listData: response.data,
      error : []
    };
  }else if(response.error){
    return {
      status : response.status,
      type: LIST_ROOM_QUESTIONNAIRE,
      listData: {},
      error : [response.error]
    };
  }else{
    return {
      status : response.status,
      type: LIST_ROOM_QUESTIONNAIRE,
      listData: {},
      error : ['Internal server error']
    };
  } 
}


export function saveFeedbackTypeRequest(data) {
  return (dispatch) => {
      return callApi('saveRoomFeedbackType/'+data.roomId, 'put', {
        data,
      }).then(res => dispatch(SaveFeedbackTypeRequest(res)));
    };
}

export function SaveFeedbackTypeRequest(response){
  //console.log("response === ",response);
  if(response.status){
    // browserHistory.push('/admin/room/adduser/'+response.data._id);
    return {
      type: SAVED_FEEDBACKTYPE,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: SAVED_FEEDBACKTYPE,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }else{
      return {
        type: SAVED_FEEDBACKTYPE,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: SAVED_FEEDBACKTYPE,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}


export function getFeedbackTypeValue(data){
  // console.log("getLocationList Actions:", data);
  return (dispatch) => {
    let query = "roomId=" + data;
    return callApi('getRoomFeedbackType?' + query, 'get').then(res => dispatch(getFeedbackTypeValueStatus(res)));
  };
}

export function getFeedbackTypeValueStatus(response){
  if(response.status){
    return {
      status : response.status,
      type: GET_FEEDBACK_TYPE,
      listData: response.data,
      error : []
    };
  }else if(response.error){
    return {
      status : response.status,
      type: GET_FEEDBACK_TYPE,
      listData: {},
      error : [response.error]
    };
  }else{
    return {
      status : response.status,
      type: GET_FEEDBACK_TYPE,
      listData: {},
      error : ['Internal server error']
    };
  } 
}

export function saveCodecTypeRequest(data) {
  return (dispatch) => {
      return callApi('saveRoomCodecType/'+data.roomId, 'put', {
        data,
      }).then(res => dispatch(SaveCodecTypeRequest(res)));
    };
}

export function SaveCodecTypeRequest(response){
  //console.log("response === ",response);
  if(response.status){
    // browserHistory.push('/admin/room/adduser/'+response.data._id);
    return {
      type: SAVED_CODECTYPE,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else {
    return {
      type: SAVED_CODECTYPE,
      status: response.status,
      data: {},
      error : [response.error],
      message : ''
    };
  }
}

export function saveEnableLiveRequest(data) {
  return (dispatch) => {
      return callApi('saveRoomEnableLive/'+data.roomId, 'put', {
        data,
      }).then(res => dispatch(SaveEnableLiveRequest(res)));
    };
}

export function SaveEnableLiveRequest(response){
  if(response.status){
    return {
      type: SAVED_ENABLE_LIVE,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else {
    return {
      type: SAVED_ENABLE_LIVE,
      status: response.status,
      data: {},
      error : [response.error],
      message : ''
    };
  }
}

export function setUploadFileDescRequest(data, currentPage){
  return (dispatch) => {
    return callApi('set-upload-file-desc', 'post', {
      data,
    }).then(res => dispatch(UploadFileDescStatus(res, currentPage)));
  };
}

export function UploadFileDescStatus(response, currentPage){
  if(response.status){
    return {
      status : response.status,
      type: UPDATED_FILE_DESC,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      message: response.message,
      error : []
    };
  }else if(response.error){
    return {
      status : response.status,
      type: UPDATE_FILE_DESC_FAILED,
      error : [response.error]
    };
  }else{
    return {
      status : response.status,
      type: UPDATE_FILE_DESC_FAILED,
      error : ['Internal server error']
    };
  } 
}


export function addGroupStudentRequest (objEntity) {
  //console.log("AddRoomUser function-action");
  return (dispatch) => {
    return callApi('addGroupStudent', 'post', {
      studentdata : objEntity
    }).then(res => dispatch(addGroupStudentRequestStatus(res)));
  };
}

export function addGroupStudentRequestStatus (response) {
  // console.log(response);
  if(response.status){
    return {
      type : SAVED_GROUP_STUDENT,
      data: response.data,
      status: response.status,
      message : response.message
    };
  }else if(response.error){
    return {
      type : SAVED_GROUP_STUDENT,
      data: {},
      status: response.status,
      error : [response.error]
    };
  }else{
    return {
      type : SAVED_GROUP_STUDENT,
      data: {},
      status: response.status,
      error : ['Internal server error']
    };
  }
}

export function RoomAssignmentList(data, currentPage) {
  let query = 'roomId=' + data.roomId + '&items=' + data.itemsPerPage + '&page=' + data.currentPage;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('list-room-assignment?' + query, 'get').then(res => dispatch(RoomAssignmentListStatus(res, currentPage)));
  };
}

export function RoomAssignmentListStatus(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_ROOM_ASSIGNMENT,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_ROOM_ASSIGNMENT,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_ROOM_ASSIGNMENT,
      error : ['Internal server error']
    };
  } 
}

export function RoomAssignmentStore(data){
  return {
    type: SAVED_ROOM_ASSIGNMENT,
    data: data,
  };  
}

export function SaveRoomAssignment(data) {
  if (data.assignmentId) {
    let id = data.assignmentId;
    delete data["assignmentId"];
    return (dispatch) => {
      return callApi('update-room-assignment/' + id, 'put', {
        roomAssignmentData : data,
      }).then(res => dispatch(RoomAssignmentStatus(res)));
    };
  } else {
    return (dispatch) => {
      return callApi('save-room-assignment', 'post', {
        roomAssignmentData : data,
      }).then(res => dispatch(RoomAssignmentStatus(res)));
    };
  }
}

export function RoomAssignmentStatus(response) {
  if (response.status) {
    browserHistory.push('/admin/room/assignments/'+response.data.roomId);
    return {
      type: SAVED_ASSIGNMENT,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  } else if(response.error) {
    if (response.error.errors) {
      return {
        type: SAVED_ASSIGNMENT,
        status: response.status,
        error : [response.error],
        message : ''
      };
    } else {
      return {
        type: SAVED_ASSIGNMENT,
        status: response.status,
        error : [response.error],
        message : ''
      };
    }
  } else {
    return {
      type: SAVED_ASSIGNMENT,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function getTopicDataRequest (roomId) {
  return (dispatch) => {
    return callApi('fetch-topic-data/' + roomId , 'get').then(res => dispatch(setTopicData(res)));
  };
}

export function setTopicData(response) {
  if (response.status) {
    return {
      type: SAVED_TOPIC_DATA,
      data: response.data,
      error : [],
      message : ''
    };
  } else if (response.error) {
    return {
      type: SAVED_TOPIC_DATA,
      error : [response.error],
      message : ''
    };
  } else {
    return {
      type: SAVED_TOPIC_DATA,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function assignmentSubmissionList(data, currentPage) {
  let query = 'roomId=' + data.roomId + '&assignmentId=' + data.assignmentId + '&items=' + data.itemsPerPage + '&page=' + data.currentPage;
  return (dispatch) => {
    return callApi('list-assignment-submission?' + query, 'get').then(res => dispatch(assignmentSubmissionListStatus(res, currentPage)));
  };
}

export function assignmentSubmissionListStatus(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_ASSIGNMENT_SUBMISSION,
      listData: response.data.submissions,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_ASSIGNMENT_SUBMISSION,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_ASSIGNMENT_SUBMISSION,
      error : ['Internal server error']
    };
  } 
}

export function getAssignmentDataRequest (obj) {
  return (dispatch) => {
    return callApi('fetch-assignment-data/' + obj.roomId + '/' + obj.assignmentId , 'get').then(res => dispatch(setAssignmentData(res)));
  };
}

export function setAssignmentData(response) {
  if (response.status) {
    return {
      type: SAVED_ROOM_ASSIGNMENT,
      data: response.data,
      error : [],
      message : ''
    };
  } else if (response.error) {
    return {
      type: SAVED_ROOM_ASSIGNMENT,
      error : [response.error],
      message : ''
    };
  } else {
    return {
      type: SAVED_ROOM_ASSIGNMENT,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function deleteAssignmentUploadedFile(obj) {
  return (dispatch) => {
    return callApi('delete-assignment-uploaded-file/' +obj.roomId + '/' + obj.assignmentId, 'delete').then(res => dispatch(deleteAssignmentUplaodedFileResponse(res)));
  };
}

export function deleteAssignmentUplaodedFileResponse(response){
  if (response.status) {
    return {
      type: DELETE_UPLOADED_FILES,
      status: response.status,
      data: response.data,
      message : response.message,
      error : response.error
    };
  } else {
    return {
      type: DELETE_UPLOADED_FILES,
      status: response.status,
      error : response.error
    };
  }
}

export function deleteAssignmentRequest(obj) {
  return (dispatch) => {
    return callApi('delete-assignment/' + obj.roomId + '/' + obj.assignmentId, 'delete').then(res => dispatch(deleteAssignmentResponse(res)));
  };
}

export function deleteAssignmentResponse(response){
  if (response.status) {
    return {
      type: DELETE_ASSIGNMENT,
      status: response.status,
      message : response.message,
      error : response.error
    };
  } else {
    return {
      type: DELETE_ASSIGNMENT,
      status: response.status,
      error : response.error
    };
  }
}

export function handleFileEnable (status, id) {
  console.log("actions",status, id)
  console.log("actions1.....", id)
  return (dispatch) => {
    return callApi('upload-file-enable/'+ id, 'put', {
      fileEnable : { isEnable : status}
    }).then(res => dispatch(handleFileLoadList(res)));
  };
}

export function handleFileLoadList(response){
  console.log("response",response)
  if(response.status){
    return {
      type: UPLOAD_FILE_ENABLE,
      status: response.status,
      id: response.id,
      fileData: response.res,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: UPLOAD_FILE_ENABLE,
        status: response.status,
        id: null,
        error : [response.error],
        message : ''
      };
    }else{
      return {
        type: UPLOAD_FILE_ENABLE,
        status: response.status,
        id: null,
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: UPLOAD_FILE_ENABLE,
      status: response.status,
      id: null,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function handleTopicLoadList(response) {

  if (response.status) {
    return {
      type: ROOM_TOPIC_ENABLE,
      status: response.status,
      id: response.id,
      topicData:response.res,
      error : [],
      message : response.message
    };
  } else if (response.error){
    if(response.error.errors){
      return {
        type: ROOM_TOPIC_ENABLE,
        status: response.status,
        id: null,
        error : [response.error],
        message : ''
      };
    } else {
      return {
        type: ROOM_TOPIC_ENABLE,
        status: response.status,
        id: null,
        error : [response.error],
        message : ''
      };
    }
  } else {
    return {
      type: TOPIC_ENABLE,
      status: response.status,
      id: null,
      error : ['Internal server error'],
      message : ''
    };
  }

}

export function handleTopicEnable (status, id) {
  return (dispatch) => {
    return callApi('enable-room-topic/'+ id, 'put', {
      topicEnable : { topicEnable : status}
    }).then(res => dispatch(handleTopicLoadList(res)));
  };
}


export function getPlagiarismData (obj) {
  return (dispatch) => {
    return callApi('fetch-plagiarism-data/' + obj.roomId + '/' + obj.assignmentId + '/' + obj.studentId , 'get').then(res => dispatch(getPlagiarismDataResponse(res)));
  };
}

export function getPlagiarismDataResponse(response) {
  if (response.status) {
    return {
      type: GET_PLAGIARISM_DATA,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  } else if (response.error) {
    return {
      type: GET_PLAGIARISM_DATA_FAILED,
      status: response.status,
      data: {},
      error : response.error,
      message : ''
    };
  } else {
    return {
      type: GET_PLAGIARISM_DATA_FAILED,
      status: response.status,
      data : {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function ClearPlagiarism(){
  return {
    type: CLEAR_PLAGIARISM_DATA
  };  
}

// export function setStudentsAssignment(response) {
//   if (response.status) {
//     return {
//       type: SAVED_STUDENTS_ASSIGNMENT,
//       status: response.status,
//       data: response.data,
//     };
//   } else if (response.error) {
//     return {
//       type: SAVED_STUDENTS_ASSIGNMENT,
//       status: response.status,
//     };
//   } else {
//     return {
//       type: SAVED_STUDENTS_ASSIGNMENT,
//       status: response.status,
//     };
//   }
// }

// export function getStudentsAssignmentDataRequest (objEntity) {
//   return (dispatch) => {
//     return callApi('fetch-students-assignment/'+objEntity.roomId+'/'+objEntity.assignmentId,'get').then(res => dispatch(setStudentsAssignment(res)));
//   }
// }

export function getPlagiarismCredits () {
  return (dispatch) => {
    return callApi('fetch-plagiarism-credits')
  };
}

export function setCourseAttendance(response){
  if (response.status) {
    return {
      type: SAVED_COURSE_ATTENDANCE,
      status: response.status,
      data: response.data,
    };
  } else if (response.error) {
    return {
      type: SAVED_COURSE_ATTENDANCE,
      status: response.status,
    };
  } else {
    return {
      type: SAVED_COURSE_ATTENDANCE,
      status: response.status,
    };
  }
}

export function getCourseAttendanceRequest (courseId,fromDate,toDate) {
  let query = '?rId=' + courseId +'&fromDate=' + moment(fromDate).utc().format("x")  +'&toDate=' + moment(toDate).utc().format("x");
  return (dispatch) => {
    return callApi('fetch-course-attendance' + query, 'get').then(res => dispatch(setCourseAttendance(res)));
  };
}

export function getAttendanceList(objEntity, currentPage) {
  return (dispatch) => {
    return callApi('list-activeusers', 'post',{
      usersData: objEntity
    }).then(res => dispatch(SetAttendanceList(res, currentPage)));
  };
}

export function SetAttendanceList(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_COURSE_ATTENDANCE,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_COURSE_ATTENDANCE,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_COURSE_ATTENDANCE,
      error : ['Internal server error']
    };
  } 
}

export function clearAttendanceList() {
  return {
    type: CLEAR_ATTENDANCE_LIST
  };
}

export function setIndividualAttendance(response) {
 if (response.status) {
    return {
      type: SAVED_INDIVIDUAL_ATTENDANCE,
      status: response.status,
      data: response.data,
    };
  } else if (response.error) {
    return {
      type: SAVED_INDIVIDUAL_ATTENDANCE,
      status: response.status,
    };
  } else {
    return {
      type: SAVED_INDIVIDUAL_ATTENDANCE,
      status: response.status,
    };
  }
}

export function getIndividualAttendance(objEntity) {
  let query = '?rId=' + objEntity.courseId +'&uId='+objEntity.userId+'&fromDate=' + moment(objEntity.fromDate).utc().format("x")  +'&toDate=' + moment(objEntity.toDate).utc().format("x");
  return (dispatch) => {
    return callApi('fetch-individual-attendance'+query,'get').then(res => dispatch(setIndividualAttendance(res)));
  }
}

export function SetIndividualAttendanceList(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_INDIVIDUAL_ATTENDANCE,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_INDIVIDUAL_ATTENDANCE,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_INDIVIDUAL_ATTENDANCE,
      error : ['Internal server error']
    };
  } 
}

export function getIndividualAttendanceList (objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-individual-attendance', 'post',{
      attendanceData:objEntity
    }).then(res => dispatch(SetIndividualAttendanceList(res, currentPage)));
  };
}

export function clearIndividualAttendanceList() {
  return {
    type: CLEAR_INDIVIDUAL_ATTENDANCE_LIST
  };  
}

export function setTotalSchedulesRequest(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_TOTAL_SCHEDULES,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_TOTAL_SCHEDULES,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_TOTAL_SCHEDULES,
      error : ['Internal server error']
    };
  }  
}

export function getTotalSchedulesList (objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-total-schedules', 'post',{
      scheduleData:objEntity
    }).then(res => dispatch(setTotalSchedulesRequest(res, currentPage)));
  };
}


export function clearTotalSchedulesList() {
  return {
    type: CLEAR_TOTAL_SCHEDULES_LIST
  };  
}

export function setTopicViewedUsers(response, currentPage) {
  if (response.status) {
    return {
      type: SAVED_VIEWED_TOPICS,
      status: response.status,
      data: response.data,
    };
  } else if (response.error) {
    return {
      type: SAVED_VIEWED_TOPICS,
      status: response.status,
    };
  } else {
    return {
      type: SAVED_VIEWED_TOPICS,
      status: response.status,
    };
  }
}

export function getTopicViewedUsersRequest(objEntity) {
let query = '?rId=' +objEntity.courseId +'&topicId='+objEntity.topicId;
  return (dispatch) => {
    return callApi('fetch-topic-viewed-users' + query, 'get').then(res => dispatch(setTopicViewedUsers(res)));
  };
}

export function setTopicViewedUsersList(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_TOPIC_VIEWED_USERS,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_TOPIC_VIEWED_USERS,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_TOPIC_VIEWED_USERS,
      error : ['Internal server error']
    };
  }  
}

export function getTopicViewedUsersList (objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-topic-viewed-users', 'post',{
      topicViewedUsersData:objEntity
    }).then(res => dispatch(setTopicViewedUsersList(res, currentPage)));
  };
}

export function setCourseTopics (response) {
  if(response.status){
    return {
      type : SAVED_COURSE_TOPICS,
      data: response.data,
      roomData: response.roomData,
      status: response.status,
      message : response.message
    };
  }else if(response.error){
    return {
      type : SAVED_COURSE_TOPICS,
      data: {},
      roomData: {},
      status: response.status,
      error : [response.error]
    };
  }else{
    return {
      type : SAVED_COURSE_TOPICS,
      data: {},
      status: response.status,
      error : ['Internal server error']
    };
  }
  
}

export function getCourseTopicsData (courseId) {
  return (dispatch) => {
    return callApi('fetch-course-topics/'+courseId,'get',{
    }).then(res => dispatch(setCourseTopics(res)));
  }
}

export function getTopicUsersData(courseId) {
  return (dispatch) => {
    return callApi('fetch-course-users/' + courseId, 'get').then(res => dispatch(setCourseTopics(res)));
  }
}

export function getUserViewedTopics(objEntity) {
  let query = '?rId=' + objEntity.courseId + '&uId=' + objEntity.userId;
  return (dispatch) => {
    return callApi('fetch-user-viewed-topics' + query, 'get').then(res => dispatch(setTopicViewedUsers(res)));
  };
}

export function getCourseTopicsList (objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-course-topics', 'post',{
      topicsData:objEntity
    }).then(res => dispatch(setTopicViewedUsersList(res, currentPage)));
  };
}

export function getViewedTopicsList (objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-course-topics', 'post',{
      topicsData:objEntity
    }).then(res => dispatch(setTopicViewedUsersList(res, currentPage)));
  };
}

export function getuserViewedALLTopicsList(objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-user-viewed-allTopics','post',{
      topicsData : objEntity
    }).then(res => dispatch(setTopicViewedUsersList(res,currentPage)));
  }
}

export function getAssignmentData (obj) {
  // console.log('getAssignmentData', obj);
  let query = '?assignmentId=' + obj.assignmentId + '&studentID=' + obj.studentID;
  return (dispatch) => {
    return callApi('fetch-individual-assignment-data'+query, 'get').then(res => dispatch(AssignmentDataStatus(res)));
  };
}

export function AssignmentDataStatus(response) {
  // console.log('AssignmentDataStatus', response);
  if (response.status) {
    return {
      type: INDIVIDUAL_ASSIGNMENT_DATA,
      status: response.status,
      data: response.data,
      message: response.message != undefined?response.message:''
    };
  } else if (response.error) {
    return {
      type: INDIVIDUAL_ASSIGNMENT_DATA_FAILED,
      status: response.status,
      error : response.error
    };
  } else {
    return {
      type: INDIVIDUAL_ASSIGNMENT_DATA_FAILED,
      status: response.status,
      error : 'Internal Server error'
    };
  }
}


export function saveEvaluatedAssignment (obj) {
  return (dispatch) => {
    return callApi('save-evaluated-assignment-result', 'post', obj).then(res => dispatch(AssignmentDataStatus(res)));
  };
}

export function saveAssignmentGradeConfiguration (obj) {
  return (dispatch) => {
    return callApi('save-assignment-grade-configuration', 'post', obj).then(res => dispatch(AssignmentDataStatus(res)));
  };
}

export function ClearIndidvidualAssignmentData(){
  return {
    type: CLEAR_INDIVIDUAL_ASSIGNMENT_DATA
  };  
}

export function getCertificateData(data, currentPage) {
  let sortStr = JSON.stringify(data.sortObj);
  let query = 'roomId=' + data.roomId + '&items=' + data.itemsPerPage + '&page=' + data.currentPage + '&sort=' + sortStr;

  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }

  return (dispatch) => {
    return callApi('get-certificate-data?' + query, 'get')
    .then(res => 
      dispatch(setCertificateData(res, data.currentPage))
    );
  }
}

export function setCertificateData(response, currentPage) {
  if(response.status){
    return {
      type: SET_CERTIFICATE_DATA,
      certificateData: response.certificateData,
      count: response.count,
      currentPage: currentPage,
      error: []
    }
  } else {
    return {
      type: SET_CERTIFICATE_DATA_FAILED,
      error: 'Internal Server Error',
      currentPage: currentPage,
    }
  }  
}

export function toggleCertificateDownload(roomId, studentId) {
  let query = 'roomId=' + roomId;

  return (dispatch) => {
    return callApi('toggle-certificate-download?' + query, 'put',{
      studentId
    })
    .then(res => dispatch(handleToggleCertificateDownload(res)));
  }
}

export function handleToggleCertificateDownload(response) {
  if(response.status){
    return {
      type: TOGGLE_CERTIFICATE_DOWNLOAD,
      status: response.status,      
      message: response.message,
      id: response.id,
      error: []
    }
  } else {
    return {
      type: TOGGLE_CERTIFICATE_DOWNLOAD,
      status: response.status,  
      message: response.message,      
      id: null,
      error: [response.error]
    }
  }
}

export function setTopicsIndex(topicData) {
   return (dispatch) => {
    return callApi('set-index-topics', 'put',{
      topicData
    });
  }
}

