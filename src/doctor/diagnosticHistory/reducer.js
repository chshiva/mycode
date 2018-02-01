import {SET_DIAGNOSTIC_HISTORY_PENDING, SET_DIAGNOSTIC_HISTORY_SUCCESS, SET_DIAGNOSTIC_HISTORY_ERROR } from './constants'; 

var initialState = {
    isDiagnosticHistoryLoading : false,
    onRequestDiagnosticHistorySuccess : null,
    onRequestDiagnosticHistoryError : null
};

export default function requestDiagnosticHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DIAGNOSTIC_HISTORY_PENDING:
      return Object.assign({}, state, {
        isDiagnosticHistoryLoading: action.isDiagnosticHistoryLoading
      });

    case SET_DIAGNOSTIC_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        onRequestDiagnosticHistorySuccess: action.onRequestDiagnosticHistorySuccess
      });

    case SET_DIAGNOSTIC_HISTORY_ERROR:
      return Object.assign({}, state, {
        onRequestDiagnosticHistoryError: action.onRequestDiagnosticHistoryError
      });

    default:
      return state;
  }
}