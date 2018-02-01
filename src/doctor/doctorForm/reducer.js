
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

var initialState = {
    basicdetails: null,
    address: null,
    contactdetails: null,
    information: null,

    success: null,
    error: null,
    isLoading: false,
    stepIndex: 0,
    redirectToDashboard: false
};

export default function doctorDetailsFormReducer(state, action) {
    state = state || initialState;
    switch (action.type) {
        case SET_DOCTOR_DETAILS_FORM_PENDING: {
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });
        }


        case SET_DOCTOR_DETAILS_FORM_STEP_ZERO_FAILURE: {
            return Object.assign({}, state, {
                error: action.data
            });
        }
        case SET_DOCTOR_DETAILS_FORM_STEP_ZERO_SUCCESS: {
            return Object.assign({}, state, {
                success: action.data
            });
        }
        case SET_DOCTOR_DETAILS_FORM_STEP_ZERO_DATA: {
            return Object.assign({}, state, {
                basicdetails: action.data
            });
        }

        case SET_DOCTOR_DETAILS_FORM_STEP_ONE_FAILURE: {
            return Object.assign({}, state, {
                error: action.data
            });
        }
        case SET_DOCTOR_DETAILS_FORM_STEP_ONE_SUCCESS: {
            return Object.assign({}, state, {
                success: action.data
            });
        }
        case SET_DOCTOR_DETAILS_FORM_STEP_ONE_DATA: {
            return Object.assign({}, state, {
                address: action.data
            });
        }

        case SET_DOCTOR_DETAILS_FORM_STEP_TWO_FAILURE: {
            return Object.assign({}, state, {
                error: action.data
            });
        }
        case SET_DOCTOR_DETAILS_FORM_STEP_TWO_SUCCESS: {
            return Object.assign({}, state, {
                success: action.data
            });
        }
        case SET_DOCTOR_DETAILS_FORM_STEP_TWO_DATA: {
            return Object.assign({}, state, {
                contactdetails: action.data
            });
        }

        case SET_DOCTOR_DETAILS_FORM_STEP_THREE_FAILURE: {
            return Object.assign({}, state, {
                error: action.data
            });
        }
        case SET_DOCTOR_DETAILS_FORM_STEP_THREE_SUCCESS: {
            return Object.assign({}, state, {
                success: action.data
            });
        }
        case SET_DOCTOR_DETAILS_FORM_STEP_THREE_DATA: {
            return Object.assign({}, state, {
                information: action.data
            });
        }

       
        case SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_FAILURE: {
            return Object.assign({}, state, {
                error: action.data
            });
        }
        case SET_REQUEST_DOCTOR_DETAILS_FORM_STEP_SUCCESS: {
            return Object.assign({}, state, {
                success: action.data
            });
        }

        case SET_STEP_INDEX: {
            return Object.assign({}, state, {
                stepIndex: action.data
            });
        }

        case SET_REDIRECT_TO_DASHBOARD: {
            return Object.assign({}, state, {
                redirectToDashboard: action.data
            });
        }




        default:
            return state;
    }
}