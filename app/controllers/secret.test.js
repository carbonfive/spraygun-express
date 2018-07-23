const app = require("@app");
const request = require("supertest");

describe("GET /api/secret", () => {
  let agent;

  beforeEach(() => {
    agent = request.agent(app);
  });

  describe("when authenticated", () => {
    beforeEach(() => {
      return agent.post("/auth/login");
    });

    it("responds with JSON", () => {
      return agent
        .get("/api/secret")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("when not authenticated", () => {
    it("responds with a 401 status", () => {
      return agent
        .get("/api/secret")
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });
});
