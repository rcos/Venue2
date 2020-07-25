const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lecture = require('../Lecture/Lecture.model');

//Define collection and schema for User
let PlaybackPoll = new Schema({
	lecture: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Lecture'
	},
	question: {
		type: String,
		default: ""
	},
	possible_answers: {
		type: [String],
		default: ""
	},
	correct_answers: {
		type: [String],
		default: ""
	},
	checkin: Number,
	timestamp: Number,
	code: Number
});

module.exports = mongoose.model('PlaybackPoll', PlaybackPoll);
