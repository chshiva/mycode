import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import InboxIcon from 'material-ui-icons/Inbox';
import InputIcon from 'material-ui-icons/Input';
// import InsertDriveFileIcocn from 'material-ui-icons/InsertDriveFile';
// import Description from 'material-ui-icons/Description';
// import SubscriptionsIcon from 'material-ui-icons/Subscriptions';
import Avatar from 'material-ui/Avatar';
import css from './doctorprofile.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import {dob} from '../../commons/commonmethods';
import { connect } from 'react-redux';
import { setDoctorDetailsFormStepIndex } from '../doctorForm/actions';

/* TAB CONTAINER CHANGES */
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = {
};

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, open: false, value: 0, currentPassword: "", newPassword: "", newConfirmPassword: "", formErrorMessage:""};
  }

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleCurrentPasswordChange(e){
    this.setState({ currentPassword: e.target.value });
  }

  handleNewPasswordChange = (e) =>{
    this.setState({newPassword:e.target.value});
  }
  handleNewConfirmPasswordChange = (e) =>{
    this.setState({newConfirmPassword:e.target.value});
  }

  cancelChangePassword = () =>{
    this.setState({ formErrorMessage: ""});
  }

  componentDidMount(){
    this.setState({ formErrorMessage: this.props.messages.ChangePasswordError })
  }

  submitChangePassword = (e) => {
    e.preventDefault();
    var formErrorMessage = "";

    if (this.state.currentPassword == "") formErrorMessage = "Please Enter a Current Password";
    else if (this.state.newPassword == "") formErrorMessage = "Please Enter a New  Password";
    else if (this.state.newConfirmPassword == "") formErrorMessage = "Please Enter a Confirm Password";
    else if (this.state.newPassword != this.state.newConfirmPassword) formErrorMessage = "New Password and Confirm Passwords are Not Match";
    else {
      console.log("Looks like no Errors");
      this.props.submitChangePasswordForm({ currentPassword: this.state.currentPassword, newPassword: this.state.newPassword});
    }

    this.setState({ formErrorMessage: formErrorMessage });
    console.log("hii iam clicked")
  }
  componentWillReceiveProps(nextprops){
    if (nextprops.messages.ChangePasswordError)
    this.setState({ formErrorMessage: nextprops.messages.ChangePasswordError })
    else if(nextprops.messages.ChangePasswordSuccess)
      this.setState({ formErrorMessage: nextprops.messages.ChangePasswordSuccess })
    
  }
  profileEdit =(index) =>{
    this.props.dispatch(setDoctorDetailsFormStepIndex(index));
    this.props.history.push('/doctor/doctor-form');
  }



  render() {
    const { value } = this.state;
    var basicdetails = (this.props.doctorProfile && this.props.doctorProfile.doctordetailsform && this.props.doctorProfile.doctordetailsform.basicdetails) ? this.props.doctorProfile.doctordetailsform.basicdetails : null;
    var address = (this.props.doctorProfile && this.props.doctorProfile.doctordetailsform && this.props.doctorProfile.doctordetailsform.address) ? this.props.doctorProfile.doctordetailsform.address : null;
    var contactdetails = (this.props.doctorProfile && this.props.doctorProfile.doctordetailsform && this.props.doctorProfile.doctordetailsform.contactdetails) ? this.props.doctorProfile.doctordetailsform.contactdetails : null;
    var information = (this.props.doctorProfile && this.props.doctorProfile.doctordetailsform && this.props.doctorProfile.doctordetailsform.information) ? this.props.doctorProfile.doctordetailsform.information : null;
    // var doctorProfile = this.props.doctorProfile.doctordetailsform;
    return (
      <div>
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>
        <div className="mainContainer">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className="whitePaper">
                <div className="paperHeader">
                  <h2 className="paperHedingTxt">My Profile</h2>
                  <div className="paperTopActionBar">
                    <div className="actionIconBox">
                      <i className="material-icons" onClick={this.profileEdit.bind(this, 0)}>mode_edit</i>
                    </div>
                  </div>
                </div>
                <div className="paperBody">
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <div className="docInfoBlock">
                        <div className="avacircle80">
                          <img src="/public/images/doctorl2.jpeg" alt="Doctor" />
                        </div>
                        <div className="docDetails">
                          <h2 className="docName">{basicdetails? basicdetails.prefix + '.' + basicdetails.firstname + ' ' + basicdetails.lastname:null}</h2>
                          <p className="callTxt">Specialization: <span>{contactdetails ? contactdetails.specialization: null}</span></p>
                        </div>
                      </div>
                      <div className="btmBtnBlock">
                        <div className="btnBlockInline">
                          <input accept="image/*" className="inputHidden" id="raised-button-file" multiple type="file" />
                          <label htmlFor="raised-button-file">
                            <Button raised color="primary" component="span" className="">
                              Upload New Avatar
                            </Button>
                          </label>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="infoInlineBlock">
                        <ul>
                          <li>
                            <span className="span50 txtProp">Age:</span>
                            <span className="span50 txtVal">{basicdetails ? dob(basicdetails.dateofbirth) : null}</span>
                          </li>
                          <li>
                            <span className="span50 txtProp">Gender:</span>
                            <span className="span50 txtVal">{basicdetails ? basicdetails.gender: null}</span>
                          </li>
                          <li>
                            <span className="span50 txtProp">Phone:</span>
                            <span className="span50 txtVal">{contactdetails ? contactdetails.mobilenumber : null}</span>
                          </li>
                          <li>
                            <span className="span50 txtProp">Email:</span>
                            <span className="span50 txtVal">{contactdetails ? contactdetails.email: null}</span>
                          </li>
                        </ul>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <div className="tabBlock">
                <AppBar position="static" color="default" className="tabTransparent">
                  <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
                    <Tab label="Profile" />
                    <Tab label="Settings" />
                  </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <div className="whitePaper">
                        <div className="paperHeader">
                          <h2 className="paperHedingTxt">Address</h2>
                          <div className="paperTopActionBar">
                            <div className="actionIconBox">
                              <i className="material-icons" onClick={this.profileEdit.bind(this,1)}>mode_edit</i>
                            </div>
                          </div>
                        </div>
                        <div className="paperBody">
                          <div className="infoInlineBlock">
                            <ul>
                              <li>
                                <span className="span50 txtProp">Door Number:</span>
                                <span className="span50 txtVal">{address? address.doornumber : null}</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Street Name:</span>
                                <span className="span50 txtVal">{address? address.streetname: null }</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Apartment / Locality Name:</span>
                                <span className="span50 txtVal">{address? address.appartmentname: null}</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Area:</span>
                                <span className="span50 txtVal">{address? address.area: null}</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">City:</span>
                                <span className="span50 txtVal">{address? address.cityid: null}</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">State:</span>
                                <span className="span50 txtVal">{address? address.stateid: null}</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Country:</span>
                                <span className="span50 txtVal">{address? address.countryid: null}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="whitePaper">
                        <div className="paperHeader">
                          <h2 className="paperHedingTxt">Email &amp; Phone</h2>
                          <div className="paperTopActionBar">
                            <div className="actionIconBox">
                              <i className="material-icons" onClick={this.profileEdit.bind(this, 2)}>mode_edit</i>
                            </div>
                          </div>
                        </div>
                        <div className="paperBody">
                          <div className="infoInlineBlock">
                            <ul>
                              <li>
                                <span className="span50 txtProp">Email:</span>
                                <span className="span50 txtVal">{contactdetails ? contactdetails.email: null }</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Mobile:</span>
                                <span className="span50 txtVal">{contactdetails ? contactdetails.mobilenumber: null }</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Landline(Home):</span>
                                <span className="span50 txtVal">{contactdetails ? contactdetails.homelandline: null }</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Landline(Work):</span>
                                <span className="span50 txtVal">{contactdetails ? contactdetails.worklandline: null}</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Alternate Email:</span>
                                <span className="span50 txtVal">{contactdetails ? contactdetails.alternateemail: null}</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Mobile 2:</span>
                                <span className="span50 txtVal">{contactdetails ? contactdetails.alternatemobilenumber: null}</span>
                              </li>
                              <li>
                                <span className="span50 txtProp">Specialization:</span>
                                <span className="span50 txtVal">{contactdetails ? contactdetails.specialization: null}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={12}>
                      <div className="hospInfo">
                        <div className="hospInfoHeader">
                          <h2 className="hospInfoHeadingTxt">Doctor's Hospital Information</h2>
                          <div className="paperTopActionBar">
                            <div className="actionIconBox">
                              <i className="material-icons" onClick={this.profileEdit.bind(this, 3)}>mode_edit</i>
                            </div>
                          </div>
                        </div>
                        <div className="hospInfoBody">
                          <Grid item xs={12} sm={4}>
                            <div className="infoPaper">
                              <div className="paperHeader">
                                <h2 className="paperHedingTxt">Primary Details</h2>
                              </div>
                              <div className="paperBody">
                                <div className="infoInlineBlock">
                                  <ul>
                                    <li>
                                      <span className="span50 txtProp">Hospital Name:</span>
                                      <span className="span50 txtVal">{information? information.primaryhospitaldetails.name: null }</span>
                                    </li>
                                    <li>
                                      <span className="span50 txtProp">Address 1:</span>
                                      <span className="span50 txtVal">{information ? information.primaryhospitaldetails.address: null}</span>
                                    </li>
                                    <li>
                                      <span className="span50 txtProp">Phone 1:</span>
                                      <span className="span50 txtVal">{information ?information.primaryhospitaldetails.phonenumber : null}</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <div className="infoPaper">
                              <div className="paperHeader">
                                <h2 className="paperHedingTxt">Secondary Details</h2>
                              </div>
                              <div className="paperBody">
                                <div className="infoInlineBlock">
                                  <ul>
                                    <li>
                                      <span className="span50 txtProp">Hospital Name:</span>
                                      <span className="span50 txtVal">{information ? information.secondaryhospitaldetails.name: null }</span>
                                    </li>
                                    <li>
                                      <span className="span50 txtProp">Address 2:</span>
                                      <span className="span50 txtVal">{information ? information.secondaryhospitaldetails.address: null }</span>
                                    </li>
                                    <li>
                                      <span className="span50 txtProp">Phone 2:</span>
                                      <span className="span50 txtVal">{information ? information.secondaryhospitaldetails.phonenumber: null }</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <div className="infoPaper">
                              <div className="paperHeader">
                                <h2 className="paperHedingTxt">Tertiary Details</h2>
                              </div>
                              <div className="paperBody">
                                <div className="infoInlineBlock">
                                  <ul>
                                    <li>
                                      <span className="span50 txtProp">Hospital Name:</span>
                                      <span className="span50 txtVal">{information ? information.tertiaryhospitaldetails.name: null }</span>
                                    </li>
                                    <li>
                                      <span className="span50 txtProp">Address 3:</span>
                                      <span className="span50 txtVal">{information ? information.tertiaryhospitaldetails.address: null }</span>
                                    </li>
                                    <li>
                                      <span className="span50 txtProp">Phone 3:</span>
                                      <span className="span50 txtVal">{information ? information.tertiaryhospitaldetails.phonenumber: null }</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </TabContainer>}

                {value === 1 && <TabContainer>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <div className="whitePaper">
                        <div className="paperHeader">
                          <h2 className="paperHedingTxt">Change Password</h2>
                        </div>
                        <div className="paperBody">
                          <div className="infoInlineBlock">
                            <div className="changePswdBlock">
                              {/* {this.props.messages.ChangePasswordError && <div className="errorBox"> {this.props.messages.ChangePasswordError}</div>} */}
                              {this.state.formErrorMessage && <div className="errorBox"> {this.state.formErrorMessage}</div>}
                              {this.props.messages.ChangePasswordSuccess && <div className="errorBox"> {this.props.messages.ChangePasswordSuccess}</div>}
                              <form method="post">
                                <TextField id="currentPswd" type="password" name="currentPassword" label="Current Password" fullWidth className="overwriteLabel" onChange={this.handleCurrentPasswordChange.bind(this)} />
                                <br />
                                <TextField id="newPswd" type="password" name="newPassword" label="New Password" fullWidth className="overwriteLabel" onChange={this.handleNewPasswordChange.bind(this)} />
                                <br />
                                <TextField id="retypeNewPswd" type="password" name="retypeNewPassword" label="Retype New Password" fullWidth className="overwriteLabel" onChange={this.handleNewConfirmPasswordChange.bind(this)}/>
                                <br />
                              </form>
                            </div>
                          </div>
                          <div className="btmBtnBlock">
                            <div className="btnBlockInline">
                              <Button raised color="primary" onClick={this.submitChangePassword.bind(this)} className="btnSpace">Save Changes</Button>
                              <Button raised className="btnSpace" onClick={this.cancelChangePassword.bind(this)}>CANCEL</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </TabContainer>}
              </div>

            </Grid>
          </Grid>
        </div>
        

        {/*<div className="profileContentCard">
              <div className="blockDiv">
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <div className="cardListItems">
                      <h2 className="listHeadlineTxt">About</h2>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="cardListItems">
                      <h2 className="listHeadlineTxt">Experience</h2>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>*/}
        <div className="colseBtmBox">
          <i className="material-icons">close</i>
        </div>
      </div>
    );
  }
};
/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    setDoctorDetailsFormStepIndex: (index) => dispatch(setDoctorDetailsFormStepIndex(index))
  };
}

export default connect(mapDispatchToProps)(DoctorProfile);
