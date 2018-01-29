import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { loggedInData } from '../../../Login/LoginReducer';
import { getTotalSchedulesList, clearTotalSchedulesList, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';

import { loginLanguage } from '../../../Intl/IntlActions';
import moment from 'moment';
import { intlData } from '../../../Intl/IntlReducer';
// Import Style
import adminStyles from '../../Admin.css';
import {Col, Row, Grid} from 'react-bootstrap';

import DataTable from '../../../../components/DataTable/DataTable';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class ListTotalSchedules extends React.Component {
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
    if(_.isEmpty(this.props.roomData.schedulesList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(getTotalSchedulesList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(this.state.loading) {
      this.setState({ loading : false })
    }
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

	render(){
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
            <button  id="backToReports" className={adminStyles.btnApplyAll} onClick={this.props.backToReport} >Back to Reports</button>
          </Col>
        </Row>        
        <DataTable data={this.props.roomData.schedulesList}
          count={this.props.roomData.schedulesCount}
          currentPage = {this.props.roomData.currentSchedulePage}
          submenu={null}
          topmenu={null}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData.bind(this)}
          dispField={objDisp}
          pageTitle={null} 
          filter={null}
          listDescreption={this.props.intl.messages.schedules}   
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

ListTotalSchedules.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListTotalSchedules.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListTotalSchedules);
