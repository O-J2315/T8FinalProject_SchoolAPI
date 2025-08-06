const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");
//const authenticateJWT = require('../middlewares/jwtAuth');

// GET routes
router.get(
    "/",
    /*  #swagger.tags = ["Courses"]
     */
    courseController.getCourses
);

// GET single course by courseId
router.get(
    "/:id",
    /*  #swagger.tags = ["Courses"]
     */
    courseController.getCourseById
);

// Post route
router.post(
    "/",
    /*  #swagger.tags = ["Courses"]
     */
    ensureAuthenticated,
    courseController.createCourse
);

// Put route
router.put(
    "/:id",
    /*  #swagger.tags = ["Courses"]
     */
    ensureAuthenticated,
    courseController.updateCourse
);

// Delete route
router.delete(
    "/:id",
    /*  #swagger.tags = ["Courses"]
     */
    ensureAuthenticated,
    courseController.deleteCourse
);

module.exports = router;
