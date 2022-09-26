const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      // şifreler karşılaştırılır
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION
          req.session.userID = user._id; // session'da userID oluşturulur
          res.status(200).redirect('/users/dashboard');
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  // var olan session yok olur
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userID);
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
  });
};
