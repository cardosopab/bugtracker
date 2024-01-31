import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";
import { AuthEndpoints, UsersEndpoints } from "../src/constants/endpoints";

dotenv.config();

describe("User life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  let loginResult: any;
  let userMongoId: mongoose.Types.ObjectId;
  const userId = Date.now();
  const name = `test_${userId}`;
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
    });
    expect(res.statusCode).toBe(201);
  });

  test("should find user by email", async () => {
    const res = await request(app).get(UsersEndpoints.USER_BY_EMAIL).send({
      email: email,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(name);
    userMongoId = res.body._id;
    console.log(`userMongoId ${userMongoId}`);
  });

  test("should delete user", async () => {
    const res = await request(app).delete(UsersEndpoints.USERS).send({
      userId: userMongoId,
    });
    expect(res.statusCode).toBe(204);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
