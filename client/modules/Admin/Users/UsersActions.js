import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';
import DataObject from '../../../components/DataObject';
import moment from 'moment';

export const SAVE_USER 	= 'SAVE_USER';
export const GET_USER	= 'GET_USER';
export const CANCEL_USER	= 'CANCEL_USER';
export const SAVED_USER	= 'SAVED_USER';
export const LIST_USER 	= 'LIST_USER';
export const VIEW_USER = "VIEW_USER";
export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const CLEAR_USER = 'CLEAR_USER';
export const LIST_USER_FAILED 	= 'LIST_USER_FAILED';
export const IMPORT_USER = 'IMPORT_USER';
export const IMPORT_USER_FAILED = 'IMPORT_USER_FAILED';
export const EXPORT_USER = 'EXPORT_USER';
export const EXPORT_USER_FAILED = 'EXPORT_USER_FAILED';
export const SAVED_LOGIN_ACTIVEUSERS = 'SAVED_LOGIN_ACTIVEUSERS';
export const LIST_ACTIVEUSERS = 'LIST_ACTIVEUSERS';
export const LIST_ACTIVEUSERS_FAILED = 'LIST_ACTIVEUSERS_FAILED';
export const CLEAR_ACTIVEUSERS_LIST = 'CLEAR_ACTIVEUSERS_LIST';

export function EditUser() {
  return {
  		type: EDIT_USER,
  		status: true,
  };
}

export function SaveUser (data) {
  //console.log("data == ",data);
  if (data._id){
    let id = data._id;
    // delete data["_id"];
    return (dispatch) => {
      return callApi('update-user/' + id, 'put', {
          userdata: data,
      }).then(res => dispatch(UserStatus(res)));
    };
  } else {
    return (dispatch) => {
      return callApi('save-user', 'post', {
          userdata: data,
      }).then(res => dispatch(UserStatus(res)));
    };
  }  
}

export function UserStatus(response){
	// console.log("response--", response);
	if(response.status){
		return {
			type: SAVED_USER,
			status: response.status,
			data: response.data,
			message : response.message,
			error : []
		};
	}else if(response.error){
		console.log("save user error === ", response.error);
		if(response.error.errors){
			let err = [];
			_.forIn(response.error.errors, function(obj, key){
				err.push(obj.message);
			});
			return {
				type: SAVED_USER,
				status: response.status,
				data: {},
				message : '',
				error : err
			};
		}else{
			return {
				type: SAVED_USER,
				status: response.status,
				data: {},
				message : '',
				error : [response.error]
			};
		}
	}else{
		return {
			type: SAVED_USER,
			status: response.status,
			data: {},
			message : '',
			error : ['Internal server error']
		};
	}
}

export function UserStore(data){
	return {
		type: GET_USER,
		data: data,
	};	
}

export function ClearUser(){
	return {
		type: CLEAR_USER
	};	
}

export function UserList(data, currentPage){
	// console.dir(data);
	let query = '?items=' + data.itemsPerPage +'&page=' + data.currentPage +'&search=' + data.searchKeyword + '&userStatus=' + data.userStatus + '&sort=' + JSON.stringify(data.sortObj);
	//console.log("query---->", query);
	return (dispatch) => {
  	return callApi('list-users' + query, 'get').then(res => dispatch(UserListStatus(res, currentPage)));
	};
}
export function UserListStatus(response, currentPage){

	if(response.status){
		return {
			status : response.status,
			type: LIST_USER,
			listData: response.data,
			count: response.count,
			currentPage: currentPage,
			message: response.message,
			error : []
		};
	}else if(response.error){
		console.log(response.error)
		return {
			status : response.status,
			type: LIST_USER_FAILED,
			count: 0,
			currentPage: currentPage,
			error : [response.error]
		};
	}else{
		return {
			status : response.status,
			type: LIST_USER_FAILED,
			count: 0,
			currentPage: currentPage,
			error : ['Internal server error']
		};
	}	
}

export function getProfileData(uid){
	return callApi('viewUser','post',{
		userdata :{
			uid : uid
		}
	});
}

export function getUserProfile(uid){
	return callApi('viewuserprofile','post',{
		userdata :{
			uid : uid
		}
	});
}

export function getUserLocaleData(uid){
	return callApi('getuserlocaledata','post',{
		userdata :{
			uid : uid
		}
	});
}

export function getUserImage(uid){
	return callApi('getProfileImage','post',{
		uid : uid
	})
}

export function viewUser(uid, pageName) {
	return (dispatch) => {
		return callApi('viewUser','post',{
           userdata :{
           	uid:uid
           }
		}).then(res => dispatch(viewUserStatus(res, pageName)));
	}
}



export function viewUserStatus (response, page = '') {
	if(response.status){
		if(page != ''){
	      browserHistory.push(page);
	    }
	    return {
			type : VIEW_USER,
			data : response.data,
			status : response.status,
			error : []
		};
	}else if(response.error){
		return {
			type : VIEW_USER,
			data : {},
			status : response.status,
			error : [response.error]
		};
	}else{
		return {
			type : VIEW_USER,
			data : {},
			status : response.status,
			error : ['Internal server error']
		};
	}
}

