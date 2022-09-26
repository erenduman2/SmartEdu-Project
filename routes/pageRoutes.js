const express = require('express');
const pageController = require("../controllers/pageController");
const redirectIndexMiddleware = require('../middlewares/redirectIndexMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(redirectIndexMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectIndexMiddleware, pageController.getLoginPage);

module.exports = router;