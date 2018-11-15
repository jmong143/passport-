var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');


const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
module.exports = function(passport){
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'secret101'
    },
    function (jwtPayload, cb) {
console.log("HERE===> " + JSON.stringify(jwtPayload))
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        User.findOne({ '_id' :  jwtPayload._id }, function(err, user) {
          // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>..." + user)
          return cb(null, user)
        });
        // return User.findOneById({"_id": jwtPayload._id})
        //     .then(user => {
        //       console.log("SUCCESS===> " + user)
        //         return cb(null, user);
        //     })
        //     .catch(err => {
        //       console.log("ERROR===> " + err)
        //         return cb(err);
        //     });
    }
));

}
