require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./data/connect");
const corsOptions = require("./middleware/cors");
const passport = require("./config/passport");
// const GithubStrategy = require("passport-github2").Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.set("trust proxy", 1);

// Session config
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI, // Your connection string
        }),
        cookie: {
            secure: true, // only if HTTPS
            sameSite: "lax",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Swagger setup
try {
    // 🧹 Clear require cache for swagger.json before loading
    delete require.cache[require.resolve("./swagger.json")];
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
