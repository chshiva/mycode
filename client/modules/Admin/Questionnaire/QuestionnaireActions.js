import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';

export const GET_QUESTIONNAIRE	= 'GET_QUESTIONNAIRE';
export const GET_QUESTIONNAIRE_FAILED	= 'GET_QUESTIONNAIRE_FAILED';
export const SAVED_QUESTIONNAIRE	= 'SAVED_QUESTIONNAIRE';
export const SAVE_QUESTIONNAIRE_FAILED	= 'SAVE_QUESTIONNAIRE_FAILED';
export const LIST_QUESTIONNAIRE	= 'LIST_QUESTIONNAIRE';
export const LIST_QUESTIONNAIRE_FAILED	= 'LIST_QUESTIONNAIRE_FAILED';
export const CLEAR_QUESTIONNAIRE	= 'CLEAR_QUESTIONNAIRE';
export const QUESTION_SUCCESSFULLY_DELETED = 'QUESTION_SUCCESSFULLY_DELETED';
export const QUESTION_DELETION_FAILED = 'QUESTION_DELETION_FAILED';
export const SHOW_MODAL = 'SHOW_MODAL';
export const EDIT_MODAL = 'EDIT_MODAL';
export const SAVE_GRADE_QUESTIONNAIRE = 'SAVE_GRADE_QUESTIONNAIRE';
export const SAVE_GRADE_QUESTIONNAIRE_FAILED = 'SAVE_GRADE_QUESTIONNAIRE_FAILED';
export const GET_GRADE_QUESTIONNAIRE = 'GET_GRADE_QUESTIONNAIRE';
export const GET_GRADE_QUESTIONNAIRE_FAILED = 'GET_GRADE_QUESTIONNAIRE_FAILED';
export const CLEAR_QUESTIONNAIRE_GRADES = 'CLEAR_QUESTIONNAIRE_GRADES';
export const GET_QUESTIONNAIRE_RESULT = 'GET_QUESTIONNAIRE_RESULT';
export const GET_CLONE_QEUSTIONNAIRE = 'GET_CLONE_QEUSTIONNAIRE';
export const FETCH_CLONE_QEUSTIONNAIRE = 'FETCH_CLONE_QEUSTIONNAIRE';


export function QuestionnaireStore(data){
	return {
		type: GET_QUESTIONNAIRE,
		data: data,
	};	
}

export function SaveQuestionnaireRequest(data) {   
  return (dispatch) => {
    return callApi('save-questionnaire', 'post', {
        questionnaireData : {
        data,
      }
    }).then(res => dispatch(QuestionnaireStatus(res)));
  };
}
//Changes made by prateek for bug#2970

export function SaveQuestionRequest(data) {
  let qid = data.question._id;
  delete data.question["_id"];
  return (dispatch) => {
    return callApi('save-question/' + qid, 'put', {
      questionnaireData : {
        data,
      }
    }).then(res => dispatch(QuestionnaireStatus(res)));
  };
}

//Chnages made by prateek for bug#2970
export function updateQuestionnaireRequest(data) {
  return (dispatch) => {
    return callApi('update-questionnaire/', 'put', {
        questionnaireData : {
        data
      }
    }).then(res => dispatch(QuestionnaireStatus(res)));
  };
}

export function QuestionnaireStatus(response){
  // console.log("response === ",response);
  if(response.status){
    // browserHistory.push('/admin/questionnaire/list/');
    return {
      type: SAVED_QUESTIONNAIRE,
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
        type: SAVE_QUESTIONNAIRE_FAILED,
        status: response.status,
        data: {},
        error : err,
        message : ''
      };
    }else{
      return {
        type: SAVE_QUESTIONNAIRE_FAILED,
        status: response.status,
        // data: {},
        error : [response.error],
        openFrom : response.openFrom,
        closeFrom : response.closeFrom,
        message : ''
      };
    }
  }else{
    return {
      type: SAVE_QUESTIONNAIRE_FAILED,
      status: response.status,
      data: {},
      error : ['Internal server error'],
      message : ''
    };
  }
}

export function QuestionnaireListRequest(data, currentPage){
  let sortStr = JSON.stringify(data.sortObj);
  let query = 'items=' + data.itemsPerPage + '&page=' + data.currentPage+ '&sort=' + sortStr;
  if (data && data.searchKeyword) {
    query += '&search=' + data.searchKeyword;
  }
  return (dispatch) => {
    return callApi('list-questionnaire?' + query, 'get').then(res => dispatch(QuestionnaireListStatus(res, currentPage)));
  };
}

