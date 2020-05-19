const express = require('express');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken');

let User = require('../User/User.model');

authRoutes.route('/signup').post(function (req, res) {
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

authRoutes.route('/login').post(function (req, res) {
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
    res.status(400).json({ error: 'Invalid login. Please try again.' })
  }
});

module.exports = authRoutes;