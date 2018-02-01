import utils from '../utils';


// Send OTP will be called when user has userId
export function callSendOTPApi (sendOTPObject, callback) {
	console.log("sendOTPObject ---- ", sendOTPObject);
	utils.httpRequest('users/sendotp', 'post', sendOTPObject, (response) => {
			console.log("sendOTPObject response ---- ", response);
			callback(response);
	});
}


// Request OTP will be called when user has AuthToken
export function callRequestOTPApi (callback) {
	utils.httpRequest('users/requestotp', 'post', {}, (response) => {
			console.log("sendOTPObject response ---- ", response);
			callback(response);
	});
}

// Request OTP will be called when user has AuthToken
export function callVerifyrequestedotp (obj, callback) {
	utils.httpRequest('users/verifyrequestedotp', 'post', obj, (response) => {
			console.log("callVerifyrequestedotp response ---- ", response);
			callback(response);
	});
}

export function callVerifyOTPApi (verifyOTPRequestData, callback) {
	console.log("verifyOTPRequestData ---- ", verifyOTPRequestData);	
	utils.httpRequest('users/verifyotp', 'post', verifyOTPRequestData, (response) => {
		console.log("verifyOTPRequestData response ---- ", response);
		callback(response);
	});
}