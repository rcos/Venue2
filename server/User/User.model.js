const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');

//Define collection and schema for User
let User = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	is_instructor: {
		type: Boolean,
		default: false
	},
	is_ta: {
		type: Boolean,
		default: false
	},
	courses: [{
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Course'
		}
	}],
	ta_sections: [{
		section: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Section'
		}
	}],
	//implement submissions
});

module.exports = mongoose.model('User', User);