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
import { searchStudents, SaveGroupRequest } from '../ParticipantsGroupActions';
import styles from '../../Admin.css';
import compStyles from '../../../../components/component.css';
var _ = require('lodash');
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
        participantsIds : [],
        groupParticipantError: false,
        noDataFound : false        
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.participantData && nextProps.participantData.dataList && nextProps.participantData.dataList.participants){
      // nextProps.participantData.participants.map((obj) => {
      //   let studentIds = this.state.addedStudentsIds;
      //   studentIds.push(obj._id)
      //  this.setState({addedStudentsIds :studentIds })               
      // })
      let PartIds = [];    
      for(var i=0; i<=nextProps.participantData.dataList.participants.length; i++) {
        let studentIds = this.state.addedStudentsIds;
        if(nextProps.participantData.dataList.participants[i] && nextProps.participantData.dataList.participants[i]._id) {   

          PartIds.push(nextProps.participantData.dataList.participants[i]._id);
          this.setState({participantsIds : PartIds });   
        }       
      }
    }    
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
      this.setState({groupParticipantError: false, noDataFound : false, dropDownEnalbled : true, searchValue:e.target.value});
      let obj = {
        input: e.target.value
      }
      //let uid = this.props.loggedInData.data._id;
      this.props.dispatch(searchStudents(obj)).then(res => this.myUsers(res))  
    } else {
      this.setState({groupParticipantError: false, noDataFound : false, dropDownEnalbled : false, });
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
      groupName : e.target.value,
      noDataFound : false
    })
  }

  addedStudent(data){
    let studentsArray = this.state.addedStudent;
    let studentIds = this.state.addedStudentsIds;
    studentIds.push(data._id);
    //this.state.participantsIds.push(studentIds);
    this.state.participantsIds = _.concat(this.state.participantsIds, studentIds);
    studentsArray.push(data);
    this.setState({
      addedStudent : studentsArray,
      addedStudentsIds : studentIds,
      //participantsIds : studentIds
      groupParticipantError: false
    })
    //console.log("added student Ids ----", this.state.addedStudentsIds);
  }

  removeStudent(studentdata) {
    //console.log("START participantsIds", this.state.participantsIds);
    let studentsArray = this.state.addedStudent;
    let removeStudent = this.state.addedStudentsIds;
    //let removeStudentArrayLength = studentsArray.length;
    let removeIds = _.uniq(this.state.participantsIds);
    var removeStudentIndex = _.findIndex(studentsArray, studentdata);    
    studentsArray.splice(removeStudentIndex, 1);
    //console.log("studentsArray", studentsArray);
    let idIndex = removeStudent.indexOf(studentdata._id);    
    removeStudent.splice(idIndex, 1); 
    //console.log("removeIds", removeIds);
    // let remIndex = _.findIndex(removeIds, studentdata);
    // this.state.participantsIds.splice(remIndex, 1); 
    // console.log("remove student Ids", removeStudent);   
    // var removeIdIndex = removeIds.indexOf(studentdata._id);
    // this.state.participantsIds.splice(removeIdIndex, 1);
    //console.log("this.state.participantsIds", this.state.participantsIds);
    //this.state.participantsIds.push(removeStudent);
    let rmIndex = removeIds.indexOf(studentdata._id);
    removeIds.splice(rmIndex, 1);
    //console.log("rmIndex", rmIndex); 
    this.setState({
      addedStudent : studentsArray,
      addedStudentsIds : removeStudent,
      participantsIds : removeIds
    })
    // console.log("this.state.addedStudent", this.state.addedStudent);
    // console.log("this.state.addedStudentsIds", this.state.addedStudentsIds);

    
    //console.log("idIndex", idIndex);   
    //console.log("this.state.addedStudentsIds", this.state.addedStudentsIds);
    //console.log("this.state.participantsIds", this.state.participantsIds);
  }

  saveGroup(e) {
    e.preventDefault();
    let groupName = this.state.groupName;
    let studentIdArray = _.uniq(this.state.addedStudentsIds);
    let uid =  this.props.loggedInData.data._id;
    let _id = this.props.gid
    if(!studentIdArray || studentIdArray.length == 0 ){
      //this.refs.room_container.error('Please select any of the participants before proceeding');
      this.setState({groupParticipantError: true});  
    } else {
      //console.log("UI saving")
       this.props.dispatch(SaveGroupRequest({uid, _id, studentIdArray})).then(res=>this.savedData(res));
    }
    //console.log("studentIds in save", studentIdArray);
  } 

  savedData(res) {    
  	if(res.status) {
  		this.setState({myUsersData : {}, studentIds:[],
      studentsArray:[], addedStudent : [], addedStudentsIds : [], noDataFound : false}); 
  		this.props.responsecallback(res);
  	}
  } 

  closeModel() {
    this.setState({
      myUsersData: {},
      addedStudent : [],
      addedStudentsIds : [],
      groupName : '',
      participantsIds : [],
      groupParticipantError : false ,
      noDataFound : false       
    });    
    this.props.hidecallback();
  } 

  viewUser(id) {
    browserHistory.push('/profile/'+id)
  }

  render() {
    ////console.log("data-----", this.props.participantData.dataList.participants);
    //console.log("stud ids", this.state.participantsIds);
    let cls_btnSaveAssign = ` ${styles.btnSaveAssign} `;
    let cls_userChecked = `${styles.userAction} ${styles.userChecked}`;
    let listUsers = <FormattedMessage id='no_users_found' />;
    if(this.props){
      dataObject = this.props;      
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
            <Title  className={styles.popHeadingAll} ><FormattedMessage id = 'add_participants_group'/></Title>
          </Header>
          <Body>
            {/*<p><FormattedMessage id = "search_assigned_to_contacts"/></p>*/}
            <form className="form-horizontal"> 
              <div className="form-group">
                <div className="col-md-3">
                <label htmlFor="inputGroupName" className="control-label" ><FormattedMessage id ='group_name'/></label>
                </div>
                <div className="col-md-6">
                  <p>{dataObject.groupName}</p>
                </div>	
              </div> 
              <div className="form-group">            
                <div className="col-md-12">
                  <input id="searchParticipants" type="text" name="search" placeholder={this.context.intl.messages.search_participants} onChange={this.searchUsers.bind(this)} className={styles.whiteSearch} maxLength={50} autoFocus='true' />       
                  <input id="searchUserBtn" type="" onClick={this.searchUsers.bind(this)} className={styles.whiteSearchSubmit} />
                  <label id="groupParticipantError" className={compStyles.errorPre} >{this.state.groupParticipantError?<FormattedMessage id='please_enter_participant_name'/>:''}</label>
                  <span className={styles.whiteSearchIcon}>
                    <FontAwesome name="search" />
                  </span>
                </div>
              </div>                    
            </form>          
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
                                    {this.state.participantsIds.includes(studentsData._id) == false
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
                    </div>
                    { this.state.noDataFound ?              
                      <div>
                        <div>
                          <h2>
                            <FontAwesome name="frown-o" />
                          </h2>
                          <p><FormattedMessage id ="no_data_found"/></p>
                        </div>
                      </div>                
                    :null}
                  </Col>
                </Row>
              </div>
            </div>
          </Body>
          <Footer className={styles.mainSaveAssign}>
            {/*<label className={weStyles.error}>{this.state.error}</label>*/}
            <div className={styles.blockSaveAssign} >
              <button id="closeModel" onClick={this.closeModel.bind(this)}><FormattedMessage id='cancel' /></button>
              <button id="saveGroup" className={cls_btnSaveAssign} onClick={this.saveGroup.bind(this)}><FormattedMessage id='save' /></button>
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
