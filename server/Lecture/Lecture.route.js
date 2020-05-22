const express = require('express');
const lectureRoutes = express.Router();

const formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'venue.do.not.reply@gmail.com',
		pass: process.env.EMAIL_PASS
	}
});

const legal_lecture_types = ["all","live","upcoming","past","active_playback"]

let Lecture = require('../Lecture/Lecture.model')
let User = require('../User/User.model')
let Course = require('../Course/Course.model')
let Section = require('../Section/Section.model')

lectureRoutes.route('/add').post(function (req, res) {
  let lecture = new Lecture(req.body.lecture);
  lecture.save()
    .then(() => {
			console.log("<SUCCESS> Adding lecture:",lecture)
      res.status(200).json(lecture);
    })
    .catch(() => {
			console.log("<ERROR> Adding lecture:",lecture)
      res.status(400).send("unable to save lecture to database");
    });
});

lectureRoutes.route('/add_playback/:lecture_id').post(function (req, res) {

	const form = formidable({ multiples: true });
	let lecture_id = req.params.lecture_id

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		var oldpath = files.video.path;
		var pubDir = path.join(__dirname,'..','..','public')
		var newpath = (pubDir + fields.video_ref + files.video.name).split(' ').join('_');
		if (!fs.existsSync(pubDir + "/videos")) {
			fs.mkdirSync(pubDir + "/videos")
		}
		if (!fs.existsSync(pubDir + fields.video_ref)) {
			fs.mkdirSync(pubDir + fields.video_ref)
		}
		//TODO check if a file already exists there
		fs.rename(oldpath, newpath, function (err) {});

		// update the lecture with video
		Lecture.findByIdAndUpdate(lecture_id,
			{
				video_ref: (fields.video_ref + files.video.name).split(' ').join('_'),
				playback_submission_start_time: fields.playback_submission_start_time,
				playback_submission_end_time: fields.playback_submission_end_time,
				allow_playback_submissions: true,
				email_sent: true
			},
			function (err, updated_lecture) {
				if (err || updated_lecture == null) {
					console.log("<ERROR> Updating lecture by ID:",lecture_id,"with:",updated_lecture)
					res.status(404).send("lecture not found");
				} else {
					let section_itr = 0
					updated_lecture.sections.forEach(section => {
						Section.findById(section, function (err, section){
							if(err || section == null) {
								console.log("<ERROR> Getting section with ID:",section)
								res.json(err);
							} else {
								let student_ids = section.students;
								let num_iterations = 0;
								student_ids.forEach(student_id => {
									User.findById(student_id, function(err, student) {
										if(err || student == null) {
											console.log("<ERROR> Getting user with ID:",student_id)
											res.json(err);
										} else {
											//send email
											var mailOptions = {
												from: 'venue.do.not.reply@gmail.com',
												to: student.email,
												subject: 'Venue - New Lecture Recording Notification',
												html: '<p>New Lecture available for playback <a href="http://localhost:8080/lecture_playback/' + updated_lecture._id + '">here</a>!</p>'
											};
											console.log("About to send email with:",mailOptions)
											transporter.sendMail(mailOptions, function(error, info){
												if (error || info == null) {
													console.log(error);
												} else {
													console.log('Email sent to '+student.email+': ' + info.response);
												}
											});
											num_iterations++;
											if(num_iterations === student_ids.length) {
												section_itr++;
												if(section_itr == updated_lecture.sections.length) {
													console.log("<SUCCESS> Adding playback to lecture with ID:",lecture_id)
													res.json(updated_lecture);
												}
											}
										}
									})
								})
							}
						})
					})
				}
			}
		);
	});
});

lectureRoutes.route('/').get(function (req, res) {
	Lecture.find(function (err, lectures) {
		if (err || lectures == null) {
			console.log("<ERROR> Getting all lectures")
			res.json(err);
		} else {
			console.log("<SUCCESS> Getting all lectures")
			res.json(lectures);
		}
	});
});

lectureRoutes.route('/:id').get(function (req, res) {
	Lecture.findById(req.params.id,function (err, lecture) {
		if (err || lecture == null) {
			console.log("<ERROR> Getting lecture with ID:",req.params.id)
			res.json(err);
		} else {
			console.log("<SUCCESS> Getting lecture with ID:",req.params.id)
			res.json(lecture);
		}
	});
});

