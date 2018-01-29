import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import TopicContent from './TopicContent';
import TopicData from './TopicData';
import ConductQuestion from './ConductQuestion';
import PdfView from './PdfView';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, getConferenceTopicsList } from './WorkDashboardActions';
import { workDashboardReload } from './WorkDashboardReloadReducer';
import { Roles } from '../../../../roles';
import Analytics from '../../../Communication/Analytics';
import { questionnaireData } from '../../../Admin/Questionnaire/QuestionnaireReducer';


class TopicList extends Component{

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let obj = {
      roomKey: this.props.roomKey
    }
		this.props.dispatch(getConferenceTopicsList(obj));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.workDashboardReload.topicList != nextProps.workDashboardReload.topicList) {
			let obj = {
      	roomKey: this.props.roomKey
   		}
			this.props.dispatch(getConferenceTopicsList(obj));
		}
	}

	handleFullTopic(data) {
		let obj = { current: 'topicList', topicContent: true, topicList: false, tid: data._id, conductQuestion: false, questionData: null, pdfView: false, topicPdfFileData: null };
		var _objAnalytics = new Analytics();
		let logObj = {
			topicId: data._id,
			roomId : this.props.roomId
		}

		_objAnalytics.UpdateLog( logObj );
		
		// console.log("topic-data", TopicObj);
		this.handleWorkDashboard(obj);
	}

	handleList(){
		let obj = {current : 'topicList', topicContent: false, topicList : true, conductQuestion : false, conductQuestion : false, questionData : null, pdfView : false, topicPdfFileData: null }
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
    let topicLink = '/admin/room/listtopic/' + this.props.roomId;
    let assignmentLink = '/admin/room/assignments/' + this.props.roomId;
    let questionnaireLink = '/admin/questionnaire/list';

		const topicList = this.props.workDashboardData.topicList
	    ?
			<div className={styles.whiteCard}>
				<div className={styles.breadCrum}>
		      <ul>
		        <li>
		          <Link><span>{this.props.roomName}</span></Link>
		        </li>
		        <li><span>/</span></li>
		        <li><span><FormattedMessage id = 'topics_list'/></span></li>
		      </ul>
		      {
		      	this.props.role == Roles.Lmsadmin || this.props.role == Roles.Instructor
		      	?
			      <div className={styles.absoluteRightActionBlock}>
		          <ul>
		            <li>
			            <Link to={topicLink} title={this.props.intl.messages.add_topics} >
			              <div className={styles.iconBox}>
			                <img src="/images/black-icons/black-topics.png"  alt="manage-topics-icon"/>
			              </div>
			            </Link>
		          	</li>
		          	<li>
		              <Link to={questionnaireLink} title={this.props.intl.messages.manage_questionnaire}>
		                <div className={styles.iconBox}>
		                  <img src="/images/black-icons/black-questionnaire.png"  alt="manage-questionnaire-icon"/>
		                </div>
		              </Link>
		            </li>
		          	<li>
		              <Link to={assignmentLink} title={this.props.intl.messages.manage_assignments}>
		                <div className={styles.iconBox}>
		                  <img src="/images/black-icons/black-assignments.png"  alt="manage-assignments-icon"/>
		                </div>
		              </Link>
		            </li>
		          </ul>
		        </div>
		        : null
		      }
		    </div>
		    <div className={styles.topicsListheader}>
		      <h2 className={styles.headingTxt}><FormattedMessage id ='welcome_room'/><span>{this.props.roomName}</span></h2>
		      <p><FormattedMessage id = 'list_topics'/></p>
		    </div>
		    <div className={styles.topicsListBody}>
	  			<ul>
	  				{
	  					this.props.workDashboardData.topiclistData.length > 0
					    ?
						    this.props.workDashboardData.topiclistData.map((data) => {
						    	return <TopicData key={data._id} data={data} contantCallback={this.handleFullTopic.bind(this)} sync={this.props.workDashboardData.sync} imHost={this.props.imHost} confObject={this.props.confObject} isGuest={this.props.isGuest} />
						    }) 
						  : <li>
					      <Row>
					      	<div className={styles.listTitle}>
					          <p><FormattedMessage id = 'no_topics_yet'/> </p>
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
					{topicList}
			 		{this.props.workDashboardData.topicContent ?
			 			<TopicContent roomId = {this.props.roomId} roomName = {this.props.roomName} confObject={this.props.confObject} imHost={this.props.imHost} syncCallback={this.syncCallback.bind(this)}  topicListCallback={this.handleList.bind(this)} role= {this.props.role} isGuest={this.props.isGuest} />
			 		: null}
			 		{(this.props.workDashboardData.conductQuestion && this.props.questionnaireData && this.props.questionnaireData.gradeData) || (this.props.workDashboardData.conductQuestion && this.props.questionnaireData && this.props.questionnaireData.gradeData == null)
	          ?
			 			<ConductQuestion roomId = {this.props.roomId} roomName = {this.props.roomName} topicListCallback={this.handleList.bind(this)} contantCallback={this.handleFullTopic.bind(this)} gradesData = {this.props.questionnaireData.gradeData}/>
			 		: null}
			 		{this.props.workDashboardData.pdfView ?
			 			<PdfView roomName = {this.props.roomName} imHost={this.props.imHost} topicListCallback={this.handleList.bind(this)} contantCallback={this.handleFullTopic.bind(this)} confObject={this.props.confObject} />
			 		: null}
			 </div>
			)		
		}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
  	intl: state.intl,
    workDashboardData : workDashboardData(state),
    questionnaireData: questionnaireData(state),
    workDashboardReload: workDashboardReload(state)
  };
}

TopicList.propTypes = {
  workDashboardData: PropTypes.object,
  questionnaireData : PropTypes.object
};

export default connect(mapStateToProps)(TopicList);
