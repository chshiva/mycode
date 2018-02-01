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
import css from './plans.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';

import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import CheckCircle from 'material-ui-icons/CheckCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import MoreVertIcon from 'material-ui-icons/MoreVert';



export default class ChoosePlanForm extends Component {
  constructor() {
    super();
    this.state = {
      // razorpay_payment_id:''
    }
    

  }


  render () {
    console.log('data------->',this.props.plans)
  return (
    <div>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>  
        
      <div className="noAccess">
        <p>Rotate to portrait for better usage.</p>
      </div>
      <div className="mainContainer">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div className="emptyDiv">
              <h2 className="headlineTxt">Choose a Plan</h2>
              <p>Choose a package listed below for your subscription plan</p>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={24} >
        {
            this.props.plans && this.props.plans.length > 0 ?         
            this.props.plans.map((data,i)=> {
              return (
                <Grid item xs={12} md={6} key={i}>
                  <Paper className="">
                    <div className="cardPlans">
                      {data.rules && data.rules.length > 0 ?
                        data.rules.map((rules, i) => {
                          return (
                            <div className="leftBlock red" key={i}>
                              <div className="costCircle">{rules.ruleValue}</div>
                              <div className="btmTxt">{rules.ruleCode}</div>
                            </div>
                          )
                        })
                        : null
                      }
                      <div className="rightBlock">
                        <div className="priceTagBlock">
                          <h2 className="priceTag">&#8377;{data.amount}</h2>
                        </div>
                        <div className="footerActionBlock">
                          <Button className="btnTxtColor" onClick={this.props.openCheckout.bind(this, data.amount,data._id)}>Pay Rs. {data.amount}</Button>
                          {/* <Button className="btnTxtColor" onClick={this.openCheckout}>Pay Rs. {this.state.amount / 100}</Button> */}
                        </div>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              )              
            })
            : null
        }         
          
        </Grid>
        <div className="planRightBlock">
          <div className="planRightHeader">
            <List className="paymentListHeader">
              <ListItem>
                <ListItemText className="listHeaderItem" primary="Purchase History" secondary="Your Purchase Information" />
              </ListItem>
            </List>
          </div>
          <div className="planRightContainer">
            <List className="paymentList">
              {this.props.payments && this.props.payments.length > 0 ?
                this.props.payments.map((data, i) => {
                  return (
                    <ListItem button className="paymentListItem" key={i}>
                      <ListItemText className="orderTxt" inset primary={'Order No:'+ data.id} secondary={data.createAt} />
                      <div className="paymentStatus">
                        <ListItemText className="paymentStatusTxt" primary={data.amount/100} />
                        {data.status != 'failed' ? <ListItemIcon className="paymentSuccessIcon"><CheckCircle /></ListItemIcon>
                          : <ListItemIcon className="paymentFailureIcon"><RemoveCircle /></ListItemIcon> }
                      </div>
                    </ListItem>
                  )
                })
                : null
              }
            </List>
          </div>
        </div>
      </div>
    </div>
  )    
  }
}