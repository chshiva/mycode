import React, { PropTypes, Component } from 'react';
import { FormattedMessage, injectIntl, intlShape, } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import AuthClient from '../../../../components/AuthController.js';
import styles from '../../Dashboard.css';
import { connect } from 'react-redux';
import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import Attendees from './Attendees';
var _ = require('lodash');
import { loggedInData } from '../../../Login/LoginReducer';

export class AttendeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendeesData : []
    }
  }


  componentDidMount() {
    this.setattendeesData(this.props.conferenceDetails);
  }

  setattendeesData(conferenceDetails) {
    if(conferenceDetails && conferenceDetails.confData && conferenceDetails.confData.users) {
      this.setState({ attendeesData : conferenceDetails.confData.users });
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log("component will receive -- - - ", nextProps);
    if (nextProps.conferenceDetails && nextProps.conferenceDetails.confData.users) {
      this.setState({ attendeesData : nextProps.conferenceDetails.confData.users})
    };
  }

  searchAttendees(e) {
    let conferenceDetails = this.props.conferenceDetails;
    if(conferenceDetails && conferenceDetails.confData && conferenceDetails.confData.users) {
      let confUsers = conferenceDetails.confData.users;
      let filterUsers = [];
      let query = e.target.value;
      if(query!=''){
        query = query.toLowerCase();
        for (var i=0; i < confUsers.length; i++) {
          let name = (confUsers[i].firstname + " " + confUsers[i].lastname).toLowerCase();
          if (((confUsers[i].email).toLowerCase()).match(query) || name.match(query)) {
            filterUsers.push(confUsers[i]);
          }
        }
        this.setState({ attendeesData : filterUsers });
      } else {
        this.setState({ attendeesData : confUsers });
      }
    }
  }

  render(){
    let cls_navBar = `navbar-form ${styles.navBar}`;
    let cls_searchAddon = `input-group ${styles.addon}`;
    let cls_searchInput = `form-control ${styles.formControlCustom}`;
    let cls_btnSearch =`btn ${styles.btnSearch} pull-right`;

    //code changed by - Najib, Desc - Checking guest user and setting status variable 
    let guestStatus = false;
    if(this.props.loggedInData && this.props.loggedInData.data && this.props.loggedInData.data.guest) {
      guestStatus = true;
    }

    // let listAttendees = <FormattedMessage id = 'no_attendees_present'/>;
    let conferenceDetails = this.props.conferenceDetails;
    let onlineAttendees = null;
    let offlineAttendees = null;
    if(conferenceDetails && conferenceDetails.attendees && this.state.attendeesData && this.state.attendeesData.length>0){
      let confUsers = this.state.attendeesData;
      let attendList = conferenceDetails.attendees;
      // console.log("confUsers---", confUsers)

      onlineAttendees = confUsers.map((confUser) =>
        ((_.findIndex(attendList, { 'name': confUser._id })) >= 0 ) ? (
          <Attendees key={confUser._id}
                    value={confUser} 
                    online={_.findIndex(attendList, { 'name': confUser._id })}
                    uid={this.props.uid}
                    confObject={this.props.confObject}
                    guestStatus = {guestStatus}
          />
        ) : null
      );
      offlineAttendees = confUsers.map((confUser) =>
        ((_.findIndex(attendList, { 'name': confUser._id })) < 0 ) ? (
          <Attendees key={confUser._id}
                    value={confUser} 
                    online={_.findIndex(attendList, { 'name': confUser._id })}
                    uid={this.props.uid}
                    confObject={this.props.confObject}
                    guestStatus = {guestStatus}
          />
        ) : null
      );
    }
    return (
      <div className={styles.attendeesListBlock}>
        <div className={styles.searchAttendees}>
          <div className={cls_navBar}>
            <div className={cls_searchAddon}>
              <input id="searchAttendees" type="text" className={cls_searchInput} placeholder={this.props.intl.messages.search_attendees} onChange={this.searchAttendees.bind(this)} />
              <div className="input-group-btn">
                <span className={cls_btnSearch}>
                  <i className="glyphicon glyphicon-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.notificationBlock}>
          <div className={styles.notificationBody}>
            <div className={styles.notificationList}>
              <ul>
                {onlineAttendees}
                {offlineAttendees}
              </ul>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    conferenceDetails: conferenceDetails(state),
    loggedInData: loggedInData(state)
  };
}

AttendeesList.contextTypes = {
  router: React.PropTypes.object,
  intl: PropTypes.object,
  uid: PropTypes.string,
  confObject: PropTypes.object
};

AttendeesList.propTypes = {
  conferenceDetails: PropTypes.object,
};

export default connect(mapStateToProps)(AttendeesList);
