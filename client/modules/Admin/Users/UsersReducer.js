import { CLEAR_USER, UPDATE_SCHEMA, EDIT_USER, SAVE_USER, GET_USER, CANCEL_USER, SAVED_USER, LIST_USER,VIEW_USER, IMPORT_USER, IMPORT_USER_FAILED, SAVED_LOGIN_ACTIVEUSERS, LIST_ACTIVEUSERS, CLEAR_ACTIVEUSERS_LIST} from './UsersActions';

const initialState = {
  edit: false, data: {}, dataList: {}, currentPage: 1, count: 0, itemsPerPage: 5, schema : null, success : '', deleteSuccess: '',activeusersData:{}
};


const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER:
      return Object.assign({}, state, { edit : action.status, data : action.data });
    case SAVE_USER:
      return Object.assign({}, state, {edit: action.status, data: action.data});
    case CANCEL_USER:
      return Object.assign({}, state, {edit: action.status, deleteSuccess : action.message});
    case SAVED_USER:
      return Object.assign({}, state, { edit : action.status, data : action.data, success : action.message });
    case GET_USER:
      return Object.assign({}, state, {data: action.data});
    case LIST_USER:
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage });
    case VIEW_USER:
      return Object.assign({},state,{ data : action.data });
    case UPDATE_SCHEMA:
      return Object.assign({}, state, { schema : action.schema, data : {} });
    case CLEAR_USER : 
      return Object.assign({}, state, { success : '', deleteSuccess: '' });
    case IMPORT_USER:
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage });
    case SAVED_LOGIN_ACTIVEUSERS:
      return Object.assign({}, state, { activeusersData : action.data });
    case LIST_ACTIVEUSERS:
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage });
    case CLEAR_ACTIVEUSERS_LIST:
      return Object.assign({}, state, { dataList : {}, count : 0, currentPage : 1 });      
    default:
      return state;
  }
};


/* Selectors */
export const userData  = state => state.users;

// Export Reducer
export default UsersReducer;
