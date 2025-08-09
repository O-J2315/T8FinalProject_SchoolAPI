const mongoose = require("mongoose");

// Define the Course schema
const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    courseName: { type: String, required: true, trim: true },
    deptId: { type: String, required: true },
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: false,
    },
    teacherId: { type: String, required: true },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: false,
    },
    credits: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model("Course", courseSchema);
