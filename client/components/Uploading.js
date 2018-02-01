import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import styles from './component.css';

export function Uploading(props, context) {
    var sectionLoading = {
      color: '#008abc',
      position: 'absolute',
      zIndex: '50',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }

    var paraVal = {
        padding: '0',
        marginTop: '32px',
        color: 'rgba(0,0,0,0.87)'
    }

    var regVal = {
        padding: '0',
        marginTop: '0px',
        color: 'rgb(0, 188, 182)'
    }

    var spinner = {
        width: 'auto',
        height: '100px',
        textAlign: 'center'
    }

    let _message
    if(props.type == 'create') {
      _message = <FormattedMessage id = 'creating_please_wait'/>;
    } else if (props.type == 'update') {
      _message = <FormattedMessage id = 'updating_please_wait'/>;
    } else if (props.type == 'loading') {
      _message = <FormattedMessage id = 'loading_please_wait'/>;
    } else if (props.type == 'registration') {
      _message = <FormattedMessage id = 'loading_please_wait'/>;
    } else {
      _message = <FormattedMessage id = 'uploading_please_wait'/>;
    }
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    
    return (
      <div className={cls_container}>
        <div style={sectionLoading}>
          <div style={spinner}>
            <FontAwesome name="spinner" spin size='5x' />
            <p style={props.type == 'registration'?regVal:paraVal}>
              {_message}
            </p>
          </div>
        </div>
      </div>
    );
}


Uploading.propTypes = {
  message: PropTypes.string,
  intl: PropTypes.object,
}

export default injectIntl(Uploading);
