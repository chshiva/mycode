import {SET_VERIFY_EMAIL_PENDING, SET_VERIFY_EMAIL_SUCCESS, SET_VERIFY_EMAIL_ERROR} from './constants';

import callVerifyEmailApi from './services';


function setEmailVerificationPending(isLoading) {
  return {
    type: SET_VERIFY_EMAIL_PENDING,
    isLoading
  };
}

function setEmailVerificationSuccess (successData) {
   return {
    type: SET_VERIFY_EMAIL_SUCCESS,
    successData
   };
}

function setEmailVerificationError (errorData) {
  return {
    type: SET_VERIFY_EMAIL_ERROR,
    errorData
  };
}

export function requestForEmailVerification (token) {
  console.log("requestForEmailVerification 1");
  return dispatch => {
    dispatch(setEmailVerificationPending(true));
    dispatch(setEmailVerificationSuccess(null));
    dispatch(setEmailVerificationError(null));
  console.log("requestForEmailVerification token ", token);
    callVerifyEmailApi(token, response => {
      console.log("Email Verification response  ", response);
      dispatch(setEmailVerificationPending(false));
      if (response.status) {
        dispatch(setEmailVerificationSuccess(response.result.data));
      } else {
        dispatch(setEmailVerificationError(response.result));
      } 
    });
  }
}