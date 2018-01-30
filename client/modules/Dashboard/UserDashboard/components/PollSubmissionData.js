import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import { Roles } from  '../../../../roles';


class PollSubmissionData extends Component{

	constructor(props) {
		super(props)
	}

	viewUser() {
    browserHistory.push('/profile/'+this.props.data.submittedBy._id)
  }

	render(){
		let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
		let answerBlock = {
			marginLeft: '40px'
		}
		let answerLabel = {
			fontWeight: '600',
    	color: 'rgba(0,0,0,0.54)'
		}
		let answer = {
			fontWeight: 'normal',
			color: 'rgba(0,0,0,0.87)'
		}

		let data = this.props.data
    let profileImage = data ? data.submittedBy ? data.submittedBy.profile ? data.submittedBy.profile.profileImage:'':'':''
    if(profileImage == '' || profileImage == undefined || profileImage == null) {
      var imagePath = '/images/profile-pics/defaultStudent.jpg'
    } else {
      var imagePath = '/uploads/'+profileImage
    }

		if(this.props.data != null){
			return(
				<li>
					<Row>
						<Col md={12}>
							<div className={cls_topicAuthor}>
								<img id="viewprofile" src={imagePath} onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile} />
								<div className={styles.authorInfo}>
									<p className={styles.authorName}>{this.props.data.submittedBy.firstname} {this.props.data.submittedBy.lastname}</p>
									<p className={styles.authorDisg}><FormattedMessage id = 'submitted_by'/></p>
								</div>
							</div>
							<p style={answerBlock}>
								<span style={answerLabel}>Answer : </span>
								<span style={answer}>{this.props.data.answer}</span>
							</p>
						</Col>
					</Row>
				</li>
			);
		}else return;
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
  };
}

PollSubmissionData.contextTypes = {
	intl: React.PropTypes.object.isRequired

};

PollSubmissionData.propTypes = {
  intl: PropTypes.object,
};

export default connect(mapStateToProps)(PollSubmissionData);

