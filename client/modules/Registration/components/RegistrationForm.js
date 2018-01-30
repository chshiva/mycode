import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import compStyles from '../../../components/component.css';
import callApi from '../../../util/apiCaller';
import DateTimeField from 'react-bootstrap-datetimepicker';
import { browserHistory } from 'react-router';
import moment from 'moment';
import isServer from 'detect-node';
import Promise from 'bluebird';
const Moment = !isServer ? Promise.promisifyAll(require('moment')) : null;
import  {ToastContainer, ToastMessage} from '../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import oAuthClientIds from '../../../settings';
import config from '../../../../server/config';

import Loading from '../../App/components/Loading';


import { saveStudentReq } from '../RegistrationActions';
//Import Custom Components
// import FieldGroup from '../../../components/FieldGroup.js';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup, Row, Col, Modal } from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { hasWhiteSpace } from '../../Admin/Profile/pages/ChangePassword';

// Import Style
import styles from './Registration.css';
import mainStyle from '../../../main.css';
var _ = require('lodash');

export class RegistrationForm extends Component {
	constructor(){
		super();
		this.state = {
			myCorporateData:'',
			noDataFound : '',
			corpId : '',
			firstname : '',
			lastname : '',
			password : '',
			email : '',
			confPassword : '',
			street : '',
			city : '',
			zip : '',
			country :'',			
			province : '',
			gender : '',
			DateOfBirth: moment().format('DD/MM/YYYY'),
			DateOfBirthFormat: "DD/MM/YYYY",
      DateOfBirthInputFormat: "DD/MM/YYYY",
      DateOfBirthMode: "date",
      checkBox : false,
      enabled : false,
      formEnabled : false,
      input : '',
      searchOption : true,
      showAgreementModal : false,
			validationError: {},
			loading : false
		}
		//this.handleCheckbox = this.handleCheckbox.bind(this);
	}

	handleFName(e) {
		let val = _.startCase(_.toLower(e.target.value));
		val = val.length != e.target.value.length ? e.target.value : val;
		this.setState({firstname:val});
	}

	handleLName(e) {
		let val = _.startCase(_.toLower(e.target.value));
		val = val.length != e.target.value.length ? e.target.value : val;
		this.setState({ lastname: val });
	}

	//Changes made by prateek for bug#3000
	handlePassword(e) {
		let val = e.target.value;
    if(!hasWhiteSpace(val)) {      
      this.setState({password:e.target.value});
    } else {
      let errorObj = this.state.validationError;
    	errorObj['passwordError'] = "Password can't have spaces";
    	this.setState({validationError:errorObj})
    }		
	}

	handleConfPassword(e) {
		let val = e.target.value;
    if(!hasWhiteSpace(val)) {      
      this.setState({confPassword:e.target.value});
    } else {
    	let errorObj = this.state.validationError;
    	errorObj['confirmPasswordError'] = "Password can't have spaces";
    	this.setState({validationError:errorObj})      
    }		
	}

	handleEmail(e) {
		this.setState({email:e.target.value});
	}

	handleStreet = (e) => {
		let val = _.startCase(_.toLower(e.target.value));
		val = val.length != e.target.value.length ? e.target.value : val;
		this.setState({street:val});
	}

	handleCity(e) {
		let val = _.startCase(_.toLower(e.target.value));
		val = val.length != e.target.value.length ? e.target.value : val;
		this.setState({city:val});
	}

	handleZip(e) {
		this.setState({zip:e.target.value.trim()});
	}

	handleCountry(e) {
		this.setState({country:this.refs.country.value});
	}

	handleState(e) {
		let val = _.startCase(_.toLower(e.target.value));
		val = val.length != e.target.value.length ? e.target.value : val;
		this.setState({province:val});
	}

	handleGender(e) {
		this.setState({gender:this.refs.gender.value});
	}	

