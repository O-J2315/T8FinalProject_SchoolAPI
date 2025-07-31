const Teacher = require("../models/Teacher");

// GET all teachers or filter by deptId
exports.getTeachers = async (req, res) => {
    try {
        const { deptId } = req.query;
        const filter = {};
        if (deptId) filter.deptId = deptId;

        const teachers = await Teacher.find(filter);
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single teacher by teacherId
exports.getTeacherById = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findOne({ teacherId });
        if (!teacher)
            return res.status(404).json({ message: "Teacher not found" });
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create new teacher
exports.createTeacher = async (req, res) => {
    try {
        const { teacherId, firstName, lastName, email, deptId, courses } =
            req.body;

        const newTeacher = new Teacher({
            teacherId,
            firstName,
            lastName,
            email,
            deptId,
            courses,
        });

        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update teacher by teacherId
exports.updateTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const updateData = req.body;

        const updatedTeacher = await Teacher.findOneAndUpdate(
            { teacherId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTeacher)
            return res.status(404).json({ message: "Teacher not found" });
        res.json(updatedTeacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE teacher by teacherId
exports.deleteTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const deletedTeacher = await Teacher.findOneAndDelete({ teacherId });
        if (!deletedTeacher)
            return res.status(404).json({ message: "Teacher not found" });
        res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
