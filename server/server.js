const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const config = require('./DB.js');
const jwt = require('jsonwebtoken');
const PORT = 4000;

function jwtVerify(req,res,next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    jwt.verify(req.token, process.env.AUTH_KEY, err => {
      if(err)
        res.sendStatus(401).send("Unauthorized access")
      else
        next()
    })
  } else {
    res.sendStatus(401)
  }
}

// get environment variabless when not in production
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: path.resolve(__dirname, '../variables.env') })

// ensure auth key is available in environment
if(!process.env.AUTH_KEY){
  res.status(500).send("Error")
  console.log("No auth key")
  return
}

const userRouter = require('./User/User.route')
const courseRouter = require('./Course/Course.route')
const sectionRouter = require('./Section/Section.route')
const eventRouter = require('./Event/Event.route')
const submissionRouter = require('./Submission/Submission.route')
const lectureRouter = require('./Lecture/Lecture.route')
const lectureSubmissionRouter = require('./LectureSubmission/LectureSubmission.route')
const pollRouter = require('./PlaybackPoll/PlaybackPoll.route')


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', jwtVerify, userRouter);
app.use('/courses', jwtVerify, courseRouter);
app.use('/sections', jwtVerify, sectionRouter);
app.use('/events', jwtVerify, eventRouter);
app.use('/submissions', jwtVerify, submissionRouter);
app.use('/lectures', jwtVerify, lectureRouter);
app.use('/polls', jwtVerify, pollRouter);
app.use('/lecturesubmissions', jwtVerify, lectureSubmissionRouter);

var fs = require('fs'),
  http = require('http');

http.createServer(function (req, res) {
 fs.readFile(__dirname + '/../public' + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(9000);

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});