import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OTPConfirmation from './form';
import * as SignupConfService from './services';


class OTPConfirmationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.goToLogin = this.goToLogin.bind(this);
    }

    componentWillMount () {
        console.log('this.props.onVerifyOTPSuccess ', this.props.onVerifyOTPSuccess);
        if (this.props.onVerifyOTPSuccess == null) {
            this.props.history.push('/');            
        }
    }

    goToLogin(formProps) {      
        // this.props.onVerifyOTPSuccess = null;
        this.props.history.push('/');
    }

    render() {
        let messages = {
            onVerifyOTPSuccess: this.props.onVerifyOTPSuccess
        }

        console.log("messages ", messages);

        return (
            <div>
                <OTPConfirmation messages={messages} goToLogin={this.goToLogin} />
            </div>
        )
    }
};




/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    isVerifyOTPLoading: state.verifyOTP.isLoading,
    onVerifyOTPSuccess: state.verifyOTP.onSuccess,
    verifyOTPErrorData: state.verifyOTP.onError
  }
}


/**
 * Map the actions to props.
 */
 const mapDispatchToProps = (dispatch) => {
  return {  };
}

export default connect(mapStateToProps , mapDispatchToProps)(OTPConfirmationContainer);