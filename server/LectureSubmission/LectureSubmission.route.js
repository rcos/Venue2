const express = require('express');
const lectureSubmissionRoutes = express.Router();

let LectureSubmission = require('../LectureSubmission/LectureSubmission.model');
let Lecture = require('../Lecture/Lecture.model');

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

lectureSubmissionRoutes.route('/get_or_make').post(function (req, res) {
  let lecture_id = req.body.lecture_id
  let submitter_id = req.body.submitter_id
  LectureSubmission.find(
    {lecture: lecture_id, submitter: submitter_id},
    function (err, lectureSubmissions) {
      if (err) {
        res.json(err);
      } else if (lectureSubmissions.length == 0){
        let lectureSubmission = new LectureSubmission({
          lecture: lecture_id,
          submitter: submitter_id,
          video_progress: 0,
          student_poll_answers: []
        });
        lectureSubmission.save()
          .then(() => {
            res.status(200).json(lectureSubmission);
          })
          .catch(() => {
            res.status(400).send("unable to save lectureSubmission to database");
          });
      } else {
        res.status(200).json(lectureSubmissions[0]);
      }
    }
  );
});

lectureSubmissionRoutes.get('/for_lecture/:lecture_id', (req, res) => {
	let lecture_id = req.params.lecture_id;
  LectureSubmission.find({lecture: lecture_id},function(err,lect_submissions) {
    if(err) {
      res.json(err)
    } else {
      res.json(lect_submissions)
    }
  })
})

module.exports = lectureSubmissionRoutes;