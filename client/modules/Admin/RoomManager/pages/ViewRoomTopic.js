import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getRoomTopicData, UpdateRoomSchema, DeleteRoom, ClearRoom ,SaveEditorContent, getRoomData} from '../RoomActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import RoomView from '../components/RoomView';
import Validator from '../../../../components/Validator';
import {roomSchema} from '../schema/RoomSchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import { intlData } from '../../../Intl/IntlReducer';
import {roomEditSubMenu, roomEditTopicNewMainMenu} from '../schema/RoomMenu';
import { loginLanguage } from '../../../Intl/IntlActions';
import WoogeenManager from '../../../Communication/WoogeenManager';

// Import Style
import styles from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';



class ViewRoomTopic extends Component {
  constructor(props){
    super(props);
    this.quill = false;
    this.currentuser = '';
    
    //this.mainmenu = roomViewMainMenu;
    //this.schema = roomSchema;

    /*this.mainmenu.menus[2].action = this.edit.bind(this);//this.save.bind(this);
    this.mainmenu.menus[1].action = this.deleteRoom.bind(this);*/
    this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkRoomTopic");
    this.mainmenu = roomEditTopicNewMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[0].action = this.view.bind(this);

    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[3].action = this.feedbackList.bind(this); 
    this.submenu.menus[4].action = this.roomConfiguration.bind(this);
    this.submenu.menus[5].action = this.listAssignments.bind(this);
    this.submenu.menus[6].action = this.courseReports.bind(this);

    this.confObject = new WoogeenManager();
  }

  /*componentWillMount() {
    var topicId = this.props.params.tid;
    var roomId = this.props.params.rid;
    this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/room/viewtopic/'+topicId+'/'+roomId)).then(res => this.setdata(res));;
  }*/
  componentDidMount() {
    this.quill = new Quill(ReactDOM.findDOMNode(this.refs.editor), {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'link'/*, 'video'*/, 'videoURL'],
          ['image', 'code-block'],['formula'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
        ],
        formula:true,
      },
      bounds: document.body,
      placeholder: 'Compose an epic...',
      theme: 'snow'  
    }); 
    this.setdata(this.props.loggedInData); 
  }
  
  setdata(result){
    //console.log('result',result)
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var topicId = this.props.params.tid;
    var roomId = this.props.params.rid;
    this.currentuser = result.data._id;
    let obj = { 
      topicId : topicId,
      roomId : roomId,
      // uid : result.data._id,
      
    };
    
    this.props.dispatch(getRoomTopicData(obj, '/admin/room/viewtopic/'+topicId+'/'+roomId));
    this.props.dispatch(getRoomData(obj,''));
 
    }
  }
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    //console.log(this.props.roomData.data.content)
    this.quill.setContents(nextProps.roomData.topicdata.content);
    
  }

  /*setdata(result){
    //console.log()
    var topicId = this.props.params.tid;
    var roomId = this.props.params.rid;
    this.currentuser = result.data._id;
    let obj = { 
      topicId : topicId,
      roomId : roomId,
      uid : result.data._id,
      
    };
    
    this.props.dispatch(getRoomTopicData(obj, '/admin/room/viewtopic/'+topicId+'/'+roomId));

  }*/

  save(){
    //e.preventDefault();
    // console.log("coming inside submit event handler");
    //console.log(this.quill.getContents())
    let content = this.quill.getContents().ops;
    var topicId = this.props.params.tid;
    var roomId = this.props.params.rid;
    let obj = { 
      _id : topicId,
      roomId : roomId,
      // uid : this.currentuser,
      content : content
      
    };
    this.props.dispatch(SaveEditorContent(obj)).then(res => this.setResponse(res, topicId));
  }

  setResponse(res, id) {
    console.log(' content res');
    let obj = {
        command : 'RELOAD_TOPICS_CONTENT',
        content : { tid: id },
        type : 'OBJECT'
      };
    this.confObject.sendMessage(obj, 0);
  }

  view(){
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  clear() {
    this.props.dispatch( ClearRoom());
  }

  /*edit = () => {
    var response = Validator.freeError(this.schema);
    if(response){
      this.props.dispatch(UpdateRoomSchema(response));
      var roomId = this.props.params.cid;  
      browserHistory.push('/admin/room/edit/'+roomId);
    }
  }

  deleteRoom = () => {
    if (confirm('Do you want to delete this Room?')) {
      var roomId = this.props.params.cid;
      let obj = {
        roomId : roomId
      }
      this.props.dispatch(DeleteRoom(obj, '/admin/room/view/'+roomId)); 
    } else {
    }
  }*/

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
    
    let topicTitle = this.props.roomData && this.props.roomData.topicdata && this.props.roomData.topicdata.topicName ? this.props.roomData.topicdata.topicName : '';

    
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let cls_formcontent = ` ${styles.heightForScroll} `
    let clsForm   = `${styles.iForm} ${styles.oForm}`;


    return (
      <div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='room_management' />: {topicTitle}</h3>
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
                <Link onClick={this.listtopic}><FormattedMessage id ='topic_list'/></Link>
              </li>
              <li>/</li>
              <li>
                {this.props.roomData.topicdata.topicName}
              </li>
            </ul>
        </div>
          <TopMenu data={roomEditTopicNewMainMenu} />
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={roomEditSubMenu} />
        </div>
        <div className={clsForm}>
          <div className={styles.whiteCard}>
            <div className={styles.innerWhiteTopic} >
              <div ref="editor" className={cls_formcontent}></div>
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
    roomData : roomData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

ViewRoomTopic.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewRoomTopic.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewRoomTopic);
