const express = require('express');
const notificationRoutes = express.Router();

let Notification = require('./Notification.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');
let Lecture = require('../Lecture/Lecture.model');

// add notification to db
notificationRoutes.route('/add').post(function (req, res) {
  let notification = {}
  notification.sender = req.user.first_name + ' ' + req.user.last_name 
  notification.created = new Date()
  notification.type = req.body.type
  notification.display_message = `${notification.sender} posted a new ${notification.type}.`
  notification.unique_id = req.body.id
  let new_notification = new Notification(notification)
  new_notification.save()
  .then(() => {
    console.log("<SUCCESS> Adding notification:", new_notification);
    res.status(200).json(new_notification);
  })
  .catch(() => {
    console.log("<ERROR> Adding notification:", new_notification);
    res.status(400).send("unable to save notification to database");
  });
})

//delete from db
notificationRoutes.route('/delete').delete(function(req, res) {
  let noti_id = req.body.id
  Promise.all([
    // pull just in case thre are some ids left in
    User.updateMany({}, {$pull: {notifications: noti_id}}),
    Notification.deleteOne({_id: noti_id})
  ]).then(resolved=> {
    console.log("<SUCCESS> Removed notificiation with ID: ", noti_id)
    res.json('Successfully removed');
  })
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

// get all notifications for one users
notificationRoutes.route('/get_notifications').get(function (req, res) {
  Notification.find({ _id: { $in: req.user.notifications } }, function (err, notifications) {
    if (err || notifications == null) {
      console.log("<ERROR> Getting notifications for user with ID:", req.user._id);
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting notifications for user with ID:", req.user._id);
      res.json(notifications);
    }
  });
})

// send it out
notificationRoutes.route('/send').post(function(req, res) {
  let noti_id = req.body.id
  let student_emails = req.body.students
  Promise.all([
    User.updateMany({email: {$in: student_emails}},{$push: {notifications: noti_id}})
  ]).then(resolved=> {
    console.log("<SUCCESS> Sent all notifications out");
    res.json(true);
  })
})

// for when users acknowledge a notification (remove, view)
notificationRoutes.route('/update').post(function(req, res) {
  let noti_id = req.body.id
  Promise.all([
    User.updateOne({email: req.user.email}, {$pull: {notifications: noti_id}}),
    Notification.findByIdAndUpdate(noti_id, {$inc: {users_acknowledged: 1}})
  ]).then(resolved => {
    console.log("A user viewed notification with ID: ", noti_id)
    res.json()
  })
})

//clear all the notifications for a user and mark all as acknowledged
notificationRoutes.route('/clear_all').post(function(req, res) {
  Promise.all([
    Notification.updateMany({_id: {$in: req.user.notifications }}, {$inc: {users_acknowledged: 1}}),
    User.updateOne({email: req.user.email}, {$set: {notifications: []}})
  ]).then(resolved => {
    console.log("Notifications cleared for user with ID: ", req.user._id)
    res.json()
  })
})

module.exports = notificationRoutes;