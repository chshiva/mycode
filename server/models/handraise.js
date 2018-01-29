var mongoose = require('mongoose');
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

var schema = new mongoose.Schema( {

    question : { 
        type : String, 
       	trim : true,
        set : addSlash,
        get : stripSlash
    },
    author : {
    	type : mongoose.Schema.Types.ObjectId,
      ref: 'Users' 
    },
    roomId : {
    	type : mongoose.Schema.Types.ObjectId,
      ref: 'Room' 
    },
    scheduleId : {
    	type : mongoose.Schema.Types.ObjectId,
      ref: 'schedule' 
    },
    answers : [{
        _id : {
          type : mongoose.Schema.Types.ObjectId,
          auto: true
        },
      	author : {
        	type : mongoose.Schema.Types.ObjectId,
        	ref : 'Users'
      	},
      	answer : {
        	type : String,
        	trim : true,
          set : addSlash,
          get : stripSlash
      	},
      	answerAt : {
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
        comment : {
          type : String,
          trim : true,
          maxlength: [150,'Reply length should be maximum of 150 characters'],
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
var Handraise = mongoose.model('handraise', schema);
export default Handraise;