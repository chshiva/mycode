import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';

import styles from '../../../../components/component.css';
import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import { userProfileSubMenu } from '../schema/UserMenu';
import { userProfileMenu } from '../schema/UserMenu';
import ProfileView from '../../Profile/components/ProfileView';
import { loggedInData } from '../../../Login/LoginReducer';
import { getProfileData, getUserImage } from '../UsersActions';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

class ViewProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			profileData : null,
			image : null
		}
		this.mainmenu = userProfileMenu;
		this.mainmenu.menus[0].action = this.navigate.bind(this, "/admin/users/view/");
		this.submenu = userProfileSubMenu;
		this.submenu.menus[1].action = this.navigate.bind(this, "/admin/users/workedu/");
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
      		getUserImage({ uid: this.userId }).then(res => this.setImage(res));
			getProfileData(this.userId).then(res => this.setresponse(res));
    	}
	}

	setImage = (response) => {
		if(response.status)
			this.setState({ image : response.data });
	}

	setresponse = (response) => {
		if(response.status){
			this.setState({ profileData : response.data });
		}
	}
	viewuser = () => {
    browserHistory.push('/admin/users/view/'+this.userId);
  }

	render() {
	    //let clsContainerRight = `${styles.containerRight} pull-right`;
	    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
	    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
	    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
	    let submenu = Validator.activeSubMenu(userProfileSubMenu, "lnkProfile");
	    return (
      		<div className={cls_container}>
        		<div className={cls_topmenu}>
          			<h3 className={styles.capitalize}><FormattedMessage id='manage_user' /> :: {this.state.profileData && this.state.profileData.firstname ? this.state.profileData.firstname : ''}</h3>
          				<div className={styles.dynamicBreadCrumb}>
			              <ul>
			                <li> 
			                  <Link onClick={this.viewuser}><FormattedMessage id = 'user_details'/></Link>
			                </li>
			                <li>/</li>
			                <li><FormattedMessage id='viewprofile' /></li>
			              </ul>
			            </div>
          			<TopMenu data={userProfileMenu} />
        		</div>

        		<div className={cls_isubmenu}>
          			<SubMenu data={submenu} />
        		</div>
        		<ProfileView profileData={this.state.profileData} src={this.state.image} reqUserId = {this.userId}/>
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

ViewProfile.propTypes = {
  loggedInData: PropTypes.object,
};

ViewProfile.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ViewProfile);