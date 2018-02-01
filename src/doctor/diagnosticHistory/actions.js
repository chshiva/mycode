import {SET_DIAGNOSTIC_HISTORY_PENDING, SET_DIAGNOSTIC_HISTORY_SUCCESS, SET_DIAGNOSTIC_HISTORY_ERROR } from './constants'; 
import {callDiagnosticHistoryApi} from './services';

function setRequestDiagnosticHistoryPending(isDiagnosticHistoryLoading) {		
  return {		
    type: SET_DIAGNOSTIC_HISTORY_PENDING,		
    isDiagnosticHistoryLoading		
  };		
}		
		
function setRequestDiagnosticHistorySuccess(onRequestDiagnosticHistorySuccess) {		
  return {		
    type: SET_DIAGNOSTIC_HISTORY_SUCCESS,		
    onRequestDiagnosticHistorySuccess		
  };		
}		
		
function setRequestDiagnosticHistoryErrorData(onRequestDiagnosticHistoryError) {		
  return {		
    type: SET_DIAGNOSTIC_HISTORY_ERROR,		
    onRequestDiagnosticHistoryError		
  }		
}

export function diagnosticHistoryAction() {		
  return dispatch => {		
    dispatch(setRequestDiagnosticHistoryPending(true));		
    dispatch(setRequestDiagnosticHistorySuccess(null));		
    dispatch(setRequestDiagnosticHistoryErrorData(null));		
		
    callDiagnosticHistoryApi(response => {		
      dispatch(setRequestDiagnosticHistoryPending(false));		
      if (response.status) {		
        dispatch(setRequestDiagnosticHistorySuccess(response.result.data));		
      } else {		
        dispatch(setRequestDiagnosticHistoryErrorData(response.result.message));		
      }		
    });		
  }		
}
