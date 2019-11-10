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

module.exports = mongoose.model('User', User);