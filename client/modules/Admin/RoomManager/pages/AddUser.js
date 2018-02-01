import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { addRoomUser, getRoomData, SaveRoomUser, getRoomUserData, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import ListUserToRoom from '../components/ListUserToRoom';
import SearchPopup from '../../../../components/SearchPopup';

// import {roomSchema} from '../schema/RoomSchema';
import {roomEditSubMenu, roomNoTopicSubMenu, addUserViewMainMenu} from '../schema/RoomMenu';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';
// import styles from '../../Admin.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
var _ = require('lodash');
var dataObject = {};


class AddUser extends Component {
  constructor(props){
    super(props);
    // this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.res = {};

    this.mainmenu = addUserViewMainMenu;
    this.mainmenu.menus[0].action = this.showOrHideAddContacts.bind(this);

    /* default set submenu without topic */
    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkRoomUser");
    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.feedbackList.bind(this);
    this.submenu.menus[3].action = this.roomConfiguration.bind(this);
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);
    this.submenu.menus[6].action = this.listCertificates.bind(this);

    this.state = {
        showAddContacts: false,
        loading : false
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData && (nextProps.roomData.success && nextProps.roomData.success != "")) {
      this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
    }
  }

  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  adduser = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  listtopic = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  showOrHideAddContacts(e){
    this.setState({showAddContacts: !this.state.showAddContacts});
  }

  // componentWillMount() {
  //   var roomId = this.props.params.cid;
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/room/adduser/'+roomId)).then(res => this.setdata(res));;
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var roomId = this.props.params.cid;
      let obj = { 
        // uid : result.data._id,
        roomId : roomId
      };

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
      let that = this;
      if(_.isEmpty(this.props.roomData.data.users)) {
        that.setState({loading : false}); 
      } else {
        that.setState({loading : false});    
      }
      this.props.dispatch(getRoomData(obj, '/admin/room/adduser/'+roomId)).then(res=>this.setLoading(res));
    }
  }


//code added by- Najib, Desc - Unset the state of loader after response received from server
  setLoading(res) {
 
    //console.log("At set loading");
    this.props.dispatch(ClearRoom());
    this.forceUpdate();
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  handleValue(userId){
    let obj = { 
      userId : userId,
      roomId : this.props.params.cid
    };
    // console.log(obj);
    this.props.dispatch(addRoomUser(obj)).then(res => this.setresponse(res));
  }

  setresponse = (response) => {
    if(response.status){
      this.refs.room_container.success(`${response.message} `, ``);
    }else{
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  datareceive(data) {
    this.form = data;
  }

  feedbackList = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }

  addLocation = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listlocation/'+roomId);
  } 

  roomConfiguration = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  } 

  listAssignments = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  courseReports = (e) => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  listCertificates = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/certificates/'+roomId);
  }
  
  render() {
    
    /* if package have topics feature */
    if (this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)) {
      dataObject = this.props.roomData.data;
      if (dataObject.selPackage && dataObject.selPackage.features && dataObject.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkRoomUser");
        this.submenu.menus[0].action = this.viewroom.bind(this);
        this.submenu.menus[1].action = this.adduser.bind(this);
        this.submenu.menus[2].action = this.listtopic.bind(this);
        this.submenu.menus[3].action = this.feedbackList.bind(this);
        /* commented because of no functionality, need to implement */
        // this.submenu.menus[4].action = this.locationList.bind(this);

        this.submenu.menus[4].action = this.roomConfiguration.bind(this);
        this.submenu.menus[5].action = this.listAssignments.bind(this);
        this.submenu.menus[6].action = this.courseReports.bind(this);
        this.submenu.menus[7].action = this.listCertificates.bind(this);                
      }
    }
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    return (
      <div className={cls_container}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='room_management'/></h3>
          <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li> 
                <Link id="allCourses" to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
              </li>
              <li>/</li>
              <li>
                {this.props.roomData.data.roomName}
              </li>
            </ul>
          </div>
          <TopMenu data={addUserViewMainMenu} />
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={this.submenu} />
        </div>

        <SearchPopup showModal={this.state.showAddContacts} getUserId={this.handleValue.bind(this)} roomId={this.props.params.cid} hidecallback={this.showOrHideAddContacts.bind(this)} />
        
        <ListUserToRoom roomData={dataObject} success={this.props.roomData.success}/>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    roomData : roomData(state),
    intlData: intlData(state)
  };
}

AddUser.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

AddUser.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(AddUser);
