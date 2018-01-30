import callApi from '../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../components/AuthController';

export const LIST_FULL_CALENDAR_EVENTS = 'LIST_FULL_CALENDAR_EVENTS';

var _ = require('lodash');

export function CalendarEventsList (year) {
  let startDate = moment(year, 'YYYY').startOf('year').utc().format('x');
  let endDate = moment(year, 'YYYY').endOf('year').utc().format('x');
  return (dispatch) => {
    return callApi('date-schedules/' + startDate + '/' + endDate, 'get').then(res => dispatch(CalendarEventsListStatus(res, year)));
    // return callApi('get-full-calendar-events/' + startDate + '/' + endDate, 'get').then(res => dispatch(CalendarEventsListStatus(res, year)));
  };
};


export function CalendarEventsListStatus(response){
  if(response.status) {
    let scheduleData = [];
    response.data.forEach(function(data){
      let obj = {
        title : data.meetingName,
        start : moment(data.dates.startTime, 'x').toDate(),
        end : moment(data.dates.endTime, 'x').toDate(),
        data : data
      };
      scheduleData.push(obj);
    });
    return {
      type: LIST_FULL_CALENDAR_EVENTS,
      data: scheduleData,
      error : []
    }; 
  } else if (response.error) {
    return {
      type: LIST_FULL_CALENDAR_EVENTS,
      data: [],
      error : [response.error]
    };
  } else {
    return {
      type: LIST_FULL_CALENDAR_EVENTS,
      data: [],
      error : ['Internal server error']
    };
  }   
}

export function getMyRooms (){
  return callApi('fetch-my-rooms', 'get');
}


