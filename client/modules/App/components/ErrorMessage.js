import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Col, Row, Grid} from 'react-bootstrap';
import styles from '../App.css';


export function ErrorMessage(props, context) {
	let _message = <FormattedMessage id = {props.message}/>;
    return (
    	<Row>
    		<Col md={12}>
		      <div className={styles.aligner}>
			        <div className={styles.centerAligner}>
			        	<Row>
			        		<Col md={6}>
										<div className={styles.goBackDash}>
											<a href='/dashboard'><button> Back</button></a>
										</div>
			        			<div className={styles.errorIcon}>
			        				<img src="/images/invalid.png" alt="Invalid request"/>
			        			</div>
			        		</Col>
									<Col md={6}>
										<div className={styles.goTextDash} >	
											<h3>Oops! {_message}.</h3>
											<p>Description goes here. {_message}.</p>
										</div>	
					        </Col>
			        	</Row>
			        </div>
	      		</div>
      		</Col>
      	</Row>
    );
}


ErrorMessage.propTypes = {
  message: PropTypes.string,
  intl: PropTypes.object,
}

export default injectIntl(ErrorMessage);
