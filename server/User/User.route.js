const express = require('express');
const userRoutes = express.Router();

let user_models = require('./User.model');
let User = user_models.User;
let Student = user_models.Student;
let Instructor = user_models.Instructor;

userRoutes.route('/add').post(function (req, res) {
  let new_user = req.body.user;
  let user;
  if(new_user.is_instructor)
    user = new Instructor(new_user);
  else
    user = new Student(new_user);

  user.save()
    .then(() => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(400).send("unable to save user to database");
  });
});

userRoutes.route('/').get(function (req, res) {
    User.find(function(err, users){
    if(err){
      res.json(err);
    }
    else {
      res.json(users);
    }
  });
});

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
  console.log("courses outside: " + updated_user.courses);

  if(updated_user.is_instructor){
  console.log("courses inside: " + updated_user.courses);

    Instructor.findByIdAndUpdate(id, 
      {
        first_name: updated_user.first_name,
        last_name: updated_user.last_name,
        email: updated_user.email,
        password: updated_user.password,
        is_instructor: updated_user.is_instructor,
        courses: updated_user.courses,
      },
      function(err, user) {
        if (!user)
          res.status(404).send("user not found");
        res.json(user);    
      }
    );

  }else{

    Student.findByIdAndUpdate(id, 
      {
        first_name: updated_user.first_name,
        last_name: updated_user.last_name,
        email: updated_user.email,
        password: updated_user.password,
        is_instructor: updated_user.is_instructor,
        courses: updated_user.courses,
        ta_sections: updated_user.ta_sections,
        submissions: updated_user.submissions
      },
      function(err, user) {
        if (!user)
          res.status(404).send("user not found");
        res.json(user);    
      }
    );

  }
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

module.exports = userRoutes;