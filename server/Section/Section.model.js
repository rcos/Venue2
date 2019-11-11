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
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	number: Number,
	students: [{
		student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}],
	teaching_assistants: [{
		ta: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}],
	events: [{
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Event'
		}
	}],
});

module.exports = mongoose.model('Section', Section);