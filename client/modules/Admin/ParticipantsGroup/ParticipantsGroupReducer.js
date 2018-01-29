import { SAVED_GROUP, SAVE_GROUP_FAILED, LIST_GROUP, LIST_GROUP_FAILED, FETCH_GROUP_DATA, CLEAR_GROUP, DELETE_GROUP, DELETE_STUDENT, SAVE_GROUP_NAME, ADD_PARTICIPANTS_IN_GROUP, ADD_PARTICIPANTS_IN_GROUP_FAILED, SAVE_GROUP_NAME_FAILED } from './ParticipantsGroupActions';

const initialState = {
  edit : false, data : {}, dataList : {}, 
  currentPage : 1, count : 0, 
  itemsPerPage : 5,
  schema : null,
  error : [],
  success : '', deleteSuccess : ''
};

const ParticipantsGroupReducer = (state = initialState, action) => {
  switch (action.type) {
  	case SAVED_GROUP :
      return Object.assign({ }, state, { edit : action.status, dataList : action.data, success : action.message, count: action.count });
    case SAVE_GROUP_FAILED :
      return Object.assign({ }, state, { edit : action.status, data : action.data, success : action.message, error : action.error });
    case LIST_GROUP :
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage, error : action.error });
    case LIST_GROUP_FAILED :
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage, error : action.error });
    case FETCH_GROUP_DATA :
      return Object.assign({}, state, { dataList : action.listData });
    case CLEAR_GROUP:
      return Object.assign({}, state, {  dataList : {}, 
      currentPage : 1, count : 0,    error : [],
      success : '', deleteSuccess : ''});  
    case DELETE_GROUP :
      return Object.assign({}, state, { success : action.message, deleteSuccess : action.message });
    case DELETE_STUDENT :
      return Object.assign({}, state, { success : action.message, dataList : action.listData }); 
    case SAVE_GROUP_NAME :
      return Object.assign({}, state, { success : action.message, dataList : action.listData});

    case SAVE_GROUP_NAME_FAILED :
      return Object.assign({}, state, { error : action.error});   
    case ADD_PARTICIPANTS_IN_GROUP :
      return Object.assign({}, state, { success : action.message, dataList : action.listData}); 
    case ADD_PARTICIPANTS_IN_GROUP_FAILED :
      return Object.assign({}, state, { error : action.error });
           
   	default:
      return state;
  }
};

/* Selectors */

export const groupData  = state => state.ParticipantsGroup;

// Export Reducer
export default ParticipantsGroupReducer;