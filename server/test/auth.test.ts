import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";
import { AuthEndpoints, UsersEndpoints } from "../src/constants/endpoints";

dotenv.config();

describe("Auth life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  let loginResult: any;
  let userMongoId: mongoose.Types.ObjectId;
  const dateNow = Date.now();
  const name = `test_${dateNow}`;
  const email = `${name}@email.com`;
  const password = "test1234";
  const companyId = new mongoose.Types.ObjectId();

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(MONGO_TEST_URI);
  });

  test("should create user", async () => {
    const res = await request(app).post(UsersEndpoints.USERS).send({
      name: name,
      password: password,
      email: email,
      companyId: companyId,
      role: "Admin",
    });
    expect(res.statusCode).toBe(201);
  });

  test("should log user in", async () => {
    const res = await request(app).post(AuthEndpoints.LOGIN).send({
      email: email,
      password: password,
    });
    loginResult = res;
    expect(res.statusCode).toBe(200);
  });

  test("should check if logged in", async () => {
    const res = await request(app)
      .get(AuthEndpoints.STATUS)
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(200);
  });

  test("should logout user", async () => {
    const res = await request(app)
      .post(AuthEndpoints.LOGOUT)
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(200);
  });

  test("should check if logged out", async () => {
    const res = await request(app)
      .get(AuthEndpoints.STATUS)
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(401);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
