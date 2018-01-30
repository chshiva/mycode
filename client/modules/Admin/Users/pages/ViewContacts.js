import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import weStyles from '../../Profile/components/WorkEdu.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';

import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import { userProfileSubMenu } from '../schema/UserMenu';
import { userProfileMenu } from '../schema/UserMenu';
import { loggedInData } from '../../../Login/LoginReducer';
import { getUserProfile } from '../UsersActions';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
var moment = require('moment');

class ViewContacts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data : null,
			name : ''
		};

		this.mainmenu = userProfileMenu;
		this.mainmenu.menus[0].action = this.navigate.bind(this, "/admin/users/view/");
		this.submenu = userProfileSubMenu;
		this.submenu.menus[0].action = this.navigate.bind(this, "/admin/users/profile/");
		this.submenu.menus[1].action = this.navigate.bind(this, "/admin/users/workedu/");
		this.submenu.menus[3].action = this.navigate.bind(this, "/admin/users/locale/");
		this.userId = this.props.params.pid;

	}

	navigate = (route) => {
		let path = route + this.userId;
		browserHistory.push(path);
	}

	componentDidMount() {
    	this.setdata(this.props.loggedInData);    
  	}

  	setdata = (result) => {
		if (result && result.data && result.data._id) {
      		// let viewUserId = this.props.params.pid;
      		this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      		getUserProfile(this.userId).then(res => this.setresponse(res));
    	}
	}

	setresponse = (response) => {
		console.log('response',response);
		if(response.status){
			this.setState({ data : response.data && response.data.profile ? response.data.profile : null, name : response.data.firstname });
		}
	}
	viewuser = () => {
    browserHistory.push('/admin/users/view/'+this.userId);
  }

	render() {
		
		let displayInfoBlock = `${weStyles.displayInfoBlock} clearfix`;
		let singleInfoBox = `${weStyles.singleInfoBox} pull-left`;
		let cls_container = `${compstyles.iContainer} ${compstyles.oContainer} pull-right`;
    let cls_topmenu = `${compstyles.iTopMenu} ${compstyles.oTopMenu}`;
    let cls_isubmenu = `${compstyles.iSubMenu} {compstyles.oSubMenu}`;
    let submenu = Validator.activeSubMenu(userProfileSubMenu, "lnkProfileContacts");

		let contact = this.state.data && this.state.data.contact ? this.state.data.contact : null;
		let websiteLink = this.state.data && this.state.data.website ? this.state.data.website : null;
		let socialLink = this.state.data && this.state.data.socialLink ? this.state.data.socialLink : null;
		return(
			<div className={cls_container}>
				<div className={cls_topmenu}>
					<h3 className={compstyles.capitalize}><FormattedMessage id='manage_user' /> :: {this.state.name}</h3>
						<div className={compstyles.dynamicBreadCrumb}>
	            <ul>
	              <li> 
	                <Link id="userDetails" onClick={this.viewuser}><FormattedMessage id = 'user_details'/></Link>
	              </li>
	              <li>/</li>
	              <li><FormattedMessage id='view_contact_details' /></li>
	            </ul>
            </div>
					<TopMenu data={userProfileMenu} />
				</div>
				<div className={cls_isubmenu}>
					<SubMenu data={submenu} />
				</div>
				<div className={styles.midContainer}>
				<div className={styles.whiteCard}>
        	<Grid fluid={true}>
          	<div className={weStyles.userCategoryInfo}>
            	<h2 className={weStyles.categoryHeading}><FormattedMessage id ="contact_information"/></h2>
          		<ul>
          			<li>
              		<div className={displayInfoBlock}>
										<div className={singleInfoBox}>
											<div className="row">
												
												<div className="col-md-12">
													{contact != null ?
														<div>
															<div className="col-md-2">
																<p className={weStyles.leftInfoTxt}><FormattedMessage id ="address"/>:</p>
															</div>
															<div className="col-md-10">
																<ul className={weStyles.rightDetailInfo}>
																	<li>{ contact.address ? contact.address : '-'}</li>
																	<li>{ contact.city ? contact.city : '-'}, { contact.zip ? contact.zip : '-' }</li>
																</ul>
															</div>
														</div>
													: 
														<Row>
										          <div className={compstyles.whiteCard}>
										            <div className={dataStyle.noDataBox}>
										              <h2>
										                <FontAwesome name="frown-o" />
										              </h2>
										              <p><FormattedMessage id ="no_data_yet"/></p>
										            </div>
										          </div>
												     </Row>
													}
												</div>
											</div>
										</div>
									</div>
								</li>
								{contact != null ?
									<li>
										<div className={displayInfoBlock}>
											<div className={singleInfoBox}>
												<div className="row">
													<div className="col-md-12">
														<div className="col-md-2">
															<p className={weStyles.leftInfoTxt}><FormattedMessage id ="landmark"/>:</p>
														</div>
														<div className="col-md-10">
															<ul className={weStyles.rightDetailInfo}>
																<li> {contact.landMark ? contact.landMark : '-'}</li>
															</ul>
														</div>
												</div> 
											</div>
										</div>
										</div>
									</li>
								: null }
							</ul>
						</div>

						<div className={weStyles.userCategoryInfo}>
          		<h2 className={weStyles.categoryHeading}><FormattedMessage id ="website_and_social_links"/></h2>
          		<ul>
								<li>
									<div className={displayInfoBlock}>
										<div className={singleInfoBox}>
											<div className="row">

												<div className="col-md-12">
													<ul className={weStyles.rightDetailInfo}>
														<li>
														{ websiteLink != null || socialLink != null ?
																	<ul className={weStyles.rightDetailInfo}>
																		<li>
																		{ websiteLink ?
																			<div className={displayInfoBlock}>
																					<div className="col-md-2">
																						<p className={weStyles.leftInfoTxt}><FormattedMessage id ="website"/>:</p>
																					</div>
																					<div className="col-md-10">
																						<a id="website" href={this.state.data.website} target="_blank">{this.state.data.website}</a>
																					</div>
																			</div>
																		: 
																		 	null
																		}
																		</li>
																		<li>
																		{ socialLink ?
																		<div className={displayInfoBlock}>
																			<div className="col-md-2">
																					<p className={weStyles.leftInfoTxt}><FormattedMessage id ="social_link"/>:</p>
																				</div>
																				<div className="col-md-10">
																					<a id="socialLink" href={this.state.data.socialLink} target="_blank">{this.state.data.socialLink}</a>
																				</div>
																			</div>
																		: 
																			null
																		}
																		</li>
																		</ul>
											
																: <Row>
														          <div className={compstyles.whiteCard}>
														            <div className={dataStyle.noDataBox}>
														              <h2>
														                <FontAwesome name="frown-o" />
														              </h2>
														              <p><FormattedMessage id ="no_data_yet"/></p>
														            </div>
														          </div>
														        </Row>
															}
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</li>

								{// <li>
								// 	<div className={displayInfoBlock}>
								// 		<div className={singleInfoBox}>
								// 			<div className="row">
								// 				<div className="col-md-12">
								// 					<ul className={weStyles.rightDetailInfo}>
								// 						<li>
								// 							{this.state.data && this.state.data.socialLink ?
								// 								<div>
								// 									<div className="col-md-2">
								// 										<p className={weStyles.leftInfoTxt}><FormattedMessage id ="social_link"/>:</p>
								// 									</div>
								// 									<div className="col-md-10">
								// 										<a id="socialLink" href={this.state.data.socialLink} target="_blank">{this.state.data.socialLink}</a>
								// 									</div>
								// 								</div>
								// 								: <Row>
								// 						          <div className={compstyles.whiteCard}>
								// 						            <div className={dataStyle.noDataBox}>
								// 						              <h2>
								// 						                <FontAwesome name="frown-o" />
								// 						              </h2>
								// 						              <p><FormattedMessage id ="no_data_yet"/></p>
								// 						            </div>
								// 						          </div>
								// 						        </Row>
								// 							}
								// 						</li>
								// 					</ul>
								// 				</div>
								// 			</div>
								// 		</div>
								// 	</div>
								// </li>
							}
							</ul>
        		</div>

        		<div className={weStyles.userCategoryInfo}>
            	<h2 className={weStyles.categoryHeading}><FormattedMessage id ="basic_information"/></h2>
            		<ul>
            			{ this.state.data && this.state.data.dateofbirth &&  this.state.data.dateofbirth != '' ?
										<li >
											<div className={displayInfoBlock}>
												<div className={singleInfoBox}>
													<div className="row">
														<div className="col-md-12">
															<div className="col-md-2">
																<p className={weStyles.leftInfoTxt}>Birth Date:</p>
															</div>
															<div className="col-md-10">
																<ul className={weStyles.rightDetailInfo}>
																	<li>{moment(this.state.data.dateofbirth).format('MMMM Do')}</li>
																</ul>
															</div>
														</div>
													</div>
													<div className="row">
													<div className="col-md-12">
														<div className="col-md-2">
															<p className={weStyles.leftInfoTxt}>Year:</p>
														</div>
														<div className="col-md-10">
															<ul className={weStyles.rightDetailInfo}>
																<li>{moment(this.state.data.dateofbirth).format('YYYY')}</li>
															</ul>
														</div>
													</div>
													</div>
												</div>
											</div>
										</li>
									: null}
									{ this.state.data &&this.state.data.gender &&  this.state.data.gender != '' ?
										<li>
											<div className={displayInfoBlock}>
												<div className={singleInfoBox}>
													<div className="row">
														<div className="col-md-12">
														<div className="col-md-2">
															<p className={weStyles.leftInfoTxt}><FormattedMessage id ="gender"/>:</p>
														</div>
														<div className="col-md-10">
															<ul className={weStyles.rightDetailInfo}>
																<li>{this.state.data.gender}</li>
															</ul>
														</div>
														</div>
													</div>
												</div>
											</div>
										</li>
									: <Row>
							          <div className={compstyles.whiteCard}>
							            <div className={dataStyle.noDataBox}>
							              <h2>
							                <FontAwesome name="frown-o" />
							              </h2>
							              <p><FormattedMessage id ="no_data_yet"/></p>
							            </div>
							          </div>
							        </Row>}
								</ul>
							</div>  
      			</Grid>
    			</div>
  			</div>
			</div>
			);
		}

}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

ViewContacts.propTypes = {
  loggedInData: PropTypes.object,
};

ViewContacts.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ViewContacts);