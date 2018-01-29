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

import { getRoomLocations, ClearRoom, deleteRoomLocation,deleteRoomLocationParticipant, getRoomData } from '../RoomActions';
import FontAwesome from 'react-fontawesome';
import { roomData } from '../RoomReducer';
import style from '../../Admin.css';
import TopMenu from '../../../../components/TopMenu';
import SubMenu from '../../../../components/SubMenu';
import styles from '../../../../components/component.css';
import { roomEditSubMenu, roomNoTopicSubMenu, roomLocationMainMenu} from '../schema/RoomMenu';
import { loginLanguage } from '../../../Intl/IntlActions';
import { Roles } from '../../../../roles.js';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Loading from '../../../App/components/Loading';

class ListRoomLocation extends Component {
  constructor(props){
    super(props);
    this.state = { loading : true }
    this.mainmenu = roomLocationMainMenu;
    this.mainmenu.menus[0].action = this.addlocation.bind(this);
    
    /* default set submenu without topic */
    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkLocation");
    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.feedback.bind(this);
    /* commented because of no functionality, need to implement */
    // this.submenu.menus[4].action = this.listlocation.bind(this); 
    
    this.submenu.menus[3].action = this.roomConfiguration.bind(this); 
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.success != ''){
      let uid = this.props.loggedInData.data._id;
      let roomId = this.props.params.cid;
      this.props.dispatch(getRoomLocations(roomId)).then((result) => {
        if(result){
          this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
          this.props.dispatch(ClearRoom());    
        }
      })      
    }
  }

  setdata(result){
    
    let uid = result.data._id;
    let roomId = this.props.params.cid;  
    var obj ={
       roomId : roomId
     }  

    this.props.dispatch(loginLanguage(result.data, this.props.intl.setlocale));

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.roomLocationList.locations)) {
      this.setState({loading : true}); 
    } else {           
      this.setState({loading : false});
    }
    this.props.dispatch(getRoomData(obj, ''));
    this.props.dispatch(getRoomLocations(roomId)).then(res => this.setLoading());
  }

  setLoading() {
    this.forceUpdate();
    if(this.state.loading) {
      this.setState({loading : false});  
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
  

  addlocation(){  
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/addlocation/new/'+roomId);
  }

  roomConfiguration = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }

  deleteLocation(locationId){
    let roomLocationId = locationId;
    let roomId = this.props.params.cid;
    let uid = this.props.loggedInData.data._id;
    this.props.dispatch(deleteRoomLocation({roomLocationId, roomId}))     
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

  deleteLocationParticipant(participantId,locationId){
    let uid = this.props.loggedInData.data._id;
    let roomId = this.props.params.cid;
    let roomLocationId = locationId;
    let roomParticipantId = participantId;
    this.props.dispatch(deleteRoomLocationParticipant({roomId,roomLocationId,roomParticipantId}));
  }

  listAssignments = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  viewUser(id) {
    browserHistory.push('/profile/'+id)
  }

  courseReports = (e) => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }
  
  render() {

    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;   
    let loadType = 'list';
    
    /* if package have topics feature */
    if (this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)) {
      let roomData = this.props.roomData.data;
      if (roomData.selPackage && roomData.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkLocation");
        this.submenu.menus[0].action = this.viewroom.bind(this);
        this.submenu.menus[1].action = this.adduser.bind(this);
        this.submenu.menus[2].action = this.listtopic.bind(this);
        this.submenu.menus[3].action = this.feedback.bind(this);
        /* commented because of no functionality, need to implement */
        // this.submenu.menus[4].action = this.listlocation.bind(this); 
        
        this.submenu.menus[4].action = this.roomConfiguration.bind(this); 
        this.submenu.menus[5].action = this.listAssignments.bind(this);
        this.submenu.menus[6].action = this.courseReports.bind(this);
      }
    }

    return (
      <div>
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
                        <FormattedMessage id ='course_location'/>
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

            {/*Code added by - Najib, Desc - condition for adding a loader */}
              { this.state.loading?
                <div className={style.mainSpinBlock} >
                  <div className={style.innerSpinBlock} >
                    <Loading loadType = {loadType}/>
                  </div>
                </div> :
                <Grid fluid={true}>
                  <Row>
                    <Col md={12}>
                      <div className={style.infoTxt}>
                        <p><FormattedMessage id ='title_location_details'/>.</p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      {this.props.roomData && this.props.roomData.roomLocationList && this.props.roomData.roomLocationList.locations.length >0
                        ?
                        this.props.roomData.roomLocationList.locations.map((roomLocationData) => {
                          var locationId = roomLocationData.locationId._id;
                          var randomKey = Math.random(roomLocationData.locationId._id);
                            return(    
                            <div className={style.locationBlock} key={randomKey}>
                              <div className={style.locationContainer}>
                                <div className={style.locationHeader}>
                                  <h2>{roomLocationData.locationId.locationName}</h2>
                                  {this.props.loggedInData.data.role == 1
                                  ?
                                  null:
                                    <span className={style.deleteLocation} title={this.props.intl.messages.delete_this_location} onClick={this.deleteLocation.bind(this,locationId)}><button className="btn btn-xs btn-danger"><FormattedMessage id ='delete'/> <FontAwesome name="trash-o"></FontAwesome></button></span>
                                  }
                                </div>
                                <div className={style.locationBody}>
                                    <ul className="clearfix">
                                      {roomLocationData.locationParticipants.map((participantsData) => {
                                        var imgSrc = '';
                                        var participantId = participantsData._id; 
                                        if(participantsData.profile == undefined ||participantsData.profile.profileImage == undefined || participantsData.profile.profileImage == '' || participantsData.profile.profileImage == null){
                                          imgSrc = "/images/profile-pics/defaultStudent.jpg"
                                        } else {
                                          imgSrc = "/uploads/"+participantsData.profile.profileImage;
                                        }
                                        return <li key={participantsData._id}>
                                          <img src= {imgSrc} onClick={this.viewUser.bind(this, participantsData._id)} title={this.props.intl.messages.viewprofile}/>
                                          <h3><span className={style.viewUserCurser} onClick={this.viewUser.bind(this, participantsData._id)} title={this.props.intl.messages.viewprofile}>{participantsData.firstname}  {participantsData.lastname}</span>
                                            <p>{this.roleName(participantsData)}</p>
                                            {this.props.loggedInData.data.role == 1
                                              ?
                                              null:
                                              <p className={style.remove} onClick={this.deleteLocationParticipant.bind(this,participantId,locationId)}>
                                              <FormattedMessage id ='remove'/> <FontAwesome name="trash-o"></FontAwesome></p>
                                            }
                                          </h3>
                                        </li>
                                      })}
                                    </ul>
                                </div>                                              
                              </div>
                            </div>)
                          })
                        :<div><FormattedMessage id ='no_locations_yet'/></div>
                      }
                    </Col>
                  </Row>
                </Grid> }
              </div>
            </div>
          </div>   
      </div>            
    );
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

ListRoomLocation.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListRoomLocation.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListRoomLocation);

