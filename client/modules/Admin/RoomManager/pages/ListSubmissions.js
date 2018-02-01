import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { assignmentSubmissionList, getRoomData, UpdateRoomSchema, ClearRoom, DeleteTopic } from '../RoomActions';
//import { addRoomUser, getRoomData, getRoomUserData, ClearRoom,UpdateRoomSchema } from '../RoomActions';
import { roomData } from '../RoomReducer';


import ContainerComponent from '../../../../components/ContainerComponent';

import ListUserToRoom from '../components/ListUserToRoom';
import DataTable from '../../../../components/DataTable/DataTable';

import {submissionListSubMenu, listSubmissionMainMenu} from '../schema/RoomMenu';

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
import moment from 'moment';
var dataObject = {};



class ListSubmissions extends Component {
  constructor(props){
    super(props);
    this.state  = {
      searchValue : '',
      submissionList : '',
      submissionCount : 0,
      loading : true
    }

    this.res = {};

    this.submenu =  Validator.activeSubMenu(submissionListSubMenu,"linkAssignmentList");
    this.mainmenu = listSubmissionMainMenu;
    this.getData = this.getData.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;

    this.view = this.view.bind(this);

    this.submenu.menus[0].action = this.backToAssignments.bind(this);
    this.submenu.menus[1].action = this.listAssignments.bind(this);
    // this.submenu.menus[2].action = this.listAssignmentsReport.bind(this);

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
    pageParam["assignmentId"] = this.props.params.aid;
    this.setState({loading : true});
    this.props.dispatch(assignmentSubmissionList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
    this.setState({loading : false});
    //console.log("pageData---", res);
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    } else {
      this.setState({
        submissionList: response.listData,
        submissionCount: response.count
      })
    }
  }

  backToAssignments = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  listAssignments = () => {
    browserHistory.push('/admin/room/assignment/submissions/'+this.props.params.cid+'/'+this.props.params.aid);
  }
  
  // listAssignmentsReport = () => {
  //   browserHistory.push('/admin/room/assignment/submissions/view/'+this.props.params.cid+'/'+this.props.params.aid);
  // }

  searchFilter(e){
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?\\]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      var searchValue = this.state.searchValue
      var filtered = this.props.roomData.submissionList.filter(function(item){
        var searchKey = RegExp(searchValue,'i'); 
        return searchKey.test(item.studentId.firstname);
      });
      this.setState({
        submissionList: filtered,
        submissionCount: filtered.length
      })
    }    
  }

  studentName(row){
    if(row.studentId == null) {
      return (
        <div>--</div>
      )
    } else {
      return(
        <div>{row.studentId.firstname} {row.studentId.lastname}</div>
      );
    }
  }

  submittedOn(row) {
    if(row && row.submittedAt) {
      let date= moment(row.submittedAt).format('DD/MM/YYYY hh:mm A');
      return (
      <div>{date}</div>
      );
    } else {
      return (
      <div>--</div>
      );
    }
  }

  download(row){
    var link = "/uploads/"+row.fileName;
    return (
      <a id="download" href={link} download><i className="fa fa-download"></i></a>
    );
  }

  view(row) {
    let assignmendId = this.props.params.aid;
    var pdfLink = "/admin/room/assignment/submission/view/"+this.props.params.cid+"/"+assignmendId+"/"+row._id+"/"+row.fileName;
    let ext = row.fileName.substr(row.fileName.lastIndexOf(".") + 1);
    if((ext != "gif") && (ext != "wav") && (ext != 'mp3') && (ext != 'wmv') && (ext != 'mp4') && (ext != 'mkv') && (ext != 'zip') && (row.fileType != 'link')) {
      return <Link id="fileView" to={pdfLink}><i className="fa fa-file-pdf-o "></i></Link>
    } else {
      return <span><FormattedMessage id ='not_allowed'/></span>
    }
  }

  obtainedMarks(row) {
    let marksObtained = 0;
    let totalMarks = 0; 
    if(row.result.length>0) {
      row.result.map(function(data) {
        totalMarks += data.maximumMarks;
        marksObtained += data.score;
      })
      return marksObtained+'/'+totalMarks;
    } else {
      return '--'
    }
  } 

  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  render() {
    var bredcrumb = (
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
            <Link onClick={this.backToAssignments}><FormattedMessage id ='assignment_list'/></Link>
          </li>
          <li>/</li>
          <li>
          <FormattedMessage id ='submission_list'/>
          </li>
        </ul>
      </div>
      )
    if(this.props.loggedInData && this.props.loggedInData.data) {
      var role = this.props.loggedInData.data.role
    }

    var objDisp = [
      { title : <FormattedMessage id='student_name' />, type : "function", callback : this.studentName },
      { title : <FormattedMessage id='submitted_on' />, type : "function", callback : this.submittedOn },
      { title : <FormattedMessage id='Marks' />, type : "function", callback : this.obtainedMarks },      
      { title : <FormattedMessage id='openfile' />, type : "function", callback : this.download },
      { title : <FormattedMessage id='view' />, type : "function", callback : this.view }
    ];
    var filter = [
      {type : 'search', id:'search', selectedfilter : this.searchFilter }
    ] 

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <DataTable data={this.state.submissionList}
            count={this.state.submissionCount}
            currentPage = {this.props.roomData.currentSubmissionPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.room_management} 
            filter={filter}
            listDescreption={this.props.intl.messages.submissions}
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
    intlData: intlData(state)
  };
}

ListSubmissions.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListSubmissions.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListSubmissions);
