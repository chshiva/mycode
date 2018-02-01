import utils from '../../commons/utils';

export default function callPatientRegistrationApi(registrationData, callback) {
	console.log("callPatientRegistrationApi request data  ---- ", registrationData);
	utils.httpRequest('users/registerpatient', 'post', registrationData, (response) => {
		console.log("callPatientRegistrationApi response data  ---- ", response);
		callback(response);
	});
}