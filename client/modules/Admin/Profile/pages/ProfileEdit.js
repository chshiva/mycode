import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn, SaveProfile } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { ProfileStore, UpdateProfileSchema } from '../ProfileActions';
import { profileData } from '../ProfileReducer';
import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';

import ContainerComponent from '../../../../components/ContainerComponent';
import {profileSchema} from '../schema/ProfileSchema';
import {profileEditSubMenu, profileEditMainMenu} from '../schema/ProfileEditMenu';

// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import { loginLanguage, switchLanguage} from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

class ProfileEdit extends Component {
  constructor(props){
    super(props);
    this.name = '';
    this.email = '';
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = profileSchema;
    this.res = {};
    // this.state.schema = this.schema;
    this.submenu = Validator.activeSubMenu(profileEditSubMenu, "lnkGenaralInfo");

    // this.submenu = profileEditSubMenu;   
    this.mainmenu = profileEditMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
  }

  // componentWillMount() {
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                       '/admin/profile/edit')).then(res => {
  //     /*console.log("res");
  //     console.log(res);*/
  //     this.setdata(res)});
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
  }
  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
       var response = Validator.freeError(this.schema);
      if(response){
        this.schema = response;
        this.props.dispatch( UpdateProfileSchema(this.schema) );
        this.props.dispatch(ProfileStore(new DataObject(result.data)));
      }
    }
  }

  save = () => {
    // console.log(this.form);
    var response = Validator.validate(this.form, this.schema, null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch( UpdateProfileSchema(this.schema) );
    }else{
      let phno = this.form['profile.phone'];
      // if(phno && typeof(phno)!='string' && phno.length>0)
        phno.splice(2, 1);
      // else
      //   phno = [];
      this.form['profile.phone'] = phno;
      //console.log("this.form === ",this.form);
      this.props.dispatch(SaveProfile(this.form)).then(res => this.setresponse(res));
      this.props.dispatch( UpdateProfileSchema(this.schema) );
    }
  }

  setresponse = (response) => {
    if(response.status){
      this.refs.profile_container.success(`${response.message} `, ``);
      browserHistory.push('/admin/profile');
      this.props.dispatch(isLoggedIn(AuthClient.getSession()))
      this.props.dispatch(switchLanguage(response.data.locale.preferedlanguage, response.data.profile.companyid.businessType, this.props.intlData.setlocale));
    }else{
      this.refs.profile_container.error(`${response.error} `, ``);      
    }
  }

  datareceive(data) {
    // console.log(data);
    // this.props.dispatch(ProfileSendData(data));
    this.form = data;
  }

  render() {
      var bredcrumb = (
      <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li> 
            <Link to="admin/profile"><FormattedMessage id = 'my_profile'/></Link>
          </li>
          <li>/</li>
           <li>{this.props.loggedInData && this.props.loggedInData.data ? this.props.loggedInData.data.firstname : null}</li>
        </ul>
      </div>)
    if(this.props.loggedInData.data){

        this.name = this.props.loggedInData.data.firstname + ' ' + this.props.loggedInData.data.lastname;
        this.email = this.props.loggedInData.data.email;
        // console.log(strName);
    }

    let clsContainerRight = `${styles.containerRight} pull-right`;
    if(this.props.profileData.data){
        return (
          <div>
            <ToastContainer
              toastMessageFactory={ToastMessageFactory}
              ref="profile_container"
              className="toast-top-right"
            />
            <ContainerComponent data={this.schema}
              submenu={this.submenu}
              topmenu={this.mainmenu}
              bredCrumb={bredcrumb}
              dataFun = {this.datareceive}
              dataobject = {this.props.profileData.data}
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

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    profileData: profileData(state),
    intlData: intlData(state)
  };
}

ProfileEdit.propTypes = {
  loggedInData: PropTypes.object,
  profileData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ProfileEdit.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ProfileEdit);
