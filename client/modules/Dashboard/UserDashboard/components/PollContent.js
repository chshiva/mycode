import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import callApi from '../../../../util/apiCaller';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel, Modal} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import compstyles from '../../../../components/component.css';
import { connect } from 'react-redux';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import moment from 'moment';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard,getConferencePollData, getPollSubmissionsRequest, getConferencePollContentData, savePollAnswerRequest, deletePollRequest } from './WorkDashboardActions';
var _ = require('lodash');
import { Roles } from  '../../../../roles';
import { loggedInData } from '../../../Login/LoginReducer';
import WoogeenManager from '../../../Communication/WoogeenManager';


class PollContent extends Component{

	constructor(props) {
		super(props)
		this.handleSelection = this.handleSelection.bind(this);
		this.props.confObject.PollContentSelectListener(this.handleSelection);
		this.setResponse = this.setResponse.bind(this)
		this.state = {
      userData : null,
			answer : '',
			submitted : false,
			error : ''
		}
		this.confObject = new WoogeenManager();
	}

	componentDidMount() {
		let pollData = {
			roomId : this.props.roomId,
			pollId : this.props.workDashboardData.pollContentData._id,
		}
		this.props.dispatch(getPollSubmissionsRequest(pollData));
		this.setdata(this.props.loggedInData);
	
	    if(this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.submissions && this.props.workDashboardData.pollContentData.submissions.length > 0) {
	    	let student = _.find(this.props.workDashboardData.pollContentData.submissions, ['submittedBy._id', this.props.workDashboardData.uid]);

	    	if(student != undefined) {
	    		this.setState({
		    		answer : student.answer,
		    		submitted : true
		    	})
		    }
	    }
  	}

  	setdata(result){
	    // console.log("Dashboard Data", result);
	    if(result && result.data && result.data._id){
	      this.setState({ userData : result.data });
	    }
  	}

  	handlePollList() {
		this.props.pollListCallback();
		let obj = {current : 'pollList', pollContent: false, pollList : true, createPoll: false, submissionList : false, pollReports : false};
		this.handleWorkDashboard(obj);
	}

	handleWorkDashboard = (obj) => {
		this.props.imHost == true && this.props.workDashboardData.sync == true ?
    	this.props.syncCallback(obj)
		: this.props.dispatch(setWorkDashboard(obj));
	}

	setSelector(){
		let obj = null;
		if(this.props.workDashboardData.sync == true && this.props.imHost == true){
			if (window.getSelection) {
				let range = window.getSelection().getRangeAt(0);
        let preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(this.refs.editor);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        let start = preSelectionRange.toString().length;

        obj = {
            start: start,
            end: start + range.toString().length,
            uid : this.props.workDashboardData.uid
        }
	    }
	    else if (document.selection && document.selection.type != "Control") {
    		let selectedTextRange = document.selection.createRange();
        let preSelectionTextRange = document.body.createTextRange();
        preSelectionTextRange.moveToElementText(this.refs.editor);
        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
        let start = preSelectionTextRange.text.length;

        obj = {
            start: start,
            end: start + selectedTextRange.text.length,
            uid : this.props.workDashboardData.uid
        }
	    }
	    this.handlePollContSelSync(obj);
	  }
	}

	selectHandler() {
		this.setSelector();		
	}

	//Code changed by - Najib, Desc - routing is called only for non-guest users
	viewUser() {
		if(!this.props.isGuest) {
			browserHistory.push('/profile/'+this.props.workDashboardData.pollContentData.createdBy._id)
		}    
	}

  	updatePoll() {
  		this.props.updatePollCallback();
		let obj = { current : 'pollList', pollContent: false, pollList : false, createPoll: true, submissionList : false, pollReports : false};
		this.props.dispatch(setWorkDashboard(obj));
	}

