(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;

/* Package-scope variables */
var __coffeescriptShare, Logger;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/ostrio_logger/logger.coffee.js                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _inst,                                                                                                       // 1
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };                              //
                                                                                                                 //
_inst = 0;                                                                                                       // 1
                                                                                                                 //
                                                                                                                 // 2
/*                                                                                                               // 2
@class Logger                                                                                                    //
@summary Extend-able Logger class                                                                                //
 */                                                                                                              //
                                                                                                                 //
Logger = (function() {                                                                                           // 1
  var LoggerMessage;                                                                                             // 7
                                                                                                                 //
  Logger.prototype.userId = new ReactiveVar(null);                                                               // 7
                                                                                                                 //
  function Logger() {                                                                                            // 8
    this.add = bind(this.add, this);                                                                             // 9
    this.rule = bind(this.rule, this);                                                                           // 9
    this._log = bind(this._log, this);                                                                           // 9
    var self;                                                                                                    // 9
    this.prefix = ++_inst;                                                                                       // 9
    if (Meteor.isClient) {                                                                                       // 10
      self = this;                                                                                               // 11
      if (typeof Package !== "undefined" && Package !== null ? Package['accounts-base'] : void 0) {              // 12
        Tracker.autorun(function() {                                                                             // 13
          return self.userId.set(Meteor.userId());                                                               //
        });                                                                                                      //
      }                                                                                                          //
    }                                                                                                            //
    this._emitters = [];                                                                                         // 9
    this._rules = {};                                                                                            // 9
  }                                                                                                              //
                                                                                                                 //
                                                                                                                 // 18
  /*                                                                                                             // 18
  @memberOf Logger                                                                                               //
  @name _log                                                                                                     //
  @param level    {String} - Log level Accepts 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', 'TRACE', 'LOG' and '*'
  @param message  {String} - Text human-readable message                                                         //
  @param data     {Object} - [optional] Any additional info as object                                            //
  @param userId   {String} - [optional] Current user id                                                          //
  @summary Pass log's data to Server or/and Client                                                               //
   */                                                                                                            //
                                                                                                                 //
  Logger.prototype._log = function(level, message, data, user) {                                                 // 7
    var _data, em, i, ref, ref1, uid;                                                                            // 28
    if (data == null) {                                                                                          //
      data = {};                                                                                                 //
    }                                                                                                            //
    uid = user || this.userId.get();                                                                             // 28
    ref = this._emitters;                                                                                        // 29
    for (i in ref) {                                                                                             // 29
      em = ref[i];                                                                                               //
      if (((ref1 = this._rules) != null ? ref1[em.name] : void 0) && this._rules[em.name].enable === true) {     // 30
        if (this._rules[em.name].allow.indexOf('*') !== -1 || this._rules[em.name] && this._rules[em.name].allow.indexOf(level) !== -1) {
          if (level === "TRACE") {                                                                               // 32
            if (_.isString(data)) {                                                                              // 33
              _data = data;                                                                                      // 34
              data = {                                                                                           // 34
                data: _data                                                                                      // 35
              };                                                                                                 //
            }                                                                                                    //
            data.stackTrace = this._getStackTrace();                                                             // 33
          }                                                                                                      //
          if (Meteor.isClient && em.denyClient === true) {                                                       // 38
            Meteor.call(em.method, level, message, data, uid);                                                   // 39
          } else if (this._rules[em.name].client === true && this._rules[em.name].server === true && em.denyClient === false) {
            em.emitter(level, message, data, uid);                                                               // 41
            if (Meteor.isClient) {                                                                               // 42
              Meteor.call(em.method, level, message, data, uid);                                                 // 43
            }                                                                                                    //
          } else if (Meteor.isClient && this._rules[em.name].client === false && this._rules[em.name].server === true) {
            Meteor.call(em.method, level, message, data, uid);                                                   // 45
          } else {                                                                                               //
            em.emitter(level, message, data, uid);                                                               // 47
          }                                                                                                      //
        }                                                                                                        //
      }                                                                                                          //
    }                                                                                                            // 29
    return new this._message({                                                                                   // 49
      level: level,                                                                                              // 50
      error: level,                                                                                              // 50
      reason: message,                                                                                           // 50
      errorType: level,                                                                                          // 50
      message: message,                                                                                          // 50
      details: data,                                                                                             // 50
      data: data,                                                                                                // 50
      user: uid,                                                                                                 // 50
      userId: uid                                                                                                // 50
    });                                                                                                          //
  };                                                                                                             //
                                                                                                                 //
                                                                                                                 // 60
  /*                                                                                                             // 60
  @memberOf Logger                                                                                               //
  @name _message                                                                                                 //
  @class LoggerMessage                                                                                           //
  @param data {Object}                                                                                           //
  @summary Construct message object, ready to be thrown and stringified                                          //
   */                                                                                                            //
                                                                                                                 //
  Logger.prototype._message = LoggerMessage = (function() {                                                      // 7
    function LoggerMessage(data) {                                                                               // 68
      this.level = data.level, this.error = data.error, this.reason = data.reason, this.message = data.message, this.details = data.details, this.data = data.data, this.user = data.user, this.userId = data.userId;
      this.toString = function() {                                                                               // 69
        return "[" + this.reason + "] \r\nLevel: " + this.level + "; \r\nDetails: " + (JSON.stringify(Logger.prototype.antiCircular(this.data))) + "; \r\nUserId: " + this.userId + ";";
      };                                                                                                         //
    }                                                                                                            //
                                                                                                                 //
    return LoggerMessage;                                                                                        //
                                                                                                                 //
  })();                                                                                                          //
                                                                                                                 //
                                                                                                                 // 72
  /*                                                                                                             // 72
  @memberOf Logger                                                                                               //
  @name rule                                                                                                     //
  @param name    {String} - Adapter name                                                                         //
  @param options {Object} - Settings object                                                                      //
         options.enable {Boolean} - Enable/disable adapter                                                       //
         options.filter {Array}   - Array of strings, accepts:                                                   //
                                   'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', 'TRACE', 'LOG' and '*'             //
                                   in lowercase or uppercase                                                     //
                                   default: ['*'] - Accept all                                                   //
         options.client {Boolean} - Allow execution on Client                                                    //
         options.server {Boolean} - Allow execution on Server                                                    //
  @summary Enable/disable adapter and set it's settings                                                          //
   */                                                                                                            //
                                                                                                                 //
  Logger.prototype.rule = function(name, options) {                                                              // 7
    var j, len, ref, rule;                                                                                       // 87
    check(name, String);                                                                                         // 87
    check(options, {                                                                                             // 87
      enable: Boolean,                                                                                           // 88
      client: Match.Optional(Boolean),                                                                           // 88
      server: Match.Optional(Boolean),                                                                           // 88
      filter: Match.Optional([String])                                                                           // 88
    });                                                                                                          //
    if (options.filter) {                                                                                        // 95
      ref = options.filter;                                                                                      // 96
      for (j = 0, len = ref.length; j < len; j++) {                                                              // 96
        rule = ref[j];                                                                                           //
        rule = rule.toUpperCase();                                                                               // 97
      }                                                                                                          // 96
    }                                                                                                            //
    if (options.filter == null) {                                                                                //
      options.filter = ['*'];                                                                                    //
    }                                                                                                            //
    if (options.client == null) {                                                                                //
      options.client = false;                                                                                    //
    }                                                                                                            //
    if (options.server == null) {                                                                                //
      options.server = true;                                                                                     //
    }                                                                                                            //
    if (options.enable == null) {                                                                                //
      options.enable = true;                                                                                     //
    }                                                                                                            //
    this._rules[name] = {                                                                                        // 87
      enable: options.enable,                                                                                    // 105
      allow: options.filter,                                                                                     // 105
      client: options.client,                                                                                    // 105
      server: options.server                                                                                     // 105
    };                                                                                                           //
  };                                                                                                             //
                                                                                                                 //
                                                                                                                 // 111
  /*                                                                                                             // 111
  @memberOf Logger                                                                                               //
  @name add                                                                                                      //
  @param name        {String}    - Adapter name                                                                  //
  @param emitter     {Function}  - Function called on Meteor.log...                                              //
  @param init        {Function}  - Adapter initialization function                                               //
  @param denyClient  {Boolean}   - Strictly deny execution on client, only pass via Meteor.methods               //
  @summary Register new adapter to be used within ostrio:logger package                                          //
   */                                                                                                            //
                                                                                                                 //
  Logger.prototype.add = function(name, emitter, init, denyClient) {                                             // 7
    var method;                                                                                                  // 121
    if (denyClient == null) {                                                                                    //
      denyClient = false;                                                                                        //
    }                                                                                                            //
    init && init();                                                                                              // 121
    this._emitters.push({                                                                                        // 121
      name: name,                                                                                                // 123
      emitter: emitter,                                                                                          // 123
      method: this.prefix + "_logger_emit_" + name,                                                              // 123
      denyClient: denyClient                                                                                     // 123
    });                                                                                                          //
    if (Meteor.isServer) {                                                                                       // 128
      method = {};                                                                                               // 129
      method[this.prefix + "_logger_emit_" + name] = function(level, message, data, userId) {                    // 129
        check(level, String);                                                                                    // 131
        check(message, Match.Optional(Match.OneOf(Number, String, null)));                                       // 131
        check(data, Match.Optional(Match.OneOf(String, Object, null)));                                          // 131
        check(userId, Match.Optional(Match.OneOf(String, null)));                                                // 131
        return emitter(level, message, data, userId || this.userId);                                             //
      };                                                                                                         //
      Meteor.methods(method);                                                                                    // 129
    }                                                                                                            //
  };                                                                                                             //
                                                                                                                 //
                                                                                                                 // 139
  /*                                                                                                             // 139
  @memberOf Logger                                                                                               //
  @name info; debug; error; fatal; warn; trace; _                                                                //
  @param message {String} - Any text message                                                                     //
  @param data    {Object} - [optional] Any additional info as object                                             //
  @param userId  {String} - [optional] Current user id                                                           //
  @summary Functions below is shortcuts for _log() method                                                        //
   */                                                                                                            //
                                                                                                                 //
  Logger.prototype.info = function(message, data, userId) {                                                      // 7
    return this._log("INFO", message, data, userId);                                                             //
  };                                                                                                             //
                                                                                                                 //
  Logger.prototype.debug = function(message, data, userId) {                                                     // 7
    return this._log("DEBUG", message, data, userId);                                                            //
  };                                                                                                             //
                                                                                                                 //
  Logger.prototype.error = function(message, data, userId) {                                                     // 7
    return this._log("ERROR", message, data, userId);                                                            //
  };                                                                                                             //
                                                                                                                 //
  Logger.prototype.fatal = function(message, data, userId) {                                                     // 7
    return this._log("FATAL", message, data, userId);                                                            //
  };                                                                                                             //
                                                                                                                 //
  Logger.prototype.warn = function(message, data, userId) {                                                      // 7
    return this._log("WARN", message, data, userId);                                                             //
  };                                                                                                             //
                                                                                                                 //
  Logger.prototype.trace = function(message, data, userId) {                                                     // 7
    return this._log("TRACE", message, data, userId);                                                            //
  };                                                                                                             //
                                                                                                                 //
  Logger.prototype.log = function(message, data, userId) {                                                       // 7
    return this._log("LOG", message, data, userId);                                                              //
  };                                                                                                             //
                                                                                                                 //
  Logger.prototype._ = function(message, data, userId) {                                                         // 7
    return this._log("LOG", message, data, userId);                                                              //
  };                                                                                                             //
                                                                                                                 //
                                                                                                                 // 156
  /*                                                                                                             // 156
  @memberOf Logger                                                                                               //
  @name antiCircular                                                                                             //
  @param data {Object} - Circular or any other object which needs to be non-circular                             //
   */                                                                                                            //
                                                                                                                 //
  Logger.prototype.antiCircular = function(obj) {                                                                // 7
    var _cache, _wrap;                                                                                           // 162
    _cache = [];                                                                                                 // 162
    _wrap = function(obj) {                                                                                      // 162
      var k, v;                                                                                                  // 164
      for (v in obj) {                                                                                           // 164
        k = obj[v];                                                                                              //
        if (typeof v === "object" && v !== null) {                                                               // 165
          if (_cache.indexOf(v) !== -1) {                                                                        // 166
            obj[k] = "[Circular]";                                                                               // 167
            return void 0;                                                                                       // 168
          }                                                                                                      //
          _cache.push(v);                                                                                        // 166
          return _wrap(v);                                                                                       // 170
        }                                                                                                        //
      }                                                                                                          // 164
    };                                                                                                           //
    _wrap(obj);                                                                                                  // 162
    return obj;                                                                                                  // 172
  };                                                                                                             //
                                                                                                                 //
                                                                                                                 // 174
  /*                                                                                                             // 174
  @memberOf Logger                                                                                               //
  @name _getStackTrace                                                                                           //
  @summary Prepare stack trace message                                                                           //
   */                                                                                                            //
                                                                                                                 //
  Logger.prototype._getStackTrace = function() {                                                                 // 7
    var obj;                                                                                                     // 180
    obj = {};                                                                                                    // 180
    Error.captureStackTrace(obj, this._getStackTrace);                                                           // 180
    return obj.stack;                                                                                            // 182
  };                                                                                                             //
                                                                                                                 //
  return Logger;                                                                                                 //
                                                                                                                 //
})();                                                                                                            //
                                                                                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['ostrio:logger'] = {}, {
  Logger: Logger
});

})();

//# sourceMappingURL=ostrio_logger.js.map
