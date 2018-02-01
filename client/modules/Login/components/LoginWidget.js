import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'js-cookie';
import  {ToastContainer, ToastMessage} from '../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import config from '../../../../server/config';
//Import Custom Components
// import FieldGroup from '../../../components/FieldGroup.js';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup, Row, Col } from 'react-bootstrap';

// Import Style
import styles from './LoginWidget.css';
import mainStyle from '../../../main.css';
import oAuthClientIds from '../../../settings';
var Recaptcha = require('react-recaptcha');


export class LoginWidget extends Component{
	constructor(){
		super();
		this.state = {
			username : '',
			password : '',
			forgotPwdTemplate : false,
			isGoogle: false,
			notarobot: true
		}
	}

	loginUser = () => {
		const userName = this.state.username.toLowerCase();
		const password = this.state.password;
		if (this.state.notarobot){
			this.props.loginUser(userName, password, this.state.isGoogle);
		} else {
			this.refs.regis_container.error("Please select the captcha");
			console.log("please verify the captcha");
		}
	};
	
	handlerPasswordEnterKey=(e)=>{
		if(e.key === 'Enter'){
			this.loginUser();
		}
	}

	showResponse(response) {
		// console.log("Show Response", response);
		if(response.status) {
			this.refs.regis_container.success(`${response.message} `, ``);
			browserHistory.push('/');
		} else {
			if(response.error=='popup_closed_by_user') {
				this.refs.regis_container.error("Sign in cancelled");	
			}else {
				this.refs.regis_container.error(`${response.error} `, ``);	
			}			
		}
	}

	handlePasswordChange=(e)=>{
		this.setState({password : e.target.value});
	}

	handlerNameEnterKey=(e)=>{
		if(e.key === 'Enter'){
			{/* this.refs.password.focus(); */}
			this.loginUser();
		}
	}

	handleNameChange=(e)=>{
		this.setState({username : e.target.value});
	}
	/*handleForgotClick=(e)=>{
		this.state.forgotPwdTemplate = true;
		this.props.forgetClick(this.state.forgotPwdTemplate)
	}*/

	responseGoogle = (response) => {
		var profile = response.getBasicProfile();
		// let username = profile.getEmail();
		// let googleId = profile.getId();
		const userName =  profile.getEmail()
		const googleId = profile.getId();
		this.setState({isGoogle : true});
		this.props.loginUser(userName, googleId, this.state.isGoogle);	
	}

	responseFacebook = (response) => {
		if (response.status=="unknown" || response.error) {
			console.log(response.error)
			this.refs.regis_container.error(`Sign in cancelled `, ``);
		} else if (!response.email) {
			this.refs.regis_container.error(`Please Login with facebook email Id`, ``);
		} else  {
			const userName =  response.email
			const facebookId = response.userID;
			this.props.loginUser(userName, facebookId, this.state.isGoogle);	
		}
		
		
	}

	responseFailureGoogle = (response) => {
		this.showResponse(response);
	}

	callback = () => {
	  console.log('Done!!!!');
	  this.setState({ notarobot : false });
	}

	verifyCallback = (response) => {
	  console.log(response);
	  this.setState({ notarobot : true });
	}

