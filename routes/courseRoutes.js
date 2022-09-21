const express = require('express');
const courseController = require("../controllers/courseController");

const router = express.Router();

// app.js'de yönlendirme /courses üzerinden olduğu için route=courses/.. olur
router.route('/').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);

module.exports = router;