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