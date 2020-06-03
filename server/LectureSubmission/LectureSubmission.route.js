const express = require('express');
const lectureSubmissionRoutes = express.Router();

let LectureSubmission = require('../LectureSubmission/LectureSubmission.model');
let Lecture = require('../Lecture/Lecture.model');
let User = require('../User/User.model');

lectureSubmissionRoutes.route('/add').post(function (req, res) {
  let lectureSubmission = new LectureSubmission(req.body.lectureSubmission);
  Lecture.findById(lectureSubmission.lecture, function(err, lecture) {
    if(err || lecture == null) {
      console.log("<ERROR> Getting lecture with ID:",lectureSubmission.lecture)
      res.json(err)
    } else {
      let match = false
      for(let i=0;i<lecture.checkins.length;i++) {
        if(lecture.checkins[i].code == lectureSubmission.code) {
          match = true
          lectureSubmission.save()
            .then(() => {
              console.log("<SUCCESS> Adding lecture submission:",lectureSubmission)
              res.status(200).json(lectureSubmission);
            })
            .catch(() => {
              console.log("<ERROR> Adding lecture submission:",lectureSubmission)
              res.status(400).send("unable to save poll to database");
            });
        }
      }
      if(!match) {
        console.log("<ERROR> The given lecture's QR Codes do not contain the submitted QR Code:",lectureSubmission.code)
        res.status(400).send("The given lecture's QR Codes do not contain the submitted QR Code");
      }
    }
  })
});

lectureSubmissionRoutes.route('/add_by_rcs').post(function (req, res) {
  let email = req.body.rcs + "@rpi.edu"
  User.findOne({email: email},function(err,user){
    if(err || user == null) {
      console.log("<ERROR> Getting user(s) with email:",email)
      res.json(err)
    } else {
      Lecture.findById(req.body.lecture_id,function(err,lecture) {
        if(err || lecture == null) {
          console.log("<ERROR> Getting lecture with ID:",req.body.lecture_id)
          res.json(err)
        } else {
          let lectureSubmissions = []
          for(let i=0;i<lecture.checkins.length;i++) {
            let subobj = {
              lecture: lecture._id,
              video_progress: 0,
              is_live_submission: true,
              submitter: user._id,
              code: lecture.checkins[i].code
            }
            let lectureSubmission = new LectureSubmission(subobj);
            lectureSubmission.save()
              .then(() => {
                console.log("<SUCCESS> Adding lecture submission for user with email:",email)
                lectureSubmissions.push(lectureSubmissions)
                if(i == lecture.checkins.length-1) {
                  res.status(200).json(lectureSubmission);
                }
              })
              .catch(() => {
                console.log("<ERROR> Adding lecture submission for user with email:",email)
                res.status(400).send("unable to save submission to database");
              });
          }
        }
      })
    }
  })
});

lectureSubmissionRoutes.route('/').get(function (req, res) {
  LectureSubmission.find(function (err, lectureSubmissions) {
    if (err || lectureSubmissions == null) {
      console.log("<ERROR> Getting all lecture submissions")
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting all lecture submissions")
      res.json(lectureSubmissions);
    }
  });
});

lectureSubmissionRoutes.route('/:id').get(function (req, res) {
  LectureSubmission.findById(req.params.id,function (err, lectureSubmission) {
    if (err || lectureSubmission == null) {
      console.log("<ERROR> Getting lecture submission with ID:",req.params.id)
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting lecture submission with ID:",req.params.id)
      res.json(lectureSubmission);
    }
  });
});

lectureSubmissionRoutes.route('/update').post(function (req, res) {
  let updated = req.body.lectureSubmission
  LectureSubmission.findByIdAndUpdate(updated._id,
    {
      video_progress: updated.video_progress,
      student_poll_answers: updated.student_poll_answers
    },
    function (err, updatedSubmission) {
      if (err || updatedSubmission == null) {
        console.log("<ERROR> Updating lecture submission by ID:",updated._id,"with:",updated)
        res.json(err);
      } else {
        console.log("<SUCCESS> Updating lecture submission by ID:",updated._id,"with:",updated)
        res.json(updatedSubmission);
      }
    }
  );
});

lectureSubmissionRoutes.route('/get_or_make').post(function (req, res) {
  let lecture_id = req.body.lecture_id
  let submitter_id = req.body.submitter_id
  LectureSubmission.find(
    {
      lecture: lecture_id,
      submitter: submitter_id
    },
    function (err, lectureSubmissions) {
      if (err || lectureSubmissions == null) {
        console.log("<ERROR> Getting lecture submission with lecture ID:",lecture_id,"and submitter ID:",submitter_id)
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
            console.log("<SUCCESS> Adding lecture submission:",lectureSubmission)
            res.status(200).json(lectureSubmission);
          })
          .catch(() => {
            console.log("<ERROR> Adding lecture submission:",lectureSubmission)
            res.status(400).send("unable to save lectureSubmission to database");
          });
      } else {
        console.log("<SUCCESS> Getting lecture submission with lecture ID:",lecture_id,"and submitter ID:",submitter_id)
        res.status(200).json(lectureSubmissions[0]);
      }
    }
  );
});

lectureSubmissionRoutes.get('/for_lecture/:lecture_id', (req, res) => {
	let lecture_id = req.params.lecture_id;
  LectureSubmission.find(
    {lecture: lecture_id},
    function(err,lect_submissions) {
      if(err || lect_submissions == null) {
        res.json(err)
      } else if(lect_submissions.length > 0){
        User.findById({'_id': lect_submissions[0].submitter}, (error, submitter) => {
          if(error || submitter == null) {
            console.log("<ERROR> Getting lecture submissions for lecture with ID:",lecture_id)
            res.json(error)
          } else {
            lect_submissions.forEach(submission => {
              submission.submitter = submitter
            })
            console.log("<SUCCESS> Getting lecture submissions for lecture with ID:",lecture_id)
            res.json(lect_submissions)
          }
        })
      } else {
        console.log("<SUCCESS> Getting lecture submissions for lecture with ID:",lecture_id)
        res.json([])
      }
    }
  )
})

lectureSubmissionRoutes.get('/for_student/:lecture_id/:student_id', (req, res) => {
  let lecture_id = req.params.lecture_id
  let student_id = req.params.student_id
  LectureSubmission.findOne(
    {
      lecture: lecture_id,
      submitter: student_id
    },
    function(err,lect_submission) {
      if(err || lect_submission == null) {
        console.log("<ERROR> Getting lecture submission with lecture ID:",lecture_id,"and student ID:",student_id)
        res.json(err)
      } else {
        console.log("<SUCCESS> Getting lecture submission with lecture ID:",lecture_id,"and student ID:",student_id)
        res.json(lect_submission)
      }
    }
  )
})

module.exports = lectureSubmissionRoutes;