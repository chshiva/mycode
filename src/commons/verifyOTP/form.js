import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SvgIcon from 'material-ui/SvgIcon';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import Hidden from 'material-ui/Hidden';
import { CircularProgress } from 'material-ui/Progress';
import css from './otp.css';


export default class OtpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otpOne: "",
      otpTwo: "",
      otpThree: "",
      otpFour: "",
      otpFive: "",
      otpSix: "",
      formErrorMessage: ""
    }

    this.handleOTPOneChange = this.handleOTPOneChange.bind(this);
    this.handleOTPTwoChange = this.handleOTPTwoChange.bind(this);
    this.handleOTPThreeChange = this.handleOTPThreeChange.bind(this);
    this.handleOTPFourChange = this.handleOTPFourChange.bind(this);
    this.handleOTPFiveChange = this.handleOTPFiveChange.bind(this);
    this.handleOTPSixChange = this.handleOTPSixChange.bind(this);
    this.submitOTP = this.submitOTP.bind(this);
    this.handleResendOtp = this.handleResendOtp.bind(this);
  }

  handleOTPOneChange(e) {
    if (!isNaN(parseInt(e.target.value)) && e.target.value.length == 1) {
      this.setState({ otpOne: e.target.value });
      document.getElementById('otpTwo').focus();
    }else{
      e.target.value = '';
    }
  }

  handleOTPTwoChange(e) {
    if (!isNaN(parseInt(e.target.value)) && e.target.value.length == 1) {
      this.setState({ otpTwo: e.target.value });
      document.getElementById('otpThree').focus();
    }else{
      e.target.value = '';
    }
  }

  handleOTPThreeChange(e) {
    if (!isNaN(parseInt(e.target.value)) && e.target.value.length == 1) {
      this.setState({ otpThree: e.target.value });
      document.getElementById('otpFour').focus();
    }else{
      e.target.value = '';
    }
  }

  handleOTPFourChange(e) {
    if (!isNaN(parseInt(e.target.value)) && e.target.value.length == 1) {
      this.setState({ otpFour: e.target.value });
      document.getElementById('otpFive').focus();
    }else{
      e.target.value = '';
    }
  }

  handleOTPFiveChange(e) {
    if (!isNaN(parseInt(e.target.value)) && e.target.value.length == 1) {
      this.setState({ otpFive: e.target.value });
      document.getElementById('otpSix').focus();
    }else{
      e.target.value = '';
    }
  }

  handleOTPSixChange(e) {
    if (!isNaN(parseInt(e.target.value)) && e.target.value.length == 1) {
      this.setState({ otpSix: e.target.value });
    }else{
      e.target.value = '';
    }    
  }

  submitOTP(e) {
    e.preventDefault();
    console.log("submitOTP form");
    this.props.messages.verifyOTPErrorData = "";

    var formErrorMessage = "";
    console.log("2");
    if (this.state.otpOne == "" || this.state.otpTwo == "" || this.state.otpThree == "" || this.state.otpFour == "" || this.state.otpFive == "" || this.state.otpSix == "") formErrorMessage = "Please Fill the OTP Form";
    else {
      console.log("3");
      console.log("Looks like no Errors");
      this.props.vefityOTP(this.state);
    }

    this.setState({ formErrorMessage: formErrorMessage });
    console.log("formErrorMessage ", formErrorMessage);

  }

  handleResendOtp(e) {
    e.preventDefault();
    console.log("resend Handler ", this.props.userId);
    this.props.requestForOTP(this.props.userId);
    // this.props.vefityOTP(this.state);
  }

  render() {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Hidden mdUp>
              <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{ width: 32, height: 32, }} /></IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">OTP Verification</Typography>
          </Toolbar>
        </AppBar>

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

              <div className="infoTxtBlock">
                <h2 className="headlineRegular">Verify Mobile Number</h2>
                <p className="pTxt">OTP has been sent to your mobile number, please enter it below</p>
              </div>


              {this.props.messages.isRequestForOTPLoading && <div className="circularProgress"> <CircularProgress /> </div>}

              {this.props.messages.isVerifyOTPLoading && <div className="circularProgress"> <CircularProgress /> </div>}

              <div className="formBlock">
                {this.props.messages.verifyOTPErrorData && <div className="errorBox">  {this.props.messages.verifyOTPErrorData} </div>}

                {this.props.messages.requestOTPErrorData && <div className="errorBox">  {this.props.messages.requestOTPErrorData} </div>}

                {this.state.formErrorMessage && <div className="errorBox">  {this.state.formErrorMessage} </div>}


                <div className="otpBlock">
                  <div className="otpItem">
                    <TextField id="otpOne" type="text" name="otpone" className="overwriteLabel" onChange={this.handleOTPOneChange} maxLength="1" />
                  </div>
                  <div className="otpItem"><TextField id="otpTwo" type="text" name="otpTwo" className="overwriteLabel" onChange={this.handleOTPTwoChange} /></div>

                  <div className="otpItem"><TextField id="otpThree" type="text" name="otpThree" className="overwriteLabel" onChange={this.handleOTPThreeChange} /></div>
                  <div className="otpItem"><TextField id="otpFour" type="text" name="optone" className="overwriteLabel" onChange={this.handleOTPFourChange} /></div>
                  <div className="otpItem"><TextField id="otpFive" type="text" name="optone" className="overwriteLabel" onChange={this.handleOTPFiveChange} /></div>
                  <div className="otpItem"><TextField id="otpSix" type="text" name="optone" className="overwriteLabel" onChange={this.handleOTPSixChange} /></div>
                </div>

                <div className="resendTxtBlock">
                  <p className="pTxt">Don't received OTP? <Button id="resendOtp" color="primary" type="submit" onClick={this.handleResendOtp}>Resend Code</Button> </p>
                </div>

                <div className="btnDiv">
                  <Button id="" raised color="primary" type="submit" onClick={this.submitOTP}>Submit</Button>
                </div>

              </div>
            </div>
            <div className="loginFooter">
              {/*<Button id="optBtn" raised color="primary" type="submit">Submit</Button>*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}