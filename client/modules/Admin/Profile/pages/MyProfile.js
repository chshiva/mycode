import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn, ClearLogin, getProfileImage, connectWithGoogle, disConnectSocialMedia } from '../../../Login/LoginActions';

import { loggedInData } from '../../../Login/LoginReducer';
import { profileData } from '../ProfileReducer';
import { ClearProfile } from '../ProfileActions';
import ProfileView from '../components/ProfileView';
import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {profileViewSubMenu, profileViewMainMenu} from '../schema/ProfileEditMenu';

// Import Style
import styles from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
import Loading from '../../../App/components/Loading';
var _ = require('lodash');

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {loading : true}; 
  }  
  componentDidMount() {
    //this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/profile'));
    //console.log(this.props.profile.error, this.props.profile.success);
    this.setdata(this.props.loggedInData); 
  } 

  setdata = (result) => {
    if(result && result.data){
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server 

      if(_.isEmpty(this.props.loggedInData.data)) {
        this.setState({loading : true}); 
      } else {         
        this.setState({loading : false});
      }
      this.props.dispatch(getProfileImage({ uid: result.data._id })).then(res=>this.setLoading())
    }
  }

  setLoading() {
    //console.log("At set loading");
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loggedInData && (nextProps.loggedInData.success && nextProps.loggedInData.success != "")) {
      this.refs.my_profile_container.success(`${nextProps.loggedInData.success} `, ``);
      this.props.dispatch(ClearLogin());
    }
  }

  componentWillUnmount() {
    this.props.dispatch( ClearProfile());
  }

  responseGoogle = (response) => {
    var profile = response.getBasicProfile();
		// let username = profile.getEmail();
    // if (this.strEmail==username) {
      var obj = {
        // _id: this.props.loggedInData.data._id,
        // email: this.props.loggedInData.data.email,
        googleId: profile.getId(),
        gmail: profile.getEmail()
      };
      this.props.dispatch(connectWithGoogle(obj)).then(res =>this.showResponse(res));
  }

  responseFacebook = (response) => {
    console.log("response ===== ", response);
		if (response.status=="unknown" || response.error) {
			console.log(response.error)
      this.refs.my_profile_container.error(`Cancelled Facebook Link`, ``);
    } else  if (!response.email) {
        this.refs.my_profile_container.error(`Please connect with facebook email Id`, ``);        
      } else {
        var obj = {
          // _id: this.props.loggedInData.data._id,
          // email: this.props.loggedInData.data.email,
          facebookId: response.userID,
          facebookMail: response.email
        }
        this.props.dispatch(connectWithGoogle(obj)).then(res => this.showResponse(res));
      // connectWithGoogle(obj).then(res=>this.showResponse(res));		
      }

  }

  disconnectGoogle = () => {
    let disObj = {
      // _id: this.props.loggedInData.data._id,
      type:'Google'
    }
    this.props.dispatch(disConnectSocialMedia(disObj)).then(res => this.showResponse(res));
  }

  disconnectFacebook = () => {
    let disObj = {
      // _id: this.props.loggedInData.data._id,
      type: 'Facebook'
    }
    this.props.dispatch(disConnectSocialMedia(disObj)).then(res => this.showResponse(res));
  }

  showResponse(response) {
		if(response.message) {
      this.refs.my_profile_container.success(`${response.message}`, ``);
    } else if (response.error && response.error == "This Account is  already connected to another account") {
      this.refs.my_profile_container.error("This Account is  already connected to another account", "");
		} else if(response.error){
      this.refs.my_profile_container.error(`${response.error}`, ``);
    } else this.refs.my_profile_container.error("Cancelled Google Link", "");    
	}

  render() {
    
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let submenu = Validator.activeSubMenu(profileViewSubMenu, "lnkMyProfile");
    let loadType = 'list';
    return (
     
      <div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='my_account' /></h3>

            <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li><FormattedMessage id='you_are_in_my_profile_panel'/></li>
            </ul>
            </div>
          <TopMenu data={profileViewMainMenu} />
        </div>

        <div className={cls_isubmenu}>
          <SubMenu data={submenu} />
        </div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="my_profile_container"
          className="toast-top-right"
        />
        
        {/* Change By - Najib, Desc - Added loading to show it while component making reqquest to server */}
        { this.state.loading == true ?
        <div>
          <Loading />
        </div> :

        <div>
        <ProfileView profileData={this.props.loggedInData.data} responseGoogle={this.responseGoogle} responseFacebook={this.responseFacebook} disconnectGoogle={this.disconnectGoogle} disconnectFacebook={this.disconnectFacebook} profileLogData = {this.props.profileData.logData}  src={this.props.loggedInData.file} changeImage={true}/>
        </div> }
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dashboardData: null,
    loggedInData: loggedInData(state),
    profileData: profileData(state),
    intlData: intlData(state)
  };
}

MyProfile.propTypes = {
  dashboardData: PropTypes.object,
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  profileData: PropTypes.object,
  sayhello: PropTypes.func,
};

MyProfile.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(MyProfile);
