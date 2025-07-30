const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
//const authenticateJWT = require('../middlewares/authenticateJWT'); 

// Public routes (GET)
router.get('/', courseController.getCourses);
router.get('/:courseId', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.put('/:courseId', courseController.updateCourse);
router.delete('/:courseId', courseController.deleteCourse);

module.exports = router;
