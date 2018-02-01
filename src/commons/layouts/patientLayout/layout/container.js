import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';

import * as patientLayoutActions from './actions';
import { PrivateRoute } from '../../../protectedRoute';
import { callGetUserDetailsApi } from './services';

import PatientHeaderContainer from '../header/container';
import PatientLeftNavContainer from '../leftSideNav/container';
import socketService from '../../../../commons/pplsocket/socketService';

class PatientLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }

    this.logout = this.logout.bind(this);
    this.onAccept = this.onAccept.bind(this);
  }

  logout(e) {
    localStorage.clear();
    this.props.history.push('/');
  }
  componentDidMount() {
    var self = this;
    var userAuthToken = localStorage.getItem('userAuthToken');
    if (userAuthToken != null) {
      callGetUserDetailsApi(function (response) {
        if (!response.status) {
          if (response.result && (response.result.isInvalidToken || response.result.userNotFound)) {
            localStorage.clear();
            self.props.dispatch(patientLayoutActions.setUserAuthToken(null));
            self.props.dispatch(patientLayoutActions.setUserDetails(null));
          } else if (response.result && response.result.authChecks) {
            var authChecks = response.result.authChecks;
            var userData = response.result.userData;
            if (userData.userType != 'patient') self.props.history.push('/');
            else {
              self.props.dispatch(patientLayoutActions.setMobileNumberVerification(authChecks.isMobileNumberVerified));
              self.props.dispatch(patientLayoutActions.setConsentVerification(authChecks.isConsentAgreed));
              self.props.dispatch(patientLayoutActions.setMedicalFormFillingStatus(authChecks.isMedicalFormFilled));
              if (userData) self.props.dispatch(patientLayoutActions.setUserDetails(userData));

              if (!authChecks.isMobileNumberVerified) self.props.history.push('/request-otp');
              else if (!authChecks.isConsentAgreed) self.props.history.push('/patient/consent-page');
            }

          } else {
            console.log(response.result.message);
          }
        } else {
          if (response && response.result && response.result.data && response.result.data.userType == "patient") {
            self.props.dispatch(patientLayoutActions.setMobileNumberVerification(true));
            self.props.dispatch(patientLayoutActions.setConsentVerification(true));
            self.props.dispatch(patientLayoutActions.setMedicalFormFillingStatus(true));
            self.props.dispatch(patientLayoutActions.setUserDetails(response.result.data));
          } else {
            self.props.history.push('/');
          }

        }
        socketService.listen('accept', self.onAccept);
        self.setState({ isLoading: false });
      });
    } else {
      localStorage.clear();
      self.props.dispatch(patientLayoutActions.setUserAuthToken(null));
      self.props.dispatch(patientLayoutActions.setUserDetails(null));
      self.props.history.push('/');
    }
  }
  onAccept(response) {
    console.log('response:', response);
  }
  render() {
    let activePath = this.props.history.location.pathname;
    console.log("this.props.history ", this.props.history);
    if (this.state.isLoading) {
      return (<div className="circularProgress"> <CircularProgress /> </div>);
    } else {
      return (
        <div>
          <PatientHeaderContainer history={this.props.history}/>
          <PatientLeftNavContainer history={this.props.history} activePath={activePath} />
          <PrivateRoute exact path={this.props.path} component={this.props.component} />
        </div>
      );
    }
  }
}
/* Map the state to props. */
const mapStateToProps = function (state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(PatientLayout);