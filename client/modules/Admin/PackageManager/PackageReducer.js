import { UPDATE_SCHEMA, EDIT_PACKAGE, SAVE_PACKAGE, GET_PACKAGE, CANCEL_PACKAGE, SAVED_PACKAGE, LIST_PACKAGE, CLEAR_PACKAGE, FETCHED_PACKAGE } from './PackageActions';

const initialState = {
  edit : false, data : {}, 
  dataList : {}, currentPage : 1, 
  count : 0, itemsPerPage : 5,
  schema : null,
  success : '',
  deleteSuccess : ''
};


const PackageReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PACKAGE:
      return Object.assign({}, state, { edit : action.status });
    case SAVE_PACKAGE:
      return Object.assign({}, state, { edit : action.status, data : action.data });
    case CANCEL_PACKAGE:
      return Object.assign({}, state, { edit : action.status, deleteSuccess : action.message });
    case SAVED_PACKAGE:
      return Object.assign({}, state, { edit : action.status, success : action.message });
    case GET_PACKAGE:
      return Object.assign({}, state, { data: action.data });
    case LIST_PACKAGE:
      return Object.assign({}, state, {
        dataList : action.listData, count : action.count, currentPage : action.currentPage
      });
    case UPDATE_SCHEMA:
      return Object.assign({}, state, {schema: action.schema, data : {}});
    case CLEAR_PACKAGE : 
      return Object.assign({}, state, { success : '', deleteSuccess : '' });
    case FETCHED_PACKAGE : 
      return Object.assign({}, state, { data : action.data });
    default:
      return state;
  }
};


/* Selectors */
export const packageData  = state => state.packages;

// Export Reducer
export default PackageReducer;
