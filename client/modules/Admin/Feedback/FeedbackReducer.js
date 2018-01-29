// import { UPDATE_SCHEMA, GET_QUESTIONNAIRE, GET_QUESTIONNAIRE_FAILED, SAVED_QUESTIONNAIRE, SAVE_QUESTIONNAIRE_FAILED, LIST_QUESTIONNAIRE, LIST_QUESTIONNAIRE_FAILED, CLEAR_QUESTIONNAIRE, QUESTION_SUCCESSFULLY_DELETED, QUESTION_DELETION_FAILED, SHOW_MODAL, EDIT_MODAL } from './FeedbackActions';

// const initialState = {
//   edit : false, data : {}, 
//   dataList : {}, currentPage : 1, 
//   count : 0, itemsPerPage : 5,
//   schema : null, error : [], success : '',
//   questionnaireList : {},currentQuestionnairePage : 1,
//   questionnaireCount : 0, show: '', edit: ''
// };


// const FeedbackReducer = (state = initialState, action) => {
//   switch (action.type) {

//     case UPDATE_SCHEMA:
//       return Object.assign({}, state, {
//         schema: action.schema, 
//         data : {}
//       });

//     case GET_QUESTIONNAIRE:
//       return Object.assign({}, state, { 
//         data: action.data 
//       });

//     case GET_QUESTIONNAIRE_FAILED:
//       return Object.assign({}, state, { 
//         data: action.data 
//       });

//     case SAVED_QUESTIONNAIRE:
//       return Object.assign({}, state, { 
//         edit : action.status, 
//         data : action.data, 
//         success : action.message
//       });

//     case SAVE_QUESTIONNAIRE_FAILED:
//       return Object.assign({}, state, { 
//         edit : action.status, 
//         data : action.data, 
//         success : action.message
//       });

//     case LIST_QUESTIONNAIRE : 
//      return Object.assign({}, state, {
//         questionnaireList : action.listData, 
//         questionnaireCount : action.count, 
//         currentQuestionnairePage : action.currentPage
//       });

//     case LIST_QUESTIONNAIRE_FAILED : 
//      return Object.assign({}, state, {
//         questionnaireList : action.listData, 
//         questionnaireCount : action.count, 
//         currentQuestionnairePage : action.currentPage
//       });

//     case CLEAR_QUESTIONNAIRE:
//       return Object.assign({}, state, { 
//         success : '', 
//         error: []
//       });

//     case QUESTION_SUCCESSFULLY_DELETED: 
//       return Object.assign({}, state, {
//         status: action.status,
//         success: action.message,
//         data: action.data,
//         error:[]
//       })

//     case QUESTION_DELETION_FAILED: 
//       return Object.assign({}, state, {
//         status: action.status,
//         error: action.error
//       })  

//     case SHOW_MODAL :
//       return Object.assign( {}, state, {
//           show : action.data
//       })

//     case EDIT_MODAL :
//       return Object.assign( {}, state, {
//           edit : action.data
//       }) 

//     default:
//       return state;
//   }
// };


// /* Selectors */
// export const feedbackData  = state => state.feedback;

// // Export Reducer
// export default FeedbackReducer;
