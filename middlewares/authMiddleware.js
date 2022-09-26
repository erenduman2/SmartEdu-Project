const session = require('express-session');
const User = require('../models/User');

module.exports = function(req, res, next) {
  // const user = User.findById(req.session.userID);
  // if (!user) {
  //   res.redirect('/login');
  // }
  if (!req.session.userID) {
    res.redirect('/login');
  }
  next();
};
