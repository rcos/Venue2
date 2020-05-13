const express = require('express');
const submissionRoutes = express.Router();
const ObjectID = require(`mongoose`).Types.ObjectId

let Submission = require('./Submission.model');
let Event = require('../Event/Event.model');

submissionRoutes.route('/add').post(function (req, res) {
  let submission = new Submission(req.body.submission);
  Event.findById(submission.event, function (err, event) {
    if (err) {
      res.json(err);
    } else if (event.code == "") {
      res.status(400).send("attendance is not open for this event");
    } else if (submission.code == event.code) {
      submission.save()
        .then(() => {
          res.status(200).json(submission);
        })
        .catch(() => {
          res.status(400).send("unable to save submission to database");
        });
    } else {
      res.status(400).send("invalid attendance code");
    }
  })
});

submissionRoutes.route('/').get(function (req, res) {
  Submission.find(function (err, submissions) {
    if (err)
      res.json(err);
    res.json(submissions);
  });
});

submissionRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Submission.findById(id, function (err, submission) {
    if (err)
      res.json(err);
    res.json(submission);
  });
});

submissionRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  let updated_submission = req.body.updated_submission;
  Submission.findByIdAndUpdate(id,
    {
      event: updated_submission.event,
      submitter: updated_submission.submitter,
      time: updated_submission.time,
      location: updated_submission.location
    },
    function (err, submission) {
      if (!submission)
        res.status(404).send("submission not found");
      res.json(submission);
    }
  );
});

submissionRoutes.route('/delete/:id').delete(function (req, res) {
  Submission.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

submissionRoutes.route(`/section_submissions/:section_id`).get((req, res) => {
  // retrieve all submissions for a section, grouped by the event
  // associated with the submission

  let section_id = req.params.section_id

  if (!ObjectID.isValid(section_id)) {
    res.json({
      success: false,
      error: "Invalid object id provided"
    })
    return
  }

  // 1. find the events where section == section_id
  // 2. find the submissions where event is in the previous events

  Event.find({ section: section_id }, (err, events) => {
    if (err || events == null) {
      res.json(err ? err : 'Problem finding events')
    }
    else {

      let submission_promises = []
      events.forEach(evt => {
        submission_promises.push(new Promise((resolve, reject) => {
          Submission.find({ event: evt._id }, (err, submissions) => {
            if (err || submissions == null) resolve(null)
            else resolve(submissions)
          })
        }))

      })

      // wait for the promises to finish
      Promise.all(submission_promises).then(submission_data => {

        let submission_by_event = {}
        events.map((evt, i) => {
          let submission_for_event = submission_data[i]
          if (submission_for_event != null) {

            submission_by_event[ evt._id ] = {
              submissions: submission_for_event,
              date: evt.start_time
            }

          }
        })

        // return the submission by event
        res.json(submission_by_event)

      })

    }
  })

})

submissionRoutes.route('/event_submissions/:event_id').get(function (req, res) {
  console.log("I'm here!!!!");
  let event_id = req.params.event_id;

  if(!ObjectID.isValid(event_id)) {
    res.json({
      success: false,
      error: "Invalid object id provided."
    })
    return;
  }

  Submission.find({ event: event_id }, function (err, submissions) {
    if (err) {
      console.log(err);
      res.json(err);
    }

    res.json(submissions)
  });
});

module.exports = submissionRoutes;
