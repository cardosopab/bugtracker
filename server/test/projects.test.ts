import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";
import { ProjectsEndpoints } from "../src/constants/endpoints";

dotenv.config();

describe("Project life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  const projectId = Date.now();
  const name = `name_${projectId}`;
  const companyId = `companyId_${projectId}`;
  const description = `description_${projectId}`;
  const personnelArray = ["Steve Wozniak", "Steve Jobs"];
  let mongoProjectId: string;

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(MONGO_TEST_URI);
  });

  test("should create project", async () => {
    const res = await request(app).post(ProjectsEndpoints.PROJECTS).send({
      companyId: companyId,
      name: name,
      description: description,
      personnel: personnelArray,
    });
    expect(res.statusCode).toBe(201);
  });

  test("should find project by name", async () => {
    const res = await request(app).get(ProjectsEndpoints.PROJECT_BY_NAME).send({
      name: name,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(name);
    mongoProjectId = res.body._id;
    console.log(mongoProjectId);
  });

  test("should delete project by id", async () => {
    const res = await request(app)
      .delete(ProjectsEndpoints.PROJECT_BY_ID)
      .send({
        projectId: mongoProjectId,
      });
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
