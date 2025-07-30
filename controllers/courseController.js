const Course = require('../models/Course');

// GET all
exports.getCourses = async (req, res) => {
  try {
    const { teacherId, departmentId } = req.query;
    let filter = {};

    if (teacherId) filter.teacherId = teacherId;
    if (departmentId) filter.departmentId = departmentId;

    const courses = await Course.find(filter);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a course by courseId
exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new course
exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = new Course(courseData);
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

    const updatedCourse = await Course.findOneAndUpdate(
      { courseId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
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
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
