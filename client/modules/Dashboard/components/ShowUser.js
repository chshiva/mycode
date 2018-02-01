import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin/Admin.css';
import { contactRequest } from '../UserDashboard/UserDashboardActions';
import confstyles from '../../Layouts/DashLayout/components/ConfSettings.css';
import  {ToastContainer, ToastMessage} from '../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { browserHistory } from 'react-router';

export class ShowUser extends Component {
  sendUserId(e) {
    let userId = e.target.id;
    // console.log(userId);
    if (userId && userId != 'undefined')
      this.props.getUserId(userId);
  }

  acceptrequest(e){
    let obj = {
      userId : e.currentTarget.id,
      response : contactRequest.Accept
    }
    this.props.requestResponse(obj);
  }

  rejectrequest(e){
    let obj = {
      userId : e.currentTarget.id,
      response : contactRequest.Reject
    }
    this.props.requestResponse(obj);
  }


  renderOptions(){
    if(this.props){
      let data = this.props.contactsData;
      // console.log("data === ",data);
      let user  = this.props.value;
      let index = _.findIndex(data, function(obj) { return obj._id && obj._id._id ? obj._id._id == user._id : false; });
      // console.log("index === ",index);
      if(index >= 0){
        var status = data[index].status;
        // console.log("status === ",status);
        if(status == contactRequest.Request){
          return (
            <div className={confstyles.actionBlock}>
              <span>Pending</span>
            </div>
          );
        }else if(status == contactRequest.Requested){
          return (
            <div className={confstyles.actionBlock}>
              <span className={confstyles.actionButtonBox} title="Accept" id={data[index]._id._id} onClick={this.acceptrequest.bind(this)}>
                <img src="/images/icons/green-check.png" />
              </span>
              <span className={confstyles.actionButtonBox} title="Reject" id={data[index]._id._id} onClick={this.rejectrequest.bind(this)}>
                <img src="/images/icons/red-cross.png" />
              </span>
            </div>
          );
        }else if(status == contactRequest.Accept){
          return (
            <div className={confstyles.actionBlock}>
              <span>Accepted</span>
            </div>
          );
        }else if(status == contactRequest.Reject){
          return (
            <div className={confstyles.actionBlock}>
              <span>Rejected</span>
            </div>
          );
        }
      }else{
        return (
          <div className={confstyles.actionBlock} title="add">
            <FontAwesome name ="plus" id={user._id} onClick={this.sendUserId.bind(this)} />
          </div>
        );
      }
    }else{
      /*return (
          <div className={confstyles.actionBlock} title="add">
            <FontAwesome name ="plus" id={user._id} onClick={this.sendUserId.bind(this)} />
          </div>
        );*/
    }
  }

  viewUser() {
    browserHistory.push('/profile/'+this.props.value._id)
  }

  render(){
    // console.log("ListItem--", props);
    if (this.props && this.props.value) {
      let listItem = this.props.value;
      let imgsrc = '/images/profile-pics/defaultStudent.jpg';
      if (listItem.profile && listItem.profile.profileImage)
        imgsrc = "/uploads/"+listItem.profile.profileImage;
      return(
        <li>
          <Link className="clearfix">
            <img id="viewProfile" src={imgsrc} className="pull-left" onClick={this.viewUser.bind(this)} />
            <h4 className="pull-left" >
              <span className={styles.inputAllCap} >{listItem.firstname ? listItem.firstname : "-"} {listItem.lastname ? listItem.lastname : "-"} </span>
              <p>{listItem.email ? listItem.email : "-"}</p>
            </h4>
            {this.renderOptions()}
          </Link>
        </li>
      );
    }
  }
}

ShowUser.propTypes = {
  value: PropTypes.object,
  // intl: PropTypes.object,
  // error : PropTypes.array,
  // success : PropTypes.string,
  getUserId: PropTypes.func
};

export default ShowUser;


            // <div className={styles.userAction} title="User Added">
            //   <FontAwesome name ="check" />
            // </div>
            // <div className={styles.userAction1} title="Add this user" >
            //   <FontAwesome name ="plus" id={listItem._id} onClick={this.sendUserId.bind(this)} />
            // </div>
            // <div className={styles.userAction2} title="Remove this user">
            //   <FontAwesome name ="times" value={listItem._id} />
            // </div>