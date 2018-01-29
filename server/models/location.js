import mongoose from 'mongoose';
import moment from 'moment';
import {addSlash, stripSlash} from '../controllers/slashesActions';

const locationSchema = new mongoose.Schema ({	
	corporateId: {
		type: String,
		trim: true,
		ref: 'corporate',
		// required : true
	},
  	locationName: {
		type: String,
		required: [true,"Please enter Location Name" ],
		match : [ /^[a-zA-Z\-\s]+$/, "Please enter valid Location Name" ],
		maxlength: [50, 'Location Name length should be maximum of 50 characters'],
		set : addSlash,
    get : stripSlash,
    index: true
	},
	description: {
		type: String,
		required: [true,"Please enter Description" ],
		maxlength: [150, 'Description length should be maximum of 30 characters'],
		set : addSlash,
    get : stripSlash
	},
	createdBy: {
		type: String,
		required: true,
	},
	updatedBy: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		required: true,
		default: moment().utc().toDate()
	},
	updatedAt: {
		type: Date,
		required: true,
		default: moment().utc().toDate(),
	}
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default mongoose.model('Location', locationSchema);
