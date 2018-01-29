import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import styles from '../App.css';


export function Loading(props, context) {
    var sectionLoading = {
      position: 'fixed',
      zIndex: '50',
      width: '300px',
      left: 'calc(50% - 150px)',
      top: 'calc(50% - 56px)',
      textAlign: 'center',
      color: '#008abc'
    }

    let whiteLoading = {
      position: 'fixed',
      zIndex: '50',
      width: '300px',
      left: 'calc(50% - 150px)',
      top: 'calc(50% - 56px)',
      textAlign: 'center',
      color: '#fff'
    }

    let paraWhiteVal = {
        padding: '0',
        marginTop: '16px',
        color: '#fff'
    }

    var paraVal = {
        padding: '0',
        marginTop: '16px',
        color: 'rgba(0,0,0,0.87)'
    }

    var listSpinner = {
      position: 'relative',
      zIndex: '50',
      width: '100%',
      textAlign: 'center',
      color: '#008abc',
      marginTop: '24px'
    }
    let _uploadMessage = <FormattedMessage id = 'uploading_please_wait'/>;
    let _message = <FormattedMessage id = 'loading_please_wait'/>;
    let _messageReg = <FormattedMessage id = 'registration_please_wait'/>;
    let _messageQuesSave = <FormattedMessage id = 'adding_question_please_wait'/>;

    if(props.message){
      _message = props.message;
    }
      
    if (props.loadType == 'list') {
      return (
          <div style={listSpinner}>
            <FontAwesome name="spinner" spin size='3x' />
            <p style={paraVal}>
              {_message}
            </p>
          </div>
        );
    } else if (props.loadType == 'upload') {
      return (
          <div style={listSpinner}>
            <FontAwesome name="spinner" spin size='3x' />
            <p style={paraVal}>
              {_uploadMessage}
            </p>
          </div>
        );
    } else if (props.loadType == 'white') {
      return (
        <div style={whiteLoading}>
          <FontAwesome name="spinner" spin size='5x' />
          <p style={paraWhiteVal}>
            {_message}
          </p>
        </div>
      );
    }else if (props.loadType == 'register') {
      return (
        <div style={whiteLoading}>
          <FontAwesome name="spinner" spin size='5x' />
          <p style={paraWhiteVal}>
            {_messageReg}
          </p>
        </div>
      );
    }if (props.loadType == 'save') {
      return (
          <div style={listSpinner}>
            <FontAwesome name="spinner" spin size='3x' />
            <p style={paraVal}>
              {_messageQuesSave}
            </p>
          </div>
        );
    }else {
      return (
        <div style={sectionLoading}>
          <FontAwesome name="spinner" spin size='5x' />
          <p style={paraVal}>
            {_message}
          </p>
        </div>
      );
    }
}


Loading.propTypes = {
  message: PropTypes.string,
  intl: PropTypes.object,
}

export default injectIntl(Loading);

/*<div>
        {props.loadType=='upload'?
        <div style={listSpinner}>
          <FontAwesome name="spinner" spin size='3x' />
          <p style={paraVal}>
            {_uploadMessage}
          </p>
        </div> :
        <div style={sectionLoading}>
          <FontAwesome name="spinner" spin size='5x' />
          <p style={paraVal}>
            {_message}
          </p>
        </div> }
      </div>*/