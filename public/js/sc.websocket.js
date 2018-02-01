/*
 * Copyright © 2017 Intel Corporation. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 3. The name of the author may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class SignalingChannel
 * @classDesc Network module for WooGeen P2P chat
 */

var wsServer = null;

SubscribeUser = function(uid){
  //console.log("Subscribe User", uid);
}

function SignalingChannel() {

  this.onMessage = null;
  this.onServerDisconnected = null;
  this.onUserStatusChanged = null;
  this.onInstaMessageReceived = null;

  var clientType = 'Web';
  var clientVersion = '3.3';


  var self = this;

  /* TODO: Do remember to trigger onMessage when new message is received.
     if(this.onMessage)
       this.onMessage(from, message);
   */


  // message should a string.
  this.sendMessage = function(message, targetId, successCallback,
    failureCallback) {
    var data = {
      data: message,
      to: targetId
    };
    wsServer.emit('woogeen-message', data, function(err) {
      if (err && failureCallback)
        failureCallback(err);
      else if (successCallback)
        successCallback();
    });
  };

  this.connect = function(loginInfo, successCallback, failureCallback) {
    var serverAddress = loginInfo.host;
    var token = loginInfo.token;
    var paramters = [];
    var queryString = null;
    paramters.push('clientType=' + clientType);
    paramters.push('clientVersion=' + clientVersion);
    if (token)
      paramters.push('token=' + encodeURIComponent(token));
    if (paramters)
      queryString = paramters.join('&');
    L.Logger.debug('Query string: ' + queryString);
    var opts = {
      query: queryString,
      'reconnection': true,
      'reconnectionAttempts': 10,
      'force new connection': true
    };
    // Using websocket for IE 10 and IE 11
    if ((navigator.appVersion.indexOf("MSIE 10") !== -1) || (navigator.userAgent
        .indexOf("Trident") !== -1 && navigator.userAgent.indexOf("rv:11") !==
        -1))
      opts.transports = ['websocket'];
    wsServer = io(serverAddress, opts);


    wsServer.on('connect', function() {
      L.Logger.info('Connected to websocket server.');
    });

    wsServer.on('server-authenticated', function(data) {
      L.Logger.debug('Authentication passed. User ID: ' + data.uid);
      if (successCallback) {
        successCallback(data.uid);
        successCallback = null;
        failureCallback = null;
      }
    });

    wsServer.on('disconnect', function() {
      L.Logger.info('Disconnected from websocket server.');
      if (self.onServerDisconnected)
        self.onServerDisconnected();
    });

    wsServer.on('connect_failed', function(errorCode) {
      L.Logger.error('Connect to websocket server failed, error:' +
        errorCode + '.');
      if (failureCallback) {
        failureCallback(parseInt(errorCode));
        successCallback = null;
        failureCallback = null;
      }
    });

    wsServer.on('error', function(err) {
      L.Logger.error('Socket.IO error:' + err);
      if (err == '2103' && failureCallback) {
        failureCallback(err);
        successCallback = null;
        failureCallback = null;
      }
    });

    wsServer.on('woogeen-message', function(data) {
      L.Logger.info('Received woogeen message.');
      if (self.onMessage)
        self.onMessage(data.data, data.from);
    });

    wsServer.on('online', function(data){
      // console.log("Online", data);
      // console.log("self online === ", self);
      self.onUserStatusChanged(data);
    });

    wsServer.on('offline', function(data){
      // console.log("Offline", data);
      // console.log("self offline === ", self);
      self.onUserStatusChanged(data);
    });

    wsServer.on('insta-message', function(data){
      // console.log('Insta Message', data);
      self.onInstaMessageReceived(data);
    })
  };

  this.disconnect = function() {
    if (wsServer)
      wsServer.close();
  };


  this.subscribe = function(uid){
    console.log('Subscirbe Users', uid);
    wsServer.emit('subscribe', uid);
  }

  this.sendInstaMessage = function(objData, uid){
    //wsServer.emit('sendInstaMessage', objData, uid);
    var data = {
      data: objData,
      to: uid
    };
    wsServer.emit('insta-message', data, function(err) {
      if(err){

      }else{

      }
    });
  }
}
