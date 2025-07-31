const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
//const authenticateJWT = require('../middlewares/jwtAuth');

// GET routes
router.get("/", courseController.getCourses);
router.get("/:courseId", courseController.getCourseById);
// Post route
router.post("/", courseController.createCourse);
// Put route
router.put("/:courseId", courseController.updateCourse);
// Delete route
router.delete("/:courseId", courseController.deleteCourse);

module.exports = router;
