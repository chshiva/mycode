import React from 'react';
import { bindActionCreators } from 'redux';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import { connect } from 'react-redux';
import VerifyEmail from './form';
import { requestForEmailVerification } from './actions';


class VerifyEmailContainer extends React.Component {    
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    console.log("component will mount token is ", this.props.token);
    this.props.requestForEmailVerification(this.props.token);
  }

  render() {
    let messages = {
      isLoading: this.props.isLoading,
      onSuccess: this.props.onSuccess,
      onError: this.props.onError
    };

    console.log('messages ', messages);

    return (
        <div>
          <VerifyEmail messages={messages} />
        </div>
    )
  }
};


const mapStateToProps = function (state) {
  return {
    isLoading: state.verifyEmail.isLoading,
    onSuccess: state.verifyEmail.onSuccess,
    onError: state.verifyEmail.onError
  }
}


 const mapDispatchToProps = (dispatch) => {
  return {
    requestForEmailVerification: (token) => dispatch(requestForEmailVerification(token))
  };
}

const urlPropsQueryConfig = {
    token: { type: UrlQueryParamTypes.string },
};

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps , mapDispatchToProps)(VerifyEmailContainer));