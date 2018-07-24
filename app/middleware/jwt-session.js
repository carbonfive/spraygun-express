// Identifies the current user by using a JWT stored in an HTTP-only cookie.
// The JWT expires after a set amount of time (see config) and is automatically
// extended on every subsequent authenticated request. The cookie is ephemeral,
// meaning the user's session will disappear upon closing their browser.

const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const config = require("@app/config");

function login(req, res, user) {
  setCookie(res, user);
}

function logout(req, res) {
  setCookie(res, null);
}

function setCookie(res, user) {
  let token = null;
  if (user) {
    token = jwt.sign({ sub: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.duration
    });
  }
  res.cookie(config.jwt.cookie, token, {
    httpOnly: true,
    sameSite: true,
    secure: config.cookie.secure
  });
}

function extractFromCookie(req) {
  if (req && req.cookies) {
    return req.cookies[config.jwt.cookie];
  }
  return null;
}

function verify(jwtPayload, done) {
  const userId = jwtPayload.sub;
  // TODO: load user from the backend if desired
  const user = { id: userId };
  return done(null, user);
}

const options = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: extractFromCookie
};

const middleware = passport.initialize();
passport.use(new JwtStrategy(options, verify));

function authenticate(req, res, next) {
  passport.authenticate("jwt", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      const unauthorized = new Error("Unauthorized");
      unauthorized.status = 401;
      return next(unauthorized);
    }

    req.user = user;

    // Extend the lifetime of the token (if present)
    if (req && req.cookies && req.cookies[config.jwt.cookie]) {
      setCookie(res, user);
    }
    next();
  })(req, res, next);
}

module.exports = { middleware, authenticate, login, logout };
