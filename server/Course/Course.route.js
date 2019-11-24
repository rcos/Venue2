const express = require('express');
const courseRoutes = express.Router();

let Course = require('./Course.model');
let User = require('../User/User.model');

courseRoutes.route('/add').post(function (req, res) {
  let course = new Course(req.body.course);
  let instructor_id = course.instructor._id;
  console.log("About to add course:");
  console.log(" name: " + course.name);
  console.log(" dept: " + course.dept);
  console.log(" course_number: " + course.course_number);
  console.log(" instructor: " + course.instructor.first_name + " " + course.instructor.last_name +
    " id: " + instructor_id);
  User.findById(instructor_id, function (err, instructor){
      if(err) {
        res.json(err);
      }
      course.instructor = instructor;
      console.log(" instructor: " + course.instructor.first_name + " " + course.instructor.last_name +
    " id: " + instructor_id);
      course.save()
        .then(() => {
          res.status(200).json(course);
        })
        .catch(() => {
          res.status(400).send("unable to save course to database");
        });
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
  Course.findById(id, function(err, course) {
    if (!course)
      res.status(404).send("data is not found");
    else {
        course.name = req.body.name;
        course.dept = req.body.dept;
        course.course_number = req.body.course_number;
        course.instructor = req.body.instructor;
        course.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update course in the database");
      });
    }
  });
});

courseRoutes.route('/delete/:id').delete(function (req, res) {
    Course.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

courseRoutes.route('/getInstructor/:id').get(function (req, res) {
  console.log("In get instructor function")
  let id = req.params.id;
  Course.findById(id, function (err, course){
      if(err) {
        res.json(err);
      }
      console.log("Course was found. About to search for instructor")
      let instructor_id = course.instructor;
      console.log("Id for this courses: instructor: " + instructor_id);
      User.findById(instructor_id, function(error, instructor){
        if(error){
          console.log("ERROR occured when looking for instructor");
          res.json(error);
        }
        res.json(instructor);
        console.log("Found instructor " + instructor.first_name + " " + instructor.last_name);
      });
  });
});
module.exports = courseRoutes;