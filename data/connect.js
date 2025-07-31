// DB CONNECTION CONFIGURATION
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB");
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
