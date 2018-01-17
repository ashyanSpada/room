const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user');
var userSchema = mongoose.Schema({
  username: String,
  email: String,
  phoneno: String,
  password: String,
  friendlist: Array,
  roomlist: Array
});
var user = mongoose.model('userdata', userSchema);
module.exports = user;