var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
    // res.render('auth/login');
	//res.redirect('/passport-auth/login');
}



module.exports = function(passport){

  router.get('/login', function(req, res) {
		if(!req.user){
			res.render('auth/login');
		}else{
			res.send({objectId : req.user._id,username : req.user.username,fullname: req.user.fullname,email: req.user.email});
		}
  });

  router.get('/signup', function(req, res){
  		res.render('auth/signup');
  });

  router.post('/signup',function(req, res, next) {
    passport.authenticate('signup',{ session: true },function(err, signup, info) {
      if (err) {
        return next(err);
      }
      if (! signup) {
        var objRegister = {
          message: "failed",
          result: "failed",
          resultMessage: "Username or Email is already Exists"
          }
      }else{
        var objRegister = {
            message: "success",
            result: "success",
            resultMessage: "Congratulations, You have successfully registered to PassportJS"
        }
      }
      return res.send(objRegister);
    })(req, res, next);
   });



  router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({message : 'failed', resultMessage: "Invalid User"});
      }

      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        var objLoginSuccess = {
          message : 'success',
          user
        }
        return res.send(objLoginSuccess);
      });
    })(req, res, next);
  });


  router.get('/me', function(req, res){
  if(!req.user){
    var objMe = {message: "failed",result: "Please Login First"}
  }else{
    console.log("THIS IS MEEE-> " + req.user);
    var objMe = {
      message: "success",
      currentUser:{
        objectId : req.user._id,
        username : req.user.username,
        fullname: req.user.fullname,
        email: req.user.email
      }
    }
  }
    res.send(objMe);
  });


  router.get('/logout', function(req, res) {
    if(req.user){
      req.session.destroy();
      objLogout = {message: "success",resultMessage: "Congratulations, You have successfully logged out."}
    }else{
      objLogout = {message: "failed",resultMessage: "Failed to Logout! Make sure you're Logged in!"}
    }
    res.send(objLogout);
  });

	return router;
}
