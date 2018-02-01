import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { red, purple } from 'material-ui/colors';
import Checkbox from 'material-ui/Checkbox';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SvgIcon from 'material-ui/SvgIcon';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import Hidden from 'material-ui/Hidden';
import { CircularProgress } from 'material-ui/Progress';

// Import custom components
const styles = {};

export default class ConsentPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      formErrorMessage: ""
    };

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleConsentAgree = this.handleConsentAgree.bind(this);
    this.handleConsentDisAgree = this.handleConsentDisAgree.bind(this);
  }


  handleChangeFirstName (e) {
    this.setState({firstName: e.target.value});
  }

  handleChangeLastName (e) {
    this.setState({lastName: e.target.value});
  }

  handleConsentAgree (e) {
    e.preventDefault();

    var formErrorMessage = "";
    if (this.state.firstName == "") formErrorMessage = "Please Enter First Name";
    else if (this.state.lastName == "")  formErrorMessage = "Please Enter Last Name";
    else {
      // Call Agree Consent Page.
      this.props.submitConsentForm(this.state);
      console.log("Click on handle Consent Agree");      
    }

    this.setState({formErrorMessage: formErrorMessage});

    console.log("handleConsentAgree ", this.state);

  }

  handleConsentDisAgree (e) {
    e.preventDefault();
    console.log("Click on handle Consent Dis-Agree");
  }

  render () {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar> 
            <Hidden mdUp>
              <IconButton aria-label="Menu" className="menuButtonTop"><ChevronLeft style={{width: 32, height: 32,}} /></IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">Consent Terms &amp; Conditions</Typography>
          </Toolbar>
        </AppBar>
        <div className="signBlock">
          <div className="noAccess">
            <p>Rotate to portrait for better usage.</p>
          </div>
          <div className="termsPanel">
            <div className="loginFormPanel">

              <div className="termsBlock"> 
                <h3 className="subHeadingRegular">1. YOUR AGREEMENT </h3>
                <p className="pTxt">By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site. <br /> 
                    PLEASE NOTE: We reserve the right, at our sole discretion, to
                    change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.</p>
                <h3 className="subHeadingRegular">2. PRIVACY </h3>
                <p className="pTxt">Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices.</p>
                <h3 className="subHeadingRegular">3. LINKED SITES </h3>
                <p className="pTxt">This Site may contain links to other independent third-party Web sites ("Linked Sites"). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under our control, and we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites.</p>
                <h3 className="subHeadingRegular">4. FORWARD LOOKING STATEMENTS </h3>
                <p className="pTxt">All materials reproduced on this site speak as of the original date of publication or filing. The fact that a document is available on this site does not mean that the information contained in such document has not been modified or superseded by events or by a subsequent document or filing. We have no duty or policy to update any information or statements contained on this site and, therefore, such information or statements should not be relied upon as being current as of the date you access this site.</p>
                <h3 className="subHeadingRegular">5. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY </h3>
                <p className="pTxt">A. This site may contain inaccuracies and typo Graphical errors. We does not warrant the accuracy or completeness of the materials or the reliability of any advice, opinion, statement or Other information displayed or distributed Through the site. You expressly understand and Agree that: 
                    (i) your use of the site, including any Reliance on any such opinion, advice, statement,Memorandum, or information contained herein, Shall be at your sole risk;
                    (ii) the site is provided On an "as is and as available" basis;
                    (iii) except as Expressly provided herein we disclaim all warranties of any kind, whether express or implied, Including, but not limited to implied warranties of merchantability, fitness for a particular purpose, Workmanlike effort, title and non-infringement;
                    (iv) we make no warranty with respect to the Results that may be obtained from this site, the Products or services advertised or offered or Merchants involved;
                    (v) any material downloaded Or otherwise obtained through the use of the site Is done at your own discretion and risk; and
                    (vi) you Will be solely responsible for any damage to your Computer system or for any loss of data that Results from the download of any such material.</p>
                <p className="pTxt">B. You understand and agree that under no circumstances, including, but not limited to, negligence, Shall we be liable for any direct, indirect, incidental, special, punitive or consequential damages that result from the use of, or the inability to use, Any of our sites or materials or functions on any such site, even if we have been advised of the possibility of such damages. The foregoing limitations Shall apply notwithstanding any failure of essential purpose of any limited remedy.</p>
                <h3 className="subHeadingRegular">6. EXCLUSIONS AND LIMITATIONS </h3>
                <p className="pTxt">Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion Of liability for incidental or consequential Damages. Accordingly, our liability in such jurisdiction shall be limited to the maximum extent Permitted by law.</p>
                <h3 className="subHeadingRegular">7. OUR PROPRIETARY RIGHTS </h3>
                <p className="pTxt">This Site and all its Contents are intended solely for personal,non-commercial use. Except as expressly provided, nothing within the Site shall be construed as conferring any license under our or any third party's intellectual property rights, whether by estoppel, implication, waiver, or otherwise. Without limiting the generality of the foregoing, you acknowledge and agree that all content available through and used to operate the Site and its services is protected by copyright, trademark, patent, or other proprietary rights of 'B.' No Joint Venture, No Derogation of Rights.</p>
              </div>
              
              <div className="formBlock">

                { this.state.formErrorMessage && <div className="errorBox"> { this.state.formErrorMessage }</div> }
                {this.props.messages.isLoading && <div className="circularProgress"> <CircularProgress /> </div> }

                <form>
                  <TextField id="firstName" type="text" name="firstName" value={this.state.firstName} label="First Name" className="overwriteLabel" fullWidth onChange={this.handleChangeFirstName}/>
                  <br />
                  <TextField id="lastName" type="text" name="lastName" value={this.state.lastName} label="Last Name" className="overwriteLabel" fullWidth onChange={this.handleChangeLastName} />
                  <br />
                  <div className="termsButton">
                    <Button id="DisagreeBtn" raised color="default" className="margRight" type="submit" onClick={this.handleConsentDisAgree}>Disagree</Button>
                    <Button id="AgreeBtn" raised color="primary" type="submit" onClick={this.handleConsentAgree}>Agree</Button>
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

// const validateLogin = values => {
//     const errors = {};

//     const requiredFields = [
//         'email',
//         'password'
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

// ConsentPage.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     classes: PropTypes.object.isRequired
// };

// export default reduxForm({
//     form: 'ConsentPage', // a unique identifier for this form
//     validate: validateLogin // ←Callback function for client-side validation
// })(withStyles(styles)(ConsentPage))