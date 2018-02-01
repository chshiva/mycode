import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import Slider from '../../../../components/slider/ImageSlider';
import VideoInScroller from './VideoInScroller';
import WoogeenManager from '../../../Communication/WoogeenManager';

var _ = require('lodash');

import styles from '../../Dashboard.css';

export class ScrollConf extends Component {

  constructor(props) {
    super(props);
    this.state = {
      childLength : 0,
      videos      : []
    };

    this.count = 0;
    this.videos = [];
    this.SyncSpeaker = this.SyncSpeaker.bind(this);

    this.props.confObject.SetSpeakerListener(this.SyncSpeaker);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.streams != null){
      this.subscribeVideos(this.props.streams);
    }
  }

  componentWillUnmount() {
    this.props.confObject.hideRemoteStream();
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
    var that = this;
    var capIndex = 1;

    /*if(this.props.onlyPresenter){
      capIndex = 0;
    }*/

    streams.map(function(stream, index) {
      if(index > capIndex){
            L.Logger.info('stream in conference:', stream.id());
            if(!stream.showing){
              that.subscribeVideo(stream);
            }
      }else{
        /*Its important to set this state to avoid duplicate div id and prevent the accedent 
        removal of other parent element, when streen disconnects from socket*/
        that.setState({videos: []});
      }
    });

  }

  displayStream(stream){
    /*Clone is mandatory to use, since stream has been delt between two components, 
    and there is a time gap which bring black screen during the speaker change.*/
    var objStream = _.clone(stream);
    var objVideo = <VideoInScroller speaker={this.requestSpeaker.bind(this)} key={objStream.id()} streamId={objStream.id()} stream={objStream} > </VideoInScroller>;

    var that = this;
    
    /*Check the cloned objects maintain the equal count of global stream count and splice 
    the unwanted objects from its own array.*/
    this.videos.map(function(tmpObj, index){
       var exIndex = _.findIndex(that.props.streams, ['from', tmpObj.props.stream.from]);
       if(exIndex < 0){
          that.videos.splice(index, 1);
       } else if(exIndex == 1){
          that.videos.splice(index, 1);
       }
    });

    /*Sometime key may duplicate, after few switch over between scroll to presenter 
    by speaker switch, so to avaoid the key duplicate error, find if any key present, 
    before push the object*/
    var stIndex = _.findIndex(this.videos, ['key', objStream.id()]);

        if(stIndex >= 0){
          this.videos[stIndex] = objVideo;
        }else{
          this.videos.push(objVideo);
        }
    
    this.setState({videos: this.videos});

  }

  requestSpeaker(stream){
    //Message Format {type: 'IMG | TXT | VID', content: '', command: 'INDCHAT | GRPCHAT | ETC'}
    //Request other terminals
    let objSpeaker = {
                        command: 'SPEAKER-REQ',
                        content: {stream_from: stream.from},
                        type: 'STRING'
                      };

    this.props.confObject.sendMessage(objSpeaker, 0);
  }

  setSpeaker(stream){
    var defIndex = _.findIndex(this.props.streams, ['from', stream.from]);
    
    console.log("Speaker Request", defIndex);
    
    if(defIndex > 1){ //0th place is self so skiped, 1th place is spekaer so skipped.
      this.props.confObject.onlyPresenter(false);

      var stIndex = _.findIndex(this.videos, ['key', stream.id()]);
      stream.hide();

      /*The moment the selected user set as speaker, remove him from the scroll list.*/
      this.videos.splice(stIndex, 1);

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
      console.log('Self as speaker');
      this.props.confObject.onlyPresenter(true);
    }else if(defIndex == 1){ //The requested stream already in speaker area.
      this.props.confObject.onlyPresenter(false);
    }
  }

  render(){
    let cls_scrollMain;
    if(this.props.streamCount <= 1){
      cls_scrollMain = `${styles.subscirbersVideo} ${styles.hideObject}`;
    }else{
      cls_scrollMain = `${styles.subscirbersVideo}`;
    }

    return (
      <div className={cls_scrollMain}>
        <div className={styles.scrollImageContainer}>
          <div className={styles.galleryWrap}>
                <Slider delay={0} visibleItems={3} length={this.props.streamCount-1} id="confScroller">
                  {this.state.videos}
                </Slider>
          </div>
        </div>
      </div>    
    );
  }

  //////////////////////


  SyncSpeaker(from, sender){
    if(this.props.streams){
        var defIndex = _.findIndex(this.props.streams, ['from', from]);
        if(defIndex>=0){
          this.setSpeaker(this.props.streams[defIndex]);
        }else{
          console.log("Stream un-identified", from, this.props.streams[0]);
          //So check them in attendees list to make sure thats me (myself)
          var attIndex = _.findIndex(this.props.attendees, ['id', from]);

          if(attIndex>=0){//Wow you found some body, but make sure thats me
            if(this.props.attendees[attIndex].name == this.props.myid) {
              //Wow you got it, its me.... now you do what you want
              this.setSpeaker(this.props.streams[0]);
            }
          }
        }
    }
  }

  ////////////////////
}


ScrollConf.propTypes = {
  intl: PropTypes.object,
  streams: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  attendees: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  confObject: PropTypes.object,
  streamCount: PropTypes.number,
  myid: PropTypes.string,
  onlyPresenter: PropTypes.bool,
};

export default ScrollConf;
