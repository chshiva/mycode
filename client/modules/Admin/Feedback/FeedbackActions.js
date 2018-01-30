// import callApi from '../../../util/apiCaller';
// import { browserHistory } from 'react-router';
// import AuthClient from '../../../components/AuthController';

// export const UPDATE_SCHEMA  = 'UPDATE_SCHEMA';
// export const GET_QUESTIONNAIRE	= 'GET_QUESTIONNAIRE';
// export const GET_QUESTIONNAIRE_FAILED	= 'GET_QUESTIONNAIRE_FAILED';
// export const SAVED_QUESTIONNAIRE	= 'SAVED_QUESTIONNAIRE';
// export const SAVE_QUESTIONNAIRE_FAILED	= 'SAVE_QUESTIONNAIRE_FAILED';
// export const LIST_QUESTIONNAIRE	= 'LIST_QUESTIONNAIRE';
// export const LIST_QUESTIONNAIRE_FAILED	= 'LIST_QUESTIONNAIRE_FAILED';
// export const CLEAR_QUESTIONNAIRE	= 'CLEAR_QUESTIONNAIRE';
// export const QUESTION_SUCCESSFULLY_DELETED = 'QUESTION_SUCCESSFULLY_DELETED';
// export const QUESTION_DELETION_FAILED = 'QUESTION_DELETION_FAILED';
// export const SHOW_MODAL = 'SHOW_MODAL';
// export const EDIT_MODAL = 'EDIT_MODAL';


// export function UpdateFeedbackSchema (schema){
//   return {
//     type: UPDATE_SCHEMA,
//     schema: schema,
//   }
// }

// export function FeedbackStore(data){
// 	return {
// 		type: GET_QUESTIONNAIRE,
// 		data: data,
// 	};	
// }


// // export function QuestionnaireStatus(response){
// //   // console.log("response === ",response);
// //   if(response.status){
// //     // browserHistory.push('/admin/questionnaire/list/');
// //     return {
// //       type: SAVED_QUESTIONNAIRE,
// //       status: response.status,
// //       data: response.data,
// //       error : [],
// //       message : response.message
// //     };
// //   }else if(response.error){
// //     if(response.error.errors){
// //     	let err = [];
// //       _.forIn(response.error.errors, function(obj, key){
// //         err.push(obj.message);
// //       });
// //       return {
// //         type: SAVE_QUESTIONNAIRE_FAILED,
// //         status: response.status,
// //         data: {},
// //         error : err,
// //         message : ''
// //       };
// //     }else{
// //       return {
// //         type: SAVE_QUESTIONNAIRE_FAILED,
// //         status: response.status,
// //         data: {},
// //         error : [response.error],
// //         message : ''
// //       };
// //     }
// //   }else{
// //     return {
// //       type: SAVE_QUESTIONNAIRE_FAILED,
// //       status: response.status,
// //       data: {},
// //       error : ['Internal server error'],
// //       message : ''
// //     };
// //   }
// // }

// export function FeedbackListRequest(data, currentPage){
//   return (dispatch) => {
//       return callApi('list-feedback', 'post', {
//           questionnaireData: {
//               data,
//           },
//       }).then(res => dispatch(FeedbackListStatus(res, currentPage)));
//     };
// }

// export function FeedbackListStatus(response, currentPage){
//   if(response.status){
//     return {
//       type: LIST_QUESTIONNAIRE,
//       listData: response.data,
//       count: response.count,
//       currentPage: currentPage,
//       error : []
//     };  
//   }else if(response.error){
//     return {
//       type: LIST_QUESTIONNAIRE_FAILED,
//       listData: {},
//       count: 0,
//       currentPage: currentPage,
//       error : [response.error]
//     }; 
//   }else{
//     return {
//       type: LIST_QUESTIONNAIRE_FAILED,
//       listData: {},
//       count: 0,
//       currentPage: currentPage,
//       error : ['Internal server error']
//     };
//   } 
// }

// export function ClearFeedback(){
//   return {
//     type: CLEAR_QUESTIONNAIRE
//   };  
// }

