import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import ControlVideo from './ControlVideo';

import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import { statsDetails } from '../../../Communication/StatsReducer';

import styles from '../../Dashboard.css';

import WoogeenManager from '../../../Communication/WoogeenManager';
import { layout_16 } from '../../../Communication/Layout';

var _ = require('lodash');

export class SelfVideo extends Component {

  constructor(props) {
    super(props);
    // console.log("Self Video Mute", props.stream);
    this.state = {
      showing: false,
      flip: false,
      audioInputSelect: null,
      audioOutputSelect: null,
      videoSelect: null,
      mute: (props.stream) ? props.stream.mute : false,
    }    
    this.stream = null;
  }

  componentWillReceiveProps(nextProps) {
    // console.log("New Object Stream", nextProps.stream, this.state.showing, this.stream);
    this.setState({mute: (nextProps.stream) ? nextProps.stream.mute || false : false});
    if(nextProps.stream != null && this.stream == null){
      
      this.stream = nextProps.stream;

      if(!this.state.showing){
        // this.stream.from = this.props.uid;
        console.log("Show Self Video");
        this.showVideo(this.stream);
      }
      
    }else if(nextProps.stream == null){
      this.setState({showing: false});
      this.stream = null;
    }else if(nextProps.stream && nextProps.stream.mediaStream == null){
      this.stream = null;
      this.setState({showing: false});
    }else if(this.stream.mediaStream == null && nextProps.stream.mediaStream != null){
      this.stream = nextProps.stream;
      this.showVideo(this.stream);
    }
  }

  showVideo(stream){
    let _video = document.getElementById(this.props.id);
    if(_video){
      //Create URL
      console.log("SElf URL0");
      let _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
      _video.src = _streamURL;
      _video.volume = 0;

      this.setState({showing: true});
    }
  }

  changeResolution(){
    let that = this;
    this.props.confObject.createCamera(function(stream){
      console.log("new Stream", stream);
      that.showVideo(stream);
    })
  }

  flipSettings(){

    if(this.state.flip){
      this.props.confObject.getDevices(function(deviceInfos){
        for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            
            var deviceID = deviceInfo.deviceId;
            var deviceKind = deviceInfo.kind;
            var deviceText = '';

            if(deviceKind === 'audioinput'){
              deviceText = deviceInfo.label || 'Microphone';

            }else if(deviceKind === 'audiooutput'){
              deviceText = deviceInfo.label || 'Speaker';
            }else if(deviceKind === 'videoinput'){
              deviceText = deviceInfo.label || 'Camera';
            }
        }        

      });
    }

    this.setState({flip: !this.state.flip});
  }

  selfPresenter(){
    if(this.props.presenterId == this.props.stream.sid){
      this.props.confObject.offPresenter();
    }else{
      this.props.confObject.setPresenter(this.props.stream.sid);
    }
  }

  requestFullScreen(e){
    var elem = document.getElementById(this.props.id);
    if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    }else if(elem.webkitEnterFullScreen){
      elem.webkitEnterFullScreen();
    }
    // e.currentTarget.requestFullscreen();
  }

  mute(){
    // var _mute = !this.state.mute;
    // this.setState({mute: _mute});

    // if(_mute){
    //   this.props.confObject.Mute(this.props.stream);
    // }else{
    //   this.props.confObject.UnMute(this.props.stream);
    // }
    this.setState({mute: this.props.confObject._MuteOrUnMute(this.props.stream)});
  }

  render(){

    let cls_SelfVideoCard = `${styles.selfVideoCard}`;
    if(this.state.flip){
      cls_SelfVideoCard = `${styles.selfVideoCard} ${styles.flipped}`;
    }

    let cls_SelfSpeaker = `${styles.speakerSelf}`;
    if(this.props.stream && this.props.presenterId == this.props.stream.sid){
      cls_SelfSpeaker = `${styles.speakerSelf} ${styles.selectedSpeaker}`;
    }

    //changed by jyothi for become Presenter & Revoke Presenter condition
    return (
      <div id="selfVideo" className={styles.selfVideo}>
        {(this.props.conferenceDetails.imHost)?
            <div className={cls_SelfSpeaker} title={this.props.presenterId ? this.props.intl.messages.revoke_presenter : this.props.intl.messages.become_presenter}>
               <img onClick={this.selfPresenter.bind(this)} src="/images/white-icons/presenter-whtie.png" />
            </div>
          : null
        }
        {/*<button onClick={this.changeResolution.bind(this)}>Change Resolution</button>*/}
        {/*<div className={styles.videoSettings} title="Video Settings">
          <FontAwesome name="cog" onClick={this.flipSettings.bind(this)} />
        </div>*/}
        <div className={styles.nameVideo}>You</div>
        {/*<div className={cls_SelfVideoCard}>
          <div className={styles.frontDisp}> 'PlayPause', 'Seek', 'Time', 'Volume', */}
        <video onDoubleClick={this.requestFullScreen.bind(this)} id={this.props.id} autoPlay></video>
        {/*</div>
            <div className={styles.backDisp}>
              
            </div>
          </div>*/}
            
        <div className={styles.controlBar}>
          {
            (this.props.conferenceDetails.remoteMute) ?
              <div className={styles.remoteMute}>Muted by Host</div>
            : ''
          }
          {(this.state.mute || this.props.conferenceDetails.remoteMute) ?
              <FontAwesome name="microphone-slash" title={this.props.intl.messages.mute_unmute} onClick={this.mute.bind(this)} />
            : <FontAwesome name="microphone" title={this.props.intl.messages.mute_unmute} onClick={this.mute.bind(this)} />
          }
        </div>

      </div>
    );
  }
}

SelfVideo.contextTypes = {

};

function mapStateToProps(state) {
  return {
    conferenceDetails: conferenceDetails(state),
  };
}

SelfVideo.propTypes = {
  intl: PropTypes.object,
  stream: PropTypes.object,
  conferenceDetails: PropTypes.object,
  confObject: PropTypes.object,
  id: PropTypes.string,
  uid: PropTypes.string,
  presenterId: PropTypes.string,
  speakerId: PropTypes.string
};

SelfVideo.defaultProps = { };

export default connect(mapStateToProps)(injectIntl(SelfVideo));
