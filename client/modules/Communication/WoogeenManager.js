import React, { PropTypes, Component } from 'react';
import {
  CloseConf, addScreen, addUser, addStream, onlyPresenter, setImHost,
  createLogRequest, setStreamStats, StatsAudioSend, StatsAudioRecv, StatsVideoSend,
  StatsVideoRecv, StatsVideoBWE, SetPresenter, SetSpeaker, setMixStream, setScreenEnable, getAttendees, setConfFeedback, RemoteMute, setRecordStream
} from './ConferenceActions';
import { setWorkDashboard, closeSharedDocument } from '../Dashboard/UserDashboard/components/WorkDashboardActions';
import { reloadTopicList, reloadTopicContent, reloadUplodFiles, reloadTopicQuestionnaires, reloadTopicPdfView, reloadQuestionnaire, reloadConductQuestion, reloadPollsList } from '../Dashboard/UserDashboard/components/WorkDashboardReloadActions';
import { Roles } from '../../roles'
import SoundMeter from './SoundMeter';
import { browserHistory } from 'react-router';

var browser = require('detect-browser');
var _ = require('lodash');

var conference = null;
var localStream = null;
var localRemote = null;
var additionalStream = [];
var confConnected = false;
var isJoining = false;
var addstreamCallback = null;

var SetSpeakerListenerCallback = null;
var HandraiseListenerCallback = null;
var WhiteBoardListenerCallBack = null;
var RoomChatListenerCallBack = null;
var HandraiseAnsListenerCallback = {};
var HandraiseReplyListenerCallback = {};
var SyncListenerCallback = null;
var setSelfVideoCallback = null;
var setRemoveVideoCallback = null;
var RoomNotificationCallback = null;
var HandraiseNotificationCallback = null;
var HandraiseAnsNotificationCallback = null;
var setSelfSpeakerCallback = null;
var EditHandraiseCallback = {};
var TopicListenerCallback = null;
var AssignmentListenerCallback = null;
var PollListenerCallback = null;
var SyncScrollListenerCallback = null;
var SyncSSPdfListenerCallback = null;
var SyncPdfPageListenerCallback = null;
var SyncPdfCloseListenerCallback = null;
var ScreenShareNotificationCallBack = null;
var SyncDashConfStatusListenerCallback = null;
var _uid = null;
var _selfID = '';
var TopicContentSelectListenerCallback = null;
var AssignmentContentSelectListenerCallback = null;
var PollContentSelectListenerCallback = null;
var SyncConfStatusListenerCallback = null;
var handleRoomChatListenerCallback = null;
var screenShareKey = 'jckdbnkecmmpemaghimijhehobdeplmd';
var attendees = [];
var allStreams = [];
var allStreamStats = [];
var subScribedStreams = [];
var screenStream = null;

var resolution = 'vga';
var _codec = 'vp9';
var _cameraSource = undefined;
var _audioSource = undefined;

var _role = '';
var _users = [];
var _host;
var _presenter = '';
var _presenterID = '';
var _speaker = '';
var _mixStream = null;
var _activeRoom = '';
var _frameRate = 15;
var _maxVideoBW = 400;
var _maxAudioBW = 28;
var _videoQuality = "Standard";
var roomkeyend = '';
var roomKey = '';
var hostId = '';
var scheduleId = '';
var restartFlag = false;
var RecorderId = '';

var _enableVad = false;
var soundIntervalID = '';
var audioContext = null;
var subscribedScreen = null;
var isFeedBackDsipacth = true


export default class WoogeenManager {

  constructor() {

  }

  setSubscribedScreen(stream) {
    subscribedScreen = stream;
  }

  getSubscrbedStream() {
    return subscribedScreen;
  }

  trySubscribeMixStream(callback) {
    if (_mixStream == null || _mixStream == undefined) {
      console.log('Mix stream null');
      return;
    }
    var that = this;
    console.log("Quality Level - Mix", _videoQuality, this.getScreenSize(resolution));

    if (!_mixStream.mediaStream) {
      conference.subscribe(_mixStream, { video: {/*resolution: this.getScreenSize(resolution), */qualityLevel: _videoQuality } }, function () {
        store.dispatch(setMixStream(_mixStream));
        callback(_mixStream);
      }, function (err) {
        console.log("Mix Error", err);
      })
    } else {
      callback(_mixStream);
    }
  }

  setRoomKey(key) {
    _activeRoom = key;
  }

  getRoomKey() {
    return _activeRoom;
  }

  enableVad(status) {
    _enableVad = status;
  }

  getSelfId() {
    return _selfID;
  }

  static setVideoBitrate(value) {
    _maxVideoBW = value;
    console.log('BitRate Video', value);
  }

  static setAudioBitrate(value) {
    _maxAudioBW = value;
    console.log('BitRate Audio', value);
  }

  static getAudioBitrate() {
    return _maxAudioBW;
  }

  static getVideoBitrate() {
    return _maxVideoBW;
  }

  static videoQuality(value) {
    _videoQuality = value;
  }

  static getVideoQuality() {
    return _videoQuality;
  }

  getScreenSize(_res) {
    switch (_res) {
      case 'sif':
        return { width: 320, height: 240 };
        break;
      case 'vga':
        return { width: 640, height: 480 };
        break;
      case 'hd720p':
        return { width: 1280, height: 720 };
        break;
      case 'hd1080p':
        return { width: 1920, height: 1080 };
        break;
      default:
        return { width: 640, height: 480 };
    }
  }

  trySubscribeStream(stream, callback) {
    var that = this;

    if (stream instanceof Woogeen.RemoteMixedStream) {
      // L.Logger.info('Its Mix Stream', stream.id());
      // _mixStream = stream;
    } else {

      conference.subscribe(stream, function () {
        L.Logger.info('subscribed:', stream.id());

        callback(stream);

        if (!stream.isScreen()) {
          subScribedStreams.push(stream);
          store.dispatch(setStreamStats(subScribedStreams));
        }
      }, function (err) {
        L.Logger.error(stream.id(), 'subscribe failed:', err);
      });
    }
  }

  applyDevices(devices) {
    _cameraSource = devices.camera;
    _audioSource = devices.audio;

    this.rePublishCamera();
  }

  applyResolution(res) {
    resolution = res;
    this.rePublishCamera();
  }

  getLocalStream() {
    return localStream;
  }

  WhatIsMyBrowser = function () {
    return browser.name;
  }

  WhatIsMyBrowserVersion = function () {
    return browser.version;
  }

  SetSpeakerListener = function (callback) {
    SetSpeakerListenerCallback = callback;
  }

  selfSpeaker = function (callback) {
    setSelfSpeakerCallback = callback;
  }

  setSelfVideo = function (callback) {
    setSelfVideoCallback = callback;
  }

  setRemoveVideo = function (callback) {
    setRemoveVideoCallback = callback;
  }

  HandraiseListener = function (callback) {
    HandraiseListenerCallback = callback;
  }

  HandraiseAnsListener = function (callback, id) {
    HandraiseAnsListenerCallback[id] = callback;
  }

  HandraiseReplyListener = function (callback, id) {
    HandraiseReplyListenerCallback[id] = callback;
  }

  TopicListener = function (callback) {
    TopicListenerCallback = callback;
  }

  TopicContentSelectListener = function (callback) {
    TopicContentSelectListenerCallback = callback;
  }

  AssignmentListener = function (callback) {
    AssignmentListenerCallback = callback;
  }

  AssignmentContentSelectListener = function (callback) {
    AssignmentContentSelectListenerCallback = callback;
  }

  PollListener = function (callback) {
    PollListenerCallback = callback;
  }

  PollContentSelectListener = function (callback) {
    PollContentSelectListenerCallback = callback;
  }

  SyncScrollListener = function (callback) {
    SyncScrollListenerCallback = callback;
  }

  SyncSSPdfListener = function (callback) {
    SyncSSPdfListenerCallback = callback;
  }

  SyncPdfPageListener = function (callback) {
    SyncPdfPageListenerCallback = callback;
  }

  SyncPdfCloseListener = function (callback) {
    SyncPdfCloseListenerCallback = callback;
  }

  handleConfStatusListener = function (callback) {
    SyncConfStatusListenerCallback = callback;
  }

  handleDashConfStatusListener = function (callback) {
    SyncDashConfStatusListenerCallback = callback;
  }

  handleRoomChatListener = function (callback) {
    handleRoomChatListenerCallback = callback;
  }

  ScreenShareNotificationListener = function (callback) {
    ScreenShareNotificationCallBack = callback;
  }

  clearWorkDashboardListener = function () {
    SyncScrollListenerCallback = null;
  }

  clearTopicListeners = function () {
    TopicListenerCallback = null;
  }

  clearAssignmentListeners = function () {
    AssignmentListenerCallback = null;
  }

  clearPollListeners = function () {
    PollListenerCallback = null;
  }

  ClearHandraiseReplyListener = function (id) {
    delete HandraiseReplyListenerCallback[id];
  }

  ClearHandraiseAnsListener = function (id) {
    delete HandraiseAnsListenerCallback[id];
  }

  ClearEditHandraiseListener = function (id) {
    delete EditHandraiseCallback[id];
  }

  HandraiseNotificationListener = function (callback) {
    HandraiseNotificationCallback = callback;
  }

  HandraiseAnsNotificationListener = function (callback) {
    HandraiseAnsNotificationCallback = callback;
  }

  EditHandraiseListener = function (callback, id) {
    EditHandraiseCallback[id] = callback;
  }

  ClearHandraiseListener = function () {
    HandraiseAnsListenerCallback = {};
    HandraiseListenerCallback = null;
    HandraiseReplyListenerCallback = {};
    EditHandraiseCallback = {};
  }

  WhiteBoardListener = function (callback) {
    WhiteBoardListenerCallBack = callback;
  }

  RoomChatListener = function (callback) {
    console.log("called RoomChatListener");
    RoomChatListenerCallBack = callback;
  }

  RoomNotificationListener = function (callback) {
    RoomNotificationCallback = callback;
  }

  SyncListener = function (callback) {
    SyncListenerCallback = callback;
  }

  //  getTotalStreams = function(){
  // 	return totalStreams;
  // }

  MuteOrUnMute = function (stream) {
    if (_host) {
      var defIndex = _.findIndex(allStreams, ['sid', stream.sid]);
      var additionalIndex = _.findIndex(additionalStream, ['sid', stream.sid]);

      if (additionalIndex < 0 && stream.sid != localStream.sid)
        this.sendMute(allStreams[defIndex].from);

      return this._MuteOrUnMute(stream);
      //Needs to remove the code later
      // return;
    } else {
      return this._MuteOrUnMute(stream);
    }
  }

