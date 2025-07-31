const express = require("express");
const router = express.Router();

const courseRoutes = require("./course");
const departmentRoutes = require("./department");
const studentRoutes = require("./student");
const teacherRoutes = require("./teacher");

const passport = require("passport");

router.use("/", require("./swagger"));

router.use("/courses", courseRoutes);
router.use("/departments", departmentRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);

//Log in route
router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
