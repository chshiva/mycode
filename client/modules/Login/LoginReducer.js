import { LOGIN_USER, LOGOUT_USER, IS_LOGGING, IS_LOGGED_IN, LOGGED_IN ,HAS_IMAGE, SAVE_USER, CLEAR_LOGIN, CLEAR_IMAGE, UPDATE_DATA, SET_HEADER_FLAG, SET_RESPONSE} from './LoginActions';

// Initial State
const initialState = {
  status: false, isLoggingIn: false, token: '', data: {}, file:"", socketServer: '', ga_ui: '', iceServers: '', success : ''
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER :
      return Object.assign({}, state, { status : action.status });
    case IS_LOGGING:
      return Object.assign({}, state, { isLoggingIn : true });
    case IS_LOGGED_IN:{
      return Object.assign({}, state, { status: action.status, token: action.token, data: action.data/*, error : action.error*/, socketServer: action.socketServer, ga_ui: action.ga_ui, iceServers: action.iceServers, isLoggingIn : action.status });
    }
    case LOGOUT_USER: 
       return Object.assign({}, state, { isLoggingIn: false, status: false, token: '' });
    case LOGGED_IN:
      return Object.assign({}, state, {
        status: action.status, isLoggingIn: false, token: action.token/*, error : action.error*/
      });
    case HAS_IMAGE:
      return Object.assign({},state,{
        state:action.status,file:action.file
      });
    case SAVE_USER:
      return action.status ? Object.assign({}, state, { status: action.status, data: action.data, success : action.message }) : Object.assign({}, state, { });
    case CLEAR_LOGIN:
      return Object.assign({}, state, { success : ''});
    case CLEAR_IMAGE:
      return Object.assign({},state,{
        state:'',file:''
      });
    case UPDATE_DATA:
      return action.data ? Object.assign({}, state, { data: action.data }) : Object.assign({}, state, {});
    case SET_HEADER_FLAG:
      return Object.assign({}, state, { headerFlag: action.headerFlag, showHeaderFlag : action.showHeaderFlag });
    case SET_RESPONSE:
      return Object.assign({}, state, {success: action.message});
    default:
      return state;
  }
};

/* Selectors */
export const loggedInData  = state => state.login;

// Export Reducer
export default LoginReducer;
