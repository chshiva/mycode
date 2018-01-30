import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController'; 

export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORY_FAILED = 'GET_CATEGORY_FAILED';
export const SAVED_CATEGORY = 'SAVED_CATEGORY';
export const SAVE_CATEGORY_FAILED = 'SAVE_CATEGORY_FAILED';
export const LIST_CATEGORY = 'LIST_CATEGORY';
export const LIST_CATEGORY_FAILED = 'LIST_CATEGORY_FAILED';
export const CLEAR_CAT = 'CLEAR_CAT';
export const CANCEL_CATEGORY = 'CANCEL_CATEGORY';



export function SaveCategoryRequest (data) {
	//console.log("data == ",data);
  if (data._id) {
    let id = data._id;
    delete data["_id"];
    return (dispatch) => {
      return callApi('update-category/' + id, 'put', {
        categorydata: {
          data,
        }
      }).then(res => dispatch(CategoryStatus(res)));
    };
  } else {
    return (dispatch) => {
      return callApi('save-category', 'post', {
        categorydata: {
          data,
        }
      }).then(res => dispatch(CategoryStatus(res)));
    };
  }
}

export function CategoryStatus (response){
	if(response.status){
		// console.log("saved");
		// browserHistory.push('/admin/category/view/'+response.data._id);
    return {
      type : SAVED_CATEGORY,
      status : response.status,
      data : response.data,
      message : response.message,
      error : []
    };
	}else if(response.error){
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
        err.push(obj.message);
      });
      return {
        type : SAVE_CATEGORY_FAILED,
        status : response.status,
        data : {},
        message : '',
        error : err
      };
    }else{
      //console.log("error === ",response.error);
      return {
        type : SAVE_CATEGORY_FAILED,
        status : response.status,
        data : {},
        message : '',
        error : [response.error]
      };
    }
  }else{
    console.log("internal server error");
    return {
      type : SAVE_CATEGORY_FAILED,
      status : response.status,
      data : {},
      message : '',
      error : ['Internal server error']
    };
  }
	
}
  
export function CategoryListRequest(data, currentPage) {
  let sortStr = JSON.stringify(data.sortObj);
  let query = 'items=' + data.itemsPerPage + '&page=' + data.currentPage+ '&sort=' + sortStr;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('list-category?' + query, 'get').then(res => dispatch(CategoryListStatus(res, currentPage)));
  };
}

export function CategoryListStatus(response, currentPage){
  if(response.status){
    return {
      type: LIST_CATEGORY,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    }; 
  }else if(response.error){
    return {
      type: LIST_CATEGORY_FAILED,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    };
  }else{
    return {
      type: LIST_CATEGORY_FAILED,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  }
   
}

export function CategoryStore (data){
	return {
		type: GET_CATEGORY,
		data: data,
	};	
}


export function ClearCat() {
  return {
      type: CLEAR_CAT
  };
}

export function getCategoryData (objEntity, pageName){
  return (dispatch) => {
    return callApi('fetch-category/' + objEntity.categoryId, 'get').then(res => dispatch(setCategory(res, pageName)));
  };
}

export function setCategory(response, page = ''){
  // console.log(boolStatus);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
        type: GET_CATEGORY,
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
        type : GET_CATEGORY_FAILED,
        status : response.status,
        data : {},
        message : '',
        error : err
      };
    }else{
      console.log("error === ",response.error);
      return {
        type : GET_CATEGORY_FAILED,
        status : response.status,
        data : {},
        message : '',
        error : [response.error]
      };
    }
  }else{
    console.log("internal server error");
    return {
      type : GET_CATEGORY_FAILED,
      status : response.status,
      data : {},
      message : '',
      error : ['Internal server error']
    };
  }
}

export function UpdateCategorySchema (schema){
  return {
    type: UPDATE_SCHEMA,
    schema: schema,
  }
}

export function DeleteCategory (objEntity) {
  return (dispatch) => {
    return callApi('delete-category/' + objEntity.categoryId, 'delete').then(res => dispatch(CategoryLoadList(res)));
  };
}

export function CategoryLoadList (response) {
  if(response.status){
    // browserHistory.push('/admin/category/list');
    // console.log(response)
    return {
      type: CANCEL_CATEGORY,
      status: response.status,
      message : response.message
    };
  }else if(response.error){
    return {
      type: CANCEL_CATEGORY,
      status: response.status,
      error : [response.error]
    };
  }else{
    return {
      type: CANCEL_CATEGORY,
      status: response.status,
      error : ['Internal server error']
    };
  }
}
