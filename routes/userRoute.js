const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/signup').post(authController.createUser); // .../users/signup
router.route('/login').post(authController.loginUser); // .../users/signup
router.route('/logout').get(authController.logoutUser); // .../users/signup
// önce middleware çalışır, kontrolü yapar; sonrasında getDashboardPage çalışır
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);

module.exports = router;
