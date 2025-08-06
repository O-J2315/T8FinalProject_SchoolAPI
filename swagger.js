const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const definitions = require("./definitions");

const doc = {
    info: {
        title: "School Management API",
        description: "API documentation for managing School resources",
        version: "1.0.0",
    },
    servers: [
        { url: "http://localhost:3000" },
        { url: "https://t8finalproject-schoolapi.onrender.com" },
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        { name: "Home", description: "Home page" },
        {
            name: "Departments",
            description: "Department management operations",
        },
        { name: "Teachers", description: "Teacher management operations" },
        { name: "Courses", description: "Course management operations (WIP)" },
        {
            name: "Students",
            description: "Student management operations (WIP)",
        },
    ],
    definitions: definitions,
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

const fs = require("fs");

if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
    console.log("🧹 Deleted old swagger.json");
}

swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log("🌠 Swagger documentation generated successfully!");
        const { startServer } = require("./server");
        startServer();
    })
    .catch((err) => {
        console.error("❌ Error generating Swagger documentation:", err);
    });
