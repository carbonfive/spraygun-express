const { find, matches, pick } = require("lodash");
const session = require("@app/middleware/jwt-session");

const users = [{ id: 1, email: "user@example.com", password: "secret" }];

async function login(req, res) {
  const { email, password } = req.body;
  const user = find(users, matches({ email, password }));

  if (!user) {
    const error = new Error("Incorrect email and/or password");
    error.status = 401;
    throw error;
  }

  await session.login(req, res, user);
  res.json({ user: pick(user, ["id", "email"]) });
}

async function logout(req, res, _next) {
  await session.logout(req, res);
  res.json({});
}

module.exports = { login, logout };
