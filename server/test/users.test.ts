import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../src/createApp";
import connectDatabase from "../src/connectDatabase";
import { AuthEndpoints, UsersEndpoints } from "../src/constants/endpoints";
import SerializedUser from "../src/models/SerializedUser";
import dotenv from "dotenv";

dotenv.config();

describe("User life cycle", () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI!;
  let app: any;
  let loginResult: any;
  let firstMongoUserId: mongoose.Types.ObjectId;
  let secondMongoUserId: mongoose.Types.ObjectId;
  const dateNow = Date.now();
  const firstName = `test_${dateNow}`;
  const firstEmail = `${firstName}@email.com`;
  const secondName = `test_${dateNow + 1}`;
  const secondEmail = `${dateNow + 1}@email.com`;
  const password = "test1234";
  const companyId = new mongoose.Types.ObjectId();
  const updatedCompanyId = new mongoose.Types.ObjectId();
  const adminRole = "Admin";
  const developerRole = "Developer";

  beforeAll(async () => {
    app = createApp();
    await connectDatabase(MONGO_TEST_URI);
  });

  test("should create first user", async () => {
    const res = await request(app).post(UsersEndpoints.USERS).send({
      name: firstName,
      password: password,
      email: firstEmail,
      companyId: companyId,
      role: adminRole,
    });
    expect(res.statusCode).toBe(201);
  });

  test("should create second user", async () => {
    const res = await request(app).post(UsersEndpoints.USERS).send({
      name: secondName,
      password: password,
      email: secondEmail,
      companyId: companyId,
      role: developerRole,
    });
    expect(res.statusCode).toBe(201);
  });

  test("should login first user", async () => {
    const res = await request(app).post(AuthEndpoints.LOGIN).send({
      email: firstEmail,
      password: password,
    });
    loginResult = res;
    expect(res.statusCode).toBe(200);
  });

  test("should find first user by email as admin", async () => {
    const res = await request(app)
      .get(UsersEndpoints.USER_BY_EMAIL)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        email: firstEmail,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(firstName);
    expect(res.body.role).toBe(adminRole);
    firstMongoUserId = res.body._id;
  });

  test("should find second user by email as admin", async () => {
    const res = await request(app)
      .get(UsersEndpoints.USER_BY_EMAIL)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        email: secondEmail,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(secondName);
    expect(res.body.role).toBe(developerRole);
    secondMongoUserId = res.body._id;
  });

  test("should find second user by id as admin", async () => {
    const res = await request(app)
      .get(UsersEndpoints.USER_BY_ID)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        userId: secondMongoUserId,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(secondName);
    expect(JSON.stringify(res.body.companyId)).toEqual(
      JSON.stringify(companyId)
    );
  });

  test("should update second user by id as admin", async () => {
    const res = await request(app)
      .patch(UsersEndpoints.USER_BY_ID)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        userId: secondMongoUserId,
        companyId: updatedCompanyId,
      });
    const updatedUser = res.body.find(
      (user: any) => user._id == secondMongoUserId
    );
    expect(res.statusCode).toBe(200);
    expect(updatedUser.name).toBe(secondName);
    expect(updatedUser.companyId).toBe(updatedCompanyId.toString());
  });

  test("should logout first user", async () => {
    const res = await request(app)
      .post(AuthEndpoints.LOGOUT)
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(200);
  });

  test("should login second user", async () => {
    const res = await request(app).post(AuthEndpoints.LOGIN).send({
      email: secondEmail,
      password: password,
    });
    loginResult = res;
    expect(res.statusCode).toBe(200);
  });

  test("should fail to find first user by email", async () => {
    const res = await request(app)
      .get(UsersEndpoints.USER_BY_EMAIL)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        email: firstEmail,
      });
    expect(res.statusCode).toBe(403);
  });

  test("should get all users without being admin", async () => {
    const res = await request(app).get(UsersEndpoints.USERS);
    const filteredUser: SerializedUser[] = res.body.filter(
      (user: SerializedUser) => {
        return user.name === firstName;
      }
    );
    expect(res.statusCode).toBe(200);
    expect(filteredUser[0].name).toBe(firstName);
    expect(res.body.length).toBe(2);
  });

  test("should logout second user", async () => {
    const res = await request(app)
      .post(AuthEndpoints.LOGOUT)
      .set("Cookie", loginResult.headers["set-cookie"]);
    expect(res.statusCode).toBe(200);
  });

  test("should login first user", async () => {
    const res = await request(app).post(AuthEndpoints.LOGIN).send({
      email: firstEmail,
      password: password,
    });
    loginResult = res;
    expect(res.statusCode).toBe(200);
  });

  test("should delete second user", async () => {
    const res = await request(app)
      .delete(UsersEndpoints.USER_BY_ID)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        userId: secondMongoUserId,
      });
    expect(res.statusCode).toBe(200);
  });

  test("should verify deletion", async () => {
    const res = await request(app)
      .get(UsersEndpoints.USER_BY_ID)
      .set("Cookie", loginResult.headers["set-cookie"])
      .send({
        userId: secondMongoUserId,
      });
    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    // Close MongoDB connection or perform any necessary cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
