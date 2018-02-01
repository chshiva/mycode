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
import css from './prescription.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';

const styles = {
};

class Priscription extends Component {

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
            <Hidden mdUp >
              <IconButton aria-label="Menu" className="menuButtonTop">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">
              <div className="whiteLogo">
                <img src="public/images/logo/netikWhiteLogo.png" alt="Logo" />
              </div>
            </Typography>

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
        </AppBar> */}
        {/* <div className="leftNavBlock">
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
          <div className="topActionBtnBlock">
            <div className="actionBtnBlock">
              <Button raised className="btnMrg"><i className="material-icons">remove_red_eye</i> View</Button>
              <Button raised className="btnMrg"><i className="material-icons">file_download</i> Download</Button>
              <Button raised className="btnMrg"><i className="material-icons">attach_money</i> Order</Button>
              <Button raised className="btnMrg"><i className="material-icons">add_shopping_cart</i>Order Status</Button>
            </div>
          </div>
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
                        <p className="callTxt">MD, ENT</p>
                        <p className="callTxt">Registration No: <span className="exTxt">NETIK556</span></p>
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
              </div>

              <div className="cardListBlock">
                <div className="topInfoBox">
                  <Grid container spacing={24}>
                    <Grid itsm xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="topRightListBox">
                        <div className="listItemsGroup">
                          <ul>
                            <li>
                              <div className="circle16 filledCircle">A</div>
                              <span>After Food</span>
                            </li>
                            <li>
                              <div className="circle16 filledCircle">B</div>
                              <span>Before Food</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <Hidden smDown >
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                      <div className="presListGroup">
                        <div className="presListItemZero">
                          <div className="presTitleBoxOne">
                            <span className="pryHeadignTxt">Medicines</span>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="presListGroup">
                        <div className="presListItemZero">
                          <div className="presTitleBox">
                            <span className="pryHeadignTxt">Morning</span>
                          </div>
                        </div>
                        <div className="presListItemZero">
                          <div className="presTitleBox">
                            <span className="pryHeadignTxt">Afternoon</span>
                          </div>
                        </div>
                        <div className="presListItemZero">
                          <div className="presTitleBox">
                            <span className="pryHeadignTxt">Night</span>
                          </div>
                        </div>
                        <div className="presListItemOne">
                          <div className="presTitleBox">
                            <span className="pryHeadignTxt">Days</span>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Hidden>

                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div className="presTxtBlock">
                      <Typography className="medTitleTxt">Dolo</Typography>
                      <Typography component="p" className="medSmallTxt">650 MG</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="presListGroup">
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32">

                          </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            A
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            A
                        </div>
                        </div>
                      </div>
                      <div className="presListItemOne">
                        <div className="presTitleBox">
                          <span className="txt20">5 <Hidden smUp >Days</Hidden></span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div className="presTxtBlock">
                      <Typography className="medTitleTxt">Cetrizine</Typography>
                      <Typography component="p" className="medSmallTxt">500 MG</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="presListGroup">
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            B
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            A
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            B
                        </div>
                        </div>
                      </div>
                      <div className="presListItemOne">
                        <div className="presTitleBox">
                          <span className="txt20">5 <Hidden smUp >Days</Hidden></span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div className="presTxtBlock">
                      <Typography className="medTitleTxt">Pantaprizol</Typography>
                      <Typography component="p" className="medSmallTxt">600 MG</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="presListGroup">
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            B
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            A
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            B
                        </div>
                        </div>
                      </div>
                      <div className="presListItemOne">
                        <div className="presTitleBox">
                          <span className="txt20">5 <Hidden smUp >Days</Hidden></span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div className="presTxtBlock">
                      <Typography className="medTitleTxt">Pan</Typography>
                      <Typography component="p" className="medSmallTxt">500 MG</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="presListGroup">
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            B
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            A
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            B
                        </div>
                        </div>
                      </div>
                      <div className="presListItemOne">
                        <div className="presTitleBox">
                          <span className="txt20">2 <Hidden smUp >Days</Hidden></span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <Grid container spacing={24} >
                  <Grid item xs={12} sm={6} >
                    <div className="presTxtBlock">
                      <Typography className="medTitleTxt">Erythromycin</Typography>
                      <Typography component="p" className="medSmallTxt">750 MG</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <div className="presListGroup">
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            B
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            A
                        </div>
                        </div>
                      </div>
                      <div className="presListItemZero">
                        <div className="presTitleBox">
                          <div className="circle32 filledCircle">
                            B
                        </div>
                        </div>
                      </div>
                      <div className="presListItemOne">
                        <div className="presTitleBox">
                          <span className="txt20">10 <Hidden smUp >Days</Hidden></span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="presNotes">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div className="presSignature">
                  <div className="signatureBox">
                    <h2>Dr. Mary Jones</h2>
                  </div>
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
export default connect(mapStateToProps)(Priscription);