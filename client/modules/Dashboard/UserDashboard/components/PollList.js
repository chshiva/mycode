import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import PollContent from './PollContent';
import PollData from './PollData';
import CreatePoll from './CreatePoll';
import PollSubmissionList from './PollSubmissionList';
import PollReports from './PollReports';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, getConferencePollData} from './WorkDashboardActions';
import { Roles } from  '../../../../roles';
import { workDashboardReload } from './WorkDashboardReloadReducer';


class PollList extends Component{

	constructor(props) {
		super(props)
		this.state = {
			refresh : false,
			pollListData : []
		}
	}

	componentDidMount() {
		let obj = {
      roomKey: this.props.roomKey
    }
		this.props.dispatch(getConferencePollData(obj));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.workDashboardReload.pollList != nextProps.workDashboardReload.pollList) {
			let obj = {
	      roomKey: this.props.roomKey
	    }
			this.props.dispatch(getConferencePollData(obj));
		}
	}

	handleFullPoll(index, data) {
		let obj = { current : 'pollList', pollContent: true, pollList : false, pollContentData : data, pollContentIndex : index, createPoll: false, submissionList : false, pollReports : false};
		if (data.publish == true) {
			this.handleWorkDashboard(obj);
		} else {
			this.props.dispatch(setWorkDashboard(obj));
		}
	}

	handleList() {
		let obj = {current : 'pollList', pollContent: false, pollList : true, createPoll: false, submissionList : false, pollReports : false};
		this.handleWorkDashboard(obj);
	}

	handleWorkDashboard = (obj) => {
		this.props.imHost == true && this.props.workDashboardData.sync == true ?
    		this.props.syncCallback(obj)
		: this.props.dispatch(setWorkDashboard(obj));
	}

	syncCallback(obj) {
		this.props.syncCallback(obj);
	}

	createPoll() {
		let obj = { current : 'pollList', pollContent: false, pollList : false, pollContentData : null, pollContentIndex : null, createPoll: true, submissionList : false, pollReports : false};
		this.props.dispatch(setWorkDashboard(obj))
	}

	updatePoll() {
		let obj = { current : 'pollList', pollContent: false, pollList : false, createPoll: true, submissionList : false, pollReports : false};
		this.props.dispatch(setWorkDashboard(obj))
	}

	refreshPollList() {
		this.setState({
			refresh : true
		});
		let obj = {
      roomKey: this.props.roomKey
    }
		this.props.dispatch(getConferencePollData(obj)).then(res => this.setResponse(res)); 
	}

	setResponse(res) {
		this.setState({
			refresh : false
		})
	}

	viewResults(index, data) {
		let obj = { current : 'pollList', pollContent: false, pollList : false, pollContentData : data, pollContentIndex : index, createPoll: false, submissionList : false, pollReports : true};
		if (data.publish == true) {
			this.handleWorkDashboard(obj);
		} else {
			this.props.dispatch(setWorkDashboard(obj));
		}
	}

	render() {
    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let cls_authorsBox = `clearfix ${styles.authorsBox}`;

		const pollList = this.props.workDashboardData.pollList
	    ?
			<div className={styles.whiteCard}>
				<div className={styles.breadCrum}>
		      <ul>
		        <li>
		          <Link><span>{this.props.roomName}</span></Link>
		        </li>
		        <li><span>/</span></li>
		        <li><span><FormattedMessage id = 'poll_list'/></span></li>
		      </ul>
		      <div className={styles.absoluteRightActionBlock}>
	          <ul>
	          	<li>
	              <Link onClick={this.refreshPollList.bind(this)} title={this.props.intl.messages.refresh_polls}> 
	              	<div className={styles.iconBox}>
	              		<img src="/images/black-icons/black-regenerate.png" className = {this.state.refresh == true ? styles.spinAnimation : null} /> 
	              	</div>
	              </Link>
	            </li>
	            {
				      	this.props.role != Roles.Student && this.props.isGuest == false
				      	?
		            <li>
			            <Link title={this.props.intl.messages.create_poll} onClick={this.createPoll.bind(this)}>
			              <div className={styles.iconBox}>
			                <img src="/images/black-icons/black-create-poll.png"  alt="manage-poll-icon"/>
			              </div>
			            </Link>
		          	</li>
		          	: null
		          }
	          </ul>
	        </div>
		    </div>
		    <div className={styles.topicsListheader}>
		      <h2 className={styles.headingTxt}><FormattedMessage id ='welcome_room'/><span>{this.props.roomName}</span></h2>
		      <p><FormattedMessage id = 'list_polls'/></p>
		    </div>
		    <div className={styles.topicsListBody}>
	  			<ul>
	  				{
	  					// this.state.pollListData && this.state.pollListData.length > 0
					    this.props.workDashboardData && this.props.workDashboardData.pollListData && this.props.workDashboardData.pollListData.length > 0
					    ?
						    this.props.workDashboardData.pollListData.map((data, index) => {
						    	return <PollData key={data._id} data={data} contantCallback={this.handleFullPoll.bind(this, index, data)} sync={this.props.workDashboardData.sync} imHost={this.props.imHost} confObject={this.props.confObject} role={this.props.role} roomId = {this.props.roomId} resultCallback={this.viewResults.bind(this, index)} isGuest={this.props.isGuest} />
						    }) 
						  : <li>
					      <Row>
					      	<div className={styles.listTitle}>
					          <p><FormattedMessage id = 'no_polls_yet'/> </p>
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
	      	{pollList}
			 		{this.props.workDashboardData.pollContent ?
			 			<PollContent roomName = {this.props.roomName} confObject={this.props.confObject} imHost={this.props.imHost} syncCallback={this.syncCallback.bind(this)}  pollListCallback={this.handleList.bind(this)} role={this.props.role} updatePollCallback={this.updatePoll.bind(this)} roomId = {this.props.roomId} isGuest={this.props.isGuest} roomKey = {this.props.roomKey}/>
			 		: null}
			 		{this.props.workDashboardData.createPoll ?
			 			<CreatePoll roomName = {this.props.roomName} pollListCallback={this.handleList.bind(this)} roomId = {this.props.roomId} isGuest={this.props.isGuest} roomKey = {this.props.roomKey}/>
			 		: null}
			 		{this.props.workDashboardData.submissionList ?
			 			<PollSubmissionList roomName = {this.props.roomName} pollListCallback={this.handleList.bind(this)} roomId = {this.props.roomId}/>
			 		: null}
			 		{this.props.workDashboardData.pollReports ?
			 			<PollReports roomName = {this.props.roomName} pollListCallback={this.handleList.bind(this)} roomId = {this.props.roomId}/>
			 		: null}
			 </div>
			)		
		}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    workDashboardData : workDashboardData(state),
    intl: state.intl,
    workDashboardReload: workDashboardReload(state)
  };
}

PollList.propTypes = {
  workDashboardData: PropTypes.object
};

export default connect(mapStateToProps)(PollList);