export function getUserData (recordId){
  return (dispatch) => {
  	let query = "id=" + recordId;
    return callApi('fetch-user?' + query, 'get').then(res => dispatch(setUser(res)));
  };
}
export function setUser(response, page = ''){
	if(response.status){
		if(page != ''){
	      browserHistory.push(page);
	    }
	    return {
	        type : SAVED_USER,
	        status : response.status,
	        data : response.data,
	        error : [],
	        message : ''
	    };
	}else if(response.error){
		return {
	        type : SAVED_USER,
	        status : response.status,
	        data : {},
	        error : [response.error],
	        message : ''
	    };
	}else{
		return {
	        type : SAVED_USER,
	        status : response.status,
	        data : {},
	        error : ['Internal server error'],
	        message : ''
	    };
	}
}

export function CancelUser() {
	return {
		type: CANCEL_USER,
		status: false,
	};
}


export function UpdateUserSchema (schema){
  	return {
    	type: UPDATE_SCHEMA,
    	schema: schema,
  	}
}

export function getRoles (selectedcid, pageName){
  	return (dispatch) => {
    	return callApi('getroles/' + selectedcid , 'get');
  	};
}

/*export function getRooms (selectedcid, pageName){
	return (dispatch) => {
  	return callApi('getrooms/' + selectedcid , 'get')
  };
}*/

export function GetUpdateRoles(userId, pageName){
  	return (dispatch) => {
    	return callApi('getrolesupdate/' + userId, 'get');
  	};
}

export function GetCompanyData (){
  	return (dispatch) => {
    	return callApi('corporate-ids', 'get');
  	};
}

export function DeleteUser (objEntity) {
  return (dispatch) => {
    return callApi('deleteuser', 'post', {
        userdata: {
            id : objEntity.userId
        },
    }).then(res => dispatch(UserLoadList(res)));
  };
}


export function UserLoadList (response) {
  // console.log("response === ",response);
  if(response.status){
    // browserHistory.push('/admin/users/list');
    return {
      type: CANCEL_USER,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: CANCEL_USER,
      status: response.status,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: CANCEL_USER,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }  
}

export function exportUsersRequest (objEntity) {
	let query = '?userStatus='+ objEntity.userStatus +'&searchKeyword=' + objEntity.searchKeyword ;
  return (dispatch) => {
    return callApi('export-users'+ query, 'get').then(res => dispatch(ExportUsersStatus(res)));
  };
}

export function ExportUsersStatus (response) {
  // console.log("response === ",response);
  if(response.status){
    return {
      type: EXPORT_USER,
      status: response.status,
      fileName: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: EXPORT_USER_FAILED,
      status: response.status,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: EXPORT_USER_FAILED,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
	}
  
}

export function importUsersRequest (objEntity, currentPage) {
  return (dispatch) => {
    return callApi('import-users', 'post', {
        userdata: objEntity
    }).then(res => dispatch(importUserStatus(res, currentPage)));
  };
}

export function importUserStatus(response, currentPage){

	if(response.status == true){
		if(response.error) {
			return {
				status : response.status,
				type: IMPORT_USER,
				listData: response.data,
				count: response.count,
				currentPage: currentPage,
				message: response.message,
				error : [response.error]
			};
		} else {
			return {
				status : response.status,
				type: IMPORT_USER,
				listData: response.data,
				count: response.count,
				currentPage: currentPage,
				message: response.message,
				error : []
			};
		}
	}else if(response.status == false){
		return {
			status : response.status,
			type: IMPORT_USER_FAILED,
			count: 0,
			currentPage: currentPage,
			error : [response.error]
		};
	}else{
		return {
			status : response.status,
			type: IMPORT_USER_FAILED,
			count: 0,
			currentPage: currentPage,
			error : ['Internal server error']
		};
	}	
}

export function ActivateUser (data) {
	return (dispatch) => {
		return callApi('activate-user', 'put', {
			userdata : data
		})
	}
}

export function SetActiveUsers (response) {
  if (response.status) {
    return {
      type: SAVED_LOGIN_ACTIVEUSERS,
      status: response.status,
      data: response.data,
    };
  } else if (response.error) {
    return {
      type: SAVED_LOGIN_ACTIVEUSERS,
      status: response.status,
    };
  } else {
    return {
      type: SAVED_LOGIN_ACTIVEUSERS,
      status: response.status,
    };
  }
}

export function getActiveUsersReportRequest (cid,fromdate,todate) {

	let query = '?companyId=' + cid +'&fromDate=' +fromdate.toISOString() +'&toDate='+ todate.toISOString() +'';
	return (dispatch) => {
		return callApi('getactiveusers'+query,'get').then(res => dispatch(SetActiveUsers(res)));
	};
}

export function activeUserListStatus(response, currentPage) {

	if(response.status){
		return {
			status : response.status,
			type: LIST_ACTIVEUSERS,
			listData: response.data,
			count: response.count,
			currentPage: currentPage,
			message: response.message,
			error : []
		};
	}else if(response.error){
		console.log(response.error)
		return {
			status : response.status,
			type: LIST_ACTIVEUSERS_FAILED,
			count: 0,
			currentPage: currentPage,
			error : [response.error]
		};
	}else{
		return {
			status : response.status,
			type: LIST_ACTIVEUSERS_FAILED,
			count: 0,
			currentPage: currentPage,
			error : ['Internal server error']
		};
	}	
}


export function ActiveUsersListRequest (objEntity, currentPage) {
	return (dispatch) => {
  	return callApi('list-activeusers', 'post',{
  		usersData : objEntity
  	}).then(res => dispatch(activeUserListStatus(res, currentPage)));
	};
}

export function ClearActiveUsers() {
  return {
    type: CLEAR_ACTIVEUSERS_LIST
  };
}
