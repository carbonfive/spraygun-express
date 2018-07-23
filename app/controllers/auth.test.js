const app = require("@app");
const request = require("supertest");

let agent;

beforeEach(() => {
  agent = request.agent(app);
});

describe("POST /auth/login", () => {
  it("responds with JSON", () => {
    return agent
      .post("/auth/login")
      .expect("Content-Type", /json/)
      .expect(200, { user: { email: "user@example.com" } });
  });

  it("sets a session cookie", () => {
    return agent.post("/auth/login").expect("set-cookie", /^session=.+/);
  });

  it("grants access to a protected route", async () => {
    await agent.post("/auth/login");
    await agent.get("/api/secret").expect(200);
  });
});

describe("POST /auth/logout", () => {
  describe("when authenticated", () => {
    beforeEach(() => {
      return agent.post("/auth/login");
    });

    it("responds with JSON", () => {
      return agent
        .post("/auth/logout")
        .expect("Content-Type", /json/)
        .expect(200, {});
    });

    it("revokes access to a protected route", async () => {
      await agent.post("/auth/logout");
      await agent.get("/api/secret").expect(401);
    });
  });
});
