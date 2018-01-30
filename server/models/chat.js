import mongoose from 'mongoose';
import moment from 'moment';
import {addSlash, stripSlash} from '../controllers/slashesActions';

const ChatSchema = new mongoose.Schema ({	
	sentBy: {
		type: mongoose.Schema.Types.ObjectId,		
		ref: 'Users',
		required: true
	},
	sentTo: {
		type: mongoose.Schema.Types.ObjectId,		
		ref: 'Users'
	},
	sentToGroup: {
		type: mongoose.Schema.Types.ObjectId,		
		ref: 'Group'
	},
	sentToRoom: {
		type: mongoose.Schema.Types.ObjectId,		
		ref: 'Room'
	},
	status  : {
		type : [String]
	},
	chatType: {
		type: 'String',
    enum : ['Indi', 'Group', 'Room'],
		required: true
	},
	messageType: {
		type: 'String',
    enum : ['TXT', 'IMG', 'FILE', 'LINK', 'VIDEO', 'MEDIA', 'YOUTUBE', 'URL', 'VIMEO'],
		required: true
	},
	message: {
		type: 'String',
		required: true,
		set : addSlash,
		get : stripSlash
	},
	fileName: {
		type: 'String',
		set : addSlash,
		get : stripSlash
	},
	duration: {
		type : 'String',
		required: false
	},
	title: {
		type : 'String',
		required: false
	},
	vimeoThumbnail: {
		type : 'String',
		required: false
	},
	deletedBY: [ {
		type: mongoose.Schema.Types.ObjectId,		
		ref: 'Users'
	}],
	createdOn: {
		type: Date,		
		default: moment().utc().toDate(),
		required: true
	}
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});

export default mongoose.model('Chat', ChatSchema);
