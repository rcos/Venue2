const express = require('express');
const userRoutes = express.Router();
const jwt = require('jsonwebtoken');

let User = require('./User.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');

userRoutes.route('/signup').post(function (req, res) {
  let user = new User(req.body.user)
  user.save()
    .then(() => {
      const token = jwt.sign({ user }, process.env.AUTH_KEY)
      res.status(200).json({token, user});
    })
    .catch(() => {
      res.status(400).send("unable to save user to database");
    });
});

userRoutes.route('/login').post(function (req, res) {
  let user = req.body.user
  if(user){
    User.findOne({ email: user.email, password: user.password }, function(error, current_user) {
      if(error || !current_user){
        console.log("Error unable to find user: " + user)
        res.status(404).json({ error: 'Invalid Login Credentials. Please try again' })
      }
      else {
        const token = jwt.sign({ current_user }, process.env.AUTH_KEY)
        res.json({token, current_user})
      }
    })
  }else{
    // console.log("Entered error block")
    res.status(400).json({ error: 'Invalid login. Please try again.' })
  }
});

userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body.user);
  user.save()
    .then(() => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(400).send("unable to save user to database");
    });
});

userRoutes.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'the_secret_key', err => {
    if(err) {
      res.sendStatus(401).send("Unauthorized access")
    } else {
      User.find(function(err, users){
        if(err){
          res.json(err);
        }else {
          res.json(users);
        }
      })
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

module.exports = userRoutes;