let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserController = require('../controller/UserController');

module.exports = (passport) => {

  router.get('/login', (req, res) => {
		res.render('auth/login');
  });

  router.post('/login', async (req, res, next) => {
    let loginUser = await UserController.login(passport, req, res);
    res.send(loginUser)
  });

  router.get('/signup', (req, res) => {
  		res.render('auth/signup');
  });

  router.post('/signup', async (req, res, next) => {
    await passport.authenticate('signup', { session: true },  (err, signup, message) => {
      if (err) return next(err);
      return res.send({"message": message });
    })(req, res, next);
   });



  router.get('/me', async (req, res) => {
		let token = req.headers['token'];
		if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

		await jwt.verify(token, 'secret101', (err, decoded) => {
    	if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    	res.status(200).send(decoded);
  	});
  });


  router.get('/logout', async(req, res) => {
    let token = req.headers['token'];
		if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
		await jwt.verify(token, 'secret101', (err, decoded) => {
    	if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      req.session.destroy();
      res.status(200).send({"message": "Congratulations, You have successfully logged out."});
  	});
  });

	return router;
}
