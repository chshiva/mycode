import React, { PropTypes ,Component} from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { ProfileStore, getLogRequest, connectWithGoogle } from '../ProfileActions';
import AuthClient from '../../../../components/AuthController';
import { connect } from 'react-redux';
import { Roles } from '../../../../roles.js';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import oAuthClientIds from '../../../../settings';
import config from '../../../../../server/config';




import ReactDOM from 'react-dom';
import {Col, Row, Grid} from 'react-bootstrap';

import ViewImage from './ViewImage';
import styles from '../../Admin.css';
var _ = require('lodash');
import moment from 'moment';

export class ProfileView extends Component {
   constructor(props) {
     super(props);
  this.strName       = '';
  this.strEmail      = '';
  this.strAboutMe    = '';
  this.strPhone      = '';
  this.strGender     = '';
  this.strPosition   = '';
  this.strDepartment = '';
  this.srcUrl = '';
  this.userID = '';
  this.roles = '';
  this.viewImage = true;
  this.googleId = null;
  this.facebookId = null;
   }
  // componentWillMount() {
  //     this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '/admin/profile')).then(res => {
  //       this.userID = res.data._id
  //       this.setdata(res)

  //     });
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.userID = result.data._id;
      this.props.dispatch(ProfileStore(result.data));
      this.props.dispatch(getLogRequest(/*result.data._id*/))
    }
  }

  showResponse(response) {
		if(response.message) {
			this.refs.regis_container.success(`${response.message}`, ``);
      browserHistory.push('/admin/profile');
    } else if ( response.error == "This Account is  already connected to another account") {
      this.refs.regis_container.error("This Account is  already connected to another account");
		} else if(response.error){
      this.refs.regis_container.error("Cancelled Google Connect");
    }  
	}

  
  // responseFacebook = (response) => {
	// 	if (response.status=="unknown" || response.error) {
	// 		console.log(response.error)
	// 		this.refs.regis_container.error(`Error while Log In `, ``);
	// 	} else {
  //     var obj = {
  //       _id: this.props.loggedInData.data._id,
  //       email: this.props.loggedInData.data.email,
  //       facebookId: response.userID,
  //       facebookMail: response.email
  //     }
  //     connectWithGoogle(obj).then(res=>this.showResponse(res));		
	// 	}
		
		
	// }

	responseFailureGoogle = (response) => {
		this.showResponse(response);
  } 

  responseFailureFacebook = (error) => {
    this.refs.regis_container.error("Cancelled facebook Connect");
  }

  render () {
    let cls_emailTransCap = ` ${styles.emailTransCap} ${styles.inlineEdit} `
    let cls_loginBtnBoth1 = `${styles.btnBothfg1} ${styles.googleContainer1} `;
    let cls_loginBtnBoth2 = `${styles.btnBothfg2} ${styles.googleContainer2} `;
    let cls_nameheadProfile = `${styles.txtCenter} ${styles.nameheadProfile} `;    
    let cls_loginContainerBoth = `${styles.loginContainerBoth} ${styles.txtContainer} `;
    let cls_gmailIconConnect = `${styles.gIcong} ${styles.gmailIconConnect} `;
    let cls_seprator = `${styles.seprator} col-md-4 `;
    const inputManageIcon = `fa-facebook ${styles.inputGroupManage}`;    
    const fbIconDiconnect = `fa-facebook ${styles.diconnectFbIcon}`;
    const googleIconDiconnect = `fa fa-google ${styles.diconnectFbIcon}`;

    if(this.props.reqUserId) {
      this.viewImage = false;
    } 
    
    if(this.props.profileData){
      this.strName = this.props.profileData.firstname + ' ' + this.props.profileData.lastname;
      this.strEmail = this.props.profileData.email;
      /*need to convert into string value from roles object*/
      let roleObj = _.invert(Roles);
      let role = this.props.profileData.role;
      this.role = roleObj[role];
      if(role == Roles.Lmsadmin || role == Roles.CRMadmin || role == Roles.Presenteradmin) {
        this.role = roleObj[Roles.Admin];
      } else if (role == Roles.CRMuser) {
        this.role = roleObj[Roles.User];
      }
      if (this.props.profileData.googleId)  this.googleId = this.props.profileData.googleId;
      else this.googleId = null;
      if (this.props.profileData.gmail) this.gmail = this.props.profileData.gmail;
      else this.gmail = null;
      if (this.props.profileData.facebookId) this.facebookId = this.props.profileData.facebookId;
      else this.facebookId = null;
      if (this.props.profileData.facebookMail) this.facebookMail = this.props.profileData.facebookMail;
      else this.facebookMail = null;

      if(this.props.profileData.profile){
            this.strAboutMe  = this.props.profileData.profile.aboutme;
            this.strPhone    = this.props.profileData.profile.phone[1];
            this.strGender   = this.props.profileData.profile.gender;
            this.strPosition = this.props.profileData.profile.position;
            this.strDepartment = this.props.profileData.profile.dept;
      }
       
  }
  //Changed by Jyothi @where ever user dont mention any field it should display "-"
  // while creatig or editing profile
  this.clsContainerRight = `${styles.containerRight} pull-right`;
  let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    return (
    <div className={styles.midContainer}>
      <div className={styles.whiteCard}>
        <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="regis_container"
            className="toast-top-right"
          />
        <Grid fluid={true}>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={4}>
                    <div className={styles.formField}>
                     <ViewImage srcUrl ={this.props.src} userData = {this.userID} changeImage={this.props.changeImage} isUser={true} from="PROFILE"/>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className={styles.formField}>
                      <h2 className={cls_nameheadProfile}>{this.strName}</h2>
                      <p className={styles.txtCenter}>{this.strGender ? this.strGender : "-"}</p>
                      <p className={styles.txtCenter}>{this.strPosition}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='about_me' /></h2>
                  <div className={styles.txtContainer}>
                    <p >{this.strAboutMe ? this.strAboutMe : "-"}</p>
                  </div>
                </div>
              </Col>
            </Row>
            <div className={styles.rowBottom}>
              <Row>
                <Col className={cls_seprator} >
                  <div className={styles.formField}>
                    <h2><FormattedMessage id='personal_info' /></h2>
                    <div className={styles.txtContainer}>

                      <div className={cls_inlineEditGroup}>
                        <label htmlFor="fullName"><FormattedMessage id='full_name' />:</label>
                        <div className={styles.inlineEdit}>{this.strName}</div>
                      </div>

                      <div className={cls_inlineEditGroup}>
                        <label htmlFor="role"><FormattedMessage id='role' />:</label>
                        <div className={styles.inlineEdit}>{this.role}</div>
                      </div>

                      <div className={cls_inlineEditGroup}>
                        <label htmlFor="email"><FormattedMessage id='email' />:</label>
                        <div className={cls_emailTransCap}>{this.strEmail}</div>
                      </div>

                      <div className={cls_inlineEditGroup}>
                        <label htmlFor="phone"><FormattedMessage id='phone' />:</label><span></span>
                        <div className={styles.inlineEdit}>{this.strPhone ? this.strPhone : '-'}</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className={cls_seprator} >
                  <div className={styles.formField}>
                    <h2><FormattedMessage id='company_details' /></h2>
                    <div className={styles.txtContainer}>
                      <div className={cls_inlineEditGroup}>
                        <label htmlFor="position"><FormattedMessage id='position' />:</label>
                        <div className={styles.inlineEdit}>{this.strPosition ? this.strPosition : "-"}</div>
                      </div>
                      <div className={cls_inlineEditGroup}>
                        <label htmlFor="department"><FormattedMessage id='department' />:</label>
                        <div className={styles.inlineEdit}>{this.strDepartment ? this.strDepartment : "-"}</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  {(config.googleEnable || config.facebookEnable) && (!this.props.reqUserId) ? 
                  <div className={styles.formField}>
                    <h2><span><FormattedMessage id='connect_with_social_link'/></span></h2>
                    <div className={cls_loginContainerBoth} >
                    {(config.googleEnable) ?
                      <div className={cls_loginBtnBoth1} id="googleBtn">
                        {(!this.googleId) ?   
                            <GoogleLogin
                              clientId={oAuthClientIds.googleClientId}
                              onSuccess={this.props.responseGoogle}
                              onFailure={this.responseFailureGoogle}
                              > 
                              <span className={cls_gmailIconConnect}>
                                <FontAwesome className={styles.gmailIcon} name='google' />
                              </span>
                              <span className={styles.gTextg} >  Connect </span>  
                              </GoogleLogin>
                            :(this.googleId && this.gmail) ? <button id="googleDisonnectBtn" className={ styles.googleDisonnect} onClick={this.props.disconnectGoogle} > <FontAwesome className={googleIconDiconnect} name="google"/> <span>  Disconnect </span></button>
                         :null
                        }
                      </div>
                    : null }
                    {(config.facebookEnable) ?
                      <div className={cls_loginBtnBoth2} id="facebookBtn">
                        {(!this.facebookId && !this.props.reqUserId) ?
                            <FacebookLogin
                              appId={oAuthClientIds.facebookClientId}
                              icon={inputManageIcon}
                              size="small"  
                              scope="public_profile, email, user_birthday"
                              fields="name,email,picture,first_name,last_name,birthday"
                              textButton="Connect"
                              callback={this.props.responseFacebook}
                              class={styles.fbConnectProfile}
                              onFailure={this.responseFailureFacebook}  
                            />
                            : (this.facebookId && this.facebookMail) ?
                              <button id="facebookDisconnectBtn" className={styles.fbDisonnectProfile} onClick={this.props.disconnectFacebook} > <FontAwesome className={fbIconDiconnect} name=""/> <span>Disconnect</span> </button>
                              :null
                        }  
                      </div>
                    : null }
                    </div>
                  </div>
                  : null }  
                </Col>
              </Row>
            </div>
        </Grid>
      </div>

      {/*<div className={styles.whiteCard}>
        <Grid fluid={true}>
          <Row>
            <Col md={12}>
              <div className={styles.formField}>
                  <h2><FormattedMessage id='activities' /></h2>
                  <div className={styles.txtContainer}>
                    {
                      this.props.profileLogData && this.props.profileLogData.length > 0
                      ?
                      this.props.profileLogData.map((data) => {
                        //console.log("data", data._id);
                        var actionTime = moment(data.actionTime)
                        var timeDif =  Math.floor(Math.abs( (new Date() - actionTime)/60000 ) );
                        // console.log(timeDif);
                        var time;
                        if (timeDif < 1) {
                          time =  "just now";
                        } else if (timeDif < 60) {
                            if (timeDif == 1) {
                              time =  "about " + timeDif + " minute ago";
                            }
                          time =  "about " + timeDif + " minutes ago"; 
                        } else if ( (timeDif < 1440 ) && (timeDif >= 60) ) {
                            if (timeDif/60 == 1) {
                              time =  "about " + Math.floor(timeDif/60) + " hour ago";   
                            }
                          time =  "about " + Math.floor(timeDif/60) + " hours " + 
                           (timeDif - Math.floor(timeDif/60)*60) + " minutes ago";
                        } else if ( timeDif >= 1440) {
                            if (timeDif/1440 == 1) {
                              time =  "about " + Math.floor(timeDif/1440) + " day ago";   
                            }
                          time =  "about " + Math.floor(timeDif/1440) + " days ago"; 
                        }
                        return (
                          <ul key={data._id}>
                            { data.logType != "Room"
                              ?
                                <li>
                                <p>{data.logType}</p>
                                <span>{data.actionType} {data.details.name} {time}.</span>
                                </li>
                              : 
                                null
                            }
                          </ul>
                        );

                        })
                      : <ul> 
                        <li>
                          <span> None </span>
                        </li>
                      </ul>
                    }
                  </div>
                </div>
            </Col>
          </Row>
        </Grid>
      </div>*/}
    </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    /*UploadsData: UploadsData(state),*/
  };
}

ProfileView.contextTypes = {
  router: React.PropTypes.object,
};

ProfileView.propTypes = {
  loggedInData: PropTypes.object,
 /* UploadsData: PropTypes.object,*/
  dispatch: PropTypes.func.isRequired,
};

//export default ProfileView;
export default connect(mapStateToProps)(ProfileView);






