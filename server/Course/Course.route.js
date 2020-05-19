const express = require('express');
const courseRoutes = express.Router();

let Course = require('./Course.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');

courseRoutes.route('/add').post(function (req, res) {
  let course = new Course(req.body.course);
  course.save()
    .then(() => {
      res.status(200).json(course);
    })
    .catch(() => {
      res.status(400).send("unable to save course to database");
    });
});

courseRoutes.route('/').get(function (req, res) {
  Course.find(function (err, courses) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(courses);
    }
  });
});

courseRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Course.findById(id, function (err, course) {
    if (err) {
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
      instructor: updated_course.instructor
    },
    function (err, course) {
      if (!course)
        res.status(404).send("section not found");
      res.json(course);
    }
  );
});

courseRoutes.route('/delete/:id').delete(function (req, res) {
  Course.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

//Todo: change the id being passed to just be the instructor id
//and search for the instructor or remove this function entirely and use
//the userapis get user function
courseRoutes.route('/getInstructor/:id').get(function (req, res) {
  let id = req.params.id;
  Course.findById(id, function (err, course) {
    if (err) {
      res.json(err);
    }
    let instructor_id = course.instructor;
    User.findById(instructor_id, function (error, instructor) {
      if (error)
        res.json(error);
      res.json(instructor);
    });
  });
});

courseRoutes.route('/get_instructor_courses/:user_id').get(function (req, res) {
  let user_id = req.params.user_id;
  Course.find({instructor: user_id}, function(err, instructor_courses) {
    if(err) {
      res.json(err)
    } else {
      res.json(instructor_courses)
    }
  })
});

courseRoutes.route('/get_students_for_course/:course_id').get(function (req, res) {
  let course_id = req.params.course_id;
  Section.find({course: course_id}, function(err, sections) {
    if(err) {
      res.json(err)
    } else {
      let students = []
      sections.forEach(section => {
        students.push(new Promise((resolve,reject) => {
          User.find({_id: {$in: section.students}},function(err,studs) {
            if(err || studs == null) {
              resolve(null)
            } else {
              resolve(studs)
            }
          })
        }))
      })
      Promise.all(students)
      .then(resolved => {
        resolved = resolved.filter(stud => stud != null)
        let studs = new Map()
        let ret = []
        resolved.forEach(section => {
          section.forEach(student => {
            if(!studs[student._id]) {
              studs[student._id] = student
              ret.push(student)
            }
          })
        })
        res.json(ret)
      })
    }
  })
});

module.exports = courseRoutes;