import {SET_PRESCRIPTION_PENDING, SET_PRESCRIPTION_SUCCESS, SET_PRESCRIPTION_ERROR } from './constants'; 

var initialState = {
    isPrescriptionLoading : false,
    onRequestPrescriptionSuccess : null,
    onRequestPrescriptionError : null
};

export default function prescriptionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRESCRIPTION_PENDING:
      return Object.assign({}, state, {
        isPrescriptionLoading: action.isPrescriptionLoading
      });

    case SET_PRESCRIPTION_SUCCESS:
      return Object.assign({}, state, {
        onRequestPrescriptionSuccess: action.onRequestPrescriptionSuccess
      });

    case SET_PRESCRIPTION_ERROR:
      return Object.assign({}, state, {
        onRequestPrescriptionError: action.onRequestPrescriptionError
      });

    default:
      return state;
  }
}