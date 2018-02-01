import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../../Admin/Admin.css';
import { contactRequest } from '../../UserDashboard/UserDashboardActions';
import confstyles from '../../../Layouts/DashLayout/components/ConfSettings.css';

export class ShowContact extends Component {

	sendUserId(e) {
	    let userId = e.target.id;
	    // console.log(userId);
	    if (userId && userId != 'undefined')
	      this.props.getUserId(userId);
	}

	viewUser() {
    browserHistory.push('/profile/'+this.props.value._id)
  }

	render(){
		// console.log("ListItem--", props);
		if (this.props && this.props.value) {
			let listItem = this.props.value;
			let imgsrc = "/images/profile-pics/default-user.png";
			if (listItem.profile && listItem.profile.profileImage)
				imgsrc = "/uploads/"+listItem.profile.profileImage;
			return(
				<li>
					<div className="clearfix">
						<img src={imgsrc} className="pull-left" onClick={this.viewUser.bind(this)} />
						<h4 className="pull-left">
							{listItem.firstname ? listItem.firstname : "-"} {listItem.lastname ? listItem.lastname : "-"}
							<p>{listItem.email ? listItem.email : "-"}</p>
						</h4>
						<div className={confstyles.actionBlock} title="add">
				            <FontAwesome name ="plus" id={listItem._id} onClick={this.sendUserId.bind(this)} />
				        </div>
					</div>
				</li>
			);
		}
  	}
}

ShowContact.propTypes = {
  value: PropTypes.object,
  // intl: PropTypes.object,
  // error : PropTypes.array,
  // success : PropTypes.string,
  getUserId: PropTypes.func
};

export default ShowContact;