	validateZip(value) {
    var re = /^[0-9]{6}$/;
    return re.test(value)
  }
	// Changed by jyothi for date borth validations.
	saveStudentData (e) {
		e.preventDefault();
		var obj = {};
		let errors = {};
		let currentDate = moment().format('DD/MM/YYYY');

		if (this.state.firstname.trim() == '' || this.validateAplhaWithSpace(this.state.firstname) == false || this.validateSpace(this.state.firstname) == true) {
			errors['nameError'] = <FormattedMessage id='Please_enter_a_valid_Name' />;
		} 
		if (this.state.email == '' || this.validateEmail(this.state.email) == false) {
			errors['emailError'] = <FormattedMessage id='Please_enter_valid_Email_id' />;
		} 
		if (this.state.password.trim() == '') {
			errors['passwordError'] = <FormattedMessage id='Please_enter_Password' />;
		} 
		if (this.state.confPassword.trim() == '') {
			errors['confirmPasswordError'] = <FormattedMessage id='Please_enter_Confirm_password' />;
		} 
		 if (this.state.password.trim() != this.state.confPassword.trim()) {
			 errors['confirmPasswordError'] = <FormattedMessage id='Passwords_are_not_matching' />;	
		} 
		 if (this.state.city.trim() == '' || this.validateAplhaWithSpace(this.state.city) == false) {
			 errors['cityError'] = <FormattedMessage id='Please_enter_valid_City_Name' />;
		} 
		 if (this.state.province.trim() == '' || this.validateAplhaWithSpace(this.state.province) == false) {
			 errors['stateError'] = <FormattedMessage id='Please_enter_valid_State_Name' />
		} 
		 if (this.state.zip !='' && this.validateZip(this.state.zip) == false) {
			 errors['zipError'] = <FormattedMessage id='Please_enter_a_valid_Zip' />;         
    }
		 if (this.state.DateOfBirth !='' && this.state.DateOfBirth > currentDate){
			 errors['dateError'] = <FormattedMessage id='Please_enter_valid_Date_of_birth' />; 
		} 

		 if (this.state.checkBox == false) {
			 errors['checkboxError'] = <FormattedMessage id='Please_accept_Term_conditions' />;
		 } 
		 if (!(_.isEmpty(errors))) {
			 this.setState({
				 validationError: errors
			 });

		 } else {
			 this.setState({
				 validationError: {}
			 })
			obj['profile.companyid'] = this.state.corpId;
			obj['firstname'] = this.state.firstname;
			obj['lastname'] = this.state.lastname;
			obj['email'] = this.state.email;
			obj['userPassword'] = this.state.password;
			obj['profile.contact.street'] = this.state.street;
			obj['profile.contact.city'] = this.state.city;
			obj['profile.contact.zip'] = this.state.zip;
			obj['profile.contact.country'] = this.state.country;
			obj['profile.contact.state'] = this.state.province;
			obj['profile.gender'] = this.state.gender;
			obj['dateofbirth'] = this.state.DateOfBirth;
			this.setState({ loading : true });
			saveStudentReq(obj).then(res=>this.showResponse(res));	
		}		
	}

	showResponse(response) {
		//console.log("Show Response", response);
		if(response.status) {
			this.refs.regis_container.success(`${response.message} `, ``);
			this.setState({ loading : false, formEnabled : false, searchOption : true, input :'', myCorporateData:'',	noDataFound : '',	corpId : '',firstname : '',	lastname : '', password : '',	email : '',	confPassword : '', street : '',	city : '', zip : '', country :'',	province : '', gender : '' });
			this.props.responseCallback(response.message);
			// setTimeout(function(){ browserHistory.push('/') }, 1000);			
		} else {
			this.refs.regis_container.error(`${response.error} `, ``);
			this.setState({ loading : false });
		}
	}

	validateSpace(value) {
    var re = /^[ ]*$/;
    return re.test(value);
  }

