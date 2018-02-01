
import { CLEAR_PROFILE_RES, CLEAR_PROFILE, UPDATE_SCHEMA, EDIT_PROFILE, SAVE_PROFILE, GET_PROFILE, CANCEL_PROFILE, SAVED_PROFILE, USER_ADDRESS_SAVED, USER_ADDRESS_NOT_SAVED, CREATED_WORK_PLACE, CREATE_WORK_PLACE_FAILED, NO_WORK_EDU_DATA_FOUND, WORK_EDU_DATA_FETCHED, WORK_EDU_DATA_FETCH_FAILED, DELETED_WORK_PLACE, DELETE_WORK_PLACE_FAILED, CREATED_COLLEGE, CREATE_COLLEGE_FAILED, DELETED_COLLEGE, DELETE_COLLEGE_FAILED, DELETED_ADDRESS, DELETED_ADDRESS_FAILED, USER_WEBSITE_SAVED, USER_WEBSITE_NOT_SAVED, USER_SOCIALLINK_SAVED, USER_SOCIALLINK_NOT_SAVED, USER_BASIC_INFO_SAVED, USER_BASIC_INFO_NOT_SAVED, DELETED_WEBSITE, DELETED_WEBSITE_FAILED, DELETED_SOCIALLINK, DELETED_SOCIALLINK_FAILED, DELETED_BIRTHDAY, DELETED_BIRTHDAY_FAILED, DELETED_GENDER, DELETED_GENDER_FAILED, DELETED_ALLSKILLS, DELETED_ALLSKILLS_FAILED, CREATED_SKILL, CREATE_SKILL_FAILED, CREATED_SCHOOL, CREATE_SCHOOL_FAILED, DELETED_SCHOOL, DELETED_SCHOOL_FAILED, GET_LOCAL_SETTINGS, SAVED_LOCAL_SETTINGS, UPDATE_LOCAL_SCHEMA, FETCHED_LOGS, REMOVE_PROFILE_IMAGE } from './ProfileActions';



const initialState = {
  edit : false, data : {}, schema : null, error : [], success : '',
  isCreatedWorkPlace : false, isCreateWorkPlaceFailed: false,
  isFetchedWorkEduData : false, workeduData: {}, isFetchWorkEduDataFailed: false,
  isDeletedWorkPlace : false, isDeleteWorkPlaceFailed: false,
  isCreatedCollege : false, isCreateCollegeFailed: false,
  isDeletedCollege : false, isDeleteCollegeFailed: false,
  isDeletedAddress : false, isDeleteAddressFailed: false,
  logData : {}
};


