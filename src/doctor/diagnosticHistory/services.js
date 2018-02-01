import utils from '../../commons/utils';

export function callDiagnosticHistoryApi(callback) {
	console.log(2)
    utils.httpRequest('diagnostichistory?offset=0&limit=10', 'get', {}, (response) => {
        console.log("diagnostichistory response ", response);
        callback(response);
    });
}
