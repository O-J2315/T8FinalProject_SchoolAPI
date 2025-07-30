const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET all students (with optional filter)
router.get('/', studentController.getStudents);

// GET single student by studentId
router.get('/:studentId', studentController.getStudentById);

// POST create a new student
router.post('/', studentController.createStudent);

// PUT update student by studentId
router.put('/:studentId', studentController.updateStudent);

// DELETE student by studentId
router.delete('/:studentId', studentController.deleteStudent);

module.exports = router;