  validateAplhaWithSpace(value) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(value)
  }

  validateZip(value) {
    var re = /^[0-9]{6}$/;
    return re.test(value)
  }

  validateEmail(email) {
    var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    return re.test(email);
	}

	searchCorporate(e) { 
    this.setState({input : e.target.value, formEnabled : false});
    //console.log("input==", this.state.input);
    // var str = new String(this.state.input);
    let value = e.target.value.trim();
     //console.log("input==", value.length);
    if(value && value.length >= 2) {
    	this.setState({enabled : true, noDataFound : false});
    	let path = 'search-corporate/' + value;
    	callApi(path, 'get').then(res => this.corpList(res));	
    } else {
    	this.setState({enabled : false});
    }   
  }
   
  corpList(res) {  	
    //console.log("myCorporateData==", res);
    if(res.data && res.data.length == 0) {
      //console.log("myDatalength==", res.data.length);
      this.setState({
        noDataFound : true,
      })
    }    
    this.setState({myCorporateData: res.data});
  }

  handleSearchIcon(e) {
		var searchVal = this.state.input; 
		let errors = {};
		if (searchVal == '') {
			errors['instituteError'] = <FormattedMessage id='Please_enter_institute_name' />;
			this.setState({ validationError: errors });
		} else if (searchVal.length < 3) {
			errors['instituteError'] = <FormattedMessage id='Enter_at_least_three_letters_to_search' />;
			this.setState({ validationError: errors });
  	}
	}
  
  addedCorporate(data) {
  	//console.log("add corp", data);  	
  	this.setState({corpId:data._id, enabled : false, formEnabled : true, input:data.businessName, searchOption : false});
  }

  handleDateOfBirth (data) {
  	//console.log("data ==== ", data);
  	this.setState({DateOfBirth : data});
  }

  handleEnable =(e)=> {
    let isEnable = e.currentTarget.value == "true" ? false : true;
    this.setState({checkBox : isEnable});     
  }

  handleTermsnConditions() {
  	this.setState({showAgreementModal : true})
  }

  cancelIAgree() {
  	this.setState({showAgreementModal : false});	
  }

  handleIAgree() {
  	this.setState({showAgreementModal : false, checkBox : true});
  }

  hideAgreementModal(){
		this.setState({ showAgreementModal: false, validationError: {} });
  }

  handleCancel =(e) => {
  	browserHistory.push('/');
  }

	responseGoogle = (response) => {
		var profile = response.getBasicProfile();
		var obj = {};
		obj['name'] = profile.getName();
		obj['firstname'] = profile.ofa;
		obj['lastname'] = profile.wea;
		obj['email'] = profile.getEmail();
		obj['profile'] = {};
		obj['profileImage'] = profile.getImageUrl();
		obj['loginType'] = 'Google';
		obj['profile.companyid'] = this.state.corpId;
		obj['companyid'] = this.state.corpId;
		obj['googleId'] = profile.getId();
		saveStudentReq(obj).then(res=>this.showResponse(res));	
	}

	responseFacebook = (response) => {
		if (response.status=="unknown" || response.error) {
			console.log(response.error)
			this.refs.regis_container.error(`Error while Registration `, ``);
		} else if (!response.email) {
			this.refs.regis_container.error(`Please Register with facebook email Id`, ``);
		} else {
			var obj = {};
			obj['name'] = response.name;
			obj['firstname'] = response.first_name;
			obj['lastname'] = response.last_name;
			obj['email'] = response.email;
			obj['dateofbirth'] = response.birthday;
			obj['profileImage'] = response.picture.data.url;
			obj['loginType'] = 'Facebook';
			obj['facebookId'] = response.userID;
			obj['profile.companyid'] = this.state.corpId;
			obj['companyid'] = this.state.corpId;
			saveStudentReq(obj).then(res=>this.showResponse(res));
		}
		
		
	}

	responseFailureGoogle = (response) => {
			this.refs.regis_container.error(`Cancelled Google Link`, ``);
		
	} 

	handleForm() {
		this.setState({formEnabled : false, searchOption: true, input: '', validationError : {} })
	}

	
	renderForm(){		
		//console.log("loading", this.state.loading);
		const inputGroupClsddd = `fa-facebook ${styles.inputGroupgg}`;		
		const btnPrimaryCls = `${mainStyle.btnPrimaryDark}`;
		const clsForgot = `${styles.actionLinks} ${styles.actionSeprate}`;
		const inputGroupCls = `input-group ${mainStyle.inputGroup}`;
  	const inputFieldCls = `form-control ${mainStyle.inputField}`;
  	const inputSearchCls = `search-query form-control ${styles.regSearch}`;
  	const inputIconCls = `btn btn-primary ${styles.regSearchBtn}`;
  	let cls_rememberMe = `${styles.rememberMe} clearfix`;
  	let cls_txtRememberMe = `${styles.txtRememberMe} pull-left`;
  	let cls_signupAction = `${styles.signupAction} clearfix`;
  	let cls_loginSwitch = `${styles.loginSwitch} pull-right`;
  	let cls_loginSlider =`${styles.loginSlider} ${styles.round}`;
  	let cls_singUpBothWidth = `${styles.singUpBothWidth} `;
  	let cls_inputSearchRegBar = ` ${styles.inputSearchRegBar} input-group col-md-12 `
  	const {DateOfBirth, DateOfBirthFormat, DateOfBirthInputFormat, DateOfBirthMode} = this.state;

  	const showAgreementModal = this.state.showAgreementModal
    ?
    <Modal show={this.state.showAgreementModal} onHide={this.hideAgreementModal.bind(this)}>
    
      <Header closeButton>
        <Title className={compStyles.popHeadingAll} ><FormattedMessage id = 'terms_conditions'/></Title>
      </Header>
      <Body>
        <div className={styles.modelContainer}>
        	<div className={styles.modelWrapper}>
        		<p>By clicking on "I Agree", you promise not to share credentials and application with other without PeopleLink consent. Post approved licencing period, all services will be terminated with or without intimation. Application version may get updated without prior notification. </p>
        	</div>
        </div>
      </Body>
      <Footer>
  {/*Button Alignment Global App Standard added- By Keerthi*/}
        <div className={styles.blockSaveAssign} >
        	<button id="cancel" onClick={this.cancelIAgree.bind(this)}><FormattedMessage id = 'cancel'/></button>
        	<button id="iAgree" className={styles.btnSaveAssign} onClick={this.handleIAgree.bind(this)}><FormattedMessage id = 'i_agree'/></button>
          
        </div>
      </Footer>
    </Modal>
      : null;
		return(
			
			<div className={styles.registerWrapper}>

				<ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="regis_container"
          className="toast-top-right"
        />
			  <div className={styles.customsearch}>
			  	<div className={styles.regLogoBlock}>
						<img src="/images/logo/instavc-logo.png" />
					</div>
					{this.state.searchOption ?	
						<h2 className={styles.welcomeTxt}>
							<span className={styles.pleaseTxt}>
								{/*Chnages Made by prateek as per discussion with prudhvi 
								Date : 16/09/2017*/}
								{config.bussinessType == 'LMS'
								?
								<FormattedMessage id='student_reg_form' />
								:
								<FormattedMessage id='user_reg_form' />
								}
							</span>
							<span className={styles.signText}><FormattedMessage id='already_registered_user' /><a id="signinLink" href="#" onClick={this.handleCancel.bind(this)} className={styles.resFormLink}><FormattedMessage id='sign_in' /></a></span>
						</h2>
						:null}
					{this.state.searchOption ?	
			    <div className={cls_inputSearchRegBar} >
							<input type="text" id="instituteName" className={inputSearchCls} placeholder="Search Institute" value={this.state.input} placeholder={this.context.intl.messages.institute_name} style={this.state.validationError && this.state.validationError.instituteError ? { borderColor: "#ff0000" } : {}}
								 onChange={this.searchCorporate.bind(this)} maxLength={50} autoFocus='true' />
							<label id="instituteError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.instituteError ? this.state.validationError.instituteError : ''}</label>							
			      <span className="input-group-btn">
			        <button id="searchInstitute" className={inputIconCls} onClick = {this.handleSearchIcon.bind(this)} type="button">
			          <span className="glyphicon glyphicon-search"></span>
			        </button>
			      </span>
			    </div>
			    :null}
			  </div>
			  {this.state.enabled ?
					<div className={styles.searchUsersListBlock}>
					  <div className={styles.searchUsersListGroup}>
					    <Row>
					      <Col md={12}>
					        <div className={styles.corporateListGroup}>
					          <ul>
					            {this.state.myCorporateData && this.state.myCorporateData && this.state.myCorporateData.length > 0
					              ?
					                this.state.myCorporateData.map((corporateData) => {
					                  return (<li key={corporateData._id}>
					                    <a id="addCorporate" onClick={this.addedCorporate.bind(this,corporateData)} className="clearfix">
					                      <h4 className="pull-left">{corporateData.businessName}
					                      </h4>
					                      <div className={styles.userAction}>
				                          <span>
				                            <FontAwesome name="plus" />
				                          </span>
					                      </div>
					                    </a>
					                  </li>)
					                })
					              :null
					            }
					          </ul>
					        </div>
					        { this.state.noDataFound ?              
					          <div>
					            <div className={styles.noDataFound}>
					              <h2>
					                <FontAwesome name="frown-o" />
					              </h2>
					              <p><FormattedMessage id ="no_data_found"/></p>
					            </div>
					          </div>                
					        :null}
					      </Col>
					    </Row> 
					  </div>
					</div>
					:null}
				{this.state.formEnabled ?	
			  <div className={styles.formDisplay}>
			  {this.state.loading ?
					<Loading loadType="register" />
					:
					<div>
			    <div className="row">
			      <div className="col-md-12">
			        <h1 className={styles.regHeader}>Registration Form</h1>
			        <a id="backButton" onClick={this.handleForm.bind(this)} className={styles.backButton}><FontAwesome name="long-arrow-left"></FontAwesome></a>
			        
				      <div className="row">
				      	{/*<div className="col-md-3">
				      		<div className={styles.thirdParyBlock}>
				        		<p className={styles.regPTxt}>Please fill the form.</p>
				        	</div>
				      	</div>*/}
								{config.googleEnable || config.facebookEnable
									?
						      <div className="col-md-12">
						      	<div className={styles.thirdParyBlock}>
								      <div className={styles.googleContainer}>
						          	<div className={styles.googleWrapper}>
													{(config.googleEnable) ?
														<div id="googleBtn" className={cls_singUpBothWidth}>
															<GoogleLogin
																clientId="903647599859-u0mbhshajb3jetb6ef82ab60hdbe5h9h.apps.googleusercontent.com"
																onSuccess={this.responseGoogle}
																onFailure={this.responseFailureGoogle}
																style={{
																	"display": "inlineBlock",
																	"background": "rgb(209, 72, 54)",
																	color: "rgb(255, 255, 255)",
																	/* width: 190px; */
																	"paddingTop": "10px",
																	"paddingBottom": "10px",
																	"borderRadius": "2px",
																	"border": "1px",
																	"fontSize": "calc(.27548vw + 12.71074px)",
																	"fontWeight": "bold",
																	"fontFamily": "Roboto",
																	"padding": "calc(.34435vw + 8.38843px) calc(.34435vw + 13.38843px)",
																	"marginRight": "8px"
																}}
															>
																<span className={styles.gIconUp} >
																	<FontAwesome className={styles.gmailIcon} name='google' />
																</span>  
																<span className={styles.gTextUp} > Sign up </span>	
															</GoogleLogin>	
														</div>
													:null }
													{(config.facebookEnable) ?
														<div  id="facebookBtn" className={cls_singUpBothWidth}>
														<FacebookLogin
															appId={oAuthClientIds.facebookClientId}
															autoLoad={false}
															size = "medium"
															scope = "public_profile, email, user_birthday"
															fields="name,email,picture.width(100),first_name,last_name,birthday"
															icon={inputGroupClsddd}
															textButton = " Sign up" 
															cssClass = {styles.fbSignUpButton}
															callback={this.responseFacebook} 
														/>
														</div>
													:null }
												</div>
											</div>
										</div>
									</div>
					      	: null
					      }
								{config.googleEnable || config.facebookEnable
									?
									<div className="col-md-12">
					      		<div className={styles.registerLine}></div>
					      	</div>
					      	: null
					      }
				      	<div className="col-md-12">
				      			<p className={styles.registerPara}>Sign up with InstaVC</p>
				      	</div>
							</div>	
			      </div>
			    </div>
			    <div className="row">
			      <div className="col-md-12">
			        <div className={styles.registerBlock}>
			          <form>
			            <div className="col-sm-12">
			              <div className="row">
			                <div className="col-sm-6 form-group">
			                  <label>First Name <span className={styles.starMandatory}>*</span></label>
												<input id="fName" type="text" placeholder="Enter First Name Here.." ref="fname" className="form-control" style={this.state.validationError && this.state.validationError.nameError ? { borderColor: "#ff0000" } : {}}
												 value={this.state.firstname} onChange={this.handleFName.bind(this)} maxLength={30} autoFocus='true' />
												<label id="nameError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.nameError ? this.state.validationError.nameError : ''}</label>	
			                </div>
			                <div className="col-sm-6 form-group">
			                  <label>Last Name</label>
												<input id="lName" type="text" ref="lname" placeholder="Enter Last Name Here.." className="form-control" value={this.state.lastname} onChange={this.handleLName.bind(this)} maxLength={30}/>
			                </div>
			              </div>

			              <div className="form-group">
			                <label>Email <span className={styles.starMandatory}>*</span></label>
											<input id="email" type="text" ref="email" placeholder="Enter email" style={this.state.validationError && this.state.validationError.emailError ? { borderColor: "#ff0000" } : {}}
											 className="form-control" value={this.state.email} onChange={this.handleEmail.bind(this)} maxLength={50} />
											<label id="emailError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.emailError ? this.state.validationError.emailError : ''}</label>
	
			              </div>

			              <div className="row">
			                <div className="col-sm-6 form-group">
			                  <label>Password <span className={styles.starMandatory}>*</span></label>
												<input id="password" type="password" ref="password" placeholder="Enter password.." style={this.state.validationError && this.state.validationError.passwordError ? { borderColor: "#ff0000" } : {}}
													className="form-control" value={this.state.password} onChange={this.handlePassword.bind(this)} maxLength={30} />
												<label id="passwordError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.passwordError ? this.state.validationError.passwordError : ''}</label>
	
			                </div>
			                <div className="col-sm-6 form-group">
			                  <label>Confirm Password <span className={styles.starMandatory}>*</span></label>
												<input id="confPassword" type="password" ref="confPassword" style={this.state.validationError && this.state.validationError.confirmPasswordError ? { borderColor: "#ff0000" } : {}}
												 placeholder="Confirm password" className="form-control" value={this.state.confPassword} onChange={this.handleConfPassword.bind(this)} maxLength={30} />
												<label id="confirmPasswordError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.confirmPasswordError ? this.state.validationError.confirmPasswordError : ''}</label>
	
			                </div>
			              </div>

			              <div className="form-group">
			                <label>Street </label>
											<input id="address" type="text" placeholder="Enter Address Here.." className="form-control" ref="street" value={this.state.street} onChange={this.handleStreet.bind(this)} maxLength={20}/>
			              </div>

			              <div className="row">
			                <div className="col-sm-4 form-group">
			                  <label>City <span className={styles.starMandatory}>*</span></label>
												<input id="city" type="text" placeholder="Enter City Name Here.." className="form-control" ref="city" value={this.state.city} style={this.state.validationError && this.state.validationError.cityError ? { borderColor: "#ff0000" } : {}}
												 onChange={this.handleCity.bind(this)} maxLength={20} />
												<label id="cityError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.cityError ? this.state.validationError.cityError : ''}</label>
	
			                </div>  
			                <div className="col-sm-4 form-group">
			                  <label>State/Province <span className={styles.starMandatory}>*</span></label>
												<input id="state" type="text" placeholder="Enter State Name Here.." className="form-control" style={this.state.validationError && this.state.validationError.stateError ? { borderColor: "#ff0000" } : {}}
													ref="province" value={this.state.province} onChange={this.handleState.bind(this)} maxLength={20} />
												<label id="stateError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.stateError ? this.state.validationError.stateError : ''}</label>
	
			                </div>  
			                <div className="col-sm-4 form-group">
			                  <label>Zip/Pin</label>
												<input id="zip" type="text" placeholder="Enter Zip or Pin Code Here.." className="form-control" ref="zip" value={this.state.zip} onChange={this.handleZip.bind(this)} maxLength={10} />													
			                	<label id="zipError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.zipError ? this.state.validationError.zipError : ''}</label>
			                </div>    
			              </div>

			              <div className="form-group">
			                <label>Country </label>
			                <select id="" name="selectCountry" className="form-control" onChange={this.handleCountry.bind(this)} ref="country">
			                  <option value="">Select Country</option>
			                  <option value="Afghanistan">Afghanistan</option>
												<option value="Albania">Albania</option>
												<option value="Algeria">Algeria</option>
												<option value="American Samoa">American Samoa</option>
												<option value="Andorra">Andorra</option>
												<option value="Angola">Angola</option>
												<option value="Anguilla">Anguilla</option>
												<option value="Antartica">Antarctica</option>
												<option value="Antigua and Barbuda">Antigua and Barbuda</option>
												<option value="Argentina">Argentina</option>
												<option value="Armenia">Armenia</option>
												<option value="Aruba">Aruba</option>
												<option value="Australia">Australia</option>
												<option value="Austria">Austria</option>
												<option value="Azerbaijan">Azerbaijan</option>
												<option value="Bahamas">Bahamas</option>
												<option value="Bahrain">Bahrain</option>
												<option value="Bangladesh">Bangladesh</option>
												<option value="Barbados">Barbados</option>
												<option value="Belarus">Belarus</option>
												<option value="Belgium">Belgium</option>
												<option value="Belize">Belize</option>
												<option value="Benin">Benin</option>
												<option value="Bermuda">Bermuda</option>
												<option value="Bhutan">Bhutan</option>
												<option value="Bolivia">Bolivia</option>
												<option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
												<option value="Botswana">Botswana</option>
												<option value="Bouvet Island">Bouvet Island</option>
												<option value="Brazil">Brazil</option>
												<option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
												<option value="Brunei Darussalam">Brunei Darussalam</option>
												<option value="Bulgaria">Bulgaria</option>
												<option value="Burkina Faso">Burkina Faso</option>
												<option value="Burundi">Burundi</option>
												<option value="Cambodia">Cambodia</option>
												<option value="Cameroon">Cameroon</option>
												<option value="Canada">Canada</option>
												<option value="Cape Verde">Cape Verde</option>
												<option value="Cayman Islands">Cayman Islands</option>
												<option value="Central African Republic">Central African Republic</option>
												<option value="Chad">Chad</option>
												<option value="Chile">Chile</option>
												<option value="China">China</option>
												<option value="Christmas Island">Christmas Island</option>
												<option value="Cocos Islands">Cocos (Keeling) Islands</option>
												<option value="Colombia">Colombia</option>
												<option value="Comoros">Comoros</option>
												<option value="Congo">Congo</option>
												<option value="Congo">Congo, the Democratic Republic of the</option>
												<option value="Cook Islands">Cook Islands</option>
												<option value="Costa Rica">Costa Rica</option>
												<option value="Cota D'Ivoire">Cote dIvoire</option>
												<option value="Croatia">Croatia (Hrvatska)</option>
												<option value="Cuba">Cuba</option>
												<option value="Cyprus">Cyprus</option>
												<option value="Czech Republic">Czech Republic</option>
												<option value="Denmark">Denmark</option>
												<option value="Djibouti">Djibouti</option>
												<option value="Dominica">Dominica</option>
												<option value="Dominican Republic">Dominican Republic</option>
												<option value="East Timor">East Timor</option>
												<option value="Ecuador">Ecuador</option>
												<option value="Egypt">Egypt</option>
												<option value="El Salvador">El Salvador</option>
												<option value="Equatorial Guinea">Equatorial Guinea</option>
												<option value="Eritrea">Eritrea</option>
												<option value="Estonia">Estonia</option>
												<option value="Ethiopia">Ethiopia</option>
												<option value="Falkland Islands">Falkland Islands (Malvinas)</option>
												<option value="Faroe Islands">Faroe Islands</option>
												<option value="Fiji">Fiji</option>
												<option value="Finland">Finland</option>
												<option value="France">France</option>
												<option value="France Metropolitan">France, Metropolitan</option>
												<option value="French Guiana">French Guiana</option>
												<option value="French Polynesia">French Polynesia</option>
												<option value="French Southern Territories">French Southern Territories</option>
												<option value="Gabon">Gabon</option>
												<option value="Gambia">Gambia</option>
												<option value="Georgia">Georgia</option>
												<option value="Germany">Germany</option>
												<option value="Ghana">Ghana</option>
												<option value="Gibraltar">Gibraltar</option>
												<option value="Greece">Greece</option>
												<option value="Greenland">Greenland</option>
												<option value="Grenada">Grenada</option>
												<option value="Guadeloupe">Guadeloupe</option>
												<option value="Guam">Guam</option>
												<option value="Guatemala">Guatemala</option>
												<option value="Guinea">Guinea</option>
												<option value="Guinea-Bissau">Guinea-Bissau</option>
												<option value="Guyana">Guyana</option>
												<option value="Haiti">Haiti</option>
												<option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
												<option value="Holy See">Holy See (Vatican City State)</option>
												<option value="Honduras">Honduras</option>
												<option value="Hong Kong">Hong Kong</option>
												<option value="Hungary">Hungary</option>
												<option value="Iceland">Iceland</option>
												<option value="India">India</option>
												<option value="Indonesia">Indonesia</option>
												<option value="Iran">Iran (Islamic Republic of)</option>
												<option value="Iraq">Iraq</option>
												<option value="Ireland">Ireland</option>
												<option value="Israel">Israel</option>
												<option value="Italy">Italy</option>
												<option value="Jamaica">Jamaica</option>
												<option value="Japan">Japan</option>
												<option value="Jordan">Jordan</option>
												<option value="Kazakhstan">Kazakhstan</option>
												<option value="Kenya">Kenya</option>
												<option value="Kiribati">Kiribati</option>
												<option value="Democratic People's Republic of Korea">Korea, Democratic Peoples Republic of</option>
												<option value="Korea">Korea, Republic of</option>
												<option value="Kuwait">Kuwait</option>
												<option value="Kyrgyzstan">Kyrgyzstan</option>
												<option value="Lao">Lao Peoples Democratic Republic</option>
												<option value="Latvia">Latvia</option>
												<option value="Lebanon">Lebanon</option>
												<option value="Lesotho">Lesotho</option>
												<option value="Liberia">Liberia</option>
												<option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
												<option value="Liechtenstein">Liechtenstein</option>
												<option value="Lithuania">Lithuania</option>
												<option value="Luxembourg">Luxembourg</option>
												<option value="Macau">Macau</option>
												<option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
												<option value="Madagascar">Madagascar</option>
												<option value="Malawi">Malawi</option>
												<option value="Malaysia">Malaysia</option>
												<option value="Maldives">Maldives</option>
												<option value="Mali">Mali</option>
												<option value="Malta">Malta</option>
												<option value="Marshall Islands">Marshall Islands</option>
												<option value="Martinique">Martinique</option>
												<option value="Mauritania">Mauritania</option>
												<option value="Mauritius">Mauritius</option>
												<option value="Mayotte">Mayotte</option>
												<option value="Mexico">Mexico</option>
												<option value="Micronesia">Micronesia, Federated States of</option>
												<option value="Moldova">Moldova, Republic of</option>
												<option value="Monaco">Monaco</option>
												<option value="Mongolia">Mongolia</option>
												<option value="Montserrat">Montserrat</option>
												<option value="Morocco">Morocco</option>
												<option value="Mozambique">Mozambique</option>
												<option value="Myanmar">Myanmar</option>
												<option value="Namibia">Namibia</option>
												<option value="Nauru">Nauru</option>
												<option value="Nepal">Nepal</option>
												<option value="Netherlands">Netherlands</option>
												<option value="Netherlands Antilles">Netherlands Antilles</option>
												<option value="New Caledonia">New Caledonia</option>
												<option value="New Zealand">New Zealand</option>
												<option value="Nicaragua">Nicaragua</option>
												<option value="Niger">Niger</option>
												<option value="Nigeria">Nigeria</option>
												<option value="Niue">Niue</option>
												<option value="Norfolk Island">Norfolk Island</option>
												<option value="Northern Mariana Islands">Northern Mariana Islands</option>
												<option value="Norway">Norway</option>
												<option value="Oman">Oman</option>
												<option value="Pakistan">Pakistan</option>
												<option value="Palau">Palau</option>
												<option value="Panama">Panama</option>
												<option value="Papua New Guinea">Papua New Guinea</option>
												<option value="Paraguay">Paraguay</option>
												<option value="Peru">Peru</option>
												<option value="Philippines">Philippines</option>
												<option value="Pitcairn">Pitcairn</option>
												<option value="Poland">Poland</option>
												<option value="Portugal">Portugal</option>
												<option value="Puerto Rico">Puerto Rico</option>
												<option value="Qatar">Qatar</option>
												<option value="Reunion">Reunion</option>
												<option value="Romania">Romania</option>
												<option value="Russia">Russian Federation</option>
												<option value="Rwanda">Rwanda</option>
												<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
												<option value="Saint LUCIA">Saint LUCIA</option>
												<option value="Saint Vincent">Saint Vincent and the Grenadines</option>
												<option value="Samoa">Samoa</option>
												<option value="San Marino">San Marino</option>
												<option value="Sao Tome and Principe">Sao Tome and Principe</option> 
												<option value="Saudi Arabia">Saudi Arabia</option>
												<option value="Senegal">Senegal</option>
												<option value="Seychelles">Seychelles</option>
												<option value="Sierra">Sierra Leone</option>
												<option value="Singapore">Singapore</option>
												<option value="Slovakia">Slovakia (Slovak Republic)</option>
												<option value="Slovenia">Slovenia</option>
												<option value="Solomon Islands">Solomon Islands</option>
												<option value="Somalia">Somalia</option>
												<option value="South Africa">South Africa</option>
												<option value="South Georgia">South Georgia and the South Sandwich Islands</option>
												<option value="Span">Spain</option>
												<option value="SriLanka">Sri Lanka</option>
												<option value="St. Helena">St. Helena</option>
												<option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
												<option value="Sudan">Sudan</option>
												<option value="Suriname">Suriname</option>
												<option value="Svalbard">Svalbard and Jan Mayen Islands</option>
												<option value="Swaziland">Swaziland</option>
												<option value="Sweden">Sweden</option>
												<option value="Switzerland">Switzerland</option>
												<option value="Syria">Syrian Arab Republic</option>
												<option value="Taiwan">Taiwan, Province of China</option>
												<option value="Tajikistan">Tajikistan</option>
												<option value="Tanzania">Tanzania, United Republic of</option>
												<option value="Thailand">Thailand</option>
												<option value="Togo">Togo</option>
												<option value="Tokelau">Tokelau</option>
												<option value="Tonga">Tonga</option>
												<option value="Trinidad and Tobago">Trinidad and Tobago</option>
												<option value="Tunisia">Tunisia</option>
												<option value="Turkey">Turkey</option>
												<option value="Turkmenistan">Turkmenistan</option>
												<option value="Turks and Caicos">Turks and Caicos Islands</option>
												<option value="Tuvalu">Tuvalu</option>
												<option value="Uganda">Uganda</option>
												<option value="Ukraine">Ukraine</option>
												<option value="United Arab Emirates">United Arab Emirates</option>
												<option value="United Kingdom">United Kingdom</option>
												<option value="United States">United States</option>
												<option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
												<option value="Uruguay">Uruguay</option>
												<option value="Uzbekistan">Uzbekistan</option>
												<option value="Vanuatu">Vanuatu</option>
												<option value="Venezuela">Venezuela</option>
												<option value="Vietnam">Viet Nam</option>
												<option value="Virgin Islands (British)">Virgin Islands (British)</option>
												<option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
												<option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
												<option value="Western Sahara">Western Sahara</option>
												<option value="Yemen">Yemen</option>
												<option value="Yugoslavia">Yugoslavia</option>
												<option value="Zambia">Zambia</option>
												<option value="Zimbabwe">Zimbabwe</option>
			                </select>
			              </div>
		              	{/*Gender format changed to radio button from dropdown - By Keerthi*/}
			              <div className="row">
			                <div className="col-sm-6 form-group">
			                  <label>Gender : </label>
			                  <div className={styles.genderBlock} id="" ref= "gender" onChange={this.handleGender.bind(this)}>
					                <input id="genderMale" type="radio" name="gender" value="Male"/>
					                <span className={styles.genderText}><FormattedMessage id = 'male'/></span>
					                <input id="radioFemale" type="radio" className={styles.genderInput} name="gender" value="Female"/>
					                <span className={styles.genderText}><FormattedMessage id = 'female'/></span>
				                </div>
			                </div>  
			                <div id="dob" className="col-sm-6 form-group">
			                  <label>DOB <span className={styles.starMandatory}>*</span></label>
			                  <DateTimeField                
												dateTime={DateOfBirth}
												format={DateOfBirthFormat}
												inputFormat={DateOfBirthInputFormat}
												onChange={this.handleDateOfBirth.bind(this)}
												mode={DateOfBirthMode}
												maxDate={moment().subtract(1, "days")} 
											/>
											<label id="dobError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.dateError ? this.state.validationError.dateError : ''}</label>	
													
			                </div>  
			              </div>
			              <div className="row">
			                <div className="col-xs-12">
			                  <div className={styles.checkbox}>
			                      <label>
			                      	<span className={styles.DisclaimerCheck}>
																<input id="checkbox" type="checkbox" ref="checkBox" id="" value="Disclaimer & Read Terms of User" value={this.state.checkBox} style={this.state.validationError && this.state.validationError.checkboxError ? { borderColor: "#ff0000" } : {}}
																	 onChange={this.handleEnable} checked={this.state.checkBox} />
																<label id="checkboxError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.checkboxError ? this.state.validationError.checkboxError : ''}</label>

			                        </span>
			                        <span className={styles.DisclaimerText}> I agree with the </span>
			                        <span>
			                        	<a id="termsAndConditions" href="#" onClick={this.handleTermsnConditions.bind(this)} className={styles.resFormLink}>Terms & Conditions</a>
			                      	</span>
			                      </label>
			                    </div>
			                    {showAgreementModal}
			                </div>
			              </div>

			              <div className="row">
			                <div className="col-sm-12">
			                  <div className={styles.bottomAction}>
			                    <button id="saveSubmit" type="button" className= {styles.regBtn} onClick={this.saveStudentData.bind(this)}>Register</button>
			                    <span className={styles.signInButton}><span>Already have an account</span><a id="cancel" href="#" className={styles.linkTxt} onClick={this.handleCancel.bind(this)}>Sign in</a></span>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </form>			          
			          
			        </div>
			      </div>
			    </div>
			  </div>}
			  </div> 
			  :null }
			</div>
		);		
	}	
	
	render(){
		const cls = `${styles.RegBox}`; // ${mainStyle.bgPrimaryDark}
		var objRenderForm = this.renderForm();
	  
		return (
			<div className={cls}>
				{objRenderForm}
			</div>
		);
	}		
}

RegistrationForm.propTypes = {
  intl: intlShape.isRequired,
}

RegistrationForm.contextTypes= {
  intl: React.PropTypes.object.isRequired,
};

export default injectIntl(RegistrationForm);

