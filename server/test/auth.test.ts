import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import dotenv from "dotenv";

dotenv.config();

describe("create user and login", () => {
  let app: any;
  let loginResult: any;
  const userId = Date.now();
  const name = `test_${userId}`;
  const email = `${name}@email.com`;
  const password = "test1234";
  const authEndpoint = "/api/auth/";
  const usersEndpoint = "/api/users/";

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(process.env.MONGO_TEST_URI!);
  });

  test("should create user", async () => {
    const res = await request(app)
      .post(usersEndpoint + "create")
      .send({
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

  test("should check status and return 200", async () => {
    const res = await request(app)
      .get(authEndpoint + "status")
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