export function QuestionnaireListStatus(response, currentPage){
  if(response.status){
    return {
      type: LIST_QUESTIONNAIRE,
      listData: response.data,
      count: response.count,
      currentPage: currentPage,
      error : []
    };  
  }else if(response.error){
    return {
      type: LIST_QUESTIONNAIRE_FAILED,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : [response.error]
    }; 
  }else{
    return {
      type: LIST_QUESTIONNAIRE_FAILED,
      listData: {},
      count: 0,
      currentPage: currentPage,
      error : ['Internal server error']
    };
  } 
}

export function ClearQuestionnaire(){
  return {
    type: CLEAR_QUESTIONNAIRE
  };  
}

export function getQuestionnaireData (objEntity, pageName){
  return (dispatch) => {
    return callApi('fetch-questionnaire/' + objEntity.questionnaireId, 'get').then(res => dispatch(setQuestionnaire(res, pageName)));
  };
}

export function setQuestionnaire(response, page = ''){
  // console.log(boolStatus);
  if(response.status){
    if(page != ''){
      browserHistory.push(page);
    }
    return {
        type: GET_QUESTIONNAIRE,
        status: response.status,
        data: response.data,
        message : '',
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
        type : GET_QUESTIONNAIRE_FAILED,
        status : response.status,
        data : {},
        message : '',
        error : err
      };
    }else{
      console.log("error === ",response.error);
      return {
        type : GET_QUESTIONNAIRE_FAILED,
        status : response.status,
        data : {},
        message : '',
        error : [response.error]
      };
    }
  }else{
    console.log("internal server error");
    return {
      type : GET_QUESTIONNAIRE_FAILED,
      status : response.status,
      data : {},
      message : '',
      error : ['Internal server error']
    };
  }
}

export function DeleteQuestionnaire(objEntity, currentPage) {
  return(dispatch) => {
    return callApi('delete-questionnaire/' + objEntity.questionnaireId, 'delete').then(res=>dispatch(QuestionnaireDeleteStatus(res, currentPage)));
  }
} 

export function ConfirmDeleteQuestionnaire(objEntity, currentPage) {
  // console.log('objEntity', objEntity);
  return(dispatch) => {
    return callApi('confirm-delete-questionnaire/' + objEntity.questionnaireId + '/'+ objEntity.dependentModule, 'delete').then(res=>dispatch(QuestionnaireDeleteStatus(res, currentPage)));
  }
} 

export function QuestionnaireDeleteStatus (response) {
  //console.log("response === ",response);
  if(response.status){
    // browserHistory.push('/admin/questionnaire/list');
    return {
      type: QUESTION_SUCCESSFULLY_DELETED,
      status: response.status,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: QUESTION_DELETION_FAILED,
      status: false,
      error : [response.error],
      httpstatuscode : response.httpstatuscode,
      dependentModule : response.dependency,
      message : ''
    };

  }else{
    return{
      type: QUESTION_DELETION_FAILED,
      status: false,
      error : ['Internal server error'],
      message : ''
    };
  }  
}

export function removeQuestionRequest(objEntity) {
  return(dispatch) => {
    return callApi('delete-question/' + objEntity.questionnaireId + '/' + objEntity.questionId, 'delete').then(res=> dispatch(removeQuestionResponse(res)))
  }
}

//Chnaged by prateek for delete questions bug#2924
export function confirmedRemoveQuestionRequest(objEntity) {
  return(dispatch) => {
    return callApi('confirm-delete-question/' + objEntity.questionnaireId + '/' + objEntity.questionId, 'delete').then(res=> dispatch(removeQuestionResponse(res)))
  }
}

export function removeQuestionResponse (response) {
  //console.log("response === ",response);
  if(response.status){
    return {
      type: QUESTION_SUCCESSFULLY_DELETED,
      status: response.status,
      data: response.data,
      error : [],
      message : response.message
    };
  }else if(response.error){
    return{
      type: QUESTION_DELETION_FAILED,
      status: false,
      error : [response.error],
      httpStatusCode : response.httpStatusCode,
      message : ''
    };

  }else{
    return{
      type: QUESTION_DELETION_FAILED,
      status: false,
      error : ['Internal server error'],
      message : ''
    };
  }
}  

