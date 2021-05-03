const app = require("@app");
const request = require("supertest");

describe("GET /what/ever", () => {
  it("responds with 404 and JSON object", () => {
    return request(app)
      .get("/what/ever")
      .expect(404, {
        error: { message: "No route found for GET /what/ever", status: 404 },
      });
  });
});
