import { SET_PATIENT_REGISTRATION_PENDING, SET_PATIENT_REGISTRATION_SUCCESS, SET_PATIENT_REGISTRATION_ERROR } from './constants';


const initialState = {
  isLoading: false,
  onSuccess: null,
  onError: null
};

export default function patientRegistrationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENT_REGISTRATION_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_PATIENT_REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        onSuccess: action.successData
      });

    case SET_PATIENT_REGISTRATION_ERROR:
      return Object.assign({}, state, {
        onError: action.errorData
      });

    default:
      return state;
  }
}