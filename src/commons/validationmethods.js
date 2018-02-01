


export const validateEmail = function (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateMobile = function (mobile) {
  var re = /^[1-9][0-9]{9,14}$/;
  return re.test(mobile);
};

export const validateLandline = function (mobile) {
  var re = /^[1-9][0-9]{5,14}$/;
  return re.test(mobile);
};

export const validateDOB = function (dob) {
  var re = /^(19|20)\d\d([- \/.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
  return re.test(dob);
};