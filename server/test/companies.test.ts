import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";

dotenv.config();

describe("Company life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  let loginResult: any;
  const companyId = Date.now();
  const name = `test_${companyId}`;
  const companiesEndpoint = "/api/companies/";
  const personnelArray = ["Steve Wozniak", "Steve Jobs"];

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(MONGO_TEST_URI);
  });

  test("should create company", async () => {
    const res = await request(app).post(companiesEndpoint).send({
      name: name,
      personnel: personnelArray,
    });
    expect(res.statusCode).toBe(201);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
