var LocalStrategy   = require('passport-local').Strategy;
var User = require('../../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
	passport.use('signup', new LocalStrategy({
  	passReqToCallback : true
  },
  function(req, username, password, done) {
		findOrCreateUser = function(){
    	User.findOne({$or: [{"username" : username}, {"email" : req.body.email}]}, function(err, user) {
      	if (err){
        	console.log('Error in SignUp: '+ err);
          return done(err);
        }
        if (user) {
          return done(null, false, 'User already exists');
        }else{
        	var newUser = new User();
          		newUser.username = username;
              newUser.password = createHash(password);
							newUser.fullname = req.body.fullname;
							newUser.email = req.body.email;
							newUser.createdAt = new Date();
							newUser.updatedAt = new Date();
              newUser.save(function(err) {
			        if (err){
			        	console.log('Error in Saving user: '+ err);
								return done(null, false, "Error in Saving User");
			        }
							return done(null, newUser, "Congratulations, You have successfully registered to PassportJS");
        		});
      		}
    	});
  	};
		process.nextTick(findOrCreateUser);
	})
);

	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}
