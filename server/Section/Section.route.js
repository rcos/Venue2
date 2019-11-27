const express = require('express');
const sectionRoutes = express.Router();

let Section = require('./Section.model');
let User = require('../User/User.model');
let Course = require('../Course/Course.model');

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
  let new_section = req.body.section;
  Section.findByIdAndUpdate(id, 
    {
      course: new_section.course,
      instructor: new_section.instructor,
      number: new_section.number,
      students: new_section.students,
      teaching_assistants: new_section.teaching_assistants,
      events: new_section.events
    },
    function(err, section) {
      if (!section)
        res.status(404).send("section not found");
      res.json(section);    
    }
  );


  // Section.findById(id, function(err, section) {
  //   if (!section)
  //     res.status(404).send("data is not found");
  //   else {
  //       section.course = req.body.course;
  //       section.instructor = req.body.instructor;
  //       section.section_number = req.body.section_number;
  //       section.students = req.body.students;
  //       section.teaching_assistants = req.body.teaching_assistants;
  //       section.events = req.body.events;
  //       section.save().then(() => {
  //         res.json('Update complete');
  //     })
  //     .catch(() => {
  //           res.status(400).send("unable to update section in the database");
  //     });
  //   }
  // });
});

sectionRoutes.route('/delete/:id').delete(function (req, res) {
    Section.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

sectionRoutes.route('/getInstructor/:id').get(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function (err, section){
      if(err) {
        res.json(err);
      }
      let instructor_id = section.instructor;
      User.findById(instructor_id, function(error, instructor){
        if(error)
          res.json(error);
        res.json(instructor);
      });
  });
});

sectionRoutes.route('/getCourse/:id').get(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function (err, section){
      if(err) {
        res.json(err);
      }
      let course_id = section.course;
      Course.findById(course_id, function(error, course){
        if(error)
          res.json(error);
        res.json(course);
      });
  });
});

module.exports = sectionRoutes;