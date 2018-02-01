import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
import css from './diagnosticreports.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';

const styles = {

};

class DiagnosticReports extends Component {

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
        {/* <AppBar position="fixed">
          <Toolbar>
            <Hidden mdUp>
              <IconButton aria-label="Menu" className="menuButtonTop">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">
              <div className="whiteLogo">
                <img src="public/images/logo/netikWhiteLogo.png" alt="Logo" />
              </div>
            </Typography>

            <Button aria-owns={this.state.open ? 'simple-menu' : null} aria-haspopup="true" onClick={this.menuOpen}>
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
        </div> */}
        <div className="mainContainer">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h2 className="headlineTxt">Diagnostic Reports</h2>
              <div className="cardsBlock">
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
                      <CardContent>
                        <h2 className="noteHeadlineTxt">
                          Clinical Note
                        </h2>
                        <Typography component="p">
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                  <CardActions>
                    <Button color="primary">Reports</Button>
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
                        <h2 className="noteHeadlineTxt">
                          Clinical Note
                        </h2>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                        </p>
                      </CardContent>
                    </Grid>
                  </Grid>
                  <CardActions>
                    <Link to={'/allreports'} className="linkTxt">
                      <Button color="primary">Reports</Button>
                    </Link>
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
                        <h2 className="noteHeadlineTxt">
                          Clinical Note
                        </h2>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                        </p>
                      </CardContent>
                    </Grid>
                  </Grid>
                  <CardActions>
                    <Button color="primary">Reports</Button>
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
                        <h2 className="noteHeadlineTxt">
                          Clinical Note
                        </h2>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                        </p>
                      </CardContent>
                    </Grid>
                  </Grid>
                  <CardActions>
                    <Button color="primary">Reports</Button>
                  </CardActions>
                </Card>
              </div>


              {/*<div className="noDataBlock">
                                            <div className="nodDataScreen">
                                              <div className="circle240">
                                                <img src="/public/images/black-icons/medicalRecords.png" alt="medicalRecords"/>
                                              </div>
                                              <h2 className="nodataTxt">No Data</h2>
                                            </div>
                                          </div>*/}

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
export default connect(mapStateToProps)(DiagnosticReports);