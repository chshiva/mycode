import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { isLoggedIn } from '../../../../Login/LoginActions';
import { loggedInData } from '../../../../Login/LoginReducer';
import styles from '../../../../Dashboard/Dashboard.css';
import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';


export class AllConnections extends Component {  
  constructor(props) {
    super(props);
  }

  hideAllConnections() {
    this.props.hideAllConnectionsCallback()
  }

  render() {
    let userData = this.props.userData.profile;
    let userCount = 0;
    let contactData =  this.props.userData.contacts;

    for(var i=0; i<contactData.length; i++){
      if(contactData[i].status === 1) {
        userCount = userCount+1;
      }
    }

  	return (
      <div className={styles.viewAllList}>
        <div className={styles.viewAllHeader}>
          <div id="close" className={styles.hideViewList} title={this.props.intl.messages.hide} onClick={this.hideAllConnections.bind(this)}>
            <img src="/images/black-icons/delete-black.png" />
          </div>
          <div className={styles.profileInfoBlock}>
            <h2><FormattedMessage id='All Connections'/>: <span>({userCount})</span></h2>
          </div>
        </div>
        <div className={styles.viewAllBody}>
          <div className={styles.connectionList}>
            {this.props.viewAllConnectionsData()}
          </div>
        </div>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),

  };
}

AllConnections.propTypes = {
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

AllConnections.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(AllConnections));