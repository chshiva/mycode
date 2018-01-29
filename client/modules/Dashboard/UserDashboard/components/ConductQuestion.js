import React, { PropTypes, Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from '../../Dashboard.css';
import {Col, Row, Grid} from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setDashboard } from '../UserDashboardActions';
import { dashboardData } from '../UserDashboardReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import { Roles } from '../../../../roles.js';
import TopicList from './TopicList';
import TopicContent from './TopicContent';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import Subjective from './Subjective';
import MultipleResponsive from './MultipleResponsive';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, getQuestions, SaveAnswersRequest } from './WorkDashboardActions';
import compStyles from '../../../../components/component.css';
import moment from 'moment';
import Loading from '../../../App/components/Loading';
import dataStyle from '../../../../components/DataTable/DataTable.css'; 
import { workDashboardReload } from './WorkDashboardReloadReducer';
var _ = require('lodash');

//All changes - Prateek
class ConductQuestion extends Component{

	constructor(props) {
		super(props);
		
		this.state = {
			answers : {},
			submitted : false,
			totalMarks : 0,
			loading : true,
			error : ''			     					
		}
	}

	componentWillReceiveProps(nextProps){

		if (this.props.workDashboardReload.conductQuestion != nextProps.workDashboardReload.conductQuestion) {
			let questionnaireId = this.props.workDashboardData.questionnaireId;
			let topicId = this.props.workDashboardData.tid;
			let uid = this.props.workDashboardData.uid;
			this.props.dispatch(getQuestions({questionnaireId, topicId})).then(res => this.setServerResponse(res));	
		}

		var questionData = nextProps.workDashboardData &&  nextProps.workDashboardData.questionsData && nextProps.workDashboardData.questionsData.questions && nextProps.workDashboardData.questionsData.questions != null ?
		nextProps.workDashboardData.questionsData.questions : [] ;
		var submittedBy = nextProps.workDashboardData.submittedData ? nextProps.workDashboardData.submittedData.submittedBy : null 
		var submittedData = nextProps.workDashboardData.submittedData
		var answerData = nextProps.workDashboardData.submittedData ? nextProps.workDashboardData.submittedData.answers : null 

		if((_.isEmpty(submittedData) && submittedBy == undefined) || (submittedData == undefined && submittedBy == null && _.isEmpty(questionData))) {
		 	this.setState({
				submitted : true
			})
		} 
		if (submittedData && submittedData.submittedBy) {
		 	this.setState({
				submitted : true
			})
		} 
		if (submittedData == undefined && submittedBy == null && (_.isEmpty(questionData) == false)) {
		 	this.setState({
				submitted : false
			})
		} 

		let questionnaireId = this.props.workDashboardData.questionnaireId;		
		let topicData = this.props.workDashboardData.topicContentDataDetails;	
		var questionnaireIndex = _.findIndex(topicData.questionnaire, function(o) { return o.questionnaireId._id == questionnaireId; });
		
		

	  let marks = 0;	
	  if(questionData != undefined) {
		  questionData.forEach(function(eachQuestion) {
				if(eachQuestion.marks != undefined) {
					marks += eachQuestion.marks;
				}  			
			});
		}
		this.setState({
  		totalMarks : marks	  		
  	})	  
	}

	componentDidMount() {
		let questionnaireId = this.props.workDashboardData.questionnaireId;
		let topicId = this.props.workDashboardData.tid;
		let uid = this.props.workDashboardData.uid;
		this.props.dispatch(getQuestions({questionnaireId, topicId})).then(res => this.setServerResponse(res));				
	}

	setServerResponse = (res) => {
		if(res.status) {
			this.setState({
				loading : false
			})
		} else {
			if(res.error[0] == 'Questionnaire not yet started') {
        this.props.dispatch(setWorkDashboard({topicContent: true, conductQuestion : false, questionnaireId: '', questionnaireName: ''}));
      } else {        
        this.setState({ error : res.error[0] == 'Result not found'?'not_attempted':'no_data_yet' })
      }
		}
	}

	componentWillUnmount() {
		this.props.dispatch(setDashboard({questionData : '', answerData : '', message : ''}));	
	}

	handleTopicList() {
		this.props.dispatch(setWorkDashboard({/*topicContent: false,*/ topicList : true, conductQuestion : false, questionData : null, questionnaireId:'', questionnaireName:''}));
		this.props.topicListCallback();
	}

	handleTopicName() {
    this.props.dispatch(setWorkDashboard({topicContent: true, conductQuestion : false, questionData : null, questionnaireId:'', questionnaireName:'' }));
		this.props.contantCallback(this.props.workDashboardData.topicContentDataDetails);
	}

