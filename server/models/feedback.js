import mongoose from 'mongoose';
import moment from 'moment';

const feedbackSchema = new mongoose.Schema ({
	
	userId: {
		type: String,
		required: true,
		ref : 'Users'
	},
	scheduleId: {
		type: String,
		required: false,
	},
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Room'
	},	
	feedbacks:
	{	
		type: Object,
		required: true,			
	},	
	createdBy: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		required: true,
		default: moment().utc().toDate(),
	}

});

export default mongoose.model('Feedback', feedbackSchema);
