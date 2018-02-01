import {SET_DOCTOR_DASHBOARD_PENDING, SET_DOCTOR_DASHBOARD_SUCCESS, SET_DOCTOR_DASHBOARD_ERROR } from './constants'; 
import {callDoctorDashboardApi} from './services';

function setRequestDoctorDashboardPending(isDoctorDashboardLoading) {		
  return {		
    type: SET_DOCTOR_DASHBOARD_PENDING,		
    isDoctorDashboardLoading		
  };		
}		
		
function setRequestDoctorDashboardSuccess(onRequestDoctorDashboardSuccess) {		
  return {		
    type: SET_DOCTOR_DASHBOARD_SUCCESS,		
    onRequestDoctorDashboardSuccess		
  };		
}		
		
function setRequestDoctorDashboardErrorData(onRequestDoctorDashboardError) {		
  return {		
    type: SET_DOCTOR_DASHBOARD_ERROR,		
    onRequestDoctorDashboardError		
  }		
}

export function doctorDashboardAction() {		
  return dispatch => {		
    dispatch(setRequestDoctorDashboardPending(true));		
    dispatch(setRequestDoctorDashboardSuccess(null));		
    dispatch(setRequestDoctorDashboardErrorData(null));		
		
    callDoctorDashboardApi(response => {		
      dispatch(setRequestDoctorDashboardPending(false));		
      if (response.status) {		
        dispatch(setRequestDoctorDashboardSuccess(response.result.data));		
      } else {		
        dispatch(setRequestDoctorDashboardErrorData(response.result.message));		
      }		
    });		
  }		
}
