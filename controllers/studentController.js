const Student = require('../models/Student');

const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    if (err.code === 11000) { // duplicate key error
      return res.status(400).json({ message: 'Duplicate studentId or email' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createStudent, updateStudent };
