const Teacher = require("../models/Teacher");
const Department = require("../models/Department");
const Course = require("../models/Course");
const Joi = require("joi");

//Teacher validation schema
const teacherValidationSchema = Joi.object({
    teacherId: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required()
        .trim()
        .disallow(""),
    firstName: Joi.string().min(2).max(50).required().trim().disallow(""),
    lastName: Joi.string().min(2).max(50).required().trim().disallow(""),
    email: Joi.string().email().required().trim().disallow(""),
    deptId: Joi.string().alphanum().required().trim().disallow(""),
    courses: Joi.array().items(Joi.string()).optional(),
});
const teacherUpdateSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    deptId: Joi.string().alphanum().optional(),
    courses: Joi.array().items(Joi.string().alphanum()).optional(),
}).min(1); // Require at least one field

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
        const { error } = teacherValidationSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                errors: error.details.map((err) => err.message),
            });
        }

        const { teacherId, firstName, lastName, email, deptId, courses } =
            req.body;

        const existing = await Teacher.findOne({ teacherId });
        if (existing) {
            return res
                .status(400)
                .json({ message: "Teacher ID already exists" });
        }

        const existingEmail = await Teacher.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const department = await Department.findOne({ deptId });
        if (!department) {
            return res.status(400).json({ message: "Invalid department ID" });
        }

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
            dept: department._id,
            courses: courseRefs,
        });

        await newTeacher.save();

        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH update existing teacher
exports.updateTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const { error } = teacherUpdateSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({
                errors: error.details.map((err) => err.message),
            });
        }

        const updateData = { ...req.body };

        if (updateData.deptId) {
            const department = await Department.findOne({
                deptId: updateData.deptId,
            });
            if (!department) {
                return res
                    .status(400)
                    .json({ message: "Invalid department ID" });
            }
            updateData.dept = department._id;
        }

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
                updateData.courses = courseDocs.map((c) => c._id);
            } else {
                updateData.courses = [];
            }
        }

        const updatedTeacher = await Teacher.findOneAndUpdate(
            { teacherId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
