import { CLEAR_ROOM, UPDATE_SCHEMA, EDIT_ROOM, SAVE_ROOM, GET_ROOM, CANCEL_ROOM, SAVED_ROOM, LIST_ROOM, SAVED_ROOM_USER, SAVED_TOPIC,LIST_ROOM_TOPIC,SAVED_ROOM_TOPIC, LIST_TOPIC_FILES, SAVED_TOPIC_FILE, CANCEL_FILE, CANCEL_TOPIC, SHOW_MODAL, EDIT_MODAL, FETCHED_TOPIC_QUESTIONNAIRE, FETCH_TOPIC_QUESTIONNAIRE_FAILED, ASSIGNED_QUESTIONNAIRE, ASSIGN_QUESTIONNAIRE_FAILED, QUESTIONNAIRE_SUCCESSFULLY_UNASSIGNED, QUESTIONNAIRE_UNASSIGN_FAILED, LIST_RESULT_TOPIC, FETCHED_RESULT, LIST_LOCATION,  SAVE_LOCATION, LIST_ROOM_LOCATION,DELETE_ROOM_LOCATION, DELETE_ROOM_LOCATIONPARTICIPANT, LIST_ROOM_QUESTIONNAIRE, SAVED_FEEDBACKTYPE, GET_FEEDBACK_TYPE, SAVED_CODECTYPE, SAVED_ENABLE_LIVE, UPDATED_FILE_DESC, LIST_ROOM_ASSIGNMENT, SAVED_ROOM_ASSIGNMENT, SAVED_ASSIGNMENT, SAVED_TOPIC_DATA, LIST_ASSIGNMENT_SUBMISSION, DELETE_UPLOADED_FILES, DELETE_ASSIGNMENT, UPLOAD_FILE_ENABLE, ROOM_TOPIC_ENABLE, GET_PLAGIARISM_DATA, LIST_ATTENDANCE_STUDENT, GET_PLAGIARISM_DATA_FAILED, CLEAR_PLAGIARISM_DATA,SAVED_COURSE_ATTENDANCE,LIST_COURSE_ATTENDANCE,CLEAR_ATTENDANCE_LIST,SAVED_INDIVIDUAL_ATTENDANCE,LIST_INDIVIDUAL_ATTENDANCE, CLEAR_INDIVIDUAL_ATTENDANCE_LIST,LIST_TOTAL_SCHEDULES, CLEAR_TOTAL_SCHEDULES_LIST, SAVED_VIEWED_TOPICS, LIST_TOPIC_VIEWED_USERS, SAVED_COURSE_TOPICS, INDIVIDUAL_ASSIGNMENT_DATA, INDIVIDUAL_ASSIGNMENT_DATA_FAILED, CLEAR_INDIVIDUAL_ASSIGNMENT_DATA, SET_CERTIFICATE_DATA, SET_CERTIFICATE_DATA_FAILED, TOGGLE_CERTIFICATE_DOWNLOAD } from './RoomActions';//SAVED_STUDENTS_ASSIGNMENT

var _ = require('lodash');

const initialState = { 
  edit : false, data : {}, 
  dataList : {}, currentPage : 1, 
  count : 0, itemsPerPage : 5,
  schema : null, error : [], success : '',
  topicdata:{},
  topicList : {},currentTopicPage : 1,
  topiccount : 0,
  topicFileList : {}, currentFilePage: 1,
  topicfilecount : 0,
  topicFileData:{},
  show: '', edit: '', questionnaireData: '',
  resultList : {}, currentResultPage : 1,
  resultCount : 0,
  resultData : {},
  locationList : '',
  instructorStudentList : '',
  roomLocationList : '', deleteSuccess : '',roomQuestionnaireList: '',
  assignmentList : {}, assignmentCount : 0, currentAssignmentPage : 1,
  assignmentData: {}, assignmentTopicData: '',
  submissionList : {}, submissionCount : 0, currentSubmissionPage : 1,
  plagiarismData : {}, attendanceData : {},
  attendanceList : {}, usersCount : 0, currentusersPage : 1,
  individualAttendanceList : {}, visitCount:0,currentvisitPage : 1,
  schedulesList : {}, schedulesCount: 0, currentSchedulePage : 1,
  roomDataInfo : {},
  topicViewedList: {}, topicListCount: 0, currentListPage: 1,
  viewedTopicsList : {}, viewedTopicsCount : 0, currentTopicPage : 1, individualAssigmentData : {},
  certificateData: {}

};


