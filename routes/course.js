const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
//const authenticateJWT = require('../middlewares/jwtAuth');

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

// Post route
router.post(
    "/",
    /*  #swagger.tags = ["Courses"]
     */
    courseController.createCourse
);

// Put route
router.put(
    "/:courseId",
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
