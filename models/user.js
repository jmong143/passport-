let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  username: { type: String, required: true},
  password: { type: String, required: true },
  fullname: String,
  email: String,
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});

let User = mongoose.model('User', userSchema);
module.exports = User;
