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

// Import custom components
const styles = {};


export default class OTPConfirmation extends Component {
    constructor () {
        super();
        this.moveToLogin = this.moveToLogin.bind(this);
    }

    moveToLogin (e) {
      e.preventDefault();
      this.props.goToLogin();
    }


    render () {
        return (

            <div>
                <AppBar position="fixed">
                    <Toolbar> 
                    <Hidden mdUp>
                      <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{width: 32, height: 32,}} /></IconButton>
                    </Hidden>
                    <Typography type="title" color="inherit" className="appTytle">Sign Up Confirmation</Typography>
                </Toolbar>
                </AppBar>
                <div className="signBlock">
                    <div className="noAccess">
                        <p>Rotate to portrait for better usage.</p>
                    </div>
                    <div className="loginPanel">
                        <div className="loginFormPanel">

                            <div className="brandingBlock"> 
                                <h2 className="headlineRegular">Registration Successful</h2>
                                <p className="pTxt">Congratulations! Your One-Time PIN has successfully been verified. <br />Your new account, <strong>{this.props.messages.onVerifyOTPSuccess && this.props.messages.onVerifyOTPSuccess.email}</strong>. is now active and you can now use it to Sign In to NETIK</p>
                            </div>
                            <div className="formBlock">
                                <form method="post">
                                    <div className="btnDiv">
                                        <Button id="signupBtn" raised color="primary" className="button" type="submit" onClick={this.moveToLogin}>Login</Button>
                                        {/*<p>Go Back to <Link to={'/'} className="signTxt">Sign In</Link></p>*/}
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
