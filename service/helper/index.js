const jwt = require('jsonwebtoken');
// let Helpers = require('../service/helper');
let Helpers = {
    jwtSession : (user) => {
      return jwt.sign(user.toJSON(), 'secret101', {
          expiresIn: '15min'
      });
    }
}
module.exports = Helpers;
