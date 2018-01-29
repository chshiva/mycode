import { CLEAR_FEEDBACK, LIST_ROOM_FEEDBACK, SAVED_ROOM_FEEDBACK } from './RoomActions';

const initialState = {
  data : {}, 
  dataList : [], currentPage : 1, 
  count : 0, itemsPerPage : 5,
  schema : null, error : [], success : '', roomId:''
};

const FeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_FEEDBACK:
      return Object.assign({}, state, { edit : action.status });
    case LIST_ROOM_FEEDBACK:
      return Object.assign({}, state, { edit : action.status, dataList : action.listData, count:action.count, roomId : action.roomId, currentPage : action.currentPage});
    case SAVED_ROOM_FEEDBACK:
      return Object.assign({}, state, { edit : action.status, data : action.data, success : action.message });  
      default:
      return state;
  }
};

/* Selectors */
export const feedbackData  = state => state.feedback;

// Export Reducer
export default FeedbackReducer;  