import { BROADCAST_NOTIFICATION, CLEAR_BROADCAST_NOTIFICATION } from './BroadcastActions';

const initialState = {
   individualCount : {}, total : 0
};

//Code added by - Najib, Reducer to keep the count and data of broadcast posted news
const BroadcastReducer = (state = initialState, action) => {
  switch (action.type) {

    case BROADCAST_NOTIFICATION  : {
      return Object.assign({}, state, { individualCount : action.notifications, total : action.total});
    }
    case CLEAR_BROADCAST_NOTIFICATION : {
        return Object.assign({}, state, { total : 0});
    }
    default:
      return state;
   }
};

export const broadcastData  = state => state.broadcast;

// Export Reducer
export default BroadcastReducer;



    