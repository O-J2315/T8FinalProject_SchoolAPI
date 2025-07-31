const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    deptId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    location: { type: String },
    departmentEmail: { type: String, lowercase: true, trim: true },
});

module.exports = mongoose.model("Department", departmentSchema);
