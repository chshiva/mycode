import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';

export const EDIT_CORPORATE = 'EDIT_CORPORATE';
export const SAVE_CORPORATE = 'SAVE_CORPORATE';
export const GET_CORPORATE = 'GET_CORPORATE';
export const CANCEL_CORPORATE	= 'CANCEL_CORPORATE';
export const SAVED_CORPORATE = 'SAVED_CORPORATE';
export const LIST_CORPORATE = 'LIST_CORPORATE';
export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const CLEAR_CORP = 'CLEAR_CORP';


export function EditCorporate() {
  return {
  		type: EDIT_CORPORATE,
  		status: true,
  };
}

export function ClearCrop() {
  return {
      type: CLEAR_CORP
  };
}

export function SaveCorporate (data) {
	//console.log("data == ",data);
  if (data._id) {
    let id = data._id;
    delete data['_id'];
    return (dispatch) => {
      return callApi('corporates/' + id, 'put', {
          corporatedata: data
      }).then(res => dispatch(CorporateStatus(res)));
    };
  } else {
    return (dispatch) => {
      return callApi('corporates', 'post', {
          corporatedata: data
      }).then(res => dispatch(CorporateStatus(res)));
    };
  }
}

export function CorporateStatus (response){
	if(response.status){
		// console.log("saved");
		return {
      type : SAVED_CORPORATE,
      status : response.status,
      id : response.id,
      message : response.message,
      error : []
    };
	}else if(response.error){
    console.log("error ==== ",response.error);
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
        err.push(obj.message);
      });
      return {
        type : SAVED_CORPORATE,
        status : response.status,
        message : '',
        error : err
      };
    }else{
      //console.log("error === ",response.error);
      return {
        type : SAVED_CORPORATE,
        status : response.status,
        message : '',
        error : [response.error]
      };
    }
  }else{
    console.log("internal server error");
    return {
      type : SAVED_CORPORATE,
      status : response.status,
      message : '',
      error : ['Internal server error']
    };
  }
}

export function getCorporateData (corporateId){
  return (dispatch) => {
    return callApi('corporates/' + corporateId, 'get').then(res => dispatch(setCorporate(res)));
  };
}

export function setCorporate(response, page = ''){
  // console.log(boolStatus);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
        type: GET_CORPORATE,
        status: response.status,
        data: response.data,
        error : []
    };
  }else if(response.error){
    console.log("error === ",response.error);
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
          //console.log(obj.message);
          err.push(obj.message);
      });
      return {
        type : GET_CORPORATE,
        status : response.status,
        data : {},
        error : err
      };
    }else{
      console.log("error === ",response.error);
      return {
        type : GET_CORPORATE,
        status : response.status,
        data : {},
        error : [response.error]
      };
    }
  }else{
    console.log("internal server error");
    return {
      type : GET_CORPORATE,
      status : response.status,
      data : {},
      error : ['Internal server error']
    };
  }
}

export function CorporateList(data, currentPage){
  // console.dir(data);
  let sortStr = JSON.stringify(data.sortObj);
  let query = 'items=' + data.itemsPerPage + '&page=' + data.currentPage + '&search=' + data.searchKeyword + '&sort=' + sortStr;
  return (dispatch) => {
    return callApi('corporates-list?' + query, 'get').then(res => dispatch(CorporateListStatus(res, currentPage)));
  };
}

export function CorporateListStatus(response, currentPage){
  // console.log(dataCount);
  // console.log(data);
  if(response.status){
    return {
      type: LIST_CORPORATE,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    }; 
  }else if(response.error){
    console.log("error === ",response.error);
    return {
      type: LIST_CORPORATE,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    };
  }else{
    return {
      type: LIST_CORPORATE,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  }
   
}

export function CorporateStore (data){
	return {
		type: GET_CORPORATE,
		data: data,
	};	
}

export function UpdateCorporateSchema (schema, data = null){
  return {
    type: UPDATE_SCHEMA,
    schema: schema,
    data: data
  }
}

export function CancelCorporate () {
	return {
		type: CANCEL_CORPORATE,
		status: false,
	};
}

export function DeleteCorporate (corporateId) {
  return (dispatch) => {
    return callApi('corporates/' + corporateId, 'delete').then(res => dispatch(CorporateLoadList(res)));
  };
}

export function CorporateLoadList (response) {
  if(response.status){
    return {
      type: CANCEL_CORPORATE,
      status: true,
      message : response.message
    };
  }else if(response.error){
    console.log("error === ",response.error);
    return {
      type: CANCEL_CORPORATE,
      status: false,
      error : [response.error]
    };
  }else{
    return {
      type: CANCEL_CORPORATE,
      status: false,
      error : ['Internal server error']
    };
  }
}
