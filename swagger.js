const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "School Management API",
    description: "API documentation for managing School resources",
  },
  host: "http://localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    require("./server.js"); // Start the server after generating the documentation
  })
  .catch((err) => {
    console.error("Error generating Swagger documentation:", err);
  });
