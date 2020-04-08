const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = require('../Event/Event.model');
let Section = require('../Section/Section.model');

//Define collection and schema for User
let Submission = new Schema({
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
	},
	submitter: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	time: Date,
	location: {},
	//implement image
	is_verified: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Submission', Submission);
