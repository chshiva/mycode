import { STUDENT_COURSE_LIST, GET_REPORTS, SAVED_STUDENT_ATTENDANCE,LIST_STUDENT_ATTENDANCE,CLEAR_ATTENDANCE_LIST, LIST_TOTAL_SCHEDULES, CLEAR_TOTAL_SCHEDULES_LIST, SAVED_TOPIC_REPORT, LIST_STUDENT_VIEWED_TOPICS, STUDENT_ASSIGNMENT_LIST, STUDENT_COURSES_CERTIFICATE_ELIGIBLE } from './ReportsActions';//SAVED_STUDENT_ASSIGNMENTS_REPORT

const initialState = { 
	dataList : {}, currentPage : 1, 
  count : 0, itemsPerPage : 5,
  data : {},  edit : false,
  deleteSuccess : '',
  // assignmentsData: {},
  attendanceData: {},
  attendanceList : {}, visitCount: 0,currentvisitPage : 1,
  schedulesList : {}, schedulesCount: 0, currentSchedulePage : 1,
  topicsReportData : {}, assignmentListData : {}
};

const ReporstReducer = (state = initialState, action) => {
	switch (action.type) {
    case STUDENT_COURSE_LIST:
      return Object.assign({}, state, {
        dataList : action.listData, count : action.count, currentPage : action.currentPage
      });
    case GET_REPORTS:
      return Object.assign({}, state, { data: action.data });
    // case SAVED_STUDENT_ASSIGNMENTS_REPORT:
    //   return Object.assign({}, state, { 
    //   assignmentsData : action.data
    // });
    case SAVED_STUDENT_ATTENDANCE:
      return Object.assign({}, state, { 
      attendanceData : action.data
    });
    case LIST_STUDENT_ATTENDANCE:
      return Object.assign({}, state, {
        attendanceList : action.listData, visitCount : action.count, currentvisitPage : action.currentPage
    });
    case CLEAR_ATTENDANCE_LIST:
      return Object.assign({}, state, {
        attendanceList : {}, visitCount : 0, currentvisitPage : 1
    });
    case LIST_TOTAL_SCHEDULES :
      return Object.assign({}, state, {
        schedulesList : action.listData, schedulesCount : action.count, currentSchedulePage : action.currentPage
    });
    case CLEAR_TOTAL_SCHEDULES_LIST :
      return Object.assign({}, state, {
        schedulesList : {}, schedulesCount : 0, currentSchedulePage : 1
    });
    case SAVED_TOPIC_REPORT:
      return Object.assign({}, state, { 
      topicsReportData : action.data
    });
    case LIST_STUDENT_VIEWED_TOPICS :
      return Object.assign({}, state, {
        topicsList : action.listData, topicsCount : action.count, currentTopicsPage : action.currentPage
    });    
    case STUDENT_ASSIGNMENT_LIST:
      return Object.assign({}, state, {
        assignmentListData : action.listData, count : action.count, currentPage : action.currentPage
      });
    case STUDENT_COURSES_CERTIFICATE_ELIGIBLE:
      return Object.assign({}, state, {
        eligibleRoomIds: action.roomIds,
      });
    default:
      return state;
	}
};

/* Selectors */
export const reportsData  = state => state.reports;

// Export Reducer
export default ReporstReducer;
