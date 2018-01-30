/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './modules/App/App';
import AdminLayout from './modules/Layouts/AdminLayout/AdminLayout';
import DashLayout from './modules/Layouts/DashLayout/DashLayout';
import HomeLayout from './modules/Layouts/HomeLayout/HomeLayout';
import AuthClient from './components/AuthController';
// import { browserHistory } from 'react-router';
import { Redirect } from 'react-router';
import callApi from './util/apiCaller';
import { isLoggedIn } from './modules/Login/LoginActions';
import Cookies from 'js-cookie';
import { Roles } from  './roles';
// import Roles from './roles';
// import _ from 'lodash';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  //require('./modules/Login/LoginPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
var userRole='';
var isGuest='';
const userIsLoggedIn = (nextState, replace, callback) => {
  // console.log("Cookie", AuthClient.getSession());
  // if(AuthClient.getSession()){
  //     callApi('isloggedin', 'post', {
  //       userdata: {
  //         session: AuthClient.getSession(),
  //       },
  //     }).then(res => {
  //       // console.log(AuthClient.getSession(), res);
  //       if(res.status === false){
  //         // replace({pathname:'/'});
  //         callback();
  //       }else{
  //         callback();
  //       }
  //     });
  // }else{
  //   callback();
  // }

    // callback();
    //console.log("Router state....", nextState);

    //console.log("AuthClient.getRole()----", AuthClient.getRole());

    if(AuthClient.getSession() != false && typeof(window)){
      if(AuthClient.getSession() != ''){
            callApi('is-loggedin', 'post', {
              userdata: {
                session: AuthClient.getSession(),
              },
            }).then(res => {
               //console.log("response in router---", res);
              if(res.status === false){
                replace({pathname:'/'});
                callback();
              // }else if(res && res.status && res.data && res.data.guest){
              //   callApi ('delete-guest/loginPage', 'delete');
              //   AuthClient.deleteSession();
              //   // replace({pathname:'/'});
              //   callback();
              } else {
                if(res.data && res.data.role && (res.data.guest==true || res.data.guest == false)) {
                  userRole = res.data.role;
                  isGuest = res.data.guest;
                  callback();
                }                      
                
                //console.log("res role 00--->", userRole);
              }
            });
      }else {
        replace({pathname:'/'});
        callback();
      }
    }else{
      callback(); 
    }
}

const guestLoggedIn = (nextState, replace, callback) => {
  // console.log("AuthClient.getSession()--", AuthClient.getSession(), typeof(window));
  if(AuthClient.getSession() != false && AuthClient.getSession() != '' && AuthClient.getSession() != undefined && typeof(window)){
    // if(AuthClient.getSession() != '' && AuthClient.getSession() != undefined){
      // console.log("Inside api call");
          callApi('is-loggedin', 'post', {
            userdata: {
              session: AuthClient.getSession(),
            },
          }).then(res => {
            if(res.status === false){
              AuthClient.deleteSession();
              // replace({pathname:'/'});
              callback();
            }else if(res && res.status && res.data && res.data.guest){
              callApi ('delete-guest/loginPage', 'delete');
              AuthClient.deleteSession();
              // replace({pathname:'/'});
              callback();
            } else {
              callback();
            }
          });
    // }else {
    //   replace({pathname:'/'});
    //   callback();
    // }
  }else{
    callback(); 
  }
}


//Code added by - Najib, Desc - Checking user type for router level access

// function userRole {
//   let role = '';
//   if(store.getState().login.data && store.getState().login.data.role) {
//     role = store.getState().login.data.role;
//   }
//   return role;
// }

// function !isGuest {  
//   if(store.getState().login.data && store.getState().login.data.guest) {
//     return false;
//   } else {
//     return true;
//   }
// }

//Function for checking only super Admin
function isSuperAdmin() {  
  //console.log("role--", role);
  if( userRole == Roles.Superadmin && !isGuest ) {
    return true;
  } else {
    return false;
  }
}

//Function for checking super Admin, LMS and Conf admin and CRM and presenterAdmin
function isAllAdmin() {
  if( (userRole == Roles.Superadmin || userRole == Roles.Lmsadmin || userRole == Roles.Admin || userRole == Roles.CRMadmin || userRole == Roles.Presenteradmin) && !isGuest ) {
    return true;
  } else {
    return false;
  }
}

