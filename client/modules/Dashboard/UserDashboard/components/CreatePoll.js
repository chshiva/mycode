import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import callApi from '../../../../util/apiCaller';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel, Modal} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import { connect } from 'react-redux';
import { dashboardData } from '../UserDashboardReducer';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import moment from 'moment';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, createPollRequest, getConferencePollData } from './WorkDashboardActions';
var _ = require('lodash');
import TextBox from './TextBox';
import compstyles from '../../../../components/component.css';
import WoogeenManager from '../../../Communication/WoogeenManager';


class CreatePoll extends Component {

	constructor(props) {
		super(props)
		this.setResponse = this.setResponse.bind(this)
		this.state = {
			question : '',
			values: [''],
			error: '',
			saveStatus : false
		}
		this.confObject = new WoogeenManager();
	}

	componentDidMount() {
    if(this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question) {
    	let data = this.props.workDashboardData.pollContentData 
    	this.setState({
    		question : data.question,
    		values : _.clone(data.options)
    	})
    }
  }

  handlePollList() {
		this.props.pollListCallback();
		let obj = {current : 'pollList', pollContent: false, pollList : true, pollContentData : null, pollContentIndex : null, createPoll: false, submissionList : false, pollReports : false};
		this.handleWorkDashboard(obj);
	}

	handleWorkDashboard = (obj) => {
		this.props.imHost == true && this.props.workDashboardData.sync == true ?
    		this.props.syncCallback(obj)
		: this.props.dispatch(setWorkDashboard(obj));
	}

	
	//Code changed by - Najib, Desc - routing is called only for non-guest users
  viewUser() {
  	if(!this.props.isGuest) {
  		browserHistory.push('/profile/'+this.props.workDashboardData.pollContentData.createdBy._id);
  	}    
  }

  handleQuestion(event) {
    this.setState({question: event.target.value});
  }

  handleOption(index, e){
    const oldState = this.state.values;
	  oldState[index] = e.target.value
    this.setState({values: oldState})
  }

  handleAddOption(){
    const oldState = this.state.values
    oldState.push('');
    this.setState({values: oldState})
  }

  handleRemoveOption(){
    const oldState = this.state.values
    oldState.pop('');
    this.setState({values: oldState})
  }

  createPoll = (publish, e) => {
  	e.preventDefault();
  	/* checking the state value for prevent the double click event */
  	if((!_.isEmpty(this.props.workDashboardData.pollContentData) && this.props.workDashboardData.pollContentData.submissions.length<=0) || this.props.workDashboardData.pollContentData == null) {
  		if (this.state.saveStatus == false) {
		    if(this.state.question == '') {
		    	this.setState({
						error: <FormattedMessage id='Please_fill_all_the_fields' />
		    	})
		    } else {
		      var emptyOptions = _.includes(this.state.values, '');
		      for(var i = 0; i < this.state.values.length; i++) {
		        if (/^\s+$/.test(this.state.values[i])) {
		          var whitespaceOptions = true
		        } else {
		          var whitespaceOptions = false;
		        }
		      }
		      var trimValues = _.map(this.state.values, _.trim);
		      var duplicateValues =  _.uniq(trimValues).length !== trimValues.length; 
		      if(emptyOptions) {
		      	this.setState({
							error: <FormattedMessage id='Please_fill_all_the_fields' />
			    	})
		      } else if (/^\s+$/.test(this.state.question)) {
		      	this.setState({
							error: <FormattedMessage id='question_name_cannot_have_only_white_spaces' />
			    	})
		      } else if (this.state.values.length < 2) {
		      	this.setState({
							error: <FormattedMessage id='Provide_atleast_Two_Options' />
			    	})
		      } else if (whitespaceOptions) {
		      	this.setState({
							error: <FormattedMessage id='options_cannot_have_only_white_spaces' />
			    	})
		      } else if (duplicateValues) {
		      	this.setState({
							error: <FormattedMessage id='Options_cannot_be_same' />
			    	})
		      } else {
		      	/* setting the state value true for prevent the double click event */
		      	this.setState({ saveStatus : true });
		      	var pollData = {
		          question: this.state.question.trim(),
		          options: trimValues,
		          roomId: this.props.roomId,
		          publish: publish,
		          pollId : this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question ? this.props.workDashboardData.pollContentData._id : '' 
		        }
		        this.props.dispatch(createPollRequest({pollData})).then(res => this.setResponse(res));
		      }
		    }
		  }
		} else {
			this.setState({
				question : this.props.workDashboardData.pollContentData.question,
				values : _.clone(this.props.workDashboardData.pollContentData.options) 
			})
			alertify.alert("Poll can't be updated as there are submissions based on this poll.");
		}
  }

