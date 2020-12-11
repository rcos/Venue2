const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');
let Lecture = require('../Lecture/Lecture.model');

let Notification = new Schema({
  sender: String,
  type: String, 
  course_name: String,
  display_message: String,
  created: Date,
  unique_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  },
  users_sent: {
    type: Number, 
    default: 0
  },
  users_acknowledged: {
    type: Number,
    default: 0
  }
})
module.exports = mongoose.model('Notification', Notification);