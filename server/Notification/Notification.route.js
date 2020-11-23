const express = require('express');
const notificationRoutes = express.Router();

let Notification = require('./Notification.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');
let Lecture = require('../Lecture/Lecture.model');

// add notification to db
notificationRoutes.route('/add').post(function (req, res) {
  let notification = new Notification(req.body.notification)
  notification.save()
  .then(() => {
    console.log("<SUCCESS> Adding notification:", notification);
    res.status(200).json(course);
  })
  .catch(() => {
    console.log("<ERROR> Adding notification:", notification);
    res.status(400).send("unable to save notification to database");
  });
})

// get one notification by id
notificationRoutes.route('/get').get(function(req, res) {
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

notificationRoutes.route('/get_notifications').get(function (req, res) {
  Notification.find({ _id: { $in: req.user.notifications } }, function (err, notifications) {
    if (err || notifications == null) {
      console.log("<ERROR> Getting notifications for user with ID:", req.user._id);
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting notifications user with ID:", req.user._id);
      res.json(notifications);
    }
  });
});

// send it out
notificationRoutes.route('/send').post(function(req, res) {
  let noti_id = req.body.id
  let student_emails = req.body.students.map(a=>a.email);
  Promise.all([
    User.updateMany({email: {$in: student_emails}},{$push: {notifications: noti_id}})
  ]).then(resolved=> {
    console.log("<SUCCESS> Sent all notifications out");
    res.json(true);
  })
})

//delete if viewed and from db
notificationRoutes.route('delete').delete(function(req, res) {
  
})


module.exports = notificationRoutes;