import utils from '../utils';

export default function callResetPasswordApi (resetPasswordRequestData, callback) {
	utils.httpRequest('resetpassword', 'post', resetPasswordRequestData, (response) => {
			callback(response);
	});
}