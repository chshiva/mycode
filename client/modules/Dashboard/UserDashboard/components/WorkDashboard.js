import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl'; 
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getConferenceTopicData} from '../UserDashboardActions';
import { dashboardData } from '../UserDashboardReducer';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, roomChatNotifications, getRoomDetails } from './WorkDashboardActions';
import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import TopicList from './TopicList';
import TopicContent from './TopicContent';
import Handraise from './handraise/Handraise';
import WhiteBoard from './WhiteBoard';
import ScreenShare from './ScreenShare';
import RoomChat from './RoomChat';
import AssignmentList from './AssignmentList';
import PollList from './PollList';
import { Roles } from  '../../../../roles';
import { rightBar } from '../../../Layouts/DashLayout/RightBarReducer';
import styles from '../../Dashboard.css';


export class WorkDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noConference : false
    }
    
    this.HandleSyncCurrent = this.HandleSyncCurrent.bind(this);
    this.props.confObject.SyncListener(this.HandleSyncCurrent);

    /*this.getRoomNotification = this.getRoomNotification.bind(this);
    this.props.confObject.RoomNotificationListener(this.getRoomNotification);*/

    this.handraiseNotification = this.handraiseNotification.bind(this);
    this.props.confObject.HandraiseNotificationListener(this.handraiseNotification);
    
    this.handraiseAnsNotification = this.handraiseAnsNotification.bind(this);
    this.props.confObject.HandraiseAnsNotificationListener(this.handraiseAnsNotification);
    this.handleScroll = this.handleScroll.bind(this);

    this.chageScroll = this.chageScroll.bind(this);
    this.props.confObject.SyncScrollListener(this.chageScroll);

    this.handleTopicSyncCallback = this.handleTopicSyncCallback.bind(this);
    this.props.confObject.TopicListener(this.handleTopicSyncCallback);

    this.handleAssignmentSyncCallback = this.handleAssignmentSyncCallback.bind(this);
    this.props.confObject.AssignmentListener(this.handleAssignmentSyncCallback);

    this.handlePollSyncCallback = this.handlePollSyncCallback.bind(this);
    this.props.confObject.PollListener(this.handlePollSyncCallback);

    this.HandleSyncSSPdf = this.HandleSyncSSPdf.bind(this);
    this.props.confObject.SyncSSPdfListener(this.HandleSyncSSPdf);

    this.handleSSNotification = this.handleSSNotification.bind(this);
    this.props.confObject.ScreenShareNotificationListener(this.handleSSNotification);
  }

  componentDidMount() {
    let obj = {
      roomKey: this.props.roomKey
    }
    this.props.dispatch(getRoomDetails(obj));
    if (this.props.workDashboardData.sync == true && this.props.workDashboardData.current == '') {
      if (this.props.features.indexOf("Topics") != -1) {
        this.props.dispatch(setWorkDashboard({current : 'topicList', topicList: true, roomKey : this.props.roomKey, uid : this.props.uid }));
        // this.props.dispatch(getConferenceTopicData(obj));
        this.props.dispatch(roomChatNotifications(this.props.roomKey));
      } else {
        this.props.dispatch(setWorkDashboard({current : 'roomchat', roomKey : this.props.roomKey, roomCount: 0, uid : this.props.uid }));
      }
    } else if (this.props.workDashboardData.sync == true) {
      this.props.dispatch(setWorkDashboard({ uid : this.props.uid, roomKey : this.props.roomKey }));
    } else if (this.props.workDashboardData.current == '') {
      if (this.props.features.indexOf("Topics") != -1) {
        this.props.dispatch(setWorkDashboard({current : 'topicList', topicList: true, roomKey : this.props.roomKey, uid : this.props.uid }));
        // this.props.dispatch(getConferenceTopicData(obj));
        this.props.dispatch(roomChatNotifications(this.props.roomKey));
      } else {
        this.props.dispatch(setWorkDashboard({current : 'roomchat', roomKey : this.props.roomKey, roomCount: 0, uid : this.props.uid }));
      }
    } /*else if(this.props.workDashboardData.current == 'topicList'){
      this.props.dispatch(getConferenceTopicData(obj));
    }*/
    
    // let that = this;
    // if (typeof(chrome) !== "undefined") {
    //   chrome.runtime.sendMessage('jckdbnkecmmpemaghimijhehobdeplmd',{getStream:false}, function (response){
    //     console.log("response === ",response);
    //     if(response != undefined)
    //       that.props.dispatch(setWorkDashboard({ScreenExtInstalled : true}));
    //   });
    // }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ noConference : nextProps.noConference });
  }

  componentWillUnmount() {
    this.props.confObject.clearWorkDashboardListener();
  }

  handlecurrent = (e) => {
    let id = e.currentTarget.id;
    if(this.props.workDashboardData.sync == true && this.props && this.props.conferenceDetails && this.props.conferenceDetails.imHost == true){
      let obj = {
        current : id, topicList : this.props.workDashboardData.topicList, topicContent : this.props.workDashboardData.topicContent, tid : this.props.workDashboardData.tid,
        conductQuestion : this.props.workDashboardData.conductQuestion, questionnaireId: this.props.workDashboardData.questionnaireId, questionnaireName:this.props.workDashboardData.questionnaireName,
        pdfView : this.props.workDashboardData.pdfView, fileId : this.props.workDashboardData.fileId,
        sync : this.props.workDashboardData.sync, assignmentList : this.props.workDashboardData.assignmentList, pollList : this.props.workDashboardData.pollList,
      }
      if (id == "handraise") {
        obj['handraiseCount'] = 0;
        obj['handraiseupdates'] = false;
      } else if (id == 'roomchat')
        obj['roomCount'] = 0;
      else if(id == 'screenshare') {
        obj['ssNotification'] = false;
        obj['showButtons'] = this.props.workDashboardData.showButtons;
      }
      this.handleSync(obj);
    } else if (this.props.workDashboardData.sync == true && this.props && this.props.conferenceDetails && this.props.conferenceDetails.imHost == false) {
      if (id == "handraise")
        this.props.dispatch(setWorkDashboard({ current : id, handraiseCount : 0, handraiseupdates : false, syncCurrent : this.props.workDashboardData.current }));
      else if (id == 'roomchat' && id == this.props.workDashboardData.syncCurrent)
        this.props.dispatch(setWorkDashboard({ current : id, roomCount : 0, syncCurrent : '' }));
      else if (id == 'screenshare' && id == this.props.workDashboardData.syncCurrent)
        this.props.dispatch(setWorkDashboard({ current : id, ssNotification : false, syncCurrent : '' }));
      else if (id == 'topicList' && id == this.props.workDashboardData.syncCurrent) {
        let setobj = {
          current : id,
          syncCurrent : ''
        };
        let workDashboardData = this.props.workDashboardData
        if (workDashboardData.topicContent == false && workDashboardData.conductQuestion == false && workDashboardData.pdfView == false) {
          setobj['topicList'] = true;
        }
        this.props.dispatch(setWorkDashboard(setobj));
      } else if (id == this.props.workDashboardData.syncCurrent)
        this.props.dispatch(setWorkDashboard({ current : id, syncCurrent : '' }));
    } else{
      if(id == "handraise")
        this.props.dispatch(setWorkDashboard({ current : id, handraiseCount : 0, handraiseupdates : false }));
      else if(id == 'roomchat')
        this.props.dispatch(setWorkDashboard({ current : id, roomCount : 0 }));
      else if(id == 'screenshare')
        this.props.dispatch(setWorkDashboard({ current : id, ssNotification : false }));
      else if (id == 'topicList') {
        let setobj = {
          current : id
        };
        let workDashboardData = this.props.workDashboardData
        if (workDashboardData.topicContent == false && workDashboardData.conductQuestion == false && workDashboardData.pdfView == false) {
          setobj['topicList'] = true;
        }
        this.props.dispatch(setWorkDashboard(setobj));
      } else {
        this.props.dispatch(setWorkDashboard({ current : id }));
      }
    }
  }

  handleScroll(event){
    if(this.props.conferenceDetails.imHost == true && this.props.workDashboardData.sync == true){
      let top = event.target.scrollTop;
      let position = event.target.scrollHeight - event.target.clientHeight;
      let percentage = top / position;
      this.handleSyncScroll({percentage : percentage, id : this.props.uid, current : this.props.workDashboardData.current});
    }    
  }

  updateSScallback = (obj) => {
    if(this.props.conferenceDetails.imHost == true || (this.props.workDashboardData.shareRequestId != "" && this.props.workDashboardData.shareRequestId == this.props.workDashboardData.uid))
      this.handleSSPdfSync(obj);
    else
      this.props.dispatch(setWorkDashboard(obj));
  }

  fileStatusCallback = (obj) => {
    this.props.dispatch(setWorkDashboard(obj));
  }

  saveWhiteBoardData = (wbData) => {
    this.props.dispatch(setWorkDashboard({whiteBoardData : wbData}));
  }

  render(){
    let cls_workArea = `pull-left ${styles.blockLeftWArea}`;
    if(this.props.rightBar.arrow)
      cls_workArea += `slideBlockLA`;
    if(this.state.noConference){
        cls_workArea = `pull-left ${styles.blockLeftWArea} ${styles.makeFull}`;
    }
    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let cls_authorsBox = `clearfix ${styles.authorsBox}`;

    // console.log("this.props.workDashboardData.roomCount", this.props.workDashboardData.roomCount);
    
// className={styles.whiteBoardContainer}
    let cls_wb = `${styles.whiteboard} hidden-xs hidden-sm`;
    let cls_wb_hidden = `${styles.hideObject} hidden-xs hidden-sm`;
    let cls_sh = `${styles.whiteboard}`;
    let cls_rc = `${styles.whiteboard}`;
    let cls_sync = `${styles.active} pull-right`;
    let cls_active_hidden = `${styles.active} hidden-xs hidden-sm`;
    let cls_screenshare = this.props.workDashboardData.ssNotification == true ? `${styles.sharingImg} clearfix` : "clearfix";    
    return (
      <div className={cls_workArea}>
        <div className={styles.workArea}>
          <div className={styles.workAreaHeader}>
            <ul className="clearfix">
              { this.props.features.indexOf("Topics") != -1 ? <li className={this.props.workDashboardData.current == 'topicList' ? styles.active : ''}><Link className="clearfix" onClick={this.handlecurrent} id="topicList"><img src="/images/black-icons/topics-black.png"/><span className={styles.blockSpan}><FormattedMessage id = 'topics'/></span></Link></li> : null}
              {(!this.state.noConference) && this.props.features.indexOf("Screen Share") != -1 ? <li className={this.props.workDashboardData.current == 'screenshare' ? styles.active : ''}><Link className={cls_screenshare} onClick={this.handlecurrent} id="screenshare"><img className={styles.sharing} src="/images/black-icons/screenshare-black.png"/><span className={styles.blockSpan}><FormattedMessage id = 'screen_share'/></span></Link></li> : null}              
              {(!this.state.noConference) && this.props.features.indexOf("Whiteboard") != -1 ? <li className={this.props.workDashboardData.current == 'whiteboard' ? cls_active_hidden : 'hidden-xs hidden-sm'}><Link className="clearfix" onClick={this.handlecurrent} id="whiteboard"><img src="/images/black-icons/whiteboard-black.png"/><span className={styles.blockSpan}><FormattedMessage id = 'whiteboard'/></span></Link></li> : null }
              {this.props.features.indexOf("Q&A") != -1 ? <li className={this.props.workDashboardData.current == 'handraise' ? styles.active : ''}><Link className="clearfix" onClick={this.handlecurrent} id="handraise"><img src="/images/black-icons/handrise-black.png"/>{this.props.workDashboardData.handraiseCount > 0 && this.props.workDashboardData.handraiseupdates == true ? 
                                                                                                                                                                                                                                                                                <span className={styles.countCircle1}>{this.props.workDashboardData.handraiseCount}+</span> 
                                                                                                                                                                                                                                                                              : (this.props.workDashboardData.handraiseCount > 0 ? 
                                                                                                                                                                                                                                                                                <span className={styles.countCircle}>{this.props.workDashboardData.handraiseCount}</span> 
                                                                                                                                                                                                                                                                                : (this.props.workDashboardData.handraiseupdates == true ? 
                                                                                                                                                                                                                                                                                  <span className={styles.countCircle}>{this.props.workDashboardData.handraiseCount}+</span> : ''
                                                                                                                                                                                                                                                                                )
                                                                                                                                                                                                                                                                              )
                                                                                                                                                                                                                                                                            }<span className={styles.blockSpan}><FormattedMessage id = 'hand_raise'/></span></Link></li> : null }
              <li className={this.props.workDashboardData.current == 'roomchat' ? styles.active : ''}><Link className="clearfix" onClick={this.handlecurrent} id="roomchat"><img src="/images/black-icons/individual-chat.png"/>{this.props.workDashboardData.roomCount > 0 ? <span className={styles.countCircle}>{this.props.workDashboardData.roomCount}</span> : null}<span className={styles.blockSpan}><FormattedMessage id = 'room_chat'/></span></Link></li>
              {this.props.role == Roles.Student ? <li className={this.props.workDashboardData.current == 'assignmentList' ? styles.active : ''}><Link className="clearfix" onClick={this.handlecurrent} id="assignmentList"><img src="/images/black-icons/black-assignments.png"/><span className={styles.blockSpan}><FormattedMessage id = 'room_assignments'/></span></Link></li> : null}
              {<li className={this.props.workDashboardData.current == 'pollList' ? styles.active : ''}><Link className="clearfix" onClick={this.handlecurrent} id="pollList"><img src="/images/black-icons/black-poll.png"/><span className={styles.blockSpan}><FormattedMessage id = 'polls'/></span></Link></li>}
              {this.props && this.props.conferenceDetails && this.props.conferenceDetails.imHost == true ? 
                <li className={this.props.workDashboardData.sync == true ? cls_sync : 'pull-right'}><Link className="clearfix" onClick={this.syncRequest} id="sync"><img src="/images/black-icons/1-35.png"/><span className={styles.blockSpan}><FormattedMessage id = 'sync'/></span></Link></li>
              : (this.props.workDashboardData.sync == true ? 
                <li className="pull-right"><Link className="clearfix"><img src="/images/black-icons/1-35.png"/></Link></li>
                :null)}
            </ul>
            {/*<div className={styles.workRoomName}>
              <p className="nametxt">{this.props.intl.messages.room_name}</p>
              <p>{this.props && this.props.conferenceDetails && this.props.conferenceDetails.confData && this.props.conferenceDetails.confData.roomName ? this.props.conferenceDetails.confData.roomName : ''}</p>
            </div>*/}
          </div>
          
          <div className={styles.workAreaBody} onScroll={this.handleScroll} ref="scrollDiv">
            {this.props.workDashboardData.current == "topicList"
            ?
            <TopicList roomName = {this.props.workDashboardData.roomName}
              syncCallback={this.handleTopicSync} roomKey={this.props.roomKey} imHost={this.props.conferenceDetails.imHost} confObject={this.props.confObject} roomId = {this.props.workDashboardData.roomId} role= {this.props.role} isGuest={this.props.isGuest} />
            : null}

            <div className={(!this.state.noConference) && this.props.workDashboardData.current == 'whiteboard' ? cls_wb : cls_wb_hidden}>
                <WhiteBoard confObject={this.props.confObject} whiteBoardData={this.props.workDashboardData.whiteBoardData} saveWhiteBoardData={this.saveWhiteBoardData} />
            </div>

            {(this.state.noConference) ? null
              : (this.props.features.indexOf("Screen Share") != -1 && (!this.state.noConference) ? 
                  <div className={this.props.workDashboardData.current == 'screenshare' ? cls_sh : styles.hideObject}>
                    <ScreenShare screenStream={this.props.screenStream} confObject={this.props.confObject} updateSS={this.updateSScallback} fileStatusCallback={this.fileStatusCallback}
                      imHost={this.props.conferenceDetails && this.props.conferenceDetails.imHost ? this.props.conferenceDetails.imHost : false} role={this.props.role} hostId={this.props.conferenceDetails && this.props.conferenceDetails.hostId ? this.props.conferenceDetails.hostId : ''}/>
                  </div> : null)}

            { this.props.workDashboardData.current == 'handraise' ?
              <Handraise uid = {this.props.workDashboardData.uid} confObject={this.props.confObject} roomKey = {this.props.workDashboardData.roomKey} noConference={this.state.noConference}/>
            : null}

            {this.props.workDashboardData.current == 'roomchat' 
              ? <RoomChat uid = {this.props.workDashboardData.uid} roomKey = {this.props.roomKey} confObject={this.props.confObject} noConference={this.state.noConference} imHost={this.props.conferenceDetails.imHost}/>
              : null
            }

            {
              this.props.role == Roles.Student
              ?
              (this.props.workDashboardData.current == "assignmentList"
              ?
              <AssignmentList roomKey={this.props.roomKey} roomName = {this.props.workDashboardData.roomName}
                syncCallback={this.handleAssignmentSync} imHost={this.props.conferenceDetails.imHost} confObject={this.props.confObject} isGuest={this.props.isGuest}  />
              : null)
              : null
            }
            {this.props.workDashboardData.current == "pollList"
            ?
            <PollList roomKey={this.props.roomKey} roomName = {this.props.workDashboardData.roomName}
              syncCallback={this.handlePollSync} imHost={this.props.conferenceDetails.imHost} confObject={this.props.confObject} roomId = {this.props.workDashboardData.roomId} role= {this.props.role} isGuest={this.props.isGuest} />
            : null}
          </div>
        </div>
      </div>    
    );
  }

  /////////////////////////////////

  handleSyncScroll = (objEntity) => {
    let obj = {
      command : 'SCROLL-SYNC-REQ',
      content : { data: objEntity },
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }

  chageScroll(obj){
    if(obj.id != this.props.uid){
      this.props.dispatch(setWorkDashboard({ current : obj.current }));
      const scrollDiv = this.refs.scrollDiv;
      let mytop = scrollDiv.scrollTop;
      let position = scrollDiv.scrollHeight - scrollDiv.clientHeight;
      let top = obj.percentage * position;
      scrollDiv.scrollTop = top;
    }
  }

  syncRequest = () => {
    let objEntity = {
        current : this.props.workDashboardData.current, topicList : this.props.workDashboardData.topicList, topicContent : this.props.workDashboardData.topicContent, tid: this.props.workDashboardData.tid,
        conductQuestion : this.props.workDashboardData.conductQuestion, questionnaireId: this.props.workDashboardData.questionnaireId, questionnaireName:this.props.workDashboardData.questionnaireName, 
        pdfView : this.props.workDashboardData.pdfView, fileId : this.props.workDashboardData.fileId,
        sync : !this.props.workDashboardData.sync, ssPdfView : this.props.workDashboardData.ssPdfView, pdfFileName : this.props.workDashboardData.pdfFileName, showButtons : this.props.workDashboardData.showButtons
      }
    /*let objEntity = this.props.workDashboardData;
    objEntity['sync'] = !this.props.workDashboardData.sync;*/
    
    let obj = {
      command : 'SYNC-REQ',
      content : { data: objEntity },
      type : 'OBJECT'
    };
    this.props.dispatch(setWorkDashboard({sync : !this.props.workDashboardData.sync}));
    this.props.confObject.sendMessage(obj, 0);
  }

  handleSync = (objEntity) => {
    let obj = {
      command : 'SYNC-REQ',
      content : { data: objEntity},
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }

  HandleSyncCurrent(obj){
    let objEntity = null;
    if(obj.current == 'handraise')
      objEntity = { sync : obj.sync, current : obj.current, handraiseCount : 0, handraiseupdates : false };
    else if(obj.current == 'roomchat')
      objEntity = { sync : obj.sync, current : obj.current, roomCount : 0 };
    else if(obj.current == 'topicList')
      objEntity = Object.assign(obj);
    else if(obj.current == 'assignmentList')
      objEntity = Object.assign(obj);
    else if(obj.current == 'pollList')
      objEntity = Object.assign(obj);
    else if(obj.current == 'screenshare'){
      objEntity = Object.assign(obj);
      objEntity["ssNotification"] = false;
      // objEntity = {sync : obj.sync, current : obj.current, ssNotification : false, showButtons : obj.showButtons};
    } else if (obj.current == 'whiteboard') {
      if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       || navigator.userAgent.match(/Windows Phone/i)
       ){
        console.log("mobile view");
        objEntity = { sync : obj.sync};
      } else {
        objEntity = { sync : obj.sync, current : obj.current };
      }
    } else {
      objEntity = { sync : obj.sync, current : obj.current };
    }
    this.props.dispatch(setWorkDashboard(objEntity));
  }

  handraiseNotification(obj){
    // console.log("obj in handraiseNotification === ", obj);
    if(this.props.workDashboardData.current != 'handraise' && obj.status == true){
      this.props.dispatch(setWorkDashboard({ handraiseCount : this.props.workDashboardData.handraiseCount + 1 }));
    } else if (this.props.workDashboardData.current != 'handraise' && obj.status == false) {

      //changes done for handraise count(Responsible : Prateek, Date : 21/08/2017)
      this.props.dispatch(setWorkDashboard({ handraiseCount : this.props.workDashboardData.handraiseCount-1}));
      // console.log("delete question");      
    }
  }

  handraiseAnsNotification(obj){
    if(this.props.workDashboardData.current != 'handraise'){
      this.props.dispatch(setWorkDashboard({ handraiseupdates : true }));
    }
  }

  handleTopicSync = (objEntity) => {
    let obj = {
      command : 'TOPIC-SYNC-REQ',
      content : { data : objEntity },
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }

  handleTopicSyncCallback = (obj) => {
    this.props.dispatch(setWorkDashboard(obj));
  }

  handleAssignmentSync = (objEntity) => {
    let obj = {
      command : 'ASSIGNMENT-SYNC-REQ',
      content : { data : objEntity },
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }

  handleAssignmentSyncCallback = (obj) => {
    this.props.dispatch(setWorkDashboard(obj));
  }

  handlePollSync = (objEntity) => {
    let obj = {
      command : 'POLL-SYNC-REQ',
      content : { data : objEntity },
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }

  handlePollSyncCallback = (obj) => {
    this.props.dispatch(setWorkDashboard(obj));
  }

  HandleSyncSSPdf(obj){
    if(this.props.workDashboardData.current != 'screenshare'){
      obj['ssNotification'] = true;
    }
    this.props.dispatch(setWorkDashboard(obj));
  }

  handleSSPdfSync = (objEntity) => {
    let obj = {
      command : 'SYNC-SS-PDF-REQ',
      content : { data: objEntity},
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }

  handleSSNotification(obj){
    if(this.props.workDashboardData.current != 'screenshare'){
      this.props.dispatch(setWorkDashboard({ssNotification : true}));
    }
  }

  /////////////////////////////////
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    dashboardData: dashboardData(state),
    conferenceDetails : conferenceDetails(state),
    workDashboardData : workDashboardData(state),
    rightBar : rightBar(state)
  };
}

WorkDashboard.contextTypes = {

};

WorkDashboard.propTypes = {
  intl: PropTypes.object,
  confObject: PropTypes.object,
  noConference: PropTypes.bool,
  screenStream: PropTypes.object,
  workDashboardData: PropTypes.object
};

export default connect(mapStateToProps)(WorkDashboard);
