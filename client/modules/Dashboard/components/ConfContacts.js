import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { conferenceDetails } from '../../Communication/ConferenceReducer';
import {Col, Row} from 'react-bootstrap';
import AuthClient from '../../../components/AuthController.js';
import { isLoggedIn } from '../../Login/LoginActions';
import { loggedInData } from '../../Login/LoginReducer';
import mainStyles from '../../Layouts/DashLayout/DashLayout.css';
import styles from '../../Layouts/DashLayout/components/ConfSettings.css';
import { dashboardData } from '../UserDashboard/UserDashboardReducer';
import { chatData } from './group/ChatReducer';
import { getMyContacts, AddUsertoContact, requestResponse } from '../UserDashboard/UserDashboardActions';
import AddContacts from './AddContacts';
import ContactList from './contactsList';
import  {ToastContainer, ToastMessage} from '../../../lib';
import SocketHandler from '../../Communication/SocketHandler';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class ConfContacts extends Component {

		constructor() {
    	super();
    	this.state = {
    		showAddContacts: false,
    		uid : null,
    		userId: null
    	};
  	}

  	componentDidMount() {
    	let result = this.props.loggedInData;
    	if(result && result.data && result.data._id){
	      	this.setState({ uid : result.data._id });
	    }
	    this.props.dispatch(getMyContacts());
  	}

  	showOrHideAddContacts(e){
  		this.setState({showAddContacts: !this.state.showAddContacts});
  	}

  	addUser(userId){
  		this.setState({userId:userId});
  		let obj = {
  			userId : userId
  		};
  		this.props.dispatch(AddUsertoContact(obj)).then(res => this.showresponse(res));
  	}

  	showresponse(response){
  		//console.log("response == ",response);
  		let socketObj = {
  		  command : "ADD-CONT",
  		  obj : {
	  			uid : this.state.uid,
	  			userId : this.state.userId
  		  }
  		}
  		SocketHandler.sendInstaMessage(socketObj, this.state.userId);
  		if(response.status){
        this.refs.contactcontainer.success(response.message, ``);
        this.setState({ searchValue : '', searchUsers : [] });
    	}else{
    		if(response.error){
        		this.refs.contactcontainer.error(response.error, ``);
    		}
    	}
  	}

  	sendUserId(userId){
  		console.log("userId ==== ",userId);
  	}

  	requestResponse(obj){
  		// console.log("obj === ",obj);
  		this.setState({userId:obj.userId});
  		this.props.dispatch(requestResponse(obj)).then(res => this.setresponse(res));
  	}

  	setresponse(response){
  		if(response.status){
	  		let socketObj = {
	  		  command : "CONT-RES",
	  		  obj : {
		  			uid : this.state.uid,
		  			userId : this.state.userId
	  		  }
	  		}
  			SocketHandler.sendInstaMessage(socketObj, this.state.userId);
        this.refs.contactcontainer.success(response.message, ``);
    	}else if(response.error){
      	this.refs.contactcontainer.error(response.error, ``);
    	}
  	}

  	chatCallback(){
  		this.props.handleMenu({current : 'chats'});
  	}

  	render(){
			let cls_headerList = `${styles.modHeaderList} clearfix`;
			let cls_midTitle    = `${styles.midTitle} pull-left`;
			let cls_block50     = `${styles.block50} pull-right hidden-xs hidden-sm`;
			let cls_block50_l     = `${styles.block50} pull-right`;
			let cls_block50_mob_back = `${styles.block50} pull-left hidden-lg hidden-md`;
			let cls_headerText  = `${styles.headerText} pull-left`;
			let cls_optionBlock = `${styles.optionsBlock} pull-right`;
			let cls_settingsOptions = `${styles.settingsOptionInput} ${styles.radio}`;
			let cls_modChatFooter  = `${styles.modChatFooter} clearfix`;
			let cls_chatWrite       = `${styles.chatWrite} pull-left`;
			let cls_formControl     = `${styles.formControl} ${styles.formControlChatOverwrite}`;
			let cls_sendMessage = `pull-right ${styles.sendMessage}`;
			let cls_chatBox = `${styles.chatBox} ${styles.bgTransition}`;
			let cls_callBox = `${styles.callBox} ${styles.bgTransition}`;

			let cls_contactsList = `${styles.contactListFixed} ${styles.openMyContacts}`;

			var contacts = <div className={styles.modNoContacts}>
					          <div className={styles.noContactsCircle}>
					            <img src="/images/profile-pics/no-contacts.png" />
					          </div>
					          <h2><FormattedMessage id='no_recent_contacts'/>
					            <p><FormattedMessage id='add_your_contacts'/></p>
					          </h2>
					        </div>;

			if(this.props.dashboardData.mycontacts){
				let docs = this.props.dashboardData.mycontacts;
				console.log("contact docs--", docs);
				if(docs.length > 0){
					// console.log("docs === ",docs);
					// let key = 101;
					let conferenceDetails = this.props.conferenceDetails;
			    if(conferenceDetails && conferenceDetails.onlineStatus){
			      let onlineStatus = conferenceDetails.onlineStatus;
			      let notifications = this.props.chatData.individualCount;
			      let offlinecontacts = [];
			     		let onlinecontacts = docs.map((doc) => {
			     			if (doc._id && doc._id._id){
			     				if (_.indexOf(onlineStatus, doc._id._id ) > -1){
			     					return <ContactList key={doc._id._id}
		                    										value={doc} 
		                    										getUserId={this.sendUserId.bind(this)} 
		                    										chatCallback={this.chatCallback.bind(this)} 
		                    										requestResponse={this.requestResponse.bind(this)} 
		                    										online={1} 
		                    										count={notifications && notifications[doc._id._id] && notifications[doc._id._id] > 0 ? notifications[doc._id._id] : null}/>
			     				} else {
			     					offlinecontacts.push(<ContactList key={doc._id._id}
		                    										value={doc} 
		                    										getUserId={this.sendUserId.bind(this)} 
		                    										chatCallback={this.chatCallback.bind(this)} 
		                    										requestResponse={this.requestResponse.bind(this)} 
		                    										online={-1} 
		                    										count={notifications && notifications[doc._id._id] && notifications[doc._id._id] > 0 ? notifications[doc._id._id] : null}/>)
			     					return null;
			     				}
			     			} else {
			     				return null;
			     			}
			     		}
						);
						contacts = <div className={styles.modContactList}>
						          <ul>
						            {onlinecontacts}
						            {offlinecontacts}
						          </ul>
						        </div>;
					}
				}
			}

			return (
				<aside className={cls_contactsList} id="blockMyContacts">
			    <div className={styles.tableBlock}>
			     	<div className={styles.modAsideHeader}>
						  <div className={cls_headerList}>
						  	<ToastContainer
				          toastMessageFactory={ToastMessageFactory}
				          ref="contactcontainer"
				          className={styles.toastTop}
				         />
						  	<div className={cls_block50_mob_back} onClick={this.props.hideCallback} title={this.props.intl.messages.close} id="closeMyContacts">
						    	<img src="/images/black-icons/black-left-arrow.png" />
						    </div>            
						    <div className={cls_midTitle}>
						    	<h2><FormattedMessage id='my_contacts'/></h2>
						    </div>
						    
						    <AddContacts showModal={this.state.showAddContacts}
						    	hidecallback={this.showOrHideAddContacts.bind(this)} getUserId={this.addUser.bind(this)} 
						    	uid={this.state.uid} contactsData={this.props.dashboardData.mycontacts} requestResponse={this.requestResponse.bind(this)}/>		          
						    <div className={cls_block50} onClick={this.props.hideCallback} title={this.props.intl.messages.close} id="closeMyContacts">
						    	<img src="/images/black-icons/black-right-arrow.png" />
						    </div>
						    <div className={cls_block50_l} title={this.props.intl.messages.add_contacts} onClick={this.showOrHideAddContacts.bind(this)} id="iconMyContact">
						      <img src="/images/black-icons/black-add-contacts.png" />
						    </div>
						  </div>
						</div>
	     			<div className={styles.modAsideListBody}>
			        	{contacts}
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
    dashboardData: dashboardData(state),
    loggedInData : loggedInData(state),
    conferenceDetails: conferenceDetails(state),
    chatData : chatData(state)
  };
}

ConfContacts.propTypes = {
	loggedInData: PropTypes.object,
	dashboardData: PropTypes.object,
	chatData : PropTypes.object,
	dispatch: PropTypes.func.isRequired,
	intl: PropTypes.object,
	hideCallback: PropTypes.func,
	conferenceDetails: PropTypes.object,
};

ConfContacts.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ConfContacts);


/*ConfContacts.propTypes = {
    intl: PropTypes.object,
  	currentState: PropTypes.object,
  	hideCallback: PropTypes.func,
  	chatCallback: PropTypes.func,
};*/
