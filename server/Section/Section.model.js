const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Course = require('../Course/Course.model');
let User = require('../User/User.model');
let Event = require('../Event/Event.model');

//Define collection and schema for User
let Section = new Schema({
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	},
	number: Number,
	students: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
	teaching_assistants: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
});

module.exports = mongoose.model('Section', Section);
