const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');

let Notification = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
  },
  message: String,
  
  viewed: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
  
})
module.exports = mongoose.model('Notification', Notification);