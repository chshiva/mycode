var mongoose = require('mongoose');
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

var categorySchema = new mongoose.Schema({
	corporateId: {
		type: String,
		trim: true,
		ref: 'corporate',
		required : true
	},
	categoryName : {
		type: String,
		required : [true,'Please enter Category Name'],
		maxlength: [50, 'Category Name length should be maximum of 50 characters'],
		set : addSlash,
    get : stripSlash,
    index: true
	},
	categoryDesc : {
		type: String,
		required : [true,'Please enter Category Description'],
		maxlength: [150, 'Category Description length should be maximum of 150 characters'],
		set : addSlash,
    get : stripSlash
	},
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

export default mongoose.model('category', categorySchema)
