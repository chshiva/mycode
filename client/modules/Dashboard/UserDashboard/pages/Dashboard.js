 import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';

import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import styles from '../../Dashboard.css';

import {Col, Row, Grid, Modal} from 'react-bootstrap';

import FontAwesome from 'react-fontawesome';

import Rooms from '../components/Rooms';
import Schedule from '../components/Schedule';
import Popup from 'react-popup';
import { dashboardData } from '../UserDashboardReducer';
import { getMyRooms, setMyRooms, getMyDateSchedules, clearDashboardRooms, ClearFeeadback} from '../UserDashboardActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
import WoogeenManager from '../../../Communication/WoogeenManager';
import Draggable from 'react-draggable';
import SocketHandler from '../../../Communication/SocketHandler';
import { setWorkDashboard } from '../components/WorkDashboardActions';
import { setRightBar } from '../../../Layouts/DashLayout/RightBarActions';

import InviteBox from '../../components/InviteBox';
import { Roles } from  '../../../../roles';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);
var moment = require('moment');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.confObject = new WoogeenManager();
    this.state = {
      userData : null,
      mixStream: false,
      activeDrags: 0,
      showInviteBox : false,
      roomKey : '',
      slotId : null
    }
    this.onStart = this.onStart.bind(this)
    this.onStop = this.onStop.bind(this)
  }
  
  // componentWillMount() {
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), '')).then(res => {
  //     this.setdata(res) });  
  // }


  componentWillReceiveProps(nextProps) {
    if(nextProps.dashboardData && (nextProps.dashboardData.success && nextProps.dashboardData.success != "")) {
      this.refs.dashboardcontainer.success(`${nextProps.dashboardData.success} `, ``);
      this.props.dispatch(ClearFeeadback());
    }
  }

  componentDidMount() {
    console.log("Dashboard", this.confObject.getConnectionStatus());
    this.setdata(this.props.loggedInData);
    this.props.dispatch(getMyRooms());
    
    //Check till conference is going on not!
    if(this.confObject.getConnectionStatus()){
      var that = this;
      //Subscribe Mix Stream
      this.confObject.trySubscribeMixStream(function(stream){
        console.log("Mix Stream Got", stream);
        that.setState({mixStream: true});
        that.showVideo(stream);
      })
    }
  }

  setdata(result){
    // console.log("Dashboard Data", result);
    if(result && result.data && result.data._id){
      this.props.dispatch(loginLanguage(this.props.loggedInData.data, this.props.intlData.setlocale));
      this.setState({ userData : result.data });
      result.data.contacts.forEach(function(contact) {
        SocketHandler.subscribeStatus(contact._id);
      });
    }
  }

  componentWillUnmount() {   
    this.props.dispatch(clearDashboardRooms()); 
    this.props.dispatch(setRightBar({current : null}));
  }

  
// 9949989923 sandeep reddy
  showVideo(stream){
    let _video = document.getElementById("objMixVideo");
    if(_video){
      //Create URL
      let _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
      _video.src = _streamURL;
      // _video.volume = 0;
    }
  }

  navigateBack(){
    browserHistory.push("/conf/"+this.confObject.getRoomKey());
  }

  onStart() {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }

  startConference = (link) => {
    // this.props.dispatch(setWorkDashboard({ current : "roomchat" }));
    browserHistory.push(link);
  }

  showOrHideInviteBox = (response) => {
    if(this.state.showInviteBox){
      this.setState({
        showInviteBox: !this.state.showInviteBox, roomId : null, scheduleId : null, roomKey : '', slotId : null
      });
    }else{
      this.setState({
        showInviteBox: !this.state.showInviteBox, roomId : response.roomid, scheduleId : response.scheduleid, roomKey : response.roomkey, slotId : response.slotId
      });
    }
  }

  updateRoomswithNewKey = (response) => {
    if(response){
      this.setState({ roomKey : response.link, selectedDate : moment().endOf('day').utc().toDate() });
      let obj = {
        startDate : moment(this.props.dashboardData.selectedDate).startOf('day').utc().format('x'),
        endDate : moment(this.props.dashboardData.selectedDate).endOf('day').utc().format('x')
      }
      this.props.dispatch(getMyDateSchedules(obj));
      this.props.dispatch(setMyRooms(response));
    }
  }

  showResponse(response){
    if(response.status){
      this.refs.dashboardcontainer.success(response.message, ``);
    }else if(response.error){
      console.log("error in showResponse === ",response.error);
      this.refs.dashboardcontainer.error(response.error, ``);
    }
  }

  // http://jquense.github.io/react-widgets/docs/#/?_k=4umjx4   All Widgets
  // https://github.com/onefinestay/react-daterange-picker
  // https://github.com/minutemailer/react-popup  
  
  render() {
    
    const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const hrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    let cls_mixStream = `${styles.mixStream} ${styles.hideObject}`;
    // let cls_btnSaveEdit = `btn btn-success btn-icon btn-sm`;
    // let cls_calendarInlineBlock = `${Confstyles.calendarInlineBlock} clearfix`;
    if(this.state.mixStream){
      cls_mixStream = `${styles.mixStream}`;
    }
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    // console.log("past === ",this.props.dashboardData.past);
    
    return (
      <Row>
        <InviteBox showModal={this.state.showInviteBox}
          hidecallback={this.showOrHideInviteBox.bind(this)} 
          roomId={this.state.roomId} scheduleId={this.state.scheduleId} slotId={this.state.slotId} userId={this.state.userData && this.state.userData._id ? this.state.userData._id : null}
          errorCallback={this.showResponse.bind(this)} roomKey={this.state.roomKey} getNewRooms={this.updateRoomswithNewKey} confFlag={this.confObject.getConnectionStatus()}/>
        <Col md={5}>
          <div className={styles.modDashboardCard}>
            <Rooms userData={this.state.userData} showInviteBox={this.showOrHideInviteBox} getConnection={this.confObject.getConnectionStatus()}/>
          </div>
        </Col>
        <Col md={7}>
          <div className={styles.modDashboardCard}>
            <ToastContainer
              toastMessageFactory={ToastMessageFactory}
              ref="dashboardcontainer"
              className="toast-top-right"
            />
            <Schedule invite={this.showOrHideInviteBox} date={this.state.selectedDate}
            userId={this.state.userData != null ? this.state.userData._id : ''}
            role={this.props.loggedInData.data.role} 
            startConference={this.startConference} getConnection={this.confObject.getConnectionStatus()}/>
          </div>
          { this.props.loggedInData.data.role != Roles.Student
            ?
            <Draggable handle=".handle" {...dragHandlers}>
              <div className={cls_mixStream} title={this.props.intlData.messages.drag}>
                <video className="handle" id="objMixVideo" autoPlay></video>
                <span id="backBtn" className={styles.videoBackButton} onClick={this.navigateBack.bind(this)} title={this.props.intlData.messages.back}>
                  <img src="/images/white-icons/white-expand.png" />
                </span>
              </div>
            </Draggable>
            : null
          }
        </Col>
      </Row>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dashboardData: dashboardData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

Dashboard.propTypes = {
  loggedInData: PropTypes.object,
  dashboardData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

Dashboard.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Dashboard);
