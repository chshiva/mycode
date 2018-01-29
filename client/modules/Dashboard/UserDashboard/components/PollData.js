import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import { Roles } from  '../../../../roles';
import { publishPollRequest, getPollSubmissionsRequest } from './WorkDashboardActions';
import { workDashboardData } from './WorkDashboardReducer';
var _ = require('lodash');
import WoogeenManager from '../../../Communication/WoogeenManager';


class PollData extends Component{

	constructor(props) {
		super(props)
		this.state = {
			submitted : false
		}
		this.confObject = new WoogeenManager();
	}

	componentDidMount() {
    if(this.props.data && this.props.data.submissions && this.props.data.submissions.length > 0) {
    	var user = _.find(this.props.data.submissions, ['submittedBy._id', this.props.workDashboardData.uid]);
    	if(user != undefined) {
	    	this.setState({
	    		submitted : true
	    	})
	    }
    }
  }

	handleFullPoll(){
		this.props.contantCallback();
	}


	//Code changed by - Najib, Desc - routing is called only for non-guest users
	viewUser() {
		if(!this.props.isGuest) {			
    	browserHistory.push('/profile/'+this.props.data.createdBy._id)	
		}
  }

  publishPoll(pollData) {
  	let pollInfo = pollData;
  	if (pollInfo.publish == false) {
  		let pollData = {
	  		roomId : this.props.roomId,
	  		pollId : pollInfo._id
  		} 
  		this.props.dispatch(publishPollRequest(pollData)).then(res => this.setPublishResponse(res));
  	}
  }

  setPublishResponse(res) {
  	let obj = {
	      command : 'RELOAD_POLLS_LIST',
	      content : {},
	      type : 'OBJECT'
	    };

   this.confObject.sendMessage(obj, 0);
  } 

  viewResults() {
  	let pollData = {
			roomId : this.props.roomId,
			pollId : this.props.data._id,
		}
  	this.props.dispatch(getPollSubmissionsRequest(pollData)).then(res => this.setSubmissionResponse(res));
  }

  setSubmissionResponse(res) {
  	let data = res.data;
		this.props.resultCallback(data.pollContentData);
  }


	render(){
		let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
		let cls_topicAuthorGuest = `clearfix ${styles.topicAuthorGuest}`;
		let cls_publishBtn = `${styles.btnPost} ${styles.btnApplyAll}`;
		let data = this.props.data
    let profileImage = data ? data.createdBy ? data.createdBy.profile ? data.createdBy.profile.profileImage:'':'':''
    if(profileImage == '' || profileImage == undefined || profileImage == null) {
      var imagePath = '/images/profile-pics/defaultStudent.jpg'
    } else {
      var imagePath = '/uploads/'+profileImage
    }
		if(this.props.data != null){
			return(
				<li>
					<Row>
						<div className={styles.listTitle}>
							<Link id="fullPoll" onClick={this.handleFullPoll.bind(this)}>{this.props.data.question}</Link>
						</div>
					</Row>
					<Row>
						<Col md={5}>
							<div className={this.props.isGuest ? cls_topicAuthorGuest : cls_topicAuthor}>
								<img id="viewprofile" src={imagePath} onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile} />
								<div className={styles.authorInfo}>
									<p className={styles.authorName}>{this.props.data.createdBy.firstname} {this.props.data.createdBy.lastname}</p>
									<p className={styles.authorDisg}><FormattedMessage id = 'author'/></p>
								</div>
							</div>
						</Col>
						{
							this.props.role != Roles.Student
							?
							this.props.data.createdBy._id == this.props.workDashboardData.uid
							?
							<Col md={3}>
								<div className={styles.shortDecBlock}>
									<span className={styles.fullTopic}>
										{
											this.props.data.publish
											?
												<span><FormattedMessage id = 'published'/></span>
											:
												<button id="publishPoll" className={cls_publishBtn} onClick={this.publishPoll.bind(this,this.props.data)}>
													<FormattedMessage id = 'publish'/>
												</button>
										}
									</span>
								</div>
							</Col>
							: <Col md={3}></Col>
							:
							this.props.role == Roles.Student
							?
							this.state.submitted
							?
							<Col md={4}>
								<div className={styles.shortDecBlock}>
									<span className={styles.fullTopic}>
										<Link id="viewResults" onClick={this.viewResults.bind(this)}>
											<FormattedMessage id ='view_result'/>
										</Link>
									</span>
								</div>
							</Col>
							: <Col md={4}></Col>
							: null
						}
						{
							this.props.role != Roles.Student 							
							?
							this.props.data.publish 
							?
							<Col md={2}>
								<div className={styles.shortDecBlock}>
									<span className={styles.fullTopic}><Link id="viewResults" onClick={this.viewResults.bind(this)}><FormattedMessage id ='view_result'/></Link></span>
								</div>
							</Col>
							:null
							: 
							this.state.submitted != true
							?
							<Col md={2}>
								<div className={styles.shortDecBlock}>
									<span className={styles.fullTopic}><Link id="submitPoll" onClick={this.handleFullPoll.bind(this)}><FormattedMessage id ='submit_poll'/></Link></span>
								</div>
							</Col>
							: 
							<Col md={2}>
								<div className={styles.shortDecBlock}>
									<span className={styles.fullTopic}><FormattedMessage id = 'submitted'/></span>
								</div>
							</Col>
						}
						{
							this.props.role != Roles.Student && this.props.data.publish
							?
							this.state.submitted != true 
							?
							<Col md={2}>
								<div className={styles.shortDecBlock}>
									<span className={styles.fullTopic}><Link id="submitPoll" onClick={this.handleFullPoll.bind(this)}><FormattedMessage id ='submit_poll'/></Link></span>
								</div>
							</Col>
							: 
							<Col md={2}>
								<div className={styles.shortDecBlock}>
									<span className={styles.fullTopic}><FormattedMessage id = 'submitted'/></span>
								</div>
							</Col>
							: null
						}
					</Row>
				</li>
			);
		}else return;
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    workDashboardData : workDashboardData(state)
  };
}

PollData.contextTypes = {
	intl: React.PropTypes.object.isRequired

};

PollData.propTypes = {
  intl: PropTypes.object,
};

export default connect(mapStateToProps)(PollData);

