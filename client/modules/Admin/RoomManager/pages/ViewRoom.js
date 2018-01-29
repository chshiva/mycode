import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getRoomData, UpdateRoomSchema, DeleteRoom, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import RoomView from '../components/RoomView';
import Validator from '../../../../components/Validator';
import {editRoomSchema} from '../schema/RoomSchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {roomEditSubMenu, roomNoTopicSubMenu, roomViewMainMenu} from '../schema/RoomMenu';
import { loginLanguage } from '../../../Intl/IntlActions';
// Import Style
import styles from '../../../../components/component.css';
import { intlData } from '../../../Intl/IntlReducer';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
var _ = require('lodash');

class ViewRoom extends Component {
  constructor(props){
    super(props);
    this.state = {loading : true}
    this.mainmenu = roomViewMainMenu;
    this.schema = editRoomSchema;

    this.mainmenu.menus[2].action = this.edit.bind(this);//this.save.bind(this);
    this.mainmenu.menus[1].action = this.deleteRoom.bind(this);

    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkMyRoom");

    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.feedbackList.bind(this);
    this.submenu.menus[3].action = this.roomConfiguration.bind(this);
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);
  }

  // componentWillMount() {
  //   var roomId = this.props.params.cid;
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/room/view/'+roomId)).then(res => this.setdata(res));;
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData && (nextProps.roomData.success && nextProps.roomData.success != "")) {
      this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    //console.log("this.props.roomData----", this.props.roomData.data);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var roomId = this.props.params.cid;
      let obj = { 
        // uid : result.data._id,
        roomId : roomId
      };
      if(_.isEmpty(this.props.roomData.data) || roomId != this.props.roomData.data._id) {
        this.setState({loading : true}); 
      } else {        
        this.setState({loading : false});
      }
      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
      this.props.dispatch(getRoomData(obj, '/admin/room/view/'+roomId)).then(res => this.setLoading(res)
        );
    }
  }

  setLoading(res) {  
    if(this.state.loading) {
      this.setState({loading : false})  
    }
    this.props.dispatch(ClearRoom())        
  }

  clear() {
    this.props.dispatch( ClearRoom());
  }

  edit = () => {
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateRoomSchema(response));
      var roomId = this.props.params.cid;  
      browserHistory.push('/admin/room/edit/'+roomId);
    }
  }

  deleteRoom = () => {
    var roomId = this.props.params.cid;
    var props = this.props;    
    var response = this.setresponse

    alertify.confirm(this.props.intlData.messages.warning,this.props.intlData.messages.delete_room_alert, 
      function (result) {
        if(result) {          
          let obj = {
            roomId : roomId
          }
          props.dispatch(DeleteRoom(obj, '/admin/room/view/'+roomId)).then(res => response(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel}); ;
  }

  setresponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/room/list');
    }else{
      this.refs.room_container.error(`${response.error} `, ``);
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
    // console.log("AddUserSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }
  
  feedbackList = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }

  locationList = () => {
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

  reports = (e) => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/reports/topic/'+roomId);
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
    // var t1 = '';
    // var t2 = '';
    // console.log("---------");
    // if(this.loading==true) {
    //   t1 =  moment().milliseconds();
    //   console.log("loading start");
    // }

    // if(this.loading==false) {
    //   t2 =  moment().milliseconds();
    //   console.log("diffrence Time", t2-t1);
    //   console.log("loading stopped");
    // }


    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;

    /* if package have topics feature */
    if (this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)) {
      let roomData = this.props.roomData.data;
      if (roomData.selPackage && roomData.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkMyRoom");
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

    return (
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
                <Link id="allCourses" to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
              </li>
              <li>/</li>
              <li>{this.props.roomData.data.roomName}</li>
            </ul>
          </div>
          <TopMenu data={roomViewMainMenu} />
        </div>

        <div className={cls_isubmenu}>
          <SubMenu data={this.submenu} />
        </div>
        <RoomView roomData={this.props.roomData.data} error = {this.props.roomData.error} success = {this.props.roomData.success} clear = {this.clear} Reports = {this.reports} loading = {this.state.loading}/>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    roomData : roomData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

ViewRoom.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewRoom.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewRoom);
