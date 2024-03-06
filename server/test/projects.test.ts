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
  const dateNow = Date.now();
  const name = `name_${dateNow}`;
  const companyId = new mongoose.Types.ObjectId();
  const description = `description_${dateNow}`;
  const newPersonnelId = new mongoose.Types.ObjectId();
  const personnelIdArray = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
  ];
  const updatedPersonnelIdArrary = [...personnelIdArray, newPersonnelId];
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
      personnel: personnelIdArray,
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
  });

  test("should find project by id", async () => {
    const res = await request(app).get(ProjectsEndpoints.PROJECT_BY_ID).send({
      projectId: mongoProjectId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(name);
    expect(res.body._id).toBe(mongoProjectId);
  });

  test("should add personnel id", async () => {
    const res = await request(app).post(ProjectsEndpoints.PERSONNEL).send({
      projectId: mongoProjectId,
      personnelId: newPersonnelId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    const updatedProject = res.body.find(
      (project: any) => project._id == mongoProjectId
    );
    expect(updatedProject.name).toBe(name);
    expect(updatedProject._id).toBe(mongoProjectId);
    expect(updatedProject.personnel.map(String).sort()).toEqual(
      updatedPersonnelIdArrary.map(String).sort()
    );
  });

  test("should delete personnel id", async () => {
    const res = await request(app).delete(ProjectsEndpoints.PERSONNEL).send({
      projectId: mongoProjectId,
      personnelId: newPersonnelId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    const updatedProject = res.body.find(
      (project: any) => project._id == mongoProjectId
    );
    expect(updatedProject.name).toBe(name);
    expect(updatedProject._id).toBe(mongoProjectId);
    expect(updatedProject.personnel.map(String).sort()).toEqual(
      personnelIdArray.map(String).sort()
    );
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
