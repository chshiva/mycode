import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
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
// import InboxIcon from 'material-ui-icons/Inbox';
import InputIcon from 'material-ui-icons/Input';
// import InsertDriveFileIcocn from 'material-ui-icons/InsertDriveFile';
// import Description from 'material-ui-icons/Description';
// import SubscriptionsIcon from 'material-ui-icons/Subscriptions';
import Avatar from 'material-ui/Avatar';
import css from './summary.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import ChatHistoryForm from "../chatHistory/container";

const styles = {
};

export default class Summary extends Component {

  state = { anchorEl: null, open: false, openChatHistory: false, };

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ openChatHistory: true });
  };

  handleClose = () => {
    this.setState({ openChatHistory: false });
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

        <div className="mainContainer">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className="docBlock">
                <h2 className="headlingTxt">Sep 10, 2017</h2>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div className="docInfoBlock">
                      <div className="avacircle80">
                        <img src="/public/images/doctorl1.jpeg" alt="doctor" />
                      </div>
                      <div className="docDetails">
                        <h2 className="docName">Dr. Mary Jones</h2>
                        <p className="callTxt">Call Duration: <span>10 min</span></p>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="docInfoBlock">
                      <div className="ptnDetails">
                        <h2 className="ptnName">Ravi Varma</h2>
                        <p className="callTxt">32 Years</p>
                        <p className="callTxt">Male</p>
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <div className="bottomFollowBox">
                  <div className="bottomFollowTxt">
                    Followup
                </div>
                  <div className="bottomCallBtn">
                    <Button raised className="callBtn">Call Now</Button>
                  </div>
                </div>
              </div>

              <div className="cardListBlock">
                <h2 className="headlineTxt">Summary</h2>
                <div className="blockDiv">
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <div className="cardListItems">
                        <h2 className="listHeadlineTxt">Clinical Note</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <div className="blockDiv">
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <div className="cardListItems">
                        <h2 className="listHeadlineTxt">Diagnosis</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="cardListItems">
                        <h2 className="listHeadlineTxt">Investigation Advised</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>


                <h2 className="headlineTxt">Followup</h2>

                <div className="blockDiv">
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <div className="cardListItems">
                        <h2 className="listHeadlineTxt">Observation</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <div className="blockDiv">
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <div className="cardListItems">
                        <h2 className="listHeadlineTxt">Post Text Diagnosis</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="cardListItems">
                        <h2 className="listHeadlineTxt">Advice</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <div className="bottomChatHistory">
                <div className="bottomChatHBtn">
                  <Button raised color="primary" onClick={this.handleClickOpen} >View Chat History</Button>
                </div>
              </div>

              <Dialog open={this.state.openChatHistory} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title" className="brdrBtm">{"Chat History"}</DialogTitle>
                <DialogContent>
                  <ChatHistoryForm />
                </DialogContent>
              </Dialog>

            </Grid>
          </Grid>
        </div>
        <div className="colseBtmBox">
          <i className="material-icons">close</i>
        </div>
      </div>
    );
  }
};
