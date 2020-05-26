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

		let u = []
		let c = []
		let s = []
		let l = []
		let p = []

		u.push(new User({
			first_name: "Ad",
			last_name: "Min",
			user_id: "venue",
			email: "venue@rpi.edu",
			password: "nimda",
			is_instructor: true,
			is_admin: true,
			ta_sections: [],
			submissions: []
		}))

		for(let i=0;i<26;i++) {
			var chr = String.fromCharCode(97 + i);
			u.push(new User({
				first_name: "Student",
				last_name: chr,
				user_id: "student" + chr,
				email: "student"+chr+"@rpi.edu",
				password: "password",
				is_instructor: false,
				ta_sections: [],
				submissions: []
			}))
		}

		c.push(new Course({
			name: "RCOS",
			dept: "CSCI",
			course_number: 2961,
			instructor: u[0]
		}))

		c.push(new Course({
			name: "Data Structures",
			dept: "CSCI",
			course_number: 1200,
			instructor: u[0]._id
		}))

		c.push(new Course({
			name: "Multiletiable Calculus",
			dept: "MATH",
			course_number: 2010,
			instructor: u[0]._id
		}))

		c.push(new Course({
			name: "Physics I",
			dept: "PHYS",
			course_number: 1100,
			instructor: u[0]._id
		}))

		s.push(new Section({
			course: c[0]._id,
			number: 1,
			students: [
				u[1]._id,
				u[2]._id,
				u[3]._id,
				u[4]._id,
				u[5]._id,
				u[6]._id,
				u[7]._id,
				u[8]._id,
				u[9]._id,
				u[10]._id,
				u[11]._id,
				u[12]._id,
				u[12]._id,
				u[14]._id,
				u[15]._id,
				u[16]._id,
				u[17]._id,
				u[18]._id,
				u[19]._id,
				u[20]._id,
				u[21]._id,
				u[22]._id,
				u[23]._id,
				u[24]._id
			],
			teaching_assistants: [u[26]._id,u[25]._id]
		}))

		s.push(new Section({
			course: c[1]._id,
			number: 1,
			students: [u[1]._id, u[2]._id],
			teaching_assistants: [u[0]._id]
		}))

		s.push(new Section({
			course: c[1]._id,
			number: 2,
			students: [u[1]._id, u[2]._id],
			teaching_assistants: [u[0]._id]
		}))

		l.push(new Lecture({
			title: "Live Lecture",
			sections: [s[1]._id],
			allow_live_submissions: true,
			allow_playback_submissions: true,
			start_time: Date.now(),
			end_time: Date.now() + (2*60*60*1000),
			submission_start_time: Date.now() + (60*1000),
			submission_end_time: Date.now() + (3*60*1000),
			code: "abcdefghijklmnopqrstuvwxyz",
			video_ref: "/videos/sample/sample.mp4",
			num_playback_polls: 0
		}))

		l.push(new Lecture({
			title: "Playback Lecture",
			sections: [s[1]._id],
			allow_live_submissions: true,
			allow_playback_submissions: true,
			start_time: Date.now()-(60*2000),
			end_time: Date.now() - (60*1000),
			submission_start_time: Date.now() - (60*1500),
			submission_end_time: Date.now() - (60*1200),
			playback_submission_start_time: Date.now(),
			playback_submission_end_time: Date.now() + (3*60*1000),
			code: "abcdefghijklmnopqrstuvwxyz",
			video_ref: "/videos/sample/sample.mp4",
			num_playback_polls: 2
		}))

		l.push(new Lecture({
			title: "Upcoming Playback Lecture",
			sections: [s[1]._id],
			allow_live_submissions: false,
			allow_playback_submissions: true,
			playback_submission_start_time: Date.now() + (2*60*1000),
			playback_submission_end_time: Date.now() + (4*60*1000),
			video_ref: "/videos/sample/sample.mp4",
			num_playback_polls: 2
		}))

		l.push(new Lecture({
			title: "How to use Venue",
			sections: [s[0]._id],
			allow_live_submissions: true,
			allow_playback_submissions: true,
			start_time: Date.now(),
			end_time: Date.now() + (2*60*60*1000),
			submission_start_time: Date.now() + (60*1000),
			submission_end_time: Date.now() + (3*60*1000),
			playback_submission_start_time: Date.now() + (2*60*60*1000),
			playback_submission_end_time: Date.now() + (4*60*1000),
			code: "abcdefghijklmnopqrstuvwxyz",
			video_ref: "/videos/sample/sample.mp4",
			num_playback_polls: 2
		}))


		p.push(new PlaybackPoll({
			lecture: l[1]._id,
			question: "Where is my super suit?",
			possible_answers: [
				"I, uh, put it away.",
				"Why do you need to know?"
			],
			correct_answers: [
				"Why do you need to know?"
			],
			timestamp: 5
		}))

		p.push(new PlaybackPoll({
			lecture: l[1]._id,
			question: "Speed of light?",
			possible_answers: [
				"Fast",
				"2Fast"
			],
			correct_answers: [
				"2Fast"
			],
			timestamp: 15
		}))

		p.push(new PlaybackPoll({
			lecture: l[2]._id,
			question: "What's 9 + 10?",
			possible_answers: [
				"19",
				"21"
			],
			correct_answers: [
				"21"
			],
			timestamp: 10
		}))

		p.push(new PlaybackPoll({
			lecture: l[2]._id,
			question: "Are you smart m8?",
			possible_answers: [
				"Yeah",
				"kinda",
				"nah",
			],
			correct_answers: [
				"nah"
			],
			timestamp: 15
		}))

		p.push(new PlaybackPoll({
			lecture: l[3]._id,
			question: "What is this planet?",
			possible_answers: [
				"Mercury",
				"Venus",
				"Earth",
				"Mars",
				"Jupiter",
				"Saturn",
				"Uranus",
				"Neptune"
			],
			correct_answers: [
				"Earth"
			],
			timestamp: 5
		}))

		let promises = []
		u.forEach(user => {
			promises.push(new Promise((resolve,reject) => {
				bcrypt.hash(user.password,saltRounds,(err,hash) => {
					resolve(hash)
				})
			}))
		})

		Promise.all(promises)
			.then((fulfilled) => {
				for(i=0;i<u.length;i++){
					u[i].password = fulfilled[i]
				}

				let data = [{
					"model": "User",
					"documents": u
				}, {
					"model": "Course",
					"documents": c
				}, {
					"model": "Section",
					"documents": s
				}, {
					"model": "Lecture",
					"documents": l
				}, {
					"model": "PlaybackPoll",
					"documents": p
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
			})
			.catch(err => {

			})

		// 	bcrypt.hash(u[1].password, saltRounds, (err, hash) => {
		// 		u[1].password = hash
		// 		bcrypt.hash(u[2].password, saltRounds, (err, hash) => {
		// 			u[2].password = hash
		// 			bcrypt.hash(u[3].password, saltRounds, (err, hash) => {
		// 				u[3].password = hash

		// 			});
		// 		});
		// 	});
		// });
	});
});