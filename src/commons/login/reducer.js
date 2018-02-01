import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_USER_TOKEN, SET_USER_TYPE, SET_DOCTOR_FORM_STATUS } from './constants';
import socketService from '../pplsocket/socketService';

var successData = {};

if (localStorage.getItem('userAuthToken')) {
  successData = { userAuthToken: localStorage.getItem('userAuthToken') };
  console.log("socketService ", socketService)
  socketService.connect(connectionCallback);
} else {
  successData = { userAuthToken: null };
}

var initialState = {
  isLoading: false,
  onSuccess: successData,
  onError: null,
  userType: null
};

function connectionCallback(response) {
  console.log('response:', response);
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {

    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        onSuccess: action.successData
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        onError: action.errorData
      });

    case SET_USER_TYPE:
      return Object.assign({}, state, {
        userType: action.data
      });
    
    case SET_DOCTOR_FORM_STATUS:
      return Object.assign({}, state, {
        isDoctorForm: action.data
      });

    default:
      return state;
  }
}