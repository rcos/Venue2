const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');

//subschema to allow schema to hold multiple instructors
let instructor = new Schema({
	type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
});


//Define collection and schema for User
let Course = new Schema({
	name: String,
	dept: String,
	course_number: Number,
	instructors: [instructor]
});

module.exports = mongoose.model('Course', Course);