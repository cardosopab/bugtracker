import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";

dotenv.config();

describe("User life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  let loginResult: any;
  const userId = Date.now();
  const name = `test_${userId}`;
  const email = `${name}@email.com`;
  const password = "test1234";
  const authEndpoint = "/api/auth/";
  const usersEndpoint = "/api/users";

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(MONGO_TEST_URI);
  });

  test("should create user", async () => {
    const res = await request(app).post(usersEndpoint).send({
      name: name,
      password: password,
      email: email,
    });
    expect(res.statusCode).toBe(201);
  });

  test("should log user in", async () => {
    const res = await request(app)
      .post(authEndpoint + "login")
      .send({
        email: email,
        password: password,
      });
    loginResult = res;
    expect(res.statusCode).toBe(200);
  });

  test("should check if logged in", async () => {
    const res = await request(app)
      .get(authEndpoint + "status")
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(200);
  });

  test("should logout user", async () => {
    const res = await request(app)
      .post(authEndpoint + "logout")
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(200);
  });

  test("should check if logged out", async () => {
    const res = await request(app)
      .get(authEndpoint + "status")
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(401);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
