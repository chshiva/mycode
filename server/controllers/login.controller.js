import Users from '../models/users';
import dataLog from '../models/datalog';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import md5 from 'md5';
import serverConfig from '../config';
import * as EmailForUserCreation from '../emailFunctions';
import {setSession} from '../server';
import { createRandomString } from '../randomstring';
import { checkValidRequest } from '../authorization';
import * as LoginController from './login.controller';
import { LogLoginStatus } from '../controllers/datalog.controller';
import { Roles } from './admin.user.controller';
import {addSlash, stripSlash} from './slashesActions';
//import redisutils from '../util/redisUtils'
import { saveToLogger } from './datalog.controller';
// export function isLogggedIn(headerInfo) {
//   console.log(headerInfo);
// }
var moment = require('moment');

 export function loginUser(req, res) {
  try {     


    var sess = req.session;
    // console.log(req.body.userdata.username

    if (!req.body.userdata.username || req.body.userdata.username == ""){
      res.json({ status: false, error : "Please enter the Email Address." });
    }else if(!req.body.userdata.password || req.body.userdata.password == ""){
      res.json({ status: false, error : "Please enter the password." });
    }else if(!req.body.userdata.deviceType || req.body.userdata.deviceType == ""){
      res.json({ status: false, error : "Unable to Identify the device." });
    }else{
      // console.log(req.body);

      // var userDetails = await redisutils.getFromRedis(req.body.userdata.username)
      // console.log(userDetails)
      // if(userDetails.success){
      //   res.json({status:false, error:"Please Logout with other clients and try again!"})
      // } else {
      let slashsPassword = addSlash(req.body.userdata.password);
      let slashsEmail = addSlash(req.body.userdata.username);
      var query = Users.findOne({ $or :[{'email': slashsEmail},{'gmail':slashsEmail}, {'facebookMail': slashsEmail}] });
                  /*.populate('profile.companyid', 'businessType _id');*/
      //console.log(query.password);
      query.exec(function (err, person) {
        if (err) res.json({ status: false, error: err });
        if(person){
          if(person.userStatus == 'Active') {
            if ((slashsEmail == person.email && md5(slashsPassword) == person.password) || (slashsEmail == person.email && slashsPassword == person.googleId) || (slashsEmail == person.gmail && slashsPassword == person.googleId)
              || (slashsEmail == person.email && slashsPassword == person.facebookId) || (slashsEmail == person.facebookMail && slashsPassword == person.facebookId)) {
              //TO DO - Generate New Token and Update, send the new token
              var randomstring = '';

              //Function call for creating randomstring
              createRandomString(function(data) {
                randomstring = data
              });
              person.token = md5(randomstring);
              person.deviceType = req.body.userdata.deviceType;
              if(person.deviceType == 'IOS' || person.deviceType == 'ANDROID') {
                if (req.body.userdata.deviceId) {
                  Users.update({ _id : { $ne : person._id }, deviceId : req.body.userdata.deviceId }, {$unset : { deviceId : '' }}, { multi : true }, function(error, response){});
                  person['deviceId'] = req.body.userdata.deviceId;
                } else{
                  // create login failed log
                  res.json({ status : false, error : "Unable to fatch Device ID."});
                  return;
                }
              }

              // updating token when user logging in....
              person.save(function(error,result) {
                if(error) {
                  //console.log("error at save token");
                  console.log(error);
                  res.json({ status: false, error: "Internal server error, Please try again."});
                } else {
                  /*Users.find({ deviceId : req.body.userdata.deviceId }, function(e, data) {
                    console.log("data === ", data);
                  });*/
                  var query = Users
                        .findOne({'token':result.token})
                        .populate('profile.companyid', 'businessType _id');
                  query.exec(function (err, data) {
                    if(err){
                      res.json({ status: false, error : err });
                    }else{
                      dataLog.update({ uid : person._id, category : 'User', action: 'Log_In_Failed', 'value.logged' : false },{$set : {'value.logged' : true}}, {multi : true}, function(logerr, logres){});
                      let _resp = {status:true,token:result.token, data: data, ga_ui: serverConfig.ga_id, socketServer: serverConfig.socketServer, iceServers: serverConfig.iceServers}; 
                      // redisutils.setToRedis(req.body.userdata.username, person.token)

                      // LogLoginStatus(1, data._id);
                    // res.json({status:true,token:result.token, data: person, socketServer: serverConfig.socketServer, iceServers: serverConfig.iceServers});


                      res.json(_resp);
                    }
                  });
                }
              });
            } else {
              if (person.role == Roles.Superadmin) {
                res.json({ status: false, error : "Invalid Credentials. Please try again"});
              } else {

                // create login failed log
                checkBlockUser(person._id, req.body.userdata.username, person.token, function(message) {
                  if (message != null) {
                    res.json({ status: false, error : message});
                  } else {
                    res.json({ status: false, error : "Invalid Credentials. Please try again"});
                  }
                });
              }
            }
          } else {
            res.json({ status: false, error : "In-active account. Please contact admin" });  
          }  
        }else{
          res.json({ status: false, error : "Invalid Credentials. Please try again" });
        }
      });
      //}      
    }
  } catch(e) {
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}


function checkBlockUser(uid, email, token, callback) {
  try {
    let now = moment().subtract(1, 'hour').utc().toDate();
    let checkquery = dataLog.count({ uid : uid, category : 'User', action: 'Log_In_Failed', "value.logged" : false, dateAdded : { $gte : now }});
    checkquery.exec(function(err, count){
      let failed_obj = {
        uid: uid,
        category: 'User',
        action: 'Log_In_Failed',
        value: {logged: false},
        label: 'User Logged In Failed'
      };
      if (count && count >= (serverConfig.failLimit -1)) {
        var randomstring = '';
        createRandomString(function(data) {
          randomstring = data
        });
        let userToken = token ? token : md5(randomstring);
        Users.update({ _id : uid },{$set: { userStatus : "Blocked", token : userToken}}, function(usererr, userres){
          if (userres) {
            let link = 'http://' + serverConfig.domin + '/activate-user/' + userToken;
            let body = 'Dear User,<br /><br />click the below link to activate your account., <br /><br /><a href="' + link +'">' + link + '</a><br /><br />Thanks,<br /><br />' + serverConfig.mail_signature;
            var exchangeData = {
              to : email,
              subject : 'Account Activate Link',
              body : body
            }
            EmailForUserCreation.createUserMail(exchangeData, function(status){
            });
            callback("Your account is blocked, Please contact your administrator");
          } else {
            callback(null);
          }
        });
      } else if (count && count == (Math.round(serverConfig.failLimit/2) - 1)) {
        saveToLogger(failed_obj);
        callback("Your account will be blocked after " + Math.floor(serverConfig.failLimit/2) +" unsuccessful attempts");
      } else {
        saveToLogger(failed_obj);
        callback(null);
      }
    });
  } catch(e) {
    console.log('error in checkBlockUser',e);
    callback(null);
  }
}

/**
* @Function Name: "isLoggedIn",
* @Purpose: "To get user logged in or not.",
* @Request Object: {},
* @Response Object: Success- {status : true,token,  data, socketServer, iceServers, language }, Failure- {status : false, error, language},
* @Author: "Prudhvi"
*/
export function isLoggedIn(req, res) {
  try {
    // console.log("Login Token", req);
    var _token = addSlash(req.body.userdata.session);
    if(!_token) {
      res.json({status: false, language: serverConfig.language});
    } else {
      var query = Users
                      .findOne({'token': _token, 'userStatus' : 'Active'})
                      .populate('profile.companyid', 'businessType _id')
                      .select('-password');

      query.exec(function (err, person) {
        // console.log(err);
        //console.log(person)
          if (err) {
           res.json({ status: false, error : err , language: serverConfig.language});
          } else if(person && person.token) {
              if(_token == person.token) {
                // console.log(person)
                  // LogLoginStatus(2, person._id); //Disabled due to cross check available on each request and for redundancy data, better to handle from local;
                  res.json({ status: true, token: person.token, data: person, ga_ui: serverConfig.ga_id, socketServer: serverConfig.socketServer, iceServers: serverConfig.iceServers, language: serverConfig.language });
              } else {
                res.json({ status: false, error : "Not authorised.", language: serverConfig.language });
              }
          } else {
            res.json({ status: false, error : "Session expired.", language: serverConfig.language });
          }
     });
   }
  } catch(e) {
    console.log('error in isLoggedIn',e);
    res.json({
      status:false,
      error:'Internal server error'
    });
  }
}


export function authCheck(req, res, next){
   console.log(req.headers);
   // if (req.session.auth || req.path==='/auth') {
   //      next();
   //  } else {
   //     res.redirect("/");
   //  }
}

export function validateForgotPassword(req,res){
  //console.log(req.body);
  //console.log(req.headers.host)
  try {
    if(!req.body.username || req.body.username == ""){
      res.json({ status: false, error : "Please enter the Email Address." });
    }else{

      let slashsEmail = addSlash(req.body.username);
      let query = Users.findOne({email : slashsEmail});
      query.exec(function(err,validUser){
        //console.log(validUser)
        if (err) {
          res.json({ status: false, error : err });
        } else {
          if (validUser == null) {
            //console.log('null')
            res.json({ status: false, error : "Enter Valid Email Address" });
          } else if (validUser.userStatus != 'Active') {
            res.json({
              status : false,
              error : "In-active account. Please contact admin"
           });
          } else {
            //console.log('else',validUser)
          if (validUser && validUser.email) {
            /*console.log('validUser',validUser);
            console.log('validUser.email',validUser.email);*/
            if (validUser.guest) {
              res.json({ status: false, error : "Invalid user" });
            } else {
              var randomstring = '';

              //Function call for creating randomstring
              createRandomString(function(data) {
                randomstring = data
              });
              var resetPasswordExpires = Date.now() + 86400000;  //24 hour 
              console.log('domain',serverConfig.domin)

              var exchangeData = {
                    to : validUser.email,
                    subject : 'Reset Password',
                    body : '<span style="margin-top: 30px; font-size: 14px;">'+'Hello '+validUser.firstname+'</span>,'+'<br><br>'+ 'We received a request to reset the password associated with this e-mail address. If you made this request, please follow the instructions below.'+'<br><br>'+'Please click on the link below to reset your password using our secure server'+'<br><br>'+
                    'http://'+serverConfig.domin+'/resetPassword/'+md5(randomstring)
                  }

              EmailForUserCreation.resetRequestMail(exchangeData, function(emailerror, emailsuccess){
                //console.log(emailerror.status)
                if (emailerror.status == false) {
                  res.json({ status: false, error : 'Reset can not done at the moment. Try after some time' });
                  //console.log("Email not sent");
                } else {
                  Users.update({email: validUser.email},
                    {$set : {passwordToken : md5(randomstring), resetPasswordExpires : resetPasswordExpires}} ,                    
                    function(err, numberAffected){
                    if (err) {
                       res.json({ status: false, error : err });
                    } else {
                      res.json({ status: true, message : "Reset password link has been sent to your registered email" });
                      //console.log('inserted token for password')
                    }  
                  });

                  
                }
              });
            }                    
          } else {
            res.json({ status: false, error: " User not found while sending mail"});
          }

          }
          
        }
      })
    }
  } catch(e) {
    console.log('error in validateForgotPassword',e);
    res.json({
      status:false,
      error:'Internal server error'
    });
  }
}

export function isResetTopkenExpired(req, res){
  try {
   console.log(req.body);
   if(!req.body.userdata.token){
    res.json({'status':false,error:'Token not found'});
   }else{
    Users.findOne({passwordToken : addSlash(req.body.userdata.token),resetPasswordExpires: {$gt :Date.now()}},function(err,user){
      if(!user){
        res.json({'status': false,error: 'Password reset token invalid or expired'});
      }else{
        res.json({'status':true})
      }
    });
   }  
  } catch(e) {
    console.log('error in isResetTopkenExpired',e);
    res.json({
      status:false,
      error:'Internal server error'
    });
  }
}

export function activateUserThroughMail(req, res) {
  try {
    if (req.params.token) {
      Users.findOne({ token: req.params.token}, function(error, user) {
        if (user) {
          if (user.userStatus == 'Active') {
            let msg = "Your account (" + user.email + ") already activated, Please Sign In"
            res.json({
              status : false,
              error : msg
            });
          } else if (user.userStatus == 'Deleted') {
            res.json({
              status : false, 
              error : "Oops! Invalid user"
            });
          } else {
            var randomstring = '';
            
            //Function call for creating randomstring
            createRandomString(function(data) {
              randomstring = data
            });
            var userQuery = Users.update({_id : user._id}, {$set : {userStatus:'Active', token: md5(randomstring)}});
            userQuery.exec(function(err, data) {
              if(err) {
                //console.log("query err", err);
                let error = "Oops! " + err.message;
                res.json({
                  status : false, 
                  error : error
                });       
              } else if(data) {
                //console.log("Success", data);
                dataLog.update({ uid : user._id, category : 'User', action: 'Log_In_Failed', 'value.logged' : false },{$set : {'value.logged' : true}}, {multi : true}, function(logerr, logres){});
                let msg = "Your account (" + user.email + ") activated successfully, Please Sign In";
                res.json({
                  status : true, 
                  message : msg
                });
              }
            });
          }
        } else {
          res.json({
            status : false, 
            error : "Oops! Invalid request."
          });
        }
      });
    } else {
      res.json({
        status : false, 
        error : "Oops! Invalid request."
      });
    }
  } catch(e) {
    console.log('error in activateUserThroughMail',e);
    res.json({
      status : false, 
      error : "Oops! Internal server error."
    });
  }
}

export function isSignUp(req, res) {
  res.json({signUp : serverConfig.isSignUp, signIn : serverConfig.isGoogleSignIn, google: serverConfig.googleEnable, facebook: serverConfig.facebookEnable });
}

export function getFooter(req, res) {
  res.json({message : serverConfig.footer});
}


// export function logoutUser(req, res) {
//   checkValidRequest(req.headers, function(person) {
//     try{
//       if (person == null) {
//         res.json({ status: false, error : "Invalid request" });
//       }
//       else{
//         redisutils.removeFromRedis(person.email, function(resp){
//           res.json({status: true});
//         });
//       }
//     }catch(e){  
//       console.log(e)
//       res.json({ status : false, error : "Internal server error." });
//     }
//   }) 
// }
