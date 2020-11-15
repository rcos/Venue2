const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = require('../User/User.model');
let Section = require('../Section/Section.model')

//Define collection and schema for User
let Attachment = new Schema({
	name: String,
	date_uploaded: String,
    type: String,
    size: String,
	uploadedBy: {
		type: String,
		ref: 'User'
	}
});

module.exports = mongoose.model('Attachment', Attachment);