const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Section = require('../Section/Section.model');

//Define collection and schema for Lecture
let Lecture = new Schema({
	section: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	},
	allow_live_submissions: { type: Boolean, default: false },
	allow_playback_submissions: { type: Boolean, default: false },
	start_time: Date,
	end_time: Date,
	submission_start_time: Date,
	submission_end_time: Date,
	playback_submission_start_time: Date,
	playback_submission_end_time: Date,
	submission_window_status: {
		is_pending: { type: Boolean, default: false },
		is_ongoing: { type: Boolean, default: false },
		is_ended: { type: Boolean, default: false }
	},
	video_ref: {
		type: String,
		default: ""
	},
	num_playback_polls: Number
});

module.exports = mongoose.model('Lecture', Lecture);