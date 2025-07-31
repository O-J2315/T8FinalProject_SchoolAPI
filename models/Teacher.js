const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  departmentId: { type: String, required: true },
  courses: [{ type: String }],
});

module.exports = mongoose.model("Teacher", teacherSchema);
