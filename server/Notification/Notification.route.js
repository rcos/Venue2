const express = require('express');
const notificationRoutes = express.Router();

let Notification = require('./Notification.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');
let Lecture = require('../Lecture/Lecture.model');

notificationRoutes.route('/get/').get(function(req, res) {
  let id = req.body.id
  Notification.findById(id, function (err, noti) {
    if (err || noti == null) {
      console.log("<ERROR> Getting notification with ID:", id);
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting notification with ID:", id);
      res.json(noti);
    }
  })
})

notificationRoutes.route('/send').post(function(req, res) {
  let course_students = req.body.course.
})