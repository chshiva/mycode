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
import PPL_Select from '../../commons/PPLSelect';
import {setStepError} from './actions';

const styles = theme => ({
  formControl: {
    minWidth: 120,
  },
  selectWidth: {
    minWidth: '50%'
  }
});

class Step2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "stepIndex": 1,
      "doornumber": "",
      "streetname": "",
      "appartmentname": "",
      "area": "",
      "cityid": "",
      "stateid": "",
      "countryid": ""
    };

    this.handleChangeDoornumber = this.handleChangeDoornumber.bind(this);
    this.handleChangeStreetname = this.handleChangeStreetname.bind(this);
    this.handleChangeAppartmentName = this.handleChangeAppartmentName.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeCityId = this.handleChangeCityId.bind(this);
    this.handleChangeStateId = this.handleChangeStateId.bind(this);
    this.handleChangeCountryId = this.handleChangeCountryId.bind(this);

    this.handleClickCity = this.handleClickCity.bind(this);
    this.handleClickState = this.handleClickState.bind(this);



    this.handleSubmitStep = this.handleSubmitStep.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.address) {
      this.setState({
        area: this.props.address.area,
        countryid: parseInt(this.props.address.countryid),
        stateid: parseInt(this.props.address.stateid),
        cityid: parseInt(this.props.address.cityid),
        appartmentname: this.props.address.appartmentname,
        streetname: this.props.address.streetname,
        doornumber: this.props.address.doornumber
      });
    } else {
      console.log('make api call and get data');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      this.setState({
        area: nextProps.address.area,
        countryid: parseInt(nextProps.address.countryid),
        stateid: parseInt(nextProps.address.stateid),
        cityid: parseInt(nextProps.address.cityid),
        appartmentname: nextProps.address.appartmentname,
        streetname: nextProps.address.streetname,
        doornumber: nextProps.address.doornumber
      });
    }
  }

  handleChangeDoornumber(e) {
    this.setState({ doornumber: e.target.value });
  }

  handleChangeStreetname(e) {
    this.setState({ streetname: e.target.value });
  }

  handleChangeAppartmentName(e) {
    this.setState({ appartmentname: e.target.value });
  }

  handleChangeArea(e) {
    this.setState({ area: e.target.value });
  }

  handleChangeCityId(id) {
    this.props.dispatch(setStepError(null));
    this.setState({ cityid: id });
  }

  handleChangeStateId(id) {
    this.props.dispatch(setStepError(null));
    this.setState({ stateid: id, cityid: null });
  }

  handleChangeCountryId(id) {
    this.props.dispatch(setStepError(null));
    this.setState({ countryid: id, stateid: null, cityid: null });
  }


  handleClickState() {
    if (this.state.countryid == "" || this.state.countryid == null) {
      var formErrorMessage = "Please Select Country";
      this.props.dispatch(setStepError(formErrorMessage));
    }
  }

  handleClickCity() {
    if (this.state.stateid == "" || this.state.stateid == null) {
      var formErrorMessage = "Please Select State";
      this.props.dispatch(setStepError(formErrorMessage));
    }
  }

  handleSubmitStep(e) {
    var formErrorMessage = "";
    this.props.dispatch(setStepError(formErrorMessage));

    if (this.state.doornumber == "") formErrorMessage = "Door Number Should Not be Empty";
    else if (this.state.streetname == "") formErrorMessage = "Street Name Should Not be Empty";
    else if (this.state.appartmentname == "") formErrorMessage = "Appartment Name Should Not be Empty";
    else if (this.state.area == "") formErrorMessage = "Area Should Not be Empty";
    else if (this.state.cityid == "") formErrorMessage = "City Should Not be Empty";
    else if (this.state.stateid == "") formErrorMessage = "State Should Not be Empty";
    else if (this.state.countryid == "") formErrorMessage = "Country Should Not be Empty";


    if (!formErrorMessage == "") {
      this.props.dispatch(setStepError(formErrorMessage));
    } else {
      e.preventDefault();
      console.log("handleSubmitStep 1 ", this.state);
      this.props.handleNext(this.state, 1);
    }
  }

  handlePreviousStep(e) {
    e.preventDefault();
    console.log("handlePreviousStep ", this.state.stepIndex);
    this.props.handlePrevious(this.state, this.state.stepIndex);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="stepContent">
        <h2 className="h2">2. Address</h2>

        <TextField id="DoorNumber" type="text" name="Door Number" value={this.state.doornumber} label="Door Number" fullWidth className="overwriteLabel" onChange={this.handleChangeDoornumber} />

        <TextField id="StreetName" type="text" name="Street Name" value={this.state.streetname} label="Street Name" fullWidth className="overwriteLabel" onChange={this.handleChangeStreetname} />

        <TextField id="ApartmentName" type="text" name="Apartment Name/Locality Name" value={this.state.appartmentname} label="Apartment Name/Locality Name" fullWidth className="overwriteLabel" onChange={this.handleChangeAppartmentName} />

        <div className="textFieldBreak">
          <TextField id="Area" type="text" name="Area" label="Area" value={this.state.area} className="textItemBlock" onChange={this.handleChangeArea} />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="country">Country</InputLabel>
            <PPL_Select className="overwriteLabel" value={this.state.countryid} onChange={this.handleChangeCountryId} placeholder="Country" api="countries" keyValue="id" nameValue="name" />
          </FormControl>
        </div>

        <div className="textFieldBreak">
          <FormControl className={classes.selectWidth} onClick={this.handleClickState}>
            <InputLabel htmlFor="state">State</InputLabel>
            <PPL_Select className="textItemBlock" value={this.state.stateid} onChange={this.handleChangeStateId} placeholder="State" api="states" keyValue="id" nameValue="name" data={this.state.countryid} isParam={true} autoWidth={true} />
          </FormControl>
          <FormControl className={classes.selectWidth} onClick={this.handleClickCity}>
            <InputLabel htmlFor="city">City</InputLabel>
            <PPL_Select className="overwriteLabel" value={this.state.cityid} onChange={this.handleChangeCityId} placeholder="City" api="cities" keyValue="id" nameValue="name" data={this.state.stateid} isParam={true} autoWidth={true} />
          </FormControl>
        </div>

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
    address: state.doctorDetailsForm.address
  }
};

export default connect(mapStateToProps)(withStyles(styles)(Step2));