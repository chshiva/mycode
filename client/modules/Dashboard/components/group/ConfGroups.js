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
import { getMyGroups } from './ChatActions';

import CreateGroup from './CreateGroup';
import GroupList from './GroupList';


class ConfGroups extends Component {

	constructor() {
    	super();
    	this.state = {
    		showAddGroup: false,
    		uid : null
    	};
  	}

  	componentDidMount() {
    	let result = this.props.loggedInData;
    	if(result && result.data && result.data._id){
	      	this.setState({ uid : result.data._id });
	      	this.props.dispatch(getMyGroups(result.data._id));
	    }
  	}

  	showOrHideAddGroups(e){
  		this.setState({showAddGroup: !this.state.showAddGroup});
  	}

  	getGroup(data){
  		this.props.callBack(data);
  	}

  	render(){
		let cls_headerList = `${styles.modHeaderList} clearfix`;
		let cls_midTitle    = `${styles.midTitle} pull-left`;
		let cls_block50     = `${styles.block50} pull-right`;
		let cls_block50_l     = `${styles.block50} pull-right`;
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

		if(this.props.currentState.groups){
		  cls_contactsList = `${styles.contactListFixed} ${styles.openMyContacts}`;
		}

		var groups = <div className={styles.modNoContacts}>
				          <div className={styles.noContactsCircle}>
				            <img src="/images/profile-pics/no-contacts.png" />
				          </div>
				          <h2><FormattedMessage id='no_recent_groups'/>
				            <p><FormattedMessage id='add_your_groups'/></p>
				          </h2>
				        </div>;
		if(this.props.chatData.mygroups){
			let docs = this.props.chatData.mygroups;
			if(docs.length > 0){
				// console.log("docs === ",docs);
				// let key = 101;
				let self = this;
				let listgroups = docs.map((doc) => 
				  	doc._id ? <GroupList key={doc._id}
                    value={doc} callBack={self.getGroup.bind(self)} chatCallback={this.props.chatCallback} /> : null
				);
				groups = <div className={styles.modContactList}>
				          <ul>
				            {listgroups}
				          </ul>
				        </div>;
			}
		}

		return (
		<aside className={cls_contactsList} id="blockMyContacts">
		    <div className={styles.tableBlock}>
		     	<div className={styles.modAsideHeader}>
		     		<div className={cls_headerList}>            
					    <div className={cls_midTitle}>
					    	<h2><FormattedMessage id='my_groups'/></h2>
					    </div>
					    <CreateGroup showModal={this.state.showAddGroup}
					    	hidecallback={this.showOrHideAddGroups.bind(this)}
					    	uid={this.state.uid} />
					    <div className={cls_block50} onClick={this.props.hideCallback} title={this.props.intl.messages.close} id="closeMyContacts">
					    	<img src="/images/black-icons/black-right-arrow.png" />
					    </div>
					    <div className={cls_block50_l} title={this.props.intl.messages.create_group} onClick={this.showOrHideAddGroups.bind(this)} id="iconMyGroup">
					      <img src="/images/black-icons/black-add-contacts.png" />
					    </div>
					</div>
				</div>
				<div className={styles.tableBlockRow}>
		     		<div className={styles.tableBlockCell}>
		     			<div className={styles.modAsideListBody}>
				        	{groups}
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

ConfGroups.propTypes = {
	loggedInData: PropTypes.object,
	chatData: PropTypes.object,
	dispatch: PropTypes.func.isRequired,
	intl: PropTypes.object,
	currentState: PropTypes.object,
	hideCallback: PropTypes.func,
	chatCallback: PropTypes.func,
};

ConfGroups.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ConfGroups);


