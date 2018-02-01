import mongoose from 'mongoose';
let moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

const packageSchema = new mongoose.Schema ({
	packageName: {
		type: String,
		required: [true, 'Please enter Package Name'],
		trim: true,
		match: [/^[a-zA-Z0-9\-\s]+$/, 'Please enter valid Package Name'],
    maxlength: [50, 'Package Name length should be maximum of 50 characters'],
    set : addSlash,
    get : stripSlash
	},
	packagePrice: {
		type: Number,

		/* commented because of no functionality, need to implement */
		// required: [true, 'Please enter Package Price'],
		match: [/^[0-9\-\s]+$/, 'Please enter valid Package Price']
	},
	packageValidity: {
		type: 'Date',
		required: [true, 'Please select Package Validity'],
		validate: {
			validator: function (v) {
				if (v > moment().utc().toDate()) return true
				else return false
			},
			message: "Package validity {VALUE} can't be past date!"
		},
	},
	userCount: {
		type: Number,
		required: [true,'Please enter User Count'],
		match: [/^[0-9\-\s]+$/, 'Please enter valid User Count'],
		min: [-1, 'User count should be minimum of -1'],
    max: [100000, 'User count should be maximum of 100000']
	},
	roomCount: {
		type: Number,
		required: [true,'Please enter No. of Rooms'],
		match: [/^[0-9\-\s]+$/, 'Please enter valid No. of Rooms'],
		min: [-1, 'No. of Rooms should be minimum of -1'],
    max: [100000, 'No. of Rooms should be maximum of 100000']
	},
	topicCount: {
		type: Number,

		/* commented because of no functionality, need to implement */
		// required:[true,'Please enter No. of Topics'],
		match: [/^[0-9\-\s]+$/, 'Please enter valid No. of Topics'],
		min: [-1, 'No. of Topics should be minimum of -1'],
    max: [100000, 'No. of Topics should be maximum of 100000']
	},
	continuousPresence: {
		type: Number,
		required: [true,'Please enter Continuous Presence'],
		match: [/^[0-9\-\s]+$/, 'Please enter valid Continuous Presence'],
		min: [-1, 'Continuous Presence should be minimum of -1'],
    max: [100000, 'Continuous Presence should be maximum of 100000']
	},
	serverLocation: {
		type: String,
		required: [true,'Please select Server Location'],
		set : addSlash,
    get : stripSlash
	},
	assignedTo: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true,'Please select Assigned To'],
		ref: 'Users'
	},
	features: {
		type: [String],
		required: [true,'Please select at least one Features'],
		enum: ['User Presence', 'Whiteboard', 'Screen Share', 'Q&A', 'Video Conference', 'Topics']
		/*set : addSlash,
    get : stripSlash*/
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
	createdAt: {
		type: Date,
		required: true,
		default: moment().utc().toDate(),
	},
	modifiedBy: {
		type: String,
		required: true,
	},
	modifiedAt: {
		type: Date,
		required: true,
		default: moment().utc().toDate(),
	},
	payment_details: {
	    order_id: { 
	      type: String, 
	      },
	  	bank_ref_no: { 
	      type: [String] 
	    },
	  	order_status: { 
	      type: String, 
	      
	    },
	  	failure_message: { 
	      type: String 
	    },
	    card_name: { 
	      type: String 
	    },
	    status_code: { 
	      type: String
	    },
	    status_message: { 
	      type: String
	    },
	    currency: { 
	      type: String 
	    },
	    card_type: { 
	      type: String, 
	      },
	  	data_accept: { 
	      type: [String] 
	    },
	  	card_number: { 
	      type: String, 	      
	    },
	  	expiry_month: { 
	      type: String 
	    },
	    expiry_year: { 
	      type: String 
	    },
	    cvv_number: { 
	      type: String
	    },
	    issuing_bank: { 
	      type: String
	    },
	    mm_id: { 
	      type: String 
	    },
	    promo_code:{
	    	type: String 
	    },
	    tracking_id: { 
	      type: String
	    },
	    amount: { 
	      type: String 
	    },
	    payment_mode:{
	    	type: String 
	    }
	    
	},
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default mongoose.model('Package', packageSchema);
