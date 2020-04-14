const express = require('express');
const submissionRoutes = express.Router();

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
      //check if location is correct
      // submission.location is inside event.geofence
      if (google.maps.geometry.poly.containsLocation(submission.location, new google.maps.Polygon({ paths: event.geofence }))) {
        console.log("SUBMISSION IS INSIDE THE FENCE")
      } else {
        console.log("SUBMISSION IS OUTSIDE THE FENCE")
      }

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

submissionRoutes.route('/event_submissions/:event_id').get(function (req, res) {
  console.log("I'm here!!!!");
  let event_id = req.params.event_id;
  Submission.find(function (err, submissions) {
    if (err) {
      console.log(err);
      res.json(err);
    }
    let event_submissions = [];
    submissions.forEach(submission => {
      if (submission.event == event_id)
        event_submissions.push(submission);
    });
    res.json(event_submissions);
  });
});

module.exports = submissionRoutes;