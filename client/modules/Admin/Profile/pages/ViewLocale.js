import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { profileData } from '../ProfileReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import LocaleView from '../components/LocaleView';
import Validator from '../../../../components/Validator';
import {LocaleSchema} from '../schema/ProfileSchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {profileViewSubMenu, localeNewMainMenu} from '../schema/ProfileEditMenu';
import { ClearProfile, ClearProfileRes } from '../ProfileActions';


// Import Style
import styles from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import { loginLanguage } from '../../../Intl/IntlActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

class ViewLocale extends Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    /*if (this.props.loggedInData && this.props.loggedInData.data) 
      this.props.dispatch(loginLanguage(this.props.loggedInData.data, this.props.intlData.setlocale));*/
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.profileData && (nextProps.profileData.success && nextProps.profileData.success != "")) {
      //this.refs.profile_container.success(`${nextProps.profileData.success} `, ``);
      this.props.dispatch(ClearProfileRes());
    }
  }

  componentWillUnmount() {
    this.props.dispatch( ClearProfile());
  }
 render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let submenu = Validator.activeSubMenu(profileViewSubMenu, "lnkLocale");
    return (
      <div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='my_account' /></h3>
          <div className={styles.dynamicBreadCrumb}>
              <ul>
                <li><FormattedMessage id='you_are_in_my_profile_panel'/></li>
              </ul>
            </div>
          <TopMenu data={localeNewMainMenu} />
        </div>
  

        <div className={cls_isubmenu}>
          <SubMenu data={submenu} />
        </div>
        <LocaleView profileData={this.props.loggedInData.data}/>
      </div>
    );
  }
}
// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    profileData : profileData(state),
    loggedInData : loggedInData(state),
    intlData: intlData(state)
  };
}

ViewLocale.propTypes = {
  profileData : PropTypes.object,
  loggedInData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewLocale.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewLocale);
