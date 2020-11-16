const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = require('../User/User.model');

let Notification = new Schema({
  sender: {
    type: String,
		ref: 'User'
  },
  type: String, 
  display_message: String,
  
  viewed: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  },
  redirect_to: String,

  users_sent: Number,
  users_acknowledged: Number

})
module.exports = mongoose.model('Notification', Notification);