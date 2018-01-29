import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';

export const STUDENT_COURSE_LIST = 'STUDENT_COURSE_LIST';
export const GET_REPORTS = 'GET_REPORTS';
// export const SAVED_STUDENT_ASSIGNMENTS_REPORT = 'SAVED_STUDENT_ASSIGNMENTS_REPORT';
export const SAVED_STUDENT_ATTENDANCE = 'SAVED_STUDENT_ATTENDANCE';
export const LIST_STUDENT_ATTENDANCE = 'LIST_STUDENT_ATTENDANCE';
export const CLEAR_ATTENDANCE_LIST = 'CLEAR_ATTENDANCE_LIST';
export const LIST_TOTAL_SCHEDULES = 'LIST_TOTAL_SCHEDULES';
export const CLEAR_TOTAL_SCHEDULES_LIST = 'CLEAR_TOTAL_SCHEDULES_LIST';
export const SAVED_TOPIC_REPORT = 'SAVED_TOPIC_REPORT';
export const LIST_STUDENT_VIEWED_TOPICS = 'LIST_STUDENT_VIEWED_TOPICS';
export const STUDENT_ASSIGNMENT_LIST = 'STUDENT_ASSIGNMENT_LIST';
export const STUDENT_COURSES_CERTIFICATE_ELIGIBLE = 'STUDENT_COURSES_CERTIFICATE_ELIGIBLE';


export function StudentCourseListStatus(response, currentPage) {
  if(response.status) {
    return {
      type: STUDENT_COURSE_LIST,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  }else if(response.error){
    return {
      type: STUDENT_COURSE_LIST,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    }; 
  }else{
    return {
      type: STUDENT_COURSE_LIST,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

export function studentCourseList(data, currentPage) {
  
  let query = 'items=' + data.itemsPerPage + '&page=' + data.currentPage;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('student-course-list?' + query, 'get').then(res => dispatch(StudentCourseListStatus(res, currentPage)));
  };
}

export function ReportsStore(data){
  return {
    type: GET_REPORTS,
    data: data,
  };  
}

// export function getStudentAssignmentDataRequest (objEntity) {
//   return (dispatch) => {
//     return callApi('fetch-student-assignments/' + objEntity.roomId , 'get').then(res => dispatch(setStudentAssignmentReport(res)));
//   };
// }

// export function setStudentAssignmentReport(response) {
//   if (response.status) {
//     return {
//       type: SAVED_STUDENT_ASSIGNMENTS_REPORT,
//       status: response.status,
//       data: response.data,
//     };
//   } else if (response.error) {
//     return {
//       type: SAVED_STUDENT_ASSIGNMENTS_REPORT,
//       status: response.status,
//     };
//   } else {
//     return {
//       type: SAVED_STUDENT_ASSIGNMENTS_REPORT,
//       status: response.status,
//     };
//   }
// }

export function setStudentAttendance (response) {
   if (response.status) {
      return {
        type: SAVED_STUDENT_ATTENDANCE,
        status: response.status,
        data: response.data,
      };
    } else if (response.error) {
      return {
        type: SAVED_STUDENT_ATTENDANCE,
        status: response.status,
      };
    } else {
      return {
        type: SAVED_STUDENT_ATTENDANCE,
        status: response.status,
      };
    } 
}

export function getStudentAttendanceRequest(objEntity) {
  let query = '?rId=' + objEntity.courseId +'&uId='+objEntity.userId+'&fromDate=' + moment(objEntity.fromDate).utc().format("x")  +'&toDate=' + moment(objEntity.toDate).utc().format("x");
  return (dispatch) => {
    return callApi('fetch-individual-attendance'+query,'get').then(res => dispatch(setStudentAttendance(res)));
  }
}
export function getAttendanceListRequest(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_STUDENT_ATTENDANCE,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_STUDENT_ATTENDANCE,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_STUDENT_ATTENDANCE,
      error : ['Internal server error']
    };
  }  
}

export function getStudentAttendanceList (objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-individual-attendance', 'post',{
      attendanceData:objEntity
    }).then(res => dispatch(getAttendanceListRequest(res, currentPage)));
  };
}

