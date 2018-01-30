import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import AssignmentContent from './AssignmentContent';
import AssignmentData from './AssignmentData';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, getConferenceAssignmentData } from './WorkDashboardActions';
import { dashboardData } from '../UserDashboardReducer';
import { loggedInData } from '../../../Login/LoginReducer';

class AssignmentList extends Component{

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let obj = {
      roomKey: this.props.roomKey
    }
		this.props.dispatch(getConferenceAssignmentData(obj)) 
	}

	handleFullAssignment(index, data) {
		let obj = { current : 'assignmentList', assignmentContent: true, assignmentList : false, assignmentContentData : data, assignmentContentIndex : index, uid : this.props.loggedInData.data._id};
		this.handleWorkDashboard(obj);
	}

	handleList(){
		let obj = {current : 'assignmentList', assignmentContent: false, assignmentList : true, assignmentContentData : null, assignmentContentIndex : null};
		this.handleWorkDashboard(obj);
	}

	handleWorkDashboard = (obj) => {
		this.props.imHost == true && this.props.workDashboardData.sync == true ?
    		this.props.syncCallback(obj)
		: this.props.dispatch(setWorkDashboard(obj));
	}

	syncCallback(obj){
		this.props.syncCallback(obj);
	}

	render() {
    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let cls_authorsBox = `clearfix ${styles.authorsBox}`;

	const assignmentList = this.props.workDashboardData.assignmentList
    ?
		<div className={styles.whiteCard}>
			<div className={styles.breadCrum}>
	      <ul>
	        <li>
	          <Link id="roomName"><span>{this.props.roomName}</span></Link>
	        </li>
	        <li><span>/</span></li>
	        <li><span><FormattedMessage id = 'assignment_list'/></span></li>
	      </ul>
	    </div>
	    <div className={styles.topicsListheader}>
	      <h2 className={styles.headingTxt}><FormattedMessage id ='welcome_room'/><span>{this.props.roomName}</span></h2>
	      <p><FormattedMessage id = 'list_assignments'/></p>
	    </div>
	    <div className={styles.topicsListBody}>
  			<ul>
  				{
  					this.props.workDashboardData && this.props.workDashboardData.assignmentData && this.props.workDashboardData.assignmentData.length > 0
				    ?
					    this.props.workDashboardData.assignmentData.map((data, index) => {
					    	return <AssignmentData key={data._id} data={data} contantCallback={this.handleFullAssignment.bind(this, index)} sync={this.props.workDashboardData.sync} imHost={this.props.imHost} confObject={this.props.confObject} isGuest = {this.props.isGuest} />
					    }) 
					  : <li>
				      <Row>
				      	<div className={styles.listTitle}>
				          <p><FormattedMessage id = 'no_assignments_yet'/> </p>
				        </div>
				      </Row>
				    </li>
  				}
  			</ul>
  		</div>
	  </div>
    : null

		return (
			<div>
      	{assignmentList}
		 		{this.props.workDashboardData.assignmentContent ?
		 			<AssignmentContent roomName = {this.props.roomName} confObject={this.props.confObject} imHost={this.props.imHost} syncCallback={this.syncCallback.bind(this)}  assignmentListCallback={this.handleList.bind(this)} isGuest = {this.props.isGuest} />
		 		: null}
		 </div>
		)		
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    workDashboardData : workDashboardData(state),
    loggedInData: loggedInData(state)
  };
}

AssignmentList.propTypes = {
	// dashboardData: PropTypes.object,
  workDashboardData: PropTypes.object
};

export default connect(mapStateToProps)(AssignmentList);