  _MuteOrUnMute = function (stream, isNotify) {
    var defIndex = _.findIndex(allStreams, ['sid', stream.sid]);
    if (defIndex >= 0) {

      // host muted then self cannot unmute
      if (localStream.hostedByMute && !_host && store.getState().conference.remoteMute)
        return true;

      if (allStreams[defIndex].mute && isNotify) {
        store.dispatch(addStream(allStreams));
        return allStreams[defIndex].mute;
      }

      if (allStreams[defIndex].mute == undefined) {
        allStreams[defIndex].mute = true;
        allStreams[defIndex].hostedByMute = true;
        allStreams[defIndex].disableAudio()
      } else if (allStreams[defIndex].mute) {
        allStreams[defIndex].mute = false;
        allStreams[defIndex].hostedByMute = false;
        allStreams[defIndex].enableAudio()
      } else {
        allStreams[defIndex].mute = true;
        allStreams[defIndex].hostedByMute = true;
        allStreams[defIndex].disableAudio()
      }
      if (allStreams[defIndex].mute) {
        // conference.mute(stream, "audio");
        conference.pauseAudio(stream, function (result) {
          console.log('pauseAudio', result)
        }, function (err) {
          console.log('pauseAudio', err)
        })
      } else {
        // conference.unmute(stream, "audio");
        conference.playAudio(stream, function (result) {
          console.log('playAudio', result)
        }, function (err) {
          console.log('playAudio', err)
        })
      }
      if (stream.sid == localStream.sid) {
        console.log("Local Mute Fired", localStream);
        localStream.mute = allStreams[defIndex].mute;
      }
      store.dispatch(addStream(allStreams));
      return allStreams[defIndex].mute;
    }
    return false;
    //conference.mute(stream, "audio");
  }

  volumeOnorOff = function (stream) {
    var defIndex = _.findIndex(allStreams, ['sid', stream.sid]);
    if (defIndex >= 0) {
      if (allStreams[defIndex].volume == undefined) {
        allStreams[defIndex].volume = true;
        allStreams[defIndex].disableAudio()
      } else if (allStreams[defIndex].volume) {
        allStreams[defIndex].volume = false;
        allStreams[defIndex].enableAudio()
      } else {
        allStreams[defIndex].volume = true;
        allStreams[defIndex].disableAudio()
      }
      store.dispatch(addStream(allStreams));
      return allStreams[defIndex].volume;
    }
    return false;
  }

  setSpeaker = function (stream) {
    //Find Index
    var defIndex = _.findIndex(allStreams, ['from', stream.from]);
    if (defIndex > 1) {

      allStreams.splice(1, 0, allStreams[defIndex]);
      allStreams.splice(defIndex + 1, 1);

      store.dispatch(addStream(allStreams));
    }
  }

  onlyPresenter(status) {
    store.dispatch(onlyPresenter(status));
  }

  sendMute(to) {
    if (_host) {
      let obj = {
        command: 'SELF_MUTE',
        content: {},
        type: 'OBJECT'
      };

      this.sendMessage(obj, to);
    }
  }

  sendMessage = function (message, toWhome) {
    if (conference) {
      let msg = JSON.stringify(message);
      if (toWhome == 0) {
        conference.send(msg, function () {
          console.log("Request Sent");
        }, function (err) {
          console.log("Request Fail", err);
        });
      } else {
        conference.send(msg, toWhome, function () {
          console.log("Request Sent");
        }, function (err) {
          console.log("Request Fail", err);
        });
      }
    }
  }

  handleSoundMeter = function (stream) {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (audioContext == null) {
      audioContext = new AudioContext();
    }

    var soundMeter = new SoundMeter(audioContext);

    var that = this;
    soundMeter.connectToSource(stream, function (e) {
      if (e) {
        alert(e);
        return;
      }

      soundIntervalID = setInterval(function () {
        // console.log("Sound Low Test", _presenterID, localStream.from);
        try {
          if (_presenterID != localStream.from) {
            if (_presenterID != '') {
              var _slowValue = soundMeter.slow.toFixed(2);
              let obj = {
                command: 'SOUND_METER',
                content: { sid: localStream.sid, slowValue: _slowValue },
                type: 'OBJECT'
              };
              // console.log("Slow Before Value", _slowValue, localStream.sid);
              if (_slowValue > 0.05) {
                console.log("Slow Meter Value", _slowValue);
                that.sendMessage(obj, _presenterID);
              }
            }
          }
        } catch (error) {
          console.log("Interval Error")
        }

        // instantMeter.value = instantValueDisplay.innerText =
        //     soundMeter.instant.toFixed(2);
        // slowMeter.value = slowValueDisplay.innerText =
        //     soundMeter.slow.toFixed(2);
        // clipMeter.value = clipValueDisplay.innerText =
        //     soundMeter.clip;
      }, 1000);
    });

    console.log("Sound Meter ", stream, soundMeter);
  }

  displayStream(stream) {
    var streamId = stream.id();
    var div = document.createElement('div');
    div.setAttribute('id', 'scrlvid' + streamId);
    div.setAttribute('class', 'rsc-slider-item');
    div.setAttribute('style', 'flex: 0 0 100%');

    var div1 = document.createElement('div');
    div1.setAttribute('id', 'subvid' + streamId);
    div1.setAttribute('class', 'rsc-slider-item-img rsc-slider-item_transparent');
    div1.setAttribute('style', 'width:160px; height: 90px; position:none;');

    div.appendChild(div1);

    if (document.getElementById('refBefore')) {
      var refBefore = document.getElementById('refBefore').parentNode.parentNode;
      document.getElementById('confScroller').insertBefore(div, refBefore);
    }

    stream.show('subvid' + streamId);
  }

  getConference(iceservers, transport, callback) {
    // console.log("ICE GOT", iceservers);
    if (!conference) {

      conference = Woogeen.ConferenceClient.create({});

      //Thrid party Ice Servers, if required.
      conference.setIceServers(store.getState().login.iceServers);
      // console.log(browser);

      // if(browser.name != 'edge'){
      //     conference.setIceServers([{
      //           urls: "stun:203.196.151.150:3478"
      //         }, {
      //             urls: ["turn:turn.instavc.com:443?transport=udp", "turn:5.187.21.7:443?transport=tcp"],
      //             username: "admin",
      //             credential: "admin123"
      //     }]);
      // }

      conference.trasportMode(transport); //all or relay

      this.setStreamEvents();
      return callback(conference);
    } else {
      return callback(conference);
    }
  }

  closeConference = function () {
    console.log("inside closeConference");
    conference.clearEventListener('user-joined');
    conference.clearEventListener('user-left');
    conference.clearEventListener('message-received');
    conference.clearEventListener('stream-added');
    conference.clearEventListener('stream-removed');
    conference.clearEventListener('stream-failed');
    conference.clearEventListener('recorder-removed');
    conference.clearEventListener('server-disconnected');

    conference = null;
    console.log("Server Disconnectiond");

    attendees = [];
    allStreams = [];
    subScribedStreams = [];
    if (screenStream) {
      screenStream.close();
    }
    screenStream = null;

    addstreamCallback = null;
    SetSpeakerListenerCallback = null;
    HandraiseListenerCallback = null;
    WhiteBoardListenerCallBack = null;
    RoomChatListenerCallBack = null;
    HandraiseAnsListenerCallback = {};
    HandraiseReplyListenerCallback = {};
    SyncListenerCallback = null;
    setSelfVideoCallback = null;
    RoomNotificationCallback = null;
    HandraiseNotificationCallback = null;
    HandraiseAnsNotificationCallback = null;
    setSelfSpeakerCallback = null;
    subscribedScreen = null;
    _role = '';
    _host = false;

    EditHandraiseCallback = {};

    isJoining = false;
    confConnected = false;

    if (localStream) {
      localStream.close();
    }

    if (additionalStream.length > 0) {
      for (var i = 0; i < additionalStream.length; i++) {
        additionalStream[i].close();
      }
    }

    additionalStream = [];
    localStream = null;

    store.dispatch(CloseConf());
    store.dispatch(RemoteMute(false));

    if (restartFlag) {
      restartFlag = false;
      location.reload();
      // browserHistory.push("/conf/" + roomkeyend);
    } else {
      if (roomkeyend != '') {
        browserHistory.push("/conf/feedback/" + roomkeyend);
      }
    }
  }

  endConference(rid, restartConference = false) {
    if (conference) {
      if (restartConference) {
        location.reload();
        return;
        // restartFlag = true;
      }
      clearInterval(soundIntervalID);
      if (store.getState().workDashboard.shareRequestId == store.getState().workDashboard.uid && _presenterID != '') {
        let obj = {
          command: 'UPDATE-SHARE-ENABLE',
          content: { status: false, id: '' },
          type: 'OBJECT'
        };
        this.sendMessage(obj, _presenterID);
        let clearIdObj = {
          command: 'CLEAR-SHARE-UID',
          content: {},
          type: 'OBJECT'
        };
        this.sendMessage(clearIdObj, 0);
      }
      if (store.getState().conference.imHost == true && store.getState().workDashboard.sync == true) {
        let sethostobj = {
          command: 'SET-HOST',
          content: { data: { status: false, hostId: '' } },
          type: 'OBJECT'
        };
        this.sendMessage(sethostobj, 0);

        // when host is exiting revoking speaker access and unmuting muted streams
        if (store.getState().conference.imHost) {
          var self = this
          this.offSpeaker()
          var mutedStreams = _.filter(allStreams, function(o) { return o.mute; })
          _.each(mutedStreams, function (stream) {
            self.sendMute(stream.from);
          });
        }
        /*let presenterobj = {
            command : 'PRESENTER-OFF',
            content : { presenter: '' },
            type : 'OBJECT'
          };
        this.sendMessage( presenterobj, 0);*/
        let objEntity = {
          current: store.getState().workDashboard.current, topicList: store.getState().workDashboard.topicList, topicContent: store.getState().workDashboard.topicContent, tid: store.getState().workDashboard.tid,
          conductQuestion: store.getState().workDashboard.conductQuestion, questionnaireId: store.getState().workDashboard.questionnaireId, questionnaireName: store.getState().workDashboard.questionnaireName,
          pdfView: store.getState().workDashboard.pdfView, fileId: store.getState().workDashboard.fileId,
          sync: store.getState().workDashboard.sync, ssPdfView: store.getState().workDashboard.ssPdfView, pdfFileName: store.getState().workDashboard.pdfFileName, whiteBoardData: store.getState().workDashboard.whiteBoardData,
          waitforview: store.getState().workDashboard.waitforview, topicContentDataDetails : store.getState().workDashboard.topicContentDataDetails,
          scormView: store.getState().workDashboard.scormView, scormFileName: store.getState().workDashboard.scormFileName
        }

        if (objEntity.current == "handraise") {
          objEntity['handraiseCount'] = 0;
          objEntity['handraiseupdates'] = false;
        } else if (objEntity.current == 'roomchat')
          objEntity['roomCount'] = 0;
        else if (objEntity.current == 'screenshare') {
          objEntity['ssNotification'] = false;
          objEntity['showButtons'] = true;
        }
        let obj = {
          command: 'SYNC-REQ',
          content: { data: objEntity },
          type: 'OBJECT'
        };
        // this.props.dispatch(setWorkDashboard({sync : !this.props.workDashboardData.sync}));
        this.sendMessage(obj, 0);
        let shareObj = {
          command: 'UPDATE-SHARE-ENABLE',
          content: { status: false, id: '' },
          type: 'OBJECT'
        };
        this.sendMessage(shareObj, 0);
        _host = false;
      } else if (store.getState().conference.imHost == true) {
        let sethostobj = {
          command: 'SET-HOST',
          content: { data: { status: false, hostId: '' } },
          type: 'OBJECT'
        };
        this.sendMessage(sethostobj, 0);
        let shareObj = {
          command: 'UPDATE-SHARE-ENABLE',
          content: { status: false, id: '' },
          type: 'OBJECT'
        };
        this.sendMessage(shareObj, 0);
        let objEntity = {
          current: store.getState().workDashboard.current
        };
        if (objEntity.current == 'screenshare') {
          objEntity['ssNotification'] = false;
          objEntity['showButtons'] = true;
        }
        
        let obj = {
          command: 'SYNC-REQ',
          content: { data: objEntity },
          type: 'OBJECT'
        };
        // this.props.dispatch(setWorkDashboard({sync : !this.props.workDashboardData.sync}));
        this.sendMessage(obj, 0);
        /*let presenterobj = {
            command : 'PRESENTER-OFF',
            content : { presenter: '' },
            type : 'OBJECT'
          };
        this.sendMessage( presenterobj, 0);*/
        _host = false;
      }
      /*let logObj = {
        logType : 'Conference',
        actionType : 'End Call',
        hostId : hostId,
        scheduleId : scheduleId,
      }
      if(rid) {
        roomkeyend = rid;
        logObj['roomKey'] = roomkeyend
      } else {
        logObj['roomKey'] = roomKey
      }*/

      if (_presenterID != '') {
        _presenterID = '';
      }
      if (rid) {
        roomkeyend = rid;
      }

      // console.log("conf status", conference);
      if (confConnected) {
        conference.leave();
      } else {
        // console.log("inside else")
        this.closeConference();
      }
      // store.dispatch(createLogRequest(logObj))
    }
  }

