var mongoose = require('mongoose');
var moment = require('moment');
import {addSlash, stripSlash} from '../controllers/slashesActions';

var resultSchema = new mongoose.Schema({
	roomId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Room'
	},
	topicId : {
		type : mongoose.Schema.Types.ObjectId
	},
	questionnaireId : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Questionnaire'
	},
	totalMarks : {
		type : String,
		maxlength: [3,'Total Marks length should be maximum of 3 characters'],
		set : addSlash,
    get : stripSlash
	},
	obtainedMarks : {
		type : String,
		maxlength: [3,'Obtained Marks length should be maximum of 3 characters'],
		set : addSlash,
    get : stripSlash
	},
	grade : {
		type : String,
		set : addSlash,
    get : stripSlash
	},
	questionnairePercentage : {
		type : String,
		set : addSlash,
    get : stripSlash
	},
	result : {
		type : String,
		set : addSlash,
    get : stripSlash
	},
	correctAns : {
		type : Array
	},
	wrongAns : {
		type : Array
	},
	submittedBy : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Users'
	}
},{
    toObject : {getters: true},
    toJSON : {getters: true}
});


export default mongoose.model('Result', resultSchema);
