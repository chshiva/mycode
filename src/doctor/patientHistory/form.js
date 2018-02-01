import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InputIcon from 'material-ui-icons/Input';
import Avatar from 'material-ui/Avatar';
import css from './patienthistory.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

const styles = {
};

export default class PatientHistory extends Component {
  constructor (props){
  super (props);
    this.state = {anchorEl: null, open: false, value: 0,};
  }

  menuOpen = event => {
    this.setState({ open: true , anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

handleChange = (event, value) => {
    this.setState({ value });
  };


  render(){
    const { value } = this.state;
  return (
    <div>
      <div className="patientDataViewBlock">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h2 className="headlineRegular">Patient History</h2>
              <div className="cardListBox">
                <div className="cardBlock">
                    <Grid container spacing={24}>
                      <Grid item xs={12} md={6}>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Health Inputs</h2>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Viutals: saystolic BP</span>
                                  <span className="span50 txtVal">FB-605/A1</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Viutals: diastolic BP</span>
                                  <span className="span50 txtVal">Lane No 35</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Pulse Rate:</span>
                                  <span className="span50 txtVal">Sri Divya Santoshini Homes</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Height (cms):</span>
                                  <span className="span50 txtVal">Gayatrinagar, Allapur Road</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Weight (kgs):</span>
                                  <span className="span50 txtVal">Hyderabad</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">BMI:</span>
                                  <span className="span50 txtVal">Telangana</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Treatments:</span>
                                  <span className="span50 txtVal">India</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Immunisation Details</h2>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Name:</span>
                                  <span className="span50 txtVal">FB-605/A1</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Phone:</span>
                                  <span className="span50 txtVal">Lane No 35</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Relationship:</span>
                                  <span className="span50 txtVal">Sri Divya Santoshini Homes</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Address:</span>
                                  <span className="span50 txtVal">Gayatrinagar, Allapur Road</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Family History</h2>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Parent Name:</span>
                                  <span className="span50 txtVal">FB-605/A1</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Age:</span>
                                  <span className="span50 txtVal">Lane No 35</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Relationship:</span>
                                  <span className="span50 txtVal">Sri Divya Santoshini Homes</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Reference ID:</span>
                                  <span className="span50 txtVal">Gayatrinagar, Allapur Road</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Description:</span>
                                  <span className="span50 txtVal">Hyderabad</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">File Attached</span>
                                  <span className="span50 txtVal">Telangana</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="whitePaper">
                          <div className="paperHeader">
                            <h2 className="paperHedingTxt">Insurance &amp; Donor Status</h2>
                          </div>
                          <div className="paperBody">
                            <div className="infoInlineBlock">
                              <ul>
                                <li>
                                  <span className="span50 txtProp">Organ Donor Status:</span>
                                  <span className="span50 txtVal">FB-605/A1</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Insurance Status:</span>
                                  <span className="span50 txtVal">Lane No 35</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Insurance Provider:</span>
                                  <span className="span50 txtVal">Sri Divya Santoshini Homes</span>
                                </li>
                                <li>
                                  <span className="span50 txtProp">Insurance Policy Number:</span>
                                  <span className="span50 txtVal">Gayatrinagar, Allapur Road</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                </div>
              </div>
          </Grid>        
        </Grid>
      </div>
    </div>
  );
}
};

