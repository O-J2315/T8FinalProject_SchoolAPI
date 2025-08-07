const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");
//const authenticateJWT = require('../middlewares/jwtAuth');

// GET routes
router.get(
    "/",
    /*  #swagger.tags = ["Courses"]
        #swagger.summary = "Get all courses"
        #swagger.description = "Retrieve all courses, optionally filtering by department or teacher."
        #swagger.parameters["deptId"] = {
            in: "query",
            description: "Filter by department ID",
            required: false,
            type: "string"
        }
        #swagger.parameters["teacherId"] = {
            in: "query",
            description: "Filter by teacher ID",
            required: false,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Courses retrieved successfully",
            schema: { $ref: "#/definitions/CoursesResponse" }
        }
     */
    courseController.getCourses
);

// GET single course by courseId
router.get(
    "/:courseId",
    /*  #swagger.tags = ["Courses"]
        #swagger.summary = "Get a course by ID"
        #swagger.description = "Retrieve a single course by its ID from the database."
        #swagger.parameters["courseId"] = {
            in: "path",
            description: "Course ID to retrieve",
            required: true,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Course retrieved successfully",
            schema: { $ref: "#/definitions/CourseResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Course with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
     */
    courseController.getCourseById
);

// Post route
router.post(
    "/",
    /*  #swagger.tags = ["Courses"]
        #swagger.summary = "Create a new course"
        #swagger.description = "Create a new course in the database."
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/CourseInput" }
                }
            }
        }
        #swagger.responses[201] = {
            description: "Course created successfully",
            schema: { $ref: "#/definitions/CourseResponse" }
        }
        #swagger.responses[400] = {
            description: "Bad request - Invalid or missing input data",
            schema: { $ref: "#/definitions/ValidationErrorResponse" }
        }
        #swagger.responses[401] = {
            description: "Unauthorized - Authentication required to create a course",
            schema: { $ref: "#/definitions/AuthenticationErrorResponse" }
        }
        #swagger.responses[409] = {
            description: "Conflict - Course with specified ID already exists",
            schema: { $ref: "#/definitions/ConflictErrorResponse" }
        }
     */
    ensureAuthenticated,
    courseController.createCourse
);

// Put route
router.put(
    "/:courseId",
    /*  #swagger.tags = ["Courses"]
        #swagger.summary = "Update an existing course"
        #swagger.description = "Update an existing course by its ID."
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/CourseInput" }
                }
            }
        }
        #swagger.responses[200] = {
            description: "Course updated successfully",
            schema: { $ref: "#/definitions/CourseResponse" }
        }
        #swagger.responses[400] = {
            description: "Bad request - Invalid or missing input data",
            schema: { $ref: "#/definitions/ValidationErrorResponse" }
        }
        #swagger.responses[401] = {
            description: "Unauthorized - Authentication required to update a course",
            schema: { $ref: "#/definitions/AuthenticationErrorResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Course with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
     */
    ensureAuthenticated,
    courseController.updateCourse
);

// Delete route
router.delete(
    "/:courseId",
    /*  #swagger.tags = ["Courses"]
        #swagger.summary = "Delete an existing course"
        #swagger.description = "Delete an existing course by its ID."
        #swagger.parameters["courseId"] = {
            in: "path",
            description: "Course ID to delete",
            required: true,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Course deleted successfully",
            schema: { $ref: "#/definitions/CourseResponse" }
        }
        #swagger.responses[401] = {
            description: "Unauthorized - Authentication required to delete a course",
            schema: { $ref: "#/definitions/AuthenticationErrorResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Course with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
     */
    ensureAuthenticated,
    courseController.deleteCourse
);

module.exports = router;
