import utils from '../utils';

export default function callLoginApi(loginData, callback) {
	utils.httpRequest('login', 'post', loginData, (response) => {
		console.log("callLoginApi response ",response);
		callback(response);
	});
}