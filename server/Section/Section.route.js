const express = require('express');
const sectionRoutes = express.Router();
const jwt = require('jsonwebtoken')
const ObjectID = require(`mongoose`).Types.ObjectId

let Section = require('./Section.model');
let User = require('../User/User.model');
let Course = require('../Course/Course.model');

sectionRoutes.route('/add').post(function (req, res) {
  let section = new Section(req.body.section);
  section.save()
    .then(() => {
      console.log("<SUCCESS> Adding section:",section)
      res.status(200).json(section);
    })
    .catch(() => {
      console.log("<ERROR> Adding section:",section)
      res.status(400).send("unable to save section to database");
  });
});

sectionRoutes.route('/').get(function (req, res) {
  Section.find(function(err, sections){
    if(err || sections == null) {
      console.log("<ERROR> Getting all sections")
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting all sections")
      res.json(sections);
    }
  });
});

sectionRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function (err, section){
    if(err || section == null) {
      console.log("<ERROR> Getting section with ID:",id)
      res.json(err);
    } else {
      console.log("<SUCCESS> Getting section with ID:",id)
      res.json(section);
    }
  });
});

sectionRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  let updated_section = req.body.updated_section;
  Section.findByIdAndUpdate(id,
    {
      course: updated_section.course,
      number: updated_section.number,
      students: updated_section.students,
      teaching_assistants: updated_section.teaching_assistants,
      events: updated_section.events
    },
    function(err, section) {
      if (err || section == null) {
        console.log("<ERROR> Updating section by ID:",id,"with:",updated_section)
        res.status(404).send("section not found");
      } else {
        console.log("<SUCCESS> Updating section by ID:",id,"with:",updated_section)
        res.json(section);
      }
    }
  );
});

sectionRoutes.route('/delete/:id').delete(function (req, res) {
  Section.findByIdAndRemove({_id: req.params.id}, function(err){
    if(err) {
      console.log("<ERROR> Deleting section with ID:",req.params.id)
      res.json(err);
    } else {
      console.log("<SUCCESS> Deleting section with ID:",req.params.id)
      res.json('Successfully removed');
    }
  });
});

sectionRoutes.route('/getInstructors/:id').get(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function (err, section){
      if(err || section == null) {
        console.log("<ERROR> Getting section with ID:",id)
        res.json(err);
      } else {
        let course_id = section.course;
        Course.findById(course_id, function(error, course){
          if(error || course == null){
            console.log("<ERROR> Getting course with ID:",course_id)
            res.json(error);
          } else {
            let instructor_ids = course.instructors;
            User.find({_id: {$in: instructor_ids}}, function(error, instructors){
              if(error || instructors == null) {
                console.log("<ERROR> Getting instructors with IDs:",instructor_id)
                res.json(error)
              } else {
                console.log("<SUCCESS> Getting instructors for section with ID:",id)
                res.json(instructors)
              }
            });
          }
        });
      }
  });
});

sectionRoutes.route('/getCourse/:id').get(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function (err, section){
    if(err || section == null) {
      console.log("<ERROR> Getting section with ID:",id)
      res.json(err);
    } else {
      let course_id = section.course;
      Course.findById(course_id, function(error, course){
        if(error || course == null) {
          console.log("<ERROR> Getting course with ID:",course_id)
          res.json(error);
        } else {
          console.log("<SUCCESS> Getting course for section with ID:",id)
          res.json(course);
        }
      });
    }
  });
});

sectionRoutes.route('/getStudents/:id').get(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function (err, section){
    if(err || section == null) {
      console.log("<ERROR> Getting section with ID:",id)
      res.json(err);
    } else {
      let student_ids = section.students;
      let students = [];
      let num_iterations = 0;
      console.log("student_ids: " + student_ids);
      student_ids.forEach(student_id => {
        User.findById(student_id, function(err, student) {
          if(err || student == null){
            console.log("<ERROR> Getting user with ID:",student_id)
            res.json(err);
          } else {
            students.push(student);
            num_iterations++;
            if(num_iterations === student_ids.length) {
              console.log("<SUCCESS> Getting students for section with ID:",id)
              res.json(students);
            }
          }
        })
      })
    }
  })
})

sectionRoutes.get('/get_with_courses_for_student/:user_id', (req, res) => {
  let user_id = req.params.user_id
  user_sections = []
  Section.find((error, sections) => {
    if(error || sections == null) {
      console.log("<ERROR> Getting all sections")
      res.json(error)
    } else {
      sections.forEach((section) => {
        section.students.forEach((student) => {
          if(student._id == user_id)
            user_sections.push(section)
        })
      })
      let counter = 0
      user_sections.forEach((user_section) => {
        Course.findById(user_section.course, function (course_error, course){
          if(course_error || course == null) {
            console.log("<ERROR> Getting course with ID:",user_section.course)
            res.json(course_error);
          } else { 
            user_section.course = course
          }
          counter++
          if(counter === user_sections.length){
            console.log("<SUCCESS> Getting sections with courses for user with ID:",user_id)
            res.json(user_sections)
          }
        })
      })
    }
  })
})

sectionRoutes.get('/get_with_course/:section_id', (req, res) => {
  let section_id = req.params.section_id
  Section.findById(section_id, function (err, section){
    if(err || section == null) {
      console.log("<ERROR> Getting section with ID:",section_id)
      res.json(err);
    } else {
      Course.findById(section.course, function(error, course) {
        if(error || course == null) {
          console.log("<ERROR> Getting course with ID:",section.course)
          res.json(error)
        } else {
          section.course = course
          console.log("<SUCCESS> Getting section with course for section with ID:",section_id)
          res.json(section)
        }
      })
    }
  })
})

sectionRoutes.get('/get_for_course/:course_id', (req, res) => {
  let course_id = req.params.course_id
  Section.find((error, sections) => {
    if(error || sections == null) {
      console.log("<ERROR> Getting all sections")
      res.json(error)
    } else {
      let course_sections = []
      sections.forEach(section => {
        if(section.course == course_id)
          course_sections.push(section)
      })
      console.log("<SUCCESS> Getting all sections for course with ID:",course_id)
      res.json(course_sections)
    }
  })
})

sectionRoutes.get('/get_ta_sections', (req, res) => {
  Section.find({_id: {$in: req.user.ta_sections}}, function(err, ta_sections) {
    if(err || ta_sections == null) {
      console.log("<ERROR> Getting ta sections by user with ID:",req.user._id)
      res.json(err)
    } else {
      let promises = []
      ta_sections.forEach(section => {
        promises.push(new Promise((resolve,reject) => {
          Course.findById(section.course,function(err,course) {
            section.course = course
            resolve(course)
          })
        }))
      })
      Promise.all(promises).then(resolved => {
        console.log("<SUCCESS> Getting ta sections by user with ID:",req.user._id)
        res.json(ta_sections)
      })
    }
  })
})

sectionRoutes.get('/get_student_sections', (req, res) => {
  Section.find({_id: {$in: req.user.student_sections}}, function(err, student_sections) {
    if(err || student_sections == null) {
      console.log("<ERROR> Getting ta sections by user with ID:",req.user._id)
      res.json(err)
    } else {
      let promises = []
      student_sections.forEach(section => {
        promises.push(new Promise((resolve,reject) => {
          Course.findById(section.course,function(err,course) {
            section.course = course
            resolve(course)
          })
        }))
      })
      Promise.all(promises).then(resolved => {
        console.log("<SUCCESS> Getting student sections by user with ID:",req.user._id)
        res.json(student_sections)
      })
    }
  })
})

module.exports = sectionRoutes;
