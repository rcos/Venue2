const express = require('express');
const pollRoutes = express.Router();

let PlaybackPoll = require('../PlaybackPoll/PlaybackPoll.model');

pollRoutes.route('/add').post(function (req, res) {
  let poll = new PlaybackPoll(req.body.poll);
  poll.save()
    .then(() => {
      console.log("<SUCCESS> Adding poll:",poll)
      res.status(200).json(poll);
    })
    .catch(() => {
      console.log("<ERROR> Adding poll:",poll)
      res.status(400).send("unable to save poll to database");
    });
});

pollRoutes.route('/update').post(function (req, res) {
  let poll = {};
  if(req.body.poll && req.body.poll._id) {
    poll._id = req.body.poll._id
    if(req.body.poll.lecture) {
      poll.lecture = req.body.poll.lecture
    }
    if(req.body.poll.lecture) {
      poll.lecture = req.body.poll.lecture
    }
    if(req.body.poll.question) {
      poll.question = req.body.poll.question
    }
    if(req.body.poll.possible_answers) {
      poll.possible_answers = req.body.poll.possible_answers
    }
    if(req.body.poll.correct_answers) {
      poll.correct_answers = req.body.poll.correct_answers
    }
    if(req.body.poll.checkin) {
      poll.checkin = req.body.poll.checkin
    }
    if(req.body.poll.code) {
      poll.code = req.body.poll.code
    }
    if(req.body.poll.timestamp) {
      console.log(req.body.poll.timestamp)
      poll.timestamp = req.body.poll.timestamp
    }
    PlaybackPoll.findByIdAndUpdate(poll._id,
      poll,
      function (err, updatedPoll) {
        if (err || updatedPoll == null) {
          console.log("<ERROR> Updating poll by ID:",poll._id,"with:",poll)
          res.json(err);
        } else {
          console.log("<SUCCESS> Updating poll by ID:",poll._id,"with:",poll)
          res.json(poll);
        }
      }
    );
  }
});

pollRoutes.route('/').get(function (req, res) {
  PlaybackPoll.find(function (err, polls) {
    if (err || polls == null) {
      console.log("<ERROR> Getting all polls")
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting all polls")
      res.json(polls);
    }
  });
});

pollRoutes.route('/by_lecture/:lectureid').get(function (req, res) {
  PlaybackPoll.find(
    {lecture: req.params.lectureid},
    function (err, polls) {
      if (err || polls == null) {
        console.log("<ERROR> Getting polls for lecture with ID:",req.params.lectureid)
        res.json(err);
      } else {
        console.log("<SUCCESS> Getting polls for lecture with ID:",req.params.lectureid)
        res.json(polls);
      }
    }
  );
});

module.exports = pollRoutes;