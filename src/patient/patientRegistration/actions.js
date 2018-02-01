import { SET_PATIENT_REGISTRATION_PENDING, SET_PATIENT_REGISTRATION_SUCCESS, SET_PATIENT_REGISTRATION_ERROR } from './constants';

import callPatientRegistrationApi from './services';

function setPatientRegistrationPending(isLoading) {
  return {
    type: SET_PATIENT_REGISTRATION_PENDING,
    isLoading
  };
}

function setPatientRegistrationSuccessData(successData) {
  return {
    type: SET_PATIENT_REGISTRATION_SUCCESS,
    successData
  };
}

function setPatientRegistrationErrorData(errorData) {
  return {
    type: SET_PATIENT_REGISTRATION_ERROR,
    errorData
  }
}

export function patientRegistrationAction(registerPatientData) {
  return dispatch => {
    dispatch(setPatientRegistrationPending(true));
    dispatch(setPatientRegistrationSuccessData(null));
    dispatch(setPatientRegistrationErrorData(null));

    callPatientRegistrationApi(registerPatientData, response => {
      dispatch(setPatientRegistrationPending(false));
      if (response.status) {
        dispatch(setPatientRegistrationSuccessData(response.result.data));
      } else {
        dispatch(setPatientRegistrationErrorData(response.result.message));
      }
    });
  }
}