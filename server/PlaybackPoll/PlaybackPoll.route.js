const express = require('express');
const pollRoutes = express.Router();

let PlaybackPoll = require('../PlaybackPoll/PlaybackPoll.model');

pollRoutes.route('/add').post(function (req, res) {
  let poll = new PlaybackPoll(req.body.poll);
  poll.save()
    .then(() => {
      res.status(200).json(poll);
    })
    .catch(() => {
      res.status(400).send("unable to save poll to database");
    });
});

pollRoutes.route('/').get(function (req, res) {
  PlaybackPoll.find(function (err, polls) {
    if (err || polls == null) {
      res.json(err);
    } else {
      res.json(polls);
    }
  });
});

pollRoutes.route('/by_lecture/:lectureid').get(function (req, res) {
  PlaybackPoll.find(
    {lecture: req.params.lectureid},
    function (err, polls) {
      if (err || polls == null) {
        res.json(err);
      } else {
        res.json(polls);
      }
    }
  );
});

module.exports = pollRoutes;