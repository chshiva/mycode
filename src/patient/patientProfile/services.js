import utils from '../../commons/utils';
export function callPatientProfileApi(callback) {
    console.log(1)
    utils.httpRequest('medicalform', 'get', {}, (response) => {
        console.log("callPatientProfileApi response ", response);
        callback(response);
    });
}