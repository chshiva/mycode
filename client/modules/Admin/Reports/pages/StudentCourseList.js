import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import Validator from '../../../../components/Validator';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';

import { studentCourseList, ReportsStore, checkCertificateEligibility, fetchCertificate } from '../ReportsActions';
import { reportsData } from '../ReportsReducer';

import DataTable from '../../../../components/DataTable/DataTable';

import { reportsMainMenu,reportsSubMenu } from '../schema/ReportsMenu';

// Import Style
import styles from '../../Admin.css';
import componentStyles from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
var moment = require('moment');


class StudentCourseList extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue : '',
      loading : true
    }
    
    this.res = {};

    this.submenu = Validator.activeSubMenu(reportsSubMenu, "lnkReports");   
    this.mainmenu = reportsMainMenu;
    this.getData = this.getData.bind(this);

    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewCourse = this.viewCourse.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.downloadCertificate = this.downloadCertificate.bind(this);
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
    this.props.dispatch(checkCertificateEligibility());
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

  getData(pageParam) {       
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.reportsData.dataList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(studentCourseList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(this.state.loading) {
      this.setState({loading : false})
    }
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  viewCourse(row) {
    let roomId = row.roomId._id;
    var link = "/course/attendance/"+roomId;
    return (
      <Link  id="courseView" to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  handleDownloadCertificate(roomId) {
    this.props.dispatch(fetchCertificate(roomId));
  }

  downloadCertificate(row) {
    let roomId = row.roomId._id;

    if (this.props.reportsData.eligibleRoomIds && this.props.reportsData.eligibleRoomIds.includes(roomId)) {
      return (
        <Link id="certDownload" onClick={this.handleDownloadCertificate.bind(this, roomId)}><i className="fa fa-download"></i></Link>      
      );
    }
    return (
      <div> &nbsp;&nbsp;- </div>
    );
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

  showCourseName(row) {
    let roomId = row.roomId._id;

    var link = "/course/attendance/"+roomId;
    return (
      <Link id='courseName' className={styles.removeStyle} to={link}><div>{row.roomId.roomName} </div></Link>
    );
  }
  showCourseType(row) {
    return (
      <div>{row.roomId.roomType} </div>
    );
  }
  createdDate(row) {
    if(row.roomId && row.roomId.createdOn != null) {
      let day = moment(row.roomId.createdOn).format('ddd')
      let date = moment(row.roomId.createdOn).format('DD-MM-YYYY')
      return (
        <div>{day}, {date}</div>
      );
    } else {
      return (
        <div> -- </div>
      ); 
    }
  } 

  expiryDate(row) {
    if(row.roomId && row.roomId.expiryDate != null) {
      let day = moment(row.roomId.expiryDate).format('ddd')
      let date = moment(row.roomId.expiryDate).format('DD-MM-YYYY')
      return (
        <div>{day}, {date}</div>
      );
    } else {
      return (
        <div> -- </div>
      );
    }
  } 

  render() {
    var bredcrumb = (
      <div className={componentStyles.dynamicBreadCrumb}>
        <ul>
          <li> 
            <FormattedMessage id = 'You_are_in_reports_list_panel'/>
          </li>
        </ul>
      </div>
          )
    var objDisp = [
          { title : <FormattedMessage id='room_name' />, type : "function", callback :this.showCourseName },
          { title : <FormattedMessage id='room_type' />, type : "function", callback :this.showCourseType },
          { title : <FormattedMessage id='created_date' />, type : "function", callback : this.createdDate },
          { title : <FormattedMessage id='expiry_date' />, type : "function", callback : this.expiryDate },
          { title : <FormattedMessage id='view' />, type : "function", callback : this.viewCourse },
          { title : <FormattedMessage id='download_certificate' />, type : "function", callback: this.downloadCertificate }
        ];

    var filter = [
      {type : 'search',id:'courseSearch', selectedfilter : this.searchFilter }
    ]    

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.reportsData.dataList}
            count={this.props.reportsData.count}
            currentPage = {this.props.reportsData.currentPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.reports} 
            listDescreption={this.props.intl.messages.rooms}
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

StudentCourseList.propTypes = {
  loggedInData: PropTypes.object,
  reportsData:PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

StudentCourseList.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(StudentCourseList);