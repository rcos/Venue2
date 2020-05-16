const express = require('express');
const formidable = require('formidable');
var fs = require('fs');
const lectureRoutes = express.Router();

let Lecture = require('../Lecture/Lecture.model')

lectureRoutes.route('/add').post(function (req, res) {

	const form = formidable({ multiples: true });

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		var oldpath = files.video.path;
		var pubDir = __dirname + "/../../public"
		var newpath = pubDir + fields.video_ref + files.video.name;
		if (!fs.existsSync(pubDir + "/videos")) {
			fs.mkdirSync(pubDir + "/videos")
		}
		if (!fs.existsSync(pubDir + fields.video_ref)) {
			fs.mkdirSync(pubDir + fields.video_ref)
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

lectureRoutes.route('/:id').get(function (req, res) {
	Lecture.findById(req.params.id,function (err, lecture) {
		if (err) {
			res.json(err);
		} else {
			res.json(lecture);
		}
	});
});

lectureRoutes.route('/videos/:folder/:filename').get(function (req, res) {
	let video_path = __dirname + "/videos/" + req.params.folder + "/" + req.params.filename;
	console.log(video_path)

    res.send(video_path);
});

module.exports = lectureRoutes;