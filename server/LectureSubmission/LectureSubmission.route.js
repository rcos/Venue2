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
              console.log("<SUCCESS> Getting some user(s) with RCS. Bad RCS IDs:",bad_ids)
              res.json(bad_ids)
            }
          } else {
            //try to find and update a submission
            let updated_info = {
              live_percent: 1,
              live_progress: lecture.checkins.length,
              live_submission_time: new Date()
            }
            LectureSubmission.findOneAndUpdate(
              {
                lecture: req.body.lecture_id,
                submitter: user._id
              },
              updated_info,
              function (err, lectureSubmission) {
                if (err) {
                  console.log("<ERROR> Manually overriding lecture submission with lecture ID:",req.body.lecture_id,"and submitter ID:",user._id)
                  res.json(err);
                } else if (null != lectureSubmission) { // get
                  console.log("<SUCCESS> Manually overriding lecture submission with lecture ID:",req.body.lecture_id,"and submitter ID:",user._id)
                  if(n == rcsids.length) {
                    res.json(bad_ids)
                  }
                } else { // make
                  updated_info.lecture = req.body.lecture_id
                  updated_info.submitter = user._id
                  let updated = new LectureSubmission(updated_info);
                  updated.save().then(() => {
                    console.log("<SUCCESS> Adding lecture submission for user with RCS:",rcs)
                    if(n == rcsids.length) {
                      res.json(bad_ids)
                    }
                  }).catch(() => {
                    console.log("<ERROR> Adding lecture submission for user with RCS:",rcs)
                    res.status(400).send("unable to save lectureSubmission to database");
                  });
                }
              }
            );
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
  let updated = {}
  if(req.body.lectureSubmission && req.body.lectureSubmission._id) {
    updated._id = req.body.lectureSubmission._id
    if(req.body.lectureSubmission.live_progress) {
      updated.live_progress = req.body.lectureSubmission.live_progress
    }
    if(req.body.lectureSubmission.live_percent) {
      updated.live_percent = req.body.lectureSubmission.live_percent
    }
    if(req.body.lectureSubmission.video_progress) {
      updated.video_progress = req.body.lectureSubmission.video_progress
    }
    if(req.body.lectureSubmission.video_percent) {
      updated.video_percent = req.body.lectureSubmission.video_percent
    }
    if(req.body.lectureSubmission.live_submission_time) {
      updated.live_submission_time = new Date()
    }
    if(req.body.lectureSubmission.playback_submission_time) {
      updated.playback_submission_time = new Date()
    }
    if(req.body.lectureSubmission.codes) {
      updated.codes = req.body.lectureSubmission.codes
    }
    if(req.body.lectureSubmission.student_poll_answers) {
      updated.student_poll_answers = req.body.lectureSubmission.student_poll_answers
    }
    Lecture.findById(req.body.lectureSubmission.lecture,function(err,lecture) {
      if(err || !lecture) {
        console.log("<ERROR> Getting lecture with ID:",req.body.lectureSubmission.lecture)
        res.json(err)
      } else {
        LectureSubmission.findById(updated._id,
          function (err, oldSubmission) {
            if (err || oldSubmission == null) {
              console.log("<ERROR> Getting lecture submission with ID:",updated._id)
              res.json(err);
            } else {
              let valid = true
              if(updated.codes || updated.live_progress || updated.live_percent) {
                if(updated.codes && updated.live_progress && updated.live_percent) {
                  if(!( updated.codes.every(code => lecture.checkins.map(check => check.code).includes(code))
                  && updated.live_progress == updated.codes.length
                  && updated.live_percent == updated.live_progress / lecture.checkins.length)) {
                    console.log(!( updated.codes.every(code => lecture.checkins.map(check => check.code).includes(code))
                    && updated.live_progress == updated.codes.length
                    && updated.live_percent == updated.live_progress / lecture.checkins.length))
                    valid = false
                  }
                } else {
                  valid = false
                }
              }
              if(updated.video_percent || updated.video_progress) {
                if(updated.video_percent && updated.video_progress) {
                  if(oldSubmission.video_progress) {
                    if(updated.video_progress - 5 > oldSubmission.video_progress || updated.video_progress > lecture.video_length) {
                      valid = false
                    } else {
                      updated.video_percent = updated.video_progress / lecture.video_length
                    }
                  } else if(updated.video_progress != 5) {
                    valid = false
                  }
                } else {
                  valid = false
                }
              }
              if(!valid) {
                console.log("<ERROR> Updating lecture submission by ID:",updated._id)
                res.sendStatus(400)
              } else {
                LectureSubmission.findByIdAndUpdate(updated._id,
                  updated,
                  function (err, updatedSubmission) {
                    if (err || updatedSubmission == null) {
                      console.log("<ERROR> Updating lecture submission by ID:",updated._id)
                      res.json(err);
                    } else {
                      console.log("<SUCCESS> Updating lecture submission by ID:",updated._id)
                      res.json(updated);
                    }
                  }
                );
              }
            }
          }
        );
      }
    })
  } else {
    res.status(400).send("Missing a real lectureSubmission in request")
  }
});

