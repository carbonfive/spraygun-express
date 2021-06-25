const app = require("@app");
const request = require("supertest");

describe("GET /what/ever", () => {
  it("responds with 404 and JSON object", async () => {
    const response = await request(app).get("/what/ever");
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      error: { message: "No route found for GET /what/ever", status: 404 },
    });
  });
});
