import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';
import React from 'react';
export const EDIT_SETTINGS = 'EDIT_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const GET_SETTINGS = 'GET_SETTINGS';
export const CANCEL_SETTINGS ='CANCEL_SETTINGS';
export const SAVED_SETTINGS	= 'SAVED_SETTINGS';
export const HAS_SETTINGS = 'HAS_SETTINGS';
export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const CLEAR_SMTP = 'CLEAR_SMTP';
export const DELETE_SMTP = 'DELETE_SMTP';

export function EditSettings() {
  return {
  		type: EDIT_SETTINGS,
  		status: true,
  };
}

export function getSettings() {
  return (dispatch) => {
  	return callApi('smtp-settings','get').then(res => dispatch(hasSettings(res)));
  };
}

function hasSettings(response) {
	if(response.status){
    return {
      type : HAS_SETTINGS,
      status : response.status,
      data: response.data,
      error : []
    };
  }else if(response.error){
    return {
      type : HAS_SETTINGS,
      status : response.status,
      data: {},
      error : [response.error]
    };
  }else{
    return {
      type : HAS_SETTINGS,
      status : response.status,
      data: {},
      error : []
    };
  }
}

export function saveSettings(data) {
	
	return (dispatch) => {
    	return callApi('smtp-settings', 'post', {
      	  settingsData : {
            	data
      	  },
    	}).then(res => dispatch(SettingsStatus(res)));
  	};
}


export function SettingsStatus(response) {
	
	if(response.status){
    return {
      type : SAVED_SETTINGS,
      status : response.status,
      data : response.data,
      message : response.message,
      error : []
    };
  }else if(response.error){
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
        err.push(obj.message);
      });
      return {
        type : SAVED_SETTINGS,
        status : response.status,
        data : {},
        message : '',
        error : err
      };
    }else{
      return {
        type : SAVED_SETTINGS,
        status : response.status,
        data : {},
        message : '',
        error : [response.error]
      };
    }
  }else{
    return {
      type : SAVED_SETTINGS,
      status : response.status,
      data : {},
      message : '',
      error : ['Internal server error']
    };
  }
}

export function settingsStore(data){
 
	return {
		type: GET_SETTINGS,
		data: data,
	};	
}

export function CancelSettings() {
	return {
		type: CANCEL_SETTINGS,
		status: false,
	};
}

export function ClearSMTP() {
  return {
    type: CLEAR_SMTP
  };
}

export function UpdateSettingsSchema (schema){
  return {
    type: UPDATE_SCHEMA,
    schema: schema,
  }
}

export function deleteSMTPSettings () {
  return (dispatch) => {
    return callApi('smtp-settings', 'delete').then(res => dispatch(SMTPSettings(res)));
  };
}

export function SMTPSettings (response) {
  if(response.status){
    return {
      type: DELETE_SMTP,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: DELETE_SMTP,
      status: response.status,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: DELETE_SMTP,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
  
}