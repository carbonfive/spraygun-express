const app = require(".");
const request = require("supertest");

describe("GET /api/hello", () => {
  it("responds with JSON", () => {
    return request(app)
      .get("/api/hello")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
