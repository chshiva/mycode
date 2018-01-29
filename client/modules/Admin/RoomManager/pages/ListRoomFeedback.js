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
import { RoomFeedbackList, RoomStore, UpdateRoomSchema, ClearRoom, getRoomData } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { feedbackData } from '../FeedbackReducer';
import DataTable from '../../../../components/DataTable/DataTable';
import {roomSchema} from '../schema/RoomSchema';
import {feedbackListMainMenu, roomEditSubMenu, roomNoTopicSubMenu, roomEditMainMenu} from '../schema/RoomMenu';


// Import Style
import styles from '../../Admin.css';
import componentStyles from '../../../../components/component.css';
import moment from 'moment';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Feedback from '../../../../components/Feedback';
import { Roles } from '../../../../roles.js';
var _ = require('lodash');

class ListRoomFeedback extends Component {
  constructor(props){
    super(props);

    /* default set submenu without topic */
    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkFeedback");
    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.feedbackList.bind(this);
    this.submenu.menus[3].action = this.roomConfiguration.bind(this);
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);
    this.state = { 
      //searchValue : '',
      showFeedback: false,
      isLmsadmin: false,
      virtualRoomName: 'PPL',
      loading: false
    }
    this.schema = roomSchema;
    this.res = {};

    this.mainmenu = feedbackListMainMenu;
    this.getData = this.getData.bind(this);
    //this.clear = this.clear.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;  
    this.viewRoomFeedback = this.viewRoomFeedback.bind(this);
    //this.mainmenu.menus[0].action = this.clearError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.success != ''){
      this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
      this.props.dispatch(ClearRoom());
    }
  }

  componentWillMount() {
      // this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
      //               '/admin/room/list')).then(res => this.setdata(res));
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
    let obj = {
      roomId : this.props.params.roomId
    };
    this.props.dispatch(getRoomData(obj,''));
    //this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch(RoomStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  getNewData = () => {
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
  }

  getData(pageParam){
    pageParam["uid"] = this.props.loggedInData.data._id;
    pageParam["roomId"] = this.props.params.roomId;
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.feedbackData.dataList)) {
      this.setState({loading : true}); 
    } else {        
      this.setState({loading : false});
    }
    this.props.dispatch(RoomFeedbackList(pageParam, pageParam.currentPage)).then(res=>this.pageData(res));
  }

  pageData(response){
    this.forceUpdate();
    //console.log("feedback response", response);
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }      
    if(this.state.loading) {
      this.setState({loading : false});        
    }   
  }

  showOrHideFeedback() {
    this.setState({showFeedback: !this.state.showFeedback})
  }

  viewRoomFeedback(row){      
    var link = "/admin/room/view-feedback/"+row._id;
    return (
      <Link id="feedbackView" to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  viewroom = () => {
    var roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  adduser = () => {
    var roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  listtopic = () => {
    var roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }
  
  feedbackList = () => {
    var roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }

  courseReports = (e) => {
    var roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateRoomSchema(response));
      browserHistory.push('/admin/room/new');
    }
  }


  submittedOn(row) {
    if(row && row.createdOn) {
      let date= moment(row.createdOn).format('DD/MM/YYYY');
      return (
      <div>{date}</div>
      );
    } else {
      return (
      <div>--</div>
      );
    }
  }
  
  viewRoomName(row) {
    var link = "/admin/room/view-feedback/"+row._id;
    if(row.roomId && row.roomId.roomName) {
      return (
      <Link className = {styles.removeStyle} to={link}><div>{row.roomId.roomName} </div></Link>
      );
    }
  }

  showFeedbackDetails(row){
    var link = "/admin/room/view-feedback/"+row._id;
    return (
      <Link className = {styles.removeStyle} to={link}><div>{row.roomName} </div></Link>
    );
  }

  combineName(row){
    if(row.userId && row.userId.firstname) {
    return(
        <div >{row.userId.firstname} {row.userId.lastname}</div>
      );
    }
  }

  addLocation = () => {
    var roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/listlocation/'+roomId);
  }

  roomConfiguration = () => {
    var roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }

  listAssignments = () => {
    var roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  listCertificates = () => {
    const roomId = this.props.params.roomId;
    browserHistory.push('/admin/room/certificates/'+roomId);
  }

  render() {        
    var objDisp = [
      { title : <FormattedMessage id='room_name' />, type : "function", callback : this.viewRoomName },
      { title : <FormattedMessage id='submitted_by' />, type : "function", callback : this.combineName },
      { title : <FormattedMessage id='submitted_on' />, type : "function", callback : this.submittedOn },
      { title : <FormattedMessage id='view' />, type : "function", callback : this.viewRoomFeedback }
    ];         
    var bredcrumb = (
      <div className={componentStyles.dynamicBreadCrumb}>
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
          );
    /* if package have topics feature */
    if (this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)) {
      let roomData = this.props.roomData.data;
      if (roomData.selPackage && roomData.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkFeedback");
        this.submenu.menus[0].action = this.viewroom.bind(this);
        this.submenu.menus[1].action = this.adduser.bind(this);
        this.submenu.menus[2].action = this.listtopic.bind(this);
        this.submenu.menus[3].action = this.feedbackList.bind(this);
        /* commented because of no functionality, need to implement */
        // this.submenu.menus[4].action = this.addLocation.bind(this);
        // this.mainmenu.menus[0].action = this.showOrHideFeedback.bind(this);
        
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
        <DataTable data={this.props.feedbackData.dataList}
          count={this.props.feedbackData.count}
          currentPage = {this.props.feedbackData.currentPage}
          submenu={this.submenu}
          bredCrumb={bredcrumb}
          topmenu={this.mainmenu}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData}
          dispField={objDisp}
          pageTitle={this.props.intl.messages.room_management}
          listDescreption={this.props.intl.messages.feedbacks} 
          loading={this.state.loading}
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
    feedbackData: feedbackData(state),
    intlData: intlData(state)
  };
}

ListRoomFeedback.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  feedbackData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListRoomFeedback.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListRoomFeedback);