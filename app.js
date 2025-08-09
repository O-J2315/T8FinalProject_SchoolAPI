const express = require("express");
const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");
const departmentRoutes = require("./routes/department");
const courseRoutes = require("./routes/course");

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/departments", departmentRoutes);
app.use("/courses", courseRoutes);

module.exports = app;
