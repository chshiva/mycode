import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import css from './medicalform.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { setStepError } from './actions';
import { connect } from 'react-redux';

class Step5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 4,
      organdonarstatus:"",
      insurance:{
        status:"",
        provider:"",
        policynumber:""
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.insurancedonarstatus) {
      this.setState({
        organdonarstatus: nextProps.insurancedonarstatus.organdonarstatus,
        insurance: nextProps.insurancedonarstatus.insurance
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.insurancedonarstatus) {
      this.setState({
        organdonarstatus: this.props.insurancedonarstatus.organdonarstatus,
        insurance: this.props.insurancedonarstatus.insurance
      });
    }
  }

  handleChangeOrganDonarStatus(e){
    this.setState({organdonarstatus:e.target.value});
  }

  handleChangeInsuranceStatus(e){
    var insurance = this.state.insurance;
    insurance.status = e.target.value;
    this.setState({insurance:insurance});
  }

  handleChangeInsuranceProvider(e){
    var insurance = this.state.insurance;
    insurance.provider = e.target.value;
    this.setState({insurance:insurance});
  }

  handleChangeInsurancePolicyNumber(e){
    var insurance = this.state.insurance;
    insurance.policynumber = e.target.value;
    this.setState({insurance:insurance});
  }

  handleSubmit(e) {
    console.log("handleSubmitSte 4 ", this.state);
    this.props.handleNext(this.state, 4);
  }

  handlePreviousStep(e) {
    e.preventDefault();
    console.log("handlePreviousStep ", this.state.stepIndex);
    this.props.handlePrevious(this.state, this.state.stepIndex);
  }

	render () {
		return (
			<div className="stepContent">
        <h2 className="h2">5. Insurance &amp; Donor Status</h2>
        <TextField id="donorStatus" type="text" name="Organ Donor Status" label="Organ Donor Status" fullWidth  className="overwriteLabel" onChange={this.handleChangeOrganDonarStatus.bind(this)} value={this.state.organdonarstatus}/>

        <TextField id="insuranceStatus" type="text" name="Insurance Status" label="Insurance Status" fullWidth  className="overwriteLabel" onChange={this.handleChangeInsuranceStatus.bind(this)} value={this.state.insurance.status}/>
        
        <TextField id="insuranceProvider" type="text" name="Insurance Provider" label="Insurance Provider" fullWidth  className="overwriteLabel" onChange={this.handleChangeInsuranceProvider.bind(this)} value={this.state.insurance.provider}/>
        
        <TextField id="policyNumber" type="text" name="Insurance Policy Number" label="Insurance Policy Number" fullWidth  className="overwriteLabel" onChange={this.handleChangeInsurancePolicyNumber.bind(this)} value={this.state.insurance.policynumber}/>
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

export default connect(mapStateToProps)(Step5);