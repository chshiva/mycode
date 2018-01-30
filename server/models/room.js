import mongoose from 'mongoose';
// let moment = require('moment');
import moment from 'moment';
import {addSlash, stripSlash} from '../controllers/slashesActions';

const roomSchema = new mongoose.Schema ({
	selPackage: {
		type: String,
		required: [true, 'Please select Package Name'],
		trim: true,
		ref: 'Package',
		match: [/^[a-zA-Z0-9\-\s]+$/, 'Please Select valid Package name'],
	},
	roomName: {
		type: String,
		required: [true, 'Please enter Room Name'],
		trim: true,
		match: [/^[a-zA-Z0-9\-\s]+$/, 'Please enter valid Room Name'],
    maxlength: [30, 'Room Name length should be maximum of 30 characters'],
    set : addSlash,
    get : stripSlash,
    index: true
	},
	roomType: {
		type: String,
		required: [true,'Please select Conference Type'],
		enum: ['Mix', 'Forward', 'Hybrid'],
	},
	// roomLicense: {
	// 	type: String,
	// 	required: [true, 'Room License is required'],
	// 	trim: true,
	// 	match: [/^[a-zA-Z0-9]+$/, 'Invalid format room license!'],
	// },
	corporateId: {
		type: String,
		trim: true,
		ref: 'corporate',
	},
	categoryId: {
		type: String,
		trim: true,
		ref: 'category',
	},
	roomPassword: {
		type: String,
		required: false,
		trim: true,
		maxlength: [15, 'Room Password length should be maximum of 15 characters'],
		set : addSlash,
    get : stripSlash
	},
	expiryDate: {
		type: 'Date',
		validate: {
			validator: function (v) {
				if (v > moment().utc().toDate()) return true
				else return false
			},
			message: "Room Expiry date can't be less than current Date"
		},
	},
	hostPassword: {
		type: String,
		required: [true,'Please enter Host Password'],
		trim: true,
		maxlength: [15, 'Host Password length should be maximum of 15 characters'],
		set : addSlash,
    get : stripSlash
	},
	// mcuServer: {
	// 	type: String,
	// 	required: false,
	// },
	// bridgeNumber: {
	// 	type: String,
	// 	required: false,
	// },
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		ref: 'Users'
	}],
	locations: [{
		locationId : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Location'
		},
		locationParticipants: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users'
		}]		
	}],
	roomConfiguration : {
		feedback : {
			feedbackType : {
				type : String,
				default : "Default",
				set : addSlash,
    		get : stripSlash
			},
			questionnaireId : {
				type : mongoose.Schema.Types.ObjectId,
				ref: 'Questionnaire',
			}
		},
		codecType : {
			type : String,
			default : 'vp8',
			set : addSlash,
    	get : stripSlash
		},
		enableLive : {
			type : Boolean,
			default : true
		}
	},
	roomKey: {
		type: String,
		required: true,
		set : addSlash,
    get : stripSlash
	},
	roomid: {
		type: String,
		required: false,
	},
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
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

roomSchema.index({ roomKey: 1 }, { unique : true} ); // schema level

export default mongoose.model('Room', roomSchema);
