const mongoose = require('mongoose');
require('mongoose-type-url');
const Schema = mongoose.Schema;

//let User = require('../User/User.model');

//Define collection and schema for User
let Agreement = new Schema({
    user_id: String,
    doc_id: String,
    date: String ,
    time: String
    //hope to change date & time to an actual date/time format
});

module.exports = mongoose.model('Agreement', Agreement);