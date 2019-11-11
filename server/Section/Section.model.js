const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Course = require('../Course/Course.model');
let User = require('../User/User.model');

//Define collection and schema for User
let Section = new Schema({
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	},
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	section_number: Number,
	teaching_assistants: [{
		ta: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}],
	//implement events	
});

module.exports = mongoose.model('Section', Section);


// course (Course)
// instructor (User)
// section_number (int)
// student (array of User)
// teaching_assistants (array of User)
// events (array of Event)
