const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// GET all students (with optional filter)
router.get(
    "/",
    /*  #swagger.tags = ["Students"]
     */
    studentController.getStudents
);

// GET single student by studentId
router.get(
    "/:studentId",
    /*  #swagger.tags = ["Students"]
     */
    studentController.getStudentById
);

// POST create a new student
router.post(
    "/",
    /*  #swagger.tags = ["Students"]
     */
    studentController.createStudent
);

// PUT update student by studentId
router.put(
    "/:studentId",
    /*  #swagger.tags = ["Students"]
     */
    studentController.updateStudent
);

// DELETE student by studentId
router.delete(
    "/:studentId",
    /*  #swagger.tags = ["Students"]
     */
    studentController.deleteStudent
);

module.exports = router;
