const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User"); // ← Now we use it

passport.serializeUser((user, done) => {
    done(null, user._id); // store only MongoDB user _id in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // now this works correctly
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // 1. Check if user already exists
                const existingUser = await User.findOne({
                    githubId: profile.id,
                });

                if (existingUser) {
                    return done(null, existingUser); // already registered
                }

                // 2. Create new user
                const newUser = new User({
                    githubId: profile.id,
                    username: profile.username,
                    displayName: profile.displayName || null,
                    email: profile.emails?.[0]?.value || null,
                    avatar: profile.photos?.[0]?.value || null,
                });

                const savedUser = await newUser.save();
                return done(null, savedUser); // now saved in Mongo
            } catch (err) {
                return done(err);
            }
        }
    )
);

module.exports = passport;
