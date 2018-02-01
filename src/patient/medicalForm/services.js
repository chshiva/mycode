import utils from '../../commons/utils';

export function callMedicalFormAPi(endpoint, data, method, cb) {
	console.log(" callMedicalFormAPi ", data);
	utils.httpRequest(endpoint, method, data, (response) => {
			console.log("callMedicalFormAPi response data  ---- ", response);		
			cb && cb(response);
	});
}