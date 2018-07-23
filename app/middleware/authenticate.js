function login(req, userId) {
  req.session.userId = userId;
}

function logout(req) {
  req.session.reset();
}

function authenticate(req, res, next) {
  const userId = req.session.userId;
  if (userId) {
    req.userId = userId;
    next();
  } else {
    const error = new Error("Unauthorized");
    error.status = 401;
    next(error);
  }
}

authenticate.login = login;
authenticate.logout = logout;
module.exports = authenticate;
