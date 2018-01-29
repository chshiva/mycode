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
import dashboardStyles from '../../../Dashboard/Dashboard.css';
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

class ViewWorkEdu extends Component {

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
		this.submenu.menus[2].action = this.navigate.bind(this, "/admin/users/contacts/");
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
			this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      		getUserProfile(this.userId).then(res => this.setresponse(res));
    	}
	}

	setresponse = (response) => {
		if(response.status){
			this.setState({ data : response.data && response.data.profile ? response.data.profile : null, name : response.data.firstname });
		}
	}
	viewuser = () => {
    browserHistory.push('/admin/users/view/'+this.userId);
  }

	render() {
		let cls_container = `${compstyles.iContainer} ${compstyles.oContainer} pull-right`;
		let cls_topmenu = `${compstyles.iTopMenu} ${compstyles.oTopMenu}`;
    let cls_isubmenu = `${compstyles.iSubMenu} {compstyles.oSubMenu}`;
    let displayInfoBlock = `${weStyles.displayInfoBlock} clearfix`;
    let iconBox = `${weStyles.iconBox} pull-left`;
    let informationBox = `${weStyles.informationBox} pull-left`;
    let singleInfoBox = `${weStyles.singleInfoBox} pull-left`;
    let cls_vr = `${dashboardStyles.vR}`;
    let cls_email = `${dashboardStyles.vN} ${dashboardStyles.bfK} ${dashboardStyles.a3q}`;
    let cls_vt = `${dashboardStyles.vT}`;
    let cls_vm = `${dashboardStyles.vM}`;
    
    let submenu = Validator.activeSubMenu(userProfileSubMenu, "lnkProfileWorkEdu");
  	let profile = this.state.data;
  	let workplace = profile && profile.experience && profile.experience.workplace && profile.experience.workplace.length > 0 ? profile.experience.workplace : null;
  	let skills = profile && profile.experience && profile.experience.professionalSkills && profile.experience.professionalSkills.length > 0 ? profile.experience.professionalSkills : null;
  	let college = profile && profile.education && profile.education.college && profile.education.college.length > 0 ? profile.education.college : null;
  	let school = profile && profile.education && profile.education.highSchool ? profile.education.highSchool : null;
  	return(
			<div className={cls_container}>
				<div className={cls_topmenu}>
					<h3 className={compstyles.capitalize}><FormattedMessage id='manage_user' /> :: {this.state.name}</h3>
						<div className={compstyles.dynamicBreadCrumb}>
              <ul>
                <li> 
                  <Link onClick={this.viewuser}><FormattedMessage id = 'user_details'/></Link>
                </li>
                <li>/</li>
                <li><FormattedMessage id='work_edu_details' /></li>
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
            		<h2 className={weStyles.categoryHeading}><FormattedMessage id='work_title' /></h2>
          			<ul>
          				{workplace != null ? 
											workplace.map((data) => {
												return <li key={data._id}>
														<div className={displayInfoBlock}>
															<div className={iconBox}>
																<img src="/images/icons/company.png" />
															</div>
															<div className={informationBox}>
																<h2 className={weStyles.displayHeadingTxt}>{data.company}</h2>
																<span>{data.position} </span>
																<span>| </span>
																<span>{data.yearFrom} to {data.yearTo == null && data.present == true ? "present" : data.yearTo} </span>
																<span>| </span>
																<span>{data.city}, </span>
																<span>{data.country}</span>
																<p className={weStyles.descriptionTxt}>{data.description}</p>
															</div>
														</div>
													</li>
												})
          					: <li>
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
          					</li>}

          			</ul>
            	</div>
            	<div className={weStyles.userCategoryInfo}>
            		<h2 className={weStyles.categoryHeading}><FormattedMessage id='professionalSkills_title' /></h2>
            		<ul>
            			{skills != null ? 
										<li>
											<div className={displayInfoBlock}>
												<div className={singleInfoBox}>
													<h2 className={weStyles.displayHeadingTxt}>
														{skills.map((data, index) => 
															<div className={cls_vr} key={index}>
																<span className={cls_email}>
																	<div className={cls_vt}>{data}</div>
																</span>
															</div>                                  
														)}
													</h2>
												</div>
											</div>
										</li>
									: <li>
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
          					</li>}
								</ul>
							</div>
							<div className={weStyles.userCategoryInfo}>
            		<h2 className={weStyles.categoryHeading}><FormattedMessage id='college_title' /></h2>
            		<ul>
            			{college != null ? 
										college.map((data) => {
											return <li key={data._id}>
												<div className={displayInfoBlock}>
													<div className={iconBox}>
														<img src="/images/icons/college.png" />
													</div>
													<div className={informationBox}>
														<h2 className={weStyles.displayHeadingTxt}>{data.university}</h2>
														<span>{data.yearFrom} to {data.yearTo} </span>
														<span>| </span>
														<span>{data.city}, </span>
														<span>{data.country}</span>
														<p className={weStyles.descriptionTxt}>{data.description}</p>
													</div>
												</div>
											</li>
										})
            			: <li>
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
          					</li>}
            		</ul>
            	</div>
            	<div className={weStyles.userCategoryInfo}>
		            <h2 className={weStyles.categoryHeading}><FormattedMessage id='highSchool_title' /></h2>
		            <ul>
		            	{school != null ?
		            		<li>
											<div className={displayInfoBlock}>
												<div className={iconBox}>
													<img src="/images/icons/school.png" />
												</div>
												<div className={informationBox}>
													<h2 className={weStyles.displayHeadingTxt}>{school.school}</h2>
													<span>{school.yearFrom} to {school.yearTo} </span>
													<span>| </span>
													<span>{school.city}, </span>
													<span>{school.country}</span>
													<p className={weStyles.descriptionTxt}>{school.description}</p>
												</div>
											</div>
										</li>
		            	: <li>
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
          					</li>}
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

ViewWorkEdu.propTypes = {
  loggedInData: PropTypes.object,
};

ViewWorkEdu.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ViewWorkEdu);
