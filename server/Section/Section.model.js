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
		type: String,
		ref: 'User'
	}],
	students: [{
		type: String,
		ref: 'User'
	}],
	is_public: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Section', Section);
