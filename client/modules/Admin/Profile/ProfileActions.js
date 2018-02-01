import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';
import { isLoggedIn } from '../../Login/LoginActions';

var _ = require('lodash');

export const EDIT_PROFILE 	= 'EDIT_PROFILE';
export const SAVE_PROFILE 	= 'SAVE_PROFILE';
export const SAVED_PROFILE	= 'SAVED_PROFILE';
export const CANCEL_PROFILE	= 'CANCEL_PROFILE';
export const GET_PROFILE	= 'GET_PROFILE';
export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const CLEAR_PROFILE_RES = 'CLEAR_PROFILE_RES';
export const USER_ADDRESS_SAVED = 'USER_ADDRESS_SAVED';
export const USER_ADDRESS_NOT_SAVED = 'USER_ADDRESS_NOT_SAVED';
export const CREATED_WORK_PLACE = 'CREATED_WORK_PLACE';
export const CREATE_WORK_PLACE_FAILED = 'CREATE_WORK_PLACE_FAILED';
export const WORK_EDU_DATA_FETCHED = 'WORK_EDU_DATA_FETCHED';
export const WORK_EDU_DATA_FETCH_FAILED = 'WORK_EDU_DATA_FETCH_FAILED';
export const NO_WORK_EDU_DATA_FOUND = 'NO_WORK_EDU_DATA_FOUND';
export const DELETED_WORK_PLACE = 'DELETED_WORK_PLACE';
export const DELETE_WORK_PLACE_FAILED = 'DELETE_WORK_PLACE_FAILED';
export const CREATED_COLLEGE = 'CREATED_COLLEGE';
export const CREATE_COLLEGE_FAILED = 'CREATE_COLLEGE_FAILED';
export const DELETED_COLLEGE = 'DELETED_COLLEGE';
export const DELETE_COLLEGE_FAILED = 'DELETE_COLLEGE_FAILED';
export const DELETED_ADDRESS = 'DELETED_ADDRESS';
export const DELETED_ADDRESS_FAILED = 'DELETED_ADDRESS_FAILED';
export const USER_WEBSITE_SAVED = 'USER_WEBSITE_SAVED';
export const USER_WEBSITE_NOT_SAVED = 'USER_WEBSITE_NOT_SAVED';
export const USER_SOCIALLINK_SAVED = 'USER_SOCIALLINK_SAVED';
export const USER_SOCIALLINK_NOT_SAVED = 'USER_SOCIALLINK_NOT_SAVED';
export const USER_BASIC_INFO_SAVED = 'USER_BASIC_INFO_SAVED';
export const USER_BASIC_INFO_NOT_SAVED = 'USER_BASIC_INFO_NOT_SAVED';
export const DELETED_WEBSITE ='DELETED_WEBSITE';
export const DELETED_WEBSITE_FAILED = 'DELETED_WEBSITE_FAILED';
export const DELETED_SOCIALLINK = 'DELETED_SOCIALLINK';
export const DELETED_SOCIALLINK_FAILED = 'DELETED_SOCIALLINK_FAILED';
export const DELETED_BIRTHDAY = 'DELETED_BIRTHDAY';
export const DELETED_BIRTHDAY_FAILED = 'DELETED_BIRTHDAY_FAILED';
export const DELETED_GENDER = 'DELETED_GENDER';
export const DELETED_GENDER_FAILED = 'DELETED_GENDER_FAILED';
export const DELETED_ALLSKILLS = 'DELETED_ALLSKILLS';
export const DELETED_ALLSKILLS_FAILED = 'DELETED_ALLSKILLS_FAILED';
export const CREATED_SCHOOL = 'CREATED_SCHOOL';
export const CREATE_SCHOOL_FAILED = 'CREATE_SCHOOL_FAILED';
export const DELETED_SCHOOL = 'DELETED_SCHOOL';
export const DELETED_SCHOOL_FAILED = 'DELETED_SCHOOL_FAILED';
export const CREATED_SKILL = 'CREATED_SKILL';
export const CREATE_SKILL_FAILED = 'CREATE_SKILL_FAILED';

export const GET_LOCAL_SETTINGS = 'GET_LOCAL_SETTINGS';
export const SAVED_LOCAL_SETTINGS = 'SAVED_LOCAL_SETTINGS';
export const UPDATE_LOCAL_SCHEMA  = 'UPDATE_LOCAL_SCHEMA';
export const FETCHED_LOGS = 'FETCHED_LOGS';
export const REMOVE_PROFILE_IMAGE = 'REMOVE_PROFILE_IMAGE';
export const USER_GOOGLEID_SAVED = 'USER_GOOGLEID_SAVED';
// export const SAVE_GOOGLE_DATA = 'SAVE_GOOGLE_DATA';

