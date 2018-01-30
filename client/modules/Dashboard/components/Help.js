import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl} from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row} from 'react-bootstrap';

import mainStyles from '../../Layouts/DashLayout/DashLayout.css';
import styles from '../../Layouts/DashLayout/components/ConfSettings.css';


export class Help extends Component {
	render(){
		
		let cls_headerList = `${styles.modHeaderList} clearfix`;
		let cls_midTitle    = `${styles.midTitle} pull-left`;
		let cls_block50     = `${styles.block50} pull-right`;
		let cls_headerText  = `${styles.headerText} pull-left`;
		let cls_optionBlock = `${styles.optionsBlock} pull-right`;
		let cls_settingsOptions = `${styles.settingsOptionInput} ${styles.radio}`;
		let cls_elasticBar = `${mainStyles.elasticSideBar}`;
		
		return (
				<div className={styles.asideBodySecondary}>
				    <ul className={styles.helpdesk}>
				    	<li>
				    		<a id="supportCenter" href="http://helpdesk.instavc.com/" target="_blank">
							<FormattedMessage id='support_center' />
				    		</a>
				    	</li>
				    	<li>
				    		<a id="openNewTicket" href="http://helpdesk.instavc.com/open.php" target="_blank">
							<FormattedMessage id='open_a_new_ticket' />
				    		</a>
				    	</li>
				    	<li>
				    		<a id="checkTicketStatus" href="http://helpdesk.instavc.com/view.php" target="_blank">
							<FormattedMessage id='check_ticket_status' /> 
				    		</a>
				    	</li>
				    	<li>
				    		<a id="troubleshoot" href="https://test.webrtc.org/" target="_blank">
							<FormattedMessage id='troubleshoot' /> 
				    		</a>
				    	</li>
				    </ul>
				</div>

			);
	};
}

export default injectIntl(Help);