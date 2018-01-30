import mongoose from 'mongoose';
import moment from 'moment';
import {addSlash, stripSlash} from '../controllers/slashesActions';

const ParticipantsGroupSchema = new mongoose.Schema ({	
	groupName: {
		type: String,
		required: false,
		maxlength: [50,'Group Name length should be maximum of 50 characters'],
		trim: true,
		set : addSlash,
    get : stripSlash,
    index: true
	},
	companyid: {
		type: String,		
		required : false,
	},	
	participants: [{
		type: mongoose.Schema.Types.ObjectId,		
		ref: 'Users'
	}],	
	createdBy: {
		type: String,	
		ref: 'Users'	
	},
	createdOn: {
		type: Date,		
		default: moment().utc().toDate(),
	},
	modifiedOn: {
		type: Date,		
		default: moment().utc().toDate(),
	}
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default mongoose.model('ParticipantsGroup', ParticipantsGroupSchema);
