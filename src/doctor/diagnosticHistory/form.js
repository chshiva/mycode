import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import css from './reports.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';

const styles = {

};

class DiagnosticHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, open: false, };
  }

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className="reportsBlock">
        <div className="patInfoBlock">
          <div className="avacircle48">
            <img src="/public/images/doctorl1.jpeg" alt="doctor" />
          </div>
          <div className="ptnDetails">
            <h2 className="ptnName">Patient Name</h2>
            <p className="callTxt">Male - <span>32 years</span></p>
          </div>
        </div>
        <Card className="cardBtmSpace">
          <div className="dCardHeadline">September 14, 2016</div>
          <Grid container spacing={24}>
            <Grid item xs={12} md={5}>
              <CardHeader
                avatar={
                  <Avatar alt="user one" src="/public/images/user.jpeg" className="" />
                }

                title="Dr. John Williams"
                subheader="Call Duration: 10:00 min"
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <CardContent className="reportCardContent">
                <h2 className="reportHeadlineTxt">
                  Diagnostic Reports
                        </h2>
                <List className="reportList">
                  <ListItemText className="reportListItem" primary="Blood Test" />
                  <ListItemText className="reportListItem" primary="X-Ray" />
                  <ListItemText className="reportListItem" primary="Scans" />
                </List>
              </CardContent>
            </Grid>
          </Grid>
          <CardActions>
            <Button color="primary">Summary</Button>
            <Button color="primary">Prescription</Button>
          </CardActions>
        </Card>
        <Card className="cardBtmSpace">
          <div className="dCardHeadline">September 14, 2016</div>
          <Grid container spacing={24}>
            <Grid item xs={12} md={5}>
              <CardHeader
                avatar={
                  <Avatar alt="user one" src="/public/images/doctorl1.jpeg" className="" />
                }

                title="Dr. Mary Jones"
                subheader="Call Duration: 10:00 min"
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <CardContent>
                <h2 className="reportHeadlineTxt">
                  Diagnostic Reports
                        </h2>
                <List className="reportList">
                  <ListItemText className="reportListItem" primary="Blood Test" />
                  <ListItemText className="reportListItem" primary="X-Ray" />
                  <ListItemText className="reportListItem" primary="Scans" />
                </List>
              </CardContent>
            </Grid>
          </Grid>
          <CardActions>
            <Button color="primary">Summary</Button>
            <Button color="primary">Prescription</Button>
          </CardActions>
        </Card>
        <Card className="cardBtmSpace">
          <div className="dCardHeadline">September 14, 2016</div>
          <Grid container spacing={24}>
            <Grid item xs={12} md={5}>
              <CardHeader
                avatar={
                  <Avatar alt="user one" src="/public/images/doctorl2.jpeg" className="" />
                }

                title="Dr. Rosy Smith"
                subheader="Call Duration: 10:00 min"
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <CardContent>
                <h2 className="reportHeadlineTxt">
                  Diagnostic Reports
                        </h2>
                <List className="reportList">
                  <ListItemText className="reportListItem" primary="Blood Test" />
                  <ListItemText className="reportListItem" primary="X-Ray" />
                  <ListItemText className="reportListItem" primary="Scans" />
                </List>
              </CardContent>
            </Grid>
          </Grid>
          <CardActions>
            <Button color="primary">Summary</Button>
            <Button color="primary">Prescription</Button>
          </CardActions>
        </Card>
        <Card className="cardBtmSpace">
          <div className="dCardHeadline">September 14, 2016</div>
          <Grid container spacing={24}>
            <Grid item xs={12} md={5}>
              <CardHeader
                avatar={
                  <Avatar alt="user one" src="/public/images/doctorm1.jpeg" className="" />
                }

                title="Dr. Steve"
                subheader="Call Duration: 10:00 min"
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <CardContent>
                <h2 className="reportHeadlineTxt">
                  Diagnostic Reports
                        </h2>
                <List className="reportList">
                  <ListItemText className="reportListItem" primary="Blood Test" />
                  <ListItemText className="reportListItem" primary="X-Ray" />
                  <ListItemText className="reportListItem" primary="Scans" />
                </List>
              </CardContent>
            </Grid>
          </Grid>
          <CardActions>
            <Button color="primary">Summary</Button>
            <Button color="primary">Prescription</Button>
          </CardActions>
        </Card>
      </div>

    );
  }
};

const mapStateToProps = function (state) {
  return {}
}
export default connect(mapStateToProps)(DiagnosticHistory);