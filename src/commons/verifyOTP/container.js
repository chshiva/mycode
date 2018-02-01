import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OtpForm from './form';
import { requestForVerifyOTP, requestForOTP, nullifyMessages } from './actions';


class VerifyOtpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.vefityOTP = this.vefityOTP.bind(this);
    this.requestOTP = this.requestOTP.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(nullifyMessages());
  }

  componentDidMount () {
    this.props.dispatch(nullifyMessages());    
    if (this.props.match.params && this.props.match.params.userId && this.props.match.params.userId != null) {
      let userId = this.props.match.params.userId;
      this.props.dispatch(requestForOTP(userId));
      // this.props.requestForOTP(userId);
    } else {
      this.props.dispatch(requestForOTP());
      // this.props.requestForOTP();
    }
  }

  vefityOTP(otpEntered) {
    console.log("otpEntered ", otpEntered);
    var otp = otpEntered.otpOne+otpEntered.otpTwo+otpEntered.otpThree+otpEntered.otpFour+otpEntered.otpFive+otpEntered.otpSix;
    var obj = {otp: otp};

    if (this.props.match.params && this.props.match.params.userId) {
      obj.userid = this.props.match.params.userId;
    }

    console.log("verfiryOTPRequestData ", obj);

    this.props.dispatch(requestForVerifyOTP(obj));

    // this.props.requestForVerifyOTP(obj);
  }
  requestOTP (userid){
    this.props.dispatch(requestForOTP(userid));
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.onVerifyOTPSuccess && localStorage.getItem('userAuthToken')) {
      this.props.history.push('/patient/dashboard');
    } else if (nextprops.onVerifyOTPSuccess && !localStorage.getItem('userAuthToken')) {
      this.props.history.push('/otp-confirmation');
    }
  }

  render () {
    let messages = {
      isRequestForOTPLoading: this.props.isRequestForOTPLoading,
      requestOTPSuccessData: this.props.requestOTPSuccessData,
      requestOTPErrorData: this.props.requestOTPErrorData,
      isVerifyOTPLoading: this.props.isVerifyOTPLoading,
      onVerifyOTPSuccess: this.props.onVerifyOTPSuccess,
      verifyOTPErrorData: this.props.verifyOTPErrorData   
    };

    return (
      <div>
        <OtpForm vefityOTP={this.vefityOTP} messages={messages} requestForOTP={this.requestOTP} userId={this.props.match.params.userId}/>
      </div>
    )
  }
};


/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    isRequestForOTPLoading: state.requestOTP.isLoading,
    requestOTPSuccessData: state.requestOTP.onSuccess,
    requestOTPErrorData: state.requestOTP.onError,

    isVerifyOTPLoading: state.verifyOTP.isLoading,
    onVerifyOTPSuccess: state.verifyOTP.onSuccess,
    verifyOTPErrorData: state.verifyOTP.onError
  }
}


/**
 * Map the actions to props.
 */
//  const mapDispatchToProps = (dispatch) => {
//   return {
//     requestForVerifyOTP: (verifyOTPRequestData) => dispatch(requestForVerifyOTP(verifyOTPRequestData)),
//     requestForOTP: (sendOTPObject) => dispatch(requestForOTP(sendOTPObject))
//   };
// }

// export default connect(mapStateToProps , mapDispatchToProps)(VerifyOtpContainer);
export default connect(mapStateToProps)(VerifyOtpContainer);