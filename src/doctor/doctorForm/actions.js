
import {
    SET_DOCTOR_DETAILS_FORM_PENDING,

    SET_DOCTOR_DETAILS_FORM_STEP_ZERO_FAILURE,
    SET_DOCTOR_DETAILS_FORM_STEP_ZERO_SUCCESS,
    SET_DOCTOR_DETAILS_FORM_STEP_ZERO_DATA,

    SET_DOCTOR_DETAILS_FORM_STEP_ONE_FAILURE,
    SET_DOCTOR_DETAILS_FORM_STEP_ONE_SUCCESS,
    SET_DOCTOR_DETAILS_FORM_STEP_ONE_DATA,

    SET_DOCTOR_DETAILS_FORM_STEP_TWO_FAILURE,
    SET_DOCTOR_DETAILS_FORM_STEP_TWO_SUCCESS,
    SET_DOCTOR_DETAILS_FORM_STEP_TWO_DATA,

    SET_DOCTOR_DETAILS_FORM_STEP_THREE_FAILURE,
    SET_DOCTOR_DETAILS_FORM_STEP_THREE_SUCCESS,
    SET_DOCTOR_DETAILS_FORM_STEP_THREE_DATA,


    SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_FAILURE,
    SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_SUCCESS,
    SET_STEP_INDEX,
    SET_REDIRECT_TO_DASHBOARD
} from './constants';

import { callDoctorDetailsFormAPi } from './services';

function setRedirectDashboard(data) {
    console.log("setRedirectDashboard ")
    return {
        type: SET_REDIRECT_TO_DASHBOARD,
        data
    };
}

function setDoctorDetailsFormPending(isLoading) {
    console.log("setDoctorDetailsFormPending ")
    return {
        type: SET_DOCTOR_DETAILS_FORM_PENDING,
        isLoading
    };
}

function setDoctorDetailsFormData(data, type) {
    return {
        type: type,
        data
    };
}

function setDoctorDetailsFormSuccess(data, type) {
    return {
        type: type,
        data
    };
}

function setDoctorDetailsFormFailure(data, type) {
    return {
        type: type,
        data
    };
}

function setStepIndex(data, type) {
    return {
        type: type,
        data
    };
}

export function setDoctorDetailsFormStepIndex(stepIndex) {
    return dispatch => {
        dispatch(setStepIndex(stepIndex, SET_STEP_INDEX));
    }
}

export function setStepError(message) {
    return dispatch => {
        dispatch(setDoctorDetailsFormFailure(message, SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_FAILURE));
    }
}

export function setp0DoctorDetailsFormAction(data) {
    console.log("setp0DoctorDetailsFormAction ", data);
    return dispatch => {
        console.log("1");
        dispatch(setDoctorDetailsFormPending(true));
        console.log("2");
        dispatch(setDoctorDetailsFormData(data, SET_DOCTOR_DETAILS_FORM_STEP_ZERO_DATA));
        console.log("3");
        callDoctorDetailsFormAPi('doctordetailsform/basicdetails', data, 'post', response => {
            console.log("callDoctorDetailsFormAPi response for step 0 ", response);
            if (response.status) {
                dispatch(setDoctorDetailsFormSuccess(true, SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_SUCCESS));
                dispatch(setStepIndex(1, SET_STEP_INDEX));
                dispatch(setDoctorDetailsFormFailure(null, SET_DOCTOR_DETAILS_FORM_STEP_ZERO_FAILURE));
                // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));
            } else {
                dispatch(setDoctorDetailsFormFailure((response.result && response.result.message), SET_DOCTOR_DETAILS_FORM_STEP_ZERO_FAILURE));
            }
            dispatch(setDoctorDetailsFormPending(false));
        });
    }
}

export function setp1DoctorDetailsFormAction(data) {
    return dispatch => {
        dispatch(setDoctorDetailsFormPending(true));
        dispatch(setDoctorDetailsFormData(data, SET_DOCTOR_DETAILS_FORM_STEP_ONE_DATA));
        callDoctorDetailsFormAPi('doctordetailsform/addressdetails', data, 'post', response => {
            console.log("callDoctorDetailsFormAPi response for step 1 ", response);
            if (response.status) {

                dispatch(setDoctorDetailsFormSuccess(true, SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_SUCCESS));
                dispatch(setStepIndex(2, SET_STEP_INDEX));
                dispatch(setDoctorDetailsFormFailure(null, SET_DOCTOR_DETAILS_FORM_STEP_ONE_FAILURE));
                // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));
            } else {
                dispatch(setDoctorDetailsFormFailure((response.result && response.result.message), SET_DOCTOR_DETAILS_FORM_STEP_ONE_FAILURE));
            }
            dispatch(setDoctorDetailsFormPending(false));
        });
    }
}

