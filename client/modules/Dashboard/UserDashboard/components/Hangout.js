import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { connect } from 'react-redux';
import Sources from './Sources';

import styles from '../../Dashboard.css';

import WoogeenManager from '../../../Communication/WoogeenManager';
// import ControlVideo from './ControlVideo';
import VideoInConf from './VideoInConf';
import HostControl from './HostControl';

import { browserHistory } from 'react-router';
import { ClearImage } from '../../../Login/LoginActions';
import Analytics from '../../../Communication/Analytics';
import AuthClient from '../../../../components/AuthController.js';
// import { clearGuestAccount } from '../../../Communication/ConferenceActions';

import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard } from './WorkDashboardActions';
import InviteBox from '../../components/InviteBox';
import lodash from 'lodash'

export class Hangout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      audioIn: [],
      audioOut: [],
      cameraDevices: [],
      showHost: false,
      newWidth: 0,
      selfVideo: false,
      showInviteBox : false,
      showNavBar : false,
      videoPosition:[],
      lastSpeakerIndex: -1,
      lastPresenterIndex: -1
    }
    this.videos = [];
    this.selfVideo = null;
    this.SyncSpeaker = this.SyncSpeaker.bind(this);
    this.props.confObject.SetSpeakerListener(this.SyncSpeaker);
    this.flipSettings     = this.flipSettings.bind(this);
    this.setPresenter = this.setPresenter.bind(this);

    this.setRemoveVideo   = this.setRemoveVideo.bind(this);

    this.props.confObject.setRemoveVideo(this.setRemoveVideo);
    // this.endCall = this.endCall.bind(this);

    this.HandleSyncSSPdf = this.HandleSyncSSPdf.bind(this);
    this.props.confObject.SyncSSPdfListener(this.HandleSyncSSPdf);

    this.HandleSyncPdfClose = this.HandleSyncPdfClose.bind(this);
    this.props.confObject.SyncPdfCloseListener(this.HandleSyncPdfClose);

    this.HandleSyncCurrent = this.HandleSyncCurrent.bind(this);
    this.props.confObject.SyncListener(this.HandleSyncCurrent);
  }

  setRemoveVideo(stream){
    console.log("Remove Video Hangout Req", stream);
    let stIndex = _.findIndex(this.videos, ['key', stream.id()]);
    if(stIndex >= 0 ){
      this.videos.splice(stIndex, 1);
      this.setState({videos: this.videos});
      this.state.videoPosition = new Array(this.videos.length).fill({index:-1, sid:""})
    }else if(stream == null){
      // this.videos.splice(stIndex, 0);
      // this.setState({videos: this.videos});
    }
    

    // this.setState({videoLength: this.videos.length});
  }

  componentDidMount() {
    if(this.props.token != '' && this.props.token != undefined){
        var that = this;
        this.props.confObject.getConference(this.props.iceServers, this.props.transport, function(res){
          that.joinConference();
        });
    }
    this.props.hideHeader(true, this.state.showNavBar);

    document.addEventListener("onwebkitfullscreenchange", function(state) { 
      console.log('Full Screen - Change', state);
    });
  }

  flipSettings(){

    if(!this.state.flip){

      var that = this;
      this.props.confObject.getDevices(function(deviceInfos){
        
        that.audioIn = [];
        that.audioOut = [];
        that.cameraDevices = [];

        for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            
            var deviceID = deviceInfo.deviceId;
            var deviceKind = deviceInfo.kind;
            var deviceText = '';

            if(deviceKind === 'audioinput'){
              deviceText = deviceInfo.label || 'Microphone';
              that.audioIn.push([deviceID, deviceText]);
            }else if(deviceKind === 'audiooutput'){
              deviceText = deviceInfo.label || 'Speaker';
              that.audioOut.push([deviceID, deviceText])
            }else if(deviceKind === 'videoinput'){
              deviceText = deviceInfo.label || 'Camera';
              that.cameraDevices.push([deviceID, deviceText]);
            }
        }        

        // console.log("DEV", that.cameraDevices);
        that.setState({audioIn: that.audioIn, audioOut: that.audioOut, cameraDevices: that.cameraDevices});
      });
    }

    this.setState({flip: !this.state.flip});
  }


  componentWillReceiveProps(nextProps) {
      console.log("Count ", nextProps.streams.length);
      var that = this;
      var resolutionBtns = [];
      if(this.props.roomType == "Mix"){
        if(nextProps.streams != null && nextProps.streams.length > 0){
          this.props.confObject.trySubscribeMixStream(function(stream){
            console.log("Mix Stream Received", stream);
            // stream.resolutions().map(function(resolution) {

            // });
            that.displayStream(stream);
          });
        }
      }else{
            // console.log(layout_16[nextProps.streamCount]);
            if(nextProps.streams != null && nextProps.streams.length > 0){
              this.subscribeVideos(nextProps.streams);
            }
      }
  }

  subscribeVideo(stream){
    L.Logger.info('New stream in conference:', stream.id());
    var that = this;
    if(!stream.showing && stream.mediaStream == undefined && stream.from != ""){
        this.props.confObject.trySubscribeStream(stream, function(stream){
          that.displayStream(stream);
        });
    }else{
      console.log("Stream already subscrubed", stream);
      if(!stream.showing && stream.from != "" && stream.mediaStream){
        this.displayStream(stream);
      }
    }
  }

  subscribeVideos(streams){
    console.log("Subscribe Videos");
    var that = this;
    streams.map(function(stream, index) {
      console.log("Video on Hangout", stream, index);
      if(index == 0){
        //Refresh Selfvideo once;
        that.selfVideo = that.props.confObject.getLocalStream();

        if(that.selfVideo){
          // that.selfVideo.sid = stream.id();
          that.displayStream(that.selfVideo, true);
          that.setState({selfVideo : true});
        }
      }else{
        if(stream){
          L.Logger.info('stream in conference:', stream.id());
          if(!stream.showing){
            that.subscribeVideo(stream);
          }
        }
      }
    });
    // console.log("Count",streams);
  }

  componentWillUnmount() {
    this.props.confObject.hideLocalStream();
    this.props.hideHeader(false, false);
  }

  getSubscribers(streams){

  }

  joinConference(){
    var that = this;
    var settings = {video: this.props.selfVideo, publish: this.props.publishVideo,
                    audio: this.props.selfAudio, codec: this.props.codec,
                    uid: this.props.myid, videoResolution: this.props.videoResolution, roomKey : this.props.roomKey,
                    hostId: this.props.hostId, scheduleId: this.props.scheduleId,
                    users: this.props.users
                  };
                  console.log(this.props.token, this.props.confObject);
    this.props.confObject.joinConference(this.props.token, settings, function(status, streams, selfVideo){
      // console.log(selfVideo, streams);
      if(selfVideo){
        if(that.props.roomType != "Mix"){
          // that.displayStream(selfVideo, true);
          that.selfVideo = selfVideo;
          that.setState({ selfVideo: true});
        }else{
          that.selfVideo = selfVideo;
          that.setState({ selfVideo: true});
        }
      }
      that.props.sendStreams(streams);
    });
  }

  setSpeaker(stream){
    var defIndex = _.findIndex(this.props.streams, ['sid', stream.id()]);
    
    if(defIndex > 1){

    //   var stIndex = _.findIndex(this.videos, ['key', stream.id()]);
    //   stream.hide();

    //   /*The moment the selected user set as speaker, remove him from the scroll list.*/
    //   this.videos.splice(stIndex, 1);

    //   So now remove current speaker from the presenter screen, 
    //   so previous speaker will have space to go there.
    //   let sp_stream = this.props.streams[1];
    //   if(sp_stream.showing){
    //         let elementId = document.getElementById(sp_stream.elementId).parentElement.id;
    //         sp_stream.hide();
    //         document.getElementById(sp_stream.elementId).remove();
    //   }
      this.props.confObject.setSpeaker(stream);
    }
  }

  removeVideo(sid){
    var isVideoFound = _.findIndex(this.videos, ['key', sid]);
    console.log("Remove Addtional Video Index", isVideoFound, sid);
    if(isVideoFound >=0 ){
      var removedStream  = _.pullAt(this.videos, [isVideoFound]);
      console.log("Removed Video Stream", removedStream);
      this.setState({videos: this.videos});
    }
  }

  updateVideoPosition(position, lastSpeakerIndex, lastPresenterIndex){
    this.state.lastPresenterIndex = lastPresenterIndex;
    this.state.lastSpeakerIndex = lastSpeakerIndex;
    this.setState({videoPosition:position})
  }

  getVideoPosition(){
    return {videoPosition:this.state.videoPosition, lastPresenterIndex:this.state.lastPresenterIndex, lastSpeakerIndex:this.state.lastSpeakerIndex};
  }

  displayStream(stream, self = false){
    // var layout = layout_16[this.props.streamCount]
    if(stream.sid != undefined){
      var isVideoFound = _.findIndex(this.videos, ['key', stream.sid]);
      console.log("isVideoFound", isVideoFound, stream.sid, stream);
      if(isVideoFound < 0 /*&& stream.id() != null*/){
          var streamLength = store.getState().conference.streams.length
          this.state.videoPosition = new Array(streamLength).fill({index:-1})

          var objVideo = <VideoInConf key={stream.sid} sCount={this.props.streamCount} newWidth={this.state.newWidth} muteOrAudio={self} removeVideo={this.removeVideo.bind(this)} roomType={this.props.roomType} confObject={this.props.confObject} streamId={stream.sid} stream={stream} speaker={this.requestSpeaker.bind(this)} isGuest={this.props.isGuest}  videoPosition={this.state.videoPosition} updateVideoPosition={this.updateVideoPosition.bind(this)} getVideoPosition= {this.getVideoPosition.bind(this)}> </VideoInConf>;
          this.videos.push(objVideo);
          this.setState({videos: this.videos});
          console.log(this.videos);
      }
    }
  }
  
  requestSpeaker(stream){
    //Message Format {type: 'IMG | TXT | VID', content: '', command: 'INDCHAT | GRPCHAT | ETC'}
    //Request other terminals
    let objSpeaker = {
                        command: 'SPEAKER-REQ',
                        content: {stream_from: stream.from, streamId: stream.id()},
                        type: 'STRING'
                      };

    this.props.confObject.sendMessage(objSpeaker, 0);
  }

  endCall(){
    this.props.confObject.endConference(this.props.roomKey);
    this.props.endCallBack();
    // console.log(this.props.isGuest);
    // if (this.props.isGuest) {
    //   this.props.dispatch(clearGuestAccount(this.props.roomKey)).then(res => this.logOut(res));
    // };
  }

  // logOut(res){
  //   if (res.status) {
  //     Analytics.destroyObj();
  //     store.dispatch(ClearImage());
  //     AuthClient.deleteSession();
  //     browserHistory.push('/');
  //   } else {
  //     console.log("Failed to remove guest.");
  //   }
  // }

  showHost(){
    if (this.props.imHost == false && this.props.confHostId != '' && this.props.confHostId != this.props.myid) {
      alertify.alert('Access Denied', 'Host already exist, at a time one host is allowed.', function(){ });
    } else {
      this.setState({showHost: true});
    }
  }

  closeHost(){
     this.setState({showHost: false}); 
  }

  setPresenter(){
    if(this.selfVideo){
      this.props.confObject.setPresenter(this.selfVideo.sid);
    }
  }

  fullScreen() {
    var elem = document.getElementById("videoConf");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }

    this.setState({newWidth: document.body.clientWidth});
  }

  showInviteBox() {
    this.setState({showInviteBox : !this.state.showInviteBox})
  }

  showOrHideInviteBox = (response) => {
    if(this.state.showInviteBox){
      this.setState({
        showInviteBox: !this.state.showInviteBox, roomId : null, scheduleId : null, roomKey : '', slotId : null
      });
    }else{
      this.setState({
        showInviteBox: !this.state.showInviteBox, roomId : response.roomid, scheduleId : this.props.scheduleId, roomKey : response.roomkey, slotId : response.slotId
      });
    }
  }

  showResponse(response){
    if(response.status){
      console.log("Success in response")
      // this.refs.dashboardcontainer.success(response.message, ``);
    }else if(response.error){
      console.log("error in showResponse === ",response.error);
      // this.refs.dashboardcontainer.error(response.error, ``);
    }
  }

  restartConference(){
    //this.props.confObject.endConference(this.props.params.rid, true);
    location.reload();
    // this.endCallBack();
  }

  showNavBar() {
    this.props.hideHeader(true, !this.state.showNavBar);
    this.setState({showNavBar : !this.state.showNavBar})
  }

  render(){
    let cls_SelfVideoCard = `${styles.selfVideoCard}`;
    return (
      <div className={styles.conferenceLayout}>
        {(this.props.confFeedbackBlock == 2) ?
                  <div id="feedbackBlocker" className={styles.feedbackBlocker}>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <br />
                        </div>
                        <div className="col-md-12 text-center">
                          <FontAwesome name="ban" size="5x" />
                        </div>
                        <div className="col-md-12">
                          <h1>{this.props.confFeedback}</h1>    
                        </div>
                        <div className="col-md-6">
                          <h3>{"If you're having a problem with your camera:"}</h3>
                          <br />
                          <ul>
                            <li>Close any open applications that use a camera or microphone, such as other video-calling or chat programs.</li>
                            <li>Make sure your camera is compatible with your computer.</li>
                            <li>Download the most recent drivers for your camera from the manufacturer&apos;s website.</li>
                            <li>Try restarting your browser.</li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h3>Having a problem with your video call&apos;s sound?</h3>
                          <br />
                          <ul>
                            <li>If you have an external microphone or speakers, make sure they&apos;re plugged into the correct sockets on your computer.</li>
                            <li>Check that your microphone isn&apos;t on mute. Some microphones have buttons to mute or un-mute. If you&apos;re using a headset, it may have a mute switch on the side of the headset or on the cable that connects to your computer.</li>
                            <li>Close any open applications that use a camera or microphone. For example, other video calling or chat programs.</li>
                            <li>Make sure your friend has their microphone set up correctly.</li>
                          </ul>
                        </div>
                        <div className="col-md-12">
                          If you&apos;re still experiencing a problem after trying the suggestions above,
                          Please contact us at hotech@peoplelinkvc.com
                        </div>
                        <div className="col-md-12">
                          <br />
                          <br />
                          <hr />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-9">
                          &nbsp;
                        </div>
                        <div className="col-md-3">
                          <button type="button" className="btn btn-success pull-left" onClick={this.restartConference.bind(this)}>Restart Conference</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ''
                }
        <InviteBox showModal={this.state.showInviteBox}
          hidecallback={this.showOrHideInviteBox.bind(this)} 
          scheduleId={this.props.scheduleId} slotId={this.props.slotId} userId={this.props.myid}
          errorCallback={this.showResponse.bind(this)} roomKey={(window.location.protocol + "//" + window.location.hostname + window.location.pathname)} confFlag={this.props.confObject.getConnectionStatus()} />

        {this.state.selfVideo ?       
        <div className={styles.videoSettings} onClick={this.flipSettings.bind(this)} title={this.props.intl.messages.video_settings}>
          <FontAwesome name="cog" />
        </div>:''}
        {/* {this.props.hosticon && (!this.props.isGuest) && this.state.selfVideo ?  */}
        {this.props.hosticon && (!this.props.isGuest) ? 
          <div className={styles.videoSettings} onClick={this.showHost.bind(this)} style={this.props.imHost == true ? {left : "80px", backgroundColor : "#ff0000"} : {left : "80px"}} title={this.props.imHost ? this.props.intl.messages.revoke_host : this.props.intl.messages.become_host}>
            <img src="/images/white-icons/host-white.png" />
            <HostControl presenterfunc={this.setPresenter} closeHost={this.closeHost.bind(this)} showModal={this.state.showHost} />
          </div>
        : null }
        <div className={styles.videoFullHangout}  onClick={this.fullScreen.bind(this)} title={this.props.intl.messages.full_Screen}>
          <FontAwesome name="arrows-alt" />
        </div>
        <div className={styles.mobNavCall} onClick={this.showNavBar.bind(this)} title="Nav Bar">
          {this.state.showNavBar
            ? <FontAwesome name="times" />
            : <FontAwesome name="bars" />
          }
        </div>
        <div id="videoConf" className={styles.videoConf} style={this.props.isGuest ? {"width" : "calc(100vw - 0px)"} : {}}>
          {this.state.videos}
          {(this.state.videos.length > 0)?
            <div id='endCall' onClick={this.endCall.bind(this)} className={styles.endBtnHangout} >
              <img src="/images/white-icons/end-call.png" />
            </div>
          : ''
          }
        </div>
        {(this.state.flip)?
          <div className={styles.hangoutSettings}>
              <Sources imHost={this.props.imHost} flipfunc={this.flipSettings} confObject={this.props.confObject} audioIn={this.state.audioIn} audioOut={this.state.audioOut} cameraDevices={this.state.cameraDevices} />                
          </div>
          : ''
        }

        {/* {this.props.shareicon && (!this.props.isGuest) && this.state.selfVideo ? */}
        {this.props.shareicon && (!this.props.isGuest) ?
          <div className={styles.shareInviteHangout} title={this.props.intl.messages.share_Link} onClick={this.showInviteBox.bind(this)} >
            <img src="/images/white-icons/white-share.png"  alt="share-icon"/>
          </div>
          : null
        }
        
        { (this.props.confFeedback != '')
          ?
          <div className={styles.feedbackStatus}>
            <p>{this.props.confFeedback}</p>
          </div>
          : ''
        }
        
      </div>    
    );
  }

  
  //////////////////////

  HandleSyncPdfClose(obj){
    this.props.dispatch(setWorkDashboard(obj));
  }

  HandleSyncSSPdf(obj){
    this.props.dispatch(setWorkDashboard(obj));
  }

  SyncSpeaker(sid, sender){
    if(this.props.streams){
        var defIndex = _.findIndex(this.props.streams, ['sid', sid]);
        if(defIndex>=0){
          this.setSpeaker(this.props.streams[defIndex]);
        }
    }
  }

  HandleSyncCurrent(obj){
    let objEntity = null;
    if(obj.current == 'handraise')
      objEntity = { sync : obj.sync, current : obj.current, handraiseCount : 0, handraiseupdates : false };
    else if(obj.current == 'roomchat')
      objEntity = { sync : obj.sync, current : obj.current, roomCount : 0 };
    else if(obj.current == 'topicList')
      objEntity = Object.assign(obj);
    else if(obj.current == 'assignmentList')
      objEntity = Object.assign(obj);
    else if(obj.current == 'pollList')
      objEntity = Object.assign(obj);
    else if(obj.current == 'screenshare') {
      objEntity = Object.assign(obj);
      objEntity["ssNotification"] = false;
      // objEntity = {sync : obj.sync, current : obj.current, ssNotification : false, showButtons : obj.showButtons};
    } else
      objEntity = { sync : obj.sync, current : obj.current };
    this.props.dispatch(setWorkDashboard(objEntity));
  }

  ////////////////////

}

Hangout.contextTypes = {
  intl: React.PropTypes.object.isRequired,
  router : React.PropTypes.object
};

Hangout.propTypes = {
  intl: PropTypes.object,
  token: PropTypes.string,
  confObject: PropTypes.object,
  selfVideo: PropTypes.bool,
  selfAudio: PropTypes.bool,
  publishVideo: PropTypes.bool,
  streamCount: PropTypes.number,
  sendStreams: PropTypes.func,
  streams: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  codec: PropTypes.string,
  transport: PropTypes.string,
  myid: PropTypes.string,
  iceServers: PropTypes.array,
  roomKey: React.PropTypes.string,
  roomType: PropTypes.string,
  confFeedback: PropTypes.string,
};

Hangout.defaultProps = { selfVideo: true, selfAudio: true, publishVideo: true };

export default connect()(injectIntl(Hangout));
