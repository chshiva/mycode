import { SET_FORGOT_PASSWORD_PENDING, SET_FORGOT_PASSWORD_SUCCESS, SET_FORGOT_PASSWORD_ERROR, SET_FORGOT_PASSWORD_EMAIL } from './constants';

const initialState = {
  isLoading: false,
  success: null,
  error: null,
  forgotpasswordEmail: null
};

export default function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FORGOT_PASSWORD_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_FORGOT_PASSWORD_EMAIL:
      return Object.assign({}, state, {
        forgotpasswordEmail: action.forgotpasswordEmail
      });      

    case SET_FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        success: action.status
      });

    case SET_FORGOT_PASSWORD_ERROR:
      console.log('actionData',action.data);
      return Object.assign({}, state, {
        error: action.data
      });

    default:
      return state;
  }
}