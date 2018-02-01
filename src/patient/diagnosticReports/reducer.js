import {SET_DIAGNOSTIC_REPORTS_PENDING, SET_DIAGNOSTIC_REPORTS_SUCCESS, SET_DIAGNOSTIC_REPORTS_ERROR } from './constants'; 

var initialState = {
    isDiagnosticReportsLoading : false,
    onRequestDiagnosticReportsSuccess : null,
    onRequestDiagnosticReportsError : null
};

export default function diagnosticReportsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DIAGNOSTIC_REPORTS_PENDING:
      return Object.assign({}, state, {
        isDiagnosticReportsLoading: action.isDiagnosticReportsLoading
      });

    case SET_DIAGNOSTIC_REPORTS_SUCCESS:
      return Object.assign({}, state, {
        onRequestDiagnosticReportsSuccess: action.onRequestDiagnosticReportsSuccess
      });

    case SET_DIAGNOSTIC_REPORTS_ERROR:
      return Object.assign({}, state, {
        onRequestDiagnosticReportsError: action.onRequestDiagnosticReportsError
      });

    default:
      return state;
  }
}