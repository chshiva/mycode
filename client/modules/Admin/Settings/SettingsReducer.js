import { CLEAR_SMTP, UPDATE_SCHEMA, EDIT_SETTINGS, SAVE_SETTINGS, GET_SETTINGS, CANCEL_SETTINGS, SAVED_SETTINGS, HAS_SETTINGS, DELETE_SMTP } from './SettingsActions';

const initialState = {
edit: false, data: {}, success:'',error : [], schema : null
};

const SettingsReducer = (state =initialState,action) => {

  switch(action.type) {
   	case EDIT_SETTINGS :
   	   return Object.assign({},state,
   	   	{ edit : action.status });
   	case SAVE_SETTINGS:
   		return Object.assign({},state,
   		 { edit : action.status, data: action.data});
   	case CANCEL_SETTINGS:
      return Object.assign({}, state, 
         {edit: action.status});
    case SAVED_SETTINGS:
      return Object.assign({}, state,
        { edit : action.status, data : action.data, success : action.message, error : action.error });
    case GET_SETTINGS:
      return Object.assign({}, state,{data: action.data});
    case HAS_SETTINGS :
      return Object.assign({},state,
        { edit : action.status, data : action.data, success : '', error : action.error });
    case UPDATE_SCHEMA:
      return Object.assign({}, state, { schema : action.schema, data : {}, success : '', error : [] });
    case CLEAR_SMTP:
      return Object.assign({}, state, { edit: false, data: {}, success:'',error : [], schema : null });
    case DELETE_SMTP:
      return Object.assign({}, state, { edit : action.status, data : {},success : action.message,error:[] });
    default:
      return state;	
  }

}
  export const settingsData  = state => state.settings;
  export default SettingsReducer;
