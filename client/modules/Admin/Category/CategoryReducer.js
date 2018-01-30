import { CLEAR_CAT, UPDATE_SCHEMA, GET_CATEGORY, GET_CATEGORY_FAILED, SAVED_CATEGORY, SAVE_CATEGORY_FAILED, LIST_CATEGORY, LIST_CATEGORY_FAILED, CANCEL_CATEGORY } from './CategoryActions';


const initialState = {
  edit : false, data : {}, dataList : {}, 
  currentPage : 1, count : 0, 
  itemsPerPage : 5,
  schema : null,
  error : [],
  success : '', deleteSuccess : ''
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCHEMA:
      return Object.assign({}, state, { schema : action.schema, data : {}, success : '', error : [] });
    case GET_CATEGORY :
      return Object.assign({ }, state, { data : action.data });
    case GET_CATEGORY_FAILED :
      return Object.assign({ }, state, { data : action.data });
    case SAVED_CATEGORY :
      return Object.assign({ }, state, { edit : action.status, data : action.data, success : action.message, error : action.error });
    case SAVE_CATEGORY_FAILED :
      return Object.assign({ }, state, { edit : action.status, data : action.data, success : action.message, error : action.error });
    case LIST_CATEGORY :
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage, error : action.error });
    case LIST_CATEGORY_FAILED :
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage, error : action.error });
    case CANCEL_CATEGORY:
      return Object.assign({}, state, { edit : action.status, deleteSuccess : action.message });
    case CLEAR_CAT:
      return Object.assign({}, state, { success : '', error : [], deleteSuccess : '' });
    default:
      return state;
  }
};


/* Selectors */

export const categoryData  = state => state.category;

// Export Reducer
export default CategoryReducer;