const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// GET all departments
router.get("/", departmentController.getDepartments);

// GET single department by deptId
router.get("/:deptId", departmentController.getDepartmentById);

// POST create new department
router.post("/", departmentController.createDepartment);

// PUT update department by deptId
router.put("/:deptId", departmentController.updateDepartment);

// DELETE department by deptId
router.delete("/:deptId", departmentController.deleteDepartment);

module.exports = router;
