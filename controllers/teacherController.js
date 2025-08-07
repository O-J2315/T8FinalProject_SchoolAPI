const Teacher = require("../models/Teacher");
const Department = require("../models/Department");
const Course = require("../models/Course");

// GET all teachers or filter by deptId
exports.getTeachers = async (req, res) => {
    try {
        const { deptId } = req.query;
        const filter = {};
        if (deptId) filter.deptId = deptId;

        const teachers = await Teacher.find(filter)
            .populate("dept", "deptId deptName")
            .populate("courses", "courseId courseName");

        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single teacher by teacherId
exports.getTeacherById = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findOne({ teacherId })
            .populate("dept", "deptId deptName")
            .populate("courses", "courseId courseName");

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

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

        //Check if teacherId already exists
        const existing = await Teacher.findOne({ teacherId });
        if (existing) {
            return res
                .status(400)
                .json({ message: "Teacher ID already exists" });
        }

        // Resolve dept reference via deptId
        const department = await Department.findOne({ deptId });
        if (!department) {
            return res.status(400).json({ message: "Invalid department ID" });
        }

        // Resolve courses references
        let courseRefs = [];
        if (courses && courses.length > 0) {
            const courseDocs = await Course.find({
                courseId: { $in: courses },
            });
            if (courseDocs.length !== courses.length) {
                return res
                    .status(400)
                    .json({ message: "One or more invalid course IDs" });
            }
            courseRefs = courseDocs.map((c) => c._id);
        }

        const newTeacher = new Teacher({
            teacherId,
            firstName,
            lastName,
            email,
            deptId,
            dept: department._id, // reference to Department
            courses: courseRefs, // reference to Course
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

        // Resolve dept reference if updating deptId
        if (updateData.deptId) {
            const department = await Department.findOne({
                deptId: updateData.deptId,
            });
            if (!department) {
                return res
                    .status(400)
                    .json({ message: "Invalid department ID" });
            }
            updateData.dept = department._id; // updated to actual reference
        }

        // Resolve course references if updating courses
        if (Array.isArray(updateData.courses)) {
            if (updateData.courses.length > 0) {
                const courseDocs = await Course.find({
                    courseId: { $in: updateData.courses },
                });
                if (courseDocs.length !== updateData.courses.length) {
                    return res
                        .status(400)
                        .json({ message: "One or more invalid course IDs" });
                }
                updateData.courses = courseDocs.map((c) => c._id); // update to actual reference
            } else {
                updateData.courses = []; // clear if passed as empty
            }
        }

        const updatedTeacher = await Teacher.findOneAndUpdate(
            { teacherId },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

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

        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
