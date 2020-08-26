const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');

//Define collection and schema for User
let Course = new Schema({
	name: String,
	prefix: String,
	suffix: Number,
	instructors: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('Course', Course);