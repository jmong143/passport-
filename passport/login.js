var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');


const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function(passport){
	passport.use('login', new LocalStrategy({
  	passReqToCallback : true
  },
  function(req, username, password, done) {
  	User.findOne({ 'username' :  username }, function(err, user) {
      	if (err)
        	return done(err);
        if (!user){
        	console.log('User Not Found with username '+ username);
          return done(null, false, 'Invalid username of password');
        }
        if (!isValidPassword(user, password)){
        	console.log('Invalid Password');
          return done(null, false, 'Invalid Password');
        }
        return done(null, user, 'Successfuly Logged In');
      }
    );
  })
);




	var isValidPassword = function(user, password){
  	return bCrypt.compareSync(password, user.password);
  }

}
