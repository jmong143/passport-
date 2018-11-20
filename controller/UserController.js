let Helpers = require('../service/helper');

let UserController = {
    login : (passport, req, res) => {
      return new Promise( (resolve, reject) => {
          passport.authenticate('login', (err, user, message) => {
              if (err) reject(err);
              if(! user) reject(message);
              req.login(user, {session: false}, loginErr => {
                if (loginErr) {
                  reject(loginErr) ;
                }
                let token = Helpers.jwtSession(user);
                resolve({message, user, token})
              });
          })(req, res);
      });
    }
}
module.exports = UserController;
