import {SET_DIAGNOSTIC_REPORTS_PENDING, SET_DIAGNOSTIC_REPORTS_SUCCESS, SET_DIAGNOSTIC_REPORTS_ERROR } from './constants'; 
import {callPrescriptionApi} from './services';

function setRequestDiagnosticReportsPending(isDiagnosticReportsLoading) {		
  return {		
    type: SET_DIAGNOSTIC_REPORTS_PENDING,		
    isDiagnosticReportsLoading		
  };		
}		
		
function setRequestDiagnosticReportsSuccess(onRequestDiagnosticReportsSuccess) {		
  return {		
    type: SET_DIAGNOSTIC_REPORTS_SUCCESS,		
    onRequestDiagnosticReportsSuccess		
  };		
}		
		
function setRequestDiagnosticReportsErrorData(onRequestDiagnosticReportsError) {		
  return {		
    type: SET_DIAGNOSTIC_REPORTS_ERROR,		
    onRequestDiagnosticReportsError		
  }		
}

export function diagnosticReportsAction() {		
  return dispatch => {		
    dispatch(setRequestDiagnosticReportsPending(true));		
    dispatch(setRequestDiagnosticReportsSuccess(null));		
    dispatch(setRequestDiagnosticReportsErrorData(null));		
		
    callDiagnosticReportsApi(response => {		
      dispatch(setRequestDiagnosticReportsPending(false));		
      if (response.status) {		
        dispatch(setRequestDiagnosticReportsSuccess(response.result.data));		
      } else {		
        dispatch(setRequestDiagnosticReportsErrorData(response.result.message));		
      }		
    });		
  }		
}
