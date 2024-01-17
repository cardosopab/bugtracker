import request from "supertest";

import app from "../../src/app";

const createEndpoint = "/api/v1/users/create";
describe(`POST ${createEndpoint}`, () => {
  it(`responds 201`, (done) => {
    request(app)
      .post(createEndpoint)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, ["hello, world!"], done);
  });
});
