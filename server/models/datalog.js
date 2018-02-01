import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var moment = require('moment');

const dataLog = new Schema({
  uid : { 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  category : { 
    type : String,
    required: true,
  },
  action : { 
    type : String,
    required: true,
  },
  label : { 
    type : String, 
    required: false,
  },
  value : {
    type : Object,
    required : false
  },
  dateAdded: { 
    type: Date, 
    default: moment().utc().toDate(), 
    required: true
  },
});

export default mongoose.model('dataLog', dataLog);
