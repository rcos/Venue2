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
	seeder.clearModels(['Course', 'User', 'Section', 'Event', 'Submission']);

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
	is_active: false,
	// location: null,
	// time_range: null
})

var e1 = new Event({
	title: "Small Group",
	section: s0._id,
	is_active: false,
	// location: null,
	// time_range: null
})

var e2 = new Event({
	title: "Small Group",
	section: s0._id,
	is_active: false,
	// location: null,
	// time_range: null
})

var e3 = new Event({
	title: "Small Group",
	section: s0._id,
	is_active: false,
	// location: null,
	// time_range: null
})

const data = [{
	"model": "User",
	"documents": [{
		"_id": u0._id,
		"first_name": u0.first_name,
		"last_name": u0.last_name,
		"email": u0.email,
		"password": u0.password,
		"is_instructor": u0.is_instructor,
		"ta_sections": u0.ta_sections,
		"submissions": u0.submissions
	}, {
		"_id": u1._id,
		"first_name": u1.first_name,
		"last_name": u1.last_name,
		"email": u1.email,
		"password": u1.password,
		"is_instructor": u1.is_instructor,
		"ta_sections": u1.ta_sections,
		"submissions": u1.submissions
	}, {
		"_id": u2._id,
		"first_name": u2.first_name,
		"last_name": u2.last_name,
		"email": u2.email,
		"password": u2.password,
		"is_instructor": u2.is_instructor,
		"ta_sections": u2.ta_sections,
		"submissions": u2.submissions
	}, {
		"_id": u3._id,
		"first_name": u3.first_name,
		"last_name": u3.last_name,
		"email": u3.email,
		"password": u3.password,
		"is_instructor": u3.is_instructor,
		"ta_sections": u3.ta_sections,
		"submissions": u3.submissions
	}]
}, {
	"model": "Course",
	"documents": [{
		"_id": c0._id,
		"name": c0.name,
		"dept": c0.dept,
		"course_number": c0.course_number,
		"instructor": c0.instructor
	}, {
		"_id": c1._id,
		"name": c1.name,
		"dept": c1.dept,
		"course_number": c1.course_number,
		"instructor": c1.instructor
	}, {
		"_id": c2._id,
		"name": c2.name,
		"dept": c2.dept,
		"course_number": c2.course_number,
		"instructor": c2.instructor
	}, {
		"_id": c3._id,
		"name": c3.name,
		"dept": c3.dept,
		"course_number": c3.course_number,
		"instructor": c3.instructor
	}]
}, {
	"model": "Section",
	"documents": [{
		"_id": s0._id,
		"course": s0.course,
		"number": s0.number,
		"students": s0.students,
		"teaching_assistants": s0.teaching_assistants
	}, {
		"_id": s1._id,
		"course": s1.course,
		"number": s1.number,
		"students": s1.students,
		"teaching_assistants": s1.teaching_assistants
	}, {
		"_id": s2._id,
		"course": s2.course,
		"number": s2.number,
		"students": s2.students,
		"teaching_assistants": s2.teaching_assistants
	}]
}, {
	"model": "Event",
	"documents": [{
		"_id": e0._id,
		"title": e0.title,
		"section": e0.section,
		"is_active": e0.is_active
	}, {
		"_id": e1._id,
		"title": e1.title,
		"section": e1.section,
		"is_active": e1.is_active
	}, {
		"_id": e2._id,
		"title": e2.title,
		"section": e2.section,
		"is_active": e2.is_active
	}, {
		"_id": e3._id,
		"title": e3.title,
		"section": e3.section,
		"is_active": e3.is_active
	}]
}]