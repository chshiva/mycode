import {SET_DOCTOR_PROFILE_PENDING, SET_DOCTOR_PROFILE_SUCCESS, SET_DOCTOR_PROFILE_ERROR, SET_CHANGE_PASSWORD_PENDING,SET_CHANGE_PASSWORD_SUCCESS,SET_CHANGE_PASSWORD_ERROR } from './constants';
import { callDoctorProfileApi,callChangePasswordApi } from './services';

function setRequestDoctorProfilePending(isDoctorProfileLoading) {
    return {
        type: SET_DOCTOR_PROFILE_PENDING,
        isDoctorProfileLoading
    };
}

function setRequestDoctorProfileSuccess(onRequestDoctorProfileSuccess) {
    return {
        type: SET_DOCTOR_PROFILE_SUCCESS,
        onRequestDoctorProfileSuccess
    };
}

function setRequestDoctorProfileErrorData(onRequestDoctorProfileError) {
    return {
        type: SET_DOCTOR_PROFILE_ERROR,
        onRequestDoctorProfileError
    }
}


function setChangePasswordPending(isChangePasswordLoading) {
    return {
        type: SET_CHANGE_PASSWORD_PENDING,
        isChangePasswordLoading
    };
}

function setChangePasswordSuccess(onChangePasswordSuccess) {
    return {
        type: SET_CHANGE_PASSWORD_SUCCESS,
        onChangePasswordSuccess
    };
}

function setChangePasswordErrorData(onChangePasswordError) {
    return {
        type: SET_CHANGE_PASSWORD_ERROR,
        onChangePasswordError
    }
}
export function emptyMessages(){
    return dispatch =>{
        dispatch(setChangePasswordSuccess(null));
        dispatch(setChangePasswordErrorData(null));
    }
}

export function doctorProfileAction() {
    return dispatch => {
        dispatch(setRequestDoctorProfilePending(true));
        dispatch(setRequestDoctorProfileSuccess(null));
        dispatch(setRequestDoctorProfileErrorData(null));
        

        callDoctorProfileApi(response => {
            dispatch(setRequestDoctorProfilePending(false));
            if (response.status) {
                dispatch(setRequestDoctorProfileSuccess(response.result.data));
            } else {
                dispatch(setRequestDoctorProfileErrorData(response.result.message));
            }
        });
    }
}


export function changePasswordAction(data) {
    return dispatch => {
        dispatch(setChangePasswordPending(true));
        dispatch(setChangePasswordSuccess(null));
        dispatch(setChangePasswordErrorData(null));

        callChangePasswordApi(data,response => {
            dispatch(setChangePasswordPending(false));
            if (response.status) {
                dispatch(setChangePasswordSuccess(response.result.data));
            } else {
                dispatch(setChangePasswordErrorData(response.result.message));
            }
        });
    }
}
