import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import callApi from '../../../../util/apiCaller';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import AuthClient from '../../../../components/AuthController';
import { SaveGroupRequest, searchStudents } from '../ParticipantsGroupActions';
import styles from '../../Admin.css';
import compStyles from '../../../../components/component.css';

import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
// import { packageData } from '../PackageReducer';
var _ = require('lodash');
var dataObject = {};

class AddParticipantsGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myUsersData: {},
        addedStudent : [],
        addedStudentsIds : [],
        groupName : '',
        searchValue : '',
        groupNameError: false,
        groupParticipantError: false,   
        noDataFound : false,
        groupNotAlphaError: false ,
        dropDownEnalbled : false,    
    };
  }

  componentDidMount() {
    this.setuid(this.props.loggedInData);    
  }

  setuid(res) {
   
  }

  searchUsers(e) {
    //console.log("this.state.searchValue.length", this.state.searchValue.length);
    if(e.target.value) {
      //console.log("e.target.value", e.target.value);
      this.setState({groupParticipantError: false, noDataFound : false, dropDownEnalbled : true, searchValue: e.target.value});
      let obj = {
        input: e.target.value
      }
      //let uid = this.props.loggedInData.data._id;
      this.props.dispatch(searchStudents(obj)).then(res => this.myUsers(res))  
    } else {
      this.setState({groupParticipantError: false, noDataFound : false, dropDownEnalbled : false});
    }      
  }

  myUsers(res) {
    //console.log("myData==", res);
    if(res.data && res.data.length == 0) {
      //console.log("myDatalength==", res.data.length);
      this.setState({
        noDataFound : true
      })  
    }    
    this.setState({myUsersData: res});
  }

  handleGroupName(e) {
    e.preventDefault();
    this.setState({
      groupNameError: false,
      groupNotAlphaError: false,
      groupName : e.target.value,
      noDataFound : false
    })
  }

  addedStudent(data){
    let studentsArray = this.state.addedStudent;
    let studentIds = this.state.addedStudentsIds;
    studentIds.push(data._id)
    studentsArray.push(data);
    this.setState({
      addedStudent : studentsArray,
      addedStudentsIds : studentIds,
      groupParticipantError: false
    })
  }

  removeStudent(studentdata) {
    let studentsArray = this.state.addedStudent;
    let removeStudent = this.state.addedStudentsIds;
    let removeStudentArrayLength = studentsArray.length;
    var removeStudentIndex = _.findIndex(studentsArray,studentdata);       
    studentsArray.splice(removeStudentIndex,1);
    let idIndex = removeStudent.indexOf(studentdata._id);
    removeStudent.splice(idIndex,1);
    this.setState({
      addedStudent : studentsArray,
      addedStudentsIds : removeStudent
    })
    // console.log("removeStudentIndex", removeStudentIndex); 
    // console.log("removeStudentIndex", removeStudentIndex); 
  }

  saveGroup(e) {
    e.preventDefault();
    let groupName = this.state.groupName.trim();
    let re = new RegExp(/[^A-Za-z0-9\\s]+$/g);
    let ptrRe = re.test(groupName); 
    let studentIdArray = this.state.addedStudentsIds;
    let uid =  this.props.loggedInData.data._id;
    if((groupName == '' || groupName == undefined || groupName == null)&& (!studentIdArray || studentIdArray.length == 0)){
      //this.refs.room_container.error('Group name is required');
      this.setState({groupNameError: true, groupParticipantError: true});
    }
    else if(groupName == '' || groupName == undefined || groupName == null){
      //this.refs.room_container.error('Group name is required');
      this.setState({groupNameError: true});
    }else if(ptrRe){
      this.setState({groupNotAlphaError: true});
    } else if(!studentIdArray || studentIdArray.length == 0 ){
      //this.refs.room_container.error('Please select any of the participant before proceeding');
      this.setState({groupParticipantError: true});
    } else {
      //console.log("studentIdArray", studentIdArray);
       this.props.dispatch(SaveGroupRequest({uid,groupName,studentIdArray})).then(res=>this.savedData(res));
    }
  } 

  savedData(res) {
    if(res.status) {
      this.setState({myUsersData : {}, studentIds:[],
    studentsArray:[], addedStudent : [], addedStudentsIds : [], noDataFound : false, groupNotAlphaError: false,}) 
      this.props.callback(res);
    } else if(res.error) {
      this.refs.room_container.error(`${res.error} `, ``);
    }
  }  

  closeModel() {
    this.setState({myUsersData : {}, studentIds:[],
    studentsArray:[], addedStudent : [], addedStudentsIds : [], groupNameError: false, groupParticipantError: false, noDataFound : false, groupNotAlphaError: false}) 
    var res = {
      status : "close"
    }
    this.props.hidecallback(res);
  } 

  viewUser(id) {
    browserHistory.push('/profile/'+id)
  }

  render() {
    //console.log("this.state.dropDownEnalbled", this.state.dropDownEnalbled);
    let cls_btnSaveAssign = ` ${styles.btnSaveAssign} `;
    let cls_userChecked = `${styles.userAction} ${styles.userChecked}`;
    let listUsers = <FormattedMessage id='no_users_found' />;
    if(this.props){
      dataObject = this.props;
      // //console.log(dataObject);
    }
    
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <Modal show={dataObject.showModal} onHide={this.closeModel.bind(this)}>
          <Header closeButton>
            <Title className={styles.popHeadingAll} ><FormattedMessage id = 'add_participants_group'/></Title>
          </Header>
          <Body>
            {/*<p><FormattedMessage id = "search_assigned_to_contacts"/></p>*/}
            <form className="form-horizontal"> 
              <div className="form-group">
                <label htmlFor="inputGroupName" className="control-label col-md-3" ><FormattedMessage id ='group_name'/><span className={compStyles.mandatory}>*</span></label>
                <div className="col-md-9">
                  <input id="groupName" type="text" className="form-control" name="groupName" placeholder={this.context.intl.messages.enter_group_name} onChange={this.handleGroupName.bind(this)} maxLength={30} autoFocus='true' />
                  <label id="emptyGroupNameError" className={compStyles.errorPre} >{this.state.groupNameError?<FormattedMessage id='please_enter_group_name' />:''}</label> 
                  <label id="invalidGroupNameError" className={compStyles.errorPre} >{this.state.groupNotAlphaError?<FormattedMessage id='invalid_group_name' />:''}</label> 
                </div>  
              </div> 
              <div className="form-group">            
                <div className="col-md-12">
                  <input id="searchStudents" type="text" name="search" placeholder={this.context.intl.messages.search_participants} onChange={this.searchUsers.bind(this)} className={styles.whiteSearch} maxLength={50} /> <label className={compStyles.errorPre} >{this.state.groupParticipantError?<FormattedMessage id='please_enter_participant_name' />:''}</label>         
                  <input id="searchStudentBtn" type="" onClick={this.searchUsers.bind(this)} className={styles.whiteSearchSubmit} />
                  <span className={styles.whiteSearchIcon}>
                    <FontAwesome name="search" />
                  </span>
                </div>
              </div>                    
            </form> 
            {this.state.dropDownEnalbled ?
            <div className={styles.searchUsersListBlock}>
              <div className={styles.searchUsersListGroup}>
                <Row>
                  <Col md={12}>
                    <div className={styles.studentListGroup}>
                      <div className={styles.studentListBlock}>
                        {this.state.addedStudent && this.state.addedStudent.length>0
                        ? 
                          this.state.addedStudent.map((addedStudentsData) => {
                            let studentKey = Math.floor(Math.random(addedStudentsData._id)*10000);
                            var imgSrc = "/images/profile-pics/defaultStudent.jpg";
                            if(addedStudentsData && addedStudentsData.profile && addedStudentsData.profile.profileImage != undefined && addedStudentsData.profile.profileImage != '' && addedStudentsData.profile.profileImage != null){
                              imgSrc = "/uploads/"+addedStudentsData.profile.profileImage
                            }
                            return (<div className={styles.addStudentsBlock} key={studentKey}>         
                              <img id="viewUser" src={imgSrc} className="pull-left" onClick={this.viewUser.bind(this, addedStudentsData._id)} title={this.props.intl.messages.viewprofile}/>  
                              <span id="removeUser" className={styles.removeIcon} onClick={this.removeStudent.bind(this, addedStudentsData)}><FontAwesome name="times" /></span>
                              <p>{addedStudentsData.firstname}</p>
                            </div>)
                          })
                        :null}
                      </div> 
                      <ul>
                        {this.state.myUsersData && this.state.myUsersData.data && this.state.myUsersData.data.length > 0
                          ?
                            this.state.myUsersData.data.map((studentsData) => {
                              var imgSrc = "/images/profile-pics/defaultStudent.jpg";
                              if(studentsData && studentsData.profile && studentsData.profile.profileImage != undefined && studentsData.profile.profileImage != '' && studentsData.profile.profileImage != null){
                                imgSrc = "/uploads/"+studentsData.profile.profileImage
                              }
                              return (<li key={studentsData._id}>
                                <a className="clearfix">
                                  <img id="viewUser" src={imgSrc} className="pull-left" onClick={this.viewUser.bind(this, studentsData._id)} title={this.props.intl.messages.viewprofile}/>
                                  <h4 className="pull-left">{studentsData.firstname} {studentsData.lastname}
                                    <p>{studentsData.email}</p>
                                  </h4>
                                  <div className={styles.userAction}>
                                    {this.state.addedStudentsIds.includes(studentsData._id) == false
                                    ?
                                      <span id="addedStudent" onClick={this.addedStudent.bind(this,studentsData)}>
                                        <FontAwesome name="plus" />
                                      </span>
                                    :null}
                                  </div>
                                </a>
                              </li>)
                            })
                          :null
                        }
                      </ul>
                    { this.state.noDataFound ?              
                      <div>    
                        <p><FormattedMessage id ="no_data_found"/></p>
                      </div>                
                    :null}
                    </div>
                  </Col>
                </Row>                
              </div>
            </div>
            :null}
          </Body>
          <Footer className={styles.mainSaveAssign}>
            {/*<label className={weStyles.error}>{this.state.error}</label>*/}
            <div className={styles.blockSaveAssign} >
              <button id="closeModel" onClick={this.closeModel.bind(this)}><FormattedMessage id='cancel' /></button>
              <button id="saveGroupBtn" className={cls_btnSaveAssign} onClick={this.saveGroup.bind(this)}><FormattedMessage id='save' /></button>
            </div>
          </Footer>          
        </Modal>         
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    // packageData : packageData(state),
    loggedInData: loggedInData(state),
    intl: state.intl,
  };
}

AddParticipantsGroup.propTypes = {
  intl: PropTypes.object,
  showModal: PropTypes.bool,
  hidecallback: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

AddParticipantsGroup.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};

AddParticipantsGroup.defaultProps = { showModal: false };

export default connect(mapStateToProps)(AddParticipantsGroup);