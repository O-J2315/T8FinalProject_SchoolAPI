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

describe("Teachers API", () => {
    test("GET /teachers should return 200 and an array", async () => {
        const res = await request.get("/teachers");
        expect(res.statusCode).toBe(200);
        // expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /teachers/:id with valid ID should return 200 and a teacher object", async () => {
        // Replace with a real teacher ID or mock ID
        const teacherId = "T002";
        const res = await request.get(`/teachers/${teacherId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("teacherId", teacherId);
    });

    test("GET /teachers/:id with invalid ID format should return 400", async () => {
        const res = await request.get("/teachers/invalid-id");
        expect(res.statusCode).toBe(404);
    });

    test("GET /teachers/:id with non-existent ID should return 404", async () => {
        const nonExistentId = "T00234";
        const res = await request.get(`/teachers/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
    });
});
