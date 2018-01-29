import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { UpdateRoom, RoomStore, getRoomData, UpdateRoomSchema, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';
import Validator from '../../../../components/Validator';

import ContainerComponent from '../../../../components/ContainerComponent';
import { editRoomSchema } from '../schema/RoomSchema';
import { roomEditSubMenu, roomNoTopicSubMenu, roomEditMainMenu } from '../schema/RoomMenu';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { loginLanguage } from '../../../Intl/IntlActions';
// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import { intlData } from '../../../Intl/IntlReducer';
import {Col, Row, Grid} from 'react-bootstrap';
var moment = require('moment');

class EditRoom extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = editRoomSchema;
    this.res = {};
    this.roomData = {};
    this.roomName = "";
    
    this.mainmenu = roomEditMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[0].action = this.view.bind(this);

    /* default set submenu without topic */
    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkMyRoom");
    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.feedbackList.bind(this);
    this.submenu.menus[3].action = this.roomConfiguration.bind(this);
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);

    this.state = {
      activeIcon : null
    }
  }

  // componentWillMount() {
  //   var roomId = this.props.params.cid;
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                       '/admin/room/edit/'+roomId)).then(res => this.setuserdata(res));
  // }
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

  componentDidMount() {
    this.setuserdata(this.props.loggedInData);    
  }
  
  setuserdata(result){
    //console.log("result === ",result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
        // uid : result.data._id,
        roomId : this.props.params.cid
      }
      this.props.dispatch(getRoomData(obj, '/admin/room/edit/'+obj.roomId)).then(res => this.setdata(res));
      this.props.dispatch(RoomStore({ uid: result.data._id }));
    }
  }

  setdata(result){
    this.roomName = result.data.roomName;
    // console.log("SETDATA----", result.data)
    this.props.dispatch(RoomStore(new DataObject(result.data)));
  }

  // Changed by jyothi for showing validation for expiry date
  save = (event) => {
    if (this.form.expiryDate && this.form.expiryDate == "") {
      this.form['expiryDate'] = moment().endOf('day').utc().toDate();
    }
    var response = Validator.validate(this.form, this.schema, null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      let data = {};
      data['_id'] = this.props.roomData.data._id;
      data['corporateId._id'] = this.props.roomData.data["corporateId._id"];
      data['corporateId.businessName'] = this.props.roomData.data["corporateId.businessName"];
      data['corporateId.id'] = this.props.roomData.data["corporateId.id"];
      data['selPackage._id'] = this.props.roomData.data["selPackage._id"];
      data['selPackage.features'] = this.props.roomData.data["selPackage.features"];
      data['selPackage.id'] = this.props.roomData.data["selPackage.id"];
      data['selPackage.packageName'] = this.props.roomData.data["selPackage.packageName"];
      data['selPackage.packageValidity'] = this.props.roomData.data["selPackage.packageValidity"];

      this.props.dispatch(UpdateRoomSchema(this.schema, data));   
    } else{
      this.setState({ activeIcon : event.currentTarget.id});
      this.form['expiryDate'] = moment(this.form['expiryDate']).endOf('day').utc().toDate();
      this.props.dispatch(UpdateRoom(this.form, this.props.params.cid)).then(res => this.setresponse(res));      
    }    
  }

  setresponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/room/view/'+this.props.params.cid);
    }else{
      this.setState({ activeIcon : null});
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  view = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  datareceive(data) {
    this.form = data;
  }

  render() {
    var bredcrumb = (
      <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li> 
            <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
          </li>
          <li>/</li>
          <li>
            <Link onClick={this.viewroom}>{this.roomName ? this.roomName : null }</Link>
          </li>
          <li>/</li>
          <li><FormattedMessage id='edit_room'/></li>
        </ul>
      </div>)
    /*if(this.props.loggedInData.data){

        this.name = this.props.loggedInData.data.firstname + ' ' + this.props.loggedInData.data.lastname;
        this.email = this.props.loggedInData.data.email;
        // console.log(strName);
    }
*/
    let clsContainerRight = `${styles.containerRight} pull-right`;

    if(this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)){
      this.roomData = this.props.roomData.data;
    }      
    /* if package have topics feature */
    if (this.roomData.selPackage && this.roomData.selPackage.features.indexOf("Topics") != -1) {
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
    }
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <ContainerComponent data={this.schema}
          submenu={this.submenu}
          topmenu={this.mainmenu}
          bredCrumb={bredcrumb}
          dataFun = {this.datareceive}
          dataobject = {this.props.roomData.data}
          activeIcon = {this.state.activeIcon}
       />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    roomData: roomData(state),
    intlData: intlData(state)
  };
}

EditRoom.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

EditRoom.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditRoom);
