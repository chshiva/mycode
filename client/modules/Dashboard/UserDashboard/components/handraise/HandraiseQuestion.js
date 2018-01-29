import React, { PropTypes, Component } from 'react';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import styles from '../../../Dashboard.css';
import compstyles from '../../../../../components/component.css';
import { sendAnswer, getAnswers, saveQuestionRequest, deleteQuestion, getHandraiseQues } from './HandraiseActions';
import Answer from './Answer';
import dataStyle from '../../../../../components/DataTable/DataTable.css';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
var moment = require('moment');

class HandraiseQuestion extends Component{
	constructor(props) {
		super(props);
		this.state = {
			showAnswers : false, error : '', data : null, limit : 3, total : 0, answers : null, edit:false, editQuestionValue:'', editerror : '' 
		}
		this.skip = 3;
		this.FetchAnswerData = this.FetchAnswerData.bind(this);
		this.getEditData = this.getEditData.bind(this);
	}

	componentDidMount() {
		if(this.props.data){
			this.setState({ data : this.props.data, total : this.props.data.anscount, editQuestionValue : this.props.data.question });
			let obj = {
				_id : this.props.data._id
			}
			this.props.confObject.HandraiseAnsListener(this.FetchAnswerData, obj._id);
			this.props.confObject.EditHandraiseListener(this.getEditData, obj._id);
			this.getAnswerData(obj);
		}
	}

	componentWillUnmount() {
		this.props.confObject.ClearHandraiseAnsListener(this.state.data._id);
		this.props.confObject.ClearEditHandraiseListener(this.state.data._id);
	}

