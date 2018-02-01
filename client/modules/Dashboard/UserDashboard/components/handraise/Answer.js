import React, { PropTypes, Component } from 'react';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import styles from '../../../Dashboard.css';
import compstyles from '../../../../../components/component.css';
import dataStyle from '../../../../../components/DataTable/DataTable.css';
import { saveReply, getReplies } from './HandraiseActions';
var moment = require('moment');

class Answer extends Component{
	constructor(props) {
		super(props);		
		this.state = {
			reply: false,
			replyValue: '',
			error:'',
			data : null,
			total : 0
		}
		this.FetchReplyData = this.FetchReplyData.bind(this);
	}

	componentDidMount() {
		if(this.props.qid){
			let obj = {
				replyOn : this.props.data._id
			}
			// this.getReplyData(obj);
			this.setState({ data: this.props.data.replies, total : this.props.data.replycount });		
			this.props.confObject.HandraiseReplyListener(this.FetchReplyData, obj.replyOn);
		}		
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ data: nextProps.data.replies, total : nextProps.data.replycount });
	}

	componentWillUnmount() {
		this.props.confObject.ClearHandraiseReplyListener(this.props.data._id);
	}

	getReplyData = (obj) => {
		obj['_id'] = this.props.qid;
		getReplies(obj).then(res => this.replyresponse(res));
	}


	handleReply = () => {
		this.setState({reply:!this.state.reply});	
	}

	handleReplyValue = (e) => {
	 	this.setState({replyValue: e.target.value, error:''});
	}

	saveReply = () => {
		let value = this.state.replyValue.trim();
		if(value != ''){
			this.setState({ error : '', replyValue : ''});
			let obj = { 
				comment : value, 
				replyOn: this.props.data._id  
			};
			let id = this.props.qid;
			saveReply(obj, id).then(res => this.saveresponse(res, obj.replyOn, value));
		}else {
			this.setState({error:'Please enter your comment'});
		}  
	}

	saveresponse = (response, id, value) => {
		if(response.status){
			this.setState({ error : ''});
			this.newReplyRequest({ replyOn : id });			
		}else{
			this.setState({ error : response.error, replyValue : value });
		}
	}

	

	replyresponse = (response, value) => {
		if(response.status){
			this.setState({ error : '', data: response.data, total : response.count });		
		}else{
			this.setState({ error : response.error, replyValue : value });
		}
	}

	viewUser(id) {
    browserHistory.push('/profile/'+id)
  }

	renderReply = () => {
		let self = this; 		
		let cls_askQuestion = `${styles.askQuestionBlock} clearfix`;
		let cls_postBtnInside = `${styles.postBtnInside} ${styles.btnApplyAll} pull-right`;
		if(this.state.data != null && this.state.data.length > 0){
			let now = moment().endOf('day');
			let replies = this.state.data.map((doc) => {
				return(
					<li className="clearfix" key={doc._id}>
						<Link id="viewprofile" className={styles.avatarSmall}><img src={doc.author && doc.author.profile && doc.author.profile.profileImage ? "/uploads/"+doc.author.profile.profileImage : "/images/profile-pics/defaultStudent.jpg"} onClick={this.viewUser.bind(this, doc.author._id)} title={this.props.intl.messages.viewprofile}/></Link>
						<div className={styles.postedQueBlock}>
							<span className={styles.postedUserName}>{doc.author && doc.author.firstname && doc.author.lastname ? (doc.author.firstname + ' ' + doc.author.lastname) : (doc.author && doc.author.firstname ? doc.author.firstname : '-')}</span>
							<span className={styles.postedAnsTxt}>{doc.comment}</span>
							<p className={styles.postedTime}>{+(moment(doc.replyAt).endOf('day')) == +now ? moment(doc.replyAt).format('hh:mm A') : moment(doc.replyAt).format('DD/MM/YYYY hh:mm A')}</p>
						</div>
					</li>					
				);
			});
			return(
				<ul>
					{replies}
				</ul>
			);
		}else{
			return (
				<Row>
					<div className={dataStyle.noDataBox}>
						<p><FormattedMessage id ="no_replies"/></p>
					</div>
		    </Row>
			);
		}		
	}

	render() {
		let answer = this.props.data;
		let cls_askQuestion = `${styles.askQuestionBlock} clearfix`;
		let cls_postBtnInside = `${styles.postBtnInside} ${styles.btnApplyAll} pull-right`;
		//console.log("answerReplyValue--->", self.state.answerReplyValue);	
		let now = moment().endOf('day');
		let create = answer && answer.answerAt ? moment(answer.answerAt).endOf('day') : null;
		let time = "--:--";
		if(create != null){
			if(+create == +now)
        time = moment(answer.answerAt).format('hh:mm A');
      else
        time = moment(answer.answerAt).format('DD/MM/YYYY hh:mm A');
		}
		return(				
				<li className="clearfix">
					<Link id="viewprofile" className={styles.avatarSmall}>
						<img src={answer.author && answer.author.profile && answer.author.profile.profileImage ? "/uploads/"+answer.author.profile.profileImage : "/images/profile-pics/defaultStudent.jpg"} onClick={this.viewUser.bind(this, answer.author._id)} title={this.props.intl.messages.viewprofile}/>
					</Link>
					<div className={styles.postedQueBlock}>
						<span className={styles.postedUserName}>{answer.author && answer.author.firstname && answer.author.lastname ? (answer.author.firstname + ' ' + answer.author.lastname) : (answer.author && answer.author.firstname ? answer.author.firstname : '-')}</span>				
						<span className={styles.postedAnsTxt}>{answer.answer}</span>					
						<p className={styles.postedTime}>{time}</p>
					</div>	
					<div className={styles.bottomActions}>
						<ul>										
							<li>
								<Link id="reply" onClick ={this.handleReply}  title={this.context.intl.messages.your_comment} ><span>{this.state.total} <FontAwesome name="fa fa-reply"/> </span><span> <FormattedMessage id = 'reply'/></span></Link>
							</li>													
						</ul>
					</div>
					{ this.state.reply ?
						<div className={styles.replyBlock}>
							<div className={styles.repliedInfo}>								
								{this.renderReply()}								
							</div>
							{ (!this.props.noConference) ?
								<div className={cls_askQuestion}>
									<textarea id="textAreaRecom" className={styles.textAreaRecom} placeholder={this.context.intl.messages.your_comment} ref="replyanswer" value = {this.state.replyValue} onChange = {this.handleReplyValue}/>
									<button id="saveReply" className={cls_postBtnInside} onClick={this.saveReply}><FormattedMessage id = 'post'/></button>							
									<label id="replyError" className={compstyles.errorPre}>{this.state.error ? this.state.error : ''}</label>
								</div>
							: null }
						</div>		
						:null }
				</li>
		);		
	}

	//////////////////////////
	newReplyRequest = (data) => {
		let obj = {
			command : 'HAND-RAISE-REPLY',
			content : { data: data, id : data.replyOn},
			type : 'OBJECT'
		};
		this.props.confObject.sendMessage(obj, 0);
	}

	FetchReplyData(obj){
		this.getReplyData(obj);
	}
	//////////////////////////
}

Answer.propTypes = {
  intl: PropTypes.object,
  intl: intlShape.isRequired,
};

Answer.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

export default injectIntl(Answer);