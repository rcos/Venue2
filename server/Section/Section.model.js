const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Course = require('../Course/Course.model');

//Define collection and schema for User
let Section = new Schema({
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	},
	name: {type:String,default:''},
	teaching_assistants: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	students: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	is_public: {
		type: Boolean,
		default: 'False'
	}
});

module.exports = mongoose.model('Section', Section);
