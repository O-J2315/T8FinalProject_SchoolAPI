const Course = require("../models/Course");
const Department = require("../models/Department");
const Teacher = require("../models/Teacher");
const Joi = require("joi");

// Base schema (no required here, used for update)
const courseBaseSchema = {
    courseId: Joi.string().alphanum().min(2).max(20).required(),
    courseName: Joi.string().min(2).max(100).trim().required().disallow(""),
    deptId: Joi.string().alphanum().required().disallow(""),
    dept: Joi.string().optional(),
    teacherId: Joi.string().alphanum().required().disallow(""),
    teacher: Joi.string().optional(),
    credits: Joi.number().integer().min(0).max(10).required(),
};

// Create schema - required fields
const createCourseSchema = Joi.object({
    courseId: courseBaseSchema.courseId.required(),
    courseName: courseBaseSchema.courseName.required(),
    deptId: courseBaseSchema.deptId.required(),
    teacherId: courseBaseSchema.teacherId.required(),
    credits: courseBaseSchema.credits.required(),
});

// Update schema - all optional but at least one required
const updateCourseSchema = Joi.object(courseBaseSchema).min(1);

// Query schema for filtering GET /courses
const courseQuerySchema = Joi.object({
    teacherId: Joi.string().alphanum().min(2).max(20).optional(),
    deptId: Joi.string().alphanum().min(2).max(20).optional(),
});

// GET all
exports.getCourses = async (req, res) => {
    try {
        // Validate query params
        const { error } = courseQuerySchema.validate(req.query, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ errors: error.details.map((e) => e.message) });
        }

        const { teacherId, deptId } = req.query;
        const filter = {};

        if (teacherId) {
            const teacher = await Teacher.findOne({ teacherId });
            if (!teacher) {
                return res.status(404).json({ message: "Invalid teacherId" });
            }
            filter.teacher = teacher._id;
        }

        if (deptId) {
            const department = await Department.findOne({ deptId });
            if (!department) {
                return res.status(404).json({ message: "Invalid deptId" });
            }
            filter.dept = department._id;
        }

        const courses = await Course.find(filter)
            .populate("dept", "deptId deptName")
            .populate("teacher", "teacherId firstName lastName");

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a course by courseId
exports.getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findOne({ courseId })
            .populate("deptId", "deptId deptName")
            .populate("teacherId", "teacherId firstName lastName");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create a new course
exports.createCourse = async (req, res) => {
    try {
        // Validate request body
        const { error } = createCourseSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ errors: error.details.map((e) => e.message) });
        }

        const { courseId, courseName, deptId, teacherId, credits } = req.body;

        // Check courseId duplicate
        const existing = await Course.findOne({ courseId });
        if (existing) {
            return res
                .status(400)
                .json({ message: "Course ID already exists" });
        }

        // Check department exists
        const department = await Department.findOne({deptId : deptId});
        if (!department) {
            return res.status(404).json({ message: "Invalid department ID" });
        }

        // Check teacher exists
        const targetTeacher = await Teacher.findOne({teacherId : teacherId});
        if (!targetTeacher) {
            return res.status(404).json({ message: "Invalid teacher ID" });
        }

        const newCourse = new Course({
            courseId,
            courseName,
            deptId,
            teacherId,
            credits,
        });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update existing course by courseId
exports.updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Validate update body
        const { error } = updateCourseSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res
                .status(400)
                .json({ errors: error.details.map((e) => e.message) });
        }

        const updateData = { ...req.body };

        if (updateData.dept) {
            const department = await Department.findById(updateData.dept);
            if (!department) {
                return res
                    .status(404)
                    .json({ message: "Invalid department ID" });
            }
            updateData.dept = department._id;
        }

        if (updateData.teacher) {
            const targetTeacher = await Teacher.findById(updateData.teacher);
            if (!targetTeacher) {
                return res.status(404).json({ message: "Invalid teacher ID" });
            }
            updateData.teacher = targetTeacher._id;
        }

        const updatedCourse = await Course.findOneAndUpdate(
            { courseId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a course by courseId
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const deletedCourse = await Course.findOneAndDelete({ courseId });
        if (!deletedCourse)
            return res.status(404).json({ message: "Course not found" });
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
