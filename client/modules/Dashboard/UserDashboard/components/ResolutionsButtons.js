import React, { PropTypes, Component } from 'react';
//import callApi from '../../../../util/apiCaller';
//import { Link } from 'react-router';
//import { connect } from 'react-redux';
//import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
//import {Col, Row, Grid, Carousel} from 'react-bootstrap';

//import { conferenceDetails } from '../../../Communication/ConferenceReducer';

import styles from '../../Dashboard.css';

import WoogeenManager from '../../../Communication/WoogeenManager';

export class ResolutionsButtons extends Component {

  constructor(props) {
    super(props);

  }

  render(){
    return (
        <div>
            
        </div>
    );
  }
}


ResolutionsButtons.propTypes = {
  intl: PropTypes.object,
  stream: PropTypes.object,
  confObject: PropTypes.object,
};

export default ResolutionsButtons;
