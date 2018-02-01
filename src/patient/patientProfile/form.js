import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from 'material-ui/styles';
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
import InputIcon from 'material-ui-icons/Input';
import Avatar from 'material-ui/Avatar';
import css from './myprofile.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import {dob} from '../../commons/commonmethods'
import utils from '../../commons/utils';
import lodash from 'lodash';
import { setMedicalFormStepIndex} from '../medicalForm/actions';
import { connect } from 'react-redux';


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

class myProfile extends Component {
  constructor (props){
  super (props);
    this.state = { anchorEl: null, open: false, value: 0, foodAllergies: null, environmentalAllergies: null, drugAllergies: null, listFoodAllergies: null, listEnvironmentalAllergies: null, listDrugAllergies: null};
    this.listAllergies = this.listAllergies.bind(this);
  }
  componentDidMount(){
    utils.httpRequest('allergies', 'get', {}, (response) => {
      if (response.status) {
        console.log('allergies response',response);
        var allergies = response.result && response.result.allergies;
        var props = lodash.clone(this.props.allergies);
        this.setState({ reqallergies: lodash.clone(this.props.allergies || []) });
        // this.updateCheckedItems(allergies, props);
        var foodAllergies = allergies.filter(function (obj) {
          return obj.type == 'FOOD';
        });

        var drugAllergies = allergies.filter(function (obj) {
          return obj.type == 'DRUG';
        });

        var environmentalAllergies = allergies.filter(function (obj) {
          return obj.type == 'ENVIRONMENTAL';
        });

        this.setState({ listFoodAllergies: foodAllergies, listDrugAllergies: drugAllergies, listEnvironmentalAllergies: environmentalAllergies });
      } else {
        console.log("form get allergies error:", response);
      }
    });
  }



  listAllergies(parrent,child) {
    let fA=[]
    if (child != null) {
        lodash.each(child, (item) => {
          var index = lodash.findIndex(parrent, { code: item });
          if (index >= 0) {
            let title = parrent[index].title;
            fA.push(title)
          }
      })
    }
    return fA;
  }
  profileEdit =(index) =>{
    this.props.dispatch(setMedicalFormStepIndex(index));
    this.props.history.push('/patient/medical-form-filling');
  }

  // editMyProfile = () =>{
  //   this.props.dispatch(setMedicalFormStepIndex(0));
  //   this.props.history.push('/patient/medical-form-filling');
  // }

