import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';
import { Roles } from '../../../../roles.js';
var _ = require('lodash');
import Loading from '../../../App/components/Loading';
/*import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);*/

export class ViewUserContainer extends Component {
	
	/*componentWillReceiveProps(nextProps) {
	    if(nextProps.success && nextProps.success != "") {
	      this.refs.container.success(`${nextProps.success} `, ``);
	    }
	    if(nextProps.error && nextProps.error.length > 0) {
	      this.refs.container.error(`${nextProps.error} `, ``);
	    }
	    this.props.clear;
	}*/
	render() {
		if(this.props.viewUserData) {
			let viewData =this.props.viewUserData;
			let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
			let cls_inlineEmail = `${styles.inlineEdit} ${styles.emailTransCap}`;	
			let roleObj = _.invert(Roles);
      let role = viewData.role;
      this.role = roleObj[role];
      if(role == Roles.Lmsadmin || role == Roles.CRMadmin || role == Roles.Presenteradmin) {
        this.role = roleObj[Roles.Admin];
      } else if (role == Roles.CRMuser) {
        this.role = roleObj[Roles.User];
      }
    	let loadType = 'list';

		return (
				<div className={styles.midContainer}>
					<div className={styles.whiteCard}>

					{/*Code added by - Najib, Desc - condition for adding a loader */}
					{ this.props.loading?
		        <div className={styles.mainSpinBlock} >
              <div className={styles.innerSpinBlock} >
		          	<Loading loadType = {loadType}/>
		        	</div>
		        </div> :
						<Grid fluid={true}>
							<Row>
								<Col md={12}>
									<div className={styles.infoTxt}>
										<p><FormattedMessage id='title_user_details' /></p>
									</div>
								</Col>
							</Row>
						  	<Row>
							   	<Col md={6}>
							    	<div className={styles.formField}>
							        	<h2><FormattedMessage id='user_info' /></h2>
							        <div className={styles.txtContainer}>
							        	<div className={cls_inlineEditGroup}>
							            	<label htmlFor="First Name"><FormattedMessage id='first_name' />:</label>
							            	<div className={styles.inlineEdit}>{viewData.firstname}</div>
							        	</div>
							        	<div className={cls_inlineEditGroup}>
							            	<label htmlFor="Last Name"><FormattedMessage id='last_name' />:</label>
							            	<div className={styles.inlineEdit}>{viewData.lastname ? viewData.lastname : "-"}</div>
							            </div>
							            <div className={cls_inlineEditGroup}>
							            	<label htmlFor="Email"><FormattedMessage id='email' />:</label>
							            	<div className={cls_inlineEmail}>{viewData.guest && viewData.email.split('guest_')[1] ? viewData.email.split('guest_')[1] : viewData.email}</div>
							            </div>
							        	<div className={cls_inlineEditGroup}>
							            	<label htmlFor="Gender"><FormattedMessage id='gender' />:</label>
							            	<div className={styles.inlineEdit}>{viewData.profile!=undefined?viewData.profile.gender:"-"}</div>
							        	</div>
							        	<div className={cls_inlineEditGroup}>
							            	<label htmlFor="Role"><FormattedMessage id='role' />:</label>
							            	<div className={styles.inlineEdit}>{ viewData.role != undefined ? this.role : "-" }</div>
							        	</div>
							        </div>
							      </div>
								</Col>
								<Col md={6}>
							      <div className={styles.formField}>
							        <h2><FormattedMessage id='company_details' /></h2>
							        <div className={styles.txtContainer}>
							          <div className={cls_inlineEditGroup}>
							            <label htmlFor="Company code"><FormattedMessage id='company_code' />:</label>
							            <div className={styles.inlineEdit}>{viewData.profile!=undefined? (viewData.profile.companyid && viewData.profile.companyid.businessId ? viewData.profile.companyid.businessId : "-") : "-"}</div>
							          </div>
							          {role === Roles.Student?
								          <div className={cls_inlineEditGroup}>
								            <label htmlFor="StudentId"><FormattedMessage id='studentId' />:</label>
								            <div className={styles.inlineEdit}>{ viewData.studentId!= undefined ? (viewData.studentId != "" ? viewData.studentId : "-") : "-" }</div>
								          </div>
								        :null}
							          <div className={cls_inlineEditGroup}>
							            <label htmlFor="Phone"><FormattedMessage id='phone' />:</label>
							            <div className={styles.inlineEdit}>{ viewData.profile != undefined ? (viewData.profile.phone != "" ? viewData.profile.phone[1] : "-") : "-" }</div>
							          </div>
							          <div className={cls_inlineEditGroup}>
							            <label htmlFor="Position"><FormattedMessage id='position' />:</label>
							            <div className={styles.inlineEdit}>{viewData.profile!=undefined?( viewData.profile.position != "" ? viewData.profile.position : "-" ):"-"}</div>
							          </div>
							         <div className={cls_inlineEditGroup}>
							            <label htmlFor="Department"><FormattedMessage id='department' />:</label>
							            <div className={styles.inlineEdit}>{viewData.profile!=undefined?( viewData.profile.dept != "" ? viewData.profile.dept : "-" ):"-"}</div>
							          </div>
							        </div>
							      </div>
								</Col>
						  	</Row>
							{/*<Row>
															<Col md={12}>
																<div className={styles.formField}>
															    	<h2><FormattedMessage id='default_room' /></h2>
																    <div className={styles.txtContainer}>
																    	<div className={cls_inlineEditGroup}>
																        	<label htmlFor="Room"><FormattedMessage id='room' />:</label>
																        	<div className={styles.inlineEdit}>{viewData.profile!=undefined?( viewData.profile.roomid !="" ? viewData.profile.roomid :"-") :"-"}</div>
																    	</div>
																    </div>
																</div>
															</Col>
														</Row>*/}
						</Grid> }
					</div>
           </div>
			);
      }
	}
	
}

ViewUserContainer.propTypes = {

}
ViewUserContainer.contextTypes = {
  router : React.PropTypes.object
};