  requestScreenShareAccess(obj) {
    if (_presenterID != '') {
      this.sendMessage(obj, _presenterID);
    } else {
      alertify.alert("Host Unavailable", "Host not yet joined, please request again after host joined.");
      store.dispatch(setWorkDashboard({ shareRequestId: "" }));
    }
  }

  setStreamEvents() {
    var that = this;

    conference.on('server-disconnected', function (event) {
      console.log("server-disconnected event")
      that.closeConference();
    });
    //Add Stream
    conference.on('stream-added', function (event) {
      console.log("Stream Added", event);
      var stream = event.stream;

      var fromMe = false;
      var iStreamCount = 0;

      for (var i in conference.localStreams) {
        if (conference.localStreams.hasOwnProperty(i)) {
          console.log('localstreams', i, conference.localStreams[i].id());
          if (conference.localStreams[i].id() === stream.id()) {
            window.localRemote = stream;
            fromMe = true;
            if (iStreamCount == 0) {
              localStream.sid = stream.id();
              allStreams[0].sid = localStream.sid;
              console.log('Local Stream test', localStream)
            } else {
              if (additionalStream.length > 0) {
                for (var j = 0; j < additionalStream.length; j++) {
                  if (additionalStream[j].id() == stream.id()) {
                    additionalStream[j].sid = stream.id();
                    var defIndex = _.findIndex(allStreams, ['additionalIindex', j]);
                    if (defIndex > 0) {
                      allStreams[defIndex].sid = stream.id();
                    }
                    break;
                  }
                }
                // var iaindex = iStreamCount-1;
                // additionalStream[iaindex].sid = stream.id();
                // var defIndex = _.findIndex(allStreams, ['additionalIindex', iaindex]);
                // if(defIndex > 0){
                //   allStreams[defIndex].sid = stream.id();
                // }
              }
              console.log('Additional Stream', additionalStream);
            }
            // break;
          }
        }
        iStreamCount++;
      }

      if (fromMe) {
        stream.on('AudioDisabled', function () {
          console.log('Audio Disabled!');
        });
        L.Logger.info('stream', stream.id(),
          'is from me; will not be subscribed.', iStreamCount);
        if (iStreamCount == 0) {
          // localStream.sid = stream.id();
          // allStreams[0].sid = localStream.sid;
        } else {
          // if(additionalStream.length > 0){
          //   var iaindex = iStreamCount-1;
          //   additionalStream[iaindex].sid = stream.id();
          //   var defIndex = _.findIndex(allStreams, ['additionalIindex', iaindex]);
          //   if(defIndex > 0){
          //     allStreams[defIndex].sid = stream.id();
          //   }
          // }
        }
        store.dispatch(addStream(allStreams));
        return;
      }

      var confUsers = store.getState().conference.confData.users;
      //Find in users table
      var uIndex = _.findIndex(attendees, ['id', stream.from]);
      console.log('ATT', attendees, uIndex, confUsers, stream);
      if (uIndex >= 0) {
        var userIndex = _.findIndex(confUsers, ['_id', attendees[uIndex].name]);
        console.log('ATT1', confUsers, userIndex);
        if (userIndex >= 0) {
          stream.role = confUsers[userIndex].role;
          stream.fname = confUsers[userIndex].firstname + ' ' + confUsers[userIndex].lastname;
        }
      }

      if (stream.from == _presenter) {
        stream.presenter = true;
        _presenterID = stream.from;
      }

      // if(_role != Roles.Admin){
      //   store.dispatch(setConfFeedback({message: "Presenter is Not Available.", status: 0}));
      // }

      if (stream.isScreen()) {
        screenStream = stream;
        store.dispatch(addScreen(screenStream));
        console.log('screen added');
      } else {
        // var defIndex = _.findIndex(allStreams, ['from', stream.from]);
        var defIndex = _.findIndex(allStreams, ['sid', stream.sid]);

        //While Early join, if any late request come to store, it needs to be ignored.
        if (defIndex < 0) {
          stream.sid = stream.id();
          allStreams.push(stream);
        } else if (stream.id() == allStreams[defIndex].sid) {
          allStreams[defIndex] = stream;
        } else { //Mostly additional stream.
          stream.sid = stream.id();
          allStreams.push(stream);
        }
        store.dispatch(addStream(allStreams));
      }
    }); //End Add Stream

    //Remove Stream
    conference.on('stream-removed', function (event) {
      var stream = event.stream;
      L.Logger.info('stream removed: ', stream);
      var isRecording = store.getState().conference.isRecording
      console.log('isRecording', isRecording)
      if (isRecording)
        stopRecord();

      if (stream.isScreen()) {
        screenStream = null;
        store.dispatch(addScreen(screenStream));
        store.dispatch(setWorkDashboard({ ssNotification: false, showButtons: true, selfShare: false, screenplay: true }));
        subscribedScreen = null;
        return;
      }

      if (setRemoveVideoCallback) {
        setRemoveVideoCallback(stream);
      }

      var defIndex = _.findIndex(allStreams, ['sid', stream.id()]);

      if (defIndex > -1) {
        var removedStream = [];
        if (defIndex != 0) {
          removedStream = _.pullAt(allStreams, [defIndex]);
        }
        console.log("removedStream[0] ==== ", removedStream[0]);
        if (removedStream[0].presenter) {
          console.log("SET Dispalth")
          _presenter = '';
          _presenterID = '';

          if (_role == Roles.Student) {
            store.dispatch(setConfFeedback({ message: "Host is yet to join. Please wait!", status: 0 }));
          }
          store.dispatch(SetPresenter(''));
        }
        if (removedStream[0].speaker) {
          console.log("SET Dispalth")
          _speaker = '';
          store.dispatch(SetSpeaker(''));
        }
        // console.log("REmoved Stream", removedStream, removedStream.presenter, removedStream.speaker);
        store.dispatch(addStream(allStreams));
      }

      var defIndex1 = _.findIndex(subScribedStreams, ['from', stream.from]);
      if (defIndex1 >= 0) {
        var removedStream = _.pullAt(subScribedStreams, [defIndex1]);
        store.dispatch(setStreamStats(subScribedStreams));
      }

      let iPresenter = _.findIndex(allStreams, ['presenter', true]);
      let iSpeaker = _.findIndex(allStreams, ['speaker', true]);
      var confStatus = store.getState().conference.confStatus

      /*if(iPresenter < 0 && iSpeaker < 0 && allStreams.length > 0 && allStreams[0] == null){
        if(confStatus == 1 || allStreams.length == 1)
          store.dispatch(setConfFeedback({message: "No one is Presenting...", status: 0}));
      }*/

      var id = stream.elementId !== undefined ? stream.elementId : 'subvid' + stream.id();

      // if (id !== undefined) {
      //   // totalStreams -= 1;

      //   var element = document.getElementById(id);
      //   if (element) {
      //     let scroll_hook = 'scrlvid' + stream.id();
      //     if(document.getElementById(scroll_hook)){
      //       element.parentElement.remove()
      //     }else{
      //       element.remove();
      //     }
      //   }
      // }
    });//End Remove Stream

    conference.on('user-joined', function (event) {
      L.Logger.info('user joined:', event.user);

      if (_host) {
        if (store.getState().conference.speaker != '') {
          let speakerobj = {
            command: 'SPEAKER-ON',
            content: { speaker: store.getState().conference.speaker, streamId: store.getState().conference.speaker },
            type: 'OBJECT'
          };
          that.sendMessage(speakerobj, event.user.id);
        }

        let hostSetObj = {
          command: 'SET-HOST',
          content: { data: { status: true, hostId: store.getState().login.data._id } },
          type: 'OBJECT'
        };
        that.sendMessage(hostSetObj, event.user.id);

        if (store.getState().conference.presenter != '') {
          let presenterobj = {
            command: 'PRESENTER',
            content: { presenter: store.getState().conference.presenter },
            type: 'OBJECT'
          };
          that.sendMessage(presenterobj, event.user.id);
        }

        if (store.getState().workDashboard.waitforview == true) {
          let syncobj = {
            command: 'CHANGE-WAIT-FLAG',
            content: { status: true },
            type: 'OBJECT'
          };
          // this.props.dispatch(setWorkDashboard({sync : !this.props.workDashboardData.sync}));
          that.sendMessage(syncobj, event.user.id);
        }

        ///
        if (store.getState().workDashboard.sync) {
          let current = store.getState().workDashboard.current;
          let objEntity = {
            current: store.getState().workDashboard.current, topicList: store.getState().workDashboard.topicList, topicContent: store.getState().workDashboard.topicContent, tid: store.getState().workDashboard.tid,
            conductQuestion: store.getState().workDashboard.conductQuestion, questionnaireId: store.getState().workDashboard.questionnaireId, questionnaireName: store.getState().workDashboard.questionnaireName,
            pdfView: store.getState().workDashboard.pdfView, fileId: store.getState().workDashboard.fileId,
            sync: store.getState().workDashboard.sync, ssPdfView: store.getState().workDashboard.ssPdfView, pdfFileName: store.getState().workDashboard.pdfFileName, whiteBoardData: store.getState().workDashboard.whiteBoardData,
            waitforview: store.getState().workDashboard.waitforview, topicContentDataDetails : store.getState().workDashboard.topicContentDataDetails,
            scormView: store.getState().workDashboard.scormView, scormFileName: store.getState().workDashboard.scormFileName
          }
          if (current == "handraise") {
            objEntity['handraiseCount'] = 0;
            objEntity['handraiseupdates'] = false;
          } else if (current == 'roomchat')
            objEntity['roomCount'] = 0;
          else if (current == 'screenshare') {
            objEntity['ssNotification'] = false;
            objEntity['showButtons'] = store.getState().workDashboard.showButtons;
          }

          let syncobj = {
            command: 'SYNC-REQ',
            content: { data: objEntity },
            type: 'OBJECT'
          };
          // this.props.dispatch(setWorkDashboard({sync : !this.props.workDashboardData.sync}));
          that.sendMessage(syncobj, event.user.id);
          let objConfStatus = {
            command: 'SYNC-CONF-STATUS',
            content: { data: { status: store.getState().conference.confStatus }, from: "Layout" },
            type: 'OBJECT'
          };
          that.sendMessage(objConfStatus, event.user.id);
        }
        if (store.getState().workDashboard.ssPdfView == true) {
          let ssObjEntity = { ssPdfView: store.getState().workDashboard.ssPdfView, pdfFileName: store.getState().workDashboard.pdfFileName };
          let ssObj = {
            command: 'SYNC-SS-PDF-REQ',
            content: { data: ssObjEntity },
            type: 'OBJECT'
          };
          that.sendMessage(ssObj, event.user.id);
        }

      }

      if (localStream) {
        if (_uid) {
          if (event.user.name == _uid) {
            localStream.from = event.user.id;
          }
        }
      }
      attendees.push(event.user);
      store.dispatch(addUser(attendees));
      store.dispatch(getAttendees(roomKey));
    });

    conference.on('user-left', function (event) {
      L.Logger.info('user left:', event.user);
      var defIndex = _.findIndex(attendees, ['name', event.user.name]);
      var removedAttendee = _.pullAt(attendees, [defIndex]);
      if (event.user.name == store.getState().conference.hostId && store.getState().workDashboard.shareRequestId == store.getState().workDashboard.uid) {
        if (store.getState().workDashboard.sync == true) {
          store.dispatch(setWorkDashboard({ sync: false }));
        }
        store.dispatch(setImHost({ status: false, hostId: '' }));
        store.dispatch(setWorkDashboard({ waitforview: false, shareRequestId: '' }));
      } else if (event.user.name == store.getState().conference.hostId) {
        if (store.getState().workDashboard.sync == true) {
          store.dispatch(setWorkDashboard({ sync: false }));
        }
        store.dispatch(setImHost({ status: false, hostId: '' }));
        store.dispatch(setWorkDashboard({ waitforview: false }));
      }
      if (event.user.name == store.getState().workDashboard.shareRequestId) {
        store.dispatch(setWorkDashboard({ shareRequestId: '', waitforview: false }));
      }
      store.dispatch(addUser(attendees));
      store.dispatch(getAttendees(roomKey));
    });

    conference.on('message-received', function (event) {
      L.Logger.info("CONF: Message Received", event);
      let eventData = JSON.parse(event.msg.data);
      let command = eventData.command;
      let sender = event.msg.from;
      switch (command) {
        case "SPEAKER-REQ":
          if (SetSpeakerListenerCallback != null)
            SetSpeakerListenerCallback(eventData.content.streamId, sender);
          break;
        case "HAND-RAISE":
          if (HandraiseListenerCallback != null)
            HandraiseListenerCallback(eventData.content.data);
          if (HandraiseNotificationCallback != null)
            HandraiseNotificationCallback(eventData.content.data);
          break;
        case "HAND-RAISE-ANSWER": {
          let callback = HandraiseAnsListenerCallback[eventData.content.id];
          if (callback)
            callback(eventData.content.data);
          if (HandraiseAnsNotificationCallback != null)
            HandraiseAnsNotificationCallback(eventData.content.data);
        }
          break;
        case "HAND-RAISE-REPLY": {
          let callback = HandraiseReplyListenerCallback[eventData.content.id];
          if (callback)
            callback(eventData.content.data);
          if (HandraiseAnsNotificationCallback != null)
            HandraiseAnsNotificationCallback(eventData.content.data);
        }
          break;
        case "HAND-RAISE-EDIT": {
          let callback = EditHandraiseCallback[eventData.content.id];
          if (callback)
            callback(eventData.content.data);
        }
          break;
        case "SYNC-REQ":
          if (SyncListenerCallback != null) {
            SyncListenerCallback(eventData.content.data);
            if (store.getState().workDashboard.sync == true && store.getState().conference.imHost == true) {
              let obj = {
                command: 'SYNC-CONF-STATUS',
                content: { data: { status: store.getState().conference.confStatus }, from: "Layout" },
                type: 'OBJECT'
              };
              that.sendMessage(obj, 0);
            }
          }
          break;
        case "SET-HOST":
          if (eventData.content.data.status) {
            if (eventData.content.data.hostId == store.getState().login.data._id) {
              store.dispatch(setImHost(eventData.content.data));
            } else {
              eventData.content.data['status'] = false;
              store.dispatch(setImHost(eventData.content.data));
            }
          } else {
            store.dispatch(setImHost({ status: false, hostId: '' }));
          }
          break;
        /*case "TOPIC-LIST-SYNC" :
            if(TopicListListenerCallback != null)
              TopicListListenerCallback(eventData.content.data);
          break;
        case "TOPIC-SYNC-REQ" :{
            if(FullTopicListenerCallback != null)
              FullTopicListenerCallback(eventData.content.data);
          }
          break;
        case "TOPIC-QUESTION-SYNC" :
            if(TopicQuestionListenerCallback != null)
              TopicQuestionListenerCallback(eventData.content.data);
          break;*/
        case "TOPIC-SYNC-REQ": {
          if (TopicListenerCallback != null)
            TopicListenerCallback(eventData.content.data);
          break;
        }
        case "TOPIC-CONT-SEL-SYNC":
          if (TopicContentSelectListenerCallback != null)
            TopicContentSelectListenerCallback(eventData.content.data);
          break;
        case "ASSIGNMENT-SYNC-REQ": {
          if (AssignmentListenerCallback != null)
            AssignmentListenerCallback(eventData.content.data);
          break;
        }
        case "ASSIGNMENT-CONT-SEL-SYNC":
          if (AssignmentContentSelectListenerCallback != null)
            AssignmentContentSelectListenerCallback(eventData.content.data);
          break;
        case "POLL-SYNC-REQ": {
          if (PollListenerCallback != null)
            PollListenerCallback(eventData.content.data);
          break;
        }
        case "POLL-CONT-SEL-SYNC":
          if (PollContentSelectListenerCallback != null)
            PollContentSelectListenerCallback(eventData.content.data);
          break;
        case "SCROLL-SYNC-REQ":
          if (SyncScrollListenerCallback != null)
            SyncScrollListenerCallback(eventData.content.data);
          break;
        case "SYNC-SS-PDF-REQ":
          if (SyncSSPdfListenerCallback != null)
            SyncSSPdfListenerCallback(eventData.content.data);
          break;
        case "SYNC-PDF-PAGE":
          if (SyncPdfPageListenerCallback != null)
            SyncPdfPageListenerCallback(eventData.content.data);
          break;
        case "SYNC-PDF-CLOSE":
          if (SyncPdfCloseListenerCallback != null)
            SyncPdfCloseListenerCallback(eventData.content.data);
          break;
        case "WB-SYNC":
          let currentURL = window.location.pathname.split('/')
          if (store.getState().conference.confStatus != 1 || currentURL[1] != 'conf') {
            store.dispatch(setWorkDashboard({ whiteBoardData: eventData.content.wbContent }));
          } else {
            if (WhiteBoardListenerCallBack != null)
              WhiteBoardListenerCallBack(eventData.content.wbContent);
          }
          break;
        case "SYNC-CONF-STATUS":
          if (eventData.content.data.from == "Dashboard" && SyncDashConfStatusListenerCallback != null) {
            SyncDashConfStatusListenerCallback(eventData.content.data);
          } else if (SyncConfStatusListenerCallback != null) {
            SyncConfStatusListenerCallback(eventData.content.data);
          }
          break;
        case "CHAT-CHANGE-REQ":
          if (handleRoomChatListenerCallback != null) {
            handleRoomChatListenerCallback(eventData.content);
          }
          break;
        case "ROOM-CHAT":
          if (RoomChatListenerCallBack != null)
            RoomChatListenerCallBack(eventData.content.chatData);
          if (RoomNotificationCallback != null)
            RoomNotificationCallback(eventData.content.chatData);
          break;
        case "SS-NOTIFICATION":
          if (ScreenShareNotificationCallBack != null)
            ScreenShareNotificationCallBack(eventData.content);
          break;
        case "UN-REQ-VIDEO":
          that.publishCamera();
          isFeedBackDsipacth = false
          alertify.alert('Video Removed!', 'Video has been removed by Host.', function () { });
          break;
        case "REQ-VIDEO":
          alertify.confirm('Video Request', 'Host is requesting for Video, do you want to publish?'
            , function (result) {
              if (result) {
                //TODO - Activate video
                that.publishCamera();
              }
            }
            , function () { //Req rejected
              let obj = {
                command: 'RES-VIDEO-REQ',
                content: { attendeesData: {} },
                type: 'OBJECT'
              };
              that.sendMessage(obj, event.msg.from);
            }).set('labels', { ok: 'Allow', cancel: 'Deny' });
          break;
        case "RES-VIDEO-REQ":
          alertify.alert('Request Rejected', 'Attendee rejected the video request.', function () { });

          //Refresh by dispatch stream.
          store.dispatch(addStream(allStreams));
          break;
        case "REQ-SHARE":
          if (store.getState().workDashboard.shareRequestId != '') {
            let obj = {
              command: 'HAVE-SHARE-REQ',
              content: {},
              type: 'OBJECT'
            };
            that.sendMessage(obj, event.msg.from);
          } else {
            store.dispatch(setWorkDashboard({ shareRequestId: eventData.content.id }));
            let message = '<b>' + eventData.content.firstname + '</b> is requesting for document (or) screen share';
            alertify.confirm('Share Request', message
              , function (result) {
                if (result) {
                  let obj = {
                    command: 'ALLOW-SHARE-REQ',
                    content: { id: eventData.content.id },
                    type: 'OBJECT'
                  };
                  store.dispatch(setScreenEnable({ id: event.msg.from, status: true }));
                  that.sendMessage(obj, event.msg.from);
                }
              }
              , function () { //Req rejected
                let obj = {
                  command: 'REJECT-SHARE-REQ',
                  content: {},
                  type: 'OBJECT'
                };
                store.dispatch(setWorkDashboard({ shareRequestId: '' }));
                that.sendMessage(obj, event.msg.from);
              }).set('labels', { ok: 'Allow', cancel: 'Deny' });
          }
          break;
        case "ALLOW-SHARE-REQ":
          store.dispatch(setWorkDashboard({ shareRequestId: eventData.content.id }));
          break;
        case "REJECT-SHARE-REQ":
          alertify.alert('Request Rejected', 'Rejected the document (or) screen share request.', function () { });

          //Refresh by dispatch share request.
          store.dispatch(setWorkDashboard({ shareRequestId: "" }));
          break;
        case "HAVE-SHARE-REQ":
          alertify.alert('Warning', 'Some other already requested for sharing, Please try again later.', function () { });
          store.dispatch(setWorkDashboard({ ssNotification: false, shareRequestId: "" }));
          break;
        case "REMOVE-SS-REQ":
          store.dispatch(setWorkDashboard(eventData.content.data));
          break;
        case "CHANGE-WAIT-FLAG":
          store.dispatch(setWorkDashboard({ waitforview: eventData.content.status }));
          break;
        case "UN-REQ-SHARE":
          if (store.getState().workDashboard.shareRequestId != "") {
            if (screenStream) {
              screenStream.close();
            }
            alertify.alert('Access denied', 'Screen share access denied.', function () { });
            store.dispatch(setWorkDashboard({ ssNotification: false, shareRequestId: "", filestatus: false, fileData: null }));
            let obj = {
              command: 'UPDATE-SHARE-ENABLE',
              content: { status: false, id: '' },
              type: 'OBJECT'
            };
            that.sendMessage(obj, event.msg.from);

            if (store.getState().workDashboard.ssPdfView && store.getState().workDashboard.ssUploadedby == store.getState().workDashboard.uid) {
              closeSharedDocument(store.getState().workDashboard.fileName);
              let obj = {
                command: 'SYNC-PDF-CLOSE',
                content: { data: { waitforview: false, showButtons: true, ssNotification: false, ssPdfView: false, pdfFileName: '', fileName: '', ssUploadedby: '' } },
                type: 'OBJECT'
              };
              that.sendMessage(obj, 0);
            } else if (store.getState().workDashboard.waitforview == true) {
              let obj = {
                command: 'CHANGE-WAIT-FLAG',
                content: { status: false },
                type: 'OBJECT'
              };
              that.sendMessage(obj, 0);
            }
          } else if (!store.getState().workDashboard.shareRequestId || store.getState().workDashboard.shareRequestId == "") {
            alertify.alert('Screen Share Access', 'Now you can share the screen.', function () { });
            store.dispatch(setWorkDashboard({ shareRequestId: eventData.content.id }));
            let obj = {
              command: 'UPDATE-SHARE-ENABLE',
              content: { status: true, id: eventData.content.id },
              type: 'OBJECT'
            };
            that.sendMessage(obj, event.msg.from);
          }
          break;
        case "GET-UPDATE-SHARE":
          store.dispatch(setScreenEnable({ id: event.msg.from, status: eventData.content.status }));
          break;
        case "UPDATE-SHARE-ENABLE":
          store.dispatch(setScreenEnable({ id: event.msg.from, status: eventData.content.status }));
          store.dispatch(setWorkDashboard({ shareRequestId: eventData.content.id }));
          break;
        case "CLEAR-SHARE-UID":
          store.dispatch(setWorkDashboard({ ssUploadedby: '' }));
          break;
        case "SPEAKER-ON":
          // var defIndex = _.findIndex(allStreams, ['from', eventData.content.speaker]);
          var defIndex = _.findIndex(allStreams, ['sid', eventData.content.streamId]);
          if (defIndex >= 0) {
            _.forEach(allStreams, function (stream) {
              if (stream) {
                stream.speaker = false;
              }
            });
            allStreams[defIndex].speaker = true;
          }
          _speaker = eventData.content.streamId;
          store.dispatch(SetSpeaker(eventData.content.streamId));

          // _speaker = eventData.content.speaker;
          // store.dispatch(SetSpeaker(eventData.content.speaker));
          console.log("Status Received SPK", event.msg.from, event.msg);
          break;
        case "SPEAKER-OFF":
          _.forEach(allStreams, function (stream) {
            if (stream) {
              stream.speaker = false;
            }
          });

          let iPresenter = _.findIndex(allStreams, ['presenter', true]);

          var userRole = store.getState().login.data.role
          var hostID = store.getState().conference.hostId
          var confStatus = store.getState().conference.confStatus

          /*if(iPresenter < 0 && hostID != store.getState().login.data._id && userRole != Roles.Admin && confStatus == 1 && allStreams.length > 0 && allStreams[0]== null){
            store.dispatch(setConfFeedback({message: "Presenter is Not Available.", status: 0}));
          }*/

          _speaker = '';
          store.dispatch(SetSpeaker(''));
          break;
        case "SOUND_METER":
          if (_enableVad) {
            let sid = eventData.content.sid;
            let uid = '';
            let soundValue = eventData.content.slowValue;
            console.log("Sound Val", sid, soundValue);
            if (soundValue >= 0.07) {
              that.setSpeakerOn(uid, sid);
            }
          }
          break;
        case "SELF_MUTE":
          // that._MuteOrUnMute(localStream);
          if (!localStream.hostedByMute)
            localStream.hostedByMute = true
          else
            localStream.hostedByMute = false

          store.dispatch(RemoteMute(that._MuteOrUnMute(localStream, localStream.hostedByMute)));
          // if(localStreams.disableAudio()){
          //   localStreams.enableAudio();
          // }
          break;
        case "PRESENTER":

          var defIndex = _.findIndex(allStreams, ['sid', eventData.content.presenter]);
          console.log("DEF INDEX PRESENTER", defIndex);
          if (defIndex >= 0) {
            _.forEach(allStreams, function (stream) {
              if (stream) {
                stream.presenter = false;
              }
            });

            _presenterID = event.msg.from;

            allStreams[defIndex].presenter = true;

            if (allStreams[defIndex].speaker)
              allStreams[defIndex].speaker = false;
          }
          _presenter = eventData.content.presenter;
          store.dispatch(setConfFeedback({ message: "", status: -1 }));
          store.dispatch(SetPresenter(eventData.content.presenter));
          // store.dispatch(addStream(allStreams));
          console.log("Status Received", event.msg.from, event.msg);
          break;
        case "PRESENTER-OFF":
          _.forEach(allStreams, function (stream) {
            if (stream) {
              stream.presenter = false;
            }
          });

          let iSpeaker = _.findIndex(allStreams, ['speaker', true]);
          var confStatus = store.getState().conference.confStatus

          _presenter = '';
          _presenterID = '';

          var userRole = store.getState().login.data.role
          var hostID = store.getState().conference.hostId

          if (userRole == Roles.Student) {
            store.dispatch(setConfFeedback({ message: "Host is yet to join. Please wait!", status: 0 }));
          }

          /*else if(iSpeaker < 0 && hostID != store.getState().login.data._id && userRole != Roles.Admin && confStatus == 1 && allStreams.length > 0 && allStreams[0]== null){
            store.dispatch(setConfFeedback({message: "Presenter is Not Available.", status: 0}));
          }*/

          // // muted by host and host is revoked
          // if(allStreams[0].mute){
          //   that._MuteOrUnMute (allStreams[0], false);
          // }

          store.dispatch(SetPresenter(''));
          break;
        case "YES-IM":
          var defIndex = _.findIndex(allStreams, ['from', event.msg.from]);
          if (defIndex >= 0) {
            allStreams[defIndex].role = eventData.content.role;
          }
          break;

        // FOR RELOAD
        case "RELOAD_TOPICS":
          if (eventData.content.tid != '') {
            if (eventData.content.tid == store.getState().workDashboard.tid) {
              if (store.getState().workDashboard.topicContent == true) {
                store.dispatch(setWorkDashboard({ topicList: true, topicContent: false, tid: '', topicContentDataDetails: null, topicFileData: null }));
              } else if (store.getState().workDashboard.pdfView == true) {
                store.dispatch(setWorkDashboard({ topicList: true, tid: '', topicContentDataDetails: null, pdfView: false, topicPdfFileData: null, topicFileData: null, fileId: '' }));
              } else if (store.getState().workDashboard.conductQuestion == true) {
                store.dispatch(setWorkDashboard({ topicList: true, tid: '', topicContentData: null, topicFileData: null, conductQuestion: false, questionnaireId: '', questionnaireName: '' }));
              }
            }
            store.dispatch(reloadTopicList());
          }
          break;
        case "RELOAD_TOPICS_CONTENT":
          if (eventData.content.tid != '') {
            if (eventData.content.tid == store.getState().workDashboard.tid) {
              if (store.getState().workDashboard.topicContent == true) {
                store.dispatch(reloadTopicContent());
              }
            }
          }
          break;
        case "RELOAD_UPLOAD_FILES":
          if (eventData.content.tid != '') {
            if (eventData.content.tid == store.getState().workDashboard.tid) {
              if (store.getState().workDashboard.topicContent == true) {
                store.dispatch(reloadUplodFiles());
              }
            }
          }
          break;
        case "RELOAD_TOPIC_QUESTIONNAIRES":
          if (eventData.content.tid != '') {
            if (eventData.content.tid == store.getState().workDashboard.tid) {
              if (store.getState().workDashboard.topicContent == true) {
                store.dispatch(reloadTopicQuestionnaires());
              }
            }
          }
          break;
        case "RELOAD_TOPIC_PDFVIEW":
          if (eventData.content.tid != '' && eventData.content.fileId && eventData.content.fileId != '') {
            if (eventData.content.tid == store.getState().workDashboard.tid && eventData.content.fileId == store.getState().workDashboard.fileId) {
              if (store.getState().workDashboard.pdfView == true) {
                store.dispatch(setWorkDashboard({ pdfView: false, topicContent: true, fileId: '', topicPdfFileData: null }));
              }
            }
            store.dispatch(reloadTopicPdfView());
          } else if (eventData.content.tid != '' && eventData.content.fileIds && eventData.content.fileIds != '') {
            if (eventData.content.tid == store.getState().workDashboard.tid && eventData.content.fileIds.includes(store.getState().workDashboard.fileId)) {
              if (store.getState().workDashboard.pdfView == true) {
                store.dispatch(setWorkDashboard({ pdfView: false, topicContent: true, fileId: '', topicPdfFileData: null }));
              }
            }
            store.dispatch(reloadTopicPdfView());
          }
          break;
        case "RELOAD_REMOVED_QUESTIONNAIRES":
          if (eventData.content.tid != '' && eventData.content.questionnaireId != '') {
            if (eventData.content.tid == store.getState().workDashboard.tid && eventData.content.questionnaireId == store.getState().workDashboard.questionnaireId) {
              if (store.getState().workDashboard.conductQuestion == true) {
                store.dispatch(setWorkDashboard({ conductQuestion: false, topicContent: true, questionnaireId: '', questionnaireName: '', questionsData: null, submittedData: null, answerData: null }));
              }
            }
            store.dispatch(reloadQuestionnaire());
            // store.dispatch(reloadTopicQuestionnaires());
          }
          break;
        case "RELOAD_CONDUCT_QUESTION":
          if (eventData.content.questionnaireId != '') {
            if (eventData.content.questionnaireId == store.getState().workDashboard.questionnaireId) {
              if (store.getState().workDashboard.conductQuestion == true) {
                store.dispatch(setWorkDashboard({ conductQuestion: false, topicContent: true, questionnaireId: '', questionnaireName: '', questionsData: null, submittedData: null, answerData: null }));
              }
            }
            store.dispatch(reloadConductQuestion());
          }
          break;
        case "RELOAD_POLLS_LIST":
          store.dispatch(reloadPollsList());
          break;
        default:
      }
    });
  }

