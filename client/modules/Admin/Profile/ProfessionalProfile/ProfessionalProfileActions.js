import callApi from '../../../../util/apiCaller';

export const GET_USERDATA = 'GET_USERDATA';
export const GET_USERDATA_FAILED = 'GET_USERDATA_FAILED';

export function getUserDataRequest(data){
  return (dispatch) => {
      return callApi('getUserData/' + data, 'get').then(res => dispatch(getUserDataRequestStatus(res)));
    };
}

export function getUserDataRequestStatus(response){
  if(response.status){
    return {
      type: GET_USERDATA,
      data: response.data,
      error : []
    }; 
  }else if(response.error){
    return {
      type: GET_USERDATA_FAILED,
      data: {},
      error : [response.error]
    };
  }else{
    return {
      type: GET_USERDATA_FAILED,
      data: {},
      error : ['Internal server error']
    };
  }
}