import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import css from './chathistory.css';

const styles = {
};

export default class chatHistory extends Component {
  render() {
    return (
      <div>
        <div className="chatHistoryListGroup">
          <ul>
            <small className="chatDate">Sep 10, 2017</small>
            <li>
              <div className="docChatMsg">
                <small className="docName">Dr.Name</small>
                <p className="smgTxt">Hello, how are you doing today!</p>
              </div>
            </li>
            <li>
              <div className="patnChatMsg">
                <small className="patnName">Patient Name</small>
                <p className="smgTxt">I am fine, thanks. I am suffering with headache, burning eyes and energy less, since last night. </p>
              </div>
            </li>
            <li>
              <div className="docChatMsg">
                <small className="docName">Dr.Name</small>
                <p className="smgTxt">Okay! any thing else.</p>
              </div>
            </li>
            <li>
              <div className="docChatMsg">
                <small className="docName">Dr.Name</small>
                <p className="smgTxt">Hello, how are you doing today!</p>
              </div>
            </li>
            <li>
              <div className="patnChatMsg">
                <small className="patnName">Patient Name</small>
                <p className="smgTxt">I am fine, thanks. I am suffering with headache, burning eyes and energy less, since last night. </p>
              </div>
            </li>
            <li>
              <div className="docChatMsg">
                <small className="docName">Dr.Name</small>
                <p className="smgTxt">Okay! any thing else.</p>
              </div>
            </li>
            <li>
              <div className="docChatMsg">
                <small className="docName">Dr.Name</small>
                <p className="smgTxt">Hello, how are you doing today!</p>
              </div>
            </li>
            <li>
              <div className="patnChatMsg">
                <small className="patnName">Patient Name</small>
                <p className="smgTxt">I am fine, thanks. I am suffering with headache, burning eyes and energy less, since last night. </p>
              </div>
            </li>
            <li>
              <div className="docChatMsg">
                <small className="docName">Dr.Name</small>
                <p className="smgTxt">Okay! any thing else.</p>
              </div>
            </li>
            <li>
              <div className="docChatMsg">
                <small className="docName">Dr.Name</small>
                <p className="smgTxt">Hello, how are you doing today!</p>
              </div>
            </li>
            <li>
              <div className="patnChatMsg">
                <small className="patnName">Patient Name</small>
                <p className="smgTxt">I am fine, thanks. I am suffering with headache, burning eyes and energy less, since last night. </p>
              </div>
            </li>
            <li>
              <div className="docChatMsg">
                <small className="docName">Dr.Name</small>
                <p className="smgTxt">Okay! any thing else.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};