	renderForm(){

		const btnPrimaryCls = `${mainStyle.btnPrimaryDark}`;
		const clsForgot = `${styles.actionLinks} ${styles.actionSeprate}`;

		const inputGroupCls = `input-group ${mainStyle.inputGroup}`;
		const inputGroupClshhh = `fa-facebook ${styles.inputGroupff}`;

    const inputFieldCls = `form-control ${mainStyle.inputField}`;
  	let cls_rememberMe = `${styles.rememberMe} clearfix`;
  	let cls_txtRememberMe = `${styles.txtRememberMe} pull-left`;
  	let cls_signupAction = `${styles.signupAction} clearfix`;
  	let cls_loginSwitch = `${styles.loginSwitch} pull-right`;
  	let cls_loginSlider =`${styles.loginSlider} ${styles.round}`;
  	let failcount = 0;
  	if(typeof(Storage) !== "undefined"){
  		failcount = Cookies.get("failcount");
  	}
		return(
				<div>
					<div className={styles.loingLogoBlock}>
						<img src="/images/logo/instavc-logo.png" />
					</div>
					<form className={styles.formSignin}>
						<div className="form-group">
							<Row className={styles.centerLoginSocial} >
								{(config.googleEnable) ?
								<Col className={styles.centerLoginSocial1}>
									<div className={styles.googleDiv}>
										<GoogleLogin
											clientId={oAuthClientIds.googleClientId}
											onSuccess={this.responseGoogle}
											onFailure={this.responseFailureGoogle}
											style={{
												width: "100%", display: "inlineBlock", "backgroundColor": "#dd4b39",
												border: "1px solid transparent", "fontSize": "16px",
												"fontFamily": "inherit", "paddingTop": "10px",
												"paddingBottom": "10px", "borderRadius": "2px", color: "rgba(255,255, 255, .7)"
											}}
										>
											<span className={styles.gIcong}>
												<FontAwesome className={styles.gmailIcon} name='google' />
											</span>
											<span className={styles.gTextg} >  Sign in </span>		
										</GoogleLogin>
									</div> 
								</Col>
							: null}
							{(config.facebookEnable) ?	
								<Col className={styles.centerLoginSocial2}>
									<div className={styles.googleDiv}>
										<span>
										<FacebookLogin
											appId = { oAuthClientIds.facebookClientId }
											autoLoad = { false }
											scope = "public_profile, email, user_birthday"
											fields = "name,email,picture,first_name,last_name,birthday"
											textButton=" Sign in "
											callback={this.responseFacebook} 
											cssClass = {styles.facebookButton}
											icon={inputGroupClshhh}
										/>
										</span>
									</div>
								</Col>
							: null}	
							</Row>
						</div>
						{config.googleEnable || config.facebookEnable ?
							<div className={styles.loginLine}></div>
						: null}
						<h2 className={styles.welcomeTxt}>
							<span className={styles.pleaseTxt}><FormattedMessage id='login_prompt'/></span>
						</h2>
						<label className="sr-only"></label>
                      	<input type="text" id="username" ref="username" className="form-control" placeholder={this.props.intl.messages.email_address} onKeyPress={this.handlerNameEnterKey} onChange={this.handleNameChange} value={this.state.username} tabIndex="1" autoFocus='true' />
                    	<label className="sr-only"></label>
                      	<input type="password" id="password" ref="password" className="form-control" placeholder={this.props.intl.messages.password} onKeyPress={this.handlerPasswordEnterKey} onChange={this.handlePasswordChange} value={this.state.password} tabIndex="2"/>
                      	{/*<div className="g-recaptcha" data-sitekey="6Lc8hC4UAAAAAJFrYqExB4FE4CIy8aloD-aLO1Iq"></div>
                      	<noscript>
												  <div>
												    <div style={{width: "302px", height: "422px", position: "relative"}}>
												      <div style={{width: "302px", height: "422px", position: "absolute"}}>
												        <iframe src="https://www.google.com/recaptcha/api/fallback?k=6Lc8hC4UAAAAAJFrYqExB4FE4CIy8aloD-aLO1Iq"
												                frameBorder="0" scrolling="no"
												                style={{width: "302px", height: "422px", borderStyle : "none"}}>
												        </iframe>
												      </div>
												    </div>
												    <div style={{width: "300px", height: "60px", borderStyle: "none",
												                   bottom: "12px", left: "25px", margin: "0px", padding: "0px", right: "25px",
												                   background: "#f9f9f9", border: "1px solid #c1c1c1", borderRadius: "3px"}}>
												      <textarea id="g-recaptcha-response" name="g-recaptcha-response"
												                   className="g-recaptcha-response"
												                   style={{width: "250px", height: "40px", border: "1px solid #c1c1c1",
												                          margin: "10px 25px", padding: "0px", resize: "none"}} >
												      </textarea>
												    </div>
												  </div>
												</noscript>*/}
												{config.isCaptcha && failcount >= Math.floor(config.failLimit/2) ?
													<Recaptcha
												    sitekey={config.captcha_sitekey}
												    render="explicit"
	    											onloadCallback={this.callback}
	    											verifyCallback={this.verifyCallback}
												  />
												: null}
                      	<button type="button" className={styles.btnSignin} id="signIn" onClick={this.loginUser}  tabIndex="3">
	                    	<FontAwesome name="sign-in" />  <FormattedMessage id='sign_in' />
	                    </button>


											
	                    <div className={cls_signupAction}>
	                    	<span className="pull-left">
	                    		<a  id="forgottenPassword" onClick={this.props.forgetClick}><FormattedMessage id = "forgotten_password"/></a>
	                       	</span>
	            {this.props.signUp ?         
								<span className="pull-right">
									<Link id="signUp" to="/registration"><FormattedMessage id = "sign_up"/></Link>
								</span>
							: null}
	                        	
                      	</div>
                      {/*	<div className={cls_rememberMe}>
                      		<span className={cls_txtRememberMe}><FormattedMessage id='keep_signed_in' /></span>
                      		<label className={cls_loginSwitch}>
                      			<input type="checkbox" defaultChecked="checked"/>
                      			<div className={cls_loginSlider}></div>
                      		</label>
                      	</div>*/}
                    </form>
				</div>
			);
	}
	
	render(){
		const cls = `${styles.loginBox}`; // ${mainStyle.bgPrimaryDark}
			return (
				<div className={cls}>
					<ToastContainer
							toastMessageFactory={ToastMessageFactory}
							ref="regis_container"
							className="toast-top-right"
						/>
					{this.props.data.isLoggingIn ?
						(<div className={styles.loggingWait}>
							<h2>Logging in...</h2>
							<p>Please wait.....!</p>
							<p><FontAwesome name="spinner" spin  size='5x'/></p>
						</div>
						)
						: this.renderForm()}
				</div>

			);
	}
}

LoginWidget.propTypes = {
    loginUser: PropTypes.func.isRequired,
    data: PropTypes.object,
  	intl: intlShape.isRequired,
}


export default injectIntl(LoginWidget);

/*<h2><FormattedMessage id="loginTitle" /></h2>
					<p>You already have an account? Great! Login here.</p>*/
// <Link to="/forgotpassword"><FormattedMessage id = "forgotten_password"/>.</Link>