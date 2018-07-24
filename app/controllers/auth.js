const session = require("@app/middleware/jwt-session");

async function login(req, res) {
  // TODO: verify the user's credentials
  const user = { id: 1, email: "user@example.com" };
  await session.login(req, res, user);

  res.json({ user: { email: user.email } });
}

async function logout(req, res, _next) {
  await session.logout(req, res);
  res.json({});
}

module.exports = { login, logout };
