const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');

//Define collection and schema for User
let Course = new Schema({
	name: String,
	dept: String,
	course_number: Number,
	//sections
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Course', Course);

// name (str)
// dept (str)
// course_number (int)
// sections (array of  Section)
// instructor (User)