//Function for checking super Admin, LMS and Conf admin and CRM and presenterAdmin
function isAllAdminExceptModerator() {
  if( (userRole == Roles.Superadmin || userRole == Roles.Lmsadmin || userRole == Roles.Admin || userRole == Roles.Instructor || userRole == Roles.CRMadmin || userRole == Roles.Presenteradmin || userRole == Roles.Presenteradmin || userRole == Roles.Presenter) && !isGuest ) {
    return true;
  } else {
    return false;
  }
}

//Function for checking super Admin, Lmsadmin, admin, CRMAdmin, PresenterAdmin
function isAdminOrModerator() {
  //console.log("role--", role);
  if( (userRole == Roles.Superadmin || userRole == Roles.Admin || userRole == Roles.Moderator || userRole == Roles.Lmsadmin || userRole ==Roles.Instructor || userRole == Roles.CRMadmin || userRole == Roles.Presenteradmin || userRole ==Roles.Presenter) && !isGuest ) {
    return true;
  } else {
    return false;
  }
}

function isAdminModerInst() {
  //console.log("role--", role);
  if( (userRole == Roles.Admin || userRole == Roles.Moderator || userRole == Roles.Lmsadmin || userRole ==Roles.Instructor || userRole == Roles.CRMadmin || userRole == Roles.Presenteradmin) && !isGuest){
    return true;
  } else {
    return false;
  }
}

function isOnlyLMS() {
  //console.log("role--", role);
  if( (userRole == Roles.Lmsadmin || userRole == Roles.Instructor || userRole == Roles.Presenteradmin || userRole == Roles.Presenter) && !isGuest){
    return true;
  } else {
    return false;
  }
}

function isAdminOrInstructor() {
  //console.log("role--", role);
  if( (userRole == Roles.Admin || userRole == Roles.Lmsadmin || userRole == Roles.Instructor || userRole == Roles.Presenteradmin || userRole == Roles.Presenter ) && !isGuest) {
    return true;
  } else {
    return false;
  }
}

function isStudent() {
  //console.log("role--", role);
  if( (userRole == Roles.Student) && !isGuest )  {
    return true;
  } else {
    return false;
  }
}

function isLmsSuperAdmin() {
  //console.log("role--", role);
  if((userRole == Roles.Superadmin || userRole == Roles.Instructor || userRole == Roles.Lmsadmin) && !isGuest) {
    return true;
  } else {
    return false;
  }
}

function isLMSConfAdmin() {
  //console.log("role--", role);
  if((userRole == Roles.Lmsadmin || userRole == Roles.Admin || userRole == Roles.Presenteradmin) && !isGuest) {
    return true;
  } else {
    return false;
  }
}

