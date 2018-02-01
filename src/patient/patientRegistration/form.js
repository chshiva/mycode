import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form'
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { red, purple } from 'material-ui/colors';
import Checkbox from 'material-ui/Checkbox';

import { CircularProgress } from 'material-ui/Progress';

import { validateEmail ,validateMobile} from '../../commons/validationmethods.js';
// Import custom components
import PPLTextField from '../../commons/textfield';
const styles = {
    
};



export default class RegistrationForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: "",
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      isTCAgree: false,
      formErrorMessage: ""
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMobileNumberChange = this.handleMobileNumberChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleIAgree = this.handleIAgree.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleMobileNumberChange (e) {
    this.setState({mobileNumber: e.target.value});
  }

  handleEmailChange (e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange (e) {
    this.setState({password: e.target.value});
  }

  handleConfirmPasswordChange (e) {
    this.setState({confirmPassword: e.target.value});
  }

  handleIAgree (e) {
    this.setState({isTCAgree: e.target.checked});
  }  

  submitRegistration (e) {
    e.preventDefault();
    this.props.messages.onError = "";



    var formErrorMessage = "";
    if (this.state.name == "") formErrorMessage = "Please Enter a Valid Name";
    else if (!validateMobile(this.state.mobileNumber)) formErrorMessage = "Please Enter a Valid Phone Number";
    else if (!validateEmail(this.state.email)) formErrorMessage = "Please Enter a Valid Email Id";
    else if (this.state.password == "") formErrorMessage = "Please Enter a Valid Password";
    else if (this.state.password != this.state.confirmPassword) formErrorMessage = "Password and Confirm Password Should be Same";
    else if (!this.state.isTCAgree) formErrorMessage = "Please Accept the Terms & Conditions";
    else {
      console.log("Looks like no Errors"); 
      this.props.submitRegistration(this.state);
    }

    this.setState({formErrorMessage: formErrorMessage});
  }

  render () {
    return (
      <div className="signBlock">
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>

        <div className="loginPanel">
          <div className="loginFormPanel">
            <div className="brandingBlock">
              <div className="logo">
                <img src="/public/images/logo/netikLogo.png" alt="Logo" />
              </div>
            </div>
            <div className="formBlock">
              {this.props.messages.onError && <div className="errorBox"> {this.props.messages.onError}</div>}
              {this.state.formErrorMessage && <div className="errorBox"> {this.state.formErrorMessage}</div>}
              {this.props.messages.isLoading && <div className="circularProgress"> <CircularProgress /> </div>}

              <form method="post" onSubmit={this.submitRegistration}>
                <TextField id="signupUserName" value={this.state.name} type="text" name="name" label="Name" fullWidth className="overwriteLabel" onChange={this.handleNameChange} />
                <TextField id="signupPhone" value={this.state.mobileNumber} type="text" name="phone number" label="Phone Number" fullWidth className="overwriteLabel" onChange={this.handleMobileNumberChange} />
                <TextField id="signupEmail" value={this.state.email} type="text" name="email" label="Email" fullWidth className="overwriteLabel" onChange={this.handleEmailChange} />
                <TextField id="signupPassword" value={this.state.password} type="password" name="password" label="Password" fullWidth className="overwriteLabel" onChange={this.handlePasswordChange} />
                <TextField id="signupPswdReconf" value={this.state.confirmPassword} type="password" name="confirm password" label="Confirm Password" fullWidth className="overwriteLabel" onChange={this.handleConfirmPasswordChange} />
                <div className="checkTerms">
                  <Checkbox checked={this.state.isTCAgree} onChange={this.handleIAgree} />
                  <p>I agree to the <Link to={'/terms-conditions'} className="termsTxt" >Terms &amp; Conditions </Link></p>
                </div>
                <div className="btnDiv">
                  <Button id="signupBtn" raised color="primary" className="button" type="submit">Sign Up</Button>
                </div>
              </form>
            </div>
          </div>

          <div className="loginFooter">
            <p className="pTxt">Already have an account? <Link to={'/'} className="signTxt">Sign In</Link></p>
          </div>
        </div>
      </div>
    )
  }
};