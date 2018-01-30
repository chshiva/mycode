import { CLEAR_CORP, UPDATE_SCHEMA, EDIT_CORPORATE, SAVE_CORPORATE, GET_CORPORATE, CANCEL_CORPORATE, SAVED_CORPORATE, LIST_CORPORATE } from './CorporateActions';

const initialState = {
  edit : false, data : {}, dataList : {}, 
  currentPage : 1, count : 0, 
  itemsPerPage : 5,
  schema : null,
  success : '', deleteSuccess : ''
};


const CorporateReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CORPORATE :
      return Object.assign({ }, state, { edit : action.status, success : '' });
    case SAVE_CORPORATE :
      return Object.assign({ }, state, { edit : action.status, data : action.data, success : '' });
    case CANCEL_CORPORATE :
      return Object.assign({ }, state, { edit : action.status, deleteSuccess : action.message });
    case SAVED_CORPORATE :
      return Object.assign({ }, state, { edit : action.status, success : action.message });
    case GET_CORPORATE :
      return Object.assign({ }, state, { data : action.data });
    case LIST_CORPORATE :
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage });
    case UPDATE_SCHEMA:
      if(action.data && action.data != null) {
        return Object.assign({}, state, { schema : action.schema, data : action.data, success : '' });
      } else {
        return Object.assign({}, state, { schema : action.schema, data : {}, success : '' });
      }
    case CLEAR_CORP:
      return Object.assign({}, state, { success : '', deleteSuccess : ''});
    default:
      return state;
  }
};


/* Selectors */

export const corporateData  = state => state.corporate;

// Export Reducer
export default CorporateReducer;
