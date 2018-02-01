import React from 'react';
import { connect } from 'react-redux';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InputIcon from 'material-ui-icons/Input';
import Divider from 'material-ui/Divider';
import socketService from '../../../pplsocket/socketService';

class PatientLeftNavContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log("PatientLeftNavContainer props ", props);
    this.handleLogout  = this.handleLogout.bind(this);
    this.redirectMedicalFrom  = this.redirectMedicalFrom.bind(this);
    this.redirectDashboard  = this.redirectDashboard.bind(this); 
    this.redirectSubscriptions  = this.redirectSubscriptions.bind(this);
    this.redirectPrescription  = this.redirectPrescription.bind(this);
    this.redirectDiagnosticReports  = this.redirectDiagnosticReports.bind(this);
  }

  handleLogout (e) {
    console.log("logout");
    socketService.disconnect();
    localStorage.clear();
    this.props.history.push('/');
  }

  redirectDashboard(e){
    console.log("Redirect To Dashboard");
    e.preventDefault();
    this.props.history.push('/patient/dashboard');
  }

  redirectMedicalFrom(e){
    console.log("Redirect To Medical Form");
    e.preventDefault();
    this.props.history.push('/patient/medical-form-filling');
  }

  redirectSubscriptions(e) {
    console.log("Redirect To Subscriptions");
    e.preventDefault();
    this.props.history.push('/patient/choose-plans');
  }

  redirectPrescription(e){
    console.log("Redirect To Prescription");
    e.preventDefault();
    this.props.history.push('/patient/prescription');
  }

  redirectDiagnosticReports(e){
    console.log("Redirect To DiagnosticReports");
    e.preventDefault();
    this.props.history.push('/patient/diagnostic-reports');
  }

  render () {
    return (
      <div className="leftNavBlock">
        <List>
          <ListItem className={this.props.activePath == '/patient/dashboard' ? "leftNavListActive" : null} button onClick={this.redirectDashboard}>
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/dashboard.png" alt="page icon" />
            </div>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem className={this.props.activePath == '/patient/medical-form-filling' ? "leftNavListActive" : null} button onClick={this.redirectMedicalFrom}>
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/medical-records.png" alt="page icon" />
            </div>
            <ListItemText primary="Medical Form"/>
          </ListItem>

          <ListItem button>
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/medical-records.png" alt="page icon" />
            </div>
            <ListItemText primary="Medical Records" />
          </ListItem>

          <ListItem className={this.props.activePath == '/patient/prescription' ? "leftNavListActive" : null} button onClick={this.redirectPrescription} >
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/medical-pre.png" alt="page icon" />
            </div>
            <ListItemText primary="Prescription Orders" />
          </ListItem>

          <ListItem className={this.props.activePath == '/patient/diagnostic-reports' ? "leftNavListActive" : null} button onClick={this.redirectDiagnosticReports} >
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/diagnostic-report.png" alt="page icon" />
            </div>
            <ListItemText primary="Diagnostic Reports" />
          </ListItem>

          <ListItem className={this.props.activePath == '/patient/choose-plans' ? "leftNavListActive" : null} button onClick={this.redirectSubscriptions}>
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/subscription.png" alt="page icon" />
            </div>
            <ListItemText primary="Subscriptions" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.handleLogout}>
            <ListItemIcon><InputIcon /></ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </div>
    );
  }
};


// /* Map the state to props. */
const mapStateToProps = function (state) {
  return {
    user: state.user
  }
}

// /** * Map the actions to props. */
// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //         getUserDetails: () => dispatch(getUserDetails())
// //     };
// // }

export default connect(mapStateToProps)(PatientLeftNavContainer);