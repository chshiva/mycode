import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';

export const EDIT_LDAPSETTINGS = 'EDIT_LDAPSETTINGS';
export const SAVE_LDAPSETTINGS = 'SAVE_LDAPSETTINGS';
export const GET_LDAPSETTINGS = 'GET_LDAPSETTINGS';
export const CANCEL_LDAPSETTINGS ='CANCEL_LDAPSETTINGS';
export const SAVED_LDAPSETTINGS	= 'SAVED_LDAPSETTINGS';
export const HAS_LDAPSETTINGS = 'HAS_LDAPSETTINGS';
export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const CLEAR_LDAP  = 'CLEAR_LDAP';
export const DELETE_SETTINGS = 'DELETE_SETTINGS';

export function EditLDAPSettings() {
  return {
  		type: EDIT_LDAPSETTINGS,
  		status: true,
  };
}

export function getLDAPSettings() {
  return (dispatch) => {
    return callApi('ldap-Settings','get').then(res => dispatch(hasLDAPSettings(res)));
  };
}

export function ClearLDAP(){
  return {
    type : CLEAR_LDAP
  }
}

export function hasLDAPSettings(response) {
	
  if(response.status){
    return {
      type:HAS_LDAPSETTINGS,
      status : response.status,
      data: response.data,
      error : [],
    };
  }else if(response.error){
    return {
      type:HAS_LDAPSETTINGS,
      status : response.status,
      data: {},
      error : [response.error],
    };
  }else{
    return {
      type:HAS_LDAPSETTINGS,
      status : response.status,
      data: {},
      error : [],
    };
  }
}

export function saveLDAPSettings(data) {
	/*console.log("data");
	console.log(data);*/
	return (dispatch) => {
    	return callApi('ldap-Settings', 'post', {
      	  LDAPSettingsData : {
            	data
      	  },
    	}).then(res => dispatch(LDAPSettingsStatus(res)));
  	};
}


export function LDAPSettingsStatus(response) {
	
  if(response.status){
    return {
      type: SAVED_LDAPSETTINGS,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
          err.push(obj.message);
      });
      return {
        type: SAVED_LDAPSETTINGS,
        status: response.status,
        data: response.data,
        error : err,
        message : response.message
      };
    }else{
      return {
        type: SAVED_LDAPSETTINGS,
        status: response.status,
        data: response.data,
        error : [response.error],
        message : ''
      };

    }
  }else{
    return {
      type: SAVED_LDAPSETTINGS,
      status: response.status,
      data: response.data,
      error : ['Internal server error'],
      message : ''
    };
  }
	
}
export function LDAPSettingsStore(data) {
	return {
		type: GET_LDAPSETTINGS,
		data: data,
	};	
}

export function CancelLDAPSettings() {
	return {
		type: CANCEL_LDAPSETTINGS,
		status: false,
	};
}

export function UpdateLDAPSchema (schema){
  return {
    type: UPDATE_SCHEMA,
    schema: schema,
  }
}
export function deleteLDAPSettings () {
  return (dispatch) => {
    return callApi('ldap-Settings', 'delete').then(res => dispatch(LDAPSettings(res)));
  };
}

export function LDAPSettings (response) {
  if(response.status){
    return {
      type: DELETE_SETTINGS,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: DELETE_SETTINGS,
      status: response.status,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: DELETE_SETTINGS,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
  
}
