import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { profileData } from '../ProfileReducer';
import { ClearProfile } from '../ProfileActions';
import WorkEduView from '../components/WorkEduView';
import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {profileViewSubMenu} from '../schema/ProfileEditMenu';

// Import Style
import styles from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import { intlData } from '../../../Intl/IntlReducer';

class WorkEdu extends Component {
  
  // componentWillMount() {
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/profile/workedu'));
  //   //console.log(this.props.profile.error, this.props.profile.success);
  // }

  componentDidMount() {
    if (this.props.loggedInData && this.props.loggedInData.data) 
      this.props.dispatch(loginLanguage(this.props.loggedInData.data, this.props.intlData.setlocale));
  }

  componentWillUnmount() {
    this.props.dispatch( ClearProfile());
  }

  render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} ${styles.oSubMenu}`;
    let submenu = Validator.activeSubMenu(profileViewSubMenu, "lnkWorkEdu");
    return (
      <div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='my_account' /></h3>
            <div className={styles.dynamicBreadCrumb}>
              <ul>
              <li><FormattedMessage id='you_are_in_my_profile_panel'/></li>
              </ul>
            </div>
        </div>
  

        <div className={cls_isubmenu}>
          <SubMenu data={submenu} />
        </div>

        <WorkEduView profileData={this.props.loggedInData.data} error = {this.props.profile.error} success = {this.props.profile.success}/>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dashboardData: null,
    loggedInData: loggedInData(state),
    profile: profileData(state),
    intlData: intlData(state)
  };
}

WorkEdu.propTypes = {
  dashboardData: PropTypes.object,
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

WorkEdu.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(WorkEdu);
