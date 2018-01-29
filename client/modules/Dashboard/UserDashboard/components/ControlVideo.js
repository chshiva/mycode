import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import {  injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';

import styles from '../../Dashboard.css';

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import RTChart from 'react-rt-chart';

//var LineChart = require("react-chartjs").Line;

export class ControlVideo extends Component {
  constructor(props) {
    super(props);
    this.execute = true;
    this.bytessent = 0;
    this.bytespersec = 0;
    Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }

    this.state = {
      showStats: 0
    }
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.showModal){
    //   if(this.props.stream && this.props.stream.showing && this.execute){
    //     this.execute = false;
    //     this.getStats(this.props.stream);
    //   }  
    // }
  }

  // getStats(stream){
  //   // console.log("Stats", stream);
  //   this.props.confObject.getStreamReport(stream, function(obj, status){
  //     if(status){
  //       ///Report Received
  //       console.log("Stats", obj);
  //     }else{
  //       ///Error Received
  //       console.log("ERROR STATS", obj);
  //     }
  //   });
  // }

  setStatPage(page){
    this.setState({showStats: page});
  }

  //for schedule
  render() {
    if(this.props.showModal){
        // console.log(this.props.stats);
        var bytes = this.props.stats.ssrc_audio_send.bytes_sent;
        var packets = this.props.stats.ssrc_audio_send.packets_sent;
        var codec_name = this.props.stats.ssrc_audio_send.codec_name;
        // console.log("Bytes and Packets", bytes, packets );
        if(bytes > 0  && this.bytessent != bytes){
            this.bytespersec = bytes - this.bytessent;
            this.bytessent = bytes;
        }
    
        console.log("Bytes Sent ", this.bytespersec);
        var chart = {
                    point: {
                        show: false
                    },
                    data: {
                      names: {
                        Bytes: 'KBytes',
                      }
                    },
                    axis: {
                      x: {
                        type: 'timeseries'
                      }
                    }
        };
        var flow = {
                    duration: 20000
        };
    
        var data = {
          date: new Date()/*.timeNow()*/,
          Bytes: this.bytespersec, /*(bytes) ? (bytes/1024) : 0 ,*/
          /*Packets: (packets) ? packets : 0,*/
        };
    
        let cls_chooseInput = `${styles.chooseInput} ${styles.chooseInput.radio}`;
        let cls_inputMargin = `${styles.inputMargin} ${styles.chooseInput} ${styles.chooseInput.radio}`;
        let cls_deleteUser = `${styles.removeUserUl} clearfix`;
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeControl}>
              <Header closeButton>
                <Title className={styles.popHeadingAll} >Control this video</Title>
              </Header>
              <Body>
                <Row>
                  <Col md={4}>
                    <div className={styles.currentVideoControllers}>
                      <div className={styles.popupCurrentVideo}>
                        
                      </div>
                      <div className={styles.volumeControllerBlock}>
                        <h3>Control Volume</h3>
                        <div className={styles.contolItems}>
                          <span>
                            <img src="/images/black-icons/novolume.png" />
                          </span>
                          <div className={styles.rangeBlock}>
                            <input id="range" type="range" />
                          </div>
                          <span>
                            <img src="/images/black-icons/highvolume.png" />
                          </span>
                        </div>
                      </div>
                      <div className={styles.volumeControllerBlock}>
                        <h3>Mute / Unmute</h3>
                        <div className={styles.contolItems}>
                          <ul>
                            <li>
                              <span>
                                <img src="/images/black-icons/mute.png" />
                              </span>
                              <input id="radioMute" type="radio" name="muteunmute" className={cls_inputMargin} />
                              <span>
                                <img src="/images/black-icons/unmute.png" />
                              </span>
                              <input id="radioUnmute" type="radio" name="muteunmute" className={cls_chooseInput} />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className={styles.volumeControllerBlock}>
                        <h3>Remove this user</h3>
                        <div className={styles.contolItems}>
                          <div className={styles.removeUserBlock}>
                             <ul className="clearfix">
                              <li>
                                <div className={styles.removeThisUser}>
                                  <img src="/images/profile-pics/beautiful.jpg" />
                                </div>
                              </li>
                              <li>
                                <button id="removeUser" className="btn btn-sm btn-danger">Remove User</button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className={styles.statsBlock}>
                      <div className={styles.statsHeader}>
                        <input id="RadioAudioSent" type="radio" name="stats" value="AudioSent" defaultChecked="checked" onClick={this.setStatPage.bind(this, 0)} /> <FontAwesome name="caret-up" />Audio &nbsp;
                        <input id="RadioAudioRec" type="radio" name="stats" value="AudioRec" onClick={this.setStatPage.bind(this, 1)} /> <FontAwesome name="caret-down" />Audio &nbsp;
                        <input id="RadioVideoSent" type="radio" name="stats" value="VideoSent" onClick={this.setStatPage.bind(this, 2)} /> <FontAwesome name="caret-up" />Video &nbsp;
                        <input id="RadioVideoRec" type="radio" name="stats" value="VideoRec" onClick={this.setStatPage.bind(this, 3)} /> <FontAwesome name="caret-down" />Video &nbsp;
                      </div>
                      {(this.state.showStats == 0)?
                        <div className={styles.statsBody}>
                            {/*<RTChart
                                                            chart={chart}
                                                            maxValues={60}
                                                            flow={flow}
                                                            fields={['Bytes']}
                                                            data={data} />*/}
    
                            <p>Codec: {codec_name}</p>
                            <p>Packets Sent {packets}</p>
                        </div>
                        : (this.state.showStats == 1)? 
                          <div className={styles.statsBody}>
                            Aduio Received
                          </div>
                        : (this.state.showStats == 2) ?
                          <div className={styles.statsBody}>
                            Video Sent
                          </div>
                        : (this.state.showStats == 3) ?
                          <div className={styles.statsBody}>
                            Video Received
                          </div>
                        : <div className={styles.statsBody}>
                            BW Stats
                          </div>
                        }
                    </div>
                  </Col>
                </Row>
              </Body>
            </Modal>
        );
      }else{
        return (
            <div></div>
          );
      }
  }


}

ControlVideo.contextTypes = {
  router: React.PropTypes.object,
};

ControlVideo.propTypes = {
  intl: intlShape.isRequired,
  confObject: PropTypes.object,
  stream: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  showModal: PropTypes.bool,
  closeControl: PropTypes.func,
  stats: PropTypes.object,
};

ControlVideo.defaultProps = { showModal: false };

export default injectIntl(ControlVideo);


//https://www.npmjs.com/package/react-rt-chart