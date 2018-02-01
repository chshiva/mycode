import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
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
import css from './doctorform.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Stepper, {Step, StepLabel} from 'material-ui/Stepper';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import { connect } from 'react-redux';
import { setStepError } from './actions';
import { CircularProgress } from 'material-ui/Progress';


const styles = theme => ({
  formControl: {
    minWidth: 120,
  },
 
});

class DoctorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      prefix: '', 
      suffix:'',
      finished: false,
      stepIndex: this.props.doctorDetailsForm.stepIndex || 0,
      isLoading: this.props.doctorDetailsForm.isLoading || null,
      onError: this.props.doctorDetailsForm.error || null,
    };
  }

  menuOpen = event => {
    this.setState({ open: true , anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.doctorDetailsForm) {
      this.setState({ doctorDetailsForm: this.props.doctorDetailsForm });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log("componentWillReceiveProps ", nextProps.doctorDetailsForm.stepIndex);

    this.setState({ isLoading: nextProps.doctorDetailsForm.isLoading });

    if (nextProps.doctorDetailsForm.error) {
      if (parseInt(nextProps.doctorDetailsForm.stepIndex) < parseInt(this.props.doctorDetailsForm.stepIndex)) {
        this.setState({ onError: nextProps.doctorDetailsForm.error });
        var stepIndex = nextProps.doctorDetailsForm.stepIndex;
        this.setState({
          onError: nextProps.doctorDetailsForm.error,
          stepIndex: stepIndex,
          doctorDetailsForm: nextProps.doctorDetailsForm
        });
      } else {
        console.log("nextProps.doctorDetailsForm.error ", nextProps.doctorDetailsForm.error);
        this.setState({ onError: nextProps.doctorDetailsForm.error });
        // this.setState({ onError: "Error" });
      }

    }

    if (!nextProps.doctorDetailsForm.error) {
      var stepIndex = nextProps.doctorDetailsForm.stepIndex;

      this.setState({
        onError: nextProps.doctorDetailsForm.error,
        stepIndex: stepIndex,
        doctorDetailsForm: nextProps.doctorDetailsForm
      });

    } else {
      this.setState({ errorMessage: nextProps.doctorDetailsForm.error });
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Step1 handleNext={this.props.handleNext} />;
      case 1:
        return <Step2 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext}/>;
      case 2:
        return <Step3 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} />;
      case 3:
        return <Step4 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} />;
      case 4:
        return this.props.history.push('/doctor/dashboard');
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render(){
    const { classes } = this.props;
    const {finished, stepIndex} = this.state;
    // const contentStyle = {padding: '0 16px'};

  return (
    <div>
      <div className="noAccess">
        <p>Rotate to portrait for better usage.</p>
      </div>
      {/* <AppBar position="fixed">
          <Toolbar>
            <Hidden mdUp> 
              <IconButton aria-label="Menu" className="menuButtonTop">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">  
              <div className="whiteLogo">
                <img src="public/images/logo/netikWhiteLogo.png" alt="Logo" />
              </div>
            </Typography>
            
            <Button aria-owns={this.state.open ? 'simple-menu' : null} aria-haspopup="true" onClick={this.menuOpen}>
            <span className="whiteTxt">Doctor</span>
              <ArrowDropDown className="arrowDownIcon"/>
              <Avatar alt="Remy Sharp" src="/public/images/black-icons/avatar.png" className="avatarImg" />
            </Button>
            <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open}
          onClose={this.menuClose} className="dropdDown" >
              <MenuItem onClick={this.menuClose}>Profile</MenuItem>
              <MenuItem onClick={this.menuClose}>My Account</MenuItem>
              <MenuItem onClick={this.menuClose}>Settings</MenuItem>
            </Menu>
          </Toolbar>
      </AppBar>
      <div className="leftNavBlock">
        <List>
          <ListItem button>
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/dashboard.png" alt="page icon" />
            </div>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/medical-records.png" alt="page icon" />
            </div>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/medical-pre.png" alt="page icon" />
            </div>
            <ListItemText primary="My Patients" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><InputIcon /></ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </div> */}
      <div className="mainContainer">
        <Grid container spacing={24} >
          <Grid item xs={12} md={12}>
            <div className="block24px">
              <h2 className="headlineTxt">Doctor Details Form Filling</h2>
                <Stepper activeStep={stepIndex} alternativeLabel className="stepsBox">
                  <Step>
                    <StepLabel><Hidden smDown>Basic Details</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Address</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Email & Phone</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Primary Doctor &amp; Hospital Information</Hidden></StepLabel>
                  </Step>
                </Stepper>
              {this.state.onError && <div className="errorBox"> {this.state.onError} </div>}
              {this.state.isLoading && <div className="circularProgress"> <CircularProgress /> </div>}
                <div className="contentStyle">
                  {finished ? (
                    <div>
                      <a href="#" onClick={(event) => {
                          event.preventDefault();
                          this.setState({stepIndex: 0, finished: false});
                        }}
                      >
                        Click here
                      </a> to reset the example.
                    </div>
                  ) : (
                    <div>
                      <div>{this.getStepContent(stepIndex)}</div>
                      {/* <div style={{marginTop: 12}}>
                      <Button label="Back"
                          disabled={stepIndex === 0}
                          onClick={this.handlePrev}
                          style={{marginRight: 12, color: '#000'}}
                        />
                        <Button raised
                          label={stepIndex === 2 ? 'Finish' : 'Next'}
                          primary={true}
                          onClick={this.handleNext}
                        />
                      </div>*/}
                    </div>
                  )}
                </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
};

/**  Map the state to props. */
const mapStateToProps = function (state) {
  return {
    user: state.user,
    doctorDetailsForm: state.doctorDetailsForm
  }
}
export default connect(mapStateToProps)(DoctorForm);

