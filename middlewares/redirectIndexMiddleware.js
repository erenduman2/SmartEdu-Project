module.exports = function(req, res, next) {
  if (req.session.userID) {
    res.redirect('/');
  }
  next();
};
