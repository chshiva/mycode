import utils from '../../commons/utils';

export function callPaymentApi(paymentData, callback) {
	console.log(2)
	utils.httpRequest('capture', 'post', paymentData, (response) => {
		console.log("callPaymentApi response ", response);
		callback(response);
	});
}

export function callAccountApi( callback) {
	console.log(3)
	utils.httpRequest('accounts?offset=0&limit=10', 'get',{}, (response) => {
		console.log("callAccountApi response ", response);
		callback(response);
	});
}

export function callRequestPaymentsApi(userid, callback) {
	console.log(4)
	utils.httpRequest('payments/?offset=0&limit=10', 'get', {}, (response) => {
		console.log("callRequestPaymentApi response ", response);
		callback(response);
	});
}

