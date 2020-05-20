const express = require('express');
const lectureSubmissionRoutes = express.Router();

let LectureSubmission = require('../LectureSubmission/LectureSubmission.model');
let Lecture = require('../Lecture/Lecture.model');
let User = require('../User/User.model');

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
    if(err)
      res.json(err)
    else {
      if(lect_submissions.length > 0){
        User.findById({'_id': lect_submissions[0].submitter}, (error, submitter) => {
          if(error)
            res.json(error)
          else {
            lect_submissions.forEach(submission => {
              submission.submitter = submitter
            })
            res.json(lect_submissions)
          }
        })
      } else{
        res.json([])
      }
    }
  })
})

lectureSubmissionRoutes.get('/for_student/:lecture_id/:student_id', (req, res) => {
  let lecture_id = req.params.lecture_id
  let student_id = req.params.student_id
  LectureSubmission.findOne({lecture: lecture_id, submitter: student_id},function(err,lect_submission) {
    if(err)
      res.json(err)
    else {
      res.json(lect_submission)
    }
  })
})

module.exports = lectureSubmissionRoutes;