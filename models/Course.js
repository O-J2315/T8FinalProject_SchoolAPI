const mongoose = require("mongoose");

// Define the Course schema
const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    courseName: { type: String, required: true, trim: true },
    deptId: { type: String, required: true },
    teacherId: { type: String, required: true },
    credits: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model("Course", courseSchema);
