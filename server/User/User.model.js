const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define collection and schema for User
let User = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	is_instructor: {
		type: Boolean,
		default: false
	},
	is_ta: {
		type: Boolean,
		default: false
	},
	//implement courses
	//implement ta_sections
	//implement submissions
});

// User
// first_name (str)
// last_name (str)
// email (str or obj?)
// password (str or obj?)
// is_instructor (bool)
// is_ta (bool)
// courses (array of Course)
// For students: courses the User is a student for
// For instructors: courses the User is an instructor for
// ta_sections (array of Section)
// submissions (array of Submission)

module.exports = mongoose.model('User', User);