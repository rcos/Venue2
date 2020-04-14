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
	// implement location as a Geo Object
	location: String,
	code: {
		type: String,
		default: ""
	},
	geofence: [],
	start_time: Date,
	end_time: Date,
	submission_start_time: Date,
	submission_end_time: Date,
	submission_window_status: {
	  is_pending: {type: Boolean, default: false},
	  is_ongoing: {type: Boolean, default: false},
	  is_ended: {type: Boolean, default: false}
	}
});

module.exports = mongoose.model('Event', Event);