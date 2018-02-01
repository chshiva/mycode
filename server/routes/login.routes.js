import { Router } from 'express';
import * as LoginController from '../controllers/login.controller';

const loginroute = new Router();

// Login user
loginroute.route('/login').post(LoginController.loginUser);

loginroute.route('/is-loggedin').post(LoginController.isLoggedIn);
loginroute.route('/validateforgotpassword').post(LoginController.validateForgotPassword);
loginroute.route('/isresettokenexpired').post(LoginController.isResetTopkenExpired);
loginroute.route('/isSignUp').get(LoginController.isSignUp);
loginroute.route('/get-footer').get(LoginController.getFooter);
loginroute.route('/activate-user/:token').put(LoginController.activateUserThroughMail);
loginroute.route('/server-config').get(LoginController.getServerConfig);
//loginroute.route('/logout-user').get(LoginController.logoutUser);

export default loginroute;
