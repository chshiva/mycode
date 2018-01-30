import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var moment = require('moment');

const logSchema = new Schema({
  uid : { 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  logType : { 
    type : String,
    required: true,
  },
  actionType : { 
    type : String,
    required: true,
  },
  actionTime : { 
    type : Date, 
    required: true,
  },
  details : {
    type : Object,
    required : true
  }  
});

export default mongoose.model('Logger', logSchema);
