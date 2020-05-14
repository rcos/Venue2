const express = require('express');
const pollRoutes = express.Router();

let Poll = require('../PlaybackPoll/PlaybackPoll.model');

pollRoutes.route('/add').post(function (req, res) {
  let poll = new Poll(req.body.poll);
  poll.save()
    .then(() => {
      res.status(200).json(poll);
    })
    .catch(() => {
      res.status(400).send("unable to save poll to database");
    });
});

pollRoutes.route('/').get(function (req, res) {
  Poll.find(function (err, polls) {
    if (err)
      res.json(err);
    res.json(polls);
  });
});

module.exports = pollRoutes;