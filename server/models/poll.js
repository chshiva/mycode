import mongoose from 'mongoose';
import moment from 'moment';
const Schema = mongoose.Schema;
import {addSlash, stripSlash} from '../controllers/slashesActions';

const pollSchema = new Schema({
  roomId : { 
    type : String
  },
  question : { 
    type: String,
    maxlength: [300, "Question length should be maximum of 300 characters"],
    trim: true,
    set : addSlash,
    get : stripSlash
  },
  options : {
    type: Array
  },
  submissions : [
  	{
    	submittedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' 
      },
      answer : {
      	type: String,
        trim: true,
        set : addSlash,
        get : stripSlash
      }
    }
  ],      
  publish: {
  	type: Boolean
  },
  createdBy : { 
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'Users' 
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

export default mongoose.model('Poll', pollSchema);