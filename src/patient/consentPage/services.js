import utils from '../../commons/utils';

export default function callConsetAgreeApi(consentObject, callback) {
	console.log("callConsetAgreeApi request data  ---- ", consentObject);
	utils.httpRequest('updateconsent', 'put', consentObject, (response) => {
			console.log("callRegistrationApi response data  ---- ", response);		
			callback(response);
	});
}