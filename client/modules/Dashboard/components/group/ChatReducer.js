import { MY_GROUPS, MY_CHATS, ROOM_CHATS, CHAT_NOTIFICATION, CLEAR_CHAT_NOTIFICATION, CLEAR_CHAT } from './ChatActions';

const initialState = {
  edit : false, mygroups : [], individualCount : {}, total : 0, chatType : '', activeData : null, chatData : null
};


const ChatReducer = (state = initialState, action) => {
  switch (action.type) {

    case MY_GROUPS : {
      let newstate = {}
      if(action.data)
        newstate['mygroups'] = action.data;
      if(action.edit)
        newstate['edit'] = action.status;
      return Object.assign( {}, state, newstate );
    }
    case MY_CHATS : {
      if (action.status) {
        return Object.assign( {}, state, { status : action.status, chatData : action.data } );
      } else {
        return state;
      }
    }
    case ROOM_CHATS : {
      return Object.assign( {}, state, { status : action.status, roomData : action.data } );
    }
    case CHAT_NOTIFICATION : {
      /*let prev = state.notifications;
      if(!prev){
        prev = {};
      }
      prev[action.data.id] = action.data.count;
      return Object.assign({}, state, { notifications : prev});*/
      return Object.assign({}, state, { individualCount : action.notifications, total : action.total});
    }
    case CLEAR_CHAT_NOTIFICATION : {
      let prev = state.individualCount;
      if(prev){
        delete prev[action.id];
        return Object.assign({}, state, { individualCount : prev, total : 0, activeData : action.activeData, chatType : action.chatType});
      }else
        return state;
    }
    case CLEAR_CHAT : {
      return Object.assign( {}, state, { status : action.status, activeData : null, chatType : '' } );
    }
    default:
      return state;
   }
};

export const chatData  = state => state.chat;

// Export Reducer
export default ChatReducer;


    