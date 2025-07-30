const express = require('express');
const router = express.Router();
const { createStudent, updateStudent } = require('../controllers/studentController');
//const { studentValidationRules, validateStudent } = require('../middlewares/validateStudent');
//const authenticateJWT = require('../middlewares/authenticateJWT');

// Create new student (POST) — protected route
router.post('/', studentValidationRules(), validateStudent, createStudent);

// Update existing student (PUT) — protected route
router.put('/:studentId', studentValidationRules(), validateStudent, updateStudent);

module.exports = router;
