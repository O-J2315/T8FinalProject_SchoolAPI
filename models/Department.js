const mongoose = require("mongoose");

// Define the Department schema
const departmentSchema = new mongoose.Schema({
    deptId: { type: String, required: true, unique: true },
    deptName: { type: String, required: true, trim: true },
    location: { type: String },
    deptEmail: { type: String, lowercase: true, trim: true },
});

module.exports = mongoose.model("Department", departmentSchema);
