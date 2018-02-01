import { SAVED_ROOM_STUDENT, SAVED_GROUP_STUDENT } from './RoomActions';

const initialState = {
  // edit : false, data : {}, 
};


const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVED_ROOM_STUDENT:
      return Object.assign({}, state, { data : action.data });
    case SAVED_GROUP_STUDENT: 
      return Object.assign({}, state, { edit : action.status, data : action.data, success : action.message }); 
    default:
      return state;
  }
};


/* Selectors */
export const studentData  = state => state.student;

// Export Reducer
export default StudentReducer;
