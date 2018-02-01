import React, { Component } from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import css from './medicalform.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import lodash from 'lodash';
import { setStepError } from './actions';
import { connect } from 'react-redux';
import { validateMobile } from '../../commons/validationmethods'

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencycontact: {
        name: "",
        mobilenumber: "",
        relationship: "",
        address: ""
      },
      emergencycontacts: [],
      length: 2,
      stepIndex: 3
    };

    this.handleSubmitStep = this.handleSubmitStep.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.emergencycontact && nextProps.emergencycontact.length > 0) {
      this.setState({
        emergencycontacts: nextProps.emergencycontact
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.emergencycontact && this.props.emergencycontact.length > 0) {
      this.setState({
        emergencycontacts: this.props.emergencycontact
      });
    } else {
      var emergencycontacts = [];
      for (var i = 0; i < this.state.length; i++) {
        emergencycontacts.push(this.state.emergencycontact);
      }
      this.setState({ emergencycontacts: emergencycontacts });
    }
  }

  handleChangeName(index, e) {
    var emergencycontacts = this.state.emergencycontacts;
    var item = lodash.cloneDeep(this.state.emergencycontacts[index]);
    item.name = e.target.value;
    this.state.emergencycontacts[index] = item;
    this.setState({ emergencycontacts: emergencycontacts });
  }

  handleChangeMobileNumber(index, e) {
    var emergencycontacts = this.state.emergencycontacts;
    var item = lodash.cloneDeep(this.state.emergencycontacts[index]);
    item.mobilenumber = e.target.value;
    this.state.emergencycontacts[index] = item;
    this.setState({ emergencycontacts: emergencycontacts });
  }

  handleChangeRelationship(index, e) {
    var emergencycontacts = this.state.emergencycontacts;
    var item = lodash.cloneDeep(this.state.emergencycontacts[index]);
    item.relationship = e.target.value;
    this.state.emergencycontacts[index] = item;
    this.setState({ emergencycontacts: emergencycontacts });
  }

  handleChangeAddress(index, e) {
    var emergencycontacts = this.state.emergencycontacts;
    var item = lodash.cloneDeep(this.state.emergencycontacts[index]);
    item.address = e.target.value;
    this.state.emergencycontacts[index] = item;
    this.setState({ emergencycontacts: emergencycontacts });
  }

  handleSubmitStep(e) {
    console.log("handleSubmitSte 3 ", this.state);
    var formErrorMessage = "";
    this.props.dispatch(setStepError(formErrorMessage));
    this.state.emergencycontacts.forEach(item => {
      if (item.name == "") formErrorMessage = "Name Should Not be Empty";
      else if(item.mobilenumber == "") formErrorMessage = "Mobile Number Should Not be Empty";
      else if (!validateMobile(item.mobilenumber)) formErrorMessage = "Please Enter a  Valid Mobile Number"
      else if (item.relationship == "") formErrorMessage = "Relationship Should Not be Empty";
      else if (item.address == "") formErrorMessage = "Address Should Not be Empty"; 
    });
    // else if (!validateMobile(this.state.alternatemobilenumber)) formErrorMessage = "Please Enter a  Valid Alternative Mobile Number"
    if (!formErrorMessage == "") {
      this.props.dispatch(setStepError(formErrorMessage));
    } else {
      e.preventDefault();
      console.log("handleSubmitStep 3 ", this.state);
      this.props.handleNext(this.state.emergencycontacts, 3);
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
        <h2 className="h2">4. Emergency Contact</h2>

        {this.state.emergencycontacts.map((item, i) => {
          return (
            <div key={i}>
              <p className="stepTxt">Emergency Contact {i + 1}</p>
              <TextField id="emergencyName" type="text" name="Name" value={item.name} label="Name" fullWidth className="overwriteLabel" onChange={this.handleChangeName.bind(this, i)} />

              <TextField id="secondaryContact" type="text" name="Phone" value={item.mobilenumber} label="Phone" fullWidth className="overwriteLabel" onChange={this.handleChangeMobileNumber.bind(this, i)} />

              <TextField id="relation" type="text" name="Relationship" value={item.relationship} label="Relationship" fullWidth className="overwriteLabel" onChange={this.handleChangeRelationship.bind(this, i)} />

              <TextField id="secondaryAddress" type="text" name="Address" value={item.address} label="Address" fullWidth className="overwriteLabel" onChange={this.handleChangeAddress.bind(this, i)} />
            </div>
          )
        })}
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
  return {}
};

export default connect(mapStateToProps)(Step4);