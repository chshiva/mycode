import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ForgotPassword from './form';
import { forgotPasswordAction, forgotPasswordError } from './actions';

class ForgotPwdContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitForgotPassword = this.submitForgotPassword.bind(this);
  }

  submitForgotPassword(email) {
    this.props.forgotPasswordAction(email);
  }

  componentDidMount() {
    this.props.forgotPasswordError(null);
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.onSuccess) {
      this.props.history.push('/forgot-password-confirmation');
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
        <ForgotPassword submitForgotPassword={this.submitForgotPassword} messages={messages} />
      </div>
    )
  }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    isLoading: state.forgotPassword.isLoading,
    onSuccess: state.forgotPassword.success,
    onError: state.forgotPassword.error
  }
}


/**
 * Map the actions to props.
 */

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPasswordAction: (email) => dispatch(forgotPasswordAction(email)),
    forgotPasswordError: (error) => dispatch(forgotPasswordError(error))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwdContainer);