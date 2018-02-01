import {SET_PAYMENT_PENDING, SET_PAYMENT_SUCCESS, SET_PAYMENT_ERROR, SET_USERDETAILS_PENDING, SET_USERDETAILS_SUCCESS, SET_USERDETAILS_ERROR} from './constants'; 

var initialState = {
  isLoading: false,  
  sucessData: null,
  errorData: null,
  isPaymentLoading : false,
  paymentSucessData : null,
  paymentErrorData : null
};

export default function requestPlansReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAYMENT_PENDING:
      return Object.assign({}, state, {
        isPaymentLoading: action.isPaymentLoading
      });

    case SET_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        paymentSucessData: action.paymentSucessData
      });

    case SET_PAYMENT_ERROR:
      return Object.assign({}, state, {
        paymentErrorData: action.paymentErrorData
      });

    default:
      return state;
  }
}