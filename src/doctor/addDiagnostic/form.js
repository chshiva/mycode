import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form'
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import AccountCircle from 'material-ui-icons/AccountCircle';
import Grid from 'material-ui/Grid';

import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';


import css from './addDiagnostic.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions,} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Close from 'material-ui-icons/Close';
import AddBox from 'material-ui-icons/AddBox';
import IndeterminateCheckBox from 'material-ui-icons/IndeterminateCheckBox';
import { connect } from 'react-redux';

const styles = {
  formControl: {
    minWidth: '100%',
  },
};

class DiagnosticReports extends Component {
  constructor (props){
    super (props);
    this.state = {anchorEl: null, open: false, expanded: 'panel1', multiline: 'Controlled', diagnosis: '', addPanel:['']};
  }
  
  handleExpand = panel => (event, expanded) => {
    this.setState({expanded: expanded ? panel : false,});
  };

  handleChange = event => {
    this.setState({ diagnosis: event.target.value });
  };

  menuOpen = event => {
    this.setState({ open: true , anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

  addMedicine = (e) => {
    let oldAddPanel = this.state.addPanel;
     oldAddPanel.push('');
     this.setState({ addPanel: oldAddPanel });
  }

  removePanel(index,e){
    console.log('index==',index);
     const oldAddPanel = this.state.addPanel
     oldAddPanel.splice(index,1);
     this.setState({ addPanel: oldAddPanel });
  }


  render(){
    const { classes } = this.props;
    const { expanded } = this.state;
  return (
    <div>
      <div className="expansionsBlock">
        { this.state.addPanel &&  this.state.addPanel.length > 0 ?

          this.state.addPanel.map((data,index) => {
            return(
              <div className="prescPanel" key={index}>
                <ExpansionPanel className="expandedBox"  onChange={this.handleExpand('panel1')}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={24}>
                      <Grid item xs={12} md={12}>
                      <div>
                        <Typography className="expandHeading">Diagnosis {index +1 }</Typography>
                      </div>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="detailsBox">
                    <Grid container spacing={24}>
                      <Grid item xs={12} md={12}>
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="diagnosis" >Diagnosis</InputLabel>
                          <Select className="overwriteLabel" value={this.state.diagnosis}
                            onChange={this.handleChange} input={<Input name="diagnosis" id="diagnosis" />}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={"Bloodtests"}>Blood tests</MenuItem>
                            <MenuItem value={"Colonoscopy"}>Colonoscopy</MenuItem>
                            <MenuItem value={"CBC"}>Complete Blood Count (CBC)</MenuItem>
                            <MenuItem value={"CT"}>Computed Tomography (CT) Scan </MenuItem>
                            <MenuItem value={"EKG"}>Electrocardiogram (EKG or ECG)</MenuItem>
                            <MenuItem value={"EUS"}>Endoscopic Ultrasound Scan (EUS)</MenuItem>
                            <MenuItem value={"MRI"}>Magnetic resonance imaging (MRI)</MenuItem>
                            <MenuItem value={"Mammography"}>Mammography</MenuItem>
                            <MenuItem value={"PET"}> Positron Emission Tomography (PET) scan</MenuItem>
                            <MenuItem value={"PSA"}>Prostate Specific Antigen (PSA Test)</MenuItem>
                            <MenuItem value={"UltrasoundUltra"}>Ultrasound</MenuItem>
                            <MenuItem value={"Xrays"}>X-rays</MenuItem>
                          </Select>
                        </FormControl>
                        {/*<TextField fullWidth label="Details" placeholder="Write Notes..." multiline rows="4" />*/}
                        <FormControl className={classes.formControl}>
                          <InputLabel>Details</InputLabel>
                          <TextField className="textArea" fullWidth label="Notes :" placeholder="Write Notes..." multiline rows="4"/> 
                        </FormControl>
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
{/*<div className="diagnoPanel">
                <Card className="cardSelect" key={index}>
                  <CardHeader className="yearTxt" title="Diagnosis {index +1 }" />
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <div className="cardB">
                          <div className="select">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="diagnosis">Diagnosis</InputLabel>
                                <Select value={this.state.diagnosis}
                                  onChange={this.handleChange} input={<Input name="diagnosis" id="diagnosis" />}>
                                  <MenuItem value=""><em>None</em></MenuItem>
                                  <MenuItem value={"Mr"}>Mr</MenuItem>
                                  <MenuItem value={"Mrs"}>Mrs</MenuItem>
                                  <MenuItem value={"Ms"}>Ms</MenuItem>
                                  <MenuItem value={"Prof"}>Prof</MenuItem>
                                  <MenuItem value={"Adm"}>Adm</MenuItem>
                                  <MenuItem value={"Capt"}>Capt</MenuItem>
                                  <MenuItem value={"Chief"}>Chief</MenuItem>
                                  <MenuItem value={"Cmdr"}>Cmdr</MenuItem>
                                  <MenuItem value={"Dean"}>Dean</MenuItem>
                                  <MenuItem value={"Dr"}>Dr</MenuItem>
                                  <MenuItem value={"Gen"}>Gen</MenuItem>
                                  <MenuItem value={"Gov"}>Gov</MenuItem>
                                  <MenuItem value={"Hon"}>Hon</MenuItem>
                                  <MenuItem value={"Maj"}>Maj</MenuItem>
                                </Select>
                              </FormControl>
                          </div>
                          <div className="selectTxt">
                            <TextField id="multiline-flexible" placeholder="Write Notes..." label="Details" multiline fullWidth />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                </Card>
                <div className="removePanel">
                  <IconButton onClick={this.removePanel.bind(this, index)} ><IndeterminateCheckBox /></IconButton>
                </div>
                </div>*/}


/** Map the state to props. */
const mapStateToProps = function (state) {
  return { }
};

export default connect(mapStateToProps)(withStyles(styles)(DiagnosticReports));