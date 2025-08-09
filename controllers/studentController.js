const Student = require("../models/Student");
const Course = require("../models/Course");
const Department = require("../models/Department");
const Joi = require("joi");

// Validation schemas
const createStudentSchema = Joi.object({
    studentId: Joi.string().alphanum().min(3).max(20).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    major: Joi.string().alphanum().required(), // deptId
    status: Joi.string().valid("active", "inactive", "graduated").required(),
    GPA: Joi.number().min(0).max(4).required(),
    enrollmentDate: Joi.date().required(),
    courses: Joi.array().items(Joi.string().alphanum()).optional(),
});

const updateStudentSchema = Joi.object({
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    major: Joi.string().alphanum(), // deptId
    status: Joi.string().valid("active", "inactive", "graduated"),
    GPA: Joi.number().min(0).max(4),
    enrollmentDate: Joi.date(),
    courses: Joi.array().items(Joi.string().alphanum()),
}).min(1); // Require at least one field for update

const studentQuerySchema = Joi.object({
    status: Joi.string().valid("active", "inactive", "graduated").optional(),
    major: Joi.string().alphanum().optional(),
});

// GET all students or filter by status or major
exports.getStudents = async (req, res) => {
    try {
        // Joi validation for query params
        const { error } = studentQuerySchema.validate(req.query, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ errors: error.details.map((e) => e.message) });
        }

        const { status, major } = req.query;
        const filter = {};

        if (status) filter.status = status;

        if (major) {
            const department = await Department.findOne({ deptId: major });
            if (!department) {
                return res
                    .status(404)
                    .json({ message: "Invalid major (deptId)" });
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
        // Joi validation
        const { error } = createStudentSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ errors: error.details.map((e) => e.message) });
        }

        const {
            studentId,
            firstName,
            lastName,
            email,
            major,
            status,
            GPA,
            enrollmentDate,
            courses,
        } = req.body;

        // Check if studentId already exists
        const existing = await Student.findOne({ studentId });
        if (existing) {
            return res
                .status(400)
                .json({ message: "Student ID already exists" });
        }

        // Resolve major reference
        const department = await Department.findOne({ deptId: major });
        if (!department) {
            return res
                .status(404)
                .json({ message: "Invalid department ID for major" });
        }

        // Resolve courses
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
        res.status(500).json({ message: error.message });
    }
};

// PUT update existing student by studentId
exports.updateStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Joi validation
        const { error } = updateStudentSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ errors: error.details.map((e) => e.message) });
        }

        const updateData = { ...req.body };

        // Resolve major reference
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

        // Resolve courses
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
                updateData.courses = [];
            }
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { studentId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
