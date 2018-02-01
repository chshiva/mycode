import { SET_RESET_PASSWORD_PENDING, SET_RESET_PASSWORD_SUCCESS, SET_RESET_PASSWORD_ERROR } from './constants';

const initialState = {
  isLoading: false,
  resetPasswordResponseSuccess: null,
  resetPasswordResponseErrorData: null
};

export default function resetPasswordReducer (state = initialState, action) {
  switch (action.type) {
    case SET_RESET_PASSWORD_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        resetPasswordResponseSuccess: action.successFlag
      });

    case SET_RESET_PASSWORD_ERROR: 
      return Object.assign({}, action, {
        resetPasswordResponseErrorData: action.resetPasswordResponseErrorData
      });

    default: 
      return state;
  }
}