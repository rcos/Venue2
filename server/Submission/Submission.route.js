const express = require('express');
const submissionRoutes = express.Router();

let Submission = require('./Submission.model');
let Event = require('../Event/Event.model');

submissionRoutes.route('/add').post(function (req, res) {
  let submission = new Submission(req.body.submission);
  submission.save()
    .then(() => {
      res.status(200).json(submission);
    })
    .catch(() => {
      res.status(400).send("unable to save submission to database");
  });
});

submissionRoutes.route('/').get(function (req, res) {
    Submission.find(function(err, submissions){
    if(err)
      res.json(err);
    res.json(submissions);
  });
});

submissionRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Submission.findById(id, function (err, submission){
      if(err)
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
    },
    function(err, submission) {
      if (!submission)
        res.status(404).send("submission not found");
      res.json(submission);    
    }
  );
});

submissionRoutes.route('/delete/:id').delete(function (req, res) {
    Submission.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = submissionRoutes;