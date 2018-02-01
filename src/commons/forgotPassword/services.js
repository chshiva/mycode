import utils from '../utils';

export default function callForgotPasswordApi(email, callback) {
    console.log("3333 submitForgotPassword ", email);	
	utils.httpRequest('forgotpassword', 'post', email, (response) => {
    console.log(" submitForgotPassword response ", response);	
			callback(response);
	});
}