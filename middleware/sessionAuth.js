const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        error: "Authentication required",
    });
};

const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

module.exports = {
    ensureAuthenticated,
    ensureGuest,
};
