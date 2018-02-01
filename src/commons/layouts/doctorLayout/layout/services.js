import utils from '../../../utils';

export function callGetUserDetailsApi(callback) {
	utils.httpRequest('userdetails', 'get', undefined, (response) => {
		console.log("userdetails response ",response);
		callback(response);
	});
}