const express = require('express');
const attachmentRoutes = express.Router();

let LectureSubmission = require('../LectureSubmission/LectureSubmission.model');
let Lecture = require('../Lecture/Lecture.model');
let Section = require('../Section/Section.model');
let Course = require('../Course/Course.model');
let User = require('../User/User.model');
let Attachment = require('../Attachments/Attachment.model')

attachmentRoutes.route('/add').post(function (req, res) {
  let attachment = new Attachment(req.body.attachment);
  attachment.save()
    .then(() => {
      console.log("<SUCCESS> Adding attachment:",attachment)
      res.status(200).json(attachment);
    })
    .catch(() => {
      console.log("<ERROR> Adding attachment:",lecture_submission)
    });
});


attachmentRoutes.route('/').get(function (req, res) {
 Attachment.find(function (err, attachments) {
    if (err || attachments == null) {
      console.log("<ERROR> Getting all attachments")
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting all attachments")
      res.json(attachments);
    }
  });
});

attachmentRoutes.route('/:id').get(function (req, res) {
  Attachment.findById(req.params.id,function (err, attachment) {
    if (err || lectureSubmission == null) {
      console.log("<ERROR> Getting attachment with ID:",req.params.id)
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting attachment with ID:",req.params.id)
      res.json(attachment);
    }
  });
});

attachmentRoutes.route('/update').post(function (req, res) {
  let updated = {}
  if(req.body.attachment && req.body.attachment._id) {
    updated._id = req.body.attachment._id
    if(req.body.attachment.live_progress) {
      updated.name = req.body.attachment.name
    }
    if(req.body.attachment.type) {
      updated.type = req.body.attachment.type
    }
    if(req.body.attachment.size) {
      updated.size = req.body.attachment.size
    }
    if(req.body.attachment.filepath) {
      updated.filepath = req.body.lectureSubmission.video_percent
    }
    if(req.body.attachment.uploadedBy) {
      updated.uploadedBy = req.body.attachment.uploadedBy
    }
  }
  Attachment.findByIdAndUpdate(updated._id, updated, function(err, attachment) {
    res.json(attachment);
  })
});

module.exports = attachmentRoutes;