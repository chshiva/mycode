import React, { PropTypes, Component } from 'react';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import styles from '../../../Dashboard.css';
import compstyles from '../../../../../components/component.css';
import { sendComment, getComments, saveBroadcastRequest, deleteBroadcast, updateLikeRequest } from './BroadcastActions';
import Comment from './Comment';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
var moment = require('moment');

class ViewBroadcast extends Component{
	constructor(props) {
		super(props);
		this.state = {
			showComment : false, error : '', data : null, limit : 3, total : 0, comments : null, edit:false, editBroadcastValue:'', editerror : '' 
		}
		this.skip = 3;
		
	}

	componentDidMount() {
		if(this.props.data){					
			var commentCount = this.props.data.comments.length;
			this.setState({ data : this.props.data, total : commentCount, editBroadcastValue : this.props.data.broadcast });
			let obj = {
				_id : this.props.data._id
			}
			
			//this.getAnswerData(obj);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data) {
			var commentCount = nextProps.data.comments.length;
			this.setState({ data : nextProps.data, total : commentCount, editBroadcastValue : nextProps.data.broadcast });
		}
	}
	

	showComment = (e) => {
		this.setState({ showComment : !this.state.showComment });	
		var obj = {
				_id : this.state.data._id,
				limit : this.state.limit
			}
			
			getComments(obj).then(res => this.setresponse(res));	
	}

	postComment = () => {
		let value = this.refs.comment.value.trim();
		if(value != ''){
			this.refs.comment.value = '';
			this.setState({ error : '' });
			let id = this.state.data._id;
			let comment = value;
			sendComment(id, comment).then(res => this.saveresponse(res, id, value));
		}else{
			this.refs.comment.value = value;
			this.setState({ error : 'Please enter the comment'});
		}
	}

