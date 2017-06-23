// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var userSchema = new Schema({
  name: String,
  //username: { type: String, required: true, unique: true },
  username: { type: String, required: true},
  password: { type: String, required: true },
  fullname: String,
  email: String,
  createdAt : {type: Date, default: Date.now},
  updatedAt : {type: Date, default: Date.now}
});


userSchema.statics.userKill = function(){
  return "USER KILL!!!";
};

var User = mongoose.model('User', userSchema);
module.exports = User;
