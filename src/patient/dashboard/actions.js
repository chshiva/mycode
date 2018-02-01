import { SET_REQUEST_ACCOUNTS_PENDING, SET_REQUEST_ACCOUNTS_SUCCESS, SET_REQUEST_ACCOUNTS_ERROR } from './constants';
import { callRequestAccountsApi, callUserDetailsApi } from './services';

function setRequestAccountsPending(isLoading) {
    return {
        type: SET_REQUEST_ACCOUNTS_PENDING,
        isLoading
    };
}

function setRequestAccountsSuccess(successData) {
    return {
        type: SET_REQUEST_ACCOUNTS_SUCCESS,
        successData
    };
}

function setRequestAccountsErrorData(errorData) {
    return {
        type: SET_REQUEST_ACCOUNTS_ERROR,
        errorData
    }
}


export function requestForAccounts() {
  console.log("requestForAccounts started");
  return dispatch => {
    dispatch(setRequestAccountsPending(true));
    dispatch(setRequestAccountsSuccess(null));
    dispatch(setRequestAccountsErrorData(null));

    callRequestAccountsApi(response => {
      console.log("requestForAccounts response ", response);
      dispatch(setRequestAccountsPending(false));
      if (response.status) {
        dispatch(setRequestAccountsSuccess(response.status));
      } else {
        dispatch(setRequestAccountsErrorData(response));
      }
    });
  }
}




import { SET_REQUEST_USER_DETAILS_PENDING, SET_REQUEST_USER_DETAILS_SUCCESS, SET_REQUEST_USER_DETAILS_ERROR } from './constants';


function setUserDetailsPending(isLoading) {
    return {
        type: SET_REQUEST_USER_DETAILS_PENDING,
        isLoading
    };
}

function setUserDetailsSuccess(successData) {
    return {
        type: SET_REQUEST_USER_DETAILS_SUCCESS,
        successData
    };
}

function setUserDetailsErrorData(errorData) {
    return {
        type: SET_REQUEST_USER_DETAILS_ERROR,
        errorData
    }
}


export function requestForUserDetails() {
  console.log("requestForUserDetails started");
  return dispatch => {
    dispatch(setUserDetailsPending(true));
    dispatch(setUserDetailsSuccess(null));
    dispatch(setUserDetailsErrorData(null));

    callUserDetailsApi(response => {
      console.log("requestForUserDetails response ", response);
      dispatch(setUserDetailsPending(false));
      if (response.status) {
        dispatch(setUserDetailsSuccess(response.result.data));
      } else {
        dispatch(setUserDetailsErrorData(response.message));
      }
    });
  }
}