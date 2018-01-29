import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape,FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';
import confstyles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import styles from '../../../Admin/Admin.css';

export class MembersList extends Component {
	sendUserId = (e) => {
		let id = e.currentTarget.id;
		alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_member_group_alert, 
      function (result) {
        if(result) {          
          props.getUserId(id);
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); 
		/*if (confirm('Do you want to remove from this group?')) {
			let id = e.currentTarget.id;
			this.props.getUserId(id);
		}*/
	}

	viewUser() {
    browserHistory.push('/profile/'+this.props.value._id)
  }

	render(){
		// console.log("ListItem--", props);
		let cls_chatBox = `${confstyles.chatBox} ${confstyles.bgTransition}`;
		let cls_callBox = `${confstyles.callBox} ${confstyles.bgTransition}`;
		let cls_action = `${confstyles.actionBlock}`;
		if (this.props && this.props.value) {
			let listItem = this.props.value;
			let imgsrc = "/images/profile-pics/default-user.png";
			if (listItem.profile && listItem.profile.profileImage){
				imgsrc = "/uploads/"+listItem.profile.profileImage;
			}
			return(
				<li>
					{(this.props.uid == this.props.adminid && listItem._id != this.props.adminid) ? 
						<div className={cls_action}>
							<span className={confstyles.actionButtonBox} id={listItem._id} onClick={this.sendUserId} title="Remove">
								<img src="/images/icons/red-cross.png" />
							</span>
						</div> : null}
					<a className="clearfix" onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile}>
						<img src={imgsrc} />
						<h3>{listItem.firstname ? listItem.firstname : "-"} {listItem.lastname ? listItem.lastname : ""}
              			<p className={styles.onlineColor}>{listItem._id == this.props.adminid ?  'Admin' : ''}</p>
			            </h3>
					</a>
				</li>
			);
		}
  	}
}

MembersList.propTypes = {
  value: PropTypes.object,
  getUserId: PropTypes.func
};

export default injectIntl(MembersList);