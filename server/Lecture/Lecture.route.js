const express = require('express');
const lectureRoutes = express.Router();

let Lecture = require('../Lecture/Lecture.model')

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

lectureRoutes.route('/').get(function (req, res) {
	Lecture.find(function (err, lectures) {
		if (err)
			res.json(err);
		res.json(lectures);
	});
});

module.exports = lectureRoutes;