  getConnectionStatus() {
    return confConnected;
  }

  successStats = function (stats) {
    console.log("Stats", stats)
    var statLength = stats.length;
    var reportType;
    var curReport;
    var s_id;

    for (var i = 0; i < statLength; i++) {
      var curStat = stats[i];

      reportType = curStat.type;
      curReport = curStat.stats;
      s_id = curStat.id;

      if (reportType == "ssrc_audio_send") {
        //This is bytes that has been sent for this audio stream after the peer connection is setup.
        var bytes_sent = curReport.bytes_sent;
        //This is RTP packets that has been sent over for this audio stream after the peer connection is setup.
        var packets_sent = curReport.packets_sent;
        //This is RTP packets that is lost for this audio stream after the peer connection is setup.
        var packets_lost = curReport.packets_lost;
        //Round trip time in ms measured by the stack when retrieving the statistics for this audio stream.
        var rtt_ms = curReport.rtt_ms;
        //Audio encoder used for this audio stream.
        var codec_name = curReport.codec_name;

        store.dispatch(StatsAudioSend({
          bytes_sent: bytes_sent, packets_sent: packets_sent,
          packets_lost: packets_lost, rtt_ms: rtt_ms,
          codec_name: codec_name
        }));
      }

      if (reportType == "ssrc_audio_recv") {
        //This is bytes that has been received for this audio stream after the peer connection is setup;
        var bytes_recv = curReport.bytes_rcvd;
        //This is RTP packets that has been received for this audio stream after the peer connection is setup.
        var packets_recv = curReport.packets_rcvd;
        //This is RTP packets that has been lost for this audio stream after the peer connection is setup.
        var packets_lost = curReport.packets_lost;
        //Current e2e delay in ms as estimated by the stack for this audio stream.
        var delay_estimated_ms = curReport.delay_estimated_ms;
        //audio decoder used for this audio stream;
        var codec_name = curReport.codec_name;

        store.dispatch(StatsAudioRecv({
          bytes_recv: bytes_recv, packets_recv: packets_recv,
          packets_lost: packets_lost, delay_estimated_ms: delay_estimated_ms,
          codec_name: codec_name
        }));
      }

      if (reportType == "ssrc_video_send") {
        //This is bytes that has been sent for this video stream after the peer connection is setup.
        var bytes_sent = curReport.bytes_sent;
        //This is RTP packets that has been sent over for this video stream after the peer connection is setup.
        var packets_sent = curReport.packets_sent;
        //This is RTP packets that is lost for this video stream after the peer connection is setup.
        var packets_lost = curReport.packets_lost;
        //round trip time in ms measured by the stack when retrieving the statistics for this video stream.
        var rtt_ms = curReport.rtt_ms;
        //video encoder used for this video stream.
        var codec_name = curReport.codec_name;
        //FIR packets received from the remote end for this video stream afte the peer connection is setup.
        var firs_rcvd = curReport.firs_rcvd;
        //NACK packets received from the remote end for this video stream after the peer connection is setup.
        var nacks_rcvd = curReport.nacks_rcvd;
        //PLI packets received from the remote end for this video stream after the peer connection is setup.
        var plis_rcvd = curReport.plis_rcvd;
        //current frame height that is sent to remote for this video stream. this is not neccessarily to be the capture frame height.
        var send_frame_height = curReport.send_frame_height;
        //current frame width that is sent to remote for this video stream; this is not neccessarily to be the capture frame width.
        var send_frame_width = curReport.send_frame_width;
        //current frame rate of the video stream sending to remote peer. This is not neccessarily to be the capture frame rate.
        var framerate_sent = curReport.framerate_sent;
        // If there is a resolution degrade on the sent video stream, for example, from VGA to CIF, this field shows the reason for
        // most recent resolution change.
        // if last_adapt_reason = 1,  the resolution change is because of high CPU usage;
        // if last_adapt_reason = 2, the resolution change is caused by current available bandwidth for sending the stream is too low.
        // If last_adpat_reason = 3, the resolution change is view renderer is at heavy load.
        // If last_adapt_reason = 99, there is no resolution degrade recently.
        var last_adapt_reason = curReport.adapt_reason;
        // how many resolution degradation has happend on this video stream since the peer connection is setup.
        var adapt_changes = curReport.adapt_reason;

        store.dispatch(StatsVideoSend({
          bytes_sent: bytes_sent, packets_sent: packets_sent,
          packets_lost: packets_lost, rtt_ms: rtt_ms, codec_name: codec_name,
          firs_rcvd: firs_rcvd, nacks_rcvd: nacks_rcvd, plis_rcvd: plis_rcvd,
          send_frame_height: send_frame_height, send_frame_width: send_frame_width,
          framerate_sent: framerate_sent, last_adapt_reason: last_adapt_reason,
          adapt_changes: adapt_changes
        }));
      }

      if (reportType == "ssrc_video_recv") {
        //This is bytes that has been received for this video stream after the peer connection is setup;
        var bytes_recv = curReport.bytes_rcvd;
        //This is RTP packets that has been received for this video stream after the peer connection is setup.
        var packets_recv = curReport.packets_rcvd;
        //This is RTP packets that has been lost for this video stream after the peer connection is setup.
        var packets_lost = curReport.packets_lost;
        //Current e2e delay in ms as estimated by the stack for this video stream.
        var current_delay_ms = curReport.current_delay_ms;
        //video decoder used for this video stream;
        var codec_name = curReport.codec_name;
        //FIR packets sent from local end for this video stream afte the peer connection is setup.
        var firs_sent = curReport.firs_sent;
        //NACK packets sent from local end for this video stream after the peer connection is setup.
        var nacks_rcvd = curReport.nacks_rcvd;
        //PLI packets sent from local end for this video stream after the peer connection is setup.
        var plis_rcvd = curReport.plis_rcvd;
        //current frame height that is received for this video stream.
        var frame_height = curReport.frame_height;
        //current frame width that is received for this video stream.
        var frame_width = curReport.frame_width;
        //current frame rate of the video stream received from remote peerr. This is not neccessarily to be the rendered frame rate.
        var framerate_rcvd = curReport.framerate_rcvd;
        //current rendered frame rate on this video stream.  This is usually smaller or equal to received frame rate.
        var framereate_output = curReport.framerate_output;

        store.dispatch(StatsVideoRecv({
          bytes_recv: bytes_recv, packets_recv: packets_recv,
          packets_lost: packets_lost, current_delay_ms: current_delay_ms,
          codec_name: codec_name, firs_sent: firs_sent, nacks_rcvd: nacks_rcvd,
          plis_rcvd: plis_rcvd, frame_height: frame_height,
          frame_width: frame_width, framerate_rcvd: framerate_rcvd,
          framereate_output: framereate_output
        }));
      }

      if (reportType == "VideoBWE") {
        //the estimated available send bandwidth on local peer, in kbps.
        var available_send_bandwidth = curReport.available_send_bandwidth;
        //the estimated avaiable receive bandwidth on local peer in kbps.
        var available_recv_bandwidth = curReport.available_receive_bandwidth;
        //the current total sending bitrate of the video channels, in kbps;
        var trasmit_bitrate = curReport.transmit_bitrate;
        //the current total re-trasmitting bitrate of the video channels, in kbps
        var retransmit_bitrate = curReport.retransmit_bitrate;

        store.dispatch(StatsVideoBWE({
          available_send_bandwidth: available_send_bandwidth,
          available_recv_bandwidth: available_recv_bandwidth,
          trasmit_bitrate: trasmit_bitrate,
          retransmit_bitrate: retransmit_bitrate,
        }));
      }

    }///Loop Ends here...

  }

