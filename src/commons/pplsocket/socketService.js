import pplSocket from './pplsocket';
import * as socketActions from './actions';
// import store from '../../store';

class SocketService {
  constructor() {
    this.vackCallback = null;
  }

  connect(cb) {
    var self = this;
    pplSocket.connect((response) => {
      if (response.isAuthenticated) {
        self.watchSelfChannel();
      }
      cb && cb(response);
    });
  }

  sendVideoCallReq(data, ackCallback) {
    pplSocket.emit('videocallreq', data, (err, response) => {
      if (err) {
        ackCallback(err);
      } else
        ackCallback(response);
    });
  }

  changeDoctorStatus(status, ackCallback) {
    var data = { status: status };
    pplSocket.emit('presence', data, (err, response) => {
      ackCallback && ackCallback(response);
    });
  }

  incomingVideoCall(callback) {
    self = this;
    pplSocket.listen('videocallreq', (response, ackCallback) => {
      self.vackCallback = ackCallback;
      callback && callback(response, ackCallback);
    });
  }

  endVideocallByDoc(callback) {
    pplSocket.emit('endVideocallByDoc', ackCallback);
  }

  ackVideoCall(response) {
    this.vackCallback && this.vackCallback(null, response);
  }

  sendMessage(message, ackCallback) {
    var roomid = store.getState().socket.roomid;
    var data = {
      message: message,
      roomid: roomid
    };
    pplSocket.emit('chat', data, ackCallback)
  }

  subscribeChannel(channelName) {
    return pplSocket.subscribeChannel(channelName);
  }

  watchSelfChannel() {
    var socket = pplSocket.getSocket();
    var channel = this.subscribeChannel(socket.authToken.userid);
    if (channel) {
      this.watchChannel(channel);
      channel.on('subscribeFail', function (err) {
        console.log('Failed to subscribe to the self channel: ' + err);
      });
    }
  }

  watchChannel(channel) {
    var self = this;
    channel.watch((response) => {
      if (response.status) {
        self.channelListner(response.result);
      } else {
        console.log("watch channel error ", response.result.message);
      }
    });
  }

  listen(eventName, callback) {
    pplSocket.listen(eventName, (response, ackCallback) => {
      conosle.log("event received : ", eventName);
      callback && callback(response, ackCallback);
    });
  }

  channelListner(data) {
    switch (data.eventType) {
      case "videocall_accept": {
        console.log("videocall_accept");
        store.dispatch(socketActions.updateRoomid(data.roomid));
        // this.props.history.pus('video-call');
        break;
      }
      case "videocall_reject": {
        console.log("videocall_reject");
        store.dispatch(socketActions.updateCallRejectStatus(data.reject));
        break;
      }
      case "message": {
        console.log("message");
        var messages = store.getState().socket.messages || [];
        messages.push(data);
        store.dispatch(socketActions.updateRoomMessages(messages));
        break;
      }
      default: {
        console.log(" Looks Like No Event is Attached");
      }
    }
  }

  disconnect() {
    pplSocket.disconnect();
  }
}

var socketService = new SocketService();
export default socketService;