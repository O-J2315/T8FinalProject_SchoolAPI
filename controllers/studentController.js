const Student = require("../models/Student");

// GET all students or filter by status or major
exports.getStudents = async (req, res) => {
  try {
    const { status, major } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (major) filter.major = major;

    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single student by studentId
exports.getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: "Student not found" });
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
      major,
      status,
      GPA,
      enrollmentDate,
      courses,
    } = req.body;

    const newStudent = new Student({
      studentId,
      firstName,
      lastName,
      email,
      major,
      status,
      GPA,
      enrollmentDate,
      courses,
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

    const updatedStudent = await Student.findOneAndUpdate(
      { studentId },
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
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
