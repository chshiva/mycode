import redis from 'redis'

class RedisUtils{
  constructor() {
    // var redisClient = redis.createClient
    // this.redis = redisClient(process.env.REDIS_PORT || '6379', process.env.REDIS_HOST || 'localhost');
    // this.redis.on("error", function (err) {
    //   console.log("rediserr",err);
    // });
  }

  setToRedis(key, value) {
    this.redis.set(key, JSON.stringify(value), function (err) {
      if (err)
        console.log("setToRedis Error",err);
    });
  }

  // async getFromRedis(key) {
  //   var self = this
  //   var result = await new Promise(function(resolve){
  //     self.redis.get(key, function (err, data) {
  //       if (err || data == null) {
  //         //console.log("getFromRedis Error",err);
  //         resolve({ success: false, result: "User Not Found" })
  //       }
  //       else {
  //         //console.log("JSON.parse(data)", JSON.parse(data))
  //         resolve({ success: true, result: JSON.parse(data)})
  //       }
  //     })
  //   })
  //   return result
  // }

  getFromRedis(key, cb){
    this.redis.get(key, function (err, data) {
        if(err || data == null || data == 0){
            //console.log("removeFromRedis", err);
            cb && cb({ success: false, result: "User Not Found" })
        }
        else  {
          cb && cb({ success: true, result: JSON.parse(data)})
        }
    })    
    //return result
  }

  removeFromRedis(key, cb){
    this.redis.del(key, function (err, data) {
        if(err || data == null || data == 0){
            //console.log("removeFromRedis", err);
            cb && cb({ success: false, result: "User Not Found" })
        }
        else if(data == 1) {
          cb && cb({ success: true})
        }
    })    
    //return result
  }
}

//const redisutils = new RedisUtils()
//export default redisutils