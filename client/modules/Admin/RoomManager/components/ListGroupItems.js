import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {injectIntl, intlShape,FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
import { loggedInData } from '../../../Login/LoginReducer';
import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { browserHistory } from 'react-router';
// import SearchStudentPopup from '../modules/Admin/RoomManager/components/SearchStudentPopup';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { Roles } from '../../../../roles';

export class ListGroupItems extends Component {
  constructor(props){
    super(props);
    this.businessType = null;
    this.addStud = false;
    // this.showOrHideAddContacts = this.showOrHideAddContacts.bind(this);
    this.state = {
        showAddContacts: false
    };
  }
  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data.profile && result.data.profile.companyid && result.data.profile.companyid.businessType) {
      this.businessType = result.data.profile.companyid.businessType;
      // console.log("this.businessType--", this.businessType);
    }
  }

  addStudentPage = e=>{
    let instId = e.target.id;
    let roomId = this.props.roomId;
    // console.log("instId",instId,"   roomId",roomId);
    browserHistory.push("/admin/room/addstudent/"+roomId+'/'+instId);
  }

  
  sendUserId(listItem, e) {
  	let groupId = e.target.id;
  	let groupName = listItem.groupName;
    if (groupId && groupId != 'undefined') {
    	this.props.getUserId(groupId, groupName);
    }
  }

  render(){
    // console.log("ListgroupItem Props--", this.props.value);
    if (this.props && this.props.value) {
      let listItem = this.props.value;
      this.addStud = this.props.addStud;
      let groupId = listItem._id;
      var userId = this.props.loggedInData.data._id;
      var userRole = this.props.loggedInData.data.role;      
      
      var btnAddStudent = null;
      if(this.addStud == 'true' && ((this.businessType == 'LMS' && role == Roles.Instructor && (userId == instId || userRole == Roles.Lmsadmin)) || (this.businessType == 'Presenter' && role == Roles.Presenter && (userId == instId || userRole == Roles.Presenteradmin)))){ 
        btnAddStudent = <div className={styles.userAction1} title={this.props.intl.messages.view_students} >
          <FontAwesome name ='users' id={listItem._id} onClick={this.addStudentPage} />
        </div>
      }
      var btnRemoveUser = null;
      if(userRole == Roles.Superadmin || userRole == Roles.Admin || userRole == Roles.Lmsadmin || userRole == Roles.Instructor || userRole == Roles.Presenteradmin || userRole == Roles.Attendee) {
        btnRemoveUser = <div className={styles.userAction} title={this.props.classTitle} >
          <FontAwesome name ={this.props.classname} id={listItem._id} onClick={this.sendUserId.bind(this, listItem)} />
        </div>
      }
      return(
        <li>
          <Link className="clearfix">
            <img src="/images/profile-pics/default-group.jpg" className="pull-left" />
            <h4 className="pull-left">
            {listItem.groupName ? listItem.groupName : "-"}              
            </h4>
            {btnAddStudent}
            {btnRemoveUser}
          </Link>
        </li>
      );
    }
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    intl: state.intl,
  };
}

ListGroupItems.propTypes = {
  value: PropTypes.object,
  // intl: PropTypes.object,
  // error : PropTypes.array,
  // success : PropTypes.string,
  getUserId: PropTypes.func
};

// export default ListItem;
export default connect(mapStateToProps)(injectIntl(ListGroupItems));
