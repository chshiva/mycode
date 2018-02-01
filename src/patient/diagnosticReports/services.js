import utils from '../../commons/utils';

export function callDiagnosticReportsApi(callback) {
    console.log(2)
    utils.httpRequest('diagnosticReports', 'get', {}, (response) => {
        console.log("DiagnosticReports response ", response);
        callback(response);
    });
}
