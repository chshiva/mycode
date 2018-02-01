import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './form';

import { loginAction, setUserType, getUserRole, setLoginErrorData, emptyError } from './actions';
import { callGetUserDetailsApi } from '../layouts/patientLayout/layout/services';
import { CircularProgress } from 'material-ui/Progress';
import socketService from '../pplsocket/socketService';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.state = {
          showPage: false
        };
        this.connectionCallback = this.connectionCallback.bind(this);
    }

    componentWillMount () {
      this.props.setUserType(null);
      this.props.emptyError()
    }

    componentDidMount () {
      this.props.setUserType(null);
      this.props.emptyError()
      var userAuthToken = localStorage.getItem('userAuthToken');
      if (userAuthToken != null) {
        this.props.getUserRole();
        callGetUserDetailsApi(response => {
          if (!response.status && response.result.userData) {
            var userType = response.result.userData.userType;
            if (userType === "patient") {
              this.props.history.push('/patient/dashboard');
            } else if (userType === "doctor") {
              this.props.history.push('/doctor/dashboard');
            } else {
              console.log("Looks like someone is trying to login as an admin");
              localStorage.clear();
              this.props.history.push('/');
            }
          } else if (response.status && response.result.data) {
            var userType = response.result.data.userType;
            if (userType === "patient") {
              this.props.history.push('/patient/dashboard');
            } else if (userType === "doctor") {
              this.props.history.push('/doctor/dashboard');
            } else {
              console.log("Looks like someone is trying to login as an admin");
              localStorage.clear();
              this.props.history.push('/');
            }
          } else {
            localStorage.clear();
            this.props.history.push('/');
            this.props.dispatch(setLoginErrorData(response.result.message));
          }
          this.setState({ showPage: true });
        });
      } else {
        this.setState({ showPage: true });
      }
    }

    submitLoginForm(loginRequestData) {
      this.props.loginAction(loginRequestData);
    }

    componentWillReceiveProps (nextprops) {
      console.log("Will receive props");
      if (nextprops.onSuccess && nextprops.onSuccess.userAuthToken && nextprops.onSuccess.userAuthToken != null && nextprops.userType) {
        console.log("---------------- nextprops.userType ", nextprops.isDoctorForm);
        if (nextprops.userType === "patient") {
          this.props.history.push('/patient/dashboard');
          socketService.connect(this.connectionCallback);
        } else if (nextprops.userType === "doctor" ) {
          if (nextprops.isDoctorForm ) this.props.history.push('/doctor/dashboard')
          else  this.props.history.push('/doctor/doctor-form');
          socketService.connect(this.connectionCallback);
        } else {
          console.log("Looks like someone is trying to login as an admin");
          localStorage.clear();
          this.props.history.push('/');
        }
      }
    }
    

    connectionCallback(response) {
      console.log('response:', response);
    }

    render() {
      let messages = {
        isLoading: this.props.isLoading,
        onSuccess: this.props.onSuccess,
        onError: this.props.onError
      };

      if (this.state.showPage) {
        return (
          <div>
            <LoginForm submitLoginForm={this.submitLoginForm} messages={messages} />
          </div>
        );
      } else {
        return (<div className="circularProgress"> <CircularProgress /> </div>);
      }

    }
};


/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    isLoading: state.login.isLoading,
    onSuccess: state.login.onSuccess,
    onError: state.login.onError,
    userType: state.login.userType,
    isDoctorForm:state.login.isDoctorForm
  }
}


/**
 * Map the actions to props.
 */
 const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (loginRequestData) => dispatch(loginAction(loginRequestData)),
    setUserType: (data) => dispatch(setUserType(data)),
    getUserRole: () => dispatch(getUserRole()),
    setLoginErrorData: (data) => dispatch(setLoginErrorData(data)),
    emptyError: () => dispatch(emptyError())
  };
}

export default connect(mapStateToProps , mapDispatchToProps)(LoginContainer);