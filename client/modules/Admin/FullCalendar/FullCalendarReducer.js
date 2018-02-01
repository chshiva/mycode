import { LIST_FULL_CALENDAR_EVENTS } from './FullCalendarActions';

const initialState = {
	edit : false, data : {}, error : []
};

const FullCalendarReducer = (state =initialState,action) => {
  switch(action.type) {
    case LIST_FULL_CALENDAR_EVENTS:
      return Object.assign({}, state,{ data : action.data, error : action.error });
    default:
      return state;	
  }

}
  export const FullCalendarEventsData  = state => state.fullCalendarEvents;
  export default FullCalendarReducer;
