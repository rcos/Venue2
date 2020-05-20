const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

let User = require('./User.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');

userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body.user);
  console.log("password before: " + user.password)
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    user.password = hash
    console.log("password after: " + user.password)
    user.save()
      .then(() => {
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(400).send("unable to save user to database");
      });
  });
});

userRoutes.get('/', (req, res) => {
  User.find(function(err, users){
    if(err){
      res.json(err);
    }else {
      res.json(users);
    }
  })
})

userRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      if(err) {
        res.json(err);
      }
      res.json(user);
  });
});

userRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  let updated_user = req.body.updated_user;
  User.findByIdAndUpdate(id, 
    {
      first_name: updated_user.first_name,
      last_name: updated_user.last_name,
      email: updated_user.email,
      password: updated_user.password,
      is_instructor: updated_user.is_instructor,
      ta_sections: updated_user.ta_sections,
      submissions: updated_user.submissions
    },
    function(err, user) {
      if (!user)
        res.status(404).send("user not found");
      res.json(user);    
    }
  );
});

userRoutes.route('/delete/:id').delete(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

userRoutes.route('/instructors').get(function (req, res) {
    User.find(function(err, users){
    if(err){
      res.json(err);
    }else {
      let instructors = [];
      users.forEach(user => {
        if(user.is_instructor)
          instructors.push(user);
      });
      res.json(instructors);
    }
  });
});

userRoutes.route('/students').get(function (req, res) {
    User.find(function(err, users){
    if(err){
      res.json(err);
    }else {
      let students = [];
      users.forEach(user => {
        if(!user.is_instructor)
          students.push(user);
      });
      res.json(students);
    }
  });
});

userRoutes.route('/instructor_courses/:id').get(function (req, res) {
  let instructor_id = req.params.id;
  console.log("instructor_id: " + instructor_id);
  Course.find(function(err, courses){
    if(err)
      res.json(err);
    let instructor_courses = []
    courses.forEach((course) => {
      if(typeof course.instructor !== 'undefined' && course.instructor._id == instructor_id)
        instructor_courses.push(course);
    });
    res.json(instructor_courses);
  });
});

userRoutes.route('/instructor_courses/:id').get(function (req, res) {
  let instructor_id = req.params.id;
  Course.find(function(err, courses){
    if(err)
      res.json(err);
    let instructor_courses = []
    courses.forEach((course) => {
      if(typeof course.instructor !== 'undefined' && course.instructor._id == instructor_id)
        instructor_courses.push(course);
    });
    res.json(instructor_courses);
  });
});

userRoutes.route('/student_sections/:id').get(function (req, res) {
  let student_id = req.params.id;
  Section.find(function(err, sections){
    if(err)
      res.json(err);
    let student_sections = []
    sections.forEach((section) => {
      section.students.forEach((section_student) => {
        if(section_student._id == student_id){
          student_sections.push(section);
        }else{
          console.log("Section student id: " + section_student._id + " != " + student_id);
        }
      });
    });
    console.log("Student sections: " + student_sections);
    res.json(student_sections);
  });
});

userRoutes.route('/students_for_course/:course_id').get(function (req, res) {
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

module.exports = userRoutes;