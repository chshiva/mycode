import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { red, purple } from 'material-ui/colors';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SvgIcon from 'material-ui/SvgIcon';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import Hidden from 'material-ui/Hidden';

import { CircularProgress } from 'material-ui/Progress';

export default class ResetPassword extends Component {
  constructor (props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: "",
      formErrorMessage: ""
    }

    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleConfirmNewPasswordChange = this.handleConfirmNewPasswordChange.bind(this);
    this.submitResetPassword = this.submitResetPassword.bind(this);
  }

  handleNewPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmNewPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  submitResetPassword (e) {
    e.preventDefault();
    this.props.messages.onError = "";
    
    var formErrorMessage = "";
    if (this.state.password == "") formErrorMessage = "Please Enter a Password";
    else if (this.state.password != this.state.confirmPassword) formErrorMessage = "Password and Retype Password Should be Same";
    else {
      console.log("Looks like no Errors"); 
      this.props.submitResetPassword(this.state);
    }

    this.setState({formErrorMessage: formErrorMessage});
  }

  render () {
    return (
      <div>
        {this.props.messages.isLoading && <div className="circularProgress"> <CircularProgress /> </div> }      
        <AppBar position="fixed">
          <Toolbar> 
            <Hidden mdUp>
              <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{width: 32, height: 32,}} /></IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">Reset Password</Typography>
          </Toolbar>
        </AppBar>
        <div className="signBlock">
          <div className="noAccess">
              <p>Rotate to portrait for better usage.</p>
          </div>
          <div className="loginPanel">
            <div className="loginFormPanel">
              <div className="brandingBlock"> 
                <h2 className="headlineRegular">Reset Password </h2>
                <p className="pTxt">Enter a New Password for your account.</p>
              </div>

              <div className="formBlock">

                { this.props.messages.onError &&  <div className="errorBox"> { this.props.messages.onError } </div> }
                { this.state.formErrorMessage &&  <div className="errorBox"> { this.state.formErrorMessage } </div> }

                <form method="post" onSubmit={this.submitResetPassword}>
                  <TextField id="newpwd" fullWidth type="password" name="newpwd" label="New Password" className="overwriteLabel" value={this.state.password} onChange={this.handleNewPasswordChange}/>
                  <TextField id="retypepwd" fullWidth type="password" name="retypepwd" label="Retype Password" className="overwriteLabel" value={this.state.confirmPassword} onChange={this.handleConfirmNewPasswordChange}/>
                  <div className="btnDiv">
                    <Button id="resetpwdBtn" raised color="primary" className="button" type="submit">Reset Password</Button>
                    <p>Go Back to <Link to={'/'} className="signTxt">Sign In</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}