  handleRadioAnswer(data, e){
    const oldState = this.state.answers;
    oldState[data._id] = []
    oldState[data._id].push(e.target.value)
    this.setState({answers: oldState})
  }

  handleCheckboxAnswer(data, e){
  	const value = e.target.value.split(',')[0]
  	const index = e.target.value.split(',')[1]
    const oldState = this.state.answers;
    
    if(oldState[data._id] !== undefined) {
    	if(_.includes(oldState[data._id], value)) {
    		oldState[data._id].pop(value);
    	} else {
    		oldState[data._id].splice(index,0,value)
    	}
    } else {
    	oldState[data._id] = [];
    	oldState[data._id].push(value);
    }
    this.setState({answers: oldState})
  }

  submitAnswers = () => {
		let questionnaireId = this.props.workDashboardData.questionnaireId;
		let topicId = this.props.workDashboardData.tid;
		let roomId = this.props.roomId;
		let uid = this.props.workDashboardData.uid;
		let response = this.setResponse;
		let self = this;
		
		alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.confirm_submit_alert, 
	    function (result) {
	      if(result) { 
	      	self.setState({
						submitted : true,
						loading : true,
						error : ''
					});        
	        var obj = {
						questionnaireId : questionnaireId,
						submittedBy : uid,
						topicId : topicId,
						roomId : roomId,
						answers : self.state.answers,
						totalMarks : self.state.totalMarks
					};
	        self.props.dispatch(SaveAnswersRequest(obj)).then(res => self.setResponse(res)); 
	      }
	    },
	    function() {

	    }
	  ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});		
	};

	setResponse(res) {
		let questionnaireId = this.props.workDashboardData.questionnaireId;
		let topicId = this.props.workDashboardData.tid;
		this.props.dispatch(getQuestions({questionnaireId, topicId})).then(res => this.setServerResponse(res));	
		if(res.status) {
			if(res.status && res.message == 'Your answers will not be considered as questionnaire end time has been completed') {
				alertify.alert(res.message)				
			}	
			this.setState({
				loading : false
			})	
		} else {
			this.setState({
				error : 'no_data_yet'
			})
		}	
	}

  render() {
		let cls_marksInlineCss = `${styles.marksCss} pull-right`;
		let cls_resultsUserName = `${styles.resultsUserName} text-center`;
	
		if (this.props.workDashboardData.questionsData) {
		  return (
				<div>
					<div className={styles.whiteCard}>
						<div className={styles.breadCrum}>
							<ul>
							 	<li>
									<Link id="roomName"><span>{this.props.roomName}</span></Link>
							 	</li>
							 	<li><span>/</span></li>
								<li>
							 		<Link id="TopicList" onClick={this.handleTopicList.bind(this)}><span><FormattedMessage id ="topics_list"/></span></Link>
							 	</li>
								<li><span>/</span></li>
								<li>
									<Link id="TopicName" onClick={this.handleTopicName.bind(this)}><span>{this.props.workDashboardData && this.props.workDashboardData.topicContentDataDetails && this.props.workDashboardData.topicContentDataDetails.topicName ? this.props.workDashboardData.topicContentDataDetails.topicName : null}</span></Link>
							 	</li>
							 	<li><span>/</span></li>
								<li>
									<span>{this.props.workDashboardData.questionnaireName}</span>
								</li>													
							</ul>
						</div>
						{!this.state.loading 
						?
							<div>
								{
									(this.props.workDashboardData.questionsData.openFrom == undefined && this.props.workDashboardData.questionsData.closeFrom == undefined)
									?
										<div className={styles.topicViewheader}>
								      <h3 className={styles.mainHeadingTxt}>{this.props.workDashboardData.questionsData.questionnaireName}				        	
								      </h3>				      
											<p>
												<FormattedMessage id = 'no_time_limitations'/>				    
								      </p>
								      <div className={styles.studentHeaderMarksInfo}>
								      	{this.state.totalMarks != 0
								      	?
									      	<Row>		                  
					                  {!_.isEmpty(this.props.workDashboardData.submittedData) && this.props.workDashboardData.submittedData.result != undefined
					                  ?
					                  	<div>
						                  	<Col md={4}>
													      	<div className={styles.resultUserDetails}>
								                    <h2 className={cls_resultsUserName}>              
								                    	<FormattedMessage id ='Marks'/>
								                    </h2>
								                    <div className={styles.gradeVal}>
								                      <h2>
								                      	<span>{this.props.workDashboardData.submittedData.obtainedMarks}</span> / <span className={styles.optainMarks}>{this.props.workDashboardData.submittedData.totalMarks}</span>
								                      </h2>
								                    </div>                    
								                  </div>
						                  	</Col>
							                  <Col md={4}>
								                  <div className={styles.resultUserDetails}>
								                    <h2 className={cls_resultsUserName}>
								                    	<FormattedMessage id ='grade'/>
								                    </h2>
								                    <div className={styles.gradeVal}>
								                      <h2>{this.props.workDashboardData.submittedData.grade}</h2>
								                    </div>
								                  </div>
							                  </Col>
							                  <Col md={4}>
							                    <div className={styles.resultUserDetails}>
							                      <h2 className={cls_resultsUserName}>
							                      	<FormattedMessage id ='questionnaire_result'/>
							                      </h2>
							                      <div className={styles.precentageVal}>
							                        <h2>{this.props.workDashboardData.submittedData.questionnairePercentage}<span>%</span></h2>
							                      </div>
							                      <div className={styles.resultBg}>
							                        {/*<span className={this.state.gradeColor}></span>*/}
							                        <span className={styles.resultTxt}>{this.props.workDashboardData.submittedData.result}</span>
							                      </div>
							                    </div>
							                  </Col>
							                </div>
						                :
						                	<div>
							                	<Col md={4}>
													      	<div className={styles.resultUserDetails}>
								                    <h2 className={cls_resultsUserName}>                 
								                    	<FormattedMessage id ='total_marks'/>
								                    </h2>
								                    <div className={styles.gradeVal}>
								                      <h2>{this.state.totalMarks}</h2>
								                    </div>                    
								                  </div>
						                  	</Col>
						                  </div>
					                 	}
					                </Row>
					              :null}					      	
								      </div>
											{
												_.isEmpty(this.props.workDashboardData.submittedData)
												?
												<p><FormattedMessage id = 'choose_question_answers'/></p>
												: null
											}
										</div>
									: <div className={styles.topicViewheader}>
								      <h1 className={styles.mainHeadingTxt}>{this.props.workDashboardData.questionsData.questionnaireName}</h1>
											<p>
												<FormattedMessage id ='start_date'/> : {moment(this.props.workDashboardData.questionsData.openFrom).format('DD/MM/YYYY hh:mm A')}	
											</p>
										 	<p>
												<FormattedMessage id ='end_date'/> : {moment(this.props.workDashboardData.questionsData.closeFrom).format('DD/MM/YYYY hh:mm A')}	
											</p>
											<div className={styles.studentHeaderMarksInfo}>
								      	{this.state.totalMarks != 0
								      	?
									      	<Row>		                  
					                  {!_.isEmpty(this.props.workDashboardData.submittedData) && this.props.workDashboardData.submittedData.result != undefined
					                  ?
					                  	<div>
						                  	<Col md={4}>
													      	<div className={styles.resultUserDetails}>
								                    <h2 className={cls_resultsUserName}>              
								                    	<FormattedMessage id ='Marks'/>
								                    </h2>
								                    <div className={styles.gradeVal}>
								                      <h2>
								                      	<span>{this.props.workDashboardData.submittedData.obtainedMarks}</span> / <span className={styles.optainMarks}>{this.props.workDashboardData.submittedData.totalMarks}</span>
								                      </h2>
								                    </div>                    
								                  </div>
						                  	</Col>
							                  <Col md={4}>
								                  <div className={styles.resultUserDetails}>
								                    <h2 className={cls_resultsUserName}>
								                    	<FormattedMessage id ='grade'/>
								                    </h2>
								                    <div className={styles.gradeVal}>
								                      <h2>{this.props.workDashboardData.submittedData.grade}</h2>
								                    </div>
								                  </div>
							                  </Col>
							                  <Col md={4}>
							                    <div className={styles.resultUserDetails}>
							                      <h2 className={cls_resultsUserName}>
							                      	<FormattedMessage id ='questionnaire_result'/>
							                      </h2>
							                      <div className={styles.precentageVal}>
							                        <h2>{this.props.workDashboardData.submittedData.questionnairePercentage}<span>%</span></h2>
							                      </div>
							                      <div className={styles.resultBg}>
							                        {/*<span className={this.state.gradeColor}></span>*/}
							                        <span className={styles.resultTxt}>{this.props.workDashboardData.submittedData.result}</span>
							                      </div>
							                    </div>
							                  </Col>
							                </div>
						                :
						                	<div>
							                	<Col md={4}>
													      	<div className={styles.resultUserDetails}>
								                    <h2 className={cls_resultsUserName}>                 
								                    	<FormattedMessage id ='total_marks'/>
								                    </h2>
								                    <div className={styles.gradeVal}>
								                      <h2>{this.state.totalMarks}</h2>
								                    </div>                    
								                  </div>
						                  	</Col>
						                  </div>
					                 	}
					                </Row>
					              :null}					      	
								      </div>
								      	{_.isEmpty(this.props.workDashboardData.submittedData)
												?								      	
												<p><FormattedMessage id = 'choose_question_answers'/></p>
												:null}	
					    			</div>
						    }
						    <div className={styles.topicsListBody}>
						    	<ul>
								    {
						          this.props.workDashboardData.questionsData.questions
						          ?
						          this.props.workDashboardData.questionsData.questions.length > 0
									    ?
									    !_.isEmpty(this.props.workDashboardData.submittedData) 
									    ?
									    this.props.workDashboardData.questionsData.questions.map((data, index) => {
									    	var indexQuestion = index;
									    	if(data.questionType == "Radio") {
									    		return <MultipleChoice data = {data} key={indexQuestion} wrong = {this.props.workDashboardData.submittedData.wrongAns} correct = {this.props.workDashboardData.submittedData.correctAns} showResult={this.props.workDashboardData.submittedData.result}/>
									    	} else if (data.questionType == "Checkbox") {
									    		return <MultipleResponsive data = {data} key={indexQuestion} wrong = {this.props.workDashboardData.submittedData.wrongAns} correct = {this.props.workDashboardData.submittedData.correctAns} showResult={this.props.workDashboardData.submittedData.result}/>
									    	} else if (data.questionType == "TF") {
									    		return <TrueFalse data = {data} key={indexQuestion} wrong = {this.props.workDashboardData.submittedData.wrongAns} correct = {this.props.workDashboardData.submittedData.correctAns} showResult={this.props.workDashboardData.submittedData.result}/>
									    	} else if (data.questionType == "Subjective") {
									    		// return <Subjective data = {data} key={indexQuestion} answer={this.handleRadioAnswer.bind(this, data)} />
									    	}
										    }) 
									    :

									    this.props.workDashboardData.questionsData.questions.map((data, index) => {
									    	var indexQuestion = index
									    	if(data.questionType == "Radio") {
									    		return <MultipleChoice data = {data} key={indexQuestion} checked={this.state.answers} answer={this.handleRadioAnswer.bind(this, data)} />
									    	} else if (data.questionType == "Checkbox") {
									    		return <MultipleResponsive data = {data} key={indexQuestion} answer={this.handleCheckboxAnswer.bind(this, data)} />
									    	} else if (data.questionType == "TF") {
									    		return <TrueFalse data = {data} key={indexQuestion} checked={this.state.answers} answer={this.handleRadioAnswer.bind(this, data)} />
									    	} else if (data.questionType == "Subjective") {
									    		return <Subjective data = {data} key={indexQuestion} answer={this.handleRadioAnswer.bind(this, data)} />
									    	}
										    }) 
									    	: 
									    	<div className={dataStyle.noDataBox}>          
							            <h2>
							              <FontAwesome name="frown-o" />
							            </h2>
								    			<p><FormattedMessage id ='no_questions_yet'/></p>
								    		</div>
						            : 
						            <div className={dataStyle.noDataBox}>          
							            <h2>
							              <FontAwesome name="frown-o" />
							            </h2>
							            <p><FormattedMessage id ='not_attempted'/></p>
							          </div>
					          }
						    	</ul>
						    	{
						    		this.state.submitted != true 
									  ?
										<div className={styles.submitBtnBlock}>
											<div className="pull-right">
												<button id="submitAnswers" type="submit" className={styles.btnApplyAll} onClick={this.submitAnswers}>
														<FontAwesome name="fa-paper-plane"></FontAwesome> <FormattedMessage id='submit' />
												</button>
											 </div>
										</div>
										: null
						    	}
						    </div>
					    </div>
				    :this.state.error != ''
				    ?
				    <div className={dataStyle.noDataBox}>          
	            <h2>
	              <FontAwesome name="frown-o" />
	            </h2>
	            <p><FormattedMessage id ={this.state.error}/></p>
        		</div> :
        		<Loading loadType = 'list'/>}
					</div>
		    </div>
			)
		} else {
			return null;
		}
		
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
  	loggedInData: loggedInData(state),
    dashboardData: dashboardData(state),
    workDashboardData : workDashboardData(state),
    intl: state.intl,
    workDashboardReload: workDashboardReload(state)
  };
}

ConductQuestion.contextTypes = {

};

ConductQuestion.propTypes = {
	loggedInData: PropTypes.object,
	intl: PropTypes.object,
  workDashboardData: PropTypes.object
};

export default connect(mapStateToProps)(ConductQuestion);
