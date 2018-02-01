import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { RoomTopicList, getRoomData, UpdateRoomSchema, ClearRoom, DeleteTopic, handleTopicEnable, getCourseTopicsData} from '../RoomActions';
//import { addRoomUser, getRoomData, getRoomUserData, ClearRoom,UpdateRoomSchema } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { Roles } from '../../../../roles';


import ContainerComponent from '../../../../components/ContainerComponent';

import ListUserToRoom from '../components/ListUserToRoom';
import DataTable from '../../../../components/DataTable/DataTable';

// import {roomSchema} from '../schema/RoomSchema';
import {roomTopicSchema} from '../schema/RoomSchema';
import {roomEditSubMenu, roomTopicMainMenu} from '../schema/RoomMenu';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';
import style from '../../Admin.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
import { setWorkDashboard } from '../../../Dashboard/UserDashboard/components/WorkDashboardActions';
import WoogeenManager from '../../../Communication/WoogeenManager';
import { workDashboardData } from '../../../Dashboard/UserDashboard/components/WorkDashboardReducer';
import  TopicsIndexList from '../components/TopicsIndexList';

var dataObject = {};

class ListTopic extends Component {
  constructor(props){
    super(props);
    this.state  = {
      searchValue : '',
      loading : true,
      showTopicIndex: false
    }
    this.schema = roomTopicSchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkRoomTopic");   
    this.mainmenu = roomTopicMainMenu;
    this.getData = this.getData.bind(this);
    //this.clear = this.clear.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewRoomTopic = this.viewRoomTopic.bind(this);
    this.editRoomTopic = this.editRoomTopic.bind(this);
    this.uploadOnTopic = this.uploadOnTopic.bind(this);
    this.deleteRoomTopic = this.deleteRoomTopic.bind(this);
    this.topicEnable = this.topicEnable.bind(this)
    //this.mainmenu.menus[0].action = this.clearError.bind(this);

    this.mainmenu.menus[0].action = this.addtopic.bind(this);
    this.mainmenu.menus[1].action = this.showOrHideTopicsIndexList.bind(this);

    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[3].action = this.feedbackList.bind(this); 
    /* commented because of no functionality, need to implement */
    // this.submenu.menus[4].action = this.addLocation.bind(this);
    
    this.submenu.menus[4].action = this.roomConfiguration.bind(this);
    this.submenu.menus[5].action = this.listAssignments.bind(this);
    this.submenu.menus[6].action = this.courseReports.bind(this);
    this.submenu.menus[7].action = this.listCertificates.bind(this);

    this.searchFilter = this.searchFilter.bind(this);
    this.confObject = new WoogeenManager();

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.success != ''){
      this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
      this.props.dispatch(ClearRoom());
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
      uid : result.data._id,
      roomId : this.props.params.cid
    }
    //this.props.dispatch(RoomStore({obj}));
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
    this.props.dispatch(getRoomData(obj,''));
    }
  }

  getData(pageParam, sort = null){
    //console.log("sort === ",sort);
    // pageParam["uid"] = this.props.loggedInData.data._id;
    if(sort != null)
      pageParam["sortObj"] = sort;
    pageParam["roomId"] = this.props.params.cid;
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.topicList) || this.props.params.cid != this.props.roomData.topicList._id) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(RoomTopicList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
    //console.log("pageData---", res);
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
    this.forceUpdate();
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }
  
  viewRoomTopic(row){
    var link = "/admin/room/viewtopic/"+row._id+'/'+row.roomId;
    //console.log("link === ",link)
    return (
      <Link id="content" to={link}><i className="fa fa-book"></i></Link>
    );
  }
  
  editRoomTopic(row){
    //console.log(row)
    var link = "/admin/room/edittopic/"+row._id+'/'+row.roomId;
    //console.log("link === ",link)
    return (
      <Link id="editTopic" to={link}><i className="fa fa-pencil"></i></Link>
    );
  }

  deleteRoomTopic(row){
    let viewTopicDelete = row.createdBy == this.props.loggedInData.data._id ?
      <a id={row._id} onClick = {this.deletetopic} ><i className="fa fa-trash-o " ></i></a>
    : "Not Allowed";
    return viewTopicDelete;
  }

  deletetopic=(e)=>{
    var id =  e.currentTarget.id;
    var props = this.props;    
    var response = this.setdeleteresponse;

    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_topic_alert, 
      function (result) {
        if(result) {          
          let obj = {
            roomId  : props.params.cid,
            _id     : id,
            // topicId : props.params.tid
          }
          props.dispatch(DeleteTopic(obj, '')).then(res => response(res, id));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); ;     
  }

  setdeleteresponse = (res, id) => {
    // changeBy: pranathi, disc: at the time of deleting topic, updating workdashboard store
    let obj = {
      command : 'RELOAD_TOPICS',
      content : { tid: id },
      type : 'OBJECT'
    };

    this.confObject.sendMessage(obj, 0);
    this.props.dispatch(getCourseTopicsData(this.props.params.cid));

    this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
    });
  }

  uploadOnTopic(row){
    //console.log(row)
    var link = "/admin/room/uploadtotopic/"+row._id+'/'+row.roomId;
    return (
      <Link id="files" to={link}><i className="fa fa-files-o"></i></Link>
    );
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

  addtopic = () =>{
    var response = Validator.freeValue(this.schema);
    var roomId = this.props.params.cid;
    if(response){
      this.props.dispatch(UpdateRoomSchema(response));
      browserHistory.push('/admin/room/addtopic/'+roomId);
    }    
  }

  description(row){
    if(row.description.length > 10) {
      var description = row.description.substring(0,10) + '...'
      return(
        <div>{description}</div>
      );
    } else {
      return(
        <div>{row.description}</div>
      );
    }
  }

  assignQuestionnaire(row){
    var link = "/admin/room/questionnaire/"+row._id+'/'+row.roomId;
    return (
      <Link id="questionnaire" to={link}><i className="fa fa-question-circle-o"></i></Link>
    );
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
  
  courseReports = (e) => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  searchFilter(e){
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?\\]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }    
  }

  listAssignments = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  listCertificates = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/certificates/'+roomId);
  }

  showTopicName(row){
    var link = "/admin/room/viewtopic/"+row._id+'/'+row.roomId;
    return (
      <Link id="viewTopic" className = {style.removeStyle} to={link}><div>{row.topicName} </div></Link>
    );
  }

  showTopicIndex(row){
    if(row.topicIndex) {
      return(
        <div>{row.topicIndex}</div>
      );
    } else {
      return(
        <div>--</div>
      );
    }
  }

  handleEnableTopic = (e)=>  {
    let topicEnable = e.currentTarget.value == "true" ? false : true;
    let id = e.currentTarget.id;
    // this.props.dispatch(getCourseTopicsData(this.props.roomId));
    this.props.dispatch(handleTopicEnable(topicEnable, id)).then(res => this.topicEnableResponse(res));  
  }

  topicEnableResponse = (res) => {
    
    let tid = res && res.topicData && res.topicData.id ? res.topicData.id : '' ;

    let obj = {
        command : 'RELOAD_TOPICS',
        content : { tid: tid },
        type : 'OBJECT'
      };

    this.confObject.sendMessage(obj, 0);
    this.props.dispatch(getCourseTopicsData(this.props.params.cid));

    if(res.status == true && res.topicData && res.topicData.topicEnable == false) {
      if(this.props.roomData && this.props.roomData.topicdata && this.props.roomData.topicdata.length  && this.props.roomData.topicdata.length > 0 ) {
        var response = this.setResponse;
        alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.topic_index_alert, 
          function (result) {
            if(result) { 
              response(result)          
            }
          },
          function() {

          }
        ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
      }
    }
  }
  setResponse = (res) => {
    this.setState({showTopicIndex: !this.state.showTopicIndex});
  }

  topicEnable(row) {
    let viewTopicEnable = row.createdBy == this.props.loggedInData.data._id ?
      (
        <input type="checkbox"
            id={row._id}
            value={row.topicEnable} onChange = {this.handleEnableTopic} checked = {row.topicEnable}/>
      ):"Not Allowed ";
      return viewTopicEnable
  }

  showOrHideTopicsIndexList(e){
    this.setState({showTopicIndex: !this.state.showTopicIndex});
  }


  handleModel(res){
    if(res.status) {
      this.setState({showTopicIndex: false}); 
      this.refs.room_container.success(`${res.message} `, ``); 

      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }
 
  render() {
    if(this.props.loggedInData && this.props.loggedInData.data) {
      var role = this.props.loggedInData.data.role
    }
    let indexTopics = [];
    let nonIndexTopics= [];

    if(this.props.roomData && this.props.roomData.topicList && this.props.roomData.topicList.length > 0) {
      this.props.roomData.topicList.map((data,i) => {
        if(this.props.roomData && this.props.roomData.topicList[i]) {
          if(this.props.roomData.topicList[i].topicIndex) {
            indexTopics.push(this.props.roomData.topicList[i]);
          } else  {
          nonIndexTopics.push(this.props.roomData.topicList[i]);
          }
        }
      });
    }
    let topics = _.sortBy(indexTopics, [function(o) { return o.topicIndex; }]).concat(nonIndexTopics);
    if(role != Roles.Superadmin) {
      var objDisp = [
            { title : <FormattedMessage id='topic_index' />, type : "functon", callback : this.showTopicIndex},
            { title : <FormattedMessage id='topic_name' />, type : "functon", callback : this.showTopicName, sort : true, dbName : 'topicName' },
            { title : <FormattedMessage id='description' />, type : "function", callback : this.description, sort : true, dbName :'description'},
            { title : <FormattedMessage id='edit' />, type : "function", callback : this.editRoomTopic },
            { title : <FormattedMessage id='delete' />, type : "function", callback : this.deleteRoomTopic },
            { title : <FormattedMessage id='content' />, type : "function", callback : this.viewRoomTopic },
            { title : <FormattedMessage id='files' />, type : "function", callback : this.uploadOnTopic },
            { title : <FormattedMessage id='questionnaire' />, type : "function", callback : this.assignQuestionnaire },
            { title : <FormattedMessage id='publish' />, type : "function", callback : this.topicEnable }
          ];
    } else {
      var objDisp = [
            { title : <FormattedMessage id='topic_index' />, type : "functon", callback : this.showTopicIndex},
            { title : <FormattedMessage id='topic_name' />, type : "functon", callback : this.showTopicName, sort : true, dbName : 'topicName' },
            { title : <FormattedMessage id='description' />, type : "function", callback : this.description, sort : true, dbName : 'description' },
            { title : <FormattedMessage id='content' />, type : "function", callback : this.viewRoomTopic },
            { title : <FormattedMessage id='files' />, type : "function", callback : this.uploadOnTopic },
            { title : <FormattedMessage id='questionnaire' />, type : "function", callback : this.assignQuestionnaire }
          ];
    }
    var filter = [
      {type : 'search', id:'topicSearch', selectedfilter : this.searchFilter }
    ] 
    var bredcrumb = (
         <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li> 
                <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
              </li>
              <li>/</li>
              <li>
                {this.props.roomData.data.roomName}
              </li>
            </ul>
          </div>
          )
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <DataTable data={topics}
            count={this.props.roomData.topiccount}
            currentPage = {this.props.roomData.currentTopicPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.room_management}
            listDescreption={this.props.intl.messages.list_topic}
            filter={filter}
            loading={this.state.loading}
        />
        <TopicsIndexList  showModal={this.state.showTopicIndex} hidecallback={this.showOrHideTopicsIndexList.bind(this)} roomId= {this.props.params.cid} callback = {this.handleModel.bind(this)}/>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    roomData: roomData(state),
    intlData: intlData(state),
    workDashboardData : workDashboardData(state)
  };
}

ListTopic.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListTopic.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListTopic);
