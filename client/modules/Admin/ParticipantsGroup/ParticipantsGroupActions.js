import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';


export const SAVED_GROUP = 'SAVED_GROUP';
export const SAVE_GROUP_FAILED = 'SAVE_GROUP_FAILED';
export const LIST_GROUP = 'LIST_GROUP';
export const LIST_GROUP_FAILED = 'LIST_GROUP_FAILED';
export const FETCH_GROUP_DATA = 'FETCH_GROUP_DATA';
export const CLEAR_GROUP = 'CLEAR_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const SAVE_GROUP_NAME = 'SAVE_GROUP_NAME';
export const ADD_PARTICIPANTS_IN_GROUP = 'ADD_PARTICIPANTS_IN_GROUP';
export const ADD_PARTICIPANTS_IN_GROUP_FAILED = 'ADD_PARTICIPANTS_IN_GROUP_FAILED';
export const SAVE_GROUP_NAME_FAILED = 'SAVE_GROUP_NAME_FAILED';

export function SaveGroupRequest (data) {
	//console.log("data at action== ",data);  
  if(data._id) {
    let id = data._id;
    delete data["_id"];
    return (dispatch) => {
      return callApi('studentsGroup/' + id, 'put', {
        data
      }).then(res => dispatch(SaveGroupRequestStatus(res)))
    }
  } else {
    return (dispatch) => {
      return callApi('studentsGroup', 'post', {
        data
      }).then(res => dispatch(SaveGroupRequestStatus(res)))
    }
  }	
}

export function SaveGroupRequestStatus (response){
	//console.log("response-------", response);
	if(response.status){
		// //console.log("saved");
		// browserHistory.push('/admin/category/view/'+response.data._id);
    return {
      type : SAVED_GROUP,
      status : response.status,
      data : response.data,
      message : response.message,
      count : response.count,
      error : []
    };
	}else if(response.error){
    if(response.error.errors){      
      return {
        type : SAVE_GROUP_FAILED,
        status : response.status,
        data : {},
        message : '',
        error : response.error
      };
    }else{
      ////console.log("error === ",response.error);
      return {
        type : SAVE_GROUP_FAILED,
        status : response.status,
        data : {},
        message : '',
        error : response.error
      };
    }
  }else{
    // //console.log("internal server error");
    return {
      type : SAVE_GROUP_FAILED,
      status : response.status,
      data : {},
      message : '',
      error : ['Internal server error']
    };
  }	
}

export function searchStudents (data) {
  //console.log("data == ",data);
  var query = 'input=' + data.input; 
  return (dispatch) => {
    return callApi('searchgroupstudents?' + query, 'get')
  };
}

export function listStudentsGroup(data, currentPage){
  return (dispatch) => {
    let query = 'itemsPerPage=' + data.itemsPerPage + '&currentPage=' + data.currentPage;
    if (data && data.searchKeyword) {
      query += '&search=' + data.searchKeyword;
    }
    return callApi('listGroupStudents?' + query, 'get').then(res => dispatch(listStudentsGroupListStatus(res, currentPage)));
  };
}

export function listStudentsGroupListStatus(response, currentPage){
  // console.log('listStudentsGroupListStatus', response);
  if(response.status){
    return {
      type: LIST_GROUP,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    }; 
  }else if(response.error){
    return {
      type: LIST_GROUP_FAILED,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    };
  }else{
    return {
      type: LIST_GROUP_FAILED,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  }
   
}

export function getGroupStudents (data, currentPage) {
  console.log('data', data);
  let query = 'id=' + data.id;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('fetchGroupStudents?' + query, 'get').then(res => dispatch(fetchGroupStudentsResponse(res, currentPage)));
  };
}

export function fetchGroupStudentsResponse(response, page = ''){
  console.log("response in group === ", response);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: FETCH_GROUP_DATA,
      status: response.status,
      listData: response.data,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: FETCH_GROUP_DATA,
      status: response.status,
      listData: {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: FETCH_GROUP_DATA,
      status: response.status,
      listData: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function clearParticipantsGroup() {
  return {
      type: CLEAR_GROUP 
  };
}

export function deleteStudentGroup (data, currentPage) {
  //console.log("data == ",data);
  var id = data.id;
  return (dispatch) => {
    return callApi('deleteGroupStudents/' + id, 'delete').then(res => dispatch(deleteGroupStudentsResponse(res, currentPage)));
  };
}

export function deleteGroupStudentsResponse(response, page = ''){
   //console.log("response in group === ", response);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: DELETE_GROUP,
      status: response.status,      
      error : [],
      message : response.message,
      listData: {},
    };
  }else if(response.error){
    return {
      type: DELETE_GROUP,
      status: response.status,
      listData: {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: DELETE_GROUP,
      status: response.status,
      listData: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}



export function deleteStudentInGroup (data, currentPage) {
  //console.log("data == ",data);
  return (dispatch) => {
    var query = "sid=" + data.sid + "&id=" + data.id;    
    return callApi('deleteStudent?' + query, 'delete').then(res => dispatch(deleteStudentsResponse(res, currentPage)));
  };
}

export function deleteStudentsResponse(response, page = ''){
   //console.log("response in group === ", response);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: DELETE_STUDENT,
      listData: response.data,
      status: response.status,      
      error : [],
      message : response.message,
      
    };
  }else if(response.error){
    return {
      type: DELETE_STUDENT,
      status: response.status,
      listData: {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: DELETE_STUDENT,
      status: response.status,
      listData: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function saveGroupName (data, currentPage) {
  //console.log("data == ",data);
  //var query = 'groupName=' + data.groupName + '&id=' + data.id;
  var id = data.id;
  delete data["id"];
  return (dispatch) => {
    return callApi('updategroupname/' + id, 'put', {
      data
      } ).then(res => dispatch(saveGroupNameResponse(res, currentPage)));
  };
}

export function saveGroupNameResponse(response, page = ''){
   //console.log("response in group === ", response);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: SAVE_GROUP_NAME,
      listData: response.data,
      status: response.status,      
      error : [],
      message : response.message,
      
    };
  }else if(response.error){
    return {
      type: SAVE_GROUP_NAME_FAILED,
      status: response.status,
      listData: {},
      error : response.error,
      message : ''
    };
  }else{
    return {
      type: SAVE_GROUP_NAME_FAILED,
      status: response.status,
      listData: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}


export function SaveAddedParticipants (data, currentPage) {
  //console.log("action data == ",data);
  return (dispatch) => {
    return callApi('saveaddedparticipants', 'post', {
      data
    }).then(res => dispatch(saveAddedParticipantsResponse(res, currentPage)));
  };
}

export function saveAddedParticipantsResponse(response, page = ''){
   //console.log("response in group === ", response);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: ADD_PARTICIPANTS_IN_GROUP,
      listData: response.data,
      status: response.status,      
      error : [],
      message : response.message,
      
    };
  }else if(response.error){
    return {
      type: ADD_PARTICIPANTS_IN_GROUP_FAILED,
      status: response.status,
      listData: {},
      error : response.error,
      message : ''
    };
  }else{
    return {
      type: ADD_PARTICIPANTS_IN_GROUP_FAILED,
      status: response.status,
      listData: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

