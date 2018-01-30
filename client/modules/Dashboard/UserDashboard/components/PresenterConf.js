import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { connect } from 'react-redux';

import styles from '../../Dashboard.css';

import { Roles } from '../../../../roles';
import WoogeenManager from '../../../Communication/WoogeenManager';
// import ControlVideo from './ControlVideo';
import HostControl from './HostControl';
import SelfVideo from './SelfVideo';
import SpeakerVideo from './SpeakerVideo';
import Sources from './Sources';
import Slider from '../../../../components/slider/ImageSlider';
import VideoInScroller from './VideoInScroller';
import Analytics from '../../../Communication/Analytics';
import InviteBox from '../../components/InviteBox';

export class PresenterConf extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showControl: false,
      flip: false,
      showHost: false,
      selfVideo: false,
      videos      : [],
      videoLength: 0,
      audioIn: [],
      audioOut: [],
      cameraDevices: [],
      enableVAD: false,
      mixStream: null,
      showInviteBox : false
    }

    this.selfVideo = null;
    this.presenterVideo = null;
    this.speakerVideo = null;

    this.found_presenter = false;
    this.found_speaker = false;

    this.videos = [];

    this.audioIn = [];
    this.audioOut = [];
    this.cameraDevices = [];

    this.setSelfVideo    = this.setSelfVideo.bind(this);
    this.setRemoveVideo   = this.setRemoveVideo.bind(this); 
    this.SyncSpeaker = this.SyncSpeaker.bind(this);
    this.setPresenter = this.setPresenter.bind(this);
    this.flipSettings     = this.flipSettings.bind(this);
    this.mixStream = null;
    // if(this.props.noScrollConf){
        // this.props.confObject.SetSpeakerListener(this.SyncSpeaker);
    this.props.confObject.setSelfVideo(this.setSelfVideo);
    this.props.confObject.setRemoveVideo(this.setRemoveVideo);

    //this.beforeUnload = this.beforeUnload.bind(this);
    // }

    this.amEarly = false;
  }

  setRemoveVideo(stream){
    let stIndex = _.findIndex(this.videos, ['key', stream.id()]);
    if(stIndex >= 0 ){
      this.videos.splice(stIndex, 1);
    }
    
    this.setState({videoLength: this.videos.length});
  }

  setSelfVideo (stream){
    console.log("Self Video Taken", stream);
    this.selfVideo = stream;
    this.setState({selfVideo: true});
  }

  beforeUnload(){
    // var res = confirm("Do you really want to exit!");
    // if (res == true) {
    // if(this.props.logId){
    //   var _objAnalytics = new Analytics();
    //   _objAnalytics.UpdateAttendance(this.props.logId);
    // }
    // } else {
    //     //"You pressed Cancel!";
    // }
    return true;
  }

  componentDidMount() {
    if(this.props.token != '' && this.props.token != undefined){
        var that = this;
        this.props.confObject.getConference(this.props.iceServers, this.props.transport, function(res){
          that.joinConference();
        });
    }

    //window.addEventListener("beforeunload", this.beforeUnload); 
  }

  componentWillUnmount() {
    //window.removeEventListener("beforeunload", this.beforeUnload);

    this.props.confObject.hideLocalStream(); 
    if(this.props.logId){
        var _objAnalytics = new Analytics();
        _objAnalytics.UpdateAttendance(this.props.logId);
    }
  }
  
  getSubscribers(streams){

  }

  joinConference(){
    var that = this;
    var settings = {video: this.props.selfVideo, publish: this.props.publishVideo,
                    audio: this.props.selfAudio, codec: this.props.codec,
                    uid: this.props.myid, videoResolution: this.props.videoResolution,
                    role: this.props.role, users: this.props.users, roomKey: this.props.roomKey, 
                    hostId: this.props.hostId, scheduleId: this.props.scheduleId
                  };
    this.props.confObject.joinConference(this.props.token, settings, function(status, streams, selfVideo){
        that.selfVideo = selfVideo;
        console.log("SELF Video", selfVideo);
        that.setState({selfVideo: true});
        that.props.sendStreams(streams);
    });
  }

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

  showControl(){
     this.setState({showControl: true});
  }
 
  closeControl(){
     this.setState({showControl: false}); 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomType == 'Mix'){
      var that = this;
      this.props.confObject.trySubscribeMixStream(function(stream){
        // this.mixStream = stream;
        that.setState({mixStream: stream});
      });

      return;
    }
    console.log("Prop Received", nextProps);
    this.selfVideo = this.props.confObject.getLocalStream();
    if(nextProps.streams.length > 1){

        this.found_presenter = false;
        this.presenterVideo = null;
        
        for(var i = 1; i < nextProps.streams.length; i++){
          let tmp_stream = nextProps.streams[i];
          if (tmp_stream != null) {
            let stIndex = _.findIndex(this.videos, ['key', tmp_stream.id()]);

            if(tmp_stream.presenter){

              this.found_presenter = true;
              this.presenterVideo = tmp_stream;

              if(stIndex >= 0 ){
                this.videos.splice(stIndex, 1);
              }
            }

            if(tmp_stream.speaker){
              console.log("Props D", nextProps);
              this.found_speaker = true;
              this.speakerVideo = tmp_stream;

              if(stIndex >= 0 ){
                this.videos.splice(stIndex, 1);
              }
              console.log('After Popped', this.videos);
            }

            if(tmp_stream.presenter != true && tmp_stream.speaker != true && nextProps.roomType != 'Mix'){
              if(stIndex < 0 ){
                var objVideo = <VideoInScroller confObject={this.props.confObject} key={tmp_stream.id()} streamId={tmp_stream.id()} stream={tmp_stream} />;
                this.videos.push(objVideo);
              }
            }
          }
        }

        // if(!this.found_presenter){
        //   this.setState({presenterVideo: false});
        // }
        
        this.setState({videos: this.videos});
        window.scrollVideos = this.videos;
    }else{
      this.videos = [];
    }

    // let vLengthArray = _.intersection(this.videos, nextProps.streams);

    this.setState({videoLength: this.videos.length});
    console.log("Video Length", this.videos.length, this.state.videoLength, this.videos);
  }

  endCall(){
    this.props.confObject.endConference(this.props.roomKey);
    this.props.endCallBack();
  }

  setPresenter(){
    if(this.selfVideo){
        this.props.confObject.setPresenter(this.selfVideo.sid);
    }
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

        console.log("DEV", that.cameraDevices);
        that.setState({audioIn: that.audioIn, audioOut: that.audioOut, cameraDevices: that.cameraDevices});
      });
    }

    this.setState({flip: !this.state.flip});
  }

  enableVad(){
    let vadStatus = !this.state.enableVAD;
    this.setState({enableVAD: vadStatus});
    this.props.confObject.enableVad(vadStatus);
  }

  showInviteBox() {
    this.setState({showInviteBox : !this.state.showInviteBox})
  }

  showOrHideInviteBox = (response) => {
    if(this.state.showInviteBox){
      this.setState({
        showInviteBox: !this.state.showInviteBox
      });
    }else{
      this.setState({
        showInviteBox: !this.state.showInviteBox
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

  render(){

    let cls_big = `${styles.videoPresenter}`;
    let cls_sm = `${styles.video160}`;

    let  cls_scrollMain = `${styles.subscirbersVideo}`;

    //Check is it Early wait or not?
    if(this.props.streams.length == 1 && this.props.streams[0] == null){
      this.amEarly = true;
    }else{
      this.amEarly = false;
    }

    let showPresenter = false;
    let selfFrom = (this.selfVideo) ? this.selfVideo.sid : '';
    // console.log("showPresenter before", showPresenter, this.props.presenterId);
    if(this.props.presenterId != '' && this.props.presenterId != null && selfFrom != this.props.presenterId){
      showPresenter = true;
      cls_sm = `${styles.video160}`;
      cls_big = `${styles.videoPresenter}`;
    }else if(this.props.role == Roles.Student && this.props.presenterId != '' && this.props.presenterId != null){
      showPresenter = true;
      cls_sm = `${styles.video160}`;
      cls_big = `${styles.videoPresenter}`;
    }else{
      cls_sm = `${styles.videoPresenter}`;
      cls_big = `${styles.video160}  ${styles.hideObject}`;
    }

    let showSpeaker = false;
    if(this.props.speakerId != '' && this.props.speakerId != null && selfFrom != this.props.speakerId){
      showSpeaker = true;
      cls_sm = `${styles.video160}`;
      cls_big = `${styles.videoPresenter}`;
    }else if(this.props.role == Roles.Student && this.props.speakerId != '' && this.props.speakerId != null && (!this.selfVideo)){
      showSpeaker = true;
      cls_sm = `${styles.video160}`;
      cls_big = `${styles.videoPresenter}`;
    }

    //console.log("showPresenter after", showPresenter);

    // console.log( "Speaker VIDEO", this.props.speakerId);

    let cls_fix = '';
    if(this.props.presenterId && this.props.speakerId /* && this.selfVideo && this.props.presenterId != '' && this.props.speakerId != ''*/){
      if(this.props.presenterId == selfFrom || this.props.speakerId == selfFrom){
        //Then make self as 50 and speaker component as 50
        cls_sm = `${styles.videoPresenter} ${styles.video50}`;
        cls_big = `${styles.videoPresenter} ${styles.video50}`;
      }else if(this.props.presenterId != '' && this.props.speakerId != ''){
        cls_sm = `${styles.video160}`;
        cls_big = `${styles.videoPresenter} ${styles.video50}`;
        cls_fix = `${styles.videofix}`;
      }
    }else if(this.props.role == Roles.Student && this.props.presenterId != '' && this.props.speakerId != ''){
        cls_sm = `${styles.video160} ${styles.hideObject}`;
        cls_big = `${styles.videoPresenter} ${styles.video50}`;
        cls_fix = `${styles.videofix}`;      
    }

    if(!this.selfVideo){
      cls_sm = `${styles.video160} ${styles.hideObject}`;

    }

    let cls_SelfVideoCard = `${styles.selfVideoCard}`;
    // if(this.state.flip){
    //   cls_SelfVideoCard = `${styles.selfVideoCard}`;
    // }

    let showYet = false;
    if(!showPresenter && !showSpeaker && !this.selfVideo){
      showYet = true;
    }

    let vadController  = `${styles.vadController}`;
    if(this.state.enableVAD){
      vadController = `${styles.vadController} ${styles.selectedSpeaker}`;
    }

    let showMix = false;

    if(this.props.roomType == 'Mix'){
      showMix = true;
      showPresenter = false;
      showSpeaker = false;
      cls_sm = `${styles.video160} ${styles.hideObject}`;
      cls_big = `${styles.videoPresenter}`;
      showYet = false;
    }
    
    //changed by jyothi for becomehost & Revoke host, enable VAD & Disable VAD conditions
    
    return (
      <div id="objPresenter">
        <InviteBox showModal={this.state.showInviteBox}
          hidecallback={this.showOrHideInviteBox.bind(this)} 
          scheduleId={this.props.scheduleId} slotId={this.props.slotId} userId={this.props.myid}
          errorCallback={this.showResponse.bind(this)} roomKey={(window.location.protocol + "//" + window.location.hostname + window.location.pathname)} confFlag={this.props.confObject.getConnectionStatus()} />
        
        <div className={styles.video480}>
            {(this.selfVideo)?
                <div className={styles.videoSettings} onClick={this.flipSettings} title={this.props.intl.messages.video_settings}>
                  <FontAwesome name="cog" />
                </div>
                :''
            }
            {/*<div className={styles.videoController} title="Open Video Controllers">
                        <img onClick={this.showControl.bind(this)} src="/images/white-icons/controller.png" />
                        <ControlVideo closeControl={this.closeControl.bind(this)} showModal={this.state.showControl} />
                      </div> // Host is yet to join!*/}
          <div className={cls_SelfVideoCard}>
            <div className={styles.frontDisp}>
              { (this.props.confFeedback != '')?
                  <p className={styles.hostYetMsg}>{this.props.confFeedback}</p>
                : ''
              }

              {this.props.hosticon && this.state.selfVideo ? 
                <div className={styles.videoController} onClick={this.showHost.bind(this)} style={this.props.imHost == true ? {backgroundColor : "#ff0000"} : {}} title={this.props.imHost ? this.props.intl.messages.revoke_host : this.props.intl.messages.become_host}>
                  <img src="/images/white-icons/host-white.png" />
                  <HostControl presenterfunc={this.setPresenter} closeHost={this.closeHost.bind(this)} showModal={this.state.showHost} />
                </div>
              : null }
              {/*this.props.imHost ? 
                <div className={vadController} title={this.state.enableVAD == true ? "Disable VAD" : "Enable VAD"}>
                                    <img onClick={this.enableVad.bind(this)} src="/images/white-icons/white-vad-icon.png" />
                                </div>
              : null*/ }
              <div id='dvPresenterScreen' className={cls_big}>
                {(this.amEarly)? <div className={styles.early}>Presenter/Host not yet joined or left the meeting</div> : ''}
                {(showMix)?
                  <SpeakerVideo speakerId={this.props.speakerId} presenterId={this.props.presenterId} confObject={this.props.confObject} uid={this.props.myid} stream={this.state.mixStream} id="speaker1" />
                  : ''
                }
                {(showPresenter)?
                  <SpeakerVideo speakerId={this.props.speakerId} presenterId={this.props.presenterId} confObject={this.props.confObject} uid={this.props.myid} stream={this.presenterVideo} id="speaker1" />
                  : ''
                }
                {(showSpeaker)?
                  <SpeakerVideo clsFix={cls_fix} speakerId={this.props.speakerId} presenterId={this.props.presenterId} confObject={this.props.confObject} uid={this.props.myid} stream={this.speakerVideo} id="speaker2" />
                  : ''
                }
              </div>
              <div id="dvSmallScreen" className={cls_sm}>
                <SelfVideo speakerId={this.props.speakerId} presenterId={this.props.presenterId} confObject={this.props.confObject} uid={this.props.myid} stream={this.selfVideo} id="self1" />
              </div>

              {this.props.shareicon && this.state.selfVideo ?
                <div className={styles.shareInviteConf} title={this.props.intl.messages.share_Link} onClick={this.showInviteBox.bind(this)}>
                  <img src="/images/white-icons/white-share.png"  alt="share-icon"/>
                </div>
                : null
              }

              <div id='endCall' onClick={this.endCall.bind(this)} className={styles.endBtnPresenter} >
                <img src="/images/white-icons/end-call.png" />
              </div>

            </div>
            {(this.state.flip)?
              <div className={styles.backDisp}>
                  <Sources flipfunc={this.flipSettings} imHost={this.props.imHost} confObject={this.props.confObject} audioIn={this.state.audioIn} audioOut={this.state.audioOut} cameraDevices={this.state.cameraDevices} />                
              </div>
              : ''
            }
          </div>

        </div>
        {(!this.props.noScrollConf && this.state.videoLength > 0)?
          <div className={cls_scrollMain}>
                  <div className={styles.scrollImageContainer}>
                    <div className={styles.galleryWrap}>
                          <Slider delay={0} visibleItems={3} length={this.props.streams.length - 2} id="confScroller">
                            {this.state.videos}
                          </Slider>
                    </div>
                  </div>
                </div>
          : ''
        }
      </div>
    );
  }

  //Run Only When No ScrollConf Present
  setSpeaker(stream){
    var defIndex = _.findIndex(this.props.streams, ['from', stream.from]);
    console.log("Def Index", defIndex);
    if(defIndex > 1){ //0th place is self so skiped, 1th place is spekaer so skipped.
      this.props.confObject.onlyPresenter(false);

      /*So now remove current speaker from the presenter screen, 
      so previous speaker will have space to go there.*/
      let sp_stream = this.props.streams[1];
      if(sp_stream.showing){
            let elementId = document.getElementById(sp_stream.elementId).parentElement.id;
            sp_stream.hide();
            document.getElementById(sp_stream.elementId).remove();
      }
      this.props.confObject.setSpeaker(stream);
    }else if(defIndex == 0){ //Speaker asking him self to be speaker
      console.log('Self as speaker While No ScrollConf');
      this.props.confObject.onlyPresenter(true);
    }else if(defIndex == 1){ //The requested stream already in speaker area.
      this.props.confObject.onlyPresenter(false);
    }
  }

  SyncSpeaker(from, sender){
    console.log("Sync Called", from)
    if(this.props.streams && this.props.noScrollConf){
        var defIndex = _.findIndex(this.props.streams, ['from', from]);
        var hostIndex = _.findIndex(this.props.streams, ['from', sender]);

        this.props.confObject.setHostFlag(hostIndex);
        
        console.log("Sender Index", defIndex);
        if(defIndex>=0){
          this.setSpeaker(this.props.streams[defIndex]);
        }else{
          console.log("Stream un-identified", from, this.props.streams[0]);
          //So check them in attendees list to make sure thats me (myself)
          var attIndex = _.findIndex(this.props.attendees, ['id', from]);

          if(attIndex>=0){//Wow you found some body, but make sure thats me
            if(this.props.attendees[attIndex].name == this.props.myid) {
              //Wow you got it, its me.... now you do what you want
              this.props.streams[0].from = from;
              this.setSpeaker(this.props.streams[0]);
            }
          }
        }
    }
  }

}

PresenterConf.contextTypes = {
  router : React.PropTypes.object,
   intl: React.PropTypes.object.isRequired,
};

PresenterConf.propTypes = {
  intl: PropTypes.object,
  token: PropTypes.string,
  sendStreams: PropTypes.func,
  confObject: PropTypes.object,
  selfVideo: PropTypes.bool,
  selfAudio: PropTypes.bool,
  publishVideo: PropTypes.bool,
  streams: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  attendees: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  codec: PropTypes.string,
  transport: PropTypes.string,
  onlyPresenter: PropTypes.bool,
  presenterId: PropTypes.string,
  speakerId: PropTypes.string,
  myid: PropTypes.string,
  noScrollConf: PropTypes.bool,
  iceServers: PropTypes.array,
  roomKey: React.PropTypes.string,
  role: PropTypes.number,
  users: PropTypes.array,
  endCallBack : PropTypes.func,
  logId: PropTypes.string,
  confFeedback: PropTypes.string,
};

PresenterConf.defaultProps = { noScrollConf: false, selfVideo: true, selfAudio: true, publishVideo: true };

export default injectIntl(PresenterConf);
