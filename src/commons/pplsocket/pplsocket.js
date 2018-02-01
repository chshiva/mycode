class PPLSocket {
    constructor() {
        this.socket = null;
        this.options = {
            authTokenName: "userAuthToken",
            port: 8005,
            hostname: 'localhost',
            secure: false
        }

    }

    connect(cb) {
        this.socket = socketCluster.connect(this.options);
        this.listen('connect', cb)
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    getSocket() {
        return this.socket;
    }

    subscribeChannel(channelName) {
        if (channelName) {
            return this.socket.subscribe(channelName);
        }
        return null;
    }

    isChannelSubscribed(channelName) {
        if (this.socket != null) {
            return this.socket.isSubscribed(channelName);
        }
        return false
    }

    emit(eventName, data, ackcb) {
        if (this.socket) {
            this.socket.emit(eventName, data, (err, response) => {
                ackcb && ackcb(err, response);
            });
        }
    }

    listenChannel(channel, cb) {
        if (channel) {
            channel.watch((response) => {
                cb && cb(response);
            });
        }
    }

    listen(eventName, cb) {
        if (this.socket) {
            this.socket.on(eventName, (response, ackCallback) => {
                cb && cb(response, ackCallback);
            });
        }
    }
}

var pplSocket = new PPLSocket();
export default pplSocket;