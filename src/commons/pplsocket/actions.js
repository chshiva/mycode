import { SET_ROOM_ID, SET_ROOM_MESSAGES, SET_REJECT_CALL } from './constants';


export function updateRoomid(roomid) {
    return {
        type: SET_ROOM_ID,
        roomid
    };
}

export function updateCallRejectStatus(status) {
    return {
        type: SET_REJECT_CALL,
        status
    };
}

export function updateRoomMessages(message) {
    return {
        type: SET_ROOM_MESSAGES,
        message
    };
}