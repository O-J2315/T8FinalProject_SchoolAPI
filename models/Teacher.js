const mongoose = require("mongoose");

// Define the teacher schema
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
    deptId: { type: String, required: true },
    courses: [{ type: String }],
});

module.exports = mongoose.model("Teacher", teacherSchema);
