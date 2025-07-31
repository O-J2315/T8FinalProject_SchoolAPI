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
        if (req.user && req.session.cookie) {
            // User is logged in
            res.json({
                message: "Welcome to School Management API",
                user: req.user,
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
            // User is not logged in
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

// Github OAuth callback route
router.get(
    "/auth/github/callback",
    // #swagger.ignore = true
    passport.authenticate("github", {
        failureRedirect: "/login",
    }),
    (req, res) => {
        res.redirect("/");
    }
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
