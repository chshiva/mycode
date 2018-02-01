import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_USER_TOKEN, SET_USER_TYPE, SET_DOCTOR_FORM_STATUS } from './constants';

import callLoginApi from './services';
import { callGetUserDetailsApi } from '../layouts/patientLayout/layout/services';

function setLoginPending(isLoading) {
  return {
    type: SET_LOGIN_PENDING,
    isLoading
  };
}

function setLoginSuccess(successData) {
  return {
    type: SET_LOGIN_SUCCESS,
    successData
  };
}

function setLoginErrorData(errorData) {
  return {
    type: SET_LOGIN_ERROR,
    errorData
  }
}

export function setUserType(data) {
  return {
    type: SET_USER_TYPE,
    data
  }
}

export function setDoctorFormStatus(data) {
  return {
    type: SET_DOCTOR_FORM_STATUS,
    data
  }
}

export function emptyError(){
  return dispatch =>{
    dispatch(setLoginSuccess(null));
    dispatch(setLoginErrorData(null));
  }
}

export function getUserRole () {
  console.log("login Action")
  return dispatch => {
    dispatch(setLoginPending(true));

    callGetUserDetailsApi(response => {
      if (!response.status && response.result.userData) {
        console.log("isDoctorForm ----- ", response.result.userData.isDoctorForm);
        dispatch(setUserType(response.result.userData.userType));
        dispatch(setDoctorFormStatus(response.result.userData.isDoctorForm));
      } else if (response.status && response.result.data){
        console.log("isDoctorForm ----- ", response.result.data.isDoctorForm);
        dispatch(setDoctorFormStatus(response.result.data.isDoctorForm));
        dispatch(setUserType(response.result.data.userType));
      } else {
        localStorage.clear();
        dispatch(setLoginErrorData(response.result.message));
      }
      dispatch(setLoginPending(false));    
    });    
  }


}


export function loginAction(loginData) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(null));
    dispatch(setLoginErrorData(null));
    dispatch(setDoctorFormStatus(false));

    callLoginApi(loginData, response => {
      console.log("callLoginApi response ",response);
      if (response.status) {
        localStorage.setItem('userAuthToken', response.result.data.userAuthToken);
        dispatch(setLoginSuccess(response.result.data));
        callGetUserDetailsApi(response => {

          if (!response.status && response.result.userData) {
            console.log("userType ----- ", response.result.userData.userType);
            dispatch(setDoctorFormStatus(response.result.userData.isDoctorForm));
            dispatch(setUserType(response.result.userData.userType));
          } else if (response.status && response.result.data){
            console.log("userType ----- ", response.result.data.userType);
            dispatch(setDoctorFormStatus(response.result.data.isDoctorForm));
            dispatch(setUserType(response.result.data.userType));
          } else {
            localStorage.clear();
            dispatch(setLoginErrorData(response.result.message));
          }
        });
      } else {
        dispatch(setLoginErrorData(response.result.message));
      }


      dispatch(setLoginPending(false));
    });
  }
}