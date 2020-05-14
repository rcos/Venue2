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
	is_live_submission: { type: Boolean, default: false },
	video_timestamp: Number,
	student_poll_answers: {
		type: Map,
		of: String
	},
	score: Number
});

module.exports = mongoose.model('LectureSubmission', LectureSubmission);