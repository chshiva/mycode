import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn, setHeaderFlag } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import { requestIceServer, clearGuestAccount, showOrHideConfFeedback } from '../../../Communication/ConferenceActions';

import styles from '../../Dashboard.css';
import { Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import WorkDashboard from '../components/WorkDashboard';
import SchedulePassword from '../components/SchedulePassword';
import PresenterConf from '../components/PresenterConf';
import ScrollConf from '../components/ScrollConf';
import Hangout from '../components/Hangout';

import AttendeesList from '../components/AttendeesList';

import { requestToken } from '../UserDashboardActions';

import WoogeenManager from '../../../Communication/WoogeenManager';
import Analytics from '../../../Communication/Analytics';

import { Roles } from '../../../../roles';
import Loading from '../../../App/components/Loading';
import ErrorMessage from '../../../App/components/ErrorMessage';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
import { clearWorkDashboard } from '../components/WorkDashboardActions';

import { SetConfStatus } from '../../../Communication/ConferenceActions';
import { browserHistory } from 'react-router';
import { ClearImage } from '../../../Login/LoginActions';
import callApi from '../../../../util/apiCaller';


export class Conference extends Component {
  
  constructor(props) {
    super(props);
    this.confObject = new WoogeenManager();
    this.logId = null,
    this.state = {
      ready: false,
      streamList: null,
      confObject : this.confObject,
      error : null,
      currentAttendance: null,
      schedulePasswordModel:true
    }
    this.checkSchedule = false;
    this.handleConferenceStatus = this.handleConferenceStatus.bind(this);

    this.beforeUnload = this.beforeUnload.bind(this);
  }

  componentDidMount() {
    var roomKey = this.props.params.rid;
    if(!this.confObject.getConnectionStatus()){
      console.log(this.props.loggedInData.data._id, "Connection Status");
      this.props.dispatch(loginLanguage(this.props.loggedInData.data, this.props.intlData.setlocale));
      this.props.dispatch(requestToken(roomKey, this.props.loggedInData.data._id)).then(res => this.setResponse(res) );
      this.confObject.setRoomKey(roomKey);
      this.confObject.handleConfStatusListener(this.handleConferenceStatus);
      // this.props.dispatch(requestIceServer());
      // history.pushState(null, null, location.href);
      // window.onpopstate = this.onBackButtonEvent;
    } else {
    }
    window.addEventListener("beforeunload", this.beforeUnload);
  }

  componentWillUnmount() {
    // var _objAnalytics = new Analytics();
    // _objAnalytics.UpdateAttendance(this.logId);
    window.removeEventListener("beforeunload", this.beforeUnload);
  }

  setResponse = (response) => {
      if (response.roomSuccess) {
        var _objAnalytics = new Analytics();
        var that = this;
        _objAnalytics.LogAttendance(response.data.haveSchedule, response.data.roomDBId, function (logId) {
          that.logId = logId;
          that.setState({ currentAttendance: logId });
        });
      }
      if (!response.status) {
        this.setState({ error: response.error })
      } else {
        // conferenceDetails.confData.haveSchedule
        // console.log("Conf Data Test", response);

      }
    // }
   
  }

  onBackButtonEvent = (e) => {
    e.preventDefault();
    history.go(1);
  }

  receiveStreams(streams){
    this.setState ({streamList: streams});
  }

  endCallBack() {
    this.props.dispatch(clearWorkDashboard());
    if (this.props.loggedInData.data.guest) {
      this.props.dispatch(clearGuestAccount(this.props.params.rid)).then(res => this.logOut(res));
    };
  }

  logOut(res){
    if (res.status) {
      Analytics.destroyObj();
      store.dispatch(ClearImage());
      AuthClient.deleteSession();
      browserHistory.push('/');
    } else {
      console.log("Failed to remove guest.");
    }
  }
  closeSchedulePassword() {
    this.setState({ schedulePasswordModel: false });
  }

  hideHeader(headerFlag, showHeaderFlag) {
    this.props.dispatch(setHeaderFlag(headerFlag, showHeaderFlag));
  }

  hideFeedbackConf(){
    this.props.dispatch(showOrHideConfFeedback(0));
  }

  restartConference(){
    this.state.confObject.endConference(this.props.params.rid, true);
    this.endCallBack();
  }
  
  scheduleCallback = () => {
    this.checkSchedule = true;
    this.setState({ schedulePasswordModel: false });
  }

  beforeUnload(){
    // var res = confirm("Do you really want to exit!");
    // if (res == true) {
    callApi('remove-guest-room', 'put', {
        data : {roomKey : this.props.params.rid},
    });
    if (this.state.currentAttendance != null) {
      var _objAnalytics = new Analytics();
      _objAnalytics.UpdateAttendance(this.state.currentAttendance);
    }
    return true;
  }

  render() {
    // console.log("Inside conf render");
    let cls_confMain = `${styles.confMain} clearfix`;
    let cls_videoTwoLayout = `${styles.videoTwoLayout} pull-left`;
    let cls_rightPane = `pull-right ${styles.block480}`;
    let cls_hideObject = ``;
    let conferenceDetails = this.props.conferenceDetails;
    let _noConference = false;
    // if password autharized then go to conference 

        let videoLayout = <div className={styles.tableBox}>
          <AttendeesList uid={this.props.loggedInData.data._id} />
        </div>
        if (conferenceDetails /*&& conferenceDetails.iceServers*/) {
          // console.log("Wow Ice here", conferenceDetails.iceServers)
          var hostId = '';
          var userRole = '';
          var businessType = false;
          var streamCount = 0;
          var features = [];
          var scheduleId = '';
          var confHostId = '';
          var slotId = '';

          if (conferenceDetails && conferenceDetails.roomSuccess && conferenceDetails.confData && conferenceDetails.confData.token) {
            scheduleId = conferenceDetails.confData.scheduleData ? conferenceDetails.confData.scheduleData._id : '';
            slotId = conferenceDetails.confData.scheduleData ? conferenceDetails.confData.scheduleData.slotId : '';
            hostId = conferenceDetails.confData.hostId;
            userRole = this.props.loggedInData.data.role;
            businessType = conferenceDetails.confData.businessType;
            streamCount = conferenceDetails.streams.length;
            features = conferenceDetails.confData.packageData && conferenceDetails.confData.packageData.features ? conferenceDetails.confData.packageData.features : [];
            confHostId = conferenceDetails.hostId ? conferenceDetails.hostId : '';
              if (conferenceDetails.confData.autharized == undefined || conferenceDetails.confData.autharized == false) {
                return (
                  <ErrorMessage message="unautharized_request" />
                );
              } else if (conferenceDetails.confData.validUser == undefined || conferenceDetails.confData.validUser == false) {
                return (
                  <ErrorMessage message="invalid_user" />
                );
              } else if (conferenceDetails.confData.validRoom == undefined || conferenceDetails.confData.validRoom == false) {
                return (
                  <ErrorMessage message="invalid_room" />
                );
              } else if (conferenceDetails.confData.isExpiredRoom == undefined || conferenceDetails.confData.isExpiredRoom == true) {
                return (
                  <ErrorMessage message="invalid_or_expire_room" />
                );
              } else if (conferenceDetails.confData.validPackage == undefined || conferenceDetails.confData.validPackage == false) {
                return (
                  <ErrorMessage message="invalid_or_expire_package" />
                );
              } else if (!this.confObject.getConnectionStatus() && conferenceDetails.confData.haveSchedule && (!this.checkSchedule) && conferenceDetails.confData.scheduleData && conferenceDetails.confData.scheduleData.password) {
                console.log("this.confObject.getConnectionStatus() ==== ", this.confObject.getConnectionStatus());
                return (
                  <SchedulePassword showModal={this.state.schedulePasswordModel} scheduleId={scheduleId} closeSchedulePassword={this.closeSchedulePassword.bind(this)} callback={this.scheduleCallback} guest={this.props.loggedInData.data.guest} />
                );

              } else if (conferenceDetails.confStatus == 1 && businessType) {
                if (conferenceDetails && conferenceDetails.roomSuccess && conferenceDetails.confData && conferenceDetails.confData.token) {
                  //Logic
                  /*
                    if Role is Student 
                    videoParm = false
                    else 
                    videoParm = true
        
                    resolutionParm = Selected val
        
                    Host_ID = 'from Object - host id' | if null keey host id as ''
        
                    If ConfType = LMS
                      mode = 'presenter'
                    else  ConfType = TELEPRESENCE
                      mode = 'telepresence'
                    else ConfType = 'Conference'
                      mode = conference
                  */
                  //          
                  // console.log("hostId-- ", hostId, "  --userRole-- ", userRole, "  ---businessType--- ", businessType);
                  if (conferenceDetails.confData.enableLive != true) {
                    videoLayout = null;
                    _noConference = true;
                    console.log("enableLive is false!");
                  } else if ((userRole == Roles.Student || userRole == Roles.Attendee) && conferenceDetails.confData.haveSchedule != true) {
                    videoLayout = null;
                    _noConference = true;
                    console.log("Student without Schedule");
                  } else if (userRole == Roles.Student || userRole == Roles.Attendee) {
                    videoLayout = <div className={styles.tableBox}>
                      <PresenterConf role={userRole} logId={this.state.currentAttendance} users={conferenceDetails.confData.users}
                        presenterId={conferenceDetails.presenter} speakerId={conferenceDetails.speaker}
                        roomKey={this.props.params.rid} iceServers={conferenceDetails.iceServers}
                        videoResolution={conferenceDetails.videoResolution} imHost={conferenceDetails.imHost}
                        selfVideo={false} noScrollConf={true} selfAudio={false}
                        codec={conferenceDetails.codec} transport={conferenceDetails.transport}
                        myid={this.props.loggedInData.data._id} hosticon={false} publishVideo={false}
                        sendStreams={this.receiveStreams.bind(this)} onlyPresenter={conferenceDetails.onlyPresenter}
                        attendees={conferenceDetails.attendees} streams={conferenceDetails.streams}
                        confObject={this.state.confObject} token={conferenceDetails.confData.token}
                        endCallBack={this.endCallBack.bind(this)} hostId={hostId} confHostId={confHostId} scheduleId={scheduleId}
                        confFeedback={conferenceDetails.confStatusMessage}
                        roomType={conferenceDetails.confData.roomType} shareicon={false} />
                      <AttendeesList uid={this.props.loggedInData.data._id} confObject={this.state.confObject} />
                    </div>
                  } else {
                    videoLayout = <div className={styles.tableBox}>
                      <PresenterConf role={userRole} logId={this.state.currentAttendance} users={conferenceDetails.confData.users} presenterId={conferenceDetails.presenter}
                        speakerId={conferenceDetails.speaker} roomKey={this.props.params.rid} iceServers={conferenceDetails.iceServers}
                        transport={conferenceDetails.transport} videoResolution={conferenceDetails.videoResolution} imHost={conferenceDetails.imHost}
                        selfVideo={true} codec={conferenceDetails.codec} myid={this.props.loggedInData.data._id} hosticon={this.props.loggedInData.data.guest ? false : true} publishVideo={true}
                        sendStreams={this.receiveStreams.bind(this)} onlyPresenter={conferenceDetails.onlyPresenter} attendees={conferenceDetails.attendees}
                        streams={conferenceDetails.streams} confObject={this.state.confObject} token={conferenceDetails.confData.token} endCallBack={this.endCallBack.bind(this)}
                        roomType={conferenceDetails.confData.roomType} hostId={hostId} confHostId={confHostId} scheduleId={scheduleId} slotId={slotId} confFeedback={conferenceDetails.confStatusMessage} shareicon={this.props.loggedInData.data.guest ? false : true} />
                      {/*<ScrollConf newStream={conferenceDetails.newStream} streamCount={streamCount} streams={conferenceDetails.streams} onlyPresenter={conferenceDetails.onlyPresenter} attendees={conferenceDetails.attendees} confObject={this.state.confObject} myid={this.props.loggedInData.data._id} />*/}
                      <AttendeesList uid={this.props.loggedInData.data._id} confObject={this.state.confObject} />
                    </div>
                  }
                }

                return (
                    <Row className="clearfix">
                      {(conferenceDetails.feedbackBlock == 2) ?
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
                                <h1>{conferenceDetails.confStatusMessage}</h1>
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
                              <div className="col-md-1">
                                <button type="button" className="btn btn-warning pull-right" onClick={this.hideFeedbackConf.bind(this)}>Skip</button>
                              </div>
                              <div className="col-md-2">
                                <button type="button" className="btn btn-success pull-left" onClick={this.restartConference.bind(this)}>Restart Conference</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        : ''
                      }
                      <WorkDashboard screenStream={conferenceDetails.screenStream} logId={this.state.currentAttendance} confObject={this.state.confObject} noConference={_noConference} roomKey={this.props.params.rid} uid={this.props.loggedInData.data._id}
                        role={this.props.loggedInData.data.role} features={features} isGuest={this.props.loggedInData.data.guest} />
                      {(_noConference) ? null :
                        <div className={cls_rightPane}>
                          {videoLayout}
                        </div>
                      }
                    </Row>
                );
              } else if (conferenceDetails.confStatus == 2 && businessType) {
                if (conferenceDetails && conferenceDetails.roomSuccess && conferenceDetails.confData && conferenceDetails.confData.token) {
                  return (
                      <Hangout roomKey={this.props.params.rid} logId={this.state.currentAttendance} users={conferenceDetails.confData.users} transport={conferenceDetails.transport}
                        hosticon={userRole == Roles.Student || userRole == Roles.Attendee ? false : true} videoResolution={conferenceDetails.videoResolution}
                        iceServers={conferenceDetails.iceServers} streams={conferenceDetails.streams}
                        codec={conferenceDetails.codec} confObject={this.state.confObject}
                        token={conferenceDetails.confData.token} streamCount={streamCount}
                        imHost={conferenceDetails.imHost}
                        sendStreams={this.receiveStreams.bind(this)} myid={this.props.loggedInData.data._id}
                        hostId={hostId} confHostId={confHostId} scheduleId={scheduleId} slotId={slotId} roomType={conferenceDetails.confData.roomType} isGuest={this.props.loggedInData.data.guest} hideHeader={this.hideHeader.bind(this)}
                        confFeedback={conferenceDetails.confStatusMessage} confFeedbackBlock={conferenceDetails.feedbackBlock} shareicon={userRole == Roles.Student || userRole == Roles.Attendee ? false : true} endCallBack={this.endCallBack.bind(this)} />
                  );
                } else {
                  return (
                    <div><Loading /></div>
                  );
                }
              } else {
                return (
                  <div>{/*<FormattedMessage id='no_conference_loaded' />*/}
                    <div><Loading /></div>
                  </div>
                );
              }
          } else if (conferenceDetails.confData && conferenceDetails.confData.validPackage != undefined && conferenceDetails.confData.validPackage == false) {
            return (
              <ErrorMessage message="invalid_or_expire_package" />
            );
          } else if (conferenceDetails.confData && conferenceDetails.confData.validCPLimit != undefined && conferenceDetails.confData.validCPLimit == false) {
            return (
              <ErrorMessage message="continous_user_presence_exceeded" />
            );
          } else {
            return (
              <div><Loading /></div>
            );
          }
        } else {
          return (
            <div><Loading /></div>
          );
        }
   
  }

  handleConferenceStatus(obj){
   this.props.dispatch(SetConfStatus(obj.status));
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    conferenceDetails: conferenceDetails(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

Conference.propTypes = {
  loggedInData: PropTypes.object,
  conferenceDetails: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

Conference.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Conference);
