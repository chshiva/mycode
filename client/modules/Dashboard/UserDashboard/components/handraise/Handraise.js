import React, { PropTypes, Component } from 'react';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styles from '../../../Dashboard.css';
import compstyles from '../../../../../components/component.css';
import dataStyle from '../../../../../components/DataTable/DataTable.css';
import { saveQuestionRequest, getHandraiseData } from './HandraiseActions';
import HandraiseQuestion from './HandraiseQuestion';
import { conferenceDetails } from '../../../../Communication/ConferenceReducer';
import { loggedInData } from '../../../../Login/LoginReducer';

class Handraise extends Component{
	constructor(props) {
		super(props);
		this.state = {
			question:'',
			errorMsg:'',
			data : null,
			limit : 3,
			total : 0,
		}
		this.skip = 3;
		this.handleQuestion = this.handleQuestion.bind(this);
		this.handleHandraise = this.handleHandraise.bind(this);
		this.FetchHandraiseData = this.FetchHandraiseData.bind(this);
   	this.props.confObject.HandraiseListener(this.FetchHandraiseData);
		
	}

	componentDidMount() {
		if(this.props.roomKey){
			this.getData();
		}
	}

	componentWillUnmount() {
		this.props.confObject.ClearHandraiseListener();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.roomKey != this.props.roomKey){
			let obj = {
				uid : nextProps.uid,
				roomKey : nextProps.roomKey
			};
			this.getData(obj);
		}
	}

	getData = (objEntity) => {
		let obj = {
			// uid : this.props.uid,
			roomKey : this.props.roomKey,
			limit : this.state.limit
		}
		if(objEntity){
			// obj['uid'] = objEntity.uid;
			obj['roomKey'] = objEntity.roomKey;
		}
		getHandraiseData(obj).then(res => this.setresponse(res));
	}
	
	handleQuestion = (e) => {
		this.setState({question:e.target.value,
			errorMsg:''
		})
	}

	handleHandraise = (e)=> {
		e.preventDefault();
		let value = this.state.question.trim();
		if(value != '') {
			this.setState({ question : ''});
			var obj = {
			question: value,
			roomKey : this.props.roomKey,
			// limit : this.state.limit
			}
			saveQuestionRequest(obj).then(res => this.createresponse(res, value, true));
		} else {
			this.setState({errorMsg:this.props.intl.messages.please_enter_the_question});
		}		
	}

	clickmore = () => {
		let count = this.state.limit + this.skip;
		this.setState({ limit : count });
		let obj = {
			uid : this.props.uid,
			roomKey : this.props.roomKey,
			limit : count
		}
		getHandraiseData(obj).then(res => this.setresponse(res));
	}

	setresponse = (response) => {
		if(response.status){
			this.setState({ data : response.data, total : response.count, error : '' });
		}else if(res && res.errorCode == 208) {
			browserHistory.push('/');
		}else{
			this.setState({ error : response.error });
		}
	}

	createresponse = (response, value, status) => {
		if(response.status){
			this.newQuestionRequest(status);
		}else{
			this.setState({ error : response.error, question : value });
		}
	}

	makeSpeaker = (obj) => {
		var defIndex = _.findIndex(this.props.conferenceDetails.attendees, ['name', obj.uid]);
		console.log("defIndex === ",defIndex);
		if(defIndex > -1){
			let id = this.props.conferenceDetails.attendees[defIndex].id;
			var streamIndex = _.findIndex(this.props.conferenceDetails.streams, ['from', id]);
			console.log("streamIndex === ",streamIndex);
			if(streamIndex > -1){
				let objSpeaker = {
			      command: 'SPEAKER-REQ',
			      content: {stream_from: id},
			      type: 'STRING'
			    };
			    this.props.confObject.sendMessage(objSpeaker, 0);
			}else{
				let obj = {
			      command : 'REQ-VIDEO',
			      content : { attendeesData : {} },
			      type : 'OBJECT'
			    };
			    this.props.confObject.sendMessage(obj, id);
			}
		}else{
			console.log("Make speaker user not in stream");
		}
		
	}
	
	renderQuestions = (data) => {
		let guestStatus = null;
		if(this.props.loggedInData && this.props.loggedInData.data && this.props.loggedInData.data.guest) {
			guestStatus = this.props.loggedInData.data.guest; 
			//console.log("guestStatus", guestStatus);
		}
		if(data != null && data.length > 0){
			let self = this;
			let questions = data.map( function(doc){
				return(<HandraiseQuestion data={doc} key={doc._id} confObject={self.props.confObject} roomType={self.props.conferenceDetails && self.props.conferenceDetails.confData ? self.props.conferenceDetails.confData.roomType : ''}
					uid={self.props.uid} editQuestionCb = {self.createresponse} questionLimit={self.state.limit} noConference={self.props.noConference}
					roomKey={self.props.roomKey} host={self.props.conferenceDetails ? self.props.conferenceDetails.imHost : false} makeSpeaker={self.makeSpeaker} guestStatus = {guestStatus}/>);
			});
			return(
				<div>
					{questions}
					{this.state.total > this.state.limit ?<div className={styles.loadmore}> <a onClick={this.clickmore}><FormattedMessage id = 'load_more'/></a> </div> : null}
				</div>
			);
		}else{
			return (
				<Row>
					<div className={styles.whiteCard}>
						<div className={dataStyle.noDataBox}>
							<h2>
								<FontAwesome name="frown-o" />
							</h2>
							<p><FormattedMessage id ="no_questions"/></p>
						</div>
					</div>
		        </Row>
				);
		}
	}

	render(){

		console.log("this.props.loggedInData", this.props.loggedInData);
		let cls_cardHrHeader = `${styles.cardHrHeader} clearfix`;
		let cls_askQuestion = `${styles.askQuestionBlock} clearfix`;
		let cls_postBtn = `${styles.btnPost} btn btn-sm btn-primary pull-right`;
		let cls_btnPostQandA = ` ${styles.btnPostQandA} `
		
		return(
			<div className={styles.handRiseContent}>
				{(!this.props.noConference) ?
					<div className={styles.cardHandRise}>
						<div className={cls_cardHrHeader}>
							<div className={styles.iconInline}>
								<img src="/images/black-icons/black-help.png" />
							</div>
							<div className={styles.headingBloack}>
								<h2 className={styles.headingTxt}><FormattedMessage id = 'ask'/></h2>
							</div>
						</div>
						<div className={cls_askQuestion}>
							<textarea id="askQuestion" className={styles.textArea} value = {this.state.question} placeholder={this.context.intl.messages.ask_question} onChange = {this.handleQuestion} />
			      			<div className={styles.blockSaveAssign} >
			      				<button id="postQandA" className={cls_btnPostQandA} onClick={this.handleHandraise}><FormattedMessage id = 'post'/></button>
							</div>
						</div>
						<label id="postQandAError" className={compstyles.errorPre} >{this.state.errorMsg?this.state.errorMsg:''}</label>
					</div>
				: null}
				<div className={styles.cardQuestionListBlock}>
					<div className={styles.cardHandRise}>
						{this.renderQuestions(this.state.data)}
					</div>
				</div>
			</div>
			);
	}

	/////////////////////////////////

	newQuestionRequest = (status) => {
		let obj = {
			command : 'HAND-RAISE',
			content : { data: { status : status }},
			type : 'OBJECT'
		};
		this.props.confObject.sendMessage(obj, 0);
	}

	FetchHandraiseData(obj){
	    // console.log("obj in fetch handraise === ",obj);
	    this.getData();
	}
	/////////////////////////////////
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    conferenceDetails : conferenceDetails(state),
    loggedInData: loggedInData(state)
  };
}

Handraise.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

Handraise.propTypes = {
	intl: PropTypes.object,
  confObject: PropTypes.object,
};

export default connect(mapStateToProps)(Handraise);

