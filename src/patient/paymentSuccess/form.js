import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form'
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
import InboxIcon from 'material-ui-icons/Inbox';
import InputIcon from 'material-ui-icons/Input';
import InsertDriveFileIcocn from 'material-ui-icons/InsertDriveFile';
import Description from 'material-ui-icons/Description';
import SubscriptionsIcon from 'material-ui-icons/Subscriptions';
import Avatar from 'material-ui/Avatar';
import css from './paymentsuccess.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';

const styles = {
  

};


export default class paymentSuccess extends Component {

  constructor(props) {
    super(props);
    this.state = { anchorEl: null, open: false, };
  }

  menuOpen = event => {
    this.setState({ open: true , anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };
  render(){
    return (
      <div>
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>
        <div className="mainContainer">
          <Grid container spacing={24} >
            <Grid item xs={12} md={12}>
              <div className="block420px">
                <div className="circle80 successColor">
                  <img src="/public/images/white-icons/check.png" alt="check-icon" className="success" />
                </div>
                <div className="paymentTxtBlock">
                  <h2 className="successHeading">Payment Successful</h2>
                  <p>Your payment of Rs.500 has been processed Successfully.<br/> We will email you a receipt confirming your payment shortly.</p>
                </div>
                <div className="successBtmBtm">
                  <Button id="paymentSuccess" raised color="primary" onClick={this.props.navigateDashboard} type="submit">Done</Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
};
