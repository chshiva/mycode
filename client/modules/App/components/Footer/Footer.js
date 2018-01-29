import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images
import bg from '../../header-bk.png';

export function Footer(props, context) {
  return (
    <div className={styles.stickyFooter}>
      <p>&copy; {props.message && props.message.year ? props.message.year : ''} &middot; {props.message && props.message.name ? props.message.name : ''} &middot; {props.message && props.message.company ? props.message.company : ''}</p>
      {/*<p>
      	<a href="#"><FormattedMessage id='privacy_policy' /></a> | <a href="#"><FormattedMessage id='terms_conditions' /></a>
      </p>*/}
    </div>
  );
}

Footer.propTypes = {
	message : PropTypes.object
}

export default Footer;
