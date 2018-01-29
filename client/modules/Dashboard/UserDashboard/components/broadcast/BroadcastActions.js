import callApi from '../../../../../util/apiCaller';
import { browserHistory } from 'react-router';
import AuthClient from '../../../../../components/AuthController';
import moment from 'moment';

export const BROADCAST_NOTIFICATION = 'BROADCAST_NOTIFICATION';
export const CLEAR_BROADCAST_NOTIFICATION = 'CLEAR_BROADCAST_NOTIFICATION';

export function saveBroadcastRequest(data){
  if (data._id) {
    let id = data._id;
    delete data['_id'];
    return callApi('broadcast/' + id, 'put', {
      data : data
    });
  } else {
    return callApi('broadcast', 'post', {
      data : data
    });
  }	
}

export function getBroadcastData(data){
  return callApi('broadcast-data/' + data.limit, 'get');
}

export function getHandraiseQues(recordId){
  //return callApi('handraise-question/' + recordId, 'get');
}

export function sendComment(id, comment){
  return callApi('save-broadcast-comment/' + id, 'put', {
    data : { comment : comment}
  });
}

export function getComments(data){
  return callApi('get-broadcast-comments/' + data._id + '/' + data.limit, 'get');
}

export function deleteBroadcast(recordId){
  return callApi('delete-broadcast/' + recordId, 'delete');
}

export function saveReply(data, bid) {
  return callApi('broadcast-comment-reply/' + bid, 'put', {
    data : data
    });
}

export function getReplies(data){
  return callApi('comment-replies/' + data._id + '/' +data.replyOn, 'get');
}

export function updateLikeRequest(data) {
  return callApi('update-likes', 'put', {
    data : data
  });
}

//Code added by - Najib, Desc - to show broadcst notofication after posting news
export function broadcastNotifications (obj){  
  return (dispatch) => {
    return callApi('broadcast-notifications', 'get').then( res => dispatch(setBroadcastNotification(res)));
  };  
}

export function setBroadcastNotification(response){
  return {
        type: BROADCAST_NOTIFICATION,
        status: response.status,
        notifications: response.notifications,
        total : response.total
    };
}

export function updateUserId() {
  console.log("At action");
  return (dispatch) => {
    return callApi('update-user-status', 'get').then( res => dispatch(updateBroadcastController(res)))
  }
}

//code chaged by - Najib, Clear notification data 
export function updateBroadcastController(response){
  console.log("At response");
  return {
    type: CLEAR_BROADCAST_NOTIFICATION,
    status: true, 
    count : 0       
  };
}

