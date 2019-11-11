const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Section = require('../Section/Section.model');

//Define collection and schema for User
let Event = new Schema({
	title: String,
	section: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	},
	//implement location
	//implement submission_window
	//implement submission
});

module.exports = mongoose.model('Section', Section);


// title (str)
// section (Section)
// location (obj)
// submission_window (obj)
// submissions (array of Submission)
