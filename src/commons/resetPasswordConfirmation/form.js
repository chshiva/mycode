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



export default class ResetPasswordConfirmationForm extends Component {

    constructor (props) {
        super(props);
        this.linkToLogin = this.linkToLogin.bind(this);
    }


    linkToLogin () {
        this.props.redirectToLogin();
    }


    render () {
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar> 
                        <Hidden mdUp>
                          <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{width: 32, height: 32,}} /></IconButton>
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
                                <h2 className="headlineRegular">Reset Password Done</h2>
                                <p className="pTxt">Your Password has been reset successfully. Please click the below button to Sign In</p>
                            </div>
                            <div className="formBlock">
                                <form>
                                    <div className="btnDiv">
                                        <Button id="resetpwdBtn" raised color="primary" className="button" onClick={this.linkToLogin}>Sign In</Button>
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
