const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Section = require('../Section/Section.model');
let Submission = require('../Submission/Submission.model');

//Define collection and schema for User
let Event = new Schema({
	title: String,
	section: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	},
	is_active: {
		type: Boolean,
		default: false
	},
	code: {
		type: String,
		default: ""
	},
	//implement location
	start_time: Date,
	end_time: Date
});

module.exports = mongoose.model('Event', Event);