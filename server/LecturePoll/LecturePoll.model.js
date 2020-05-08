const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lecture = require('../Lecture/Lecture.model');

//Define collection and schema for User
let LecturePoll = new Schema({
	lecture: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Lecture'
	},
	poll_type: String,
	question: String,
	possible_answers: {},
	correct_answers: {}
});

module.exports = mongoose.model('LecturePoll', LecturePoll);