import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";

dotenv.config();

describe("Project life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  const projectId = Date.now();
  const name = `name_${projectId}`;
  const companyId = `companyId_${projectId}`;
  const description = `description_${projectId}`;
  const projectsEndpoint = "/api/projects/";
  const personnelArray = ["Steve Wozniak", "Steve Jobs"];

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(MONGO_TEST_URI);
  });

  test("should create project", async () => {
    const res = await request(app).post(projectsEndpoint).send({
      companyId: companyId,
      name: name,
      description: description,
      personnel: personnelArray,
    });
    expect(res.statusCode).toBe(201);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
