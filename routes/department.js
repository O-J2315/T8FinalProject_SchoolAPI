const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { ensureAuthenticated } = require("../middleware/sessionAuth");
// const { validateDepartment } = require("../validations/departmentValidation");
// const validate = require("../middleware/validate");

// GET all departments
router.get("/", departmentController.getDepartments);

// GET single department by deptId
router.get("/:deptId", departmentController.getDepartmentById);

// POST create new department with validation
router.post("/", ensureAuthenticated, departmentController.createDepartment);

// PUT update department by deptId with validation
router.put(
    "/:deptId",
    ensureAuthenticated,
    departmentController.updateDepartment
);

// DELETE department by deptId
router.delete(
    "/:deptId",
    ensureAuthenticated,
    departmentController.deleteDepartment
);

module.exports = router;
