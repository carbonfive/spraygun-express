const authenticate = require("@app/middleware/authenticate");

async function login(req, res) {
  // TODO: log the user in via backend based on request parameters
  const user = { id: 1, email: "user@example.com" };
  authenticate.login(req, user.id);

  res.json({ user: { email: user.email } });
}

function logout(req, res, _next) {
  authenticate.logout(req);
  res.json({});
}

module.exports = { login, logout };
