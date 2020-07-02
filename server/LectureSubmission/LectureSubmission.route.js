const express = require('express');
const lectureSubmissionRoutes = express.Router();

let LectureSubmission = require('../LectureSubmission/LectureSubmission.model');
let Lecture = require('../Lecture/Lecture.model');
let User = require('../User/User.model');

lectureSubmissionRoutes.route('/add').post(function (req, res) {
  let lecture_submission = new LectureSubmission(req.body.lecture_submission);
  lecture_submission.save()
    .then(() => {
      console.log("<SUCCESS> Adding lecture submission:",lecture_submission)
      res.status(200).json(lecture_submission);
    })
    .catch(() => {
      console.log("<ERROR> Adding lecture submission:",lecture_submission)
      res.status(400).send("unable to save poll to database");
    });
});

lectureSubmissionRoutes.route('/add_by_rcs').post(function (req, res) {
  let rcsids = req.body.rcs
  Lecture.findById(req.body.lecture_id,function(err,lecture) {
    if(err || lecture == null) {
      console.log("<ERROR> Getting lecture with ID:",req.body.lecture_id)
      res.json(err)
    } else {
      let n = 0
      let bad_ids = []
      rcsids.forEach(rcs => {
        User.findOne({user_id: rcs},function(err,user){
          n++
          if(err) {
            console.log("<ERROR> Getting user(s) with RCS:",rcs)
            res.json(err)
          } else if(user == null) {
            bad_ids.push(rcs)
            if(n == rcsids.length) {
              console.log("<SUCCESS> Getting some user(s) with RCS")
              res.json(bad_ids)
            }
          } else {
            let m = 0
            lecture.checkins.forEach(checkin => {
              let subobj = {
                lecture: lecture._id,
                video_progress: 0,
                video_percent: 0,
                is_live_submission: true,
                submitter: user._id,
                code: checkin.code
              }
              let lectureSubmission = new LectureSubmission(subobj);
              lectureSubmission.save()
                .then(() => {
                  m++
                  console.log(m)
                  console.log("<SUCCESS> Adding lecture submission for user with RCS:",rcs)
                  if(m == lecture.checkins.length && n == rcsids.length) {
                    res.json(bad_ids)
                  }
                })
                .catch(() => {
                  console.log("<ERROR> Adding lecture submission for user with RCS:",rcs)
                  res.status(400).send("unable to save submission to database");
                });
            })
          }
        })
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
      video_percent: updated.video_percent,
      student_poll_answers: updated.student_poll_answers,
      playback_submission_time: new Date()
    },
    function (err, updatedSubmission) {
      if (err || updatedSubmission == null) {
        console.log("<ERROR> Updating lecture submission by ID:",updated._id,"with:",updated)
        res.json(err);
      } else {
        console.log("<SUCCESS> Updating lecture submission by ID:",updated._id,"with:",updated)
        res.json(updated);
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
          video_percent: 0,
          playback_submission_time: new Date(),
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
        let n = 0;
        let found = false;
        lectureSubmissions.forEach(sub => {
          n++;
          if(!sub.is_live_submission) {
            found = true
            console.log("<SUCCESS> Getting lecture submission with lecture ID:",lecture_id,"and submitter ID:",submitter_id)
            res.status(200).json(sub);
          } else if(n == lectureSubmissions.length && !found) {
            let lectureSubmission = new LectureSubmission({
              lecture: lecture_id,
              submitter: submitter_id,
              video_progress: 0,
              video_percent: 0,
              playback_submission_time: new Date(),
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
          }
        })
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
        let n = 0
        lect_submissions.forEach(lect_sub => {
          User.findById(lect_sub.submitter, (error, submitter) => {
            n++
            if(error || submitter == null) {
              console.log("<ERROR> Getting lecture submissions for lecture with ID:",lecture_id)
              res.json(error)
            } else {
              lect_sub.submitter = submitter
              if(n == lect_submissions.length) {
                console.log("<SUCCESS> Getting lecture submissions for lecture with ID:",lecture_id)
                res.json(lect_submissions)
              }
            }
          })
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
  LectureSubmission.find(
    {
      lecture: lecture_id,
      submitter: student_id
    },
    function(err,lect_submissions) {
      if(err) {
        console.log("<ERROR> Getting lecture submission with lecture ID:",lecture_id,"and student ID:",student_id)
        res.json(err)
      } else {
        if(lect_submissions == null) 
          console.log("<SUCCESS> No lecture submission was found:",lecture_id,"and student ID:",student_id)
        else
          console.log("<SUCCESS> Getting lecture submission with lecture ID:",lecture_id,"and student ID:",student_id)
        console.log("Found submissions",lect_submissions)
        res.json(lect_submissions)
      }
    }
  )
})

module.exports = lectureSubmissionRoutes;