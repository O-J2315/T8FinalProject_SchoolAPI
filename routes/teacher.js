const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

// GET all teachers (with optional filter by departmentId)
router.get("/", teacherController.getTeachers);

// GET single teacher by teacherId
router.get("/:teacherId", teacherController.getTeacherById);

// POST create new teacher
router.post("/", teacherController.createTeacher);

// PUT update teacher by teacherId
router.put("/:teacherId", teacherController.updateTeacher);

// DELETE teacher by teacherId
router.delete("/:teacherId", teacherController.deleteTeacher);

module.exports = router;
