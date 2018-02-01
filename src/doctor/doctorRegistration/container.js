import React from 'react';
import { connect } from 'react-redux';
import RegistrationForm from './form';

import { doctorRegistrationAction } from './actions';

class DoctorRegistrationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitRegistration = this.submitRegistration.bind(this);
  }

  submitRegistration(formObject) {
    formObject['userName'] = formObject['email'];
    this.props.doctorRegistrationAction(formObject);
  }

  componentWillMount() {
    if (this.props.userAuthToken && this.props.userAuthToken != null) {
      this.props.history.push('/patient/dashboard');
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.onSuccess && nextprops.onSuccess != null) {
      var userid = nextprops.onSuccess.userid;
      this.props.history.push('/verify-otp/' + userid);
    }
  }

  render() {
    let messages = {
      isLoading: this.props.isLoading,
      onSuccess: this.props.onSuccess,
      onError: this.props.onError
    };

    return (
      <div>
        <RegistrationForm submitRegistration={this.submitRegistration} messages={messages} />
      </div>
    )
  }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    userAuthToken: state.user.userAuthToken,
    isLoading: state.doctorRegistration.isLoading,
    onSuccess: state.doctorRegistration.onSuccess,
    onError: state.doctorRegistration.onError
  }
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    doctorRegistrationAction: (registrationFormData) => dispatch(doctorRegistrationAction(registrationFormData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRegistrationContainer);