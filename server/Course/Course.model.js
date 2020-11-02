const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');
let Section = require('../Section/Section.model')

//Define collection and schema for User
let Course = new Schema({
	name: String,
	prefix: String,
	suffix: Number,
	instructors: [{
		type: String,
		ref: 'User'
	}],
	sections: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	}]
});

module.exports = mongoose.model('Course', Course);