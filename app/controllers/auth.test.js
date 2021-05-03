const app = require("@app");
const request = require("supertest");

let agent;

beforeEach(() => {
  agent = request.agent(app);
});

describe("POST /api/login", () => {
  describe("with incorrect credentials", () => {
    it("responds with a JSON 401 error", async () => {
      const response = await agent
        .post("/api/login")
        .send({ email: "user@example.com", password: "incorrect" })
        .set("Content-Type", "application/json");
      expect(response.type).toMatch(/json/);
      expect(response.statusCode).toEqual(401);
    });
  });

  describe("with correct credentials", () => {
    it("responds with JSON", async () => {
      const response = await agent
        .post("/api/login")
        .send({ email: "user@example.com", password: "secret" })
        .set("Content-Type", "application/json");
      expect(response.type).toMatch(/json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        user: { id: 1, email: "user@example.com" },
      });
    });

    it("sets a jwt cookie", async () => {
      const response = await agent
        .post("/api/login")
        .send({ email: "user@example.com", password: "secret" })
        .set("Content-Type", "application/json");
      expect(response.header["set-cookie"][0]).toMatch(/^jwt=.+/);
    });

    it("grants access to a protected route", async () => {
      await agent
        .post("/api/login")
        .send({ email: "user@example.com", password: "secret" })
        .set("Content-Type", "application/json");
      const response = await agent.get("/api/secret");
      expect(response.statusCode).toEqual(200);
    });
  });
});

describe("POST /api/logout", () => {
  describe("when authenticated", () => {
    beforeEach(() => {
      return agent.post("/api/login").set("Content-Type", "application/json");
    });

    it("responds with JSON", async () => {
      const response = await agent
        .post("/api/logout")
        .set("Content-Type", "application/json");
      expect(response.type).toMatch(/json/);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({});
    });

    it("revokes access to a protected route", async () => {
      await agent.post("/api/logout").set("Content-Type", "application/json");
      const response = await agent.get("/api/secret");
      expect(response.statusCode).toEqual(401);
    });
  });
});
