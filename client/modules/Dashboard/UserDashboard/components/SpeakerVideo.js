/** 
* @Author: "VM Rajaprathap",
* @Purpose: "Used to show Speaker/Presenter Video, in LMS View"
*/

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import WoogeenManager from '../../../Communication/WoogeenManager';
import { layout_16 } from '../../../Communication/Layout';
import FontAwesome from 'react-fontawesome';
import styles from '../../Dashboard.css';

export class SpeakerVideo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showing: false,
      mute: (props.stream) ? props.stream.mute : false,
      volume: (props.stream) ? props.stream.volume : false,
    }
    this.stream = null;
    this._video = null;
  }

  /**
  * @Function Name: "handleVideo",
  * @Purpose: "Subscribe the stream if required and validate all the possibilites of 
              stream object's health and suplly to showVideo function",
  * @Request Object: <subscribed stream>,
  * @Response: void
  */
  handleVideo(mystream){

    //New Stream
    let _stream = mystream;

    console.log("TEST STReam", mystream, this.state.showing, this.stream);
    if(_stream != null){

      if(!this.state.showing || (this.stream && this.stream.sid != _stream.sid)){
        this.stream = _stream;

        if(this.stream.mediaStream){ //If mediaStream object present, stream already subscribed.
          this.showVideo(this.stream);
        }else{ //If mediaStream is null, subscribe the video from conference object.
          let that = this;
          console.log("Try Subscribe");
          this.props.confObject.trySubscribeStream(this.stream, function(stream){
              that.stream = stream;
              that.showVideo(stream);
          });
        }
      }else{ //State where blob is present but not displayed in video element.
        if(this.stream && _stream.mediaStream != null){ //Making sure the existing stream is not null.
          if(this.stream.sid == _stream.sid){
            // this.showVideo(this.stream);
          }
        }
      }///if Low
    }else{

      if(this.stream){
        if(this._video){
          this.setState({showing: false});
          this._video.src = null;
          this.stream = null;
        }
      }
    }////If Top
  }

  componentDidMount() {
    this.handleVideo(this.props.stream);
  }

  componentWillReceiveProps(nextProps) {
    console.log("SP VID REC", nextProps.stream);
    this.handleVideo(nextProps.stream);
  }

  /**
  * @Function Name: "showVideo",
  * @Purpose: "Create BLOB for the given stream object and supply the blob to video element",
  * @Request Object: stream,
  * @Response  void,
  */
  showVideo(stream){
    this._video = document.getElementById(this.props.id);
    if(this._video){
      //Create URL
      let _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
      this._video.src = _streamURL;
      // this._video.volume = 0;

      this.setState({showing: true});
    }
  }

  /**
  * @Function Name: "offSpeaker",
  * @Purpose: "Reset all the speaker id from store",
  * @Request: void,
  * @Response: void,
  */
  offSpeaker(){
    this.props.confObject.offSpeaker();
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
    let _mute = this.props.confObject.MuteOrUnMute(this.props.stream)
    this.setState({mute: _mute});
    // this.setState({volume: _mute});
  }

  mute_v(blockval){
    if(blockval){
      return;
    }
    let _mute = this.props.confObject.volumeOnorOff(this.props.stream);
    this.setState({volume: _mute});
    // this.setState({mute: _mute});
  }

  render(){

    let cls_SelfVideoCard = `${styles.selfVideoCard}`;

    let _stream = this.props.stream;

    let cls_SelfSpeaker = `${styles.speakerRemote}`;
    if(_stream && (this.props.presenterId == _stream.sid || this.props.speakerId == _stream.sid) ){
      cls_SelfSpeaker = `${styles.speakerRemote} ${styles.selectedSpeaker}`;
    }

    let cls_speaker = `${styles.selfVideo} ${this.props.clsFix}`;
    
    //changed by jyothi for become Presenter & Revoke Presenter condition
    return (
        <div id="speakerVideo" className={cls_speaker}>
          {(this.props.conferenceDetails.imHost && this.props.conferenceDetails && this.props.conferenceDetails.confData && this.props.conferenceDetails.confData.roomType != 'Mix')?
              <div className={cls_SelfSpeaker} title= {this.props.intl.messages.revoke_speaker }>
                 <img onClick={this.offSpeaker.bind(this)} src="/images/white-icons/speaker-white.png" />
              </div>
            : null
          }
          {(_stream)?
                      <div className={styles.nameVideo}>{_stream.fname}</div>
                    : <div className={styles.nameVideo}>'...'</div>}
                <video onDoubleClick={this.requestFullScreen.bind(this)} id={this.props.id} autoPlay></video>
                <div className={styles.controlBar}>
                  {(this.state.volume) ?
                      <FontAwesome name="volume-off" title={this.props.intl.messages.volume_on_off} onClick={this.mute_v.bind(this, false)} />
                    : <FontAwesome name="volume-up" title={this.props.intl.messages.volume_on_off} onClick={this.mute_v.bind(this, this.state.mute)} />
                  }&nbsp;&nbsp;
                  {
                    (this.props.conferenceDetails.imHost && this.props.conferenceDetails.confData.roomType != "Mix") ?
                      (_stream && _stream.mute) ?
                          <FontAwesome title={this.props.intl.messages.remote_mute_unmute} name="microphone-slash" onClick={this.mute.bind(this)} />
                      : <FontAwesome title={this.props.intl.messages.remote_mute_unmute} name="microphone" onClick={this.mute.bind(this)} />
                    : ''
                  }
                </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    conferenceDetails: conferenceDetails(state),
  };
}

SpeakerVideo.propTypes = {
  intl: PropTypes.object,
  stream: PropTypes.object,
  conferenceDetails: PropTypes.object,
  confObject: PropTypes.object,
  id: PropTypes.string,
  uid: PropTypes.string,
  presenterId: PropTypes.string,
  speakerId: PropTypes.string,
  clsFix: PropTypes.string
};

SpeakerVideo.defaultProps = { };

export default connect(mapStateToProps)(injectIntl(SpeakerVideo));