  failedStats = function (err) {
    console.log("Err Stats", err);
  }

  getStreamReport(stream, callback) {
    conference.getConnectionStats(stream, this.successStats, this.failedStats);
  }

  hideLocalStream() {
    if (localStream) {
      localStream.hide();
    }

    this.hideRemoteStream();
  }

  hideRemoteStream() {
    if (allStreams) {
      allStreams.map(function (stream) {
        if (stream && stream.showing) {
          stream.hide();
        }
      });
    }
  }

  screenShare(successCallback, failureCallback) {
    screenStream = null;
    if (conference) {
      let self = this;
      // Woogeen.LocalStream.create({
      //           video: {device: 'screen', extensionId: screenShareKey},
      //           audio: true
      //         }, function(err, stream) {
      //         if (err) {
      //           /*return*/ L.Logger.error(
      //             'create Screen failed:', err);
      //             //callback(null);
      //             failureCallback(false);
      //         } else {
      //             screenStream = stream;
      //             successCallback(true);
      //             conference.publish(stream, function(st) {
      //               console.log("Republished screen the stream");
      //               let obj = {
      //                   command : 'SS-NOTIFICATION',
      //                   content : { },
      //                   type : 'OBJECT'
      //               };
      //               self.sendMessage( obj, 0);
      //               // conference.mix(screenStream, [], function(){
      //               //   console.log('Mix Stream on Screenshare');
      //               // }, function(err){
      //               //   console.log('mix screen error',err);
      //               // })
      //             });
      //         }
      //       }
      // );
      conference.shareScreen({ resolution: 'hd720p', extensionId: screenShareKey }, function (st) {
        L.Logger.info('screen shared:', st.id());
        screenStream = st;
        successCallback(true);
        let obj = {
          command: 'SS-NOTIFICATION',
          content: {},
          type: 'OBJECT'
        };
        self.sendMessage(obj, 0);
      }, function (err) {
        failureCallback(false);
        L.Logger.error('sharing failed:', err);
      }
      );
    }
  }