const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_ROOM:
      return Object.assign({}, state, { edit : action.status });
    case SAVE_ROOM:
      return Object.assign({}, state, { edit : action.status, data : action.data });
    case CANCEL_ROOM:
      return Object.assign({}, state, { edit : action.status, deleteSuccess : action.message });
    case SAVED_ROOM:
      //changedBy: pranathi, disc: no data then state updating to previous state
      if(action.data) {
        return Object.assign({}, state, { edit : action.status, data : action.data, roomDataInfo : action.data, success : action.message });
      } else {
        return state;
      }
    case GET_ROOM:
      return Object.assign({}, state, { data: action.data });
    case LIST_ROOM:
      return Object.assign({}, state, {
        dataList : action.listData, data: {}, count : action.count, currentPage : action.currentPage
      });
    case UPDATE_SCHEMA:
      if(action.data && action.data != null) {
        return Object.assign({}, state, {schema: action.schema, data : action.data, topicdata : {}
        });
      } else {
         return Object.assign({}, state, {schema: action.schema,
          data : {},
          topicdata : {}
        });
      }
    case CLEAR_ROOM:
      return Object.assign({}, state, { success : '', deleteSuccess : ''});
    case SAVED_ROOM_USER:
      if (action.data)
        return Object.assign({}, state, { data: action.data });
      else return state;
    case SAVED_TOPIC:
      return action.status ?
        Object.assign({}, state, { edit: action.status, topicdata: action.data, success: action.message }) : state;
    case LIST_ROOM_TOPIC : 
     return Object.assign({}, state, {
        topicList : action.listData, topiccount : action.count, currentTopicsPage : action.currentPage
      });

    case LIST_TOPIC_FILES : 
      return Object.assign({}, state, {
        topicFileList : action.listData, topicfilecount : action.count, currentFilePage : action.currentPage
      });
    case CANCEL_TOPIC :
        return Object.assign({}, state, { edit : action.status, success : action.message });
   
    case SAVED_ROOM_TOPIC : 
     return Object.assign({}, state, { topicdata : action.data});

    case SAVED_TOPIC_FILE : 
     return Object.assign({}, state, { topicFileData : action.data});
    case CANCEL_FILE :
        return Object.assign({}, state, { edit : action.status, success : action.message });

    case SHOW_MODAL :
      return Object.assign( {}, state, {
          show : action.data
      })

    case EDIT_MODAL :
      return Object.assign( {}, state, {
          edit : action.data
      })

    case FETCHED_TOPIC_QUESTIONNAIRE : 
     return Object.assign({}, state, { 
      questionnaireData : action.data
    });

    case FETCH_TOPIC_QUESTIONNAIRE_FAILED : 
     return Object.assign({}, state, { 
      questionnaireData : action.data
    });

    case ASSIGNED_QUESTIONNAIRE:
      return Object.assign({}, state, { 
        topicdata : action.data, 
        success : action.message
      });

    case ASSIGN_QUESTIONNAIRE_FAILED:
      return Object.assign({}, state, {  
        success : action.message
      });

    case QUESTIONNAIRE_SUCCESSFULLY_UNASSIGNED: 
      return Object.assign({}, state, {
        status: action.status,
        success: action.message,
        topicdata: action.data,
        error:[]
      })

    case QUESTIONNAIRE_UNASSIGN_FAILED: 
      return Object.assign({}, state, {
        status: action.status,
        error: action.error
      })       

    case LIST_RESULT_TOPIC : 
      return Object.assign({}, state, {
        resultList : action.listData, 
        resultCount : action.count, 
        currentResultPage : action.currentPage
      });

    case FETCHED_RESULT:
      return Object.assign({}, state, { 
        edit : action.status, 
        resultData : action.data, 
      });
    case LIST_LOCATION:
      return Object.assign({}, state, { locationList : action.listData});
    case SAVE_LOCATION:
      return Object.assign({}, state, { edit : action.status,  success : action.message}); 
    case LIST_ROOM_LOCATION :
      return Object.assign({}, state, { roomLocationList : action.listData});
    case DELETE_ROOM_LOCATION :
      return Object.assign({}, state, { edit : action.status, success : action.message });    
    case DELETE_ROOM_LOCATIONPARTICIPANT :
      return Object.assign({}, state, { edit : action.status, success : action.message }); 
    case LIST_ROOM_QUESTIONNAIRE :
      return Object.assign({}, state, { roomQuestionnaireList : action.listData});
    case SAVED_FEEDBACKTYPE:
      return Object.assign({}, state, { edit : action.status, success : action.message, data : action.data});
    case GET_FEEDBACK_TYPE:
      return Object.assign({}, state, { data: action.listData });
    case SAVED_CODECTYPE:
      return Object.assign({}, state, { edit : action.status, success : action.message, data : action.data});
    case SAVED_ENABLE_LIVE:
      return Object.assign({}, state, { edit : action.status, success : action.message, data : action.data});
    case UPDATED_FILE_DESC:
      return Object.assign({}, state, { 
        success : action.message, 
        topicFileList : action.listData, 
        topicfilecount : action.count, 
        currentFilePage : action.currentPage
      }); 
    case LIST_ROOM_ASSIGNMENT : 
      return Object.assign({}, state, {
        assignmentList : action.listData, 
        assignmentCount : action.count, 
        currentAssignmentPage : action.currentPage
      });
    case SAVED_ROOM_ASSIGNMENT : 
      return Object.assign({}, state, { 
        assignmentData : action.data
      });
    case SAVED_ASSIGNMENT:
      if(action.data) {
        return Object.assign({}, state, { 
          edit : action.status, 
          assignmentData : action.data, 
          success : action.message
        });
      } else {
        return Object.assign({}, state, { 
          edit : action.status,
          success : action.message
        });
      }
    case SAVED_TOPIC_DATA : 
      return Object.assign({}, state, { 
        assignmentTopicData : action.data
      });
    case LIST_ASSIGNMENT_SUBMISSION : 
      return Object.assign({}, state, {
        submissionList : action.listData, 
        submissionCount : action.count, 
        currentSubmissionPage : action.currentPage
      });
    case DELETE_UPLOADED_FILES : 
      return Object.assign({}, state, { 
        assignmentData : action.data
      });
    case DELETE_ASSIGNMENT :
      return Object.assign({}, state, { 
        edit : action.status, 
        success : action.message 
      });
    case UPLOAD_FILE_ENABLE:
      if (action.status) {
        let uploadfiles = state.topicFileList;
        let index = _.findIndex(uploadfiles, function(o) { return o._id == action.id; });
        uploadfiles[index].isEnable = !uploadfiles[index].isEnable;
        return Object.assign({}, state, { edit : action.status, topicFileList : uploadfiles });
      } else 
        return state;
    case ROOM_TOPIC_ENABLE:
      if (action.status) {
        let topicfiles = state.topicList;
        let index = _.findIndex(topicfiles, function(o) { return o._id == action.id; });
        topicfiles[index].topicEnable = !topicfiles[index].topicEnable;
        return Object.assign({}, state, { edit : action.status, topicList : topicfiles });
      } else 
        return state;
      break; 
    case GET_PLAGIARISM_DATA:
      return Object.assign({}, state, { 
      plagiarismData : action.data
    });
    case GET_PLAGIARISM_DATA_FAILED:
      return Object.assign({}, state, { 
      edit: action.status,
      plagiarismData: action.data,
      error : action.error
    });        
    case SAVED_COURSE_ATTENDANCE:
      return Object.assign({}, state, { 
      attendanceData : action.data
    });   
    case CLEAR_PLAGIARISM_DATA:  
    return Object.assign({}, state, { 
      error : [], plagiarismData : {}, edit : '', success : '', credits : null
    }); 
    // case SAVED_STUDENTS_ASSIGNMENT:
    //   return Object.assign({}, state, { 
    //   assignmentData : action.data
    // });
    case LIST_COURSE_ATTENDANCE : 
      return Object.assign({}, state, {
        attendanceList : action.listData, 
        usersCount : action.count, 
        currentusersPage : action.currentPage 
      }); 
    case CLEAR_ATTENDANCE_LIST : 
      return Object.assign({}, state, {
        attendanceList : {}, 
        usersCount : 0, 
        currentusersPage : 1
      }); 
    case SAVED_INDIVIDUAL_ATTENDANCE:
      return Object.assign({}, state, { 
      attendanceData : action.data
    });
    case LIST_INDIVIDUAL_ATTENDANCE : 
      return Object.assign({}, state, {
        individualAttendanceList : action.listData, 
        visitCount : action.count, 
        currentvisitPage : action.currentPage 
      });
    case CLEAR_INDIVIDUAL_ATTENDANCE_LIST : 
      return Object.assign({}, state, {
        individualAttendanceList : {}, 
        visitCount : 0, 
        currentvisitPage : 1
      }); 
    case LIST_TOTAL_SCHEDULES:
      return Object.assign({}, state, {
        schedulesList : action.listData, schedulesCount : action.count, currentSchedulePage : action.currentPage
    });
    case CLEAR_TOTAL_SCHEDULES_LIST:
      return Object.assign({}, state, {
          schedulesList : {}, schedulesCount : 0, currentSchedulePage : 1
    });
    case SAVED_VIEWED_TOPICS:
      return Object.assign({}, state, { 
        topicdata : action.data
    });
    case LIST_TOPIC_VIEWED_USERS:
      return Object.assign({}, state, {
        topicViewedList: action.listData, topicListCount: action.count, currentListPage: action.currentPage
    });
    case SAVED_COURSE_TOPICS:
      return Object.assign({}, state, {
        topicdata : action.data
    });
    case INDIVIDUAL_ASSIGNMENT_DATA:
      return Object.assign({}, state, {
        status : action.status,
        individualAssigmentData : action.data,
        success : action.message
    });
    case INDIVIDUAL_ASSIGNMENT_DATA_FAILED:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error
    });
    case CLEAR_INDIVIDUAL_ASSIGNMENT_DATA:
      return Object.assign({}, state, {
        individualAssigmentData : {}    
    });  
    case SET_CERTIFICATE_DATA:
      return Object.assign({},state, {
        certificateData : action.certificateData,
        studentsCount: action.count,
        currentCertificatePage: action.currentPage
      });
    case SET_CERTIFICATE_DATA_FAILED: 
      return Object.assign({}, state, {
        error : action.error,
        currentCertificatePage: action.currentPage
      });
    case TOGGLE_CERTIFICATE_DOWNLOAD: 
      if(action.status) {
        let certificateList = state.certificateData;
        let index = _.findIndex(certificateList, function(o) {return o._id == action.id});
        certificateList[index].isCertificateEligible = !certificateList[index].isCertificateEligible;
        return Object.assign({}, state, {edit: action.status, certificateData: certificateList});
      } else {
        return state;
      }
    break;  
    default:
      return state;
  } 
};


/* Selectors */
export const roomData  = state => state.room;

// Export Reducer
export default RoomReducer;
