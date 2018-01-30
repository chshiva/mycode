import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Grid, Row} from 'react-bootstrap';

import LeftMenu from '../../Admin/components/LeftMenu';
import { Link, browserHistory } from 'react-router';
// Import Style
import styles from './AdminLayout.css';
import AuthClient from '../../../components/AuthController';
import { isLoggedIn } from '../../Login/LoginActions';
import { loggedInData } from '../../Login/LoginReducer';
import { leftMenuToggle } from '../../App/AppReducer';

import WoogeenManager from '../../Communication/WoogeenManager';

import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { workDashboardData } from '../../Dashboard/UserDashboard/components/WorkDashboardReducer';
import { Roles } from  '../../../roles';

export class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.confObject = new WoogeenManager();
    this.state = {
      role : 0,
      mixStream: false,
      activeDrags: 0,
    }
    this.onStart = this.onStart.bind(this)
    this.onStop = this.onStop.bind(this)
  }

  componentWillMount() {
    //this.props.dispatch(isLoggedIn(AuthClient.getSession(), '')).then(res => this.setdata(res));
  }

  componentDidMount() {
    this.setState({role : this.props.loggedInData.data.role});

     //Check till conference is going on not!
    if(this.confObject.getConnectionStatus()){
      var that = this;
      //Subscribe Mix Stream
      this.confObject.trySubscribeMixStream(function(stream){
        console.log("Mix Stream Got", stream);
        that.setState({mixStream: true});
        that.showVideo(stream);
      })
    }
  }

  showVideo(stream){
    let _video = document.getElementById("objMixVideo");
    if(_video){
      //Create URL
      let _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
      _video.src = _streamURL;
      // _video.volume = 0;
    }
  }

  setdata(result){
    if(result && result.data && result.data.role){
      this.setState({role : result.data.role});
    }
  }

  navigateBack(){
    browserHistory.push("/conf/"+this.confObject.getRoomKey());
  }

  onStart() {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }

  // background-color: #00aafa;
  render() {
    let cls_mixStream = `${styles.mixStream} ${styles.hideObject}`;
    if(this.state.mixStream){
      cls_mixStream = `${styles.mixStream}`;
    }
    let clsContainer = `${styles.container} clearfix`;
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};

    return (
        <div>
          <section className={clsContainer}>
            {this.props.routes[2].path === "/profile/:uid" || this.props.routes[2].path === "/access-denied"?
              null
            :
              <LeftMenu isVisible={this.props.isLeftOnOff} role={this.state.role} confRoom={this.props.workDashboardData.roomKey} urlLink = {location.pathname}/>                
            }
            {this.props.children}
          </section>
          { this.props.loggedInData.data.role != Roles.Student
            ?
            <Draggable handle=".handle" {...dragHandlers}>
              <div className={cls_mixStream} title={this.props.intl.messages.drag}>
                <video className="handle" id="objMixVideo" autoPlay></video>
                <span id="videoBackBtn" className={styles.videoBackButton} onClick={this.navigateBack.bind(this)} title={this.props.intl.messages.back}>
                  <img src="/images/white-icons/white-expand.png" />
                </span>
              </div>
            </Draggable>
            :
            null
          }
        </div>
    );
  }
}

AdminLayout.propTypes = {
  loggedInData: PropTypes.object,
  isLeftOnOff: PropTypes.bool,
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    loggedInData: loggedInData(store),
    isLeftOnOff: leftMenuToggle(store),
    workDashboardData: workDashboardData(store)
  };
}

export default connect(mapStateToProps)(AdminLayout);