export function setp2DoctorDetailsFormAction(data) {

    return dispatch => {
        dispatch(setDoctorDetailsFormPending(true));
        dispatch(setDoctorDetailsFormData(data, SET_DOCTOR_DETAILS_FORM_STEP_TWO_DATA));

        callDoctorDetailsFormAPi('doctordetailsform/contactdetails', data, 'post', response => {
            console.log("callDoctorDetailsFormAPi response for step 2 ", response);
            if (response.status) {
                dispatch(setDoctorDetailsFormSuccess(true, SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_SUCCESS));
                dispatch(setStepIndex(3, SET_STEP_INDEX));
                dispatch(setDoctorDetailsFormFailure(null, SET_DOCTOR_DETAILS_FORM_STEP_TWO_FAILURE));
                // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));        
            } else {
                dispatch(setDoctorDetailsFormFailure((response.result && response.result.message), SET_DOCTOR_DETAILS_FORM_STEP_TWO_FAILURE));
            }
            dispatch(setDoctorDetailsFormPending(false));
        });
    }
}

export function setp3DoctorDetailsFormAction(data) {
    return dispatch => {
        dispatch(setDoctorDetailsFormPending(true));
        dispatch(setDoctorDetailsFormData(data, SET_DOCTOR_DETAILS_FORM_STEP_THREE_DATA));
        callDoctorDetailsFormAPi('doctordetailsform/information', data, 'post', response => {
            console.log("callDoctorDetailsFormAPi response for step 3 ", response);
            if (response.status) {
                dispatch(setDoctorDetailsFormSuccess(true, SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_SUCCESS));
                dispatch(setStepIndex(4, SET_STEP_INDEX));
                dispatch(setDoctorDetailsFormFailure(null, SET_DOCTOR_DETAILS_FORM_STEP_THREE_FAILURE));
                // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));
            } else {
                dispatch(setDoctorDetailsFormFailure((response.result && response.result.message), SET_DOCTOR_DETAILS_FORM_STEP_THREE_FAILURE));
            }
            dispatch(setDoctorDetailsFormPending(false));
        });
    }
}



export function getDoctorDetailsFormAction() {
    console.log("getDoctorDetailsFormDeatilsAction");
    return dispatch => {
        dispatch(setDoctorDetailsFormPending(true));
        callDoctorDetailsFormAPi('doctordetailsform', {}, 'get', response => {
            console.log("getDoctorDetailsFormDeatilsAction response ", response);
            if (response.status) {
                if (response.result && response.result.data) {
                    var doctordetailsform = response.result.data.doctordetailsform;

                    // Update Step Zero Details          
                    if (doctordetailsform && doctordetailsform.basicdetails) dispatch(setDoctorDetailsFormData(doctordetailsform.basicdetails, SET_DOCTOR_DETAILS_FORM_STEP_ZERO_DATA));

                    // Update Step One Details
                    if (doctordetailsform && doctordetailsform.address) dispatch(setDoctorDetailsFormData(doctordetailsform.address, SET_DOCTOR_DETAILS_FORM_STEP_ONE_DATA));

                    // Update Step Two Details
                    if (doctordetailsform && doctordetailsform.contactdetails) dispatch(setDoctorDetailsFormData(doctordetailsform.contactdetails, SET_DOCTOR_DETAILS_FORM_STEP_TWO_DATA));

                    // Update Step Three Details
                    if (doctordetailsform && doctordetailsform.information) dispatch(setDoctorDetailsFormData(doctordetailsform.information, SET_DOCTOR_DETAILS_FORM_STEP_THREE_DATA));

                   
                }
                dispatch(setDoctorDetailsFormSuccess(response.status, SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_SUCCESS));
            } else {

                if (!response.message == "Document Not Found") {
                    dispatch(setDoctorDetailsFormFailure((response.result && response.result.message), SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_FAILURE));
                }

            }
            dispatch(setDoctorDetailsFormPending(false));
        });
    }
}