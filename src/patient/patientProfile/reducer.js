import { SET_PATIENT_PROFILE_PENDING, SET_PATIENT_PROFILE_SUCCESS, SET_PATIENT_PROFILE_ERROR } from './constants';

var initialState = {
    isPatientProfileLoading: false,
    onRequestPatientProfileSuccess: null,
    onRequestParientProfileError: null
};

export default function requestPatientProfileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PATIENT_PROFILE_PENDING:
            return Object.assign({}, state, {
                isPatientProfileLoading: action.isPatientProfileLoading
            });

        case SET_PATIENT_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                onRequestPatientProfileSuccess: action.onRequestPatientProfileSuccess
            });

        case SET_PATIENT_PROFILE_ERROR:
            return Object.assign({}, state, {
                onRequestParientProfileError: action.onRequestParientProfileError
            });

        default:
            return state;
    }
}