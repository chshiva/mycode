import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { RoomTopicStore, getRoomTopicData, ClearRoom, showModal, getTopicQuestionnaireData, getRoomData} from '../RoomActions';
import { roomData } from '../RoomReducer';
import Validator from '../../../../components/Validator';

import ContainerComponent from '../../../../components/ContainerComponent';
import { roomEditSubMenu, assignQuestionnaireMainMenu } from '../schema/RoomMenu';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
  
import ListQuestionnaire from '../components/ListQuestionnaire';
import QuestionnairePopup from '../components/QuestionnairePopup';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import { loginLanguage } from '../../../Intl/IntlActions';
// Import Style
// import styles from '../../Admin.css';
import styles from '../../../../components/component.css';
import { intlData } from '../../../Intl/IntlReducer';
import {Col, Row, Grid} from 'react-bootstrap';

var dataObject = {};
var userObject = {};

class AssignQuestionnaire extends Component {

  constructor(props){
    super(props);
    this.res = {};
    this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkRoomTopic"); 
    this.mainmenu = assignQuestionnaireMainMenu;

    this.mainmenu.menus[0].action = this.listtopic.bind(this);
    this.mainmenu.menus[1].action = this.assignQuestionnaire.bind(this);

    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[3].action = this.feedbackList.bind(this); 
    this.submenu.menus[4].action = this.roomConfiguration.bind(this);
    this.submenu.menus[5].action = this.listAssignments.bind(this);
    this.submenu.menus[6].action = this.courseReports.bind(this);

  }

  componentDidMount() {
    this.setuserdata(this.props.loggedInData)
  }
 
  setuserdata(result){
    //console.log("result === ",result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
        // uid : result.data._id,
        roomId : this.props.params.rid,
        topicId : this.props.params.tid
      }
      this.props.dispatch(getRoomTopicData(obj, '/admin/room/questionnaire/'+obj.topicId+'/'+obj.roomId)).then(res => this.setdata(res));
      this.props.dispatch(RoomTopicStore({ uid: result.data._id }));
      this.props.dispatch(getRoomData(obj,''));
    }
   
  }

  setdata(result){
     //console.log("SETDATA----", result.data)
    this.props.dispatch(RoomTopicStore(new DataObject(result.data)));
  }

  setresponse = (response) => {
    if(response.status){
      this.refs.room_container.success(`${response.message} `, ``);
    }else{
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  assignQuestionnaire() {
    var data = "true"
      let obj = { 
        // uid : this.props.loggedInData.data._id,
        roomId : this.props.params.rid,
        topicId : this.props.params.tid
      };
    this.props.dispatch(getTopicQuestionnaireData(obj))
    this.props.dispatch(showModal( data ));
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

    if(this.props.roomData.topicdata){
      dataObject = this.props.roomData.topicdata;
    }
    if(this.props.loggedInData && this.props.loggedInData.data){
      userObject = this.props.loggedInData.data;
    }
    if(this.props.roomData && this.props.roomData.show){
      var showModal = this.props.roomData.show;
    }
    if(this.props.roomData && this.props.roomData.edit){
      var editModal = this.props.roomData.edit;
    }
    if(this.props.roomData && this.props.roomData.questionnaireData){
      var questionnaireData = this.props.roomData.questionnaireData;
    }

    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
  
    //console.log('roomName',this.props.roomData)
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
                  <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
                </li>
                <li>/</li>
                  <li><Link onClick={this.viewroom}>{this.props.roomData.data.roomName}</Link></li>
                <li>/</li>
                <li>
                  <Link onClick={this.listtopic}><FormattedMessage id = 'topic_list'/></Link>
                </li>
                 <li>/</li>
                <li>
                 {this.props.roomData.topicdata.topicName}
                </li>
              </ul>
            </div>
          <TopMenu data={assignQuestionnaireMainMenu} />
        </div>

        <div className={cls_isubmenu}>
          <SubMenu data={roomEditSubMenu} />
        </div>

        <ListQuestionnaire topicData={dataObject} success={this.props.roomData.success} uid={userObject._id} role={userObject.role} roomId={this.props.params.rid} topicId={this.props.params.tid} />
        <QuestionnairePopup showModal={showModal} editModal={editModal} topicData={dataObject} uid={userObject._id} questionnaireData={questionnaireData}/>

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

AssignQuestionnaire.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

AssignQuestionnaire.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AssignQuestionnaire);
