const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = require('../Event/Event.model');

//Define collection and schema for Lecture
let Lecture = new Schema({
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
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
	},
	video_ref: {
		type: String,
		default: ""
	}
});

module.exports = mongoose.model('Lecture', Lecture);