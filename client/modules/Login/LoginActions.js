import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../components/AuthController.js';
import { loginLanguage } from '../Intl/IntlActions';
import SocketHandler from '../Communication/SocketHandler';
import Analytics from '../Communication/Analytics';

export const LOGIN_USER 	= 'LOGIN_USER';
export const LOGOUT_USER 	= 'LOGOUT_USER';
export const IS_LOGGING		= 'IS_LOGGING';
export const IS_LOGGED_IN 	= 'IS_LOGGED_IN';
export const LOGGED_IN   = 'LOGGED_IN';
export const HAS_IMAGE = 'HAS_IMAGE';
export const SAVE_USER = 'SAVE_USER';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';
export const UPDATE_DATA = 'UPDATE_DATA';
export const SET_HEADER_FLAG = 'SET_HEADER_FLAG';
export const SET_RESPONSE = 'SET_RESPONSE';

// Export Actions

export function userLoggingIn() {
  return {
  		type: IS_LOGGING,
  };
}

// {
//         type: IS_LOGGED_IN,
//         status: response.status,
//         token: response.token,
//         data: response.data,
//         socketServer: response.socketServer,
//         iceServers: response.iceServers,
//         ctype: response.data.profile.companyid.businessType,
//         error : []
//     };

export function userLoggedGlb(response){
  console.log("GLB", response);
  return (dispatch) => {
      return dispatch(userLogged(response));
  };
}

export function userLogged(response, page = ''){
  if(response.status){
    // loginLanguage(response);
    return {
            type: IS_LOGGED_IN,
            status: response.status,
            token: response.token,
            data: response.data,
            socketServer: response.socketServer,
            ga_ui: response.ga_ui,
            iceServers: response.iceServers,
            error : []
            };

  }else if(response.error){
    AuthClient.deleteSession();
    return {
        type: IS_LOGGED_IN,
        status: response.status,
        token: '',
        data: {},
        error : [response.error]
    };
  }else{
    AuthClient.deleteSession();
    return {
      type: LOGOUT_USER
    };
  }  
}

export function ClearLoginData() {
  return (dispatch) => {
      return dispatch(isLoginClear());
  }; 
}

export function isLoginClear() {
  return {
    type: LOGOUT_USER
  };
}

export function isLoggedIn(userSession, pageName){

  return (dispatch) => {
    return callApi('is-loggedin', 'post', {
      userdata: {
        session: userSession,
      },
    }).then(res => {
      // dispatch(loginLanguage(res));
      return dispatch(userLogged(res, pageName))/*.then(response => { return dispatch(loginLanguage(res))})*/;
  })
  };
}

export function loginUser(userdata) {
  return {
  		type: LOGIN_USER,
  		status: true,
  };
}

export function loginUserRequest(userdata) {
  // console.log("Login Request", userdata);
  return (dispatch) => {
    return callApi('login', 'post', {
      userdata: {
        username: userdata.username,
        password: userdata.password,
        deviceType : 'BROWSER',
        isGoogle: userdata.isGoogle
      },
    }).then(res => {
        console.log(res);
        if(res.status){
          var temp = res;
          SocketHandler.connectServer(res.data._id, res.socketServer, res.iceServers, function(status){
            if(status){
              
            }
          });
          var _objAnalytics = new Analytics();
          console.log(res.ga_ui, res.data._id);
          _objAnalytics.Initialize(res.ga_ui, res.data._id);
          // loginLanguage(temp);
          return dispatch(userLoggedIn(temp, temp.token, ''));
        }else if(res.error){
          return dispatch(userLoggedIn(res, null, '/'));
        }
      });
  };
}

export function userLoggedIn(response, token = '', page = ''){

  //console.log("userLoggedIn------", response);
  if(response.status){
    if(token != ''){
      AuthClient.setSession(token);      
    }
    if(page != ''){
      //browserHistory.push(page);
    }
    return {
      type: IS_LOGGED_IN,
      status: response.status,
      token: response.token,
      data: response.data,
      socketServer: response.socketServer,
      ga_ui: response.ga_ui,
      iceServers: response.iceServers,
      error : []
    };
  }else if(response.error){
    AuthClient.deleteSession();
    return {
        type: LOGGED_IN,
        status: response.status,
        token: '',
        error : [response.error]
    };
  }else{
    AuthClient.deleteSession();
    return {
      type: LOGOUT_USER
    };
  }
}

