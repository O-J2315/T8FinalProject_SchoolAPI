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

describe("Students API", () => {
    test("GET /students should return 200 and an array", async () => {
        const res = await request.get("/students");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // other tests...
});