export function showModal(data) {
  return {
    type: SHOW_MODAL,
    data,
  };
}

export function editModal(data) {
  return {
    type: EDIT_MODAL,
    data,
  };
}

export function saveGrades(data) {
  return (dispatch) => {
    return callApi('save-grades-questionnaire', 'post', {
      data : data}).then(res => dispatch(SaveGradeStatus(res)));
  };
}


export function SaveGradeStatus(response){
  if(response.status){
    return {
      type: SAVE_GRADE_QUESTIONNAIRE,
      data: response.data,
      status : response.status,
      error : [],
      message : response.message
    };  
  }else if(response.error){
    return {
      type: SAVE_GRADE_QUESTIONNAIRE_FAILED,
      data: {},
      status : response.status,
      error : [response.error],
      message : ''
    }; 
  }else{
    return {
      type: SAVE_GRADE_QUESTIONNAIRE_FAILED,
      data: {},
      status : response.status,
      error : ['Internal server error'],
      message : ''
    };
  } 
}


export function getQuestionnaireGradesData() {
  return (dispatch) => {
    return callApi('get-questionnaire-grades', 'get').then(res => dispatch(GetGradeStatus(res)));
  };
}


export function GetGradeStatus(response){
  if(response.status){
    return {
      type: GET_GRADE_QUESTIONNAIRE,
      data: response.data,
      status : response.status,
      error : []      
    };  
  }else if(response.error){
    return {
      type: GET_GRADE_QUESTIONNAIRE_FAILED,
      data: {},
      status : response.status,
      error : response.error,
    }; 
  }else{
    return {
      type: GET_GRADE_QUESTIONNAIRE_FAILED,
      data: {},
      status : response.status,
      error : ['Internal server error'],
    };
  } 
}

export function ClearGradesData(){
  return {
    type: CLEAR_QUESTIONNAIRE_GRADES
  };  
}

export function getQuestionnaireResultData(response) {
  if(response.status) {
    return {
      type: GET_QUESTIONNAIRE_RESULT,
      data: { questionnaireResultData: response.data, submittedFlag: response.submittedFlag },
      status : response.status,
      flag: response.changeFlag,
      error : [] 
    }
  } else if(response.error) {
    return {
      type: GET_QUESTIONNAIRE_RESULT,
      data: {},
      status : response.status,
      error : response.error,
    }
  } else {
    return {
      type: GET_QUESTIONNAIRE_RESULT,
      data: {},
      status : response.status,
      error : ['Internal server error'],
    };
  }
}

export function getQuestionnaireResult(questionnaireId) {
  return(dispatch) => {
    return callApi('get-questionnaire-result/'+questionnaireId, 'get').then(res => dispatch(getQuestionnaireResultData(res)));
  }
}
export function setCloneQuestionnaires(response) {
  if(response.status) {
    return {
      type: GET_CLONE_QEUSTIONNAIRE,
      data: response.data,
      status : response.status,
      error : [] 
    }
  } else if(response.error) {
    return {
      type: GET_CLONE_QEUSTIONNAIRE,
      data: {},
      status : response.status,
      error : response.error,
    }
  } else {
    return {
      type: GET_CLONE_QEUSTIONNAIRE,
      data: {},
      status : response.status,
      error : ['Internal server error'],
    };
  }

}

export function getCloneQuestionnaires() {
  return(dispatch) => {
    return callApi('questionnaire-list/', 'get').then(res => dispatch(setCloneQuestionnaires(res)));
  }
}

export function setQuestionnaireResponse(response) {
  if(response.status) {
    return {
      type: FETCH_CLONE_QEUSTIONNAIRE,
      data: response.data,
      status : response.status,
      error : [] 
    }
  } else if(response.error) {
    return {
      type: FETCH_CLONE_QEUSTIONNAIRE,
      data: {},
      status : response.status,
      error : response.error,
    }
  } else {
    return {
      type: FETCH_CLONE_QEUSTIONNAIRE,
      data: {},
      status : response.status,
      error : ['Internal server error'],
    };
  }
}

export function fetchQuestionnaire(objEntity) {
  return(dispatch) => {
    return callApi('fetch-clone-questionnaire/' + objEntity , 'get').then(res=> dispatch(setQuestionnaireResponse(res)))
  }
}
