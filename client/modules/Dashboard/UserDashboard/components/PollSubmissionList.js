import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import PollSubmissionData from './PollSubmissionData';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard } from './WorkDashboardActions';
import { dashboardData } from '../UserDashboardReducer';
import { Roles } from  '../../../../roles';


class PollSubmissionList extends Component{

	constructor(props) {
		super(props)
	}

	handleList(){
		let obj = {current : 'pollList', pollContent: false, pollList : true, pollContentData : null, pollContentIndex : null, createPoll: false, submissionList : false, pollReports : false};
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

	handlePollContent() {
		let obj = {current : 'pollList', pollContent: true, pollList : false, createPoll: false, submissionList : false, pollReports : false};
		this.handleWorkDashboard(obj);
	}

	render() {
    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let cls_authorsBox = `clearfix ${styles.authorsBox}`;

    let data = this.props.workDashboardData
    if(data.pollContentData && data.pollContentData.question && data.pollContentData.question.length > 10) {
      var question = data.pollContentData.question.substring(0,10) + '...'
    } else {
      var question = data.pollContentData.question
    }

		const submissionList = this.props.workDashboardData.submissionList
    ?
		<div className={styles.whiteCard}>
			<div className={styles.breadCrum}>
	      <ul>
	        <li>
	          <Link id="roomName"><span>{this.props.roomName}</span></Link>
	        </li>
	        <li><span>/</span></li>
	        <li>
						<Link id="pollList" onClick={this.handleList.bind(this)}><span><FormattedMessage id ="poll_list"/></span></Link>
					</li>
					<li><span>/</span></li>
					<li>
						<Link id="pollContent" onClick={this.handlePollContent.bind(this)}><span title={this.props.workDashboardData.pollContentData.question}>{question}</span></Link>
					</li>
					<li><span>/</span></li>
					<li><span><FormattedMessage id = 'submission_list'/></span></li>
	      </ul>
	    </div>
	    <div className={styles.topicsListheader}>
	      <p><FormattedMessage id = 'list_poll_submissions'/></p>
	    </div>
	    <div className={styles.topicsListBody}>
  			<ul>
  				{
  					this.props.workDashboardData.pollContentData.submissions.length > 0
				    ?
					    this.props.workDashboardData.pollContentData.submissions.map((data, index) => {
					    	return <PollSubmissionData key={data._id} data={data} sync={this.props.workDashboardData.sync} imHost={this.props.imHost} confObject={this.props.confObject} />
					    }) 
					  : <li>
				      <Row>
				      	<div className={styles.listTitle}>
				          <p><FormattedMessage id = 'no_submittions_yet'/> </p>
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
      	{submissionList}
		 </div>
		)		
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
  	dashboardData : dashboardData(state),
    workDashboardData : workDashboardData(state),
    intl: state.intl,
  };
}

PollSubmissionList.propTypes = {
	dashboardData: PropTypes.object,
  workDashboardData: PropTypes.object
};

export default connect(mapStateToProps)(PollSubmissionList);
