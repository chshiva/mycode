import utils from '../../commons/utils';

export function callRequestAccountsApi(callback) {
  utils.httpRequest('accounts', 'get', {}, (response) => {
      console.log("callRequestAccountsApi response ---- ", response);
      callback(response);
  });
}


export function callUserDetailsApi (callback) {
  utils.httpRequest('userdetails', 'get', {}, (response) => {
    callback(response);
  });
}

export function callUserLedger(callback) {
  utils.httpRequest('subscriptionledger', 'get', {}, (response) => {
    callback(response);
  });
}