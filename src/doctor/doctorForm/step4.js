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
import { validateMobile } from '../../commons/validationmethods';
import { setStepError } from './actions';;

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 3,
      primaryhospitaldetails: {
        name: "",
        address: "",
        phonenumber: ""
      },
      secondaryhospitaldetails: {
        name: "",
        address: "",
        phonenumber: ""
      },
      tertiaryhospitaldetails: {
        name: "",
        address: "",
        phonenumber: ""
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.information && this.props.information.primaryhospitaldetails && this.props.information.secondaryhospitaldetails && this.props.information.tertiaryhospitaldetails) {
      this.setState({
        primaryhospitaldetails: this.props.information.primaryhospitaldetails,
        secondaryhospitaldetails: this.props.information.secondaryhospitaldetails,
        tertiaryhospitaldetails: this.props.information.tertiaryhospitaldetails,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.information && nextProps.information.primaryhospitaldetails && nextProps.information.secondaryhospitaldetails && nextProps.information.tertiaryhospitaldetails) {
      this.setState({
        primaryhospitaldetails: nextProps.information.primaryhospitaldetails,
        secondaryhospitaldetails: nextProps.information.secondaryhospitaldetails,
        tertiaryhospitaldetails: nextProps.information.tertiaryhospitaldetails,
      });
    }
  }

  handleChangeHospitalName1(e) {
    var primaryhospitaldetails = this.state.primaryhospitaldetails;
    primaryhospitaldetails.name = e.target.value;
    this.setState({ primaryhospitaldetails: primaryhospitaldetails });
  }

  handleChangeHospitalAddress1(e) {
    var primaryhospitaldetails = this.state.primaryhospitaldetails;
    primaryhospitaldetails.address = e.target.value;
    this.setState({ primaryhospitaldetails: primaryhospitaldetails });
  }

  handleChangeHospitalPhoneNumber1(e) {
    var primaryhospitaldetails = this.state.primaryhospitaldetails;
    primaryhospitaldetails.phonenumber = e.target.value;
    this.setState({ primaryhospitaldetails: primaryhospitaldetails });
  }

  handleChangeHospitalName2(e) {
    var secondaryhospitaldetails = this.state.secondaryhospitaldetails;
    secondaryhospitaldetails.name = e.target.value;
    this.setState({ secondaryhospitaldetails: secondaryhospitaldetails });
  }

  handleChangeHospitalAddress2(e) {
    var secondaryhospitaldetails = this.state.secondaryhospitaldetails;
    secondaryhospitaldetails.address = e.target.value;
    this.setState({ secondaryhospitaldetails: secondaryhospitaldetails });
  }

  handleChangeHospitalPhoneNumber2(e) {
    var secondaryhospitaldetails = this.state.secondaryhospitaldetails;
    secondaryhospitaldetails.phonenumber = e.target.value;
    this.setState({ secondaryhospitaldetails: secondaryhospitaldetails });
  }
  handleChangeHospitalName3(e) {
    var tertiaryhospitaldetails = this.state.tertiaryhospitaldetails;
    tertiaryhospitaldetails.name = e.target.value;
    this.setState({ tertiaryhospitaldetails: tertiaryhospitaldetails });
  }

  handleChangeHospitalAddress3(e) {
    var tertiaryhospitaldetails = this.state.tertiaryhospitaldetails;
    tertiaryhospitaldetails.address = e.target.value;
    this.setState({ tertiaryhospitaldetails: tertiaryhospitaldetails });
  }

  handleChangeHospitalPhoneNumber3(e) {
    var tertiaryhospitaldetails = this.state.tertiaryhospitaldetails;
    tertiaryhospitaldetails.phonenumber = e.target.value;
    this.setState({ tertiaryhospitaldetails: tertiaryhospitaldetails });
  }


  handleSubmit(e) {
    console.log("handleSubmit 3 ", this.state);
    var formErrorMessage = "";
    this.props.dispatch(setStepError(formErrorMessage));
    if (this.state.primaryhospitaldetails.name == "") formErrorMessage = "Primary Hospital Name Should Not be Empty";
    else if (this.state.primaryhospitaldetails.address == "") formErrorMessage = "Primary Hospital Address Should Not be Empty";
    else if (this.state.primaryhospitaldetails.phonenumber == "") formErrorMessage = "Primary Hospital Phone Number Should Not be Empty"
    else if (!validateMobile(this.state.primaryhospitaldetails.phonenumber)) formErrorMessage = "Please Enter a  Valid Primary Hospital Phone Number"
    else if (this.state.secondaryhospitaldetails.name == "") formErrorMessage = "Secondary Hospital Name Should Not be Empty";
    else if (this.state.secondaryhospitaldetails.address == "") formErrorMessage = "Secondary Hospital Address Should Not be Empty";
    else if (this.state.secondaryhospitaldetails.phonenumber == "") formErrorMessage = "Secondary Hospital Phone Number Should Not be Empty"
    else if (!validateMobile(this.state.secondaryhospitaldetails.phonenumber)) formErrorMessage = "Please Enter a  Valid Secondary Hospital Phone Number"
    else if (this.state.tertiaryhospitaldetails.name == "") formErrorMessage = "tertiary Hospital Name Should Not be Empty";
    else if (this.state.tertiaryhospitaldetails.address == "") formErrorMessage = "tertiary Hospital Address Should Not be Empty";
    else if (this.state.tertiaryhospitaldetails.phonenumber == "") formErrorMessage = "tertiary Hospital Phone Number Should Not be Empty"
    else if (!validateMobile(this.state.tertiaryhospitaldetails.phonenumber)) formErrorMessage = "Please Enter a  Valid tertiary Hospital Phone Number"

    if (!formErrorMessage == "") {
      this.props.dispatch(setStepError(formErrorMessage));
    } else {
      e.preventDefault();
      console.log("handleSubmitStep 3 ", this.state);
      this.props.handleNext(this.state, 3);
    }
    // this.props.handleNext(this.state, 5);
  }

  handlePreviousStep(e) {
    e.preventDefault();
    console.log("handlePreviousStep ", this.state.stepIndex);
    this.props.handlePrevious(this.state, this.state.stepIndex);
  }
	render(){
		return(
				<div className="stepContent">
          <h2 className="h2">4. Hospital Information</h2>
          <form>
            <p className="stepTxt">Primary Details</p>
            <TextField id="hospName1" type="text" name="Hospital Name1" label="Hospital Name 1" fullWidth  className="overwriteLabel"  onChange={this.handleChangeHospitalName1.bind(this)} value={this.state.primaryhospitaldetails.name}  />
            <TextField id="hospAddress1" type="text" name="Hospital Address 1" label="Address 1" fullWidth  className="overwriteLabel"  onChange={this.handleChangeHospitalAddress1.bind(this)} value={this.state.primaryhospitaldetails.address} />
            <TextField id="hospContact1" type="text" name="Hospital Phone 1" label="Phone 1" fullWidth  className="overwriteLabel"  onChange={this.handleChangeHospitalPhoneNumber1.bind(this)} value={this.state.primaryhospitaldetails.phonenumber} />

            <p className="stepTxt">Secondary Details</p>
            <TextField id="hospName2" type="text" name="Hospital Name 2" label="Hospital Name 2" fullWidth  className="overwriteLabel" onChange={this.handleChangeHospitalName2.bind(this)} value={this.state.secondaryhospitaldetails.name} />
            <TextField id="hospAddress2" type="text" name="Hospital Address 2" label="Address 2" fullWidth  className="overwriteLabel" onChange={this.handleChangeHospitalAddress2.bind(this)} value={this.state.secondaryhospitaldetails.address} />
            <TextField id="hospContact2" type="text" name="Hospital Phone 2" label="Phone 2" fullWidth  className="overwriteLabel" onChange={this.handleChangeHospitalPhoneNumber2.bind(this)} value={this.state.secondaryhospitaldetails.phonenumber} />

            <p className="stepTxt">Tertiary Details</p>
            <TextField id="hospName3" type="text" name="Hospital Name 3" label="Hospital Name 3" fullWidth  className="overwriteLabel" onChange={this.handleChangeHospitalName3.bind(this)} value={this.state.tertiaryhospitaldetails.name} />
            <TextField id="hospAddress3" type="text" name="Hospital Address 3" label="Address 3" fullWidth  className="overwriteLabel" onChange={this.handleChangeHospitalAddress3.bind(this)} value={this.state.tertiaryhospitaldetails.address} />
            <TextField id="hospContact3" type="text" name="Hospital Phone 3" label="Phone 3" fullWidth  className="overwriteLabel" onChange={this.handleChangeHospitalPhoneNumber3.bind(this)} value={this.state.tertiaryhospitaldetails.phonenumber} />
          </form>
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
  return {
    information: state.doctorDetailsForm.information
  }
};

export default connect(mapStateToProps)(Step4);