  menuOpen = event => {
    this.setState({ open: true , anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

handleChange = (event, value) => {
    this.setState({ value });
  };


  render(){
    const { value } = this.state;
    console.log('patient details', this.props.patientProfile)
    var basicdetails = (this.props.patientProfile && this.props.patientProfile.medicalform && this.props.patientProfile.medicalform.basicdetails) ? this.props.patientProfile.medicalform.basicdetails : null;
    var address = (this.props.patientProfile && this.props.patientProfile.medicalform && this.props.patientProfile.medicalform.address) ? this.props.patientProfile.medicalform.address : null ;
    var alternatecontactdetails = (this.props.patientProfile && this.props.patientProfile.medicalform && this.props.patientProfile.medicalform.alternatecontactdetails) ? this.props.patientProfile.medicalform.alternatecontactdetails : null;
    var insurancedonarstatus = (this.props.patientProfile && this.props.patientProfile.medicalform && this.props.patientProfile.medicalform.insurancedonarstatus) ? this.props.patientProfile.medicalform.insurancedonarstatus : null;
    var emergencycontact = (this.props.patientProfile && this.props.patientProfile.medicalform && this.props.patientProfile.medicalform.emergencycontact) ? this.props.patientProfile.medicalform.emergencycontact : null;
    var allergies = (this.props.patientProfile && this.props.patientProfile.medicalform && this.props.patientProfile.medicalform.allergies) ? this.props.patientProfile.medicalform.allergies : null;
    var information = (this.props.patientProfile && this.props.patientProfile.medicalform && this.props.patientProfile.medicalform.information) ? this.props.patientProfile.medicalform.information : null;
    var fa = this.listAllergies(this.state.listFoodAllergies, allergies);
    var da = this.listAllergies(this.state.listDrugAllergies,allergies);
    var ea = this.listAllergies(this.state.listEnvironmentalAllergies,allergies);
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
                    <i className="material-icons" onClick={this.profileEdit.bind(this, 0)} >mode_edit</i>
                  </div>
                </div>
              </div>
              <div className="paperBody">
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <div className="docInfoBlock">
                        <div className="avacircle80">
                          <img src="/public/images/user.jpg" alt="patient" />
                        </div>
                        <div className="docDetails">
                        <h2 className="docName">{this.props.userDetails.firstName + '   ' + this.props.userDetails.lastName}</h2>
                        <p className="callTxt">Occupation: <span>{alternatecontactdetails ? alternatecontactdetails.occupation:null}</span></p>
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
                          <span className="span50 txtVal">{basicdetails ? dob(basicdetails.dateofbirth): null}</span>
                          </li>
                          <li>
                            <span className="span50 txtProp">Gender:</span>
                          <span className="span50 txtVal">{basicdetails ? basicdetails.gender : null}</span>
                          </li>
                          <li>
                            <span className="span50 txtProp">Phone:</span>
                          <span className="span50 txtVal">{this.props.userDetails.mobileNumber}</span>
                          </li>
                          <li>
                            <span className="span50 txtProp">Email:</span>
                          <span className="span50 txtVal">{this.props.userDetails.email}</span>
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
                    <div className="ngtvContainer24">
                    <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Address</h2>
                            <div className="paperTopActionBar">
                              <div className="actionIconBox">
                              <i className="material-icons" onClick={this.profileEdit.bind(this, 1)}>mode_edit</i>
                              </div>
                            </div>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Door Number:</span>
                                <span className="span50 txtVal">{address ? address.doornumber:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Street Name:</span>
                                  <span className="span50 txtVal">{address ? address.streetname:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Apartment Name / Locality Name:</span>
                                  <span className="span50 txtVal">{address ? address.appartmentname:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Area:</span>
                                  <span className="span50 txtVal">{address ? address.area:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">City:</span>
                                  <span className="span50 txtVal">{address ? address.cityid:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">State:</span>
                                  <span className="span50 txtVal">{address ? address.stateid:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Country:</span>
                                  <span className="span50 txtVal">{address ? address.countryid:null}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Emergency Contact</h2>
                            <div className="paperTopActionBar">
                              <div className="actionIconBox">
                              <i className="material-icons" onClick={this.profileEdit.bind(this, 3)}>mode_edit</i>
                              </div>
                            </div>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Name:</span>
                                  <span className="span50 txtVal">{emergencycontact? emergencycontact[0].name:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Phone:</span>
                                  <span className="span50 txtVal">{emergencycontact ? emergencycontact[0].mobilenumber:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Relationship:</span>
                                  <span className="span50 txtVal">{emergencycontact ? emergencycontact[0].relationship:null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Address:</span>
                                  <span className="span50 txtVal">{emergencycontact ? emergencycontact[0].address:null}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Primary Doctor &amp; Hospital Information</h2>
                            <div className="paperTopActionBar">
                              <div className="actionIconBox">
                              <i className="material-icons" onClick={this.profileEdit.bind(this, 5)}>mode_edit</i>
                              </div>
                            </div>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Doctor Name:</span>
                                <span className="span50 txtVal">{information ? information.doctordetails.name : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Doctor Address:</span>
                                <span className="span50 txtVal">{information ? information.doctordetails.address : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Doctor Phone:</span>
                                <span className="span50 txtVal">{information ? information.doctordetails.mobilenumber : null}</span>
                                </li>
                              <li>
                                <span className="span50 txtProp">Doctor Email:</span>
                                <span className="span50 txtVal">{information ? information.doctordetails.email : null}</span>
                              </li>
                                <li>
                                  <span className="span50 txtProp">Hospital Name:</span>
                                <span className="span50 txtVal">{information ? information.hospitaldetails.name : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Hospital Address:</span>
                                <span className="span50 txtVal">{information ? information.hospitaldetails.address : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Hospital Conatct Person Name:</span>
                                <span className="span50 txtVal">{information ? information.hospitaldetails.contactpersonname : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Hospital Phone:</span>
                                <span className="span50 txtVal">{information ? information.hospitaldetails.phonenumber : null}</span>
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
                                <span className="span50 txtProp">Alternate Email:</span>
                                <span className="span50 txtVal">{alternatecontactdetails ? alternatecontactdetails.alternateemail : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Landline(Home):</span>
                                <span className="span50 txtVal">{alternatecontactdetails ? alternatecontactdetails.homelandline : null}</span>
                                </li>
                              <li>
                                <span className="span50 txtProp">Landline(Work):</span>
                                <span className="span50 txtVal">{alternatecontactdetails ? alternatecontactdetails.worklandline : null}</span>
                              </li>
                                <li>
                                  <span className="span50 txtProp">Alternate Phone:</span>
                                <span className="span50 txtVal">{alternatecontactdetails ? alternatecontactdetails.alternatemobilenumber : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Occupation:</span>
                                <span className="span50 txtVal">{alternatecontactdetails ? alternatecontactdetails.occupation : null}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Insurance &amp; Donor Status</h2>
                            <div className="paperTopActionBar">
                              <div className="actionIconBox">
                              <i className="material-icons" onClick={this.profileEdit.bind(this, 4)}>mode_edit</i>
                              </div>
                            </div>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Organ Donor Status:</span>
                                <span className="span50 txtVal">{insurancedonarstatus ? insurancedonarstatus.organdonarstatus : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Insurance Status:</span>
                                <span className="span50 txtVal">{insurancedonarstatus ? insurancedonarstatus.insurance.status : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Insurance Provider:</span>
                                <span className="span50 txtVal">{insurancedonarstatus ? insurancedonarstatus.insurance.provider : null}</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Insurance Policy Number:</span>
                                <span className="span50 txtVal">{insurancedonarstatus ? insurancedonarstatus.insurance.policynumber : null}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Allergy Types</h2>
                            <div className="paperTopActionBar">
                              <div className="actionIconBox">
                              <i className="material-icons" onClick={this.profileEdit.bind(this, 6)}>mode_edit</i>
                              </div>
                            </div>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Food Allergy:</span>
                                <span className="span50 txtVal">
                                {fa && fa.length > 0 ?
                                  fa.map((data, i) => {
                                    return (
                                      <span key={i}>{data}</span>
                                     
                                    )
                                  })
                                  : null
                                }
                                </span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Drug Allergy</span>
                                  <span className="span50 txtVal">
                                  {da && da.length > 0 ?
                                    da.map((data, i) => {
                                      return (
                                        <span key={i}>{data}</span>

                                      )
                                    })
                                    : null
                                  }
                                  </span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Environmental Allergy:</span>
                                  <span className="span50 txtVal">
                                  {ea && ea.length > 0 ?
                                    ea.map((data, i) => {
                                      return (
                                        <span key={i}>{data}</span>

                                      )
                                    })
                                    : null
                                  }
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    </div>
                    </TabContainer>}
                  {value === 1 && <TabContainer>
                    <div className="ngtvContainer24">
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Change Password</h2>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <div className="changePswdBlock">
                                <div className="errorBox">You entered an invalid password</div>
                                  <form method="post">
                                      <TextField id="currentPswd" type="password" name="currentPassword" label="Current Password" fullWidth className="overwriteLabel"  />
                                      <br />
                                      <TextField id="newPswd" type="password" name="newPassword" label="New Password" fullWidth  className="overwriteLabel" />
                                      <br />
                                      <TextField id="retypeNewPswd" type="password" name="retypeNewPassword" label="Retype New Password" fullWidth  className="overwriteLabel" />
                                      <br />
                                  </form>
                              </div>
                            </div>
                            <div className="btmBtnBlock">
                            <div className="btnBlockInline">
                              <Button raised color="primary" className="btnSpace">Save Changes</Button>
                              <Button raised className="btnSpace">CANCEL</Button>
                            </div>
                          </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    </div>
                  </TabContainer>}
            </div>

          </Grid>
        </Grid>
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
      setMedicalFormStepIndex: (index) => dispatch(setMedicalFormStepIndex(index))
    };
}

export default connect(mapDispatchToProps)(myProfile);