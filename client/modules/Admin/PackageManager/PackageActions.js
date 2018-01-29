import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';

export const EDIT_PACKAGE = 'EDIT_PACKAGE';
export const SAVE_PACKAGE = 'SAVE_PACKAGE';
export const GET_PACKAGE = 'GET_PACKAGE';
export const CANCEL_PACKAGE = 'CANCEL_PACKAGE';
export const SAVED_PACKAGE = 'SAVED_PACKAGE';
export const LIST_PACKAGE = 'LIST_PACKAGE';
export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const CLEAR_PACKAGE = 'CLEAR_PACKAGE';
export const FETCHED_PACKAGE = 'FETCHED_PACKAGE';
export const FETCH_PACKAGE_FAILED = 'FETCH_PACKAGE_FAILED';


export function EditPackage() {
  return {
      type: EDIT_PACKAGE,
      status: true,
  };
}

export function SavePackage (data) {
  // console.log("data == ",data);
  return (dispatch) => {
    return callApi('packages', 'post', {
        packagedata: data,
    }).then(res => dispatch(PackageStatus(res)));
  };
}

export function UpdatePackage (data, id) {
  delete data["_id"];
  return (dispatch) => {
    return callApi('packages/' + id, 'put', {
        packagedata: data,
    }).then(res => dispatch(PackageStatus(res)));
  };
}

export function PackageStatus (response){
  if(response.status){
    // browserHistory.push('/admin/package/view/'+response.data._id);
    return {
      type : SAVED_PACKAGE,
      status : response.status,
      id : response.id,
      message : response.message,
      error : [] 
    };
  }else if(response.error){
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
          //console.log(obj.message);
          err.push(obj.message);
      });
      return {
        type : SAVED_PACKAGE,
        status : response.status,
        message : '',
        error : err
      };
    }else{
      // console.log("error === ",response.error);
      return {
        type : SAVED_PACKAGE,
        status : response.status,
        message : '',
        error : [response.error]
      };
    }
  }else{
    console.log("internal server error");
    return {
      type : SAVED_PACKAGE,
      status : response.status,
      message : '',
      error : ['Internal server error']
    };
  }
  
}

export function getPackageData (recordId){
  return (dispatch) => {
    return callApi('packages/' + recordId, 'get').then(res => dispatch(setPackage(res)));
  };
}

export function setPackage(response, page = ''){
  // console.log(boolStatus);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
        type: FETCHED_PACKAGE,
        status: response.status,
        data: response.data,
        message : '',
        error : []
    };
  }else if(response.error){
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
          //console.log(obj.message);
          err.push(obj.message);
      });
      return {
        type : FETCH_PACKAGE_FAILED,
        status : response.status,
        data : response.data,
        message : '',
        error : err
      };
    }else{
      //console.log("error === ",response.error);
      return {
        type : FETCH_PACKAGE_FAILED,
        status : response.status,
        data : response.data,
        message : '',
        error : [response.error]
      };
    }
  }else{
    console.log("internal server error");
    return {
      type : FETCH_PACKAGE_FAILED,
      status : response.status,
      data : response.data,
      message : '',
      error : ['Internal server error']
    };
  }
}

export function PackageList(data, currentPage){
  let sortStr = JSON.stringify(data.sortObj);
  let query = 'items=' + data.itemsPerPage + '&page=' + data.currentPage+ '&sort=' + sortStr;
  if(data && data.searchKeyword)
    query += '&search=' + data.searchKeyword;
  return (dispatch) => {
    return callApi('packages?' + query, 'get').then(res => dispatch(PackageListStatus(res, currentPage)));
  };
}

export function PackageListStatus(response, currentPage){
  // console.log(dataCount);
  // console.log(data);
  if(response.status){
    return {
      type: LIST_PACKAGE,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    }; 
  }else if(response.error){
    return {
      type: LIST_PACKAGE,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    };
  }else{
    return {
      type: LIST_PACKAGE,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  }
   
}

export function PackageStore (data){
  return {
    type: GET_PACKAGE,
    data: data,
  };  
}

export function UpdatePackageSchema (schema){
  return {
    type: UPDATE_SCHEMA,
    schema: schema,
  }
}

export function CancelPackage () {
  return {
    type: CANCEL_PACKAGE,
    status: false,
  };
}

export function DeletePackage (recordId) {
  return (dispatch) => {
    return callApi('packages/' + recordId, 'delete').then(res => dispatch(PackageLoadList(res)));
  };
}

export function PackageLoadList (response) {
  if(response.status){
    // browserHistory.push('/admin/package/list');
    return {
      type: CANCEL_PACKAGE,
      status: response.status,
      error: [],
      message : response.message
    };
  }else if(response.error){
    return {
      type: CANCEL_PACKAGE,
      status: response.status,
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: CANCEL_PACKAGE,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function ClearPackage(){
  return {
    type: CLEAR_PACKAGE
  };  
}