lectureRoutes.get('/for_user/:user_id/:lecture_type', (req, res) => {
	let user_id = req.params.user_id
	let lecture_type = req.params.lecture_type
	if(!legal_lecture_types.includes(lecture_type)){
		console.log("<ERROR> Invalid lecture type:",lecture_type)
		res.status(400).send("Illegal lecture type")
	} else {
		User.findById(user_id, (error, user) => {
			if(error || user == null) {
				console.log("<ERROR> Getting user with ID:",user_id)
				res.json(error)
			} else if(user.is_instructor) {
				//get courses instructor teaches
				Course.find({instructor: user._id}, (error, instructor_courses) => {
					if(error || instructor_courses == null) {
						console.log("<ERROR> Getting courses with instructor ID:",user._id)
						res.json(error)
					} else {
						//get sections for these courses
						Section.find({course: {$in: instructor_courses}}, (error, instructor_sections) =>{
							if(error || instructor_sections == null) {
								console.log("<ERROR> Getting sections for courses:",instructor_courses)
								res.json(error)
							} else {
								//get lectures in these sections
								Lecture.find({sections: {$in: instructor_sections}}, (error, instructor_lectures) => {
									if(error || instructor_lectures == null) {
										console.log("<ERROR> Getting lectures for sections:",instructor_sections)
										res.json(error)
									} else {
										console.log("<SUCCESS> Getting lectures for instructor ID:",user_id)
										if(lecture_type === "all")
											res.json(instructor_lectures)
										else if(lecture_type === "live")
											res.json(getLiveLectures(instructor_lectures))
										else if(lecture_type === "active_playback")
											res.json(getActivePlaybacLectures(instructor_lectures))
										else if(lecture_type === "past")
											res.json(getPastLectures(instructor_lectures))
										else if(lecture_type === "upcoming")
											res.json(getUpcomingLectures(instructor_lectures))
									}
								})
							}
						})
					}
				})
			} else {
				Section.find({'students': user_id}, (error, student_sections) => {
					if(error || student_sections == null) {
						console.log("<ERROR> Getting sections for student:",user_id)
						res.json(error)
					} else {
						Lecture.find({sections: {$in: student_sections}}, (error, student_lectures) => {
							if(error || student_lectures == null) {
								console.log("<ERROR> Getting lectures for sections:",student_sections)
								res.json(error)
							} else {
								if(lecture_type === "all")
									res.json(student_lectures)
								else if(lecture_type === "live")
									res.json(getLiveLectures(student_lectures))
								else if(lecture_type === "active_playback")
									res.json(getActivePlaybacLectures(student_lectures))
								else if(lecture_type === "past")
									res.json(getPastLectures(student_lectures))
								else if(lecture_type === "upcoming")
									res.json(getUpcomingLectures(student_lectures))
							}
						})
					}
				})
			}
		})
	}
})

lectureRoutes.get('/for_course/:course_id/:lecture_type', (req, res) => {
	let course_id = req.params.course_id
	let lecture_type = req.params.lecture_type
	if(!legal_lecture_types.includes(lecture_type)){
		console.log("<ERROR> Invalid lecture type:",lecture_type)
		res.status(400).send("Illegal lecture type")
	} else {
		// get sections for course
		Section.find({course: course_id}, (error, course_sections) => {
			if(error || course_sections == null) {
				console.log("<ERROR> Getting sections for course with ID:",course_id)
				res.json(error)
			} else {
				// get lectures for these courses
				Lecture.find({sections: {$in: course_sections}}, (error,course_lectures) => {
					if(error || course_lectures == null) {
						console.log("<ERROR> Getting lectures for sections:",course_sections)
						res.json(error)
					} else {
						console.log("<SUCCESS> Getting lectures for course with ID:",course_id,"and lecture type:",lecture_type)
						if(lecture_type === "all")
							res.json(course_lectures)
						else if(lecture_type === "upcoming")
							res.json(getUpcomingLectures(course_lectures))
						else if(lecture_type === "live")
							res.json(getLiveLectures(course_lectures))
						else if(lecture_type === "past")
							res.json(getPastLectures(course_lectures))
						else if(lecture_type === "active_playback")
							res.json(getActivePlaybacLectures(course_lectures))
					}
				})
			}
		})
	}
})