  setResponse(res) {
  	/* updating the state value as false for prevent the double click event */
  	this.setState({ saveStatus : false });
  	//changeBy: pranathi, disc: added alert model boxes
  	if (res.status) {
  		alertify.alert("Sucess",res.message, 
        function() {
        }
      ).setting({'label': this.props.intl.messages.ok});

			this.props.pollListCallback();

			// changeBy: pranathi, disc: at the time of creating poll, updating workdashboard store
	    let obj = {
	      command : 'RELOAD_POLLS_LIST',
	      content : {},
	      type : 'OBJECT'
	    };

    	this.confObject.sendMessage(obj, 0);
  	} else {
  		alertify.alert(this.props.intl.messages.warning,res.error, 
        function() {
        }
      ).setting({'label': this.props.intl.messages.ok});
  	}
  }

  handlePollContent() {
		let obj = {current : 'pollList', pollContent: true, pollList : false, createPoll: false, submissionList : false, pollReports : false};
		this.handleWorkDashboard(obj);
	}

	render() {

    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let cls_authorsBox = `clearfix ${styles.authorsBox}`;
    let cls_btnSaveAssign = ` ${styles.btnSaveAssign} `;

    let data = this.props.workDashboardData.pollContentData;
    let profileImage = data ? data.createdBy ? data.createdBy.profile ? data.createdBy.profile.profileImage:'':'':''
    if(profileImage == '' || profileImage == undefined || profileImage == null) {
      var imagePath = '/images/profile-pics/defaultStudent.jpg'
    } else {
      var imagePath = '/uploads/'+profileImage
    }
    if(data && data.question) {
    	if(data.question.length > 10) {
	      var question = data.question.substring(0,10) + '...'
	    } else {
	      var question = data.question
	    }
    } 

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
								<Link id="pollList" onClick={this.handlePollList.bind(this)}><span><FormattedMessage id ="poll_list"/></span></Link>
							</li>
							{
								this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question
								?
								<li><span>/</span></li>
								: null
							}
							{
								this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question
								?
								<li>
									<Link id="pollContent" onClick={this.handlePollContent.bind(this)}><span title={this.props.workDashboardData.pollContentData.question}>{question}</span></Link>
								</li>
								: null
							}
							<li><span>/</span></li>
							<li>
								<span>
									{
										this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question
										?
										<FormattedMessage id = 'update_poll'/>
										:
										<FormattedMessage id = 'create_poll'/>
									}
								</span>
							</li>
						</ul>
					</div>
					<div className={styles.topicViewheader}>
						<h1 className={styles.mainHeadingTxt}>
							{
								this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question
								?
								<FormattedMessage id = 'update_poll'/>
								:
								<FormattedMessage id = 'create_poll'/>
							}
						</h1>
					</div>
					<label className={compstyles.errorPre} >{this.state.error}</label>
					<div className={styles.topicsListBody}>
					  <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputQuestion" className="control-label col-md-2" ><FormattedMessage id = 'question'/></label>
                <div className="col-md-10">
									<textarea id="question"  className="form-control" placeholder="" value={this.state.question} onChange={this.handleQuestion.bind(this)} ref="question" maxLength={300} autoFocus='true' />
                </div>
              </div>
              <div>
					      {
					        this.state.values.map((item, index)=>{
					          return  <TextBox key={index} value={item} index={index} change={this.handleOption.bind(this, index)}/>
					        })
					      }
					      <div className="form-group">
					        <div className="col-md-2">
					        </div>
					        <p className="col-md-10"><a id="addQuestion" onClick={this.handleAddOption.bind(this)}><FormattedMessage id ='add'/></a> /<a id="remove" onClick={this.handleRemoveOption.bind(this)}><FormattedMessage id ='remove'/></a> <FormattedMessage id='answer_choice'/></p>
					      </div>
					    </div>
              <div className={styles.submitBtnBlock}>
								<div className="pull-right">
									<div className={styles.blockSaveAssign} >
										<button id="submitPollList" type="submit" onClick={this.handlePollList.bind(this)}>
										 <FormattedMessage id='cancel'/>
										</button>&nbsp;&nbsp;
										<button id="createPollBtn" type="submit" className={cls_btnSaveAssign} onClick={this.createPoll.bind(this, false)}>
										 	<FontAwesome name="fa-paper-plane"></FontAwesome>{this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question ? <FormattedMessage id='Update'/> : <FormattedMessage id='save'/> }
										</button>&nbsp;&nbsp;
										<button id="savePublish" type="submit" className={cls_btnSaveAssign} onClick={this.createPoll.bind(this, true)}>
										 	<FontAwesome name="fa-paper-plane"></FontAwesome> {this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question ? <FormattedMessage id='update_publish'/> :<FormattedMessage id='save_publish'/>}
										</button>
									</div>
								 </div>
							</div>
            </form>
					</div>
				</div>
      </div>
		)
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dashboardData: dashboardData(state),
    intl: state.intl,
    workDashboardData : workDashboardData(state)
  };
}

CreatePoll.contextTypes = {
	intl: React.PropTypes.object.isRequired

};

CreatePoll.propTypes = {
  intl: PropTypes.object,
  workDashboardData: PropTypes.object  
};

export default connect(mapStateToProps)(CreatePoll);