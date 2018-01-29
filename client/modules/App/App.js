import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Grid, Row} from 'react-bootstrap';
import Analytics from '../Communication/Analytics';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading';
import { loggedInData } from '../Login/LoginReducer';
import { isLoggedIn } from '../Login/LoginActions';
import AuthClient from '../../components/AuthController';

// Import Actions
import { toggleAddPost, toggleLeftMenu, getFooter } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';
import FontAwesome from 'react-fontawesome';
import SocketHandler from '../Communication/SocketHandler';

import { workDashboardData } from '../Dashboard/UserDashboard/components/WorkDashboardReducer';

var callOnce = false;

export class App extends Component {
  constructor(props) {
    super(props);
    //socketErrorCode [0-initialize, 1-connected, 2 - failed to connect, 3-not configured]
    this.state = { isMounted: false, statusBox: false, loadnow: false, socketErrorCode: 0, footer : null };
    this.setdata = this.setdata.bind(this);
  }

  componentWillMount() {
    // console.log("App will Mount");
    //this.props.dispatch(isLoggedIn(AuthClient.getSession())).then(res=>{this.setdata(res)});
  }

  setdata(res){
    //this.setState({loadnow: true});
    var that = this;
    // console.log("App Res", res);
    if(res.status && res.socketServer){
      if(!callOnce){
          callOnce = true;
          SocketHandler.connectServer(res.data._id, res.socketServer, res.iceServers, function(status){
            if(status){
              that.setState({loadnow: true, socketErrorCode: 1});
            }else{
              console.log("Error");
              that.setState({socketErrorCode: 2});
            }
          });
          var _objAnalytics = new Analytics();
          _objAnalytics.Initialize(res.ga_ui, res.data._id);
      }
    }else{
      that.setState({loadnow: true, socketErrorCode: 3});
    }
  }
  
  componentDidMount() {
    this.props.dispatch(isLoggedIn(AuthClient.getSession())).then(res=>{this.setdata(res)});
    getFooter().then(res => this.setState({ footer : res.message }));
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  renderFooter() {
    if(!this.props.loggedInData.status){
      return (
        <Footer message={this.state.footer}/>
      );
    }else{
      return;
    }
  }

  helmet(colorCode, StickyMargin){
    var bgCss;
    if(StickyMargin>0){
        bgCss = "body {background-color: " + colorCode + "; margin-bottom: "+ StickyMargin + "px;}";
    }else{
        bgCss = "body {background-color: " + colorCode + "; margin: 0;}";
    }
    return(
      <Helmet
            title="InstaVC - Business Edition"
            titleTemplate="%s - Make your communication simple & easy"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'user-scalable=no,initial-scale=1.0001,maximum-scale=1.0001',
              },
            ]}
            link={[
                  {rel: "shortcut icon", href: "/images/icons/favicon.ico"}
                ]}
            style={[
              {cssText: bgCss}
            ]}
          />
      );
  }
  
  getHelmet(){
      if(this.props.loggedInData.status){
        return this.helmet('#f4f4f4', 0);
      }else{
        return this.helmet('#008abc', 65);
      }
  }

  showStatusBox(e){
    e.stopPropagation();
    this.setState({
      statusBox: !this.state.statusBox
    });
  }

  hideStatusBox(e){
    this.setState({
      statusBox: false
    }); 
  }

  toggleLeft(e){
    console.log("Toogle dispatch");
    this.props.dispatch(toggleLeftMenu());
  }
  // background-color: #00aafa;
  render() {
    if(this.state.loadnow){
      let fullName = ""
      let loginType = ""
      let data = this.props.loggedInData.data;
      if(data && data.firstname){
        //console.log(this.props.loggedInData.data)
        //console.log(this.props.loggedInData.data);
        fullName = data.firstname;
        fullName = data.lastname ? fullName +' ' +data.lastname : fullName;
        if(data.profile && data.profile.companyid && data.profile.companyid.businessType){
          //console.log(data.profile.companyid.businessType)
          loginType = data.profile.companyid.businessType;
        }
        
      } 
      if(this.props.loggedInData && this.props.loggedInData.data) {
        var loggedInData = this.props.loggedInData
      }
      //console.log('header',this.props);
      
    
        return (
          <div onClick={this.hideStatusBox.bind(this)}>
            {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
              {this.getHelmet()}
              <Header
                switchLanguage={lang => this.props.dispatch(switchLanguage(lang,loginType))}
                intl={this.props.intl} loggedStatus={loggedInData}
                toggleAddPost={this.toggleAddPostSection}
                showPopCallback={this.showStatusBox.bind(this)}
                showPop={this.state.statusBox}
                toggleLeft={this.toggleLeft.bind(this)}
                fullName={fullName}
                isGuest = {data.guest ? data.guest : false}
                confRoom={this.props.workDashboardData.roomKey}
              />
              {this.props.children}
              {this.renderFooter()}
          </div>
        );
    }else{
      var message='';
      if(this.state.socketErrorCode == 2){
        message = 'Connect to server failed, Trying to re-connect';
        console.log(message);
      }
      return(
        <Loading message={message} />
      );
    }
  }
}

App.propTypes = {
  loggedInData: PropTypes.object,
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    loggedInData: loggedInData(store),
    workDashboardData: workDashboardData(store)
  };
}

export default connect(mapStateToProps)(App);
