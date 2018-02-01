import {SET_PRESCRIPTION_PENDING, SET_PRESCRIPTION_SUCCESS, SET_PRESCRIPTION_ERROR } from './constants'; 
import {callPrescriptionApi} from './services';

function setRequestPrescriptionPending(isPrescriptionLoading) {		
  return {		
    type: SET_PRESCRIPTION_PENDING,		
    isPrescriptionLoading		
  };		
}		
		
function setRequestPrescriptionSuccess(onRequestPrescriptionSuccess) {		
  return {		
    type: SET_PRESCRIPTION_SUCCESS,		
    onRequestPrescriptionSuccess		
  };		
}		
		
function setRequestPrescriptionErrorData(onRequestPrescriptionError) {		
  return {		
    type: SET_PRESCRIPTION_ERROR,		
    onRequestPrescriptionError		
  }		
}

export function prescriptionAction() {		
  return dispatch => {		
    dispatch(setRequestPrescriptionPending(true));		
    dispatch(setRequestPrescriptionSuccess(null));		
    dispatch(setRequestPrescriptionErrorData(null));		
		
    callPrescriptionApi(response => {		
      dispatch(setRequestPrescriptionPending(false));		
      if (response.status) {		
        dispatch(setRequestPrescriptionSuccess(response.result.data));		
      } else {		
        dispatch(setRequestPrescriptionErrorData(response.result.message));		
      }		
    });		
  }		
}
