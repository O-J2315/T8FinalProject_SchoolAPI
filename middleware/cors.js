const cors = require("cors");

const corsOptions = {
    origin: process.env.FRONTEND_URL, // e.g., https://legacyfence.com
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
    ],
    optionsSuccessStatus: 200, // for legacy browsers
};

module.exports = corsOptions;
