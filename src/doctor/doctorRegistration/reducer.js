import { SET_DOCTOR_REGISTRATION_PENDING, SET_DOCTOR_REGISTRATION_SUCCESS, SET_DOCTOR_REGISTRATION_ERROR } from './constants';


const initialState = {
  isLoading: false,
  onSuccess: null,
  onError: null
};

export default function doctorRegistrationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DOCTOR_REGISTRATION_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_DOCTOR_REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        onSuccess: action.successData
      });

    case SET_DOCTOR_REGISTRATION_ERROR:
      return Object.assign({}, state, {
        onError: action.errorData
      });

    default:
      return state;
  }
}