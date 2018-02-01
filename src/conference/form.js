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
import InboxIcon from 'material-ui-icons/Inbox';
import InputIcon from 'material-ui-icons/Input';
import InsertDriveFileIcocn from 'material-ui-icons/InsertDriveFile';
import Description from 'material-ui-icons/Description';
import SubscriptionsIcon from 'material-ui-icons/Subscriptions';
import Avatar from 'material-ui/Avatar';
import css from './videoconference.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Red from 'material-ui/colors';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = {
};

export default class videoConference extends Component {
  state = { anchorEl: null, open: false, endCall: false };

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ endCall: true });
  };

  handleClose = () => {
    this.setState({ endCall: false });
  };


  render() {
    return (
      <div>
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>
        <AppBar position="fixed">
          <Toolbar>
            <Hidden mdUp>
              <IconButton aria-label="Menu" className="menuButtonTop">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">NETIK</Typography>

            <Button flat aria-owns={this.state.open ? 'simple-menu' : null} aria-haspopup="true" onClick={this.menuOpen}>
              <span className="whiteTxt">Patient</span>
              <ArrowDropDown className="arrowDownIcon" />
              <Avatar alt="Remy Sharp" src="/public/images/black-icons/avatar.png" className="avatarImg" />
            </Button>
            <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open}
              onClose={this.menuClose} className="dropdDown" >
              <MenuItem onClick={this.menuClose}>Profile</MenuItem>
              <MenuItem onClick={this.menuClose}>My Account</MenuItem>
              <MenuItem onClick={this.menuClose}>Settings</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
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
              <ListItemText primary="Medical Records" />
            </ListItem>
            <ListItem button>
              <div className="leftNavIcon">
                <img src="/public/images/black-icons/medical-pre.png" alt="page icon" />
              </div>
              <ListItemText primary="Prescription Orders" />
            </ListItem>
            <ListItem button>
              <div className="leftNavIcon">
                <img src="/public/images/black-icons/diagnostic-report.png" alt="page icon" />
              </div>
              <ListItemText primary="Diagnostic Reports" />
            </ListItem>
            <ListItem button>
              <div className="leftNavIcon">
                <img src="/public/images/black-icons/subscription.png" alt="page icon" />
              </div>
              <ListItemText primary="subscriptions" />
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

        {/* CHAT BLOCK */}
        
        <div className="chatBlock">
          <div className="chatHeader">
            <div className="chatCloseBox">
              <i className="material-icons">close</i>
            </div>
            <div className="chatHeadingTxt">
              Chat
          </div>
          </div>
          <div className="chatBody">
            <div className="chatMsgBox">
              <div className="nameHeading otherColor">Dr. Name</div>
              <div className="msgContainer">
                How do you do!
            </div>
              <div className="msgTimeBlock">
                <time>10:20</time>
              </div>
            </div>

            <div className="chatMsgBoxSelf">
              <div className="msgContainer">
                I am fine Doctor, thanks.
            </div>
              <div className="msgTimeBlock">
                <time>10:21</time>
              </div>
            </div>

            <div className="chatMsgBox">
              <div className="nameHeading otherColor">Dr. Name</div>
              <div className="msgContainer">
                How do you do!
              <div className="msgMedia">
                  <img src="/public/images/report.jpg" alt="report" />
                  <div className="dowloadMedia">
                    <i className="material-icons">file_download</i>
                  </div>
                </div>
              </div>
              <div className="msgTimeBlock">
                <time>10:20</time>
              </div>
            </div>

          </div>
          <div className="chatFooterBox">
            <div className="chatAddPinBlock">
              <input type="file" className="inputFile" id="chatFileUpload" name="fileUploadChat" />
              <label htmlFor="chatFileUpload" >
                <i className="material-icons">attach_file</i>
              </label>
            </div>
            <div className="typeMsgBlock">
              <input type="text" className="inputTxt" />
            </div>
            <div className="sendMsg" >
              <Button className="muiRedBtn">Send</Button>
            </div>
          </div>
        </div>

        <div className="conferenceContainer">
          {/* VC timer section */}
          <div className="countDownBlock">
            <h3 className="timeTxt">10:00</h3>
            <CircularProgress
              className="circularTimer" color="primary" size={80} mode="determinate" value={100} min={0} max={100} />

          </div>

          {/* VC section */}
          <div className="videoContainer">
            <div className="otherVideo">
              <video autoPlay loop className="fullWidth" >
                <source src="/public/videos/doctor.mp4" type="video/mp4" />
              </video>
              {/*<div className="noData">
                <i className="material-icons">videocam_off</i> <span>Video muted</span>
              </div>*/}
            </div>
            <div className="selfVideo">
              <div className="videoBox">
                <video autoPlay loop className="fullWidth" >
                  <source src="/public/videos/patient.mp4" type="video/mp4" />
                </video>
                {/*<div className="noData">
                <i className="material-icons">videocam_off</i> <span>Video muted</span>
              </div>*/}
              </div>
            </div>
          </div>
          <div className="videoControllers">
            <div className="videoBtnBlock">
              <Button fab color="primary" className="confBtn">
                <i className="material-icons">mic</i>
                {/*<i class="material-icons">mic_off</i>*/}
              </Button>
              <Button fab color="primary" className="confBtn">
                <i className="material-icons">videocam</i>
                {/*<i class="material-icons">videocam_off</i>*/}
              </Button>
              <Button fab className="confBtn muiRedBtn" onClick={this.handleClickOpen} >
                <i className="material-icons">call_end</i>
              </Button>
              <Dialog open={this.state.endCall} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >

                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you want to end the call?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    No
                  </Button>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              <Button fab color="primary" className="confBtn">
                <i className="material-icons">chat</i>
              </Button>
            </div>
            {/*<div className="chatBtnBlock">
                           <Button fab color="primary" className="confBtn">
                            <i className="material-icons">chat</i>
                          </Button>
                        </div>*/}
          </div>
        </div>
      </div>
    );
  }
};