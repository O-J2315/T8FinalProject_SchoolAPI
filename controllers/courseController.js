const Course = require("../models/Course");
const Department = require("../models/Department");
const Teacher = require("../models/Teacher");

// GET all
exports.getCourses = async (req, res) => {
    try {
        const { teacherId, deptId } = req.query;
        const filter = {};

        if (teacherId) {
            const teacher = await Teacher.findOne({ teacherId });
            if (!teacher) {
                return res.status(404).json({ message: "Invalid teacherId" });
            }
            filter.teacher = teacher._id;
        }

        // If filtering by deptId
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
            .populate("dept", "deptId deptName")
            .populate("teacher", "teacherId firstName lastName");

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
        const { courseId, courseName, dept, teacher, credits } = req.body;

        const existing = await Course.findOne({ courseId });
        if (existing) {
            return res
                .status(400)
                .json({ message: "Course ID already exists" });
        }

        const department = await Department.findById(dept);
        if (!department) {
            return res.status(404).json({ message: "Invalid department ID" });
        }

        const targetTeacher = await Teacher.findById(teacher);
        if (!targetTeacher) {
            return res.status(404).json({ message: "Invalid teacher ID" });
        }

        const newCourse = new Course({
            courseId,
            courseName,
            dept: department._id,
            teacher: targetTeacher._id,
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
        const updateData = req.body;

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
            const target_teacher = await Teacher.findById(updateData.teacher);
            if (!target_teacher) {
                return res.status(404).json({ message: "Invalid teacher ID" });
            }
            updateData.teacher = target_teacher._id;
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedCourse)
            return res.status(404).json({ message: "Course not found" });
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
