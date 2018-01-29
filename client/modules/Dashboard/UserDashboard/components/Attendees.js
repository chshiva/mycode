import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import AuthClient from '../../../../components/AuthController.js';
import styles from '../../Dashboard.css';
import { connect } from 'react-redux';
import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import { Roles } from '../../../../roles';
import { browserHistory } from 'react-router';
import { workDashboardData } from './WorkDashboardReducer';


export class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqVideoStatus : false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({reqVideoStatus : false});
  }

  requestVideo = () => {
    this.setState({reqVideoStatus : true});
    let obj = {
      command : 'REQ-VIDEO',
      content : { attendeesData : {} },
      type : 'OBJECT'
    };
    let attendeesList = this.props.conferenceDetails.attendees;
    let indexId = _.findIndex(attendeesList, { 'name':  this.props.value._id });
    this.props.confObject.sendMessage(obj, attendeesList[indexId].id);
  }

  unRequestVideo = () => {
    // this.requestVideo();
    this.setState({reqVideoStatus : true});
    let obj = {
      command : 'UN-REQ-VIDEO',
      content : { attendeesData : {} },
      type : 'OBJECT'
    };
    let attendeesList = this.props.conferenceDetails.attendees;
    let indexId = _.findIndex(attendeesList, { 'name':  this.props.value._id });
    this.props.confObject.sendMessage(obj, attendeesList[indexId].id);

    let streamList = this.props.conferenceDetails.streams;
    indexId   = _.findIndex(streamList, ['from', attendeesList[indexId].id]);

    if(indexId > 0){
      if(streamList[indexId].presenter){
        this.props.confObject.offPresenter();
      }

      if(streamList[indexId].speaker){
        this.props.confObject.offSpeaker();
      }      
    }
  }

  handleScreenShare = () => {
    
    console.log("closeScreenShare");
    // console.log("sharedStudentId === ",this.props.workDashboardData.sharedStudentId);
    // let id = this.props.workDashboardData.sharedStudentId;
    let obj = {
      command : 'UN-REQ-SHARE',
      content : { id : this.props.value._id },
      type : 'OBJECT'
    };
    let attendeesList = this.props.conferenceDetails.attendees;
    let indexId = _.findIndex(attendeesList, { 'name':  this.props.value._id });
    this.props.confObject.sendMessage(obj, attendeesList[indexId].id);
  }

  viewUser() {

    //code changed by -- Najib, link can be clickable for all users except guest   
    if(!this.props.guestStatus) {
      browserHistory.push('/profile/'+this.props.value._id)
    }    
  }

  render(){ 
    let cls_Online = `${styles.listStatusCircle} ${styles.bgOnline}`;
    let cls_Offline = `${styles.listStatusCircle} ${styles.bgOffline}`;
    let cls_guestStatus = `${styles.guestStatus} clearfix`;
    let cls_clearfix = 'clearfix';
    let imgsrc = "/images/profile-pics/default-user.png";
    let listItem = '';
    let stream_on = false;
    let haveVideo = false;
    let email = null;

    let streamList = this.props.conferenceDetails.streams;
    let attendeesList = this.props.conferenceDetails.attendees;
    let subscriberList = this.props.conferenceDetails.subStreams;



    if (this.props && this.props.value) {
      listItem = this.props.value;
      if(listItem.email) {
        if (listItem.guest) {
          let splitedEmail = listItem.email.split('guest_');
          email = splitedEmail[1];
        } else {
          email = listItem.email;
        }
      } else {
        email = '-';
      }
      if (listItem.profile && listItem.profile.profileImage){
        imgsrc = "/uploads/"+listItem.profile.profileImage;
      }
     // console.log("this.props.value.guest", this.props.value.guest); 
      if(streamList && this.props.online>=0 && streamList.length > 0 && attendeesList[this.props.online]){

        var defIndex = _.findIndex(streamList, ['from', attendeesList[this.props.online].id]);
        // console.log("Stream before Found ATTENDEE LIST", attendeesList[this.props.online], streamList);

        if(defIndex > 0){
          // console.log("Stream Found ATTENDEE LIST", listItem, streamList[defIndex], streamList[defIndex].hasVideo(), streamList[defIndex].showing);
          var subIndex = _.findIndex(subscriberList, ['from', streamList[defIndex].from]);

          if(subIndex >= 0){
            if(subscriberList[subIndex].hasVideo()/* && subscriberList[subIndex].showing*/){
              haveVideo = true;
              stream_on = true;
            }/*else if(subscriberList[subIndex].hasVideo() && (!subscriberList[subIndex].showing)){
              haveVideo = true;
              stream_on = false;
            }*/
          }else if(streamList[defIndex].hasVideo()){
            haveVideo = true;
            stream_on = false;
          }

          // Object.observe(streamList[defIndex], function(changes){
          //     console.log("Changes Observed", changes);
          // });
          // console.log(haveVideo, stream_on);
        }else {
          if (listItem._id == this.props.uid) {
            // console.log("ATT TEST",  streamList[0], streamList[0].hasVideo());
            if(streamList[0] && streamList[0].hasVideo()/* && subscriberList[subIndex].showing*/){
              haveVideo = true;
              stream_on = true;
            }
          }

          //Check with Logged In UID /// Find it in list id == logged in id
          //take 0 index of streamList and check hasVideo(), if yes haveVideo = true, stream_on = true; 
          
        }
      }
    }
    //let roleObj = _.invert(Roles);
    // let OnlineStatus = this.props.online;
    // console.log("OnlineStatus--", OnlineStatus, "userId- ", this.props.value._id);
    let roleObj = _.invert(Roles);
    let role = listItem.role;    
    let myRole = roleObj[role];
    if(role == Roles.Lmsadmin || role == Roles.CRMadmin || role == Roles.Presenteradmin) {
       myRole = roleObj[Roles.Admin];
    } else if (role == Roles.CRMuser) {
       myRole = roleObj[Roles.User];
    } else if ((role == Roles.Student || role == Roles.User) && listItem.guest) {
      myRole = 'Guest';
    }
    let imHost = this.props.conferenceDetails.imHost;
    // console.log(imHost);
    return (
      <li className={this.props.guestStatus ? cls_guestStatus : cls_clearfix}>
        <div className={styles.actionBox}>
          { (imHost && (this.props && (this.props.value._id != this.props.uid) ) )
            ?
            ( <ul className="clerafix">
                {/*<li>
                  <img src="/images/black-icons/individual-chat.png" />
                </li>*/}
                {this.props.conferenceDetails && this.props.conferenceDetails.confData && this.props.conferenceDetails.confData.roomType != 'Mix' ?
                  <li>
                    { (haveVideo && stream_on)
                      ?
                      ( (this.state.reqVideoStatus)
                            ?
                            <FontAwesome name="spinner" spin size='2x' />
                            :
                            <img id="unRequestVideo" src="/images/black-icons/video_on.png" onClick={this.unRequestVideo} />
                      )
                      : 
                      ( (haveVideo)
                        ?
                        <img src="/images/black-icons/black-video.png" />
                        :
                        ( (this.props.online>=0)
                          ? 
                          ( (this.state.reqVideoStatus)
                            ?
                            <FontAwesome name="spinner" spin size='2x' />
                            :
                            <img id="requestVideo" src="/images/black-icons/no-video.png" onClick={this.requestVideo} />
                          )  
                          : ''
                        )
                      )            
                    }
                  </li>
                : null}

                {
                  (this.props.online>=0 && attendeesList[this.props.online].screenEnable && attendeesList[this.props.online].screenEnable == true ) ?
                  <li>
                    <img id="shareScreen" src="/images/black-icons/black-screen-share.png" onClick={this.handleScreenShare} title="Remove screen share access"/>
                  </li>
                  : null
                }
              </ul>
            )
            :
            null
          }
        </div>
        {(this.props.online>=0) ? <div className={cls_Online}></div> : <div className={cls_Offline}></div>}
        <img id="viewprofile" src={imgsrc} onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile} />
        <span id="viewprofile" className={styles.name} onClick={this.viewUser.bind(this)}>
          {listItem.firstname ? listItem.firstname : ""} {listItem.lastname ? listItem.lastname : ""}
        </span>
        <span className={styles.notficationName} >
          {email} ({myRole})
        </span>
      </li>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    conferenceDetails: conferenceDetails(state),
    workDashboardData : workDashboardData(state),
    intl: state.intl
  };
}

Attendees.contextTypes = {
  router: React.PropTypes.object,
};

Attendees.propTypes = {
  value: PropTypes.object,
  conferenceDetails: PropTypes.object,
  intl: PropTypes.object,
  uid: PropTypes.string,
  confObject: PropTypes.object
};

export default connect(mapStateToProps)(Attendees);
// export default Attendees;