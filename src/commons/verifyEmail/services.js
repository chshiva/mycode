import utils from '../utils';


export default function callVerifyEmailApi (token, callback) {
	utils.httpRequest('verifyemail/'+token, 'get', undefined, (response) => {
		console.log("verifyemail response ---- ", response);
		callback(response);
	});
}