const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        githubId: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        displayName: String,
        email: String,
        avatar: String,
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
