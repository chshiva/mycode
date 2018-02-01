import { SET_STARTUP_PENDING, SET_USER_DETAILS, SET_USER_AUTH_TOKEN, SET_MOBILE_NUMBER_VERIFICATION, SET_CONSENT_PAGE_VERIFICATION, SET_MEDICAL_FORM_FILLING, SET_STARTUP_ERROR } from './constants';

import { getUserDetails } from './actions';

const initialState = {
	isLoading: false,
	userAuthToken: localStorage.getItem('userAuthToken') || null,
	isMobileNumberVerified: false,
	isConsentAgreed: false,
	isMedicalFormFilled: false,
	userDetails: null,
	onError: null
};

export default function startupReducer (state=initialState, action) {
	console.log("localStorage.getItem(userAuthToken) ");
	switch (action.type) {

		case SET_STARTUP_PENDING:
			return Object.assign({}, state, {
        isLoading: action.isLoading
      });

		case SET_USER_AUTH_TOKEN: 
			return Object.assign({}, state, {
        userAuthToken: action.userAuthToken
      });      

		case SET_MOBILE_NUMBER_VERIFICATION:
			return Object.assign({}, state, {
        isMobileNumberVerified: action.isMobileNumberVerified
      });

		case SET_CONSENT_PAGE_VERIFICATION:
			return Object.assign({}, state, {
        isConsentAgreed: action.isConsentAgreed
      });

		case SET_MEDICAL_FORM_FILLING:
			return Object.assign({}, state, {
        isMedicalFormFilled: action.isMedicalFormFilled
      });

		case SET_USER_DETAILS: 
			return Object.assign({}, state, {
        userDetails: action.userDetails
      });

		case SET_STARTUP_ERROR:
			return Object.assign({}, state, {
        onError: action.onError
      });

    default:
      return state;
	}
}