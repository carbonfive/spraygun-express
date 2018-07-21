const app = require("@app");
const request = require("supertest");

describe("GET /api/hello", () => {
  it("responds with JSON", () => {
    return request(app)
      .get("/api/hello")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