  pauseScreenShare() {
    // console.log("screenStream === ", screenStream);
    if (screenStream) {
      screenStream.disableVideo();
    }
  }

  playScreenShare() {
    // console.log("screenStream === ", screenStream);
    if (screenStream) {
      screenStream.enableVideo();
    }
  }

  stopScreenShare() {
    // console.log("screenStream === ", screenStream);
    if (screenStream) {
      screenStream.close();
    }
    screenStream = null;
    store.dispatch(addScreen(screenStream));
    store.dispatch(setWorkDashboard({ ssNotification: false, showButtons: true, selfShare: false, screenplay: true }));
    subscribedScreen = null;
  }

  recordConference() {
    conference.startRecorder({}, function (file) {
      RecorderId = file.recorderId;
      L.Logger.info('Stream recording with recorder ID: ', file.recorderId);
      store.dispatch(setRecordStream(true))
    }, function (err) {
      L.Logger.error('Media recorder failed:', err);
    }
    );
  }

  stopRecord() {
    conference.stopRecorder({ recorderId: RecorderId }, function (file) {
      L.Logger.info('Stream recorded with recorder ID: ', file.recorderId);
      store.dispatch(setRecordStream(false))
    }, function (err) {
      L.Logger.error('Media recorder cannot stop with failure: ', err);
    }
    );
  }

