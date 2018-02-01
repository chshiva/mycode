import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { setStepError } from './actions';
import { validateEmail, validateMobile, validateLandline} from '../../commons/validationmethods'

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "stepIndex": 2,
      "alternateemail": "",
      "homelandline": "",
      "worklandline": "",
      "alternatemobilenumber": "",
      "occupation": ""
    };

    this.handleChangeAlternateEmail = this.handleChangeAlternateEmail.bind(this);
    this.handleChangeHomeLandline = this.handleChangeHomeLandline.bind(this);
    this.handleChangeWorkLandLine = this.handleChangeWorkLandLine.bind(this);
    this.handleChangeAlternateMobileNumber = this.handleChangeAlternateMobileNumber.bind(this);
    this.handleChangeOccupation = this.handleChangeOccupation.bind(this);

    this.handleSubmitStep = this.handleSubmitStep.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alternatecontactdetails) {
      this.setState({
        alternateemail: nextProps.alternatecontactdetails.alternateemail,
        homelandline: nextProps.alternatecontactdetails.homelandline,
        worklandline: nextProps.alternatecontactdetails.worklandline,
        alternatemobilenumber: nextProps.alternatecontactdetails.alternatemobilenumber,
        occupation: nextProps.alternatecontactdetails.occupation
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.alternatecontactdetails) {
      this.setState({
        alternateemail: this.props.alternatecontactdetails.alternateemail,
        homelandline: this.props.alternatecontactdetails.homelandline,
        worklandline: this.props.alternatecontactdetails.worklandline,
        alternatemobilenumber: this.props.alternatecontactdetails.alternatemobilenumber,
        occupation: this.props.alternatecontactdetails.occupation
      });
    } else {
      console.log('make api call and get data');
    }
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

  handleChangeOccupation(e) {
    this.setState({ occupation: e.target.value });
  }

  handleSubmitStep(e) {
    var formErrorMessage = "";
    this.props.dispatch(setStepError(formErrorMessage));

    if (this.state.alternateemail == "") formErrorMessage = "Alternate Email Address Should Not be Empty";
    else if (!validateEmail(this.state.alternateemail)) formErrorMessage = "Please Enter a  Valid Alternative Email"
    else if (this.state.homelandline == "") formErrorMessage = "Home Landline Should Not be Empty";
    else if (!validateLandline(this.state.homelandline)) formErrorMessage = "Please Enter a  Valid Home Landline";    
    else if (this.state.worklandline == "") formErrorMessage = "Work Landline Name Should Not be Empty";
    else if (!validateLandline(this.state.worklandline)) formErrorMessage = "Please Enter a  Valid Work Landline";        
    else if (this.state.alternatemobilenumber == "") formErrorMessage = "Alternate Mobile Number Should Not be Empty";
    else if (!validateMobile(this.state.alternatemobilenumber)) formErrorMessage = "Please Enter a  Valid Alternative Mobile Number"
    
    else if (this.state.occupation == "") formErrorMessage = "Occupation Should Not be Empty";
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

  render() {
    return (
      <div className="stepContent">
        <h2 className="h2">3. Email & Phone</h2>

        <TextField id="AltEmail" type="email" name="Alternate Email" value={this.state.alternateemail} label="Alternate Email" fullWidth className="overwriteLabel" onChange={this.handleChangeAlternateEmail} />

        <div className="textFieldBreak">
          <TextField id="landline" type="text" name="Landline(Home)" value={this.state.homelandline} label="Landline(Home)" fullWidth className="textItemBlock" onChange={this.handleChangeHomeLandline} />
          <TextField id="work" type="text" name="Landline(Work)" value={this.state.worklandline} label="Landline(Work)" fullWidth className="overwriteLabel" onChange={this.handleChangeWorkLandLine} />
        </div>

        <TextField id="mobile" type="text" name="Alternate Mobile" value={this.state.alternatemobilenumber} label="Alternate Mobile" fullWidth className="overwriteLabel" onChange={this.handleChangeAlternateMobileNumber} />

        <TextField id="occupation" type="text" name="Occupation" value={this.state.occupation} label="Occupation" fullWidth className="overwriteLabel" onChange={this.handleChangeOccupation} />

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
  return { }
};

export default connect(mapStateToProps)(Step3);