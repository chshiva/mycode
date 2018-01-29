import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';
import confstyles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import styles from '../../../Admin/Admin.css';
import SocketHandler from '../../../Communication/SocketHandler';

export class GroupList extends Component {

  componentDidMount() {
  	// console.log("subs group---", this.props.value);
    // SocketHandler.subscribeStatus(this.props.value._id);
  }

	sendData = () => {
		this.props.callBack(this.props.value);
	}

	chatCB = () => {
		this.props.chatCallback({chatData : this.props.value, chatType : "Group"});
	}

	render(){
		// console.log("ListItem--", props);
		let cls_chatBox = `${confstyles.chatBox} ${confstyles.bgTransition}`;
		let cls_callBox = `${confstyles.callBox} ${confstyles.bgTransition}`;
		let cls_action = `${confstyles.actionBlock}`;
		if (this.props && this.props.value) {
			let listItem = this.props.value;
			/*let imgsrc = "/images/profile-pics/default-user.png";
			if (listItem._id.profile && listItem._id.profile.profileImage){
				imgsrc = "/uploads/"+listItem._id.profile.profileImage;
			}*/
			return(
				<li>
					<div className={cls_action}>
						<span className={confstyles.actionButtonBox} id={listItem._id} onClick={this.chatCB.bind(this)} title="Chat">
							<img src="/images/black-icons/individual-chat.png" />
						</span>
						<span className={confstyles.actionButtonBox} id={listItem._id} title="Call">
							<img src="/images/black-icons/call-phone.png" />
						</span>
					</div>
					<a onClick={this.sendData} className="clearfix">
						<img src="/images/white-icons/white-group.png" />
						<h3>{listItem.groupName ? listItem.groupName : "-"}</h3>
					</a>
				</li>
			);
		}
  	}
}

GroupList.propTypes = {
  value: PropTypes.object,
  getUserId: PropTypes.func
};

export default GroupList;