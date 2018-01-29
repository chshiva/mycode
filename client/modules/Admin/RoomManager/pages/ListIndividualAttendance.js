import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { getIndividualAttendanceList, clearIndividualAttendanceList, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';

import { loginLanguage } from '../../../Intl/IntlActions';
import moment from 'moment';
import { intlData } from '../../../Intl/IntlReducer';
// Import Style
import {Col, Row, Grid} from 'react-bootstrap';

import DataTable from '../../../../components/DataTable/DataTable';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import styles from '../../Admin.css';

class ListIndividualAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading : true }
    this.currentPage= 1;
    this.itemsPerPage= 5; 
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
      var obj = {
        roomId : this.props.courseId
    	}
	    this.getData({
	      currentPage  : this.currentPage,
	      totalItems   : 0,
	      itemsPerPage : this.itemsPerPage
	    });
    }
  }

  getData(pageParam) {
    pageParam["listIds"] = this.props.listIds;    

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.individualAttendanceList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(getIndividualAttendanceList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(this.state.loading) {
      this.setState({ loading : false })
    }
    if(response.status == false) {
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  checkInTime (row) {
    let day,date,time;

    if( row.dateAdded != null ) {
      this.day = moment(row.dateAdded).format('ddd');
      this.date = moment(row.dateAdded).format('DD-MM-YYYY');
      this.time = moment(row.dateAdded).format('h:mm:ss a');

      return ( <div>{this.day}, {this.date}, {this.time}</div> );
    } else {
      return (<div> -- </div>);
    } 
  }

  checkOutTime(row) {
    let day,date,time;

    if( row.value.checkOutTime != null && row.value.checkOutTime != "") {
      this.day = moment(row.value.checkOutTime).format('ddd');
      this.date = moment(row.value.checkOutTime).format('DD-MM-YYYY');
      this.time = moment(row.value.checkOutTime).format('h:mm:ss a');

      return ( <div>{this.day}, {this.date}, {this.time}</div> );
    } else {
      return ( <div> -- </div> );
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearIndividualAttendanceList());
  }

	render() {
    var objDisp = [
          { title : <FormattedMessage id='checkin_time' />, type : "function", callback : this.checkInTime },
          { title : <FormattedMessage id='checkout_time' />, type : "function", callback : this.checkOutTime }
      ];

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <Row>
          <Col md={12}>
            <button id="backToReports" className={styles.btnApplyAll} onClick={this.props.backToReports} style = {{marginLeft:"16px"}}>{this.props.intlData.messages.back_to_reports}</button>
          </Col>
        </Row>        
        <DataTable data={this.props.roomData.individualAttendanceList}
          count={this.props.roomData.visitCount}
          currentPage = {this.props.roomData.currentvisitPage}
          submenu={null}
          topmenu={null}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData.bind(this)}
          dispField={objDisp}
          pageTitle={null} 
          listDescreption={this.props.intl.messages.course_attendance} 
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

ListIndividualAttendance.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListIndividualAttendance.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListIndividualAttendance);









