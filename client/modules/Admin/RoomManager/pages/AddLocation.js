import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'; 
import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { ClearRoom } from '../RoomActions';
import style from '../../Admin.css';
import TopMenu from '../../../../components/TopMenu';
import SubMenu from '../../../../components/SubMenu';
import styles from '../../../../components/component.css';
import { roomEditSubMenu, roomEditMainMenu} from '../schema/RoomMenu';
import { roomData } from '../RoomReducer';
import { getRoomLocations, getLocationList, getinstructorStudents, saveRoomLocation, getRoomData} from '../RoomActions';
import { Roles } from '../../../../roles.js';


import {Col, Row, Grid, DropdownButton, MenuItem} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
var _ = require('lodash');

class AddLocation extends Component {
  constructor(props){
    super(props);
    
    this.mainmenu = roomEditMainMenu;
    this.mainmenu.menus[0].action = this.cancel.bind(this);
    this.mainmenu.menus[1].action = this.saveLocation.bind(this);
  
    
    this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkLocation");
    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[3].action = this.feedback.bind(this);
    // this.submenu.menus[4].action = this.listlocation.bind(this);

    this.clickedParticipant = [];
    this.state = {
      users : [],
      selectedLocation : '',
      flag : []
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
  }

  componentWillUnmount() {
    this.clickedParticipant = []
  }


  setdata(result){
    if (result && result.data && result.data._id) {
      let uid = result.data._id;
      let roomId = this.props.params.cid;
      var obj = {
        roomId : roomId
      }
      this.props.dispatch(getRoomLocations(roomId)).then((roomData) => {
        if(roomData){
          this.props.dispatch(getLocationList()).then((result) => {
            if(result){
              var roomUsers = this.props.roomData.roomLocationList.users;
              roomUsers.map((roomUsersData) => {
                if(roomUsersData.role == 13){
                  let uid = this.props.loggedInData.data._id;
                  let roomId = this.props.params.cid;
                  let instructorId = roomUsersData._id;
                  var flagArray = this.state.flag;
                  var checkInstructorVisit = flagArray.includes(instructorId);
                  if(checkInstructorVisit == true){
                    
                  }else {
                    this.getStudents(uid, roomId, instructorId);
                  }
                }
              })
              var roomLocation = this.props.roomData.roomLocationList.locations;
              if(roomLocation == null || roomLocation == undefined || roomLocation.length == 0){
                this.setState({
                  users : roomUsers,
                })    
              } else {
                
                roomLocation.map((roomLocationsObj) => {
                  roomUsers = _.pullAllWith(roomUsers, roomLocationsObj.locationParticipants, _.isEqual)
                });

                this.setState({
                  users : roomUsers,
                })
              }     
            }        
          });         
        }
      }); 
      this.props.dispatch(getRoomData(obj, ''))     
    }
  }

  
  viewroom = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  adduser = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  listtopic = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  feedback = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }


  listlocation = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listlocation/'+roomId);
  }  
  

  cancel(){ 
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listlocation/'+roomId);
  }

  saveLocation = () => {
    if(this.state.selectedLocation == undefined || this.state.selectedLocation == null || this.state.selectedLocation == ''){
      this.refs.room_container.error('Please select any of the location');
    } else if(this.clickedParticipant.length == 0) {
      this.refs.room_container.error('Please select any participant for location');
    } else {
      let locationObj = {
        locationId : this.state.selectedLocation,
        locationParticipants : this.clickedParticipant
      };
      let uid = this.props.loggedInData.data._id;
      let roomId = this.props.params.cid;
      this.props.dispatch(saveRoomLocation({locationObj,uid,roomId}))
    }
  }

  combineName(row){
    return(
      <div >{row.firstname} {row.lastname}</div>
    );
  }

  selectedOption(e){
    e.preventDefault();
    this.setState({
      selectedLocation : e.target.value
    })
  }

  selectedParticipants(e){
    let selectedParticipants = this.clickedParticipant;
    if(this.state.selectedLocation == '') {
      this.setState({
        selectedLocation : ''
      });
      this.refs.room_container.error('Please select any location first')
    } else {
      if(selectedParticipants.includes(e.target.value)){
        var index = _.indexOf(selectedParticipants, e.target.value);
        selectedParticipants.splice(index,1)
      } else{
        selectedParticipants.push(e.target.value);
      }   
      this.clickedParticipant = selectedParticipants;
    }
  }
  

  roleName(data){
    let roleObj = _.invert(Roles);
    let key = roleObj[data.role];
    if(data.role == Roles.Lmsadmin || data.role == Roles.CRMadmin || data.role == Roles.Presenteradmin) {
      key = roleObj[Roles.Admin];
    } else if (data.role == Roles.CRMuser) {
      key = roleObj[Roles.User];
    }
    return key;
  }

  getStudents(uid, roomId, instructorId){
    this.props.dispatch(getinstructorStudents({roomId, instructorId})).then((result) => {
      if(result.data == null || result.data.students.length == 0){
        var flagArray = this.state.flag;
        if(!flagArray.includes(result.instructorId)){
          flagArray.push(result.instructorId);
        };
        this.setState({
          flag : flagArray
        }) 
      } else {
        var studentArray = result.data.students;
        var usersArray = this.state.users;
        var finalArray;        
        var flagArray = this.state.flag;
        var roomLocation = this.props.roomData.roomLocationList.locations;

        if(!flagArray.includes(result.instructorId)){
          flagArray.push(result.instructorId); 
          roomLocation.map((roomLocationsObj) => {
            studentArray = _.pullAllWith(studentArray, roomLocationsObj.locationParticipants, _.isEqual);
          });
          studentArray.map((data) => {
            usersArray.push(data)
          });
        }
        this.setState({
          users : usersArray,
          flag : flagArray
        })       
      }
    })
  }


  render() {
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`; 
    let cls_inlineEditGroup = `${style.inlineEditGroup} clearfix table-responsive`;
    
    return (
      <div>
      {this.props.roomData && this.props.roomData.locationList ?
      <div className={cls_container}>        
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />  
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='room_management' /></h3>
            <div className={styles.dynamicBreadCrumb}>
              <ul>
                <li> 
                  <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
                </li>
                <li>/</li>
                <li>
                  <Link onClick={this.viewroom}>{this.props.roomData.data.roomName}</Link>
                </li>
                <li>/</li>
                <li>
                  <Link onClick={this.cancel.bind(this)}><FormattedMessage id ='course_location'/></Link>
                </li>
                <li>/</li>
                <li>
                  <FormattedMessage id ='addlocation'/>
                </li>
              </ul>
            </div>
          <TopMenu data={this.mainmenu} />
        </div>

        <div className={cls_isubmenu}>
          <SubMenu data={this.submenu} />
        </div> 
        <div className={style.midContainer}>
          <div className={style.whiteCard}>
            <Grid fluid={true}>
              <Row>
                <Col md={12}>
                  <div className={style.infoTxt}>
                    {/*<h4><FormattedMessage id='addlocation' /></h4>*/}
                    <label htmlFor="Location" className="control-label">
                      <FormattedMessage id = 'location'/>:
                    </label>
                    <div className={style.inlineEdit}>
                      {/*<DropdownButton title="Dropdown" bsStyle="tabs">
                        <MenuItem eventKey="1">Action1</MenuItem>
                        <MenuItem eventKey="2">Actiom2</MenuItem>
                      </DropdownButton>*/}
                      
                      <select onClick={this.selectedOption.bind(this)} className="form-control">
                        <option value="">{this.props.intl.messages.select_location}</option>
                        {this.props.roomData.locationList.map((data) => {
                          return <option key={data._id} value={data._id}>{data.locationName}</option>
                        })} 
                      </select> 
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  
                    {this.state.users.length >0 
                    ?
                      <div className={style.formField}>
                        <h2></h2>
                        <div className={style.txtContainer}>
                          <div className={cls_inlineEditGroup}>
                            <table className={style.tablestyle}>
                              <thead>
                                <tr>
                                  <th className={style.thStyle}></th> 
                                  <th className={style.thStyle}>Name</th>
                                  <th className={style.thStyle}>Email</th>
                                  <th className={style.thStyle}>Role</th>            
                                </tr>  
                              </thead>
                              <tbody>
                                {this.state.users.map((data) => {
                                  var ramdomNumber = Math.floor(Math.random(0,9)*100000);
                                  return(
                                    <tr key={ramdomNumber}>
                                      <td className={style.tdStyle}><input type="checkbox" value={data._id} onChange={this.selectedParticipants.bind(this)}/></td>
                                      <td className={style.tdStyle}>{this.combineName(data)}</td>
                                      <td className={style.tdStyle}>{data.email}</td>
                                      <td className={style.tdStyle}>{this.roleName(data)}</td>
                                    </tr>
                                  )                                           
                                })}
                              </tbody>
                            </table>                        
                          </div>
                        </div>
                      </div>
                    :
                      <div>
                        <p><FormattedMessage id = 'no_participants'/></p>
                      </div>
                  
                  }
                </Col>
              </Row>
            </Grid>
          </div>
        </div>             
      </div>
    :null}</div>);
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    roomData: roomData(state)   
  };
}

AddLocation.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

AddLocation.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(AddLocation);

