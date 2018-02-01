import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_SUCCESS } from './constants';

var initialState = {
     token: null,
     isAuthenticated: false,
     isLoading: false
};

export default function loginReducer(state, action) {
     state = state || initialState;

     switch (action.type) {
          case LOG_IN_SUCCESS:
               return Object.assign({}, state, {
                    isAuthenticated: true,
                    isLoading: false,
                    token: action.data,
               });

          case LOG_IN_FAILURE:
               return Object.assign({}, state, {
                    isAuthenticated: false,
                    isLoading: false,
                    token: null,
               });

          case LOG_OUT_SUCCESS:
               return Object.assign({}, state, {
                    isAuthenticated: false,
                    isLoading: true,
                    token: null,
               });

          default:
               return state;
     }
}