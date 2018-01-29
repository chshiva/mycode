import React, { Component, PropTypes } from 'react';
import WoogeenManager from '../../../Communication/WoogeenManager';
import { connect } from 'react-redux';
import styles from '../../Dashboard.css';
import { createGuestAccount } from '../../../Communication/ConferenceActions';
import { loginUserRequest } from '../../../Login/LoginActions';
import { browserHistory } from 'react-router';
import { Expressions } from '../../../../lib/expressions.js';
import {ToastContainer, ToastMessage} from '../../../../lib';
import loginStyles from '../../../Login/components/LoginWidget.css';
import { setTransport } from '../../../Communication/ConferenceActions';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class GuestConference extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	proxy : false
    }
  }

  handleruserEnterKey=(e)=>{	
		if(e.key === 'Enter'){
			e.preventDefault();
			this.CreateGuest();
		}
	}

	CreateGuest = () => {
		// this.roomKey = this.props.params.rid;
		//changeBy: pranathi, disc:  added trim method to input values
		if (this.refs.name.value != '' && this.refs.name.value.trim() != '' && this.refs.email.value != '' && this.refs.email.value.trim() != '') {
			var nameRegExp = RegExp(Expressions.get('ALPHAwithSPACE'));
			var emailRegExp = RegExp(Expressions.get('EMAIL'));
			if(!nameRegExp.test(this.refs.name.value))
				this.refs.container.error("Invalid name format.", ``);
			else if(!emailRegExp.test(this.refs.email.value))
				this.refs.container.error("Invalid email format.", ``);
			else {
				let guestObject = {};
				if (this.props.params.rid) {
					guestObject = {
						guestName : this.refs.name.value,
						guestEmail : 'guest_'+this.refs.email.value.toLowerCase(),
						roomKey : this.props.params.rid
					}
				} else if (this.props.params.sid){
					guestObject = {
						guestName : this.refs.name.value,
						guestEmail : 'guest_'+this.refs.email.value.toLowerCase(),
						slotId : this.props.params.sid
					}
				};
				// console.log(guestObject);
				this.props.dispatch(createGuestAccount(guestObject)).then(res => this.LoginGuest(res));
			}
		} else{
    	this.refs.container.error("All fields are mandatory.", ``);
			// console.log("All fields are mandatory.");
		};
	}

	LoginGuest (res) {
		// console.log("Guest create response--- ", res);
		if (res.status) {
      let userdata = {
        username: 'guest_'+this.refs.email.value.toLowerCase(),
        password: 'Guest@123DefaultPwd',
        isGoogle: false
      };
      // console.log("Guest login object -- ", userdata);
			this.props.dispatch(loginUserRequest(userdata)).then(response => this.JoinConference(response, res.roomKey));
		} else{
			this.refs.container.error(`${res.error}`, ``);
			// console.log("Error --- ", res.error);
		};
	}

	JoinConference (response, roomKey) {
		// console.log("Guest login response -- ", response, roomKey);
		browserHistory.push('/conf/'+roomKey);
	}

	handleProxy = () => {
		let proxy = this.state.proxy;
		if (proxy) {
			this.props.dispatch(setTransport('all'));
			this.setState({ proxy : false});
		} else {
			this.props.dispatch(setTransport('relay'));
			this.setState({ proxy : true });
		}
	}

	render(){

  	let cls_rememberMe = `${loginStyles.rememberMe} ${loginStyles.guestBehindNetText} clearfix`;
  	let cls_loginSwitch = `${loginStyles.guestBehindNetBtn} ${loginStyles.loginSwitch} `;
  	let cls_loginSlider =`${loginStyles.loginSlider} ${loginStyles.round} ${loginStyles.guestBehindNetbtnColor}`;
  	let cls_btnJoinConference = `${loginStyles.btnJoinConference} ${styles.GbtnProceed} `

		return (
			<div className={styles.GcenterAlign}>
				<ToastContainer
					toastMessageFactory={ToastMessageFactory}
					ref="container"
					className="toast-top-right"
				/>
				<div>
					<div className={loginStyles.loingLogoBlock}>
						<img src="/images/logo/instavc-logo.png" />
					</div>
					<div className={styles.GmsgBlock}>
	          <div>
							<h4 className={styles.GscHeading} >Please enter your Name</h4>
		          <div className={styles.GinputGroup}>
		            <input type="text" id="name" ref="name" placeholder="Enter full name.." className={styles.inputTxt} tabIndex="1" />
		          </div>
		            <h4 className={styles.GscHeading}>Please enter your Email</h4>
		          <div className={styles.GinputGroup}>
		            <input type="email" id="email" ref="email" placeholder="Enter emailId here.." className={styles.inputTxt} onKeyPress={this.handleruserEnterKey} tabIndex="2" />
		          </div>
		          <div className={loginStyles.btnBlockJoinConference} >
		            <button  id="joinConference" className={cls_btnJoinConference} onClick={this.CreateGuest} tabIndex="3">
		            	Join Conference
		            </button>
	            </div>
	          </div>
	          <div className={cls_rememberMe}>
          		<span>Enable Proxy</span>
          		<label className={cls_loginSwitch}>
          			<input id="proxy" type="checkbox" onChange={this.handleProxy} checked={this.state.proxy}/>
          			<div className={cls_loginSlider}></div>
          		</label>
          	</div>
					</div>
				</div>
			</div>
		);
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
  };
}

GuestConference.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GuestConference);
