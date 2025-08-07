const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { validateCourse } = require("../validations/courseValidation");
const validate = require("../middleware/validate");

// GET routes
router.get(
    "/",
    /*  #swagger.tags = ["Courses"]
     */
    courseController.getCourses
);

router.get(
    "/:courseId",
    /*  #swagger.tags = ["Courses"]
     */
    courseController.getCourseById
);

// Post route with validation
router.post(
    "/",
    validate(validateCourse),
    /*  #swagger.tags = ["Courses"]
     */
    courseController.createCourse
);

// Put route with validation
router.put(
    "/:courseId",
    validate(validateCourse),
    /*  #swagger.tags = ["Courses"]
     */
    courseController.updateCourse
);

// Delete route
router.delete(
    "/:courseId",
    /*  #swagger.tags = ["Courses"]
     */
    courseController.deleteCourse
);

module.exports = router;
