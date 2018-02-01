import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import HourglassEmpty from 'material-ui-icons/HourglassEmpty';

export default class ConnectionTimeOut extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { handleSubmit, onSubmit, classes } = props;
        return (
            <div>
                {/*<AppBar position="fixed">
                            <Toolbar> 
                                <Hidden mdUp>
                                  <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{width: 32, height: 32,}} /></IconButton>
                                </Hidden>
                                <Typography type="title" color="inherit" className="appTytle">Forgot Password Request</Typography>
                            </Toolbar>
                        </AppBar>*/}
                <div className="signBlock">
                    <div className="noAccess">
                        <p>Rotate to portrait for better usage.</p>
                    </div>
                    <div className="loginPanel">
                        <div className="loginFormPanel">

                            <div className="brandingBlock">
                                <HourglassEmpty className={classes.largeIcon} />
                                <h2 className="headlineRegular">Connection timed out</h2>
                                <p className="pTxt">The current network envitonment is poor or has any error. Please check the current status of the network and retry again.</p>
                            </div>
                            <div className="formBlock">
                                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="btnDiv">
                                        <Button id="okBtn" raised color="primary" type="submit">Retry</Button>
                                        {/*<p>Go Back to <Link to={'/'} className="signTxt">Sign In</Link></p>*/}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



// Import custom components
const styles = {
    largeIcon: {
        width: 48,
        height: 48,
        padding: 24,
        border: '1px solid #009688',
        color: '#009688',
        borderRadius: '50%',
    }

};
// const ConnectionTimeOut = props => {
//     const { handleSubmit, onSubmit, classes } = props;
//     return (
//         <div>
//             {/*<AppBar position="fixed">
//                             <Toolbar> 
//                                 <Hidden mdUp>
//                                   <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{width: 32, height: 32,}} /></IconButton>
//                                 </Hidden>
//                                 <Typography type="title" color="inherit" className="appTytle">Forgot Password Request</Typography>
//                             </Toolbar>
//                         </AppBar>*/}
//             <div className="signBlock">
//                 <div className="noAccess">
//                     <p>Rotate to portrait for better usage.</p>
//                 </div>
//                 <div className="loginPanel">
//                     <div className="loginFormPanel">

//                         <div className="brandingBlock">
//                             <HourglassEmpty className={classes.largeIcon} />
//                             <h2 className="headlineRegular">Connection timed out</h2>
//                             <p className="pTxt">The current network envitonment is poor or has any error. Please check the current status of the network and retry again.</p>
//                         </div>
//                         <div className="formBlock">
//                             <form method="post" onSubmit={handleSubmit(onSubmit)}>
//                                 <div className="btnDiv">
//                                     <Button id="okBtn" raised color="primary" type="submit">Retry</Button>
//                                     {/*<p>Go Back to <Link to={'/'} className="signTxt">Sign In</Link></p>*/}
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// const validateLogin = values => {
//     const errors = {};

//     const requiredFields = [
//         'email',
//     ];
//     requiredFields.forEach(field => {
//         if (!values[field]) {
//             errors[field] = '(The ' + field + ' field is required.)';
//         }
//     });

//     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = '(Invalid email address.)';
//     }
//     return errors
// };


// export default reduxForm({
//     form: 'ConnectionTimeOut', // a unique identifier for this form
//     validate: validateLogin // ←Callback function for client-side validation
// })(withStyles(styles)(ConnectionTimeOut))