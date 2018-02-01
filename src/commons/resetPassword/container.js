import React from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResetPassword from './form';
import { resetPasswordAction } from './actions';

class ResetPasswordContainer extends React.Component {
    constructor(props) {
      super(props);
      this.submitResetPassword = this.submitResetPassword.bind(this);
    }

    submitResetPassword(resetPasswordRequestData) {
      console.log("resetPasswordRequestData ", resetPasswordRequestData);
      resetPasswordRequestData.token = this.props.token;
      console.log("resetPasswordRequestData ", resetPasswordRequestData);
      this.props.resetPasswordAction(resetPasswordRequestData);
    }

    componentWillReceiveProps (nextprops) {
      if (nextprops.onSuccess) {
        console.log("ON success ");
        this.props.history.push('/reset-password-confirmation');
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
          <ResetPassword submitResetPassword={this.submitResetPassword} messages={messages}/>
        </div>
      )
    }
};


/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    isLoading: state.resetPassword.isLoading,
    onSuccess: state.resetPassword.resetPasswordResponseSuccess,
    onError: state.resetPassword.resetPasswordResponseErrorData
  }
}


/**
 * Map the actions to props.
 */
 const mapDispatchToProps = (dispatch) => {
  return {
    resetPasswordAction: (resetPasswordRequestData) => dispatch(resetPasswordAction(resetPasswordRequestData))
  };
}

const urlPropsQueryConfig = {
    token: { type: UrlQueryParamTypes.string },
};

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps , mapDispatchToProps)(ResetPasswordContainer));