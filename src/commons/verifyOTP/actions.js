import { SET_REQUEST_OTP_PENDING, SET_REQUEST_OTP_SUCCESS, SET_REQUEST_OTP_ERROR } from './constants';
import { SET_VERIFY_OTP_PENDING, SET_VERIFY_OTP_SUCCESS, SET_VERIFY_OTP_ERROR } from './constants';
import { callRequestOTPApi, callVerifyOTPApi, callSendOTPApi, callVerifyrequestedotp } from './services';

function setRequestOTPPending(isLoading) {
  return {
    type: SET_REQUEST_OTP_PENDING,
    isLoading
  };
}

function setRequestOTPSuccess (successData) {
   return {
    type: SET_REQUEST_OTP_SUCCESS,
    successData
   };
}

function setRequestOTPError (errorData) {
  return {
    type: SET_REQUEST_OTP_ERROR,
    errorData
  };
}

export function requestForOTP (userId) {
  console.log("requestForOTP userId ", userId)
  // If User is already logged in then user will  have authToken not the userid.
  if (!userId) {
    console.log('userId not found for requestForOTP');
    return dispatch => {
      dispatch(setRequestOTPPending(true));
      dispatch(setRequestOTPSuccess(null));
      dispatch(setRequestOTPError(null));

      callRequestOTPApi(response => {
        dispatch(setRequestOTPPending(false));
        if (response.status) {
          dispatch(setRequestOTPSuccess(response.status));
        } else {
          dispatch(setRequestOTPError(response.result.message));
        } 
      });
    } 

  } else {    // If User is registered for the first time, then userid will be used to issue the OTP
    let sendOTPObject = { userid: userId } 
    return dispatch => {
      dispatch(setRequestOTPPending(true));
      dispatch(setRequestOTPSuccess(null));
      dispatch(setRequestOTPError(null));

      callSendOTPApi(sendOTPObject, response => {
        console.log("sendOTPObject ", response)
        dispatch(setRequestOTPPending(false));
        if (response.status) {
          dispatch(setRequestOTPSuccess(response.status));
        } else {
          dispatch(setRequestOTPError(response.result.message));
        } 
      });
    }    
  }

}


function setVerifyOTPPending(isLoading) {
  return {
    type: SET_VERIFY_OTP_PENDING,
    isLoading
  };
}

function setVerifyOTPSuccessData (successData) {
  return {
    type: SET_VERIFY_OTP_SUCCESS,
    successData
  };
}

function setVerifyOTPErrorData (errorData) {
  return {
    type: SET_VERIFY_OTP_ERROR,
    errorData
  };
}

export function nullifyMessages() {
  return dispatch => {
    dispatch(setVerifyOTPSuccessData(null));
    dispatch(setVerifyOTPErrorData(null));
  }
}


export function requestForVerifyOTP (verifyOTPObject) {

  if (verifyOTPObject.userid) {
    return dispatch => {
      dispatch(setVerifyOTPPending(true));
      dispatch(setVerifyOTPSuccessData(null));
      dispatch(setVerifyOTPErrorData(null));

      callVerifyOTPApi(verifyOTPObject, response => {
        dispatch(setVerifyOTPPending(false));
        if (response.status) {
          dispatch(setVerifyOTPSuccessData(response.result.data));
        } else {
          dispatch(setVerifyOTPErrorData(response.result.message));
        }
      });
    }
  } else {
    console.log("verifyOTPObject verifyOTPObject ", verifyOTPObject);
    return dispatch => {
      dispatch(setVerifyOTPPending(true));
      dispatch(setVerifyOTPSuccessData(null));
      dispatch(setVerifyOTPErrorData(null));

      callVerifyrequestedotp(verifyOTPObject, response => {
        dispatch(setVerifyOTPPending(false));
        if (response.status) {
          dispatch(setVerifyOTPSuccessData(response.result.data));
        } else {
          dispatch(setVerifyOTPErrorData(response.result.message));
        }
      });
    }
  }

}