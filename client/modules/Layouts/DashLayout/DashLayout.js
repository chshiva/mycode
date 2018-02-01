import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Grid, Row} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import RightBar from './components/RightBar';
import ConfSettings from '../../Dashboard/components/ConfSettings';
import ConfContacts from '../../Dashboard/components/ConfContacts';
import GroupView from '../../Dashboard/components/group/GroupView';
import ConfGroups from '../../Dashboard/components/group/ConfGroups';
import ConfChats from '../../Dashboard/components/ConfChats';
import { chatData } from '../../Dashboard/components/group/ChatReducer';
import { chatNotifications } from '../../Dashboard/components/group/ChatActions';
import { conferenceDetails } from '../../Communication/ConferenceReducer';
import { SetConfStatus } from '../../Communication/ConferenceActions';
import WoogeenManager from '../../Communication/WoogeenManager';
import { workDashboardData } from '../../Dashboard/UserDashboard/components/WorkDashboardReducer';
import { broadcastNotifications } from '../../Dashboard/UserDashboard/components/broadcast/BroadcastActions';
import { broadcastData } from '../../Dashboard/UserDashboard/components/broadcast/BroadcastReducer';
import callApi from '../../../util/apiCaller';
import { setWorkDashboard } from '../../Dashboard/UserDashboard/components/WorkDashboardActions';

import { rightBar } from './RightBarReducer';
import { setRightBar } from './RightBarActions';

// import SocketHandler from '../../Communication/SocketHandler';
var _ = require('lodash');
// Import Style
import styles from './DashLayout.css';

import { loggedInData } from '../../Login/LoginReducer';

var callOnce = false;
var ConfObject;
export class DashLayout extends Component {
  constructor(props) {
    // console.log("Am once");
    super(props);
    this.confObject = new WoogeenManager();
    this.state ={
      groups : false,
      showgroup : false,
      groupdata : null,
      isRecording : false
    }
    this.fullCalendar = false;
    this.broadCast = false;
    

    this.handleConferenceStatus = this.handleConferenceStatus.bind(this);
    this.confObject.handleDashConfStatusListener(this.handleConferenceStatus);

    this.handleRoomChat = this.handleRoomChat.bind(this);
    this.confObject.handleRoomChatListener(this.handleRoomChat);

    this.getRoomNotification = this.getRoomNotification.bind(this);
    this.confObject.RoomNotificationListener(this.getRoomNotification);
    // console.log(this.props.loggedInData.status);
  }

  componentWillReceiveProps(nextProps) {
    // if(this.props.loggedInData.status && this.props.loggedInData.socketServer){
    //     if(!callOnce){
    //       callOnce = true;
    //       SocketHandler.connectServer(this.props.loggedInData.data._id, this.props.loggedInData.socketServer, this.props.loggedInData.iceServers);
    //     }
    // } 
    // if(nextProps.chatData.total){
    //   this.setState({ indChatCount : nextProps.chatData.total });
    // }   
  }

  componentDidMount() {
    if(!this.confObject.getConnectionStatus()){

    }

    if(this.props.conferenceDetails.isRecording)
      this.setRecording(this.props.conferenceDetails.isRecording)

    callApi('config-settings', 'get').then(res => {
    this.broadCast = res.broadCast;
    this.fullCalendar= res.fullCalendar});	
    this.props.dispatch(chatNotifications({chatType : 'Indi'}));
    this.props.dispatch(broadcastNotifications());
  }

  myGroups(e){
    this.setState({
      groups : !this.state.groups,
      showgroup : false
    });
  }

  groupView(e){
    this.setState({
      groups : !this.state.groups,
      showgroup : !this.state.showgroup,
      groupdata : null,
    });
  }

  showGroup(data){
    this.setState({
      groups : !this.state.groups,
      showgroup : !this.state.showgroup,
      groupdata : data
    });
  }

  setLayoutStatus(status){
   // this.props.dispatch(SetConfStatus(status));
   // console.log(status);
    let route = this.props.location.pathname.split('/');
    let pathname = route[1];

    if(this.props.workDashboardData.sync == true && this.props && this.props.conferenceDetails && this.props.conferenceDetails.imHost == true){
      let obj = {
        command : 'SYNC-CONF-STATUS',
        content : { data: {status : status, from : "Dashboard"}},
        type : 'OBJECT'
      };
      this.confObject.sendMessage(obj, 0);
    } else {
      this.props.dispatch(SetConfStatus(status));
      if (pathname != 'conf') {
        browserHistory.push("/conf/" + this.confObject.getRoomKey());
      }
    }
  }

  setActiveTab = (objEntity) => {
    //console.log("objEntity", objEntity);
    if (this.props.rightBar && this.props.rightBar.current && this.props.rightBar.current == objEntity.current) {
      this.hideCallback();
    } else {
      this.props.dispatch(setRightBar(objEntity));
    }
  }

  componentWillUnmount() {
    this.hideCallback();
  }

  hideCallback = () => {
    let obj = { current : null};
    this.props.dispatch(setRightBar(obj));
  }

  handleArrow = () => {
    let obj = { arrow : !this.props.rightBar.arrow };
    // console.log("obj ==== ",obj);
    this.props.dispatch(setRightBar(obj));
  }

