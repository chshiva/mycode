import React, { PropTypes, Component } from 'react';
import AuthClient from '../../../../../components/AuthController.js';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { isLoggedIn, AddUsertoContact, requestResponse } from '../../../../Login/LoginActions';
import { loggedInData } from '../../../../Login/LoginReducer';
import { conferenceDetails } from '../../../../Communication/ConferenceReducer';
import styles from '../../../../Dashboard/Dashboard.css';
import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import SocketHandler from '../../../../Communication/SocketHandler';
import { contactRequest } from '../../../../Dashboard/UserDashboard/UserDashboardActions';
import { setRightBar } from '../../../../Layouts/DashLayout/RightBarActions';
import { clearChatNotification} from '../../../../Dashboard/components/group/ChatActions';
import { browserHistory } from 'react-router';

import  {ToastContainer, ToastMessage} from '../../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

var _ = require('lodash');
import moment from 'moment';

import ViewImage from '../../components/ViewImage';


export class PersonalData extends Component {  
  constructor(props) {
    super(props);
    this.current_uid = null;
  }

  componentWillMount() {
    this.props.dispatch(isLoggedIn(AuthClient.getSession()))
  }

  goBack() {
    history.back(1)
  }

  handleConnection = () => {
    let obj = {
      userId : this.current_uid,
      from : "PERSONAL"
    };
    this.props.dispatch(AddUsertoContact(obj)).then(res => this.showresponse(res));
  }

  showresponse(response){
    let socketObj = {
      command : "ADD-CONT",
      obj : {
        uid : this.props.loggedInData.data._id,
        userId : this.current_uid
      }
    }
    SocketHandler.sendInstaMessage(socketObj, this.current_uid);
    if(response.status){
      this.refs.personal_container.success(response.message, ``);
    }else if(response.error){
      this.refs.personal_container.error(response.error, ``);
    }
  }

  setresponse(response){
    if(response.status){
      this.refs.personal_container.success(response.message, ``);
    }else if(response.error){
      this.refs.personal_container.error(response.error, ``);
    }
  }

  handleAccept = () => {
    let obj = {
      userId : this.current_uid,
      response : contactRequest.Accept,
      from : "PERSONAL"
    };
    this.props.dispatch(requestResponse(obj)).then(res => this.setresponse(res));
  }

  handleReject = () => {
    let obj = {
      userId : this.current_uid,
      response : contactRequest.Reject,
      from : "PERSONAL"
    };
    this.props.dispatch(requestResponse(obj)).then(res => this.setresponse(res));
  }

  handleMessage = () => {
    let lastname = this.props.data.lastname ? this.props.data.lastname : '';
    let obj = {
      id : this.current_uid,
      activeData : {
        _id : this.current_uid,
        firstname : this.props.data.firstname,
        lastname : lastname,
        email : this.props.data.email
      },
      chatType : "Indi"
    };
    this.props.dispatch(setRightBar({current : 'chats'}));  
    this.props.dispatch(clearChatNotification(obj));
    browserHistory.push("/dashboard");
  }

