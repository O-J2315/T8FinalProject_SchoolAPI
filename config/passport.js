const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists
                let user = await User.findOne({
                    githubId: profile.id,
                });

                if (user) {
                    return done(null, user);
                }
                // Create new user
                user = await User.create({
                    githubId: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    email: profile.emails?.[0]?.value || "",
                    avatar: profile.photos?.[0]?.value || "",
                });
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user._id);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (e) {
        done(e, null);
    }
});

module.exports = passport;
