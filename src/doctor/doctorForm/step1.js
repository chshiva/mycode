import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import css from './doctorform.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText, FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import PPL_Select from '../../commons/PPLSelect';
import {setStepError } from './actions';

const styles = theme => ({
  formControl: {
    minWidth: 120,
  },
});

class Step1 extends Component {
	constructor(props) {
    super(props);
    this.state = {
      step: 0,
      prefix: "",
      firstname: "",
      middlename: "",
      lastname: "",
      suffix: "",
      dateofbirth: "",
      gender: "",
      formErrorMessage: ""
    };
    this.handleChangePrefix = this.handleChangePrefix.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);

    this.handleChangeMiddleName = this.handleChangeMiddleName.bind(this);

    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeSuffix = this.handleChangeSuffix.bind(this);

    this.handleChangeDateOfBirth = this.handleChangeDateOfBirth.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);

    this.handleSubmitStep = this.handleSubmitStep.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    this.setState({
      firstname: this.props.user && this.props.user.userDetails && this.props.user.userDetails.firstName || "",
      lastname: this.props.user && this.props.user.userDetails && this.props.user.userDetails.lastName || "",
    })
    if (this.props.basicdetails) {
      this.setState({
        prefix: this.props.basicdetails.prefix,
        middlename: this.props.basicdetails.middlename,
        suffix: this.props.basicdetails.suffix,
        dateofbirth: this.props.basicdetails.dateofbirth,
        gender: this.props.basicdetails.gender,
      });
    } else {
      console.log('make api call and get data');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.basicdetails) {
      this.setState({
        prefix: nextProps.basicdetails.prefix,
        firstname: this.props.user && this.props.user.userDetails && this.props.user.userDetails.firstName || "",
        lastname: this.props.user && this.props.user.userDetails && this.props.user.userDetails.lastName || "",
        middlename: nextProps.basicdetails.middlename,
        dateofbirth: nextProps.basicdetails.dateofbirth,
        suffix: nextProps.basicdetails.suffix,
        gender: nextProps.basicdetails.gender,
      });
    }
  }

  handleChangePrefix(code) {
    this.setState({ prefix: code });
  }

  handleChangeFirstName(e) {
    this.setState({ firstname: e.target.value });
  }

  handleChangeMiddleName(e) {
    this.setState({ middlename: e.target.value });
  }

  handleChangeLastName(e) {
    this.setState({ lastname: e.target.value });
  }

  handleChangeSuffix(code) {
    this.setState({ suffix: code });
  }

  handleChangeDateOfBirth(e) {
    this.setState({ dateofbirth: e.target.value });
  }

  handleChangeGender(value) {
    this.setState({ gender: value });
  }

  handleSubmitStep(e) {

    var formErrorMessage = "";
    this.props.dispatch(setStepError(formErrorMessage));
    if (this.state.prefix == "") formErrorMessage = "Prefix Should Not be Empty";
    else if (this.state.firstname == "") formErrorMessage = "First Name Should Not be Empty";
    else if (this.state.middlename == "") formErrorMessage = "Middle Name Should Not be Empty";
    else if (this.state.lastname == "") formErrorMessage = "Last Name Should Not be Empty";
    else if (this.state.suffix == "") formErrorMessage = "Suffix Should Not be Empty";
    else if (this.state.dateofbirth == "") formErrorMessage = "Date of Birth Should Not be Empty";
    // else if (!validateDOB(this.state.dateofbirth)) formErrorMessage = "Date of Birth Should be dd/mm/yyyy format";
    else if (this.state.gender == "") formErrorMessage = "Gender Should Not be Empty";


    if (!formErrorMessage == "") {
      this.props.dispatch(setStepError(formErrorMessage));
    } else {
      e.preventDefault();
      this.props.handleNext(this.state, 0);
    }



  }

	render(){
		const { classes } = this.props;
		return(
			<div className="stepContent">
        <h2 className="h2">1. Basic Details</h2>
        <form>
          <div className="textFieldBreak">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="prefix">Prefix</InputLabel>
              <PPL_Select className="textItemBlock" value={this.state.prefix} onChange={this.handleChangePrefix} placeholder="prefix" api="prefixes" keyValue="code" nameValue="title" />
            </FormControl>
            <TextField id="FirstName" type="text" name="First Name" label="First Name" fullWidth value={this.state.firstname} className="overwriteLabel" onChange={this.handleChangeFirstName}/>
          </div>
          <TextField id="MiddleName" type="text" name="Middle Name" label="Middle Name" fullWidth className="overwriteLabel" errortext="This field is required" value={this.state.middlename} onChange={this.handleChangeMiddleName}/>
          <div className="textFieldBreak">
            <TextField id="LastName" type="text" name="Last Name" label="Last Name" fullWidth className="textItemBlock" errortext="This field is required" value={this.state.lastname} onChange={this.handleChangeLastName}/>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="suffix">Suffix</InputLabel>
              <PPL_Select className="textItemBlock" value={this.state.suffix} onChange={this.handleChangeSuffix} placeholder="suffix" api="suffix" keyValue="code" nameValue="title" />
            </FormControl>
          </div>
          <div className="textFieldBreak">
            <TextField id="date" type="date" defaultValue="2017-05-24" InputLabelProps={{
              shrink: true,
            }} name="Date Of Birth" label="Date Of Birth" fullWidth className="textItemBlock" errortext="This field is required" value={this.state.dateofbirth} onChange={this.handleChangeDateOfBirth}/>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <PPL_Select className="textItemBlock" value={this.state.gender} onChange={this.handleChangeGender} placeholder="Gender" api="gender" keyValue="code" nameValue="title" />
            </FormControl>
            
          </div>
        </form>
        <ul className="listInline">
          <li>
            <Button id="next-step" raised color="primary" type="submit" onClick={this.handleSubmitStep}>Next</Button>
          </li>
        </ul>
    </div>
			);
	}
};

Step1.propTypes = {
  classes: PropTypes.object.isRequired,
};

/** Map the state to props. */
const mapStateToProps = function (state) {
  return {
    user: state.user,
    basicdetails: state.doctorDetailsForm.basicdetails
  }
};

export default connect(mapStateToProps)(withStyles(styles)(Step1));
