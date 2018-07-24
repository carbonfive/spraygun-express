const session = require("@app/middleware/jwt-session");

async function login(req, res) {
  // TODO: verify the user's credentials
  const user = { id: 1, email: "user@example.com" };
  session.login(req, res, user);

  res.json({ user: { email: user.email } });
}

function logout(req, res, _next) {
  session.logout(req, res);
  res.json({});
}

module.exports = { login, logout };
