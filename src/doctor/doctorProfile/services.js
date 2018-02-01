import utils from '../../commons/utils';
export function callDoctorProfileApi(callback) {
    console.log(1)
    utils.httpRequest('doctordetailsform', 'get', {}, (response) => {
        console.log("callDoctorProfileApi response ", response);
        callback(response);
    });
}

export function callChangePasswordApi(data,callback) {
    utils.httpRequest('changepassword', 'post', data, (response) => {
        console.log("callChangePasswordeApi response ", response);
        callback(response);
    });
}