// --- REQUEST FOR OTP

import { SET_REQUEST_OTP_PENDING, SET_REQUEST_OTP_SUCCESS, SET_REQUEST_OTP_ERROR } from './constants';

const requestForOTPInitialState = {
  isLoading: false,
  onSuccess: null,
  onError: null
};


export function requestForOTPReducer(state = requestForOTPInitialState, action) {
  switch (action.type) {
    case SET_REQUEST_OTP_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_REQUEST_OTP_SUCCESS:
      return Object.assign({}, state, {
        onSuccess: action.successData
      });

    case SET_REQUEST_OTP_ERROR:
      return Object.assign({}, state, {
        onError: action.errorData
      });

    default:
      return state;
  }
}

// VERIFY OTP

import { SET_VERIFY_OTP_PENDING, SET_VERIFY_OTP_SUCCESS, SET_VERIFY_OTP_ERROR } from './constants';

const verifyOTPInitialState = {
  isLoading: false,
  onSuccess: null,
  onError: null
};

export function otpVerifcationReducer(state = verifyOTPInitialState, action) {
  switch (action.type) {
    case SET_VERIFY_OTP_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_VERIFY_OTP_SUCCESS:
      return Object.assign({}, state, {
        onSuccess: action.successData
      });

    case SET_VERIFY_OTP_ERROR:
      return Object.assign({}, state, {
        onError: action.errorData
      });

    default:
      return state;
  }
}