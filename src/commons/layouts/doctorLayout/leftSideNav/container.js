import React from 'react';
import { connect } from 'react-redux';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InputIcon from 'material-ui-icons/Input';
import Divider from 'material-ui/Divider';
import socketService from '../../../pplsocket/socketService';

class DoctorLeftNavContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log("DoctorLeftNavContainer props ", props);
    this.handleLogout = this.handleLogout.bind(this);
    this.redirectProfile = this.redirectProfile.bind(this);
    this.redirectDashboard = this.redirectDashboard.bind(this);
    this.redirectMyPatients = this.redirectMyPatients.bind(this);
    this.redirectDoctorFrom = this.redirectDoctorFrom.bind(this);
  }

  handleLogout(e) {
    console.log("logout");
    socketService.disconnect();
    localStorage.clear();
    this.props.history.push('/');
  }

  redirectDashboard(e) {
    console.log("Redirect To Dashboard");
    e.preventDefault();
    this.props.history.push('/doctor/dashboard');
  }

  redirectProfile(e) {
    console.log("Redirect To Profile");
    e.preventDefault();
    this.props.history.push('/doctor/profile');
  }

  redirectDoctorFrom(e) {
    console.log("Redirect To Doctor Form");
    e.preventDefault();
    this.props.history.push('/doctor/doctor-form');
  }

  redirectMyPatients(e) {
    console.log("Redirect To MyPatients");
    e.preventDefault();
    this.props.history.push('/doctor/my-patients');
  }

  render() {
    return (
      <div className="leftNavBlock">
        <List>
          <ListItem className={this.props.activePath == '/doctor/dashboard' ? "leftNavListActive" : null} button onClick={this.redirectDashboard} >
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/dashboard.png" alt="page icon" />
            </div>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem className={this.props.activePath == '/doctor/profile' ? "leftNavListActive" : null} button onClick={this.redirectProfile} >
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/editprofile.png" alt="page icon" />
            </div>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem className={this.props.activePath == '/doctor/doctor-form' ? "leftNavListActive" : null} button onClick={this.redirectDoctorFrom}>
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/medicalForm.png" alt="form icon" />
            </div>
            <ListItemText primary="Doctor Form" />
          </ListItem>
          <ListItem className={this.props.activePath == '/doctor/my-patients' ? "leftNavListActive" : null} button onClick={this.redirectMyPatients} >
            <div className="leftNavIcon">
              <img src="/public/images/black-icons/patient2.png" alt="page icon" />
            </div>
            <ListItemText primary="My Patients" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.handleLogout} >
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

export default connect(mapStateToProps)(DoctorLeftNavContainer);