export default ( 

  <Route component={App}>

    <Route path="/" onEnter = {guestLoggedIn} component={HomeLayout}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Login/LoginPage').default);
          });
        }}
      />
      /*DSS + Android push notification*/
      <Route
          path="/androidDeviceId/:devId" 
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./modules/Login/LoginPage').default);
            });
          }}
        />      
        /*DSS - Android push notification*/

      <Route
          path="/android/:devId" 
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./modules/Login/LoginPage').default);
            });
          }}
      />


      <Route
          path="/resetPassword/:token" 
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./modules/Login/components/ResetPassword').default);
            });
          }}
        />

      <Route
          path="/forgotpassword" 
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./modules/Login/components/ForgotPasswordWidget').default);
            });
          }}
        />
      <Route
        path="/registration" 
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Registration/pages/Registration').default);
          });
        }}
      />

      <Route
        name="guestConference"
        path="/conf/guest/:rid" 
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Dashboard/UserDashboard/pages/GuestConference').default);
          });
        }}
      />

      <Route
        name="guestScheduledConference"
        path="/conf/guestScheduled/:sid" 
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Dashboard/UserDashboard/pages/GuestConference').default);
          });
        }}
      />

      <Route
        path="/activate-user/:token" 
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Login/components/ActivateUser').default);
          });
        }}
      />        
    </Route>

    <Route path="/dashboard"  onEnter = {userIsLoggedIn} component={DashLayout}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(!isGuest) {
              cb(null, require('./modules/Dashboard/UserDashboard/pages/Dashboard').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
            }            
          });
        }}
      />
      <Route
        name="conference"
        path="/conf/:rid" 
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Dashboard/UserDashboard/pages/Conference').default);
          });
        }}
      />

      <Route
        name="feedback"
        path="/conf/feedback/:rid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Dashboard/UserDashboard/pages/Feedback').default);
          });
        }}
      />

      <Route
        name="fullCalendar"
        path="/full-calendar" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(!isGuest) {
              cb(null, require('./modules/Admin/FullCalendar/pages/ViewCalendar').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
            }            
          });
        }} />

      <Route
        name="broadcast"
        path="/broadcast-news" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(!isGuest) {
              cb(null, require('./modules/Dashboard/UserDashboard/components/broadcast/Broadcast').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
            }            
          });
        }} />

    </Route>

    <Route path="/admin/profile"  onEnter = {userIsLoggedIn}  component={AdminLayout} >
        <IndexRoute
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
            if(!isGuest) {
              cb(null, require('./modules/Admin/Profile/pages/MyProfile').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
            }               
            });
          }}  
        />
        
        <Route            
            path="/admin/profile/edit" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(!isGuest) {
                  cb(null, require('./modules/Admin/Profile/pages/ProfileEdit').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                                                
              });
            }}
        />
        <Route
            path="/admin/profile/workedu" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(!isGuest) {
                  cb(null, require('./modules/Admin/Profile/pages/WorkEdu').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/profile/contacts" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(!isGuest) {
                  cb(null, require('./modules/Admin/Profile/pages/MyContact').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/profile/locale" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(!isGuest) {
                  cb(null, require('./modules/Admin/Profile/pages/CreateLocale').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/changepassword" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(!isGuest) {
                  cb(null, require('./modules/Admin/Profile/pages/ChangePassword').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
          path="/admin/locale/view" onEnter = {userIsLoggedIn}
              getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(!isGuest) {
                  cb(null, require('./modules/Admin/Profile/pages/ViewLocale').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/users/new" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/Users/pages/CreateUser').default);
                } else { 
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }               
              });
            }}
        />
        <Route
            path="/admin/users/list" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/Users/pages/ListUser').default);
                } else { 
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }
              });
            }}
        />
        <Route
            path="/admin/active/users" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/Users/pages/ActiveUsers').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }
              });
            }}
        />
        <Route
            path="/admin/users/edit/:viewUserId" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/Users/pages/EditUser').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/users/view/:rowId" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              // console.log("helllwordfls");
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/Users/pages/ViewUser').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/users/profile/:pid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/Users/pages/ViewProfile').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/users/contacts/:pid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/Users/pages/ViewContacts').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/users/workedu/:pid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/Users/pages/ViewWorkEdu').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/users/locale/:pid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/Users/pages/ViewLocale').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/new" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/CreateRoom').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/list" 
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/ListRoom').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/edit/:cid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/EditRoom').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/addtopic/:cid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/AddTopic').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/view/:cid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/ViewRoom').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/viewtopic/:tid/:rid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/ViewRoomTopic').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />        
        <Route
            path="/admin/room/edittopic/:tid/:rid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/EditTopic').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/uploadtotopic/:tid/:rid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/UploadToTopic').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
       
        <Route
            path="/admin/room/adduser/:cid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/AddUser').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/listtopic/:cid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/ListTopic').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/questionnaire/:tid/:rid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/AssignQuestionnaire').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/list-results/:rid/:tid/:qid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/ListResults').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/room/view-results/:rid/:tid/:qid/:cid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/ViewResults').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
                });
            }}
        />
        <Route
            path="/admin/room/room-feedback-list/:roomId" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAdminOrModerator()) {
                  cb(null, require('./modules/Admin/RoomManager/pages/ListRoomFeedback').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/corporate/new" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isSuperAdmin()) {
                  cb(null, require('./modules/Admin/Corporate/pages/CreateCorporate').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/corporate/list" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isSuperAdmin()) {
                  cb(null, require('./modules/Admin/Corporate/pages/ListCorporate').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/corporate/edit/:cid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isSuperAdmin()) {
                  cb(null, require('./modules/Admin/Corporate/pages/EditCorporate').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/corporate/view/:cid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isSuperAdmin()) {
                  cb(null, require('./modules/Admin/Corporate/pages/ViewCorporate').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/settings/new" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isSuperAdmin()) {
                  cb(null, require('./modules/Admin/Settings/pages/CreateSettingsPage').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/ldapsettings" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isSuperAdmin()) {
                  cb(null, require('./modules/Admin/LDAPSettings/pages/CreateLDAPSettingsPage').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/package/new" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isSuperAdmin()) {
                  cb(null, require('./modules/Admin/PackageManager/pages/CreatePackage').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/package/list" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/PackageManager/pages/ListPackage').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/package/edit/:pid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isSuperAdmin()) {
                  cb(null, require('./modules/Admin/PackageManager/pages/EditPackage').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
        <Route
            path="/admin/package/view/:pid" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                if(isAllAdmin()) {
                  cb(null, require('./modules/Admin/PackageManager/pages/ViewPackage').default);
                } else {
                  cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
                }                
              });
            }}
        />
       <Route
            path="/admin/payment" onEnter = {userIsLoggedIn}
            getComponent={(nextState, cb) => {
              require.ensure([], require => {
                cb(null, require('./modules/Admin/paymentgateway/pages/checkoutPage').default);
              });
            }}
        />
      <Route
          path="/admin/category/list" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAllAdmin()) {
                cb(null, require('./modules/Admin/Category/pages/ListCategory').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
              }              
            });
          }}
      />
      <Route
          path="/admin/category/new" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAllAdmin()) {
                cb(null, require('./modules/Admin/Category/pages/CreateCategory').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
              }              
            });
          }}
      />
      <Route
          path="/admin/category/view/:cid" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAllAdmin()) {
                cb(null, require('./modules/Admin/Category/pages/ViewCategory').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
              }              
            });
          }}
      />  
      <Route
          path="/admin/category/edit/:cid" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAllAdmin()) {
                cb(null, require('./modules/Admin/Category/pages/EditCategory').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default);
              }               
            });
          }}
      /> 
      <Route
        path="/admin/questionnaire/list" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAllAdminExceptModerator()) {
              cb(null, require('./modules/Admin/Questionnaire/pages/ListQuestionnaire').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/admin/questionnaire/add" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAdminOrInstructor()) {
              cb(null, require('./modules/Admin/Questionnaire/pages/AddQuestionnaire').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/admin/questionnaire/view/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAllAdminExceptModerator()) {
              cb(null, require('./modules/Admin/Questionnaire/pages/ViewQuestionnaire').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/admin/questionnaire/questions/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAllAdminExceptModerator()) {
              cb(null, require('./modules/Admin/Questionnaire/pages/AddQuestions').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />  
      <Route
        path="/admin/questionnaire/edit/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAdminOrInstructor()) {
              cb(null, require('./modules/Admin/Questionnaire/pages/EditQuestionnaire').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      /> 
      <Route
        path="/admin/feedback/list" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Admin/Feedback/pages/ListFeedback').default);
          });
        }}
      />   
        
      <Route
          path="/admin/room/addstudent/:rid/:iid" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isOnlyLMS()) {
                cb(null, require('./modules/Admin/RoomManager/pages/AddStudent').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
              }              
            });
          }}
      />

      <Route
          path="/admin/room/view-feedback/:cid" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAdminOrModerator()) {
                cb(null, require('./modules/Admin/RoomManager/pages/ViewRoomFeedback').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
              }              
            });
          }}
      />
       <Route
          path="/admin/location/new" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAllAdmin()) {
                cb(null, require('./modules/Admin/Location/pages/CreateLocation').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
              }              
            });
          }}
      />
      <Route
          path="/admin/location/list" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAllAdmin()) {
                cb(null, require('./modules/Admin/Location/pages/ListLocation').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
              }              
            });
          }}
      />
      <Route
          path="/admin/location/view/:cid" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAllAdmin()) {
                cb(null, require('./modules/Admin/Location/pages/ViewLocation').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
              }              
            });
          }}
      />
      <Route
          path="/admin/location/edit/:cid" onEnter = {userIsLoggedIn}
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              if(isAllAdmin()) {
                cb(null, require('./modules/Admin/Location/pages/EditLocation').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
              }              
            });
          }}
      />
      
      <Route
        path="/admin/room/listlocation/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAllAdmin()) {
                cb(null, require('./modules/Admin/RoomManager/pages/ViewRoomLocation').default);
              } else {
                cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
              }            
          });
        }}
      />
      <Route
        path="/admin/room/addlocation/new/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAllAdmin()) {
              cb(null, require('./modules/Admin/RoomManager/pages/AddLocation').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }           
          });
        }}
      />
      <Route
        path="/admin/room/configuration/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAdminOrModerator()) {
              cb(null, require('./modules/Admin/RoomManager/pages/RoomConfiguration').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }             
          });
        }}
      /> 
      <Route
        path="/admin/room/assignments/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
              cb(null, require('./modules/Admin/RoomManager/pages/ListAssignments').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      /> 
      <Route
        path="/admin/room/assignment/add/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
                cb(null, require('./modules/Admin/RoomManager/pages/AddAssignment').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/admin/room/assignment/edit/:cid/:aid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
              cb(null, require('./modules/Admin/RoomManager/pages/EditAssignment').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/admin/room/assignment/submissions/:cid/:aid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
              cb(null, require('./modules/Admin/RoomManager/pages/ListSubmissions').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      /> 
      <Route
        path="/admin/room/assignment/submission/view/:rid/:aid/:sid/:filename" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
              cb(null, require('./modules/Admin/RoomManager/pages/ViewPDF').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      /> 
      <Route
        path="/admin/room/assignment/submission/plagiarism/:rid/:aid/:sid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
              cb(null, require('./modules/Admin/RoomManager/pages/ViewPlagiarism').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }             
          });
        }}
      />
      <Route
        path="/admin/room/attendance/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
              cb(null, require('./modules/Admin/RoomManager/pages/AttendanceReport').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      /> 
      <Route
        path="/admin/participants-group/list" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isLmsSuperAdmin()) {
              cb(null, require('./modules/Admin/ParticipantsGroup/pages/ParticipantsGroupList').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/admin/participants-group/view/:gid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isLmsSuperAdmin()) {
              cb(null, require('./modules/Admin/ParticipantsGroup/pages/ParticipantsGroupView').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }
          });
        }}
      />
      <Route
        path="/admin/reports" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isAllAdmin()) {
              cb(null, require('./modules/Admin/Reports/pages/ReportsPage').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/course/reports" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isStudent()) {
              cb(null, require('./modules/Admin/Reports/pages/StudentCourseList').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/course/attendance/:rid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isStudent()) {
              cb(null, require('./modules/Admin/Reports/pages/StudentAttendance').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
        path="/course/assignment-report-list/:rid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {            
            if(isStudent()) {
              cb(null, require('./modules/Admin/Reports/pages/StudentAssignmentReportList').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            } 
          });
        }}
      />
      <Route
        path="/course/assignment-report-view/:rid/:aid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {            
            if(isStudent()) {
              cb(null, require('./modules/Admin/Reports/pages/StudentAssignmentReportView').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }
          });
        }}
      />
      
      <Route
        path="/course/topics/report/:rid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isStudent()) {
              cb(null, require('./modules/Admin/Reports/pages/StudentTopicsReport').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />
      <Route
       path="/admin/room/viewpdf/:tid/:rid/:filename/:tpid" onEnter = {userIsLoggedIn}
       getComponent={(nextState, cb) => {
        require.ensure([], require => {
          if(isAdminOrModerator()) {
              cb(null, require('./modules/Admin/RoomManager/pages/ViewPDF').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }
         });
       }}
        /> 
      <Route
        name="userProfile"
        path="/profile/:uid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(!isGuest) {
              cb(null, require('./modules/Admin/Profile/ProfessionalProfile/pages/UserProfile').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      /> 


      //Code added by - Najib, Desc - Route for restricted users
      <Route
        name="AccessDenied"
        path="/access-denied"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Admin/Users/pages/AccessDenied').default);                     
          });
        }}
      /> 

      <Route
        path="/admin/grade-configuration" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isLMSConfAdmin()) {
              cb(null, require('./modules/Admin/Questionnaire/pages/GradeConfiguration').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      /> 
      <Route
        path="/admin/room/reports/topic/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
              cb(null, require('./modules/Admin/RoomManager/pages/TopicsReport').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />     
      />         
      <Route
        path="/admin/room/certificates/:cid" onEnter = {userIsLoggedIn}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            if(isOnlyLMS()) {
              cb(null, require('./modules/Admin/RoomManager/pages/ListCertificates').default);
            } else {
              cb(null, require('./modules/Admin/Users/pages/RedirectPage').default); 
            }            
          });
        }}
      />     
      />         
    </Route>
  </Route>        
);
