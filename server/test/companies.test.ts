import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";
import { CompaniesEndpoints } from "../src/constants/endpoints";

dotenv.config();

describe("Company life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  let mongoCompanyId: any;
  const dateNow = Date.now();
  const name = `test_${dateNow}`;
  const firstPersonnel = new mongoose.Types.ObjectId();
  const secondPersonnel = new mongoose.Types.ObjectId();
  const personnelIdArray = [firstPersonnel];
  const updatedPersonnelIdArrary = [...personnelIdArray, secondPersonnel];

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(MONGO_TEST_URI);
  });

  test("should create company", async () => {
    const res = await request(app).post(CompaniesEndpoints.COMPANIES).send({
      name: name,
      personnel: personnelIdArray,
    });
    expect(res.statusCode).toBe(201);
  });

  test("should find company by name", async () => {
    const res = await request(app)
      .get(CompaniesEndpoints.COMPANY_BY_NAME)
      .send({
        name: name,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(name);
    mongoCompanyId = res.body._id;
  });

  test("should find company by id", async () => {
    const res = await request(app).get(CompaniesEndpoints.COMPANY_BY_ID).send({
      companyId: mongoCompanyId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(name);
    expect(res.body._id).toBe(mongoCompanyId);
  });

  test("should add personnel id", async () => {
    const res = await request(app).post(CompaniesEndpoints.PERSONNEL).send({
      companyId: mongoCompanyId,
      personnelId: secondPersonnel,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(name);
    expect(res.body._id).toBe(mongoCompanyId);
    expect(res.body.personnel.map(String).sort()).toEqual(
      updatedPersonnelIdArrary.map(String).sort()
    );
  });

  test("should delete personnel id", async () => {
    const res = await request(app).delete(CompaniesEndpoints.PERSONNEL).send({
      companyId: mongoCompanyId,
      personnelId: secondPersonnel,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(name);
    expect(res.body._id).toBe(mongoCompanyId);
    expect(res.body.personnel.map(String).sort()).toEqual(
      personnelIdArray.map(String).sort()
    );
  });

  test("should delete company by id", async () => {
    const res = await request(app)
      .delete(CompaniesEndpoints.COMPANY_BY_ID)
      .send({
        companyId: mongoCompanyId,
      });
    expect(res.statusCode).toBe(204);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
