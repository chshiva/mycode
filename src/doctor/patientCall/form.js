import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { withStyles } from 'material-ui/styles';
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
import css from './patientcall.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';

const styles = {


};

class PatientCall extends Component {
  state = { anchorEl: null, open: false, };

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>
        <AppBar position="fixed">
          <Toolbar>
            <Hidden xsUp >
              <IconButton aria-label="Menu" className="menuButtonTop">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">
              <div className="whiteLogo">
                <img src="/public/images/logo/netikWhiteLogo.png" alt="Logo" />
              </div>
            </Typography>

            <Hidden xsUp >
              <Button flat aria-owns={this.state.open ? 'simple-menu' : null} aria-haspopup="true" onClick={this.menuOpen}>
                <span className="whiteTxt">Doctor</span>
                <ArrowDropDown className="arrowDownIcon" />
                <Avatar alt="Remy Sharp" src="/public/images/black-icons/avatar.png" className="avatarImg" />
              </Button>
              <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open}
                onClose={this.menuClose} className="dropdDown" >
                <MenuItem onClick={this.menuClose}>Profile</MenuItem>
                <MenuItem onClick={this.menuClose}>My Account</MenuItem>
                <MenuItem onClick={this.menuClose}>Settings</MenuItem>
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Hidden xsUp >
          <div className="leftNavBlock">
            <List>
              <ListItem button>
                <div className="leftNavIcon">
                  <img src="/public/images/black-icons/dashboard.png" alt="page icon" />
                </div>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <div className="leftNavIcon">
                  <img src="/public/images/black-icons/medical-records.png" alt="page icon" />
                </div>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button>
                <div className="leftNavIcon">
                  <img src="/public/images/black-icons/medical-pre.png" alt="page icon" />
                </div>
                <ListItemText primary="My Patients" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon><InputIcon /></ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </List>
          </div>
        </Hidden>
        <div className="patientCallContainer">
          <Grid container spacing={24} >
            <Grid item xs={12} md={12}>
              <div className="rippleContainer">
                <div className="rippleBlock">
                  <div className="">
                    <div className="circleRipple">
                      <img src="/public/images/white-icons/doctor-white.png" alt="doctor" />
                    </div>
                  </div>
                </div>
                <div className="rippleHealdline">
                  <h2 className="rippleheadlineTxt">Incoming Call from a Patient!</h2>
                  <div className="bufferBlock">
                    <h3 className="bufferCount">10 min</h3>
                    <CircularProgress className="" size={80} mode="determinate" value={100} min={0} max={100} />
                  </div>
                </div>
                <div className="callBtmBtm">
                  <Button id="acceptCall" raised className="greenCallBtn" type="submit"> <i className="material-icons">call</i> Accept</Button>
                  <Button id="rejectCall" raised className="redCallBtn" type="submit"> <i className="material-icons">call_end</i> Reject</Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
};

const mapStateToProps = function (state) {
  return {}
}
export default connect(mapStateToProps)(PatientCall);