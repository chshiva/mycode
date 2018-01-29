import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import AuthClient from '../../../../components/AuthController.js';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';

import styles from '../../Dashboard.css';
import { RegenerateLink, ConformRegenarate } from '../UserDashboardActions';
import { setCodec } from '../../../Communication/ConferenceActions';
import CopyToClipboard from 'react-copy-to-clipboard';
import InviteBox from '../../components/InviteBox';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import { browserHistory } from 'react-router';
var moment = require('moment');
import { Roles } from '../../../../roles';

export class RoomOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showInviteBox: false
    }
    this.cls_lnkBox = `${styles.linkColor} ${styles.lnkBox}`;
  }

  /*checkValidity = (data) => {
    let expdate = moment(data.selPackage.packageValidity).startOf('day');
    let now = moment().startOf('day'); 
    if(+expdate < +now)
      this.cls_lnkBox = `${styles.linkColor} ${styles.lnkBox} ${styles.lineThrough}`;
    else
      this.cls_lnkBox = `${styles.linkColor} ${styles.lnkBox}`;
  }*/

  /*regenerateLink = () => {
    if(this.props.roomData){
      let obj = {
        roomId : this.props.roomData._id,
        date : moment().utc().toDate()
      }
      RegenerateLink(obj).then(res => {
        //console.log("response === ",res);
        if(res.status){
          this.props.getNewRooms(res);
          this.refs.roomoptions_container.success(res.message, ``);
        }else{
          console.log("error == ",res.error);
          if(res.errorCode == 810){
            var props = this.props;    
            var response = this.setResponse;
            alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.generate_meeting_alert, 
              function (result) {
                if(result) {          
                  ConformRegenarate(obj).then(res => response(res));
                }
              },
              function() {

              }
            ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); 
          }else
            this.refs.roomoptions_container.error(res.error, ``);
        }
      });
    }
  }*/

  /*setResponse = (response) => {
    if(response.status){
      this.props.getNewRooms(response);
      this.refs.roomoptions_container.success(response.message, ``);
    }else{
      console.log("error === ",response.error);
      this.refs.roomoptions_container.error(response.error, ``);
    }
  }*/

  //changedBy: pranathi, disc: showing copied message in toaster
  copyLink = () => {
    this.refs.roomoptions_container.success(" Link Copied. ", ``);
  }

  showInviteBox(){
    let obj = {
      roomid : this.props.roomData._id,
      scheduleid : null,
      roomkey : this.props.roomData.roomKey
    }
    this.props.invite(obj);
  }

  showResponse(response){
    if(response.status){
      this.refs.roomoptions_container.success(response.message, ``);
    }else if(response.err){
      console.log("error ==== ",response.err);
      this.refs.roomoptions_container.err(response.err, ``);
    }
  }

  /*startConference = () => {
    console.log("link === ",this.state.key);
    if (typeof window !== 'undefined' && this.state.key.indexOf('http') > -1){
      window.location = this.state.key
    } else {
      browserHistory.push(this.state.key);
    // }
  }*/

  getNewRooms = (response) => {
    console.log("response === ", response);
    this.props.getNewRooms(response);
  }

  handleAssignment = (event) => {
    let link = event.currentTarget.id;
    this.props.handleAssignment(link);
  }

  render(){
    if (this.props.roomData) {
      let guestUrl = this.props.roomData.roomKey.split("/conf/");
      let tmpRoomKey = guestUrl[1];
      guestUrl[1] = "/conf/guest/";
      guestUrl[2] = tmpRoomKey;      
      guestUrl = guestUrl.join("") ? guestUrl.join("") : "no link";

      let cls_roomInfoDetail = `${styles.roomInfoDetaile} hidden-xs hidden-sm`;
      let cls_clearFix_m = `clearfix hidden-xs hidden-sm`;
      let cls_inviteAction = `${styles.inviteActions} clearfix`;
      let cls_rightActionBlock = `${styles.rightActionBlock} pull-right`;
      let cls_actionBlock = `${styles.actionBlock} pull-left`;
      let openMail = 'mailto:?Subject=Conference Link&body=Conference link is :: '+guestUrl;
      let usersLink = '/admin/room/adduser/' + this.props.roomData._id;
      let topicLink = '/admin/room/listtopic/' + this.props.roomData._id;
      let assignmentLink = '/admin/room/assignments/' + this.props.roomData._id;
      let questionnaireLink = '/admin/questionnaire/list';
      let attendanceLink = '/course/attendance/'+this.props.roomData._id;
      return (
        <div className='clearfix'>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="roomoptions_container"
            className="toast-top-right"
           />
           
          <div className={styles.roomLinkTxtBlock}>
          </div>
          
          <div className={cls_actionBlock}>
            {this.props.roomData.roomKey && this.props.role != Roles.Student &&  this.props.role != Roles.Attendee ?
              <ul>
                <li>
                  <Link id="copy" title={this.props.intl.messages.copy_this_link}>
                    <div className={styles.actionIcon}>
                      <CopyToClipboard text={guestUrl}   onCopy={this.copyLink}>
                        <img src="/images/black-icons/black-copy.png"  alt="copy-icon"/>
                      </CopyToClipboard>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link id="shareLink" title={this.props.intl.messages.share_Link} onClick={this.showInviteBox.bind(this)}>
                    <div className={styles.actionIcon}>
                      <img src="/images/black-icons/black-share.png"  alt="share-icon"/>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link id="openMail" to={openMail} target="_top" title={this.props.intl.messages.open_mail_client}>
                    <div className={styles.actionIcon}>
                      <img src="/images/black-icons/black-mailclient.png"  alt="mailclient-icon"/>
                    </div>
                  </Link>
                </li>
              </ul>
            : null}
          </div>
          <div className={cls_rightActionBlock}>
            <ul>
            {this.props.userId == this.props.roomData.createdBy || this.props.role == Roles.Superadmin || this.props.role == Roles.Admin || this.props.role == Roles.Lmsadmin || this.props.role == Roles.CRMadmin || this.props.role == Roles.Presenteradmin ?
              <li>
                <Link id="addParticipants" to={usersLink} title={this.props.intl.messages.add_participants}>
                  <div className={styles.actionIcon}>
                    <img src="/images/black-icons/black-manage-user.png"  alt="manage-user-icon"/>
                  </div>
                </Link>
              </li>
            : null}
            { this.props.roomData.selPackage.features.indexOf("Topics") != -1 && (this.props.role == Roles.Superadmin || this.props.role == Roles.Admin || this.props.role == Roles.Lmsadmin || this.props.role == Roles.Instructor || this.props.role == Roles.CRMadmin || this.props.role == Roles.Presenteradmin || this.props.role == Roles.Presenter) ?
              <li>
                <Link id="addTopic" to={topicLink} title={this.props.intl.messages.add_topics}>
                  <div className={styles.actionIcon}>
                    <img src="/images/black-icons/black-topics.png"  alt="manage-topics-icon"/>
                  </div>
                </Link>
              </li>
            : null}
            {this.props.roomData.selPackage.features.indexOf("Topics") != -1 && (this.props.role == Roles.Superadmin || this.props.role == Roles.Admin || this.props.role == Roles.Lmsadmin || this.props.role == Roles.Instructor || this.props.role == Roles.CRMadmin || this.props.role == Roles.Presenteradmin || this.props.role == Roles.Presenter) ?
              <li>
                <Link id="questionnaireLink" to={questionnaireLink} title={this.props.intl.messages.manage_questionnaire}>
                  <div className={styles.actionIcon}>
                    <img src="/images/black-icons/black-questionnaire.png"  alt="manage-questionnaire-icon"/>
                  </div>
                </Link>
              </li>
            : null}
            {this.props.roomData.selPackage.features.indexOf("Topics") != -1 && (this.props.role == Roles.Instructor || this.props.role == Roles.Presenter) ?
              <li>
                <Link id="assignmentLink" to={assignmentLink} title={this.props.intl.messages.manage_assignments}>
                  <div className={styles.actionIcon}>
                    <img src="/images/black-icons/black-assignments.png"  alt="manage-assignments-icon"/>
                  </div>
                </Link>
              </li>
            : null}
            {this.props.role == Roles.Student ?
              <li>
                <Link id="viewAttendance" to={attendanceLink} title={this.props.intl.messages.view_attendance}>
                  <div className={styles.actionIcon}>
                    <img src="/images/black-icons/black-view-attendance.png"  alt="view-attendance-icon"/>
                  </div>
                </Link>
              </li>
            : null}
            {this.props.roomData.selPackage.features.indexOf("Topics") != -1 && (this.props.role == Roles.Student) ?
              <li>
                <Link id="manageAssignments" title={this.props.intl.messages.manage_assignments} id={this.props.roomData.roomKey} onClick={this.handleAssignment}>
                  <div className={styles.actionIcon}>
                    <img src="/images/black-icons/black-assignments.png"  alt="manage-assignments-icon"/>
                  </div>
                </Link>
              </li>
            : null}
            </ul>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

RoomOptions.contextTypes = {
  router: React.PropTypes.object,
};

RoomOptions.propTypes = {
  intl: intlShape.isRequired,
  roomData: PropTypes.object,
  getNewRooms : PropTypes.func,
};

// export default connect(mapStateToProps)(Invite);
export default injectIntl(RoomOptions);


/*<li>
                <Link to="admin/room/new" title={this.props.intl.messages.create_new_room}>
                  <div className={styles.actionIcon}>
                    <img src="/images/black-icons/black-manage-room.png"  alt="manage-room-icon"/>
                  </div>
                </Link>
              </li>*/

/*<InviteBox showModal={this.state.showInviteBox}
                hidecallback={this.showOrHideInviteBox.bind(this)} 
                roomId={this.props.roomData ? this.props.roomData._id : null} scheduleId={null} userId={this.props.userId}
                errorCallback={this.showResponse.bind(this)} roomKey={this.props.roomData.roomKey} getNewRooms={this.getNewRooms}/>*/
