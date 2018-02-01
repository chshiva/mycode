import React, { PropTypes, Component } from 'react';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import styles from '../../../Dashboard.css';
import compstyles from '../../../../../components/component.css';
import dataStyle from '../../../../../components/DataTable/DataTable.css';
import { saveReply, getReplies } from './BroadcastActions';
var moment = require('moment');

class Comment extends Component{
	constructor(props) {
		super(props);		
		this.state = {
			reply: false,
			replyValue: '',
			error:'',
			data : null,
			total : 0
		}		
	}

	componentDidMount() {
		if(this.props.bid){
			let obj = {
				replyOn : this.props.data._id
			}
			this.getReplyData(obj);			
		}		
	}


	getReplyData = (obj) => {
		obj['_id'] = this.props.bid;
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
				reply : value, 
				replyOn: this.props.data._id  
			};
			let id = this.props.bid;
			saveReply(obj, id).then(res => this.saveresponse(res, obj.replyOn, value));
		}else {
			this.setState({error:'Please enter your comment'});
		}  
	}

	saveresponse = (response, id, value) => {
		if(response.status){
			this.setState({ error : ''});
			var obj = {
				replyOn : this.props.data._id,
				_id : this.props.bid
			}
			getReplies(obj).then(res => this.replyresponse(res));
			//this.newReplyRequest({ replyOn : id });			
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
		if(this.state.data != null){
			let now = moment().endOf('day');
			let replies = this.state.data.map((doc) => {
				return(
					<li className="clearfix" key={doc._id}>
						<Link id="viewprofile" className={styles.avatarSmall}><img src={doc.author && doc.author.profile && doc.author.profile.profileImage ? "/uploads/"+doc.author.profile.profileImage : "/images/profile-pics/defaultStudent.jpg"} onClick={this.viewUser.bind(this, doc.author._id)} title={this.props.intl.messages.viewprofile}/></Link>
						<div className={styles.postedQueBlock}>
							<span className={styles.postedUserName}>{doc.author && doc.author.firstname ? doc.author.firstname : '-'}</span>
							<span className={styles.postedAnsTxt}>{doc.reply}</span>
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
			return;
		}		
	}

	render() {
		let comment = this.props.data;
		//console.log("Comment data at comment", this.props.data);
		let cls_askQuestion = `${styles.askQuestionBlock} clearfix`;
		let cls_postBtnInside = `${styles.postBtnInside} ${styles.btnApplyAll} pull-right`;
		//console.log("answerReplyValue--->", self.state.answerReplyValue);	
		let now = moment().endOf('day');
		let create = comment && comment.commentAt ? moment(comment.commentAt).endOf('day') : null;
		let time = "--:--";
		if(create != null){
			if(+create == +now)
        time = moment(comment.commentAt).format('hh:mm A');
      else
        time = moment(comment.commentAt).format('DD/MM/YYYY hh:mm A');
		}
		
		return(				
				<li className="clearfix">
					<Link id="viewprofile" className={styles.avatarSmall}>
						<img src={comment.author && comment.author.profile && comment.author.profile.profileImage ? "/uploads/"+comment.author.profile.profileImage : "/images/profile-pics/defaultStudent.jpg"} onClick={this.viewUser.bind(this, comment.author._id)} title={this.props.intl.messages.viewprofile}/>
					</Link>
					<div className={styles.postedQueBlock}>
						<span className={styles.postedUserName}>{comment.author && comment.author.firstname ? comment.author.firstname : '-'}</span>				
						<span className={styles.postedAnsTxt}>{comment.comment}</span>					
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
							<div className={cls_askQuestion}>
								<textarea id="replyValue" className={styles.textAreaRecom} placeholder={this.context.intl.messages.your_reply} ref="replycomment" value = {this.state.replyValue} onChange = {this.handleReplyValue}/>
								<button id="saveReply" className={cls_postBtnInside} onClick={this.saveReply}><FormattedMessage id = 'post'/></button>							
								<label id="replyError" className={compstyles.errorPre}>{this.state.error ? this.state.error : ''}</label>
							</div>
						</div>		
						:null }
				</li>
		);		
	}	
}

Comment.propTypes = {
  intl: PropTypes.object,
  intl: intlShape.isRequired,
};

Comment.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

export default injectIntl(Comment);