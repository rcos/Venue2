const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const userRoute = require('./User/User.route')
const courseRoute = require('./Course/Course.route')
const sectionRoute = require('./Section/Section.route')
const eventRoute = require('./Event/Event.route')
const submissionRoute = require('./Submission/Submission.route')
const chalk = require('chalk')

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
 }).then(
  () => { console.log(`${chalk.blue('Database is connected!')}`) },
  err => { console.log(`${chalk.red(`Can not connect to the database ${err}`)}`) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/courses', courseRoute);
app.use('/sections', sectionRoute);
app.use('/events', eventRoute);
app.use('/submissions', submissionRoute);

app.listen(PORT, function () {
  console.log(`${chalk.green(`Server is running on port ${PORT}`)}`);
});
