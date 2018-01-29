import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { RoomAssignmentList, getRoomData, UpdateRoomSchema, ClearRoom, deleteAssignmentRequest } from '../RoomActions';
//import { addRoomUser, getRoomData, getRoomUserData, ClearRoom,UpdateRoomSchema } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { Roles } from '../../../../roles.js';


import ContainerComponent from '../../../../components/ContainerComponent';

import ListUserToRoom from '../components/ListUserToRoom';
import DataTable from '../../../../components/DataTable/DataTable';

import {roomEditSubMenu, roomNoTopicSubMenu, roomAssignmentMainMenu} from '../schema/RoomMenu';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';
// import styles from '../../Admin.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
import Loading from '../../../App/components/Loading';
var dataObject = {};

class ListAssignment extends Component {
  constructor(props){
    super(props);
    this.state  = {
      searchValue : '',
      loading : true
    }

    this.res = {};

    this.mainmenu = roomAssignmentMainMenu;
    this.getData = this.getData.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;

    this.viewSubmissions = this.viewSubmissions.bind(this);
    this.editAssignment = this.editAssignment.bind(this);
    this.delete = this.delete.bind(this)
    this.setDeleteResponse = this.setDeleteResponse.bind(this);
    this.mainmenu.menus[0].action = this.addAssignment.bind(this);

    /* default set submenu without topic */
    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkAssignments");

    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.feedbackList.bind(this);
    /* commented because of no functionality, need to implement */ 
    // this.submenu.menus[4].action = this.addLocation.bind(this);

    this.submenu.menus[3].action = this.roomConfiguration.bind(this);
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.success != ''){
      this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
      this.props.dispatch(ClearRoom());
    }
  }

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
    //this.props.dispatch(RoomStore({obj}));
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
    this.props.dispatch(getRoomData(obj,''));
    }
  }

  getData(pageParam){
    pageParam["roomId"] = this.props.params.cid;
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.assignmentList)) {
      this.setState({loading : true}); 
    } else {        
      this.setState({loading : false});
    }
    this.props.dispatch(RoomAssignmentList(pageParam, pageParam.currentPage)).then(res => this.pageData(res))
  }

  // setLoading() {
  //   //console.log("At set loading");
  //   this.setState({loading : false});
  // }

  pageData(response){
    //console.log("pageData---", res);
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
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

  addAssignment = () =>{
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignment/add/'+roomId);  
  }

  assignedTo(row){
    if(row.assignedTo == null) {
      return (
        <div>--</div>
      )
    } else {
      return(
        <div>{row.assignedTo.topicName}</div>
      );
    }
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

  viewSubmissions(row){
    var link = "/admin/room/assignment/submissions/"+this.props.params.cid+'/'+row._id;
    return (
      <Link id="submissions" to={link}><i className="fa fa-book"></i></Link>
    );
  }

  editAssignment(row){
    var roomId = this.props.params.cid;
    var link = "/admin/room/assignment/edit/"+roomId+'/'+row._id;
    return (
      <Link id="editAssignment" to={link}><i className="fa fa-pencil"></i></Link>
    );
  }

  delete(row){
    return (
      <a id={row._id} onClick = {this.deleteAssignment} ><i className="fa fa-trash-o " ></i></a>
    );
  }

  deleteAssignment=(e)=>{
    var id =  e.currentTarget.id;
    var props = this.props;    
    var response = this.setDeleteResponse;

    alertify.confirm(this.props.intlData.messages.warning,this.props.intlData.messages.delete_assignment_alert, 
      function (result) {
        if(result) {          
          let obj = {
            roomId  : props.params.cid,
            assignmentId : id,
          }
          props.dispatch(deleteAssignmentRequest(obj, '')).then(res => response(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel}); ;     
  }

  setDeleteResponse(res) {
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
  }

  showAuthorsName(row) {    
    return(
      <div>{row.createdBy.firstname} {row.createdBy.lastname}</div>
    )    
  }

  render() {
    var bredCrumb = (
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
    
    var objDisp = [
      { fieldName : "assignmentName", title : <FormattedMessage id='assignment_name' />, type : "text" },
      { title : <FormattedMessage id='topic_name' />, type : "function", callback : this.assignedTo },      
      { title : <FormattedMessage id='edit' />, type : "function", callback : this.editAssignment },
      { title : <FormattedMessage id='delete' />, type : "function", callback : this.delete },
      { title : <FormattedMessage id='submissions' />, type : "function", callback : this.viewSubmissions },
    ];

    if(this.props.loggedInData && this.props.loggedInData.data) {
      var role = this.props.loggedInData.data.role;
      if(role == Roles.Lmsadmin || role == Roles.Admin) {
        objDisp.splice(2,0,{ title : <FormattedMessage id='created_by' />, type : "function", callback : this.showAuthorsName})
      }
    }

    var filter = [
      {type : 'search',id:'assignmentSearch', selectedfilter : this.searchFilter }
    ];

    /* if package have topics feature */
    if (this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)) {
      let roomData = this.props.roomData.data;
      if (roomData.selPackage && roomData.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkAssignments");
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
      }
    }

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.roomData.assignmentList}
            count={this.props.roomData.assignmentCount}
            currentPage = {this.props.roomData.currentAssignmentPage}
            submenu={this.submenu}
            bredCrumb={bredCrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.room_management} 
            filter={filter}
            listDescreption={this.props.intl.messages.room_assignments} 
            loading = {this.state.loading}           
        /> 
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
    intlData: intlData(state)
  };
}

ListAssignment.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListAssignment.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListAssignment);
