import mongoose from 'mongoose';
import moment from 'moment';
import {addSlash, stripSlash} from '../controllers/slashesActions';

const gradeConfigurationSchema = new mongoose.Schema ({
	companyid: {
		type: String,		
		required : false,
	},
	grades: [
		{
			from: {
				type: Number
			},
			to: {
				type: Number
			},
			result: {
				type: String,
				set : addSlash,
        get : stripSlash
			},
			grade: {
				type: String,
				set : addSlash,
        get : stripSlash
			}
		}
	],
	createdBy: {
		type: String			
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

export default mongoose.model('GradeConfiguration', gradeConfigurationSchema)