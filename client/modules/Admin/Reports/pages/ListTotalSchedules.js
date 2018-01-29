import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { loggedInData } from '../../../Login/LoginReducer';
import { getTotalSchedulesList, clearTotalSchedulesList} from '../ReportsActions';
import { reportsData } from '../ReportsReducer';

import { loginLanguage } from '../../../Intl/IntlActions';
import moment from 'moment';
import { intlData } from '../../../Intl/IntlReducer';
// Import Style
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import DataTable from '../../../../components/DataTable/DataTable';
import adminStyles from '../../Admin.css';

class ListTotalSchedules extends React.Component {
  constructor(props) {
    super(props);

    this.currentPage= 1;
    this.itemsPerPage= 5; 
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

    this.props.dispatch(getTotalSchedulesList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(response.status == false) {
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  startTime (row) {
    let day,date,time ;

    if(row._id.startTime != null) {
      this.day = moment(row._id.startTime).format('ddd');
      this.date = moment(row._id.startTime).format('DD-MM-YYYY');
      this.time = moment(row._id.startTime).format('h:mm:ss a');

      return ( <div>{this.day}, {this.date}, {this.time}</div> );
    } else {
      return ( <div> -- </div> );
    }
  }

  endTime(row) {
    let day,date,time;

    if(row._id.endTime != null) {
      this.day = moment(row._id.endTime).format('ddd');
      this.date = moment(row._id.endTime).format('DD-MM-YYYY');
      this.time = moment(row._id.endTime).format('h:mm:ss a');

      return ( <div>{this.day}, {this.date}, {this.time}</div> );
    } else {
      return ( <div>{this.day}, {this.date}, {this.time}</div> );      
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearTotalSchedulesList());
  }

	render() {
    var objDisp = [
          { title : <FormattedMessage id='start_time' />, type : "function", callback : this.startTime },
          { title : <FormattedMessage id='end_time' />, type : "function", callback : this.endTime }
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
            <button id="backToReports" className={adminStyles.btnApplyAll} onClick={this.props.backToReport} style = {{marginLeft:"16px"}} >{this.props.intlData.messages.back_to_reports}</button>
          </Col>
        </Row>        
        <DataTable data={this.props.reportsData.schedulesList}
          count={this.props.reportsData.schedulesCount}
          currentPage = {this.props.reportsData.currentSchedulePage}
          submenu={null}
          topmenu={null}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData.bind(this)}
          dispField={objDisp}
          pageTitle={null} 
          filter={null}
          listDescreption={this.props.intl.messages.schedules}              
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
    reportsData: reportsData(state),
    intlData: intlData(state)
  };
}

ListTotalSchedules.propTypes = {
  loggedInData: PropTypes.object,
  reportsData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListTotalSchedules.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListTotalSchedules);