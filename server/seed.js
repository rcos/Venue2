const seeder = require("mongoose-seed");
const Course = require("./Course/Course.model")
const Event = require("./Event/Event.model")
const Section = require("./Section/Section.model")
const Submission = require("./Submission/Submission.model")
const User = require("./User/User.model")
const Lecture = require("./Lecture/Lecture.model")
const LectureSubmission = require("./LectureSubmission/LectureSubmission.model")
const PlaybackPoll = require("./PlaybackPoll/PlaybackPoll.model")

const db = "mongodb://localhost:27017/Venue2";

const bcrypt = require('bcrypt');
const saltRounds = 10;

seeder.connect(db, function () {
	seeder.loadModels([
		"./Course/Course.model",
		"./User/User.model",
		"./Section/Section.model",
		"./Event/Event.model",
		"./Submission/Submission.model",
		"./Lecture/Lecture.model",
		"./LectureSubmission/LectureSubmission.model",
		"./PlaybackPoll/PlaybackPoll.model"
	]);
	seeder.clearModels(['Course', 'User', 'Section', 'Event', 'Submission', 'Lecture', 'LectureSubmission', 'PlaybackPoll'], function () {

		let u0 = new User({
			first_name: "Admin",
			last_name: "Admin",
			email: "admin@gmail.com",
			password: "nimda",
			is_instructor: true,
			ta_sections: [],
			submissions: []
		})

		let u1 = new User({
			first_name: "Student",
			last_name: "A",
			email: "studenta@gmail.com",
			password: "password",
			is_instructor: false,
			ta_sections: [],
			submissions: []
		})

		let u2 = new User({
			first_name: "Student",
			last_name: "B",
			email: "studentb@gmail.com",
			password: "password",
			is_instructor: false,
			ta_sections: [],
			submissions: []
		})

		let u3 = new User({
			first_name: "Student",
			last_name: "C",
			email: "studentc@gmail.com",
			password: "password",
			is_instructor: false,
			ta_sections: [],
			submissions: []
		})

		let c0 = new Course({
			name: "RCOS",
			dept: "Computer Science",
			course_number: 0,
			instructor: u0._id
		})

		let c1 = new Course({
			name: "Data Structures",
			dept: "Computer Science",
			course_number: 1,
			instructor: u0._id
		})

		let c2 = new Course({
			name: "Multiletiable Calculus",
			dept: "Mathematics",
			course_number: 2,
			instructor: u0._id
		})

		let c3 = new Course({
			name: "Physics I",
			dept: "Science",
			course_number: 3,
			instructor: u0._id
		})

		let s0 = new Section({
			course: c0._id,
			number: 0,
			students: [u1._id, u3._id],
			teaching_assistants: [u0._id]
		})

		let s1 = new Section({
			course: c1._id,
			number: 0,
			students: [u1._id, u2._id],
			teaching_assistants: [u0._id]
		})

		let s2 = new Section({
			course: c1._id,
			number: 1,
			students: [u1._id, u2._id],
			teaching_assistants: [u0._id]
		})

		let l0 = new Lecture({
			title: "Example Lecture",
			sections: [s1._id],
			allow_live_submissions: true,
			allow_playback_submissions: true,
			start_time: Date.now(),
			end_time: Date.now() + (2*60*60*1000),
			submission_start_time: Date.now() + (60*1000),
			submission_end_time: Date.now() + (3*60*1000),
			playback_submission_start_time: Date.now() + (2*60*60*1000),
			playback_submission_end_time: Date.now() + (4*60*60*1000),
			code: "abcdefghijklmnopqrstuvwxyz",
			video_ref: "/videos/sample/sample.mp4",
			num_playback_polls: 2
		})

		let p0 = new PlaybackPoll({
			lecture: l0._id,
			question: "Where is my super suit?",
			possible_answers: [
				"I, uh, put it away.",
				"Why do you need to know?"
			],
			correct_answers: [
				"Why do you need to know?"
			],
			timestamp: 5
		})

		let p1 = new PlaybackPoll({
			lecture: l0._id,
			question: "Speed of light?",
			possible_answers: [
				"Fast",
				"2Fast"
			],
			correct_answers: [
				"2Fast"
			],
			timestamp: 15
		})

		bcrypt.hash(u0.password, saltRounds, (err, hash) => {
			u0.password = hash
			bcrypt.hash(u1.password, saltRounds, (err, hash) => {
				u1.password = hash
				bcrypt.hash(u2.password, saltRounds, (err, hash) => {
					u2.password = hash
					bcrypt.hash(u3.password, saltRounds, (err, hash) => {
						u3.password = hash

						let data = [{
							"model": "User",
							"documents": [u0, u1, u2, u3]
						}, {
							"model": "Course",
							"documents": [c0, c1, c2, c3]
						}, {
							"model": "Section",
							"documents": [s0, s1, s2]
						}, {
							"model": "Lecture",
							"documents": [l0]
						}, {
							"model": "PlaybackPoll",
							"documents": [p0,p1]
						}]

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
			});
		});
	});
});