	saveresponse = (response, id, value) => {
		
		if(response.status){
			this.setState({ error : '' });
			//this.newAnswerRequest({ _id : id });
			var obj = {
				_id : this.state.data._id,
				limit : this.state.limit
			}
			//console.log("obj----", obj);
			getComments(obj).then(res => this.setresponse(res));
		} else {
			this.refs.comment.value = value;
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
		getComments(obj).then(res => this.setresponse(res));
	}

	setresponse = (response) => {
		if(response.status){
			this.setState({ comments : response.data, total : response.count, error : '' });
		}else{
			this.setState({ error : response.error });
		}
	}

	handleDelete = () => {
		let bid = this.props.data._id;
		let self = this;
		alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_broadcast_alert, 
			function (result) {	    	
				if(result) {	      	
					deleteBroadcast(bid).then(res => self.editresponse(res, '', false));
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

	handleBroadcastValue = () => {
		let value = this.refs.editcomment.value;
		this.setState({editBroadcastValue:value});
	}

	cancelEditQuestion = () => {
		this.setState({edit:false, editerror : '', editBroadcastValue: this.props.data.broadcast});	
	}

	saveEditQuestion = () => {
		let value = this.state.editBroadcastValue.trim();
		if(value != ''){
			let obj = {
				broadcast: value,
				_id : this.props.data._id,
				limit : this.props.broadcastLimit,
				author : this.props.uid				
			}
			saveBroadcastRequest(obj).then(res => this.editresponse(res, value, true));
		}else{
			this.setState({ editerror : "Please enter the broadcast message"});
		}
	}

	editresponse = (response, value, status) => {
		if(response.status){
			this.setState({ editerror : '', edit : false });
			this.props.editQuestionCb(response, '', false);
		}else{
			this.setState({ editerror : response.error, editBroadcastValue : value });
		}
	}
	

	loadComment = () => {
		
		let cls_askQuestion = `${styles.askQuestionBlock} clearfix`;
		let cls_postBtnInside = `${styles.postBtnInside} ${styles.btnApplyAll} pull-right`;
		
		if(this.state.comments != null){			
			let self = this; 
			let comments = this.state.comments.map(function(doc){
				return(
					<Comment key={doc._id} data={doc} uid = {self.props.uid} aid = {self.props.data.author._id} bid = {self.state.data._id}/>					
				);
			});
			return(
				<ul>
					{comments}
				</ul>
			);
		}else{
			return;
		}		
	}

	viewUser(id) {
    browserHistory.push('/profile/'+id)
  }

	render(){	
		let data = this.state.data;
		// console.log("this.state.editBroadcastValue", this.state.editBroadcastValue);
		// console.log("comment data at ViewBroadcast ---->", this.state.comments);
		 //console.log("this.props.data", this.props.data);
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
				<textarea id="editCommentText" className={styles.textArea}  ref="editcomment" value = {this.state.editBroadcastValue} onChange = {this.handleBroadcastValue}/>
				<label id="editCommentError" className={compstyles.error}>{this.state.editerror ? this.state.editerror : ''}</label>
				<div className={styles.blockSaveAssign} >
				<button id="cancelEditQuestion" onClick={this.cancelEditQuestion}><FormattedMessage id = 'cancel'/></button>
				<button id="saveEditQuestion" className={styles.btnSaveAssign} onClick={this.saveEditQuestion}><FormattedMessage id = 'save'/></button>
				</div>
			</div>	
		:	<div className={cls_userQuestionPost}>
				<Link id="viewprofile" className={styles.avatarCircle}>
					<img src={data && data.author && data.author.profile && data.author.profile.profileImage ? "/uploads/"+data.author.profile.profileImage : "/images/profile-pics/default-user.png"} onClick={this.viewUser.bind(this, data && data.author && data.author._id ? data.author._id : '')} title={this.props.intl.messages.viewprofile} />
				</Link>
				<div className={styles.nameQuestion}>
					<h2>{data && data.author && data.author.firstname ? data.author.firstname : 'User Name'}</h2>
					<p>{data && data.broadcast}</p>
					<p className={styles.timeDisplay}>{time}</p>
				</div>
			</div>
		}
			<div className={styles.questionActionsBlock}>
				<div className={styles.bottomActions}>
					<ul>
						
						<li>
							<Link id="viewAllComments" title={this.context.intl.messages.view_all_comments} id={data && data._id} onClick={this.showComment}><span>{this.state.total} </span><span><FormattedMessage id = 'view_comments'/></span></Link>
						</li>
						
						{data && data.author && data.author._id == this.props.uid && this.state.edit == false ?
							<li>
								<Link id="editComment" onClick ={this.handleEdit}  title={this.context.intl.messages.edit_comment}><span><FontAwesome name="pencil-square-o" /> </span><span><FormattedMessage id = 'edit'/></span></Link>
							</li>
						: null }
						{data && data.author && data.author._id == this.props.uid ? 
							<li>
								<Link id="deleteComment" onClick ={this.handleDelete} title={this.context.intl.messages.delete_comment} ><span><FontAwesome name="times" /> </span><span><FormattedMessage id = 'delete'/></span></Link>
							</li>
						: null}					
						
					</ul>
				</div>
			</div>
		
			{this.state.showComment ?
				<div className={styles.postedAnswersBlock}>
					<div className={styles.listPostedAns}>
						<div className={styles.listPostedAns}>
							{this.loadComment()}
							{this.state.total > this.state.limit ? <a id="loadMore" href="#" onClick={this.loadmore}><FormattedMessage id = 'previous_comments'/></a> : null}
						</div>
					</div>
					<div className={styles.postAnswerInList}>
						<textarea id="postAnsTextArea" className={styles.postAnsTextArea} placeholder={this.context.intl.messages.comment_on_broadcast_news}  ref="comment"/>
						<button id="postComment" className={cls_postBtnInside} onClick={this.postComment}><FormattedMessage id = 'post'/></button>
						<label id="postCommentError" className={compstyles.errorPre}>{this.state.error ? this.state.error : ''}</label>
					</div>
				</div>
			:null}
		</div>
		);
	}

}

ViewBroadcast.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

ViewBroadcast.propTypes = {
  confObject: PropTypes.object,
};

export default injectIntl(ViewBroadcast);

