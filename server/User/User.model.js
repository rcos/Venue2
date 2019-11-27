var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');

//Abstract User Model
let UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	is_instructor: {
		type: Boolean,
		default: false
	},
},
{ 
	collection : 'users', 
	discriminatorKey : '_type' 
});

//Instructor - Inherits from User
let InstructorSchema = UserSchema.extend({
  courses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  }]
});

//Student - Inherits from User
let StudentSchema = UserSchema.extend({
  courses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  }],
  sections: [{
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section'
    }
  }],
  ta_sections: [{
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section'
    }
  }],
  submissions: [{
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission'
    }
  }]
});

let User = mongoose.model('User', UserSchema);
let Student = mongoose.model('Student', StudentSchema);
let Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = {User, Student, Instructor};