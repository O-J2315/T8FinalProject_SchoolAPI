const Department = require("../models/Department");
const Joi = require("joi");

// Validation schemas
const departmentBaseSchema = {
    deptId: Joi.string().alphanum().min(2).max(20).required(),
    deptName: Joi.string().min(2).max(100).trim().required(),
    location: Joi.string().max(100).trim().required().disallow(""),
    deptEmail: Joi.string().email().lowercase().trim().required().disallow(""),
};

// Create schema - all required except location and deptEmail
const createDepartmentSchema = Joi.object({
    deptId: departmentBaseSchema.deptId.required(),
    deptName: departmentBaseSchema.deptName.required(),
    location: departmentBaseSchema.location.optional(),
    deptEmail: departmentBaseSchema.deptEmail.optional(),
});

// Update schema - all optional, but require at least one field
const updateDepartmentSchema = Joi.object(departmentBaseSchema).min(1);

// GET all departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } (error) => {
        res.status(404).json({ message: error.message });
    }
};

// GET single department by deptId
exports.getDepartmentById = async (req, res) => {
    try {
        const { deptId } = req.params;
        const department = await Department.findOne({ deptId });
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create new department
exports.createDepartment = async (req, res) => {
    try {
        // Validate request body with Joi
        const { error } = createDepartmentSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ errors: error.details.map((e) => e.message) });
        }

        const { deptId, deptName, location, deptEmail } = req.body;

        // Check if deptId exists
        const existing = await Department.findOne({ deptId });
        if (existing) {
            return res
                .status(400)
                .json({ message: "Department ID already exists" });
        }

        const newDepartment = new Department({
            deptId,
            deptName,
            location,
            deptEmail,
        });
        await newDepartment.save();

        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update department by deptId
exports.updateDepartment = async (req, res) => {
    try {
        // Validate update data
        const { error } = updateDepartmentSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ errors: error.details.map((e) => e.message) });
        }

        const { deptId } = req.params;
        const updateData = req.body;

        const updatedDepartment = await Department.findOneAndUpdate(
            { deptId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE department by deptId
exports.deleteDepartment = async (req, res) => {
    try {
        const { deptId } = req.params;
        const deletedDepartment = await Department.findOneAndDelete({ deptId });
        if (!deletedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
