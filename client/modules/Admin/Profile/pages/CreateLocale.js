import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { profileData } from '../ProfileReducer';
import { UpdateLocaleSchema, localesettingsStore, saveLocaleSettings } from '../ProfileActions';

import {localeEditSubMenu, localeEditMainMenu } from '../schema/ProfileEditMenu';
import { LocaleSchema } from '../schema/ProfileSchema';

import DataObject from '../../../../components/DataObject';
import ContainerComponent from '../../../../components/ContainerComponent';
import Validator from '../../../../components/Validator';

// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import { loginLanguage, switchLanguage } from '../../../Intl/IntlActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

var dataObject = {};
 
class CreateLocale extends Component {
  constructor(props) {
  super(props);
    this.name = '';
    this.email = '';
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.submenu = Validator.activeSubMenu(localeEditSubMenu, "lnkEditLocale");   
    this.mainmenu = localeEditMainMenu;
    this.schema = LocaleSchema;
    this.res = {};
    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);

  }

  // componentWillMount () {
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //               '/admin/profile/locale')).then(res => {
  //     this.setdata(res)
  //   });
  // }
    componentDidMount() {
    this.setdata(this.props.loggedInData); 
  }

   setdata(result){
    // console.log(result);
    if (result && result.data && result.data._id) {
        /*this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale))*/;
        this.props.dispatch(UpdateLocaleSchema(this.schema));
        this.props.dispatch(localesettingsStore({ uid: result.data._id }));
    }
  }
   save = () => {
    // console.log("this.form ==== ", this.form);
    var response = Validator.validate(this.form, this.schema, null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateLocaleSchema(this.schema));
    }else{
      const localeobj = this.form;
      this.props.dispatch(saveLocaleSettings(localeobj)).then(res => this.setresponse(res));
    }
  }
    setresponse = (response) => {
    if(response.status){
      this.refs.profile_container.success(`${response.message} `, ``);
      this.props.dispatch(isLoggedIn(AuthClient.getSession())).then(res => {
        if(res.status){
          let businessType = res.data && res.data.profile && res.data.profile.companyid && res.data.profile.companyid.businessType != 'undefined' ? res.data.profile.companyid.businessType : 'Conference';
          this.props.dispatch(loginLanguage(response.data, this.props.intlData.setlocale));
          this.props.dispatch(switchLanguage(response.data.locale.preferedlanguage, businessType, this.props.intlData.setlocale));
          browserHistory.push('/admin/locale/view');    
        }
      })     
    }else{
      this.refs.profile_container.error(`${response.error} `, ``);      
    }
  }

  datareceive(data) {
    this.form = data;
  }

  render () {
      var bredcrumb = (
      <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li> 
            <Link to="admin/profile"><FormattedMessage id = 'my_profile'/></Link>
          </li>
          <li>/</li>
           <li><FormattedMessage id = 'locale'/></li>
        </ul>
      </div>)
    let clsContainerRight = `${styles.containerRight} pull-right`;
    if(this.props.profileData.data){
    return (
      <div>
       <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="profile_container"
          className="toast-top-right"
        />
          <ContainerComponent data={ this.props.profileData.schema }
          submenu={ this.submenu }
          bredCrumb={bredcrumb}
          topmenu={ this.mainmenu }
          dataFun = { this.datareceive }
          dataobject = { dataObject }
          success = { this.props.profileData.success }
          error = { this.props.profileData.error }
          />
        
      </div>    
    );
    }else{
      return (
        <div>Loading...</div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    profileData: profileData(state),
    intlData: intlData(state)
  };
}

CreateLocale.propTypes = {
  loggedInData: PropTypes.object,
  profileData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

CreateLocale.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CreateLocale);
