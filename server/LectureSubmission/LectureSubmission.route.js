const express = require('express');
const lectureSubmissionRoutes = express.Router();

let LectureSubmission = require('../LecturePoll/LecturePoll.model');

lectureSubmissionRoutes.route('/add').post(function (req, res) {
  let lectureSubmission = new LectureSubmission(req.body.lectureSubmission);
  lectureSubmission.save()
    .then(() => {
      res.status(200).json(lectureSubmission);
    })
    .catch(() => {
      res.status(400).send("unable to save poll to database");
    });
});

lectureSubmissionRoutes.route('/').get(function (req, res) {
  LectureSubmission.find(function (err, lectureSubmissions) {
    if (err) {
      res.json(err);
    } else {
      res.json(lectureSubmissions);
    }
  });
});

lectureSubmissionRoutes.route('/:id').get(function (req, res) {
  LectureSubmission.findById(req.params.id,function (err, lectureSubmission) {
    if (err) {
      res.json(err);
    } else {
      res.json(lectureSubmission);
    }
  });
});

lectureSubmissionRoutes.route('/update').post(function (req, res) {
  let updated = req.body.lectureSubmission
  LectureSubmission.findByIdAndUpdate(updated._id,
  { video_progress: updated.video_progress ,
  student_poll_answers: updated.student_poll_answers},
  function (err, updatedSubmission) {
    if (err) {
      res.json(err);
    } else {
      res.json(updatedSubmission);
    }
  });
});

module.exports = lectureSubmissionRoutes;