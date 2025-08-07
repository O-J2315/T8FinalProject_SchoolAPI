const Student = require("../models/Student");
const Course = require("../models/Course");
const Department = require("../models/Department");

// GET all students or filter by status or major
exports.getStudents = async (req, res) => {
    try {
        const { status, major } = req.query;
        const filter = {};

        if (status) filter.status = status;

        // If filtering by deptId for major
        if (major) {
            const department = await Department.findOne({ deptId: major });
            if (!department) {
                return res
                    .status(404)
                    .json({ message: "Invalid major(deptId)" });
            }
            filter.major = department._id;
        }

        const students = await Student.find(filter)
            .populate("major", "deptId deptName")
            .populate("courses", "courseId courseName");
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single student by studentId
exports.getStudentById = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOne({ studentId })
            .populate("major", "deptId deptName")
            .populate("courses", "courseId courseName");

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create a new student
exports.createStudent = async (req, res) => {
    try {
        const {
            studentId,
            firstName,
            lastName,
            email,
            major, // deptId
            status,
            GPA,
            enrollmentDate,
            courses,
        } = req.body;

        const existing = await Student.findOne({ studentId });
        if (existing) {
            return res
                .status(400)
                .json({ message: "Student ID already exists" });
        }

        // Resolve major reference via deptId
        const department = await Department.findOne({ deptId: major });
        if (!department) {
            return res
                .status(404)
                .json({ message: "Invalid department ID for major" });
        }

        // Resolve courses references via courseIds
        let courseRefs = [];
        if (courses && courses.length > 0) {
            const courseDocs = await Course.find({
                courseId: { $in: courses },
            });
            if (courseDocs.length !== courses.length) {
                return res
                    .status(404)
                    .json({ message: "One or more invalid course IDs" });
            }
            courseRefs = courseDocs.map((c) => c._id);
        }

        const newStudent = new Student({
            studentId,
            firstName,
            lastName,
            email,
            major: department._id,
            status,
            GPA,
            enrollmentDate,
            courses: courseRefs,
        });

        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update existing student by studentId
exports.updateStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const updateData = req.body;

        // Resolve major reference via deptId if updating major
        if (updateData.major) {
            const department = await Department.findOne({
                deptId: updateData.major,
            });
            if (!department) {
                return res
                    .status(404)
                    .json({ message: "Invalid department ID for major" });
            }
            updateData.major = department._id;
        }

        // Resolve courses references via courseIds if updating courses
        if (Array.isArray(updateData.courses)) {
            if (updateData.courses.length > 0) {
                const courseDocs = await Course.find({
                    courseId: { $in: updateData.courses },
                });
                if (courseDocs.length !== updateData.courses.length) {
                    return res
                        .status(404)
                        .json({ message: "One or more invalid course IDs" });
                }
                updateData.courses = courseDocs.map((c) => c._id);
            } else {
                updateData.courses = []; // clear if passed as empty
            }
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { studentId },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a student by studentId
exports.deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const deletedStudent = await Student.findOneAndDelete({ studentId });
        if (!deletedStudent)
            return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
