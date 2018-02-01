import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {  injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
// import ControlVideo from './ControlVideo';

import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import { statsDetails } from '../../../Communication/StatsReducer';

import styles from '../../Dashboard.css';

import WoogeenManager from '../../../Communication/WoogeenManager';
import { layout_16 } from '../../../Communication/Layout';

var _ = require('lodash');

export class VideoInConf extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showControl: false,
      clientHeight: 0,
      clientWidth: 0,
      showing: false,
      mute: props.stream.mute || false,
      volume: props.stream.volume || false,
    };

    this.statsTicker = null;
    this.updateDimensions = this.updateDimensions.bind(this);

  }

  updateDimensions(){
    // console.log("CL Height",document.body.clientHeight);
    // this.setState({clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
    this.setState({clientHeight:document.body.clientHeight, clientWidth:window.innerWidth})
  }

  showControl(){
     this.setState({showControl: true});
     var that = this;
     var stream = this.props.stream;
     if(this.props.stream && this.props.stream.showing){
        // this.statsTicker = setInterval(function(){
        //   console.log('Interval');
        //   that.getStats(stream);
        // }, 2000);
     }
  }

  closeControl(){
     clearInterval(this.statsTicker);

     this.setState({showControl: false});
  }

  componentWillReceiveProps(nextProps) {
    console.log('Is Full Screen', this.isFullScreen());
      if(nextProps.newWidth > 0){
        this.setState({clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth});
      }

      // if(this.props.conferenceDetails.remoteMute){

      // }
  }

  componentDidMount() {
    if(this.props.stream){
      if(this.props.stream.mediaStream){
         console.log('confvid', this.props.stream);
         this.showVideo(this.props.stream);
      }
    }

    this.setState({clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth});
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    this.props.stream.hide();
    window.removeEventListener("resize", this.updateDimensions);
  }

  setSpeaker(){
    // alert(this.props.stream);
    // this.props.speaker(this.props.stream);
    if (this.props.conferenceDetails.speaker == this.props.streamId) {
      this.props.confObject.offSpeaker();
    } else {
      let obj = {
                    command : 'SPEAKER-ON',
                    content : { speaker: store.getState().conference.speaker, streamId: this.props.stream.id() },
                    type : 'OBJECT'
                };
      this.props.confObject.sendMessage( obj, 0);
    }
  }

  getStats(stream){
    // console.log("Stats Interval", stream);
    this.props.confObject.getStreamReport(stream, function(obj, status){
      if(status){
        ///Report Received
        // console.log("Stats", obj);
      }else{
        ///Error Received
        console.log("ERROR STATS", obj);
      }
    });
  }

  showVideo(stream){
    console.log("Show Video on hangout", stream);
    let _video = document.getElementById(this.props.stream.sid);
    if(_video){
      //Create URL
      let _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
      _video.src = _streamURL;
      // _video.volume = 0;

      this.setState({showing: true});
    }
  }

  removeAddtional(sid){
    // console.log("Remove Index", iIndex);
    this.props.removeVideo(this.props.stream.sid);
    this.props.confObject.removeAdditionalCamera(sid);
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

  handleTouchTap(){
    console.log("Long Touch");
  }

  isFullScreen ()
  {
    return document.webkitIsFullScreen || //Webkit browsers
           document.mozFullScreen || // Firefox
           document.msFullScreenElement !== undefined; // IE
  }

  render(){
    let subVID  = 'confvid' + this.props.streamId;
    // console.log("Its height", this.state.clientHeight);
    // let windowWidth = document.body.getClientRects()[0].width - 65;
    let windowHeight = this.state.clientHeight;//document.body.clientHeight;
    let windowWidth = windowHeight * 16/9;
    // console.log("W and H", windowWidth, windowHeight);
    var fixWidth = ((this.state.clientWidth - 50) - windowWidth)/2;
    var obj = this.props.getVideoPosition()
    var videoPosition = obj.videoPosition
    var lastSpeakerIndex   = obj.lastSpeakerIndex
    var lastPresenterIndex = obj.lastPresenterIndex

    if (this.state.clientWidth < 600 || this.props.isGuest) {
      fixWidth = ((this.state.clientWidth - 0) - windowWidth)/2;
    }

    if(this.isFullScreen()){
      // windowHeight =
      // console.log("Full Screen Occupaied");
      fixWidth = 0;
      windowHeight = screen.height;
      windowWidth = windowHeight * 16/9;
    }

    var length = this.props.conferenceDetails.streams.length -1

    if(this.props.conferenceDetails.streams[0] && this.props.conferenceDetails.streams[0].from == ""){
      length--;
    }else if (this.props.conferenceDetails.streams[0] == null){
      length--;
    }

    let objLayout = layout_16[length];
    // console.log("Layout ");
    let aspectRatio_H = 9/16;

    let _h = 0;
    let gap = 0;
    let tgap = 0;

    let allstreams = _.compact(this.props.conferenceDetails.streams);
    let i = _.findIndex(allstreams, ['sid', this.props.stream.id()])
    let icpy = i;
    let iPresenter = _.findIndex(allstreams, ['presenter', true]);
    let iSpeaker = _.findIndex(allstreams, ['speaker', true]);

    if(iPresenter < 0 || iSpeaker < 0){
      this.props.updateVideoPosition(videoPosition, -1)
    }

    if(lastSpeakerIndex != iSpeaker || lastPresenterIndex != iPresenter){
      if(lastSpeakerIndex != iSpeaker){
          var isSpeakerFound = _.findIndex(videoPosition, ['index', lastSpeakerIndex])
          videoPosition = new Array(videoPosition.length).fill({index:-1, sid:""})
      }

      if(lastPresenterIndex != iPresenter){
          var isPresenterFound = _.findIndex(videoPosition, ['index', lastPresenterIndex])
          videoPosition = new Array(videoPosition.length).fill({index:-1, sid:""})
      }
      lastSpeakerIndex = iSpeaker
      lastPresenterIndex = iPresenter
      this.props.updateVideoPosition(videoPosition, lastSpeakerIndex, lastPresenterIndex)
    }


  if(this.props.roomType != "Mix"){

    // console.log("FFFFFFF", length, i);
    let thisStream = this.props.stream;
    if( i < 0){
      i = 0;
    }else{
      thisStream = allstreams[i];
    }

    if(iPresenter >= 0 && iSpeaker >= 0){
      console.log("2 Condition", iPresenter, iSpeaker, thisStream, i);
      console.log("videoposition", videoPosition)
      if(thisStream.presenter && i != 1){
        videoPosition[1] = {index:i, sid:thisStream.sid}
        this.props.updateVideoPosition(videoPosition, lastSpeakerIndex, lastPresenterIndex)
        i = 1; //Making sure this guy get right place
      }
      else if(thisStream.speaker && i != 0){
        videoPosition[0] = {index:i, sid:thisStream.sid}
        this.props.updateVideoPosition(videoPosition, lastSpeakerIndex, lastPresenterIndex)
        i = 0; //Making sure this gux`y get right place
      }
      else if(!thisStream.presenter && !thisStream.speaker && i == 0){
        videoPosition[2] = {index:i, sid:thisStream.sid}
        this.props.updateVideoPosition(videoPosition, lastSpeakerIndex, lastPresenterIndex)
        i = 2;
      }
      else if(!thisStream.presenter && !thisStream.speaker){
        var emptyIndex = -1;
        var startIndex;
        var updatedIndex = -1;
        if(videoPosition.length == 3){
          startIndex = videoPosition.length
        }
        else{
          // Hard coded because 0 - speaker, 1 - presenter, 2 - self
          startIndex = 3
        }
        if(iPresenter == 0 || iSpeaker == 0){
          startIndex = startIndex - 1;
        }
        console.log('startIndex', startIndex)
        var splicearray = _.clone(videoPosition)
        splicearray.splice(0,startIndex)
        var sliceIndex = _.findIndex(splicearray, ['index', i])
        if(sliceIndex < 0){
          var emptyIndex = _.findIndex(splicearray, ['index', -1])
          console.log('emptyIndex', emptyIndex)
          updatedIndex = emptyIndex+startIndex;
          console.log('updatedIndex', updatedIndex)
        }else{
          updatedIndex = sliceIndex+startIndex;
        }
        videoPosition[updatedIndex] = {index:i, sid:thisStream.sid};
        this.props.updateVideoPosition(videoPosition, lastSpeakerIndex, lastPresenterIndex)
        i = updatedIndex;
      }
    }else if(iPresenter >= 0 && iSpeaker < 0){
      // console.log("A Condition", iPresenter, iSpeaker, this.props.stream, i);
      if(thisStream.presenter && i != 0){
        i = 0; //Making sure this guy get right place
      }else if(i == 0){
        i = iPresenter;
      }
    }else if(iSpeaker >= 0 && iPresenter < 0){
      // console.log("B Condition", iPresenter, iSpeaker, this.props.stream, i);
      if(thisStream.speaker && i != 0){
        i = 0; //Making sure this guy get right place
      }else if(i == 0){
        i = iSpeaker;
      }
    }
  }


    // if (iPresenter < 0 && iSpeaker < 0 ){
    //   i = icpy + 0; //nobody found as speaker or presenter; let the flow be the same
    // }else if(iPresenter >= 0 && iSpeaker >= 0 && (!this.props.stream.speaker && !this.props.stream.presenter) && (i == 0 || i == 1)){
    //   //Looks both place reserved
    //   i = icpy + 2;
    // }else if(iPresenter >= 0 && (!this.props.stream.speaker && !this.props.stream.presenter) && i ==0){
    //   i = icpy + 1;
    // }else if(iSpeaker >= 0 && (!this.props.stream.speaker && !this.props.stream.presenter) && i == 1){
    //   i = icpy + 1;
    // }

    // console.log("Lenght --- Test", i, this.props.stream);

    // if(length>1){
    //     if(i==0){
    //       i = 1;
    //     }else if(i == 1){
    //       i = 0;
    //     }
    // }
    // console.log("Index", i);
    if(this.props.roomType == "Mix"){
      objLayout = layout_16[0];
      i = 0;
    }

    if(length >= 0 && objLayout && objLayout.region[i]){
      _h = (windowWidth * objLayout.region[i].relativeSize) * aspectRatio_H;
      gap = (windowWidth * objLayout.region[i].gap) * 0.5;
      tgap = (windowHeight-((windowWidth * objLayout.region[i].tgap)* aspectRatio_H))/2;
    }
    // console.log(windowWidth * objLayout.region[i].left + gap, windowWidth);
    const vidStyle = {
            left    : windowWidth * objLayout.region[i].left + gap + fixWidth,
            top     : (_h * objLayout.region[i].top) + tgap + 'px',
            height  : _h + 'px',
            width   : (windowWidth * objLayout.region[i].relativeSize) + 'px',
            position: 'absolute',
            overflow: 'hidden',
          };

    let cls_mixFix = '';
    // console.log('Stream Count', this.props.sCount, allstreams.length);
    let sCount = allstreams.length;
    if(this.props.roomType == "Mix" && (sCount == 6 || sCount == 8  || sCount == 10 || sCount == 14 || sCount == 15 || sCount >= 17)){
      // vidStyle['object-fit'] = 'contain !important';
      cls_mixFix = `${styles.mixFix}`;
    }else if(this.props.roomType == "Mix"){
      cls_mixFix = `${styles.mixFixCover}`;
    }

    let selfId = this.props.confObject.getSelfId();
    let showSelf = true;
    let stremsWithoutSelf = _.clone(allstreams);

    if(selfId == this.props.stream.from && this.props.roomType != "Mix"){
      showSelf = false;

      _.pull(stremsWithoutSelf, this.props.stream);
      if(sCount == 1)
        cls_mixFix = `${styles.mobConfSingle}`;
      else if (sCount == 2)
        cls_mixFix = `${styles.videoConfMobileSelf}`;
      else if(sCount == 3)
        cls_mixFix = `${styles.videoConfMobileSelfThree}`;
      else
        cls_mixFix = `${styles.videoConfMobileSelfFourLayout}`;
    }

    if(showSelf) {
      // console.log("allstreams====== ", allstreams);
      if(sCount == 2) {
        cls_mixFix = `${styles.videoConfMobileOther}`;
      } else if(sCount == 3) {
        console.log("stremsWithoutSelf[0].from--", stremsWithoutSelf[0].from, this.props.stream.from);
        if(stremsWithoutSelf[1].from == this.props.stream.from)
          cls_mixFix = `${styles.videoConfMobileOtherThreeRight}`;
        else
          cls_mixFix = `${styles.videoConfMobileOtherThreeLeft}`;
      } else if(sCount == 4) {
        if(stremsWithoutSelf[1].from == this.props.stream.from) {
          cls_mixFix = `${styles.videoConfMobileOtherThreeRight}`;
        } else if (stremsWithoutSelf[2].from == this.props.stream.from){
          cls_mixFix = `${styles.videoConfMobileOtherFourLeft}`;
        }else {
          cls_mixFix = `${styles.videoConfMobileOtherThreeLeft}`;
        }
      } else
        cls_mixFix = `${styles.videoConfMobileOtherThreeLeft}`;
    }

    // console.log(vidStyle);
    /*<div id={scrlVID} className="rsc-slider-item" style={scrlStyle}>
        <div id={subVID} className="rsc-slider-item-img rsc-slider-item_transparent" style={subStyle}>

        </div>
      </div>



          { this.props.stream.additional ?
            <div className={styles.removeOption} title="Remove Additional Camera!" onClick={this.removeAddtional.bind(this, this.props.stream.id())}>x</div>
            : null
          }
          <div className={styles.controllerListBlock}>
            <ul>
              <li title="Remove this user">
                <img src="/images/white-icons/remove-user.png" />
              </li>
              <li title="View performance graph">
                <img src="/images/white-icons/graph-report.png" />
              </li>
            </ul>
          </div>
          {this.props.conferenceDetails.imHost && showSelf ?
            <div className={styles.speakerSelf} onClick={this.setSpeaker.bind(this)}>
             <img src="/images/white-icons/speaker-white.png" />
            </div>
          : null}

      */
    return (

        <div style={vidStyle} className={cls_mixFix}>

          {(!showSelf) ?
              <video id={this.props.stream.sid} autoPlay muted onDoubleClick={this.requestFullScreen.bind(this)}></video>
              :
              <video id={this.props.stream.sid} autoPlay onDoubleClick={this.requestFullScreen.bind(this)}></video>
          }

            { this.props.stream.additional ?
            <div className={styles.removeOption} title="Remove Additional Camera!" onClick={this.removeAddtional.bind(this, this.props.stream.id())}>x</div>
            : null
          }
            {this.props.conferenceDetails.imHost && showSelf && this.props.roomType != 'Mix' ?
            <div className={styles.speakerSelf} onClick={this.setSpeaker.bind(this)} style={this.props.conferenceDetails.speaker == this.props.streamId ? {backgroundColor : "#ff0000"} : {}} title= {this.props.conferenceDetails.speaker == this.props.streamId ? this.props.intl.messages.revoke_speaker : this.props.intl.messages.make_speaker_vedio}>
             <img src="/images/white-icons/speaker-white.png" />
            </div>
          : null}

            <div className={styles.controlBar}>
              {(this.props.muteOrAudio && this.props.stream.mute) ?
                  (this.props.conferenceDetails.remoteMute) ?
                    <div className={styles.remoteMute}>Muted by Host</div>
                  : ''
                : ''
              }
              {/* {(this.props.muteOrAudio) ?
                ((this.state.volume || this.props.conferenceDetails.remoteMute) && this.props.stream.mute) ?
                  <FontAwesome name="microphone-slash" title={this.props.intl.messages.mute_unmute} onClick={this.mute_v.bind(this, this.props.conferenceDetails.remoteMute)}>
                  </FontAwesome>
                : <FontAwesome name="microphone" title={this.props.intl.messages.mute_unmute} onClick={this.mute_v.bind(this, this.props.conferenceDetails.remoteMute)} />
               : (this.state.volume) ?
                  <FontAwesome name="volume-off" title={this.props.intl.messages.volume_on_off} onClick={this.mute_v.bind(this, false)} />
                : <FontAwesome name="volume-up" title={this.props.intl.messages.volume_on_off} onClick={this.mute_v.bind(this, this.state.mute)} />
              }&nbsp;&nbsp;
              {
                (this.props.conferenceDetails.imHost && showSelf && this.props.roomType != "Mix") ?
                  (this.state.mute) ?
                    (!this.state.volume) ?
                      <FontAwesome title={this.props.intl.messages.remote_mute_unmute} name="microphone-slash" onClick={this.mute.bind(this)}>
                      </FontAwesome>
                    : ''
                  : <FontAwesome title={this.props.intl.messages.remote_mute_unmute} name="microphone" onClick={this.mute.bind(this)} />
                : ''
              } */}
              {(this.props.muteOrAudio) ?
                (this.props.stream.mute) ?
                  <FontAwesome name="microphone-slash" title={this.props.intl.messages.mute_unmute} onClick={this.mute.bind(this, this.props.conferenceDetails.remoteMute)}>
                  </FontAwesome>
                : <FontAwesome name="microphone" title={this.props.intl.messages.mute_unmute} onClick={this.mute.bind(this, this.props.conferenceDetails.remoteMute)} />
               : (this.state.volume) ?
                  <FontAwesome name="volume-off" title={this.props.intl.messages.volume_on_off} onClick={this.mute_v.bind(this, false)} />
                : <FontAwesome name="volume-up" title={this.props.intl.messages.volume_on_off} onClick={this.mute_v.bind(this, this.state.mute)} />
              }&nbsp;&nbsp;
              {
                (this.props.conferenceDetails.imHost && showSelf && this.props.roomType != "Mix") ?
                  (this.props.stream.mute) ?
                    (!this.state.volume) ?
                      <FontAwesome title={this.props.intl.messages.remote_mute_unmute} name="microphone-slash" onClick={this.mute.bind(this)}>
                      </FontAwesome>
                    : ''
                  : <FontAwesome title={this.props.intl.messages.remote_mute_unmute} name="microphone" onClick={this.mute.bind(this)} />
                : ''
              }
            </div>

            {(this.props.stream && this.props.roomType != "Mix")?
              (!showSelf) ?
                <div className={styles.nameVideo}>You</div>
              :
                <div className={styles.nameVideo}>{this.props.stream.fname}</div>
            : 'Loading...'}
        </div>
    );
  }
}

VideoInConf.contextTypes = {

};

function mapStateToProps(state) {
  return {
    conferenceDetails: conferenceDetails(state),
    statsDetails: statsDetails(state),
  };
}

VideoInConf.propTypes = {
  intl: PropTypes.object,
  streamId: PropTypes.string,
  stream: PropTypes.object,
  conferenceDetails: PropTypes.object,
  statsDetails: PropTypes.object,
  confObject: PropTypes.object,
  speaker: PropTypes.func,
  clientHeight: PropTypes.number,
};

VideoInConf.defaultProps = { };

export default connect(mapStateToProps)(injectIntl(VideoInConf));
