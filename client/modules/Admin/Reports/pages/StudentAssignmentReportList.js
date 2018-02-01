import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import Validator from '../../../../components/Validator';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';

import { studentAssignmentList, ReportsStore } from '../ReportsActions';
import { reportsData } from '../ReportsReducer';

import DataTable from '../../../../components/DataTable/DataTable';

import { courseReportsSubMenu, reportsMainMenu } from '../schema/ReportsMenu';

// Import Style
import styles from '../../Admin.css';
import componentStyles from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
var moment = require('moment');


class StudentAssignmentReportList extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue : '',
      loading : true
    }
    
    this.res = {};

    this.submenu = Validator.activeSubMenu(courseReportsSubMenu, "linkAssignment");   
    this.submenu.menus[0].action = this.attendanceReport.bind(this);
    this.submenu.menus[1].action = this.topicsReport.bind(this);
    this.submenu.menus[2].action = this.assignmentReportList.bind(this);
    this.mainmenu = reportsMainMenu;

    this.getData = this.getData.bind(this);

    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result) {
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch(ReportsStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  attendanceReport = () => {
    browserHistory.push('/course/attendance/'+this.props.params.rid);
  }

  topicsReport = () => {
    browserHistory.push('/course/topics/report/'+this.props.params.rid);
  }

  assignmentReportList = () => {
    browserHistory.push('/course/assignment-report-list/'+this.props.params.rid);
  }

  getData(pageParam) {       
    pageParam["searchKeyword"] = this.state.searchValue;
    pageParam["roomId"] = this.props.params.rid;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.reportsData.assignmentListData)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(studentAssignmentList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(this.state.loading) {
      this.setState({loading : false})
    }
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
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

  showAssignmentName = (row) => { 
    let roomId = this.props.params.rid;
    let assignmentId = row._id;
    var link = "/course/assignment-report-view/"+roomId+"/"+assignmentId; 	
  	return <Link className={styles.removeStyle} to={link}>{row.assignmentName}</Link>
  }

  showMarks(row) {
  	let result = row.submissions[0].result;
  	if(result.length>0) {
  		let marksObtained = 0;
  		let totalMarks = 0;
  		result.map(function(data){
  			marksObtained+=data.score;
  			totalMarks+=data.maximumMarks
  		});
  		return marksObtained+"/"+totalMarks
  	} else {
  		return '--'
  	}
  }

  viewCourse = (row) => {
    let roomId = this.props.params.rid;
    let assignmentId = row._id;
    var link = "/course/assignment-report-view/"+roomId+"/"+assignmentId;

    return (
      <Link id="assignmentView" to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  submittedOn(row) {
    if(row && row.submissions[0].submittedAt) {
      let date= moment(row.submissions[0].submittedAt).format('DD/MM/YYYY hh:mm A');
      return (
      <div>{date}</div>
      );
    } else {
      return (
      <div>--</div>
      );
    }
  }   

  render() {
    var bredcrumb = (
      <div className={componentStyles.dynamicBreadCrumb}>
        <ul>
          <li> 
            <Link to="/course/reports"><FormattedMessage id='room_list'/></Link>
          </li>
          <li>/</li>
          <li> 
            <FormattedMessage id = 'assignment_list'/>
          </li>
        </ul>
      </div>
          )
    var objDisp = [
          { title : <FormattedMessage id='assignment_name' />, type : "function", callback :this.showAssignmentName },
          { title : <FormattedMessage id='submitted_on' />, type : "function", callback : this.submittedOn },
          { title : <FormattedMessage id='Marks' />, type : "function", callback :this.showMarks }, 
          { title : <FormattedMessage id='view' />, type : "function", callback :this.viewCourse },        
        ];

    var filter = [
      {type : 'search',id:'assignmentSearch', selectedfilter : this.searchFilter }
    ]    

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.reportsData.assignmentListData}
            count={this.props.reportsData.count}
            currentPage = {this.props.reportsData.currentPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.reports} 
            listDescreption={this.props.intl.messages.student_assignment_list_title}
            filter={filter}
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
    intlData: intlData(state),
    reportsData:reportsData(state)
  };
}

StudentAssignmentReportList.propTypes = {
  loggedInData: PropTypes.object,
  reportsData:PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

StudentAssignmentReportList.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(StudentAssignmentReportList);
