import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import AuthClient from '../../components/AuthController.js';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import { loginUserRequest, userLoggingIn, loginUser, isLoggedIn, ForgotPassword, setAndroidId, isSignUp, ClearLoginData, ClearLogin} from './LoginActions';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import LoginWidget from './components/LoginWidget';
import ForgotPasswordWidget from './components/ForgotPasswordWidget';
import { loggedInData } from './LoginReducer';
import  {ToastContainer, ToastMessage} from '../../lib';
import Loading from '../App/components/Loading';
import { switchLanguage } from '../Intl/IntlActions';


const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state ={
      forgotTemp : false,
      signUp : false,
      signIn : false
    }
  }

  componentDidMount() {
    /*this.props.dispatch(*/isSignUp().then(res => this.setState({signUp : res.signUp, signIn : res.signIn}));
    if(this.props.loggedInData && this.props.loggedInData.success && this.props.loggedInData.success != "") {
      this.refs.login_container.success(`${this.props.loggedInData.success} `, ``);
      this.props.dispatch(ClearLogin());
    }
  }

  componentWillMount() {
    // console.log("Comp Mount", AuthClient.getSession());
    //Should call API only if token is present
    if (AuthClient.getSession() != undefined && AuthClient.getSession() != '') {
      this.props.dispatch(isLoggedIn(AuthClient.getSession())).then(res => this.setdata(res));
    } else {
      this.props.dispatch(ClearLoginData());
    }
  }

  /*DSS + Android push notification*/
  // componentDidMount() {
    // var devId = this.props.params.devId;
    // console.log(devId);
    // alert("Device ID: ", devId);
  // }
  /*DSS - Android push notification*/

  setdata = (res) => {
    if(res.status){
      /*Pradeep + Android push notification*/
      if(this.props.params.devId)
        this.props.dispatch(setAndroidId(this.props.params.devId)); 
      /*Pradeep - Android push notification*/

      let loginType = res && res.profile && res.profile.companyid && res.profile.companyid.businessType ? res.profile.companyid.businessType : null; 
      let lang = res && res.locale && res.locale.preferedlanguage ? res.locale.preferedlanguage : 'en';
      this.props.dispatch(switchLanguage(lang, loginType, null));
      /*prudhvi - showing captcha, after success case removeing from cookie*/
      if(typeof(Storage) !== "undefined"){
        Cookies.remove("failcount");
      }
      // this.props.dispatch(loginLanguage(res.data));
      //call api to store android device id in the DB - DSS
      browserHistory.push('/dashboard');
    }else{
      console.log("res....login page", res);
      if(res.error && res.error.length > 0){
        /*prudhvi - showing captcha, setting cookie value*/
        if(typeof(Storage) !== "undefined"){
          if (Cookies.get("failcount")) {
            let count = Number(Cookies.get("failcount")) + 1;
            Cookies.set("failcount", count, { expires: 7 });
          } else {
            Cookies.set("failcount", 1, { expires: 7 });
          }
        }
        this.refs.login_container.error(`${res.error} `, ``);
      }
    }
  }
  /*setPassworddata = (res) => {
   // console.log(res)
    if(res.status){
      this.refs.login_container.success(`${res.message} `, ``);
      // this.setLoginState();
    }else{
      if(res.error && res.error.length > 0){
        this.refs.login_container.error(`${res.error} `, ``);
      }
    }
  }*/

  handleLoginUser = (username, password,isGoogle) => {
      this.props.dispatch(userLoggingIn());
      this.props.dispatch(loginUserRequest({ username, password, isGoogle })).then(res => this.setdata(res));
  };
  /*handleForgotPassword = (username) =>{
    //console.log(username);
    this.props.dispatch(ForgotPassword(username)).then(res => this.setPassworddata(res));

  }*/
  
  setLoginState = () => {
    this.setState({ forgotTemp : false });
  }

  setForgotState = () => {
    this.setState({ forgotTemp : true });
  }

  /*callback = (username) => {
    ForgotPassword(username).then(res => this.setPassworddata(res));
  }*/
  

  renderForm = () =>{
    if(this.state.forgotTemp == true)
      return (<ForgotPasswordWidget signInClick={this.setLoginState} />);
    else
      return (<LoginWidget data={this.props.loggedInData} loginUser={this.handleLoginUser} forgetClick = {this.setForgotState} signUp={this.state.signUp} signIn={this.state.signIn} />);
  }

  render() {
   // console.log("this.props.loggedInData.isLoggingIn", this.props.loggedInData.isLoggingIn);
    //console.log('render',this.state.forgotPwdTemplate)

      if(this.props.loggedInData.isLoggingIn){
        return(
          <div>
            <ToastContainer
              toastMessageFactory={ToastMessageFactory}
              ref="login_container"
              className="toast-top-right"
             />
            <Loading />
          </div>
        );
      }else{
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

}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
  };
}

LoginPage.propTypes = {
  // userdata: PropTypes.arrayOf(PropTypes.shape({
  //   username: PropTypes.string.isRequired,
  //   password: PropTypes.string.isRequired,
  // })).isRequired,
  intl: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  loggedInData: PropTypes.object,
};

LoginPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LoginPage);


// <LoginWidget data={this.props.loggedInData} loginUser={this.handleLoginUser} forgetClick = {this.passwordState}/>

/*<div>
                  <button onClick={this.handlePortal}>from Portal</button>
                </div>
                handlePortal = () => {
    let data = {
      email: "prudhvi123@peoplelinkvc.com"
    }
    return callPortalApi('saveportaluser', 'post', {data : data});
  }            
                
                */