  setSpeakerOn(uid, sid) {
    _speaker = uid;
    let obj = {
      command: 'SPEAKER-ON',
      content: { speaker: uid, streamId: sid },
      type: 'OBJECT'
    };
    this.sendMessage(obj, 0);
  }
  //V1.1
  setPresenter(uid) {
    _presenter = uid;
    // store.dispatch(SetPresenter(uid));
    let obj = {
      command: 'PRESENTER',
      content: { presenter: uid },
      type: 'OBJECT'
    };
    this.sendMessage(obj, 0);
  }

  //V1.1
  offPresenter() {
    _presenter = '';
    let obj = {
      command: 'PRESENTER-OFF',
      content: { presenter: '' },
      type: 'OBJECT'
    };

    var self = this
    this.offSpeaker();

    var mutedStreams = _.filter(allStreams, function(o) { return o.mute; })
    _.each(mutedStreams, function (stream) {
      self.sendMute(stream.from);
      self._MuteOrUnMute(stream);
    });

    this.sendMessage(obj, 0);
  }

  offSpeaker() {
    _speaker = '';
    let obj = {
      command: 'SPEAKER-OFF',
      content: { presenter: '' },
      type: 'OBJECT'
    };
    this.sendMessage(obj, 0);
  }

  //V1.1
  getDevices(callback) {
    navigator.mediaDevices.enumerateDevices().then(res => { this.gotDevices(res, callback) }).catch(this.handleError);
  }

  //V1.1
  gotDevices(deviceInfos, callback) {
    // console.log(deviceInfos);
    callback(deviceInfos)
  }

  //V1.1
  handleError() {

  }

  //V1.1
  createCamera(callback) {

    // if(localStream){
    //   localStream.mediaStream.getTracks().forEach(function (track) {
    //     track.stop();
    //   });
    // }
    var _videoDevice = {
      device: 'camera',
      resolution: 'hd720p',
      frameRate: _frameRate
    };

    if (localStream) {
      conference.unpublish(localStream, function () {
        localStream.close();
        Woogeen.LocalStream.create({
          video: _videoDevice,
          audio: true
        }, function (err, stream) {
          if (err) {
                    /*return*/ L.Logger.error(
              'create LocalStream failed:', err);
            callback(null);
          } else {
            localStream = stream;
            window.localStream = localStream;

            callback(stream);

            conference.publish(localStream, { videoCodec: _codec, maxVideoBW: _maxVideoBW, maxAudioBW: _maxAudioBW }, function (st) {
              console.log("Republished the stream");
            });
          }
        }
        );
      })
    }
  }

  rePublishCamera() {
    console.log("REPUBLISH");
    store.dispatch(setConfFeedback({ message: "Applying Settings", status: 0 }));
    if (localStream) {
      localStream.mediaStream.getTracks().forEach(function (track) {
        track.stop();
      });

      // console.log("consoles--- ", _speaker, _selfID, localStream.sid)
      if (_speaker != '' && _speaker == localStream.sid) {
        console.log("Speaker set after re publish");
        _speaker = '';
        store.dispatch(SetSpeaker(''));
      }

      // if(_presenter != '' && _presenterID == localStream.sid){
      //   console.log("Presenter set after re publish");
      //   that.setPresenter(localStream.sid);
      // }

      var that = this;
      conference.unpublish(localStream, function (st) {
        localStream.close();
        allStreams[0] = null;
        localStream = null;
        that.publishCamera();
      }, function (err) {

      });
      // localStream.close();
      // allStreams[0] = null;
      // localStream = null;
      // this.publishCamera();
    }
  }

  publishCamera() {
    console.log("PUBLISH VIDEO");
    var _videoDevice = {
      device: 'camera',
      deviceId: _cameraSource,
      audioId: _audioSource,
      resolution: resolution
    };

    var that = this;
    if (localStream) {
      localStream.close();
      var element = document.getElementById(localStream.elementId);

      if (element) {
        element.remove();
      }

      //delete allStreams[0];
      allStreams[0] = null;

      localStream = null;

      if (setSelfVideoCallback)
        setSelfVideoCallback(null);

      this.onlyPresenter(false);
      store.dispatch(addStream(allStreams));
    } else {
      // console.log("Here we check", _audioDevice);
      Woogeen.LocalStream.create({
        video: _videoDevice,
        audio: true
      }, function (err, stream) {
        if (err) {
          store.dispatch(setConfFeedback({ message: "Failed to apply settings", status: 0 }));
                  /*return*/ L.Logger.error(
            'create LocalStream failed:', err);
        } else {
          console.log("re publish camera");
          localStream = stream;

          localStream.from = _selfID;
          // that.handleSoundMeter(localStream.mediaStream);

          allStreams[0] = localStream;

          if (setSelfVideoCallback) {
            setSelfVideoCallback(localStream);
          }

          conference.publish(localStream, { videoCodec: _codec, maxVideoBW: _maxVideoBW, maxAudioBW: _maxAudioBW }, function (st) {
            // console.log("Call Back", setSelfVideoCallback);
            console.log("Published Manually", st);
            store.dispatch(setConfFeedback({ message: "", status: -1 }));
            // localStream.sid  = st.id();
            localStream.sid = st.id();
            allStreams[0].sid = st.id();

            store.dispatch(addStream(allStreams));

            if (_presenter != '' && _presenterID == _selfID) {
              // _presenter = st.id();
              console.log("Presenter set after re publish");
              that.setPresenter(st.id());
            }

            if (setSelfSpeakerCallback) {
              setSelfSpeakerCallback();
            }

          }, function (err) {
            store.dispatch(setConfFeedback({ message: "Sorry! Not able to communicate to our servers, please contact administrator", status: 0 }));
            L.Logger.error('publish failed:', err);
          });

        }
      });
    }
  }

  removeAdditionalCamera(sid) {
    // if(camIndex >= 0){
    // additionalStream[camIndex].stop();
    var defIndex = _.findIndex(allStreams, ['sid', sid]);
    if (defIndex > 0) {
      var removedStream = _.pullAt(allStreams, [defIndex]);

      var defAIndex = _.findIndex(additionalStream, ['sid', sid]);
      if (defAIndex >= 0) {
        additionalStream[defAIndex].close();
        var removedAdditional = _.pullAt(additionalStream, [defAIndex]);
      }


      store.dispatch(addStream(allStreams));
    }
    /* var defIndex = _.findIndex(allStreams, ['from', stream.from]);

if(defIndex > -1){
  if(defIndex != 0){
    var removedStream  = _.pullAt(allStreams, [defIndex]);*/
    // }
  }

  createAdditionalCamera(_lcameraSource, _laudioSource) {
    //additionalStream
    var _videoDevice = {
      device: 'camera',
      deviceId: _lcameraSource,
      audioId: _laudioSource,
      resolution: resolution
    };

    Woogeen.LocalStream.create({
      video: _videoDevice,
      audio: false
    }, function (err, stream) {
      if (err) {
        L.Logger.error(
          'Additional Camera create failed:', err);
      } else {
        var iaLength = additionalStream.length;
        additionalStream[iaLength] = stream;
        additionalStream[iaLength].additional = true;
        additionalStream[iaLength].additionalIindex = iaLength;
        // stream.fname = allStreams[0].fname + '-' + (iaLength + 1)
        stream.fname = store.getState().login.data.firstname+store.getState().login.data.lastname+ '-' + (iaLength + 1)
        allStreams.push(stream);

        conference.publish(additionalStream[iaLength], { videoCodec: _codec, maxVideoBW: _maxVideoBW, maxAudioBW: _maxAudioBW }, function (st) {
          console.log("Published Additional Camera", st, st.id());
          store.dispatch(addStream(allStreams));
        });
      }
    });

  }

