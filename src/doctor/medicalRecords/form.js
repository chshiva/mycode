import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
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
import css from './medicalrecords.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import LibraryBooks from 'material-ui-icons/LibraryBooks';
import Receipt from 'material-ui-icons/Receipt';
import Description from 'material-ui-icons/Description';
import Add from 'material-ui-icons/Add';
import { connect } from 'react-redux';

const styles = {

};

class MedicalRecords extends Component {
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
      <div className="recordsBlock">
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

                title="Dr. Mary Jones"
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

                title="Dr. Rosy Smith"
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

                title="Dr. Steve"
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
    );
  }
};

const mapStateToProps = function (state) {
  return {}
}
export default connect(mapStateToProps)(MedicalRecords);