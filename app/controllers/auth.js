const { find, pick, whereEq } = require("ramda");
const session = require("@app/middleware/jwt-session");

const users = [{ id: 1, email: "user@example.com", password: "secret" }];

async function login(req, res) {
  const { email, password } = req.body;
  const user = find(whereEq({ email, password }), users);

  if (!user) {
    const error = new Error("Incorrect email and/or password");
    error.status = 401;
    throw error;
  }

  await session.login(req, res, user);
  res.json({ user: pick(["id", "email"], user) });
}

async function logout(req, res, _next) {
  await session.logout(req, res);
  res.json({});
}

module.exports = { login, logout };
