const basicAuth = require("express-basic-auth");
const basicAuthCfg = require("@app/config").basicAuth;

let basicAuthMiddleware = function(_req, _res, next) {
  return next();
};

if (basicAuthCfg.user && basicAuthCfg.password) {
  basicAuthMiddleware = basicAuth({
    users: {
      [basicAuthCfg.user]: basicAuthCfg.password
    },
    challenge: true
  });
}

module.exports = basicAuthMiddleware;
