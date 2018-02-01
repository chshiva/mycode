import { SET_CONSENT_PENDING, SET_CONSENT_SUCCESS, SET_CONSENT_ERROR } from './constants';
import callConsetAgreeApi from './services';

import { setConsentVerification } from '../../commons/layouts/patientLayout/layout/actions';

function setConsentPending(isLoading) {
    return {
        type: SET_CONSENT_PENDING,
        isLoading
    };
}

function setConsentSuccess(successData) {
    return {
        type: SET_CONSENT_SUCCESS,
        successData
    };
}

function setConsentErrorData(errorData) {
    return {
        type: SET_CONSENT_ERROR,
        errorData
    }
}


export function consentAgreeAction (consentObject) {
    console.log("consentObject ", consentObject);

  return dispatch => {
    dispatch(setConsentPending(true));
    dispatch(setConsentSuccess(null));
    dispatch(setConsentErrorData(null));

    callConsetAgreeApi(consentObject, response => {
      console.log("consentObject response ", response);
      dispatch(setConsentPending(false));

      if (response.status) {
        dispatch(setConsentVerification(true));
        dispatch(setConsentSuccess(true));
      } else {
        dispatch(setConsentErrorData(response.result.message));
      }
    });
  }
}