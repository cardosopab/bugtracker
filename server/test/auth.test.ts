import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";

describe("create user and login", () => {
  let app: any;
  const userId = Date.now();
  const username = `test_${userId}`;
  const password = "test1234";
  const authEndpoint = "/api/auth/";

  beforeAll(async () => {
    await connectDatabase();
    app = createApp();
  });

  test("should create user", async () => {
    const res = await request(app)
      .post(authEndpoint + "create")
      .send({
        username: username,
        password: password,
        displayName: "Test displayName",
      });
    expect(res.statusCode).toBe(201);
  });

  test("should log user in, and check status", async () => {
    const res = await request(app)
      .post(authEndpoint + "login")
      .send({
        username: username,
        password: password,
      })
      .then((res) => {
        return request(app)
          .get(authEndpoint + "status")
          .set("Cookie", res.headers["set-cookie"]);
      });
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
