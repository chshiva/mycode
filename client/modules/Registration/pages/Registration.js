import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import AuthClient from '../../../components/AuthController.js';
import { browserHistory } from 'react-router';

//import { loginUserRequest, userLoggingIn, loginUser, isLoggedIn, ForgotPassword, setAndroidId} from './LoginActions';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import RegistrationForm from '../components/RegistrationForm';
import { loggedInData } from '../../Login/LoginReducer';
import { setLoginResponse } from '../../Login/LoginActions';
import  {ToastContainer, ToastMessage} from '../../../lib';
import { switchLanguage } from '../../Intl/IntlActions';
import config from '../../../../server/config';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class Registration extends Component {
  constructor(props){
    super(props);
    this.state ={
      
    }
  }

  componentWillMount() {
    if(!config.isSignUp) {
      browserHistory.push('/');  
    }
  }

  responseCallback = (message) => {
    console.log("message === ", message);
    this.props.dispatch(setLoginResponse(message));
    browserHistory.push('/');
  }

  renderForm = () =>{    
      return (<RegistrationForm responseCallback={this.responseCallback}/>);
  }

	render() {
    //console.log(this.props)
    //console.log('render',this.state.forgotPwdTemplate)

      
    return (
      <Col md={12}>
        <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="login_container"
            className="toast-top-right"
           />
        {this.renderForm()}            
      </Col>
    );      
  	}
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
  	loggedInData: loggedInData(state),
  };
}

Registration.propTypes = {
  intl: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  loggedInData: PropTypes.object,
};

Registration.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Registration);
