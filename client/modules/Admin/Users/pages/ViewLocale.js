import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import weStyles from '../../Profile/components/WorkEdu.css';
import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import { userProfileSubMenu } from '../schema/UserMenu';
import { userProfileMenu } from '../schema/UserMenu';
import { loggedInData } from '../../../Login/LoginReducer';
import { getUserLocaleData } from '../UsersActions';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

class ViewLocale extends Component {

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
		this.submenu.menus[2].action = this.navigate.bind(this, "/admin/users/contacts/");
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
      		getUserLocaleData(this.userId).then(res => this.setresponse(res));
    	}
	}

	setresponse = (response) => {
		if(response.status){
			this.setState({ data : response.data && response.data.locale ? response.data.locale : null, name : response.data.firstname});
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
    let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    let submenu = Validator.activeSubMenu(userProfileSubMenu, "lnkProfileLocale");
    let locale = this.state.data ? this.state.data : null;

    if(this.state && this.state.data && this.state.data.preferedlanguage){
    this.preferedlanguage = this.state.data.preferedlanguage == "en" ? "English" : (this.state.data.preferedlanguage == 'hi' ? "Hindi" : this.state.data.preferedlanguage );
    } else {

    }
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
	              <li><FormattedMessage id='view_locale' /></li>
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
        			<Row>
	              <Col md={12}>
	                <div className={styles.infoTxt}>
	                  <p><FormattedMessage id='local_settings' /></p>
	                </div>
	              </Col>
	            </Row>
	            {locale != null ? 
	            	<Row>
	              	<Col md={12}>
	                	<div className={styles.formField}>
		                  <div className={styles.txtContainer}>
		                    <div className={cls_inlineEditGroup}>
		                      <label htmlFor="Time Zone"><FormattedMessage id='time_zone' />:</label>
		                      <div className={styles.inlineEdit}>{locale.timezone ? locale.timezone : "-"}</div>
		                    </div>
		                    <div className={cls_inlineEditGroup}>
		                      <label htmlFor="Date Format"> <FormattedMessage id='date_format' />:</label>
		                      <div className={styles.inlineEdit}>{locale.dateformat ? locale.dateformat : "-"}</div>
		                    </div>
		                    <div className={cls_inlineEditGroup}>
		                      <label htmlFor="Time Format"><FormattedMessage id='time_format' />:</label>
		                      <div className={styles.inlineEdit}>{locale.timeformat ? locale.timeformat : "-"}</div>
		                    </div>
		                     <div className={cls_inlineEditGroup}>
		                      <label htmlFor="Currency Format"><FormattedMessage id='currency_format' />:</label>
		                      <div className={styles.inlineEdit}>{locale.currencyformat ? locale.currencyformat : "-"}</div>
		                    </div>
		                    <div className={cls_inlineEditGroup}>
		                      <label htmlFor="Prefered Language"><FormattedMessage id='prefered_language' />:</label>
		                      <div className={styles.inlineEdit}>{this.preferedlanguage ? this.preferedlanguage : "-"}</div>
		                    </div>
		                  </div>
	                	</div>
	              	</Col>
	            	</Row>
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

ViewLocale.propTypes = {
  loggedInData: PropTypes.object,
};

ViewLocale.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ViewLocale);
