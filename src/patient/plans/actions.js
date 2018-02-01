import {SET_PAYMENT_PENDING, SET_PAYMENT_SUCCESS, SET_PAYMENT_ERROR } from './constants'; 
import { callPlansApi, callPaymentApi, callRequestUserDetailsApi} from './services';


function setPaymentPending(isPaymentLoading) {
  return {
    type: SET_PAYMENT_PENDING,
    isPaymentLoading
  };
}

function setPaymentSuccess(paymentSucessData) {
  return {
    type: SET_PAYMENT_SUCCESS,
    paymentSucessData
  };
}

function setPaymentErrorData(paymentErrorData) {
  return {
    type: SET_PAYMENT_ERROR,
    paymentErrorData
  }
}

export function paymentSuccessAction (data) {
  return dispatch => {
    dispatch(setPaymentSuccess(data));
  }
}

export function paymentErrorAction(data) {
  return dispatch => {
    dispatch(setPaymentErrorData(data));
  }
}

export function paymentAction(paymentDetails) {
  return dispatch => {

    //payment actions
    // console.log('paymentDetails', callPaymentApi)
    dispatch(setPaymentPending(true));
    dispatch(setPaymentSuccess(null));
    dispatch(setPaymentErrorData(null));
    callPaymentApi(paymentDetails, response => {
      dispatch(setPaymentPending(false));
      console.log('response==========>', response);
      
      if (response.status) {
        dispatch(setPaymentSuccess(response.result.data));
      } else {
        dispatch(setPaymentErrorData(response.result.message));
      }
    });
  }
}