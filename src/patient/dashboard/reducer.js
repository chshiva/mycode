import { SET_REQUEST_ACCOUNTS_PENDING, SET_REQUEST_ACCOUNTS_SUCCESS, SET_REQUEST_ACCOUNTS_ERROR } from './constants';

const requestForAccountsInitialState = {
    isLoading: false,
    onSuccess: null,
    onError: null
};

export function accountsReducer(state = requestForAccountsInitialState, action) {
    switch (action.type) {
        case SET_REQUEST_ACCOUNTS_PENDING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });

        case SET_REQUEST_ACCOUNTS_SUCCESS:
            return Object.assign({}, state, {
                onSuccess: action.successData
            });

        case SET_REQUEST_ACCOUNTS_ERROR:
            return Object.assign({}, state, {
                onError: action.errorData
            });

        default:
            return state;
    }
}





// // ----------------------
//  check of userAuthToken
//  then make a call to get user details and update them in user userReducer
//  then make a call to get authChecks
// // ----------------------

import { SET_REQUEST_USER_DETAILS_PENDING, SET_REQUEST_USER_DETAILS_SUCCESS, SET_REQUEST_USER_DETAILS_ERROR } from './constants';

const requestForUserDetailsInitialState = {
    isLoading: false,
    onSuccess: null,
    onError: null
};

export function userReducer(state = requestForUserDetailsInitialState, action) {
    switch (action.type) {
        case SET_REQUEST_USER_DETAILS_PENDING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });

        case SET_REQUEST_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                onSuccess: action.successData
            });

        case SET_REQUEST_USER_DETAILS_ERROR:
            return Object.assign({}, state, {
                onError: action.errorData
            });

        default:
            return state;
    }
}