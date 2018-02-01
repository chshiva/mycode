import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import * as doctorLayoutActions from './actions';
import { PrivateRoute } from '../../../protectedRoute';
import { callGetUserDetailsApi } from './services';
import Button from 'material-ui/Button';
import DoctorHeaderContainer from '../header/container';
import DoctorLeftNavContainer from '../leftSideNav/container';
import DoctorPendingApprovalContainer from '../../../../doctor/pendingApproval/container';
import socketService from '../../../../commons/pplsocket/socketService';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';

class DoctorLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isVideoCall: false
    }
    this.logout = this.logout.bind(this);
    this.onVideoCallReq = this.onVideoCallReq.bind(this);
    this.onNoAnswer = this.onNoAnswer.bind(this);
  }
  logout(e) {
    localStorage.clear();
    this.props.history.push('/');
  }

  componentWillMount() {
    console.log("Doctor Layout componentWillMount");
  }
  componentDidMount() {
    console.log("Doctor Layout componentDidMount");
    var self = this;

    var userAuthToken = localStorage.getItem('userAuthToken');

    if (userAuthToken != null) {
      callGetUserDetailsApi(function (response) {
        if (!response.status) {
          if (response.result && (response.result.isInvalidToken || response.result.userNotFound)) {
            localStorage.clear();
            self.props.dispatch(doctorLayoutActions.setUserAuthToken(null));
            self.props.dispatch(doctorLayoutActions.setUserDetails(null));
          } else if (response.result && response.result.authChecks) {
            var authChecks = response.result.authChecks;
            var userData = response.result.userData;
            console.log('userData', userData);
            if (userData.userType != 'doctor') self.props.history.push('/');
            else {
              self.props.dispatch(doctorLayoutActions.setMobileNumberVerification(authChecks.isMobileNumberVerified));
              self.props.dispatch(doctorLayoutActions.setConsentVerification(authChecks.isConsentAgreed));
              // self.props.dispatch(doctorLayoutActions.setDoctorFormFillingStatus(authChecks.isDoctorFormFilled));
              if (userData) self.props.dispatch(doctorLayoutActions.setUserDetails(userData));

              if (!authChecks.isMobileNumberVerified)
                self.props.history.push('/request-otp');
              else if (!authChecks.isConsentAgreed)
                self.props.history.push('/doctor/consent-page');
            }

          } else {
            console.log(response.result.message);
          }
        } else {
          if (response && response.result && response.result.data && response.result.data.userType == "doctor") {
            console.log("response.result.data ", response.result.data);
            self.props.dispatch(doctorLayoutActions.setMobileNumberVerification(true));
            self.props.dispatch(doctorLayoutActions.setConsentVerification(true));
            // self.props.dispatch(doctorLayoutActions.setDoctorFormFillingStatus(authChecks.isDoctorFormFilled));
            self.props.dispatch(doctorLayoutActions.setUserDetails(response.result.data));
          } else {
            self.props.history.push('/');
          }
        }
        socketService.incomingVideoCall(self.onVideoCallReq);
        self.setState({ isLoading: false });
      });
    } else {
      localStorage.clear();
      self.props.dispatch(doctorLayoutActions.setUserAuthToken(null));
      self.props.dispatch(doctorLayoutActions.setUserDetails(null));
      self.props.history.push('/');
    }
  }

  onVideoCallReq(response, ackCallback) {
    this.setState({ isVideoCall: true });
  }

  onAccept() {
    this.setState({ isVideoCall: false });
    socketService.ackVideoCall({ isAccept: true });
    this.props.history.push('/doctor/video-call');
  }

  onReject() {
    this.setState({ isVideoCall: false });
    socketService.ackVideoCall({ isReject: true });
  }

  onNoAnswer() {
  }

  render() {
    let activePath = this.props.history.location.pathname;
    if (this.state.isLoading) {
      return (<div className="circularProgress"> <CircularProgress /> </div>);
    } else if ((this.props.user && this.props.user.userDetails && this.props.user.userDetails.isApprove) || this.props.path == "/doctor/doctor-form" || this.props.path == "/doctor/pending-approval") {
      return (
        <div>
          <Dialog open={this.state.isVideoCall}>
            <DialogTitle id="alert-dialog-title" className="dialogHeader">
              <div className="rippleHeadline">
                <h2 className="rippleheadlineTxt">Incoming Call from a Patient!</h2>
                <div className="bufferBlock">
                  <h3 className="bufferCount">10 min</h3>
                  <CircularProgress className="" size={80} mode="determinate" value={100} min={0} max={100} />
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <div className="rippleContainer">
                <div className="rippleBlock">
                  <div className="imageCircle">
                    <div className="circleRipple">
                      <img src="/public/images/white-icons/patient.png" alt="patient" />
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions className="callBtmBtm">
              <Button autoFocus id="acceptCall" raised className="greenCallBtn" type="submit" onClick={this.onAccept.bind(this)}>
                <i className="material-icons">call</i> Accept
              </Button>
              <Button onClick={this.onReject.bind(this)} color="primary" id="rejectCall" raised className="redCallBtn" type="submit">
                <i className="material-icons">call_end</i> Reject
              </Button>

            </DialogActions>
          </Dialog>
          <DoctorHeaderContainer />
          <DoctorLeftNavContainer history={this.props.history} activePath={activePath} />
          <PrivateRoute exact path={this.props.path} component={this.props.component} />
        </div>
      );
    } else {
      return (
        <Redirect to='/doctor/pending-approval' />
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

export default connect(mapStateToProps)(DoctorLayout);