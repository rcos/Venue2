const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Section = require('../Section/Section.model');

//Define collection and schema for User
let Lecture = new Schema({
	section: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	},
	title: String,
	time: Date,
	is_active: {
		type: Boolean,
		default: false
	},
	start_time: Date,
	end_time: Date,
	submission_start_time: Date,
	submission_end_time: Date,
	submission_window_status: {
		is_pending: { type: Boolean, default: false },
		is_ongoing: { type: Boolean, default: false },
		is_ended: { type: Boolean, default: false }
	}
	//video: {VIDEO OBJECT}
});

module.exports = mongoose.model('Lecture', Lecture);