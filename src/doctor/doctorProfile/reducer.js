import { SET_DOCTOR_PROFILE_PENDING, SET_DOCTOR_PROFILE_SUCCESS, SET_DOCTOR_PROFILE_ERROR, SET_CHANGE_PASSWORD_PENDING, SET_CHANGE_PASSWORD_SUCCESS, SET_CHANGE_PASSWORD_ERROR } from './constants';

var initialState = {
    isDoctorProfileLoading: false,
    onRequestDoctorProfileSuccess: null,
    onRequestDoctorProfileError: null
};

export default function requestDoctorProfileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DOCTOR_PROFILE_PENDING:
            return Object.assign({}, state, {
                isDoctorProfileLoading: action.isDoctorProfileLoading
            });

        case SET_DOCTOR_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                onRequestDoctorProfileSuccess: action.onRequestDoctorProfileSuccess
            });

        case SET_DOCTOR_PROFILE_ERROR:
            return Object.assign({}, state, {
                onRequestDoctorProfileError: action.onRequestDoctorProfileError
            });

        case SET_CHANGE_PASSWORD_PENDING:
            return Object.assign({}, state, {
                isChangePasswordLoading: action.isChangePasswordLoading
            });

        case SET_CHANGE_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                onChangePasswordSuccess: action.onChangePasswordSuccess
            });

        case SET_CHANGE_PASSWORD_ERROR:
            return Object.assign({}, state, {
                onChangePasswordError: action.onChangePasswordError
            });


        default:
            return state;
    }
}