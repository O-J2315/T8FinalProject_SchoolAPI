const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");

// GET all departments
router.get(
    "/",
    /*  #swagger.tags = ["Departments"]
        #swagger.summary = "Get all departments"
        #swagger.description = "Retrieves all departments from the database."
        #swagger.responses[200] = {
            description:"Departments retrieved successfully",
            schema: { $ref: "#/definitions/DepartmentsResponse" }
        }
    */
    departmentController.getDepartments
);

// GET single department by deptId
router.get(
    "/:deptId",
    /*  #swagger.tags = ["Departments"]
        #swagger.summary = "Get a department by ID"
        #swagger.description = "Retrieves a single department by its ID from the database."
        #swagger.parameters["deptId"] = {
            in: "path",
            description: "Deparment ID to retrieve",
            required: true,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Department retrieved successfully",
            schema: { $ref: "#/definitions/DepartmentResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Department with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    departmentController.getDepartmentById
);

// POST create new department
router.post(
    "/",
    /*  #swagger.tags = ["Departments"]
        #swagger.summary = "Create a new department"
        #swagger.description = "Create a new department in the database."
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/DepartmentInput" }
                }
            }
        }
        #swagger.responses[201] = {
            description: "Department created successfully",
            schema: { $ref: "#/definitions/DepartmentResponse" }
        }
        #swagger.responses[400] = {
            description: "Bad request - Invalid input data",
            schema: { $ref: "#/definitions/ValidationErrorResponse" }
        }
        #swagger.responses[409] = {
            description: "Conflict - Department with same ID already exists",
            schema: { $ref: "#/definitions/ConflictErrorResponse" }
        }
    */
    ensureAuthenticated, departmentController.createDepartment
);

// PUT update department by deptId
router.put(
    "/:deptId",
    /*  #swagger.tags = ["Departments"]
        #swagger.summary = "Update an existing department"
        #swagger.description = "Update an existing department by its ID."
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/DepartmentInput" }
                }
            }
        }
        #swagger.responses[200] = {
            description: "Department updated successfully",
            schema: { $ref: "#/definitions/DepartmentResponse" }
        }
        #swagger.responses[400] = {
            description: "Bad request - Invalid input data",
            schema: { $ref: "#/definitions/ValidationErrorResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Department with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    departmentController.updateDepartment
);

// DELETE department by deptId
router.delete(
    "/:deptId",
    /*  #swagger.tags = ["Departments"]
        #swagger.summary = "Delete an existing department"
        #swagger.description = "Delete a department by its ID from the database."
        #swagger.parameters['deptId'] = {
            in: "path",
            description: "Deparment ID to delete",
            required: true,
            type: "string"
        }
        #swagger.responses[200] = {
            description: "Department deleted successfully",
            schema: { $ref: "#/definitions/DepartmentResponse" }
        }
        #swagger.responses[404] = {
            description: "Not found - Department with specified ID does not exist",
            schema: { $ref: "#/definitions/NotFoundErrorResponse" }
        }
    */
    departmentController.deleteDepartment
);

module.exports = router;