export function clearAttendanceList() {
  return {
    type: CLEAR_ATTENDANCE_LIST
  };  
}

export function getTotalSchedulesRequest(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_TOTAL_SCHEDULES,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_TOTAL_SCHEDULES,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_TOTAL_SCHEDULES,
      error : ['Internal server error']
    };
  }  
}

export function getTotalSchedulesList (objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-total-schedules', 'post',{
      scheduleData: objEntity
    }).then(res => dispatch(getTotalSchedulesRequest(res, currentPage)));
  };
}

export function clearTotalSchedulesList() {
  return {
    type: CLEAR_TOTAL_SCHEDULES_LIST
  };  
}

export function setTopicsReport(response, currentPage) {
   if (response.status) {
      return {
        type: SAVED_TOPIC_REPORT,
        status: response.status,
        data: response.data,
      };
    } else if (response.error) {
      return {
        type: SAVED_TOPIC_REPORT,
        status: response.status,
      };
    } else {
      return {
        type: SAVED_TOPIC_REPORT,
        status: response.status,
      };
    }   
}

export function getTopicsReportRequest(objEntity) {
  let query = '?rId=' + objEntity.courseId ;
  return (dispatch) => {
    return callApi('fetch-student-topics'+query,'get').then(res => dispatch(setTopicsReport(res)));
  } 
}

export function setStudentTopicsList(response, currentPage) {
  if (response.status) {
    return {
      type: LIST_STUDENT_VIEWED_TOPICS,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  } else if(response.error) {
    return {
      type: LIST_STUDENT_VIEWED_TOPICS,
      error : [response.error]
    }; 
  } else {
    return {
      type: LIST_STUDENT_VIEWED_TOPICS,
      error : ['Internal server error']
    };
  }  
}

export function getStudentTopicsList (objEntity,currentPage) {
  return (dispatch) => {
    return callApi('list-course-topics', 'post',{
      topicsData:objEntity
    }).then(res => dispatch(setStudentTopicsList(res, currentPage)));
  };
}

export function studentAssignmentList(data, currentPage) {
  
  let query = 'items=' + data.itemsPerPage + '&page=' + data.currentPage + "&roomId=" + data.roomId;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('student-assignment-list?' + query, 'get').then(res => dispatch(StudentAssignmentListStatus(res, currentPage)));
  };
}

export function StudentAssignmentListStatus(response, currentPage) {
  if(response.status) {
    return {
      type: STUDENT_ASSIGNMENT_LIST,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  }else if(response.error){
    return {
      type: STUDENT_ASSIGNMENT_LIST,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    }; 
  }else{
    return {
      type: STUDENT_ASSIGNMENT_LIST,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

export function getStudentAssignmentResultData(data) {
  let query = 'assignmentId=' + data;
  
  return (dispatch) => {
    return callApi('student-assignment-result-data?' + query, 'get')
  };
} 

export function setCertificateEligibility(roomIds) {
  return {
    type: STUDENT_COURSES_CERTIFICATE_ELIGIBLE,
    roomIds,
  };
}

export function checkCertificateEligibility() {
  return (dispatch) => {
    return callApi('check-certificate-eligibility', 'get')
    .then((res) => {
      const result = [];
      res.roomIds.map((id) => result.push(id.roomId));

      dispatch(setCertificateEligibility(result));
    });
  };
}

export function fetchCertificate(roomId) {
  const query = 'rId=' + roomId;

  return (dispatch) => {
    callApi('fetch-certificate?' + query, 'get')
    .then((res) => {
      dispatch(() => {
        const blob = new Blob([new Uint8Array(res.body.data)], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'certificate.pdf';
        link.click();
      });
    });
  };
}
