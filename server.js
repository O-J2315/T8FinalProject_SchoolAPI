require("dotenv").config();
const express = require("express");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./database/connect");
const corsMiddleware = require("./middleware/cors");
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

// Session config
app.use(
    session({
        secret: process.env.SESSION_SECRET || "default_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger setup
try {
    const swaggerFile = require("./swagger.json");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    console.log(
        "📚 Swagger docs available at http://localhost:" + PORT + "/api-docs"
    );
} catch {
    console.warn(
        "⚠️  Swagger documentation not available. Run swagger generation first."
    );
}

// Routes
app.use("/", require("./routes"));

// Error handling middleware
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Something went wrong!",
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error starting server:", error.message);
    }
};

// Export the startServer function so swagger-autogen can call it
module.exports = { app, startServer };

// Only start server directly if this file is run directly (not required by swagger-autogen)
if (require.main === module) {
    startServer();
}
