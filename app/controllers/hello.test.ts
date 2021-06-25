const app = require("@app");
const request = require("supertest");

describe("GET /api/hello", () => {
  it("responds with JSON", async () => {
    const response = await request(app).get("/api/hello");
    expect(response.type).toMatch(/json/);
    expect(response.statusCode).toEqual(200);
  });
});