  render() {
    let cls_profileAvatarBlock = `${styles.profileAvatarBlock} clearfix`;
    let cls_connectionRequest = {
      marginTop: '16px'
    }

    var profileImagePath;
    var image = this.props.data.profile.profileImage;
    if(image == '' || image == undefined || image == null) {
      profileImagePath = '/images/profile-pics/defaultStudent.jpg';
    } else {
      profileImagePath = '/uploads/'+image;
    }

    var currentCompanyObject =  _.find(this.props.data.profile.experience.workplace, ['present', true]);
    var currentRole;
    if(currentCompanyObject != undefined) {
      var currentCompany = currentCompanyObject.company;
      currentRole = currentCompanyObject.position;
    } else {
      currentRole = this.props.data.profile.position;
    }

    var time;
    if(this.props.data.profile.experience.workplace.length > 0) {
      var totalExp = 0
      for(var i = 0; i < this.props.data.profile.experience.workplace.length; i++) {
        var data = this.props.data.profile.experience.workplace[i]
        if(this.props.data.profile.experience.workplace[i].yearTo != null) {
          var yearFrom = moment(data.yearFrom)
          var yearTo = moment(data.yearTo)
          //totalExp += yearTo.diff(yearFrom)
          var years = yearTo.diff(yearFrom, 'year');
          yearFrom.add(years, 'years');
          var months = yearTo.diff(yearFrom, 'months');       
          time = years +' ' + 'years'+' '+ months+ ' ' + 'months'; 
        } else {
          let now = moment()
          var yearFrom = moment(data.yearFrom)
          //totalExp += now.diff(yearFrom)
          var years = now.diff(yearFrom, 'year');
          yearFrom.add(years, 'years');
          var months = now.diff(yearFrom, 'months');          
          time = years +' ' + 'years' +' '+ months+ ' ' + 'months';
        }
      }

      //var minutes =  Math.floor(totalExp/60000);

      // if (minutes < 1) {
      //   time =  "just now";
      // } else if (minutes < 60) {
      //     if (minutes == 1) {
      //       time =  '( ' + timeDif + " Minute Exp )";
      //     }
      //   time =  minutes + " Minutes Exp"; 
      // } else if ( (minutes < 1440 ) && (minutes >= 60) ) {
      //     if (minutes/60 == 1) {
      //       time =  '( ' + Math.floor(minutes/60) + " Hour Exp )";   
      //     }
      //   time =  '( ' + Math.floor(minutes/60) + " Hours " + 
      //    (minutes - Math.floor(minutes/60)*60) + " Minutes Exp )";
      // } else if ( minutes >= 1440) {
      //     if (minutes/1440 == 1) {
      //       time =  '( ' + Math.floor(minutes/1440) + " Day Exp )";   
      //     }
      //   time =  '( ' + Math.floor(minutes/1440) + " Days Exp )"; 
      // } else if ( minutes >= 43200) {
      //     if (minutes/43200 == 1) {
      //       time =  '( ' + Math.floor(minutes/43200) + " Month Exp )";   
      //     }
      //   time =  '( ' + Math.floor(minutes/43200) + " Months " + 
      //     (Math.floor(minutes - 43200)/1440) + " Days Exp )";
      // } else if ( minutes >= 518400) {
      //     if (minutes/518400 == 1) {
      //       time =  '( ' + Math.floor(minutes/518400) + " Year Exp )";   
      //     }
      //   time =  '( ' + Math.floor(minutes/518400) + " Years " + 
      //     (Math.floor(minutes - 518400)/43200) + " Months Exp )";
      // }
    } else {
      time = '';
    }
    let conferenceOnlineStatus = this.props.conferenceDetails.onlineStatus;
    let userDataId = this.props.data._id;
    let userDataContacts = this.props.data.contacts;
    let contactStatus;
    let loggedInUserId = this.props.loggedInData.data._id;
    
    for(var i=0;i<userDataContacts.length;i++) {
      if(_.isEqual(userDataContacts[i]._id._id, loggedInUserId)  && 
        userDataContacts[i].status === 1 &&
        conferenceOnlineStatus.includes(userDataId) == true ) {
        contactStatus = true;
        break
      } else if(_.isEqual(userDataContacts[i]._id._id, loggedInUserId)  && 
        userDataContacts[i].status === 1 &&
        conferenceOnlineStatus.includes(userDataId) == false ){
        contactStatus = false;
        break;
      }
    }

    this.current_uid = this.props.data._id;
    let that = this;
    let connection_status = -1;
    if (this.props.data._id == this.props.loggedInData.data._id) {
      connection_status = null;
    } else {
      let index = _.findIndex(this.props.loggedInData.data.contacts, function(o) { 
        return o._id == that.current_uid; });      
      if (index > -1) {
        let obj = this.props.loggedInData.data.contacts[index];
        connection_status = obj.status;
      }
    }
    console.log(" ", connection_status);
    return (
      <div className={styles.viewIndiProfileBlock}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="personal_container"
          className="toast-top-right"
        />
        <Row>
          <Col md={12}>
            <div id="goBack" className={styles.backButtonBlock} onClick={this.goBack.bind(this)}>
              <img src="/images/black-icons/1-44.png" alt="back arrow" title={this.props.intl.messages.go_back} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <div className={cls_profileAvatarBlock}>
               <div className={styles.avatarCircle80}>
                {contactStatus == true ?
                <div className={styles.activeCircle}></div>
                :contactStatus == false?<div className={styles.inactiveCircle}></div>:null
                }
                <ViewImage srcUrl ={this.props.data.profile.profileImage} userData = {this.props.data._id} changeImage={false} isUser={true} from="PERSONAL"/>
               </div>
              <div className={styles.avatarDetails}>
                <h2>{this.props.data.firstname} {this.props.data.lastname}</h2>
                <p><span>{this.props.data.profile.gender || ''}</span></p>
                
                <p><span>{time?time+ ' ' + 'Exp':''}</span>
                { time ? 
                  <br/>
                :null}
                <span>{currentRole || ''}</span></p>
                {/* changed by Rajesh connection request only available for  active user and not guest  */}
                {(this.props.data.userStatus == "Active") && (this.props.data.guest == false) ?
                  (connection_status == contactRequest.Requested ?
                    <div className="row">
                      <div className="col-sm-2">
                        <button id="accept" className={styles.btnApplyAll} onClick={this.handleAccept}><FormattedMessage id='accept' /> <FontAwesome name="check-square"></FontAwesome></button>
                      </div>
                      <div className="col-sm-2">
                        <button id="reject" className={styles.btnApplyAll} onClick={this.handleReject}><FormattedMessage id='reject' /> <FontAwesome name="times"></FontAwesome></button>
                      </div>
                    </div>
                    : (connection_status == contactRequest.Accept ?
                      <button id="message" className={styles.btnApplyAll} style={cls_connectionRequest} onClick={this.handleMessage}><FormattedMessage id='message' /> <FontAwesome name="comment"></FontAwesome></button>
                      : (connection_status == contactRequest.Request ?
                        <p><span className={styles.requestTxtAll} ><FormattedMessage id='request_pending' /></span></p>
                        : (connection_status == -1 ?
                          <button id="connectionRequest" className={styles.btnApplyAll} style={cls_connectionRequest} onClick={this.handleConnection}><FormattedMessage id='Connection_Request' />  <FontAwesome name="paper-plane"></FontAwesome></button>
                          : null
                        )
                      )
                    )
                  )
                  : null
                }
              </div>
            </div>
            <div className={styles.profileInfoBlock}>
              <h2><FormattedMessage id='about_me' />:</h2>
              <p>{this.props.data.profile.aboutme || '--'}</p>
            </div>
          </Col>
          <Col md={5}>
             <div className={styles.profileInfoBlock}>
              <h2><FormattedMessage id='Personal_Information' />:</h2>
               <div className={styles.detailsFlexBlock}>
                 <div className={styles.detailsLabel}>
                  <p><span><FontAwesome name="envelope-o"></FontAwesome></span> <FormattedMessage id='email' /> :</p>
                 </div>
                 <div className={styles.detailsValue}>
                   <p className={styles.emailPersonalId} >{this.props.data.email || '--'}</p>
                 </div>
               </div>
               <div className={styles.detailsFlexBlock}>
                 <div className={styles.detailsLabel}>
                  <p><span><FontAwesome name="mobile"></FontAwesome></span>  <FormattedMessage id='phne' /> :</p>
                 </div>
                 <div className={styles.detailsValue}>
                   <p>{this.props.data.profile.phone[1] || '--'}</p>
                 </div>
               </div>
             </div>
             <div className={styles.profileInfoBlock}>
              <h2><FormattedMessage id='Current' />:</h2>
               <div className={styles.detailsFlexBlock}>
                 <div className={styles.detailsLabel}>
                  <p><span><FontAwesome name="building-o"></FontAwesome></span> <FormattedMessage id='work_education_company' /> :</p>
                 </div>
                 <div className={styles.detailsValueCompany}>
                   <p>{currentCompany || '--'}</p>
                 </div>
               </div>
               <div className={styles.detailsFlexBlock}>
                 <div className={styles.detailsLabel}>
                  <p><span><FontAwesome name="user"></FontAwesome></span> <FormattedMessage id='role' /> :</p>
                 </div>
                 <div className={styles.detailsValue}>
                   <p>{currentRole || '--'}</p>
                 </div>
               </div>
               <div className={styles.detailsFlexBlock}>
                  <div className={styles.detailsLabel}>
                  <p><span><FontAwesome name="user"></FontAwesome></span> <FormattedMessage id='department' /> :</p>
                  </div>
                  <div className={styles.detailsValue}>
                    <p>{this.props.data.profile.dept || '--'}</p>
                  </div>
                </div>
             </div>
          </Col>
        </Row>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    conferenceDetails: conferenceDetails(state),
  };
}

PersonalData.propTypes = {
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  conferenceDetails: PropTypes.object,
};

PersonalData.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(PersonalData));