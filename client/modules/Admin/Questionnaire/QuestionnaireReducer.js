import { GET_QUESTIONNAIRE, GET_QUESTIONNAIRE_FAILED, SAVED_QUESTIONNAIRE, SAVE_QUESTIONNAIRE_FAILED, LIST_QUESTIONNAIRE, LIST_QUESTIONNAIRE_FAILED, CLEAR_QUESTIONNAIRE, QUESTION_SUCCESSFULLY_DELETED, QUESTION_DELETION_FAILED, SHOW_MODAL, EDIT_MODAL, SAVE_GRADE_QUESTIONNAIRE, SAVE_GRADE_QUESTIONNAIRE_FAILED, GET_GRADE_QUESTIONNAIRE, GET_GRADE_QUESTIONNAIRE_FAILED, CLEAR_QUESTIONNAIRE_GRADES, GET_QUESTIONNAIRE_RESULT, GET_CLONE_QEUSTIONNAIRE, FETCH_CLONE_QEUSTIONNAIRE} from './QuestionnaireActions';

const initialState = {
  edit : false, data : {}, 
  dataList : {}, currentPage : 1, 
  count : 0, itemsPerPage : 5,
  schema : null, error : [], success : '',
  questionnaireList : {},currentQuestionnairePage : 1,
  questionnaireCount : 0, show: '', edit: '', deleteSuccess : '', gradeData : [],
  questionnaireResultData: {}, questionnairesData: {}, questionnaireCloneData: {}
};


const QuestionnaireReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_QUESTIONNAIRE:
      return Object.assign({}, state, { 
        data: action.data 
      });

    case GET_QUESTIONNAIRE_FAILED:
      return Object.assign({}, state, { 
        data: action.data 
      });

    case SAVED_QUESTIONNAIRE:
      return Object.assign({}, state, { 
        edit : action.status, 
        data : action.data, 
        success : action.message
      });

    case SAVE_QUESTIONNAIRE_FAILED:
      return Object.assign({}, state, { 
        edit : action.status, 
        // data : action.data, 
        success : action.message
      });

    case LIST_QUESTIONNAIRE : 
     return Object.assign({}, state, {
        questionnaireList : action.listData, 
        questionnaireCount : action.count, 
        currentQuestionnairePage : action.currentPage
      });

    case LIST_QUESTIONNAIRE_FAILED : 
     return Object.assign({}, state, {
        questionnaireList : action.listData, 
        questionnaireCount : action.count, 
        currentQuestionnairePage : action.currentPage
      });

    case CLEAR_QUESTIONNAIRE:
      return Object.assign({}, state, { 
        success : '', 
        error: [],
        deleteSuccess : ''
      });

    case QUESTION_SUCCESSFULLY_DELETED: 
      return Object.assign({}, state, {
        status: action.status,
        deleteSuccess: action.message,
        data: action.data,
        error:[]
      })

    case QUESTION_DELETION_FAILED: 
      return Object.assign({}, state, {
        status: action.status,
        error: action.error
      })  

    case SHOW_MODAL :
      return Object.assign( {}, state, {
          show : action.data
      })

    case EDIT_MODAL :
      return Object.assign( {}, state, {
          edit : action.data
      })
    case SAVE_GRADE_QUESTIONNAIRE :
      return Object.assign( {}, state, {
        gradeData : action.data,
        success : action.message
      })
    case SAVE_GRADE_QUESTIONNAIRE_FAILED :
      return Object.assign( {}, state, {
        gradeData : action.data,
        error : action.message,
        success : action.message
      })
    case GET_GRADE_QUESTIONNAIRE :
      return Object.assign( {}, state, {
        gradeData : action.data
      })
    case CLEAR_QUESTIONNAIRE_GRADES :
      return Object.assign( {}, state, {
        gradeData : [], success : '', error : [] 
      }) 
    case GET_QUESTIONNAIRE_RESULT :
      if(action.data) {
        return Object.assign({}, state, { questionnaireResult: action.data });
      } else {
        return state;
      }
    case GET_CLONE_QEUSTIONNAIRE :
     if(action.data) {
        return Object.assign({}, state, { questionnaireCloneData: action.data });
      } else {
        return state;
      }
    case FETCH_CLONE_QEUSTIONNAIRE:
      if(action.data) {
        return Object.assign({}, state, { questionnaireCloneData: action.data });
      } else {
        return state;
      }

    default:
      return state;
  }
};


/* Selectors */
export const questionnaireData  = state => state.questionnaire;

// Export Reducer
export default QuestionnaireReducer;
