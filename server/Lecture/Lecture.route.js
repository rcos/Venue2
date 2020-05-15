const express = require('express');
const formidable = require('formidable');
var fs = require('fs');
const lectureRoutes = express.Router();

let Lecture = require('../Lecture/Lecture.model')
let User = require('../User/User.model')
let Course = require('../Course/Course.model')
let Section = require('../Section/Section.model')

lectureRoutes.route('/add').post(function (req, res) {
  let lecture = new Lecture(req.body.lecture);
  lecture.save()
    .then(() => {
      res.status(200).json(lecture);
    })
    .catch(() => {
      res.status(400).send("unable to save lecture to database");
    });
});

lectureRoutes.route('/add_playback').post(function (req, res) {

	const form = formidable({ multiples: true });

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		var oldpath = files.video.path;
		var newpath = __dirname + fields.video_ref + files.video.name;
		if (!fs.existsSync(__dirname + "/videos")) {
			fs.mkdirSync(__dirname + "/videos")
		}
		if (!fs.existsSync(__dirname + fields.video_ref)) {
			fs.mkdirSync(__dirname + fields.video_ref)
		}
		fs.rename(oldpath, newpath, function (err) {});
		let lecture = new Lecture({
			event: fields.event,
			video_ref: fields.video_ref
		});
		lecture.save()
			.then(() => {
				res.status(200).json(lecture);
			})
			.catch(() => {
				res.status(400).send("unable to save lecture to database");
			});
	});
});

lectureRoutes.route('/').get(function (req, res) {
	Lecture.find(function (err, lectures) {
		if (err)
			res.json(err);
		res.json(lectures);
	});
});

lectureRoutes.get('/live_for_user/:user_id', (req, res) => {
	let user_id = req.params.user_id
	User.findById(user_id, (error, user) => {
		if(error)
			res.json(error)
		else {

			if(user.is_instructor) {

				//get courses instructor teaches
				Course.find({instructor: user._id}, (error, instructor_courses) => {
					if(error)
						res.json(error)
					else {
						//get sections for these courses
						Section.find({course: {$in: instructor_courses}}, (error, instructor_sections) =>{
							if(error)
								res.json(error)
							else {
								//get lectures in these sections
								Lecture.find({sections: {$in: instructor_sections}}, (error, instructor_lectures) => {
									if(error)
										res.json(error)
									else {
										//get live lectures
										live_lectures = getLiveLectures(instructor_lectures)
										res.json(live_lectures)
									}
								})
							}
						})
					}
				})

			} else {

			}

		}
	})
})

lectureRoutes.get('/for_course/:course_id/:lecture_type', (req, res) => {
	let course_id = req.params.course_id
	let lecture_type = req.params.lecture_type
	let legal_lecture_types = ["all","live","playback","upcoming","recent"]
	if(!legal_lecture_types.includes(lecture_type)){
		res.status(400).send("Illegal lecture type")
		return
	}

	// get sections for course
	Section.find({course: course_id}, (error, course_sections) => {
		if(error)
			res.json(error)
		else {
			// get lectures for these courses
			Lecture.find({sections: {$in: course_sections}}, (error,course_lectures) => {
				if(error)
					res.json(error)
				else {
					if(lecture_type === "all")
						res.json(course_lectures)
					else if(lecture_type === "upcoming")
						res.json(getUpcomingLectures(course_lectures))
					else if(lecture_type === "live")
						res.json(getLiveLectures(course_lectures))
				}
			})
		}
	})
})


function getLiveLectures(lectures) {
	live_lectures = []
	lectures.forEach(lecture => {
		if(isLive(lecture))
			live_lectures.push(lecture)
	})
	return live_lectures
}

function getUpcomingLectures(lectures) {
	upcoming_lectures = []
	lectures.forEach(lecture => {
		if(isUpcoming(lecture))
			upcoming_lectures.push(lecture)
	})
	return upcoming_lectures
}

function isLive(lecture) {  
  let current_time = new Date() 
  return current_time >= lecture.start_time &&  
    current_time <= lecture.end_time  
}

function isUpcoming(lecture) {  
  let current_time = new Date() 
  return current_time < lecture.start_time 
}

module.exports = lectureRoutes;