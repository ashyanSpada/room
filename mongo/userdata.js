const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user')
let userSchema = mongoose.Schema({
  username: String,
  email: String,
  phoneno: String,
  password: String,
  friendlist: Array,
  roomlist: Array
})
userSchema.methods.addFrind = (friendname) => {
  this.friendlist.push(friendname)
}
let user = mongoose.model('userdata', userSchema);
module.exports = user
