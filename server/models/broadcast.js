var mongoose = require('mongoose');
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

var schema = new mongoose.Schema( {

    broadcast : { 
        type : String, 
        trim : true,
        set : addSlash,
        get : stripSlash
    },
    author : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Users' 
    },
    companyid : {
      type : mongoose.Schema.Types.ObjectId,
        ref: 'Corporate' 
    },    
    student : {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Student' 
    },    
    status  : {
      type : [String],
      ref: 'Users'
    },
    comments : [{
        _id : {
          type : mongoose.Schema.Types.ObjectId,
          auto: true
        },
        author : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Users'
        },
        comment : {
          type : String,
          trim : true,
          set : addSlash,
          get : stripSlash
        },
        commentAt : {
          type : Date,
          default : moment().utc().toDate()
        }
    }],
    likes : [{
        _id : {
          type : mongoose.Schema.Types.ObjectId,
          auto: true
        },
        likedBy : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Users'
        },        
        likedAt : {
          type : Date,
          default : moment().utc().toDate()
        }
    }],
    replies : [{
        _id : {
          type : mongoose.Schema.Types.ObjectId,
          auto: true
        },        
        author : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Users'
        },
        replyOn : {
          type : mongoose.Schema.Types.ObjectId          
        },
        reply : {
          type : String,
          trim : true,
          maxlength: [150, 'Reply length should be maximum of 150 characters'],
          set : addSlash,
          get : stripSlash
        },
        replyAt : {
          type : Date,
          default : moment().utc().toDate()
        }
    }],
    createdAt : { 
        type : Date, 
        default : moment().utc().toDate()
    },
    modifiedAt : { 
        type : Date, 
        default : moment().utc().toDate()
    }
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});
var Broadcast = mongoose.model('broadcast', schema);
export default Broadcast;