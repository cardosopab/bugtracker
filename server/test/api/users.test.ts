import request from "supertest";

import { createApp } from "../../src/createApp";

const createEndpoint = "/api/v1/users/create";
const app = createApp();
describe(`POST ${createEndpoint}`, () => {
  it(`responds 201`, (done) => {
    request(app)
      .post(createEndpoint)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, ["hello, world!"], done);
  });
});
