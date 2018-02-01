import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

const userSchema = new Schema({
  corporateId : { 
    type : String
  },
  questionnaireName : { 
    type : String,
    required : [true, "Please enter Questionnaire Name"],
    maxlength: [50, 'Questionnaire Name length should be maximum of 50 characters'],
    trim: true,
    set : addSlash,
    get : stripSlash,
    index: true
  },
  description : { 
    type : String,
    required : [true, "Please enter Description"],
    maxlength: [150, 'Description length should be maximum of 150 characters'],
    trim: true,
    set : addSlash,
    get : stripSlash
  },
  questionnaireType: {
    type: String,
    required: false,
    enum: ['regular', 'scorm'],
    set: addSlash,
    get: stripSlash,
  },
  scormId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Uploads',
  },
  //Commented the set and get for bug#3023(By: Prateek)
  questions: [
    {
      question : { 
        type: Array,
        maxlength: [1000, 'Question length should be maximum of 300 characters'],
        trim: true,
        // set : addSlash,
        //get : stripSlash
      },
      questionType : { 
        type: String,
        set : addSlash,
        get : stripSlash
      },
      answers : {
        type: Array 
      },
      options : {
        type: Array
      },
      swots : {
        type: Array
      },
      marks : {
        type : Number
      }
    }
  ],
  createdBy : { 
    type : mongoose.Schema.Types.ObjectId, 
  },
  modifiedBy : { 
    type : mongoose.Schema.Types.ObjectId, 
  },
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

export default mongoose.model('Questionnaire', userSchema);
