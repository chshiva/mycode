(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Logger = Package['ostrio:logger'].Logger;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;

/* Package-scope variables */
var __coffeescriptShare, LoggerMongo;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ostrio_loggermongo/loggermongo.coffee.js                                                            //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var NOOP;                                                                                                       // 1
                                                                                                                //
NOOP = function() {};                                                                                           // 1
                                                                                                                //
                                                                                                                // 3
/*                                                                                                              // 3
@class LoggerMongo                                                                                              //
@summary MongoDB adapter for ostrio:logger (Logger)                                                             //
 */                                                                                                             //
                                                                                                                //
LoggerMongo = (function() {                                                                                     // 1
  function LoggerMongo(logger, options) {                                                                       // 8
    var base, base1, self;                                                                                      // 9
    this.logger = logger;                                                                                       // 9
    this.options = options != null ? options : {};                                                              // 9
    check(this.logger, Match.OneOf(Logger, Object));                                                            // 9
    check(this.options, {                                                                                       // 9
      collectionName: Match.Optional(String),                                                                   // 10
      collection: Match.Optional(Match.OneOf(Mongo.Collection, Object)),                                        // 10
      format: Match.Optional(Function)                                                                          // 10
    });                                                                                                         //
    if (!this.options.collectionName && !this.options.collection) {                                             // 16
      throw new Meteor.Error(400, '[LoggerMongo]: `collectionName` or `collection` must be presented');         // 17
    }                                                                                                           //
    if ((base = this.options).format == null) {                                                                 //
      base.format = function(opts) {                                                                            //
        return opts;                                                                                            // 19
      };                                                                                                        //
    }                                                                                                           //
    self = this;                                                                                                // 9
    if (Meteor.isServer) {                                                                                      // 22
      if (this.options.collection) {                                                                            // 23
        this.collection = this.options.collection;                                                              // 24
      } else {                                                                                                  //
        if ((base1 = this.options).collectionName == null) {                                                    //
          base1.collectionName = "ostrioMongoLogger";                                                           //
        }                                                                                                       //
        this.collection = new Meteor.Collection(this.options.collectionName);                                   // 26
        this.collection.deny({                                                                                  // 26
          update: function() {                                                                                  // 29
            return true;                                                                                        //
          },                                                                                                    //
          remove: function() {                                                                                  // 29
            return true;                                                                                        //
          },                                                                                                    //
          insert: function() {                                                                                  // 29
            return true;                                                                                        //
          }                                                                                                     //
        });                                                                                                     //
      }                                                                                                         //
    }                                                                                                           //
    self.logger.add('Mongo', function(level, message, data, userId) {                                           // 9
      var record, time;                                                                                         // 34
      if (data == null) {                                                                                       //
        data = null;                                                                                            //
      }                                                                                                         //
      if (Meteor.isServer) {                                                                                    // 34
        time = new Date();                                                                                      // 35
        if (data) {                                                                                             // 36
          data = self.logger.antiCircular(data);                                                                // 37
          if (_.isString(data.stackTrace)) {                                                                    // 38
            data.stackTrace = data.stackTrace.split(/\n|\\n|\r|\r\n/g);                                         // 39
          }                                                                                                     //
        }                                                                                                       //
        record = self.options.format({                                                                          // 35
          userId: userId,                                                                                       // 42
          date: time,                                                                                           // 42
          timestamp: +time,                                                                                     // 42
          level: level,                                                                                         // 42
          message: message,                                                                                     // 42
          additional: data                                                                                      // 42
        });                                                                                                     //
        if (!_.isObject(record)) {                                                                              // 49
          throw new Meteor.Error(400, "[ostrio:logger] [options.format]: Must return a plain Object!", record);
        }                                                                                                       //
        return self.collection.insert(record, NOOP);                                                            //
      }                                                                                                         //
    }, NOOP, true);                                                                                             //
  }                                                                                                             //
                                                                                                                //
  LoggerMongo.prototype.enable = function(rule) {                                                               // 8
    if (rule == null) {                                                                                         //
      rule = {};                                                                                                //
    }                                                                                                           //
    check(rule, {                                                                                               // 57
      enable: Match.Optional(Boolean),                                                                          // 57
      client: Match.Optional(Boolean),                                                                          // 57
      server: Match.Optional(Boolean),                                                                          // 57
      filter: Match.Optional([String])                                                                          // 57
    });                                                                                                         //
    if (rule.enable == null) {                                                                                  //
      rule.enable = true;                                                                                       //
    }                                                                                                           //
    if (rule.client == null) {                                                                                  //
      rule.client = false;                                                                                      //
    }                                                                                                           //
    if (rule.server == null) {                                                                                  //
      rule.server = true;                                                                                       //
    }                                                                                                           //
    this.logger.rule('Mongo', rule);                                                                            // 57
    return this;                                                                                                // 69
  };                                                                                                            //
                                                                                                                //
  return LoggerMongo;                                                                                           //
                                                                                                                //
})();                                                                                                           //
                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['ostrio:loggermongo'] = {}, {
  LoggerMongo: LoggerMongo
});

})();

//# sourceMappingURL=ostrio_loggermongo.js.map
