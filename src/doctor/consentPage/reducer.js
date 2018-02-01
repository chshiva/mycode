import { SET_CONSENT_PENDING, SET_CONSENT_SUCCESS, SET_CONSENT_ERROR } from './constants';

const initialState = {
  isLoading: false,
  onSuccess: null,
  onError: null
};

export default function consetPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONSENT_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_CONSENT_SUCCESS:
      return Object.assign({}, state, {
        onSuccess: action.successData
      });

    case SET_CONSENT_ERROR:
      return Object.assign({}, state, {
        onError: action.errorData
      });

    default:
      return state;
  }
}