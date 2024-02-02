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
  const dateNow = Date.now();
  const name = `test_${dateNow}`;
  const email = `${name}@email.com`;
  const password = "test1234";
  const companyId = new mongoose.Types.ObjectId();
  const updatedCompanyId = new mongoose.Types.ObjectId();

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

  test("should get all users", async () => {
    const res = await request(app).get(UsersEndpoints.USERS);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe(name);
  });

  test("should log user in", async () => {
    const res = await request(app).post(AuthEndpoints.LOGIN).send({
      email: email,
      password: password,
    });
    loginResult = res;
    console.log(`loginResult: ${loginResult}`);
    expect(res.statusCode).toBe(200);
  });

  test("should find user by email", async () => {
    const res = await request(app)
      .get(UsersEndpoints.USER_BY_EMAIL)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        email: email,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(name);
    userMongoId = res.body._id;
  });

  test("should find user by id", async () => {
    const res = await request(app)
      .get(UsersEndpoints.USER_BY_ID)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        userId: userMongoId,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(name);
    expect(JSON.stringify(res.body.companyId)).toEqual(
      JSON.stringify(companyId)
    );
  });

  test("should update user by id", async () => {
    const res = await request(app)
      .patch(UsersEndpoints.USER_BY_ID)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        userId: userMongoId,
        companyId: updatedCompanyId,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(name);
    expect(JSON.stringify(res.body.companyId)).toEqual(
      JSON.stringify(updatedCompanyId)
    );
  });

  test("should delete user", async () => {
    const res = await request(app)
      .delete(UsersEndpoints.USER_BY_ID)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        userId: userMongoId,
      });
    expect(res.statusCode).toBe(204);
  });

  // test("should verify deletion", async () => {
  //   const res = await request(app)
  //     .get(UsersEndpoints.USER_BY_ID)
  //     .set("Cookie", loginResult.headers["set-cookie"])
  //     .send({
  //       userId: userMongoId,
  //     });
  //   expect(res.statusCode).toBe(404);
  // });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
