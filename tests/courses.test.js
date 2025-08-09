require("dotenv").config(); // loads .env variables

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

const request = supertest(app);

describe("Courses API", () => {
    test("GET /courses should return 200 and an array", async () => {
        const res = await request.get("/courses");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /courses/:id with valid ID should return 200 and a course object", async () => {
        // Replace with a real course ID or mock ID
        const courseId = "MATH101";
        const res = await request.get(`/courses/${courseId}`);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("courseId", courseId);
    });

    test("GET /courses/:id with invalid ID format should return 400", async () => {
        const res = await request.get("/courses/invalid-id");
        expect(res.statusCode).toBe(404);
    });

    test("GET /courses/:id with non-existent ID should return 404", async () => {
        const nonExistentId = "MATH10123";
        const res = await request.get(`/courses/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
    });
});