lectureSubmissionRoutes.route('/get_or_make').post(function (req, res) {
  let lecture_id = req.body.lecture_id
  let submitter_id = req.body.submitter_id
  LectureSubmission.findOne(
    {
      lecture: lecture_id,
      submitter: submitter_id
    },
    function (err, lectureSubmission) {
      if (err) {
        console.log("<ERROR> Getting lecture submission with lecture ID:",lecture_id,"and submitter ID:",submitter_id)
        res.json(err);
      } else if (null != lectureSubmission) { // get
        console.log("<SUCCESS> Getting lecture submission with lecture ID:",lecture_id,"and submitter ID:",submitter_id)
        res.status(200).json(lectureSubmission)
      } else { // make
        let lecture_submission = new LectureSubmission({
          lecture: lecture_id,
          submitter: submitter_id
        });
        lecture_submission.save().then(() => {
          console.log("<SUCCESS> Making lecture submission:",lecture_submission)
          res.status(200).json(lecture_submission);
        }).catch(() => {
          console.log("<ERROR> Making lecture submission:",lecture_submission)
          res.status(400).send("unable to save lectureSubmission to database");
        });
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

lectureSubmissionRoutes.post('/update_all_to_new_model', (req, res) => {
  Lecture.find(function(err,lectures) {
    if(err) {
      console.log("<ERROR> Getting all lectures")
      res.json(err)
    } else {
      User.find(function(err,users) {
        if(err) {
          console.log("<ERROR> Getting all users")
          res.json(err)
        } else {
          let submission_promises = []

          users.forEach(user => {
            lectures.forEach(lecture => {
              submission_promises.push(new Promise((resolve,reject) => {
                LectureSubmission.find(
                {
                  lecture: lecture._id,
                  submitter: user._id
                }, function(err,submissions){
                  if(submissions && submissions.length) {
                    let new_submission_data = {
                      lecture: lecture._id,
                      submitter: user._id
                    }

                    let live = submissions.filter(a => a.live_submission_time)
                    let playback = submissions.filter(a => a.playback_submission_time || !a.live_submission_time)

                    if(live && live.length > 0) {
                      new_submission_data.live_progress = live.length
                      new_submission_data.live_percent = live.length / lecture.checkins.length
                      new_submission_data.live_submission_time = live.map(a => a.live_submission_time)[0]
                    }

                    if(playback && playback.length > 0) {
                      new_submission_data.video_progress = playback[0].video_progress
                      new_submission_data.video_percent = playback[0].video_percent
                      new_submission_data.playback_submission_time = playback[0].playback_submission_time
                    }

                    let old_ids = submissions.map(a => a._id)

                    LectureSubmission.deleteMany({_id: {$in: old_ids}},function(err) {
                      if(err) {
                        console.log("<ERROR> Removing old submissions")
                        res.json(err)
                      } else {
                        let lecture_submission = new LectureSubmission(new_submission_data)
                        lecture_submission.save()
                        .then(() => {
                          resolve(lecture_submission)
                        })
                      }
                    })
                  } else {
                    resolve(null)
                  }
                })
              }))
            })
          })

          Promise.all(submission_promises).then(resolved => {
            res.json(resolved)
          })
        }
      })
    }
  })
})

module.exports = lectureSubmissionRoutes;