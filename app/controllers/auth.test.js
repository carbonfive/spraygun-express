const app = require("@app");
const request = require("supertest");

let agent;

beforeEach(() => {
  agent = request.agent(app);
});

describe("POST /api/login", () => {
  it("responds with JSON", () => {
    return agent
      .post("/api/login")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, { user: { email: "user@example.com" } });
  });

  it("sets a jwt cookie", () => {
    return agent
      .post("/api/login")
      .set("Content-Type", "application/json")
      .expect("set-cookie", /^jwt=.+/);
  });

  it("grants access to a protected route", async () => {
    await agent.post("/api/login").set("Content-Type", "application/json");
    await agent.get("/api/secret").expect(200);
  });
});

describe("POST /api/logout", () => {
  describe("when authenticated", () => {
    beforeEach(() => {
      return agent.post("/api/login").set("Content-Type", "application/json");
    });

    it("responds with JSON", () => {
      return agent
        .post("/api/logout")
        .set("Content-Type", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, {});
    });

    it("revokes access to a protected route", async () => {
      await agent.post("/api/logout").set("Content-Type", "application/json");
      await agent.get("/api/secret").expect(401);
    });
  });
});
