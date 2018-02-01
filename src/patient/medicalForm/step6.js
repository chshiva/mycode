import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import css from './medicalform.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { setStepError } from './actions';
import { connect } from 'react-redux';
import { validateEmail, validateMobile, validateLandline } from '../../commons/validationmethods';

class Step6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 5,
      doctordetails: {
        name: "",
        address: "",
        mobilenumber: "",
        email: ""
      },
      hospitaldetails: {
        name: "",
        address: "",
        contactpersonname: "",
        phonenumber: ""
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.information && this.props.information.doctordetails && this.props.information.hospitaldetails) {
      this.setState({
        doctordetails: this.props.information.doctordetails,
        hospitaldetails: this.props.information.hospitaldetails
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.information && nextProps.information.doctordetails && nextProps.information.hospitaldetails) {
      this.setState({
        doctordetails: nextProps.information.doctordetails,
        hospitaldetails: nextProps.information.hospitaldetails
      });
    }
  }

  handleChangeDoctorName(e) {
    var doctordetails = this.state.doctordetails;
    doctordetails.name = e.target.value;
    this.setState({ doctordetails: doctordetails });
  }

  handleChangeDoctorAddress(e) {
    var doctordetails = this.state.doctordetails;
    doctordetails.address = e.target.value;
    this.setState({ doctordetails: doctordetails });
  }

  handleChangeDoctorPhoneNumber(e) {
    var doctordetails = this.state.doctordetails;
    doctordetails.mobilenumber = e.target.value;
    this.setState({ doctordetails: doctordetails });
  }

  handleChangeDoctorEmail(e) {
    var doctordetails = this.state.doctordetails;
    doctordetails.email = e.target.value;
    this.setState({ doctordetails: doctordetails });
  }

  handleChangeHospitalName(e) {
    var hospitaldetails = this.state.hospitaldetails;
    hospitaldetails.name = e.target.value;
    this.setState({ hospitaldetails: hospitaldetails });
  }

  handleChangeHospitalAddress(e) {
    var hospitaldetails = this.state.hospitaldetails;
    hospitaldetails.address = e.target.value;
    this.setState({ hospitaldetails: hospitaldetails });
  }

  handleChangeHospitalContactPerson(e) {
    var hospitaldetails = this.state.hospitaldetails;
    hospitaldetails.contactpersonname = e.target.value;
    this.setState({ hospitaldetails: hospitaldetails });
  }

  handleChangeHospitalPhoneNumber(e) {
    var hospitaldetails = this.state.hospitaldetails;
    hospitaldetails.phonenumber = e.target.value;
    this.setState({ hospitaldetails: hospitaldetails });
  }

  handleSubmit(e) {
    console.log("handleSubmit 5 ", this.state);
    var formErrorMessage = "";
    this.props.dispatch(setStepError(formErrorMessage));
    if (this.state.doctordetails.name == "") formErrorMessage = "Doctor Name Should Not be Empty";
    else if (this.state.doctordetails.address == "") formErrorMessage = "Doctor Address Should Not be Empty";
    else if (this.state.doctordetails.mobilenumber == "") formErrorMessage = "Doctor Mobile Number Should Not be Empty"    
    else if (!validateMobile(this.state.doctordetails.mobilenumber)) formErrorMessage = "Please Enter a  Valid Doctor Mobile Number"
    else if (this.state.doctordetails.email == "") formErrorMessage = "Doctor Email Should Not be Empty"
    else if (!validateEmail(this.state.doctordetails.email)) formErrorMessage = "Please Enter a  Valid Doctor Email"
    
    else if (this.state.hospitaldetails.name == "") formErrorMessage = "Hospital Name Should Not be Empty";
    else if (this.state.hospitaldetails.address == "") formErrorMessage = "Hospital Address Should Not be Empty";
    else if (this.state.hospitaldetails.contactpersonname == "") formErrorMessage = "Contact Person Should Not be Empty";
    else if (this.state.hospitaldetails.phonenumber == "") formErrorMessage = "Hospital Phone Number Should Not be Empty"
    else if (!validateLandline(this.state.hospitaldetails.phonenumber)) formErrorMessage = "Please Enter a  Valid Hospital Phone Number"

    if (!formErrorMessage == "") {
      this.props.dispatch(setStepError(formErrorMessage));
    } else {
      e.preventDefault();
      console.log("handleSubmitStep 3 ", this.state);
      this.props.handleNext(this.state, 5);
    }
    // this.props.handleNext(this.state, 5);
  }

  handlePreviousStep(e) {
    e.preventDefault();
    console.log("handlePreviousStep ", this.state.stepIndex);
    this.props.handlePrevious(this.state, this.state.stepIndex);
  }

  render() {
    return (
      <div className="stepContent">
        <h2 className="h2">6. Primary Doctor &amp; Hospital Information</h2>
        <p className="stepTxt">Doctor Details</p>

        <TextField id="doctorName" type="text" name="Doctor Name" label="Doctor Name" fullWidth className="overwriteLabel" onChange={this.handleChangeDoctorName.bind(this)} value={this.state.doctordetails && this.state.doctordetails.name} />

        <TextField id="doctorAddress" type="text" name="Doctor Address" label="Doctor Address" fullWidth className="overwriteLabel" onChange={this.handleChangeDoctorAddress.bind(this)} value={this.state.doctordetails && this.state.doctordetails.address} />

        <div className="textFieldBreak">
          <TextField id="doctorContact" type="text" name="Doctor Phone" label="Doctor Phone" className="textItemBlock" onChange={this.handleChangeDoctorPhoneNumber.bind(this)} value={this.state.doctordetails && this.state.doctordetails.mobilenumber} />

          <TextField id="doctorEmail" type="text" name="Doctor Email" label="Doctor Email" className="overwriteLabel" onChange={this.handleChangeDoctorEmail.bind(this)} value={this.state.doctordetails && this.state.doctordetails.email} />
        </div>
        <p className="stepTxt">Hospital Details</p>

        <TextField id="hospName" type="text" name="Hospital Name" label="Hospital Name" fullWidth className="overwriteLabel" onChange={this.handleChangeHospitalName.bind(this)} value={this.state.hospitaldetails && this.state.hospitaldetails.name} />

        <TextField id="hospAddress" type="text" name="Hospital Address" label="Hospital Address" fullWidth className="overwriteLabel" onChange={this.handleChangeHospitalAddress.bind(this)} value={this.state.hospitaldetails &&this.state.hospitaldetails.address} />

        <TextField id="hospContactName" type="text" name="Hospital Contact Person Name" label="Hospital Contact Person Name" fullWidth className="overwriteLabel" onChange={this.handleChangeHospitalContactPerson.bind(this)} value={this.state.hospitaldetails && this.state.hospitaldetails.contactpersonname} />

        <TextField id="hospContact" type="text" name="Hospital Phone" label="Hospital Phone" fullWidth className="overwriteLabel" onChange={this.handleChangeHospitalPhoneNumber.bind(this)} value={this.state.hospitaldetails &&this.state.hospitaldetails.phonenumber} />

        <ul className="listInline">
          <li>
            <Button id="prev-step" raised color="default" type="submit" onClick={this.handlePreviousStep}>Back</Button>
          </li>
          <li>
            <Button id="next-step" raised color="primary" type="submit" onClick={this.handleSubmit}>Next</Button>
          </li>
        </ul>
      </div>
    );
  }
};

/** Map the state to props. */
const mapStateToProps = function (state) {
  return {}
};

export default connect(mapStateToProps)(Step6);