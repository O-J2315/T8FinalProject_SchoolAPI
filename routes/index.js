const express = require("express");
const router = express.Router();

const courseRoutes = require("./course");
const departmentRoutes = require("./department");
const studentRoutes = require("./student");
const teacherRoutes = require("./teacher");

const passport = require("../config/passport");

// Use the routes
router.use("/courses", courseRoutes);
router.use("/departments", departmentRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);

//Login route
router.get(
    "/login",
    (req, res, next) => {
        console.log("Login route hit");
        next();
    },
    passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback route
router.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/api-docs",
        successRedirect: "/",
    })
);

// Home route
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            message: `Welcome to School Management API, ${req.user.username}`,
            user: {
                username: req.user.username,
                // displayName: req.user.displayName,
                profileUrl: req.user.profileUrl,
                avatar: req.user.avatar,
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
});

// Logout route
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