export function EditProfile() {
  return {
  		type: EDIT_PROFILE,
  		status: true,
  };
}

// export function SaveProfile(data) {
// 	//console.log(data);
// 	return (dispatch) => {
//     	return callApi('updateprofile', 'post', {
//       	  profiledata: {
//             	data,
//       	  },
//     	}).then( res => dispatch( SavedStatus(res) ));
//   	};
// }

// export function SavedStatus(response){
// 	// console.log(status);
//   // console.log("response === ",response);
// 	if(response.status){
// 		// browserHistory.push('/admin/profile');
// 		return {
// 			type: SAVE_PROFILE,
// 			status: response.status,
// 			error : [],
//       data : response.data,
// 			message : response.message
// 		};
// 	}else if(response.error){
// 		if(response.error.errors){
// 			return {
// 				type: SAVE_PROFILE,
// 				status: response.status,
// 				error : err,
// 				message : ''
// 			};
// 		}else{
// 			return {
// 				type: SAVE_PROFILE,
// 				status: response.status,
// 				error : [response.error],
// 				message : ''
// 			};
// 		}
// 	}else{
// 		return {
// 			type: SAVE_PROFILE,
// 			status: response.status,
// 			error : ['Internal server error'],
// 			message : ''
// 		};
// 	}
// }

export function ProfileStore(data){
	return {
		type: GET_PROFILE,
		data: data,
	};	
}

export function ClearProfile(){
	return {
		type: CLEAR_PROFILE
	};	
}

export function ClearProfileRes(){
  return {
    type: CLEAR_PROFILE_RES
  };  
}


export function CancelProfile() {
	return {
		type: CANCEL_PROFILE,
		status: false,
	};
}

export function UpdateProfileSchema (schema){
  return {
    type: UPDATE_SCHEMA,
    schema: schema,
  }
}

export function saveUserAddress (data) {
	return(dispatch) => {
		return callApi('saveUserAddress', 'post', {
			userAddressData:data
		}).then(res=> {
			if(res.status) {
				dispatch(UserAddressSaved(res));
				dispatch(isLoggedIn(AuthClient.getSession()));
				dispatch(ClearProfile());
			} else if(res.error) {
				dispatch(UserAddressNotSaved(res));
				dispatch(ClearProfile());
			}
		})
	}
}

export function UserAddressSaved (response) {
	// console.log("Saved user response from controller", response);
	return {
		type: USER_ADDRESS_SAVED,
		status: true,
		message: response.message
	}
}

export function UserAddressNotSaved (response) {
	//console.log("Not user response from controller", response);
	return {
		type: USER_ADDRESS_NOT_SAVED,
		status: false,
		error: response.error
	}
}

