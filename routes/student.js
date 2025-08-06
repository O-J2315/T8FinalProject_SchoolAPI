const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");

// GET all students (with optional filter)
router.get(
    "/",
    /*  #swagger.tags = ["Students"]
     */
    studentController.getStudents
);

// GET single student by id
router.get(
    "/:id",
    /*  #swagger.tags = ["Students"]
     */
    studentController.getStudentById
);

// POST create a new student
router.post(
    "/",
    /*  #swagger.tags = ["Students"]
     */
    ensureAuthenticated,
    studentController.createStudent
);

// PUT update student by id
router.put(
    "/:id",
    /*  #swagger.tags = ["Students"]
     */
    ensureAuthenticated,
    studentController.updateStudent
);

// DELETE student by id
router.delete(
    "/:id",
    /*  #swagger.tags = ["Students"]
     */
    ensureAuthenticated,
    studentController.deleteStudent
);

module.exports = router;
