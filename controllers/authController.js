const passport = require("passport");

class AuthController {
    // GET /
    home(req, res) {
        res.json({
            message: req.user
                ? `Logged in as ${req.user.username}`
                : "This is Team 8's School API!",
            user: req.user || null,
        });
    }

    // GET /auth/github
    githubAuth(req, res, next) {
        passport.authenticate("github", {
            scope: ["user:email"],
        })(req, res, next);
    }

    // GET /auth/github/callback
    githubCallback(req, res, next) {
        passport.authenticate("github", {
            failureRedirect: "/api-docs",
            successRedirect: "/",
        })(req, res, next);
    }

    // POST /auth/logout
    logout(req, res) {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({
                    error: "Logout failed",
                });
            }
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({
                        error: "Session destroy failed",
                    });
                }
                res.json({
                    message: "Logged out successfully",
                });
            });
        });
    }

    // GET /auth/profile
    profile(req, res) {
        if (!req.user) {
            return res.status(401).json({
                error: "Not authenticated",
            });
        }

        res.json({
            user: req.user,
        });
    }
}

module.exports = new AuthController();
