import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { chatNotification, clearChatNotification} from './group/ChatActions';
import { loggedInData } from '../../Login/LoginReducer';
import {Col, Row, Grid} from 'react-bootstrap';
import confstyles from '../../Layouts/DashLayout/components/ConfSettings.css';
import styles from '../../Admin/Admin.css';
import { contactRequest } from '../UserDashboard/UserDashboardActions';
import SocketHandler from '../../Communication/SocketHandler';


export class ContactList extends Component {
  constructor(props) {
    super(props);
  }

  chatCB(e) {
    let userId = this.props.value;
    if (userId && userId != 'undefined'){
      this.props.chatCallback();
      let obj = {
        id : userId._id._id,
        activeData : userId._id,
        chatType : "Indi"
      }

      this.props.dispatch(clearChatNotification(obj));
    }
  }

  acceptrequest(e){
    let obj = {
      userId : e.currentTarget.id,
      response : contactRequest.Accept
    }
    this.props.requestResponse(obj);
  }

  componentDidMount() {
    //SubscribeUser('');
    // SocketHandler.subscribeStatus(this.props.value._id._id);
  }

  rejectrequest(e){
    let obj = {
      userId : e.currentTarget.id,
      response : contactRequest.Reject
    }
    this.props.requestResponse(obj);
  }

  renderOptions(){
    let cls_chatBox = `${confstyles.chatBox} ${confstyles.bgTransition}`;
    let cls_callBox = `${confstyles.callBox} ${confstyles.bgTransition}`;
    let cls_action = `${confstyles.actionBlock}`;
    let listItem = this.props.value;

    if(listItem.status == contactRequest.Requested){
      return(
          <div className={cls_action}>
            <span id="accept" className={confstyles.actionButtonBox} title={this.props.intl.messages.accept} id={listItem._id._id} onClick={this.acceptrequest.bind(this)}>
              <img src="/images/icons/green-check.png" />
            </span>
            <span id="reject" className={confstyles.actionButtonBox} title={this.props.intl.messages.reject} id={listItem._id._id} onClick={this.rejectrequest.bind(this)}>
              <img src="/images/icons/red-cross.png" />
            </span>
          </div>
        );
    }else if(listItem.status == contactRequest.Accept){
      return(
        <div className={cls_action}>
          <span className={confstyles.actionButtonBox} id={listItem._id._id} onClick={this.chatCB.bind(this)} title="Chat">
            <img src="/images/black-icons/individual-chat.png" />
            {this.props.count != null ? <span className={confstyles.indChatNotification} >{this.props.count}</span> : null}
          </span>
          {/*<span className={confstyles.actionButtonBox} id={listItem._id._id} title="Call">
                      <img src="/images/black-icons/call-phone.png" />
                    </span>*/}
        </div>
      );
    }
  }

  viewUserProfile = (uid) => {
    let url = "/profile/" + uid;
    browserHistory.push(url)
  }

  render(){
    let cls_Online = `${confstyles.listStatusCircle} ${confstyles.bgOnline}`;
    let cls_Offline = `${confstyles.listStatusCircle} ${confstyles.bgOffline}`;
    let cls_contactContainer = `${confstyles.contactContainer} clearfix`;
    // console.log("ListItem--", props);
    if (this.props && this.props.value) {
      let listItem = this.props.value;
      let userName = '';
      let fullName ='';
      if(listItem && listItem._id.firstname && listItem._id.lastname) {
        userName = listItem._id.firstname + ' ' + listItem._id.lastname;
        if(userName.length>15) {
          fullName = userName.substr(0,15) + '...'; 
        } else {
          fullName = userName;
        }        
      } else if (listItem && listItem._id.firstname && !listItem._id.lastname) {
        userName = listItem._id.firstname;
        if(userName.length>15) {
          fullName = userName.substr(0,15) + '...'; 
        } else {
          fullName = userName;
        }
      }
      let imgsrc = "/images/profile-pics/default-user.png";
      if (listItem._id.profile && listItem._id.profile.profileImage){
        imgsrc = "/uploads/"+listItem._id.profile.profileImage;
      }
      return(
        <li>
          {this.renderOptions()}
          <a id="viewprofile" onClick = {this.viewUserProfile.bind(this, listItem._id._id)} title={this.props.intl.messages.viewprofile} >
            
            <div className={cls_contactContainer}>
              <div className={confstyles.avatarBox}>
                {(listItem.status == contactRequest.Accept) ? ((this.props.online>=0) ? <div className={cls_Online}></div> : <div className={cls_Offline}></div>) : null }
                <img src={imgsrc} />
              </div>
              <div className={confstyles.contactInfoBox}>
                <h3>{fullName}
                  <p>{listItem.status == contactRequest.Request ? <FormattedMessage id='request_pending'/> : (listItem.status == contactRequest.Accept ? (<span className={confstyles.emailInChatText}>{listItem._id.email}</span>) : (listItem.status == contactRequest.Reject ? 'Rejected' : ''))}</p>
                </h3>
              </div>
            </div>
          </a>
        </li>
      );
    }
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData : loggedInData(state)
  };
}

ContactList.propTypes = {
  value: PropTypes.object,
  getUserId: PropTypes.func,
  dispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(ContactList);
