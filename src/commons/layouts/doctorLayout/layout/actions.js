import { SET_STARTUP_PENDING, SET_USER_DETAILS, SET_USER_AUTH_TOKEN, SET_MOBILE_NUMBER_VERIFICATION, SET_CONSENT_PAGE_VERIFICATION, SET_MEDICAL_FORM_FILLING, SET_STARTUP_ERROR } from './constants';

import { callGetUserDetailsApi } from './services';

export function setStartupPending (isLoading) {
	return {
		type: SET_STARTUP_PENDING,
		isLoading: isLoading
	}
}

export function setUserAuthToken (userAuthToken) {
	console.log("setUserAuthToken ", userAuthToken);
	return {
		type: SET_USER_AUTH_TOKEN,
		userAuthToken: userAuthToken
	}
}

export function setMobileNumberVerification (isMobileNumberVerified) {
	return {
		type: SET_MOBILE_NUMBER_VERIFICATION,
		isMobileNumberVerified: isMobileNumberVerified
	}
}

export function setConsentVerification (isConsentAgreed) {
	return {
		type: SET_CONSENT_PAGE_VERIFICATION,
		isConsentAgreed: isConsentAgreed
	}
}

export function setDoctorFormFillingStatus (isMedicalFormFilled) {
	return {
		type: SET_MEDICAL_FORM_FILLING,
		isMedicalFormFilled: isMedicalFormFilled
	}
}

export function setUserDetails (userDetails) {
	return {
		type: SET_USER_DETAILS,
		userDetails: userDetails
	}
}

export function setStartupError (error) {
	return {
		type: SET_STARTUP_ERROR,
		userDetails: error
	}
}

export function getUserDetails () {
	console.log("getUserDetails called");

	return dispatch => {
	  dispatch(setStartupPending(true));
		console.log("calling callGetUserDetailsApi");
	  callGetUserDetailsApi(response => {
	  	console.log("callGetUserDetailsApi response ", response);
	    dispatch(setStartupPending(false));

	    if (!response.status) {
	    	if (response.result && (response.result.isInvalidToken || response.result.userNotFound)) {
	    		localStorage.clear();
	    		dispatch(setUserAuthToken(null));
	    	} else if (response.result && response.result.authChecks) {
	    		dispatch(setMobileNumberVerification(response.result.authChecks.isMobileNumberVerified));
	    		dispatch(setConsentVerification(response.result.authChecks.isConsentAgreed));
	    		// dispatch(setDoctorFormFillingStatus(response.result.authChecks.isDoctorFormFilled));
	    	} else {
	    		dispatch(setStartupError(response.result.message));
	    	}
	    } else {
	    	console.log('callGetUserDetailsApi status true');
	    	dispatch(setUserDetails(response.result.data));
	    }
	  });
	}

}