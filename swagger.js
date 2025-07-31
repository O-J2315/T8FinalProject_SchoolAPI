const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "School Management API",
        description: "API documentation for managing School resources",
        version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log("✅ Swagger documentation generated successfully!");
        const { startServer } = require("./server.js");
        startServer();
    })
    .catch((err) => {
        console.error("❌ Error generating Swagger documentation:", err);
    });
