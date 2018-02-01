import { SET_ROOM_ID, SET_ROOM_MESSAGES, SET_REJECT_CALL } from './constants';

var initialState = {
    roomid: null,
    reject:false,
    messages: []
};

export default function socketReducer(state, action) {
    state = state || initialState;

    switch (action.type) {
        case SET_ROOM_ID: {
            console.log("SET_ROOM_ID ");
            return Object.assign({}, state, {
                roomid: action.roomid,
            });
            break;
        }

        case SET_REJECT_CALL: {
            console.log("SET_REJECT_CALL ");
            return Object.assign({}, state, {
                reject: action.status,
            });
            break;
        }

        case SET_ROOM_MESSAGES: {
            console.log("SET_ROOM_MESSAGES ");
            return Object.assign({}, state, {
                messages: action.message,
            });
            break;
        }


        default:
            return state;
    }
}