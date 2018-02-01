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

import { SaveRoomTopic, UpdateRoomSchema, ClearRoom, RoomTopicStore, getRoomData } from '../RoomActions';
import { roomData } from '../RoomReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import {roomTopicSchema} from '../schema/RoomSchema';
// import {roomSchema} from '../schema/RoomSchema';
import {roomEditSubMenu, roomTopicNewMainMenu} from '../schema/RoomMenu';
// Import Style
import styles from '../../Admin.css';
import style from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

var dataObject = {};

class AddTopic extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);
    
    this.schema = roomTopicSchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkRoomTopic"); 
    this.submenu = roomEditSubMenu;   
    this.mainmenu = roomTopicNewMainMenu;

    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[3].action = this.feedbackList.bind(this); 
    this.submenu.menus[4].action = this.roomConfiguration.bind(this);
    this.submenu.menus[5].action = this.listAssignments.bind(this);
    this.submenu.menus[6].action = this.courseReports.bind(this);

    this.mainmenu.menus[0].action = this.cancel.bind(this);
    this.mainmenu.menus[1].action = this.save.bind(this);

    this.state = {
      activeIcon : null
    }
    
  }

  cancel = () => {
    //console.log("AddUserSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
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

  roomConfiguration = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }
  
  courseReports = (e) => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  listAssignments = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  /*componentWillMount() {
      this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
                    '/admin/room/addtopic')).then(res => this.setdata(res));
  }*/
  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result){
    
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
        uid : result.data._id,
        roomId : this.props.params.cid
      }
      this.props.dispatch(UpdateRoomSchema(this.schema));
      this.props.dispatch(RoomTopicStore(obj));
      this.setState({ role : result.data.role });
      this.props.dispatch(getRoomData(obj,''));
      
    }
    /*this.props.dispatch(UpdateRoomSchema(this.schema));
    /*this.props.dispatch(RoomStore(obj))*/;
    //this.props.dispatch(getRoomData(obj,''));
    //this.setState({ role : result.data.role });*/
  }

  save = (event) => {
    var response = Validator.validate(this.form, this.schema, this.state.role,this.context.intl);
    //console.log('response.error.length',response.error.length)
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateRoomSchema(this.schema));
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch(SaveRoomTopic(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    //console.log('response->',response)
    if(response.status){
      this.refs.room_container.success(`${response.message} `, ``);
    }else{
      this.refs.room_container.error(`${response.error} `, ``);
    }
    this.setState({ activeIcon : null});
  }

  datareceive(data) {
    this.form = data;
  }

  render() {
    var bredcrumb = (
      <div className={style.dynamicBreadCrumb}>
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
                <Link onClick={this.listtopic}><FormattedMessage id ='topic_list'/></Link>
              </li>
              <li>/</li>
              <li>
               <FormattedMessage id='create_topic'/>
              </li>
          </ul>
        </div>
        )
    if(this.props.roomData && this.props.roomData.topicdata){
        dataObject = this.props.roomData.topicdata;
    }
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <ContainerComponent  data={this.props.roomData.schema}
          submenu={this.submenu}
          topmenu={this.mainmenu}
          bredCrumb={bredcrumb}
          dataFun = {this.datareceive}
          dataobject = {dataObject}
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

AddTopic.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

AddTopic.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};


export default connect(mapStateToProps)(AddTopic);
