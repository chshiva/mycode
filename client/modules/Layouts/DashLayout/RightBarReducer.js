import { UPDATE_RIGHTBAR } from './RightBarActions';

const initialState = {
  	current : null, indChatCount : null, arrow : false, broadcastCount : 0, newsCount : null
};

const RightBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RIGHTBAR :
    	return Object.assign({ }, state, action.data);
    default:
      return state;
  }
};

/* Selectors */
export const rightBar  = state => state.rightBar;

// Export Reducer
export default RightBarReducer;
