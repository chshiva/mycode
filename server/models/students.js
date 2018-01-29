import mongoose from 'mongoose';
import moment from 'moment';

const studentSchema = new mongoose.Schema ({
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'Please enter Room ID'],
		trim: true,
		ref: 'Room'
	},
	instId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'Please enter Instructor ID'],
		trim: true,
		ref: 'Users'
	},
	students: [{
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		ref: 'Users'
	}],
	certificateEligible: [{
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		ref: 'Users',
	}],
	createdBy: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		required: true,
		default: moment().utc().toDate(),
	},
	modifiedBy: {
		type: String,
		required: true,
	},
	modifiedOn: {
		type: Date,
		required: true,
		default: moment().utc().toDate(),
	},
});

export default mongoose.model('Student', studentSchema);
