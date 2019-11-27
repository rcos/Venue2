const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Section = require('../Section/Section.model');
let Submission = require('../Submission/Submission.model');

//Define collection and schema for User
let EventSchema = new Schema({
	title: String,
	section: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	},
	//implement location
	//implement submission_window
	submissions: [{
		submission: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Submission'
		}
	}]
});

module.exports = mongoose.model('Event', EventSchema);