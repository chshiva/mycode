import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row} from 'react-bootstrap';
import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import mainStyles from '../../../Layouts/DashLayout/DashLayout.css';
import styles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import { chatData } from './ChatReducer';
import { fetchGroupMembers } from './ChatActions';
import MembersList from './MembersList';
import AddMember from './AddMember';
import { membersToGroup, deleteGroup } from './ChatActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);


class GroupView extends Component {

	constructor() {
    	super();
    	this.state = {
    		showAddMember: false,
    		uid : null,
    		groupdata : null
    	};
  	}

  	componentDidMount() {
    	let result = this.props.loggedInData;
    	if(result && result.data && result.data._id){
	      	this.setState({ uid : result.data._id });
	    }
	    if(this.props.currentState && this.props.currentState.groupdata){
	    	this.setState({ groupdata : this.props.currentState.groupdata });
	    }
  	}

  	componentWillReceiveProps(nextProps) {
  		if(nextProps.currentState && nextProps.currentState.groupdata){
	    	this.setState({ groupdata : nextProps.currentState.groupdata });
	    }
  	}

  	showOrHideAddMember(e){
  		this.setState({showAddMember: !this.state.showAddMember});
  	}

  	addMember(id){
  		let doc = this.state.groupdata;
  		let obj = {
  			uid : this.state.uid,
  			mid : id,
  			_id : doc._id,
  			status : true
  		}
  		// console.log("obj === ",obj);
  		this.props.dispatch(membersToGroup(obj)).then(res => this.setresponse(res, doc));
  	}

  	setresponse(response, groupdata){
  		if(response.status){
          this.refs.group_container.success(response.message, ``);
          let self = this;
          _.each(response.data, function(doc){
          	if(doc._id == self.state.groupdata._id){
          		self.setState({ groupdata : doc });
          	}
          })
      	}else if(response.error){
      		this.setState({ groupdata : groupdata });
          	this.refs.group_container.error(response.error, ``);
      	}
  	}

  	removeMember = (mid) => {
  		let doc = this.state.groupdata;
  		let obj = {
  			uid : this.state.uid,
  			mid : mid,
  			_id : doc._id,
  			status : false
  		}
  		// console.log("obj === ",obj);
  		this.props.dispatch(membersToGroup(obj)).then(res => this.setresponse(res, doc));
  	}

  	deleteGroup = (e) => {
  		var props = this.props;    
	    var response = this.setdeleteresponse;
	    var doc = this.state.groupdata;

	    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_group_alert,  
	      function (result) {
	        if(result) {          
	          let obj = {
	  				uid : this.state.uid,
	  				_id : doc._id
	  			}
	        props.dispatch(deleteGroup(obj)).then(res => response(res, doc)); 
	        }
	      },
	      function() {

	      }
	    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); 
  		/*if (confirm('Do you want to delete this group?')) {
  			let doc = this.state.groupdata;
  			let obj = {
  				uid : this.state.uid,
  				_id : doc._id
  			}
  			this.props.dispatch(deleteGroup(obj)).then(res => this.setDeleteResponse(res, doc));
  		}*/
  	}

  	setDeleteResponse = (response, groupdata) => {
  		// console.log("response in delete === ",response);
  		if(response.status){
  			this.props.hideCallback();
  		}else{
      		this.setState({ groupdata : groupdata });
          	this.refs.group_container.error(response.error, ``);
  		}
  	}

  	render(){
  		let cls_headerList = `${styles.modHeaderList} clearfix`;
		let cls_midTitle    = `${styles.midTitle} pull-left`;
		let cls_block50     = `${styles.block50} pull-right`;
		let cls_block50_l     = `${styles.block50} pull-left`;
		let cls_headerText  = `${styles.headerText} pull-left`;
		let cls_optionBlock = `${styles.optionsBlock} pull-right`;
		let cls_settingsOptions = `${styles.settingsOptionInput} ${styles.radio}`;
		let cls_modChatFooter  = `${styles.modChatFooter} clearfix`;
		let cls_chatWrite       = `${styles.chatWrite} pull-left`;
		let cls_formControl     = `${styles.formControl} ${styles.formControlChatOverwrite}`;
		let cls_sendMessage = `pull-right ${styles.sendMessage}`;
		let cls_chatBox = `${styles.chatBox} ${styles.bgTransition}`;
		let cls_callBox = `${styles.callBox} ${styles.bgTransition}`;

		let cls_contactsList = `${styles.contactListFixed}`;

		if(this.props.currentState.showgroup){
		  cls_contactsList = `${styles.contactListFixed} ${styles.openMyContacts}`;
		}

		var members = <div className={styles.modNoContacts}>
				          <div className={styles.noContactsCircle}>
				            <img src="/images/profile-pics/no-contacts.png" />
				          </div>
				          <h2><FormattedMessage id='no_recent_member'/>
				            <p><FormattedMessage id='add_your_members'/></p>
				          </h2>
				        </div>;
		if(this.state.groupdata){
			let docs = this.state.groupdata;
			if(docs.members.length > 0){
				// console.log("docs === ",docs);
				// let key = 101;
				let self = this;
				let listmembers = docs.members.map((doc) => 
				  	doc._id ? <MembersList key={doc._id}
	                value={doc} adminid={docs.createdBy} uid={self.state.uid} getUserId={this.removeMember}/> : null
				);
				members = <div className={styles.modContactList}>
				          <ul>
				            {listmembers}
				          </ul>
				        </div>;
			}
		}
		let data = this.state.groupdata;
		return (
		<aside className={cls_contactsList} id="blockMyContacts">
		    <div className={styles.tableBlock}>
		     	<div className={styles.modAsideHeader}>
		     		<div className={cls_headerList}>            
					    <div className={cls_midTitle}>
					    	<h2>{data && data.groupName ? data.groupName : "-"}</h2>
					    </div>
					    {(data && data.createdBy == this.state.uid) ?
					    	<div className={cls_block50_l} title={this.props.intl.messages.add_member} onClick={this.showOrHideAddMember.bind(this)}>
							    <img src="/images/black-icons/black-add-contacts.png" />
							</div>
						: null}
					    <AddMember showModal={this.state.showAddMember}
					    	hidecallback={this.showOrHideAddMember.bind(this)} getUserId={this.addMember.bind(this)} 
					    	uid={this.state.uid} gid={this.props.currentState && this.props.currentState.groupdata ? this.props.currentState.groupdata._id : null}/>	
					    <div className={cls_block50} onClick={this.props.hideCallback} title={this.props.intl.messages.close} id="closeMyContacts">
					    	<img src="/images/black-icons/black-right-arrow.png" />
					    </div>
					    <div className={cls_block50} title={this.props.intl.messages.delete_group} onClick={this.deleteGroup}>
							<img src="/images/black-icons/delete-box-black.png" />
					    </div>
					</div>
				</div>
				<div className={styles.tableBlockRow}>
					<ToastContainer
			          toastMessageFactory={ToastMessageFactory}
			          ref="group_container"
			          className="toast-bottom-right"
			         />
		     		<div className={styles.tableBlockCell}>
		     			<div className={styles.modAsideListBody}>
				        	{members}
				      </div>
		     		</div>
		     	</div>
		    </div> 
		</aside>
		);
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
  	intl: state.intl,
    chatData: chatData(state),
    loggedInData : loggedInData(state)
  };
}

GroupView.propTypes = {
	loggedInData: PropTypes.object,
	chatData: PropTypes.object,
	dispatch: PropTypes.func.isRequired,
	intl: PropTypes.object,
	currentState: PropTypes.object,
	hideCallback: PropTypes.func,
};

GroupView.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(GroupView);