const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");
const { validateStudent } = require("../validations/studentValidation");
const validate = require("../middleware/validate");

// GET all students (with optional filter)
router.get(
    "/",
    /*  #swagger.tags = ["Students"]
        #swagger.summary = "Get all students"
        #swagger.description = "Retrieve all students, optionally filtering by enrollment status or major."
        #swagger.parameters["status"] = {
            in: "query",
            name: "status",
            description: "Filter students by enrollment status (active, graduated, withdrawn)",
            required: false,
            type: "string",
            enum: ["active", "graduated", "withdrawn"],
            default: "active"
        }
        #swagger.parameters["major"] = {
            in: "query",
            description: "Filter students by major",
            required: false,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Students retrieved successfully",
            schema: { $ref: "#/definitions/StudentsResponse" }
        }
    */
    studentController.getStudents
);

// GET single student by studentId
router.get(
    "/:studentId",
    /*  #swagger.tags = ["Students"]
        #swagger.summary = "Get a student by ID"
        #swagger.description = "Retrieve a single student by their ID from the database."
        #swagger.parameters["studentId"] = {
            in: "path",
            description: "Student ID to retrieve",
            required: true,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Student retrieved successfully",
            schema: { $ref: "#/definitions/StudentResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Student with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    studentController.getStudentById
);

// POST create a new student with validation
router.post(
    "/",
    validate(validateStudent),
    /*  #swagger.tags = ["Students"]
        #swagger.summary = "Create a new student"
        #swagger.description = "Create a new student in the database."
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/StudentInput" }
                }
            }
        }
        #swagger.responses[201] = {
            description: "Student created successfully",
            schema: { $ref: "#/definitions/StudentResponse" }
        }
        #swagger.responses[400] = {
            description: "Bad request - Invalid or missing input data",
            schema: { $ref: "#/definitions/ValidationErrorResponse" }
        }
        #swagger.responses[401] = {
            description: "Unauthorized - User must be authenticated to create a student",
            schema: { $ref: "#/definitions/AuthenticationErrorResponse" }
        }
        #swagger.responses[409] = {
            description: "Conflict - Student with specified ID or email already exists",
            schema: { $ref: "#/definitions/ConflictErrorResponse" }
        }
    */
    ensureAuthenticated,
    studentController.createStudent
);

// PUT update student by studentId with validation
router.put(
    "/:studentId",
    validate(validateStudent),
    /*  #swagger.tags = ["Students"]
        #swagger.summary = "Update an existing student"
        #swagger.description = "Update an existing student by their ID."
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/StudentInput" }
                }
            }
        }
        #swagger.responses[200] = {
            description: "Student updated successfully",
            schema: { $ref: "#/definitions/StudentResponse" }
        }
        #swagger.responses[400] = {
            description: "Bad request - Invalid or missing input data",
            schema: { $ref: "#/definitions/ValidationErrorResponse" }
        }
        #swagger.responses[401] = {
            description: "Unauthorized - User must be authenticated to update a student",
            schema: { $ref: "#/definitions/AuthenticationErrorResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Student with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    ensureAuthenticated,
    studentController.updateStudent
);

// DELETE student by studentId
router.delete(
    "/:studentId",
    /*  #swagger.tags = ["Students"]
        #swagger.summary = "Delete an existing student"
        #swagger.description = "Delete an existing student by their ID from the database."
        #swagger.parameters["studentId"] = {
            in: "path",
            description: "Student ID to delete",
            required: true,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Student deleted successfully",
            schema: { $ref: "#/definitions/StudentResponse" }
        }
        #swagger.responses[401] = {
            description: "Unauthorized - User must be authenticated to delete a student",
            schema: { $ref: "#/definitions/AuthenticationErrorResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Student with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    ensureAuthenticated,
    studentController.deleteStudent
);

module.exports = router;
