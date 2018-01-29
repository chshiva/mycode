import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {injectIntl, intlShape,FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
import { loggedInData } from '../modules/Login/LoginReducer';
import styles from '../modules/Admin/Admin.css';
import  {ToastContainer, ToastMessage} from '../lib';
import { browserHistory } from 'react-router';
// import SearchStudentPopup from '../modules/Admin/RoomManager/components/SearchStudentPopup';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { Roles } from '../roles';

export class ListItem extends Component {
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

  // showOrHideAddContacts = (e) =>{
  //   console.log("clicked....!")
  //   this.setState({showAddContacts: !this.state.showAddContacts});
  // }

  // handleValue(userId){
  //   let obj = { 
  //     userId : userId,
  //     roomId : this.props.params.cid
  //   };
  //   console.log(obj);
  //   // this.props.dispatch(addRoomUser(obj)).then(res => this.setresponse(res));
  // }

  // setresponse = (response) => {
  //   if(response.status){
  //     this.refs.room_container.success(`${response.message} `, ``);
  //   }else{
  //     this.refs.room_container.error(`${response.error} `, ``);
  //   }
  // }

  sendUserId(fname, e) {
    let userId = e.target.id;
    // console.log(userId);
    if (userId && userId != 'undefined')
      this.props.getUserId(userId, fname);
  }

  viewUser() {
    browserHistory.push('/profile/'+this.props.value._id)
  }

  render(){
    // console.log("ListItem Props--", this.props);
    if (this.props && this.props.value) {
      let listItem = this.props.value;
      this.addStud = this.props.addStud;
      let fullName = listItem.firstname + " " + listItem.lastname;
      let role = this.props.value.role
      let instId = this.props.value._id;
      if(this.props.loggedInData && this.props.loggedInData.data) {
        var userId = this.props.loggedInData.data._id
        var userRole = this.props.loggedInData.data.role
      }
      let imgsrc = '/images/profile-pics/defaultStudent.jpg';
      if (listItem.profile && listItem.profile.profileImage) {
        imgsrc = "/uploads/"+listItem.profile.profileImage;
      }
      var btnAddStudent = null;
      if(this.addStud == 'true' && ((this.businessType == 'LMS' && role == Roles.Instructor && (userId == instId || userRole == Roles.Lmsadmin)) || (this.businessType == 'Presenter' && role == Roles.Presenter && (userId == instId || userRole == Roles.Presenteradmin)))){ 
        btnAddStudent = <div className={styles.userAction1} title={this.props.intl.messages.view_students} >
          <FontAwesome name ='users' id={listItem._id} onClick={this.addStudentPage} />
        </div>
      }
      var btnRemoveUser = null;
      if(userRole == Roles.Superadmin || userRole == Roles.Admin || userRole == Roles.Lmsadmin || role == Roles.Student || userRole == Roles.Presenteradmin || userRole == Roles.Attendee) {
        btnRemoveUser = <div className={styles.userAction} title={this.props.classTitle} >
          <FontAwesome name ={this.props.classname} id={listItem._id} onClick={this.sendUserId.bind(this, fullName)} />
        </div>
      }
      return(
        <li>
          <Link id="userImage" className="clearfix">
            <img src={imgsrc} className="pull-left" onClick={this.viewUser.bind(this)}/>
            <h4 className="pull-left" onClick={this.viewUser.bind(this)}>
              <span className={styles.inputAllCap}>
                {listItem.firstname ? listItem.firstname : "-"} {listItem.lastname ? listItem.lastname : "-"}
            </span>    
              <p>{listItem.email ? listItem.email : "-"}</p>
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

ListItem.propTypes = {
  value: PropTypes.object,
  // intl: PropTypes.object,
  // error : PropTypes.array,
  // success : PropTypes.string,
  getUserId: PropTypes.func
};

// export default ListItem;
export default connect(mapStateToProps)(injectIntl(ListItem));
