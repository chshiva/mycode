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
import { FormControl, FormHelperText } from 'material-ui/Form';
import { connect } from 'react-redux';
import {setStepError } from './actions';
import {validateMobile,validateLandline,validateEmail } from '../../commons/validationmethods';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "stepIndex": 2,
      "email": "",
      "mobilenumber":"",
      "alternateemail": "",
      "homelandline": "",
      "worklandline": "",
      "alternatemobilenumber": "",
      "specialization": ""
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeAlternateEmail = this.handleChangeAlternateEmail.bind(this);
    this.handleChangeHomeLandline = this.handleChangeHomeLandline.bind(this);
    this.handleChangeWorkLandLine = this.handleChangeWorkLandLine.bind(this);
    this.handleChangeAlternateMobileNumber = this.handleChangeAlternateMobileNumber.bind(this);

    this.handleSubmitStep = this.handleSubmitStep.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactdetails) {
      this.setState({
        email:nextProps.contactdetails.email,
        mobilenumber: nextProps.contactdetails.mobilenumber,        
        alternateemail: nextProps.contactdetails.alternateemail,
        homelandline: nextProps.contactdetails.homelandline,
        worklandline: nextProps.contactdetails.worklandline,
        alternatemobilenumber: nextProps.contactdetails.alternatemobilenumber,
        specialization: nextProps.contactdetails.specialization
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.contactdetails) {
      this.setState({
        email: this.props.contactdetails.email,
        mobilenumber: this.props.contactdetails.mobilenumber,
        alternateemail: this.props.contactdetails.alternateemail,
        homelandline: this.props.contactdetails.homelandline,
        worklandline: this.props.contactdetails.worklandline,
        alternatemobilenumber: this.props.contactdetails.alternatemobilenumber,
        specialization: this.props.contactdetails.specialization
      });
    } else {
      console.log('make api call and get data');
    }
  }

  handleChangeEmail(e){
    this.setState({ email:e.target.value });
  }

  handleChangeMobile(e) {
    this.setState({ mobilenumber: e.target.value });
  }

  handleChangeAlternateEmail(e) {
    this.setState({ alternateemail: e.target.value });
  }

  handleChangeHomeLandline(e) {
    this.setState({ homelandline: e.target.value });
  }

  handleChangeWorkLandLine(e) {
    this.setState({ worklandline: e.target.value });
  }

  handleChangeAlternateMobileNumber(e) {
    this.setState({ alternatemobilenumber: e.target.value });
  }

  handleChangeSpecialization(e) {
    this.setState({ specialization: e.target.value });
  }

  handleSubmitStep(e) {
    var formErrorMessage = "";
    this.props.dispatch(setStepError(formErrorMessage));

    if (this.state.email == "") formErrorMessage = "Email Address Should Not be Empty";
    else if (!validateEmail(this.state.email)) formErrorMessage = "Please Enter a  Valid Email"
    else if (this.state.mobilenumber == "") formErrorMessage = "mobilenumber Should Not be Empty";
    else if (!validateMobile(this.state.mobilenumber)) formErrorMessage = "Please Enter a  Valid Mobile Number"
    else if (this.state.alternateemail == "") formErrorMessage = "Alternate Email Address Should Not be Empty";
    else if (!validateEmail(this.state.alternateemail)) formErrorMessage = "Please Enter a  Valid Alternative Email"
    else if (this.state.homelandline == "") formErrorMessage = "Home Landline Should Not be Empty";
    else if (!validateLandline(this.state.homelandline)) formErrorMessage = "Please Enter a  Valid Home Landline";
    else if (this.state.worklandline == "") formErrorMessage = "Work Landline Name Should Not be Empty";
    else if (!validateLandline(this.state.worklandline)) formErrorMessage = "Please Enter a  Valid Work Landline";
    else if (this.state.alternatemobilenumber == "") formErrorMessage = "Alternate Mobile Number Should Not be Empty";
    else if (!validateMobile(this.state.alternatemobilenumber)) formErrorMessage = "Please Enter a  Valid Alternative Mobile Number"

    else if (this.state.specialization == "") formErrorMessage = "specialization Should Not be Empty";
    else console.log("Looks like no error");

    if (!formErrorMessage == "") {
      this.props.dispatch(setStepError(formErrorMessage));
    } else {
      e.preventDefault();
      console.log("handleSubmitStep 2 ", this.state);
      this.props.handleNext(this.state, 2);
    }
  }

  handlePreviousStep(e) {
    e.preventDefault();
    console.log("handlePreviousStep ", this.state.stepIndex);
    this.props.handlePrevious(this.state, this.state.stepIndex);
  }
	render(){
		return(
			<div className="stepContent">
        <h2 className="h2">3. Email & Phone</h2>
        <form>
          <div className="textFieldBreak">
            <TextField id="Email" type="email" name="Email" label="Email" fullWidth className="textItemBlock" value={this.state.email} onChange={this.handleChangeEmail}/>
            <TextField id="Mobile Number" type="text" name="Mobile Number" label="Mobile" fullWidth className="overwriteLabel" value={this.state.mobilenumber} onChange={this.handleChangeMobile}/>
          </div>
          <div className="textFieldBreak">
            <TextField id="landline" type="text" name="Landline(Home)" label="Landline(Home)" fullWidth className="textItemBlock" errortext="This field is required" value={this.state.homelandline} onChange={this.handleChangeHomeLandline}/>
            <TextField id="work" type="text" name="Landline(Work)" label="Landline(Work)" fullWidth className="overwriteLabel" errortext="This field is required" value={this.state.worklandline} onChange={this.handleChangeWorkLandLine}/>
          </div>
          <div className="textFieldBreak">
            <TextField id="AltEmail" type="email" name="Alternate Email" label="Alternate Email" fullWidth className="textItemBlock" value={this.state.alternateemail} onChange={this.handleChangeAlternateEmail}/>
            <TextField id="mobile" type="text" name="Alternate Mobile" label="Mobile 2" fullWidth className="overwriteLabel" errortext="This field is required" value={this.state.alternatemobilenumber} onChange={this.handleChangeAlternateMobileNumber}/>
          </div>
          <TextField id="Speciality" type="text" name="Speciality" label="Speciality" fullWidth className="overwriteLabel" errortext="This field is required" value={this.state.specialization} onChange={this.handleChangeSpecialization.bind(this)}/>
        </form>
        <ul className="listInline">
          <li>
            <Button id="prev-step" raised color="default" type="submit" onClick={this.handlePreviousStep}>Back</Button>
          </li>
          <li>
            <Button id="next-step" raised color="primary" type="submit" onClick={this.handleSubmitStep}>Next</Button>
          </li>
        </ul>
    </div>
			);
	}
};
/** Map the state to props. */
const mapStateToProps = function (state) {
  return {
    contactdetails: state.doctorDetailsForm.contactdetails
  }
};

export default connect(mapStateToProps)(Step3);