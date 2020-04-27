const express = require('express');
const sectionRoutes = express.Router();
const jwt = require('jsonwebtoken')
const Logger = require('../Utility/Logger')
const ObjectID = require('mongoose').Types.ObjectId

let Section = require('./Section.model');
let User = require('../User/User.model');
let Course = require('../Course/Course.model');

function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(401)
  }
}

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
        console.log(err);
        res.json(err);
      }else{
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
      if (!section)
        res.status(404).send("section not found");
      res.json(section);
    }
  );
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
      let course_id = section.course;
      Course.findById(course_id, function(error, course){
        if(error)
          res.json(error);
        let instructor_id = course.instructor;
        User.findById(instructor_id, function(error, instructor){
          if(error)
            res.json(error);
          res.json(instructor);
        });
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

sectionRoutes.route('/getStudents/:id').get(function (req, res) {
  let id = req.params.id;
  Section.findById(id, function (err, section){
    if(err) {
      res.json(err);
    }
    let student_ids = section.students;
    let students = [];
    let num_iterations = 0;
    console.log("student_ids: " + student_ids);
    student_ids.forEach(student_id => {
      User.findById(student_id, function(err, student) {
        if(err)
          res.json(err);
        students.push(student);
        num_iterations++;
        if(num_iterations === student_ids.length)
          res.json(students);
      });
    });
  });
});

sectionRoutes.get('/get_with_courses_for_student/:user_id', verifyToken, (req, res) => {
  let user_id = req.params.user_id

  Logger.goodRequest(`Section::getWithCoursesForStudent`)
  if (!ObjectID.isValid(user_id)) {
    Logger.error(`Invalid object id provided`, `\t`)
    res.json({
      success: false,
      error: "Invalid id format provided."
    })
    return;
  }

  jwt.verify(req.token, 'the_secret_key', err => {
    if(err) {
      Logger.error("Error in get_with_courses_for_student", `\t`)
      res.sendStatus(401).json({
        success: false,
        error: "Unauthorized access"
      })
    } else {

      Logger.success(`(1/3) Verified token`, `\t`)

      // get the sections that include this user
      Section.find({
        students: { "$all": [user_id]}
      },
      (err, sections) => {
        if (err || sections == null) {
          Logger.error(`Problem searching for sections for student with id ${user_id}`)
          res.json({
            success: false,
            error: "Problem searching for section"
          })
        }
        else {
          // for each of the section found, find the course that corresponds
          // with this section
          Logger.success(`(2/3) Found all sections user ${user_id} is in`, `\t`)
          let user_sections = []
          sections.forEach(section_ => {
            user_sections.push(new Promise(function(resolve, reject) {

              return Course.findById(section_.course, (err, course_) => {
                if (err || course_ == null) resolve(null)
                else resolve(course_)
              })

            }))
          })

          // wait all the data to return
          Promise.all(user_sections).then(user_courses => {

            Logger.success(`(3/3) Found all courses for the sections the user ${user_id} is in`, `\t`)

            let sections_total = []
            sections.forEach((section_, i) => {
              let combined_ = section_
              combined_.course = user_courses[i]

              sections_total.push(combined_)
            })

            let unique_course_id = new Set()
            let true_sections = sections_total.filter(section_info => {

              // don't return courses not found, or repeat courses
              if (section_info.course == null) {
                Logger.error(`One of the sections has a null course`, `\t`)
                return false
              }
              if (unique_course_id.has(section_info.course._id.toString())) {
                Logger.error(`Section is of an already found course`, `\t`)
                return false
              }
              unique_course_id.add(section_info.course._id.toString())
              return true

            })


            res.json({
              success: true,
              sections: true_sections
            })
          })
        }
      })

      // user_sections = []
      // Section.find((error, sections) => {
      //   sections.forEach((section) => {
      //     section.students.forEach((student) => {
      //       if(student._id == user_id)
      //         user_sections.push(section)
      //     })
      //   })
      //   let counter = 0
      //   user_sections.forEach((user_section) => {
      //     Course.findById(user_section.course, function (course_error, course){
      //       if(course_error)
      //         res.json(course_error);
      //       else
      //         user_section.course = course
      //       counter++
      //       if(counter === user_sections.length)
      //         res.json(user_sections)
      //     })
      //   })
      // })

    }
  })
})

sectionRoutes.get('/get_with_course/:section_id', verifyToken, (req, res) => {
  let section_id = req.params.section_id
  jwt.verify(req.token, 'the_secret_key', err => {
    if(err) {
      res.sendStatus(401).send("Unauthorized access")
    } else {

      Section.findById(section_id, function (err, section){
        if(err) {
          res.json(err);
        }else {
          Course.findById(section.course, function(error, course) {
            if(error) {
              res.json(error)
            } else {
              section.course = course
              res.json(section)
            }
          })
        }
      });
    }
  })
})

sectionRoutes.get('/get_for_course/:course_id', verifyToken, (req, res) => {
  let course_id = req.params.course_id
  jwt.verify(req.token, 'the_secret_key', err => {
    if(err) {
      res.sendStatus(401).send("Unauthorized access")
    } else {
      Section.find((error, sections) => {
        if(error) {
          res.json(error)
        } else {
          let course_sections = []
          sections.forEach(section => {
            if(section.course == course_id)
              course_sections.push(section)
          })
          res.json(course_sections)
        }
      })
    }
  })
})

module.exports = sectionRoutes;
