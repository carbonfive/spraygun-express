const app = require("@app");
const request = require("supertest");

describe("GET /api/secret", () => {
  let agent;

  beforeEach(() => {
    agent = request.agent(app);
  });

  describe("when authenticated", () => {
    beforeEach(() => {
      return agent
        .post("/api/login")
        .send({ email: "user@example.com", password: "secret" })
        .set("Content-Type", "application/json");
    });

    it("responds with JSON", async () => {
      const response = await agent.get("/api/secret");
      expect(response.type).toMatch(/json/);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe("when not authenticated", () => {
    it("responds with a 401 status", async () => {
      const response = await agent.get("/api/secret");
      expect(response.type).toMatch(/json/);
      expect(response.statusCode).toEqual(401);
    });
  });
});
