const seeder = require("mongoose-seed");
const Course = require("./Course/Course.model")
const Event = require("./Event/Event.model")
const Section = require("./Section/Section.model")
const Submission = require("./Submission/Submission.model")
const User = require("./User/User.model")

const db = "mongodb://localhost:27017/Venue2";

seeder.connect(db, function () {
	seeder.loadModels([
		"./Course/Course.model",
		"./User/User.model",
		"./Section/Section.model",
		"./Event/Event.model",
		"./Submission/Submission.model"
	]);
	seeder.clearModels(['Course', 'User', 'Section', 'Event', 'Submission'], function () {
		seeder.populateModels(data, function (err, done) {
			if (err) {
				return console.log("seed err", err)
			}
			if (done) {
				return console.log("seed finished", done)
			}
			seeder.disconnect()
		})
	});
});

var u0 = new User({
	first_name: "Admin",
	last_name: "Admin",
	email: "admin@gmail.com",
	password: "nimda",
	is_instructor: true,
	ta_sections: [],
	submissions: []
})

var u1 = new User({
	first_name: "Student",
	last_name: "A",
	email: "studenta@gmail.com",
	password: "password",
	is_instructor: false,
	ta_sections: [],
	submissions: []
})

var u2 = new User({
	first_name: "Student",
	last_name: "B",
	email: "studentb@gmail.com",
	password: "password",
	is_instructor: false,
	ta_sections: [],
	submissions: []
})

var u3 = new User({
	first_name: "Student",
	last_name: "C",
	email: "studentc@gmail.com",
	password: "password",
	is_instructor: false,
	ta_sections: [],
	submissions: []
})

var c0 = new Course({
	name: "RCOS",
	dept: "Computer Science",
	course_number: 0,
	instructor: u0._id
})

var c1 = new Course({
	name: "Data Structures",
	dept: "Computer Science",
	course_number: 1,
	instructor: u0._id
})

var c2 = new Course({
	name: "Multivariable Calculus",
	dept: "Mathematics",
	course_number: 2,
	instructor: u0._id
})

var c3 = new Course({
	name: "Physics I",
	dept: "Science",
	course_number: 3,
	instructor: u0._id
})

var s0 = new Section({
	course: c0._id,
	number: 0,
	students: [u1._id, u3._id],
	teaching_assistants: [u0._id]
})

var s1 = new Section({
	course: c1._id,
	number: 0,
	students: [u1._id, u2._id],
	teaching_assistants: [u0._id]
})

var s2 = new Section({
	course: c1._id,
	number: 1,
	students: [u1._id, u2._id],
	teaching_assistants: [u0._id]
})

var e0 = new Event({
	title: "Large Group",
	section: s0._id,
	is_active: true,
	start_time: Date(),
	end_time: Date() + (2 * 60 * 60 * 1000)
	// location: null,
	// time_range: null
})

var e1 = new Event({
	title: "Small Group",
	section: s0._id,
	is_active: false,
	start_time: Date(),
	end_time: Date() + (2 * 60 * 60 * 1000)
	// location: null,
	// time_range: null
})

var e2 = new Event({
	title: "Small Group",
	section: s0._id,
	is_active: false,
	start_time: Date(),
	end_time: Date() + (2 * 60 * 60 * 1000)
	// location: null,
	// time_range: null
})

var e3 = new Event({
	title: "Small Group",
	section: s0._id,
	is_active: false,
	start_time: Date(),
	end_time: Date() + (2 * 60 * 60 * 1000)
	// location: null,
	// time_range: null
})

const data = [{
	"model": "User",
	"documents": [u0, u1, u2, u3]
}, {
	"model": "Course",
	"documents": [c0, c1, c2, c3]
}, {
	"model": "Section",
	"documents": [s0, s1, s2]
}, {
	"model": "Event",
	"documents": [e0, e1, e2, e3]
}]