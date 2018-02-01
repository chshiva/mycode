import { SET_DOCTOR_REGISTRATION_PENDING, SET_DOCTOR_REGISTRATION_SUCCESS, SET_DOCTOR_REGISTRATION_ERROR } from './constants';

import callDoctorRegistrationApi from './services';

function setDoctorRegistrationPending(isLoading) {
  return {
    type: SET_DOCTOR_REGISTRATION_PENDING,
    isLoading
  };
}

function setDoctorRegistrationSuccessData(successData) {
  return {
    type: SET_DOCTOR_REGISTRATION_SUCCESS,
    successData
  };
}

function setDoctorRegistrationErrorData(errorData) {
  return {
    type: SET_DOCTOR_REGISTRATION_ERROR,
    errorData
  }
}

export function doctorRegistrationAction(registerPatientData) {
  return dispatch => {
    dispatch(setDoctorRegistrationPending(true));
    dispatch(setDoctorRegistrationSuccessData(null));
    dispatch(setDoctorRegistrationErrorData(null));

    callDoctorRegistrationApi(registerPatientData, response => {
      dispatch(setDoctorRegistrationPending(false));
      if (response.status) {
        dispatch(setDoctorRegistrationSuccessData(response.result.data));
      } else {
        dispatch(setDoctorRegistrationErrorData(response.result.message));
      }
    });
  }
}