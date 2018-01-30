import { CLEAR_LOCATION, UPDATE_SCHEMA, GET_LOCATION, SAVED_LOCATION, LIST_LOCATION, CANCEL_LOCATION, VIEW_LOCATION } from './LocationActions';

const initialState = {
   edit: false, data: {}, dataList: {}, currentPage: 1, count: 0, itemsPerPage: 5, schema : null, success : ''
};


const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVED_LOCATION:
      return Object.assign({}, state, { edit : action.status, data : action.data, success : action.message });
    case GET_LOCATION:
      return Object.assign({}, state, { data: action.data });
    case UPDATE_SCHEMA:
      return Object.assign({}, state, {schema: action.schema, data : {}});
    case CLEAR_LOCATION:
      return Object.assign({}, state, { success : ''});
    case LIST_LOCATION:
      return Object.assign({}, state, { dataList : action.listData, count : action.count, currentPage : action.currentPage });
    case CANCEL_LOCATION:
      return Object.assign({}, state, { edit : action.status, success : action.message });
    case VIEW_LOCATION:
      return Object.assign({}, state, { data: action.data });
    default:
      return state;
  }
};


/* Selectors */
export const locationData  = state => state.location;

// Export Reducer
export default LocationReducer;
