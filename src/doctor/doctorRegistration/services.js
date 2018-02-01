import utils from '../../commons/utils';

export default function callDoctorRegistrationApi(registrationData, callback) {
	console.log("callDoctorRegistrationApi request data  ---- ", registrationData);
	utils.httpRequest('users/registerdoctor', 'post', registrationData, (response) => {
		console.log("callDoctorRegistrationApi response data  ---- ", response);
		callback(response);
	});
}