const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lecture = require('../Lecture/Lecture.model');

//Define collection and schema for LectureSubmission
let LectureSubmission = new Schema({
	lecture: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Lecture'
	},
	submitter: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	code: String,
	video_progress: Number,
	video_percent: Number,
	student_poll_answers: [
		[{
			type: Boolean,
			default: ""
		}]
	],
	is_live_submission: { type: Boolean, default: false },
	live_submission_time: Date,
	playback_submission_time: Date
});

module.exports = mongoose.model('LectureSubmission', LectureSubmission);