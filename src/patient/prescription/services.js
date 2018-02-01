import utils from '../../commons/utils';

export function callPrescriptionApi(callback) {
    console.log(2)
    utils.httpRequest('Prescription', 'get', {}, (response) => {
        console.log("prescription response ", response);
        callback(response);
    });
}
