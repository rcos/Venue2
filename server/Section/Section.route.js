const express = require('express');
const sectionRoutes = express.Router();

let Section = require('./Section.model');
let User = require('../User/User.model');

sectionRoutes.route('/add').post(function (req, res) {
  let section = new Section(req.body.section);
  section.save()
    .then(() => {
      res.status(200).json(section);
    })
    .catch(() => {
      res.status(400).send("unable to save section to database");
  });
});

sectionRoutes.route('/').get(function (req, res) {
    Section.find(function(err, sections){
    if(err){
      res.json(err);
    }
    else {
      res.json(sections);
    }
  });
});

sectionRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function (err, section){
      if(err) {
        res.json(err);
      }
      res.json(section);
  });
});

sectionRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function(err, section) {
    if (!section)
      res.status(404).send("data is not found");
    else {
        section.course = req.body.course;
        section.instructor = req.body.instructor;
        section.section_number = req.body.section_number;
        section.students = req.body.students;
        section.teaching_assistants = req.body.teaching_assistants;
        section.events = req.body.events;
        section.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update section in the database");
      });
    }
  });
});

sectionRoutes.route('/delete/:id').delete(function (req, res) {
    Section.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = sectionRoutes;