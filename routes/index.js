const express = require("express");
const router = express.Router();

const courseRoutes = require("./course");
const departmentRoutes = require("./department");
const studentRoutes = require("./student");
const teacherRoutes = require("./teacher");

const passport = require("passport");

// Home page route
router.get(
  "/",
  // #swagger.tags = ["Home"]
  (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      const username = req.user.username || req.user.login || "GitHubUser";

      res.json({
        message: `Welcome to School Management API, ${username}`,
        user: {
          id: req.user.id,
          username: username,
          profileUrl: req.user.profileUrl,
          avatar: req.user.photos?.[0]?.value, // Optional: show avatar
        },
        endpoints: {
          courses: "/courses",
          departments: "/departments",
          students: "/students",
          teachers: "/teachers",
          logout: "/logout",
          docs: "/api-docs",
        },
      });
    } else {
      res.json({
        message: "Welcome to School Management API",
        status: "Not logged in",
        login: "Visit /login to authenticate with GitHub",
        docs: "/api-docs",
      });
    }
  }
);

router.use("/courses", courseRoutes);
router.use("/departments", departmentRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);

//Login route
router.get(
    "/login",
    // #swagger.ignore = true
    passport.authenticate("github")
);


router.get(
    "/logout",
    // #swagger.ignore = true
    (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
);

module.exports = router;