  joinConference(token, settings, callback) {
    store.dispatch(setConfFeedback({ message: "Trying to connect...", status: 0 }));

    var _publish = settings.publish;
    var _videoDevice = false;
    var _audio = settings.audio;
    _codec = settings.codec;
    _uid = settings.uid;
    resolution = settings.videoResolution;
    _role = settings.role;
    _users = settings.users;
    roomKey = settings.roomKey;
    hostId = settings.hostId;
    scheduleId = settings.scheduleId;
    var that = this;
    console.log("Resolution", resolution, isJoining);

    // switch(resolution){
    //   case 'sif':
    //     _maxVideoBW = 256;
    //     break;
    //   case 'vga':
    //     _maxVideoBW = 400;
    //     break;
    //   case 'hd720p':
    //     _maxVideoBW = 700;
    //     break;
    //   case 'hd1080p':
    //     _maxVideoBW = 1500;
    //     break;
    //   default:
    //     _maxVideoBW = 300;
    // }
    //deviceId: "502122a2e2f831e9a9d935109f04fd59a81d548efd13a395069f4bec30136222" ? {exact: "502122a2e2f831e9a9d935109f04fd59a81d548efd13a395069f4bec30136222"} : undefined/*_cameraSource*/
    //Need to check line no 557, 793 for device id implementation
    //701 has been traced at final stage. best place to adopt the api changes there.

    /*let logObj = {
      logType : 'Conference',
      actionType : 'Join Call',
      uid : _uid,
      codec : _codec,
      token : token,
      roomKey : roomKey,
      hostId : hostId,
      scheduleId : scheduleId,
    }
    store.dispatch(createLogRequest(logObj))*/

    if (settings.video) {
      _videoDevice = {
        device: 'camera',
        resolution: resolution,
        frameRate: _frameRate
      };
    }

    if (!confConnected && !isJoining) {
      conference.join(token, function (resp) {
        isJoining = true;
        store.dispatch(setConfFeedback({ message: "Trying to access your camera/microphone", status: 0 }));
        Woogeen.LocalStream.create({
          video: _videoDevice,
          audio: _audio
        },
          function (err, stream) {
            if (settings.audio && settings.video) {
              if (err) {
                                  /*return*/ L.Logger.error(
                  'create LocalStream failed:', err);
                // localStream = null;
                switch (err.code) {
                  case 1100:
                    // Need whole screen block
                    store.dispatch(setConfFeedback({ message: "Access media denied.", status: 2 }));
                    break;
                  case 1101:
                    store.dispatch(setConfFeedback({ message: "Access media denied!", status: 2 }));
                    break;
                  case 1102:
                    // Need whole screen block
                    //https://www.facebook.com/help/232232800134371
                    store.dispatch(setConfFeedback({ message: "No Camera or Microphone available", status: 2 }));
                    break;
                  case 1103:
                    store.dispatch(setConfFeedback({ message: "error in accessing screen share plugin", status: 3 }));
                    break;
                  case 1104:
                    store.dispatch(setConfFeedback({ message: "Microphone/Camera not detected", status: 2 }));
                    break;
                  case 1105:
                    store.dispatch(setConfFeedback({ message: "Media option not supported by the browser", status: 0 }));
                    break;
                  case 1106:
                    store.dispatch(setConfFeedback({ message: "Mendatory constraints not satisfied", status: 0 }));
                    break;
                  case 1107:
                    store.dispatch(setConfFeedback({ message: "User input media is invalid!", status: 0 }));
                    break;
                  default:
                    store.dispatch(setConfFeedback({ message: "Unknown error, please contact support.", status: 0 }));
                }
              } else {
                store.dispatch(setConfFeedback({ message: "Camera/Microphone seems to be working...", status: 0 }));
                localStream = stream;

                var mediaStreamTrack = localStream.mediaStream.getVideoTracks()[0];
                if (typeof mediaStreamTrack != "undefined") {
                  mediaStreamTrack.onended = function () {//for Chrome.
                    // Need whole screen block
                    setTimeout(function () {
                      if (isFeedBackDsipacth)
                        store.dispatch(setConfFeedback({ message: "Your camera is busy!", status: 4 }));
                    }, 10)

                  }
                }

                window.localStream = localStream;
              }
            } else {
              store.dispatch(setConfFeedback({ message: "Host is yet to join. Please wait!", status: 0 }));
            }

            confConnected = true;

            var users = resp.users;
            _selfID = resp.self.id;
            if (localStream) {
              localStream.from = _selfID;
              // that.handleSoundMeter(localStream.mediaStream);
            }

            if (users instanceof Array) {
              users.map(function (u) {
                L.Logger.info('user in conference:', u);

                attendees.push(u);
              });
              store.dispatch(addUser(attendees));
            }

            var streams = resp.streams;
            window.allStream = streams;
            console.log(resp.streams);

            if (streams instanceof Array) {
              streams.map(function (stream) {
                let streamid = (stream.from == "" && localStream) ? localStream.from : stream.from;
                stream.sid = stream.id();
                console.log('ATT-S', stream, streamid, stream.id());
                let uIndex = _.findIndex(attendees, ['id', streamid]);
                if (uIndex >= 0) {
                  let userIndex = _.findIndex(_users, ['_id', attendees[uIndex].name]);
                  if (userIndex >= 0) {
                    stream.role = _users[userIndex].role;
                    stream.fname = _users[userIndex].firstname + ' ' + _users[userIndex].lastname;
                  }

                  if (stream.sid == _presenter) {
                    stream.presenter = true;
                    _presenterID = stream.from;
                  }
                  if (stream.sid == _speaker) {
                    stream.speaker = true;
                  }
                }

                if (stream.isScreen()) {
                  screenStream = stream;
                  store.dispatch(addScreen(screenStream));
                } else {
                  allStreams.push(stream);
                }

                if (stream instanceof Woogeen.RemoteMixedStream) {
                  //console.log('Its a mix stream!!!');
                  _mixStream = stream;
                }
              });
            }

            // console.log("All Resp ", resp);
            // if(localStream){
            // localStream.from = _uid;
            // }
            if (localStream) {
              allStreams[0].from = localStream.from;
            }
            // }else{
            // allStreams[0] = {};
            // }

            store.dispatch(addStream(allStreams));

            if (_publish && localStream) {
              console.log('Current Codec', _codec);
              localStream.attr('role', 'raja');
              store.dispatch(setConfFeedback({ message: "Trying to publish your camera/microphone", status: -1 }));
              conference.publish(localStream, { videoCodec: _codec, maxVideoBW: _maxVideoBW, maxAudioBW: _maxAudioBW }, function (st) {
                L.Logger.info('stream published:', st, st.id());
                localStream.sid = st.id();
                store.dispatch(setConfFeedback({ message: "", status: 0 }));
                callback(true, resp.streams, localStream);
              }, function (err) {
                store.dispatch(setConfFeedback({ message: "Sorry! Not able to communicate to our servers, please contact administrator", status: 0 }));
                L.Logger.error('publish failed:', err);
              });
            }

          });
      });
    } else {
      // isJoining = false;

      let iSpeaker = _.findIndex(allStreams, ['speaker', true]);
      var userRole = store.getState().login.data.role
      var hostID = store.getState().conference.hostId

      var confStatus = store.getState().conference.confStatus

      console.log("Exisit Conf", localStream);
      if (!store.getState().conference.presenter && _role == Roles.Student) {
        store.dispatch(setConfFeedback({ message: "Host is yet to join. Please wait!", status: 0 }));
      }
      /*else if(!store.getState().conference.presenter && iSpeaker < 0 && hostID != store.getState().login.data._id && userRole != Roles.Admin && confStatus == 1 && allStreams.length > 0 && allStreams[0]== null){
        store.dispatch(setConfFeedback({message: "Presenter is Not Available.", status: 0}));
      }*/
      else
        store.dispatch(setConfFeedback({ message: "", status: -1 }));
      // store.dispatch(setConfFeedback({message: "You are not connected to the coneference!", status: 0}));
      callback(true, allStreams, localStream);
    }
  }

  setHostPassword(status) {
    _host = status;
    let obj = {
      command: 'SET-HOST',
      content: { data: { status: status, hostId: store.getState().login.data._id } },
      type: 'OBJECT'
    };
    this.sendMessage(obj, 0);
    let current = store.getState().workDashboard.current;
    if (status == true || (status == false && store.getState().workDashboard.sync == true)) {
      let objEntity = {
        current: store.getState().workDashboard.current, topicList: store.getState().workDashboard.topicList, topicContent: store.getState().workDashboard.topicContent, tid: store.getState().workDashboard.tid,
        conductQuestion: store.getState().workDashboard.conductQuestion, questionnaireId: store.getState().workDashboard.questionnaireId, questionnaireName: store.getState().workDashboard.questionnaireName,
        pdfView: store.getState().workDashboard.pdfView, fileId: store.getState().workDashboard.fileId, topicContentDataDetails : store.getState().workDashboard.topicContentDataDetails,
        sync: status, ssPdfView: store.getState().workDashboard.ssPdfView, pdfFileName: store.getState().workDashboard.pdfFileName, waitforview: store.getState().workDashboard.waitforview,
        scormView: store.getState().workDashboard.scormView, scormFileName: store.getState().workDashboard.scormFileName
      }            
      if (status == false && store.getState().workDashboard.sync == true) {
        objEntity['ssPdfView'] = false;
        objEntity['pdfFileName'] = '';
        objEntity['waitforview'] = false;
      }
      if (current == "handraise") {
        objEntity['handraiseCount'] = 0;
        objEntity['handraiseupdates'] = false;
      } else if (current == 'roomchat') {
        objEntity['roomCount'] = 0;
      } else if (current == 'screenshare') {
        objEntity['ssNotification'] = false;        
        objEntity['showButtons'] = status == false && store.getState().workDashboard.sync == true?true:store.getState().workDashboard.showButtons;          
      }
      let obj = {
        command: 'SYNC-REQ',
        content: { data: objEntity },
        type: 'OBJECT'
      };
      this.sendMessage(obj, 0);

      let attendees = store.getState().conference.attendees;
      let index = _.findIndex(attendees, function (o) { return o.screenEnable == true; });
      if (index > -1) {
        let id = attendees[index].id;
        let shareEntity = {
          shareRequestId: '', showButtons: true, selfShare: false
        };
        store.dispatch(setScreenEnable({ id: id, status: false }));
        store.dispatch(setWorkDashboard(shareEntity));
        let obj = {
          command: 'REMOVE-SS-REQ',
          content: { data: shareEntity },
          type: 'OBJECT'
        };
        this.sendMessage(obj, id);
      }
    } else if (status == false) {
      let objEntity = {
        current: store.getState().workDashboard.current, topicList: store.getState().workDashboard.topicList, topicContent: store.getState().workDashboard.topicContent, tid: store.getState().workDashboard.tid,
        conductQuestion: store.getState().workDashboard.conductQuestion, questionnaireId: store.getState().workDashboard.questionnaireId, questionnaireName: store.getState().workDashboard.questionnaireName,
        pdfView: store.getState().workDashboard.pdfView, fileId: store.getState().workDashboard.fileId, topicContentDataDetails : store.getState().workDashboard.topicContentDataDetails,
        sync: status, ssPdfView: false, pdfFileName: "", waitforview: store.getState().workDashboard.waitforview, showButtons : true,
        scormView: store.getState().workDashboard.scormView, scormFileName: store.getState().workDashboard.scormFileName
      }
      let obj = {
        command: 'SYNC-REQ',
        content: { data: objEntity },
        type: 'OBJECT'
      };
      this.sendMessage(obj, 0);

      let attendees = store.getState().conference.attendees;
      let index = _.findIndex(attendees, function (o) { return o.screenEnable == true; });
      if (index > -1) {
        let id = attendees[index].id;
        let objEntity = {
          shareRequestId: '', showButtons: true, selfShare: false 
        };
        store.dispatch(setScreenEnable({ id: id, status: false }));
        store.dispatch(setWorkDashboard(objEntity));
        let obj = {
          command: 'REMOVE-SS-REQ',
          content: { data: objEntity },
          type: 'OBJECT'
        };
        this.sendMessage(obj, id);
      }
    }
  }

  setHostFlag(hostIndex) {
    //First Reset flag if any
    allStreams.map(function (stream, index) {
      if (stream) {
        if (index == hostIndex) {
          allStreams[index].isHost = true;
        } else {
          allStreams[index].isHost = false;
        }
      }
    });
    // store.dispatch(addStream(allStreams));
  }
}