  setRoomChat () {
    if(this.props.workDashboardData && this.props.workDashboardData.sync == true && this.props && this.props.conferenceDetails && this.props.conferenceDetails.imHost == true){
      let obj = {
        command : 'CHAT-CHANGE-REQ',
        content : { },
        type : 'OBJECT'
      };
      this.confObject.sendMessage(obj, 0);
    } else {
      this.handleRoomChat();
      /*let route = this.props.location.pathname.split('/');
      let pathname = route[1];
      this.props.dispatch(SetConfStatus(1));
      this.props.dispatch(setWorkDashboard({current : 'roomchat', roomKey : this.confObject.getRoomKey(), roomCount: 0, uid: this.props.loggedInData.data._id }));
      if (pathname != 'conf') {
        browserHistory.push("/conf/" + this.confObject.getRoomKey());
      }*/
    }
  }

  handleRoomChat () {
    let route = this.props.location.pathname.split('/');
    let pathname = route[1];
    this.props.dispatch(SetConfStatus(1));
    this.props.dispatch(setWorkDashboard({current : 'roomchat', roomKey : this.confObject.getRoomKey(), roomCount: 0, uid: this.props.loggedInData.data._id }));
    if (pathname != 'conf') {
      browserHistory.push("/conf/" + this.confObject.getRoomKey());
    }
  }

  setRecording(flag){
    this.setState({isRecording:flag})
  }

  // http://minutemailer.github.io/react-popup/
  
  render() {    

    //console.log(this.props)
    let clsContainer = `${styles.container} clearfix`;
    let cls_Elastic = `${styles.elasticWrapper}`;
    if (this.props && this.props.loggedInData && this.props.loggedInData.headerFlag) {
      cls_Elastic = `${styles.elasticWrapper} ${styles.mobConf}`;
    };

    if(this.props.rightBar && this.props.rightBar.current != null ){
      cls_Elastic = `${styles.elasticWrapper} ${styles.minimize}`;      
    }
    let route = this.props.location.pathname.split('/');
    let pathname = route[1];
    let isGuest = this.props.loggedInData.data.guest ? this.props.loggedInData.data.guest : false;
    return (
        <div>
          {this.props.loggedInData.data.guest != true ?
            <RightBar handleMenu={this.setActiveTab}
                  myGroups={this.myGroups.bind(this)}
                  individualCount={this.props.chatData.total}
                  menuData= {this.props.rightBar}
                  intl  = {this.props.intl}
                  role = {this.props.loggedInData.data.role}
                  guest = {isGuest}
                  headerFlag = {this.props.loggedInData.headerFlag}
                  conferenceDetails = {this.props.conferenceDetails}
                  setLayoutStatus = {this.setLayoutStatus.bind(this)}
                  broadcastCount = {this.props.broadcastData.total}
                  handleArrow={this.handleArrow}
                  fullCalendar={this.fullCalendar}
                  broadCast={this.broadCast}
                  setRoomChat={this.setRoomChat.bind(this)}
                  isRecording={this.state.isRecording}
                  setrecording = {this.setRecording.bind(this)}
                  roomChatCount={this.props.workDashboardData.roomCount}
            />
          : null}
          <section className={cls_Elastic} style={isGuest ? {"width" : "calc(100% - 0px)"} : {}}>
            {this.props.rightBar && this.props.rightBar.current == 'settings' ? <ConfSettings hideCallback={this.hideCallback} pathname = {pathname}/> : null}
            {this.props.rightBar && this.props.rightBar.current == 'contacts' ? <ConfContacts  handleMenu={this.setActiveTab} hideCallback={this.hideCallback}/> : null}
            {this.props.rightBar && this.props.rightBar.current == 'chats' ? <ConfChats handleMenu={this.setActiveTab}/> : null}
            {this.props.rightBar && this.props.rightBar.current == 'groups' ? <ConfGroups currentState={this.state} hideCallback={this.myGroups.bind(this)} callBack={this.showGroup.bind(this)} /> : null}            
            <GroupView currentState={this.state} hideCallback={this.groupView.bind(this)}  />
              <Grid fluid={true}>
               {this.props.children}
            </Grid>            
          </section>
        </div>
    );
  }

  handleConferenceStatus(obj){
    let route = this.props.location.pathname.split('/');
    let pathname = route[1];
    this.props.dispatch(SetConfStatus(obj.status));
    if (pathname != 'conf') {
      browserHistory.push("/conf/" + this.confObject.getRoomKey());
    }
  }

  //////////////////////////

  getRoomNotification(obj){
    let route = this.props.location.pathname.split('/');
    let pathname = route[1];
    if(this.props.workDashboardData.current != 'roomchat' || pathname != 'conf' || this.props.conferenceDetails.confStatus != 1){
      this.props.dispatch(setWorkDashboard({ roomCount : this.props.workDashboardData.roomCount + 1}));
    }
  }
  /////////////////////////
}

DashLayout.propTypes = {
  conferenceDetails: PropTypes.object,
  setLayoutStatus: PropTypes.func,
  loggedInData: PropTypes.object,
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  chatData : PropTypes.object,
  rightBar: PropTypes.object.isRequired,
  workDashboardData: PropTypes.object,
  broadcastData : PropTypes.object
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    loggedInData: loggedInData(store),
    conferenceDetails: conferenceDetails(store),
    chatData : chatData(store),
    rightBar : rightBar(store),
    workDashboardData : workDashboardData(store),
    broadcastData : broadcastData(store)
  };
}

export default connect(mapStateToProps)(DashLayout);
