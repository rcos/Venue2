const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');
let Course = require('../Course/Course.model')

//Define collection and schema for User
let Organization = new Schema({
	name: String,
	admin_accounts: [{
		type: String,//by email???
		ref: 'User'
	}],
	courses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
    }],
    max_courses: {type: int},
    max_users: {type: int}
});

module.exports = mongoose.model('Organization', Organization);