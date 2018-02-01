import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import css from './medicalform.css';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
// import Datepicker from 'react-material-datepicker';

import { setStepError } from './actions';

import PPL_Select from '../../commons/PPLSelect';
import { validateDOB } from '../../commons/validationmethods'

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
    if (this.state.firstname == "") formErrorMessage = "First Name Should Not be Empty";
    if (this.state.middlename == "") formErrorMessage = "Middle Name Should Not be Empty";
    if (this.state.lastname == "") formErrorMessage = "Last Name Should Not be Empty";
    if (this.state.suffix == "") formErrorMessage = "Suffix Should Not be Empty";
    if (this.state.dateofbirth == "") formErrorMessage = "Date of Birth Should Not be Empty";
    else if (!validateDOB(this.state.dateofbirth)) formErrorMessage = "Date of Birth Should be yyyy-mm-dd format";
    if (this.state.gender == "") formErrorMessage = "Gender Should Not be Empty";


    if (!formErrorMessage == "") {
      this.props.dispatch(setStepError(formErrorMessage));
    } else {
      e.preventDefault();
      this.props.handleNext(this.state, 0);
    }



  }

  render() {
    const { classes } = this.props;
    return (
      <div className="stepContent">
        <h2 className="h2">1. Basic Details</h2>

        <div className="textFieldBreak">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="prefix">Prefix</InputLabel>
            <PPL_Select className="textItemBlock" value={this.state.prefix} onChange={this.handleChangePrefix} placeholder="prefix" api="prefixes" keyValue="code" nameValue="title" />
          </FormControl>
          <TextField id="FirstName" type="text" name="First Name" label="First Name" value={this.state.firstname} fullWidth className="overwriteLabel" disabled />
        </div>

        <TextField id="MiddleName" type="text" name="Middle Name" label="Middle Name" value={this.state.middlename} fullWidth className="overwriteLabel" onChange={this.handleChangeMiddleName} />

        <div className="textFieldBreak">
          <TextField id="LastName" type="text" name="Last Name" label="Last Name" value={this.state.lastname} fullWidth className="textItemBlock" disabled />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="suffix">Suffix</InputLabel>
            <PPL_Select className="textItemBlock" value={this.state.suffix} onChange={this.handleChangeSuffix} placeholder="suffix" api="suffix" keyValue="code" nameValue="title" />
          </FormControl>
        </div>

        <div className="textFieldBreak">
          <TextField id="dateOfBirth" type="text" name="Date Of Birth" label="Date Of Birth" label="YY-MM-DD" fullWidth className="textItemBlock" value={this.state.dateofbirth} onChange={this.handleChangeDateOfBirth} />
          {/* <Datepicker defaultValue={ this.state.dateofbirth } onChange={ this.handleChangeDateOfBirth } range={ true } container="inline"/>  */}

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <PPL_Select className="textItemBlock" value={this.state.gender} onChange={this.handleChangeGender} placeholder="Gender" api="gender" keyValue="code" nameValue="title" />
          </FormControl>
        </div>

        <ul className="listInline">
          <li>
            {/* <Button id="next-step" raised color="primary" type="submit" onClick={this.props.handleNext}>Next</Button> */}
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
  }
};

export default connect(mapStateToProps)(withStyles(styles)(Step1));