	getAnswerData = (obj) => {
		obj['limit'] = this.state.limit;
		getAnswers(obj).then(res => this.setresponse(res));
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.roomKey != this.props.roomKey){
			nextProps.confObject.HandraiseAnsListener(this.FetchAnswerData, nextProps.data._id);
			this.setState({ data : nextProps.data, editQuestionValue : nextProps.data.question });
		}
	}

	showAnswers = (e) => {
		this.setState({ showAnswers : !this.state.showAnswers });		
	}

	postAnswer = () => {
		let value = this.refs.answer.value.trim();
		if(value != ''){
			this.refs.answer.value = '';
			this.setState({ error : '' });
			let id = this.state.data._id;
			let answer = value;
			sendAnswer(id, answer).then(res => this.saveresponse(res, id, value));
		}else{
			this.refs.answer.value = value;
			this.setState({ error : 'Please enter the answer'});
		}
	}

	saveresponse = (response, id, value) => {
		if(response.status){
			this.setState({ error : '' });
			this.newAnswerRequest({ _id : id });
		}else{
			this.refs.answer.value = value;
			this.setState({ error : response.error });
		}
	}

	loadmore = () => {
		let newlimit = this.state.limit + this.skip;
		this.setState({ limit : newlimit });
		let obj = {
			_id : this.props.data._id,
			limit : newlimit
		}
		getAnswers(obj).then(res => this.setresponse(res));
	}

	setresponse = (response) => {
		if(response.status){
			this.setState({ answers : response.data, total : response.count, error : '' });
		}else{
			this.setState({ error : response.error });
		}
	}

	handleDelete = () => {
		let qid = this.props.data._id;
		let self = this;
		alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_question_alert, 
			function (result) {	    	
				if(result) {	      	
					deleteQuestion(qid).then(res => self.editresponse(res, '', false));
				}
			},
			function() {
				/*cancel event*/
			}
		).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
	}

	handleEdit = () => {
		this.setState({ edit : true });
	}

	handleQuestionValue = () => {
		let value = this.refs.editanswer.value;
		this.setState({editQuestionValue:value});
	}

	cancelEditQuestion = () => {
		this.setState({edit:false, editerror : '', editQuestionValue: this.props.data.question});	
	}

	saveEditQuestion = () => {
		let value = this.state.editQuestionValue.trim();
		if(value != ''){
			let obj = {
				question: value,
				_id : this.props.data._id,
				limit : this.props.questionLimit,
				author : this.props.uid,
				roomKey : this.props.roomKey
			}
			saveQuestionRequest(obj).then(res => this.editresponse(res, value, true));
		}else{
			this.setState({ editerror : "Please enter the question"});
		}
	}

	editresponse = (response, value, status) => {
		if(response.status){
			this.setState({ editerror : '', edit : false });
			if(status == true)
				this.editRequest({_id : this.props.data._id});
			else
				this.props.editQuestionCb(response, '', false);
		}else{
			this.setState({ editerror : response.error, editQuestionValue : value });
		}
	}

	loadAnswers = () => {
		
		let cls_askQuestion = `${styles.askQuestionBlock} clearfix`;
		let cls_postBtnInside = `${styles.postBtnInside} ${styles.btnApplyAll} pull-right`;
		
		if(this.state.answers != null && this.state.answers.length > 0){
			let self = this; 
			let answers = this.state.answers.map(function(doc){
				return(
					<Answer key={doc._id} data={doc} uid = {self.props.uid} qid = {self.state.data._id} confObject={self.props.confObject} noConference={self.props.noConference}/>					
				);
			});
			return(
				<ul>
					{answers}
				</ul>
			);
		}else{
			return (
				<Row>
					<div className={dataStyle.noDataBox}>
						<p><FormattedMessage id ="no_answers"/></p>
					</div>
		    </Row>
			);
		}		
	}

	makeSpeaker = () => {
		let data = this.state.data;
		let obj = {
			qid : data._id,
			uid : data.author._id
		}
		this.props.makeSpeaker(obj);
	}

	viewUser(id) {
		if(!this.props.guestStatus) {
    	browserHistory.push('/profile/'+id);
		}
  }

	render(){	
		let data = this.state.data;
		//console.log("this.props.guestStatus", this.props.guestStatus);
		// console.log("data === ",data);
		let cls_userQuestionPost = `${styles.userQuestionPost} clearfix`;
		let cls_postBtnInside = `${styles.postBtnInside} ${styles.questionActionBtn} ${styles.btnApplyAll} pull-right`;
		let cls_askQuestion = `${styles.askQuestionBlock} clearfix`;
		let now = moment().endOf('day');
		let create = data && data.createdAt ? moment(data.createdAt).endOf('day') : null;
		let time = "--:--";
		if(create != null){
			if(+create == +now)
        time = moment(data.createdAt).format('hh:mm A');
      else
        time = moment(data.createdAt).format('DD/MM/YYYY hh:mm A');
		}
		return(
		<div>
		{this.state.edit ?
			<div className={cls_askQuestion}>
				<textarea id="editAnswer" className={styles.textArea}  ref="editanswer" value = {this.state.editQuestionValue} onChange = {this.handleQuestionValue}/>
				<label id="editError" className={compstyles.error}>{this.state.editerror ? this.state.editerror : ''}</label>
				<div className={styles.blockSaveAssign} >
				<button id="cancelEditQuestion" onClick={this.cancelEditQuestion}><FormattedMessage id = 'cancel'/></button>
				<button id="saveEditQuestion" className={styles.btnSaveAssign} onClick={this.saveEditQuestion}><FormattedMessage id = 'save'/></button>
				</div>
			</div>	
		:	<div className={cls_userQuestionPost}>
				<Link id="viewprofile" className={this.props.guestStatus ? styles.avatarGuestCircle : styles.avatarCircle}>
					<img src={data && data.author && data.author.profile && data.author.profile.profileImage ? "/uploads/"+data.author.profile.profileImage : "/images/profile-pics/default-user.png"} onClick={this.viewUser.bind(this, data && data.author && data.author._id ? data.author._id : '')} title={this.props.intl.messages.viewprofile} />
				</Link>
				<div className={this.props.guestStatus ? styles.guestNameQuestion : styles.nameQuestion}>
					<h2>{data && data.author && data.author.firstname && data.author.lastname ? (data.author.firstname + ' ' + data.author.lastname) : (data && data.author && data.author.firstname ? data.author.firstname : 'User Name')}</h2>
					<p>{data && data.question}</p>
					<p className={styles.timeDisplay}>{time}</p>
				</div>
			</div>
		}
			<div className={styles.questionActionsBlock}>
				<div className={styles.bottomActions}>
					<ul>
						<li>
							<Link id="seeAllAnswers" title={this.context.intl.messages.see_all_answers} id={data && data._id} onClick={this.showAnswers}><span>{this.state.total} </span><span><FormattedMessage id = 'answers'/></span></Link>
						</li>
						{data && data.author && data.author._id == this.props.uid && this.state.edit == false && (!this.props.noConference) ?
							<li>
								<Link id="editQuestion" onClick ={this.handleEdit}  title={this.context.intl.messages.edit_the_question}><span><FontAwesome name="pencil-square-o" /> </span><span><FormattedMessage id = 'edit'/></span></Link>
							</li>
						: null }
						{data && data.author && data.author._id == this.props.uid && (!this.props.noConference) ? 
							<li>
								<Link id="deleteQuestion" onClick ={this.handleDelete} title={this.context.intl.messages.delete_the_question} ><span><FontAwesome name="times" /> </span><span><FormattedMessage id = 'delete'/></span></Link>
							</li>
						: null}
						{this.props.host == true && data && data.author && data.author._id != this.props.uid && this.props.roomType != 'Mix'?
							<li>
								<Link id="makeSpeaker"  title={this.context.intl.messages.make_speaker} onClick={this.makeSpeaker}><span><FontAwesome name="video-camera" /> </span><span><FormattedMessage id = 'make_speaker'/></span></Link>
							</li>
						: null}
						
					</ul>
				</div>
			</div>
		
			{this.state.showAnswers ?
				<div className={styles.postedAnswersBlock}>
					<div className={styles.listPostedAns}>
						<div className={styles.listPostedAns}>
							{this.loadAnswers()}
							{this.state.total > this.state.limit ? <a id="previousAnswers" href="#" onClick={this.loadmore}><FormattedMessage id = 'previous_answers'/></a> : null}
						</div>
					</div>
					{(!this.props.noConference) ?
						<div className={styles.postAnswerInList}>
							<textarea id="answerQuestion" className={styles.postAnsTextArea} placeholder={this.context.intl.messages.answer_the_question}  ref="answer"/>
							<button id="postAnswer" className={cls_postBtnInside} onClick={this.postAnswer}><FormattedMessage id = 'post'/></button>
							<label id="postAnswerError" className={compstyles.errorPre}>{this.state.error ? this.state.error : ''}</label>
						</div>
					: null}
				</div>
			:null}
		</div>
		);
	}

	//////////////////////////////

	newAnswerRequest = (data) => {
		let obj = {
			command : 'HAND-RAISE-ANSWER',
			content : { data: data, id : data._id},
			type : 'OBJECT'
		};
		this.props.confObject.sendMessage(obj, 0);
	}

	editRequest = (data) => {
		let obj = {
			command : 'HAND-RAISE-EDIT',
			content : { data: data, id : data._id},
			type : 'OBJECT'
		};
		this.props.confObject.sendMessage(obj, 0);
	}

	FetchAnswerData(obj){
		this.getAnswerData(obj);
	}

	getEditData(obj){
		getHandraiseQues(obj._id).then(res => {
			if(res.status)
				this.setState({ data : res.data });
		});
	}

	///////////////////////////////
}

HandraiseQuestion.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

HandraiseQuestion.propTypes = {
  confObject: PropTypes.object,
};

export default injectIntl(HandraiseQuestion);

