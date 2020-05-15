const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const config = require('./DB.js');
const PORT = 4000;

const userRouter = require('./User/User.route')
const courseRouter = require('./Course/Course.route')
const sectionRouter = require('./Section/Section.route')
const eventRouter = require('./Event/Event.route')
const submissionRouter = require('./Submission/Submission.route')
const lectureRouter = require('./Lecture/Lecture.route')
const pollRouter = require('./LecturePoll/LecturePoll.route')

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/sections', sectionRouter);
app.use('/events', eventRouter);
app.use('/submissions', submissionRouter);
app.use('/lectures', lectureRouter);
app.use('/polls', pollRouter);

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