import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import css from './addPrescription.css';
import Select from 'material-ui/Select';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormGroup, FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions, } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Close from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import AddBox from 'material-ui-icons/AddBox';
import IndeterminateCheckBox from 'material-ui-icons/IndeterminateCheckBox';
const styles = {
};

class AddPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, open: false, age: '', expanded: 'panel1', morning: undefined, afternoon: undefined, night: undefined, addPanel: [''] };
  }
  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

  dayCount = name => event => {
    this.setState({ [name]: event.target.value });
  };

  doseTime = name => (event, checked) => {
    this.setState({ [name]: checked });
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  handleMorningSelect = event => {
    this.setState({ morning: event.target.value });
  };
  handleAfternoonSelect = event => {
    this.setState({ afternoon: event.target.value });
  };
  handleNightSelect = event => {
    this.setState({ night: event.target.value });
  };

  addMedicine = (e) => {
    let oldAddPanel = this.state.addPanel;
    oldAddPanel.push('');
    this.setState({ addPanel: oldAddPanel });
  }

  removePanel(index, e) {
    console.log('index==', index);
    const oldAddPanel = this.state.addPanel
    oldAddPanel.splice(index, 1);
    this.setState({ addPanel: oldAddPanel });
  }

  render() {
    console.log('this.state.addPanel======', this.state.addPanel);
    const { expanded } = this.state;
    return (

      <div>
        <div className="expansionsBlock">
          {this.state.addPanel && this.state.addPanel.length > 0 ?

            this.state.addPanel.map((data, index) => {
              return (
                <div className="prescPanel" key={index}>
                  <ExpansionPanel className="expandedBox" onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Grid container spacing={24}>
                        <Grid item xs={12} md={12}>
                          <div>
                            <Typography className="expandHeading">Prescription {index + 1}</Typography>
                            {/*<Button dense><Close />Remove</Button>*/}
                          </div>
                        </Grid>
                      </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="detailsBox">
                      <Grid container spacing={24}>
                        <Grid item xs={12} md={12}>
                          <TextField autoFocus id="name" className="overwriteLabel" label="Medication Name" type="text" fullWidth />
                          <div className="textFieldBreak">
                            <FormControl className="textItemBlock" >
                              <InputLabel htmlFor="strength">Strength</InputLabel>
                              <Input id="adornment-weight" endAdornment={<InputAdornment position="end">mg</InputAdornment>} />
                            </FormControl>
                            <FormControl className="overwriteLabel">
                              <InputLabel htmlFor="age-native-simple" >Dose (Day's)</InputLabel>
                              <Select className="selectWidth" native value={this.state.age} onChange={this.dayCount('age')} input={<Input id="age-native-simple" />}
                              >
                                <option value="" />
                                <option value={10}>1</option>
                                <option value={20}>2</option>
                                <option value={30}>3</option>
                                <option value={40}>4</option>
                                <option value={50}>5</option>
                                <option value={60}>6</option>
                                <option value={70}>7</option>
                                <option value={80}>8</option>
                                <option value={90}>9</option>
                                <option value={90}>10</option>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="textFieldBreak">
                            <p className="textItemBlock">NDC: </p>
                            <div className="ndcBlock">
                              <div className="ndcItem"><TextField id="otpOne" type="text" name="optone" className="overwriteLabel" /></div>
                              <div className="ndcItem"><TextField id="otpOne" type="text" name="optone" className="overwriteLabel" /></div>
                              <div className="ndcItem"><TextField id="otpOne" type="text" name="optone" className="overwriteLabel" /></div>
                            </div>
                          </div>
                          <div className="textFieldBreak">
                            <FormControl className="textItemBlock" component="fieldset">
                              <FormGroup >
                                <FormControlLabel
                                  control={<Checkbox checked={this.state.Morning} onChange={this.doseTime('Morning')} value="Morning" />}
                                  label="Morning" />
                                <RadioGroup checked={this.state.morning === 'B'} onChange={this.handleMorningSelect} value={this.state.morning} name="Morning" aria-label="A">
                                  <FormControlLabel value="AfterFood" control={<Radio />} label="After Food" />
                                  <FormControlLabel value="BeforeFood" control={<Radio />} label="Before Food" />
                                </RadioGroup>
                              </FormGroup>
                            </FormControl>
                            <FormControl className="textItemBlock" component="fieldset">
                              <FormGroup >
                                <FormControlLabel
                                  control={<Checkbox checked={this.state.Afternoon} onChange={this.doseTime('Afternoon')} value="Afternoon" />}
                                  label="Afternoon"
                                />
                                <RadioGroup checked={this.state.morning === 'B'} onChange={this.handleAfternoonSelect} value={this.state.afternoon} name="Afternoon" aria-label="A">
                                  <FormControlLabel value="AfterFood" control={<Radio />} label="After Food" />
                                  <FormControlLabel value="BeforeFood" control={<Radio />} label="Before Food" />
                                </RadioGroup>
                              </FormGroup>
                            </FormControl>
                            <FormControl className="overwriteLabel" component="fieldset">
                              <FormGroup >
                                <FormControlLabel
                                  control={<Checkbox checked={this.state.Night} onChange={this.doseTime('Night')} value="Night" />}
                                  label="Night" />
                                <RadioGroup checked={this.state.morning === 'B'} onChange={this.handleNightSelect} value={this.state.night} name="Night" aria-label="A">
                                  <FormControlLabel value="AfterFood" control={<Radio />} label="After Food" />
                                  <FormControlLabel value="BeforeFood" control={<Radio />} label="Before Food" />
                                </RadioGroup>
                              </FormGroup>
                            </FormControl>
                          </div>
                          <TextField fullWidth label="Instructions" multiline className="overwriteLabel" /><br />
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <div className="removePanel">
                    <IconButton onClick={this.removePanel.bind(this, index)} ><IndeterminateCheckBox /></IconButton>
                  </div>
                </div>
              );
            })
            :
            null
          }
          <Button raised color="primary" onClick={this.addMedicine}>
            <span className="addIconTxt" > Add another Field</span>
          </Button>
        </div>
      </div>
    );
  }
};



const mapStateToProps = function (state) {
  return {}
}
export default connect(mapStateToProps)(AddPrescription);