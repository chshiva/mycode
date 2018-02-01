//Code added by - Najib, Desc - All restricted users are redirected here. 

import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
import styles from '../../../Dashboard/Dashboard.css';
import style from '../../../Login/components/LoginWidget.css';
import Loading from '../../../App/components/Loading';
import AuthClient from '../../../../components/AuthController';
import { browserHistory } from 'react-router';
import callApi from '../../../../util/apiCaller';

export class AccessDenied extends Component {	

	goBack() {
		console.log("AuthClient.getSession()", AuthClient.getSession());
		if(AuthClient.getSession() != false && AuthClient.getSession() != '' && AuthClient.getSession() != undefined && typeof(window)){
	    // if(AuthClient.getSession() != '' && AuthClient.getSession() != undefined){
	      // console.log("Inside api call");
	          callApi('is-loggedin', 'post', {
	            userdata: {
	              session: AuthClient.getSession(),
	            },
	          }).then(res => {
	          	//console.log("ressponse after callApi", res);
	            if(res.status === false){
	              AuthClient.deleteSession();
	              browserHistory.push("/");
	            }else if(res && res.status && res.data && res.data.guest){            	
            		//console.log("else if res");
            		callApi ('delete-guest/loginPage', 'delete');
              	browserHistory.push("/");	
            	} else {
            		//console.log("dashboard push");
            		browserHistory.push("/dashboard");
            	}	
	          });
	    // }else {
	    //   replace({pathname:'/'});
	    //   callback();
	    // }
	  } else {
	    browserHistory.push("/"); 
	  }
	}

	render() {
		let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_backAccessBlock = `${styles.backButtonBlock} ${styles.backAccessBlock}`;
    let cls_textAccessBlock = `${styles.profileInfoBlock} ${styles.textAccessBlock}`;
		return (
					<Grid fluid={true}>
						<div className={styles.accessWrapper}>
							<div className={style.resetinnerDiv}>
								<div className={style.resetPageBlock} >
					        <Row>
		          			<Col md={12}>
		          				<div className={cls_textAccessBlock}>
		          					<div>
		          						<FontAwesome name="ban" />  
		          					</div>
		          					<div>
					              	<h2>Access Denied</h2>	
					              	<p>Access to the requested page has been Denied</p>
					              </div>	
					              <div className={styles.accessBtnBlock}>
					              	<button className={styles.btnApplyAll} onClick = {this.goBack.bind(this)}>Home</button> 
					              </div>         
					            </div>
		          			</Col>
	          			</Row>
		          	</div>
							</div>
						</div>
          </Grid>      
			);      
	}	
}

export default AccessDenied;

