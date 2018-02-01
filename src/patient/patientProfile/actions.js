import { SET_PATIENT_PROFILE_PENDING, SET_PATIENT_PROFILE_SUCCESS, SET_PATIENT_PROFILE_ERROR } from './constants';
import { callPatientProfileApi } from './services';

function setRequestPatientProfilePending(isPatientProfileLoading) {
    return {
        type: SET_PATIENT_PROFILE_PENDING,
        isPatientProfileLoading
    };
}

function setRequestPatientProfileSuccess(onRequestPatientProfileSuccess) {
    return {
        type: SET_PATIENT_PROFILE_SUCCESS,
        onRequestPatientProfileSuccess
    };
}

function setRequestParientProfileErrorData(onRequestParientProfileError) {
    return {
        type: SET_PATIENT_PROFILE_ERROR,
        onRequestParientProfileError
    }
}

export function patientProfileAction() {
    return dispatch => {
        dispatch(setRequestPatientProfilePending(true));
        dispatch(setRequestPatientProfileSuccess(null));
        dispatch(setRequestParientProfileErrorData(null));

        callPatientProfileApi(response => {
            dispatch(setRequestPatientProfilePending(false));
            if (response.status) {
                dispatch(setRequestPatientProfileSuccess(response.result.data));
            } else {
                dispatch(setRequestParientProfileErrorData(response.result.message));
            }
        });
    }
}