// // export function getQuestionnaireData (objEntity, pageName){
// //   return (dispatch) => {
// //     return callApi('fetch-questionnaire', 'post', {
// //       questionnaireData: {
// //         uid : objEntity.uid,
// //         id : objEntity.questionnaireId,
// //       },
// //     }).then(res => dispatch(setQuestionnaire(res, pageName)));
// //   };
// // }

// // export function setQuestionnaire(response, page = ''){
// //   // console.log(boolStatus);
// //   if(response.status){
// //     if(page != ''){
// //       browserHistory.push(page);
// //     }
// //     return {
// //         type: GET_QUESTIONNAIRE,
// //         status: response.status,
// //         data: response.data,
// //         message : '',
// //         error : []
// //     };
// //   }else if(response.error){
// //     if(response.error.errors){
// //       let err = [];
// //       _.forIn(response.error.errors, function(obj, key){
// //           //console.log(obj.message);
// //           err.push(obj.message);
// //       });
// //       return {
// //         type : GET_QUESTIONNAIRE_FAILED,
// //         status : response.status,
// //         data : {},
// //         message : '',
// //         error : err
// //       };
// //     }else{
// //       console.log("error === ",response.error);
// //       return {
// //         type : GET_QUESTIONNAIRE_FAILED,
// //         status : response.status,
// //         data : {},
// //         message : '',
// //         error : [response.error]
// //       };
// //     }
// //   }else{
// //     console.log("internal server error");
// //     return {
// //       type : GET_QUESTIONNAIRE_FAILED,
// //       status : response.status,
// //       data : {},
// //       message : '',
// //       error : ['Internal server error']
// //     };
// //   }
// // }

// // export function DeleteQuestionnaire(objEntity, currentPage) {
// //   return(dispatch) => {
// //     callApi('delete-questionnaire', 'delete', {
// //       questionnaireData: {        
// //         id : objEntity.questionnaireId
// //       }
// //     }).then(res=>dispatch(QuestionnaireDeleteStatus(res, currentPage)));
// //   }
// // } 

// // export function QuestionnaireDeleteStatus (response) {
// //   //console.log("response === ",response);
// //   if(response.status){
// //     browserHistory.push('/admin/questionnaire/list');
// //     return {
// //       type: QUESTION_SUCCESSFULLY_DELETED,
// //       status: response.status,
// //       error : [],
// //       message : response.message
// //     };
// //   }else if(response.error){
// //     return{
// //       type: QUESTION_DELETION_FAILED,
// //       status: false,
// //       error : [response.error],
// //       message : ''
// //     };

// //   }else{
// //     return{
// //       type: QUESTION_DELETION_FAILED,
// //       status: false,
// //       error : ['Internal server error'],
// //       message : ''
// //     };
// //   }  
// // }

// // export function removeQuestionRequest(objEntity) {
// //   return(dispatch) => {
// //     callApi('remove-question', 'delete', {
// //       questionData: {        
// //         questionnaireId : objEntity.questionnaireId,
// //         questionId: objEntity.questionId
// //       }
// //     }).then(res=> dispatch(removeQuestionResponse(res)))
// //   }
// // }
  
// // export function removeQuestionResponse (response) {
// //   //console.log("response === ",response);
// //   if(response.status){
// //     return {
// //       type: QUESTION_SUCCESSFULLY_DELETED,
// //       status: response.status,
// //       data: response.data,
// //       error : [],
// //       message : response.message
// //     };
// //   }else if(response.error){
// //     return{
// //       type: QUESTION_DELETION_FAILED,
// //       status: false,
// //       error : [response.error],
// //       message : ''
// //     };

// //   }else{
// //     return{
// //       type: QUESTION_DELETION_FAILED,
// //       status: false,
// //       error : ['Internal server error'],
// //       message : ''
// //     };
// //   }
// // }  

// // export function showModal(data) {
// //   return {
// //     type: SHOW_MODAL,
// //     data,
// //   };
// // }

// // export function editModal(data) {
// //   return {
// //     type: EDIT_MODAL,
// //     data,
// //   };
// // }