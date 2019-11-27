var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');

//Abstract User Model
let User = new Schema({
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
let Instructor = User.extend({
  courses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  }]
});

//Student - Inherits from User
let Student = User.extend({
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

module.exports = mongoose.model('User', User);

//User Model
//first_name,
//last_name,
//email,
//password,
//is_instructor

//Instructor Model (inherits from User)
//courses (courses that the instructor teaches)

//Student Model (inherits from User)
//courses (courses the student is taking)
//sections (sections the student is a student for)
//ta_sections (sections the student is a TA for)
//submissions 

