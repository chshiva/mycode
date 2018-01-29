import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Col, Row, Grid} from 'react-bootstrap';
import styles from '../App.css';
import { Link } from 'react-router';

export function UserActiveMessage(props, context) {
    return (
    	<Row>
    		<Col md={12}>
		      <div className={styles.aligner}>
			        <div className={styles.centerAligner}>
			        	<Row>
			        		{/*<Col md={6}>
			        					        			<div className={styles.errorIcon}>
			        					        				<img src="/images/invalid.png" alt="Invalid request"/>
			        					        			</div>
			        					        		</Col>*/}
			        		<Col md={12}>
			        			<h3>{props.message}.</h3>
				        		{/*<p>Description goes here. {props.message}.</p>*/}
				        		<p><Link to="/">Sign in</Link></p>
			        		</Col>
			        	</Row>
			        </div>
	      		</div>
      		</Col>
      	</Row>
    );
}


UserActiveMessage.propTypes = {
  message: PropTypes.string,
  intl: PropTypes.object,
}

export default injectIntl(UserActiveMessage);
