
var mongoose = require('mongoose');
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

var schema = new mongoose.Schema( {
        meetingName : { 
            type : String, 
            required : [true, 'Please select Meeting name'], 
            trim : true,
            match : [ /^[a-zA-Z0-9\-\s]+$/, "Please enter valid Meeting Name" ],
            maxlength: [30,'Meeting Name length should be maximum of 30 characters'],
            set : addSlash,
            get : stripSlash,
            index: true
        },
        roomId : {
            type : mongoose.Schema.Types.ObjectId,
            required : [true, 'Please Select Room Name'],
            ref: 'Room'
        },
        topicId : {
            type : String,
            ref: 'Topic'
        },
        dates : [{
            _id : {
              type : mongoose.Schema.Types.ObjectId,
              auto: true
            },
            startTime : {
                type : Number
            },
            endTime : {
                type : Number
            }
        }],
        pattern : {
            type : String,
            set : addSlash,
            get : stripSlash
        },
        startDate : { 
            type : Number, 
            required : [true, 'Please Select Start Date']   
        },
        endDate : { 
            type : Number, 
            required : [true, 'Please Select End Date']   
        },
        duration : {
            type : Number,
            required : [true, 'Please Select duration']
        },
        password : { 
            type : String, 
            trim : true,
            set : addSlash,
            get : stripSlash
        },
        createdBy : { 
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Users' 
            /*required : [true, "Unauthorized user access"]*/
        },
        modifiedBy : { 
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Users' 
            /*required : [true, "Unauthorized user access"]*/
        },
        createdAt : { 
            type : Date, 
            /*required : true,*/
            default : Number(moment().utc().format('x'))
        },
        modifiedAt : { 
            type : Date, 
            /*required : true,*/
            default : Number(moment().utc().format('x'))
        }

},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

var Schedule = mongoose.model('schedule', schema);
export default Schedule;