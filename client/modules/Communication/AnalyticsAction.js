import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export function createLogs(data, callback){
	return (dispatch) => {
	    return callApi('logAnalytics', 'post', {
	      data: data,
	    }).then(res => callback(res));
  	};	
}

export function updateAttendance(data){
	return(dispatch) => {
		return callApi('updateAttendance', 'post', {
			data: data,
		}).then(res => console.log("Updated teh attendance"));
	};
}

export function saveVisiteTopic(data,callback)  {
	return(dispatch) => {
		return callApi('saveVisiteTopic', 'put', {
	 		data: data
 		}).then(res => callback(res));
	}
	
}

export function markAsCompleteTopic(data) {
	return callApi('markAsCompleteTopic', 'put', {
		data: data
	})
}

export function getTopicStatus(data) {
	return callApi('get-topic-status/' + data.roomId + '/' + data.topicId, 'get')
}
