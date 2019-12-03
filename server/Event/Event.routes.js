const express = require('express');
const eventRoutes = express.Router();

let Evemnt = require('./Event.model');
let Section = require('../Section/Section.model');

eventRoutes.route('/add').post(function (req, res) {
  let event = new Event(req.body.event);
  event.save()
    .then(() => {
      res.status(200).json(event);
    })
    .catch(() => {
      res.status(400).send("unable to save event to database");
  });
});

eventRoutes.route('/').get(function (req, res) {
    Event.find(function(err, events){
    if(err){
      res.json(err);
    }
    else {
      res.json(events);
    }
  });
});

eventRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Event.findById(id, function (err, event){
      if(err) {
        res.json(err);
      }
      res.json(event);
  });
});

eventRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  let updated_event = req.body.updated_event;
  Event.findByIdAndUpdate(id, 
    {
      title: updated_event.title,
      section: updated_event.section,
    },
    function(err, event) {
      if (!event)
        res.status(404).send("event not found");
      res.json(event);    
    }
  );
});

eventRoutes.route('/delete/:id').delete(function (req, res) {
    Event.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = eventRoutes;