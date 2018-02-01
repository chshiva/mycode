
import {SET_VERIFY_EMAIL_PENDING, SET_VERIFY_EMAIL_SUCCESS, SET_VERIFY_EMAIL_ERROR} from './constants';

const initialState = {
	isLoading: false,
	onSuccess: null,
	onError: null
}

export default function verifyEmailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VERIFY_EMAIL_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_VERIFY_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        onSuccess: action.successData
      });

    case SET_VERIFY_EMAIL_ERROR:
      return Object.assign({}, state, {
        onError: action.errorData
      });

    default:
      return state;
  }
}