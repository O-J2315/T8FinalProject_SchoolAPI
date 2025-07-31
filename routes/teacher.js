const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

// GET all teachers (with optional filter by deptId)
router.get(
    "/",
    /*  #swagger.tags = ["Teachers"]
        #swagger.summary = "Get all teachers"
        #swagger.description = "Retrieve all teachers, optionally filtering by department ID."
        #swagger.parameters["deptId"] = {
            in: "query",
            description: "Filter by department ID",
            required: false,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Teachers retrieved successfully",
            schema: { $ref: "#/definitions/TeachersResponse" }
        }
    */
    teacherController.getTeachers
);

// GET single teacher by teacherId
router.get(
    "/:teacherId",
    /*  #swagger.tags = ["Teachers"]
        #swagger.summary = "Get a teacher by ID"
        #swagger.description = "Retrieve a single teacher by their ID from the database."
        #swagger.parameters["teacherId"] = {
            in: "path",
            description: "Teacher ID to retrieve",
            required: true,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Teacher retrieved successfully",
            schema: { $ref: "#/definitions/TeacherResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Teacher with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    teacherController.getTeacherById
);

// POST create new teacher
router.post(
    "/",
    /*  #swagger.tags = ["Teachers"]
        #swagger.summary = "Create a new teacher"
        #swagger.description = "Create a new teacher in the database."
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/TeacherInput" }
                }
            }
        }
        #swagger.responses[201] = {
            description: "Teacher created successfully",
            schema: { $ref: "#/definitions/TeacherResponse" }
        }
        #swagger.responses[400] = {
            description: "Bad request - Invalid input data",
            schema: { $ref: "#/definitions/ValidationErrorResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Department with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
        #swagger.responses[409] = {
            description: "Conflict - Teacher with same ID already exists",
            schema: { $ref: "#/definitions/ConflictErrorResponse" }
        }
    */
    teacherController.createTeacher
);

// PUT update teacher by teacherId
router.put(
    "/:teacherId",
    /*  #swagger.tags = ["Teachers"]
        #swagger.summary = "Update an existing teacher"
        #swagger.description = "Update an existing teacher by their ID."
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/TeacherInput" }
                }
            }
        }
        #swagger.responses[200] = {
            description: "Teacher updated successfully",
            schema: { $ref: "#/definitions/TeacherResponse" }
        }
        #swagger.responses[400] = {
            description: "Bad request - Invalid input data",
            schema: { $ref: "#/definitions/ValidationErrorResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Department / Teacher with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    teacherController.updateTeacher
);

// DELETE teacher by teacherId
router.delete(
    "/:teacherId",
    /*  #swagger.tags = ["Teachers"]
        #swagger.summary = "Delete an existing teacher"
        #swagger.description = "Delete a teacher by their ID from the database,"
        #swagger.parameters["teacherId"] = {
            in: "path",
            description: "Teacher ID to delete",
            required: true,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Teacher deleted successfully",
            schema: { $ref: "#/definitions/TeacherResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Teacher with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    teacherController.deleteTeacher
);

module.exports = router;
