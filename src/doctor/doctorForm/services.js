import utils from '../../commons/utils';

export function callDoctorDetailsFormAPi(endpoint, data, method, cb) {
    console.log(" callDoctorDetailsFormAPi ", data);
    utils.httpRequest(endpoint, method, data, (response) => {
        console.log("callDoctorDetailsFormAPi response data  ---- ", response);
        cb && cb(response);
    });
}