const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');
let Lecture = require('../Lecture/Lecture.model');

let Notification = new Schema({
  sender: {
    type: String,
		ref: 'User'
  },
  type: String, 
  display_message: String,
  created: Date,
  unique_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  },
  /*
  users_sent: Number
  */
  users_acknowledged: {
    type: Number,
    default: 0
  }
  /*,
  viewed: {
    type: Boolean,
    default: false
  } */

})
module.exports = mongoose.model('Notification', Notification);