const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return Object.assign({}, state, { edit : action.status });
    /*case SAVE_PROFILE: {
      if(action.data)
        return Object.assign({}, state, { edit : action.status, data : action.data, success : action.message });
      else
        return Object.assign({}, state, { edit : action.status, success : action.message });
    }*/
    case CANCEL_PROFILE:
      return Object.assign({}, state, { edit : action.status });
    /*case SAVED_PROFILE:
      return Object.assign({}, state, { edit : false, success : action.message });*/
    case GET_PROFILE:
      return Object.assign({}, state, { data : action.data });
    case UPDATE_SCHEMA:
      return Object.assign({}, state, { schema : action.schema, data : {} });
    case CLEAR_PROFILE:
      return Object.assign({}, state, { edit : false, data : {}, schema : null, error : [], success : '', isCreateWorkPlaceFailed: false, isFetchWorkEduDataFailed: false, isDeleteWorkPlaceFailed: false, isCreateCollegeFailed: false, isDeleteCollegeFailed: false, isDeleteAddressFailed: false});
    case CLEAR_PROFILE_RES : 
      return Object.assign({}, state, {success : ''});
    case USER_ADDRESS_SAVED: 
      return Object.assign({}, state, {status: action.status, success: action.message});
    case USER_ADDRESS_NOT_SAVED: 
      return Object.assign({}, state, {status: action.status, error: action.error});          
    case CREATED_WORK_PLACE:
      return Object.assign({}, state, { 
        status : true,
        isCreatedWorkPlace : true,
        success: action.success,
        data: action.data
      });

    case CREATE_WORK_PLACE_FAILED:
      return Object.assign({}, state, { 
        status: false,
        isCreateWorkPlaceFailed: true,
        error: action.error
      });

    case CREATED_SCHOOL:
      return Object.assign({}, state, { 
        status : true,
        success: action.success,
      });

    case CREATE_SCHOOL_FAILED:
      return Object.assign({}, state, { 
        status: false,
        error: action.error
      });

    case WORK_EDU_DATA_FETCHED:
      return Object.assign({}, state, { 
        status : true,
        isFetchedWorkEduData : true,
        workeduData: action.workeduData
      });

    case WORK_EDU_DATA_FETCH_FAILED:
      return Object.assign({}, state, { 
        status: false,
        isFetchWorkEduDataFailed: true,
        error: action.error
      });

    case NO_WORK_EDU_DATA_FOUND:
      return Object.assign({}, state, { 
        status: false,
      });

    case DELETED_WORK_PLACE:
      return Object.assign({}, state, { 
        status : true,
        isDeletedWorkPlace : true,
        isFetchedWorkEduData : false,
        success: action.success,
      });

    case DELETE_WORK_PLACE_FAILED:
      return Object.assign({}, state, { 
        status: false,
        isDeleteWorkPlaceFailed: true,
        error: action.error
      });
    case USER_WEBSITE_SAVED: 
      return Object.assign({}, state, {status: action.status, success: action.message});
    case USER_WEBSITE_NOT_SAVED: 
      return Object.assign({}, state, {status: action.status, error: action.error});
    case USER_SOCIALLINK_SAVED: 
      return Object.assign({}, state, {status: action.status, success: action.message});
    case USER_SOCIALLINK_NOT_SAVED: 
      return Object.assign({}, state, {status: action.status, error: action.error});
    case USER_BASIC_INFO_SAVED: 
      return Object.assign({}, state, {status: action.status, success: action.message});
    case USER_BASIC_INFO_NOT_SAVED: 
      return Object.assign({}, state, {status: action.status, error: action.error});       

    case CREATED_COLLEGE:
      return Object.assign({}, state, { 
        status : true,
        isCreatedCollege : true,
        success: action.success,
        data: action.data
      });

    case CREATE_COLLEGE_FAILED:
      return Object.assign({}, state, { 
        status: false,
        isCreateCollegeFailed: true,
        error: action.error
      });

    case DELETED_COLLEGE:
      return Object.assign({}, state, { 
        status : true,
        isDeletedCollege : true,
        isFetchedWorkEduData : false,
        success: action.success,
      });

    case DELETE_COLLEGE_FAILED:
      return Object.assign({}, state, { 
        status: false,
        isDeleteCollegeFailed: true,
        error: action.error
      });

    case DELETED_SCHOOL:
      return Object.assign({}, state, { 
        status : true,
        success: action.success,
      });

    case DELETED_SCHOOL_FAILED:
      return Object.assign({}, state, { 
        status: false,
        error: action.error
      });

    case CREATED_SKILL:
      return Object.assign({}, state, { 
        status : true,
        success: action.success,
      });

    case CREATE_SKILL_FAILED:
      return Object.assign({}, state, { 
        status: false,
        error: action.error
      });

    case DELETED_ALLSKILLS:
      return Object.assign({}, state, { 
        status : true,
        success: action.success,
      });

    case DELETED_ALLSKILLS_FAILED:
      return Object.assign({}, state, { 
        status: false,
        error: action.error
      });

    case DELETED_ADDRESS:
      return Object.assign({}, state, { 
        status : true,
        isDeletedAddress : true,
        success: action.success,
      });

    case DELETED_ADDRESS_FAILED:
      return Object.assign({}, state, { 
        status: false,
        isDeleteAddressFailed: true,
        error: action.error
      });
    case DELETED_WEBSITE: 
      return Object.assign({}, state, {status: action.status, success: action.success});
    case DELETED_WEBSITE_FAILED: 
      return Object.assign({}, state, {status: action.status, error: action.error});  
    case DELETED_SOCIALLINK: 
      return Object.assign({}, state, {status: action.status, success: action.success});
    case DELETED_SOCIALLINK_FAILED: 
      return Object.assign({}, state, {status: action.status, error: action.error});
    case DELETED_BIRTHDAY: 
      return Object.assign({}, state, {status: action.status, success: action.success});
    case DELETED_BIRTHDAY_FAILED: 
      return Object.assign({}, state, {status: action.status, error: action.error}); 
    case DELETED_GENDER: 
      return Object.assign({}, state, {status: action.status, success: action.success});
    case DELETED_GENDER_FAILED: 
      return Object.assign({}, state, {status: action.status, error: action.error}); 
    case SAVED_LOCAL_SETTINGS:
      return Object.assign({}, state, { edit : action.status, data : action.data, success: action.message });
    case GET_LOCAL_SETTINGS:
      return Object.assign({}, state,{data: action.data});
    case UPDATE_LOCAL_SCHEMA:
      return Object.assign({}, state, { schema : action.schema, data : {} });
    case FETCHED_LOGS:
      return Object.assign({}, state, { logData : action.data });
    case REMOVE_PROFILE_IMAGE:
      return Object.assign({}, state, {status: action.status, success: action.success});
    default:
      return state;
  }
};
 

/* Selectors */
export const profileData  = state => state.profile;

// Export Reducer
export default ProfileReducer;
