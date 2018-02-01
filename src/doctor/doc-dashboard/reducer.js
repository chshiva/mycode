import {SET_DOCTOR_DASHBOARD_PENDING, SET_DOCTOR_DASHBOARD_SUCCESS, SET_DOCTOR_DASHBOARD_ERROR } from './constants'; 

var initialState = {
    isDoctorDashboardLoading : false,
    onRequestDoctorDashboardSuccess : null,
    onRequestDoctorDashboardError : null
};

export default function requestDoctorDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DOCTOR_DASHBOARD_PENDING:
      return Object.assign({}, state, {
        isDoctorDashboardLoading: action.isDoctorDashboardLoading
      });

    case SET_DOCTOR_DASHBOARD_SUCCESS:
      return Object.assign({}, state, {
        onRequestDoctorDashboardSuccess: action.onRequestDoctorDashboardSuccess
      });

    case SET_DOCTOR_DASHBOARD_ERROR:
      return Object.assign({}, state, {
        onRequestDoctorDashboardError: action.onRequestDoctorDashboardError
      });

    default:
      return state;
  }
}