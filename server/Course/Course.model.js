const mongoose = require('mongoose');
require('mongoose-type-url');
const Grid = require('gridfs-stream');

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
	is_public: {
		type: Boolean,
		default: false
	},
	sections: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	}],
	important_links: [{
		type: mongoose.SchemaTypes.Url
	}]
});

module.exports = mongoose.model('Course', Course);