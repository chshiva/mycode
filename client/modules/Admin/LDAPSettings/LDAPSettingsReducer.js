import { CLEAR_LDAP, UPDATE_SCHEMA, EDIT_LDAPSETTINGS, SAVE_LDAPSETTINGS, GET_LDAPSETTINGS, CANCEL_LDAPSETTINGS, SAVED_LDAPSETTINGS, HAS_LDAPSETTINGS, DELETE_SETTINGS } from './LDAPSettingsActions';

const initialState = {
edit : false, data : {}, schema : null, error : [], success : ''
};

const LDAPSettingsReducer = (state =initialState,action) => {
  switch(action.type) {
   	case EDIT_LDAPSETTINGS :
   	   return Object.assign({},state,
   	   	{ edit : action.status, error : [], success : '' });
   	case SAVE_LDAPSETTINGS:
   		return Object.assign({},state,
   		 { edit : action.status, data : action.data, error : [], success : '' });
   	case CANCEL_LDAPSETTINGS:
        return Object.assign({}, state, 
           { edit : action.status, error : [], success : '' });
    case SAVED_LDAPSETTINGS:
        return Object.assign({}, state,
          { edit : action.status, data : action.data, error : action.error, success : action.message });
    case GET_LDAPSETTINGS:
        return Object.assign({}, state,{ data : action.data, error : [], success : '' });
    case HAS_LDAPSETTINGS :
      return Object.assign({},state,
        { edit : action.status, data : action.data, success : '', error : action.error });
    case UPDATE_SCHEMA:
        return Object.assign({}, state, { schema : action.schema, data : {}, error : [], success : '' });
    case CLEAR_LDAP : 
      return Object.assign({}, state, { edit: false, data: {}, success:'',error : [], schema : null });
    case DELETE_SETTINGS:
      return Object.assign({}, state, { edit : action.status, data : {},success : action.message,error:[] });
    default:
        return state;	
  }

}
  export const LDAPSettingsData  = state => state.ldapSettings;
  export default LDAPSettingsReducer;
