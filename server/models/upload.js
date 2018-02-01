import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

const uploadSchema = new Schema({
  roomId : { 
    type : String, 
  },
  fileName : { 
    type : String,
    set : addSlash,
    get : stripSlash
  },
  topicId : { 
    type : String,
    ref : 'Topics' 
  }, 
  fileType : {
    type : String
  },
  isEnable : {
    type : Boolean,
    default : false
  },
  title : {
    type : String
  },
  duration : {
    type : String
  },
  description : {
    type : String,
    set : addSlash,
    get : stripSlash
  },
  createdAt : {
    type : Date, 
    default : moment().utc().toDate()
  },
  createdBy: {
    type: String,
    required: false,
  },
  updatedBy: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: moment().utc().toDate(),
  },
  scormApiVersion: {
    type: String,
    required: false,
    default: '',
  },
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default mongoose.model('Uploads', uploadSchema);
