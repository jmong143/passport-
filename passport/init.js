var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, callback) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);

            callback(err, user);
        });
    });

    login(passport);
    signup(passport);

}
