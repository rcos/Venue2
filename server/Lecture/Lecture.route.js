const express = require('express');
const formidable = require('formidable');
var fs = require('fs');
const lectureRoutes = express.Router();

let Lecture = require('../Lecture/Lecture.model')

lectureRoutes.route('/add').post(function (req, res) {
  let lecture = new Lecture(req.body.lecture);
  console.log("in route")
  console.log(lecture)
  console.log(req.body.lecture)

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

module.exports = lectureRoutes;