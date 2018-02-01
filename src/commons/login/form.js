import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { red, purple } from 'material-ui/colors';


import { CircularProgress } from 'material-ui/Progress';
import { validateEmail } from '../validationmethods.js';


import CSS from './login.css';

// Import custom components
import PPLTextField from '../textfield';
const styles = {};


export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      formErrorMessage: ""
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  submitLoginForm(e) {
    e.preventDefault();
    this.props.messages.onError = "";

    var formErrorMessage = "";

    if (!validateEmail(this.state.username)) formErrorMessage = "Please Enter a Valid Email";
    else if (this.state.password == "") formErrorMessage = "Please Enter a Valid Password";
    else {
      console.log("Looks like no Errors");
      this.props.submitLoginForm(this.state);
    }

    this.setState({ formErrorMessage: formErrorMessage });
  }

  render() {
    return (
      <div className="signBlock">
        { /*Circular Spinner if client waits for server response */}
        {this.props.messages.isLoading && <div className="circularProgress"> <CircularProgress /> </div>}

        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>
        <div className="loginPanel">
          <div className="loginFormPanel">

            <div className="brandingBlock">
              <div className="logo">
                <img src="public/images/logo/netikLogo.png" alt="Logo" />
              </div>
            </div>

            <div className="formBlock">
              {this.props.messages.onError && <div className="errorBox"> {this.props.messages.onError}</div>}
              {this.state.formErrorMessage && <div className="errorBox"> {this.state.formErrorMessage}</div>}

              <form method="post" onSubmit={this.submitLoginForm}>
                <TextField id="loginEmail" type="text" name="email" label="Email" fullWidth className="overwriteLabel" onChange={this.handleChangeUsername} />
                <br />
                <TextField id="loginPassword" type="password" name="password" label="Password" fullWidth className="overwriteLabel" onChange={this.handleChangePassword} />
                <br />
                <div className="btnDiv">
                  <Button id="signinBtn" raised color="primary" className="button" type="submit">Sign In</Button>
                  <p><Link to={'/forgot-password'} className="bTxtinactive">Forgot password?</Link></p>
                </div>
              </form>
            </div>
          </div>
          <div className="loginFooter">
            <p className="pTxt">New to Quick Clinic? <Link to={'/doctor/signup'} className="signTxt">Sign Up as Doctor</Link> <Link to={'/patient/signup'} className="signTxt">Sign Up as Patient</Link></p>
          </div>
        </div>
      </div>
    )
  }
};
