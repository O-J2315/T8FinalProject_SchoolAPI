const express = require("express");
const authController = require("../controllers/authController");
const {
    ensureAuthenticated,
    ensureGuest,
} = require("../middleware/sessionAuth");

const router = express.Router();

// Public routes
// Login status
router.get("/", authController.home);
// Start Github OAuth
router.get("/auth/github", ensureGuest, authController.githubAuth);
// Handle OAuth callback
router.get("/auth/github/callback", authController.githubCallback);

// Protected routes
// Logout
router.post("/auth/logout", ensureAuthenticated, authController.logout);
// User profile
router.get("/auth/profile", ensureAuthenticated, authController.profile);

module.exports = router;
