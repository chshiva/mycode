import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

//Import Custom Components
// import FieldGroup from '../../../components/FieldGroup.js';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
import { ForgotPassword } from '../LoginActions';

// Import Style
import { Col } from 'react-bootstrap';
import styles from './LoginWidget.css';
import mainStyle from '../../../main.css';
import Loading from '../../App/components/Loading';

import  {ToastContainer, ToastMessage} from '../../../lib';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);


export class ForgotPasswordWidget extends Component{
	constructor(){
		super();
		this.state = {
			status : false
		}
	}

	handleruserEnterKey=(e)=>{	
		if(e.key === 'Enter'){
			e.preventDefault();
			this.UserForgotPassword();
		}
	}

  UserForgotPassword = () =>{
  	//alert(this.refs.username.value);
  	if (this.state.status == false) {
	  	this.setState({ status : true });
	  	ForgotPassword(this.refs.username.value.toLowerCase()).then(res => this.setPassworddata(res));
	  }
  	// this.props.callback(this.refs.username.value.toLowerCase());
  }

  setPassworddata = (res) => {
   // console.log(res)
   	this.setState({ status : false });
    if(res.status){
      this.refs.forgot_container.success(`${res.message} `, ``);
      // this.setLoginState();
    }else{
      if(res.error && res.error.length > 0){
        this.refs.forgot_container.error(`${res.error} `, ``);
        this.refs.username.focus();
      }
    }
  }

	
	render(){
		const cls = `${styles.loginBox}`; // ${mainStyle.bgPrimaryDark}
		const btnPrimaryCls = `${mainStyle.btnPrimaryDark}`;
		const clsForgot = `${styles.actionLinks} ${styles.actionSeprate}`;

		const inputGroupCls = `input-group ${mainStyle.inputGroup}`;
  	const inputFieldCls = `form-control ${mainStyle.inputField}`;
  	let cls_rememberMe = `${styles.rememberMe} clearfix`;
  	let cls_txtRememberMe = `${styles.txtRememberMe} pull-left`;
  	let cls_signupAction = `${styles.signupAction} clearfix`;
  	let cls_loginSwitch = `${styles.loginSwitch} pull-right`;
  	let cls_loginSlider =`${styles.loginSlider} ${styles.round}`;

		return (
			<div className={cls}>
				<ToastContainer
	        toastMessageFactory={ToastMessageFactory}
	        ref="forgot_container"
	        className="toast-top-right"
	       />
				<div>
					<div className={styles.loingLogoBlock}>
						<img src="/images/logo/instavc-logo.png" />
					</div>
					{this.state.status ?
						<Loading loadType="white" />
						:
						<div>
							<div>
								<form className={styles.formSignin}>
									<h2 className={styles.welcomeTxt}>
										<span className={styles.pleaseTxt}><FormattedMessage id='forgot_prompt' /></span>
									</h2>
									<label className="sr-only"></label>
		              <input autoFocus='true' type="text" id="username" ref="username" className="form-control" placeholder={this.props.intl.messages.email_address} onKeyPress={this.handleruserEnterKey} tabIndex="1" maxLength={50}/>
		            	<button type="button" className={styles.btnSignin} id="forgotPassword" onClick={this.UserForgotPassword}   tabIndex="2">
		              	<FontAwesome name="fa-key" /> <FormattedMessage id='forgot_password' />
		              </button>
		            </form>
		          </div>
		          <div className={styles.singBlockFoeget} >
		          	<span className={styles.singInFoeget} >
		          		<a id="signinLink" onClick={this.props.signInClick}><FontAwesome name="sign-in" />  <FormattedMessage id='sign_in' /></a>
		          	</span>
		          </div>
		        </div>
		      }
				</div>
			</div>
		);
	}
}

ForgotPasswordWidget.propTypes = {
    //forgotPassword: PropTypes.func.isRequired,
    data: PropTypes.object,
  	intl: intlShape.isRequired,
}


export default injectIntl(ForgotPasswordWidget);

/*<h2><FormattedMessage id="loginTitle" /></h2>
					<p>You already have an account? Great! Login here.</p>*/