	deletePoll(pollId) {
		var id = pollId;
		var props = this.props; 
		var response = this.setResponse;

		alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_poll_alert, 
      	function (result) {
        if(result) {          
          let pollData = { 
						roomId : props.roomId,
						pollId : pollId
					};
          props.dispatch(deletePollRequest(pollData))
          .then(res => response(res))          
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
	}

	handleSubmission(e){
	    this.setState({
	    	answer: e.target.value,
	    	error : ''
	    });    
  	}

	submitAnswer = () => {
	  	if(this.state.answer == '') {
	  		this.setState({
					error: <FormattedMessage id='Please_select_any_option' />
	  		});
	  	} else {
	  		let pollData = {
					roomId : this.props.roomId,
					pollId : this.props.workDashboardData.pollContentData._id,
					answer : this.state.answer
				}
		    this.props.dispatch(savePollAnswerRequest({pollData})).then(res => this.setResponse(res));
	  	}
	}

  	setResponse(res) {
	  	//changeBy: pranathi, disc: added alert model boxes
	  	if (res.status) {
	  		if(res.errorCode == 200) {
		  		this.setState({
		  			submitted : true
		  		});
				alertify.alert("Sucess",res.message, 
		        function() {
		        }
		      	).setting({'label': this.props.intl.messages.ok});

		      	let pollData = {
					roomId : this.props.roomId,
					pollId : this.props.workDashboardData.pollContentData._id,
				}
		    	this.props.dispatch(getPollSubmissionsRequest(pollData));
			} else {
				alertify.alert("Sucess",res.message, 
			        function() {
			        }
		      	).setting({'label': this.props.intl.messages.ok});

				this.props.pollListCallback();

				let obj = {current : 'pollList', pollContent: false, pollList : true, pollContentData : null, pollContentIndex : null, createPoll: false, submissionList : false, pollReports : false};
				this.handleWorkDashboard(obj);

				let deleteObj = {
			      command : 'RELOAD_POLLS_LIST',
			      content : {},
			      type : 'OBJECT'
		    	};

				this.confObject.sendMessage(deleteObj, 0);
			}
	  	} else {
	  		if(res.errorCode == 404) {
		  		alertify.alert(this.props.intl.messages.warning,res.error, 
		        function() {
		        }
		      ).setting({'label': this.props.intl.messages.ok});
		      let obj = {current : 'pollList', pollContent: false, pollList : true, pollContentData : null, pollContentIndex : null, createPoll: false, submissionList : false, pollReports : false};
					this.handleWorkDashboard(obj);
					this.props.pollListCallback();
					let roomObj = {
				      roomKey: this.props.roomKey
				    }
					this.props.dispatch(getConferencePollData(roomObj));
				} else {
					alertify.alert(this.props.intl.messages.warning,res.error, 
		        function() {
		        }
		      ).setting({'label': this.props.intl.messages.ok});
				}
	  	}
  	}

  	submissionList() {
	  	let pollData = {
				roomId : this.props.roomId,
				pollId : this.props.workDashboardData.pollContentData._id,
			}
	  	this.props.dispatch(getPollSubmissionsRequest(pollData)).then(res => this.setSubmissionResponse(res));
  	}

	setSubmissionResponse(res) {
		let obj = {current : 'pollList', pollContent: false, pollList : false, createPoll: false, submissionList : true, pollReports : false};
		this.props.dispatch(setWorkDashboard(obj));
	 }

  	reports() {
	  	let pollData = {
				roomId : this.props.roomId,
				pollId : this.props.workDashboardData.pollContentData._id,
			}
	  	this.props.dispatch(getPollSubmissionsRequest(pollData)).then(res => this.setReportResponse(res));
  	}

  	setReportResponse(res) {
  		let obj = {current : 'pollList', pollContent: false, pollList : false, createPoll: false, submissionList : false, pollReports : true};
		this.props.dispatch(setWorkDashboard(obj));
  	}

	render() {

    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
		let cls_topicAuthorGuest = `clearfix ${styles.topicAuthorGuest}`;
    let cls_authorsBox = `clearfix ${styles.authorsBox}`;
    let cls_formInline = `${styles.formInline} form-inline`;

    let data = this.props.workDashboardData.pollContentData;
    let profileImage = data ? data.createdBy ? data.createdBy.profile ? data.createdBy.profile.profileImage:'':'':''
    if(profileImage == '' || profileImage == undefined || profileImage == null) {
      var imagePath = '/images/profile-pics/defaultStudent.jpg'
    } else {
      var imagePath = '/uploads/'+profileImage
    }

    if(data && data.question && data.question.length > 10) {
      var question = data.question.substring(0,10) + '...'
    } else {
      var question = data && data.question ? data.question : '';
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
							<li><span>/</span></li>
							<li><span title={this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.question}>{question}</span></li>
						</ul>
						{
			      	this.state.userData != null && (this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.createdBy && this.props.workDashboardData.pollContentData.createdBy._id == this.state.userData._id || this.state.userData.role == Roles.Admin || this.state.userData.role == Roles.Lmsadmin)
			      	?
				      <div className={styles.absoluteRightActionBlock}>
			          <ul>
			            <li>
				            <Link id="updatePoll" title={this.props.intl.messages.update_poll} onClick={this.updatePoll.bind(this)}>
				              <div className={styles.iconBox}>
				                <img src="/images/black-icons/black-update-poll.png"  alt="manage-poll-icon"/>
				              </div>
				            </Link>
			          	</li>
			          	<li>
				            <Link id="deletePoll" title={this.props.intl.messages.delete_poll} onClick={this.deletePoll.bind(this,this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData._id)}>
				              <div className={styles.iconBox}>
				                <img src="/images/black-icons/delete-box-black.png"  alt="manage-poll-icon"/>
				              </div>
				            </Link>
			          	</li>
			          	<li>
				            <Link id="submissionList" title={this.props.intl.messages.submission_list} onClick={this.submissionList.bind(this)}>
				              <div className={styles.iconBox}>
				                <img src="/images/black-icons/black-submission.png"  alt="manage-poll-icon"/>
				              </div>
				            </Link>
			          	</li>
			          	<li>
				            <Link id="reports" title={this.props.intl.messages.reports} onClick={this.reports.bind(this)}>
				              <div className={styles.iconBox}>
				                <img src="/images/black-icons/black-graph.png"  alt="manage-poll-icon"/>
				              </div>
				            </Link>
			          	</li>
			          </ul>
			        </div>
			        : null
				    }
				    {
			      	this.props.role == Roles.Student || this.props.isGuest == true
			      	?
			      	this.state.submitted
								?
					      <div className={styles.absoluteRightActionBlock}>
				          <ul>
						      	<li>
					            <Link id="reports" title={this.props.intl.messages.reports} onClick={this.reports.bind(this)}>
					              <div className={styles.iconBox}>
					                <img src="/images/black-icons/black-graph.png"  alt="manage-poll-icon"/>
					              </div>
					            </Link>
				          	</li>
				          </ul>
				        </div>
				        : null
			        : null
	          }
			    </div>
					<div className={styles.topicViewheader}>
						{/*<h1 className={styles.mainHeadingTxt}>{this.props.workDashboardData.pollContentData.question}</h1>*/}
					</div>
				<label className={compstyles.errorPre} >{this.state.error}</label>
					<div className={styles.topicsListBody}>
						<div className={cls_authorsBox}>
							<span className={styles.hrzlList}>
								<div className={this.props.isGuest ? cls_topicAuthorGuest : cls_topicAuthor}>
									<img id="viewprofile" src={imagePath} onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile} />
									<div className={styles.authorInfo}>
										<p className={styles.authorName}>{this.props.workDashboardData && this.props.workDashboardData.pollContentData && this.props.workDashboardData.pollContentData.createdBy && this.props.workDashboardData.pollContentData.createdBy.firstname} {this.props.workDashboardData && this.props.workDashboardData.pollContentData.createdBy && this.props.workDashboardData.pollContentData.createdBy.lastname}</p>
										<p className={styles.authorDisg}><FormattedMessage id = 'author'/></p>
									</div>
								</div>
							</span>
						</div>
						<div className={styles.topicsListBody}>
				    	<ul>
				    	 	<li>
					        <div className={styles.questionBlock}>
					          <div className={styles.questionHeading}>
					            <div className={styles.questionIconCircle}>
					              <FontAwesome name="question" />
					            </div>
					            <h3>{this.props.workDashboardData.pollContentData.question}</h3>
					          </div>
					          <div className={styles.chooseAnswerBlock}>
					            <form className={cls_formInline}>
						            {
						            	// this.props.role == Roles.Student
						            	// ?
						            	<div className="radio">
							            	{
								            	this.props.workDashboardData.pollContentData.options.map((item, index)=>{
					                      if(this.state.answer == item) {
					                        var checked = true
					                      } else {
					                        var checked = false
					                      }
											        	var number = index + 1
											        	if(this.state.submitted != true) {
												        	return <label className="radio-inline" key={index}>
							                      <input id="optradio" type="radio" name="optradio" value={item} checked={checked} onChange={this.handleSubmission.bind(this)}/><span>{number})</span> {item}
							                    </label>
							                  } else {
							                    return <label className="radio-inline" key={index}>
							                      <input id="optradio" type="radio" name="optradio" value={item} checked={checked} disabled/><span>{number})</span> {item}
							                    </label>
							                  }
											        })
														}
													</div>
						           //  	:
									        // this.props.workDashboardData.pollContentData.options.map((item, index)=>{
									        // 	var number = index + 1
									        // 	return <label className="radio-inline" key={index}>
						           //        <span>{number})</span> {item}
						           //      </label>
									        // })
									      }
					            </form>
					          </div>
					        </div>
					      </li>
				    	</ul>
				    	{
				    		// this.props.role == Roles.Student
				    		// ?
				    		this.state.submitted != true
							  ?
								<div className={styles.submitBtnBlock}>
									<div className="pull-right">
										<button id="submitAnswer" type="submit" className={styles.btnApplyAll} onClick={this.submitAnswer}>
												<FontAwesome name="fa-paper-plane"></FontAwesome>  <FormattedMessage id='submit' />
										</button>
									 </div>
								</div>
								: <div className="pull-right">
										<span><FormattedMessage id = 'submitted'/>
										</span>
									</div>
								// : null
			    		}
			    	</div>
					</div>
				</div>
      </div>
		)
	}

	///////////////////////

	handleSelection(obj){
		if(obj.uid != this.props.workDashboardData.uid){
			if (document.createRange) {
      	let charIndex = 0, range = document.createRange();
        range.setStart(this.refs.editor, 0);
        range.collapse(true);
        let nodeStack = [this.refs.editor], node, foundStart = false, stop = false;
				while (!stop && (node = nodeStack.pop())) {
					if (node.nodeType == 3) {
						let nextCharIndex = charIndex + node.length;
						if (!foundStart && obj.start >= charIndex && obj.start <= nextCharIndex) {
							range.setStart(node, obj.start - charIndex);
							foundStart = true;
						}
						if (foundStart && obj.end >= charIndex && obj.end <= nextCharIndex) {
							range.setEnd(node, obj.end - charIndex);
							stop = true;
						}
						charIndex = nextCharIndex;
					} else {
						let i = node.childNodes.length;
						while (i--) {
							nodeStack.push(node.childNodes[i]);
						}
					}
				}
				let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.body.createTextRange) {
      	let textRange = document.body.createTextRange();
        textRange.moveToElementText(this.refs.editor);
        textRange.collapse(true);
        textRange.moveEnd("character", obj.end);
        textRange.moveStart("character", obj.start);
        textRange.select();
      }
		}		
	}

	handlePollContSelSync = (objEntity) => {
    let obj = {
      command : 'POLL-CONT-SEL-SYNC',
      content : { data : objEntity },
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    workDashboardData : workDashboardData(state)
  };
}

PollContent.contextTypes = {
	intl: React.PropTypes.object.isRequired

};

PollContent.propTypes = {
  loggedInData: PropTypes.object,
  intl: PropTypes.object,
  workDashboardData: PropTypes.object  
};

export default connect(mapStateToProps)(PollContent);