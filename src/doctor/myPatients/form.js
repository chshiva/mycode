import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
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
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InputIcon from 'material-ui-icons/Input';
import Avatar from 'material-ui/Avatar';
import css from './mypatients.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { FormLabel, FormControl, FormHelperText, FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Person from 'material-ui-icons/Person';
import green from 'material-ui/colors/green';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions, } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';

const styles = {

};

class MyPatients extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, open: false, checkedA: true, checkedB: false, checkedE: true, };
  }

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
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
                <img src="/public/images/black-icons/editprofile.png" alt="page icon" />
              </div>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
              <div className="leftNavIcon">
                <img src="/public/images/black-icons/patient2.png" alt="page icon" />
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
        </div> */}
        {/*<Hidden mdDown >
              <div className="dashboardRightBlock"></div>
            </Hidden> */}
        <div className="dashboardMain">
          <div className="dashboardContainer">
            <div className="recordsBlock">
              <h2 className="patientListHeader">My Patients</h2>
              <div className="patInfoBlock">
                <div className="textFieldBreak">
                  <TextField className="textItemBlock" id="month" label="Month" type="month" defaultValue="January" InputLabelProps={{ shrink: true, }} />
                  <TextField className="overwriteLabel" id="month" label="Year" type="month" defaultValue="YYYY" InputLabelProps={{ shrink: true, }} />
                </div>
                <div className="filterToggle">
                  Manage Filter
                <Switch checked={this.state.checkedA} onChange={this.handleChange('checkedA')}
                    aria-label="checkedA" />
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

                      title="Patient Name"
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

                      title="Patient Name"
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

                      title="Patient Name"
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

                      title="Patient Name"
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
                  <Button color="primary">Summary</Button>
                  <Button color="primary">Prescription</Button>
                </CardActions>
              </Card>
            </div>

          </div>
        </div>
      </div>
    );
  }
};


const mapStateToProps = function (state) {
  return {}
}
export default connect(mapStateToProps)(MyPatients);