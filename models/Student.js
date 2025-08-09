const mongoose = require("mongoose");

// Define the Student schema
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    major: { type: String, required: true }, // Same as deptId in Teacher
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: false,
    },
    status: {
        type: String,
        enum: ["active", "graduated", "withdrawn"],
        default: "active",
    },
    GPA: { type: Number, min: 0, max: 4 },
    enrollmentDate: { type: Date, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Student", studentSchema);
