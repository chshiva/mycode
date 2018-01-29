import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { connect } from 'react-redux';

import styles from '../../Dashboard.css';
import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import WoogeenManager from '../../../Communication/WoogeenManager';

export class VideoInScroller extends Component {

  constructor(props) {
    super(props);
    this.stream = null;
    this.state = {
      showing: false,
      mute: props.stream.mute || false,
      volume: props.stream.volume || false,
    }
  }

  componentDidMount() {
    if(this.props.stream){
      let that = this;
      if(this.props.stream.mediaStream){
          this.stream = this.props.stream;
          this.showVideo(this.stream);
      }else{
          this.props.confObject.trySubscribeStream(this.props.stream, function(stream){
            that.stream = stream;
            that.showVideo(stream);
          });
      }
    }
  }

  showVideo(stream){
    let _video = document.getElementById(this.props.stream.id());
    if(_video){
      //Create URL
      // (window.URL || webkitURL).createObjectURL(that.stream);
      let _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
      _video.src = _streamURL;
      // _video.srcObject = stream.mediaStream;
      // _video.volume = 0;

      this.setState({showing: true});
    }
  }

  componentWillUnmount() {
    this.props.stream.hide();
  }


  setSpeaker(){
    // alert(this.props.stream);
    // this.props.speaker(this.props.stream);
    this.props.confObject.setSpeakerOn(this.props.stream.from, this.props.stream.id());
  }

  requestFullScreen(e){
    var elem = document.getElementById(this.props.stream.id());
    if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    }else if(elem.webkitEnterFullScreen){
      elem.webkitEnterFullScreen();
    }
    // e.currentTarget.requestFullscreen();
  }
  
  removeAddtional(sid){
    console.log("Remove Index", sid);
    this.props.confObject.removeAdditionalCamera(sid);
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
    console.log("props imHost === ",this.props.conferenceDetails.imHost);
    let scrlVID = 'scrlvid' + this.props.streamId;
    const scrlStyle = {
            flex: '0 0 100%',
          };

    let subVID  = 'subvid' + this.props.streamId;
    const subStyle = {
            width: '160px',
            height: '90px',
            position: 'none'
          };
    /*<div id={scrlVID} className="rsc-slider-item" style={scrlStyle}>
        <div id={subVID} className="rsc-slider-item-img rsc-slider-item_transparent" style={subStyle}>

        </div>
      </div> */
    return (
        <div id={scrlVID} className="rsc-slider-item" style={scrlStyle}>
        { this.props.stream.additional ? 
          <div className={styles.removeOption} title="Remove Additional Camera!" onClick={this.removeAddtional.bind(this, this.props.stream.sid)}>x</div>
          : null
        }
        { this.props.conferenceDetails.imHost ?
          <div className={styles.speakerRemote} onClick={this.setSpeaker.bind(this)} title= {this.props.intl.messages.become_speaker} >
             <img src="/images/white-icons/speaker-white.png" />
          </div>
        : null }
        {(this.props.stream)?
                      <div className={styles.nameVideo} style={{maxWidth: "120px"}}>{this.props.stream.fname}</div>
                    : 'Loading...'}
        <div id={subVID} className="rsc-slider-item-img rsc-slider-item_transparent" style={subStyle}>
            <video onDoubleClick={this.requestFullScreen.bind(this)} id={this.props.stream.id()} autoPlay></video>
        </div>

        <div className={styles.controlBar}>
              {(this.state.volume) ?
                  <FontAwesome name="volume-off" title={this.props.intl.messages.volume_on_off} onClick={this.mute_v.bind(this, false)} />
                : <FontAwesome name="volume-up" title={this.props.intl.messages.volume_on_off} onClick={this.mute_v.bind(this, this.state.mute)} />
              }&nbsp;&nbsp;
              {
                (this.props.conferenceDetails.imHost) ?
                  (this.props.stream && this.props.stream.mute) ?
                    (!this.state.volume) ? 
                      <FontAwesome title={this.props.intl.messages.remote_mute_unmute} name="microphone-slash" onClick={this.mute.bind(this)} />
                    : ''
                  : <FontAwesome title={this.props.intl.messages.remote_mute_unmute} name="microphone" onClick={this.mute.bind(this)} />
                : ''
              }
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    conferenceDetails: conferenceDetails(state)
  };
}

VideoInScroller.propTypes = {
  intl: PropTypes.object,
  streamId: PropTypes.string,
  stream: PropTypes.object,
  speaker: PropTypes.func,
  confObject: PropTypes.object,
  conferenceDetails: PropTypes.object
};

VideoInScroller.contextTypes = {

};

VideoInScroller.defaultProps = { };

export default connect(mapStateToProps)(injectIntl(VideoInScroller));
