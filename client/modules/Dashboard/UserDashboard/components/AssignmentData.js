import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';

class AssignmentData extends Component{

	constructor(props) {
		super(props)
	}

	handleFullAssignment(){
		this.props.contantCallback(this.props.data);
	}

	//Code changed by - Najib, Desc - routing is called only for non-guest users
	viewUser() {
		if(!this.props.isGuest) {
    	browserHistory.push('/profile/'+this.props.data.createdBy._id)
  	}
  }

	render(){
		let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
		let data = this.props.data
    let profileImage = data ? data.createdBy ? data.createdBy.profile ? data.createdBy.profile.profileImage:'':'':''
    if(profileImage == '' || profileImage == undefined || profileImage == null) {
      var imagePath = '/images/profile-pics/defaultStudent.jpg'
    } else {
      var imagePath = '/uploads/'+profileImage
    }
		if(this.props.data != null){
			return(
				<li>
					<Row>
						<div className={styles.listTitle}>
							<Link id="fullAssignment" onClick={this.handleFullAssignment.bind(this)}>{this.props.data.assignmentName}</Link>
						</div>
					</Row>
					<Row>
						<Col md={4}>
							<div className={cls_topicAuthor}>
								<img id="viewprofile" src={imagePath} onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile} />
								<div className={styles.authorInfo}>
									<p className={styles.authorName}>{this.props.data.createdBy.firstname} {this.props.data.createdBy.lastname}</p>
									<p className={styles.authorDisg}><FormattedMessage id = 'author'/></p>
								</div>
							</div>
						</Col>
						<Col md={8}>
							<div className={styles.shortDecBlock}>
								{/*<p>{this.props.data.description}</p>*/}
								<span id="fullTopic" className={styles.fullTopic}><Link onClick={this.handleFullAssignment.bind(this)}><FormattedMessage id ='fulltopic'/></Link></span>
							</div>
						</Col>
					</Row>
				</li>
			);
		}else return;
	}
}


export default injectIntl(AssignmentData);
