import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';

export const SAVED_LOCATION	= 'SAVED_LOCATION';
export const GET_LOCATION	= 'GET_LOCATION';
export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const CLEAR_LOCATION = 'CLEAR_LOCATION';
export const LIST_LOCATION  = 'LIST_LOCATION';
export const CANCEL_LOCATION  = 'CANCEL_LOCATION';
export const VIEW_LOCATION = 'VIEW_LOCATION';

export function SaveLocation (data) {
  if (data._id) {
    let id = data._id;
    delete data["_id"];
    delete data["locationId"];
    delete data["uid"];

    return (dispatch) => {
      return callApi('locations/' + id, 'put', {
        locationData : data,
      }).then(res => dispatch(LocationStatus(res)));
    };
  } else {
    return (dispatch) => {
      return callApi('locations', 'post', {
        locationData : data,
      }).then(res => dispatch(LocationStatus(res)));
    };
  }
}

export function LocationStatus(response){
  //console.log("response === ",response)
  if(response.status){
    browserHistory.push('/admin/location/list/');
    return {
      type: SAVED_LOCATION,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: SAVED_LOCATION,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }else{
      return {
        type: SAVED_LOCATION,
        status: response.status,
        data: {},
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: SAVED_LOCATION,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function LocationStore(data){
	return {
		type: GET_LOCATION,
		data: data,
	};	
}

export function UpdateLocationSchema (schema){
	return {
    type: UPDATE_SCHEMA,
    schema: schema,
  }
}

export function ClearLocation(){
  return {
    type: CLEAR_LOCATION,
  };  
}

export function LocationList(data, currentPage) {
  let query = 'items=' + data.itemsPerPage + '&page=' + data.currentPage;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('locations?' + query, 'get').then(res => dispatch(LocationListStatus(res, currentPage)));
  };
}
// export function LocationList(data, currentPage){
//   return (dispatch) => {
//     return callApi('listlocation', 'post', {
//       data,
//     }).then(res => dispatch(LocationListStatus(res, currentPage)));
//   };
// }

export function LocationListStatus(response, currentPage){
  if(response.status){
    return {
      status : response.status,
      type: LIST_LOCATION,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };
  }else if(response.error){
    return {
      status : response.status,
      type: LIST_LOCATION,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    };
  }else{
    return {
      status : response.status,
      type: LIST_LOCATION,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

// export function getLocationData (objEntity, pageName){
//   return (dispatch) => {
//     return callApi('fetchlocation', 'post', {
//       locationdata: {
//         uid : objEntity.uid,
//         locationId : objEntity.locationId
//       },
//     }).then(res => dispatch(setLocation(res, pageName)));
//   };
// }
export function getLocationData (locationId, pageName){
  return (dispatch) => {
    return callApi('locations/' + locationId, 'get').then(res => dispatch(setLocation(res, pageName)));
  };
}
export function setLocation(response, page = ''){
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
      type: VIEW_LOCATION,
      status: response.status,
      data: response.data,
      error : [],
      message : ''
    };
  }else if(response.error){
    return {
      type: VIEW_LOCATION,
      status: response.status,
      data: {},
      error : [response.error],
      message : ''
    };
  }else{
    return {
      type: VIEW_LOCATION,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function DeleteLocation (objEntity) {
  return (dispatch) => {
    return callApi('locations/' + objEntity.locationId, 'delete').then(res => dispatch(LocationLoadList(res)));
  };
}

export function LocationLoadList (response) {
  //console.log("response === ",response);
  if(response.status){
    browserHistory.push('/admin/location/list');
    return {
      type: CANCEL_LOCATION,
      status: false,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: CANCEL_LOCATION,
      status: false,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: CANCEL_LOCATION,
      status: false,
      error : ['Internal server error'],
      message : ''
    };
  }
  
}