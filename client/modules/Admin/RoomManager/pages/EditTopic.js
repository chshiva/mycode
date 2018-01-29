import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { SaveRoomTopic, RoomTopicStore, getRoomTopicData, UpdateRoomSchema, ClearRoom, getRoomData} from '../RoomActions';
import { roomData } from '../RoomReducer';
import Validator from '../../../../components/Validator';

import ContainerComponent from '../../../../components/ContainerComponent';
import { roomTopicSchema } from '../schema/RoomSchema';
import { roomEditSubMenu, roomEditTopicNewMainMenu } from '../schema/RoomMenu';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { loginLanguage } from '../../../Intl/IntlActions';
// Import Style
import styles from '../../Admin.css';
import style from '../../../../components/component.css';
import { intlData } from '../../../Intl/IntlReducer';
import {Col, Row, Grid} from 'react-bootstrap';


class EditTopic extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = roomTopicSchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkRoomTopic");
    this.mainmenu = roomEditTopicNewMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);
    this.mainmenu.menus[0].action = this.view.bind(this);

    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[3].action = this.feedbackList.bind(this); 
    this.submenu.menus[4].action = this.roomConfiguration.bind(this);
    this.submenu.menus[5].action = this.listAssignments.bind(this);
    this.submenu.menus[6].action = this.courseReports.bind(this);

    this.state = {
      activeIcon : null
    }
  }



  componentWillMount() {
    var roomId = this.props.params.rid;
    var topicId = this.props.params.tid
    this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
                        '/admin/room/edittopic/'+topicId+'/'+roomId)).then(res => this.setuserdata(res));
  }
  componentDidMount() {
    this.setuserdata(this.props.loggedInData)
  }

 //Changed by jyothi for crearing validations after clicking on cancel button

  setuserdata(result){
    //console.log("result === ",result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
        // uid : result.data._id,
        roomId : this.props.params.rid,
        topicId : this.props.params.tid
      }
      var response = Validator.freeError(this.schema);
      if(response){
        this.schema = response;
        this.props.dispatch(UpdateRoomSchema(this.schema));
        this.props.dispatch(getRoomTopicData(obj, '/admin/room/edittopic/'+obj.topicId+'/'+obj.roomId)).then(res => this.setdata(res));
        this.props.dispatch(RoomTopicStore({ uid: result.data._id }));
        this.props.dispatch(getRoomData(obj,''));
      }
    } 
  }

  setdata(result){
     //console.log("SETDATA----", result.data)
    this.props.dispatch(RoomTopicStore(new DataObject(result.data)));
  }

  save = (event) => {
    // console.log("this.form === ",this.form);
    //console.log(this.form)
    var response = Validator.validate(this.form, this.schema,null,this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateRoomSchema(this.schema));
    } else {
      let obj = this.form
      // change by rajesh for bug#2941 here take id from the url 
      let idArray = window.location.pathname.split('/')
      obj['_id'] = idArray[idArray.length - 2];
      
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch(SaveRoomTopic(obj)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      this.refs.room_container.success(`${response.message} `, ``);
    }else{
      this.refs.room_container.error(`${response.error} `, ``);
    }
    this.setState({ activeIcon : null});
  }

  view = () => {
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  datareceive(data) {
  //  console.log("datareceived ----- ", data._id);
    this.form = data;
  }

  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  adduser = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  listtopic = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  feedbackList = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }

  roomConfiguration = () => {
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }
  
  courseReports = (e) => {
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  listAssignments = () => {
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/assignments/'+roomId);
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
                {this.props.roomData.topicdata.topicName}
              </li>
          </ul>
        </div>
        )
    /*if(this.props.loggedInData.data){

        this.name = this.props.loggedInData.data.firstname + ' ' + this.props.loggedInData.data.lastname;
        this.email = this.props.loggedInData.data.email;
        // console.log(strName);
    }
*/
    let clsContainerRight = `${styles.containerRight} pull-right`;

    if(this.props.roomData.topicdata){
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
            dataobject = {this.props.roomData.topicdata}
            activeIcon = {this.state.activeIcon}
         />
        </div>
      );
    }else{
      return (
        <div>Loading...</div>
      );
    }

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

EditTopic.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

EditTopic.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditTopic);
