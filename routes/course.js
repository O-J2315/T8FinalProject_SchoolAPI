const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");

// GET routes
router.get("/", courseController.getCourses);

// GET single course by courseId
router.get("/:courseId", courseController.getCourseById);

// Post route with validation
router.post("/", ensureAuthenticated, courseController.createCourse);

// Put route with validation
router.put("/:courseId", ensureAuthenticated, courseController.updateCourse);

// Delete route
router.delete("/:courseId", ensureAuthenticated, courseController.deleteCourse);

module.exports = router;
