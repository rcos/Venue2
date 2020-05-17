const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lecture = require('../Lecture/Lecture.model');

//Define collection and schema for User
let PlaybackPoll = new Schema({
	lecture: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Lecture'
	},
	// poll_type: String,
	question: String,
	possible_answers: [{
		type: String,
		default: ""
	}],
	correct_answers: [{
		type: String,
		default: ""
	}],
	timestamp: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('PlaybackPoll', PlaybackPoll);