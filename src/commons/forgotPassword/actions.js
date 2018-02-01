import { SET_FORGOT_PASSWORD_PENDING, SET_FORGOT_PASSWORD_SUCCESS, SET_FORGOT_PASSWORD_ERROR, SET_FORGOT_PASSWORD_EMAIL } from './constants';

import callForgotPasswordApi from './services';

function setForgotPasswordPending(isLoading) {
  return {
    type: SET_FORGOT_PASSWORD_PENDING,
    isLoading
  };
}

function setForgotPasswordSuccess(status) {
  return {
    type: SET_FORGOT_PASSWORD_SUCCESS,
    status
  };
}

function setForgotPasswordEmail(forgotpasswordEmail) {
  return {
    type: SET_FORGOT_PASSWORD_EMAIL,
    forgotpasswordEmail
  };
}

function setForgotPasswordError(data) {
  return {
    type: SET_FORGOT_PASSWORD_ERROR,
    data
  }
}

export function forgotPasswordError (error) {
  return dispatch => {
    dispatch(setForgotPasswordError (error));
  }
}

export function forgotPasswordAction(data) {
  return dispatch => {
    console.log("------ data.email ", data.email);
    dispatch(setForgotPasswordEmail(data.email));
    dispatch(setForgotPasswordPending(true));
    dispatch(setForgotPasswordSuccess(null));
    dispatch(setForgotPasswordError(null));

    callForgotPasswordApi(data, response => {
      dispatch(setForgotPasswordPending(false));
      if (response.status) {
        dispatch(setForgotPasswordSuccess(response.status));
      } else {
        dispatch(setForgotPasswordError((response.result && response.result.message) || "User Not Found."));
      }
    });
  }
}