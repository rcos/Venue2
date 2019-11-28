const express = require('express');
const courseRoutes = express.Router();

let Course = require('./Course.model');
let user_models = require('../User/User.model');
let User = user_models.User;
let Student = user_models.Student;
let Instructor = user_models.Instructor;

courseRoutes.route('/add').post(function (req, res) {
  let course = new Course(req.body.course);
  course.save()
    .then(() => {
      console.log("saved course: " + course);
      res.status(200).json(course);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("unable to save course to database");
  });
});

courseRoutes.route('/').get(function (req, res) {
    Course.find(function(err, courses){
    if(err){
      res.json(err);
    }
    else {
      res.json(courses);
    }
  });
});

courseRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Course.findById(id, function (err, course){
      if(err) {
        res.json(err);
      }
      res.json(course);
  });
});

courseRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  let updated_course = req.body.updated_course;
  Course.findByIdAndUpdate(id, 
    {
      name: updated_course.name,
      dept: updated_course.dept,
      course_number: updated_course.course_number,
      sections: updated_course.sections,
      instructor: updated_course.instructor
    },
    function(err, course) {
      if (!course)
        res.status(404).send("section not found");
      res.json(course);    
    }
  );
});

courseRoutes.route('/delete/:id').delete(function (req, res) {
    Course.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed course');
    });
});

courseRoutes.route('/getInstructor/:id').get(function (req, res) {
  let id = req.params.id;
  Course.findById(id, function (err, course){
      if(err) {
        res.json(err);
      }
      let instructor_id = course.instructor;
      User.findById(instructor_id, function(error, instructor){
        if(error)
          res.json(error);
        res.json(instructor);
      });
  });
});

module.exports = courseRoutes;