export function getProfileImage (uid) {
  return (dispatch) => {
      return callApi('getProfileImage','post',{
        uid:uid
      }).then(res => {
            if(res.status)
            return dispatch(hasProfileImage(res.status,res.data))
      });
   };
}

export function hasProfileImage (status,data) {
 return {
  type :HAS_IMAGE,
  status:status,
  file:data
 }
}

export function ClearLogin () {
 return {
  type : CLEAR_LOGIN
 }
}

export function setLoginResponse(message) {
  return {
    type: SET_RESPONSE,
    message: message
  }
}


export function ForgotPassword(username){
  //alert('hi')
  return callApi('validateforgotpassword','post',{
    username:username
  });
}

export function resetPassword(userdata){
  //alert('hi')
  return callApi('resetpassword','post',{
    userdata
  });
}
export function isRestPasswordTokenExpired(data){
  return callApi('isresettokenexpired','post',{
    userdata :{
      token : data.token
    }
  });
}

export function SaveProfile(data) {
  //console.log(data);
  return (dispatch) => {
      return callApi('updateprofile', 'put', {
          profiledata: {
              data,
          },
      }).then( res => dispatch( SavedStatus(res) ));
    };
}

export function SavedStatus(response){
  // console.log(status);
  // console.log("response === ",response);
  if(response.status){
    // browserHistory.push('/admin/profile');
    return {
      type: SAVE_USER,
      status: response.status,
      error : [],
      data : response.data,
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      return {
        type: SAVE_USER,
        status: response.status,
        error : err,
        message : ''
      };
    }else{
      return {
        type: SAVE_USER,
        status: response.status,
        error : [response.error],
        message : ''
      };
    }
  }else{
    return {
      type: SAVE_USER,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
}
export function ClearImage () {
 return {
  type : CLEAR_IMAGE
 }
}

/*Pradeep + Android push notification*/
export function setAndroidId (deviceId) {
  return (dispatch) => {
    return callApi('androidDeviceId', 'post', {
      deviceData : { deviceId : deviceId}
    });
  };
}
/*Pradeep - Android push notification*/


//Configration of SignUp option on login page
export function isSignUp () {
  // return (dispatch) => {
    return callApi('isSignUp', 'get');
  // }
}

export function connectWithGoogle(data){
  return(dispatch) => {
    return callApi('put-google-id', 'put', {
      data 
    })
  .then(res => {
      return dispatch(SaveLoggedInData(res));
    })
  }
} 

export function disConnectSocialMedia(data) {
  return (dispatch) => {
    return callApi('disconnect-Social-media', 'put', {
      data
    })
      .then(res => {
        return dispatch(SaveLoggedInData(res));
    })
  }
}

export function SaveLoggedInData(res) {

  if(res.status) {
    return {
      type: UPDATE_DATA,
      message: res.message,
      data: res.data
    };
  } else {
    return {
      type: UPDATE_DATA,
      error : res.error
    };
  }
}

export function AddUsertoContact(obj){
  console.log("enter");
  return (dispatch) => {
      return callApi('add-contact', 'post', {
        data: obj,
      }).then(res => dispatch(SaveLoggedInData(res)));
    };
}

export function requestResponse(obj){
  return (dispatch) => {
      return callApi('contact-response', 'put', {
        data: obj,
      }).then(res => dispatch(SaveLoggedInData(res)));
    };
}

//Set header how/hide on Conference page video layout for mobile device
export function setHeaderFlag(headerFlag, showHeaderFlag) {
  return {
    type: SET_HEADER_FLAG,
    headerFlag : headerFlag,
    showHeaderFlag : showHeaderFlag
  }
}

export function activateUser(token) {
  let url = 'activate-user/' + token;
  return callApi(url, 'put', {});
}

// export function logoutUser(obj){
//   return (dispatch) => {
//     return callApi('logout-user', 'get')
//   };
// }

// export function userLoggedoutRes(res) {
//   console.log("At logout action response", res);
//   if(res.status) {
//     AuthClient.deleteSession();
//     //browserHistory.push('/')
//     return {
//     type: LOGOUT_USER
//   };
//   }
// }
