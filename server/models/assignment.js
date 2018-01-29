import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

const assignmentSchema = new Schema({
  roomId : { 
    type : String, 
  },
  assignmentName : { 
    type : String, 
    required : [true, "Please enter Assignment Name"],
    maxlength: [60, 'Assignment Name length should be maximum of 60 characters'],
    set : addSlash,
    get : stripSlash,
    index: true
  },
  assignedTo : {
    type : String,
    ref : 'Topics'
  },
  submissions: [
    {
      studentId : { 
        type: String, 
        ref: 'Users'
      },
      fileName : { 
        type : String,
        set : addSlash,
        get : stripSlash 
      },
      fileType : {
        type : String
      },
      plagiarismId : {
        type : String
      },
      plagiarismResult : {
        type : Array
      },
      submittedAt : {
        type : Date, 
        default : moment().utc().toDate()
      },
      result : [{
        title : {
          type : String
        },
        maximumMarks : {
          type : Number
        },
        score : {
          type : Number
        }               
      }],
      comment : {
        type : String
      },
      evaluatedBy : {
        type : String,
        ref: 'Users'
      } 
    }
  ],
  uploadData : {
    fileName : { 
      type : String,
      set : addSlash,
      get : stripSlash
    },
    fileType : {
      type : String
    },
  },
  content : {
    type : Array,
    // set : addSlash,
    // get : stripSlash
  },
  configuration : [{
    title : {
      type : String
    },
    maximumMarks : {
      type : Number
    }
  }],
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

export default mongoose.model('Assignments', assignmentSchema);
