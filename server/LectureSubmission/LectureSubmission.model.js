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
	codes: [String],
	live_progress: Number, //			number of live checkins
	live_percent: Number, // 			attendance percantage for live checkins
	video_progress: Number, //			seconds into playback video
	video_percent: Number, //			attendance percent for playback video
	student_poll_answers: Object, //	mapping of <timestamp or percantage> as key, and <answer choices> and value
	live_submission_time: Date, //		most recent live submission
	playback_submission_time: Date //	most recent playback video submission
});

module.exports = mongoose.model('LectureSubmission', LectureSubmission);