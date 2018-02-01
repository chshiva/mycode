import Cookies from 'js-cookie';
//import React, { Component, PropTypes } from 'react';
import SocketHandler from '../modules/Communication/SocketHandler';
import WoogeenManager from '../modules/Communication/WoogeenManager';
//import { logoutUser } from '../modules/Login/LoginActions';

export default class AuthClient {
	constructor(){

	}

	static getSession(){
		if(typeof(Storage) !== "undefined"){
			// return localStorage.getItem("login_session");
			return Cookies.get("token");
		}else{
			return false;
		}
	}

	static setSession(sessionValue){
		if(typeof(Storage) !== "undefined"){
			// localStorage.setItem("login_session", sessionValue);
			Cookies.set("token", sessionValue, { expires: 7 });
		}
	}

	static deleteSession(){
		// store.dispatch( logoutUser()).then(res=>{
		// if(res.status) {
		if(typeof(Storage) !== "undefined"){
		// localStorage.removeItem("login_session");
		Cookies.remove("token")
		SocketHandler.disconnectServer();
		}
		//  else {
		// 	console.log("Delete session Error");
		// }
		// }
		// })		
	}


 //  //Code added by - Najib, Desc - Setting and getting user role in cookies to use it for routing level access control  
	// static setRole(role){
	// 	if(typeof(Storage) !== "undefined"){
	// 		// localStorage.setItem("login_session", sessionValue);
	// 		Cookies.set("role", role);
	// 	}
	// }

	// static getRole(){
	// 	if(typeof(Storage) !== "undefined"){
	// 		// return localStorage.getItem("login_session");
	// 		return Cookies.get("role");
	// 	}else{
	// 		return false;
	// 	}
	// }
}