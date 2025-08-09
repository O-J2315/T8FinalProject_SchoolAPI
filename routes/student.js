const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");
// const { validateStudent } = require("../validations/studentValidation");
// const validate = require("../middleware/validate");

// GET all students (with optional filter)
router.get("/", studentController.getStudents);

// GET single student by studentId
router.get("/:studentId", studentController.getStudentById);

// POST create a new student with validation
router.post("/", ensureAuthenticated, studentController.createStudent);

// PUT update student by studentId with validation
router.put("/:studentId", ensureAuthenticated, studentController.updateStudent);

// DELETE student by studentId
router.delete(
    "/:studentId",
    ensureAuthenticated,
    studentController.deleteStudent
);

module.exports = router;
