const cors = require("cors");

const corsOptions = {
    origin:
        process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
    ],
};

module.exports = cors(corsOptions);
