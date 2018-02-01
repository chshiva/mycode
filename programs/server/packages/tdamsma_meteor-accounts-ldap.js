(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/tdamsma_meteor-accounts-ldap/ldap_server.coffee.js                                    //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ActiveDirectory, Future, UserQuery, assert;                                                   // 1
                                                                                                  //
ActiveDirectory = Npm.require('activedirectory');                                                 // 1
                                                                                                  //
Future = Npm.require('fibers/future');                                                            // 1
                                                                                                  //
assert = Npm.require('assert');                                                                   // 1
                                                                                                  //
if (!Meteor.settings.ldap) {                                                                      // 5
  throw new Error('"ldap" not found in Meteor.settings');                                         // 6
}                                                                                                 //
                                                                                                  //
UserQuery = (function() {                                                                         // 1
  function UserQuery(username) {                                                                  // 9
    this.ad = ActiveDirectory({                                                                   // 10
      url: Meteor.settings.ldap.url,                                                              // 10
      baseDN: Meteor.settings.ldap.baseDn,                                                        // 10
      username: Meteor.settings.ldap.bindCn,                                                      // 10
      password: Meteor.settings.ldap.bindPassword,                                                // 10
      attributes: {                                                                               // 10
        user: ["dn"].concat(Meteor.settings.ldap.autopublishFields)                               // 15
      }                                                                                           //
    });                                                                                           //
    this.username = this.sanitize_for_search(username);                                           // 10
  }                                                                                               //
                                                                                                  //
  UserQuery.prototype.sanitize_for_search = function(s) {                                         // 9
    s = s.replace('\\', '\\5C');                                                                  // 23
    s = s.replace('\0', '\\00');                                                                  // 23
    s = s.replace('*', '\\2A');                                                                   // 23
    s = s.replace('(', '\\28');                                                                   // 23
    s = s.replace(')', '\\29');                                                                   // 23
    return s;                                                                                     // 28
  };                                                                                              //
                                                                                                  //
  UserQuery.prototype.findUser = function() {                                                     // 9
    var userFuture, userObj, username;                                                            // 31
    userFuture = new Future;                                                                      // 31
    username = this.username;                                                                     // 31
    this.ad.findUser(this.username, function(err, userObj) {                                      // 31
      if (err) {                                                                                  // 35
        if (Meteor.settings.ldap.debug) {                                                         // 36
          console.log('ERROR: ' + JSON.stringify(err));                                           // 37
        }                                                                                         //
        userFuture["return"](false);                                                              // 36
        return;                                                                                   // 39
      }                                                                                           //
      if (!userObj) {                                                                             // 40
        if (Meteor.settings.ldap.debug) {                                                         // 41
          console.log('User: ' + username + ' not found.');                                       // 42
        }                                                                                         //
        return userFuture["return"](false);                                                       //
      } else {                                                                                    //
        if (Meteor.settings.ldap.debug) {                                                         // 45
          console.log(JSON.stringify(userObj));                                                   // 46
        }                                                                                         //
        return userFuture["return"](userObj);                                                     //
      }                                                                                           //
    });                                                                                           //
    userObj = userFuture.wait();                                                                  // 31
    if (!userObj) {                                                                               // 50
      throw new Meteor.Error(403, 'Invalid username');                                            // 51
    }                                                                                             //
    return this.userObj = userObj;                                                                //
  };                                                                                              //
                                                                                                  //
  UserQuery.prototype.authenticate = function(password) {                                         // 9
    var authenticateFuture, success;                                                              // 56
    authenticateFuture = new Future;                                                              // 56
    this.ad.authenticate(this.userObj.dn, password, function(err, auth) {                         // 56
      if (err) {                                                                                  // 58
        if (Meteor.settings.ldap.debug) {                                                         // 59
          console.log('ERROR: ' + JSON.stringify(err));                                           // 60
        }                                                                                         //
        authenticateFuture["return"](false);                                                      // 59
        return;                                                                                   // 62
      }                                                                                           //
      if (auth) {                                                                                 // 63
        if (Meteor.settings.ldap.debug) {                                                         // 64
          console.log('Authenticated!');                                                          // 65
        }                                                                                         //
        authenticateFuture["return"](true);                                                       // 64
      } else {                                                                                    //
        if (Meteor.settings.ldap.debug) {                                                         // 68
          console.log('Authentication failed!');                                                  // 69
        }                                                                                         //
        authenticateFuture["return"](false);                                                      // 68
      }                                                                                           //
    });                                                                                           //
    success = authenticateFuture.wait();                                                          // 56
    if (!success || password === '') {                                                            // 73
      throw new Meteor.Error(403, 'Invalid credentials');                                         // 74
    }                                                                                             //
    this.autenticated = success;                                                                  // 56
    return success;                                                                               // 76
  };                                                                                              //
                                                                                                  //
  UserQuery.prototype.getGroupMembershipForUser = function() {                                    // 9
    var groupsFuture;                                                                             // 79
    groupsFuture = new Future;                                                                    // 79
    this.ad.getGroupMembershipForUser(this.userObj.dn, function(err, groups) {                    // 79
      if (err) {                                                                                  // 81
        console.log('ERROR: ' + JSON.stringify(err));                                             // 82
        groupsFuture["return"](false);                                                            // 82
        return;                                                                                   // 84
      }                                                                                           //
      if (!groups) {                                                                              // 85
        console.log('User: ' + this.userObj.dn + ' not found.');                                  // 86
        groupsFuture["return"](false);                                                            // 86
      } else {                                                                                    //
        if (Meteor.settings.ldap.debug) {                                                         // 89
          console.log('Groups found for ' + this.userObj.dn + ': ' + JSON.stringify(groups));     // 90
        }                                                                                         //
        groupsFuture["return"](groups);                                                           // 89
      }                                                                                           //
    });                                                                                           //
    return groupsFuture.wait();                                                                   // 93
  };                                                                                              //
                                                                                                  //
  UserQuery.prototype.isUserMemberOf = function(groupName) {                                      // 9
    var isMemberFuture;                                                                           // 96
    isMemberFuture = new Future;                                                                  // 96
    this.ad.isUserMemberOf(this.userObj.dn, groupName, function(err, isMember) {                  // 96
      if (err) {                                                                                  // 98
        console.log('ERROR: ' + JSON.stringify(err));                                             // 99
        isMemberFuture["return"](false);                                                          // 99
        return;                                                                                   // 101
      }                                                                                           //
      if (Meteor.settings.ldap.debug) {                                                           // 102
        console.log(this.userObj.displayName + ' isMemberOf ' + groupName + ': ' + isMember);     // 103
      }                                                                                           //
      isMemberFuture["return"](isMember);                                                         // 98
    });                                                                                           //
    return isMemberFuture.wait();                                                                 // 106
  };                                                                                              //
                                                                                                  //
  UserQuery.prototype.queryMembershipAndAddToMeteor = function(callback) {                        // 9
    var ad, groupName, i, len, ref, results, userObj;                                             // 109
    ref = Meteor.settings.ldap.groupMembership;                                                   // 109
    results = [];                                                                                 // 109
    for (i = 0, len = ref.length; i < len; i++) {                                                 //
      groupName = ref[i];                                                                         //
      ad = this.ad;                                                                               // 110
      userObj = this.userObj;                                                                     // 110
      results.push((function(groupName) {                                                         // 110
        return ad.isUserMemberOf(userObj.dn, groupName, function(err, isMember) {                 //
          return (function(groupName) {                                                           //
            if (err) {                                                                            // 115
              if (Meteor.settings.ldap.debug) {                                                   // 116
                return console.log('ERROR: ' + JSON.stringify(err));                              //
              }                                                                                   //
            } else {                                                                              //
              if (Meteor.settings.ldap.debug) {                                                   // 119
                console.log(userObj.dn + ' isMemberOf ' + groupName + ': ' + isMember);           // 120
              }                                                                                   //
              return callback(groupName, isMember);                                               //
            }                                                                                     //
          })(groupName);                                                                          //
        });                                                                                       //
      })(groupName));                                                                             //
    }                                                                                             // 109
    return results;                                                                               //
  };                                                                                              //
                                                                                                  //
  return UserQuery;                                                                               //
                                                                                                  //
})();                                                                                             //
                                                                                                  //
Accounts.registerLoginHandler('ldap', function(request) {                                         // 1
  var authenticated, hashStampedToken, stampedToken, user, userId, userObj, user_query;           // 125
  if (!request.ldap) {                                                                            // 125
    return void 0;                                                                                // 125
  }                                                                                               //
  user_query = new UserQuery(request.username);                                                   // 125
  if (Meteor.settings.ldap.debug) {                                                               // 129
    console.log('LDAP authentication for ' + request.username);                                   // 130
  }                                                                                               //
  user_query.findUser();                                                                          // 125
  authenticated = user_query.authenticate(request.pass);                                          // 125
  if (Meteor.settings.ldap.debug) {                                                               // 136
    console.log('* AUTENTICATED:', authenticated);                                                // 137
  }                                                                                               //
  userId = void 0;                                                                                // 125
  userObj = user_query.userObj;                                                                   // 125
  userObj.username = request.username;                                                            // 125
  user = Meteor.users.findOne({                                                                   // 125
    dn: userObj.dn                                                                                // 143
  });                                                                                             //
  if (user) {                                                                                     // 144
    userId = user._id;                                                                            // 145
    Meteor.users.update(userId, {                                                                 // 145
      $set: userObj                                                                               // 146
    });                                                                                           //
  } else {                                                                                        //
    userId = Meteor.users.insert(userObj);                                                        // 148
  }                                                                                               //
  if (Meteor.settings.ldap.autopublishFields) {                                                   // 149
    Accounts.addAutopublishFields({                                                               // 150
      forLoggedInUser: Meteor.settings.ldap.autopublishFields,                                    // 151
      forOtherUsers: Meteor.settings.ldap.autopublishFields                                       // 151
    });                                                                                           //
  }                                                                                               //
  stampedToken = Accounts._generateStampedLoginToken();                                           // 125
  hashStampedToken = Accounts._hashStampedToken(stampedToken);                                    // 125
  Meteor.users.update(userId, {                                                                   // 125
    $push: {                                                                                      // 155
      'services.resume.loginTokens': hashStampedToken                                             // 155
    }                                                                                             //
  });                                                                                             //
  user_query.queryMembershipAndAddToMeteor(Meteor.bindEnvironment(function(groupName, isMember) {
    if (isMember) {                                                                               // 159
      Meteor.users.update(userId, {                                                               // 160
        $addToSet: {                                                                              // 160
          'memberOf': groupName                                                                   // 160
        }                                                                                         //
      });                                                                                         //
      return Meteor.users.update(userId, {                                                        //
        $pull: {                                                                                  // 161
          'notMemberOf': groupName                                                                // 161
        }                                                                                         //
      });                                                                                         //
    } else {                                                                                      //
      Meteor.users.update(userId, {                                                               // 163
        $pull: {                                                                                  // 163
          'memberOf': groupName                                                                   // 163
        }                                                                                         //
      });                                                                                         //
      return Meteor.users.update(userId, {                                                        //
        $addToSet: {                                                                              // 164
          'notMemberOf': groupName                                                                // 164
        }                                                                                         //
      });                                                                                         //
    }                                                                                             //
  }));                                                                                            //
  return {                                                                                        //
    userId: userId,                                                                               // 166
    token: stampedToken.token,                                                                    // 166
    tokenExpires: Accounts._tokenExpiration(hashStampedToken.when)                                // 166
  };                                                                                              //
});                                                                                               // 124
                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['tdamsma:meteor-accounts-ldap'] = {};

})();

//# sourceMappingURL=tdamsma_meteor-accounts-ldap.js.map
