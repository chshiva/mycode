import mongoose from 'mongoose';
import moment from 'moment';
import {addSlash, stripSlash} from '../controllers/slashesActions';

const GroupSchema = new mongoose.Schema ({	
	groupName: {
		type: String,
		required: false,
		maxlength: [50,'Group Name length should be maximum of 50 characters'],
		set : addSlash,
    get : stripSlash,
    index: true
	},	
	members: [{
		type: mongoose.Schema.Types.ObjectId,		
		ref: 'Users'
	}],	
	createdBy: {
		type: String,		
	},
	createdOn: {
		type: Date,		
		default: moment().utc().toDate(),
	}
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default mongoose.model('Group', GroupSchema);
