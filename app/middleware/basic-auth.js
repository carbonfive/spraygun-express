const basicAuth = require("express-basic-auth");

let basicAuthMiddleware = function(user, pass) {
  if (user && pass) {
    return basicAuth({
      users: {
        [user]: pass
      },
      challenge: true
    });
  } else {
    return function(_req, _res, next) {
      return next();
    };
  }
};

module.exports = basicAuthMiddleware;
