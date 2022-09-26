const express = require('express');
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// app.js'de yönlendirme /courses üzerinden olduğu için route=courses/.. olur
router.route('/').post(categoryController.createCategory);

module.exports = router;