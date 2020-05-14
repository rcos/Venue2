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
      res.status(200).json(lectures);
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

function getLiveLectures(lectures) {
	live_lectures = []
	lectures.forEach(lecture => {
		if(isLive(lecture))
			live_lectures.push(lecture)
	})
	return live_lectures
}

function isLive(lecture) {  
  let current_time = new Date() 
  return current_time >= lecture.start_time &&  
    current_time <= lecture.end_time  
}

module.exports = lectureRoutes;