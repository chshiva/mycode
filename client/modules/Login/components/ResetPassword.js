import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { resetPassword, isRestPasswordTokenExpired, ClearLoginData} from '../LoginActions';
import { loggedInData } from '../LoginReducer';
import { browserHistory } from 'react-router';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';
import { hasWhiteSpace } from '../../Admin/Profile/pages/ChangePassword';

// Import Style
import styles from './LoginWidget.css';
import mainStyle from '../../../main.css';

import  {ToastContainer, ToastMessage} from '../../../lib';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);


export class ResetPassword extends Component{
	constructor(){
		super();
		this.valid = false;
		this.state = {
			password : '',
			confpassword : ''
		}
	}

	componentWillMount() {
		const token = this.props.params.token;
		isRestPasswordTokenExpired({token}).then(res => this.setLinkdata(res));
	}

	setLinkdata = (res) =>{
		//console.log(res)		
		if(res.status){
			this.valid = true;
			//alert(res.message)
	    	//this.refs.login_container.success(`${res.message} `, ``);
	    this.props.dispatch(ClearLoginData());
	    browserHistory.push('/resetPassword/'+this.props.params.token);
    }else{
	    this.props.dispatch(ClearLoginData());
	    if (res.error && res.error.length > 0) {
			this.valid = false;
			if(res.error != 'Password reset token invalid or expired') {
				this.refs.login_container.error(`${res.error} `, ``);	
			}	

	    }
    }
  }


	
	setPassword = () => {
		//console.log(this)
		var token = this.props.params.token;
		// console.log(token);
		// console.log(this.refs.password.value)
		let passwordValue = this.state.password;
		let confPasswordValue = this.state.confpassword;
		if (passwordValue == '') {
			this.refs.login_container.error('Please enter the password');
		}else if(passwordValue != confPasswordValue) {
			this.refs.login_container.error('Password and confirm password do not match');
		} else {
			let obj = {
				password: passwordValue,
				passwordtoken:token
			}
				resetPassword(obj).then(res => this.setdata(res));	
		}		
	}

	 setdata(res){
		//console.log(res)
	    if(res.status){	
	    	this.refs.login_container.success(`${res.message} `, ``);
	    	setTimeout(function(){ browserHistory.push('/')}, 1000);	    	       	
	    }else{
	      if(res.error && res.error.length > 0){
	        this.refs.login_container.error(`${res.error} `, ``);
	      }
	    }
	 }


	//Changes made by prateek for bug#3000
	handleInput = (label, e) => {
    let val = e.target.value;
    if(!hasWhiteSpace(val)) {      
      this.setState({[label] : val})
    } else {
      this.refs.login_container.error("Password can't have spaces");
    }
  }

	renderForm(){

		const btnPrimaryCls = `${mainStyle.btnPrimaryDark}`;
		const clsForgot = `${styles.actionLinks} ${styles.actionSeprate}`;
		const clsResetinnerDiv = `${styles.resetinnerDiv}`

		const inputGroupCls = `input-group ${mainStyle.inputGroup}`;
    	const inputFieldCls = `form-control ${mainStyle.inputField}`;
    	let cls_rememberMe = `${styles.rememberMe} clearfix`;
    	let cls_txtRememberMe = `${styles.txtRememberMe} pull-left`;
    	let cls_signupAction = `${styles.signupAction} clearfix`;
    	let cls_loginSwitch = `${styles.loginSwitch} pull-right`;
    	let cls_loginSlider =`${styles.loginSlider} ${styles.round}`;
    	let formLoad = ''
    	if(this.valid){
    		formLoad = (<div>
    								<span className={styles.resetHeadText} >
											<h2 className={styles.welcomeTxt}>
												<span><FormattedMessage id='reset_prompt' /></span>
											</h2>
										</span>
    									<input type="password" id="password" ref="password" className="form-control" 
				    					placeholder={this.props.intl.messages.password} tabIndex="1" maxLength={30} value={this.state.password} onChange={this.handleInput.bind(this, 'password')}/>
				    					<input type="password" id="password" ref="confpassword" className="form-control" value={this.state.confpassword}
				    					placeholder={this.props.intl.messages.confirm_password} tabIndex="2" maxLength={30} onChange={this.handleInput.bind(this, 'confpassword')}/>
				    					<button type="button" className={styles.btnSignin}  onClick={this.setPassword}  tabIndex="3">
	                  <FontAwesome name="fa-key" /> <FormattedMessage id='reset_prompt' /></button></div>)
    	}else{
    		formLoad = (<div><label className={styles.welcomeTxt}> 
    								<span className={styles.resetHeadText} >
											<h2 className={styles.welcomeTxt}>
												<span><FormattedMessage id='link_is_either_expired_or_broken' /></span>
											</h2>
										</span>
				    					<span className={styles.resetMsgText}><span>Kindly apply again to reset your password </span></span> </label>
				    					{/*<span className={styles.reestBtnSign}>
				    					<Link to="/">
				    					<span className={styles.fontSignin}><span className={styles.resetTextBtn}><FormattedMessage id = "sign_in"/></span></span></Link></span>*/}
                    </div>);
    	}
		return(
				<div className={clsResetinnerDiv}>
					<div className={styles.loingLogoBlock}>
						<img src="/images/logo/instavc-logo.png" />
					</div>
					<div className={styles.resetPageBlock} >
						<div className={styles.formSignin}>
							
							<label className="sr-only"></label>
						{formLoad}
	       				</div>
					</div>
				</div>	
			);
	}
	
	render(){
		const cls = `${styles.loginBox} ${styles.resetMainDiv}`; // ${mainStyle.bgPrimaryDark}
    		var objRenderForm = this.renderForm();

			return (
				<div className={cls}>
				<ToastContainer
	              toastMessageFactory={ToastMessageFactory}
	              ref="login_container"
	              className="toast-top-right"
	             />
					{objRenderForm}
				</div>
			);
	}
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
  	loggedInData: loggedInData(state),
  };
}

ResetPassword.propTypes = {
   	//setPassword: PropTypes.func.isRequired,
    data: PropTypes.object,
  	intl: intlShape.isRequired,
  	loggedInData: PropTypes.object,
  	dispatch: PropTypes.func.isRequired,
}


export default connect(mapStateToProps)(injectIntl(ResetPassword));

