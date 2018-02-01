import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
// import { red, purple } from 'material-ui/colors';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SvgIcon from 'material-ui/SvgIcon';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import Hidden from 'material-ui/Hidden';
import { CircularProgress } from 'material-ui/Progress';
import { forgotPasswordError } from './actions';

export default class ForgotPassword extends Component {
 constructor (props) {
    super(props);
    this.state = {
      email: "",
      formErrorMessage: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.submitForgotPassword = this.submitForgotPassword.bind(this); 
  }


  handleEmailChange (e) {
    this.setState({email: e.target.value});
  }

  submitForgotPassword (e) {
    e.preventDefault();
    // this.props.messages.onError = "";
    
    var formErrorMessage = "";
    if (this.state.email == "") formErrorMessage = "Please Enter an Email";
    else {
      console.log("Looks like no Errors"); 
      this.props.submitForgotPassword(this.state);
    }

    this.setState({formErrorMessage: formErrorMessage});
  }

  componentWillReceiveProps(nextProps) {
    forgotPasswordError(null);
  }
  componentDidMount() {
    console.log("Unmount called!!!");
    forgotPasswordError(null);
  }

  render () {
    return (
      <div>
        {this.props.messages.isLoading && <div className="circularProgress"> <CircularProgress /> </div>}
        <AppBar position="fixed">
          <Toolbar>
            <Hidden mdUp>
              <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{ width: 32, height: 32, }} /></IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">Forgot Password</Typography>
          </Toolbar>
        </AppBar>
        <div className="signBlock">
          <div className="noAccess">
            <p>Rotate to portrait for better usage.</p>
          </div>
          <div className="loginPanel">
            <div className="loginFormPanel">

              <div className="brandingBlock">
                <h2 className="headlineRegular">Forgot Password </h2>
                <p className="pTxt">We just need your Registered Email address to send you password reset instructions.</p>
              </div>
              <div className="formBlock">
                {this.props.messages.onError && <div className="errorBox"> {this.props.messages.onError}</div>}
                {this.state.formErrorMessage && <div className="errorBox"> {this.state.formErrorMessage}</div>}

                <form method="post" onSubmit={this.submitForgotPassword}>
                  <TextField id="resetEmail" fullWidth type="email" name="email" label="Email" className="overwriteLabel" onChange={this.handleEmailChange}/>
                  <div className="btnDiv">
                    <Button id="sendRequestBtn" raised color="primary" className="button" type="submit">Send</Button>
                    <p>Go Back to <Link to={'/'} className="signTxt">Sign In</Link></p>
                  </div>
                </form>
              </div>
            </div>
            <div className="loginFooter">
              <p className="pTxt">New to NETIK <Link to={'/signup'} className="signTxt">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};