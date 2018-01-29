import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { loggedInData } from '../../../Login/LoginReducer';
import { getAttendanceList, ClearRoom ,clearAttendanceList } from '../RoomActions';
import { roomData } from '../RoomReducer';
import DataTable from '../../../../components/DataTable/DataTable';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { Roles } from '../../../../roles.js';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

import IndividualAttendance from './IndividualAttendanceReport';
import styles from '../../Admin.css';
var _ = require('lodash');

class ListAttendance extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      searchValue : '',
      showIndividualChart : false,
      rowData : null,
      loading : true
    }

    this.currentPage= 1;
    this.itemsPerPage= 5; 
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

  setdata(result) {
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  getData(pageParam) {
    pageParam["searchKeyword"] = this.state.searchValue; 
    pageParam["listIds"] = this.props.listIds;   

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.attendanceList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(getAttendanceList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(this.state.loading) {
      this.setState({loading : false});  
    }
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearAttendanceList());
  }

  searchFilter(e) {
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
 
  showUserName(row) {
      return (<div>{row.firstname} {row.lastname}</div>)
  }

  viewIndividualAttendance(row) {
      return (<a id="individualAttendanceView"  onClick = {this.showIndvidualAttendance.bind(this,row)} ><i className="fa fa-eye"></i></a>)
  }

  showIndvidualAttendance(row,e) {
    this.setState({
      rowData : row,
      showIndividualChart : true
    });
  }

  showRole(row) {    
    let roleObj = _.invert(Roles);
    let role = row.role;
    this.role = roleObj[role];
    return(
        <div >{this.role}</div>
      );
  }

  showCompanyId =(row) => {
    if(row.profile.companyid == null) {
      return (
        <div>-</div>
        )
    } else {
        return (
        <div>{row.profile.companyid.businessId}</div>
        );
      }
  }

  backToList = () => {
    this.setState({
      showIndividualChart : false
    });
  }

  render() {
    var objDisp = [
        { title : <FormattedMessage id='user_name' />, type : "function", callback :this.showUserName.bind(this) },
        {fieldName: "email", title: <FormattedMessage id='email' />, type: "text"},
        {title: <FormattedMessage id='role' />, type: "function", callback: this.showRole},
        {title: <FormattedMessage id='company_code' />, type: "function", callback: this.showCompanyId},
      ];
    if (this.props.reqType == "Present") {
      objDisp.push({title: <FormattedMessage id='view' />, type: "function", callback: this.viewIndividualAttendance.bind(this)});
    }

    var filter = [
      {type : 'search',id:'search', selectedfilter : this.searchFilter }
    ] 

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        {
          this.state.showIndividualChart == true
        ?
          <IndividualAttendance userData={this.state.rowData} fromDate={this.props.fromDate} toDate={this.props.toDate} courseId ={this.props.courseId} backToList={this.backToList}/>
        : 
          <div>
            <Row>
              <Col md={12}>
                <button id="btnBacktoreports" className={styles.btnApplyAll} onClick={this.props.backToReport} style = {{marginLeft:"16px"}}>{this.props.intlData.messages.back_to_reports}</button>
              </Col>
            </Row>
            <DataTable data={this.props.roomData.attendanceList}
              count={this.props.roomData.usersCount}
              currentPage = {this.props.roomData.currentusersPage}
              submenu={null}
              topmenu={null}
              itemsPerPage={this.itemsPerPage}
              newDataCallback={this.getData.bind(this)}
              dispField={objDisp}
              pageTitle={null} 
              filter={filter}
              listDescreption={this.props.intl.messages.course_attendance} 
              loading = {this.state.loading}             
            />
        </div>
        }
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

ListAttendance.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListAttendance.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListAttendance);