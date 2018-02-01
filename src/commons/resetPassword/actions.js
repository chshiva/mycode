import { SET_RESET_PASSWORD_PENDING, SET_RESET_PASSWORD_SUCCESS, SET_RESET_PASSWORD_ERROR } from './constants';

import callResetPasswordApi from './services';

function setResetPasswordPending(isLoading) {
  return {
    type: SET_RESET_PASSWORD_PENDING,
    isLoading
  };
}

function setResetPasswordSuccessData (successFlag) {
     return {
          type: SET_RESET_PASSWORD_SUCCESS,
          successFlag
     };
}

function setResetPasswordErrorData (resetPasswordResponseErrorData) {
     return {
          type: SET_RESET_PASSWORD_SUCCESS,
          resetPasswordResponseErrorData
     };
}

export function resetPasswordAction (resetPasswordRequestData) {
  return dispatch => {
    dispatch(setResetPasswordPending(true));
    dispatch(setResetPasswordSuccessData(null));
    dispatch(setResetPasswordErrorData(null));

    callResetPasswordApi(resetPasswordRequestData, response => {
      dispatch(setResetPasswordPending(false));
      if (response.status) {
        dispatch(setResetPasswordSuccessData(response.status));
      } else {
        dispatch(setResetPasswordErrorData((response.result && response.result.message) || "Please Enter Valid Details."));
      }
    });
 }
}