lectureRoutes.get('/for_section/:section_id/:lecture_type', (req, res) => {
	let section_id = req.params.section_id
	let lecture_type = req.params.lecture_type
	if(!legal_lecture_types.includes(lecture_type)){
		console.log("<ERROR> Invalid lecture type:",lecture_type)
		res.status(400).send("Illegal lecture type")
	} else {
		Lecture.find({sections: section_id}, (error, section_lectures) => {
			if(error || section_lectures == null) {
				console.log("<ERROR> Getting lectures for section with ID:",section_id)
				res.json(error)
			} else {
				console.log("<SUCCESS> Getting lectures for section with ID:",section_id,"and lecture type:",lecture_type)
				if(lecture_type === "all")
					res.json(section_lectures)
				else if(lecture_type === "upcoming")
					res.json(getUpcomingLectures(section_lectures))
				else if(lecture_type === "live")
					res.json(getLiveLectures(section_lectures))
				else if(lecture_type === "past")
					res.json(getPastLectures(section_lectures))
				else if(lecture_type === "active_playback")
					res.json(getActivePlaybacLectures(section_lectures))
			}
		})
	}
})

lectureRoutes.get('/with_sections_and_course/:lecture_id', (req, res) => {
	let lecture_id = req.params.lecture_id;
	// get lecture
	Lecture.findById(lecture_id, function (error, lecture){
    if(error || lecture == null) {
			console.log("<ERROR> Getting lecture with ID:",lecture_id)
      res.json(err)
    } else{
    	// get the sections for the lecture
      Section.find({'_id': {$in: lecture.sections}}, (error, lecture_sections) => {
      	if(error || lecture_sections == null) {
					console.log("<ERROR> Getting secions for lecture with ID:",lecture_id)
      		res.json(error)
      	} else {
      		lecture.sections = lecture_sections
      		// get the course for these sections
      		Course.findById(lecture_sections[0].course, (error, lecture_course) => {
      			if(error || lecture_course == null) {
							console.log("<ERROR> Getting course with ID:",lecture_sections[0].course)
      				res.json(error)
      			} else {
      				lecture.sections.forEach(section => {
      					section.course = lecture_course
      				})
							console.log("<SUCCESS> Getting lecture with sections and course for lecture ID:",lecture_id)
      				res.json(lecture)
      			}
      		})
      	}
      })
    }
	});
})

lectureRoutes.post('/process_emails', (req,res) => {
	let lectures = req.body.lectures
	let toEmail = req.body.toEmail
	lectures.forEach(lecture => {
		if(!lecture.email_sent) { //email has not been sent yet
			Lecture.findByIdAndUpdate(lecture._id, 
				{
					email_sent: true //mark email as sent
				},
				function(err, lect) {
					if (err || lect == null) {
						console.log("<ERROR> Updating course by ID:",lecture._id,"with:",{email_sent: true})
						res.status(404).send("lecture not found");
					} else {
						var mailOptions = {
							from: 'venue.do.not.reply@gmail.com',
							to: toEmail,
							subject: 'Venue Lecture Upload Reminder',
							html: '<p>Click <a href="http://localhost:8080/lecture_info/' + lect._id + '">here</a> to upload your lecture recording</p>'
						};
						console.log("About to send email with:",mailOptions)
						transporter.sendMail(mailOptions, function(error, info){
							if (error) {
								console.log(error);
							} else {
								console.log('Email sent to '+toEmail+': ' + info.response);
							}
						});
					}
				}
			);
		}
	})
	console.log("<SUCCESS> Notification emails sent to:",toEmail);
	res.json(lectures)
})

function getLiveLectures(lectures) {
	past_lectures = []
	lectures.forEach(lecture => {
		if(isLive(lecture))
			past_lectures.push(lecture)
	})
	return past_lectures
}

function getUpcomingLectures(lectures) {
	upcoming_lectures = []
	lectures.forEach(lecture => {
		if(isUpcoming(lecture))
			upcoming_lectures.push(lecture)
	})
	return upcoming_lectures
}

function getPastLectures(lectures) {
	past_lectures = []
	lectures.forEach(lecture => {
		if(isPast(lecture))
			past_lectures.push(lecture)
	})
	return past_lectures
}

function getActivePlaybacLectures(lectures) {
	active_playback_lectures = []
	lectures.forEach(lecture => {
		if(isActivePlayback(lecture))
			active_playback_lectures.push(lecture)
	})
	return active_playback_lectures
}


function isLive(lecture) {  
  let current_time = new Date() 
  return current_time >= lecture.start_time &&  
    current_time <= lecture.end_time  
}

function isUpcoming(lecture) {  
  let current_time = new Date() 
  return current_time < lecture.start_time ||
  	current_time < lecture.playback_submission_start_time
}

function isPast(lecture) {  
  let current_time = new Date() 
  return current_time > lecture.end_time ||
  	current_time > lecture.playback_submission_end_time
}

function isActivePlayback(lecture) {  
  let current_time = new Date() 
  return current_time >= lecture.playback_submission_start_time &&
  	current_time <= lecture.playback_submission_end_time
}

module.exports = lectureRoutes
