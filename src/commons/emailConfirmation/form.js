import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from 'material-ui/styles';
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

export default class EmailConfirmation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { handleSubmit, onSubmit, classes } = props;
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar>
                        <Hidden mdUp>
                            <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{ width: 32, height: 32, }} /></IconButton>
                        </Hidden>
                        <Typography type="title" color="inherit" className="appTytle">Email Confirmation</Typography>
                    </Toolbar>
                </AppBar>
                <div className="signBlock">
                    <div className="noAccess">
                        <p>Rotate to portrait for better usage.</p>
                    </div>
                    <div className="loginPanel">
                        <div className="loginFormPanel">

                            <div className="brandingBlock">
                                <h2 className="headlineRegular">Email address verified</h2>
                                <p className="pTxt">Thank you for creating an account with us.<br />Your Email <strong>johnw@gmail.com</strong> has been confirmed and your account is now verified successfully.</p>
                            </div>
                            <div className="formBlock">
                                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="btnDiv">
                                        {/*<Button id="signupConfirmed" raised color="primary" className="button" type="submit">OK</Button>*/}
                                        <p className="pTxt">Already have an account?<Link to={'/'} className="signTxt">Sign In</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

// Import custom components
const styles = {};

// const EmailConfirmation = props => {
//     const {handleSubmit, onSubmit, classes} = props;
//     return (
//         <div>
//             <AppBar position="fixed">
//                 <Toolbar> 
//                     <Hidden mdUp>
//                       <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{width: 32, height: 32,}} /></IconButton>
//                     </Hidden>
//                     <Typography type="title" color="inherit" className="appTytle">Email Confirmation</Typography>
//                 </Toolbar>
//             </AppBar>
//             <div className="signBlock">
//                 <div className="noAccess">
//                     <p>Rotate to portrait for better usage.</p>
//                 </div>
//                 <div className="loginPanel">
//                     <div className="loginFormPanel">

//                         <div className="brandingBlock"> 
//                             <h2 className="headlineRegular">Email address verified</h2>
//                             <p className="pTxt">Thank you for creating an account with us.<br />Your Email <strong>johnw@gmail.com</strong> has been confirmed and your account is now verified successfully.</p>
//                         </div>
//                         <div className="formBlock">
//                             <form method="post" onSubmit={handleSubmit(onSubmit)}>
//                                 <div className="btnDiv">
//                                     {/*<Button id="signupConfirmed" raised color="primary" className="button" type="submit">OK</Button>*/}
//                                     <p className="pTxt">Already have an account?<Link to={'/'} className="signTxt">Sign In</Link></p>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };


const validateLogin = values => {
    const errors = {};

    const requiredFields = [
        'email',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '(The ' + field + ' field is required.)';
        }
    });

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '(Invalid email address.)';
    }
    return errors
};

export default reduxForm({
    form: 'EmailConfirmation', // a unique identifier for this form
    validate: validateLogin // ←Callback function for client-side validation
})(withStyles(styles)(EmailConfirmation))