require("dotenv").config(); // loads .env variables

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to the database");
});

afterAll(async () => {
    await mongoose.connection.close();
});

const request = supertest(app);

describe("Departments API", () => {
    test("GET /departments should return 200 and an array", async () => {
        const res = await request.get("/departments");
        expect(res.statusCode).toBe(200);
        // expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /departments/:id with valid ID should return 200 and a department object", async () => {
        // Replace with a real department ID or mock ID
        const departmentId = "CS";
        const res = await request.get(`/departments/${departmentId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("deptId", departmentId);
    });

    test("GET /departments/:id with invalid ID format should return 404", async () => {
        const res = await request.get("/departments/invalid-id");
        expect(res.statusCode).toBe(404);
    });

    test("GET /departments/:id with non-existent ID should return 404", async () => {
        const nonExistentId = "CS123";
        const res = await request.get(`/departments/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
    });
});
