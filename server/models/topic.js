import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

const topicSchema = new Schema({
  roomId : { 
    type : String
  },
  topicName : { 
    type : String, 
    required : [true, "Please enter Topic Name"],
    maxlength: [60, 'Topic Name length should be maximum of 60 characters'],
    trim: true,
    set : addSlash,
    get : stripSlash,
    index: true
  },
  description : { 
    type : String,
    required : [true, "Please enter Description"],
    maxlength: [250, 'Description length should be maximum of 250 characters'],
    trim: true,
    set : addSlash,
    get : stripSlash
  },
  content : {
    ops : [Object]
  },
  questionnaire: [
    {
      questionnaireId : { 
        type: String,
        ref : 'Questionnaire' 
      },
      openFrom : { 
        type: Date 
      },
      closeFrom : {
        type: Date 
      },
      showResult : {
        type : Boolean
      }
    }
  ],
  topicEnable: {
    type:Boolean,
    default:false
  },
  topicIndex: { 
    type : String
  },
  createdBy : { 
    type : mongoose.Schema.Types.ObjectId, 
    ref : 'Users'
  },
  modifiedBy : { 
    type : mongoose.Schema.Types.ObjectId, 
  },
  modifiedAt : { 
    type : Date, 
    default : moment().utc().toDate()
  }, 
  createdAt : {
    type : Date, 
    default : moment().utc().toDate()
  }
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default mongoose.model('Topics', topicSchema);
