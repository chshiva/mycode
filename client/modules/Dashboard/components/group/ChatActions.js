import callApi from '../../../../util/apiCaller';
import { browserHistory } from 'react-router';

export const MY_GROUPS = 'MY_GROUPS';
export const MY_CHATS = 'MY_CHATS';
export const CHAT_NOTIFICATION = 'CHAT_NOTIFICATION';
export const CLEAR_CHAT_NOTIFICATION = 'CLEAR_CHAT_NOTIFICATION';
export const CLEAR_CHAT = 'CLEAR_CHAT';

export function createGroup (obj){
	return (dispatch) => {
	    return callApi('creategroup', 'post', {
	      groupObj: obj
	    }).then(res => dispatch(setGroupList(res)));
  	};
}

export function getMyGroups(uid){
	return (dispatch) => {
		return callApi('getmygroups', 'post', {
			uid : uid
		}).then(res => dispatch(setGroupList(res)));
	};
}

export function membersToGroup(obj){
	return (dispatch) => {
		return callApi('memberstogroup', 'post', {
			reqObj : obj
		}).then(res => dispatch(setGroupList(res)));
	}
}

export function deleteGroup(obj){
	return (dispatch) => {
		return callApi('deletegroup', 'post', {
			reqObj : obj
		}).then(res => dispatch(setGroupList(res)));
	}
}


export function setGroupList(response){
	console.log("response === ",response);
	if(response.status){
	    return {
	        type: MY_GROUPS,
	        status: response.status,
	        data: response.data,
	        message : response.message
	    };
  	}else{
	    return {
	      	type: MY_GROUPS,
	        status: response.status,
	        error : response.error
	    };
  	}
}

export function sendMessage (obj){
	return (dispatch) => {
	    return callApi('send-message', 'post', {
	      chatObj: obj
	    }).then(res => dispatch(setChatMessages(res)));
  	};
}

export function setChatMessages(response){
	console.log("response === ", response);
	if(response.status){
	    return {
	        type: MY_CHATS,
	        status: response.status,
	        data: response.data
	    };
	}else{
    return {
      	type: MY_CHATS,
        status: response.status,
        error : response.error
    };
	}
}

/*export function setChatNotification(response){
	return {
        type: CHAT_NOTIFICATION,
        status: response.status,
        data: response.data
    };
}*/

export function clearChatNotification(response){
	return {
        type: CLEAR_CHAT_NOTIFICATION,
        status: true,
        id: response.id,
        activeData : response.activeData,
        chatType : response.chatType
    };
}

export function clearChatData() {
	return {
		type : CLEAR_CHAT,
		status : true
	}
}

export function getChatData (obj){
	let query = '?type=' + obj.chatType + '&sentTo=' + obj.sentTo;
	return (dispatch) => {
    return callApi('chat-data' + query).then(res => dispatch(setChatMessages(res)));
	};
}

export function getChatNotification (obj){
	/*// console.dir(obj)
	return (dispatch) => {
	    return callApi('getchatnotification', 'post', {
	      chatObj: obj
	    }).then(res => dispatch(setChatNotification(res)));
  	};*/
}

export function chatNotification (obj){
	return callApi('chatnotification', 'post', {
      chatObj: obj
    });
}

export function chatNotifications (obj){
	if (obj.chatType == 'Indi') {
		return (dispatch) => {
			return callApi('ind-chat-notifications', 'get').then( res => dispatch(setChatNotification(res)));
		};
	} else if (obj.chatType == 'Group') {

	}
}

export function setChatNotification(response){
	return {
        type: CHAT_NOTIFICATION,
        status: response.status,
        notifications: response.notifications,
        total : response.total
    };
}

export function getRoomChatData(obj){
	let query = '?type=' + obj.chatType + '&sentTo=' + obj.sentTo;
  return callApi('chat-data' + query, 'get');
}

export function sendRoomMessage (obj){
  return callApi('send-message', 'post', {
    chatObj: obj
  });
}

export function clearRoomChat (roomKey){
  return callApi('clear-roomchat', 'post', {
    roomKey: roomKey
  });
}