export function createWorkPlaceRequest(data) {
  return (dispatch) => {
    return callApi('create-work-place', 'post', {
      data: data
    }).then(res => {
      if(res.status) {
        dispatch(createdWorkPlace(res))
        dispatch(getWorkEduDataRequest())
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(createWorkPlaceFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function createdWorkPlace(res) {
  if(res.status) {
    return {
      type: CREATED_WORK_PLACE,
      success: res.success,
      data: res.data
    };
  }
}

export function createWorkPlaceFailed(res) {
  if(res.error) {
    return {
      type: CREATE_WORK_PLACE_FAILED,
      error: [res.error]
    };
  }
}

export function createSchoolRequest(schoolObj) {
  // console.log(data)
  return (dispatch) => {
    return callApi('create-school', 'put', {
      schoolObj
    }).then(res => {
      if(res.status) {
        // console.log("res:", res);
        dispatch(createdSchool(res));
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/workedu'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(createSchoolFailed(res));
        dispatch(ClearProfile());
        console.log("error", res.error)
        }
    });
  };
}

export function getWorkEduDataRequest() {
  return (dispatch) => {
    return callApi('get-work-edu-data', 'get').then(res => {
      if(res.status) {
        dispatch(getWorkEduDataSuccess(res))
      } else if (res.error) {
        dispatch(getWorkEduDataFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function getWorkEduDataSuccess(res) {
  if(!res.data || _.isEmpty(res.data)) {
    return {
      type : NO_WORK_EDU_DATA_FOUND
    }
  } else {
    return {
      type: WORK_EDU_DATA_FETCHED,
      workeduData: res.data
    };
  }
}

export function getWorkEduDataFailed(res) {
  if(res.error) {
    return {
      type: WORK_EDU_DATA_FETCH_FAILED,
      error: [res.error]
    };
  }
}

export function deleteWorkPlaceRequest(data) {
  return (dispatch) => {
    return callApi('delete-workplace/' + data.workId, 'delete').then(res => {
      if(res.status) {
        dispatch(deletedWorkPlace(res))
        dispatch(getWorkEduDataRequest())
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteWorkPlaceFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}


export function createdSchool(res) {
  if(res.status) {
    return {
      type: CREATED_SCHOOL,
      success: res.success,
      data: res.data
    };
  }
}

export function deletedWorkPlace(res) {
  if(res.status) {
    return {
      type: DELETED_WORK_PLACE,
      success: [res.success]
    };
  }
}

export function createSchoolFailed(res) {
  if(res.error) {
    return {
      type: CREATE_SCHOOL_FAILED,
      error: [res.error]
    };
  }
}

export function deleteWorkPlaceFailed(res) {
  if(res.error) {
    return {
      type: DELETE_WORK_PLACE_FAILED,
      error: [res.error]
    };
  }
}

export function saveUserWebsite (data) {
	return(dispatch) => {
		return callApi('save-user-website', 'post', {
			userWebsiteData:data
		}).then(res=> {
			if(res.status) {
				dispatch(UserWebsiteSaved(res));
				dispatch(isLoggedIn(AuthClient.getSession()));
				dispatch(ClearProfile());
			} else if(res.error) {
				dispatch(UserWebsiteNotSaved(res));
				dispatch(ClearProfile());
			}
		})
	}
}

export function UserWebsiteSaved (response) {
	// console.log("Saved user response from controller", response);
	return {
		type: USER_WEBSITE_SAVED,
		status: response.status,
		message: response.message
	}
}

export function UserWebsiteNotSaved (response) {
	// console.log("Not user response from controller", response);
	return {
		type: USER_WEBSITE_NOT_SAVED,
		status: response.status,
		error: response.error
	}
}


export function saveUserSocialLink (data) {
	// console.log("data at social link----->", data)
	return(dispatch) => {
		return callApi('save-user-sociallink', 'post', {
			userSocialLinkData:data
		}).then(res=> {
			if(res.status) {
				dispatch(UserSocialLinkSaved(res));
				dispatch(isLoggedIn(AuthClient.getSession()));
				dispatch(ClearProfile());
			} else if(res.error) {
				dispatch(UserSocialLinkNotSaved(res));
				dispatch(ClearProfile());
			}
		})
	}
}

export function UserSocialLinkSaved (response) {
	// console.log("Saved user response from controller", response);
	return {
		type: USER_SOCIALLINK_SAVED,
		status: response.status,
		message: response.message
	}
}

export function UserSocialLinkNotSaved (response) {
	// console.log("Not user response from controller", response);
	return {
		type: USER_SOCIALLINK_NOT_SAVED,
		status: response.status,
		error: response.error
	}
}	

export function saveBasicInfoData (obj) {
	// console.log("data at social link----->", obj)
	return(dispatch) => {
		return callApi('save-user-basic-info', 'post', {
			userBasicInfoData:obj
		}).then(res=> {
			if(res.status) {
				dispatch(UserBasicInfoSaved(res));
				dispatch(isLoggedIn(AuthClient.getSession()));
				dispatch(ClearProfile());
			} else if(res.error) {
				dispatch(UserBasicInfoNotSaved(res));
				dispatch(ClearProfile());
			}
		})
	}
}

export function UserBasicInfoSaved (response) {
	// console.log("Saved user response from controller", response);
	return {
		type: USER_BASIC_INFO_SAVED,
		status: response.status,
		message: response.message
	}
}

export function UserBasicInfoNotSaved (response) {
	// console.log("Not user response from controller", response);
	return {
		type: USER_BASIC_INFO_NOT_SAVED,
		status: response.status,
		error: response.error
	}
}

export function createCollegeRequest(data) {
  return (dispatch) => {
    return callApi('create-college', 'post', {
      data: data
    }).then(res => {
      if(res.status) {
        dispatch(createdCollege(res))
        dispatch(getWorkEduDataRequest())
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(createCollegeFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function createdCollege(res) {
  if(res.status) {
    return {
      type: CREATED_COLLEGE,
      success: res.success,
      data: res.data
    };
  }
}

export function createCollegeFailed(res) {
  if(res.error) {
    return {
      type: CREATE_COLLEGE_FAILED,
      error: [res.error]
    };
  }
}

export function deleteCollegeRequest(data) {
  return (dispatch) => {
    return callApi('delete-college/' + data.collegeId, 'delete').then(res => {
      if(res.status) {
        dispatch(deletedCollege(res))
        dispatch(getWorkEduDataRequest())
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteCollegeFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function deleteSchoolRequest() {
  return (dispatch) => {
    return callApi('delete-school', 'delete').then(res => {
      if(res.status) {
        dispatch(deletedSchool(res))
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/workedu'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteSchoolFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function deletedCollege(res) {
  if(res.status) {
    return {
      type: DELETED_COLLEGE,
      success: [res.success]
    };
  }
}

export function deletedSchool(res) {
  if(res.status) {
    return {
      type: DELETED_SCHOOL,
      success: [res.success]
    };
  }
}


export function deleteCollegeFailed(res) {
  if(res.error) {
    return {
      type: DELETE_COLLEGE_FAILED,
      error: [res.error]
    };
  }
}

export function deleteSchoolFailed(res) {
  if(res.error) {
    return {
      type: DELETED_SCHOOL_FAILED,
      error: [res.error]
    };
  }
}

export function saveSkillsRequest(skills) {
  return (dispatch) => {
    return callApi('create-professionalSkills', 'put', {
      skills
    }).then(res => {
      if(res.status) {
        dispatch(createdSkill(res));
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/workedu'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(createSkillFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function deleteAddressRequest() {
  return (dispatch) => {
    return callApi('delete-address', 'delete').then(res => {
      if(res.status) {
        dispatch(deletedAddress(res))
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/contacts'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteAddressFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function createdSkill(res) {
  if(res.status) {
    return {
      type: CREATED_SKILL,
      success: res.success,
    };
  }
}

export function deletedAddress(res) {
  if(res.status) {
    return {
      type: DELETED_ADDRESS,
      success: [res.success]
    };
  }
}

export function deleteAddressFailed(res) {
  if(res.error) {
    return {
      type: DELETED_ADDRESS_FAILED,
      error: [res.error]
    };
  }
}

export function deleteWebsiteRequest() {
  return (dispatch) => {
    return callApi('delete-website', 'delete').then(res => {
      if(res.status) {
        dispatch(deletedWebsite(res))
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/contacts'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteWebsiteFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function deletedWebsite(res) {
  if(res.status) {
    return {
      type: DELETED_WEBSITE,
      success: [res.success]
    };
  }
}

export function deleteWebsiteFailed(res) {
  if(res.error) {
    return {
      type: DELETED_WEBSITE_FAILED,
      error: [res.error]
    };
  }
}

export function deleteSocialLinkRequest() {
  return (dispatch) => {
    return callApi('delete-social-link', 'delete').then(res => {
      if(res.status) {
        dispatch(deletedSocialLink(res))
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/contacts'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteSocialLinkFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function deletedSocialLink(res) {
  if(res.status) {
    return {
      type: DELETED_SOCIALLINK,
      success: [res.success]
    };
  }
}

export function createSkillFailed(res) {
  if(res.error) {
    return {
      type: CREATE_SKILL_FAILED,
      error: [res.error]
    };
  }
}

export function deleteSocialLinkFailed(res) {
  if(res.error) {
    return {
      type: DELETED_SOCIALLINK_FAILED,
      error: [res.error]
    };
  }
}

export function deleteAllSkillRequest() {
  return (dispatch) => {
    return callApi('delete-professional-skills', 'delete').then(res => {
      if(res.status) {
        dispatch(deletedAllSkill(res))
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/workedu'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteAllSkillFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function deleteBirthDayRequest() {
  return (dispatch) => {
    return callApi('delete-birth-day', 'delete').then(res => {
      if(res.status) {
        dispatch(deletedBirthDay(res))
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/contacts'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteBirthDayFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function deletedBirthDay(res) {
  if(res.status) {
    return {
      type: DELETED_BIRTHDAY,
      success: [res.success]
    };
  }
}

export function deleteBirthDayFailed(res) {
  if(res.error) {
    return {
      type: DELETED_BIRTHDAY_FAILED,
      error: [res.error]
    };
  }
}

export function deleteGenderRequest() {
  return (dispatch) => {
    return callApi('delete-gender', 'delete').then(res => {
      if(res.status) {
        dispatch(deletedGender(res))
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile/contacts'));
        dispatch(ClearProfile());
      } else if (res.error) {
        dispatch(deleteGenderFailed(res))
        dispatch(ClearProfile());
      }
    });
  };
}

export function deletedAllSkill(res) {
  if(res.status) {
    return {
      type: DELETED_ALLSKILLS,
      success: [res.success]
    };
  }
}

export function deletedGender(res) {
  if(res.status) {
    return {
      type: DELETED_GENDER,
      success: [res.success]
    };
  }
}

export function deleteAllSkillFailed(res) {
  if(res.error) {
    return {
      type: DELETED_ALLSKILLS_FAILED,
      error: [res.error]
    };
  }
}

export function deleteGenderFailed(res) {
  if(res.error) {
    return {
      type: DELETED_GENDER_FAILED,
      error: [res.error]
    };
  }
}

export function localesettingsStore(data){
  return {
    type: GET_LOCAL_SETTINGS,
    data: data,
  };  
}

export function saveLocaleSettings(data) {
  let id = data._id;
  //console.log('data in save locale', data);
  return (dispatch) => {
    return callApi('locale-settings', 'put', {
        profileData : data,
    }).then(res => dispatch(LocalSettingsStatus(res)));
  };
}
export function LocalSettingsStatus (response){
  if(response.status){
    //console.log("saved", response);
    //browserHistory.push('/admin/locale/view');
    return {
      type : SAVED_LOCAL_SETTINGS,
      status : response.status,
      data : response.data,
      message : response.message,
      error : []
    };
  }else if(response.error){
    if(response.error.errors){
      let err = [];
      _.forIn(response.error.errors, function(obj, key){
          //console.log(obj.message);
          err.push(obj.message);
      });
      return {
        type : SAVED_LOCAL_SETTINGS,
        status : response.status,
        data : response.data,
        message : '',
        error : err
      };
    }else{
      return {
        type : SAVED_LOCAL_SETTINGS,
        status : response.status,
        data : response.data,
        message : '',
        error : [response.error]
      };
    }
  }else{
    console.log("internal server error");
    return {
      type : SAVED_LOCAL_SETTINGS,
      status : response.status,
      data : response.data,
      message : '',
      error : ['Internal server error']
    };
  }
  
}
export function UpdateLocaleSchema (schema){
  return {
    type: UPDATE_LOCAL_SCHEMA,
    schema: schema,
  }
}

export function LocaleSettingsList(data, currentPage){
  // console.log(data);
  return (dispatch) => {
      return callApi('listlocale', 'post', {
          profileData: {
              data,
          },
      }).then(res => dispatch(LocaleListStatus(res, currentPage)));
    };
}

export function LocaleListStatus(response, currentPage){
  // console.log(dataCount);
  // console.log(data);
  if(response.status){
    return {
      type: LIST_LOCALE,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    }; 
  }else if(response.error){
    return {
      type: LIST_LOCALE,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    };
  }else{
    return {
      type: LIST_LOCALE,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  }
   
}
export function ChangeUserPassword(userdata) {
  //console.log(userdata)
  return (dispatch) => {
    return callApi('changepassword', 'post', {
        userdata
    });
  };
}

export function getLogRequest() {
  return (dispatch) => {
    return callApi('get-logs', 'get').then(res => {
      if(res.status) {
        dispatch(fetchlogStatus(res));
      } else {
        dispatch(fetchlogStatus(res))
      }
    });
  };
}

export function fetchlogStatus(res) {
  if(res.status) {
    return {
      type: FETCHED_LOGS,
      data: res.data,
    };
  } else if (res.error) {
     return {
      type: FETCH_LOGS_FAILED,
    };
  }
}

export function removeProfileImage () {
  return (dispatch) => {
    return callApi('remove-profile-image', 'delete').then(res => {
      if(res.status) {
        dispatch(DeleteImage(res))
        dispatch(isLoggedIn(AuthClient.getSession(),'/admin/profile'));
        dispatch(ClearProfile());
      }
  });
 }
}

export function DeleteImage (response) {
  if(response.status){
    return {
      type: REMOVE_PROFILE_IMAGE,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: REMOVE_PROFILE_IMAGE,
      status: response.status,
      error : [response.error],
      message : ''
    };

  }else{
    return{
      type: REMOVE_PROFILE_IMAGE,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
  }
  
}

