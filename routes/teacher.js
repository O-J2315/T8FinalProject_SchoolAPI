const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");
// const { validateTeacher } = require("../validations/teacherValidation");
// const validate = require("../middleware/validate");

// GET all teachers (with optional filter by deptId)
router.get("/", teacherController.getTeachers);

// GET single teacher by teacherId
router.get("/:teacherId", teacherController.getTeacherById);

// POST create new teacher with validation
router.post("/", ensureAuthenticated, teacherController.createTeacher);

// PUT update teacher by teacherId with validation
router.put("/:teacherId", ensureAuthenticated, teacherController.updateTeacher);

// DELETE teacher by teacherId
router.delete(
    "/:teacherId",
    ensureAuthenticated,
    teacherController.deleteTeacher
);

module.exports = router;
