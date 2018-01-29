import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styles from './component.css';

export default class Label extends Component {
  render() {
    var cls=`${styles.iLabel} ${styles.oLabel}`;
    //console.log(this.context.intl.messages)
    const labelText = this.context.intl.messages[this.props.data.text.props.id]
    return (
      <label className={cls} htmlFor={this.props.data._id}>{labelText}  
          {(this.props.required)?
            <span className={styles.mandatory}>*<span className={styles.colonBlack}>:</span></span>
            :
            <span>:</span>
          }
      </label>
    );
  }
}
 
Label.propTypes = {
  data: PropTypes.object.isRequired,
  required: PropTypes.bool
};

Label.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};


Label.defaultProps = { required: false };