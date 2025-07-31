const Department = require("../models/Department");

// GET all departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single department by deptId
exports.getDepartmentById = async (req, res) => {
    try {
        const { deptId } = req.params;
        const department = await Department.findOne({ deptId });
        if (!department)
            return res.status(404).json({ message: "Department not found" });
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create new department
exports.createDepartment = async (req, res) => {
    try {
        const { deptId, deptName, location, deptEmail } = req.body;

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
        const { deptId } = req.params;
        const updateData = req.body;

        const updatedDepartment = await Department.findOneAndUpdate(
            { deptId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedDepartment)
            return res.status(404).json({ message: "Department not found" });
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
        if (!deletedDepartment)
            return res.status(404).json({ message: "Department not found" });
        res.json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
